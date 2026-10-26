import SwiftUI

struct WatchFolderPanel: View {
    @EnvironmentObject private var store: SortDockStore

    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            SectionTitleView(title: "Watch Folder")

            HStack(spacing: 8) {
                Image(systemName: "folder")
                    .foregroundStyle(DesignTokens.accent)
                Text(store.watchedFolderURL.path)
                    .font(.callout)
                    .lineLimit(2)
                    .truncationMode(.middle)
            }

            if store.settings.watchedFolderBookmark == nil {
                Text("SortDock needs access to this folder so it can move files you choose.")
                    .font(.footnote)
                    .foregroundStyle(DesignTokens.mutedText)
                    .fixedSize(horizontal: false, vertical: true)
            }

            Button(store.settings.watchedFolderBookmark == nil ? "Give Folder Access" : "Change...") {
                store.chooseWatchedFolder()
            }
        }
        .padding(12)
        .background(
            RoundedRectangle(cornerRadius: 8, style: .continuous)
                .fill(DesignTokens.panelBackground)
        )
        .overlay(
            RoundedRectangle(cornerRadius: 8, style: .continuous)
                .stroke(DesignTokens.line, lineWidth: 1)
        )
    }
}
