# Build Spec: Voice Active Recall Prototype

## What we're building

A student picks a topic, explains 5 to 10 terms from it out loud, and Knowie judges each
explanation in text: pass, partial, or fail, with one hint before it reveals the answer.

An iOS-shaped web app at 390px, dark mode only, where the recall itself is mocked and the
experience is the whole deliverable.

---

## How to read this

Decisions live in `knowunity-sprint/knowledge/sprint-context.md`. Flow structure and Figma
node IDs live in `knowunity-sprint/knowledge/active-recall-user-flow.md`. This file is the
build order and the component mapping. Where they disagree, `sprint-context.md` wins.

Components are the built ones in `knowunity-app/components/`, documented in Storybook. Import
them through the `@/*` alias, e.g. `import { RecallHeader } from '@/components/RecallHeader'`.
Storybook's docs render the import as `from 'knowunity-app'`, which is the package name, not a
resolvable path: there is no barrel export and no `exports` field in `package.json`.

Props named below are real props from those docs. Every component named in this file was
checked against both Storybook and `knowunity-app/components/` on 2026-09-14: all 14 exist.
Anything marked **NEW** does not exist yet and has to be built.

`StatusBar` sits above every screen in the list, in-loop and out. It is fake iOS chrome.

---

## Screen list, in build order

Easiest first. Each screen is buildable and reviewable on its own before the next.

Every state gets its own URL, via a route plus a `?state=` override, e.g.
`/recall?state=processing`. This is a build requirement, not a nicety: it is what makes the
verification section below runnable without playing through the whole session by hand.

### 0. Device shell

Build this before any screen. It is deliberately almost nothing, because it is where you find
out whether the pieces fit, and that discovery should cost an hour rather than a day.

**Why it comes first:** `knowunity-app/app/page.tsx` is still the Next.js starter template, so
nothing has ever been rendered at 390px in this repo. `knowledge/platform-constraints.md`
refers to a `scaffold` component in the design system, but there is no `Scaffold`, frame or
shell component in `knowunity-app/components/`. That gap is unproven until something renders
inside it.

**States:** one.

**Components:** `StatusBar`, plus one `MessageBubble` and one `Button` placed as throwaway
smoke-test content.

**What it proves, and what to fix if it doesn't:**

- `styles/tokens.css` is imported by `app/globals.css` and semantic tokens actually resolve.
- 390px wide, dark mode, with `env(safe-area-inset-top)` and `env(safe-area-inset-bottom)`
  honoured under `viewport-fit=cover`. Content clears the status bar and the home indicator.
- Inter Variable loads, is subset and preloaded, and nothing reflows on first paint.
- Two components from the library sit next to each other without fighting over spacing.

Delete the smoke-test content once screen 1 exists. Keep the shell.

---

### 1. First-run education

**States:** one.

**Components:** `StatusBar`, `Mascot` (`mood="standby"`, `size="L"`), `MessageBubble`
(`variant="default"`), `Button` (`variant="Primary"`, `size="L"`).

**Student can:** read and tap continue. Nothing else, no skip control. Shown once ever.

Not the mic primer. See screen 6.

---

### 2. Mic denied

**States:** one.

**Components:** `StatusBar`, `Mascot`, `MessageBubble`, two `Button`s: `variant="Primary"`
for the Settings route and `variant="Secondary"` for the way out to Quiz or Flashcards.

**Student can:** read what the mic is for and how to enable it in iOS Settings, or leave for
another tool. No text fallback exists, by design, so this screen does not offer one.

---

### 3. Topic selection

**States:** two. Nothing selected, "Let's go!" `state="Disabled"`. One row selected,
"Let's go!" `state="Default"`.

**Components:** `StatusBar`, `RecallHeader` (`progress={0}`), `Mascot`, `MessageBubble`,
a list of `TopicPromo` (`state="Selected" | "Unselected"`), `Button`.

**Student can:** pick exactly one topic, change the pick, tap "Let's go!". No free-text
entry. `TopicPromo` renders as `role="radio"`, so the list needs a wrapper with
`role="radiogroup"` and an accessible name.

Progress sits at zero here because term count is not known until the topic is chosen. Every
topic is startable, and all of them come from the same subject as the fully written one.

---

### 4. Prompt (idle)

