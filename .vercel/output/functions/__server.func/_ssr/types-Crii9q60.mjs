//#region node_modules/.nitro/vite/services/ssr/assets/types-Crii9q60.js
var COURSE_IDS = [
	"thesis",
	"agentic",
	"sdd",
	"problem",
	"openclaw",
	"layer"
];
var COURSES = [
	{
		id: "thesis",
		short: "Thesis",
		title: "The Agent Factory Thesis",
		url: "https://agentfactory.panaversity.org/docs/thesis"
	},
	{
		id: "agentic",
		short: "Agentic Coding",
		title: "Claude Code and OpenCode",
		url: "https://agentfactory.panaversity.org/docs/agentic-coding-crash-course"
	},
	{
		id: "sdd",
		short: "Spec-Driven",
		title: "Spec-Driven Development",
		url: "https://agentfactory.panaversity.org/docs/spec-driven-development-crash-course"
	},
	{
		id: "problem",
		short: "Problem Solving",
		title: "Problem Solving with General Agents",
		url: "https://agentfactory.panaversity.org/docs/problem-solving-crash-course"
	},
	{
		id: "openclaw",
		short: "OpenClaw",
		title: "OpenClaw with General Agents",
		url: "https://agentfactory.panaversity.org/docs/openclaw-with-general-agents"
	},
	{
		id: "layer",
		short: "Operating Layer",
		title: "The AI Operating Layer",
		url: "https://agentfactory.panaversity.org/docs/ai-operating-layer"
	}
];
/**
* Shape of one paper. Weighted towards the hard kinds on purpose: the close
* reading of the text is the warm-up, the dense-English items are the finish.
* Every kind is drawn with repeats pushed to the back, so two sittings in a row
* are different papers rather than the same paper reshuffled.
*/
var MIX = {
	book: 6,
	teammates: 24,
	solo: 35,
	brutal: 10
};
var TOTAL_QUESTIONS = MIX.book + MIX.teammates + MIX.solo + MIX.brutal;
var KIND_LABEL = {
	book: "Canon (from the text)",
	teammates: "Two people in the room",
	solo: "One person, a mess",
	brutal: "Dense English, adjacent traps"
};
/** Durations offered for a timed sitting, in minutes. */
var TIME_LIMITS = [
	45,
	60,
	90,
	120
];
/** How long a candidate actually spent, in milliseconds. */
function elapsedMs(sitting, now = Date.now()) {
	const end = sitting.submittedAt ?? now;
	return Math.max(0, end - sitting.createdAt);
}
/** Milliseconds left on a timed sitting, or null when untimed. */
function remainingMs(sitting, now = Date.now()) {
	const limit = sitting.timeLimitMs;
	if (!limit || limit <= 0) return null;
	return Math.max(0, sitting.createdAt + limit - now);
}
function formatClock(ms) {
	const total = Math.max(0, Math.floor(ms / 1e3));
	const h = Math.floor(total / 3600);
	const m = Math.floor(total % 3600 / 60);
	const s = total % 60;
	const pad = (n) => String(n).padStart(2, "0");
	return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`;
}
//#endregion
export { TIME_LIMITS as a, formatClock as c, MIX as i, remainingMs as l, COURSE_IDS as n, TOTAL_QUESTIONS as o, KIND_LABEL as r, elapsedMs as s, COURSES as t };
