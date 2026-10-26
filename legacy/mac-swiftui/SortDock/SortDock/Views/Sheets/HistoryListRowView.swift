import SwiftUI

struct HistoryListRowView: View {
    let activity: ActivityRecord

    var body: some View {
        HStack(alignment: .top, spacing: 8) {
            ActivityStatusSymbolView(status: activity.status)
                .padding(.top, 2)

            VStack(alignment: .leading, spacing: 3) {
                Text(title)
                    .font(.callout.weight(.medium))
                    .lineLimit(1)

                if let subtitle {
                    Text(subtitle)
                        .font(.caption)
                        .foregroundStyle(DesignTokens.mutedText)
                        .lineLimit(2)
                }

                Text(activity.date, format: .dateTime.month(.abbreviated).day().hour().minute())
                    .font(.caption2)
                    .foregroundStyle(DesignTokens.mutedText)
            }
        }
        .padding(.vertical, 4)
        .accessibilityElement(children: .combine)
        .accessibilityLabel("\(activity.status.title), \(activity.message)")
    }

    private var subtitle: String? {
        activity.fileName == nil ? nil : activity.message
    }

    private var title: String {
        activity.fileName ?? activity.message
    }
}