**States:** one per cycle instance, differing only in content: first attempt, try again, and
hint (which adds the hint text to the prompt).

**Components:** `StatusBar`, `RecallHeader` (`progress`, `xp`, `onClose`), `Mascot`,
`MessageBubble`, `CircularButton` (`size="L"`, `icon="Mic"`, `label` required).

**Student can:** read the term, start recording, or close out via `onClose`, which raises the
exit confirmation. Skip lives here too and goes to the reveal.

---

### 5. Recording, review audio, processing

Three states of one screen, because the recording control is a single element that morphs in
place rather than three separate controls. Build them together.

**Recording:** `RecordingTimer` (`isRecording`, `time`), `CircularButton` (`size="L"`,
`icon="Pause"`) to stop.

**Review audio:** `AudioPlayback` (`isPlaying`, `onToggle`), plus three `CircularButton`s:
delete (`size="S"`, `icon="Delete"`), send (`size="L"`, `icon="Send"`), resume
(`size="S"`, `icon="Mic"`). Resume returns to recording and comes back with the longer clip.

**Processing:** `ProcessingAnimation`, with `AudioPlayback` still present.

**Student can:** speak, stop, play back, delete and start over, resume onto the same take, or
send. Send is never disabled. Nothing is submitted without an explicit tap.

---

### 6. Mic primer

**States:** one. Sits between topic commit and the first prompt, first session only.

**Components:** `StatusBar`, `Mascot`, `MessageBubble`, `Button`.

**Student can:** tap to trigger the OS permission dialog. Allow goes to screen 4, deny goes
to screen 2.

The first-run screen is two screens earlier and cannot prime this. A request that appears
unannounced is the one that gets denied.

---

### 7. Feedback: pass

**States:** one, with content differing for an unaided pass versus a hinted or retried one.

**Components:** `StatusBar`, `RecallHeader`, `Mascot` (`mood="excited"`), `MessageBubble`
(`variant="success"`, with `heading`), `Button`.

**Student can:** read what they got right, tap to continue. Always an explicit tap, never an
auto-advance.

This is the payoff moment. After one to three of these the student should feel they can
explain the topic.

---

### 8. Feedback: partial and fail

**States:** two. Partial and fail differ in copy, not in structure.

**Components:** `StatusBar`, `RecallHeader`, `Mascot`, `MessageBubble` (`variant="almost"`
with `heading`), two `Button`s: "See hint" and "Try again".

**Student can:** take the hint, or retry unaided. Both remain available: the ladder is
attempt-count based, so picking "Try again" first does not forfeit the hint. Two attempts per
term, three recordings maximum.

`MessageBubble` has no error variant, and that is deliberate. A fail reads from its copy, not
from a red treatment. Do not add one. See `knowledge/design-system.md`.

---

### 9. Didn't catch that

**States:** one. Reached when a clip is under about a second.

**Components:** `StatusBar`, `RecallHeader`, `Mascot`, `MessageBubble` (`variant="default"`),
`CircularButton` (`size="L"`, `icon="Mic"`).

**Student can:** record again. Does not count as an attempt, does not consume the hint, does
not move the progress bar. Reached through the normal 2.5s processing wait, not instantly.

---

### 10. Reveal

**States:** one, reached from a second miss or from skip.

**Components:** `StatusBar`, `RecallHeader`, `Mascot`, `MessageBubble`, `Button`, plus a
saved-for-review confirmation (**NEW**, small).

**Student can:** read the full answer and continue. Framed as normal, not as failure. The
screen confirms the term is on the review list, so the summary's list is visibly earned
rather than appearing from nowhere.

---

### 11. Exit confirmation

**States:** one.

**Components:** `Button` ×2, on a modal surface (**NEW**: no dialog or sheet component exists
in the library). Use `background.floating` for the surface and `background.scrim` behind it.

**Student can:** leave or stay. Copy states that progress saves. Resume restores the exact
state: unlocked hint, attempts used, feedback being read.

An unsent recording is discarded and the dialog does not promise otherwise. The student never
sent it, so keeping or auto-sending it would act against their intent.

---

### 12. Success screen

**States:** three headline variants, one shared breakdown.

