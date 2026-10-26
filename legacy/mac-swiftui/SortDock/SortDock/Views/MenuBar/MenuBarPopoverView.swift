import SwiftUI

struct MenuBarPopoverView: View {
    @Environment(\.openWindow) private var openWindow
    @EnvironmentObject private var store: SortDockStore
    @EnvironmentObject private var presentation: AppPresentationCoordinator
    @EnvironmentObject private var updateChecker: AppStoreUpdateChecker

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            if let update = updateChecker.availableUpdate {
                MenuBarUpdateNoticeView(update: update)
                Divider()
            }

            HStack {
                StatusPillView()
                Spacer()
            }

            VStack(alignment: .leading, spacing: 4) {
                Text(store.watchedFolderURL.lastPathComponent)
                    .font(.headline)
                Text(store.lastActivityText)
                    .font(.footnote)
                    .foregroundStyle(DesignTokens.mutedText)
                    .lineLimit(2)
            }

            if let prompt = store.promptQueue.current {
                Divider()
                PendingMovePromptView(
                    prompt: prompt,
                    position: store.promptQueue.count,
                    askLaterEnabled: store.settings.askLaterEnabled
                ) { choice in
                    store.resolveActivePrompt(choice)
                }
            }

            Divider()

            Button("Open SortDock") {
                openSortDock()
            }

            Button("History") {
                openSortDock(showingHistory: true)
            }

            Button(store.settings.isSortingEnabled ? "Pause Sorting" : "Resume Sorting") {
                store.toggleSorting()
            }

            Button("Run Setup Again") { openSortDock(showingSetup: true) }

            Divider()
            Button("Quit SortDock") { NSApp.terminate(nil) }
        }
        .padding(12)
        .frame(width: 300)
    }

    private func openSortDock(showingHistory: Bool = false, showingSetup: Bool = false) {
        presentation.showFullApp()

        if showingHistory {
            store.showHistory()
        }
        if showingSetup { store.runSetupAgain() }

        openWindow(id: "main")
    }
}
