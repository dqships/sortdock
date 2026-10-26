import { useEffect, useRef, useState, type ReactNode } from "react";

export type OptionsMenuItem = {
  label: string;
  onSelect: () => void;
  isDestructive?: boolean;
};

type OptionsMenuProps = {
  label: string;
  icon: ReactNode;
  items: readonly OptionsMenuItem[];
};

/** A small button that opens a short list of actions. */
export function OptionsMenu({ label, icon, items }: OptionsMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const close = (event: MouseEvent | KeyboardEvent) => {
      if (event instanceof KeyboardEvent ? event.key === "Escape" : !containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", close);
    };
  }, [isOpen]);

  return (
    <div className="options-menu" ref={containerRef}>
      <button
        type="button"
        className="icon-button"
        aria-label={label}
        title={label}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        {icon}
      </button>
      {isOpen && (
        <div className="options-menu-list" role="menu">
          {items.map((item) => (
            <button
              key={item.label}
              type="button"
              role="menuitem"
              className={item.isDestructive ? "menu-item-danger" : undefined}
              onClick={() => {
                setIsOpen(false);
                item.onSelect();
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
