# SpeakFlow 6.0

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
