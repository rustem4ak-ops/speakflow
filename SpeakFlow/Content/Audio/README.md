# SpeakFlow audio

Audio is keyed by the audio field in lessons.json.

Example filename: a1_everyday_001_p001.mp3

Production audio requirements:
- real licensed recording or clearly licensed high-quality voice;
- consistent English accent per course;
- 44.1 kHz or 48 kHz source;
- mono;
- normalized loudness;
- short leading/trailing silence;
- filename must exactly match the audio ID.

The app checks bundled MP3 first, so prepared recordings play locally without waiting for network generation.

The current development build falls back to Apple's en-US speech synthesizer only when the prepared MP3 is absent. This fallback is for development and is not presented as a native-speaker recording.
