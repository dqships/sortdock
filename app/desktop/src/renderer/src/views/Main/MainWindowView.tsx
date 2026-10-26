import { useState } from "react";

import { actions } from "../../state/actions";
import { useSnapshot } from "../../state/useSnapshot";
import { ActivityStatusLine } from "../Components/ActivityStatusLine";
import { DestinationEditorSheet } from "../Sheets/DestinationEditorSheet";
import { HistorySheet } from "../Sheets/HistorySheet";
import { KeywordRuleEditorSheet } from "../Sheets/KeywordRuleEditorSheet";
import { RuleEditorSheet } from "../Sheets/RuleEditorSheet";
import { AppearanceSettingsView } from "./AppearanceSettingsView";
import { BehaviorSettingsView } from "./BehaviorSettingsView";
import { DestinationListView } from "./DestinationListView";
import { KeywordRulesView } from "./KeywordRulesView";
import type { OpenSheet } from "./OpenSheet";
import { PendingPromptView } from "./PendingPromptView";
import { RoutingRailView } from "./RoutingRailView";
import { StatusStripView } from "./StatusStripView";
import { UpdateNoticeView } from "./UpdateNoticeView";
import { WatchFolderPanel } from "./WatchFolderPanel";

export function MainWindowView() {
  const snapshot = useSnapshot();
  const [openSheet, setOpenSheet] = useState<OpenSheet>(null);
  const closeSheet = () => setOpenSheet(null);

  return (
    <div className="window">
      <StatusStripView />
      {snapshot.availableUpdate ? <UpdateNoticeView update={snapshot.availableUpdate} /> : <div />}
      {snapshot.prompts[0] ? <PendingPromptView prompt={snapshot.prompts[0]} /> : <div />}

      <main className="window-body">
        <div className="columns">
          <div className="column">
            <WatchFolderPanel />
            <DestinationListView
              onAddNamedFolder={() => setOpenSheet({ kind: "destination", destinationId: null })}
              onRename={(destinationId) => setOpenSheet({ kind: "destination", destinationId })}
            />
          </div>
          <div className="column">
            <KeywordRulesView
              onAddRule={() => setOpenSheet({ kind: "keywordRule", ruleId: null })}
              onEditRule={(ruleId) => setOpenSheet({ kind: "keywordRule", ruleId })}
            />
            <RoutingRailView
              onAddRule={() => setOpenSheet({ kind: "rule", ruleId: null })}
              onEditRule={(ruleId) => setOpenSheet({ kind: "rule", ruleId })}
            />
            <BehaviorSettingsView />
            <AppearanceSettingsView />
          </div>
        </div>
      </main>

      <ActivityStatusLine />

      {openSheet?.kind === "rule" && <RuleEditorSheet ruleId={openSheet.ruleId} onClose={closeSheet} />}
      {openSheet?.kind === "keywordRule" && <KeywordRuleEditorSheet ruleId={openSheet.ruleId} onClose={closeSheet} />}
      {openSheet?.kind === "destination" && (
        <DestinationEditorSheet destinationId={openSheet.destinationId} onClose={closeSheet} />
      )}
      {snapshot.isHistoryPresented && <HistorySheet onClose={() => void actions.hideHistory()} />}
    </div>
  );
}
