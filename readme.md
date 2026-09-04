# Canon Hall — Agent Factory test maker

A 75-question, Panaversity-hard sitting built from the six Agent Factory canon
pages (Thesis, Agentic Coding, Spec-Driven Development, Problem Solving,
OpenClaw, AI Operating Layer).

## The paper

Every sitting is the same fixed mix — it is not configurable. It is weighted
towards the hard kinds: the close reading of the text is the warm-up and the
dense-English items are the finish.

| Kind                   | Count | What it is                                  |
| ---------------------- | ----- | ------------------------------------------- |
| Canon (from the text)  | 6     | Mid-to-hard, close to the page              |
| Two people in the room | 24    | Two named people; one of them is wrong      |
| One person, a mess     | 35    | Long situation, buried tell, close options  |
| Dense English          | 10    | Subordinate clauses, adjacent-concept traps |

Pass mark: **53 / 75**. Options are never coloured until the sitting is closed,
and option order is shuffled per question so A–D never encode correctness.

**Every sitting is a different paper.** The draw is shuffled again each time, and
the questions you sat last time go to the back of the queue, so most of the paper
is new. (75 questions come from a bank of 121, so a handful necessarily repeat —
the guard keeps that at the floor rather than the ceiling.)

## Why the options are hard to guess

The bank used to be guessable by eye: the correct option was the longest in 114
of 121 questions. Every option was rewritten so that

- no correct option leads the longest distractor by more than 8% of its length,
- no question pairs three full sentences with a throwaway one-liner,
- distractors are near-misses — real course concepts misapplied to the situation,
  so each one can only be ruled out by knowing the canon.

`quiz.test.ts` enforces all three over the whole bank, plus an even spread of
answer positions, so the tell cannot come back unnoticed. The model prompt in
`generate.ts` carries the same rules for generated sittings.

## Where the questions come from

- **Generate a new sitting** asks the model for a fresh 75 (`XAI_API_KEY`,
  server-side only). Anything the model does not return is filled from the
  prepared bank, and the hall says so instead of passing bank questions off as
  generated.
- **Use prepared bank** draws from the 121 hand-written questions in
  `src/lib/quiz/bank/`. Deselecting courses biases the draw toward them; the
  paper is still 75.

## Sitting features

Untimed by default, or timed (45/60/90/120 min) — a timed hall closes itself and
counts blanks as missed. During a sitting: progress bar, clock, flag questions,
jump to the next blank, a question palette (a bottom sheet on mobile), keyboard
control (`A`–`D` / `1`–`4` to answer, `←`/`→` to move, `F` to flag), and a
two-step confirm on submit and abandon. Progress survives a reload.

Afterwards: score, accuracy, time taken, breakdowns by question type and by
course, and a review that can be filtered to missed or flagged questions. Going
back to the hall keeps the paper; "Discard results" is what destroys it.

## Development

```sh
npm install
npm run dev        # http://localhost:8080
npm test           # unit + bank integrity + jsdom UI tests
npm run typecheck
npm run lint
npm run build
```

- `src/lib/quiz/quiz.test.ts` — bank integrity, mix, shuffling, store flow,
  migration of sittings saved by older versions.
- `src/components/hall/hall.dom.test.tsx` (`npm run test:dom`) — drives the real
  components under jsdom: clicking an option, the submit gate, the confirm step,
  the clock, the results filters.
