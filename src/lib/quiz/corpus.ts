/** Distilled canon used as generator context. Keep factual; no invented APIs. */
export const CORPUS = `
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
