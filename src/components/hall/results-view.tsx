import { useMemo, useState } from "react";
import {
  COURSES,
  KIND_LABEL,
  PASS_MARK,
  TOTAL_QUESTIONS,
  elapsedMs,
  formatClock,
  type CourseId,
  type QuestionKind,
} from "@/lib/quiz/types";
import { unansweredCount, useQuiz } from "@/lib/quiz/store";
import { cn } from "@/lib/cn";
import { OptionList } from "./option-list";

type Filter = "all" | "missed" | "flagged";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "Every question" },
  { id: "missed", label: "Missed only" },
  { id: "flagged", label: "Flagged" },
];

export function ResultsView({ onAgain }: { onAgain: () => void }) {
  const sitting = useQuiz((s) => s.sitting);
  const goHome = useQuiz((s) => s.goHome);
  const abandon = useQuiz((s) => s.abandon);
  const [filter, setFilter] = useState<Filter>("all");

  const marks = useMemo(
    () => (sitting ? sitting.questions.map((q, i) => sitting.answers[i] === q.correctIndex) : []),
    [sitting],
  );

  if (!sitting) return null;

  const total = sitting.questions.length;
  const score = marks.filter(Boolean).length;
  const passed = score >= PASS_MARK;
  const missed = total - score;
  const blank = unansweredCount(sitting);
  const closedByClock = sitting.closedBy === "clock";
  const pct = total === 0 ? 0 : Math.round((score / total) * 100);

  const byKind = (k: QuestionKind) => {
    const items = sitting.questions
      .map((q, i) => ({ q, ok: marks[i] }))
      .filter((x) => x.q.kind === k);
    return { n: items.length, ok: items.filter((x) => x.ok).length };
  };

  const byCourse = (id: CourseId) => {
    const items = sitting.questions
      .map((q, i) => ({ course: q.course, ok: marks[i] }))
      .filter((x) => x.course === id);
    return { n: items.length, ok: items.filter((x) => x.ok).length };
  };

  const shown = sitting.questions
    .map((q, i) => ({ q, i }))
    .filter((x) => {
      if (filter === "missed") return !marks[x.i];
      if (filter === "flagged") return sitting.flagged?.[x.i] === true;
      return true;
    });

  const counts: Record<Filter, number> = {
    all: sitting.questions.length,
    missed,
    flagged: (sitting.flagged ?? []).filter(Boolean).length,
  };

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-10">
      <header className="flex flex-col gap-3">
        <p className="text-xs font-medium tracking-[0.18em] text-fg-muted uppercase">
          Sitting closed{closedByClock ? " by the clock" : ""}
        </p>
        <div className="flex flex-wrap items-end gap-x-4 gap-y-2">
          <h1 className="font-display text-5xl leading-none text-fg">
            {score}
            <span className="text-fg-muted"> / {total}</span>
          </h1>
          <p
            className={cn(
              "rounded-md border px-2.5 py-1 text-sm",
              passed ? "border-pass/60 text-fg" : "border-mark/60 text-fg",
            )}
          >
            {passed ? "Cleared" : "Did not clear"} · pass mark {PASS_MARK}
          </p>
        </div>
        <dl className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-fg-muted">
          <div className="flex gap-1.5">
            <dt>Accuracy</dt>
            <dd className="tabular-nums text-fg">{pct}%</dd>
          </div>
          <div className="flex gap-1.5">
            <dt>Time</dt>
            <dd className="tabular-nums text-fg">
              {formatClock(elapsedMs(sitting))}
              {sitting.timeLimitMs ? ` of ${formatClock(sitting.timeLimitMs)}` : ""}
            </dd>
          </div>
          <div className="flex gap-1.5">
            <dt>Paper</dt>
            <dd className="text-fg">
              {sitting.source === "generated" ? "Generated" : "Prepared bank"}
            </dd>
          </div>
          {blank > 0 ? (
            <div className="flex gap-1.5">
              <dt>Left blank</dt>
              <dd className="tabular-nums text-mark">{blank}</dd>
            </div>
          ) : null}
        </dl>
      </header>

      <section className="flex flex-col gap-3">
        <h2 className="font-display text-lg text-fg">By question type</h2>
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {(["book", "teammates", "solo", "brutal"] as const).map((k) => {
            const x = byKind(k);
            return (
              <li key={k} className="rounded-lg border border-border bg-bg-elevated px-3 py-3">
                <p className="text-xs text-fg-subtle">{KIND_LABEL[k]}</p>
                <p className="mt-1 font-mono text-sm tabular-nums text-fg">
                  {x.ok}/{x.n}
                </p>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-display text-lg text-fg">By course</h2>
        <ul className="flex flex-col gap-1.5">
          {COURSES.map((c) => {
            const x = byCourse(c.id);
            if (x.n === 0) return null;
            const ratio = x.ok / x.n;
            return (
              <li
                key={c.id}
                className="flex items-center gap-3 rounded-lg border border-border bg-bg-elevated px-3 py-2"
              >
                <span className="w-28 shrink-0 text-xs text-fg-muted sm:w-36">{c.short}</span>
                <span
                  className="h-1.5 flex-1 overflow-hidden rounded-full bg-bg-subtle"
                  aria-hidden
                >
                  <span
                    className={cn(
                      "block h-full rounded-full",
                      ratio >= PASS_MARK / TOTAL_QUESTIONS ? "bg-pass" : "bg-mark",
                    )}
                    style={{ width: `${ratio * 100}%` }}
                  />
                </span>
                <span className="font-mono text-xs tabular-nums text-fg">
                  {x.ok}/{x.n}
                </span>
              </li>
            );
          })}
        </ul>
      </section>

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
          onClick={goHome}
          className="inline-flex min-h-11 items-center rounded-lg border border-border px-4 text-sm text-fg-muted"
        >
          Back to hall
        </button>
        <button
          type="button"
          onClick={abandon}
          className="inline-flex min-h-11 items-center rounded-lg px-4 text-sm text-fg-subtle hover:text-fg"
        >
          Discard results
        </button>
      </div>

      <section className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              aria-pressed={filter === f.id}
              className={cn(
                "inline-flex min-h-9 items-center gap-1.5 rounded-md border px-3 text-xs",
                filter === f.id
                  ? "border-rule-soft bg-bg-elevated text-fg"
                  : "border-border text-fg-muted hover:text-fg",
              )}
            >
              {f.label}
              <span className="tabular-nums text-fg-subtle">{counts[f.id]}</span>
            </button>
          ))}
        </div>

        {shown.length === 0 ? (
          <p className="rounded-lg border border-border bg-bg-elevated px-4 py-6 text-center text-sm text-fg-muted">
            Nothing here.{" "}
            {filter === "missed"
              ? "Every question was marked."
              : "No question was flagged in this sitting."}
          </p>
        ) : null}

        <ol className="flex flex-col gap-8">
          {shown.map((x) => {
            const { q, i } = x;
            const course = COURSES.find((c) => c.id === q.course);
            const answered = sitting.answers[i] !== null;
            return (
              <li key={q.id} className="rounded-xl bg-paper px-4 py-5 text-ink sm:px-6">
                <p className="font-mono text-xs text-ink-muted">
                  {i + 1}. {course?.short} · {KIND_LABEL[q.kind]} ·{" "}
                  {marks[i] ? "Marked" : answered ? "Missed" : "Left blank"}
                  {sitting.flagged?.[i] ? " · flagged" : ""}
                </p>
                <p className="font-display mt-3 text-base leading-relaxed">{q.stem}</p>
                <OptionList question={q} selected={sitting.answers[i]} revealed />
                <p className="mt-4 border-t border-paper-edge pt-3 text-sm leading-relaxed text-ink-muted">
                  {q.explanation}
                </p>
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}
