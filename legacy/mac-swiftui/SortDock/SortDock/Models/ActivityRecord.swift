import Foundation

struct ActivityRecord: Codable, Equatable, Identifiable {
    let id: UUID
    let message: String
    let date: Date
    let status: ActivityRecordStatus
    let fileName: String?
    let sourcePath: String?
    let currentPath: String?
    let destinationID: UUID?
    let destinationName: String?
    let snoozedUntil: Date?

    init(
        id: UUID = UUID(),
        message: String,
        date: Date = Date(),
        status: ActivityRecordStatus = .note,
        fileName: String? = nil,
        sourcePath: String? = nil,
        currentPath: String? = nil,
        destinationID: UUID? = nil,
        destinationName: String? = nil,
        snoozedUntil: Date? = nil
    ) {
        self.id = id
        self.message = message
        self.date = date
        self.status = status
        self.fileName = fileName
        self.sourcePath = sourcePath
        self.currentPath = currentPath
        self.destinationID = destinationID
        self.destinationName = destinationName
        self.snoozedUntil = snoozedUntil
    }

    private enum CodingKeys: String, CodingKey {
        case id
        case message
        case date
        case status
        case fileName
        case sourcePath
        case currentPath
        case destinationID
        case destinationName
        case snoozedUntil
    }

    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)

        id = try container.decode(UUID.self, forKey: .id)
        message = try container.decode(String.self, forKey: .message)
        date = try container.decode(Date.self, forKey: .date)
        status = try container.decodeIfPresent(ActivityRecordStatus.self, forKey: .status) ?? .note
        fileName = try container.decodeIfPresent(String.self, forKey: .fileName)
        sourcePath = try container.decodeIfPresent(String.self, forKey: .sourcePath)
        currentPath = try container.decodeIfPresent(String.self, forKey: .currentPath)
        destinationID = try container.decodeIfPresent(UUID.self, forKey: .destinationID)
        destinationName = try container.decodeIfPresent(String.self, forKey: .destinationName)
        snoozedUntil = try container.decodeIfPresent(Date.self, forKey: .snoozedUntil)
    }
}
