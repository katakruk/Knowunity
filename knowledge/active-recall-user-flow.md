# User Flow: Active Recall

**Entry Strategy:** Two paths optimize for both activation (25% target) and completion (70% target):
- **Primary:** AI chat main screen, via Tools overlay or the chip rail (ad-hoc access, drives discovery)
- **Secondary:** Exam Prep step, structured and section-specific (drives completion)

**Availability:** The feature is only offered to students who have already practised at
least two topics, so the topic list is never empty.

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
**Description:** Explains what active recall is (first time only)
**User Action:** Read and tap to continue

↓

### 3. Topic Selection
**Type:** SCREEN, two states
**Design:** MUST HAVE
**Figma:** Unselected 13646:14741, Selected 13645:14426
**Description:** Knowie asks the student to pick a topic. Single-select list of recently
reviewed topics, "Load more" for older ones, no free-text entry. One topic per session.
**States:**
- *Unselected:* nothing picked, "Let's go!" disabled
- *Selected:* one topic ticked, "Let's go!" enabled
**User Action:** Pick a topic, tap "Let's go!"

**Progress indicator:** present but at zero, because the question count is not known until
the topic is chosen. It resolves into a real progress bar on the following screens.

↓

### 4. Mic Permission
**Type:** STATE
**Design:** Leave for Code
**Description:** iOS system dialog requests microphone access. Requested after topic
commit, so the primer lands when the student already has something they want to talk about.
**User Action:** Allow / Don't Allow

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
mocked, so this carries a real delay.
**User Action:** Wait

↓ (to Section 3)

### The three instances of the cycle

| Instance | Prompt | Recording | Review Audio | Entered from |
|---|---|---|---|---|
| First attempt | Term Prompt 13610:10191 | 13610:10268 | 13610:10339 | Topic Selection |
| Try again | 13644:14133 | 13644:14157 | 13644:14186 | Feedback, "Try Again" |
| Hint | Hint / Prompt 13610:10217 | 13610:10303 | 13610:10372 | Feedback, "See Hint" |

The Hint instance adds the hint text to the prompt, a nudge that does not give the answer
away. Only one hint is offered per question.

**Next Term Prompt** (13610:10242) is the first-attempt Prompt for the following question.
Same screen, different content.

---

## Section 3: Judgement

Processing resolves into one of three outcomes. Judge generously.

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
**Description:** After a hint and a retry have both failed, show the full correct answer
**User Action:** Read, tap to continue

↓

### 9e. Understanding Check
**Type:** SCREEN
**Design:** Leave for Code
**Description:** Paraphrase or follow-up question, so a reveal does not become memorisation
without comprehension
**User Action:** Respond
**Next:** → Next Term Prompt

---

## Section 4: Ending It

### 10. Success Screen
**Type:** SCREEN
**Design:** MUST HAVE
**Description:** Congratulations. Stats: X unaided, Y hints, Z revealed
**Special Note:** RECALL THROUGH REPETITION. To-do list of N terms to review, with links,
saved to their profile. Material references are marked mid-loop but only surfaced here,
because mid-loop exits break completion rate.
**User Action:** Review stats, see to-do list, tap to continue

↓

### 11. XP Display
**Type:** STATE
**Design:** Leave for Code
**Description:** Earned XP animates in
**User Action:** Watch

↓

### 12. Return
**Type:** SCREEN
**Design:** Leave for Code
**Description:** Primary entry returns to the chat or Tools overlay. Secondary entry
returns to the Exam Plan with Active Recall marked complete.
**User Action:** Continue studying

---

## Not yet in Figma

Named here so the gaps are visible, not to imply they are designed:

- **Success Screen (#10) and XP Display (#11).** No frames exist, despite #10 being MUST HAVE.
- **Processing for the Hint and Try again instances.** Both branches connect Review Audio
  straight to Feedback Positive, skipping #8.
- **Feedback Negative (9c) has no incoming connector.** Processing only connects to
  Feedback Positive and Feedback Almost There.
- **Reveal Answer (9d) and Understanding Check (9e).**
- **Connectors for Section 1.** Main Screen, First-Run Education, Topic Selection and Term
  Prompt are not linked on the canvas.

---

## Edge Cases (Not in Main Flow)

Excluded from the main flow visualisation on purpose. All Leave for Code.

- **Transcription Failed:** "Couldn't hear that"
- **No Mic Permission:** prompt to Settings
- **Exit Confirmation:** "Are you sure you want to leave? Progress will be saved"
- **Show Transcript:** optional link after each response to view what was transcribed

**Not an edge case any more:** there is no Type Instead fallback. No type-instead option is
a hard rule, and Topic Selection has no free-text entry either.
