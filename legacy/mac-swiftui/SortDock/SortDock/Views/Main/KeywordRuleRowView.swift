import SwiftUI

struct KeywordRuleRowView: View {
    let rule: KeywordRule
    let destinationName: String
    let isFirst: Bool
    let isLast: Bool
    let isSelected: Bool
    let onEnabledChange: (Bool) -> Void
    let onEdit: () -> Void
    let onMoveUp: () -> Void
    let onMoveDown: () -> Void
    let onDelete: () -> Void

    var body: some View {
        HStack(spacing: 8) {
            Toggle("", isOn: enabledBinding)
                .labelsHidden()
                .toggleStyle(.checkbox)
                .accessibilityLabel("\(keywordSummary) rule")

            Button(action: onEdit) {
                VStack(alignment: .leading, spacing: 3) {
                    Text(keywordSummary)
                        .font(.callout.weight(.medium))
                        .foregroundStyle(rule.isEnabled ? Color.primary : DesignTokens.mutedText)
                        .lineLimit(1)
                    Label(destinationName, systemImage: "folder.fill")
                        .font(.caption)
                        .foregroundStyle(DesignTokens.mutedText)
                        .lineLimit(1)
                }
                .frame(maxWidth: .infinity, alignment: .leading)
                .contentShape(Rectangle())
            }
            .buttonStyle(.plain)
            .accessibilityLabel("Edit \(keywordSummary) rule, moves to \(destinationName)")

            Button(action: onMoveUp) {
                Image(systemName: "chevron.up")
            }
            .buttonStyle(.borderless)
            .disabled(isFirst)
            .help("Move rule earlier")
            .accessibilityLabel("Move \(keywordSummary) earlier")

            Button(action: onMoveDown) {
                Image(systemName: "chevron.down")
            }
            .buttonStyle(.borderless)
            .disabled(isLast)
            .help("Move rule later")
            .accessibilityLabel("Move \(keywordSummary) later")

            Menu {
                Button("Edit", action: onEdit)
                Button("Remove", role: .destructive, action: onDelete)
            } label: {
                Image(systemName: "ellipsis.circle")
                    .foregroundStyle(DesignTokens.mutedText)
            }
            .menuStyle(.borderlessButton)
            .fixedSize()
            .accessibilityLabel("More options for \(keywordSummary)")
        }
        .padding(.horizontal, 8)
        .padding(.vertical, 6)
        .background(
            RoundedRectangle(cornerRadius: 7, style: .continuous)
                .fill(isSelected ? DesignTokens.panelBackground : Color.clear)
        )
        .accessibilityElement(children: .contain)
    }

    private var enabledBinding: Binding<Bool> {
        Binding(
            get: { rule.isEnabled },
            set: onEnabledChange
        )
    }

    private var keywordSummary: String {
        rule.keywords.joined(separator: ", ")
    }
}
