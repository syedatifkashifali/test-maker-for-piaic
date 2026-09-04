import { useCallback, useEffect, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Flag, Grid3x3, Timer, X } from "lucide-react";
import { COURSES, KIND_LABEL, formatClock, remainingMs } from "@/lib/quiz/types";
import { flaggedCount, unansweredCount, useQuiz } from "@/lib/quiz/store";
import { cn } from "@/lib/cn";
import { OptionList } from "./option-list";
import { QuestionPalette } from "./question-palette";
import { ConfirmButton } from "./confirm-button";
import { useNow } from "./clock";

const CHOICE_KEYS: Record<string, 0 | 1 | 2 | 3> = {
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

export function ExamView() {
  const sitting = useQuiz((s) => s.sitting);
  const index = useQuiz((s) => s.index);
  const go = useQuiz((s) => s.go);
  const setAnswer = useQuiz((s) => s.setAnswer);
  const toggleFlag = useQuiz((s) => s.toggleFlag);
  const nextUnanswered = useQuiz((s) => s.nextUnanswered);
  const submit = useQuiz((s) => s.submit);
  const abandon = useQuiz((s) => s.abandon);
  const [sheetOpen, setSheetOpen] = useState(false);

  const running = Boolean(sitting) && !sitting?.submittedAt;
  const now = useNow(running);

  const closeSheet = useCallback(() => setSheetOpen(false), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (t && ["INPUT", "TEXTAREA"].includes(t.tagName)) return;
      if (e.key === "Escape") {
        setSheetOpen(false);
        return;
      }
      if (e.key === "ArrowRight" || e.key === "n" || e.key === "N") {
        go(index + 1);
      } else if (e.key === "ArrowLeft" || e.key === "p" || e.key === "P") {
        go(index - 1);
      } else if (e.key === "f" || e.key === "F") {
        toggleFlag();
      } else if (e.key in CHOICE_KEYS) {
        setAnswer(CHOICE_KEYS[e.key]);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, index, setAnswer, toggleFlag]);

  // A timed sitting closes itself when the clock runs out; unanswered questions
  // simply count as missed.
  const remaining = sitting ? remainingMs(sitting, now) : null;
  useEffect(() => {
    if (!running || remaining === null || remaining > 0) return;
    submit("clock");
  }, [remaining, running, submit]);

  // The sheet traps nothing, so keep the page from scrolling behind it.
  useEffect(() => {
    if (!sheetOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [sheetOpen]);

  if (!sitting) return null;
  const q = sitting.questions[index];
  if (!q) return null;

  const selected = sitting.answers[index];
  const left = unansweredCount(sitting);
  const flags = flaggedCount(sitting);
  const course = COURSES.find((c) => c.id === q.course);
  const flagged = sitting.flagged?.[index] === true;
  const canSubmit = left === 0;
  const timed = sitting.timeLimitMs != null && sitting.timeLimitMs > 0;
  const lowTime = remaining !== null && remaining <= 5 * 60 * 1000;
  const done = index + 1;
  const total = sitting.questions.length;

  const palette = (
    <QuestionPalette
      sitting={sitting}
      index={index}
      onGo={(i) => {
        go(i);
        closeSheet();
      }}
    />
  );

  const submitButton = (className: string) => (
    <ConfirmButton
      label={canSubmit ? "Submit sitting" : `${left} left to answer`}
      confirmLabel="Submit for marking?"
      disabled={!canSubmit}
      onConfirm={() => {
        closeSheet();
        submit();
      }}
      className={cn(
        "flex min-h-11 w-full items-center justify-center rounded-md text-sm font-medium",
        canSubmit ? "bg-paper text-ink" : "bg-bg-subtle text-fg-subtle",
        className,
      )}
    />
  );

  return (
    <div className="mx-auto w-full max-w-6xl px-3 pt-3 pb-28 lg:px-6 lg:pb-10">
      <header className="sticky top-0 z-20 -mx-3 mb-4 border-b border-border bg-bg/95 px-3 py-2 backdrop-blur lg:mx-0 lg:rounded-lg lg:border lg:px-4 lg:py-3">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <p className="font-mono text-xs tracking-wide text-fg-muted uppercase">
            Question {done} of {total}
          </p>
          <div className="flex items-center gap-3 text-xs text-fg-muted">
            <span
              className={cn("inline-flex items-center gap-1 tabular-nums", lowTime && "text-mark")}
            >
              <Timer className="size-3.5" strokeWidth={1.75} aria-hidden />
              {timed && remaining !== null
                ? `${formatClock(remaining)} left`
                : formatClock(Math.max(0, now - sitting.createdAt))}
            </span>
            <span className="tabular-nums">{left} unanswered</span>
            {flags > 0 ? <span className="tabular-nums">{flags} flagged</span> : null}
          </div>
        </div>
        <div
          className="mt-2 h-1 w-full overflow-hidden rounded-full bg-bg-subtle"
          role="progressbar"
          aria-valuenow={total - left}
          aria-valuemin={0}
          aria-valuemax={total}
          aria-label="Answered questions"
        >
          <div
            className="h-full rounded-full bg-rule transition-[width] duration-300"
            style={{
              width: `${((total - left) / total) * 100}%`,
            }}
          />
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_230px]">
        <article className="rounded-xl bg-paper px-4 py-6 text-ink shadow-[0_20px_60px_rgba(0,0,0,0.35)] sm:px-8 sm:py-8">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-paper-edge pb-4">
            <p className="text-xs text-ink-muted">
              {course?.short} · {KIND_LABEL[q.kind]}
            </p>
            <button
              type="button"
              onClick={() => toggleFlag()}
              aria-pressed={flagged}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs transition-colors",
                flagged
                  ? "border-rule bg-rule text-accent-fg"
                  : "border-paper-edge text-ink-muted hover:border-rule-soft",
              )}
            >
              <Flag
                className={cn("size-3.5", flagged && "fill-current")}
                strokeWidth={1.75}
                aria-hidden
              />
              {flagged ? "Flagged" : "Flag"}
            </button>
          </div>
          <div className="mt-1 h-0.5 w-16 bg-rule" aria-hidden />
          <h2 className="font-display mt-6 text-lg leading-relaxed text-ink sm:text-xl">
            {q.stem}
          </h2>
          <OptionList question={q} selected={selected} revealed={false} onSelect={setAnswer} />
          <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => go(index - 1)}
              disabled={index === 0}
              className="inline-flex min-h-11 items-center gap-1 rounded-md px-3 text-sm text-ink-muted disabled:opacity-30"
            >
              <ChevronLeft className="size-4" /> Previous
            </button>
            <div className="flex items-center gap-2">
              {left > 0 ? (
                <button
                  type="button"
                  onClick={() => nextUnanswered(index)}
                  className="inline-flex min-h-11 items-center gap-1 rounded-md border border-paper-edge px-3 text-sm text-ink-muted"
                >
                  <ArrowUpRight className="size-4" /> Next unanswered
                </button>
              ) : null}
              <button
                type="button"
                onClick={() => go(index + 1)}
                disabled={index >= sitting.questions.length - 1}
                className="inline-flex min-h-11 items-center gap-1 rounded-md px-3 text-sm text-ink-muted disabled:opacity-30"
              >
                Next <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        </article>

        <aside className="hidden flex-col gap-4 lg:sticky lg:top-24 lg:flex lg:self-start">
          <div className="rounded-lg border border-border bg-bg-elevated p-3">
            <p className="text-xs text-fg-subtle">Unanswered</p>
            <p className="font-display text-2xl tabular-nums text-fg">{left}</p>
            {left > 0 ? (
              <button
                type="button"
                onClick={() => nextUnanswered(index)}
                className="mt-3 w-full py-1.5 text-xs text-fg-muted underline-offset-2 hover:text-fg hover:underline"
              >
                Jump to next blank
              </button>
            ) : null}
            <div className="mt-3">{submitButton("")}</div>
            <ConfirmButton
              label="Abandon"
              confirmLabel="Discard this sitting?"
              onConfirm={abandon}
              className="mt-2 w-full py-2 text-xs text-fg-subtle hover:text-fg"
            />
          </div>
          {palette}
        </aside>
      </div>

      {/* Mobile chrome: the paper is long, so keep the controls on screen. */}
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-bg/95 px-3 py-2 backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-6xl items-center gap-2">
          <button
            type="button"
            onClick={() => go(index - 1)}
            disabled={index === 0}
            aria-label="Previous question"
            className="inline-flex size-11 items-center justify-center rounded-md border border-border text-fg disabled:opacity-30"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => setSheetOpen(true)}
            className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-md border border-border px-3 text-sm text-fg"
          >
            <Grid3x3 className="size-4" strokeWidth={1.75} aria-hidden />
            <span className="tabular-nums">
              {total - left}/{total} answered
            </span>
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            disabled={index >= sitting.questions.length - 1}
            aria-label="Next question"
            className="inline-flex size-11 items-center justify-center rounded-md border border-border text-fg disabled:opacity-30"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      {sheetOpen ? (
        <div className="fixed inset-0 z-30 lg:hidden">
          <button
            type="button"
            aria-label="Close question list"
            onClick={closeSheet}
            className="absolute inset-0 bg-black/60"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Question list"
            className="absolute inset-x-0 bottom-0 max-h-[80dvh] overflow-y-auto rounded-t-xl border-t border-border bg-bg-elevated px-4 pt-4 pb-6"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="font-display text-lg text-fg">
                {total - left} of {total} answered
              </p>
              <button
                type="button"
                onClick={closeSheet}
                aria-label="Close"
                className="inline-flex size-9 items-center justify-center rounded-md text-fg-muted"
              >
                <X className="size-4" />
              </button>
            </div>
            <div className="mt-3">{palette}</div>
            <div className="mt-4">{submitButton("")}</div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
