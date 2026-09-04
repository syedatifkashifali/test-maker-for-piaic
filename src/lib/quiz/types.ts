export const COURSE_IDS = ["thesis", "agentic", "sdd", "problem", "openclaw", "layer"] as const;

export type CourseId = (typeof COURSE_IDS)[number];

export const COURSES: {
  id: CourseId;
  short: string;
  title: string;
  url: string;
}[] = [
  {
    id: "thesis",
    short: "Thesis",
    title: "The Agent Factory Thesis",
    url: "https://agentfactory.panaversity.org/docs/thesis",
  },
  {
    id: "agentic",
    short: "Agentic Coding",
    title: "Claude Code and OpenCode",
    url: "https://agentfactory.panaversity.org/docs/agentic-coding-crash-course",
  },
  {
    id: "sdd",
    short: "Spec-Driven",
    title: "Spec-Driven Development",
    url: "https://agentfactory.panaversity.org/docs/spec-driven-development-crash-course",
  },
  {
    id: "problem",
    short: "Problem Solving",
    title: "Problem Solving with General Agents",
    url: "https://agentfactory.panaversity.org/docs/problem-solving-crash-course",
  },
  {
    id: "openclaw",
    short: "OpenClaw",
    title: "OpenClaw with General Agents",
    url: "https://agentfactory.panaversity.org/docs/openclaw-with-general-agents",
  },
  {
    id: "layer",
    short: "Operating Layer",
    title: "The AI Operating Layer",
    url: "https://agentfactory.panaversity.org/docs/ai-operating-layer",
  },
];

export const QUESTION_KINDS = ["book", "teammates", "solo", "brutal"] as const;
export type QuestionKind = (typeof QUESTION_KINDS)[number];

/**
 * Shape of one paper. Weighted towards the hard kinds on purpose: the close
 * reading of the text is the warm-up, the dense-English items are the finish.
 * Every kind is drawn with repeats pushed to the back, so two sittings in a row
 * are different papers rather than the same paper reshuffled.
 */
export const MIX = {
  book: 6,
  teammates: 24,
  solo: 35,
  brutal: 10,
} as const;

export const TOTAL_QUESTIONS = MIX.book + MIX.teammates + MIX.solo + MIX.brutal;

export const KIND_LABEL: Record<QuestionKind, string> = {
  book: "Canon (from the text)",
  teammates: "Two people in the room",
  solo: "One person, a mess",
  brutal: "Dense English, adjacent traps",
};

export type Question = {
  id: string;
  kind: QuestionKind;
  course: CourseId;
  stem: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
};

export type Sitting = {
  id: string;
  createdAt: number;
  source: "generated" | "bank";
  courses: CourseId[];
  questions: Question[];
  answers: Array<0 | 1 | 2 | 3 | null>;
  /** Per-question bookmark. Optional so sittings persisted before it existed still load. */
  flagged?: boolean[];
  /** Milliseconds the candidate was given, or null for an untimed sitting. */
  timeLimitMs?: number | null;
  /** Why the sitting closed. Null/absent while it is still running. */
  closedBy?: "submit" | "clock" | null;
  submittedAt: number | null;
};

export const PASS_MARK = 53;

/** Durations offered for a timed sitting, in minutes. */
export const TIME_LIMITS = [45, 60, 90, 120] as const;
export type TimeLimitMinutes = (typeof TIME_LIMITS)[number];
export const DEFAULT_TIME_LIMIT: TimeLimitMinutes = 90;

export type SittingMode = { kind: "open" } | { kind: "timed"; minutes: TimeLimitMinutes };

/** How long a candidate actually spent, in milliseconds. */
export function elapsedMs(sitting: Sitting, now: number = Date.now()): number {
  const end = sitting.submittedAt ?? now;
  return Math.max(0, end - sitting.createdAt);
}

/** Milliseconds left on a timed sitting, or null when untimed. */
export function remainingMs(sitting: Sitting, now: number = Date.now()): number | null {
  const limit = sitting.timeLimitMs;
  if (!limit || limit <= 0) return null;
  return Math.max(0, sitting.createdAt + limit - now);
}

export function formatClock(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`;
}
