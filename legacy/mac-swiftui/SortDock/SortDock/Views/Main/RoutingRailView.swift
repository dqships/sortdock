import SwiftUI

struct RoutingRailView: View {
    let onAddRule: () -> Void
    let onEditRule: (RoutingRule) -> Void

    @EnvironmentObject private var store: SortDockStore

    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            HStack {
                SectionTitleView(title: "File Types")
                Spacer()
                Button(action: onAddRule) {
                    Label("Add Rule", systemImage: "plus")
                }
                .buttonStyle(.borderless)
            }

            if store.rules.isEmpty {
                EmptyRuleStateView(onAddRule: onAddRule)
            } else {
                VStack(spacing: 7) {
                    ForEach(store.rules) { rule in
                        RoutingRuleRowView(
                            rule: rule,
                            destinationName: store.destinationName(for: rule),
                            isSelected: store.selectedRuleID == rule.id,
                            onEdit: {
                                store.selectedRuleID = rule.id
                                onEditRule(rule)
                            },
                            onDuplicate: {
                                store.duplicateRule(rule)
                            },
                            onDelete: {
                                store.deleteRule(rule)
                            }
                        )
                    }

                    HStack(spacing: 10) {
                        Text("Other files")
                            .font(.callout)
                            .foregroundStyle(DesignTokens.mutedText)
                            .frame(maxWidth: .infinity, alignment: .trailing)
                        Rectangle()
                            .fill(DesignTokens.line)
                            .frame(width: 2, height: 24)
                        Text(store.settings.defaultDestinationID == nil ? "Leave in place" : "Default folder")
                            .font(.callout)
                            .foregroundStyle(DesignTokens.mutedText)
                            .frame(maxWidth: .infinity, alignment: .leading)
                    }
                    .padding(.vertical, 5)
                }
            }
        }
    }
}
