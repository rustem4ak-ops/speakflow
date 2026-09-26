import Foundation

struct Course: Codable, Identifiable {
    let id: String
    let level: String
    let title: String
    let description: String
    let lessons: [Lesson]
}

struct Lesson: Codable, Identifiable {
    let id: String
    let title: String
    let topic: String
    let phrases: [Phrase]
}

struct Phrase: Codable, Identifiable {
    let id: String
    let english: String
    let translation: String
    let audio: String
    let difficulty: Int
}
