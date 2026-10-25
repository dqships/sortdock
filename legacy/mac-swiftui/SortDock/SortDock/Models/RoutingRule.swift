import Foundation

struct RoutingRule: Codable, Equatable, Identifiable {
    let id: UUID
    var extensions: [String]
    var destinationID: UUID

    init(id: UUID = UUID(), extensions: [String], destinationID: UUID) {
        self.id = id
        self.extensions = extensions
        self.destinationID = destinationID
    }

    func matches(fileExtension: String) -> Bool {
        extensions.contains(fileExtension.lowercased())
    }
}
