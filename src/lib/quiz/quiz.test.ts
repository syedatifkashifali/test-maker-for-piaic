import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  COURSE_IDS,
  MIX,
  PASS_MARK,
  TOTAL_QUESTIONS,
  elapsedMs,
  formatClock,
  remainingMs,
  type Question,
  type Sitting,
} from "./types.ts";
import { allBankQuestions, bankCoverageByCourse, fillKind, pickBankSitting } from "./bank/index.ts";
import { prepareSittingQuestions, shuffleInPlace, shuffleQuestion } from "./shuffle.ts";

/* ------------------------------------------------------------------ bank --- */

describe("prepared bank", () => {
  const bank = allBankQuestions();

  it("holds more questions than one sitting, so sittings can differ", () => {
    assert.ok(
      bank.length > TOTAL_QUESTIONS,
      `bank holds ${bank.length}; a sitting needs ${TOTAL_QUESTIONS}`,
    );
  });

  it("has unique ids and unique stems", () => {
    const ids = new Set(bank.map((q) => q.id));
    assert.equal(ids.size, bank.length);
    const stems = new Set(bank.map((q) => q.stem.trim().toLowerCase()));
    assert.equal(stems.size, bank.length);
  });

  it("is well formed question by question", () => {
    for (const q of bank) {
      assert.ok(COURSE_IDS.includes(q.course), `${q.id}: bad course`);
      assert.ok(["book", "teammates", "solo", "brutal"].includes(q.kind), `${q.id}: bad kind`);
      assert.equal(q.options.length, 4, `${q.id}: needs four options`);
      assert.ok(
        q.options.every((o) => o.trim().length > 0),
        `${q.id}: empty option`,
      );
      assert.equal(
        new Set(q.options.map((o) => o.trim().toLowerCase())).size,
        4,
        `${q.id}: duplicate options`,
      );
      assert.ok(q.correctIndex >= 0 && q.correctIndex <= 3, `${q.id}: correctIndex out of range`);
      assert.ok(q.stem.trim().length >= 40, `${q.id}: stem too short`);
      assert.ok(q.explanation.trim().length >= 20, `${q.id}: explanation too short`);
    }
  });

  it("covers every course and every kind", () => {
    const coverage = bankCoverageByCourse();
    for (const id of COURSE_IDS) {
      assert.ok(coverage[id] > 0, `${id} has no bank questions`);
    }
    for (const kind of ["book", "teammates", "solo", "brutal"] as const) {
      const n = bank.filter((q) => q.kind === kind).length;
      assert.ok(n >= MIX[kind], `${kind}: bank holds ${n}, a sitting needs ${MIX[kind]}`);
    }
  });
});

/* --------------------------------------------------------- option quality --- */

/**
 * The bank used to be guessable by eye: the correct option was the longest in
 * 114 of 121 questions, so a candidate could score without reading the canon.
 * These tests hold the line — a 1-3 character margin is noise, but a visible
 * lead or a throwaway-short distractor is a tell.
 */
describe("option quality", () => {
  const bank = allBankQuestions();
  const lengths = (q: Question) => q.options.map((o) => o.length);
  const longestDistractor = (q: Question) =>
    Math.max(...lengths(q).filter((_, i) => i !== q.correctIndex));

  it("never lets the correct option lead the longest distractor by more than 8%", () => {
    for (const q of bank) {
      const correct = lengths(q)[q.correctIndex];
      const lead = correct / longestDistractor(q);
      assert.ok(lead <= 1.08, `${q.id}: correct option leads by ${(lead * 100 - 100).toFixed(0)}%`);
    }
  });

  it("has no throwaway-short option beside three full sentences", () => {
    for (const q of bank) {
      const l = lengths(q);
      const spread = Math.min(...l) / Math.max(...l);
      assert.ok(
        spread >= 0.6,
        `${q.id}: shortest option is ${(spread * 100).toFixed(0)}% of the longest`,
      );
    }
  });

  it("keeps the correct option at or below the longest distractor in most of the bank", () => {
    const hidden = bank.filter((q) => lengths(q)[q.correctIndex] <= longestDistractor(q)).length;
    assert.ok(
      hidden >= bank.length * 0.6,
      `only ${hidden} of ${bank.length} questions hide the answer behind a longer distractor`,
    );
  });

  it("does not park the answer on one letter in the bank", () => {
    const spread = [0, 1, 2, 3].map((i) => bank.filter((q) => q.correctIndex === i).length);
    const worst = Math.max(...spread);
    assert.ok(worst <= bank.length / 3, `answer positions are lopsided: ${spread.join("/")}`);
  });
});

