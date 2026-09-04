import type { CourseId, Question, QuestionKind } from "../types.ts";

export function Q(
  id: string,
  kind: QuestionKind,
  course: CourseId,
  stem: string,
  options: [string, string, string, string],
  correctIndex: 0 | 1 | 2 | 3,
  explanation: string,
): Question {
  return { id, kind, course, stem, options, correctIndex, explanation };
}
