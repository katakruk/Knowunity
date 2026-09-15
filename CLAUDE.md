# Knowunity workspace

This folder holds two **separate projects**, each its own Git repo. They are not
a monorepo; there is no Git repo at this top level. This file is the single
source of truth for how to work across both.

## How to work with me

Be succinct. Comprehensive, but not too verbose. Add a tldr or exec summary
after long passages of text.

**Never:**

- No em dashes in writing.
- Don't invent constraints. Reference the brief and platform constraints when critiquing.
- Don't repeat what's in other files. Point to the file.
- Don't fill gaps with guesses. Say you don't know.
- Don't add edge cases for completeness. Add them when they matter to the core experience.

## The two projects

- **`knowunity-sprint/`** is the design workspace and design-system source of
  truth. The voice active-recall sprint lives here. See the hard rules and file
  map below before doing design work.
- **`knowunity-app/`** is the Next.js product. Read `knowunity-app/CLAUDE.md`
  (which imports `AGENTS.md`) before writing app code; it is a customized
  Next.js and the rules matter.

## Which folder to open

- Design / tokens / prototyping work → open `knowunity-sprint`.
- App / code work → open `knowunity-app`.
- Need both at once → open this folder (`Knowunity/`).

## Design tokens (shared between both projects)

`knowunity-sprint/tokens/tokens.json` is the **single source of truth** for
design tokens (DTCG format). Edit tokens only there.

- **Figma** reads that file directly (DTCG is Figma's token format).
- **The app** builds CSS from it: in `knowunity-app`, `npm run tokens` reads
  `../knowunity-sprint/tokens/tokens.json` and generates
  `knowunity-app/styles/tokens.css`, which is committed and imported by
  `app/globals.css`. Never hand-edit `styles/tokens.css`.
- Use semantic tokens only, never primitives directly.

---

# Voice Active Recall sprint (`knowunity-sprint/`)

Voice active-recall feature for Knowunity. Student speaks to explain a term,
Knowie judges and responds in text. 2.5-week sprint testing 25% activation and
70% completion with a working prototype.

## Hard rules

Read `knowunity-sprint/knowledge/sprint-context.md` for committed decisions.

Voice in, text out. Knowie never speaks.

Push-to-talk with explicit send. No auto-detection of when someone finishes speaking.

Never trap the student. Every required action has a way out.

Judge generously.

Mobile iOS only, 390px wide, dark mode.

All recall (transcription, judging) is mocked. Put real delay in processing
states and design what fills them.

Use the design system (`knowunity-sprint/knowledge/design-system.md`
and `knowunity-sprint/tokens/tokens.json`).

No type-instead option.

## File map

The sprint knowledge base and reference screenshots are plain folders at the
sprint repo root: `knowunity-sprint/knowledge/` and
`knowunity-sprint/references/`. All paths below are relative to
`knowunity-sprint/`.

**Read these first on any new task:**

- `knowledge/sprint-context.md` — committed concept and every logged decision
- `knowledge/design-brief.md` — the problem, the bet, success metrics, hard constraints, what's open to design, constraints and rules that govern every state

**Read when designing specific aspects:**

- `knowledge/voice-ux.md` — voice interaction principles, state checklist, permission patterns, latency design (read before designing recall loop)
- `knowledge/platform-constraints.md` — iOS canvas rules, touch targets, safe areas, spacing scale, accessibility, what's mocked vs real
- `knowledge/active-recall-user-flow.md` — complete flow breakdown with entry points, loop states, edge cases
- `knowledge/design-system.md` — token usage rules, color patterns, component structure, what to avoid
- `tokens/tokens.json` — all design token values (the shared source of truth described above)
- `knowledge/about-knowunity.md` — company background, existing features, business model, user context
- `knowledge/app-inventory.md` — current app screens annotated with what students can do
- `knowledge/sprint-kickoff-transcript.md` — full kickoff meeting with original thinking

**Reference screenshots:**

- `references/` — 13 PNG screenshots of the real Knowunity app (see `references/index.md` for what each shows)

**Skills (in `.claude/skills/` at this workspace root, invoke when building):**

- `prototyping` — high-fidelity interactive React prototypes, gestures, animations, app-like feel
- `ux-motion` — motion design implementation, transitions, micro-interactions, timing
- `ui-designer` — visual craft, pixel-perfect styling, design system application
- `ux-designer` — user flows, psychology, experience strategy, edge case handling

---

# App (`knowunity-app/`)

Read `knowunity-app/CLAUDE.md` and the `AGENTS.md` it imports before writing
code. Next.js here is a customized build, so verify APIs against
`node_modules/next/dist/docs/` rather than memory.

When working on UI, use the Storybook tools to read the component library before
answering or writing anything. Never assume a component prop exists. Query the
documentation, and use only props that are documented or shown in a story. If a
prop isn't there, stop and ask.
