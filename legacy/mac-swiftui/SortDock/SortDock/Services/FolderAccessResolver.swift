import Foundation

enum FolderAccessResolver {
    static func resolve(settings: SortDockSettings) -> FolderAccess {
        guard let bookmark = settings.watchedFolderBookmark else {
            return FolderAccess(
                url: URL(fileURLWithPath: settings.watchedFolderPath, isDirectory: true),
                didStartAccessing: false
            )
        }

        var isStale = false

        do {
            let url = try URL(
                resolvingBookmarkData: bookmark,
                options: [.withSecurityScope],
                relativeTo: nil,
                bookmarkDataIsStale: &isStale
            )
            let didStartAccessing = url.startAccessingSecurityScopedResource()
            return FolderAccess(
                url: url,
                didStartAccessing: didStartAccessing,
                isBookmarkStale: isStale
            )
        } catch {
            return FolderAccess(
                url: URL(fileURLWithPath: settings.watchedFolderPath, isDirectory: true),
                didStartAccessing: false
            )
        }
    }
}
