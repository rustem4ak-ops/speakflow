# SpeakFlow v4 — Neural English Voice

Free PWA prototype for iPhone. English lesson audio now uses client-side neural TTS (Piper Plus + ONNX Runtime Web), not iPhone SpeechSynthesis.

## Voice architecture
- Neural English synthesis runs in the browser.
- No API key and no paid TTS service.
- The model is downloaded from Hugging Face on first use and cached in IndexedDB by the TTS library.
- If the neural engine cannot load, the app falls back to the device English voice.
- Russian translations still use the device Russian voice.

The neural engine is based on Piper Plus, which provides browser WebAssembly inference and supports Safari 18+ with WebGPU or WASM fallback. The app uses the multilingual medium model from the project's demo space.

## GitHub Pages
Upload/replace these files in your existing `rustem4ak-ops/speakflow` repository and keep GitHub Pages set to `main` / root.


## v4 fix
The browser import map explicitly resolves piper-plus and @piper-plus/g2p, so the neural TTS module loads correctly on static GitHub Pages without a bundler. The app no longer starts downloading the model until the user presses Load / prepare voice.
