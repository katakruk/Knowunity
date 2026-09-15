# Sprint Context: Voice Active Recall

Voice active-recall feature for Knowunity. Student speaks to explain a term, Knowie judges and responds in text.

2.5-week sprint testing 25% activation and 70% completion with working prototype.

**Concept:** Student speaks their understanding of a term, Knowie judges it and responds in text.

**Where it lives:** One entry for the MVP: AI chat main screen (Tools overlay + chip rail). The Exam Prep step card is out of scope, see Decisions.

## Decisions

No text transcript during recording, because editing would turn this into a text feature.

~~"Show transcript" link after sending, because students need to verify judgment and reflect on explanation.~~ **Cut from MVP 2026-09-14, moved to future iterations.** With judging mocked there is no real transcription, so the panel could only show pre-written words the student never said, which reads as a bug rather than a mock. Revisit once real speech-to-text exists and the transcript is genuinely theirs.

~~Two entry points, primary in the AI chat and secondary in Exam Prep, because the chat path drives discovery and the exam path drives completion.~~ **Exam Prep entry cut from MVP 2026-09-14, moved to future iterations.** One entry only: the AI chat. Consequence to design against: the chat entry now has to carry completion as well as discovery, and it was only ever chosen for discovery. Nothing structural in the loop depends on the entry point.

Main screen shows Speak to Learn as focal point for first-timers then becomes a chip, because temporary prominence aids discovery without permanent clutter. Demotion is triggered by impression count, not by completing a session, because a prompt a student has repeatedly ignored has become noise regardless of whether they ever tried it.

One hint then reveal, because it balances scaffolding with loop momentum.

The hint ladder is attempt-count based, not option based: two attempts per term, and the hint stays available on any miss until it is used. A student who chooses "Try again" before "See hint" is not punished for wanting to retrieve it unaided, which is the behaviour the feature exists to build. Maximum three recordings on one term.

Material references marked but shown only in post-session to-do list, because mid-loop exits break completion rate.

The review list is filled by outcome, automatically: any term that was hinted, revealed or skipped goes on it, unaided terms do not. No mid-loop marking control, because the outcome already knows what the gaps are and a save button is one more thing on the feedback screen. The Reveal screen confirms the term has been saved for review, so the list is visibly earned rather than appearing from nowhere on the summary.

Skip means reveal, not a blank pass. "I don't know" jumps to the answer so nothing is wasted, and the summary records it as revealed with no distinction from a term the student fought for and lost. One honest category, and it never shames the skipper. Accepted cost: effort is invisible in the breakdown.

Session length is 5 to 10 terms, not the 3 to 5 in the kickoff spec, because 3 is too short to produce a felt sense of mastery. The exact count follows the topic's depth and is shown once the topic is picked, so the progress indicator starts at zero on Topic Selection and resolves after commit. Accepted risk: a 10-term session with hint ladders can run past 10 minutes, which pressures the 70% completion target and is a confound if completion comes in low.

~~Understanding check after reveal or hinted pass uses paraphrase or follow-up question, because it prevents memorization without comprehension.~~ **Cut from MVP 2026-09-14, moved to future iterations.** It is a second judged turn on a term the student has just failed twice, which risks trapping them at the lowest point in the session. Reveal now goes straight to the next term. Revisit as an unjudged or non-blocking beat.

Success screen leads with what changed during the session, the terms that went from missed to explained, rather than a raw unaided count, because a tally turns a weak session into a report card at the moment the student most needs to come back, and naming the shift rewards the student who struggled and recovered. This needs per-term history tracked, not just a final outcome per term.

Three summary variants, because "what changed" says nothing in two of the three possible sessions:
- *Mixed session:* leads with the terms that moved from missed to explained.
- *Clean run* (everything unaided, first try): switches to a clean-run claim, "all N, unaided, first try", because that is a real achievement and the shift framing has nothing to name.
- *Nothing unaided:* claims the attempt rather than the result, leading on having worked through the whole topic out loud, with the review list as the substance. Known gap: this variant makes no mastery claim, which is the part of the brief it cannot satisfy. Watch the copy here, it is the easiest place in the flow to sound like spin.

"Try again" on the summary replays only the terms that needed help, skipping what was already explained unaided, because re-asking a term they nailed five minutes ago tests memory rather than recall. Consequence: the second session is not comparable to the first, so its summary cannot make the same claim.

XP is a bonus for unaided terms, never a cost for hints. Every term earns; unaided earns more, framed as gain. Taking a hint must never feel like losing something, or the scaffolding stops being used and students guess into the fail path instead. The counter is visible in the header and counts up during the session, per the kickoff spec. Watch this in testing: the brief's own worry is XP pulling attention away from the recall, and a number next to feedback the student should be reading is exactly where that would show up.

No type-instead option, because this feature requires voice to work as intended and students with accessibility needs can use other repetition tools better suited to them.

Exit confirmation states "progress saves", because accidental abandonment must be preventable and students need to trust resumption.

Resume restores the exact state: the hint they had unlocked, the attempts they had used, the feedback they were reading. Not just the term boundary, because a promise that progress saves should mean what it says.

