import Foundation

enum AppStoreVersionComparator {
    static func isNewer(_ availableVersion: String, than installedVersion: String) -> Bool {
        availableVersion.compare(installedVersion, options: .numeric) == .orderedDescending
    }
}
