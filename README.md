# SpeakFlow 6.2

Готовая статическая PWA-версия SpeakFlow.

## Что изменено

- 18 уроков и 72 фразы из текущего SpeakFlow.
- Английская озвучка — Kokoro `af_heart`.
- Kokoro/ONNX не запускается на iPhone.
- iPhone только скачивает и проигрывает готовые WAV.
- WAV кэшируются через Cache Storage.
- `Listen` больше не использует системный iPhone TTS для английских фраз.
- Русский перевод по кнопке может использовать системный TTS.
- Shadowing / SpeechRecognition сохранены.
- XP, streak, progress и localStorage сохранены.
- GitHub Actions автоматически генерирует недостающие WAV-файлы.

## Важно

WAV-файлы не включены в этот ZIP: они бинарные и должны быть сгенерированы GitHub Actions.
После загрузки пакета в репозиторий открой GitHub → Actions → `Generate all SpeakFlow Kokoro audio` → `Run workflow`.

Workflow создаёт:
`audio/airport-1.wav` ... `audio/everyday-english-4.wav`

После успешного запуска GitHub Pages будет раздавать статические WAV-файлы вместе с приложением.


## Audio synchronization fix in 6.1

The 6.1 package intentionally regenerates every WAV file from the current `data.json`.
It also uses a new browser cache version and a URL version (`v=6.1`) so old audio from
SpeakFlow 6.0 cannot be reused after deployment.


## 6.2 exact-phrase audio mapping
Audio filenames are derived from the SHA-256 hash of the exact English phrase. The player reads `audio/index.json`, so lesson order changes can never cause one phrase to play another phrase's audio.
