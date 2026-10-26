import type { DestinationSnapshot } from "../../../shared/models/DestinationSnapshot";

export function destinationNameFor(destinations: readonly DestinationSnapshot[], id: string): string {
  return destinations.find((destination) => destination.id === id)?.name ?? "Missing folder";
}
