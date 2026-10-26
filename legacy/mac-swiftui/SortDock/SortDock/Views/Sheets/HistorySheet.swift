import SwiftUI

struct HistorySheet: View {
    @Environment(\.dismiss) private var dismiss
    @EnvironmentObject private var store: SortDockStore
    @State private var selectedActivityID: UUID?

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            HStack {
                Text("History")
                    .font(.title3.weight(.semibold))
                Spacer()
                Button("Clear History", role: .destructive) {
                    store.clearHistory()
                }
                .disabled(store.activities.isEmpty)
                Button("Done") {
                    dismiss()
                }
                .keyboardShortcut(.cancelAction)
            }
            .padding(16)

            Divider()

            if store.activities.isEmpty {
                HistoryEmptyStateView()
            } else {
                HStack(spacing: 0) {
                    List(store.activities, selection: $selectedActivityID) { activity in
                        HistoryListRowView(activity: activity)
                            .tag(activity.id as UUID?)
                    }
                    .frame(width: 260)

                    Divider()

                    if let selectedActivity {
                        HistoryDetailView(activity: selectedActivity)
                            .id(selectedActivity.id)
                    }
                }
            }
        }
        .frame(width: 660, height: 430)
        .onAppear {
            selectedActivityID = selectedActivityID ?? store.activities.first?.id
        }
        .onChange(of: store.activities) { _, activities in
            guard !activities.contains(where: { $0.id == selectedActivityID }) else {
                return
            }

            selectedActivityID = activities.first?.id
        }
    }

    private var selectedActivity: ActivityRecord? {
        guard let selectedActivityID,
              let activity = store.activities.first(where: { $0.id == selectedActivityID })
        else {
            return store.activities.first
        }

        return activity
    }
}