- Mixed session: leads with the terms that moved from missed to explained.
- Clean run, everything unaided first try: "all N, unaided, first try."
- Nothing unaided: claims the attempt, having worked the whole topic out loud, with the
  review list as the substance.

**Components:** `StatusBar`, `Mascot` (`mood="excited"`), `MessageBubble`, `Button`
(`variant="Primary"` continue, `variant="Secondary"` try again), plus a stats breakdown and a
review list (**NEW**, both).

**Student can:** read the claim and the breakdown (X unaided, Y hinted, Z revealed, with
skipped counting as revealed), open the review list, continue, or tap "Try again", which
replays only the terms that needed help.

Requires per-term history, not just a final outcome per term.

---

### 13. XP collection

**States:** one, animating in.

**Components:** an XP reward animation (**NEW**). The in-loop counter is already
`RecallHeader`'s `xp` prop.

**Student can:** watch. XP is a bonus for unaided terms, never a cost for hints: every term
earns, unaided earns more.

---

### 14. Main screen

Last, because it is the widest surface and the least load-bearing for the loop.

**States:** Speak to Learn as a focal card for first-timers; demoted to a `TopicChip`
(`type="activeRecall"`) after N impressions; plus a resume offer in the thread when a session
is unfinished.

**Components:** `StatusBar`, `TopNavigation`, `TopicChip` rail, `MessageBubble`, `ChatInput`
(`onPlusClick`, `onMicClick`), `BottomNavbar` (`active="knowie"`), plus the Tools overlay and
the focal Speak to Learn card (**NEW**, both).

**Student can:** start Active Recall from the Tools overlay or the chip rail, and pick up an
unfinished session from Knowie's message in the thread. A *completed* session returns here
and leaves no trace: no summary message.

---

## Explicitly out of scope

Cut from the MVP and moved to future iterations, reasons in `knowledge/sprint-context.md`:

- **Show transcript** after sending. No real transcription exists, so it could only show
  pre-written words the student never said.
- **Understanding check** after a reveal. A second judged turn on a term already failed twice.
- **Exam Prep entry point.** One entry only, the AI chat, which now has to carry completion as
  well as discovery.

Ruled out earlier and still out: a second hint, mid-loop material review, a visible transcript
during recording, and any type-instead fallback.

Considered during the interview and not taken, recorded so they are not re-litigated: a
bank-and-stop point partway through a long session, a mid-loop "that's not what I said"
retry, showing the XP cost of a hint, distinguishing skipped from revealed in the summary, and
a chat-thread summary message after a completed session.

Out of scope for the platform, per `knowledge/platform-constraints.md`: anything above 390px,
light mode, Android, native APIs.

Known gaps, accepted rather than solved:

- A student who gets a partial or fail cannot tell "misheard" from "wrong". Try Again is the
  only recourse. Direct cost of cutting the transcript.
- The progress bar sits still through the whole hint ladder.
- The prototype never shows a slow turn, so the "taking a moment" state is unreachable.
- A tester who knows the subject can spot that non-primary topics reuse content.
- Mic hardware busy, and a student switching language mid-answer, are both unhandled.

---

## How the mocked recall behaves

- **Verdicts are hard-coded per term and per attempt.** No speech-to-text, no judge. Every run
  is identical, which makes this a repeatable test instrument rather than a live-driven demo,
  and guarantees every designed state is reachable.
- **Outcomes alternate** across the session so no stretch is all wins or all misses.
- **Processing takes a fixed 2.5 seconds** on every turn, comfortably under the 4s target the
  brief sets. The delay is real and the animation has to fill it.
- **One topic is written in full:** every term, hint, per-verdict feedback line and reveal.
  All other topics are startable and reuse that content, which is why every topic in the
  recents list comes from the same subject.
- **Empty clips override the script.** Under about a second returns "didn't catch that" rather
  than the scripted verdict. The one legitimate override.
- **Progress counts terms only.** Retries, hints and didn't-catch-that do not move it.

---

## Verification

Three parts. Part A is commands with exact pass conditions. Part B is a scripted walkthrough
where every step is an observable assertion, not a judgement. Part C is what genuinely needs a
human and a phone, marked as such so nobody pretends it was automated.

All commands run from `knowunity-app/`.

### Part A: automated

