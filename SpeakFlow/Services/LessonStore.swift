import Foundation

final class LessonStore: ObservableObject {
    @Published private(set) var courses: [Course] = []

    init() {
        load()
    }

    private func load() {
        guard let url = Bundle.main.url(forResource: "lessons", withExtension: "json") else {
            return
        }
        do {
            let data = try Data(contentsOf: url)
            courses = try JSONDecoder().decode([Course].self, from: data)
        } catch {
            courses = []
            print("LessonStore error: \(error)")
        }
    }
}
