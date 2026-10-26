import Foundation

enum SnoozeOption: String, Codable, CaseIterable, Identifiable {
    case fiveMinutes
    case tenMinutes
    case thirtyMinutes
    case oneHour
    case custom

    var id: String {
        rawValue
    }

    var label: String {
        switch self {
        case .fiveMinutes:
            "5 min"
        case .tenMinutes:
            "10 min"
        case .thirtyMinutes:
            "30 min"
        case .oneHour:
            "1 hour"
        case .custom:
            "Custom"
        }
    }

    func seconds(customMinutes: Double) -> Double {
        switch self {
        case .fiveMinutes:
            300
        case .tenMinutes:
            600
        case .thirtyMinutes:
            1_800
        case .oneHour:
            3_600
        case .custom:
            max(1, customMinutes) * 60
        }
    }
}
