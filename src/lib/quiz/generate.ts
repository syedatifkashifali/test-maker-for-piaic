import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { CORPUS } from "./corpus.ts";
import { fillKind } from "./bank/index.ts";
import { prepareSittingQuestions } from "./shuffle.ts";
import {
  COURSE_IDS,
  COURSES,
  MIX,
  TOTAL_QUESTIONS,
  type CourseId,
  type Question,
  type QuestionKind,
} from "./types.ts";

const courseSchema = z.enum(COURSE_IDS);

const inputSchema = z.object({
  courses: z.array(courseSchema).min(1),
  /**
   * Question ids the candidate sat last time. They go to the back of the queue
   * rather than being excluded, so a full paper is always possible.
   */
  avoid: z.array(z.string()).max(500).optional(),
});

const modelQuestionSchema = z.object({
  kind: z.enum(["book", "teammates", "solo", "brutal"]),
  course: courseSchema,
  stem: z.string().min(40),
  options: z.tuple([z.string(), z.string(), z.string(), z.string()]),
  correctIndex: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3)]),
  explanation: z.string().min(20),
});

const batchSchema = z.object({
  questions: z.array(modelQuestionSchema),
});

const STYLE = `
EXAM STYLE (mandatory — this is a Panaversity-hard sitting):
- Four options A–D, and the answer must not be findable without knowing the canon.
- LENGTH PARITY (hard rule): all four options within 8% of each other in characters. If the correct option is the longest it is guessable, so cut it or lengthen the distractors until it is not. No option may be a throwaway one-liner next to three full sentences.
- Never make the correct option the only specific one, the only one naming a file, or the only one that hedges.
- Distractors must be near-miss: real course concepts, misapplied to this situation. A distractor a candidate can eliminate on sight wastes the slot.
- Options must be near-synonyms of each other: two will look almost right; one is a common mix-up of adjacent concepts (skill vs subagent, compact vs clear, constitution vs spec, identic vs Digital FTE, SOUL vs MEMORY, model vs layer, hook vs rules file).
- Do NOT telegraph the answer in the stem. Bury the diagnostic detail in a long situation.
- No "which of the following is true" unless kind=book.
- Never use emoji. Never praise the student. Never say "the correct answer is obviously".
- Stems must be original; do not clone wording from any sample in the prompt.
- correctIndex is 0-3 after you write options in that order (we will shuffle later).

KIND RULES:
- book (${MIX.book} of these in a full sitting): mid-to-hard, still close to the text. Short-medium stem. May name a command, file, or statistic from the canon. Not trivia of keybinds alone — still a why/which-applies.
- teammates (${MIX.teammates}): TWO named people in one situation. One of them offers plausible but wrong advice. The question is who/what to actually do. Long messy stem.
- solo (${MIX.solo}): ONE person (or "you"). Long situation, buried tell, close options. Same difficulty as teammates.
- brutal (${MIX.brutal}): denser English, subordinate clauses, academic diction. Adjacent-concept traps. Harder than the rest. Still grounded in the canon — no invented APIs.

GROUNDING: Only facts in the CANON below. If unsure, do not invent product behaviour.
`.trim();

function kindPrompt(kind: QuestionKind, count: number, courses: CourseId[]) {
  const labels = courses.map((id) => COURSES.find((c) => c.id === id)?.title ?? id).join("; ");
  return `Write exactly ${count} multiple-choice questions of kind="${kind}" covering these courses: ${labels}.
Spread across those courses; do not put every question on one page.
Return JSON only: {"questions":[{ "kind":"${kind}", "course":"<id>", "stem":"...", "options":["...","...","...","..."], "correctIndex":0, "explanation":"..." }]}
course must be one of: ${courses.join(", ")}.
${STYLE}`;
}

