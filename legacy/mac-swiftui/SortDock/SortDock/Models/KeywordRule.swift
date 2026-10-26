import Foundation

struct KeywordRule: Codable, Equatable, Identifiable {
    let id: UUID
    var keywords: [String]
    var destinationID: UUID
    var isEnabled: Bool

    init(
        id: UUID = UUID(),
        keywords: [String],
        destinationID: UUID,
        isEnabled: Bool = true
    ) {
        self.id = id
        self.keywords = keywords
        self.destinationID = destinationID
        self.isEnabled = isEnabled
    }
}
