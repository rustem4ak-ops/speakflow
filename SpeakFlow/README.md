# SpeakFlow v1 — iPhone

## Current flow
Home → Course → Lesson → Listen/Translate → Speak → percentage result.

## Development audio
If a matching MP3 exists in the app bundle it is played immediately. During development, the app falls back to the built-in en-US speech synthesizer so the complete lesson flow can be tested before production recordings are added.

## Production audio
The final release will use pre-recorded native-speaker audio files referenced by the same IDs. No UI or lesson logic needs to change.

## Pronunciation score
The current score measures transcript similarity. It is deliberately not presented as phoneme-level pronunciation analysis. A later pronunciation engine can replace PronunciationService without changing the lesson UI.
