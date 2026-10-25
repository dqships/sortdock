import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SortDock Mac App Store Screenshots",
  description: "Design and export SortDock's 2880 by 1800 Mac App Store screenshots.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  );
}
