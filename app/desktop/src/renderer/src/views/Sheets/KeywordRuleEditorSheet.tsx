import { useState } from "react";

import { normalizeKeywordList } from "../../../../shared/rules/normalizeKeywordList";
import { actions } from "../../state/actions";
import { useSnapshot } from "../../state/useSnapshot";
import { Checkbox } from "../Components/Checkbox";
import { DestinationSelect } from "../Components/DestinationSelect";
import { Sheet } from "../Components/Sheet";

type KeywordRuleEditorSheetProps = {
  ruleId: string | null;
  onClose: () => void;
};

export function KeywordRuleEditorSheet({ ruleId, onClose }: KeywordRuleEditorSheetProps) {
  const { keywordRules, destinations } = useSnapshot();
  const rule = keywordRules.find((candidate) => candidate.id === ruleId) ?? null;
  const [keywordText, setKeywordText] = useState(rule?.keywords.join(", ") ?? "");
  const [destinationId, setDestinationId] = useState<string | null>(
    rule?.destinationId ?? destinations[0]?.id ?? null,
  );
  const [isEnabled, setIsEnabled] = useState(rule?.isEnabled ?? true);

  const keywords = normalizeKeywordList(keywordText);
  const destination = destinations.find((candidate) => candidate.id === destinationId);
  const canSave = keywords.length > 0 && destination !== undefined;
  const preview =
    keywords.length > 0 && destination
      ? `Filenames containing ${keywords.join(" or ")} will move to ${destination.name}.`
      : "Matching filenames will move to the folder you choose.";

  const save = () => {
    if (canSave && destinationId) {
      void actions.saveKeywordRule(rule?.id ?? null, keywordText, destinationId, isEnabled);
      onClose();
    }
  };

  const title = rule ? "Edit Keyword Rule" : "Add Keyword Rule";

  return (
    <Sheet title={title} onClose={onClose}>
      <form
        className="sheet-form"
        onSubmit={(event) => {
          event.preventDefault();
          save();
        }}
      >
        <h2 className="sheet-title">{title}</h2>
        <label className="field-label">
          <input
            className="text-field"
            autoFocus
            aria-label="Keywords"
            placeholder="invoice, receipt"
            value={keywordText}
            onChange={(event) => setKeywordText(event.target.value)}
          />
          <span className="footnote">Separate keywords with commas. A file only needs to match one.</span>
        </label>
        <DestinationSelect label="Destination" value={destinationId} onChange={setDestinationId} />
        <Checkbox label="Rule is active" checked={isEnabled} onChange={setIsEnabled} />
        <p className="footnote">{preview}</p>
        <div className="sheet-actions">
          <button type="button" className="button" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="button button-primary" disabled={!canSave}>
            Save Rule
          </button>
        </div>
      </form>
    </Sheet>
  );
}
