# SpeakFlow 8.1

Fast iPhone-first English speaking practice.

- 60 themed courses
- 600 lessons
- 3,000 exact English phrases
- 3,000 pre-generated Kokoro US English audio files
- Static MP3 audio; no Kokoro inference on the iPhone
- 6.3-style fast Cache Storage audio engine
- Current lesson audio is prefetched in the background
- Speech recognition / repeat check / shadowing
- Daily goal, streak, XP, weak-phrase review and progress
- PWA for iPhone Safari / Home Screen

## Audio generation

GitHub Actions uses 16 parallel shards to generate the 3,000 recordings, then verifies exactly 3,000 MP3 files and 3,000 manifest entries before committing `audio/`.

The audio format is MP3, mono, 24 kHz, 64 kbps. This keeps the download footprint much smaller than 3,000 WAV files while remaining natively playable by Safari.

## Important

The app never synthesizes Kokoro audio on the iPhone. GitHub Actions creates the recordings ahead of time. The phone only downloads, caches and plays them.
