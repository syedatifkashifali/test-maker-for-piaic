import type { Question } from "./types.ts";

export function shuffleInPlace<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function shuffleCopy<T>(arr: readonly T[]): T[] {
  return shuffleInPlace([...arr]);
}

export function shuffleQuestion(q: Question): Question {
  const indexed = q.options.map((text, i) => ({ text, i }));
  shuffleInPlace(indexed);
  const options = indexed.map((x) => x.text) as Question["options"];
  const correctIndex = indexed.findIndex((x) => x.i === q.correctIndex) as 0 | 1 | 2 | 3;
  return { ...q, options, correctIndex };
}

export function prepareSittingQuestions(questions: Question[]): Question[] {
  return shuffleInPlace(questions.map(shuffleQuestion));
}
