import { i as __toESM } from "../_runtime.mjs";
import { R as require_react, v as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { a as TOTAL_QUESTIONS, i as MIX, n as COURSE_IDS, r as KIND_LABEL, t as COURSES } from "./types-DLGICf5y.mjs";
import { a as object, n as array, t as _enum } from "../_libs/zod.mjs";
import { a as ChevronLeft, i as ChevronRight, n as PenLine, o as BookOpen, r as LoaderCircle } from "../_libs/lucide-react.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-kFzw1gk3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var emptyAnswers = () => Array.from({ length: TOTAL_QUESTIONS }, () => null);
var useQuiz = create()(persist((set, get) => ({
	phase: "home",
	courses: [...COURSE_IDS],
	sitting: null,
	index: 0,
	error: null,
	loadNote: "Composing the sitting…",
	toggleCourse: (id) => set((s) => {
		const has = s.courses.includes(id);
		if (has && s.courses.length === 1) return s;
		return { courses: has ? s.courses.filter((c) => c !== id) : [...s.courses, id] };
	}),
	setAllCourses: () => set({ courses: [...COURSE_IDS] }),
	setPhase: (phase) => set({ phase }),
	startSitting: (sitting) => set({
		sitting,
		index: 0,
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
	go: (index) => {
		const { sitting } = get();
		if (!sitting) return;
		const max = sitting.questions.length - 1;
		set({ index: Math.min(max, Math.max(0, index)) });
	},
	submit: () => {
		const { sitting } = get();
		if (!sitting) return;
		if (sitting.answers.some((a) => a === null)) return;
		set({
			sitting: {
				...sitting,
				submittedAt: Date.now()
			},
			phase: "results"
		});
	},
	abandon: () => set({
		sitting: null,
		index: 0,
		phase: "home",
		error: null
	}),
	setError: (error) => set({ error }),
	setLoadNote: (loadNote) => set({ loadNote })
}), {
	name: "canon-hall-sitting",
	partialize: (s) => ({
		courses: s.courses,
		sitting: s.sitting,
		index: s.index,
		phase: s.phase === "loading" ? s.sitting ? "exam" : "home" : s.phase
	})
}));
function unansweredCount(sitting) {
	if (!sitting) return TOTAL_QUESTIONS;
	return sitting.answers.filter((a) => a === null).length;
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
function ExamView() {
	const sitting = useQuiz((s) => s.sitting);
	const index = useQuiz((s) => s.index);
	const go = useQuiz((s) => s.go);
	const setAnswer = useQuiz((s) => s.setAnswer);
	const submit = useQuiz((s) => s.submit);
	const abandon = useQuiz((s) => s.abandon);
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if (e.metaKey || e.ctrlKey || e.altKey) return;
			const t = e.target;
			if (t && ["INPUT", "TEXTAREA"].includes(t.tagName)) return;
			if (e.key === "ArrowRight" || e.key === "n" || e.key === "N") go(index + 1);
			else if (e.key === "ArrowLeft" || e.key === "p" || e.key === "P") go(index - 1);
			else if ([
				"1",
				"2",
				"3",
				"4",
				"a",
				"b",
				"c",
				"d",
				"A",
				"B",
				"C",
				"D"
			].includes(e.key)) setAnswer({
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
			}[e.key]);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [
		go,
		index,
		setAnswer
	]);
	if (!sitting) return null;
	const q = sitting.questions[index];
	if (!q) return null;
	const selected = sitting.answers[index];
	const left = unansweredCount(sitting);
	const course = COURSES.find((c) => c.id === q.course);
	const canSubmit = left === 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto grid w-full max-w-6xl gap-6 px-3 py-6 lg:grid-cols-[minmax(0,1fr)_220px] lg:px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "rounded-xl bg-paper px-4 py-6 text-ink shadow-[0_20px_60px_rgba(0,0,0,0.35)] sm:px-8 sm:py-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-2 border-b border-paper-edge pb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-mono text-xs tracking-wide text-ink-muted uppercase",
						children: [
							"Question ",
							index + 1,
							" of ",
							TOTAL_QUESTIONS
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-ink-muted",
						children: [
							course?.short,
							" · ",
							KIND_LABEL[q.kind]
						]
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
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => go(index + 1),
						disabled: index >= sitting.questions.length - 1,
						className: "inline-flex min-h-11 items-center gap-1 rounded-md px-3 text-sm text-ink-muted disabled:opacity-30",
						children: ["Next ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })]
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "flex flex-col gap-4 lg:sticky lg:top-6 lg:self-start",
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
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						disabled: !canSubmit,
						onClick: submit,
						className: "mt-3 flex min-h-11 w-full items-center justify-center rounded-md bg-paper text-sm font-medium text-ink disabled:opacity-40",
						children: "Submit sitting"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: abandon,
						className: "mt-2 w-full py-2 text-xs text-fg-subtle hover:text-fg",
						children: "Abandon"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-1.5",
				children: sitting.answers.map((a, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => go(i),
					title: `Question ${i + 1}`,
					className: cn("size-7 rounded-sm text-[10px] tabular-nums", i === index ? "bg-paper text-ink" : a === null ? "border border-border text-fg-subtle" : "bg-bg-subtle text-fg"),
					children: i + 1
				}, i))
			})]
		})]
	});
}
function HomeView({ onGenerate }) {
	const courses = useQuiz((s) => s.courses);
	const sitting = useQuiz((s) => s.sitting);
	const toggle = useQuiz((s) => s.toggleCourse);
	const setAll = useQuiz((s) => s.setAllCourses);
	const error = useQuiz((s) => s.error);
	const canResume = sitting && !sitting.submittedAt && unansweredCount(sitting) < TOTAL_QUESTIONS;
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
						children: "A sitting in the Panaversity style: long situations, buried tells, and options that almost rhyme. Nothing is marked until question 75 is answered. The mix is fixed — not negotiable."
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
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "flex flex-col gap-2",
					children: COURSES.map((c) => {
						const on = courses.includes(c.id);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => toggle(c.id),
							className: cn("flex w-full items-start gap-3 rounded-lg border px-3 py-3 text-left transition-colors", on ? "border-rule-soft bg-bg-elevated" : "border-border bg-bg text-fg-muted"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("mt-0.5 size-4 shrink-0 rounded-sm border", on ? "border-rule bg-rule" : "border-border-strong"),
								"aria-hidden": true
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-sm font-medium text-fg",
								children: c.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-xs text-fg-subtle",
								children: c.short
							})] })]
						}) }, c.id);
					})
				})]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-md border border-mark/40 bg-bg-elevated px-3 py-2 text-sm text-fg",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 sm:flex-row",
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
					canResume ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => useQuiz.getState().setPhase("exam"),
						className: "inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-border-strong px-5 text-sm font-medium text-fg",
						children: "Resume unfinished sitting"
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs leading-relaxed text-fg-subtle",
				children: "Generation writes a fresh 75 from the six pages via the model, then shuffles options so A–D never encode correctness. If the model is unavailable, the prepared bank is used. Results appear only after every question is answered."
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
function ResultsView({ onAgain }) {
	const sitting = useQuiz((s) => s.sitting);
	const abandon = useQuiz((s) => s.abandon);
	if (!sitting) return null;
	const marks = sitting.questions.map((q, i) => sitting.answers[i] === q.correctIndex);
	const score = marks.filter(Boolean).length;
	const passed = score >= 53;
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium tracking-[0.18em] text-fg-muted uppercase",
						children: "Sitting closed"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "font-display text-4xl text-fg",
						children: [score, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-fg-muted",
							children: [" / ", TOTAL_QUESTIONS]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-fg-muted",
						children: [
							"Pass mark ",
							53,
							". You ",
							passed ? "cleared" : "did not clear",
							" the hall."
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
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
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onAgain,
					className: "inline-flex min-h-11 items-center rounded-lg bg-paper px-4 text-sm font-medium text-ink",
					children: "New sitting"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: abandon,
					className: "inline-flex min-h-11 items-center rounded-lg border border-border px-4 text-sm text-fg-muted",
					children: "Back to hall"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "flex flex-col gap-8",
				children: sitting.questions.map((q, i) => {
					const course = COURSES.find((c) => c.id === q.course);
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
									marks[i] ? "Marked" : "Missed"
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
var inputSchema = object({ courses: array(courseSchema).min(1) });
var generateSitting = createServerFn({ method: "POST" }).validator((input) => inputSchema.parse(input)).handler(createSsrRpc("9a33745239df4986cb279c320da2e94478ac561455556e58b07291d6b77d502f"));
var bankSitting = createServerFn({ method: "POST" }).validator((input) => inputSchema.parse(input)).handler(createSsrRpc("4756143a09db6e2f520dae6b690ba2f0fa916138bce6c96e2d90718dce762ae1"));
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
		const { courses, setPhase, setError, setLoadNote, startSitting } = useQuiz.getState();
		setError(null);
		setPhase("loading");
		setLoadNote(fresh ? "Asking the model for a new 75 — bank fills any gaps." : "Shuffling the prepared canon bank.");
		try {
			const res = fresh ? await generateSitting({ data: { courses } }) : await bankSitting({ data: { courses } });
			if (!res.ok) {
				setError(res.error);
				setPhase("home");
				return;
			}
			startSitting({
				id: crypto.randomUUID(),
				createdAt: Date.now(),
				source: res.source,
				courses,
				questions: res.questions,
				answers: emptyAnswers(),
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
