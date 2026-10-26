import Foundation

enum DestinationAvailability: Equatable {
    case available
    case missing
    case needsAccess

    var message: String? {
        switch self {
        case .available:
            nil
        case .missing:
            "Folder is missing"
        case .needsAccess:
            "Missing or unavailable"
        }
    }
}
