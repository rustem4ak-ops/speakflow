import SwiftUI

struct LessonView: View {
    let lesson: Lesson
    @EnvironmentObject private var audio: AudioPlayerService
    @EnvironmentObject private var progress: ProgressStore
    @State private var index = 0
    @State private var showTranslation = false

    private var phrase: Phrase { lesson.phrases[index] }

    var body: some View {
        VStack(spacing: 24) {
            ProgressView(value: Double(index + 1), total: Double(lesson.phrases.count))
            Spacer()

            Text(phrase.english)
                .font(.system(size: 30, weight: .semibold, design: .rounded))
                .multilineTextAlignment(.center)

            if showTranslation {
                Text(phrase.translation)
                    .foregroundStyle(.secondary)
                    .multilineTextAlignment(.center)
            }

            HStack {
                Button { audio.play(assetID: phrase.audio, fallbackText: phrase.english) } label: {
                    Label("Listen", systemImage: "play.fill")
                }.buttonStyle(.borderedProminent)

                Button { showTranslation.toggle() } label: {
                    Label("Translate", systemImage: "text.bubble")
                }.buttonStyle(.bordered)
            }

            NavigationLink {
                SpeakView(phrase: phrase)
            } label: {
                Label("Speak", systemImage: "mic.fill")
                    .frame(maxWidth: .infinity)
            }
            .buttonStyle(.borderedProminent)
            .tint(.green)

            Spacer()
        }
        .padding()
        .navigationTitle("\(index + 1) / \(lesson.phrases.count)")
        .toolbar {
            ToolbarItem(placement: .topBarTrailing) {
                Button("Next") {
                    progress.markCompleted(phrase.id)
                    if index < lesson.phrases.count - 1 {
                        index += 1
                        showTranslation = false
                    }
                }
            }
        }
    }
}
