/**
 * DOM test for the exam hall. Runs under jsdom through `npm run test:dom`
 * (scripts/dom-test.mjs boots Vite so the JSX and `@/` aliases resolve), and
 * drives the real components with real clicks and key presses.
 *
 * This is the check that the interactive parts — answering, flagging, the
 * submit gate, the confirm step, the results filters — actually work, which
 * neither the pure-logic tests nor SSR rendering can show.
 */
import { afterEach, beforeEach, describe, it } from "node:test";
import assert from "node:assert/strict";
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { COURSE_IDS, type Question, type Sitting } from "@/lib/quiz/types";
import { emptyAnswers, unansweredCount, useQuiz } from "@/lib/quiz/store";
import { pickBankSitting } from "@/lib/quiz/bank/index.ts";
import { ExamView } from "./exam-view";
import { HomeView } from "./home-view";
import { ResultsView } from "./results-view";

const win = globalThis.window as unknown as Window & typeof globalThis;

function questions(): Question[] {
  return [
    {
      id: "d1",
      kind: "book",
      course: "thesis",
      stem: "First dom question with a stem long enough to look real.",
      options: ["alpha", "bravo", "charlie", "delta"],
      correctIndex: 1,
      explanation: "Bravo is the right answer here.",
    },
    {
      id: "d2",
      kind: "solo",
      course: "sdd",
      stem: "Second dom question with a stem long enough to look real.",
      options: ["alpha", "bravo", "charlie", "delta"],
      correctIndex: 3,
      explanation: "Delta is the right answer here.",
    },
    {
      id: "d3",
      kind: "brutal",
      course: "layer",
      stem: "Third dom question with a stem long enough to look real.",
      options: ["alpha", "bravo", "charlie", "delta"],
      correctIndex: 0,
      explanation: "Alpha is the right answer here.",
    },
  ];
}

function startDomSitting(over: Partial<Sitting> = {}) {
  const qs = questions();
  useQuiz.getState().startSitting({
    id: "dom",
    createdAt: Date.now() - 30_000,
    source: "bank",
    courses: [...COURSE_IDS],
    questions: qs,
    answers: qs.map(() => null),
    flagged: qs.map(() => false),
    timeLimitMs: null,
    closedBy: null,
    submittedAt: null,
    ...over,
  });
  return qs;
}

function buttons(scope: ParentNode): HTMLButtonElement[] {
  return Array.from(scope.querySelectorAll("button"));
}

function byText(scope: ParentNode, text: string): HTMLButtonElement | undefined {
  return buttons(scope).find((b) => (b.textContent ?? "").includes(text));
}

function click(el: Element | null | undefined) {
  assert.ok(el, "element to click was missing");
  act(() => {
    el.dispatchEvent(new win.MouseEvent("click", { bubbles: true }));
  });
}

function press(key: string) {
  act(() => {
    win.dispatchEvent(new win.KeyboardEvent("keydown", { key, bubbles: true }));
  });
}

let container: HTMLDivElement;
let root: Root;

beforeEach(() => {
  container = win.document.createElement("div");
  win.document.body.appendChild(container);
  root = createRoot(container);
  useQuiz.setState({
    phase: "home",
    sitting: null,
    index: 0,
    error: null,
    courses: [...COURSE_IDS],
  });
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
});

function render(node: React.ReactElement) {
  act(() => root.render(node));
}

describe("home", () => {
  it("lets the candidate pick conditions and start a paper", () => {
    render(<HomeView onGenerate={() => {}} />);
    const text = container.textContent ?? "";
    assert.match(text, /Canon Hall/);
    assert.match(text, /Untimed/);

    click(byText(container, "Timed"));
    assert.deepEqual(useQuiz.getState().mode.kind, "timed");
    assert.match(container.textContent ?? "", /closes itself after 90 minutes/);

    click(byText(container, "45 min"));
    const mode = useQuiz.getState().mode;
    assert.deepEqual(mode, { kind: "timed", minutes: 45 });

    // Course selection keeps at least one course in play.
    for (const id of COURSE_IDS.slice(1)) {
      click(byText(container, id === "thesis" ? "The Agent Factory Thesis" : "") ?? null);
      void id;
    }
    assert.equal(useQuiz.getState().courses.length, COURSE_IDS.length);
    click(byText(container, "Spec-Driven Development"));
    assert.deepEqual(useQuiz.getState().courses.includes("sdd"), false);
    click(byText(container, "Select all six"));
    assert.deepEqual(useQuiz.getState().courses, [...COURSE_IDS]);
  });
});