An unsent recording is discarded on exit, and this does not break the save promise. The student never sent it, so keeping it, or worse auto-sending it, would be acting against their intent. Explicit send is the rule; uncommitted audio is not progress.

An unfinished session is offered back through a message from Knowie in the chat thread, because the conversation is the natural place for a reminder and the chat is the only entry point. Note this applies to unfinished sessions only. A *completed* session returns to an unchanged chat and leaves no trace, so the two decisions do not conflict.

The loop is a full-screen takeover, not a thread inside the chat. Scrollback through a chat history would let a student re-read their earlier answers, which is the opposite of retrieval, and the mic would compete with the chat input bar. The takeover owns its own header, progress and thumb-zone mic.

The recording control is a single element that morphs in place through idle, recording, review and processing, while the content above it changes. The student's eye never loses the thing they are interacting with and the thumb never moves. This is the main reason to use a real animation library rather than CSS transitions.

Progress counts terms only, not attempts: a continuous bar plus "4 of 10". Retries and hints do not move it. Attempts are not progress, and the bar has to scale to 10 terms in 390px, which segments do not. Known cost: the bar sits still through the whole hint ladder, exactly when a struggling student would most want to see movement. If completion suffers on long terms, this is the first thing to revisit.

Empty or near-silent recordings are a fourth outcome, not a scripted verdict. A clip under about a second goes through the normal processing wait and returns a gentle "didn't catch that" that does not count as an attempt. Send is never disabled, because push-to-talk promises the student controls send. This is the one place the mock legitimately overrides the script.

~~Mic denial is explained, not worked around: what the mic is for, how to enable it in Settings, and a clear route out to Quiz or Flashcards.~~ **Cut from MVP 2026-09-14, moved to future iterations.** Mic permission is out of scope entirely.

~~The mic permission request gets its own short in-context primer after topic commit, one line on why the mic is needed and a button that triggers the OS dialog.~~ **Cut from MVP 2026-09-14, moved to future iterations.**

Mic access is assumed granted, because this is not the student's first time in the app. The prototype exists to test the recall loop, and permission was never the thing under test. No primer screen, no OS dialog, no denied state. Consequence: the microphone is fully mocked, since real `getUserMedia` capture would raise a browser permission prompt and reintroduce exactly what this removes.

First-run education is shown once, with short text and a single CTA. No skip control, because with text this short there is nothing to skip and no reason to distinguish reading from skipping.

Reduced motion reduces rather than removes: a static recording indicator with the counting timer, and a calm stepped processing state instead of orbiting particles. The states must still read as live rather than frozen, since motion is carrying system status in both.

## Prototype mechanics (how the mock behaves)

Decided 2026-09-14. These are build instructions, not product decisions.

**Verdicts are hard-coded per term.** No STT, no judge, so the outcome of every term is written in advance. Every run is identical, which makes the prototype a repeatable test instrument rather than a live-driven demo, and guarantees every designed state is reachable. Each term needs its retry outcome scripted too, not just its first attempt.

**The scripted sequence is pass, pass, then a hinted term** (changed 2026-09-14 from alternating). Three prompts, and the third comes back partial so the student meets the hint ladder and recovers. Two wins land the payoff moment before any friction, and the run ends with a real shift for the summary to name: two unaided, one recovered after a hint. The earlier alternating script gave no clean arc, which made the "what changed" claim muddier than it needed to be.

**Processing takes a fixed 5 seconds** on every turn (raised from 2.5s on 2026-09-14). Predictable, and the animation has room to read. Note this is deliberately *above* the brief's <4s target rather than inside it: the point is to see whether the wait state holds attention at a realistic bad-day latency, since a wait that is comfortable by construction proves nothing. If testers abandon during processing, that is the finding, and the number comes down. Known gap either way: there is still no separate "taking a moment" state for a turn that runs long.

**One topic is written in full.** All its terms, hints, per-verdict feedback and reveals are hand-written. The other topics in the list are all startable but reuse the built topic's content. To keep the reuse plausible, every topic in the recents list comes from the same subject as the deep one, so a reused term reads as adjacent rather than wrong. A tester who knows the subject will still spot it: known, accepted.

**A student who gets a partial or fail has no way to tell "misheard" from "wrong."** Try Again is the recourse, and no UI acknowledges mishearing. This is a direct consequence of cutting the transcript. The mitigation is a generous judge and feedback copy that names what was covered.

## Not Building

Second hint (cut for loop momentum), mid-loop material review (breaks completion), visible transcript during recording (prevents desired voice-only behavior), type-instead fallback (feature requires voice, other tools exist for text-based needs).

**Moved to future iterations** (cut 2026-09-14, previously committed decisions): "Show transcript" after sending, the Understanding Check after a reveal, the Exam Prep entry point, and the whole mic permission flow (primer, OS dialog, denied state). Reasons above.

**Considered and not taken** (2026-09-14, recorded so they are not re-litigated): a bank-and-stop point partway through a long session, a mid-loop "that's not what I said" retry, showing the XP cost of a hint, distinguishing skipped from revealed in the summary, and a chat-thread summary message after a completed session.
