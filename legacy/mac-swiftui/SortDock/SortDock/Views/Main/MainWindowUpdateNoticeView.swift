import SwiftUI

struct MainWindowUpdateNoticeView: View {
    @EnvironmentObject private var updateChecker: AppStoreUpdateChecker

    let update: AppStoreUpdate

    var body: some View {
        HStack(alignment: .center, spacing: 12) {
            Image(systemName: "arrow.down.circle.fill")
                .font(.title2)
                .foregroundStyle(DesignTokens.accent)

            VStack(alignment: .leading, spacing: 2) {
                Text("A newer version of SortDock is ready")
                    .font(.headline)
                Text("Version \(update.version) is available in the App Store.")
                    .font(.callout)
                    .foregroundStyle(DesignTokens.mutedText)
            }

            Spacer(minLength: 8)

            Button("Update SortDock") {
                updateChecker.openAvailableUpdate()
            }
            .buttonStyle(PrimaryButtonStyle())
        }
        .padding(14)
        .background(DesignTokens.panelBackground)
    }
}
