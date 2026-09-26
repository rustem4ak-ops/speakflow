import AVFoundation
import SwiftUI

final class AudioPlayerService: NSObject, ObservableObject {
    private var player: AVAudioPlayer?

    func play(assetID: String) {
        guard let url = Bundle.main.url(forResource: assetID, withExtension: "mp3") else {
            return
        }
        do {
            try AVAudioSession.sharedInstance().setCategory(.playback, mode: .spokenAudio)
            try AVAudioSession.sharedInstance().setActive(true)
            player = try AVAudioPlayer(contentsOf: url)
            player?.prepareToPlay()
            player?.play()
        } catch {
            print("Audio error: \(error)")
        }
    }
}
