import Foundation

struct FolderAccess {
    let url: URL
    let didStartAccessing: Bool
    let isBookmarkStale: Bool

    init(url: URL, didStartAccessing: Bool, isBookmarkStale: Bool = false) {
        self.url = url
        self.didStartAccessing = didStartAccessing
        self.isBookmarkStale = isBookmarkStale
    }

    func stop() {
        if didStartAccessing {
            url.stopAccessingSecurityScopedResource()
        }
    }
}
