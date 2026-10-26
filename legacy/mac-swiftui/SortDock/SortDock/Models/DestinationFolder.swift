import Foundation

struct DestinationFolder: Codable, Equatable, Hashable, Identifiable {
    let id: UUID
    var name: String
    var folderPath: String?
    var folderBookmark: Data?

    init(
        id: UUID = UUID(),
        name: String,
        folderPath: String? = nil,
        folderBookmark: Data? = nil
    ) {
        self.id = id
        self.name = name
        self.folderPath = folderPath
        self.folderBookmark = folderBookmark
    }

    var usesCustomLocation: Bool {
        folderPath != nil
    }
}