| # | Command | Passes when |
|---|---|---|
| A1 | `npm run tokens && git diff --exit-code styles/tokens.css` | Exit 0. Tokens are in sync with `../knowunity-sprint/tokens/tokens.json` and the committed CSS was not hand-edited. |
| A2 | `npm run lint` | Exit 0. |
| A3 | `npm run build` | Exit 0, no type errors. |
| A4 | Storybook `test-run` across `stories/` (the MCP tool, not a package.json script) | All stories pass, including `components-button-circular--touch-target-holds-the-minimum`, `components-button--touch-target-holds-the-minimum`, `components-topicpromo--selected-is-announced`, `components-button-circular--icon-only-button-is-named`. |
| A5 | `grep -rnE '#[0-9a-fA-F]{3,8}' components/ app/ --include='*.css' --include='*.tsx'` | No matches. `styles/tokens.css` is deliberately outside the search: it is the only file allowed to hold raw values. |
| A6 | `grep -rn 'var(--[^)]*,' components/ app/` | No matches. CSS fallback values are banned by `knowledge/design-system.md`. |
| A7 | `grep -rln 'prefers-reduced-motion' components/RecordingTimer components/ProcessingAnimation` | Both files listed. Motion-carried status has a reduced variant. |
| A8 | `grep -rn "from 'knowunity-app'" app/ components/` | No matches. That import path does not resolve; use the `@/*` alias. |

### Part B: scripted walkthrough

Run at 390px in dark mode. Each state has a URL, so a machine can drive this with Playwright
and a human can drive it by hand. Every row is pass or fail, with nothing to interpret.

**Entry and setup**

| # | Do | Assert |
|---|---|---|
| B1 | Load the main screen with no prior sessions | Speak to Learn renders as the focal card, not as a `TopicChip` |
| B2 | Open the Tools overlay, tap Active Recall | First-run education screen renders |
| B3 | Tap continue, then return to the main screen and start again | Education screen does *not* render a second time |
| B4 | Load the main screen after N impressions of the focal card | Speak to Learn renders as a `TopicChip` with `type="activeRecall"` |
| B5 | On topic selection with nothing picked | "Let's go!" has `state="Disabled"` and does not respond to a tap |
| B6 | Tap one topic, then tap a second topic | Exactly one row has `state="Selected"` |
| B7 | Tap "Let's go!" | Mic primer renders before any term prompt |
| B8 | Deny the permission | Mic denied screen renders, with a Settings route and a working exit to another tool |
| B9 | Allow the permission | Term 1 prompt renders, `RecallHeader` progress at 0 |

**One term, every control**

| # | Do | Assert |
|---|---|---|
| B10 | Tap the mic | `RecordingTimer` has `isRecording`, elapsed time increments from 0:00 |
| B11 | Stop | `AudioPlayback` renders with three `CircularButton`s: `icon="Delete"` at `size="S"`, `icon="Send"` at `size="L"`, `icon="Mic"` at `size="S"` |
| B12 | Tap play | `AudioPlayback` has `isPlaying` |
| B13 | Tap delete | Returns to the prompt with no clip held |
| B14 | Record, stop, tap resume, stop again | Returns to review with a longer clip, not a new one |
| B15 | Wait 30 seconds on the review state without tapping | Nothing is submitted |
| B16 | Tap send, and time it | `ProcessingAnimation` renders for 2.4 to 2.6 seconds, then a feedback screen. No spinner at any point |

**The verdict ladder**

| # | Do | Assert |
|---|---|---|
| B17 | Reach a pass | `MessageBubble` has `variant="success"` and a `heading`; `Mascot` has `mood="excited"`; advance requires a tap |
| B18 | Wait 10 seconds on any feedback screen | It has not auto-advanced |
| B19 | Reach a partial | `MessageBubble` has `variant="almost"`; both "See hint" and "Try again" render |
| B20 | Reach a fail | Same two options render; no red error treatment and no `variant` other than `almost` |
| B21 | On a partial, tap "Try again", then miss again | "See hint" still renders. The hint was not forfeited |
| B22 | Miss twice with the hint used | Reveal renders, with the saved-for-review confirmation |
| B23 | Count recordings on one term | Never exceeds three |
| B24 | Tap skip on a fresh prompt | Reveal renders. No blank pass |
| B25 | Record under one second and send | "Didn't catch that" renders after the full 2.5s wait, the attempt counter is unchanged, the hint is still available, and `RecallHeader` progress is unchanged |
| B26 | Compare `RecallHeader` progress before and after a retry, a hint and a didn't-catch-that | Identical in all three cases |
| B27 | Resolve a term | Progress increases by exactly `1/N` |

