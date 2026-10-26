import type { DestinationAvailability } from "../models/DestinationAvailability";

export function destinationAvailabilityMessage(availability: DestinationAvailability): string | null {
  switch (availability) {
    case "available":
      return null;
    case "missing":
      return "Folder is missing";
    case "needsAccess":
      return "Missing or unavailable";
  }
}
