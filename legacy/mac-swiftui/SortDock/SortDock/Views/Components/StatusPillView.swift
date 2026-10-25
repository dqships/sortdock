import SwiftUI

struct StatusPillView: View {
    @EnvironmentObject private var store: SortDockStore

    var body: some View {
        HStack(spacing: 7) {
            Circle()
                .fill(statusColor)
                .frame(width: 8, height: 8)
            Text(store.currentStatusTitle)
                .font(.callout.weight(.medium))
        }
        .padding(.horizontal, 10)
        .frame(height: 28)
        .background(
            Capsule()
                .fill(DesignTokens.panelBackground)
        )
        .overlay(
            Capsule()
                .stroke(DesignTokens.line, lineWidth: 1)
        )
        .accessibilityElement(children: .combine)
    }

    private var statusColor: Color {
        if !store.settings.isSortingEnabled {
            return DesignTokens.mutedText
        }

        if store.settings.watchedFolderBookmark == nil {
            return DesignTokens.warning
        }

        return DesignTokens.active
    }
}