async function completeJson(prompt: string, maxTokens: number): Promise<string> {
  const apiKey = process.env.XAI_API_KEY;
  if (!apiKey) throw new Error("AI is not available in this environment");

  const res = await fetch("https://api.x.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "grok-4.5",
      temperature: 0.7,
      max_tokens: maxTokens,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: "You write Panaversity-difficulty exam items. JSON only. No markdown.",
        },
        {
          role: "user",
          content: `CANON:\n${CORPUS}\n\n${prompt}`,
        },
      ],
    }),
  });
  if (!res.ok) {
    const t = await res.text().catch(() => "");
    throw new Error(`xAI API error ${res.status} ${t.slice(0, 180)}`);
  }
  const body = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  return body.choices?.[0]?.message?.content ?? "";
}

function parseBatch(raw: string, kind: QuestionKind): Question[] {
  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch {
    const start = raw.indexOf("{");
    const end = raw.lastIndexOf("}");
    if (start >= 0 && end > start) {
      json = JSON.parse(raw.slice(start, end + 1));
    } else {
      return [];
    }
  }
  const parsed = batchSchema.safeParse(json);
  if (!parsed.success) return [];
  return parsed.data.questions
    .filter((q) => q.kind === kind)
    .map((q, i) => ({
      id: `g-${kind}-${Date.now().toString(36)}-${i}-${Math.random().toString(36).slice(2, 7)}`,
      kind: q.kind,
      course: q.course,
      stem: q.stem.trim(),
      options: q.options.map((o) => o.trim()) as Question["options"],
      correctIndex: q.correctIndex,
      explanation: q.explanation.trim(),
    }));
}

async function generateKind(
  kind: QuestionKind,
  count: number,
  courses: CourseId[],
  avoid: string[],
): Promise<Question[]> {
  const maxTokens = Math.min(16000, 900 + count * 520);
  try {
    const raw = await completeJson(kindPrompt(kind, count, courses), maxTokens);
    const got = parseBatch(raw, kind);
    return fillKind(kind, got, count, courses, avoid);
  } catch {
    return fillKind(kind, [], count, courses, avoid);
  }
}

export const generateSitting = createServerFn({ method: "POST" })
  .validator((input: unknown) => inputSchema.parse(input))
  .handler(async ({ data }) => {
    const courses = data.courses;
    const avoid = data.avoid ?? [];
    // Reported so the UI can say plainly that the prepared bank was used,
    // instead of quietly serving bank questions under a "model" label.
    const modelAvailable = Boolean(process.env.XAI_API_KEY);
    const chunks: { kind: QuestionKind; count: number }[] = [
      { kind: "book", count: MIX.book },
      { kind: "teammates", count: MIX.teammates },
      { kind: "solo", count: MIX.solo },
      { kind: "brutal", count: MIX.brutal },
    ];

    const parts = await Promise.all(
      chunks.map((c) => generateKind(c.kind, c.count, courses, avoid)),
    );
    const questions = prepareSittingQuestions(parts.flat());
    if (questions.length !== TOTAL_QUESTIONS) {
      return {
        ok: false as const,
        error: "Could not assemble a full sitting.",
        modelAvailable,
        generatedCount: 0,
      };
    }
    const generatedCount = questions.filter((q) => q.id.startsWith("g-")).length;
    return {
      ok: true as const,
      source: (generatedCount >= 40 ? "generated" : "bank") as "generated" | "bank",
      modelAvailable,
      generatedCount,
      questions,
    };
  });

export const bankSitting = createServerFn({ method: "POST" })
  .validator((input: unknown) => inputSchema.parse(input))
  .handler(async ({ data }) => {
    const { pickBankSitting } = await import("./bank/index.ts");
    const questions = prepareSittingQuestions(pickBankSitting(data.courses, data.avoid ?? []));
    return { ok: true as const, source: "bank" as const, questions };
  });

/**
 * Bank depth per course, so the hall can say what deselecting a course costs
 * before the candidate commits. Computed from the same bank the sitting is
 * drawn from, so it cannot drift from it.
 */
export const bankCoverage = createServerFn({ method: "GET" }).handler(async () => {
  const { bankCoverageByCourse } = await import("./bank/index.ts");
  return bankCoverageByCourse();
});
