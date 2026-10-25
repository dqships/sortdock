import AppKit
import Combine

@MainActor
final class AppPresentationCoordinator: ObservableObject {
    enum Mode: Equatable { case onboarding, menuBarOnly, fullApp, systemPanel }

    @Published private(set) var mode: Mode = .menuBarOnly

    func beginLaunch(needsOnboarding: Bool) {
        if needsOnboarding {
            showOnboarding()
        } else {
            returnToMenuBar()
            if ProcessInfo.processInfo.environment["XCTestConfigurationFilePath"] == nil {
                DispatchQueue.main.async { [weak self] in
                    self?.mainWindow?.orderOut(nil)
                }
            }
        }
    }

    func showOnboarding() {
        mode = .onboarding
        NSApp.setActivationPolicy(.regular)
        NSApp.activate(ignoringOtherApps: true)
        mainWindow?.makeKeyAndOrderFront(nil)
    }

    func showFullApp() {
        mode = .fullApp
        NSApp.setActivationPolicy(.regular)
        NSApp.activate(ignoringOtherApps: true)
        mainWindow?.makeKeyAndOrderFront(nil)
    }

    func returnToMenuBar() {
        guard mode != .onboarding else { return }
        mode = .menuBarOnly
        NSApp.setActivationPolicy(.accessory)
    }

    func beginSystemPanel() {
        mode = .systemPanel
        NSApp.setActivationPolicy(.regular)
        NSApp.activate(ignoringOtherApps: true)
    }

    func endSystemPanel() {
        returnToMenuBar()
    }

    private var mainWindow: NSWindow? {
        NSApp.windows.first { $0.title == "SortDock" }
    }
}
