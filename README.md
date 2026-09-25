# SpeakFlow v5.3

Lisn-style free PWA for English practice.

## Voice
- Kokoro-82M `af_heart` US English neural voice.
- English audio stays neural; no Apple system TTS fallback for English lessons.
- Kokoro runs in a Web Worker so Safari UI is not blocked by model inference.
- First voice load includes a short warm-up.

## Fast lesson playback
- Lesson audio is generated phrase-by-phrase, not as one large lesson WAV.
- The lesson automatically prefetches phrases in the background.
- Each generated phrase is cached locally as WAV.
- Replays use the cached WAV immediately.
- Only one phrase is synthesized at a time to reduce iPhone memory pressure.

## iPhone
If Safari cannot complete the neural model load, the app now reports a concrete worker error/timeout instead of appearing to hang forever.

## Deployment
Upload the files in this folder to the GitHub Pages repository and replace the previous version.
