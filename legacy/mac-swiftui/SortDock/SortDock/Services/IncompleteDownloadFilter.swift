import Foundation

enum IncompleteDownloadFilter {
    private static let temporaryExtensions: Set<String> = [
        "crdownload",
        "download",
        "part",
        "tmp"
    ]

    static func shouldIgnore(_ url: URL) -> Bool {
        let fileName = url.lastPathComponent.lowercased()
        let fileExtension = url.pathExtension.lowercased()

        if fileName.hasPrefix(".") {
            return true
        }

        if temporaryExtensions.contains(fileExtension) {
            return true
        }

        if fileName.hasSuffix(".download") {
            return true
        }

        return false
    }
}
