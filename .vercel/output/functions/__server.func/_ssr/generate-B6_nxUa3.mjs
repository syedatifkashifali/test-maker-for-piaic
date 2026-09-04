import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
import { i as MIX, n as COURSE_IDS, o as TOTAL_QUESTIONS, t as COURSES } from "./types-Crii9q60.mjs";
import { a as object, c as union, n as array, o as string, r as literal, s as tuple, t as _enum } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/generate-B6_nxUa3.js
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
		"The file survives conversation loss, so a fresh session can be told to read it and continue from a named step.",
		"Neither tool will resume a session unless a plan file exists, so resume and the plan file are one mechanism.",
		"Plan mode refuses to exit until the plan is on disk, which is what makes writing the file mandatory.",
		"The file lets the executing model skip its own reasoning, which is why the course frames it as a speed optimisation."
	], 0, "Resume is convenient; a plan file is the durable contract. The course is explicit that the file is a backup if the conversation cannot be resumed, not a speed hack and not a hard requirement of the tools."),
	Q("b2", "book", "agentic", "A session is still about the same feature, but the transcript is full of dead-end file dumps. Which pair of commands does the course tell you not to confuse?", [
		"Both discard the conversation; /compact is the Claude Code spelling and /new the OpenCode spelling of one command.",
		"/compact keeps the same task with less clutter, while /clear or /new wipes the conversation and starts fresh.",
		"/compact summarises and keeps the task, while /clear also reverts the model's file edits across the working tree.",
		"/clear trims the transcript but keeps the rules file loaded, while /compact rebuilds the prompt cache from zero."
	], 1, "Concept 6 is the distinction: compact = same task, less clutter; clear/new = start over. Rewind/undo are rollback, not context commands."),
	Q("b3", "book", "agentic", "OpenCode is started in a repo that already has CLAUDE.md and no AGENTS.md. What does the course say OpenCode will do?", [
		"It concatenates CLAUDE.md and AGENTS.md in that order, so both are in context on every message of the session.",
		"It prompts you to rename CLAUDE.md before the first message, since two rules files would otherwise conflict.",
		"It reads CLAUDE.md as a fallback, and if AGENTS.md later appears, AGENTS.md is used and CLAUDE.md is ignored.",
		"It ignores CLAUDE.md entirely, because OpenCode only ever loads a rules file named AGENTS.md from the repo root."
	], 2, "OpenCode reads CLAUDE.md when AGENTS.md is absent. If both exist, AGENTS.md is used."),
	Q("b4", "book", "sdd", "A spec for a password-reset flow names JWT expiry, a Postgres table, and Redis for the token store. What is the Spec-Driven Development course’s primary objection?", [
		"Those choices belong in the constitution, which is where durable technical constraints live rather than in one flow's spec.",
		"The spec is sound but incomplete: it should also name the migration that creates the table and the key rotation window.",
		"Password reset sits below the threshold for a spec, so the four-phase loop should be skipped and the flow built directly.",
		"The spec has mixed HOW into WHAT, locking an implementation and failing the test of whether a builder could satisfy it wrongly."
	], 3, "Specs are behaviour-only. Implementation choices in the spec freeze the how and make later tool/stack changes a spec rewrite."),
	Q("b5", "book", "thesis", "The thesis’s 10-80-10 rhythm refers to which split of work?", [
		"Roughly 10% human intent, 80% AI execution, and 10% human verification and polish on a piece of work.",
		"Roughly 10% of the workforce human, 80% Digital FTEs, and 10% identic agents acting as personal delegates.",
		"Roughly 10% of the token budget on planning, 80% on execution with cheaper models, and 10% on review passes.",
		"Roughly 10% of companies AI-Native by 2030, 80% hybrid, and 10% untouched by the shift to agent execution."
	], 0, "10-80-10 is a rhythm of a piece of work: humans set intent, agents execute, humans verify — not a census of headcount or a token budget."),
	Q("b6", "book", "problem", "Principle 3 says “looks right” is a failure mode. Which intervention is the principle actually asking for?", [
		"A design review of the structure afterwards, because agents accumulate duplication and tangles quickly.",
		"An independent check the agent can run, or that a human can score against a source, a test, or a rubric.",
		"A second pass by a stronger model, since a more capable model is less likely to accept its own output.",
		"Persisting the result to MEMORY.md so later sessions inherit it as verified instead of re-deriving it."
	], 1, "Verification is an independent check, not extra eloquence, not memory promotion, and not a freeze in plan mode."),
	Q("b7", "book", "openclaw", "In OpenClaw’s workspace, which file is the long-term committed-facts layer, as distinct from tone, name/role, and user profile?", [
		"IDENTITY.md",
		"USER.md",
		"MEMORY.md",
		"SOUL.md"
	], 2, "SOUL = tone, IDENTITY = name/role, USER = who the human is, MEMORY = facts you mean to keep across channels and sessions."),
	Q("b8", "book", "layer", "The AI Operating Layer course warns against a specific category error: treating which piece as if it were the architecture?", [
		"The MCP server list and its connectors",
		"The system of record for knowledge (SoR / KSOR)",
		"The host operating system kernel underneath it",
		"The reasoning model running behind the agent"
	], 3, "Models are replaceable generators. The durable layer is identity/context, orchestration, governance, harness, capabilities, and trusted records."),
	Q("b9", "book", "thesis", "The thesis keeps the Agent Factory and the AI-Native company apart. Which pairing matches the text?", [
		"The Agent Factory is the spec-driven, human-supervised process; the AI-Native company or agentic enterprise is the output of running it.",
		"They are two names for one thing: a company whose product is whatever its mostly-AI workforce produces under human intent.",
		"The Agent Factory is what an AI-Native company sells, and the AI-Native company is the organisation that buys and operates it.",
		"The Agent Factory is the workforce itself, while the AI-Native company is the governance layer that supervises that workforce."
	], 0, "Process versus output is the thesis's first distinction. AI Workers are the workforce the process manufactures."),
	Q("b10", "book", "thesis", "A deck says “our identic agent is our Digital FTE.” Which correction does the thesis make?", [
		"A Digital FTE is an identic agent that has been given a spec, since the spec is the contract between the two layers.",
		"An identic agent is a personal delegate carrying one person's identity and judgment; a Digital FTE is an enterprise role.",
		"An identic agent is the edge tier, and a Digital FTE is the same agent once it has been promoted into a shared channel.",
		"An identic agent handles knowledge work, while a Digital FTE handles only the automation that used to be scripted."
	], 1, "The Two-Layer Model separates the Edge (identic) from the AI Workforce (role-based Digital FTEs), with specs as the contract between the layers."),
	Q("b11", "book", "agentic", "The extension decision tree asks what to reach for when a check “must happen every time, no judgment.” What does the course name?", [
		"A skill whose description matches the task",
		"A slash or custom command the human invokes",
		"A hook in Claude Code, or plugin in OpenCode",
		"A plan file the session rereads at each start"
	], 2, "Every-time, no-judgment enforcement is a hook or plugin. Skills and commands still depend on the model choosing to invoke them."),
	Q("b12", "book", "agentic", "Which statement about prompt caching matches the course?", [
		"Caching applies to the main thread only; subagents run in their own window and never benefit from cached front.",
		"/compact rebuilds the cache from the saved plan file, which is why the course pairs the two in long sessions.",
		"The cache is rebuilt per message, so editing the rules file mid-session costs nothing beyond the tokens added.",
		"A stable front of system prompt, rules and early turns stays cheap, and editing the rules mid-session busts it."
	], 3, "The cache rewards a stable prefix. Mid-session rules edits invalidate it, which is one more reason rules files stay short and settled."),
	Q("b13", "book", "sdd", "One phase of the four-phase workflow has the agent interview the human one question at a time and write no code. Which phase is it?", [
		"Clarify — the interview that closes the gaps",
		"Build — the phase where the code is derived",
		"Research — the read-only sweep before writing",
		"Specify — the first written draft of the spec"
	], 0, "Clarify is the interview: one question at a time, no code, closing the gaps every first spec has."),
	Q("b14", "book", "problem", "P2 asks you to specify the shape — schema, table, or code — instead of describing it in prose. What is the claimed payoff?", [
		"It cuts token use, which the course treats as the main reason to prefer a shape over a paragraph of plain description.",
		"It kills prose ambiguity and buys the five powers: precise thinking, orchestration, memory, compatibility, tool creation.",
		"It lets the agent skip the verification step, because a schema or a table constrains its output better than a test would.",
		"It replaces the system of record for the task, so the agent no longer has to read authoritative state before writing."
	], 1, "Code as universal interface is about killing ambiguity in the shape of the thing, and the five powers follow from a machine-readable contract."),
	Q("b15", "book", "openclaw", "OpenClaw offers three scheduling kinds. Which mapping is correct?", [
		"cron for intervals, heartbeat for events, hooks for clock time",
		"cron for retries, heartbeat for webhooks, hooks for approvals",
		"cron for clock time, heartbeat for intervals, hooks for events",
		"cron for events, heartbeat for clock time, hooks for intervals"
	], 2, "cron is the clock, heartbeat is the interval, hooks are events."),
	Q("b16", "book", "layer", "The layer course separates ACP, MCP and Skills. Which mapping matches the text?", [
		"ACP reaches tools and data, MCP connects agents to hosts, and Skills register capabilities in the layer.",
		"All three connect agents to hosts; they differ only in which operating system family each one targets.",
		"ACP packages procedures, MCP connects agents to hosts, and Skills carry the data contracts between them.",
		"ACP connects agents to hosts such as Xcode, MCP reaches tools and data, and Skills package procedures."
	], 3, "Hosts, tools, procedures: ACP reaches the host, MCP reaches tools and data, Skills carry the procedure.")
];
var TEAMMATES = [
	Q("t1", "teammates", "agentic", "Sara has been in one Claude Code session for nearly two hours on auth plus billing. The model now apologises without moving the code, rewrites the same three functions, invents a helper path that is not in the repo, and quietly ignores her earlier “never touch generated/” constraint. Ahmed, watching over her shoulder, says the history is an asset and she should type a denser recap so the model can recover. Which move actually matches the course?", [
		"Stop sending messages: /compact if she still wants this task, or /clear (or /new) for a clean start, then restate the constraints in the shortened thread.",
		"Append the missing constraint to CLAUDE.md and keep typing, because a rules-file edit made mid-session is picked up immediately by the running session.",
		"Ahmed is right: the history is the asset, so a denser recap in the same thread is how a session that has started to loop is brought back under control.",
		"Neither: the fix is to switch to a stronger model in the same thread, because the looping is a capability limit rather than a context problem."
	], 0, "Those symptoms are context poisoning. More prompting deepens the doom loop. Rules-file edits mid-rot also bust prompt cache and do not unpoison the transcript."),
	Q("t2", "teammates", "agentic", "Fatima drops into default execute mode and pastes one long feature brief. Twenty minutes later eight files have moved and the architecture is wrong. Usman says the brief was simply too short; a better first prompt would have been enough. What was the actual miss?", [
		"Usman is right: the brief was too short, and a longer first prompt naming the eight files would have kept the architecture intact.",
		"She should have entered plan mode, iterated a written plan, approved it, then executed — ideally with a cheaper model following the saved plan.",
		"She should have handed the feature to a subagent so that the main thread stayed empty while the architecture was decided off to one side.",
		"She should have auto-approved bash for the duration, because the interruption pattern is what pushed eight files into one unreviewed change."
	], 1, "Non-trivial work is plan-then-execute. Length of the first prompt is not a substitute for a reviewed plan."),
	Q("t3", "teammates", "agentic", "Every few days Zainab and Omar paste the same paragraph: run tests after edits, never touch src/generated/, use the existing auth middleware. Zainab wants the whole paragraph in CLAUDE.md so it is “always on.” Omar wants a skill that auto-invokes when the task matches. Who is closer, and why is the other trap easy?", [
		"Neither: it belongs in a plan file that the session rereads at the start of every conversation, which is what plan files are actually for.",
		"Zainab: anything repeated belongs in the rules file, which the model reads once per project and therefore costs nothing to keep verbose.",
		"Omar: this is reusable expertise the model should apply when the task matches, and putting all of it in the rules file taxes every message.",
		"Neither: a hook is the only mechanism that can mention tests at all, so the paragraph belongs on the commit path rather than in either file."
	], 2, "Rules files stay short and hold what files cannot reveal. Repeated procedures that should fire when relevant are skills. Hooks are for no-judgment enforcement, not for a paragraph of preferences."),
	Q("t4", "teammates", "agentic", "Usman wants commits blocked if tests fail or [TODO] remains in published/. Nadia says a strongly worded CLAUDE.md line is enough because the model “always reads it.” What does the course actually prescribe?", [
		"A reviewer subagent after the fact, because isolation from the main thread is a stronger guarantee than anything on the commit path.",
		"Nadia: the rules file is read on every message, so a strongly worded line is binding in the same way that a compiler check is binding.",
		"A skill with a vivid description, because a skill that matches the task cannot be skipped once it has been listed in the project.",
		"A hook in Claude Code, or a plugin in OpenCode, on the commit path — a verification loop the model cannot talk its way around."
	], 3, "Rules and skills are suggestions the model can ignore. Hooks/plugins run regardless. Put the check at commit, not on every keystroke."),
	Q("t5", "teammates", "agentic", "Ahmed’s CLAUDE.md is hundreds of lines, including “add comments where helpful” and “never write multi-line comments,” plus many facts the repo already shows. Sara says more clarifying lines will cancel the contradictions. What should he do?", [
		"Prune: keep only lines that prevent mistakes the model actually made, and delete contradictions plus anything the files already teach.",
		"Split it into CLAUDE.md and AGENTS.md so each tool reads the half that suits it, since OpenCode prefers AGENTS.md when both exist.",
		"Sara: contradictions cancel out if each is answered by a more specific line, so the file should keep growing until nothing is ambiguous.",
		"Move the file into a skill so it loads only when the task matches, which removes the recurring cost without removing any of the guidance."
	], 0, "The method is earned lines plus pruning. Anthropic cut a large share of its own system prompt in 2026. More text is not more control."),
	Q("t6", "teammates", "agentic", "Omar uses a frontier model for planning, formatting, test runs, and “just follow the plan.” Fatima says staying on the strongest model is the only way quality holds. What is the taught split?", [
		"Fatima: quality compounds, so the strongest model should stay in the seat for planning, execution and test runs alike.",
		"Plan and do the hard reasoning on the strong model, then execute the written plan on a cheaper one chosen with /model or /models.",
		"Use the cheapest model throughout and spend the difference on a second review pass by a stronger model once the work is finished.",
		"Match the model per file rather than per phase, so generated code runs cheap while hand-written modules run on the frontier model."
	], 1, "The expensive step is thinking. A clear plan is execution. Stealth free models are the wrong default for real work."),
	Q("t7", "teammates", "agentic", "Nadia asks the agent to find every billing site and then fix one edge case. It opens dozens of files into the main thread. Hassan says the rules file lacked a billing map. What should she have done instead?", [
		"Compact first and repeat the search, because a shorter transcript gives the same search more room and therefore fewer files opened.",
		"Hassan: the rules file needed a billing map, and with one the agent would not have had to open dozens of files to find the sites.",
		"Delegate the heavy search to a subagent and keep only its summary in the main conversation, then make the small edit in the main thread.",
		"Split the search across several sessions in parallel worktrees, since each worktree carries its own context window and its own budget."
	], 2, "Codebase archaeology is the most context-poisoning request you can make in the main window. Subagents exist for that."),
	Q("t8", "teammates", "agentic", "Hassan’s session vanished after a solid multi-step plan. Nadia says he should just --resume / /sessions and that a plan file is ceremonial. He is not sure the session is still listed. What should already exist?", [
		"A rules-file line recording the plan, since CLAUDE.md is read on every message and therefore survives the loss of a session.",
		"A MEMORY.md entry naming the next step, because committed long-term facts are what carry state between sessions of any tool.",
		"Nadia: resume is the mechanism the tools provide, and a plan file adds ceremony to a session that can simply be reopened.",
		"A plan file on disk that a new session can read and continue from, because resume is a convenience and not a guarantee."
	], 3, "Resume is useful; the plan file is the contract that survives session loss."),
	Q("t9", "teammates", "sdd", "Leila writes a spec that already names Drizzle, a particular folder layout, and “use our existing Redis.” Bilal says that specificity will stop the agent from inventing a stack. What does SDD say is the cost of that choice?", [
		"The spec has absorbed HOW, so a later stack change becomes an intent rewrite rather than a re-derivation from behaviour.",
		"Nothing is wrong provided the constitution repeats the same choices, so both documents agree on Drizzle, the layout and Redis.",
		"The cost is only that Clarify becomes shorter, since there is less left to interview about once the implementation has been named.",
		"Bilal: naming the stack is what stops an agent from inventing one, and a spec that leaves the stack open is the riskier document."
	], 0, "Behaviour belongs in the spec. Stack and layout belong in constitution or plan, not in the behaviour contract."),
	Q("t10", "teammates", "sdd", "After a vague spec, the agent ships a “working” password reset that never expires tokens. Imani wants to patch the code and leave the spec. Yusuf wants to tighten the spec’s acceptance criteria first, then re-derive. Who matches Spec-Anchored practice?", [
		"Imani: patch the code now and update the spec at the next planning pass, because a broken reset flow is a live defect and the spec is not.",
		"Yusuf: make token expiry a testable must in the spec, then rebuild against it — patching the code alone is how spec drift starts.",
		"Both, in sequence: patch the code, then rewrite the spec from the shipped behaviour so that the document matches what was built.",
		"Neither: expiry belongs in the constitution as a durable constraint, and once it is there the spec needs no acceptance criterion for it."
	], 1, "Spec-Anchored means the spec stays the contract. Patching only the code is how drift starts."),
	Q("t11", "teammates", "sdd", "Noor wants to skip Clarify because Research and Specify already took an hour. Adeel wants the model to interview one ambiguity at a time before any build. What is the course’s claim about skipping Clarify?", [
		"Both are wrong: the interview should be run by a subagent, so ambiguities are collected off-thread and summarised into the spec.",
		"Noor: an hour of Research and Specify has already surfaced the ambiguities, so the interview would only restate decisions already taken.",
		"Adeel: unstated assumptions become defects at build prices, and Clarify — one question at a time, no code — is the cheap place to kill them.",
		"Both are wrong: Clarify is a research activity, so it belongs before Specify rather than after it in the four-phase order."
	], 2, "The interview is cheap. Build is expensive. Skipping it is how “working but wrong” ships."),
	Q("t12", "teammates", "thesis", "Maya is selling a per-seat copilot. Farid wants to productise a Digital FTE that owns a role’s outcomes. Maya says that is just a marketing rename of SaaS. What distinction does the thesis actually draw?", [
		"The distinction is deployment: seats run in the customer's tenant, while a Digital FTE always runs in the vendor's own infrastructure.",
		"The distinction is model access: a copilot borrows the customer's model budget, while a Digital FTE brings its own inference capacity.",
		"Maya: a Digital FTE is a per-seat copilot with a job title attached, and the thesis describes a pricing change rather than a new thing.",
		"SaaS sells tools and seats with humans still doing the execution; an AI-Native offering sells labour and outcomes through role-based workers."
	], 3, "The thesis is a business shift from tools to labour, not a synonym for “chat in the IDE.”"),
	Q("t13", "teammates", "thesis", "Kamal wants to call their support bot an identic agent because it “represents the brand.” Hira says identic AI is the personal delegate on the edge, and the support role is a Digital FTE in the workforce layer. Who is using the thesis’s two-layer model correctly?", [
		"Hira: an identic agent is a personal delegate on the edge, while a support role is a role-based worker in the workforce layer.",
		"Both: the support bot is an identic agent while it is in trial, and becomes a Digital FTE once it is given a service-level target.",
		"Neither: a support bot belongs to neither layer, because customer-facing automation predates the two-layer model entirely.",
		"Kamal: a bot that speaks for the brand carries the company's identity and judgment, which is the definition of an identic agent."
	], 0, "Tapscott’s identic AI is personal. Digital FTEs are the hired workforce. Mixing them collapses the two-layer model."),
	Q("t14", "teammates", "problem", "Rafi asks the agent “how should we organise these 400 PDFs?” and gets an essay. Sana says he should have named an output file and an action (“group by opposing counsel into folders, write a manifest”). Rafi says Principle 2 is about JSON only. Who is right about P1 vs P2?", [
		"Rafi: P2 is about JSON output, and since no JSON was requested the principle was never engaged; the essay is not a P1 or P2 failure.",
		"Sana: P1 is briefing the hands to produce artifacts, and P2 is specifying the shape when prose would be misread; his prompt failed P1 first.",
		"Both partly: P1 was satisfied because the agent did act, and the essay is a P7 failure because Rafi could not see the reasoning.",
		"Sana, for a different reason: the prompt failed P5, since nothing was written to disk that a later session could pick up and continue."
	], 1, "He asked a question instead of giving an instruction that yields a file. That is P1. P2 would tighten the shape of the manifest."),
	Q("t15", "teammates", "problem", "After a one-shot rewrite of a 40-file module, git status is a swamp. Talia wanted numbered steps with a commit after each. Owen says one commit at the end is cleaner history. Which failure pattern did Owen just recommend?", [
		"Scope creep, answered by P6 constraints and an explicit out-of-scope list",
		"Drift, answered by P5 persisting the plan where a later session can find it",
		"The Big Bang, answered by P4 small reversible decomposition with commits",
		"Black Box, answered by P7 observability of every step the agent takes"
	], 2, "One irreversible blob is Big Bang. P4 is atomic, reversible units with checkpoints."),
	Q("t16", "teammates", "problem", "The agent’s answer looks professional but a cited clause is not in the contract. Priya wants a “quote the exact source for each claim” pass. Dev wants to promote the answer into MEMORY.md so the team stops re-litigating. What does P3 say?", [
		"Neither: the citation should be checked by a stronger model, since a second model reading the contract is an independent verifier.",
		"Both: promote the answer to MEMORY.md with the citations attached, so the memory layer carries the grounding along with the claim.",
		"Dev: once the answer is in MEMORY.md the team stops re-litigating it, and a committed fact is a better record than a citation pass.",
		"Priya: “looks right” is the failure mode, so each claim is grounded against the source or discarded — before anything is persisted."
	], 3, "Persisting an unchecked claim is how Confident Wrong becomes institutional memory."),
	Q("t17", "teammates", "openclaw", "After editing SOUL.md, Ayesha’s WhatsApp replies still sound like the old voice. Imran says she must reinstall the daemon. What is the more likely miss in the OpenClaw course?", [
		"She most likely did not /reset after the edit, so the running system prompt is stale and still carries the previous voice.",
		"SOUL.md is the wrong file for voice; tone belongs in IDENTITY.md, which is the brain file the gateway actually loads on startup.",
		"The WhatsApp channel caches the previous persona, so the change appears only once the channel cache expires on its own schedule.",
		"Imran: the daemon must be reinstalled, because brain files are read once at install time and are not re-read by a running gateway."
	], 0, "A documented pitfall: forgetting to reload after brain-file edits."),
	Q("t18", "teammates", "openclaw", "They want OpenClaw on a public Discord. Nabil argues for unsandboxed laptop access so it can “really help.” Lina argues for NemoClaw/OpenShell-style containment because public channels are prompt-injection surface. Which matches the course’s public-channel advice?", [
		"Nabil: a personal assistant that cannot reach the laptop cannot really help, and injection is a risk in any channel, public or private.",
		"Lina: a public channel is the reason to cage folder access and egress, while unsandboxed access is for trusted personal use only.",
		"Both, on alternate days: run unsandboxed for members and sandboxed for strangers, since containment is a per-message decision.",
		"Neither: Discord is unsupported for OpenClaw, so the question resolves once the bot is moved to WhatsApp or Telegram instead."
	], 1, "Prompt injection on public channels is a stated reason for the sandbox architecture."),
	Q("t19", "teammates", "openclaw", "A skill they installed never fires. Kashif wants to rewrite USER.md. Mehreen wants the gateway log and the skill description. What should they inspect first?", [
		"Kashif, with an addition: rewrite USER.md and MEMORY.md together, since a stale memory layer can suppress a correctly enabled skill.",
		"Kashif: USER.md tells the model who it is talking to, and a skill will not fire until the user profile describes the task it matches.",
		"Mehreen: read the gateway log for load events and check that the SKILL.md description matches the task, then finish the activation dance.",
		"Neither: a skill that never fires is usually an MCP wiring problem, so the connector should be re-added and the gateway restarted."
	], 2, "Non-firing skills are a description/load/activation problem, diagnosed from the gateway log."),
	Q("t20", "teammates", "layer", "Samir says “we are an AI-native company because we switched to GPT-x.” Rabia says the operating layer is identity, orchestration, governance, harness, capabilities, and records — the model is the replaceable middle. Who is closer?", [
		"Both: the model is the middle of the stack, and adopting it forces the surrounding layers to appear, so the claim is true in the long run.",
		"Neither: the operating layer is a vendor product rather than an internal structure, so the claim is settled by which platform is licensed.",
		"Samir: the model is the capability, so a company that has adopted the strongest available model has adopted the operating layer with it.",
		"Rabia: confusing the model with the architecture is the course's named mistake; the layer is identity, orchestration, governance, records."
	], 3, "The layer sits above the OS; the model is one swappable slot."),
	Q("t21", "teammates", "layer", "They want agents drafting invoices from chat memory because “the CRM is slow.” Yusuf wants every write to go through the system of record. Amina says chat context is the new SoR. What does the layer/thesis pairing say?", [
		"Yusuf: Workers read and write trusted records, and must not treat the transcript as the company's truth when they draft an invoice.",
		"Both: draft from chat for speed, then reconcile against the system of record in a nightly batch so the ledger is eventually correct.",
		"Neither: invoices should be drafted from the knowledge system of record, which holds policy and provenance rather than transactions.",
		"Amina: chat context is the fastest record available, and a Worker that waits on the CRM is a Worker that cannot complete its work."
	], 0, "Trusted records are an invariant. Chat is not a ledger."),
	Q("t22", "teammates", "thesis", "A CEO cites the 56% “no return on AI” survey and wants a bigger model. Pilar says the thesis reads that result as skipped fundamentals (data, governance, operating the AI as a workforce), not as a model-size problem. Which reading matches the thesis?", [
		"The CEO: 56% saw no return because the models available at the time were not capable enough, and a stronger model closes the gap.",
		"Pilar: the Griggs and PwC framing is business transformation and skipped fundamentals — data, governance, operating AI as a workforce.",
		"Both: the survey measures IT projects, so a bigger model plus a governance programme is what the thesis is actually recommending.",
		"Neither: the survey measures seat adoption, so the missing 44% is explained by licences that were bought and never used by staff."
	], 1, "The thesis uses the PwC numbers to argue against confining AI to IT and skipping data/governance."),
	Q("t23", "teammates", "agentic", "Hina runs a repository-wide search that dumps several thousand lines of tool output into the chat. Bilal says that is fine and she should simply scroll back and summarise it by hand when she needs it. What does the course actually prescribe for large tool output?", [
		"Move the search into a subagent afterwards and ask it to re-read the transcript, which is already a summary of what was searched.",
		"Bilal: a human summary in the thread is itself the verification step, and the raw output stays available for anyone who scrolls back.",
		"Write the output to a file and have the agent report one line, because a large dump in chat busts the cache and poisons the context.",
		"Raise the model's token ceiling so the whole dump fits in context, since truncation is what turns a useful search into a lost one."
	], 2, "Big output belongs on disk with a one-line report. Dumping it into the thread costs cache and leaves junk the model keeps re-reading."),
	Q("t24", "teammates", "agentic", "After a week of clean runs, Rehan wants to auto-approve every bash command so the agent stops interrupting him. Ayesha objects. Which position matches the permissions guidance?", [
		"Neither: permissions must always ask, because an approval that has been granted once cannot be reasoned about by the model later.",
		"Neither: permissions belong in the rules file rather than settings, so that the model can read the reasoning behind each denial.",
		"Rehan: a week of clean runs is exactly the earned trust the course describes, so blanket approval is the reward for that record.",
		"Ayesha: auto-approve only the specific actions that have earned it, and keep deny rules for rm -rf, git push and npm publish."
	], 3, "Start asking, then widen narrowly. Destructive actions stay denied regardless of track record."),
	Q("t25", "teammates", "agentic", "Mariam insists the strongest available model should also execute the written plan, because quality compounds over a long build. Daniyal disagrees. Who is closer to the course, and what is the other person's error?", [
		"Daniyal: the strong model is for planning, and a cheaper model executes a plan already written — Mariam is paying twice for judgment.",
		"Neither: the model must not change inside a single session, so whichever model wrote the plan is the one that has to execute it.",
		"Neither: execution should be handed to a subagent on any model, since isolation from the main thread is what preserves quality.",
		"Mariam: quality compounds, so the strongest model should carry the build as well as the plan; a cheaper executor is where defects enter."
	], 0, "Match the model to the task. Planning is judgment; executing a settled plan is throughput."),
	Q("t26", "teammates", "thesis", "Kamran proposes buying a chat seat for every employee and reporting the company as AI-Native at the next board meeting. Sadia says that misses the thesis's test. Which test does she mean?", [
		"Seat count is the right measure, provided utilisation stays above the threshold the board has set for the reporting period.",
		"An AI-Native company's workforce is mostly AI and its product is whatever that workforce produces; humans hire it for jobs, not seats.",
		"The measure is the share of pull requests written by agents, which is the only figure in the canon that can be audited externally.",
		"The measure is the number of MCP connectors in production, since capability reach is what separates an AI-Native firm from a copilot."
	], 1, "Seats are a licence model; the thesis is about who does the work. Cursor's 35%-of-PRs figure is evidence, not the definition."),
	Q("t27", "teammates", "thesis", "Imran wants the new worker's state split across four specialised stores so each is best of breed. Farah objects on the grounds of the data movement tax. What is her argument?", [
		"The tax is paid only at query time, so a read-heavy worker may be split across as many stores as its access pattern can justify.",
		"Specialised stores are always slower, so a single database wins on latency alone and the argument has nothing to do with pipelines.",
		"Every pipeline between stores is a cost the thesis calls a data movement tax, so the default is to consolidate unless there is cause not to.",
		"The thesis forbids more than one datastore inside an AI-Native company, so four specialised stores is a governance violation outright."
	], 2, "Consolidation is the default because moving data between stores is the recurring bill, not the storage itself."),
	Q("t28", "teammates", "sdd", "Halfway through a build the agent has quietly restructured the module layout and dropped two numbered requirements. Zeeshan wants to restart the session with a stronger model. Hira says that misreads the failure. What is her correction?", [
		"Neither: the requirements belong in the constitution, where they cannot be dropped by a session that has run for several hours.",
		"Neither: the fix is a hook that blocks commits until the module layout matches the spec, which is a check rather than a restart.",
		"Zeeshan: drift of that size is a capability limit, and a stronger model in a fresh session is the only way to recover the layout.",
		"This is agent drift — re-ground to the numbered requirements — and if code has moved without the spec, that is spec drift to fix too."
	], 3, "Two different failures with two different fixes. Restarting loses the re-grounding and leaves the spec behind."),
	Q("t29", "teammates", "sdd", "Talha wants the full Research → Specify → Clarify → Build loop for a one-line copy change in a footer. Noor objects. What does the course's right-sizing rule say?", [
		"Noor: right-size the process — a trivial one-liner can skip the ceremony, while multi-file or architectural work gets the full loop.",
		"Neither: the loop is mandatory for every change, but Clarify may be skipped when the change touches fewer than two files.",
		"Neither: a copy change is a constitution matter rather than a spec matter, so it should be recorded as a durable constraint.",
		"Talha: ceremony is what keeps small changes honest, and a footer string has broken more releases than any architectural decision."
	], 0, "The loop is proportional to the risk of getting it wrong, not to the size of the diff."),
	Q("t30", "teammates", "problem", "Junaid's agent returns a well-written essay describing the migration it would perform, and nothing in the repository has changed. Sana says the brief was wrong rather than the model. What is her reasoning?", [
		"The model needed plan mode, which is the only mode in which an agent is permitted to write files into the repository.",
		"P1: brief the hands. Instructions should call for actions that produce artifacts rather than prose about intentions.",
		"The model needed to be told to be less verbose, which is a P7 fix, since the narration was hiding the absence of any change.",
		"The essay should have been written to explore.md, which would have made it an artifact and satisfied the principle on its own."
	], 1, "An essay is not an artifact. Writing down what you saw is P5; doing the thing is P1."),
	Q("t31", "teammates", "problem", "Rabia is content because the agent narrates every step and she can follow the reasoning. Adil says that is not yet a directed system. Which principle is he invoking, and which failure pattern does it answer?", [
		"P4 decomposition, answering Drift, because a step-by-step narration is the visible symptom of a task that was never broken down.",
		"P3 verification, answering the Big Bang pattern, because a narrated plan that has not been checked is how large failures land.",
		"P7 observability, answering Black Box — though seeing the reasoning is only the start of directing it, and is not a check on output.",
		"P6 constraints, answering Scope Creep, since an agent that narrates everything is usually an agent that has been given no boundary."
	], 2, "Observability answers Black Box. It lets you direct the work; it does not by itself tell you the result is right."),
	Q("t32", "teammates", "openclaw", "Haris installed a skill two days ago and it has never fired. He wants to reinstall OpenClaw from scratch. Eshaal says the diagnosis is cheaper than that. What does she point at?", [
		"The skill must be converted into an MCP tool, because a skill cannot be scheduled and therefore cannot fire on a recurring task.",
		"SOUL.md must name the skill explicitly and the instance must then be reset, since brain files are what the gateway loads at startup.",
		"A skill needs a stronger model before it will activate, so the reinstall would have coincided with a model change and seemed to work.",
		"The description is what makes a skill fire, and the activation sequence ends at configured plus a gateway restart — check both first."
	], 3, "A skill that never fires is nearly always a description or activation problem: exists → disabled → enabled → configured, with the gateway restarted."),
	Q("t33", "teammates", "openclaw", "Zoya wants to attach the family OpenClaw instance directly to a public Discord server so friends can use it. Waleed objects. What is his ground?", [
		"A public channel is a prompt-injection surface, so that instance belongs in the NemoClaw sandbox — container, OpenShell prison, guard.",
		"Discord is unsupported, so only WhatsApp and Telegram may be public; the objection disappears once the server is moved.",
		"The gateway port would have to be exposed to the internet, and the licence forbids exposing the dashboard beyond the loopback address.",
		"Public channels are rate limited, so a 429 response is guaranteed within a day and the instance will stop answering altogether."
	], 0, "The sandbox exists for exactly this case. An unsandboxed instance on a public channel lets strangers steer it."),
	Q("t34", "teammates", "layer", "Saad reports to the steering group that the model question is settled and the architecture is therefore done. Amina says the course calls this a category error and adds a second point about reliability. What are her two points?", [
		"Saad is right: once the model is fixed, the only architecture left is the prompt, and that is a matter of iteration rather than design — the layers beneath the model are plumbing by definition.",
		"The model is a replaceable generator beneath identity, orchestration, governance and capabilities; and since reliability is not 100%, governance and hybrid review are part of the design.",
		"The architecture is the harness, and reliability is a matter of retries; once the control plane re-runs any step that failed, human review becomes redundant rather than merely expensive.",
		"Governance is a legal concern rather than an engineering one, so the steering group is entitled to treat it as out of scope for the architecture and revisit it at the next audit."
	], 1, "Model is not agent is not layer, and agents fail often enough that the layer has to catch it.")
];
var SOLO_A = [
	Q("s1", "solo", "agentic", "You notice the model is sorry, looping on the same patch, naming files that do not exist, and contradicting a constraint from earlier in the same thread. You still need the feature. What is the first action the course wants, before any new design talk?", [
		"Add the forgotten constraint to AGENTS.md and continue, since a rules-file edit is picked up on the next message of the same session.",
		"Write a longer recap of the constraints and resend it, since the model has clearly lost track of what was agreed earlier in the thread.",
		"Stop prompting: /compact if you still want this task, or /clear (or /new) for a clean start — a poisoned window is not repaired by prose.",
		"Switch to a stronger model inside the same thread, because the looping and the invented paths are symptoms of a capability ceiling."
	], 2, "The diagnostic is explicit: stop typing; compact or clear; do not fix poison with more tokens."),
	Q("s2", "solo", "agentic", "You want something that cannot be skipped: block git commit if lint or tests fail. You already have a paragraph in AGENTS.md that says the same thing, and the model still commits red. Which mechanism is missing?", [
		"A reviewer subagent that reads the diff before the commit lands, since isolation from the main thread makes the check harder to ignore.",
		"A sharper line in AGENTS.md, because the model reads the rules file on every message and a firmer phrasing is what was missing.",
		"A skill whose description mentions lint and tests, so the expertise is applied whenever the model judges the task to match.",
		"A hook or plugin on the commit path that returns the failure to the model as its next instruction, forming a loop it cannot skip."
	], 3, "The verification loop is hook/plugin plus a check the model cannot decline."),
	Q("s3", "solo", "agentic", "You keep typing the same “how we write API routes” briefing. It is not a hard gate, but you want it applied when that work comes up, without paying for it on unrelated turns. Where does it go?", [
		"A skill, invoked from its description when the matching work appears, running in the current window rather than on every turn.",
		"A slash command you invoke by hand, because anything you find yourself retyping belongs behind an explicit invocation.",
		"A hook on the file-write path, so the standard is enforced whenever a route file changes rather than remembered by the model.",
		"AGENTS.md, so the briefing is present on every turn and can never be forgotten by a session that starts fresh."
	], 0, "Decision tree: auto expertise on match → skill. Subagent is for isolating heavy work, not for a playbook."),
	Q("s4", "solo", "agentic", "You ask the main session to “find where we compute tax and dump everything you open.” Later the model forgets the plan you approved. Which concept did you violate first?", [
		"Prompt caching: opening dozens of files reset the stable front of the context and cost the session its discount.",
		"Context engineering: heavy reads belong in a subagent that returns a summary, not in the thread holding the plan.",
		"State persistence: the plan should have been written to a file, because chat is volatile and the approval was lost.",
		"Plan mode: the search should have been planned and approved before any file was opened in the main session."
	], 1, "Search dumps are the classic way to poison the main window."),
	Q("s5", "solo", "agentic", "You edited CLAUDE.md in the middle of a long session and the next message suddenly costs far more. The course’s cache note says what?", [
		"The cache is rebuilt at each compaction, so the cost will normalise at the next /compact and no habit needs to change.",
		"Nothing was violated: the cost rose because the rules file is now longer, and longer files cost more on every message.",
		"The discount holds only while the front of the context is stable, and editing the rules file resets that front.",
		"Editing rules mid-session forces a full re-read of the working tree, which is what the next message is being billed for."
	], 2, "Prompt caching is a provider feature keyed on a stable prefix. Rules edits bust it."),
	Q("s6", "solo", "agentic", "Claude Code undoes a bad edit with Esc Esc. A file the agent deleted via a shell command does not come back. Is that a bug relative to the course?", [
		"No, for another reason: deleted files are never recoverable in either tool, so git history is the only rollback that exists.",
		"Yes: the escape sequence should have been Esc Esc twice more, since a second rewind walks back the shell command as well.",
		"Yes: a checkpoint system that cannot restore a deleted file is incomplete, and the course treats that as a known defect.",
		"No: Claude Code's checkpointing covers the model's file edits, not shell side-effects; OpenCode's git-backed /undo is broader."
	], 3, "The course flags this exact difference. Git remains the real history."),
	Q("s7", "solo", "agentic", "You auto-approved every bash on day one, including rm and git push, because watching permissions felt slow. Which arc does the course describe instead?", [
		"Start by asking on every action, widen only for actions that have earned it, and keep a deny list for destructive commands.",
		"Never widen: the course keeps asking on every action indefinitely, since an approval once granted cannot be reasoned about later.",
		"Delegate the decision to the model: let it request escalation for the commands it judges risky, and approve those as they come.",
		"Approve everything on day one and rely on the deny list afterwards, because friction early is what makes people abandon the tool."
	], 0, "Trust is earned session by session. Deny lists stay for rm -rf, publish, push."),
	Q("s8", "solo", "agentic", "A stealth “free” model appears in /models under a codename. You are about to point it at a client repo. What two cautions does the course stack?", [
		"They are rate limited and slow, so a client repo should wait until the model graduates to a named, supported release.",
		"They are temporary and unannounced, and “free” may mean your prompts and code are the payment — so never for confidential work.",
		"They are unsupported by the tooling, so a client repo needs the named model for hooks, permissions and checkpoints to function.",
		"They are always smaller models, so a client repo needs the larger one for planning while the free model may execute the plan."
	], 1, "Stealth models can vanish and may use your data. Use them for throwaway experiments."),
	Q("s9", "solo", "agentic", "You are about to paste a full test run into the chat so the model can “see the failures.” The course’s cost/context habit is?", [
		"Ask a subagent to read the run and summarise it, since a summary of failures is cheaper than the run and easier to act on.",
		"Paste the failures only, trimmed to the failing test names, since a model that cannot see the stack traces cannot fix anything.",
		"Write the output to a file and report one line — path, count, where — because the file sits idle until it is searched.",
		"Raise the context ceiling for the session, because a test run is exactly the kind of content the model is meant to be given."
	], 2, "Huge tool output in the transcript is paid again on every later turn and poisons attention."),
	Q("s10", "solo", "agentic", "You want a second opinion on a diff. The same model that wrote the code is cheapest to use as reviewer. What does Part 8 claim?", [
		"Review is a human task at this stage; the course treats model-on-model review as a substitute for reading the diff yourself.",
		"The same model is fine if it reviews in a fresh session, since a clean context removes the assumptions that produced the error.",
		"The cheapest reviewer is the right reviewer, provided it is given the diff without the conversation that produced it.",
		"The writer shares the blind spots that caused the mistakes, so a different model — ideally a different provider — catches more."
	], 3, "Cross-model review is the point of mixing providers. Same-model review still beats none, but it is weaker."),
	Q("s11", "solo", "agentic", "You run five sessions on the same branch and they fight over files. The isolation pattern in the two-tools chapter is?", [
		"Git worktrees, or equivalent isolated checkouts, so that parallel sessions never share a single dirty working tree.",
		"Subagents inside one session, since a subagent's window is isolated and cannot conflict with the main thread over files.",
		"Sequential sessions with a compaction between each, so the second session inherits the first one's file state cleanly.",
		"One session per branch with a shared working tree, coordinating through the rules file so each knows which files are taken."
	], 0, "Parallelize only with isolation. Cherny’s own workflow is multiple checkouts."),
	Q("s12", "solo", "sdd", "Your “spec” is a list of files to create and a chosen ORM. Build succeeds and still misses a business rule that was only in a Slack paragraph. What was the spec missing, in SDD terms?", [
		"A file map and a chosen stack, which is what stops an agent from inventing an architecture of its own during the build.",
		"Behaviour, edges, and acceptance criteria — the content that would fail the “could this be built wrongly?” test.",
		"A constitution listing the durable constraints, since a business rule from Slack is a principle rather than a requirement.",
		"A Clarify transcript attached to the spec, so the Slack paragraph is preserved as evidence of the original intent."
	], 1, "A file list is not a spec. Unstated business rules are Clarify/Specify failures."),
	Q("s13", "solo", "sdd", "You treat the spec as scaffolding, delete it after merge, and six weeks later change a subject line in code only. Users see a different product than anyone can point to. Name the failure.", [
		"Scope creep — the change grew past what the original request described",
		"Agent drift — the builder deviated from the plan partway through the work",
		"Spec drift — the code changed and the specification was never updated",
		"Constitutional decay — the durable principles outlived their usefulness"
	], 2, "Spec-Anchored practice: behaviour changes update the spec first."),
	Q("s14", "solo", "sdd", "A constitution demands mutation testing, coverage floors, and a four-phase loop for a one-line copy change. What SDD idea did you ignore?", [
		"The failure test, which asks whether a competent builder could satisfy the requirement wrongly if it were left as it is.",
		"Spec-as-Source, where the code is ephemeral and the ceremony around any single change is therefore deliberately heavy.",
		"Spec-Anchored practice, which requires the constitution to be applied uniformly to every change however small it is.",
		"Right-sizing: a trivial one-line change should not carry the full enterprise process built for architectural work."
	], 3, "Match process weight to stakes. Over-strict constitutions are a named failure."),
	Q("s15", "solo", "sdd", "After a green build you skip the design pass because tests passed. Weeks later the file is a tangle of duplicated helpers the agent added “just in case.” What was tests not covering?", [
		"Structural health — coupling, duplication, decay; agents optimise for passing checks, not for a file you want to keep.",
		"Verification independence: the checks were authored by the same agent, so a green build was never evidence of anything.",
		"Observability: nothing recorded why the helpers were added, so the duplication could not be diagnosed until it spread.",
		"Behavioural correctness: the tests passed because they only exercised the paths the agent had itself decided to write."
	], 0, "SDD still requires a human design look. Generated code can be behaviour-correct and structurally bad."),
	Q("s16", "solo", "sdd", "You write requirements so a competent builder could still ship a reset-password flow that leaks whether an email exists. The SDD tightening move is?", [
		"Name the hashing algorithm and the response shape, since an information leak can only be closed by fixing the mechanism.",
		"Add an acceptance criterion that makes the information leak a visible failure, while keeping the HOW out of the spec.",
		"Move the requirement into the constitution, where a durable principle can forbid enumeration without naming a mechanism.",
		"Tighten the Clarify interview until the builder cannot misread the flow, since ambiguity is what allowed the leak through."
	], 1, "If a wrong-but-working build is possible, the spec is too weak. Tighten behaviour, not stack."),
	Q("s17", "solo", "thesis", "You are asked whether the Agent Factory is a product you can buy. The thesis’s answer is?", [
		"No: it is an org chart rather than a product, describing who supervises the AI workers once they have been hired.",
		"Yes: it is licensed per seat, and the thesis describes the pricing model that goes with a mostly-AI workforce.",
		"No: it is a process for manufacturing AI-Native companies and Digital FTEs, using general agents under spec and supervision.",
		"Yes, but only the manufacturing half; the problem-solving mode is a service engagement rather than something you buy."
	], 2, "Factory = process. Company = output. Workers = workforce."),
	Q("s18", "solo", "thesis", "You need a one-off refactor this afternoon, not a standing employee. Which engagement mode is this, and which body of rules governs it?", [
		"Manufacturing, governed by the four-phase spec-driven development loop",
		"Problem-solving, governed by the Seven Invariants of the thesis",
		"Manufacturing, governed by the Seven Invariants of the operating layer",
		"Problem-solving, governed by the Seven Principles of general agents"
	], 3, "Mode 1 = immediate outcome, Seven Principles. Mode 2 = persistent worker, Seven Invariants."),
	Q("s19", "solo", "thesis", "A vendor pitch says their agent can buy compute and pay invoices with no human in the loop. The thesis ties that trajectory to which 2025–2026 protocol cluster?", [
		"ACP, AP2, x402 and MPP — agent-native authorization and micropayments",
		"ISO 20022, SEPA Instant, SWIFT gpi and the card network token vaults",
		"MCP, ACP, Skills and the Agent Client Protocol used by host applications",
		"OAuth 2.1, OpenID Connect, WebAuthn and the FIDO2 attestation chain"
	], 0, "Those four are the named rails for agents as economic actors.")
];
var SOLO_B = [
	Q("s20", "solo", "thesis", "Your company “uses AI” inside the IT ticket queue. A board paper quotes Griggs: confining AI to IT is how you miss the transformation. What relocation does the thesis want?", [
		"Move the ticket queue onto a larger model, since the transformation Griggs describes is a capability change rather than a structural one.",
		"Treat AI as a workforce with specs, records, management and verification — a business change of people and process, not a tool in IT.",
		"Move the queue out of IT and into the business units, so each department owns its own agents and its own model budget going forward.",
		"Replace the queue with an identic agent per employee, since the edge layer is where the thesis says personal delegation belongs."
	], 1, "The PwC thread is not “buy a larger model for helpdesk.”"),
	Q("s21", "solo", "problem", "You watch the agent narrate a beautiful plan and never touch the folder you named. Which principle failed first?", [
		"P6 Constraints — a folder that was never named in the permissions could not be touched even if the agent had tried.",
		"P7 Observability — you could see the plan but not the execution, which is the same failure wearing a different name.",
		"P1 Bash is the Key — you briefed the brain for an essay rather than briefing the hands for an artifact.",
		"P3 Verification — nothing checked the plan against the folder, so the narration went unchallenged until the work was due."
	], 2, "If it only talks, you asked a question. Instruct an action with an output path."),
	Q("s22", "solo", "problem", "You combine explore, plan, and implement in one prompt “to save a round trip.” The tree is half-migrated. Name the pattern.", [
		"Scope creep, from a prompt that named no boundary at all around the table migration",
		"Black Box, from an execution whose individual steps were never surfaced to the human",
		"Drift, from a plan that was never written down where a later session could go and find it",
		"Big Bang, from skipped decomposition and skipped Explore and Plan gates before the work began"
	], 3, "The four-phase loop exists so each gate is reversible. Collapsing it is Big Bang."),
	Q("s23", "solo", "problem", "Yesterday’s decisions are gone because they lived only in chat. You are re-explaining the same constraints. The principle that names this is?", [
		"P5 Persist state in files — chat is volatile, so plans, rules and explore notes belong on disk.",
		"P2 Code as interface — the constraints should have been expressed as a schema the agent could not misread.",
		"P4 Small reversible steps — a decision that cannot be re-derived is a decision that was never decomposed.",
		"P7 Observability — the decisions were made but never surfaced in a form anyone could review afterwards."
	], 0, "Files, not transcripts, are memory. Rules and plan files are P5."),
	Q("s24", "solo", "problem", "The agent edited a folder you never named. Your prompt was broad (“clean this up”) and permissions were wide. Which pairing is the course’s diagnosis?", [
		"Drift + P5, because the folder was named in chat and never written to a file the agent could be held to.",
		"Scope Creep + P6, because a broad prompt plus wide permissions is a boundary problem rather than a model problem.",
		"Confident Wrong + P3, because the agent believed the cleanup was correct and nothing independent checked it.",
		"Big Bang + P4, because one instruction covered more of the tree than a single reversible step should carry."
	], 1, "Unauthorised touch is Scope Creep. Constraints and allow/deny lists are the lever."),
	Q("s25", "solo", "problem", "You cannot tell what the agent actually ran; you only see a final paragraph. In Cowork you ignored the step cards. Which principle?", [
		"P6 Constraints — approving without reading is what turned a wide permission set into an unauditable one.",
		"P3 Verification — a final paragraph is a claim, and nothing in the session checked it against the repository.",
		"P7 Observability — you can only direct what you can see, and the step cards were the only seeing available.",
		"P1 Bash is the Key — the run should have produced an artifact you could inspect rather than a summary of itself."
	], 2, "Terminal traces, Cowork cards, OpenWork timeline — watch the hands."),
	Q("s26", "solo", "problem", "A prose request for a comparison keeps coming back as an inconsistent essay. What does P2 want you to specify first?", [
		"The rubric, so a human can score each comparison against the same criteria instead of judging the prose.",
		"The sources, since an inconsistent comparison is usually a symptom of the agent reading different material each time.",
		"The audience, since an essay that keeps changing tone is an essay whose reader was never named in the request.",
		"The shape: a table or schema with the columns the agent must fill, rather than a paragraph it can arrange freely."
	], 3, "Code/schema as universal interface kills prose ambiguity."),
	Q("s27", "solo", "openclaw", "Gateway is up on 18789 but a new MCP server does nothing. You did not restart after configuring. Which ritual did you skip?", [
		"The activation dance: exists → disabled → enabled → configured, and then a gateway restart before it will run.",
		"The brain-file reload, since MEMORY.md must mention a connector before the gateway will expose it to the model.",
		"The workspace prune, because a bloated workspace is the usual reason a newly added server fails to appear at all.",
		"The credential rotation, since a new MCP server cannot reach its tools until the keys in the credentials store are refreshed."
	], 0, "Extensions load on gateway restart. Silent MCP is a log-and-restart problem."),
	Q("s28", "solo", "openclaw", "Workspace markdown has grown to tens of pages and every WhatsApp reply is slow and expensive. The course’s lean-brain rule is?", [
		"Prune the workspace weekly, because a slow reply is usually a symptom of files accumulating rather than of context size.",
		"Keep brain files short, about a page or two; bloat is a context cost paid on every turn, so length is a running cost.",
		"Move older pages into a separate archive folder, so the gateway can search them on demand instead of loading them always.",
		"Switch the channel to a cheaper model, since WhatsApp replies do not need the same depth as the long-running sessions."
	], 1, "Same context-engineering idea: idle text is a tax."),
	Q("s29", "solo", "openclaw", "Docs in the downloaded AGENTS.md disagree with docs.openclaw.ai/llms.txt. What is the stated source-of-truth order?", [
		"Whichever of the three agrees with the others, since a majority vote across sources is the only safe reading here.",
		"Local file > live docs > log, since a file you have downloaded is the only artifact you can be sure is unchanged.",
		"Live docs > local file > log — the shipped documentation can be older than the release you are actually running.",
		"Log > live docs > local file, since the running gateway is the only source that reflects the version you installed."
	], 2, "The OpenClaw course is explicit: live docs, then the file, then the log."),
	Q("s30", "solo", "openclaw", "You want a reminder every weekday at 09:00 versus a nudge every 30 minutes while you work. Which pair is which?", [
		"Cron is clock time, heartbeat is event triggers, and hooks are the ambient interval.",
		"Cron is clock time, heartbeat is clock time at a finer grain, and hooks are event triggers.",
		"Cron is ambient interval, heartbeat is clock time, and hooks are event triggers.",
		"Cron is clock time, heartbeat is ambient interval, and hooks are event triggers."
	], 3, "Cron / heartbeat / hooks are distinct schedulers."),
	Q("s31", "solo", "openclaw", "Something is broken. The recovery prompt the course wants you to approve is closest to which shape?", [
		"Read the gateway log, explain in plain language, propose a fix you can approve — and no new architecture in the same breath.",
		"Collect the last twenty turns, summarise them into a fresh session, and re-ask the question with the summary attached.",
		"Disable the suspect connector, wait for the next heartbeat, and confirm the symptom has gone before touching anything else.",
		"Restart the gateway and clear the workspace, then re-add the connectors from scratch if the problem still appears."
	], 0, "Log → plain language → approve. Budget overruns mean re-plan, not extra flailing."),
	Q("s32", "solo", "layer", "You need on-device loops for a sensitive matter. The operating-layer invariant this appeals to is?", [
		"The OS recedes as the thing humans click, so sensitive work should run where the user cannot see it happening at all.",
		"Local compute for privacy, latency and sensitive work — the layer is not only a cloud API and need not be one here.",
		"Agents belong inside the OS substrate rather than beside it, which is why an on-device loop is the safer of the two.",
		"The layer is a place to run, not a product, so a sensitive loop should sit in the runtime that has the fewest users."
	], 1, "Local compute is listed as an invariant, not an optional luxury."),
	Q("s33", "solo", "layer", "A knowledge team’s “source of truth” is a rotating chat. Models change quarterly and the method documents vanish. What construct was the course trying to get you to own?", [
		"An evaluation suite: a set of questions the team runs each quarter, so the loss is detected when the model changes.",
		"A prompt pack: reusable requests that survive a model swap because they carry their own context inside the request.",
		"A Knowledge System of Record — sources, policy, methods, provenance and the context that must survive a model swap.",
		"A governance board: named owners for each knowledge domain, so a rotating chat cannot be the only place it lives."
	], 2, "KSOR is the knowledge-work analogue of the transactional system of record."),
	Q("s34", "solo", "layer", "Windows ODR and Agent Launchers, macOS ACP hosting, Linux shell+files: these are examples of what claim?", [
		"Operating systems are becoming containment layers, because the shell, files and launchers are how an agent is bounded.",
		"Operating systems are becoming distribution channels, since launchers and hosting are how agents reach ordinary users.",
		"Operating systems are becoming products again, since discovery and invocation are features a vendor now ships to users.",
		"Operating systems are growing substrates for discovery, invocation and containment while receding as what humans click."
	], 3, "OS as plumbing plus new discovery/containment surfaces."),
	Q("s35", "solo", "layer", "You give an agent send-on-all-mailers with no threshold. It dispatches a wrong customer notice. The governance miss is?", [
		"Over-delegation without permissions, thresholds, audit and reversible actions around a send that could not be taken back.",
		"Missing verification: the notice should have been checked against the customer record before it was queued for sending.",
		"Missing observability: the dispatch was visible in the log, but nobody was assigned to read the log before it went out.",
		"Model failure: a customer notice is high-stakes enough that no current model should have been trusted to draft it."
	], 0, "Governance/audit is a layer, not a vibe. Draft-vs-send is the canonical threshold."),
	Q("s36", "solo", "agentic", "You are choosing between a slash command you always type and a skill you want the model to notice. The decision tree says?", [
		"If it is short enough to type, command; if the instructions are longer than the request that would trigger them, skill.",
		"If you invoke it yourself on purpose, it is a command; if it should apply when the task matches, it is a skill.",
		"If it needs arguments, command; if it needs only a description the model can read, skill, regardless of who triggers it.",
		"If it touches the filesystem, command, because skills run read-only; if it only reasons about the task, then it is a skill."
	], 1, "Manual repeat → command. Auto expertise → skill."),
	Q("s37", "solo", "sdd", "Clarify is running as a dump of twenty questions in one message, several of which smuggle implementation. The course’s interview rule is?", [
		"Ask the twenty questions, then write the answers into the spec so nothing has to be asked twice in a later session.",
		"Skip clarify and go straight to a draft spec, since a wrong assumption is cheaper to correct than twenty questions.",
		"One question at a time and no code at all, until the spec is hard for a reader to misread.",
		"Batch the questions, but keep them to decisions only; implementation detail belongs in the plan, never in clarify."
	], 2, "Cheap, serial disambiguation. Implementation talk belongs in plan, not Clarify."),
	Q("s38", "solo", "thesis", "Cherny’s published workflow is called “vanilla”: short shared rules, plan before non-trivial work, a way for the model to verify, many sessions. A junior on your team is collecting prompt packs instead. Where does the agentic-coding ladder say people stall?", [
		"Below first sessions altogether — the junior has not yet learned to run a task with a model rather than around one.",
		"Between a rules file and the team level, because a shared file is a team artifact and the junior is still writing alone.",
		"Between never explain twice and a team that runs on it — the rules file exists but nobody has made it the team's standard.",
		"Between first sessions and never explain twice: collecting prompts instead of building a rules file as a living system."
	], 3, "The course says most people stall between stages 1 and 2, hoarding prompts."),
	Q("s39", "solo", "thesis", "You have been asked to tell the board whether the company is AI-Native. Which test does the thesis give you?", [
		"Whether the workforce is mostly AI, and the product is whatever that workforce produces for the customers.",
		"Whether the model choice is treated as a business decision rather than a procurement decision made by the IT function.",
		"Whether AI appears in the org chart as a cost centre with named owners, rather than as a vendor line in the IT budget.",
		"Whether the product is built with AI assistance and the roadmap is reviewed by people who understand the model limits."
	], 0, "The definition is about who does the work and what the output is, not about tooling adoption or PR share."),
	Q("s40", "solo", "thesis", "An engagement is being scoped and you must classify it. Which discriminator does the thesis use?", [
		"An engagement that ships software is problem-solving; an engagement that ships an operating capability is manufacturing.",
		"An immediate outcome under the Seven Principles is problem-solving; a persistent AI Worker under the Seven Invariants is manufacturing.",
		"An outcome the client uses once is problem-solving; an outcome the client operates daily is manufacturing, whatever it ships.",
		"An engagement scoped by principles is problem-solving; one scoped by invariants is manufacturing, since invariants persist."
	], 1, "The two modes differ in what they leave behind: a result, or a worker that keeps working."),
	Q("s41", "solo", "thesis", "You need the reskilling figure from the WEF Future of Jobs 2025 report to justify a training budget. Which number does the canon quote?", [
		"59 of every 100 workers will have been displaced by 2030, according to the report as quoted",
		"59 of every 100 workers will need reskilling by 2035, according to the report as quoted",
		"59 of every 100 workers will need reskilling by 2030, according to the report as quoted",
		"59 of every 100 employers will need to reskill staff by 2030, according to the report"
	], 2, "59 in 100 need reskilling by 2030. The 56% figure is the PwC CEO-survey result about AI returning no financial value, and 35% is Cursor's agent-written PR share."),
	Q("s42", "solo", "agentic", "Your session died mid-task. The plan is saved at docs/plans/billing-split.md. What is the sequence the course endorses?", [
		"Run claude --resume or OpenCode /sessions repeatedly until the session returns, since a dead session cannot be replaced.",
		"Re-run the whole plan from step one in a fresh session, since a partial migration cannot be trusted to resume safely anyway.",
		"Start a fresh session, paste the last twenty turns into it, and let the new model reconstruct where the plan had reached.",
		"Try resume first; if it fails, start a fresh session, tell it to read docs/plans/billing-split.md and continue from a named step."
	], 3, "Resume is the convenience; the plan file is the durable contract that survives the conversation."),
	Q("s43", "solo", "agentic", "Your rules file has grown to 200 lines and you keep adding a prohibition after every mistake. What does the course tell you to do with it?", [
		"Add a line when a real mistake happens, prune lines that stop earning their place, and prefer describing the standard over forbidding.",
		"Split it into per-project files so each session loads only the prohibitions that apply to the repository it is working in.",
		"Move the prohibitions into a memory file, so the rules file stays a short statement of the standard rather than a list.",
		"Rewrite it from scratch each quarter, since a rules file that has only ever grown is a record of past mistakes rather than a standard."
	], 0, "A huge rules file is a recurring cost on every message. Anthropic's own pruning of 80%+ of its system prompt is the model to follow."),
	Q("s44", "solo", "agentic", "You need a sweep of 400 files to find every caller of a deprecated helper, and you do not want the transcript buried in matches. What does the course reach for?", [
		"A grep with a count flag, so the transcript records how many matches were found rather than listing every one of them.",
		"A subagent: the heavy reading happens off-thread, so the main chat receives a summary instead of the matches.",
		"A custom command, since a four-hundred-file sweep is exactly the kind of repeated invocation a command is meant to hold.",
		"A separate scratchpad file, so the agent can write matches to disk and the transcript stays free of them while it works."
	], 1, "Isolating heavy reading is what subagents are for. The built-in Explore agent is the cheap read-only case of the same idea."),
	Q("s45", "solo", "agentic", "Every release you type the same four-step instruction to produce release notes, and you always want to trigger it yourself. What does the decision tree prescribe?", [
		"A rules-file entry, because a release procedure is a standard the project holds and should apply to every session.",
		"A skill, because release notes have a recognisable shape and the model should apply them whenever a release is prepared.",
		"A slash or custom command, because this is a repeated manual invocation that you want to trigger yourself every time.",
		"A subagent, because the four steps involve reading the diff and the tickets, which is work that belongs off-thread."
	], 2, "Same thing, repeatedly, by hand: that is a command. Skills are for expertise the model should apply on its own judgment."),
	Q("s46", "solo", "agentic", "You let an agent run a bash migration that altered a table, then used Claude Code's Esc-Esc /rewind to go back. What is true of your database?", [
		"It was rolled back only if the migration ran inside a transaction the shell had opened before the agent took control.",
		"It depends on the driver: a rewind issued from the CLI undoes the shell as well, one issued from the editor does not.",
		"It was rolled back too, since rewind restores the working state the session observed when the migration was run.",
		"It was not: rewind undoes file edits, not bash side effects. OpenCode's /undo is git-backed; neither replaces git."
	], 3, "Checkpoints are not git history, and rewind does not reach the database."),
	Q("s47", "solo", "sdd", "Your spec has a goal, scenarios, functional requirements and acceptance criteria, but no out-of-scope section. What risk does the course attach to that omission?", [
		"Scope creep, and a competent builder satisfying the spec wrongly — out of scope is one of the things a spec is expected to contain.",
		"Rework, because the reviewer has no basis on which to reject an implementation that wanders outside the stated goal.",
		"Estimation drift, since the builder cannot size the work without knowing which adjacent areas it is not being asked to enter.",
		"Ambiguity, because acceptance criteria without an exclusion list can be read as covering more than the author intended."
	], 0, "A spec says what is in and what is out. Without the boundary, both drift and wrong satisfaction become likely."),
	Q("s48", "solo", "sdd", "For three sprints the code has moved and nobody has touched the spec. What is the named failure, and how does it differ from the agent's own mid-build wandering?", [
		"Agent drift — the builder wandered while implementing — as distinct from spec drift, a spec too loose to constrain it.",
		"Spec drift — the code changing without the spec — as distinct from agent drift, which is the agent deviating mid-build.",
		"Stale spec — a document nobody has read since the build began — as distinct from a living spec that is updated as work proceeds.",
		"Silent divergence — code and spec moving apart with no owner — as distinct from the drift a reviewer is expected to catch."
	], 1, "Two names, two directions: the code outrunning the document, and the builder outrunning the plan."),
	Q("s49", "solo", "sdd", "You cite Anthropic's 2026 study of 400,000 agentic sessions in a design review. What conclusion does the course draw from it?", [
		"That most sessions end without a verified artifact, so the budget belongs in verification rather than in generation.",
		"That agents are reliable enough for routine work but not for judgment, so the review step is what the investment should buy.",
		"A what/how split: humans frame the problem, agents execute — so the framing work is the part worth investing in.",
		"That session length is the constraint, so the design work should go into decomposition rather than into the prompt."
	], 2, "The volume is evidence for the division of labour, not for removing the human from the framing."),
	Q("s50", "solo", "problem", "Your agent finishes and reports that the implementation looks right. Nothing else has been run. What does the canon ask for next?", [
		"A second reading of the transcript by the person who asked, to confirm the agent did what the request actually said.",
		"A checkpoint commit before the next step, so the work is recoverable if a later review finds something to disagree with.",
		"A diff review by the agent itself, reading its own changes line by line against the spec it was originally given.",
		"An independent check — tests, a rubric, quote-the-source, or a cross-model review — because \"looks right\" is the failure mode."
	], 3, "P3 is about a check that does not depend on the author's confidence. The writer is the worst reviewer of their own code."),
	Q("s51", "solo", "problem", "You are tempted to hand an agent a six-hour rewrite in one instruction and come back to a finished system. Which principle and which failure pattern does the course pair against that?", [
		"P4 small reversible decomposition — atomic units with git or checkpoints between them — against the Big Bang pattern.",
		"P6 constraints — a wide permission set with no boundary — against the Over-delegation pattern, where the agent outruns you.",
		"P7 observability — a run you cannot see inside — against the Black Box pattern, where approval is given without reading.",
		"P3 verification — nothing independent checks the result — against the Confident Wrong pattern, where the model is sure."
	], 0, "Reversibility is what makes a long build survivable. Big Bang is the named failure when it is missing."),
	Q("s52", "solo", "problem", "Your plan exists only as messages in a chat that you have now lost. Which principle did you skip, and what should have been on disk?", [
		"P2 code as interface — a spec.md should have carried the plan, since prose in chat cannot be enforced by a contract.",
		"P5 persist state in files — plans, rules and explore.md belong on disk, because chat itself is volatile.",
		"P4 small reversible steps — a checkpoint per step would have left a trail of state you could reconstruct the plan from.",
		"P7 observability — the plan should have been written where a later reader could see the reasoning that produced it."
	], 1, "Chat is not storage. Drift is the failure pattern that P5 answers."),
	Q("s53", "solo", "problem", "A non-technical programme manager needs to run agents on real work without a terminal. What does the course recommend, and what carries over?", [
		"A chat channel the manager already has, so no new surface is introduced and no new approval flow has to be learned.",
		"A hosted web agent with an approval inbox, since the browser is the only surface a programme manager already uses daily.",
		"A desktop surface such as Cowork or OpenWork with approval cards — the principles transfer, the surfaces differ.",
		"A guided CLI wrapper with saved presets, since the terminal is still where the agent's real permissions actually live."
	], 2, "Approval cards are the desktop answer to the same P6 problem the shell solves with permissions."),
	Q("s54", "solo", "openclaw", "You edited SOUL.md and IDENTITY.md this morning and the assistant still behaves exactly as it did yesterday. Which listed pitfall have you most likely hit?", [
		"Forgetting to mention the new persona in MEMORY.md, so the model has no reason to behave differently from yesterday.",
		"Editing files outside the workspace the gateway is configured to read, so the instance never sees the change at all.",
		"Editing the brain files without restarting the gateway, so the running process still holds the version it loaded at boot.",
		"Forgetting /reset after brain edits, so the running instance is still carrying the old files rather than the new ones."
	], 3, "Brain edits need /reset. The files are not re-read by a running instance on their own."),
	Q("s55", "solo", "openclaw", "You ask a general agent to install and configure OpenClaw from a folder containing AGENTS.md. Which parts of the job stay with you?", [
		"The human seams — QR pairing and API keys — while the agent handles installation and configuration from the folder.",
		"The verification pass — confirming the install actually works — while the agent handles the folder and the config file.",
		"The rollback plan — knowing how to remove it cleanly — while the agent handles the install and the configuration steps.",
		"The permissions decision — which folders and channels the agent may touch — while the agent handles the install itself."
	], 0, "The split is deliberate: agents do the mechanical work, humans hold the credentials and the device pairing."),
	Q("s56", "solo", "layer", "Your legal team requires that certain sensitive loops never leave the machine. Which invariant of the layer answers that requirement?", [
		"Agents belong inside the OS, and a machine-local loop is the natural home for a sensitive one",
		"Local compute for private and sensitive loops, which is what the layer is for",
		"The OS recedes as what humans click, so a private loop should be invisible to them by design",
		"A layer is a place to run rather than a product, so the runtime choice is a governance decision"
	], 1, "Local compute is the named invariant for private work. Trusted records answer a different question — where authoritative state lives."),
	Q("s57", "solo", "layer", "You cite the Klarna example — an agent handling roughly two thirds of chats, about 700 employees' worth, around $40M of profit impact. What does the layer text use it to show?", [
		"That chat is the easiest domain to automate, and the example is included to show where the layer will land next.",
		"That cost reduction is the honest measure of an agent programme, and the profit figure is the argument to make to a board.",
		"That bounded production work at scale is already real, which is why governance and hybrid review belong in the layer.",
		"That headcount equivalence is the wrong metric, since the agents handled volume that the employees were never assigned to."
	], 2, "The example shows scale, not infallibility. The course pairs it with the point that reliability is not 100%.")
];
var BRUTAL = [
	Q("x1", "brutal", "agentic", "A practitioner, having observed that an exploratory traversal of a three-hundred-file tree has saturated the primary context window, elects to encode the same traversal as a skill whose description guarantees automatic invocation, on the theory that “skills isolate work.” A colleague objects that isolation of token-heavy reconnaissance is the office of a subagent, whereas a skill merely interpolates a playbook into the already-polluted thread. Which distinction is the course’s?", [
		"Both are right in turn: a skill isolates when its description is exact enough, and a subagent isolates when its prompt is narrow enough.",
		"Neither is right: isolation is the office of hooks, which cannot be skipped and therefore cannot leak reconnaissance tokens into the main thread.",
		"The practitioner is right: a skill opens a fresh context window whenever its description matches, so the traversal's reads never touch the main thread.",
		"The colleague is right: a skill interpolates a playbook into the current window, while a subagent reads off-thread and returns only a summary."
	], 3, "Skill = playbook in-thread. Subagent = isolated worker returning a summary. Hooks enforce; they do not isolate search."),
	Q("x2", "brutal", "sdd", "A constitution forbids multi-paragraph comments; a spec, purporting to remain implementation-agnostic, nevertheless stipulates Postgres row-level security and a particular ORM “as acceptance criteria.” A reviewer claims the constitution is the proper home of stack constraints and that the spec has smuggled HOW under the guise of verification. A second reviewer claims acceptance criteria may name any technology if tests will bind it. Which reading is SDD-consistent?", [
		"The first reviewer: the spec states observable behaviour, while stack and comment density belong to the constitution and plan; naming an ORM there is a HOW leak.",
		"Neither reviewer: acceptance criteria and the constitution are one artefact under two names, so the objection dissolves once both are versioned together in the repo.",
		"The second reviewer, with a caveat: technologies may appear in the spec provided the Clarify phase has already interviewed the team about each one of them.",
		"The second reviewer: anything a test can bind is observable behaviour, so naming row-level security among the acceptance criteria is legitimate WHAT."
	], 0, "Acceptance criteria should make behaviour fail visibly. They should not launder a stack decision into the spec."),
	Q("x3", "brutal", "thesis", "An executive proposes that an identic agent, because it “carries the founder’s judgment,” should also be the firm’s accounts-payable Digital FTE, thereby collapsing the edge layer and the workforce layer into a single long-lived chat with payment protocols attached. Which thesis objection is the most precise?", [
		"Identic agents may not touch the payment protocols at all — ACP, AP2, x402 and MPP are reserved for role-based workers — so the proposal fails before any two-layer argument is reached.",
		"The two-layer model separates a personal delegate at the edge from role-based workers running against a system of record; collapsing them makes the founder's chat an ungoverned ledger.",
		"Digital FTEs cannot be economic actors, since only an identic agent carries the delegated authority needed to hold a signed mandate under AP2 or to settle through an x402 handler.",
		"The objection is procedural rather than architectural: an accounts-payable worker needs an approval card and an audit trail, and neither can be presented from inside a personal chat."
	], 1, "Identic ≠ Digital FTE. Payments rails do not license a layer collapse. Records and management still sit under workers."),
	Q("x4", "brutal", "problem", "A session exhibits simultaneously: (i) a plausible legal memo that misquotes a clause, (ii) a single prompt that rewrote twelve files, and (iii) no execution trace beyond the final paragraph. A consultant maps these, respectively, to Confident Wrong, Big Bang, and Black Box, and assigns P3, P4, and P7. A sceptic says all three are “just context rot” and that /compact is the unique remedy. Which mapping holds?", [
		"Neither holds: the Seven Principles govern agents that write code, so a legal memo produced on a desktop surface such as Cowork or OpenWork falls outside their scope entirely.",
		"The sceptic holds: all three are symptoms of one poisoned context, and a single compaction restores the session to a state in which none of them can recur.",
		"The consultant holds: distinct failure patterns answer to distinct principles, and compacting a poisoned chat substitutes for none of citation checks, reversible steps, or a trace.",
		"Both hold in part: the misquotation is properly a P1 failure, because only an artifact produced by the hands — a grep, a diff, a file — can be checked against the source."
	], 2, "Do not flatten every failure into context rot. The five patterns are diagnostic, not synonyms."),
	Q("x5", "brutal", "openclaw", "A public Telegram group is allowed to message an unsandboxed OpenClaw whose workspace includes client secrets and whose MEMORY.md has accreted unvetted “facts” from the channel. A proposer wants a longer SOUL.md instructing the model to ignore injections. A second proposer wants NemoClaw/OpenShell containment, credential hygiene outside the workspace, and a refusal to promote channel text into MEMORY without a human commit. Which is aligned with the course’s threat model?", [
		"Neither proposer: what actually stops an injected instruction is quota enforcement, since a 429 response ends the turn before the model can act on anything the channel supplied.",
		"Both proposers together: tone and containment are defence in depth, and a short heartbeat interval statistically dilutes any single injected instruction before it can be acted upon.",
		"The first proposer: a tone file that names the injection patterns is itself a control plane, because the model reads SOUL.md before it ever reads a message from the channel.",
		"The second proposer: a public channel is an injection surface, so cage the filesystem and egress, keep secrets in the credentials store, and treat MEMORY as committed rather than a channel dump."
	], 3, "SOUL.md is not a security boundary. Sandbox + secrets discipline + deliberate MEMORY commits are."),
	Q("x6", "brutal", "layer", "A platform team declares that because they have selected a single frontier model, they now “are” the AI operating layer, and therefore need neither a knowledge system of record nor an audit trail, the model being “self-governing.” Which pair of invariants have they discarded?", [
		"Replaceability of the model, and governance with trusted records",
		"The first two principles of the problem-solving course, P1 and P2",
		"Plan mode and /compact, the two disciplines of context",
		"The agent authorization and payment rails — ACP, AP2, x402 and MPP"
	], 0, "The layer’s point is that the model is a slot. Records and governance outlive it. Self-governing models are the category error the course names."),
	Q("x7", "brutal", "agentic", "An engineer, citing Uncle Bob’s 2026 remark that he no longer reads agent-written code, disables all review and ships on a single green test file the agent also authored. Cherny’s verification claim and Martin’s actual sequence are being used as a permission slip. What ratio does the course insist on?", [
		"Celebrity practice is evidence enough: if an engineer of that standing no longer reads diffs, a single green test file authored by the agent is a sufficient checker.",
		"Trust is proportional to the checkers you can name: Martin built the constraints first, and Cherny's 2–3× claim assumes a check the model cannot skip.",
		"Hooks become unnecessary once review is removed, because the commit path no longer has a human reader to satisfy and the test file becomes the whole gate.",
		"The sequence is being read backwards: verification follows delivery on the agentic ladder, so shipping on one green file and checking later is the intended order."
	], 1, "The course is explicit: he built the checks first. Confidence is the size of the checkers, not a mood and not a tweet."),
	Q("x8", "brutal", "thesis", "Granted that the identic agent is described as the locus of a single person's identity, judgment and delegated authority, and granted that Digital FTEs are described as role-bearing members of an AI workforce, which reading of the Two-Layer Model does the thesis actually support?", [
		"The model is about model size: the Edge runs small local models while the workforce runs frontier ones, and nothing else separates the two.",
		"The layers are deployment tiers, so an identic agent that has been promoted into a shared channel has thereby become a Digital FTE.",
		"The Edge and the AI Workforce are distinct layers whose contract is the spec; reuse does not make a personal delegate an enterprise role.",
		"The model implies that Digital FTEs subsume identic agents once governance is added, since governance is what the edge layer is said to lack."
	], 2, "The two layers are separated by responsibility, not by hosting. Specs are the contract between a person's delegate and the role-based workforce."),
	Q("x9", "brutal", "agentic", "Although both commands reduce what the model is carrying, and although the transcript still exists in both cases immediately afterwards, the course treats /compact and /clear (or OpenCode /new) as non-interchangeable. On what distinction does that insistence rest?", [
		"/compact reverts the model's file edits across the working tree, whereas /clear only trims the transcript that the model carries.",
		"The distinction is tool-specific rather than conceptual: Claude Code ships both commands and OpenCode ships neither of them.",
		"Only /clear invalidates the prompt cache, which is why the course reserves it for the moment a session has become expensive.",
		"/compact preserves the current task with less clutter, whereas /clear or /new abandons the conversation and starts fresh."
	], 3, "Same task with less clutter versus a clean start. Treating them as aliases is how people wipe a task they meant to keep or keep a thread they meant to kill."),
	Q("x10", "brutal", "agentic", "A team argues that a skill with an exacting description and a hook on the commit path are equivalent guarantees, since neither can be forgotten by a human. Which characterisation of the difference survives the course's account?", [
		"The skill is expertise the model may elect to apply when the task matches; the hook fires whatever the model decides, which is what suits absolutes.",
		"The hook is the cheaper of the two mechanisms, so it should be preferred wherever both would work, with the skill reserved for genuine judgment calls.",
		"The skill runs in an isolated context of its own while the hook runs in the main thread, which is the only difference that matters for token cost.",
		"They are equivalent guarantees: both are configuration the model reads before it acts, and neither depends on a human remembering to invoke it."
	], 0, "Election versus enforcement. A skill is a playbook the model can consult; a hook is a check the model cannot talk its way around."),
	Q("x11", "brutal", "sdd", "It is sometimes proposed that, because the constitution carries the durable principles, constraints and done criteria of a project, it can be relied upon to prevent the failures it names. Which qualification does the course attach to that proposal?", [
		"None: a constitution binds the way a compiler binds, and a line that has been written down cannot subsequently be ignored by the model.",
		"The constitution is not self-enforcing: absolutes need tests or hooks, and each line must earn its place against “if I remove this, will a mistake happen?”",
		"The constitution is unenforceable in principle, which is why the course prefers to keep durable constraints inside the spec where acceptance criteria bind them.",
		"The constitution binds only during the Clarify phase, when no code is being written and the interview is still open; afterwards the spec governs alone."
	], 1, "Principles on a page are not a control. Where a mistake is unacceptable, the check has to run without anyone remembering it."),
	Q("x12", "brutal", "problem", "An agent's transcript is fully visible, each step logged, and the human can follow every decision; the output is nonetheless wrong, and nothing in the transcript would have revealed that. Which principle was satisfied, and which was not?", [
		"Neither was satisfied: a transcript records what was said rather than what was done, so it is not the execution trace P7 asks for either.",
		"Both were satisfied, and the failure belongs to P4: the task was too large to be reversible, which is why the wrongness went unnoticed.",
		"P7 was satisfied and P3 was not: seeing every step the agent took is not the same thing as an independent check that the result is correct.",
		"P3 was satisfied and P7 was not, because a log of decisions is not observability in the sense the principle requires of a directed system."
	], 2, "Observability tells you what happened. Verification is an independent check — tests, rubric, quote-the-source, cross-model review — and confident wrongness is its failure pattern."),
	Q("x13", "brutal", "openclaw", "A connector has been added, the gateway reports no error, and the capability it was added for never appears in the assistant's behaviour. Which diagnostic ordering does the course recommend before anything is reinstalled?", [
		"Edit SOUL.md so the assistant is told explicitly about the new tool, then /reset, since brain files are read before any connector is invoked.",
		"Replace the skill with an MCP tool of the same name, because a skill that does not fire is always a description problem rather than a wiring one.",
		"Reinstall OpenClaw and re-run onboarding with --install-daemon, since a connector that reports no error and does nothing is a broken install.",
		"Read the gateway log, because MCP tools can fail silently, and only then change configuration; a skill that never fires is a different fault."
	], 3, "Silent MCP failure is a named pitfall and the gateway log is the named source of truth. Skills and MCP tools are different mechanisms with different failure modes."),
	Q("x14", "brutal", "layer", "The stack places the reasoning model below the agent and the harness, and describes the harness as a control plane rather than a compute or sandbox plane. Which inference does that placement license?", [
		"That the model can be swapped without redoing identity and context, orchestration, governance, capabilities or trusted records.",
		"That the harness executes whatever the model declines to do, which is why it sits above the agent rather than beside it in the stack.",
		"That the model is the architecture after all, since everything drawn beneath it in the stack is plumbing that the model may ignore.",
		"That governance becomes optional once the harness enforces approvals, because the control plane has then absorbed the audit trail."
	], 0, "Replaceability is the point of the separation: model is not agent is not layer. Treating the model as the architecture is the category error the course names.")
];
var ALL = [
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
/**
* Orders a shuffled pool so questions the candidate has already sat go last.
* The pool still yields repeats when it has to — a full paper matters more than
* a fresh one — but a repeat only appears after every unseen question is used.
*/
function preferFresh(pool, avoid) {
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
function pickBankSitting(courses, avoid = []) {
	const allow = new Set(courses);
	const seen = new Set(avoid);
	const out = [];
	Object.keys(MIX).forEach((kind) => {
		const need = MIX[kind];
		const taken = preferFresh(shuffleCopy(BY_KIND[kind].filter((q) => allow.has(q.course))), seen).slice(0, need);
		if (taken.length === need) {
			out.push(...taken);
			return;
		}
		const elsewhere = preferFresh(shuffleCopy(BY_KIND[kind].filter((q) => !allow.has(q.course))), seen);
		out.push(...taken, ...elsewhere.slice(0, need - taken.length));
	});
	return out.map(shuffleQuestion);
}
function fillKind(kind, have, need, courses, avoid = []) {
	if (have.length >= need) return have.slice(0, need);
	const allow = new Set(courses);
	const seen = new Set(avoid);
	const used = new Set(have.map((q) => q.id));
	const pool = preferFresh(shuffleCopy(BY_KIND[kind].filter((q) => allow.has(q.course) && !used.has(q.id))), seen);
	const extra = preferFresh(shuffleCopy(BY_KIND[kind].filter((q) => !used.has(q.id))), seen);
	return [
		...have,
		...pool,
		...extra
	].slice(0, need).map(shuffleQuestion);
}
/** Questions the prepared bank holds per course, keyed by course id. */
function bankCoverageByCourse() {
	const counts = Object.fromEntries(COURSE_IDS.map((id) => [id, 0]));
	for (const q of ALL) counts[q.course] += 1;
	return counts;
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
var inputSchema = object({
	courses: array(courseSchema).min(1),
	/**
	* Question ids the candidate sat last time. They go to the back of the queue
	* rather than being excluded, so a full paper is always possible.
	*/
	avoid: array(string()).max(500).optional()
});
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
async function generateKind(kind, count, courses, avoid) {
	const maxTokens = Math.min(16e3, 900 + count * 520);
	try {
		return fillKind(kind, parseBatch(await completeJson(kindPrompt(kind, count, courses), maxTokens), kind), count, courses, avoid);
	} catch {
		return fillKind(kind, [], count, courses, avoid);
	}
}
var generateSitting_createServerFn_handler = createServerRpc({
	id: "9a33745239df4986cb279c320da2e94478ac561455556e58b07291d6b77d502f",
	name: "generateSitting",
	filename: "src/lib/quiz/generate.ts"
}, (opts) => generateSitting.__executeServer(opts));
var generateSitting = createServerFn({ method: "POST" }).validator((input) => inputSchema.parse(input)).handler(generateSitting_createServerFn_handler, async ({ data }) => {
	const courses = data.courses;
	const avoid = data.avoid ?? [];
	const modelAvailable = Boolean(process.env.XAI_API_KEY);
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
	const questions = prepareSittingQuestions((await Promise.all(chunks.map((c) => generateKind(c.kind, c.count, courses, avoid)))).flat());
	if (questions.length !== TOTAL_QUESTIONS) return {
		ok: false,
		error: "Could not assemble a full sitting.",
		modelAvailable,
		generatedCount: 0
	};
	const generatedCount = questions.filter((q) => q.id.startsWith("g-")).length;
	return {
		ok: true,
		source: generatedCount >= 40 ? "generated" : "bank",
		modelAvailable,
		generatedCount,
		questions
	};
});
var bankSitting_createServerFn_handler = createServerRpc({
	id: "4756143a09db6e2f520dae6b690ba2f0fa916138bce6c96e2d90718dce762ae1",
	name: "bankSitting",
	filename: "src/lib/quiz/generate.ts"
}, (opts) => bankSitting.__executeServer(opts));
var bankSitting = createServerFn({ method: "POST" }).validator((input) => inputSchema.parse(input)).handler(bankSitting_createServerFn_handler, async ({ data }) => {
	const { pickBankSitting } = await import("./bank-BdenLeZD.mjs");
	return {
		ok: true,
		source: "bank",
		questions: prepareSittingQuestions(pickBankSitting(data.courses, data.avoid ?? []))
	};
});
var bankCoverage_createServerFn_handler = createServerRpc({
	id: "e82b6de5a0dd4d15a23f67e2674901da102643fb485d14ea5ed911e3d269d02f",
	name: "bankCoverage",
	filename: "src/lib/quiz/generate.ts"
}, (opts) => bankCoverage.__executeServer(opts));
var bankCoverage = createServerFn({ method: "GET" }).handler(bankCoverage_createServerFn_handler, async () => {
	const { bankCoverageByCourse } = await import("./bank-BdenLeZD.mjs");
	return bankCoverageByCourse();
});
//#endregion
export { bankCoverage_createServerFn_handler, bankSitting_createServerFn_handler, generateSitting_createServerFn_handler, fillKind as n, pickBankSitting as r, bankCoverageByCourse as t };
