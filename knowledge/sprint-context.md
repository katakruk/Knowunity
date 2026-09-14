# Sprint Context: Voice Active Recall

Voice active-recall feature for Knowunity. Student speaks to explain a term, Knowie judges and responds in text.

2.5-week sprint testing 25% activation and 70% completion with working prototype.

**Concept:** Student speaks their understanding of a term, Knowie judges it and responds in text.

**Where it lives:** Primary entry: AI chat main screen (Tools overlay + chip rail). Secondary entry: Exam Prep step card.

## Decisions

No text transcript during recording, because editing would turn this into a text feature.

"Show transcript" link after sending, because students need to verify judgment and reflect on explanation.

Two entry points, primary in the AI chat and secondary in Exam Prep, because the chat path drives discovery and the exam path drives completion.

Main screen shows Speak to Learn as focal point for first-timers then becomes a chip, because temporary prominence aids discovery without permanent clutter.

One hint then reveal, because it balances scaffolding with loop momentum.

Material references marked but shown only in post-session to-do list, because mid-loop exits break completion rate.

Understanding check after reveal or hinted pass uses paraphrase or follow-up question, because it prevents memorization without comprehension.

No type-instead option, because this feature requires voice to work as intended and students with accessibility needs can use other repetition tools better suited to them.

Exit confirmation states "progress saves", because accidental abandonment must be preventable and students need to trust resumption.

## Not Building

Second hint (cut for loop momentum), mid-loop material review (breaks completion), visible transcript during recording (prevents desired voice-only behavior), type-instead fallback (feature requires voice, other tools exist for text-based needs).
