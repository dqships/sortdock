import SwiftUI

struct MainWindowView: View {
    @EnvironmentObject private var store: SortDockStore
    @EnvironmentObject private var updateChecker: AppStoreUpdateChecker
    @State private var destinationEditorDestination: DestinationFolder?
    @State private var isDestinationEditorPresented = false
    @State private var keywordRuleEditorPresentation: KeywordRuleEditorPresentation?
    @State private var isRuleEditorPresented = false
    @State private var ruleEditorRule: RoutingRule?

    var body: some View {
        VStack(spacing: 0) {
            StatusStripView()
            if let update = updateChecker.availableUpdate {
                MainWindowUpdateNoticeView(update: update)
                Divider()
            }
            Divider()
            ScrollView(.vertical) {
                HStack(alignment: .top, spacing: 16) {
                    VStack(alignment: .leading, spacing: 16) {
                        WatchFolderPanel()
                        DestinationListView(
                            onAddNamedFolder: openAddDestination,
                            onChooseFolder: store.chooseDestinationFolder,
                            onRename: openRenameDestination
                        )
                    }
                    .frame(width: 220)

                    VStack(alignment: .leading, spacing: 16) {
                        KeywordRulesView(
                            onAddRule: openAddKeywordRule,
                            onEditRule: openEditKeywordRule
                        )
                        RoutingRailView(
                            onAddRule: openAddRule,
                            onEditRule: openEditRule
                        )
                        BehaviorSettingsView()
                        AppearanceSettingsView()
                    }
                    .frame(maxWidth: .infinity, alignment: .topLeading)
                }
                .padding(16)
                .frame(maxWidth: .infinity, alignment: .topLeading)
            }
            Divider()
            ActivityStatusLine()
        }
        .background(DesignTokens.raisedBackground)
        .sheet(isPresented: $isRuleEditorPresented) {
            RuleEditorSheet(rule: ruleEditorRule)
                .environmentObject(store)
        }
        .sheet(isPresented: $isDestinationEditorPresented) {
            DestinationEditorSheet(destination: destinationEditorDestination)
                .environmentObject(store)
        }
        .sheet(item: $keywordRuleEditorPresentation) { presentation in
            KeywordRuleEditorSheet(rule: presentation.rule)
                .environmentObject(store)
        }
        .sheet(isPresented: $store.isHistoryPresented) {
            HistorySheet()
                .environmentObject(store)
        }
    }

    private func openAddDestination() {
        destinationEditorDestination = nil
        isDestinationEditorPresented = true
    }

    private func openAddRule() {
        ruleEditorRule = nil
        isRuleEditorPresented = true
    }

    private func openAddKeywordRule() {
        keywordRuleEditorPresentation = KeywordRuleEditorPresentation(rule: nil)
    }

    private func openEditRule(_ rule: RoutingRule) {
        ruleEditorRule = rule
        isRuleEditorPresented = true
    }

    private func openEditKeywordRule(_ rule: KeywordRule) {
        keywordRuleEditorPresentation = KeywordRuleEditorPresentation(rule: rule)
    }

    private func openRenameDestination(_ destination: DestinationFolder) {
        destinationEditorDestination = destination
        isDestinationEditorPresented = true
    }
}
