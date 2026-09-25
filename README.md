# SpeakFlow v5 — Lisn-style learning system

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
