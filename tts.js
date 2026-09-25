// SpeakFlow v5.4 — pre-generated Kokoro neural English audio.
// IMPORTANT: Kokoro runs at build time, not inside the iPhone browser.
// This avoids the iOS Safari Kokoro/ONNX inference problem while keeping
// the natural Kokoro af_heart voice.
const CACHE_NAME = 'speakflow-audio-v5.4-kokoro';
let activeAudio = null;
let preloadJobs = new Map();

window.voiceEngine = { state: 'idle', message: 'Kokoro US English audio pack', progress: 0, error: null };
function setStatus(state, message, progress = 0, error = null) {
  window.voiceEngine = { state, message, progress, error };
  window.dispatchEvent(new CustomEvent('speakflow-voice-status', { detail: window.voiceEngine }));
}

function audioPath(text) {
  const el = window.__speakflowAudioIndex?.get(text);
  return el || null;
}

async function getCache() { try { return await caches.open(CACHE_NAME); } catch { return null; } }
async function cachedBlob(url) {
  const c = await getCache();
  if (!c) return null;
  const r = await c.match(url);
  return r ? r.blob() : null;
}
async function fetchAndCache(url) {
  const cached = await cachedBlob(url);
  if (cached) return cached;
  const res = await fetch(url, { cache: 'force-cache' });
  if (!res.ok) throw new Error(`Audio file not found (${res.status})`);
  const blob = await res.blob();
  const c = await getCache();
  if (c) await c.put(url, new Response(blob, { headers: { 'Content-Type': 'audio/wav' } }));
  return blob;
}

async function buildAudioIndex() {
  if (window.__speakflowAudioIndex) return window.__speakflowAudioIndex;
  const index = new Map();
  // The app exposes courses; map exact phrase text to its static WAV path.
  if (Array.isArray(window.__speakflowCourses)) {
    for (const c of window.__speakflowCourses) {
      c.phrases.forEach((p, i) => index.set(p[0], `audio/${c.id}-${i}.wav`));
    }
  }
  window.__speakflowAudioIndex = index;
  return index;
}

window.prepareNeuralVoice = async () => {
  try {
    setStatus('loading', 'Checking Kokoro audio pack…', 20);
    await buildAudioIndex();
    const first = window.__speakflowCourses?.[0]?.phrases?.[0]?.[0];
    const url = first ? audioPath(first) : null;
    if (!url) throw new Error('Audio index is not ready yet.');
    await fetchAndCache(url);
    setStatus('ready', 'Kokoro US English voice ready', 100);
    return true;
  } catch (err) {
    setStatus('error', 'Kokoro audio pack is not ready', 0, String(err?.message || err));
    return false;
  }
};

window.neuralSpeak = async function(text, opts = {}) {
  if (!text) return false;
  try {
    await buildAudioIndex();
    const url = audioPath(text);
    if (!url) throw new Error('No pre-generated audio for this phrase.');
    const blob = await fetchAndCache(url);
    if (opts.cacheOnly) return true;
    if (activeAudio) { try { activeAudio.pause(); } catch {} if (activeAudio.src?.startsWith('blob:')) URL.revokeObjectURL(activeAudio.src); }
    const objectUrl = URL.createObjectURL(blob);
    activeAudio = new Audio(objectUrl);
    activeAudio.preload = 'auto';
    activeAudio.onended = () => { URL.revokeObjectURL(objectUrl); activeAudio = null; setStatus('ready', 'Kokoro US English voice ready', 100); };
    await activeAudio.play();
    return true;
  } catch (err) {
    setStatus('error', 'Kokoro English audio failed', 0, String(err?.message || err));
    return false;
  }
};

window.prefetchLessonAudio = async function(phrases, startIndex = 0) {
  const list = (phrases || []).map(p => p[0]).filter(Boolean);
  const key = list.join('|');
  if (preloadJobs.has(key)) return preloadJobs.get(key);
  const job = (async () => {
    try {
      await buildAudioIndex();
      for (let i = Math.max(0, startIndex); i < list.length; i++) {
        const url = audioPath(list[i]);
        if (!url) continue;
        await fetchAndCache(url);
        window.dispatchEvent(new CustomEvent('speakflow-audio-prefetch', { detail: { index: i, total: list.length } }));
      }
    } catch (err) { console.warn('SpeakFlow audio prefetch:', err); }
    finally { preloadJobs.delete(key); }
  })();
  preloadJobs.set(key, job);
  return job;
};
window.stopNeuralVoice = () => { try { activeAudio?.pause(); } catch {} if (activeAudio?.src?.startsWith('blob:')) URL.revokeObjectURL(activeAudio.src); activeAudio = null; };
