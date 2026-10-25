import { useState } from "react";

import { findDuplicateExtensions } from "../../../../shared/rules/findDuplicateExtensions";
import { normalizeFileTypeList } from "../../../../shared/rules/normalizeFileTypeList";
import { actions } from "../../state/actions";
import { useSnapshot } from "../../state/useSnapshot";
import { DestinationSelect } from "../Components/DestinationSelect";
import { Sheet } from "../Components/Sheet";

type RuleEditorSheetProps = {
  ruleId: string | null;
  onClose: () => void;
};

export function RuleEditorSheet({ ruleId, onClose }: RuleEditorSheetProps) {
  const { rules, destinations } = useSnapshot();
  const rule = rules.find((candidate) => candidate.id === ruleId) ?? null;
  const [extensionText, setExtensionText] = useState(
    rule?.extensions.map((extension) => `.${extension}`).join(", ") ?? "",
  );
  const [destinationId, setDestinationId] = useState<string | null>(
    rule?.destinationId ?? destinations[0]?.id ?? null,
  );

  const extensions = normalizeFileTypeList(extensionText);
  const duplicates = findDuplicateExtensions(extensions, rules, rule?.id ?? null);
  const destination = destinations.find((candidate) => candidate.id === destinationId);
  const canSave = extensions.length > 0 && destination !== undefined && duplicates.length === 0;
  const preview =
    extensions.length > 0 && destination
      ? `Files ending in ${extensions.map((extension) => `.${extension}`).join(" or ")} will move to ${destination.name}.`
      : "Files with these endings will move to the folder you choose.";

  const save = () => {
    if (canSave && destinationId) {
      void actions.saveRule(rule?.id ?? null, extensionText, destinationId);
      onClose();
    }
  };

  const title = rule ? "Edit Rule" : "Add Rule";

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
        <input
          className="text-field"
          autoFocus
          aria-label="File endings"
          placeholder=".pdf, .docx, .png"
          value={extensionText}
          onChange={(event) => setExtensionText(event.target.value)}
        />
        <DestinationSelect label="Destination" value={destinationId} onChange={setDestinationId} />
        <p className="footnote">{preview}</p>
        {duplicates.length > 0 && (
          <p className="error-text">
            {duplicates.map((extension) => `.${extension}`).join(", ")} already has a rule.
          </p>
        )}
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
