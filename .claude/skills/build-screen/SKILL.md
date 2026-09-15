---
name: build-screen
description: "Build or edit any screen in the Knowunity voice active-recall prototype. Use whenever a task involves creating, completing, restyling or fixing a screen or a screen state in knowunity-app — the term prompt, recording, review audio, processing, feedback, reveal, success, XP, exit confirmation, main screen, or anything else listed in knowunity-sprint/SPEC.md. Also use when adding a missing state to a screen that already exists, or when the request is phrased as 'build screen N', 'do the next screen', 'add the fail state', or names a Figma frame from the Knowie DS file."
metadata:
  category: prototyping
  project: knowunity-voice-recall
---

# Building a screen in this prototype

This is a 390px, dark-mode, iOS-shaped web app. Voice in, text out. The recall is
mocked. One screen at a time, and each one has to work before the next starts.

Two facts shape everything below:

- **The Figma library was mostly never built in code.** Storybook has 16
  components. The Figma file has far more, and the Main Flow frames are
  hand-built from raw frames that predate the library. Storybook is the only
  place to look for something to reuse.
- **Some screens have a Figma frame and some do not.** Which one you are holding
  changes what you do at the start and what you report at the end.

## Paths

| What | Where |
|---|---|
| Screen list, states, components, verification | `knowunity-sprint/SPEC.md` |
| Committed decisions, the ones that win | `knowunity-sprint/knowledge/sprint-context.md` |
| Flow structure and Figma node IDs | `knowunity-sprint/knowledge/active-recall-user-flow.md` |
| Token usage rules | `knowunity-sprint/knowledge/design-system.md` |
| Canvas, touch, spacing, a11y | `knowunity-sprint/knowledge/platform-constraints.md` |
| Why the feature exists, what success means | `knowunity-sprint/knowledge/design-brief.md` |
| Voice state checklist, latency, failure paths | `knowunity-sprint/knowledge/voice-ux.md` |
| Generated CSS custom properties | `knowunity-app/styles/tokens.css` |
| Built components | `knowunity-app/components/` |
| Screens | `knowunity-app/app/recall/screens/` |
| Running list of things Storybook was missing | `knowunity-app/component-gaps.md` |

Figma file key: `Vs1b7gPbJWdEnjaQHdXP4a`. Main Flow section: `13615:12203`.

## Method

### 1. Read SPEC.md for this screen

Its states, its components, its Figma node if it has one. **Build every state
listed, including the failure ones.** A screen with three states and two built is
not done. Where SPEC.md and `sprint-context.md` disagree, `sprint-context.md`
wins.

### 2. Find out whether the screen has a Figma frame

The Figma index table in SPEC.md says. Six screens have no frame.

If it has one, render it and look at it:

```
mcp__figma__get_screenshot  fileKey Vs1b7gPbJWdEnjaQHdXP4a  nodeId <node>
```

Read the picture, not the layer names. The frames are hand-built: bubbles are
auto-named frames rather than `Message Bubble` instances, topic rows are local
frames rather than `Topic Promo` instances, and some buttons are local frames
while others are real instances. A frame's layer list will send you to the wrong
component. `get_metadata` is still useful for geometry.

Watch for the two traps already found: `Navbar` means the app's bottom nav on the
Main Screen (358×73) and the iOS home indicator on every loop frame (358×34), and
the loop frames carry no app navigation at all because the loop is a full-screen
takeover.

### 3. Query Storybook for every component you will touch

```
mcp__storybook__docs-list                    once, to see what exists
mcp__storybook__docs-show  id: components-x  for each component you use
```

**Never assume a prop.** Not `className`, not `size`, not `disabled`. If a prop
is not in the docs or shown in a story, it does not exist. Several components in
this library deliberately have narrower APIs than you would guess: `TopicPromo`
takes only `topic`, `state` and `onClick`, and `AudioPlayback` takes only
`isPlaying` and `onToggle`.

