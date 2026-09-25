// SpeakFlow v5.3 — Kokoro neural English, worker + phrase prefetch/cache.
// The neural voice stays fully local in the browser. No Apple TTS is used for English.
const VOICE = 'af_heart';
const CACHE_NAME = 'speakflow-audio-v5.3-kokoro';
const WORKER_URL = `tts-worker.js?v=5.3`;

let worker = null;
let workerReady = false;
let activeAudio = null;
let nextId = 1;
const pending = new Map();
const preloadJobs = new Map();

window.voiceEngine = {
  state: 'idle', message: 'Kokoro US English neural voice', progress: 0, error: null
};

function setStatus(state, message, progress = 0, error = null) {
  window.voiceEngine = { state, message, progress, error };
  window.dispatchEvent(new CustomEvent('speakflow-voice-status', { detail: window.voiceEngine }));
}

function ensureWorker() {
  if (worker) return worker;
  worker = new Worker(WORKER_URL, { type: 'module' });
  worker.onmessage = (event) => {
    const msg = event.data || {};
    if (msg.type === 'status') {
      setStatus(msg.state, msg.message, msg.progress || 0);
      if (msg.state === 'ready') workerReady = true;
      return;
    }
    if (msg.type === 'progress') {
      setStatus('loading', msg.message || 'Loading neural voice…', msg.progress || 0);
      return;
    }
    if (msg.type === 'loaded') {
      const p = pending.get(msg.id);
      if (p) { pending.delete(msg.id); p.resolve(true); }
      return;
    }
    if (msg.type === 'audio') {
      const p = pending.get(msg.id);
      if (p) { pending.delete(msg.id); p.resolve(msg.blob); }
      return;
    }
    if (msg.type === 'error') {
      const p = pending.get(msg.id);
      if (p) { pending.delete(msg.id); p.reject(new Error(msg.message || 'Kokoro error')); }
      if (msg.phase === 'load') {
        workerReady = false;
        setStatus('error', 'Kokoro voice could not be loaded', 0, msg.message);
      }
    }
  };
  worker.onerror = (event) => {
    const message = event?.message || 'Kokoro worker stopped unexpectedly';
    workerReady = false;
    for (const [id, p] of pending) { p.reject(new Error(message)); pending.delete(id); }
    setStatus('error', 'Kokoro worker failed', 0, message);
    try { worker.terminate(); } catch {}
    worker = null;
  };
  return worker;
}

function request(type, payload = {}, timeoutMs = 120000) {
  const w = ensureWorker();
  const id = nextId++;
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      pending.delete(id);
      reject(new Error('Kokoro timed out while working on this iPhone.'));
    }, timeoutMs);
    pending.set(id, {
      resolve: (value) => { clearTimeout(timer); resolve(value); },
      reject: (err) => { clearTimeout(timer); reject(err); }
    });
    w.postMessage({ type, id, ...payload });
  });
}

function cacheKey(text) {
  return new Request(`${location.origin}${location.pathname}__kokoro53__/${encodeURIComponent(text)}`);
}
async function getCache() { try { return await caches.open(CACHE_NAME); } catch { return null; } }
async function getCached(text) { const c = await getCache(); return c ? c.match(cacheKey(text)) : null; }
async function putCached(text, blob) {
  const c = await getCache();
  if (!c) return;
  await c.put(cacheKey(text), new Response(blob, {
    headers: { 'Content-Type': 'audio/wav', 'Cache-Control': 'public, max-age=31536000' }
  }));
}

window.prepareNeuralVoice = async () => {
  try {
    setStatus('loading', 'Loading Kokoro neural voice…', 0);
    ensureWorker();
    // A short warm-up makes the first real Listen less likely to pay the cold-start cost.
    await request('load', {}, 180000);
    await synthesize('Hi.');
    setStatus('ready', 'Kokoro US English voice ready', 100);
    return true;
  } catch (err) {
    setStatus('error', 'Kokoro voice could not be loaded', 0, String(err?.message || err));
    return false;
  }
};

async function synthesize(text) {
  const cached = await getCached(text);
  if (cached) return cached.blob();
  const blob = await request('speak', { text }, 180000);
  await putCached(text, blob);
  return blob;
}

window.neuralSpeak = async function(text, opts = {}) {
  if (!text) return false;
  try {
    const cached = await getCached(text);
    if (opts.cacheOnly) {
      if (cached) return true;
      await synthesize(text);
      return true;
    }
    const blob = cached ? await cached.blob() : await synthesize(text);
    if (activeAudio) {
      try { activeAudio.pause(); } catch {}
      if (activeAudio.src?.startsWith('blob:')) URL.revokeObjectURL(activeAudio.src);
      activeAudio = null;
    }
    const url = URL.createObjectURL(blob);
    activeAudio = new Audio(url);
    activeAudio.preload = 'auto';
    activeAudio.onended = () => {
      URL.revokeObjectURL(url); activeAudio = null;
      setStatus('ready', 'Kokoro US English voice ready', 100);
    };
    await activeAudio.play();
    return true;
  } catch (err) {
    setStatus('error', 'Kokoro English voice failed', 0, String(err?.message || err));
    return false;
  }
};

// Generate one phrase at a time in the background. This prevents the next Listen
// tap from waiting for synthesis after the first phrase has been prepared.
window.prefetchLessonAudio = async function(phrases, startIndex = 0) {
  const list = (phrases || []).map(p => p[0]).filter(Boolean);
  const key = list.join('|');
  if (preloadJobs.has(key)) return preloadJobs.get(key);
  const job = (async () => {
    try {
      // Keep one generation at a time: this is much friendlier to iPhone memory.
      for (let i = Math.max(0, startIndex); i < list.length; i++) {
        if (await getCached(list[i])) continue;
        await synthesize(list[i]);
        window.dispatchEvent(new CustomEvent('speakflow-audio-prefetch', {
          detail: { index: i, total: list.length }
        }));
      }
    } catch (err) {
      // Prefetch must never break the lesson UI. The tapped phrase can retry on demand.
      console.warn('SpeakFlow prefetch:', err);
    } finally {
      preloadJobs.delete(key);
    }
  })();
  preloadJobs.set(key, job);
  return job;
};

window.stopNeuralVoice = () => {
  try { activeAudio?.pause(); } catch {}
  if (activeAudio?.src?.startsWith('blob:')) URL.revokeObjectURL(activeAudio.src);
  activeAudio = null;
};
