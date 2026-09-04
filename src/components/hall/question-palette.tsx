import { Flag } from "lucide-react";
import type { Sitting } from "@/lib/quiz/types";
import { cn } from "@/lib/cn";

type Props = {
  sitting: Sitting;
  index: number;
  onGo: (index: number) => void;
};

/** The 75-cell answer grid: answered, flagged, and where you are now. */
export function QuestionPalette({ sitting, index, onGo }: Props) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {sitting.questions.map((_, i) => {
        const answered = sitting.answers[i] !== null;
        const flagged = sitting.flagged?.[i] === true;
        const current = i === index;
        return (
          <button
            key={sitting.questions[i].id ?? i}
            type="button"
            onClick={() => onGo(i)}
            aria-current={current ? "true" : undefined}
            aria-label={`Question ${i + 1}${answered ? ", answered" : ", unanswered"}${flagged ? ", flagged" : ""}`}
            className={cn(
              "relative size-7 rounded-sm text-[10px] tabular-nums transition-colors",
              current
                ? "bg-paper text-ink"
                : answered
                  ? "bg-bg-subtle text-fg"
                  : "border border-border text-fg-subtle hover:border-border-strong",
            )}
          >
            {i + 1}
            {flagged ? (
              <Flag
                className="absolute -top-1 -right-1 size-2.5 fill-rule text-rule"
                strokeWidth={2.5}
                aria-hidden
              />
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
