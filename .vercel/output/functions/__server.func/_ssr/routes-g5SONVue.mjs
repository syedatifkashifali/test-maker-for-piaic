import { i as __toESM } from "../_runtime.mjs";
import { R as require_react, v as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { a as TIME_LIMITS, c as formatClock, i as MIX, l as remainingMs, n as COURSE_IDS, o as TOTAL_QUESTIONS, r as KIND_LABEL, s as elapsedMs, t as COURSES } from "./types-Crii9q60.mjs";
import { a as object, n as array, o as string, t as _enum } from "../_libs/zod.mjs";
import { a as LoaderCircle, c as Grid3x3, d as ChevronRight, f as ChevronLeft, i as PenLine, l as Flag, m as ArrowUpRight, o as Infinity$1, p as BookOpen, r as Timer, s as History, t as X, u as Clock } from "../_libs/lucide-react.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-g5SONVue.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var emptyAnswers = (count = TOTAL_QUESTIONS) => Array.from({ length: count }, () => null);
var emptyFlags = (count) => Array.from({ length: count }, () => false);
/** Pads/truncates a boolean track to the length of the question list. */
function flagsFor(sitting) {
	const have = sitting.flagged ?? [];
	const next = emptyFlags(sitting.questions.length);
	for (let i = 0; i < next.length; i++) next[i] = have[i] === true;
	return next;
}
var useQuiz = create()(persist((set, get) => ({
	phase: "home",
	courses: [...COURSE_IDS],
	mode: { kind: "open" },
	sitting: null,
	index: 0,
	lastIds: [],
	error: null,
	loadNote: "Composing the sitting…",
	fallbackNote: null,
	toggleCourse: (id) => set((s) => {
		const has = s.courses.includes(id);
		if (has && s.courses.length === 1) return s;
		return { courses: has ? s.courses.filter((c) => c !== id) : [...s.courses, id] };
	}),
	setAllCourses: () => set({ courses: [...COURSE_IDS] }),
	setMode: (mode) => set({ mode }),
	setPhase: (phase) => set({ phase }),
	startSitting: (sitting) => set({
		sitting: {
			...sitting,
			flagged: flagsFor(sitting)
		},
		index: 0,
		lastIds: sitting.questions.map((q) => q.id),
		phase: "exam",
		error: null
	}),
	setAnswer: (choice) => {
		const { sitting, index } = get();
		if (!sitting || sitting.submittedAt) return;
		const answers = [...sitting.answers];
		answers[index] = choice;
		set({ sitting: {
			...sitting,
			answers
		} });
	},
	clearAnswer: () => {
		const { sitting, index } = get();
		if (!sitting || sitting.submittedAt) return;
		const answers = [...sitting.answers];
		answers[index] = null;
		set({ sitting: {
			...sitting,
			answers
		} });
	},
	toggleFlag: (at) => {
		const { sitting, index } = get();
		if (!sitting || sitting.submittedAt) return;
		const i = at ?? index;
		if (i < 0 || i >= sitting.questions.length) return;
		const flagged = flagsFor(sitting);
		flagged[i] = !flagged[i];
		set({ sitting: {
			...sitting,
			flagged
		} });
	},
	go: (index) => {
		const { sitting } = get();
		if (!sitting) return;
		const max = sitting.questions.length - 1;
		set({ index: Math.min(max, Math.max(0, index)) });
	},
	nextUnanswered: (from) => {
		const { sitting, index, go } = get();
		if (!sitting) return;
		const start = from ?? index;
		const total = sitting.questions.length;
		if (total === 0) return;
		for (let step = 1; step <= total; step++) {
			const candidate = (start + step) % total;
			if (sitting.answers[candidate] === null) {
				go(candidate);
				return;
			}
		}
	},
	submit: (reason = "submit") => {
		const { sitting } = get();
		if (!sitting || sitting.submittedAt) return;
		if (reason === "submit" && unansweredCount(sitting) > 0) return;
		set({
			sitting: {
				...sitting,
				submittedAt: Date.now(),
				closedBy: reason
			},
			phase: "results"
		});
	},
	goHome: () => set({
		phase: "home",
		error: null
	}),
	abandon: () => set({
		sitting: null,
		index: 0,
		phase: "home",
		error: null,
		fallbackNote: null
	}),
	reviewSitting: () => {
		const { sitting } = get();
		if (!sitting?.submittedAt) return;
		set({
			phase: "results",
			index: 0
		});
	},
	setError: (error) => set({ error }),
	setLoadNote: (loadNote) => set({ loadNote }),
	setFallbackNote: (fallbackNote) => set({ fallbackNote })
}), {
	name: "canon-hall-sitting",
	version: 3,
	partialize: (s) => ({
		courses: s.courses,
		mode: s.mode,
		sitting: s.sitting,
		index: s.index,
		phase: s.phase === "loading" ? s.sitting ? "exam" : "home" : s.phase,
		lastIds: s.lastIds
	}),
	/**
	* Sittings written by the first version have no flag track and no timing
	* fields. Rebuild the tracks from the question list rather than letting a
	* stale shape reach the UI, and drop a sitting whose answers no longer
	* line up with its questions.
	*/
	migrate: (persisted, _version) => {
		const state = persisted ?? {};
		const sitting = state.sitting ?? null;
		const base = {
			courses: state.courses?.length ? state.courses : [...COURSE_IDS],
			mode: state.mode ?? { kind: "open" },
			sitting,
			index: state.index ?? 0,
			phase: state.phase === "exam" || state.phase === "results" ? state.phase : "home",
			lastIds: Array.isArray(state.lastIds) ? state.lastIds : []
		};
		if (!sitting || !Array.isArray(sitting.questions) || !Array.isArray(sitting.answers) || sitting.answers.length !== sitting.questions.length) return {
			...base,
			sitting: null,
			index: 0,
			phase: "home"
		};
		const restored = {
			...sitting,
			flagged: flagsFor(sitting),
			timeLimitMs: sitting.timeLimitMs ?? null,
			closedBy: sitting.closedBy ?? (sitting.submittedAt ? "submit" : null)
		};
		const phase = restored.submittedAt ? "results" : base.phase === "exam" ? "exam" : "home";
		return {
			...base,
			sitting: restored,
			phase
		};
	}
}));
/**
* Blanks are counted against the questions actually in the sitting, never
* against the 75-question ideal — a short paper must still be submittable.
*/
function unansweredCount(sitting) {
	if (!sitting) return TOTAL_QUESTIONS;
	let blank = 0;
	for (let i = 0; i < sitting.questions.length; i++) if (sitting.answers[i] === null) blank++;
	return blank;
}
function flaggedCount(sitting) {
	if (!sitting) return 0;
	return (sitting.flagged ?? []).filter(Boolean).length;
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var LETTERS = [
	"A",
	"B",
	"C",
	"D"
];
function OptionList({ question, selected, revealed, onSelect }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "mt-6 flex flex-col gap-2",
		children: question.options.map((text, i) => {
			const idx = i;
			const isSel = selected === idx;
			const isCorrect = revealed && idx === question.correctIndex;
			const isWrong = revealed && isSel && !isCorrect;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				disabled: revealed,
				onClick: () => onSelect?.(idx),
				className: cn("flex w-full items-start gap-3 rounded-md px-3 py-3 text-left transition-colors duration-150", "border bg-paper", !revealed && (isSel ? "border-rule text-ink" : "border-paper-edge text-ink hover:border-rule-soft"), isCorrect && "border-pass bg-[#e7efe9] text-ink", isWrong && "border-mark bg-[#f6e8e5] text-ink", revealed && !isCorrect && !isWrong && "border-paper-edge text-ink-muted"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-sm font-mono text-xs font-medium tabular-nums", isSel && !revealed && "bg-rule text-accent-fg", !isSel && !revealed && "bg-paper-edge text-ink-muted", isCorrect && "bg-pass text-accent-fg", isWrong && "bg-mark text-accent-fg", revealed && !isCorrect && !isWrong && "bg-paper-edge text-ink-muted"),
					children: LETTERS[idx]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display text-[0.98rem] leading-snug",
					children: text
				})]
			}) }, idx);
		})
	});
}
/** The 75-cell answer grid: answered, flagged, and where you are now. */
function QuestionPalette({ sitting, index, onGo }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-wrap gap-1.5",
		children: sitting.questions.map((_, i) => {
			const answered = sitting.answers[i] !== null;
			const flagged = sitting.flagged?.[i] === true;
			const current = i === index;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => onGo(i),
				"aria-current": current ? "true" : void 0,
				"aria-label": `Question ${i + 1}${answered ? ", answered" : ", unanswered"}${flagged ? ", flagged" : ""}`,
				className: cn("relative size-7 rounded-sm text-[10px] tabular-nums transition-colors", current ? "bg-paper text-ink" : answered ? "bg-bg-subtle text-fg" : "border border-border text-fg-subtle hover:border-border-strong"),
				children: [i + 1, flagged ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, {
					className: "absolute -top-1 -right-1 size-2.5 fill-rule text-rule",
					strokeWidth: 2.5,
					"aria-hidden": true
				}) : null]
			}, sitting.questions[i].id ?? i);
		})
	});
}
/**
* Two-step button for the two irreversible moves in a sitting (submit, abandon).
* A modal dialog is overkill for both; a second click that expires is enough and
* keeps keyboard focus where it already is.
*/
function ConfirmButton({ label, confirmLabel, onConfirm, className, disabled, armForMs = 5e3 }) {
	const [armed, setArmed] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!armed) return;
		const id = setTimeout(() => setArmed(false), armForMs);
		return () => clearTimeout(id);
	}, [armed, armForMs]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		disabled,
		onClick: () => {
			if (armed) {
				setArmed(false);
				onConfirm();
				return;
			}
			setArmed(true);
		},
		className: cn("disabled:cursor-not-allowed disabled:opacity-40", className),
		children: armed ? confirmLabel : label
	});
}
/**
* Ticking clock for the exam chrome. Re-renders once a second while `active`
* and freezes when it is not, so a finished sitting stops burning renders.
*/
function useNow(active, intervalMs = 1e3) {
	const [now, setNow] = (0, import_react.useState)(() => Date.now());
	(0, import_react.useEffect)(() => {
		if (!active) return;
		setNow(Date.now());
		const id = setInterval(() => setNow(Date.now()), intervalMs);
		return () => clearInterval(id);
	}, [active, intervalMs]);
	return now;
}
var CHOICE_KEYS = {
	"1": 0,
	"2": 1,
	"3": 2,
	"4": 3,
	a: 0,
	b: 1,
	c: 2,
	d: 3,
	A: 0,
	B: 1,
	C: 2,
	D: 3
};
function ExamView() {
	const sitting = useQuiz((s) => s.sitting);
	const index = useQuiz((s) => s.index);
	const go = useQuiz((s) => s.go);
	const setAnswer = useQuiz((s) => s.setAnswer);
	const toggleFlag = useQuiz((s) => s.toggleFlag);
	const nextUnanswered = useQuiz((s) => s.nextUnanswered);
	const submit = useQuiz((s) => s.submit);
	const abandon = useQuiz((s) => s.abandon);
	const [sheetOpen, setSheetOpen] = (0, import_react.useState)(false);
	const running = Boolean(sitting) && !sitting?.submittedAt;
	const now = useNow(running);
	const closeSheet = (0, import_react.useCallback)(() => setSheetOpen(false), []);
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if (e.metaKey || e.ctrlKey || e.altKey) return;
			const t = e.target;
			if (t && ["INPUT", "TEXTAREA"].includes(t.tagName)) return;
			if (e.key === "Escape") {
				setSheetOpen(false);
				return;
			}
			if (e.key === "ArrowRight" || e.key === "n" || e.key === "N") go(index + 1);
			else if (e.key === "ArrowLeft" || e.key === "p" || e.key === "P") go(index - 1);
			else if (e.key === "f" || e.key === "F") toggleFlag();
			else if (e.key in CHOICE_KEYS) setAnswer(CHOICE_KEYS[e.key]);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [
		go,
		index,
		setAnswer,
		toggleFlag
	]);
	const remaining = sitting ? remainingMs(sitting, now) : null;
	(0, import_react.useEffect)(() => {
		if (!running || remaining === null || remaining > 0) return;
		submit("clock");
	}, [
		remaining,
		running,
		submit
	]);
	(0, import_react.useEffect)(() => {
		if (!sheetOpen) return;
		const previous = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = previous;
		};
	}, [sheetOpen]);
	if (!sitting) return null;
	const q = sitting.questions[index];
	if (!q) return null;
	const selected = sitting.answers[index];
	const left = unansweredCount(sitting);
	const flags = flaggedCount(sitting);
	const course = COURSES.find((c) => c.id === q.course);
	const flagged = sitting.flagged?.[index] === true;
	const canSubmit = left === 0;
	const timed = sitting.timeLimitMs != null && sitting.timeLimitMs > 0;
	const lowTime = remaining !== null && remaining <= 3e5;
	const done = index + 1;
	const total = sitting.questions.length;
	const palette = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuestionPalette, {
		sitting,
		index,
		onGo: (i) => {
			go(i);
			closeSheet();
		}
	});
	const submitButton = (className) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmButton, {
		label: canSubmit ? "Submit sitting" : `${left} left to answer`,
		confirmLabel: "Submit for marking?",
		disabled: !canSubmit,
		onConfirm: () => {
			closeSheet();
			submit();
		},
		className: cn("flex min-h-11 w-full items-center justify-center rounded-md text-sm font-medium", canSubmit ? "bg-paper text-ink" : "bg-bg-subtle text-fg-subtle", className)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-6xl px-3 pt-3 pb-28 lg:px-6 lg:pb-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-20 -mx-3 mb-4 border-b border-border bg-bg/95 px-3 py-2 backdrop-blur lg:mx-0 lg:rounded-lg lg:border lg:px-4 lg:py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-x-4 gap-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-mono text-xs tracking-wide text-fg-muted uppercase",
						children: [
							"Question ",
							done,
							" of ",
							total
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 text-xs text-fg-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: cn("inline-flex items-center gap-1 tabular-nums", lowTime && "text-mark"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Timer, {
									className: "size-3.5",
									strokeWidth: 1.75,
									"aria-hidden": true
								}), timed && remaining !== null ? `${formatClock(remaining)} left` : formatClock(Math.max(0, now - sitting.createdAt))]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "tabular-nums",
								children: [left, " unanswered"]
							}),
							flags > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "tabular-nums",
								children: [flags, " flagged"]
							}) : null
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 h-1 w-full overflow-hidden rounded-full bg-bg-subtle",
					role: "progressbar",
					"aria-valuenow": total - left,
					"aria-valuemin": 0,
					"aria-valuemax": total,
					"aria-label": "Answered questions",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-full rounded-full bg-rule transition-[width] duration-300",
						style: { width: `${(total - left) / total * 100}%` }
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-[minmax(0,1fr)_230px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-xl bg-paper px-4 py-6 text-ink shadow-[0_20px_60px_rgba(0,0,0,0.35)] sm:px-8 sm:py-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-between gap-2 border-b border-paper-edge pb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-ink-muted",
								children: [
									course?.short,
									" · ",
									KIND_LABEL[q.kind]
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => toggleFlag(),
								"aria-pressed": flagged,
								className: cn("inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs transition-colors", flagged ? "border-rule bg-rule text-accent-fg" : "border-paper-edge text-ink-muted hover:border-rule-soft"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, {
									className: cn("size-3.5", flagged && "fill-current"),
									strokeWidth: 1.75,
									"aria-hidden": true
								}), flagged ? "Flagged" : "Flag"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 h-0.5 w-16 bg-rule",
							"aria-hidden": true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display mt-6 text-lg leading-relaxed text-ink sm:text-xl",
							children: q.stem
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptionList, {
							question: q,
							selected,
							revealed: false,
							onSelect: setAnswer
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-wrap items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => go(index - 1),
								disabled: index === 0,
								className: "inline-flex min-h-11 items-center gap-1 rounded-md px-3 text-sm text-ink-muted disabled:opacity-30",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" }), " Previous"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [left > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => nextUnanswered(index),
									className: "inline-flex min-h-11 items-center gap-1 rounded-md border border-paper-edge px-3 text-sm text-ink-muted",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-4" }), " Next unanswered"]
								}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => go(index + 1),
									disabled: index >= sitting.questions.length - 1,
									className: "inline-flex min-h-11 items-center gap-1 rounded-md px-3 text-sm text-ink-muted disabled:opacity-30",
									children: ["Next ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })]
								})]
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "hidden flex-col gap-4 lg:sticky lg:top-24 lg:flex lg:self-start",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-border bg-bg-elevated p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-fg-subtle",
								children: "Unanswered"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-2xl tabular-nums text-fg",
								children: left
							}),
							left > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => nextUnanswered(index),
								className: "mt-3 w-full py-1.5 text-xs text-fg-muted underline-offset-2 hover:text-fg hover:underline",
								children: "Jump to next blank"
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3",
								children: submitButton("")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmButton, {
								label: "Abandon",
								confirmLabel: "Discard this sitting?",
								onConfirm: abandon,
								className: "mt-2 w-full py-2 text-xs text-fg-subtle hover:text-fg"
							})
						]
					}), palette]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-x-0 bottom-0 z-20 border-t border-border bg-bg/95 px-3 py-2 backdrop-blur lg:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => go(index - 1),
							disabled: index === 0,
							"aria-label": "Previous question",
							className: "inline-flex size-11 items-center justify-center rounded-md border border-border text-fg disabled:opacity-30",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setSheetOpen(true),
							className: "inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-md border border-border px-3 text-sm text-fg",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid3x3, {
								className: "size-4",
								strokeWidth: 1.75,
								"aria-hidden": true
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "tabular-nums",
								children: [
									total - left,
									"/",
									total,
									" answered"
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => go(index + 1),
							disabled: index >= sitting.questions.length - 1,
							"aria-label": "Next question",
							className: "inline-flex size-11 items-center justify-center rounded-md border border-border text-fg disabled:opacity-30",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })
						})
					]
				})
			}),
			sheetOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed inset-0 z-30 lg:hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": "Close question list",
					onClick: closeSheet,
					className: "absolute inset-0 bg-black/60"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					role: "dialog",
					"aria-modal": "true",
					"aria-label": "Question list",
					className: "absolute inset-x-0 bottom-0 max-h-[80dvh] overflow-y-auto rounded-t-xl border-t border-border bg-bg-elevated px-4 pt-4 pb-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-display text-lg text-fg",
								children: [
									total - left,
									" of ",
									total,
									" answered"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: closeSheet,
								"aria-label": "Close",
								className: "inline-flex size-9 items-center justify-center rounded-md text-fg-muted",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3",
							children: palette
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4",
							children: submitButton("")
						})
					]
				})]
			}) : null
		]
	});
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var courseSchema = _enum(COURSE_IDS);
var inputSchema = object({
	courses: array(courseSchema).min(1),
	/**
	* Question ids the candidate sat last time. They go to the back of the queue
	* rather than being excluded, so a full paper is always possible.
	*/
	avoid: array(string()).max(500).optional()
});
var generateSitting = createServerFn({ method: "POST" }).validator((input) => inputSchema.parse(input)).handler(createSsrRpc("9a33745239df4986cb279c320da2e94478ac561455556e58b07291d6b77d502f"));
var bankSitting = createServerFn({ method: "POST" }).validator((input) => inputSchema.parse(input)).handler(createSsrRpc("4756143a09db6e2f520dae6b690ba2f0fa916138bce6c96e2d90718dce762ae1"));
/**
* Bank depth per course, so the hall can say what deselecting a course costs
* before the candidate commits. Computed from the same bank the sitting is
* drawn from, so it cannot drift from it.
*/
var bankCoverage = createServerFn({ method: "GET" }).handler(createSsrRpc("e82b6de5a0dd4d15a23f67e2674901da102643fb485d14ea5ed911e3d269d02f"));
function HomeView({ onGenerate }) {
	const courses = useQuiz((s) => s.courses);
	const mode = useQuiz((s) => s.mode);
	const sitting = useQuiz((s) => s.sitting);
	const toggle = useQuiz((s) => s.toggleCourse);
	const setAll = useQuiz((s) => s.setAllCourses);
	const setMode = useQuiz((s) => s.setMode);
	const error = useQuiz((s) => s.error);
	const fallbackNote = useQuiz((s) => s.fallbackNote);
	const reviewSitting = useQuiz((s) => s.reviewSitting);
	const setPhase = useQuiz((s) => s.setPhase);
	const [coverage, setCoverage] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		let live = true;
		bankCoverage().then((c) => {
			if (live) setCoverage(c);
		}).catch(() => {});
		return () => {
			live = false;
		};
	}, []);
	const inProgress = sitting && !sitting.submittedAt && unansweredCount(sitting) < TOTAL_QUESTIONS;
	const reviewable = Boolean(sitting?.submittedAt);
	const selectedDepth = coverage ? courses.reduce((n, id) => n + (coverage[id] ?? 0), 0) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex w-full max-w-3xl flex-col gap-10 px-4 py-10 sm:py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-col gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium tracking-[0.18em] text-fg-muted uppercase",
						children: "Agent Factory · 75 marks"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-4xl leading-[1.1] text-fg sm:text-5xl",
						children: "Canon Hall"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-xl text-[1.05rem] leading-relaxed text-fg-muted",
						children: "A sitting in the Panaversity style: long situations, buried tells, and four options that almost rhyme. There is no longest-answer tell to fall back on. Nothing is marked until the sitting is closed. The mix is fixed — not negotiable."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
				className: "grid grid-cols-2 gap-3 sm:grid-cols-4",
				children: [
					{
						n: MIX.book,
						l: "From the text"
					},
					{
						n: MIX.teammates,
						l: "Two people"
					},
					{
						n: MIX.solo,
						l: "One person"
					},
					{
						n: MIX.brutal,
						l: "Dense English"
					}
				].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border border-border bg-bg-elevated px-3 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-xs text-fg-subtle",
						children: x.l
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1 font-display text-2xl tabular-nums text-fg",
						children: x.n
					})]
				}, x.l))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg text-fg",
						children: "Conditions"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setMode({ kind: "open" }),
								"aria-pressed": mode.kind === "open",
								className: cn("inline-flex min-h-11 items-center gap-2 rounded-lg border px-4 text-sm", mode.kind === "open" ? "border-rule-soft bg-bg-elevated text-fg" : "border-border text-fg-muted hover:text-fg"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Infinity$1, {
									className: "size-4",
									strokeWidth: 1.75,
									"aria-hidden": true
								}), "Untimed"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setMode({
									kind: "timed",
									minutes: mode.kind === "timed" ? mode.minutes : 90
								}),
								"aria-pressed": mode.kind === "timed",
								className: cn("inline-flex min-h-11 items-center gap-2 rounded-lg border px-4 text-sm", mode.kind === "timed" ? "border-rule-soft bg-bg-elevated text-fg" : "border-border text-fg-muted hover:text-fg"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
									className: "size-4",
									strokeWidth: 1.75,
									"aria-hidden": true
								}), "Timed"]
							}),
							mode.kind === "timed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center gap-1.5",
								children: TIME_LIMITS.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setMode({
										kind: "timed",
										minutes: m
									}),
									"aria-pressed": mode.minutes === m,
									className: cn("inline-flex min-h-11 items-center rounded-lg border px-3 text-sm tabular-nums", mode.minutes === m ? "border-rule bg-rule text-accent-fg" : "border-border text-fg-muted hover:text-fg"),
									children: [m, " min"]
								}, m))
							}) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs leading-relaxed text-fg-subtle",
						children: mode.kind === "timed" ? `The hall closes itself after ${mode.minutes} minutes and anything still blank counts as missed.` : "Take as long as you like. The clock still runs, so you can see what the sitting cost you."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-lg text-fg",
							children: "Canon in play"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: setAll,
							className: "text-xs text-fg-muted underline-offset-2 hover:text-fg hover:underline",
							children: "Select all six"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "flex flex-col gap-2",
						children: COURSES.map((c) => {
							const on = courses.includes(c.id);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => toggle(c.id),
								"aria-pressed": on,
								className: cn("flex w-full items-start gap-3 rounded-lg border px-3 py-3 text-left transition-colors", on ? "border-rule-soft bg-bg-elevated" : "border-border bg-bg text-fg-muted"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: cn("mt-0.5 size-4 shrink-0 rounded-sm border", on ? "border-rule bg-rule" : "border-border-strong"),
										"aria-hidden": true
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block text-sm font-medium text-fg",
											children: c.title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block text-xs text-fg-subtle",
											children: c.short
										})]
									}),
									coverage ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "shrink-0 font-mono text-[11px] tabular-nums text-fg-subtle",
										children: [coverage[c.id] ?? 0, " in bank"]
									}) : null
								]
							}) }, c.id);
						})
					}),
					selectedDepth !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs leading-relaxed text-fg-subtle",
						children: [
							"The prepared bank holds ",
							selectedDepth,
							" questions for this selection. A sitting is always ",
							TOTAL_QUESTIONS,
							"; anything short is filled from the courses you left out. Every sitting is a different paper — the questions you sat last time go to the back of the queue, so most of the paper is new each time you sit."
						]
					}) : null
				]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "alert",
				className: "rounded-md border border-mark/40 bg-bg-elevated px-3 py-2 text-sm text-fg",
				children: error
			}) : null,
			fallbackNote ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-md border border-border bg-bg-elevated px-3 py-2 text-sm text-fg-muted",
				children: fallbackNote
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 sm:flex-row sm:flex-wrap",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => onGenerate(true),
						className: "inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-paper px-5 text-sm font-medium text-ink",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, {
							className: "size-4",
							strokeWidth: 1.75
						}), "Generate a new sitting"]
					}),
					inProgress ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setPhase("exam"),
						className: "inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-rule bg-bg-elevated px-5 text-sm font-medium text-fg",
						children: "Resume unfinished sitting"
					}) : null,
					reviewable ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: reviewSitting,
						className: "inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-border-strong px-5 text-sm font-medium text-fg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, {
							className: "size-4",
							strokeWidth: 1.75
						}), "Review last sitting"]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => onGenerate(false),
						className: "inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-border px-5 text-sm text-fg-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, {
							className: "size-4",
							strokeWidth: 1.75
						}), "Use prepared bank"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs leading-relaxed text-fg-subtle",
				children: [
					"Every sitting is a different paper: the questions are drawn and shuffled again each time, the options are reshuffled so A–D never encode correctness, and last sitting's questions go to the back of the queue. Generation writes a fresh ",
					TOTAL_QUESTIONS,
					" from the six pages via the model; if the model is unavailable, the prepared bank is used and the hall says so. Results appear only once the sitting is closed."
				]
			})
		]
	});
}
function LoadingView() {
	const note = useQuiz((s) => s.loadNote);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-[70dvh] flex-col items-center justify-center gap-4 px-6 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
				className: "size-6 animate-spin text-fg-muted",
				strokeWidth: 1.5
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-xl text-fg",
				children: "Composing the sitting"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-sm text-sm text-fg-muted",
				children: note
			})
		]
	});
}
var FILTERS = [
	{
		id: "all",
		label: "Every question"
	},
	{
		id: "missed",
		label: "Missed only"
	},
	{
		id: "flagged",
		label: "Flagged"
	}
];
function ResultsView({ onAgain }) {
	const sitting = useQuiz((s) => s.sitting);
	const goHome = useQuiz((s) => s.goHome);
	const abandon = useQuiz((s) => s.abandon);
	const [filter, setFilter] = (0, import_react.useState)("all");
	const marks = (0, import_react.useMemo)(() => sitting ? sitting.questions.map((q, i) => sitting.answers[i] === q.correctIndex) : [], [sitting]);
	if (!sitting) return null;
	const total = sitting.questions.length;
	const score = marks.filter(Boolean).length;
	const passed = score >= 53;
	const missed = total - score;
	const blank = unansweredCount(sitting);
	const closedByClock = sitting.closedBy === "clock";
	const pct = total === 0 ? 0 : Math.round(score / total * 100);
	const byKind = (k) => {
		const items = sitting.questions.map((q, i) => ({
			q,
			ok: marks[i]
		})).filter((x) => x.q.kind === k);
		return {
			n: items.length,
			ok: items.filter((x) => x.ok).length
		};
	};
	const byCourse = (id) => {
		const items = sitting.questions.map((q, i) => ({
			course: q.course,
			ok: marks[i]
		})).filter((x) => x.course === id);
		return {
			n: items.length,
			ok: items.filter((x) => x.ok).length
		};
	};
	const shown = sitting.questions.map((q, i) => ({
		q,
		i
	})).filter((x) => {
		if (filter === "missed") return !marks[x.i];
		if (filter === "flagged") return sitting.flagged?.[x.i] === true;
		return true;
	});
	const counts = {
		all: sitting.questions.length,
		missed,
		flagged: (sitting.flagged ?? []).filter(Boolean).length
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs font-medium tracking-[0.18em] text-fg-muted uppercase",
						children: ["Sitting closed", closedByClock ? " by the clock" : ""]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-end gap-x-4 gap-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "font-display text-5xl leading-none text-fg",
							children: [score, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-fg-muted",
								children: [" / ", total]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: cn("rounded-md border px-2.5 py-1 text-sm", passed ? "border-pass/60 text-fg" : "border-mark/60 text-fg"),
							children: [
								passed ? "Cleared" : "Did not clear",
								" · pass mark ",
								53
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "flex flex-wrap gap-x-6 gap-y-1 text-sm text-fg-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Accuracy" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
									className: "tabular-nums text-fg",
									children: [pct, "%"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Time" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
									className: "tabular-nums text-fg",
									children: [formatClock(elapsedMs(sitting)), sitting.timeLimitMs ? ` of ${formatClock(sitting.timeLimitMs)}` : ""]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Paper" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "text-fg",
									children: sitting.source === "generated" ? "Generated" : "Prepared bank"
								})]
							}),
							blank > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Left blank" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "tabular-nums text-mark",
									children: blank
								})]
							}) : null
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg text-fg",
					children: "By question type"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid grid-cols-2 gap-2 sm:grid-cols-4",
					children: [
						"book",
						"teammates",
						"solo",
						"brutal"
					].map((k) => {
						const x = byKind(k);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-lg border border-border bg-bg-elevated px-3 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-fg-subtle",
								children: KIND_LABEL[k]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 font-mono text-sm tabular-nums text-fg",
								children: [
									x.ok,
									"/",
									x.n
								]
							})]
						}, k);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg text-fg",
					children: "By course"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "flex flex-col gap-1.5",
					children: COURSES.map((c) => {
						const x = byCourse(c.id);
						if (x.n === 0) return null;
						const ratio = x.ok / x.n;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-3 rounded-lg border border-border bg-bg-elevated px-3 py-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "w-28 shrink-0 text-xs text-fg-muted sm:w-36",
									children: c.short
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "h-1.5 flex-1 overflow-hidden rounded-full bg-bg-subtle",
									"aria-hidden": true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: cn("block h-full rounded-full", ratio >= 53 / TOTAL_QUESTIONS ? "bg-pass" : "bg-mark"),
										style: { width: `${ratio * 100}%` }
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-mono text-xs tabular-nums text-fg",
									children: [
										x.ok,
										"/",
										x.n
									]
								})
							]
						}, c.id);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onAgain,
						className: "inline-flex min-h-11 items-center rounded-lg bg-paper px-4 text-sm font-medium text-ink",
						children: "New sitting"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: goHome,
						className: "inline-flex min-h-11 items-center rounded-lg border border-border px-4 text-sm text-fg-muted",
						children: "Back to hall"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: abandon,
						className: "inline-flex min-h-11 items-center rounded-lg px-4 text-sm text-fg-subtle hover:text-fg",
						children: "Discard results"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: FILTERS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setFilter(f.id),
							"aria-pressed": filter === f.id,
							className: cn("inline-flex min-h-9 items-center gap-1.5 rounded-md border px-3 text-xs", filter === f.id ? "border-rule-soft bg-bg-elevated text-fg" : "border-border text-fg-muted hover:text-fg"),
							children: [f.label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular-nums text-fg-subtle",
								children: counts[f.id]
							})]
						}, f.id))
					}),
					shown.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "rounded-lg border border-border bg-bg-elevated px-4 py-6 text-center text-sm text-fg-muted",
						children: [
							"Nothing here.",
							" ",
							filter === "missed" ? "Every question was marked." : "No question was flagged in this sitting."
						]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "flex flex-col gap-8",
						children: shown.map((x) => {
							const { q, i } = x;
							const course = COURSES.find((c) => c.id === q.course);
							const answered = sitting.answers[i] !== null;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "rounded-xl bg-paper px-4 py-5 text-ink sm:px-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-mono text-xs text-ink-muted",
										children: [
											i + 1,
											". ",
											course?.short,
											" · ",
											KIND_LABEL[q.kind],
											" ·",
											" ",
											marks[i] ? "Marked" : answered ? "Missed" : "Left blank",
											sitting.flagged?.[i] ? " · flagged" : ""
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display mt-3 text-base leading-relaxed",
										children: q.stem
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptionList, {
										question: q,
										selected: sitting.answers[i],
										revealed: true
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-4 border-t border-paper-edge pt-3 text-sm leading-relaxed text-ink-muted",
										children: q.explanation
									})
								]
							}, q.id);
						})
					})
				]
			})
		]
	});
}
function Home() {
	const phase = useQuiz((s) => s.phase);
	const sitting = useQuiz((s) => s.sitting);
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const unsub = useQuiz.persist.onFinishHydration(() => setHydrated(true));
		if (useQuiz.persist.hasHydrated()) setHydrated(true);
		return unsub;
	}, []);
	const view = !sitting && (phase === "exam" || phase === "results") ? "home" : phase;
	async function onGenerate(fresh) {
		const { courses, mode, lastIds, setPhase, setError, setLoadNote, setFallbackNote, startSitting } = useQuiz.getState();
		setError(null);
		setFallbackNote(null);
		setPhase("loading");
		setLoadNote(fresh ? "Asking the model for a new 75 — bank fills any gaps." : "Shuffling the prepared canon bank.");
		const limitMs = mode.kind === "timed" ? mode.minutes * 60 * 1e3 : null;
		try {
			let questions;
			let source;
			if (fresh) {
				const res = await generateSitting({ data: {
					courses,
					avoid: lastIds
				} });
				if (!res.ok) {
					setError(res.error);
					setPhase("home");
					return;
				}
				questions = res.questions;
				source = res.source;
				if (res.source === "bank") setFallbackNote(res.modelAvailable ? `The model supplied ${res.generatedCount} of ${TOTAL_QUESTIONS}; the prepared bank filled the rest.` : "The model was not reachable, so this sitting was drawn from the prepared bank.");
			} else {
				const res = await bankSitting({ data: {
					courses,
					avoid: lastIds
				} });
				questions = res.questions;
				source = res.source;
			}
			startSitting({
				id: crypto.randomUUID(),
				createdAt: Date.now(),
				source,
				courses,
				questions,
				answers: emptyAnswers(questions.length),
				flagged: [],
				timeLimitMs: limitMs,
				closedBy: null,
				submittedAt: null
			});
		} catch (e) {
			setError(e instanceof Error ? e.message : "Could not open a sitting.");
			setPhase("home");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none fixed inset-0 opacity-[0.35]",
				style: { background: "radial-gradient(900px 400px at 50% -10%, #2a2924, transparent 60%)" },
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [
					!hydrated || view === "home" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeView, { onGenerate }) : null,
					hydrated && view === "loading" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingView, {}) : null,
					hydrated && view === "exam" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExamView, {}) : null,
					hydrated && view === "results" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultsView, { onAgain: () => onGenerate(true) }) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "px-4 pb-8 text-center text-[11px] text-fg-subtle",
				children: [TOTAL_QUESTIONS, " questions · options uncoloured until the last mark"]
			})
		]
	});
}
//#endregion
export { Home as component };
