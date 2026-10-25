import { useEffect, type ReactNode } from "react";

type SheetProps = {
  title: string;
  onClose: () => void;
  children: ReactNode;
  isWide?: boolean;
};

/** A focused dialog over the main window, like a Mac sheet. Escape closes it. */
export function Sheet({ title, onClose, children, isWide = false }: SheetProps) {
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);

  return (
    <div className="sheet-backdrop">
      <section className={isWide ? "sheet sheet-wide" : "sheet"} role="dialog" aria-modal="true" aria-label={title}>
        {children}
      </section>
    </div>
  );
}
