# User Flow: Active Recall

**Entry Strategy:** One path in the MVP. AI chat main screen, via Tools overlay or the chip
rail (ad-hoc access, drives discovery). The Exam Prep step entry was cut on 2026-09-14 and
moved to future iterations, so the chat entry now has to carry completion as well as
discovery. Nothing structural in the loop depends on which entry was used.

**Availability:** The feature is only offered to students who have already practised at
least two topics, so the topic list is never empty.

**Shell:** The loop is a full-screen takeover, not a thread inside the chat. Its own header,
its own progress, mic anchored in the thumb zone. No scrollback to earlier answers.

**Session length:** 5 to 10 terms, set by the topic's depth and known only after the topic
is picked.

Figma node IDs are given for every frame that exists. Figma: Main Flow (13615:12203).

---

## Section 1: Getting There

### 1. Main Screen
**Type:** SCREEN
**Design:** MUST HAVE
**Figma:** 13610:10167
**Description:** Active Recall option in "Practice for test & exam" section, alongside Quiz me, Flashcards, Vocabulary
**Getting There:** + button on main chat screen → Tools overlay, OR the scrollable chip rail
**User Action:** Tap "Active Recall" to start

↓

### 2. First-Run Education
**Type:** SCREEN
**Design:** MUST HAVE
**Figma:** 13610:10462
**Description:** Explains what active recall is (first time only). Short text, single CTA, no
skip control, because there is nothing to skip at this length. This screen is *not* the mic
primer, see #4a.
**User Action:** Read and tap to continue

↓

### 3. Topic Selection
**Type:** SCREEN, two states
**Design:** MUST HAVE
**Figma:** Unselected 13646:14741, Selected 13645:14426
**Description:** Knowie asks the student to pick a topic. Single-select list of recently
reviewed topics, "Load more" for older ones, no free-text entry. One topic per session.
Every topic is startable; only one is written in full and the rest reuse its content, so all
topics in the list come from the same subject to keep the reuse plausible.
**States:**
- *Unselected:* nothing picked, "Let's go!" disabled
- *Selected:* one topic ticked, "Let's go!" enabled
**User Action:** Pick a topic, tap "Let's go!"

**Progress indicator:** present but at zero, because the question count is not known until
the topic is chosen. It resolves on the following screens into a continuous bar plus a count
("4 of 10"), which counts terms only. Retries and hints do not move it.

↓

### 4a. Mic Primer
**Type:** SCREEN
**Design:** Leave for Code
**Description:** One line on why the mic is needed, and a button that triggers the OS dialog.
Sits between topic commit and term 1, because the first-run education screen is two screens
earlier and a request that appears unannounced is the one that gets denied.
**User Action:** Tap to continue into the OS dialog

↓

### 4b. Mic Permission
**Type:** STATE
**Design:** Leave for Code
**Description:** iOS system dialog requests microphone access. Requested after topic
commit, so the ask lands when the student already has something they want to talk about.
**User Action:** Allow / Don't Allow
**Next:** Allow → Term Prompt. Don't Allow → Mic Denied (see Edge Cases)

---

## Section 2: The Attempt Cycle 🔁

The same four steps run for every question and every retry. Only the prompt text and the
entry conditions change, so the cycle is described once here and its three instances are
listed below.

### 5. Prompt
**Type:** SCREEN
**Design:** MUST HAVE
**Description:** Knowie states the term or question to explain
**User Action:** Tap the mic button to start recording

↓

### 6. Recording
**Type:** STATE
**Design:** MUST HAVE
**Description:** Mic live. Ripple visualisation and elapsed timer make the recording state
unmistakable. Push-to-talk with explicit stop, never auto-detection of when the student
has finished speaking.
**User Action:** Speak, then stop

↓

