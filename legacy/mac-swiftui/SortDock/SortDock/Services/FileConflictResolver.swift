import Foundation

enum FileConflictResolver {
    static func availableURL(for desiredURL: URL) -> URL {
        let fileManager = FileManager.default

        guard fileManager.fileExists(atPath: desiredURL.path) else {
            return desiredURL
        }

        let folderURL = desiredURL.deletingLastPathComponent()
        let baseName = desiredURL.deletingPathExtension().lastPathComponent
        let pathExtension = desiredURL.pathExtension

        for index in 1...9_999 {
            let fileName = pathExtension.isEmpty
                ? "\(baseName) (\(index))"
                : "\(baseName) (\(index)).\(pathExtension)"
            let candidateURL = folderURL.appendingPathComponent(fileName)

            if !fileManager.fileExists(atPath: candidateURL.path) {
                return candidateURL
            }
        }

        return folderURL.appendingPathComponent("\(baseName) \(UUID().uuidString).\(pathExtension)")
    }
}
