import Foundation
import SwiftUI

final class ProgressStore: ObservableObject {
    @Published private(set) var completedPhrases: Set<String> = []

    private let key = "speakflow.completedPhrases"

    init() {
        completedPhrases = Set(UserDefaults.standard.stringArray(forKey: key) ?? [])
    }

    func markCompleted(_ id: String) {
        completedPhrases.insert(id)
        UserDefaults.standard.set(Array(completedPhrases), forKey: key)
    }
}