describe("exam", () => {
  it("records an answer when an option is clicked", () => {
    startDomSitting();
    render(<ExamView />);
    assert.match(container.textContent ?? "", /Question 1 of 3/);
    assert.match(container.textContent ?? "", /3 unanswered/);

    click(byText(container, "charlie"));
    assert.equal(useQuiz.getState().sitting?.answers[0], 2);
    assert.equal(unansweredCount(useQuiz.getState().sitting), 2);
  });

  it("answers from the keyboard and flags with F", () => {
    startDomSitting();
    render(<ExamView />);
    press("b");
    assert.equal(useQuiz.getState().sitting?.answers[0], 1);
    press("3");
    assert.equal(useQuiz.getState().sitting?.answers[0], 2);
    press("f");
    assert.deepEqual(useQuiz.getState().sitting?.flagged?.[0], true);
    press("ArrowRight");
    assert.equal(useQuiz.getState().index, 1);
    press("ArrowLeft");
    assert.equal(useQuiz.getState().index, 0);
  });

  it("keeps submit locked until every question is answered, then asks to confirm", () => {
    startDomSitting();
    render(<ExamView />);

    const locked = byText(container, "left to answer");
    assert.ok(locked, "expected the locked submit label");
    assert.equal(locked.disabled, true);

    click(byText(container, "bravo")); // q1 correct
    press("ArrowRight");
    click(byText(container, "alpha")); // q2 wrong
    press("ArrowRight");
    assert.ok(byText(container, "1 left to answer"), "still locked with one blank");
    click(byText(container, "alpha")); // q3 correct
    assert.equal(unansweredCount(useQuiz.getState().sitting), 0);

    const ready = byText(container, "Submit sitting");
    assert.ok(ready, "submit should be offered once nothing is blank");
    click(ready);
    assert.equal(useQuiz.getState().phase, "exam", "one click only arms it");
    assert.match(container.textContent ?? "", /Submit for marking\?/);
    click(byText(container, "Submit for marking?"));
    assert.equal(useQuiz.getState().phase, "results");
    assert.equal(useQuiz.getState().sitting?.closedBy, "submit");
  });

  it("jumps to the next unanswered question", () => {
    startDomSitting();
    render(<ExamView />);
    click(byText(container, "bravo"));
    click(byText(container, "Next unanswered"));
    assert.equal(useQuiz.getState().index, 1);
  });

  it("opens the mobile question list", () => {
    startDomSitting();
    render(<ExamView />);
    const opener = buttons(container).find((b) =>
      /^\d+\/\d+ answered$/.test((b.textContent ?? "").trim()),
    );
    assert.ok(opener, "mobile palette opener missing");
    click(opener);
    const dialog = container.querySelector('[role="dialog"]');
    assert.ok(dialog, "question list did not open");
    assert.equal(dialog.querySelectorAll("button").length >= 3, true);
    press("Escape");
    assert.equal(container.querySelector('[role="dialog"]'), null);
  });

  it("counts a timed sitting down and closes it when the clock runs out", () => {
    startDomSitting({ timeLimitMs: 60_000 });
    render(<ExamView />);
    assert.match(container.textContent ?? "", /left/);

    // Wind the sitting's start back past the limit; the next tick closes it.
    act(() => {
      useQuiz.setState({
        sitting: {
          ...useQuiz.getState().sitting!,
          createdAt: Date.now() - 120_000,
        },
      });
    });
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        act(() => {});
        assert.equal(useQuiz.getState().phase, "results");
        assert.equal(useQuiz.getState().sitting?.closedBy, "clock");
        resolve();
      }, 1300);
    });
  });

  it("survives a reload: an unfinished sitting resumes from storage", () => {
    startDomSitting();
    render(<ExamView />);
    click(byText(container, "bravo"));
    const raw = win.localStorage.getItem("canon-hall-sitting");
    assert.ok(raw, "nothing was persisted");
    const parsed = JSON.parse(raw) as {
      version: number;
      state: {
        phase: string;
        index: number;
        lastIds: string[];
        sitting: { answers: unknown[]; questions: { id: string }[] };
      };
    };
    assert.equal(parsed.version, 3);
    assert.equal(parsed.state.phase, "exam");
    assert.deepEqual(parsed.state.sitting.answers[0], 1);
    // The repeat guard has to survive a reload, or a refresh would hand back
    // the same paper the candidate just sat.
    assert.deepEqual(
      parsed.state.lastIds,
      parsed.state.sitting.questions.map((q) => q.id),
    );
  });
});