**Interruption**

| # | Do | Assert |
|---|---|---|
| B28 | Tap `onClose` mid-term | Exit confirmation renders and its copy states that progress saves |
| B29 | Confirm the exit, then return via Active Recall | Same term, same attempt count, hint still unlocked if it was unlocked, same feedback if that is where they were |
| B30 | Exit from the review-audio state, then return | No clip is restored, and no verdict was recorded. Nothing was auto-sent |
| B31 | Return to the main screen with a session unfinished | Knowie's resume offer renders in the thread |
| B32 | Finish a session and return to the main screen | The thread is unchanged. No summary message |

**Summary, all three variants**

| # | Do | Assert |
|---|---|---|
| B33 | Force a run where every term passes unaided first try | Clean-run headline renders |
| B34 | Force a mixed run | Headline names the terms that moved from missed to explained |
| B35 | Force a run with nothing unaided | Attempt-claiming headline renders, and it makes no mastery claim |
| B36 | On any completed run, compare the breakdown against a hand-tally of the session | X unaided, Y hinted, Z revealed match. Skipped terms are inside the revealed count, not their own category |
| B37 | Open the review list | Contains exactly the hinted, revealed and skipped terms. Zero unaided terms |
| B38 | Tap "Try again" | Only the terms that needed help are replayed |
| B39 | Reach XP collection | Total equals base-per-term plus the unaided bonus. No term is penalised for a hint |

### Part C: needs a human and a device

Not automatable, and saying so is the point.

| # | Do | Assert |
|---|---|---|
| C1 | Add the prototype to the iPhone home screen and open it | No content under the status bar or the home indicator, in any state |
| C2 | Run the loop with a real thumb | The mic is reachable without regripping, and the control does not move between record, review and processing |
| C3 | Enable Reduce Motion in iOS accessibility settings, then record and send | Both the recording and the processing state still read as live rather than frozen |
| C4 | Screenshot the pass, partial and fail screens, then desaturate them | All three are still distinguishable |
| C5 | Check every text and UI pair against WCAG 2.1 AA: 4.5:1 body, 3:1 large text and UI | Passes. Dark mode is where this quietly fails, so measure rather than assume |
| C6 | VoiceOver through a feedback screen | Order is verdict, then explanation, then next action |
| C7 | Paste the German translation into the tightest `Button` label and the longest `MessageBubble` prompt | Nothing truncates or wraps badly. German runs 30 to 40% longer |
| C8 | View at 320px (iPhone SE) | Nothing breaks, per `knowledge/platform-constraints.md` |

---

## Open

Undecided, listed rather than assumed:

- **All copy.** Every term, hint, per-verdict feedback line and reveal for the written topic.
  Including the three Success headlines, where the nothing-unaided variant is the easiest place
  in the flow to sound like spin.
- **Which subject** the fully written topic belongs to, and therefore what the other rows in
  the recents list are called.
- **How many terms** the written topic actually has, within the 5 to 10 range.
- **Real mic capture or fully mocked.** `getUserMedia` gets a genuine permission prompt to
  design against; mocking is faster. `knowledge/platform-constraints.md` says decide early and
  do not burn a day on it. Still open.
- **The term count in the header.** The decision is a bar plus a count ("4 of 10"), but
  `RecallHeader` only takes `progress` as a 0-1 fraction and has no count or label prop.
  Either add a prop or render the count outside the component. Do not fake it.
- **XP values.** Base per term and the unaided bonus.
- **N for the Speak to Learn demotion.** Impression-count based, count not chosen, and the
  prototype has to fake a view count somehow.
- **Whether an unfinished session expires**, and what Knowie's resume message says if a
  student left days ago.
- **What the review list links to.** Which material, and where the saved list lives on the
  profile.
- **What else is in the Tools overlay** besides Active Recall.
- **The reduced-motion visual design** for the recording and processing states. The principle
  is decided (reduce, do not remove); the two designs are not drawn.
