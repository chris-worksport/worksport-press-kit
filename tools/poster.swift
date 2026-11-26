// Print duration/size of a video and save a poster frame as JPEG.
// Usage: swift tools/poster.swift <video> <out.jpg> [seconds]
import AVFoundation
import AppKit

let a = CommandLine.arguments
guard a.count >= 3 else { print("usage: poster.swift <video> <out.jpg> [seconds]"); exit(1) }
let asset = AVURLAsset(url: URL(fileURLWithPath: a[1]))
let at = a.count > 3 ? Double(a[3]) ?? 2 : 2
let sem = DispatchSemaphore(value: 0)
Task {
    do {
        let dur = try await asset.load(.duration).seconds
        let tracks = try await asset.loadTracks(withMediaType: .video)
        var w = 0, h = 0
        if let t = tracks.first { let s = try await t.load(.naturalSize); w = Int(s.width); h = Int(s.height) }
        let gen = AVAssetImageGenerator(asset: asset)
        gen.appliesPreferredTrackTransform = true
        gen.maximumSize = CGSize(width: 1280, height: 1280)
        let t = CMTime(seconds: min(at, max(0, dur - 0.5)), preferredTimescale: 600)
        let (img, _) = try await gen.image(at: t)
        let rep = NSBitmapImageRep(cgImage: img)
        if let data = rep.representation(using: .jpeg, properties: [.compressionFactor: 0.82]) {
            try data.write(to: URL(fileURLWithPath: a[2]))
        }
        print(String(format: "%.1f s %dx%d", dur, w, h))
    } catch { print("error", error) }
    sem.signal()
}
sem.wait()
