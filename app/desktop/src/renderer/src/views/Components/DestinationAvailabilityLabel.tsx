import type { DestinationAvailability } from "../../../../shared/models/DestinationAvailability";
import { destinationAvailabilityMessage } from "../../../../shared/labels/destinationAvailabilityMessage";
import { WarningIcon } from "../Icons/WarningIcon";

export function DestinationAvailabilityLabel({ availability }: { availability: DestinationAvailability }) {
  const message = destinationAvailabilityMessage(availability);

  if (!message) {
    return null;
  }

  return (
    <span className="availability-label">
      <span className={availability === "missing" ? "availability-missing" : "availability-needs-access"}>
        <WarningIcon />
      </span>
      {message}
    </span>
  );
}
