import { BookOpen, Loader2, PenLine } from "lucide-react";
import { COURSES, MIX, TOTAL_QUESTIONS } from "@/lib/quiz/types";
import { unansweredCount, useQuiz } from "@/lib/quiz/store";
import { cn } from "@/lib/cn";

type Props = {
  onGenerate: (fresh: boolean) => void;
};

export function HomeView({ onGenerate }: Props) {
  const courses = useQuiz((s) => s.courses);
  const sitting = useQuiz((s) => s.sitting);
  const toggle = useQuiz((s) => s.toggleCourse);
  const setAll = useQuiz((s) => s.setAllCourses);
  const error = useQuiz((s) => s.error);
  const canResume =
    sitting && !sitting.submittedAt && unansweredCount(sitting) < TOTAL_QUESTIONS;

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-4 py-10 sm:py-16">
      <header className="flex flex-col gap-4">
        <p className="text-xs font-medium tracking-[0.18em] text-fg-muted uppercase">
          Agent Factory · 75 marks
        </p>
        <h1 className="font-display text-4xl leading-[1.1] text-fg sm:text-5xl">
          Canon Hall
        </h1>
        <p className="max-w-xl text-[1.05rem] leading-relaxed text-fg-muted">
          A sitting in the Panaversity style: long situations, buried tells, and
          options that almost rhyme. Nothing is marked until question 75 is
          answered. The mix is fixed — not negotiable.
        </p>
      </header>

      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { n: MIX.book, l: "From the text" },
          { n: MIX.teammates, l: "Two people" },
          { n: MIX.solo, l: "One person" },
          { n: MIX.brutal, l: "Dense English" },
        ].map((x) => (
          <div
            key={x.l}
            className="rounded-lg border border-border bg-bg-elevated px-3 py-3"
          >
            <dt className="text-xs text-fg-subtle">{x.l}</dt>
            <dd className="mt-1 font-display text-2xl tabular-nums text-fg">
              {x.n}
            </dd>
          </div>
        ))}
      </dl>

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
                  className={cn(
                    "flex w-full items-start gap-3 rounded-lg border px-3 py-3 text-left transition-colors",
                    on
                      ? "border-rule-soft bg-bg-elevated"
                      : "border-border bg-bg text-fg-muted",
                  )}
                >
                  <span
                    className={cn(
                      "mt-0.5 size-4 shrink-0 rounded-sm border",
                      on ? "border-rule bg-rule" : "border-border-strong",
                    )}
                    aria-hidden
                  />
                  <span>
                    <span className="block text-sm font-medium text-fg">
                      {c.title}
                    </span>
                    <span className="block text-xs text-fg-subtle">{c.short}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      {error ? (
        <p className="rounded-md border border-mark/40 bg-bg-elevated px-3 py-2 text-sm text-fg">
          {error}
        </p>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => onGenerate(true)}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-paper px-5 text-sm font-medium text-ink"
        >
          <PenLine className="size-4" strokeWidth={1.75} />
          Generate a new sitting
        </button>
        {canResume ? (
          <button
            type="button"
            onClick={() => useQuiz.getState().setPhase("exam")}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-border-strong px-5 text-sm font-medium text-fg"
          >
            Resume unfinished sitting
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
        Generation writes a fresh 75 from the six pages via the model, then
        shuffles options so A–D never encode correctness. If the model is
        unavailable, the prepared bank is used. Results appear only after every
        question is answered.
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
