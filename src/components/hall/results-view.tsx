import { COURSES, KIND_LABEL, PASS_MARK, TOTAL_QUESTIONS, type QuestionKind } from "@/lib/quiz/types";
import { useQuiz } from "@/lib/quiz/store";
import { OptionList } from "./option-list";

export function ResultsView({ onAgain }: { onAgain: () => void }) {
  const sitting = useQuiz((s) => s.sitting);
  const abandon = useQuiz((s) => s.abandon);
  if (!sitting) return null;

  const marks = sitting.questions.map((q, i) => sitting.answers[i] === q.correctIndex);
  const score = marks.filter(Boolean).length;
  const passed = score >= PASS_MARK;

  const byKind = (k: QuestionKind) => {
    const items = sitting.questions
      .map((q, i) => ({ q, ok: marks[i] }))
      .filter((x) => x.q.kind === k);
    return { n: items.length, ok: items.filter((x) => x.ok).length };
  };

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-10">
      <header className="flex flex-col gap-3">
        <p className="text-xs font-medium tracking-[0.18em] text-fg-muted uppercase">
          Sitting closed
        </p>
        <h1 className="font-display text-4xl text-fg">
          {score}
          <span className="text-fg-muted"> / {TOTAL_QUESTIONS}</span>
        </h1>
        <p className="text-sm text-fg-muted">
          Pass mark {PASS_MARK}. You {passed ? "cleared" : "did not clear"} the
          hall.
        </p>
      </header>

      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {(["book", "teammates", "solo", "brutal"] as const).map((k) => {
          const x = byKind(k);
          return (
            <li
              key={k}
              className="rounded-lg border border-border bg-bg-elevated px-3 py-3"
            >
              <p className="text-xs text-fg-subtle">{KIND_LABEL[k]}</p>
              <p className="mt-1 font-mono text-sm tabular-nums text-fg">
                {x.ok}/{x.n}
              </p>
            </li>
          );
        })}
      </ul>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onAgain}
          className="inline-flex min-h-11 items-center rounded-lg bg-paper px-4 text-sm font-medium text-ink"
        >
          New sitting
        </button>
        <button
          type="button"
          onClick={abandon}
          className="inline-flex min-h-11 items-center rounded-lg border border-border px-4 text-sm text-fg-muted"
        >
          Back to hall
        </button>
      </div>

      <ol className="flex flex-col gap-8">
        {sitting.questions.map((q, i) => {
          const course = COURSES.find((c) => c.id === q.course);
          return (
            <li
              key={q.id}
              className="rounded-xl bg-paper px-4 py-5 text-ink sm:px-6"
            >
              <p className="font-mono text-xs text-ink-muted">
                {i + 1}. {course?.short} · {KIND_LABEL[q.kind]} ·{" "}
                {marks[i] ? "Marked" : "Missed"}
              </p>
              <p className="font-display mt-3 text-base leading-relaxed">{q.stem}</p>
              <OptionList
                question={q}
                selected={sitting.answers[i]}
                revealed
              />
              <p className="mt-4 border-t border-paper-edge pt-3 text-sm leading-relaxed text-ink-muted">
                {q.explanation}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
