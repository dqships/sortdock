export type DestinationFolder = {
  id: string;
  name: string;
  /** A folder the user picked anywhere on disk. Null means a folder inside the watched folder. */
  folderPath: string | null;
};
