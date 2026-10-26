import SwiftUI

struct HistoryDetailView: View {
    @EnvironmentObject private var store: SortDockStore

    let activity: ActivityRecord

    var body: some View {
        VStack(alignment: .leading, spacing: 14) {
            HStack(alignment: .top, spacing: 10) {
                ActivityStatusSymbolView(status: activity.status, size: 18)

                VStack(alignment: .leading, spacing: 3) {
                    Text(activity.fileName ?? "History")
                        .font(.headline)
                        .lineLimit(2)
                    Text(activity.message)
                        .font(.callout)
                        .foregroundStyle(DesignTokens.mutedText)
                        .lineLimit(3)
                }

                Spacer()

                Text(activity.status.title)
                    .font(.caption.weight(.medium))
                    .foregroundStyle(DesignTokens.mutedText)
            }

            Divider()

            VStack(alignment: .leading, spacing: 10) {
                HistoryDetailRowView(title: "Status", value: activity.status.title)

                if let destinationName = store.suggestedDestinationName(for: activity) {
                    HistoryDetailRowView(title: "Folder", value: destinationName)
                }

                HistoryDetailRowView(title: "When", value: formattedDate)

                if activity.status == .waiting {
                    TimelineView(.periodic(from: Date(), by: 1)) { context in
                        HistoryDetailRowView(title: "Ask Later", value: snoozeText(now: context.date))
                    }
                }
            }

            if !store.canRevealActivity(activity), activity.status != .note {
                Text("SortDock cannot find this file anymore.")
                    .font(.footnote)
                    .foregroundStyle(DesignTokens.mutedText)
            }

            Spacer()

            HistoryActionBarView(activity: activity)
        }
        .padding(16)
    }

    private var formattedDate: String {
        activity.date.formatted(date: .abbreviated, time: .shortened)
    }

    private func snoozeText(now: Date) -> String {
        guard let snoozedUntil = activity.snoozedUntil else {
            return "Ready now"
        }

        let remaining = max(0, snoozedUntil.timeIntervalSince(now))

        guard remaining > 0 else {
            return "Ready now"
        }

        let formatter = DateComponentsFormatter()
        formatter.allowedUnits = remaining >= 3_600 ? [.hour, .minute] : [.minute, .second]
        formatter.unitsStyle = .abbreviated

        return "\(formatter.string(from: remaining) ?? "Soon") remaining"
    }
}
