import Foundation

enum DelayOption: String, Codable, CaseIterable, Identifiable {
    case threeSeconds
    case tenSeconds
    case thirtySeconds
    case oneMinute
    case custom

    var id: String {
        rawValue
    }

    var label: String {
        switch self {
        case .threeSeconds:
            "3 sec"
        case .tenSeconds:
            "10 sec"
        case .thirtySeconds:
            "30 sec"
        case .oneMinute:
            "1 min"
        case .custom:
            "Custom"
        }
    }

    func seconds(customValue: Double) -> Double {
        switch self {
        case .threeSeconds:
            3
        case .tenSeconds:
            10
        case .thirtySeconds:
            30
        case .oneMinute:
            60
        case .custom:
            max(1, customValue)
        }
    }
}
