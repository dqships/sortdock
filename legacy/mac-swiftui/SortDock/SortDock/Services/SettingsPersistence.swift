import Foundation

final class SettingsPersistence {
    private let defaults = UserDefaults.standard
    private let key = "sortdock.configuration.v1"

    func load() -> SortDockConfiguration {
        guard let data = defaults.data(forKey: key) else {
            return SortDockConfiguration.defaultValue()
        }

        do {
            return try JSONDecoder().decode(SortDockConfiguration.self, from: data)
        } catch {
            return SortDockConfiguration.defaultValue()
        }
    }

    func save(_ configuration: SortDockConfiguration) {
        do {
            let data = try JSONEncoder().encode(configuration)
            defaults.set(data, forKey: key)
        } catch {
            assertionFailure("Could not save SortDock settings: \(error)")
        }
    }
}
