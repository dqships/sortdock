import type { DestinationAvailability } from "./DestinationAvailability";
import type { DestinationFolder } from "./DestinationFolder";

export type DestinationSnapshot = DestinationFolder & {
  availability: DestinationAvailability;
};
