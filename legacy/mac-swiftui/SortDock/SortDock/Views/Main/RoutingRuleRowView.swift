import SwiftUI

struct RoutingRuleRowView: View {
    let rule: RoutingRule
    let destinationName: String
    let isSelected: Bool
    let onEdit: () -> Void
    let onDuplicate: () -> Void
    let onDelete: () -> Void

    var body: some View {
        Button(action: onEdit) {
            HStack(spacing: 10) {
                FlowTagStack(values: rule.extensions)
                    .frame(maxWidth: .infinity, alignment: .trailing)

                ZStack {
                    Rectangle()
                        .fill(DesignTokens.accent.opacity(isSelected ? 0.95 : 0.45))
                        .frame(width: 2)
                    Circle()
                        .fill(isSelected ? DesignTokens.accent : DesignTokens.accent.opacity(0.55))
                        .frame(width: isSelected ? 9 : 7, height: isSelected ? 9 : 7)
                }
                .frame(width: 16, height: 34)

                HStack(spacing: 7) {
                    Image(systemName: "folder.fill")
                        .foregroundStyle(DesignTokens.accent)
                    Text(destinationName)
                        .lineLimit(1)
                    Spacer()
                    Image(systemName: "ellipsis.circle")
                        .foregroundStyle(DesignTokens.mutedText)
                }
                .frame(maxWidth: .infinity, alignment: .leading)
            }
            .padding(.horizontal, 8)
            .padding(.vertical, 5)
            .contentShape(Rectangle())
        }
        .buttonStyle(.plain)
        .background(
            RoundedRectangle(cornerRadius: 7, style: .continuous)
                .fill(isSelected ? DesignTokens.panelBackground : Color.clear)
        )
        .overlay(
            RoundedRectangle(cornerRadius: 7, style: .continuous)
                .stroke(isSelected ? DesignTokens.accent.opacity(0.35) : Color.clear, lineWidth: 1)
        )
        .contextMenu {
            Button("Edit", action: onEdit)
            Button("Duplicate", action: onDuplicate)
            Button("Remove", role: .destructive, action: onDelete)
        }
        .accessibilityLabel("\(rule.extensions.map { ".\($0)" }.joined(separator: ", ")) moves to \(destinationName)")
    }
}
