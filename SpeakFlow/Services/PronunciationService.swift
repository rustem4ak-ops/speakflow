import Foundation

struct PronunciationResult {
    let percentage: Int
    let recognizedText: String
    let matchedWords: Int
    let totalWords: Int
}

struct PronunciationService {
    func score(reference: String, recognized: String) -> PronunciationResult {
        let referenceWords = words(reference)
        let recognizedWords = words(recognized)
        guard !referenceWords.isEmpty else {
            return .init(percentage: 0, recognizedText: recognized, matchedWords: 0, totalWords: 0)
        }
        let distance = wordLevenshtein(referenceWords, recognizedWords)
        let maxCount = max(referenceWords.count, recognizedWords.count, 1)
        let percentage = max(0, min(100, Int((1.0 - Double(distance) / Double(maxCount)) * 100)))
        let matched = max(0, referenceWords.count - distance)
        return .init(percentage: percentage, recognizedText: recognized, matchedWords: matched, totalWords: referenceWords.count)
    }

    private func words(_ value: String) -> [String] {
        value.lowercased()
            .replacingOccurrences(of: "[^a-z0-9' ]", with: "", options: .regularExpression)
            .split(separator: " ")
            .map(String.init)
    }

    private func wordLevenshtein(_ a: [String], _ b: [String]) -> Int {
        var row = Array(0...b.count)
        for i in 1...a.count {
            var next = [i]
            for j in 1...b.count {
                let cost = a[i - 1] == b[j - 1] ? 0 : 1
                next.append(min(next[j - 1] + 1, row[j] + 1, row[j - 1] + cost))
            }
            row = next
        }
        return row[b.count]
    }
}
