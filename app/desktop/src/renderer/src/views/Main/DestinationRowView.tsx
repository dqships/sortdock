import type { DestinationSnapshot } from "../../../../shared/models/DestinationSnapshot";
import { destinationAvailabilityMessage } from "../../../../shared/labels/destinationAvailabilityMessage";
import { actions } from "../../state/actions";
import { useSnapshot } from "../../state/useSnapshot";
import { DestinationAvailabilityLabel } from "../Components/DestinationAvailabilityLabel";
import { OptionsMenu } from "../Components/OptionsMenu";
import { EllipsisIcon } from "../Icons/EllipsisIcon";
import { FolderIcon } from "../Icons/FolderIcon";

type DestinationRowViewProps = {
  destination: DestinationSnapshot;
  isSelected: boolean;
  onSelect: () => void;
  onRename: () => void;
};

export function DestinationRowView({ destination, isSelected, onSelect, onRename }: DestinationRowViewProps) {
  const { watchedFolderName } = useSnapshot();
  const message = destinationAvailabilityMessage(destination.availability);

  return (
    <div
      className="destination-row"
      aria-current={isSelected}
      title={destination.folderPath ?? `Inside ${watchedFolderName}`}
    >
      <button
        type="button"
        className="destination-select"
        onClick={onSelect}
        aria-label={message ? `${destination.name}, ${message}` : destination.name}
      >
        <FolderIcon />
        <span className="stacked-text">
          <span className="truncate">{destination.name}</span>
          <DestinationAvailabilityLabel availability={destination.availability} />
        </span>
      </button>
      <OptionsMenu
        label={`More options for ${destination.name}`}
        icon={<EllipsisIcon />}
        items={[
          { label: "Rename", onSelect: onRename },
          { label: "Choose Folder…", onSelect: () => void actions.reconnectDestination(destination.id) },
          { label: "Remove", onSelect: () => void actions.removeDestination(destination.id), isDestructive: true },
        ]}
      />
    </div>
  );
}
