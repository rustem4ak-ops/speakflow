import Foundation
import SwiftUI

final class LessonStore: ObservableObject {
    @Published private(set) var courses: [Course] = []

    init() {
        guard let url = Bundle.main.url(forResource: "lessons", withExtension: "json"),
              let data = try? Data(contentsOf: url),
              let decoded = try? JSONDecoder().decode([Course].self, from: data) else { return }
        courses = decoded
    }
}
