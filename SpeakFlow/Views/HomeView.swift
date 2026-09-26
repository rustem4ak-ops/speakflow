import SwiftUI

struct HomeView: View {
    @EnvironmentObject private var lessons: LessonStore
    @EnvironmentObject private var progress: ProgressStore

    var body: some View {
        NavigationStack {
            List {
                Section {
                    VStack(alignment: .leading, spacing: 8) {
                        Text("SpeakFlow")
                            .font(.largeTitle.bold())
                        Text("Listen. Repeat. Speak naturally.")
                            .foregroundStyle(.secondary)
                    }
                    .padding(.vertical, 8)
                }

                Section("Courses") {
                    ForEach(lessons.courses) { course in
                        NavigationLink {
                            CourseView(course: course)
                        } label: {
                            VStack(alignment: .leading) {
                                Text(course.title).font(.headline)
                                Text("\(course.level) · \(course.lessons.count) lesson")
                                    .font(.caption)
                                    .foregroundStyle(.secondary)
                            }
                        }
                    }
                }
            }
            .navigationTitle("Learn")
        }
    }
}
