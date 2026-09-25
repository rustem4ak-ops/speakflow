import { KokoroJP } from 'https://cdn.jsdelivr.net/npm/kokoro-js-jp@0.2.0/dist/kokoro-jp.web.js';

const VOICE = 'af_heart';
let enginePromise = null;

function post(type, payload = {}) {
  self.postMessage({ type, ...payload });
}

async function getEngine() {
  if (!enginePromise) {
    post('status', { id: null, state: 'loading', message: 'Loading Kokoro neural voice…', progress: 0 });
    enginePromise = KokoroJP.load({
      japanese: false,
      progress_callback: (p) => {
        const n = Number(p?.progress);
        post('progress', { id: null,
          progress: Number.isFinite(n) ? Math.max(0, Math.min(100, Math.round(n))) : 0,
          message: p?.status || p?.file || 'Loading neural voice…'
        });
      }
    }).then(engine => {
      post('status', { id: null, state: 'ready', message: 'Kokoro US English voice ready', progress: 100 });
      return engine;
    }).catch(err => {
      enginePromise = null;
      post('error', { phase: 'load', message: String(err?.message || err) });
      throw err;
    });
  }
  return enginePromise;
}

self.onmessage = async (event) => {
  const msg = event.data || {};
  try {
    if (msg.type === 'load') {
      await getEngine();
      post('loaded', { id: msg.id });
      return;
    }
    if (msg.type === 'speak') {
      const text = String(msg.text || '').trim();
      if (!text) return;
      const tts = await getEngine();
      post('status', { state: 'synthesizing', message: 'Generating natural English…', progress: 100 });
      const result = await tts.speak(text, VOICE);
      const blob = await result.toBlob();
      post('audio', { id: msg.id, text, blob });
      post('status', { id: null, state: 'ready', message: 'Kokoro US English voice ready', progress: 100 });
    }
  } catch (err) {
    post('error', { id: msg.id, phase: msg.type, message: String(err?.message || err) });
  }
};
