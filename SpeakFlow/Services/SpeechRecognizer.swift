import Foundation
import Speech
import AVFoundation

final class SpeechRecognizer: NSObject {
    private let recognizer = SFSpeechRecognizer(locale: Locale(identifier: "en-US"))
    private let engine = AVAudioEngine()
    private var request: SFSpeechAudioBufferRecognitionRequest?
    private var task: SFSpeechRecognitionTask?
    private(set) var transcript = ""

    func start() {
        transcript = ""
        SFSpeechRecognizer.requestAuthorization { _ in }

        request = SFSpeechAudioBufferRecognitionRequest()
        guard let request else { return }

        let input = engine.inputNode
        let format = input.outputFormat(forBus: 0)
        input.removeTap(onBus: 0)
        input.installTap(onBus: 0, bufferSize: 1024, format: format) { [weak self] buffer, _ in
            self?.request?.append(buffer)
        }

        task = recognizer?.recognitionTask(with: request) { [weak self] result, _ in
            if let result { self?.transcript = result.bestTranscription.formattedString }
        }

        do {
            try AVAudioSession.sharedInstance().setCategory(.record, mode: .measurement, options: .duckOthers)
            try AVAudioSession.sharedInstance().setActive(true)
            engine.prepare()
            try engine.start()
        } catch {
            print("Speech start error: \(error)")
        }
    }

    func stop() {
        engine.stop()
        engine.inputNode.removeTap(onBus: 0)
        request?.endAudio()
        task?.finish()
        task = nil
    }
}
