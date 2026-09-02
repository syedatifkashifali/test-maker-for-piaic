import type { CourseId, Question, QuestionKind } from "../types";
import { MIX } from "../types";
import { shuffleCopy, shuffleQuestion } from "../shuffle";
import { BOOK } from "./book";
import { TEAMMATES } from "./teammates";
import { SOLO_A } from "./solo-a";
import { SOLO_B } from "./solo-b";
import { BRUTAL } from "./brutal";

const ALL: Question[] = [...BOOK, ...TEAMMATES, ...SOLO_A, ...SOLO_B, ...BRUTAL];

const BY_KIND: Record<QuestionKind, Question[]> = {
  book: BOOK,
  teammates: TEAMMATES,
  solo: [...SOLO_A, ...SOLO_B],
  brutal: BRUTAL,
};

export function allBankQuestions(): Question[] {
  return ALL;
}

export function pickBankSitting(courses: CourseId[]): Question[] {
  const allow = new Set(courses);
  const out: Question[] = [];
  (Object.keys(MIX) as QuestionKind[]).forEach((kind) => {
    const pool = shuffleCopy(
      BY_KIND[kind].filter((q) => allow.has(q.course)),
    );
    const need = MIX[kind];
    if (pool.length >= need) {
      out.push(...pool.slice(0, need));
      return;
    }
    const extra = shuffleCopy(
      BY_KIND[kind].filter((q) => !allow.has(q.course)),
    );
    out.push(...pool, ...extra.slice(0, Math.max(0, need - pool.length)));
  });
  return out.map(shuffleQuestion);
}

export function fillKind(
  kind: QuestionKind,
  have: Question[],
  need: number,
  courses: CourseId[],
): Question[] {
  if (have.length >= need) return have.slice(0, need);
  const allow = new Set(courses);
  const used = new Set(have.map((q) => q.id));
  const pool = shuffleCopy(
    BY_KIND[kind].filter((q) => allow.has(q.course) && !used.has(q.id)),
  );
  const extra = shuffleCopy(
    BY_KIND[kind].filter((q) => !used.has(q.id)),
  );
  const merged = [...have, ...pool, ...extra];
  return merged.slice(0, need).map(shuffleQuestion);
}
