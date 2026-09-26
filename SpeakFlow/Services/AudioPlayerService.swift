import AVFoundation
import SwiftUI

final class AudioPlayerService: NSObject, ObservableObject {
    private var player: AVAudioPlayer?
    private let synthesizer = AVSpeechSynthesizer()

    func play(assetID: String, fallbackText: String? = nil) {
        if let url = Bundle.main.url(forResource: assetID, withExtension: "mp3") {
            do {
                try AVAudioSession.sharedInstance().setCategory(.playback, mode: .spokenAudio)
                try AVAudioSession.sharedInstance().setActive(true)
                player = try AVAudioPlayer(contentsOf: url)
                player?.prepareToPlay()
                player?.play()
                return
            } catch {
                print("Audio asset error: \(error)")
            }
        }

        guard let fallbackText else { return }
        let utterance = AVSpeechUtterance(string: fallbackText)
        utterance.voice = AVSpeechSynthesisVoice(language: "en-US")
        utterance.rate = 0.48
        synthesizer.speak(utterance)
    }
}