import type { CourseId, Question, QuestionKind } from "../types.ts";
import { COURSE_IDS, MIX } from "../types.ts";
import { shuffleCopy, shuffleQuestion } from "../shuffle.ts";
import { BOOK } from "./book.ts";
import { TEAMMATES } from "./teammates.ts";
import { SOLO_A } from "./solo-a.ts";
import { SOLO_B } from "./solo-b.ts";
import { BRUTAL } from "./brutal.ts";

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

/**
 * Orders a shuffled pool so questions the candidate has already sat go last.
 * The pool still yields repeats when it has to — a full paper matters more than
 * a fresh one — but a repeat only appears after every unseen question is used.
 */
function preferFresh(pool: Question[], avoid: Set<string>): Question[] {
  if (avoid.size === 0) return pool;
  const fresh = pool.filter((q) => !avoid.has(q.id));
  const seen = pool.filter((q) => avoid.has(q.id));
  return [...fresh, ...seen];
}

/**
 * Draws one paper from the prepared bank.
 *
 * Two sittings in a row are different papers: within each kind, unseen
 * questions are taken before the ones `avoid` names, and course order is
 * shuffled per kind. Staying inside the selected courses still outranks
 * freshness — a course-scoped sitting fills from its own courses first.
 */
export function pickBankSitting(courses: CourseId[], avoid: Iterable<string> = []): Question[] {
  const allow = new Set(courses);
  const seen = new Set(avoid);
  const out: Question[] = [];
  (Object.keys(MIX) as QuestionKind[]).forEach((kind) => {
    const need = MIX[kind];
    const inScope = preferFresh(
      shuffleCopy(BY_KIND[kind].filter((q) => allow.has(q.course))),
      seen,
    );
    const taken = inScope.slice(0, need);
    if (taken.length === need) {
      out.push(...taken);
      return;
    }
    const elsewhere = preferFresh(
      shuffleCopy(BY_KIND[kind].filter((q) => !allow.has(q.course))),
      seen,
    );
    out.push(...taken, ...elsewhere.slice(0, need - taken.length));
  });
  return out.map(shuffleQuestion);
}

export function fillKind(
  kind: QuestionKind,
  have: Question[],
  need: number,
  courses: CourseId[],
  avoid: Iterable<string> = [],
): Question[] {
  if (have.length >= need) return have.slice(0, need);
  const allow = new Set(courses);
  const seen = new Set(avoid);
  const used = new Set(have.map((q) => q.id));
  const pool = preferFresh(
    shuffleCopy(BY_KIND[kind].filter((q) => allow.has(q.course) && !used.has(q.id))),
    seen,
  );
  const extra = preferFresh(shuffleCopy(BY_KIND[kind].filter((q) => !used.has(q.id))), seen);
  const merged = [...have, ...pool, ...extra];
  return merged.slice(0, need).map(shuffleQuestion);
}

/** Questions the prepared bank holds per course, keyed by course id. */
export function bankCoverageByCourse(): Record<CourseId, number> {
  const counts = Object.fromEntries(COURSE_IDS.map((id) => [id, 0])) as Record<CourseId, number>;
  for (const q of ALL) counts[q.course] += 1;
  return counts;
}
