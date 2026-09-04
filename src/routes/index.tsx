import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ExamView } from "@/components/hall/exam-view";
import { HomeView, LoadingView } from "@/components/hall/home-view";
import { ResultsView } from "@/components/hall/results-view";
import { bankSitting, generateSitting } from "@/lib/quiz/generate";
import { emptyAnswers, useQuiz } from "@/lib/quiz/store";
import { TOTAL_QUESTIONS, type Question } from "@/lib/quiz/types";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const phase = useQuiz((s) => s.phase);
  const sitting = useQuiz((s) => s.sitting);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const unsub = useQuiz.persist.onFinishHydration(() => setHydrated(true));
    if (useQuiz.persist.hasHydrated()) setHydrated(true);
    return unsub;
  }, []);

  const view = !sitting && (phase === "exam" || phase === "results") ? "home" : phase;

  async function onGenerate(fresh: boolean) {
    const {
      courses,
      mode,
      lastIds,
      setPhase,
      setError,
      setLoadNote,
      setFallbackNote,
      startSitting,
    } = useQuiz.getState();
    setError(null);
    setFallbackNote(null);
    setPhase("loading");
    setLoadNote(
      fresh
        ? "Asking the model for a new 75 — bank fills any gaps."
        : "Shuffling the prepared canon bank.",
    );
    const limitMs = mode.kind === "timed" ? mode.minutes * 60 * 1000 : null;
    try {
      let questions: Question[];
      let source: "generated" | "bank";

      if (fresh) {
        const res = await generateSitting({ data: { courses, avoid: lastIds } });
        if (!res.ok) {
          setError(res.error);
          setPhase("home");
          return;
        }
        questions = res.questions;
        source = res.source;
        if (res.source === "bank") {
          setFallbackNote(
            res.modelAvailable
              ? `The model supplied ${res.generatedCount} of ${TOTAL_QUESTIONS}; the prepared bank filled the rest.`
              : "The model was not reachable, so this sitting was drawn from the prepared bank.",
          );
        }
      } else {
        const res = await bankSitting({ data: { courses, avoid: lastIds } });
        questions = res.questions;
        source = res.source;
      }

      startSitting({
        id: crypto.randomUUID(),
        createdAt: Date.now(),
        source,
        courses,
        questions,
        answers: emptyAnswers(questions.length),
        flagged: [],
        timeLimitMs: limitMs,
        closedBy: null,
        submittedAt: null,
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not open a sitting.");
      setPhase("home");
    }
  }

  return (
    <div className="min-h-dvh bg-bg">
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.35]"
        style={{
          background: "radial-gradient(900px 400px at 50% -10%, #2a2924, transparent 60%)",
        }}
        aria-hidden
      />
      <div className="relative">
        {!hydrated || view === "home" ? <HomeView onGenerate={onGenerate} /> : null}
        {hydrated && view === "loading" ? <LoadingView /> : null}
        {hydrated && view === "exam" ? <ExamView /> : null}
        {hydrated && view === "results" ? <ResultsView onAgain={() => onGenerate(true)} /> : null}
      </div>
      <footer className="px-4 pb-8 text-center text-[11px] text-fg-subtle">
        {TOTAL_QUESTIONS} questions · options uncoloured until the last mark
      </footer>
    </div>
  );
}