/* ------------------------------------------------------- sitting assembly --- */

describe("sitting assembly", () => {
  it("fixes the mix at 75", () => {
    assert.equal(MIX.book + MIX.teammates + MIX.solo + MIX.brutal, TOTAL_QUESTIONS);
    assert.equal(TOTAL_QUESTIONS, 75);
    assert.ok(PASS_MARK < TOTAL_QUESTIONS);
  });

  it("draws a full 75 with every course selected, in the fixed mix", () => {
    const sitting = pickBankSitting([...COURSE_IDS]);
    assert.equal(sitting.length, TOTAL_QUESTIONS);
    for (const kind of ["book", "teammates", "solo", "brutal"] as const) {
      assert.equal(sitting.filter((q) => q.kind === kind).length, MIX[kind], `${kind} mix`);
    }
    assert.equal(new Set(sitting.map((q) => q.id)).size, TOTAL_QUESTIONS);
  });

  it("still returns 75 when only one course is selected", () => {
    for (const id of COURSE_IDS) {
      const sitting = pickBankSitting([id]);
      assert.equal(sitting.length, TOTAL_QUESTIONS, `${id} short`);
      assert.ok(
        sitting.some((q) => q.course === id),
        `${id} contributed nothing`,
      );
    }
  });

  it("pushes last sitting's questions to the back of the queue", () => {
    const first = pickBankSitting([...COURSE_IDS]);
    const avoid = first.map((q) => q.id);
    const second = pickBankSitting([...COURSE_IDS], avoid);
    const repeats = second.filter((q) => avoid.includes(q.id)).length;
    // 75 drawn from a bank of 121 must repeat at least 29; the guard should
    // keep the paper close to that floor rather than reshuffling the same one.
    assert.ok(repeats <= 35, `${repeats} of the paper repeated`);
    assert.ok(second.length - repeats >= 40, `only ${second.length - repeats} fresh questions`);
    assert.equal(second.length, TOTAL_QUESTIONS);
  });

  it("still serves a full paper when everything in the bank is on the avoid list", () => {
    const everything = allBankQuestions().map((q) => q.id);
    const sitting = pickBankSitting(["layer"], everything);
    assert.equal(sitting.length, TOTAL_QUESTIONS);
    assert.equal(new Set(sitting.map((q) => q.id)).size, TOTAL_QUESTIONS);
  });

  it("fillKind prefers unseen questions when it tops a batch up", () => {
    const partial = allBankQuestions()
      .filter((q) => q.kind === "book")
      .slice(0, 2);
    const seen = partial.map((q) => q.id);
    const filled = fillKind("book", partial, MIX.book, [...COURSE_IDS], seen);
    assert.equal(filled.length, MIX.book);
    assert.equal(
      filled.filter((q) => seen.includes(q.id)).length,
      partial.length,
      "fillKind reached for a repeat while unseen questions were left",
    );
  });

  it("varies between draws", () => {
    const first = pickBankSitting([...COURSE_IDS]).map((q) => q.id);
    let differs = false;
    for (let attempt = 0; attempt < 10 && !differs; attempt++) {
      const next = pickBankSitting([...COURSE_IDS]).map((q) => q.id);
      differs = next.some((id, i) => id !== first[i]);
    }
    assert.ok(differs, "ten draws produced the identical paper");
  });

  it("fillKind tops a short batch up to the required count", () => {
    const partial = allBankQuestions()
      .filter((q) => q.kind === "book")
      .slice(0, 2);
    const filled = fillKind("book", partial, MIX.book, [...COURSE_IDS]);
    assert.equal(filled.length, MIX.book);
    assert.equal(new Set(filled.map((q) => q.id)).size, MIX.book);
  });

  it("fillKind never returns more than it was asked for", () => {
    const all = allBankQuestions().filter((q) => q.kind === "solo");
    assert.equal(fillKind("solo", all, 5, [...COURSE_IDS]).length, 5);
  });
});

