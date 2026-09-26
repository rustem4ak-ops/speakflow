import Foundation

final class ProgressStore: ObservableObject {
    @Published private(set) var completedPhrases: Set<String> = []

    private let key = "speakflow.completedPhrases"

    init() {
        if let saved = UserDefaults.standard.array(forKey: key) as? [String] {
            completedPhrases = Set(saved)
        }
    }

    func markCompleted(_ phraseID: String) {
        completedPhrases.insert(phraseID)
        UserDefaults.standard.set(Array(completedPhrases), forKey: key)
    }

    func isCompleted(_ phraseID: String) -> Bool {
        completedPhrases.contains(phraseID)
    }
}