describe("results", () => {
  function submitADomSitting() {
    const qs = startDomSitting();
    const s = useQuiz.getState();
    for (let i = 0; i < qs.length; i++) {
      s.go(i);
      // right, wrong, right
      s.setAnswer(i === 1 ? 0 : qs[i].correctIndex);
    }
    useQuiz.getState().toggleFlag(1);
    useQuiz.getState().submit();
    return qs;
  }

  it("shows the score, the breakdowns and the review filters", () => {
    submitADomSitting();
    render(<ResultsView onAgain={() => {}} />);
    const text = container.textContent ?? "";
    assert.match(text, /2\s*\/\s*3|2\/3/);
    assert.match(text, /Cleared|Did not clear/);
    assert.match(text, /By question type/);
    assert.match(text, /By course/);
    assert.match(text, /Time/);

    click(byText(container, "Missed only"));
    assert.equal(container.querySelectorAll("ol > li").length, 1);
    click(byText(container, "Flagged"));
    assert.equal(container.querySelectorAll("ol > li").length, 1);
    click(byText(container, "Every question"));
    assert.equal(container.querySelectorAll("ol > li").length, 3);
  });

  it("keeps the paper when going back to the hall, and drops it on discard", () => {
    submitADomSitting();
    render(<ResultsView onAgain={() => {}} />);
    click(byText(container, "Back to hall"));
    assert.equal(useQuiz.getState().phase, "home");
    assert.ok(useQuiz.getState().sitting, "results were destroyed");

    render(<HomeView onGenerate={() => {}} />);
    const review = byText(container, "Review last sitting");
    assert.ok(review, "no way back to the results");
    click(review);
    assert.equal(useQuiz.getState().phase, "results");

    render(<ResultsView onAgain={() => {}} />);
    click(byText(container, "Discard results"));
    assert.equal(useQuiz.getState().sitting, null);
  });

  it("draws a full 75 from the bank and scores it", () => {
    const qs = pickBankSitting([...COURSE_IDS]);
    assert.equal(qs.length, 75);
    useQuiz.getState().startSitting({
      id: "full",
      createdAt: Date.now(),
      source: "bank",
      courses: [...COURSE_IDS],
      questions: qs,
      answers: emptyAnswers(),
      flagged: [],
      timeLimitMs: null,
      closedBy: null,
      submittedAt: null,
    });
    const s = useQuiz.getState();
    for (let i = 0; i < qs.length; i++) {
      s.go(i);
      s.setAnswer(qs[i].correctIndex);
    }
    useQuiz.getState().submit();
    assert.equal(useQuiz.getState().phase, "results");
    render(<ResultsView onAgain={() => {}} />);
    assert.match(container.textContent ?? "", /75\s*\/\s*75|75\/75/);
    assert.match(container.textContent ?? "", /Cleared/);
  });
});
