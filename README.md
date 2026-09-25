# SpeakFlow v5.4 — Kokoro pre-generated audio

This version does **not** run Kokoro/ONNX inside the iPhone browser. The natural Kokoro `af_heart` voice is generated once by GitHub Actions and stored as WAV files in the repository. iPhone/Safari only downloads and plays the finished audio.

Why: Kokoro browser inference is currently unreliable on iOS Safari; reports show model load succeeding but generation hanging or refreshing on iPhone/iPad, while Android can work. The v5.4 architecture avoids that device-specific inference path.

## Deploy
1. Upload/replace the v5.4 files in the repository.
2. Open GitHub → Actions → **Generate Kokoro audio** → **Run workflow**.
3. Wait for the workflow to finish and commit the WAV files.
4. GitHub Pages will then serve the generated audio.

The first build downloads the Kokoro model on the GitHub runner and generates the lesson WAVs. After that, the iPhone only fetches static audio files, so playback should start much faster and work offline after caching.
