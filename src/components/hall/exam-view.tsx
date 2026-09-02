import { useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { COURSES, KIND_LABEL, TOTAL_QUESTIONS } from "@/lib/quiz/types";
import { unansweredCount, useQuiz } from "@/lib/quiz/store";
import { cn } from "@/lib/cn";
import { OptionList } from "./option-list";

export function ExamView() {
  const sitting = useQuiz((s) => s.sitting);
  const index = useQuiz((s) => s.index);
  const go = useQuiz((s) => s.go);
  const setAnswer = useQuiz((s) => s.setAnswer);
  const submit = useQuiz((s) => s.submit);
  const abandon = useQuiz((s) => s.abandon);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (t && ["INPUT", "TEXTAREA"].includes(t.tagName)) return;
      if (e.key === "ArrowRight" || e.key === "n" || e.key === "N") {
        go(index + 1);
      } else if (e.key === "ArrowLeft" || e.key === "p" || e.key === "P") {
        go(index - 1);
      } else if (["1", "2", "3", "4", "a", "b", "c", "d", "A", "B", "C", "D"].includes(e.key)) {
        const map: Record<string, 0 | 1 | 2 | 3> = {
          "1": 0,
          "2": 1,
          "3": 2,
          "4": 3,
          a: 0,
          b: 1,
          c: 2,
          d: 3,
          A: 0,
          B: 1,
          C: 2,
          D: 3,
        };
        setAnswer(map[e.key]);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, index, setAnswer]);

  if (!sitting) return null;
  const q = sitting.questions[index];
  if (!q) return null;
  const selected = sitting.answers[index];
  const left = unansweredCount(sitting);
  const course = COURSES.find((c) => c.id === q.course);
  const canSubmit = left === 0;

  return (
    <div className="mx-auto grid w-full max-w-6xl gap-6 px-3 py-6 lg:grid-cols-[minmax(0,1fr)_220px] lg:px-6">
      <article className="rounded-xl bg-paper px-4 py-6 text-ink shadow-[0_20px_60px_rgba(0,0,0,0.35)] sm:px-8 sm:py-8">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-paper-edge pb-4">
          <p className="font-mono text-xs tracking-wide text-ink-muted uppercase">
            Question {index + 1} of {TOTAL_QUESTIONS}
          </p>
          <p className="text-xs text-ink-muted">
            {course?.short} · {KIND_LABEL[q.kind]}
          </p>
        </div>
        <div className="mt-1 h-0.5 w-16 bg-rule" aria-hidden />
        <h2 className="font-display mt-6 text-lg leading-relaxed text-ink sm:text-xl">
          {q.stem}
        </h2>
        <OptionList
          question={q}
          selected={selected}
          revealed={false}
          onSelect={setAnswer}
        />
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => go(index - 1)}
            disabled={index === 0}
            className="inline-flex min-h-11 items-center gap-1 rounded-md px-3 text-sm text-ink-muted disabled:opacity-30"
          >
            <ChevronLeft className="size-4" /> Previous
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            disabled={index >= sitting.questions.length - 1}
            className="inline-flex min-h-11 items-center gap-1 rounded-md px-3 text-sm text-ink-muted disabled:opacity-30"
          >
            Next <ChevronRight className="size-4" />
          </button>
        </div>
      </article>

      <aside className="flex flex-col gap-4 lg:sticky lg:top-6 lg:self-start">
        <div className="rounded-lg border border-border bg-bg-elevated p-3">
          <p className="text-xs text-fg-subtle">Unanswered</p>
          <p className="font-display text-2xl tabular-nums text-fg">{left}</p>
          <button
            type="button"
            disabled={!canSubmit}
            onClick={submit}
            className="mt-3 flex min-h-11 w-full items-center justify-center rounded-md bg-paper text-sm font-medium text-ink disabled:opacity-40"
          >
            Submit sitting
          </button>
          <button
            type="button"
            onClick={abandon}
            className="mt-2 w-full py-2 text-xs text-fg-subtle hover:text-fg"
          >
            Abandon
          </button>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {sitting.answers.map((a, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              title={`Question ${i + 1}`}
              className={cn(
                "size-7 rounded-sm text-[10px] tabular-nums",
                i === index
                  ? "bg-paper text-ink"
                  : a === null
                    ? "border border-border text-fg-subtle"
                    : "bg-bg-subtle text-fg",
              )}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </aside>
    </div>
  );
}
