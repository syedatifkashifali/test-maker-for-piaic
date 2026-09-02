import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
import { a as TOTAL_QUESTIONS, i as MIX, n as COURSE_IDS, t as COURSES } from "./types-DLGICf5y.mjs";
import { a as object, c as union, n as array, o as string, r as literal, s as tuple, t as _enum } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/generate-DSLRvcvo.js
function shuffleInPlace(arr) {
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
}
function shuffleCopy(arr) {
	return shuffleInPlace([...arr]);
}
function shuffleQuestion(q) {
	const indexed = q.options.map((text, i) => ({
		text,
		i
	}));
	shuffleInPlace(indexed);
	const options = indexed.map((x) => x.text);
	const correctIndex = indexed.findIndex((x) => x.i === q.correctIndex);
	return {
		...q,
		options,
		correctIndex
	};
}
function prepareSittingQuestions(questions) {
	return shuffleInPlace(questions.map(shuffleQuestion));
}
function Q(id, kind, course, stem, options, correctIndex, explanation) {
	return {
		id,
		kind,
		course,
		stem,
		options,
		correctIndex,
		explanation
	};
}
var BOOK = [
	Q("b1", "book", "agentic", "In the Agentic Coding crash course, a plan is written during plan mode and the session later dies or is cleared. Which statement matches the course’s reason for also saving that plan as a file such as docs/plans/my-plan.md?", [
		"The file makes the executing model measurably faster because it no longer has to think.",
		"The file survives conversation loss, so a fresh session can be told to read it and continue from a named step.",
		"Neither Claude Code nor OpenCode will resume any session unless a plan file exists.",
		"Both tools refuse to leave plan mode until a plan file has been written."
	], 1, "Resume is convenient; a plan file is the durable contract. The course is explicit that the file is a backup if the conversation cannot be resumed, not a speed hack and not a hard requirement of the tools."),
	Q("b2", "book", "agentic", "A session is still about the same feature, but the transcript is full of dead-end file dumps. Which pair of commands does the course tell you not to confuse?", [
		"/compact keeps the same task with less clutter; /clear (or OpenCode /new) wipes the conversation and starts fresh.",
		"/clear summarises the task; /compact deletes the working tree.",
		"/compact and /clear are aliases; both wipe memory and the rules file.",
		"/rewind is the OpenCode name for /compact; /undo is the Claude Code name for /clear."
	], 0, "Concept 6 is the distinction: compact = same task, less clutter; clear/new = start over. Rewind/undo are rollback, not context commands."),
	Q("b3", "book", "agentic", "OpenCode is started in a repo that already has CLAUDE.md and no AGENTS.md. What does the course say OpenCode will do?", [
		"Ignore CLAUDE.md until you rename it by hand.",
		"Read CLAUDE.md as a fallback; if both files later exist, AGENTS.md wins and CLAUDE.md is ignored.",
		"Merge both files linewise on every message.",
		"Refuse to start until /init writes AGENTS.md."
	], 1, "OpenCode reads CLAUDE.md when AGENTS.md is absent. If both exist, AGENTS.md is used."),
	Q("b4", "book", "sdd", "A spec for a password-reset flow names JWT expiry, a Postgres table, and Redis for the token store. What is the Spec-Driven Development course’s primary objection?", [
		"Those details belong in the constitution, not the spec.",
		"The spec has mixed HOW into WHAT, locking an implementation and failing the test “could a competent builder satisfy this wrongly?”",
		"Password reset is too small for a spec; skip to build.",
		"JWTs are forbidden by the four-phase workflow."
	], 1, "Specs are behaviour-only. Implementation choices in the spec freeze the how and make later tool/stack changes a spec rewrite."),
	Q("b5", "book", "thesis", "The thesis’s 10-80-10 rhythm refers to which split of work?", [
		"10% of workers are human, 80% are Digital FTEs, 10% are identic agents.",
		"10% of tokens go to planning models, 80% to cheap models, 10% to reviewers.",
		"About 10% human intent (spec/vision), 80% AI execution, 10% human verification/polish.",
		"10% of companies will be AI-Native by 2030, 80% hybrid, 10% unchanged."
	], 2, "10-80-10 is a rhythm of a piece of work: humans set intent, agents execute, humans verify — not a census of headcount or a token budget."),
	Q("b6", "book", "problem", "Principle 3 says “looks right” is a failure mode. Which intervention is the principle actually asking for?", [
		"Ask a stronger model to rewrite the prose until it sounds more confident.",
		"Attach an independent check the agent can run or that a human can score against a source, test, or rubric.",
		"Add the output to MEMORY.md so later sessions treat it as true.",
		"Move the whole task into plan mode so nothing is written."
	], 1, "Verification is an independent check, not extra eloquence, not memory promotion, and not a freeze in plan mode."),
	Q("b7", "book", "openclaw", "In OpenClaw’s workspace, which file is the long-term committed-facts layer, as distinct from tone, name/role, and user profile?", [
		"SOUL.md",
		"IDENTITY.md",
		"USER.md",
		"MEMORY.md"
	], 3, "SOUL = tone, IDENTITY = name/role, USER = who the human is, MEMORY = facts you mean to keep across channels and sessions."),
	Q("b8", "book", "layer", "The AI Operating Layer course warns against a specific category error: treating which piece as if it were the architecture?", [
		"The system of record",
		"The host operating system kernel",
		"The reasoning model (Claude, GPT, Gemini, local)",
		"The MCP server list"
	], 2, "Models are replaceable generators. The durable layer is identity/context, orchestration, governance, harness, capabilities, and trusted records.")
];
var TEAMMATES = [
	Q("t1", "teammates", "agentic", "Sara has been in one Claude Code session for nearly two hours on auth plus billing. The model now apologises without moving the code, rewrites the same three functions, invents a helper path that is not in the repo, and quietly ignores her earlier “never touch generated/” constraint. Ahmed, watching over her shoulder, says the history is an asset and she should type a denser recap so the model can recover. Which move actually matches the course?", [
		"Follow Ahmed: a longer recap in the same thread maximises context and is how compacting is supposed to work.",
		"Switch to a frontier model in the same thread; jaggedness means the cheap model is the only problem.",
		"Stop sending messages. Use /compact if she still wants this task, or /clear (or /new) if she wants a clean start — then restate constraints in the new/shortened thread.",
		"Append the generated/ rule to CLAUDE.md and keep typing in the same session so the new line is in the cache immediately."
	], 2, "Those symptoms are context poisoning. More prompting deepens the doom loop. Rules-file edits mid-rot also bust prompt cache and do not unpoison the transcript."),
	Q("t2", "teammates", "agentic", "Fatima drops into default execute mode and pastes one long feature brief. Twenty minutes later eight files have moved and the architecture is wrong. Usman says the brief was simply too short; a better first prompt would have been enough. What was the actual miss?", [
		"Usman is right: plan mode is optional if the first prompt is long enough.",
		"She should have spawned a subagent to own the entire feature so the main thread stayed empty.",
		"She should have entered plan mode, iterated a written plan, approved it, then executed — preferably with a cheaper model following the saved plan.",
		"She should have auto-approved all bash so the agent could have finished before the architecture calcified."
	], 2, "Non-trivial work is plan-then-execute. Length of the first prompt is not a substitute for a reviewed plan."),
	Q("t3", "teammates", "agentic", "Every few days Zainab and Omar paste the same paragraph: run tests after edits, never touch src/generated/, use the existing auth middleware. Zainab wants the whole paragraph in CLAUDE.md so it is “always on.” Omar wants a skill that auto-invokes when the task matches. Who is closer, and why is the other trap easy?", [
		"Zainab: anything you repeat belongs in the rules file, which is read once per project lifetime.",
		"Omar: this is reusable expertise the model should apply when relevant; stuffing it all into the rules file burns budget on every message, including unrelated ones.",
		"Neither: it must be a hook, because only hooks can mention tests.",
		"Neither: it must be a plan file reread at the start of every session."
	], 1, "Rules files stay short and hold what files cannot reveal. Repeated procedures that should fire when relevant are skills. Hooks are for no-judgment enforcement, not for a paragraph of preferences."),
	Q("t4", "teammates", "agentic", "Usman wants commits blocked if tests fail or [TODO] remains in published/. Nadia says a strongly worded CLAUDE.md line is enough because the model “always reads it.” What does the course actually prescribe?", [
		"Nadia is right; the rules file is binding in the same way a compiler is.",
		"A skill with a vivid description, because skills cannot be skipped once listed.",
		"A hook (Claude Code) or plugin (OpenCode) on the commit path, forming a verification loop the model cannot talk its way around.",
		"A reviewer subagent after the fact; isolation is stronger than hooks."
	], 2, "Rules and skills are suggestions the model can ignore. Hooks/plugins run regardless. Put the check at commit, not on every keystroke."),
	Q("t5", "teammates", "agentic", "Ahmed’s CLAUDE.md is hundreds of lines, including “add comments where helpful” and “never write multi-line comments,” plus many facts the repo already shows. Sara says more clarifying lines will cancel the contradictions. What should he do?", [
		"Keep adding; a long constitution is how Anthropic’s own prompt works.",
		"Split into many files and load all of them on every turn.",
		"Prune: keep only lines that prevent mistakes the model actually made; delete contradictions and anything the files already teach.",
		"Move the whole file into a skill so it loads only when the model feels like it."
	], 2, "The method is earned lines plus pruning. Anthropic cut a large share of its own system prompt in 2026. More text is not more control."),
	Q("t6", "teammates", "agentic", "Omar uses a frontier model for planning, formatting, test runs, and “just follow the plan.” Fatima says staying on the strongest model is the only way quality holds. What is the taught split?", [
		"Fatima is right; cheap models cannot follow a written plan.",
		"Plan and hard reasoning on the strong model; once a plan exists, execute on a cheaper model.",
		"Put model-switching instructions in the rules file and let the agent choose every turn.",
		"Use only stealth free models so cost is identically zero."
	], 1, "The expensive step is thinking. A clear plan is execution. Stealth free models are the wrong default for real work."),
	Q("t7", "teammates", "agentic", "Nadia asks the agent to find every billing site and then fix one edge case. It opens dozens of files into the main thread. Hassan says the rules file lacked a billing map. What should she have done instead?", [
		"Expand the rules file with a full billing atlas so future searches stay in-thread.",
		"Delegate the heavy search to a subagent and keep only the summary in the main conversation.",
		"Turn on plan mode after the dump, which retroactively unloads the files.",
		"Switch to a cheaper model so the dump is at least inexpensive."
	], 1, "Codebase archaeology is the most context-poisoning request you can make in the main window. Subagents exist for that."),
	Q("t8", "teammates", "agentic", "Hassan’s session vanished after a solid multi-step plan. Nadia says he should just --resume / /sessions and that a plan file is ceremonial. He is not sure the session is still listed. What should already exist?", [
		"Only the resume index; plan files are for sharing with teammates, not recovery.",
		"A plan file on disk that a new session can read and continue from, because resume is not guaranteed.",
		"A skill that regenerates plans from the rules file.",
		"An exported transcript pasted in full, which is cheaper than a short plan file."
	], 1, "Resume is useful; the plan file is the contract that survives session loss."),
	Q("t9", "teammates", "sdd", "Leila writes a spec that already names Drizzle, a particular folder layout, and “use our existing Redis.” Bilal says that specificity will stop the agent from inventing a stack. What does SDD say is the cost of that choice?", [
		"None — constitution and spec should both list the stack.",
		"The spec has absorbed HOW, so a later stack change becomes an intent rewrite rather than a re-derivation from behaviour.",
		"Redis is fine in a spec; only folder layout is HOW.",
		"SDD forbids naming any existing system, including auth middleware already in the repo."
	], 1, "Behaviour belongs in the spec. Stack and layout belong in constitution or plan, not in the behaviour contract."),
	Q("t10", "teammates", "sdd", "After a vague spec, the agent ships a “working” password reset that never expires tokens. Imani wants to patch the code and leave the spec. Yusuf wants to tighten the spec’s acceptance criteria first, then re-derive. Who matches Spec-Anchored practice?", [
		"Imani: code is the source of truth once it runs.",
		"Yusuf: update the spec so expiry is a testable must, then rebuild against it — otherwise you have spec drift.",
		"Either, because Spec-First and Spec-Anchored are the same once code exists.",
		"Neither: they must jump to Spec-as-Source and delete the repo."
	], 1, "Spec-Anchored means the spec stays the contract. Patching only the code is how drift starts."),
	Q("t11", "teammates", "sdd", "Noor wants to skip Clarify because Research and Specify already took an hour. Adeel wants the model to interview one ambiguity at a time before any build. What is the course’s claim about skipping Clarify?", [
		"Clarify is optional ceremony for throwaway prototypes only; production specs should skip it to save tokens.",
		"Unstated assumptions become bugs at build prices; Clarify is the cheap place to kill them.",
		"Clarify is only for non-programmers; engineers should jump to plan mode.",
		"Clarify must be done by a subagent or it does not count."
	], 1, "The interview is cheap. Build is expensive. Skipping it is how “working but wrong” ships."),
	Q("t12", "teammates", "thesis", "Maya is selling a per-seat copilot. Farid wants to productise a Digital FTE that owns a role’s outcomes. Maya says that is just a marketing rename of SaaS. What distinction does the thesis actually draw?", [
		"None; Digital FTE is a copilot with a longer system prompt.",
		"SaaS sells tools and seats with humans still executing; an AI-Native offering sells labour/outcomes via role-based workers against a system of record.",
		"Digital FTEs cannot use tools; copilots can.",
		"The only difference is that Digital FTEs must run on-device."
	], 1, "The thesis is a business shift from tools to labour, not a synonym for “chat in the IDE.”"),
	Q("t13", "teammates", "thesis", "Kamal wants to call their support bot an identic agent because it “represents the brand.” Hira says identic AI is the personal delegate on the edge, and the support role is a Digital FTE in the workforce layer. Who is using the thesis’s two-layer model correctly?", [
		"Kamal: any customer-facing agent is identic.",
		"Hira: identic = personal edge delegate; Digital FTE = role-based enterprise worker. Specs sit between the layers.",
		"Both words are interchangeable in the thesis.",
		"Neither: identic AI is only Tapscott’s name for the nervous system."
	], 1, "Tapscott’s identic AI is personal. Digital FTEs are the hired workforce. Mixing them collapses the two-layer model."),
	Q("t14", "teammates", "problem", "Rafi asks the agent “how should we organise these 400 PDFs?” and gets an essay. Sana says he should have named an output file and an action (“group by opposing counsel into folders, write a manifest”). Rafi says Principle 2 is about JSON only. Who is right about P1 vs P2?", [
		"Rafi: without a JSON schema the agent must only talk.",
		"Sana: P1 is brief the hands to produce artifacts; P2 is specify shape when prose would be misread. His prompt failed P1 first.",
		"Both principles require plan mode, which neither mentioned, so both are wrong.",
		"P1 applies only in Claude Code; Cowork users skip it."
	], 1, "He asked a question instead of giving an instruction that yields a file. That is P1. P2 would tighten the shape of the manifest."),
	Q("t15", "teammates", "problem", "After a one-shot rewrite of a 40-file module, git status is a swamp. Talia wanted numbered steps with a commit after each. Owen says one commit at the end is cleaner history. Which failure pattern did Owen just recommend?", [
		"The Drift",
		"The Confident Wrong",
		"The Big Bang (and the fix is P4 reversible decomposition)",
		"The Black Box"
	], 2, "One irreversible blob is Big Bang. P4 is atomic, reversible units with checkpoints."),
	Q("t16", "teammates", "problem", "The agent’s answer looks professional but a cited clause is not in the contract. Priya wants a “quote the exact source for each claim” pass. Dev wants to promote the answer into MEMORY.md so the team stops re-litigating. What does P3 say?", [
		"Dev: persistence is stronger than verification.",
		"Priya: looks-right is the failure mode; ground or discard before you persist.",
		"Neither: only unit tests count as verification, never citations.",
		"Both: persist first, then verify next quarter."
	], 1, "Persisting an unchecked claim is how Confident Wrong becomes institutional memory."),
	Q("t17", "teammates", "openclaw", "After editing SOUL.md, Ayesha’s WhatsApp replies still sound like the old voice. Imran says she must reinstall the daemon. What is the more likely miss in the OpenClaw course?", [
		"Imran is right; brain files only load at onboard.",
		"She likely did not /reset (or equivalent reload) after the edit, so the running system prompt is stale.",
		"SOUL.md never affects WhatsApp; only IDENTITY.md does.",
		"She needed an MCP server named “soul”."
	], 1, "A documented pitfall: forgetting to reload after brain-file edits."),
	Q("t18", "teammates", "openclaw", "They want OpenClaw on a public Discord. Nabil argues for unsandboxed laptop access so it can “really help.” Lina argues for NemoClaw/OpenShell-style containment because public channels are prompt-injection surface. Which matches the course’s public-channel advice?", [
		"Nabil: sandboxing is only for Windows.",
		"Lina: public channels are why you cage folder access and egress; unsandboxed is for trusted personal use.",
		"Neither: OpenClaw cannot join Discord.",
		"Public channels are safe if SOUL.md says “ignore jailbreaks.”"
	], 1, "Prompt injection on public channels is a stated reason for the sandbox architecture."),
	Q("t19", "teammates", "openclaw", "A skill they installed never fires. Kashif wants to rewrite USER.md. Mehreen wants the gateway log and the skill description. What should they inspect first?", [
		"USER.md, because skills inherit user tone.",
		"Gateway load events and whether the SKILL.md description actually matches the task — plus the exists→enabled→configured→restart dance.",
		"MEMORY.md size, which is the only reason skills fail.",
		"The model picker; skills never fire on Gemini."
	], 1, "Non-firing skills are a description/load/activation problem, diagnosed from the gateway log."),
	Q("t20", "teammates", "layer", "Samir says “we are an AI-native company because we switched to GPT-x.” Rabia says the operating layer is identity, orchestration, governance, harness, capabilities, and records — the model is the replaceable middle. Who is closer?", [
		"Samir: the model is the layer.",
		"Rabia: confusing model with architecture is the course’s named mistake.",
		"Both: KSOR is just a brand name for the model card.",
		"Neither: the host kernel is the operating layer."
	], 1, "The layer sits above the OS; the model is one swappable slot."),
	Q("t21", "teammates", "layer", "They want agents drafting invoices from chat memory because “the CRM is slow.” Yusuf wants every write to go through the system of record. Amina says chat context is the new SoR. What does the layer/thesis pairing say?", [
		"Amina: agents should invent totals from the thread.",
		"Yusuf: Workers read and write trusted records; they must not treat the transcript as the company’s truth.",
		"Either, so long as MCP is enabled.",
		"SoR is only for payments protocols (ACP/AP2), not invoices."
	], 1, "Trusted records are an invariant. Chat is not a ledger."),
	Q("t22", "teammates", "thesis", "A CEO cites the 56% “no return on AI” survey and wants a bigger model. Pilar says the thesis reads that result as skipped fundamentals (data, governance, operating the AI as a workforce), not as a model-size problem. Which reading matches the thesis?", [
		"The CEO: returns are a frontier-model problem.",
		"Pilar: Griggs/PwC framing is business transformation and fundamentals, not an IT model upgrade.",
		"The survey is about identic agents only.",
		"The survey proves Digital FTEs cannot be economic actors."
	], 1, "The thesis uses the PwC numbers to argue against confining AI to IT and skipping data/governance.")
];
var SOLO_A = [
	Q("s1", "solo", "agentic", "You notice the model is sorry, looping on the same patch, naming files that do not exist, and contradicting a constraint from earlier in the same thread. You still need the feature. What is the first action the course wants, before any new design talk?", [
		"Explain the contradiction again, quoting your old message, so the model can align.",
		"Stop. Compact or clear. Do not try to repair a poisoned window with another prompt.",
		"Add four new rules covering each symptom, then continue.",
		"Disable permissions so the model can “just finish.”"
	], 1, "The diagnostic is explicit: stop typing; compact or clear; do not fix poison with more tokens."),
	Q("s2", "solo", "agentic", "You want something that cannot be skipped: block git commit if lint or tests fail. You already have a paragraph in AGENTS.md that says the same thing, and the model still commits red. Which mechanism is missing?", [
		"A longer paragraph, placed at the top of AGENTS.md.",
		"A skill whose description mentions lint.",
		"A hook/plugin on commit that returns the failure to the model as the next instruction.",
		"MCP to GitHub so commits happen off-machine."
	], 2, "The verification loop is hook/plugin plus a check the model cannot decline."),
	Q("s3", "solo", "agentic", "You keep typing the same “how we write API routes” briefing. It is not a hard gate, but you want it applied when that work comes up, without paying for it on unrelated turns. Where does it go?", [
		"The rules file, because all writing advice is a critical rule.",
		"A skill, auto-invoked from its description, running in the current window.",
		"A subagent, because all expertise must be isolated.",
		"A cron heartbeat in OpenClaw."
	], 1, "Decision tree: auto expertise on match → skill. Subagent is for isolating heavy work, not for a playbook."),
	Q("s4", "solo", "agentic", "You ask the main session to “find where we compute tax and dump everything you open.” Later the model forgets the plan you approved. Which concept did you violate first?", [
		"Permissions discipline",
		"Match the model to the task",
		"Subagents / context engineering: heavy reads belong off-thread",
		"MCP honesty"
	], 2, "Search dumps are the classic way to poison the main window."),
	Q("s5", "solo", "agentic", "You edited CLAUDE.md in the middle of a long session and the next message suddenly costs far more. The course’s cache note says what?", [
		"Rules files are never cached, so this is unrelated.",
		"The discount holds only while the front of the context is stable; editing the rules file resets that front.",
		"You must run /compact twice to rebuild the cache.",
		"OpenCode cannot cache; only Claude Code can."
	], 1, "Prompt caching is a provider feature keyed on a stable prefix. Rules edits bust it."),
	Q("s6", "solo", "agentic", "Claude Code undoes a bad edit with Esc Esc. A file the agent deleted via a shell command does not come back. Is that a bug relative to the course?", [
		"Yes; Claude Code undo always includes bash.",
		"No; Claude Code checkpointing covers the model’s file edits, not shell side-effects. OpenCode’s git-backed /undo is broader.",
		"No; nothing in either tool can undo anything.",
		"Yes; you forgot /redo."
	], 1, "The course flags this exact difference. Git remains the real history."),
	Q("s7", "solo", "agentic", "You auto-approved every bash on day one, including rm and git push, because watching permissions felt slow. Which arc does the course describe instead?", [
		"Start fully open; tighten after the first incident.",
		"Start with ask-on-every-action; auto-allow only actions that earned trust; keep a deny list for destructive commands.",
		"Permissions are deprecated once plan mode exists.",
		"Only OpenCode needs permissions; Claude Code is sandboxed by default for all bash."
	], 1, "Trust is earned session by session. Deny lists stay for rm -rf, publish, push."),
	Q("s8", "solo", "agentic", "A stealth “free” model appears in /models under a codename. You are about to point it at a client repo. What two cautions does the course stack?", [
		"They are always stronger than billed models, and they never train on prompts.",
		"They are temporary/unannounced, and “free” may mean your prompts and code are the payment — not for confidential work.",
		"They only work in plan mode.",
		"They require MCP."
	], 1, "Stealth models can vanish and may use your data. Use them for throwaway experiments."),
	Q("s9", "solo", "agentic", "You are about to paste a full test run into the chat so the model can “see the failures.” The course’s cost/context habit is?", [
		"Paste everything; caching makes it free after the first time.",
		"Write the output to a file and report one line (path, count, where). The file is idle until searched.",
		"Always switch models before pasting logs.",
		"Put the log in CLAUDE.md so it is always present."
	], 1, "Huge tool output in the transcript is paid again on every later turn and poisons attention."),
	Q("s10", "solo", "agentic", "You want a second opinion on a diff. The same model that wrote the code is cheapest to use as reviewer. What does Part 8 claim?", [
		"The writer is the best reviewer because it has full memory of intent.",
		"The writer shares the blind spots that caused the mistakes; a different model (ideally a different provider) catches different classes of error.",
		"Review is only valid if done by a human.",
		"Review must happen in the same conversation to keep cache hits."
	], 1, "Cross-model review is the point of mixing providers. Same-model review still beats none, but it is weaker."),
	Q("s11", "solo", "agentic", "You run five sessions on the same branch and they fight over files. The isolation pattern in the two-tools chapter is?", [
		"Disable permissions.",
		"Git worktrees (or equivalent isolated checkouts) so sessions do not share a dirty tree.",
		"One global CLAUDE.md per user, not per project.",
		"Always use stealth models for parallel work."
	], 1, "Parallelize only with isolation. Cherny’s own workflow is multiple checkouts."),
	Q("s12", "solo", "sdd", "Your “spec” is a list of files to create and a chosen ORM. Build succeeds and still misses a business rule that was only in a Slack paragraph. What was the spec missing, in SDD terms?", [
		"More HOW — another framework name.",
		"Behaviour, edges, and acceptance criteria that would fail the “could this be built wrongly?” test.",
		"A screenshot of the Slack thread in CLAUDE.md.",
		"An MCP server for Slack, which would have made the spec unnecessary."
	], 1, "A file list is not a spec. Unstated business rules are Clarify/Specify failures."),
	Q("s13", "solo", "sdd", "You treat the spec as scaffolding, delete it after merge, and six weeks later change a subject line in code only. Users see a different product than anyone can point to. Name the failure.", [
		"Clarify skip",
		"Spec drift",
		"Plan mode leak",
		"KSOR overflow"
	], 1, "Spec-Anchored practice: behaviour changes update the spec first."),
	Q("s14", "solo", "sdd", "A constitution demands mutation testing, coverage floors, and a four-phase loop for a one-line copy change. What SDD idea did you ignore?", [
		"Spec-as-Source is mandatory for copy.",
		"Right-sizing: trivial changes should not carry enterprise process.",
		"Research forbids looking at the file you will edit.",
		"Constitutions cannot mention tests."
	], 1, "Match process weight to stakes. Over-strict constitutions are a named failure."),
	Q("s15", "solo", "sdd", "After a green build you skip the design pass because tests passed. Weeks later the file is a tangle of duplicated helpers the agent added “just in case.” What was tests not covering?", [
		"Nothing; tests are the full definition of done in SDD.",
		"Structural health: coupling, duplication, decay — agents optimise for passing checks, not for a file you want to keep.",
		"MCP connectivity.",
		"Whether plan mode was on."
	], 1, "SDD still requires a human design look. Generated code can be behaviour-correct and structurally bad."),
	Q("s16", "solo", "sdd", "You write requirements so a competent builder could still ship a reset-password flow that leaks whether an email exists. The SDD tightening move is?", [
		"Name bcrypt in the spec.",
		"Add an acceptance criterion that makes the information leak a visible failure, then keep HOW out.",
		"Move the whole spec into a skill.",
		"Skip Clarify because security is implied."
	], 1, "If a wrong-but-working build is possible, the spec is too weak. Tighten behaviour, not stack."),
	Q("s17", "solo", "thesis", "You are asked whether the Agent Factory is a product you can buy. The thesis’s answer is?", [
		"Yes: it is a SaaS seat.",
		"No: it is a process for manufacturing AI-Native companies and Digital FTEs, using general agents under spec and supervision.",
		"Yes: it is OpenClaw with a different name.",
		"No: it is only a payments protocol (x402)."
	], 1, "Factory = process. Company = output. Workers = workforce."),
	Q("s18", "solo", "thesis", "You need a one-off refactor this afternoon, not a standing employee. Which engagement mode is this, and which body of rules governs it?", [
		"Manufacturing, Seven Invariants",
		"Problem-solving, Seven Principles",
		"Identic, KSOR",
		"Economic-actor, AP2 mandates"
	], 1, "Mode 1 = immediate outcome, Seven Principles. Mode 2 = persistent worker, Seven Invariants."),
	Q("s19", "solo", "thesis", "A vendor pitch says their agent can buy compute and pay invoices with no human in the loop. The thesis ties that trajectory to which 2025–2026 protocol cluster?", [
		"Only WebSockets",
		"ACP, AP2, x402, and MPP — agent-native authorization and micropayments",
		"SMTP and IMAP",
		"The Seven Principles"
	], 1, "Those four are the named rails for agents as economic actors.")
];
var SOLO_B = [
	Q("s20", "solo", "thesis", "Your company “uses AI” inside the IT ticket queue. A board paper quotes Griggs: confining AI to IT is how you miss the transformation. What relocation does the thesis want?", [
		"Bigger GPUs in the same ticket queue.",
		"Treat AI as a workforce with specs, records, management, and verification — a business change of people and process.",
		"Replace the board with an identic agent.",
		"Ban MCP."
	], 1, "The PwC thread is not “buy a larger model for helpdesk.”"),
	Q("s21", "solo", "problem", "You watch the agent narrate a beautiful plan and never touch the folder you named. Which principle failed first?", [
		"P7 Observability — you could not see",
		"P1 Bash is the Key — you briefed the brain for an essay, not the hands for an artifact",
		"P6 — you needed a sandbox",
		"P3 — you needed mutation tests"
	], 1, "If it only talks, you asked a question. Instruct an action with an output path."),
	Q("s22", "solo", "problem", "You combine explore, plan, and implement in one prompt “to save a round trip.” The tree is half-migrated. Name the pattern.", [
		"Black Box",
		"Big Bang from skipped decomposition (and skipped Explore/Plan gates)",
		"Scope Creep only",
		"Identic overflow"
	], 1, "The four-phase loop exists so each gate is reversible. Collapsing it is Big Bang."),
	Q("s23", "solo", "problem", "Yesterday’s decisions are gone because they lived only in chat. You are re-explaining the same constraints. The principle that names this is?", [
		"P2 Code as interface",
		"P5 Persist state in files (chat is volatile)",
		"P7 only",
		"P1 only"
	], 1, "Files, not transcripts, are memory. Rules and plan files are P5."),
	Q("s24", "solo", "problem", "The agent edited a folder you never named. Your prompt was broad (“clean this up”) and permissions were wide. Which pairing is the course’s diagnosis?", [
		"Drift + P2",
		"Scope Creep + P6 constraints/permissions",
		"Confident Wrong + P5",
		"Black Box + constitution"
	], 1, "Unauthorised touch is Scope Creep. Constraints and allow/deny lists are the lever."),
	Q("s25", "solo", "problem", "You cannot tell what the agent actually ran; you only see a final paragraph. In Cowork you ignored the step cards. Which principle?", [
		"P3 only",
		"P7 Observability — you can only direct what you can see",
		"P1 forbids GUIs",
		"P4 forbids desktop tools"
	], 1, "Terminal traces, Cowork cards, OpenWork timeline — watch the hands."),
	Q("s26", "solo", "problem", "A prose request for a comparison keeps coming back as an inconsistent essay. What does P2 want you to specify first?", [
		"A warmer tone",
		"The shape: a table/schema with columns the agent must fill, not a paragraph",
		"A stealth model",
		"MCP to a spreadsheet, which replaces P2"
	], 1, "Code/schema as universal interface kills prose ambiguity."),
	Q("s27", "solo", "openclaw", "Gateway is up on 18789 but a new MCP server does nothing. You did not restart after configuring. Which ritual did you skip?", [
		"Monthly audit only",
		"The activation dance: exists → disabled → enabled → configured, then gateway restart",
		"Rewriting SOUL.md",
		"Switching to plan mode in Claude Code"
	], 1, "Extensions load on gateway restart. Silent MCP is a log-and-restart problem."),
	Q("s28", "solo", "openclaw", "Workspace markdown has grown to tens of pages and every WhatsApp reply is slow and expensive. The course’s lean-brain rule is?", [
		"Put everything in MEMORY.md so nothing is lost.",
		"Keep brain files short (about a page or two); bloat is context cost on every turn.",
		"Disable the gateway.",
		"Move MEMORY.md into CLAUDE.md in the client repo."
	], 1, "Same context-engineering idea: idle text is a tax."),
	Q("s29", "solo", "openclaw", "Docs in the downloaded AGENTS.md disagree with docs.openclaw.ai/llms.txt. What is the stated source-of-truth order?", [
		"MEMORY.md > live docs > log",
		"Live docs > local file > log",
		"GitHub stars > Jensen Huang quotes > docs",
		"The constitution in the client repo always wins."
	], 1, "The OpenClaw course is explicit: live docs, then the file, then the log."),
	Q("s30", "solo", "openclaw", "You want a reminder every weekday at 09:00 versus a nudge every 30 minutes while you work. Which pair is which?", [
		"Heartbeat is the clock; cron is the interval.",
		"Cron is clock time; heartbeat is ambient interval; hooks are event triggers.",
		"All three are MCP servers.",
		"Skills replace schedules."
	], 1, "Cron / heartbeat / hooks are distinct schedulers."),
	Q("s31", "solo", "openclaw", "Something is broken. The recovery prompt the course wants you to approve is closest to which shape?", [
		"Reinstall Node and hope.",
		"Read the gateway log, explain in plain language, propose a fix you can approve — do not improvise a new architecture in the same breath.",
		"Paste SOUL.md into Discord.",
		"Disable all skills forever."
	], 1, "Log → plain language → approve. Budget overruns mean re-plan, not extra flailing."),
	Q("s32", "solo", "layer", "You need on-device loops for a sensitive matter. The operating-layer invariant this appeals to is?", [
		"Models must be frontier and cloud-only.",
		"Local compute for privacy, latency, and sensitive work — the OS/layer is not only a cloud API.",
		"KSOR forbids local files.",
		"ACP cannot run on Linux."
	], 1, "Local compute is listed as an invariant, not an optional luxury."),
	Q("s33", "solo", "layer", "A knowledge team’s “source of truth” is a rotating chat. Models change quarterly and the method documents vanish. What construct was the course trying to get you to own?", [
		"A stealth model",
		"A Knowledge System of Record: sources, policy, methods, provenance, context that survive model swap",
		"More MCP servers",
		"Identic AI as the archive"
	], 1, "KSOR is the knowledge-work analogue of the transactional system of record."),
	Q("s34", "solo", "layer", "Windows ODR and Agent Launchers, macOS ACP hosting, Linux shell+files: these are examples of what claim?", [
		"The host OS is disappearing so you can ignore it.",
		"Operating systems are growing substrates for discovery, invocation, and containment while still receding as the thing humans click.",
		"Only NVIDIA can host agents.",
		"MCP replaces the kernel."
	], 1, "OS as plumbing plus new discovery/containment surfaces."),
	Q("s35", "solo", "layer", "You give an agent send-on-all-mailers with no threshold. It dispatches a wrong customer notice. The governance miss is?", [
		"Not using a stealth model",
		"Over-delegation without permissions, thresholds, audit, and reversible actions",
		"Forgetting P2 schemas",
		"Not naming the worker an identic agent"
	], 1, "Governance/audit is a layer, not a vibe. Draft-vs-send is the canonical threshold."),
	Q("s36", "solo", "agentic", "You are choosing between a slash command you always type and a skill you want the model to notice. The decision tree says?", [
		"If you invoke it yourself on purpose, command; if it should apply when the task matches, skill.",
		"Skills are Claude-only; commands are OpenCode-only.",
		"Always prefer hooks.",
		"If it reads files, it must be a subagent."
	], 0, "Manual repeat → command. Auto expertise → skill."),
	Q("s37", "solo", "sdd", "Clarify is running as a dump of twenty questions in one message, several of which smuggle implementation. The course’s interview rule is?", [
		"One question at a time, no code, until the spec is hard to misread.",
		"As many questions as fit in a single cacheable prefix.",
		"Only yes/no questions about the ORM.",
		"Clarify is performed after build, as a retrospective."
	], 0, "Cheap, serial disambiguation. Implementation talk belongs in plan, not Clarify."),
	Q("s38", "solo", "thesis", "Cherny’s published workflow is called “vanilla”: short shared rules, plan before non-trivial work, a way for the model to verify, many sessions. A junior on your team is collecting prompt packs instead. Where does the agentic-coding ladder say people stall?", [
		"Stage 6 parallelize",
		"Between first sessions and “never explain twice” (rules file as a living system), collecting prompts instead of building a system",
		"Stage 0 mindset, which is optional",
		"Beyond this course, which forbids vanilla setups"
	], 1, "The course says most people stall between stages 1 and 2, hoarding prompts.")
];
var BRUTAL = [
	Q("x1", "brutal", "agentic", "A practitioner, having observed that an exploratory traversal of a three-hundred-file tree has saturated the primary context window, elects to encode the same traversal as a skill whose description guarantees automatic invocation, on the theory that “skills isolate work.” A colleague objects that isolation of token-heavy reconnaissance is the office of a subagent, whereas a skill merely interpolates a playbook into the already-polluted thread. Which distinction is the course’s?", [
		"The practitioner is correct: a skill always opens a fresh context window and is therefore the cheaper isolate.",
		"The colleague is correct: a skill runs in the current window with the current model; a subagent is a separate worker whose intermediate reads never enter the main thread.",
		"Both mechanisms are identical once a description field exists; the names are vendor cosmetics.",
		"Hooks, not subagents, are the isolation primitive, because they cannot be skipped."
	], 1, "Skill = playbook in-thread. Subagent = isolated worker returning a summary. Hooks enforce; they do not isolate search."),
	Q("x2", "brutal", "sdd", "A constitution forbids multi-paragraph comments; a spec, purporting to remain implementation-agnostic, nevertheless stipulates Postgres row-level security and a particular ORM “as acceptance criteria.” A reviewer claims the constitution is the proper home of stack constraints and that the spec has smuggled HOW under the guise of verification. A second reviewer claims acceptance criteria may name any technology if tests will bind it. Which reading is SDD-consistent?", [
		"The second reviewer: whatever a test can bind is WHAT, not HOW.",
		"The first reviewer: the spec’s job is observable behaviour; stack and comment density are constitution/plan concerns, and naming RLS/ORM in the spec is a HOW leak even if tests mention them later.",
		"Neither: both documents are deprecated once plan mode exists.",
		"Both must be merged into AGENTS.md or the four-phase loop is invalid."
	], 1, "Acceptance criteria should make behaviour fail visibly. They should not launder a stack decision into the spec."),
	Q("x3", "brutal", "thesis", "An executive proposes that an identic agent, because it “carries the founder’s judgment,” should also be the firm’s accounts-payable Digital FTE, thereby collapsing the edge layer and the workforce layer into a single long-lived chat with payment protocols attached. Which thesis objection is the most precise?", [
		"Identic agents are forbidden from using ACP/AP2/x402/MPP.",
		"The two-layer model separates a personal delegate (edge) from role-based workers that run against a system of record under a management layer; collapsing them destroys the spec-as-contract and turns the founder’s chat into an ungoverned ledger.",
		"Digital FTEs cannot be economic actors; only identic agents can hold mandates.",
		"The 10-80-10 rule forbids any agent from touching payments."
	], 1, "Identic ≠ Digital FTE. Payments rails do not license a layer collapse. Records and management still sit under workers."),
	Q("x4", "brutal", "problem", "A session exhibits simultaneously: (i) a plausible legal memo that misquotes a clause, (ii) a single prompt that rewrote twelve files, and (iii) no execution trace beyond the final paragraph. A consultant maps these, respectively, to Confident Wrong, Big Bang, and Black Box, and assigns P3, P4, and P7. A sceptic says all three are “just context rot” and that /compact is the unique remedy. Which mapping holds?", [
		"The sceptic: one command repairs all three named patterns.",
		"The consultant: the patterns are distinct failure modes with distinct principles; compact may help a poisoned chat but does not substitute for citation checks, reversible steps, or observability.",
		"Both: P1 Bash repairs citation errors because grep is truth.",
		"Neither: Cowork users are exempt from the Seven Principles."
	], 1, "Do not flatten every failure into context rot. The five patterns are diagnostic, not synonyms."),
	Q("x5", "brutal", "openclaw", "A public Telegram group is allowed to message an unsandboxed OpenClaw whose workspace includes client secrets and whose MEMORY.md has accreted unvetted “facts” from the channel. A proposer wants a longer SOUL.md instructing the model to ignore injections. A second proposer wants NemoClaw/OpenShell containment, credential hygiene outside the workspace, and a refusal to promote channel text into MEMORY without a human commit. Which is aligned with the course’s threat model?", [
		"The first: tone files are a sufficient control plane for public injection.",
		"The second: public channels are injection surfaces; cage the filesystem and egress, keep secrets in the credentials store, and treat MEMORY as a committed layer, not a dump of the channel cache.",
		"Neither: Discord is the only unsafe channel.",
		"Both: heartbeat intervals sanitise prompt injection statistically."
	], 1, "SOUL.md is not a security boundary. Sandbox + secrets discipline + deliberate MEMORY commits are."),
	Q("x6", "brutal", "layer", "A platform team declares that because they have selected a single frontier model, they now “are” the AI operating layer, and therefore need neither a knowledge system of record nor an audit trail, the model being “self-governing.” Which pair of invariants have they discarded?", [
		"ACP and x402",
		"Replaceability of the reasoning model, and governance/trusted records as durable structure independent of that model",
		"P1 and P2 of problem-solving",
		"Plan mode and /compact"
	], 1, "The layer’s point is that the model is a slot. Records and governance outlive it. Self-governing models are the category error the course names."),
	Q("x7", "brutal", "agentic", "An engineer, citing Uncle Bob’s 2026 remark that he no longer reads agent-written code, disables all review and ships on a single green test file the agent also authored. Cherny’s verification claim and Martin’s actual sequence are being used as a permission slip. What ratio does the course insist on?", [
		"Celebrity quotes replace checkers; the test file is sufficient because it is “independent.”",
		"Trust is proportional to the checkers you can name. Martin built extreme automated constraints first; Cherny’s 2–3× claim assumes a check the model cannot skip. An agent-authored test without a second check is not that ratio.",
		"Hooks are unnecessary once a famous engineer stops reading diffs.",
		"Spec-as-Source forbids tests."
	], 1, "The course is explicit: he built the checks first. Confidence is the size of the checkers, not a mood and not a tweet.")
];
[
	...BOOK,
	...TEAMMATES,
	...SOLO_A,
	...SOLO_B,
	...BRUTAL
];
var BY_KIND = {
	book: BOOK,
	teammates: TEAMMATES,
	solo: [...SOLO_A, ...SOLO_B],
	brutal: BRUTAL
};
function pickBankSitting(courses) {
	const allow = new Set(courses);
	const out = [];
	Object.keys(MIX).forEach((kind) => {
		const pool = shuffleCopy(BY_KIND[kind].filter((q) => allow.has(q.course)));
		const need = MIX[kind];
		if (pool.length >= need) {
			out.push(...pool.slice(0, need));
			return;
		}
		const extra = shuffleCopy(BY_KIND[kind].filter((q) => !allow.has(q.course)));
		out.push(...pool, ...extra.slice(0, Math.max(0, need - pool.length)));
	});
	return out.map(shuffleQuestion);
}
function fillKind(kind, have, need, courses) {
	if (have.length >= need) return have.slice(0, need);
	const allow = new Set(courses);
	const used = new Set(have.map((q) => q.id));
	const pool = shuffleCopy(BY_KIND[kind].filter((q) => allow.has(q.course) && !used.has(q.id)));
	const extra = shuffleCopy(BY_KIND[kind].filter((q) => !used.has(q.id)));
	return [
		...have,
		...pool,
		...extra
	].slice(0, need).map(shuffleQuestion);
}
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
/** Distilled canon used as generator context. Keep factual; no invented APIs. */
var CORPUS = `
# Agent Factory Canon (six courses)

## Thesis
- Valuable companies manufacture Digital FTEs (AI employees / AI Workers), not merely software. AI-Native company: workforce is mostly AI; product is whatever that workforce produces. Humans hire the workforce for jobs, not buy seats.
- Agent Factory = the process (spec-driven, human-supervised, general-agent powered). AI-Native Company / Agentic Enterprise = the output. AI Workers = the workforce.
- Two engagement modes: (1) Problem-solving — immediate outcome, governed by Seven Principles. (2) Manufacturing — produce a persistent AI Worker, governed by Seven Invariants.
- 10-80-10: 10% intent (human), 80% execution (AI), 10% verification (human). Cursor Feb 2026: 35% PRs by agents. Claude Code: ~10% of Cherny's code Feb 2025 → 30–40% May → all of it by winter.
- Identic AI (Don Tapscott, Feb 17 2026 HBR IdeaCast): personal agent carrying identity, judgment, preferences, authority. Two-Layer Model: Edge (identic) + AI Workforce (role-based Digital FTEs). Specs are the contract between layers.
- Economic actor trajectory enabled by ACP (OpenAI+Stripe Instant Checkout), AP2 (Google, 60+ companies, signed mandates), x402 (Coinbase; v2 late 2025; Stripe on Base early 2026), MPP (Stripe/Tempo micropayments).
- PwC: Paul Griggs Jul 2026 — AI is business transformation, not an IT project. 2026 Global CEO Survey: 56% of CEOs reported no financial return from AI — skipped fundamentals (data, governance), not models.
- WEF Future of Jobs 2025: 59/100 workers need reskilling by 2030.
- System of record = authoritative state Workers read/write; they must not invent truth from chat context. Nervous system = event substrate (schedules, webhooks, retry, throttle). Harness = control plane of the engine vs compute/sandbox plane.
- FDE (Forward Deployed Engineer) manufactures Digital FTEs and assembles AI-Native companies; vendor-neutral full pipeline.
- Data movement tax: cost of pipelines across specialized stores; default consolidate (e.g. Postgres).
- Distinguish: identic agent (personal delegate) ≠ Digital FTE (enterprise role). Problem-solving session ≠ manufacturing a worker.

## Agentic Coding (Claude Code + OpenCode) — 15 concepts
Core: context engineering — give the model the right information at the right time; keep irrelevant information out.
Karpathy triad: ghost not a person; jagged intelligence; trust only as far as output can be checked.
1. Tools take action. Give instructions, not questions.
2. Plan mode: look-but-don't-touch. CC: Shift+Tab twice. OC: Tab to Plan agent. Tasks >10 min: plan first. Save plan to a file (docs/plans/...) so it survives session loss.
3. Permissions: start asking. Auto-approve only earned-safe actions. Deny rm -rf, git push, npm publish. CC: .claude/settings.json. OC: opencode.json.
4. Match model to task. Strong model plans; cheap model executes a written plan. /model (CC) /models (OC). DeepSeek V4 Flash is economy execution. Stealth "free" models: temporary, may train on your data — never confidential.
5. Context rot: conversations get worse and cost more as they grow. Doom loop: apologies, rewrite loops, invented files, forgotten constraints, longer vaguer replies.
6. /clear or OC /new = start fresh. /compact = same task, less clutter. Do not mix. Do not try to fix a poisoned chat with a longer prompt.
7. Resume: claude --resume / OC /sessions. Plan file is backup if resume fails.
8. Rules file: CLAUDE.md / AGENTS.md. Short. Only what looking at files cannot reveal. Add a line when a real mistake happens; prune lines that stop earning their place. OC reads CLAUDE.md if no AGENTS.md; if both exist, AGENTS.md wins. /init drafts; you delete. Huge rules file is read every message. Anthropic pruned 80%+ of system prompt Jul 2026. Prefer describing the standard over forbidding.
9. Skills vs slash commands: repeating manual invoke → command; auto expertise from description → skill. Skills run in the current conversation.
10. Hooks (CC settings.json) / plugins (OC .opencode/plugins/). Fire every time; model cannot skip. Verification loop: attempt → check → fix → repeat. Put checks on commit, not every keystroke. Cherny: verification 2–3× better. Uncle Bob 2026: stopped reading agent code after building extreme automated checks — trust is a ratio to checkers.
11. Subagents: isolated context. Heavy search/read happens off-thread; main chat gets a summary. Skill = playbook in current window. Subagent = teammate with own window. Built-in Explore (cheap, read-only). Custom agents in .claude/agents/ or .opencode/agents/.
12. MCP: only add connectors you actually need. Context is the door — each server eats budget.
13. Where to run: start terminal or IDE plugin so you see actions. Desktop for non-coding (Cowork/OpenWork).
14. Personal library ~/.claude/ or ~/.config/opencode/ — grow from real problems, not speculation.
15. Memory: resume + rules file enough for most; notes/ folder if needed.

Extension decision tree:
- same thing repeatedly, manually → slash/custom command
- model should apply expertise when task matches → skill
- must happen every time, no judgment → hook/plugin
- iterate until provably right → verification loop
- isolate heavy reading → subagent

Undo: CC Esc Esc /rewind undoes model file edits, NOT bash side-effects. OC /undo uses git (files + bash). Checkpoints ≠ git history.
Big tool output → write to a file, report one line; don't dump 9k tokens of logs into chat (kills cache + poisons context).
Cache: stable front (system + rules + early turns) is cheap; editing rules mid-session busts the cache.

Part 8: Plan/Execute across tools (strong plans, cheap executes from the plan file). Cross-model review: different company reviews the diff; writer is worst reviewer of own code. Worktrees isolate parallel sessions. Cherny: ~15 sessions, abandons 10–20%.

## Spec-Driven Development
Spec is source of truth; code is a build output. Agree on WHAT (behavior) before HOW (implementation).
Vibe coding = thinking during generation; SDD = thinking written first.
Three levels: Spec-First (write then build; may drift); Spec-Anchored (update spec then re-derive); Spec-as-Source (code ephemeral).
Constitution = persistent principles/constraints/done criteria (often the rules file). Not self-enforcing — tests/hooks for absolutes. Test every line: "if I remove this, will a mistake happen?"
Four phases: Research → Specify → Clarify (interview, one question at a time, no code) → Build.
Spec contains: goal, scenarios, functional requirements, edges, out of scope, acceptance criteria. MUST NOT lock JWT/Postgres/frameworks as "the how."
Failure test: "Could a competent builder satisfy this wrongly?" If yes, tighten.
Right-size: trivial one-line → skip ceremony; multi-file/architecture → full loop.
Spec drift: code changes without spec update. Agent drift: mid-build deviation — re-ground to numbered requirements.
Design pass after build: agents create debt (duplication, tangles); humans still review structure.
Anthropic 2026: 400k agentic sessions show what/how split — humans frame, agents execute.

## Problem Solving with General Agents — Seven Principles
Dependency pyramid.
P1 Bash is the Key — brief the hands. Instruct actions that produce artifacts, not essays.
P2 Code as Universal Interface — specify the shape (schema/table/code) to kill prose ambiguity. Five powers: precise thinking, orchestration, memory, compatibility, tool creation.
P3 Verification as core step — "looks right" is a failure mode. Independent check: tests, rubrics, quote-the-source, cross-model review.
P4 Small reversible decomposition — atomic units, git/checkpoints. Prevents Big Bang.
P5 Persist state in files — chat is volatile. Plans, rules, explore.md live on disk.
P6 Constraints and safety — scope, approvals, autonomy ladder. Constraints enable autonomy.
P7 Observability — you can only direct what you can see.

Failure patterns:
- Drift → P5
- Confident Wrong → P3
- Big Bang → P4
- Scope Creep → P6
- Black Box → P7

Workflow: EXPLORE (read-only) → PLAN (save, review) → IMPLEMENT (small, verify, commit each) → COMMIT (final verify, update rules).
Cowork/OpenWork: desktop, approval cards, for non-coding. Principles transfer; surfaces differ.
Lindy: shell, files, git, SQL endure.

## OpenClaw
Open-source personal AI employee on your laptop; WhatsApp/Telegram/Discord/Slack/iMessage. Jensen Huang GTC 2026: "the next ChatGPT." NVIDIA NemoClaw on top.
Architecture: OS-autostart background service + gateway (port 18789, dashboard 127.0.0.1:18789) + workspace ~/.openclaw/workspace/. Config ~/.openclaw/openclaw.json. Credentials ~/.openclaw/credentials/.
Brain files: SOUL.md tone; IDENTITY.md name/role; USER.md who the user is; MEMORY.md committed long-term facts.
Three memory layers: session, channel cache, long-term MEMORY.md.
Skills (agentskills.io SKILL.md) vs MCP tools (external reach). Activation dance: exists → disabled → enabled → configured + gateway restart.
Schedules: cron (clock), heartbeat (interval), hooks (events).
Source of truth: live docs.openclaw.ai/llms.txt > local file > log.
General agents install/configure OpenClaw from a folder with AGENTS.md; user only does human seams (QR, API keys).
NemoClaw sandbox: container + OpenShell prison (one folder, allow-listed sites) + NemoClaw guard for keys/egress. Use for public channels (prompt injection).
Pitfalls: skill not firing (description), MCP silent fail (read gateway log), workspace bloat, forget /reset after brain edits, unofficial WhatsApp libs, 429 quota.
Recovery: "Read the gateway log, tell me in plain language, propose a fix I can approve."
Safety: no sudo without approval; don't start on paid models; secrets stay in ~/.openclaw/.
Node 24+. npm i -g openclaw@latest; openclaw onboard --install-daemon; gateway status; doctor.

## AI Operating Layer
Layer above the OS: humans state goals; agents open files, drive browsers, run commands. OS recedes like a car engine.
Stack: Identity+Context → Orchestration → Governance+Audit → Agent/Harness → Reasoning Model (replaceable) → Capabilities (skills, MCP, CLI) → Host OS.
Invariants: trusted records (SoR / KSOR for knowledge work); capabilities as callable functions; OS as plumbing; humans for intent+judgment; governance; separation model ≠ agent ≠ layer; local compute for private/sensitive loops.
KSOR = knowledge system of record: source material, policy, methods, provenance, context — survives model swap.
ACP connects agents to hosts (e.g. Xcode); MCP to tools/data; Skills package procedures.
Windows: On-Device Registry, Agent Launchers, containment. macOS: ACP, MCP, MLX on-device. Linux: composable shell+files+protocols.
Common mistake: treating the model as the architecture. Another: over-delegation without governance. Agent reliability is not 100% (cite hybrid review). Vendor lock vs protocols.
Klarna example in layer text: agent handling ~2/3 of chats ≈ 700 employees, ~$40M profit impact — bounded production work.
Personal (identic) agents dispatch general agents; general agents manufacture AI Workers — recursive.
`.trim();
var courseSchema = _enum(COURSE_IDS);
var inputSchema = object({ courses: array(courseSchema).min(1) });
var modelQuestionSchema = object({
	kind: _enum([
		"book",
		"teammates",
		"solo",
		"brutal"
	]),
	course: courseSchema,
	stem: string().min(40),
	options: tuple([
		string(),
		string(),
		string(),
		string()
	]),
	correctIndex: union([
		literal(0),
		literal(1),
		literal(2),
		literal(3)
	]),
	explanation: string().min(20)
});
var batchSchema = object({ questions: array(modelQuestionSchema) });
var STYLE = `
EXAM STYLE (mandatory — this is a Panaversity-hard sitting):
- Four options A–D. Never make the correct option the longest, the only specific, or the only one naming a file.
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
function kindPrompt(kind, count, courses) {
	return `Write exactly ${count} multiple-choice questions of kind="${kind}" covering these courses: ${courses.map((id) => COURSES.find((c) => c.id === id)?.title ?? id).join("; ")}.
