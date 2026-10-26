import SwiftUI

struct HistoryEmptyStateView: View {
    var body: some View {
        VStack(spacing: 8) {
            Image(systemName: "clock")
                .font(.title2)
                .foregroundStyle(DesignTokens.mutedText)
            Text("No history yet.")
                .font(.headline)
            Text("Files will appear here after SortDock sees them.")
                .font(.callout)
                .foregroundStyle(DesignTokens.mutedText)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .padding(24)
    }
}