/* --------------------------------------------------------------- shuffling --- */

describe("shuffling", () => {
  const question: Question = {
    id: "fixture",
    kind: "book",
    course: "thesis",
    stem: "A fixture stem long enough to satisfy the minimum length rule.",
    options: ["alpha", "bravo", "charlie", "delta"],
    correctIndex: 2,
    explanation: "Charlie is the answer in this fixture.",
  };

  it("keeps the correct option text stable across a shuffle", () => {
    for (let i = 0; i < 50; i++) {
      const shuffled = shuffleQuestion(question);
      assert.equal(
        shuffled.options[shuffled.correctIndex],
        question.options[question.correctIndex],
      );
      assert.deepEqual([...shuffled.options].sort(), [...question.options].sort());
    }
  });

  it("does not always leave the correct answer at the same index", () => {
    const seen = new Set<number>();
    for (let i = 0; i < 60; i++) seen.add(shuffleQuestion(question).correctIndex);
    assert.ok(seen.size > 1, "correctIndex never moved");
  });

  it("preserves the question count when preparing a sitting", () => {
    const drawn = pickBankSitting([...COURSE_IDS]);
    assert.equal(prepareSittingQuestions(drawn).length, drawn.length);
  });

  it("shuffleInPlace is a permutation", () => {
    const source = Array.from({ length: 20 }, (_, i) => i);
    const shuffled = shuffleInPlace([...source]);
    assert.deepEqual(
      [...shuffled].sort((a, b) => a - b),
      source,
    );
  });
});

/* ------------------------------------------------------------------ clock --- */

describe("clock helpers", () => {
  const base = Date.UTC(2026, 0, 1, 12, 0, 0);

  const sitting = (over: Partial<Sitting>): Sitting => ({
    id: "s",
    createdAt: base,
    source: "bank",
    courses: [...COURSE_IDS],
    questions: [],
    answers: [],
    submittedAt: null,
    timeLimitMs: null,
    closedBy: null,
    ...over,
  });

  it("formats minutes and hours", () => {
    assert.equal(formatClock(0), "0:00");
    assert.equal(formatClock(65_000), "1:05");
    assert.equal(formatClock(3_725_000), "1:02:05");
    assert.equal(formatClock(-5), "0:00");
  });

  it("measures elapsed time against submission, then against now", () => {
    const open = sitting({});
    assert.equal(elapsedMs(open, base + 90_000), 90_000);
    const closed = sitting({ submittedAt: base + 45_000 });
    assert.equal(elapsedMs(closed, base + 900_000), 45_000);
  });

  it("reports no remaining time for an untimed sitting", () => {
    assert.equal(remainingMs(sitting({}), base), null);
  });

  it("counts a timed sitting down to zero and no further", () => {
    const timed = sitting({ timeLimitMs: 60_000 });
    assert.equal(remainingMs(timed, base + 10_000), 50_000);
    assert.equal(remainingMs(timed, base + 60_000), 0);
    assert.equal(remainingMs(timed, base + 120_000), 0);
  });
});

/* ------------------------------------------------------------------ store --- */

type StorageShape = {
  getItem: (k: string) => string | null;
  setItem: (k: string, v: string) => void;
  removeItem: (k: string) => void;
};

const memory: Record<string, string> = {};
const storage: StorageShape = {
  getItem: (k) => memory[k] ?? null,
  setItem: (k, v) => {
    memory[k] = v;
  },
  removeItem: (k) => {
    delete memory[k];
  },
};

