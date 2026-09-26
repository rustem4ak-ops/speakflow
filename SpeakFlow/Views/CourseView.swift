import SwiftUI

struct CourseView: View {
    let course: Course

    var body: some View {
        List(course.lessons) { lesson in
            NavigationLink {
                LessonView(lesson: lesson)
            } label: {
                VStack(alignment: .leading, spacing: 4) {
                    Text(lesson.title).font(.headline)
                    Text(lesson.topic).font(.subheadline).foregroundStyle(.secondary)
                    Text("\(lesson.phrases.count) phrases").font(.caption).foregroundStyle(.tertiary)
                }
                .padding(.vertical, 4)
            }
        }
        .navigationTitle(course.title)
    }
}
