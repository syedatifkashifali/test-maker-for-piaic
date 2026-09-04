import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  COURSE_IDS,
  TOTAL_QUESTIONS,
  type CourseId,
  type Sitting,
  type SittingMode,
} from "./types.ts";

const emptyAnswers = (count: number = TOTAL_QUESTIONS): Sitting["answers"] =>
  Array.from({ length: count }, () => null);

const emptyFlags = (count: number): boolean[] => Array.from({ length: count }, () => false);

type Phase = "home" | "loading" | "exam" | "results";

/** The slice `partialize` writes to storage, and the shape `migrate` must return. */
type Persisted = {
  courses: CourseId[];
  mode: SittingMode;
  sitting: Sitting | null;
  index: number;
  phase: Exclude<Phase, "loading">;
  lastIds: string[];
};

type State = {
  phase: Phase;
  courses: CourseId[];
  mode: SittingMode;
  sitting: Sitting | null;
  index: number;
  /**
   * Ids of the last paper served, kept so the next sitting can put them at the
   * back of the queue. Survives a reload, so a repeat run stays a fresh paper.
   */
  lastIds: string[];
  error: string | null;
  loadNote: string;
  /** Set when a generated sitting had to fall back to the prepared bank. */
  fallbackNote: string | null;
  toggleCourse: (id: CourseId) => void;
  setAllCourses: () => void;
  setMode: (mode: SittingMode) => void;
  setPhase: (p: Phase) => void;
  startSitting: (s: Sitting) => void;
  setAnswer: (choice: 0 | 1 | 2 | 3) => void;
  clearAnswer: () => void;
  toggleFlag: (index?: number) => void;
  go: (index: number) => void;
  /** Jump to the next unanswered question at or after `from`, wrapping once. */
  nextUnanswered: (from?: number) => void;
  submit: (reason?: "submit" | "clock") => void;
  /** Leave the exam but keep a submitted sitting so it can be reviewed again. */
  goHome: () => void;
  abandon: () => void;
  reviewSitting: () => void;
  setError: (e: string | null) => void;
  setLoadNote: (n: string) => void;
  setFallbackNote: (n: string | null) => void;
};

/** Pads/truncates a boolean track to the length of the question list. */
function flagsFor(sitting: Sitting): boolean[] {
  const have = sitting.flagged ?? [];
  const next = emptyFlags(sitting.questions.length);
  for (let i = 0; i < next.length; i++) next[i] = have[i] === true;
  return next;
}

