import AppKit

enum DockVisibilityCoordinator {
    static func activate() {
        NSApp.activate(ignoringOtherApps: true)
    }

    static func hideDockIconIfNoVisibleWindow() {
        guard !NSApp.windows.contains(where: { $0.isVisible && !($0 is NSPanel) }) else {
            return
        }

        hideDockIcon()
    }

    static func hideDockIcon() {
        NSApp.setActivationPolicy(.accessory)
    }

    static func showDockIcon() {
        NSApp.setActivationPolicy(.regular)
    }
}
