import Foundation

enum DestinationFolderAccessResolver {
    static func resolve(
        destination: DestinationFolder,
        watchedFolderURL: URL
    ) throws -> FolderAccess {
        guard destination.usesCustomLocation else {
            return FolderAccess(
                url: watchedFolderURL.appendingPathComponent(destination.name, isDirectory: true),
                didStartAccessing: false
            )
        }

        guard let bookmark = destination.folderBookmark else {
            throw DestinationFolderAccessError.needsAccess
        }

        var isStale = false
        let url: URL

        do {
            url = try URL(
                resolvingBookmarkData: bookmark,
                options: [.withSecurityScope],
                relativeTo: nil,
                bookmarkDataIsStale: &isStale
            )
        } catch {
            throw DestinationFolderAccessError.needsAccess
        }

        let didStartAccessing = url.startAccessingSecurityScopedResource()
        var isDirectory: ObjCBool = false

        guard FileManager.default.fileExists(atPath: url.path, isDirectory: &isDirectory) else {
            if didStartAccessing {
                url.stopAccessingSecurityScopedResource()
            }

            throw DestinationFolderAccessError.missing
        }

        guard isDirectory.boolValue else {
            if didStartAccessing {
                url.stopAccessingSecurityScopedResource()
            }

            throw DestinationFolderAccessError.needsAccess
        }

        guard FileManager.default.isWritableFile(atPath: url.path) else {
            if didStartAccessing {
                url.stopAccessingSecurityScopedResource()
            }

            throw DestinationFolderAccessError.needsAccess
        }

        return FolderAccess(
            url: url,
            didStartAccessing: didStartAccessing,
            isBookmarkStale: isStale
        )
    }

    static func availability(
        destination: DestinationFolder,
        watchedFolderURL: URL
    ) -> DestinationAvailability {
        guard destination.usesCustomLocation else {
            return .available
        }

        do {
            let access = try resolve(destination: destination, watchedFolderURL: watchedFolderURL)
            access.stop()
            return .available
        } catch DestinationFolderAccessError.missing {
            return .missing
        } catch {
            return .needsAccess
        }
    }
}