When a component lacks the prop you need, do not add one and do not hand-roll a
copy. Work around it from the screen, the way `TopicSelection.module.css` tints
row icons with `nth-child` because `TopicPromo` has no accent prop.

### 4. Compose from Storybook

Storybook is the only source of reusable parts. Do not port a Figma component
into code as part of building a screen, and do not copy another screen's markup
into a new file.

Each screen renders its own `Scaffold` with three slots: `chrome` for
edge-to-edge `StatusBar` and `RecallHeader`, `children` for padded content,
`footer` for the thumb-zone action. Follow `app/recall/screens/Intro.tsx`.

### 5. When something is not in Storybook

Build it inside the screen, from tokens, and add one line to
`knowunity-app/component-gaps.md`: what it was, and which screen needed it. Then
keep going. **Do not stop to ask.**

**Unless that same thing is already on the list from another screen.** Second
time it is needed, it is a component: build it in `knowunity-app/components/`
with a story in `knowunity-app/stories/components/`, use it here, and mark the
line resolved. Two screens hand-rolling the same thing is how a design system
rots.

### 6. Every value from the generated tokens

No raw hex. No raw px. No `var(--token, #fallback)` — fallbacks are banned
outright by `design-system.md`.

- Semantic tokens only. If you reach for a primitive, you skipped a layer.
- Pair background tokens with their `on` token. `interactive.primary` goes with
  `interactive.onPrimary`, never `text.primary`.
- Typography comes as a set. Use all five of
  `--typography-body-m-regular-{family,size,weight,line-height,letter-spacing}`,
  not a size from one level and a weight from another.
- Verify the custom property exists in `styles/tokens.css` before using it. Names
  are kebab-cased from the JSON, so `background.page` is `--background-page`.
- If the token you need does not exist, say so rather than inventing one. There is
  no amber accent, and no `interactive.tertiary`.

`styles/tokens.css` is generated. Never hand-edit it; edit
`knowunity-sprint/tokens/tokens.json` and run `npm run tokens`.

### 7. Mobile only

390px, dark mode, nothing else. No light mode, no breakpoints, no desktop.
`Scaffold` owns the canvas width, the safe areas and the 16px margins, so do not
re-implement them in a screen. Nothing may break at 320px.

Touch targets are 44px minimum and there is no hover. Primary actions sit low, in
the thumb zone.

### 8. Give the screen a URL

Add its state to `app/recall/state.ts` so `/recall?state=<name>` reaches it
directly. This is what makes SPEC.md's verification runnable without playing
through a ten-term session by hand.

## Before you call it done

1. `npm run build` exits 0. A passing build does not prove the page renders:
   client/server boundary mistakes only surface at runtime, so load the route.
2. `npx vitest run --project=storybook` passes. Run the whole suite when you
   changed anything shared, since `globals.css` and `preview.tsx` affect every
   story. Use this rather than the Storybook MCP test runner if that runner
   reports a run already in flight.
3. Load every state's URL and look at it at 390px. Screenshot with Playwright
   from the `knowunity-app` directory, since Playwright is not resolvable from
   `/tmp`.
4. `grep -rnE '#[0-9a-fA-F]{3,8}' app/ --include='*.css' --include='*.tsx'`
   returns only the documented `themeColor` in `app/layout.tsx`.
5. Processing and other waits carry a real 2.5s delay. A state that resolves
   instantly has not been designed.
6. Motion carries system status here, so with `prefers-reduced-motion` the state
   must still read as live rather than frozen. Reduce, do not remove.

## What to report

Always: which states you built, which URLs reach them, and any line you added to
`component-gaps.md`.

**If the screen had a Figma frame:** list every difference between what you built
and that frame. Spacing, type step, colour, copy, component substitutions, things
you could not match. Do not summarise it as "matches Figma" — the differences are
the useful part, and some of them will be Figma needing to change rather than the
code.

**If it did not:** say what you had to decide that was written down nowhere.
Copy, timing, what a control does when the data is missing, where a state returns
to. Those become decisions for `sprint-context.md`, and they are invisible unless
you name them.
