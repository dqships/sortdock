export type ReleaseState =
  | { status: "coming-soon" }
  | { status: "app-store"; downloadUrl: string }
  | {
      status: "available";
      downloadUrl: string;
      version: string;
    };
