export type DownloadOption =
  | { kind: "direct"; href: string }
  | { kind: "app-store"; href: string }
  | { kind: "coming-soon" };
