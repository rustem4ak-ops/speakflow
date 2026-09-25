import { PiperPlus } from "piper-plus";
import * as ort from "onnxruntime-web";

const MODEL_URL = "https://huggingface.co/spaces/ayousanz/piper-plus-demo/resolve/main/models/multilingual-test-medium.onnx";
let enginePromise = null;
let activeAudio = null;

window.voiceEngine = {
  state: "idle",
  message: "Neural voice is ready to load.",
  progress: 0,
  error: null
};

function setStatus(state, message, progress = 0, error = null) {
  window.voiceEngine = { state, message, progress, error };
  window.dispatchEvent(new CustomEvent("speakflow-voice-status", { detail: window.voiceEngine }));
}

async function getEngine() {
  if (!enginePromise) {
    setStatus("loading", "Downloading neural English voice…", 0);
    enginePromise = PiperPlus.initialize({
      model: MODEL_URL,
      ort,
      onProgress: ({ stage, progress, message }) => {
        const pct = Math.round((progress || 0) * 100);
        setStatus("loading", message || stage || "Loading voice…", pct);
      }
    }).then(engine => {
      setStatus("ready", "Neural English voice ready", 100);
      return engine;
    }).catch(err => {
      enginePromise = null;
      setStatus("error", "Neural voice could not be loaded", 0, String(err?.message || err));
      throw err;
    });
  }
  return enginePromise;
}

window.prepareNeuralVoice = () => getEngine().catch(() => null);

window.neuralSpeak = async function(text) {
  if (!text) return false;
  try {
    setStatus("synthesizing", "Generating natural English…", 100);
    const tts = await getEngine();
    if (!tts) return false;
    if (activeAudio) {
      try { activeAudio.pause?.(); } catch {}
      activeAudio = null;
    }
    const result = await tts.synthesize(text, {
      language: "en",
      lengthScale: 0.94,
      noiseScale: 0.42,
      noiseW: 0.50
    });
    activeAudio = result;
    await result.play();
    activeAudio = null;
    setStatus("ready", "Neural English voice ready", 100);
    return true;
  } catch (err) {
    setStatus("error", "Neural voice failed — using device voice", 0, String(err?.message || err));
    return false;
  }
};

window.stopNeuralVoice = () => {
  try { activeAudio?.pause?.(); } catch {}
  activeAudio = null;
};

// Do not download automatically. The user starts the model download with the button.

