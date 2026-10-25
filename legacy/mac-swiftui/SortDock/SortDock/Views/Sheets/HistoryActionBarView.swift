import SwiftUI

struct HistoryActionBarView: View {
    @EnvironmentObject private var store: SortDockStore

    let activity: ActivityRecord

    var body: some View {
        if hasActions {
            HStack(spacing: 8) {
                if store.canRevealActivity(activity) {
                    Button {
                        store.revealActivity(activity)
                    } label: {
                        Label("Go to File", systemImage: "arrow.up.forward.app")
                    }
                }

                Spacer()

                if store.canLeaveActivity(activity) {
                    Button("Leave") {
                        store.leaveActivity(activity)
                    }
                }

                if store.canChooseFolderForActivity(activity) {
                    Button {
                        store.chooseFolderForActivity(activity)
                    } label: {
                        Label("Choose...", systemImage: "folder")
                    }
                }

                if store.canMoveActivity(activity) {
                    Button {
                        store.moveActivity(activity)
                    } label: {
                        Label("Move", systemImage: "arrow.right")
                    }
                    .buttonStyle(PrimaryButtonStyle())
                }
            }
        } else {
            Text("No actions available.")
                .font(.footnote)
                .foregroundStyle(DesignTokens.mutedText)
                .frame(maxWidth: .infinity, alignment: .leading)
        }
    }

    private var hasActions: Bool {
        store.canRevealActivity(activity)
            || store.canLeaveActivity(activity)
            || store.canChooseFolderForActivity(activity)
            || store.canMoveActivity(activity)
    }
}