Spread across those courses; do not put every question on one page.
Return JSON only: {"questions":[{ "kind":"${kind}", "course":"<id>", "stem":"...", "options":["...","...","...","..."], "correctIndex":0, "explanation":"..." }]}
course must be one of: ${courses.join(", ")}.
${STYLE}`;
}
async function completeJson(prompt, maxTokens) {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) throw new Error("AI is not available in this environment");
	const res = await fetch("https://api.x.ai/v1/chat/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`
		},
		body: JSON.stringify({
			model: "grok-4.5",
			temperature: .7,
			max_tokens: maxTokens,
			response_format: { type: "json_object" },
			messages: [{
				role: "system",
				content: "You write Panaversity-difficulty exam items. JSON only. No markdown."
			}, {
				role: "user",
				content: `CANON:\n${CORPUS}\n\n${prompt}`
			}]
		})
	});
	if (!res.ok) {
		const t = await res.text().catch(() => "");
		throw new Error(`xAI API error ${res.status} ${t.slice(0, 180)}`);
	}
	return (await res.json()).choices?.[0]?.message?.content ?? "";
}
function parseBatch(raw, kind) {
	let json;
	try {
		json = JSON.parse(raw);
	} catch {
		const start = raw.indexOf("{");
		const end = raw.lastIndexOf("}");
		if (start >= 0 && end > start) json = JSON.parse(raw.slice(start, end + 1));
		else return [];
	}
	const parsed = batchSchema.safeParse(json);
	if (!parsed.success) return [];
	return parsed.data.questions.filter((q) => q.kind === kind).map((q, i) => ({
		id: `g-${kind}-${Date.now().toString(36)}-${i}-${Math.random().toString(36).slice(2, 7)}`,
		kind: q.kind,
		course: q.course,
		stem: q.stem.trim(),
		options: q.options.map((o) => o.trim()),
		correctIndex: q.correctIndex,
		explanation: q.explanation.trim()
	}));
}
async function generateKind(kind, count, courses) {
	const maxTokens = Math.min(16e3, 900 + count * 520);
	try {
		return fillKind(kind, parseBatch(await completeJson(kindPrompt(kind, count, courses), maxTokens), kind), count, courses);
	} catch {
		return fillKind(kind, [], count, courses);
	}
}
var generateSitting_createServerFn_handler = createServerRpc({
	id: "9a33745239df4986cb279c320da2e94478ac561455556e58b07291d6b77d502f",
	name: "generateSitting",
	filename: "src/lib/quiz/generate.ts"
}, (opts) => generateSitting.__executeServer(opts));
var generateSitting = createServerFn({ method: "POST" }).validator((input) => inputSchema.parse(input)).handler(generateSitting_createServerFn_handler, async ({ data }) => {
	const courses = data.courses;
	const chunks = [
		{
			kind: "book",
			count: MIX.book
		},
		{
			kind: "teammates",
			count: MIX.teammates
		},
		{
			kind: "solo",
			count: MIX.solo
		},
		{
			kind: "brutal",
			count: MIX.brutal
		}
	];
	const questions = prepareSittingQuestions((await Promise.all(chunks.map((c) => generateKind(c.kind, c.count, courses)))).flat());
	if (questions.length !== TOTAL_QUESTIONS) return {
		ok: false,
		error: "Could not assemble a full sitting."
	};
	return {
		ok: true,
		source: questions.filter((q) => q.id.startsWith("g-")).length >= 40 ? "generated" : "bank",
		questions
	};
});
var bankSitting_createServerFn_handler = createServerRpc({
	id: "4756143a09db6e2f520dae6b690ba2f0fa916138bce6c96e2d90718dce762ae1",
	name: "bankSitting",
	filename: "src/lib/quiz/generate.ts"
}, (opts) => bankSitting.__executeServer(opts));
var bankSitting = createServerFn({ method: "POST" }).validator((input) => inputSchema.parse(input)).handler(bankSitting_createServerFn_handler, async ({ data }) => {
	const { pickBankSitting } = await import("./bank-D-JP3Ago.mjs");
	return {
		ok: true,
		source: "bank",
		questions: prepareSittingQuestions(pickBankSitting(data.courses))
	};
});
//#endregion
export { bankSitting_createServerFn_handler, generateSitting_createServerFn_handler, pickBankSitting as n, fillKind as t };
