import AppKit
import Combine
import Foundation

@MainActor
final class AppStoreUpdateChecker: ObservableObject {
    @Published private(set) var availableUpdate: AppStoreUpdate?

    private let bundleIdentifier: String?
    private let installedVersion: String?
    private let session: URLSession
    private var isChecking = false

    init(
        bundleIdentifier: String? = Bundle.main.bundleIdentifier,
        installedVersion: String? = Bundle.main.object(forInfoDictionaryKey: "CFBundleShortVersionString") as? String,
        session: URLSession? = nil
    ) {
        self.bundleIdentifier = bundleIdentifier
        self.installedVersion = installedVersion
        self.session = session ?? Self.makeSession()
    }

    func checkForUpdate() async {
        guard !isChecking,
              let bundleIdentifier,
              let installedVersion,
              let lookupURL = lookupURL(for: bundleIdentifier)
        else {
            return
        }

        isChecking = true
        defer { isChecking = false }

        do {
            let (data, response) = try await session.data(from: lookupURL)
            guard let httpResponse = response as? HTTPURLResponse,
                  (200...299).contains(httpResponse.statusCode)
            else {
                return
            }

            let lookupResponse = try JSONDecoder().decode(AppStoreLookupResponse.self, from: data)
            guard let listing = lookupResponse.results.first,
                  AppStoreVersionComparator.isNewer(listing.version, than: installedVersion)
            else {
                availableUpdate = nil
                return
            }

            availableUpdate = AppStoreUpdate(version: listing.version, storeURL: listing.trackViewUrl)
        } catch {
            // A transport or decoding failure never interrupts sorting or hides a known update.
        }
    }

    func openAvailableUpdate() {
        guard let availableUpdate else {
            return
        }

        NSWorkspace.shared.open(availableUpdate.storeURL)
    }

    private func lookupURL(for bundleIdentifier: String) -> URL? {
        var components = URLComponents(string: "https://itunes.apple.com/lookup")
        components?.queryItems = [URLQueryItem(name: "bundleId", value: bundleIdentifier)]
        return components?.url
    }

    private static func makeSession() -> URLSession {
        let configuration = URLSessionConfiguration.ephemeral
        configuration.timeoutIntervalForRequest = 3
        configuration.timeoutIntervalForResource = 5
        return URLSession(configuration: configuration)
    }
}
