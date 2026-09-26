# SpeakFlow iOS v1

Native iPhone English speaking trainer.

This branch starts the new native iOS version from a clean architecture. The previous PWA implementation is not used as the application runtime.

## v1 lesson loop
1. Listen to a natural English phrase.
2. Read the translation.
3. Shadow the native recording.
4. Record your own voice.
5. Receive a pronunciation percentage.
6. Save progress locally.

## Architecture
- SwiftUI UI
- AVFoundation audio playback
- Speech framework abstraction for recognition
- Local JSON lesson catalog
- Local progress storage
- Audio IDs that can later map to native-speaker recordings
- Offline-first design

The content model is intentionally compatible with hundreds of courses and thousands of phrases.

## Native audio
Production audio should be supplied as pre-recorded native-speaker files. The app never waits for TTS generation when the user taps Play.
