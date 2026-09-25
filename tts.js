import { KokoroTTS } from 'kokoro-js';

// Kokoro is an English-focused neural TTS model that runs locally in the browser.
// We use the quantized browser model for a reasonable first download size while
// keeping a natural American English voice.
const MODEL_ID = 'onnx-community/Kokoro-82M-v1.0-ONNX';
const VOICE = 'af_heart';
const CACHE_NAME = 'speakflow-audio-v5-kokoro';

let enginePromise = null;
let activeAudio = null;

window.voiceEngine = {
  state: 'idle',
  message: 'Kokoro US English voice is ready to load.',
  progress: 0,
  error: null
};

function setStatus(state, message, progress = 0, error = null) {
  window.voiceEngine = { state, message, progress, error };
  window.dispatchEvent(new CustomEvent('speakflow-voice-status', {
    detail: window.voiceEngine
  }));
}

function cacheKey(text) {
  return new Request(
    `${location.origin}${location.pathname}__kokoro_audio__/${encodeURIComponent(text)}`
  );
}

async function getCache() {
  try {
    return await caches.open(CACHE_NAME);
  } catch {
    return null;
  }
}

async function getCached(text) {
  const c = await getCache();
  if (!c) return null;
  return c.match(cacheKey(text));
}

async function putCached(text, wav) {
  const c = await getCache();
  if (!c) return;
  await c.put(
    cacheKey(text),
    new Response(new Blob([wav], { type: 'audio/wav' }), {
      headers: {
        'Content-Type': 'audio/wav',
        'Cache-Control': 'public, max-age=31536000'
      }
    })
  );
}

async function getEngine() {
  if (!enginePromise) {
    setStatus('loading', 'Downloading Kokoro English voice…', 0);

    enginePromise = KokoroTTS.from_pretrained(MODEL_ID, {
      dtype: 'q8',
      device: 'wasm',
      progress_callback: (p) => {
        const raw = typeof p?.progress === 'number' ? p.progress : 0;
        setStatus(
          'loading',
          p?.status || 'Loading Kokoro voice…',
          Math.round(raw)
        );
      }
    }).then(engine => {
      setStatus('ready', 'Kokoro US English voice ready', 100);
      return engine;
    }).catch(err => {
      enginePromise = null;
      setStatus(
        'error',
        'Kokoro voice could not be loaded',
        0,
        String(err?.message || err)
      );
      throw err;
    });
  }

  return enginePromise;
}

window.prepareNeuralVoice = () => getEngine().catch(() => null);

window.neuralSpeak = async function(text, opts = {}) {
  if (!text) return false;

  try {
    const cached = await getCached(text);

    if (cached) {
      if (opts.cacheOnly) return true;

      if (activeAudio) {
        try { activeAudio.pause(); } catch {}
        activeAudio = null;
      }

      const url = URL.createObjectURL(await cached.blob());
      activeAudio = new Audio(url);
      activeAudio.onended = () => {
        URL.revokeObjectURL(url);
        activeAudio = null;
        setStatus('ready', 'Kokoro US English voice ready', 100);
      };
      await activeAudio.play();
      return true;
    }

    setStatus('synthesizing', 'Generating natural English…', 100);

    const tts = await getEngine();
    if (!tts) return false;

    const result = await tts.generate(text, {
      voice: VOICE
    });

    const wav = result.toWav();
    await putCached(text, wav);

    if (opts.cacheOnly) {
      setStatus('ready', 'Kokoro US English voice ready', 100);
      return true;
    }

    if (activeAudio) {
      try { activeAudio.pause(); } catch {}
      activeAudio = null;
    }

    const url = URL.createObjectURL(new Blob([wav], { type: 'audio/wav' }));
    activeAudio = new Audio(url);
    activeAudio.onended = () => {
      URL.revokeObjectURL(url);
      activeAudio = null;
      setStatus('ready', 'Kokoro US English voice ready', 100);
    };

    await activeAudio.play();
    return true;
  } catch (err) {
    setStatus(
      'error',
      'Kokoro English voice failed',
      0,
      String(err?.message || err)
    );
    return false;
  }
};

window.stopNeuralVoice = () => {
  try { activeAudio?.pause(); } catch {}
  if (activeAudio?.src?.startsWith('blob:')) {
    URL.revokeObjectURL(activeAudio.src);
  }
  activeAudio = null;
};