export const useQuiz = create<State>()(
  persist(
    (set, get) => ({
      phase: "home",
      courses: [...COURSE_IDS],
      mode: { kind: "open" },
      sitting: null,
      index: 0,
      lastIds: [],
      error: null,
      loadNote: "Composing the sitting…",
      fallbackNote: null,
      toggleCourse: (id) =>
        set((s) => {
          const has = s.courses.includes(id);
          if (has && s.courses.length === 1) return s;
          return {
            courses: has ? s.courses.filter((c) => c !== id) : [...s.courses, id],
          };
        }),
      setAllCourses: () => set({ courses: [...COURSE_IDS] }),
      setMode: (mode) => set({ mode }),
      setPhase: (phase) => set({ phase }),
      startSitting: (sitting) =>
        set({
          sitting: { ...sitting, flagged: flagsFor(sitting) },
          index: 0,
          lastIds: sitting.questions.map((q) => q.id),
          phase: "exam",
          error: null,
        }),
      setAnswer: (choice) => {
        const { sitting, index } = get();
        if (!sitting || sitting.submittedAt) return;
        const answers = [...sitting.answers];
        answers[index] = choice;
        set({ sitting: { ...sitting, answers } });
      },
      clearAnswer: () => {
        const { sitting, index } = get();
        if (!sitting || sitting.submittedAt) return;
        const answers = [...sitting.answers];
        answers[index] = null;
        set({ sitting: { ...sitting, answers } });
      },
      toggleFlag: (at) => {
        const { sitting, index } = get();
        if (!sitting || sitting.submittedAt) return;
        const i = at ?? index;
        if (i < 0 || i >= sitting.questions.length) return;
        const flagged = flagsFor(sitting);
        flagged[i] = !flagged[i];
        set({ sitting: { ...sitting, flagged } });
      },
      go: (index) => {
        const { sitting } = get();
        if (!sitting) return;
        const max = sitting.questions.length - 1;
        set({ index: Math.min(max, Math.max(0, index)) });
      },
      nextUnanswered: (from) => {
        const { sitting, index, go } = get();
        if (!sitting) return;
        const start = from ?? index;
        const total = sitting.questions.length;
        if (total === 0) return;
        for (let step = 1; step <= total; step++) {
          const candidate = (start + step) % total;
          if (sitting.answers[candidate] === null) {
            go(candidate);
            return;
          }
        }
      },
      submit: (reason = "submit") => {
        const { sitting } = get();
        if (!sitting || sitting.submittedAt) return;
        if (reason === "submit" && unansweredCount(sitting) > 0) return;
        set({
          sitting: {
            ...sitting,
            submittedAt: Date.now(),
            closedBy: reason,
          },
          phase: "results",
        });
      },
      goHome: () => set({ phase: "home", error: null }),
      abandon: () =>
        set({
          sitting: null,
          index: 0,
          phase: "home",
          error: null,
          fallbackNote: null,
        }),
      reviewSitting: () => {
        const { sitting } = get();
        if (!sitting?.submittedAt) return;
        set({ phase: "results", index: 0 });
      },
      setError: (error) => set({ error }),
      setLoadNote: (loadNote) => set({ loadNote }),
      setFallbackNote: (fallbackNote) => set({ fallbackNote }),
    }),
    {
      name: "canon-hall-sitting",
      version: 3,
      partialize: (s) => ({
        courses: s.courses,
        mode: s.mode,
        sitting: s.sitting,
        index: s.index,
        phase: s.phase === "loading" ? (s.sitting ? "exam" : "home") : s.phase,
        lastIds: s.lastIds,
      }),
      /**
       * Sittings written by the first version have no flag track and no timing
       * fields. Rebuild the tracks from the question list rather than letting a
       * stale shape reach the UI, and drop a sitting whose answers no longer
       * line up with its questions.
       */
      migrate: (persisted, _version) => {
        const state = (persisted ?? {}) as Partial<Persisted>;
        const sitting = state.sitting ?? null;
        const base: Persisted = {
          courses: state.courses?.length ? state.courses : [...COURSE_IDS],
          mode: state.mode ?? { kind: "open" },
          sitting,
          index: state.index ?? 0,
          phase: state.phase === "exam" || state.phase === "results" ? state.phase : "home",
          lastIds: Array.isArray(state.lastIds) ? state.lastIds : [],
        };
        // A sitting from version 2 has no repeat guard; that only costs the
        // candidate one paper of overlap, so it is not worth dropping it.
        if (
          !sitting ||
          !Array.isArray(sitting.questions) ||
          !Array.isArray(sitting.answers) ||
          sitting.answers.length !== sitting.questions.length
        ) {
          return { ...base, sitting: null, index: 0, phase: "home" };
        }
        const restored: Sitting = {
          ...sitting,
          flagged: flagsFor(sitting),
          timeLimitMs: sitting.timeLimitMs ?? null,
          closedBy: sitting.closedBy ?? (sitting.submittedAt ? "submit" : null),
        };
        // A closed sitting returns to its results; an open one resumes where it
        // stopped. A "results" phase with nothing closed falls back to the hall.
        const phase = restored.submittedAt ? "results" : base.phase === "exam" ? "exam" : "home";
        return { ...base, sitting: restored, phase };
      },
    },
  ),
);

/**
 * Blanks are counted against the questions actually in the sitting, never
 * against the 75-question ideal — a short paper must still be submittable.
 */
export function unansweredCount(sitting: Sitting | null): number {
  if (!sitting) return TOTAL_QUESTIONS;
  let blank = 0;
  for (let i = 0; i < sitting.questions.length; i++) {
    if (sitting.answers[i] === null) blank++;
  }
  return blank;
}

export function flaggedCount(sitting: Sitting | null): number {
  if (!sitting) return 0;
  return (sitting.flagged ?? []).filter(Boolean).length;
}

export function scoreOf(sitting: Sitting): number {
  return sitting.questions.reduce(
    (n, q, i) => (sitting.answers[i] === q.correctIndex ? n + 1 : n),
    0,
  );
}

export { emptyAnswers, emptyFlags };
