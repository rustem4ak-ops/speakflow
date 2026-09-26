import Foundation
import Speech

struct PronunciationResult {
    let percentage: Int
    let recognizedText: String
}

final class PronunciationService: NSObject, ObservableObject {
    private let recognizer = SFSpeechRecognizer(locale: Locale(identifier: "en-US"))

    func score(reference: String, recognized: String) -> PronunciationResult {
        let a = normalize(reference)
        let b = normalize(recognized)

        guard !a.isEmpty else { return PronunciationResult(percentage: 0, recognizedText: recognized) }

        let distance = levenshtein(Array(a), Array(b))
        let score = max(0, min(100, Int((1.0 - Double(distance) / Double(max(a.count, b.count, 1))) * 100)))

        return PronunciationResult(percentage: score, recognizedText: recognized)
    }

    private func normalize(_ value: String) -> String {
        value.lowercased()
            .replacingOccurrences(of: "[^a-z0-9 ]", with: "", options: .regularExpression)
            .split(separator: " ")
            .joined(separator: " ")
    }

    private func levenshtein(_ a: [Character], _ b: [Character]) -> Int {
        var row = Array(0...b.count)
        for i in 1...a.count {
            var next = [i]
            for j in 1...b.count {
                next.append(min(
                    next[j - 1] + 1,
                    row[j] + 1,
                    row[j - 1] + (a[i - 1] == b[j - 1] ? 0 : 1)
                ))
            }
            row = next
        }
        return row[b.count]
    }
}