// A v1 payload: no mode, no flag track, no timing, stamped with the old
// version 0. It has to be in place before store.ts is first imported so the
// migration actually runs.
memory["canon-hall-sitting"] = JSON.stringify({
  version: 0,
  state: {
    courses: ["thesis", "sdd"],
    sitting: {
      id: "legacy",
      createdAt: 1,
      source: "bank",
      courses: ["thesis", "sdd"],
      questions: [
        {
          id: "q1",
          kind: "book",
          course: "thesis",
          stem: "Legacy question one with a sufficiently long stem.",
          options: ["a", "b", "c", "d"],
          correctIndex: 1,
          explanation: "Legacy explanation for question one.",
        },
        {
          id: "q2",
          kind: "solo",
          course: "sdd",
          stem: "Legacy question two with a sufficiently long stem.",
          options: ["a", "b", "c", "d"],
          correctIndex: 3,
          explanation: "Legacy explanation for question two.",
        },
      ],
      answers: [1, null],
      submittedAt: null,
    },
    index: 1,
    phase: "exam",
  },
});

// zustand's default storage reads `window.localStorage`, so the stub has to hang
// off `window` for hydration to run at all under Node.
(globalThis as { window?: unknown }).window = { localStorage: storage };

const { useQuiz, unansweredCount, flaggedCount, scoreOf, emptyAnswers } =
  await import("./store.ts");

describe("store migration", () => {
  it("rebuilds a v1 sitting without losing it", () => {
    const state = useQuiz.getState();
    assert.equal(state.phase, "exam");
    assert.equal(state.index, 1);
    assert.deepEqual(state.mode, { kind: "open" });
    const sitting = state.sitting;
    assert.ok(sitting, "legacy sitting was dropped");
    assert.deepEqual(sitting.flagged, [false, false]);
    assert.equal(sitting.timeLimitMs, null);
    assert.equal(sitting.closedBy, null);
  });
});

