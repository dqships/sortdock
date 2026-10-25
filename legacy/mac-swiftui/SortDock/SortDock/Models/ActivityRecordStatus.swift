import Foundation

enum ActivityRecordStatus: String, Codable, Equatable {
    case moved
    case left
    case waiting
    case failed
    case note

    var title: String {
        switch self {
        case .moved:
            "Moved"
        case .left:
            "Left"
        case .waiting:
            "Waiting"
        case .failed:
            "Needs attention"
        case .note:
            "History"
        }
    }
}
