import SwiftUI

struct HistoryDetailRowView: View {
    let title: String
    let value: String

    var body: some View {
        HStack(alignment: .top, spacing: 10) {
            Text(title)
                .foregroundStyle(DesignTokens.mutedText)
                .frame(width: 76, alignment: .leading)
            Text(value)
                .textSelection(.enabled)
                .frame(maxWidth: .infinity, alignment: .leading)
        }
        .font(.callout)
    }
}
