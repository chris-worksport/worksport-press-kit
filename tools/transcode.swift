// Re-encode a video to H.264 at a chosen width and average bitrate (for web copies under GitHub's 100 MB limit).
// Usage: swift tools/transcode.swift <in> <out.mp4> <width> <videoKbps>
// Uses AVFoundation only (no ffmpeg needed).
import AVFoundation
import Foundation

let args = CommandLine.arguments
guard args.count == 5, let width = Int(args[3]), let kbps = Int(args[4]) else {
    print("usage: transcode.swift <in> <out.mp4> <width> <videoKbps>"); exit(1)
}
let inURL = URL(fileURLWithPath: args[1]), outURL = URL(fileURLWithPath: args[2])
try? FileManager.default.removeItem(at: outURL)

let asset = AVURLAsset(url: inURL)
let sem = DispatchSemaphore(value: 0)
var exitCode: Int32 = 0

Task {
    do {
        let vTracks = try await asset.loadTracks(withMediaType: .video)
        let aTracks = try await asset.loadTracks(withMediaType: .audio)
        guard let vTrack = vTracks.first else { print("no video track"); exitCode = 2; sem.signal(); return }
        let natural = try await vTrack.load(.naturalSize)
        let transform = try await vTrack.load(.preferredTransform)
        let size = natural.applying(transform)
        let srcW = abs(size.width), srcH = abs(size.height)
        let outW = width, outH = Int((CGFloat(width) * srcH / srcW / 2).rounded()) * 2

        let reader = try AVAssetReader(asset: asset)
        let vOut = AVAssetReaderTrackOutput(track: vTrack, outputSettings: [kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_420YpCbCr8BiPlanarVideoRange])
        vOut.alwaysCopiesSampleData = false
        reader.add(vOut)
        var aOut: AVAssetReaderTrackOutput? = nil
        if let aTrack = aTracks.first {
            let o = AVAssetReaderTrackOutput(track: aTrack, outputSettings: [AVFormatIDKey: kAudioFormatLinearPCM])
            reader.add(o); aOut = o
        }

        let writer = try AVAssetWriter(outputURL: outURL, fileType: .mp4)
        let vSettings: [String: Any] = [
            AVVideoCodecKey: AVVideoCodecType.h264,
            AVVideoWidthKey: outW, AVVideoHeightKey: outH,
            AVVideoScalingModeKey: AVVideoScalingModeResizeAspect,
            AVVideoCompressionPropertiesKey: [
                AVVideoAverageBitRateKey: kbps * 1000,
                AVVideoProfileLevelKey: AVVideoProfileLevelH264HighAutoLevel,
                AVVideoMaxKeyFrameIntervalKey: 60,
                AVVideoAllowFrameReorderingKey: true
            ]
        ]
        let vIn = AVAssetWriterInput(mediaType: .video, outputSettings: vSettings)
        vIn.expectsMediaDataInRealTime = false
        vIn.transform = transform
        writer.add(vIn)
        var aIn: AVAssetWriterInput? = nil
        if aOut != nil {
            let a = AVAssetWriterInput(mediaType: .audio, outputSettings: [
                AVFormatIDKey: kAudioFormatMPEG4AAC, AVNumberOfChannelsKey: 2, AVSampleRateKey: 48000, AVEncoderBitRateKey: 128000])
            a.expectsMediaDataInRealTime = false
            writer.add(a); aIn = a
        }
        writer.shouldOptimizeForNetworkUse = true
        guard reader.startReading(), writer.startWriting() else { print("start failed", reader.error ?? "", writer.error ?? ""); exitCode = 3; sem.signal(); return }
        writer.startSession(atSourceTime: .zero)

        let group = DispatchGroup()
        func pump(_ input: AVAssetWriterInput, _ output: AVAssetReaderTrackOutput, _ label: String) {
            group.enter()
            input.requestMediaDataWhenReady(on: DispatchQueue(label: label)) {
                while input.isReadyForMoreMediaData {
                    if let buf = output.copyNextSampleBuffer() { input.append(buf) }
                    else { input.markAsFinished(); group.leave(); return }
                }
            }
        }
        pump(vIn, vOut, "video")
        if let aIn = aIn, let aOut = aOut { pump(aIn, aOut, "audio") }
        group.wait()
        await writer.finishWriting()
        if writer.status != .completed { print("writer failed", writer.error ?? ""); exitCode = 4 }
        else { print("wrote \(outURL.path) \(outW)x\(outH) @ \(kbps) kbps") }
    } catch { print("error", error); exitCode = 5 }
    sem.signal()
}
sem.wait()
exit(exitCode)
