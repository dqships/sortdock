import type { DestinationSnapshot } from "../../../shared/models/DestinationSnapshot";

export function destinationLabel(destination: DestinationSnapshot): string {
  return destination.availability === "available" ? destination.name : `${destination.name} (Unavailable)`;
}
