import SwiftUI

struct SpeakView: View {
    let phrase: Phrase
    @EnvironmentObject private var audio: AudioPlayerService
    @State private var transcript = ""
    @State private var result: PronunciationResult?
    @State private var isRecording = false
    @State private var recognizer = SpeechRecognizer()

    var body: some View {
        VStack(spacing: 24) {
            Text("Repeat the phrase")
                .font(.title2.bold())

            Text(phrase.english)
                .font(.title3)
                .multilineTextAlignment(.center)

            Button {
                audio.play(assetID: phrase.audio, fallbackText: phrase.english)
            } label: {
                Image(systemName: "play.circle.fill")
                    .font(.system(size: 64))
            }

            Button {
                if isRecording {
                    recognizer.stop()
                    isRecording = false
                    transcript = recognizer.transcript
                    result = PronunciationService().score(
                        reference: phrase.english,
                        recognized: transcript
                    )
                } else {
                    transcript = ""
                    result = nil
                    recognizer.start()
                    isRecording = true
                }
            } label: {
                Image(systemName: isRecording ? "stop.circle.fill" : "mic.circle.fill")
                    .font(.system(size: 76))
            }

            if !transcript.isEmpty {
                Text(transcript)
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
                    .multilineTextAlignment(.center)
            }

            if let result {
                Text("\(result.percentage)%")
                    .font(.system(size: 56, weight: .bold, design: .rounded))
                Text("Speaking match")
                    .foregroundStyle(.secondary)
            }

            Spacer()
        }
        .padding()
        .navigationTitle("Speak")
        .onDisappear {
            if isRecording {
                recognizer.stop()
                isRecording = false
            }
        }
    }
}
