import { useEffect, useState } from "react";

/**
 * Ticking clock for the exam chrome. Re-renders once a second while `active`
 * and freezes when it is not, so a finished sitting stops burning renders.
 */
export function useNow(active: boolean, intervalMs = 1000): number {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!active) return;
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), intervalMs);
    return () => clearInterval(id);
  }, [active, intervalMs]);

  return now;
}
