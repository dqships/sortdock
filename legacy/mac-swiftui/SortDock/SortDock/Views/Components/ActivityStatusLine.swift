import SwiftUI

struct ActivityStatusLine: View {
    @EnvironmentObject private var store: SortDockStore

    var body: some View {
        HStack(spacing: 8) {
            Image(systemName: "clock")
                .foregroundStyle(DesignTokens.mutedText)
            Text(store.lastActivityText)
                .lineLimit(1)
                .foregroundStyle(DesignTokens.mutedText)
            Spacer()
            Button("History") {
                store.showHistory()
            }
            .buttonStyle(.borderless)
        }
        .font(.footnote)
        .padding(.horizontal, 16)
        .padding(.vertical, 10)
        .background(DesignTokens.panelBackground)
    }
}
