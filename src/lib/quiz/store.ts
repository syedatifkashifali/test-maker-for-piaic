import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  COURSE_IDS,
  TOTAL_QUESTIONS,
  type CourseId,
  type Sitting,
} from "./types";

const emptyAnswers = () =>
  Array.from({ length: TOTAL_QUESTIONS }, () => null as Sitting["answers"][number]);

type Phase = "home" | "loading" | "exam" | "results";

type State = {
  phase: Phase;
  courses: CourseId[];
  sitting: Sitting | null;
  index: number;
  error: string | null;
  loadNote: string;
  toggleCourse: (id: CourseId) => void;
  setAllCourses: () => void;
  setPhase: (p: Phase) => void;
  startSitting: (s: Sitting) => void;
  setAnswer: (choice: 0 | 1 | 2 | 3) => void;
  go: (index: number) => void;
  submit: () => void;
  abandon: () => void;
  setError: (e: string | null) => void;
  setLoadNote: (n: string) => void;
};

export const useQuiz = create<State>()(
  persist(
    (set, get) => ({
      phase: "home",
      courses: [...COURSE_IDS],
      sitting: null,
      index: 0,
      error: null,
      loadNote: "Composing the sitting…",
      toggleCourse: (id) =>
        set((s) => {
          const has = s.courses.includes(id);
          if (has && s.courses.length === 1) return s;
          return {
            courses: has
              ? s.courses.filter((c) => c !== id)
              : [...s.courses, id],
          };
        }),
      setAllCourses: () => set({ courses: [...COURSE_IDS] }),
      setPhase: (phase) => set({ phase }),
      startSitting: (sitting) =>
        set({
          sitting,
          index: 0,
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
      go: (index) => {
        const { sitting } = get();
        if (!sitting) return;
        const max = sitting.questions.length - 1;
        set({ index: Math.min(max, Math.max(0, index)) });
      },
      submit: () => {
        const { sitting } = get();
        if (!sitting) return;
        if (sitting.answers.some((a) => a === null)) return;
        set({
          sitting: { ...sitting, submittedAt: Date.now() },
          phase: "results",
        });
      },
      abandon: () =>
        set({
          sitting: null,
          index: 0,
          phase: "home",
          error: null,
        }),
      setError: (error) => set({ error }),
      setLoadNote: (loadNote) => set({ loadNote }),
    }),
    {
      name: "canon-hall-sitting",
      partialize: (s) => ({
        courses: s.courses,
        sitting: s.sitting,
        index: s.index,
        phase:
          s.phase === "loading"
            ? s.sitting
              ? "exam"
              : "home"
            : s.phase,
      }),
    },
  ),
);

export function unansweredCount(sitting: Sitting | null): number {
  if (!sitting) return TOTAL_QUESTIONS;
  return sitting.answers.filter((a) => a === null).length;
}

export { emptyAnswers };
