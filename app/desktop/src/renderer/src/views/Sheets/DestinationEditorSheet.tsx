import { useState } from "react";

import { actions } from "../../state/actions";
import { useSnapshot } from "../../state/useSnapshot";
import { Sheet } from "../Components/Sheet";

type DestinationEditorSheetProps = {
  destinationId: string | null;
  onClose: () => void;
};

export function DestinationEditorSheet({ destinationId, onClose }: DestinationEditorSheetProps) {
  const { destinations, watchedFolderName } = useSnapshot();
  const destination = destinations.find((candidate) => candidate.id === destinationId) ?? null;
  const [name, setName] = useState(destination?.name ?? "");
  const canSave = name.trim().length > 0;
  const title = destination ? "Rename Destination" : "New Destination Folder";

  const save = () => {
    if (!canSave) {
      return;
    }

    if (destination) {
      void actions.renameDestination(destination.id, name);
    } else {
      void actions.addDestination(name);
    }

    onClose();
  };

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
          aria-label="Folder name"
          placeholder="Folder name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        {!destination && (
          <p className="footnote">SortDock will make this folder inside {watchedFolderName} when it is first needed.</p>
        )}
        <div className="sheet-actions">
          <button type="button" className="button" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="button button-primary" disabled={!canSave}>
            {destination ? "Save" : "Add"}
          </button>
        </div>
      </form>
    </Sheet>
  );
}
