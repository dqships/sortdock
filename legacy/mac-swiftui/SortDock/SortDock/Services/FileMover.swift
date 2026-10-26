import Foundation

final class FileMover {
    private let fileManager = FileManager.default

    func move(fileURL: URL, to destinationFolderURL: URL) throws -> URL {
        try fileManager.createDirectory(
            at: destinationFolderURL,
            withIntermediateDirectories: true
        )

        let desiredURL = destinationFolderURL.appendingPathComponent(fileURL.lastPathComponent)
        let targetURL = FileConflictResolver.availableURL(for: desiredURL)
        try fileManager.moveItem(at: fileURL, to: targetURL)
        return targetURL
    }
}
