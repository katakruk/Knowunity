# User Flow: Active Recall (Dual Entry Points)

**Entry Strategy:** Two paths optimize for both completion (70% target) and activation (25% target):
- **Primary:** Exam Prep step (structured, section-specific content)
- **Secondary:** Practice for test & exam section in Tools (ad-hoc access)

## Section 1: Getting There

### 1a. Exam Plan (Primary Entry)
**Type:** SCREEN  
**Design:** Leave for Code  
**Description:** Shows 'Active Recall ' card as a step after each Exam Prep Parts  
**Getting There:** Users get here by selecting Exams (Chart icon) on the main menu  
**User Action:** Tap "Active Recall" card to start

↓

### 1b. Main Screen
**Type:** SCREEN  
**Design:** MUST HAVE  
**Description:** Active Recall option in "Practice for test & exam" section, alongside Quiz me, Flashcards, Vocabulary  
**Getting There:** Users access via + button on main chat screen → Tools overlay, OR via scrollable chip rail on main screen  
**User Action:** Tap "Active Recall" to start

↓

**Note:** Screens 2-15 (the core recall loop) are identical for both entry points. Only entry (1a/1b) and exit (16a/16b) differ.

---

### 2. First-Run Education
**Type:** SCREEN  
**Design:** MUST HAVE  
**Description:** Explains what active recall is (first time only)  
**User Action:** Read and tap to continue

↓

### 3. Mic Permission
**Type:** STATE  
**Design:** Leave for Code  
**Description:** iOS system dialog requests microphone access  
**User Action:** Allow/Don't Allow

---

## Section 2: The Recall Loop 🔁 (First Attempt)

### 4. Term Prompt
**Type:** SCREEN  
**Design:** MUST HAVE  
**Description:** Shows term/question to explain  
**User Action:** Tap mic button to start recording

↓

### 5. Recording (Speak)
**Type:** STATE  
**Design:** MUST HAVE  
**Description:** Visual feedback: mic live, waveform, timer  
**User Action:** Speaking while recording

↓

### 6. Review Audio
**Type:** STATE  
**Design:** MUST HAVE  
**Description:** Playback, send, or re-record  
**User Action:** Play back, confirm/send, or re-record

↓

### 7. Processing (Wait)
**Type:** STATE  
**Design:** MUST HAVE  
**Description:** 'Knowie is thinking...' wait state  
**User Action:** Wait

↓

### 8a. Feedback Positive (if right)
**Type:** SCREEN  
**Design:** MUST HAVE  
**Description:** Affirmation, continue to the next Prompt  
**Special Note:** 🤩 THE PAYOFF MOMENT - Once user completed correctly 1-3 questions they get a "I can actually explain this" feeling  
**User Action:** Tap "Next Question"  
**Next:** → Back to Term Prompt (#4) for next question, OR → After last question → Success Screen (#14)

### 8b. Feedback Negative (if wrong)
**Type:** SCREEN  
**Design:** MUST HAVE  
**Description:** Ask: Hint or Try again?  
**User Action:** Choose "See Hint" OR "Try Again"  
**Next:** 
- If "See Hint" → Hint Screen (#9)
- If "Try Again" → Recording (#10) in 2nd attempt loop

---

## Section 3: The 2nd Attempt Recall Loop 🔁

### 9. Hint Screen (if hint chosen)
**Type:** SCREEN  
**Design:** MUST HAVE  
**Description:** Nudge without giving answer. Re-attempt prompt.  
**User Action:** Read hint, tap "Try Again"

↓

### 10. Recording (Speak) - 2nd Attempt
**Type:** STATE  
**Design:** MUST HAVE  
**Description:** Visual feedback: mic live, waveform, timer  
**User Action:** Speaking while recording

↓

### 11. Review Audio - 2nd Attempt
**Type:** STATE  
**Design:** MUST HAVE  
**Description:** Playback, send, or re-record  
**User Action:** Play back, confirm/send, or re-record

↓

### 12. Processing (Wait) - 2nd Attempt
**Type:** STATE  
**Design:** MUST HAVE  
**Description:** 'Knowie is thinking...' wait state  
**User Action:** Wait

↓

### 13a. Feedback Positive (if right on 2nd attempt)
**Type:** SCREEN  
**Design:** MUST HAVE  
**Description:** Affirmation  
**User Action:** Tap "Next"  
**Next:** → Go back to the Recall Loop (Term Prompt #4)

### 13b. Reveal Answer (if still wrong)
**Type:** SCREEN  
**Design:** Leave for Code  
**Description:** Show full correct answer  
**User Action:** Read, tap "Got it" / "Continue"

↓

### 13c. Understanding Check
**Type:** SCREEN  
**Design:** Leave for Code  
**Description:** Paraphrase or follow-up question  
**User Action:** Respond  
**Next:** → Go back to the Recall Loop (Term Prompt #4)

---

## Section 4: Ending It

### 14. Success Screen
**Type:** SCREEN  
**Design:** MUST HAVE  
**Description:** Congratulations message. Stats: X unaided, Y hints, Z revealed  
**Special Note:** RECALL THROUGH REPETITION - To-Do List: Review [N] terms, with links (widgets). List is saved in their profile.  
**User Action:** Review stats, see to-do list, tap to continue

↓

### 15. XP Display
**Type:** STATE  
**Design:** Leave for Code  
**Description:** Earned XP animates in  
**User Action:** Watch animation

↓

### 16a. Return to Exam Plan (from Primary Entry)
**Type:** SCREEN  
**Design:** Leave for Code  
**Description:** Active Recall marked complete  
**User Action:** Continue with exam prep

### 16b. Return to Chat/Tools (from Secondary Entry)
**Type:** SCREEN  
**Design:** Leave for Code  
**Description:** Returns to main chat screen or Tools overlay  
**User Action:** Continue studying or exploring other tools

---

## Edge Cases (Not in Main Flow)

The following states/screens exist but are intentionally excluded from the main flow visualization:

- **Type Instead:** Text input fallback for can't speak  
  **Design:** Leave for Code
- **Transcription Failed:** Error: 'Couldn't hear that'  
  **Design:** Leave for Code
- **No Mic Permission:** Prompt to Settings or type  
  **Design:** Leave for Code
- **Exit Confirmation:** "Are you sure you want to leave? Progress will be saved" dialog  
  **Design:** Leave for Code
- **Show Transcript:** Optional link after each response to view what was transcribed  
  **Design:** Leave for Code
