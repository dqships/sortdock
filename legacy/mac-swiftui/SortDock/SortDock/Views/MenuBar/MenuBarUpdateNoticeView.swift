import SwiftUI

struct MenuBarUpdateNoticeView: View {
    @EnvironmentObject private var updateChecker: AppStoreUpdateChecker

    let update: AppStoreUpdate

    var body: some View {
        VStack(alignment: .leading, spacing: 6) {
            Text("Update available")
                .font(.headline)
            Text("Version \(update.version) is ready in the App Store.")
                .font(.footnote)
                .foregroundStyle(DesignTokens.mutedText)
            Button("Update SortDock") {
                updateChecker.openAvailableUpdate()
            }
            .buttonStyle(.borderedProminent)
            .tint(DesignTokens.accent)
        }
    }
}
