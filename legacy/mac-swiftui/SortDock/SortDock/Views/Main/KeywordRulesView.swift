import SwiftUI

struct KeywordRulesView: View {
    let onAddRule: () -> Void
    let onEditRule: (KeywordRule) -> Void

    @EnvironmentObject private var store: SortDockStore

    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            HStack {
                SectionTitleView(title: "Keywords")
                Spacer()
                Button(action: onAddRule) {
                    Label("Add Rule", systemImage: "plus")
                }
                .buttonStyle(.borderless)
            }

            Text("Rules are checked from top to bottom before file types.")
                .font(.footnote)
                .foregroundStyle(DesignTokens.mutedText)

            if store.keywordRules.isEmpty {
                Button("Add a keyword rule", action: onAddRule)
                    .buttonStyle(.bordered)
            } else {
                VStack(spacing: 3) {
                    ForEach(store.keywordRules) { rule in
                        KeywordRuleRowView(
                            rule: rule,
                            destinationName: store.destinationName(for: rule),
                            isFirst: rule.id == store.keywordRules.first?.id,
                            isLast: rule.id == store.keywordRules.last?.id,
                            isSelected: rule.id == store.selectedKeywordRuleID,
                            onEnabledChange: { isEnabled in
                                store.setKeywordRule(rule, isEnabled: isEnabled)
                            },
                            onEdit: {
                                store.selectedKeywordRuleID = rule.id
                                onEditRule(rule)
                            },
                            onMoveUp: {
                                store.moveKeywordRuleUp(rule)
                            },
                            onMoveDown: {
                                store.moveKeywordRuleDown(rule)
                            },
                            onDelete: {
                                store.deleteKeywordRule(rule)
                            }
                        )
                    }
                }
            }
        }
    }
}
