import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  label: ReactNode;
  confirmLabel: string;
  onConfirm: () => void;
  className?: string;
  disabled?: boolean;
  /** How long the armed state lasts before the button disarms itself. */
  armForMs?: number;
};

/**
 * Two-step button for the two irreversible moves in a sitting (submit, abandon).
 * A modal dialog is overkill for both; a second click that expires is enough and
 * keeps keyboard focus where it already is.
 */
export function ConfirmButton({
  label,
  confirmLabel,
  onConfirm,
  className,
  disabled,
  armForMs = 5000,
}: Props) {
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (!armed) return;
    const id = setTimeout(() => setArmed(false), armForMs);
    return () => clearTimeout(id);
  }, [armed, armForMs]);

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => {
        if (armed) {
          setArmed(false);
          onConfirm();
          return;
        }
        setArmed(true);
      }}
      className={cn("disabled:cursor-not-allowed disabled:opacity-40", className)}
    >
      {armed ? confirmLabel : label}
    </button>
  );
}
