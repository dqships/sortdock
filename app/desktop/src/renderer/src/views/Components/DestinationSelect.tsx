import { destinationLabel } from "../../state/destinationLabel";
import { useSnapshot } from "../../state/useSnapshot";

type DestinationSelectProps = {
  label: string;
  value: string | null;
  onChange: (destinationId: string | null) => void;
  emptyOptionLabel?: string;
};

/** Picks one destination folder. Pass emptyOptionLabel to allow "no folder". */
export function DestinationSelect({ label, value, onChange, emptyOptionLabel }: DestinationSelectProps) {
  const { destinations } = useSnapshot();

  return (
    <label className="inline-field">
      <span>{label}</span>
      <select
        className="select-field"
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value || null)}
      >
        {emptyOptionLabel !== undefined && <option value="">{emptyOptionLabel}</option>}
        {destinations.map((destination) => (
          <option key={destination.id} value={destination.id}>
            {destinationLabel(destination)}
          </option>
        ))}
      </select>
    </label>
  );
}