describe("store flow", () => {
  const twoQuestions = (): Question[] => [
    {
      id: "q1",
      kind: "book",
      course: "thesis",
      stem: "Question one with a stem long enough to be a real question.",
      options: ["a", "b", "c", "d"],
      correctIndex: 1,
      explanation: "Explanation for question one.",
    },
    {
      id: "q2",
      kind: "solo",
      course: "sdd",
      stem: "Question two with a stem long enough to be a real question.",
      options: ["a", "b", "c", "d"],
      correctIndex: 3,
      explanation: "Explanation for question two.",
    },
  ];

  const startFresh = (over: Partial<Sitting> = {}) => {
    const questions = twoQuestions();
    useQuiz.getState().startSitting({
      id: "sitting",
      createdAt: 1000,
      source: "bank",
      courses: [...COURSE_IDS],
      questions,
      answers: questions.map(() => null),
      flagged: questions.map(() => false),
      timeLimitMs: null,
      closedBy: null,
      submittedAt: null,
      ...over,
    });
  };

  it("starts a sitting in the exam with a flag track", () => {
    startFresh();
    const state = useQuiz.getState();
    assert.equal(state.phase, "exam");
    assert.equal(state.index, 0);
    assert.deepEqual(state.sitting?.flagged, [false, false]);
    assert.equal(unansweredCount(state.sitting), 2);
  });

  it("records answers and scores them", () => {
    startFresh();
    useQuiz.getState().setAnswer(1); // correct for q1
    useQuiz.getState().go(1);
    useQuiz.getState().setAnswer(0); // wrong for q2
    const sitting = useQuiz.getState().sitting!;
    assert.deepEqual(sitting.answers, [1, 0]);
    assert.equal(scoreOf(sitting), 1);
    assert.equal(unansweredCount(sitting), 0);
  });

  it("refuses a manual submit while questions are blank", () => {
    startFresh();
    useQuiz.getState().setAnswer(1);
    useQuiz.getState().submit();
    assert.equal(useQuiz.getState().phase, "exam");
    assert.equal(useQuiz.getState().sitting?.submittedAt, null);
  });

  it("submits once everything is answered", () => {
    startFresh();
    useQuiz.getState().setAnswer(1);
    useQuiz.getState().go(1);
    useQuiz.getState().setAnswer(3);
    useQuiz.getState().submit();
    const state = useQuiz.getState();
    assert.equal(state.phase, "results");
    assert.equal(state.sitting?.closedBy, "submit");
    assert.ok(state.sitting?.submittedAt);
    assert.equal(scoreOf(state.sitting!), 2);
  });

  it("lets the clock close a sitting with blanks left", () => {
    startFresh({ timeLimitMs: 60_000 });
    useQuiz.getState().setAnswer(1);
    useQuiz.getState().submit("clock");
    const state = useQuiz.getState();
    assert.equal(state.phase, "results");
    assert.equal(state.sitting?.closedBy, "clock");
    assert.equal(unansweredCount(state.sitting), 1);
  });

  it("stops accepting answers after the sitting is closed", () => {
    startFresh();
    useQuiz.getState().setAnswer(1);
    useQuiz.getState().go(1);
    useQuiz.getState().setAnswer(3);
    useQuiz.getState().submit();
    useQuiz.getState().setAnswer(0);
    assert.deepEqual(useQuiz.getState().sitting?.answers, [1, 3]);
  });

  it("flags and unflags a question", () => {
    startFresh();
    useQuiz.getState().toggleFlag();
    assert.deepEqual(useQuiz.getState().sitting?.flagged, [true, false]);
    assert.equal(flaggedCount(useQuiz.getState().sitting), 1);
    useQuiz.getState().toggleFlag();
    assert.deepEqual(useQuiz.getState().sitting?.flagged, [false, false]);
  });

  it("jumps to the next unanswered question, wrapping once", () => {
    startFresh();
    useQuiz.getState().setAnswer(1); // index 0 answered
    useQuiz.getState().go(1);
    useQuiz.getState().setAnswer(3); // index 1 answered
    useQuiz.getState().go(1);
    useQuiz.getState().nextUnanswered();
    assert.equal(useQuiz.getState().index, 1, "nothing blank, so it stays put");

    useQuiz.getState().go(0);
    useQuiz.getState().clearAnswer();
    useQuiz.getState().go(1);
    useQuiz.getState().nextUnanswered();
    assert.equal(useQuiz.getState().index, 0, "wrapped back to the blank");
  });

  it("clamps navigation to the question range", () => {
    startFresh();
    useQuiz.getState().go(-5);
    assert.equal(useQuiz.getState().index, 0);
    useQuiz.getState().go(99);
    assert.equal(useQuiz.getState().index, 1);
  });

  it("keeps a submitted sitting when leaving for the hall, and drops it on abandon", () => {
    startFresh();
    useQuiz.getState().setAnswer(1);
    useQuiz.getState().go(1);
    useQuiz.getState().setAnswer(3);
    useQuiz.getState().submit();
    useQuiz.getState().goHome();
    assert.equal(useQuiz.getState().phase, "home");
    assert.ok(useQuiz.getState().sitting, "results were destroyed by going home");
    useQuiz.getState().reviewSitting();
    assert.equal(useQuiz.getState().phase, "results");
    useQuiz.getState().abandon();
    assert.equal(useQuiz.getState().sitting, null);
    assert.equal(useQuiz.getState().phase, "home");
  });

  it("will not abandon the last selected course", () => {
    useQuiz.setState({ courses: ["thesis"] });
    useQuiz.getState().toggleCourse("thesis");
    assert.deepEqual(useQuiz.getState().courses, ["thesis"]);
    useQuiz.getState().toggleCourse("sdd");
    assert.deepEqual(useQuiz.getState().courses, ["thesis", "sdd"]);
    useQuiz.getState().setAllCourses();
    assert.deepEqual(useQuiz.getState().courses, [...COURSE_IDS]);
  });

  it("emptyAnswers matches the sitting length", () => {
    assert.equal(emptyAnswers().length, TOTAL_QUESTIONS);
  });
});
