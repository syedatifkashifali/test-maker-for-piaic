import { cn } from "@/lib/cn";
import type { Question } from "@/lib/quiz/types";

const LETTERS = ["A", "B", "C", "D"] as const;

type Props = {
  question: Question;
  selected: 0 | 1 | 2 | 3 | null;
  revealed: boolean;
  onSelect?: (i: 0 | 1 | 2 | 3) => void;
};

export function OptionList({ question, selected, revealed, onSelect }: Props) {
  return (
    <ul className="mt-6 flex flex-col gap-2">
      {question.options.map((text, i) => {
        const idx = i as 0 | 1 | 2 | 3;
        const isSel = selected === idx;
        const isCorrect = revealed && idx === question.correctIndex;
        const isWrong = revealed && isSel && !isCorrect;
        return (
          <li key={idx}>
            <button
              type="button"
              disabled={revealed}
              onClick={() => onSelect?.(idx)}
              className={cn(
                "flex w-full items-start gap-3 rounded-md px-3 py-3 text-left transition-colors duration-150",
                "border bg-paper",
                !revealed &&
                  (isSel
                    ? "border-rule text-ink"
                    : "border-paper-edge text-ink hover:border-rule-soft"),
                isCorrect && "border-pass bg-[#e7efe9] text-ink",
                isWrong && "border-mark bg-[#f6e8e5] text-ink",
                revealed && !isCorrect && !isWrong && "border-paper-edge text-ink-muted",
              )}
            >
              <span
                className={cn(
                  "mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-sm font-mono text-xs font-medium tabular-nums",
                  isSel && !revealed && "bg-rule text-accent-fg",
                  !isSel && !revealed && "bg-paper-edge text-ink-muted",
                  isCorrect && "bg-pass text-accent-fg",
                  isWrong && "bg-mark text-accent-fg",
                  revealed && !isCorrect && !isWrong && "bg-paper-edge text-ink-muted",
                )}
              >
                {LETTERS[idx]}
              </span>
              <span className="font-display text-[0.98rem] leading-snug">{text}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
