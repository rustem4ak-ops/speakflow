import SwiftUI

@main
struct SpeakFlowApp: App {
    @StateObject private var lessons = LessonStore()
    @StateObject private var audio = AudioPlayerService()
    @StateObject private var progress = ProgressStore()

    var body: some Scene {
        WindowGroup {
            HomeView()
                .environmentObject(lessons)
                .environmentObject(audio)
                .environmentObject(progress)
        }
    }
}
