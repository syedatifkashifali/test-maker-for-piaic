import { useEffect, useState } from "react";
import { BookOpen, Clock, History, Infinity as InfinityIcon, Loader2, PenLine } from "lucide-react";
import {
  COURSES,
  DEFAULT_TIME_LIMIT,
  MIX,
  TIME_LIMITS,
  TOTAL_QUESTIONS,
  type CourseId,
} from "@/lib/quiz/types";
import { unansweredCount, useQuiz } from "@/lib/quiz/store";
import { bankCoverage } from "@/lib/quiz/generate";
import { cn } from "@/lib/cn";

type Props = {
  onGenerate: (fresh: boolean) => void;
};

export function HomeView({ onGenerate }: Props) {
  const courses = useQuiz((s) => s.courses);
  const mode = useQuiz((s) => s.mode);
  const sitting = useQuiz((s) => s.sitting);
  const toggle = useQuiz((s) => s.toggleCourse);
  const setAll = useQuiz((s) => s.setAllCourses);
  const setMode = useQuiz((s) => s.setMode);
  const error = useQuiz((s) => s.error);
  const fallbackNote = useQuiz((s) => s.fallbackNote);
  const reviewSitting = useQuiz((s) => s.reviewSitting);
  const setPhase = useQuiz((s) => s.setPhase);

  const [coverage, setCoverage] = useState<Record<CourseId, number> | null>(null);

  useEffect(() => {
    let live = true;
    bankCoverage()
      .then((c) => {
        if (live) setCoverage(c);
      })
      .catch(() => {
        /* the hall still works without the depth hint */
      });
    return () => {
      live = false;
    };
  }, []);

  const inProgress = sitting && !sitting.submittedAt && unansweredCount(sitting) < TOTAL_QUESTIONS;
  const reviewable = Boolean(sitting?.submittedAt);
  const selectedDepth = coverage ? courses.reduce((n, id) => n + (coverage[id] ?? 0), 0) : null;

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-4 py-10 sm:py-16">
      <header className="flex flex-col gap-4">
        <p className="text-xs font-medium tracking-[0.18em] text-fg-muted uppercase">
          Agent Factory · 75 marks
        </p>
        <h1 className="font-display text-4xl leading-[1.1] text-fg sm:text-5xl">Canon Hall</h1>
        <p className="max-w-xl text-[1.05rem] leading-relaxed text-fg-muted">
          A sitting in the Panaversity style: long situations, buried tells, and four options that
          almost rhyme. There is no longest-answer tell to fall back on. Nothing is marked until the
          sitting is closed. The mix is fixed — not negotiable.
        </p>
      </header>

      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { n: MIX.book, l: "From the text" },
          { n: MIX.teammates, l: "Two people" },
          { n: MIX.solo, l: "One person" },
          { n: MIX.brutal, l: "Dense English" },
        ].map((x) => (
          <div key={x.l} className="rounded-lg border border-border bg-bg-elevated px-3 py-3">
            <dt className="text-xs text-fg-subtle">{x.l}</dt>
            <dd className="mt-1 font-display text-2xl tabular-nums text-fg">{x.n}</dd>
          </div>
        ))}
      </dl>

      <section className="flex flex-col gap-3">
        <h2 className="font-display text-lg text-fg">Conditions</h2>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setMode({ kind: "open" })}
            aria-pressed={mode.kind === "open"}
            className={cn(
              "inline-flex min-h-11 items-center gap-2 rounded-lg border px-4 text-sm",
              mode.kind === "open"
                ? "border-rule-soft bg-bg-elevated text-fg"
                : "border-border text-fg-muted hover:text-fg",
            )}
          >
            <InfinityIcon className="size-4" strokeWidth={1.75} aria-hidden />
            Untimed
          </button>
          <button
            type="button"
            onClick={() =>
              setMode({
                kind: "timed",
                minutes: mode.kind === "timed" ? mode.minutes : DEFAULT_TIME_LIMIT,
              })
            }
            aria-pressed={mode.kind === "timed"}
            className={cn(
              "inline-flex min-h-11 items-center gap-2 rounded-lg border px-4 text-sm",
              mode.kind === "timed"
                ? "border-rule-soft bg-bg-elevated text-fg"
                : "border-border text-fg-muted hover:text-fg",
            )}
          >
            <Clock className="size-4" strokeWidth={1.75} aria-hidden />
            Timed
          </button>
          {mode.kind === "timed" ? (
            <div className="flex items-center gap-1.5">
              {TIME_LIMITS.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode({ kind: "timed", minutes: m })}
                  aria-pressed={mode.minutes === m}
                  className={cn(
                    "inline-flex min-h-11 items-center rounded-lg border px-3 text-sm tabular-nums",
                    mode.minutes === m
                      ? "border-rule bg-rule text-accent-fg"
                      : "border-border text-fg-muted hover:text-fg",
                  )}
                >
                  {m} min
                </button>
              ))}
            </div>
          ) : null}
        </div>
        <p className="text-xs leading-relaxed text-fg-subtle">
          {mode.kind === "timed"
            ? `The hall closes itself after ${mode.minutes} minutes and anything still blank counts as missed.`
            : "Take as long as you like. The clock still runs, so you can see what the sitting cost you."}
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="font-display text-lg text-fg">Canon in play</h2>
          <button
            type="button"
            onClick={setAll}
            className="text-xs text-fg-muted underline-offset-2 hover:text-fg hover:underline"
          >
            Select all six
          </button>
        </div>
        <ul className="flex flex-col gap-2">
          {COURSES.map((c) => {
            const on = courses.includes(c.id);
            return (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => toggle(c.id)}
                  aria-pressed={on}
                  className={cn(
                    "flex w-full items-start gap-3 rounded-lg border px-3 py-3 text-left transition-colors",
                    on ? "border-rule-soft bg-bg-elevated" : "border-border bg-bg text-fg-muted",
                  )}
                >
                  <span
                    className={cn(
                      "mt-0.5 size-4 shrink-0 rounded-sm border",
                      on ? "border-rule bg-rule" : "border-border-strong",
                    )}
                    aria-hidden
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium text-fg">{c.title}</span>
                    <span className="block text-xs text-fg-subtle">{c.short}</span>
                  </span>
                  {coverage ? (
                    <span className="shrink-0 font-mono text-[11px] tabular-nums text-fg-subtle">
                      {coverage[c.id] ?? 0} in bank
                    </span>
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
        {selectedDepth !== null ? (
          <p className="text-xs leading-relaxed text-fg-subtle">
            The prepared bank holds {selectedDepth} questions for this selection. A sitting is
            always {TOTAL_QUESTIONS}; anything short is filled from the courses you left out. Every
            sitting is a different paper — the questions you sat last time go to the back of the
            queue, so most of the paper is new each time you sit.
          </p>
        ) : null}
      </section>

      {error ? (
        <p
          role="alert"
          className="rounded-md border border-mark/40 bg-bg-elevated px-3 py-2 text-sm text-fg"
        >
          {error}
        </p>
      ) : null}
      {fallbackNote ? (
        <p className="rounded-md border border-border bg-bg-elevated px-3 py-2 text-sm text-fg-muted">
          {fallbackNote}
        </p>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <button
          type="button"
          onClick={() => onGenerate(true)}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-paper px-5 text-sm font-medium text-ink"
        >
          <PenLine className="size-4" strokeWidth={1.75} />
          Generate a new sitting
        </button>
        {inProgress ? (
          <button
            type="button"
            onClick={() => setPhase("exam")}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-rule bg-bg-elevated px-5 text-sm font-medium text-fg"
          >
            Resume unfinished sitting
          </button>
        ) : null}
        {reviewable ? (
          <button
            type="button"
            onClick={reviewSitting}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-border-strong px-5 text-sm font-medium text-fg"
          >
            <History className="size-4" strokeWidth={1.75} />
            Review last sitting
          </button>
        ) : null}
        <button
          type="button"
          onClick={() => onGenerate(false)}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-border px-5 text-sm text-fg-muted"
        >
          <BookOpen className="size-4" strokeWidth={1.75} />
          Use prepared bank
        </button>
      </div>

      <p className="text-xs leading-relaxed text-fg-subtle">
        Every sitting is a different paper: the questions are drawn and shuffled again each time,
        the options are reshuffled so A–D never encode correctness, and last sitting&apos;s
        questions go to the back of the queue. Generation writes a fresh {TOTAL_QUESTIONS} from the
        six pages via the model; if the model is unavailable, the prepared bank is used and the hall
        says so. Results appear only once the sitting is closed.
      </p>
    </div>
  );
}

export function LoadingView() {
  const note = useQuiz((s) => s.loadNote);
  return (
    <div className="flex min-h-[70dvh] flex-col items-center justify-center gap-4 px-6 text-center">
      <Loader2 className="size-6 animate-spin text-fg-muted" strokeWidth={1.5} />
      <p className="font-display text-xl text-fg">Composing the sitting</p>
      <p className="max-w-sm text-sm text-fg-muted">{note}</p>
    </div>
  );
}
