import { useEffect, useState } from "react";

/** The current time, refreshed every second while `isActive` is true. */
export function useNow(isActive: boolean): number {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!isActive) {
      return;
    }

    const timer = setInterval(() => setNow(Date.now()), 1_000);
    return () => clearInterval(timer);
  }, [isActive]);

  return now;
}
