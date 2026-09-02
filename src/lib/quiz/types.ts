export const COURSE_IDS = [
  "thesis",
  "agentic",
  "sdd",
  "problem",
  "openclaw",
  "layer",
] as const;

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

export const MIX = {
  book: 8,
  teammates: 22,
  solo: 38,
  brutal: 7,
} as const;

export const TOTAL_QUESTIONS =
  MIX.book + MIX.teammates + MIX.solo + MIX.brutal;

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
  submittedAt: number | null;
};

export const PASS_MARK = 53;