### 7. Review Audio
**Type:** STATE
**Design:** MUST HAVE
**Description:** Playback bar plus three controls, so nothing is sent by accident and a
fumbled start never forces a bad submission.
**Controls:**
- **Delete** (small, left): discard the take and start over
- **Send** (large, centre): submit for judging
- **Resume** (small, right): keep recording onto the same take, returns to Recording (#6)
  and comes back here with the longer clip
**User Action:** Play back, then delete, resume, or send

↓

### 8. Processing
**Type:** STATE
**Design:** MUST HAVE
**Description:** "Knowie is thinking" wait state, orbiting particles animation. Judging is
mocked, so this carries a real delay: a fixed 2.5s on every turn.
**User Action:** Wait
**Next:** Pass → 9a. Partial → 9b. Fail → 9c. Clip under ~1s → "Didn't catch that" (see Edge
Cases), which does not count as an attempt.

↓ (to Section 3)

### The three instances of the cycle

| Instance | Prompt | Recording | Review Audio | Entered from |
|---|---|---|---|---|
| First attempt | Term Prompt 13610:10191 | 13610:10268 | 13610:10339 | Topic Selection |
| Try again | 13644:14133 | 13644:14157 | 13644:14186 | Feedback, "Try Again" |
| Hint | Hint / Prompt 13610:10217 | 13610:10303 | 13610:10372 | Feedback, "See Hint" |

The Hint instance adds the hint text to the prompt, a nudge that does not give the answer
away. Only one hint is offered per question.

**Ladder mechanics:** attempt-count based, not option based. Two attempts per term, and the
hint stays available on any miss until it is used, so a student who picks "Try again" before
"See hint" does not forfeit it. Maximum three recordings on one term. The recording control
is a single element that morphs in place across #5 to #8 rather than four separate controls.

**Next Term Prompt** (13610:10242) is the first-attempt Prompt for the following question.
Same screen, different content.

---

## Section 3: Judgement

Processing resolves into one of three outcomes. Judge generously. In the prototype the
outcome is hard-coded per term and per attempt, alternating across the session so no stretch
is all wins or all misses. Every feedback screen advances on an explicit tap, never
automatically.

### 9a. Feedback Positive
**Type:** SCREEN
**Design:** MUST HAVE
**Figma:** 13610:10406, and 13610:10434 for the outcome of a hinted or retried attempt
**Description:** Affirmation naming what the student got right, then continue
**Special Note:** 🤩 THE PAYOFF MOMENT. After 1 to 3 correct questions the student should
feel "I can actually explain this"
**User Action:** Tap to continue
**Next:** → Next Term Prompt (13610:10242), or after the last question → Success Screen (#10)

### 9b. Feedback Almost There
**Type:** SCREEN
**Design:** MUST HAVE
**Figma:** 13610:10477
**Description:** Partly right. Names what was covered, then offers two ways forward
**User Action:** Choose "See Hint" or "Try Again"
**Next:** → Hint instance of the cycle, or → Try again instance

### 9c. Feedback Negative
**Type:** SCREEN
**Design:** MUST HAVE
**Figma:** 13610:10505
**Description:** Not right. Offers the same two ways forward
**User Action:** Choose "See Hint" or "Try Again"
**Next:** → Hint instance of the cycle, or → Try again instance

### 9d. Reveal Answer
**Type:** SCREEN
**Design:** Leave for Code
**Description:** After a hint and a retry have both failed, show the full correct answer. Also
where Skip lands, since skip means reveal rather than a blank pass. The screen confirms the
term has been saved to the review list, so the summary's list is visibly earned.
**User Action:** Read, tap to continue
**Next:** → Next Term Prompt (13610:10242), or after the last question → Success Screen (#10)

### ~~9e. Understanding Check~~ — cut from MVP
**Moved to future iterations, 2026-09-14.** It was a second judged spoken turn on a term the
student had just failed twice, which risks trapping them at the lowest point in the session.
Reveal now goes straight to the next term. Revisit as an unjudged or non-blocking beat.

---

## Section 4: Ending It

### 10. Success Screen
**Type:** SCREEN
**Design:** MUST HAVE
**Description:** Three variants, because a single headline cannot serve all three session
shapes:
- *Mixed:* leads with the terms that moved from missed to explained during the session.
- *Clean run:* "all N, unaided, first try."
- *Nothing unaided:* claims the attempt, having worked through the whole topic out loud, with
  the review list as the substance.
Breakdown below the headline: X unaided, Y hinted, Z revealed. Skipped terms count as
revealed, no separate category. Requires per-term history, not just a final outcome per term.
**Special Note:** RECALL THROUGH REPETITION. To-do list of N terms to review, with links,
saved to their profile, filled automatically by outcome: hinted, revealed and skipped terms
go on it, unaided ones do not.
**Actions:** Continue (primary). Try again (secondary) replays only the terms that needed
help, so a second summary is not comparable to the first.
**User Action:** Review stats, see to-do list, tap to continue

↓

### 11. XP Display
**Type:** STATE
**Design:** Leave for Code
**Description:** Earned XP animates in. XP is a bonus for unaided terms, never a cost for
hints: every term earns, unaided earns more. The counter is visible in the header and counts
up through the session, so this state collects a total the student has been watching.
**User Action:** Watch

↓

### 12. Return
**Type:** SCREEN
**Design:** Leave for Code
**Description:** Returns to the chat, unchanged. A completed session leaves no trace in the
thread and posts no summary message. (Only an *unfinished* session gets a message from Knowie
offering to resume, see Edge Cases.)
**User Action:** Continue studying

---

## Not yet in Figma

Named here so the gaps are visible, not to imply they are designed:

- **Success Screen (#10) and XP Display (#11).** No frames exist, despite #10 being MUST HAVE.
- **Processing for the Hint and Try again instances.** Both branches connect Review Audio
  straight to Feedback Positive, skipping #8.
- **Feedback Negative (9c) has no incoming connector.** Processing only connects to
  Feedback Positive and Feedback Almost There.
- **Reveal Answer (9d).** (Understanding Check is no longer a gap: cut from MVP.)
- **Connectors for Section 1.** Main Screen, First-Run Education, Topic Selection and Term
  Prompt are not linked on the canvas.
- **Mic Primer (#4a).** New as of 2026-09-14, no frame.
- **Summary variants.** The Success Screen now has three headline variants; none are designed.
- **Resume offer in the chat thread.** New as of 2026-09-14, no frame.

---

## Edge Cases (Not in Main Flow)

Excluded from the main flow visualisation on purpose. All Leave for Code.

- **Didn't catch that:** a clip under about a second goes through the normal 2.5s processing
  wait and returns a gentle "didn't catch that". Does not count as an attempt, does not
  consume the hint. Send is never disabled, because push-to-talk means the student controls
  send. This is the one case where the mock overrides the hard-coded verdict.
- **Mic denied:** explain what the mic is for, how to enable it in Settings, and offer a route
  out to Quiz or Flashcards. No text fallback exists by design, so this screen does not
  pretend the feature works without a mic.
- **Exit Confirmation:** "Are you sure you want to leave? Progress will be saved". Resume
  restores the exact state: unlocked hint, attempts used, feedback being read. An unsent
  recording is discarded, and that does not break the promise: the student never sent it, so
  keeping or auto-sending it would act against their intent.
- **Resume offer:** an unfinished session is offered back through a message from Knowie in the
  chat thread. Unfinished only, completed sessions leave the chat unchanged.
- **Reduced motion:** with `prefers-reduced-motion`, reduce rather than remove. Static
  recording indicator plus the counting timer, calm stepped processing instead of orbiting
  particles. Both states must still read as live rather than frozen.

**Not edge cases any more:**
- There is no Type Instead fallback. No type-instead option is a hard rule, and Topic
  Selection has no free-text entry either.
- **Show Transcript** is cut from the MVP (2026-09-14, moved to future iterations). With
  judging mocked there is no real transcription, so the panel could only show pre-written
  words the student never said. Revisit once real speech-to-text exists.
