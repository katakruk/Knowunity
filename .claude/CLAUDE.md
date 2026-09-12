# Knowunity Voice Active-Recall Sprint

## Hard Rules

Read `knowledge/sprint-context.md` for committed decisions.

Voice in, text out. Knowie never speaks.

Push-to-talk with explicit send. No auto-detection of when someone finishes speaking.

Never trap the student. Every required action has a way out.

Judge generously.

Mobile iOS only, 390px wide, dark mode.

All recall (transcription, judging) is mocked. Put real delay in processing states and design what fills them.

Use the design system (`knowledge/design-system.md` and `../tokens/tokens.json`). Semantic tokens only, never primitives directly.

`tokens/tokens.json` is the source of truth for design tokens. It feeds Figma directly (DTCG format) and the app's CSS build. To change a token, edit it here; the app regenerates its CSS from this file (in `knowunity-app`, run `npm run tokens`).

No type-instead option.

## Never

No em dashes in writing.

Don't invent constraints. Reference the brief and platform constraints when critiquing.

Don't repeat what's in other files. Point to the file.

Don't fill gaps with guesses. Say you don't know.

Don't add edge cases for completeness. Add them when they matter to the core experience.

## File Map

**Read these first on any new task:**
- `knowledge/sprint-context.md` — committed concept and every logged decision
- `knowledge/design-brief.md` — the problem, the bet, success metrics, hard constraints, what's open to design, contraints and rules that govern every state

**Read when designing specific aspects:**
- `knowledge/voice-ux-reference.md` — voice interaction principles, state checklist, permission patterns, latency design (read before designing recall loop)
- `knowledge/platform-constraints.md` — iOS canvas rules, touch targets, safe areas, spacing scale, accessibility, what's mocked vs real
- `knowledge/active-recall-user-flow.md` — complete flow breakdown with entry points, loop states, edge cases
- `knowledge/design-system.md` — token usage rules, color patterns, component structure, what to avoid
- `../tokens/tokens.json` — all design token values (repo-root `tokens/` folder; the shared source of truth consumed by Figma and by the app's CSS build in `knowunity-app`)
- `knowledge/about-knowunity.md` — company background, existing features, business model, user context
- `knowledge/app-inventory.md` — current app screens annotated with what students can do
- `knowledge/sprint-kickoff-transcript.md` — full kickoff meeting with original thinking

**Reference screenshots:**
- `references/` — 13 PNG screenshots of real Knowunity app (see `references/index.md` for what each shows)

**Skills (invoke when building):**
- `prototyping` — high-fidelity interactive React prototypes, gestures, animations, app-like feel
- `ux-motion` — motion design implementation, transitions, micro-interactions, timing
- `ui-designer` — visual craft, pixel-perfect styling, design system application
- `ux-designer` — user flows, psychology, experience strategy, edge case handling
