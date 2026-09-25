# SpeakFlow v5.1 — Lisn-style English with Kokoro neural voice

Free PWA prototype inspired by the audio-first learning approach: listen to complete phrases, repeat, shadow, then practice them in conversation.

## v5 changes
- 18 themed courses across A1–C1.
- Learning plan by level.
- Audio-first lesson flow.
- One-speaker US English neural TTS using Piper Plus + ONNX Runtime Web.
- **Option B UX:** each lesson phrase is synthesized once and saved as WAV in the browser Cache Storage; later playback reuses the saved audio instead of synthesizing again.
- “Prepare lesson audio” pre-generates every phrase in the current lesson.
- No API key or server required.
- Progress, XP and streak remain local to the device.

## Important
The app uses an open neural voice, not Lisn's proprietary recordings. It aims for a consistent US-English voice, but it is not a claim of being the same voice or recording system as Lisn.

The model is downloaded from Hugging Face on first use and browser-cached.


## v5.1 voice engine

The browser TTS backend was changed from Piper Plus to **Kokoro-82M** because the previous
Piper setup was failing during G2P initialization (`openjtalkModule` error) and the upstream
Piper `en_US` checkpoint is not a piper-plus-specific checkpoint.

SpeakFlow now uses `kokoro-js` with the `onnx-community/Kokoro-82M-v1.0-ONNX` model,
American English voice `af_heart`, and a quantized (`q8`) browser runtime. Audio is
generated locally in the browser and cached as WAV for repeat playback.
