import Foundation

enum MoveBehavior: String, Codable, CaseIterable, Identifiable {
    case askFirst
    case autoMove

    var id: String {
        rawValue
    }

    var label: String {
        switch self {
        case .askFirst:
            "Ask First"
        case .autoMove:
            "Auto Move"
        }
    }

    var summary: String {
        switch self {
        case .askFirst:
            "Ask first"
        case .autoMove:
            "Auto move"
        }
    }
}
