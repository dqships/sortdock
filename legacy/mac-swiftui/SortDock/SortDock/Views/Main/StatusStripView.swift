import SwiftUI

struct StatusStripView: View {
    @EnvironmentObject private var store: SortDockStore

    var body: some View {
        HStack(spacing: 12) {
            AppIconView(size: 34)

            VStack(alignment: .leading, spacing: 2) {
                Text("SortDock")
                    .font(.title3.weight(.semibold))
                Text(store.currentStatusSummary)
                    .font(.callout)
                    .foregroundStyle(DesignTokens.mutedText)
                    .lineLimit(1)
            }

            Spacer()

            StatusPillView()

            statusActionButton
        }
        .padding(.horizontal, 16)
        .padding(.vertical, 12)
        .background(DesignTokens.raisedBackground)
    }

    @ViewBuilder
    private var statusActionButton: some View {
        if store.settings.isSortingEnabled {
            Button("Pause") {
                store.toggleSorting()
            }
            .buttonStyle(.bordered)
        } else {
            Button("Resume") {
                store.toggleSorting()
            }
            .buttonStyle(PrimaryButtonStyle())
        }
    }
}
