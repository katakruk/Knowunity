/**
 * Session content for the prototype.
 *
 * One topic is written in full; the others reuse its terms. Every topic is a
 * history topic so a reused term reads as adjacent rather than wrong. Figma's
 * frame draws Geometry, English IELTS prep and Biology, which predates the
 * one-subject decision in sprint-context.md.
 *
 * Accent per row is the screen's business, not the component's. See
 * TopicSelection.module.css.
 */

export type TopicId = 'ancient-greece' | 'roman-republic' | 'industrial-revolution' | 'cold-war'

export interface Topic {
  id: TopicId
  /** Row label. Kept short enough not to truncate at 390px. */
  name: string
  /** True for the topic whose terms, hints and feedback are actually written. */
  written: boolean
}

/** Recents list, in the order the frame shows them. */
export const TOPICS: Topic[] = [
  { id: 'ancient-greece', name: 'Ancient Greece', written: true },
  { id: 'roman-republic', name: 'The Roman Republic', written: false },
  { id: 'industrial-revolution', name: 'Industrial Revolution', written: false },
  { id: 'cold-war', name: 'The Cold War', written: false },
]

export const WRITTEN_TOPIC_ID: TopicId = 'ancient-greece'

export const INTRO_COPY = {
  heading: 'What is Active Recall?',
  body:
    'Active recall is a learning technique where you explain concepts out loud. It helps strengthen your memory and understanding.',
  cta: 'Got it',
} as const

/**
 * A term in the written topic. Verdicts are hard-coded per term and per attempt,
 * so the feedback copy lives alongside the question rather than being generated.
 */
export interface Term {
  question: string
  /** One hint per term. Never gives the answer away. */
  hint: string
  /** Shown on a pass. Names what the student got right. */
  passHeading: string
  passBody: string
  /** The full answer, shown on a reveal or a skip. */
  answer: string
}

/**
 * What the mocked judge returns, per attempt.
 *
 * Verdicts are hard-coded per term and per attempt, so a run is identical every
 * time and every designed state is reachable. `partial` on a first attempt means
 * the student meets the hint ladder; the next entry is what happens after it.
 */
export type ScriptedVerdict = 'pass' | 'partial' | 'fail'

/**
 * The scripted session: pass, pass, then a term that needs the hint.
 *
 * Two wins before any friction, so the payoff moment lands before the student is
 * asked to struggle, and the summary has a genuine shift to name at the end. Set
 * on 2026-09-14.
 *
 * Copy for term 1 comes from the Figma frames; terms 2 and 3 follow their pattern.
 */
export const TERMS: (Term & { script: ScriptedVerdict[] })[] = [
  {
    question: 'What made Greek democracy different from modern democracy?',
    hint: '🤔 Hint: Think about who could participate and how directly they voted on decisions.',
    passHeading: "That's right",
    passBody: 'You explained the difference really well.',
    answer:
      'Athenian democracy was direct: citizens voted on laws themselves in the assembly. Modern democracy is representative, and citizenship was far narrower then, excluding women, enslaved people and foreigners.',
    script: ['pass'],
  },
  {
    question: 'Why was the Peloponnesian War a turning point for Athens?',
    hint: '🤔 Hint: Think about what Athens lost beyond the battles themselves.',
    passHeading: 'Exactly',
    passBody: 'You tied the defeat to Athens losing its fleet and its empire.',
    answer:
      'Athens lost the war, its fleet and its empire, and never regained its dominance. The defeat ended the era of Athenian naval power and shook confidence in its democracy.',
    script: ['pass'],
  },
  {
    question: 'What was the role of the agora in an Athenian city?',
    hint: '🤔 Hint: Think about what people did there besides buying and selling.',
    passHeading: 'You got there',
    passBody: 'The agora as a civic space, not just a market, is the part that matters.',
    answer:
      'The agora was the central public space: a marketplace, but also where citizens met, argued politics, heard news and gathered before the assembly. It was the civic heart of the city.',
    // Partial first, then a pass once the hint has been read. This is the term
    // that takes the student through the hint ladder.
    script: ['partial', 'pass'],
  },
]

/**
 * Terms per session.
 *
 * The product target is 5 to 10, set by topic depth. The written topic has three,
 * and the progress bar counts what actually exists rather than promising ten and
 * stopping at three.
 */
export const SESSION_LENGTH = TERMS.length

/**
 * XP for a term explained unaided. Figma's frames show 2, so that is the
 * placeholder. The real base-per-term and unaided-bonus split is still open in
 * SPEC.md, and nothing here should be read as deciding it.
 */
export const XP_PER_UNAIDED_TERM = 2

export const LOOP_COPY = {
  /** Lead-in above the question on a first attempt. */
  leadFirst: "Let's start! Shall we?",
  /** Lead-in on a retry. */
  leadRetry: "Let's try again!",
  /** Caption above the idle mic. */
  tapToSpeak: 'Tap to speak',
  skip: 'Skip this question',
  /** Knowie while the mocked judge runs. */
  considering: 'Considering ....',
  continue: 'Continue',

  /* Sentence case throughout, per design-system.md. Figma's frames title-case
   * these two ("See Hint", "Try Again"); the system rule wins. */
  seeHint: 'See hint',
  tryAgain: 'Try again',

  /** Partly right. Copy from Figma 13610:10477. */
  partial: {
    heading: 'Almost there',
    body: () =>
      "You're on the right track, but there's more to cover. Would you like a hint or try again?",
  },
  /** Not right. Copy from Figma 13610:10505. */
  fail: {
    heading: 'Not quite there yet',
    body: () => 'Would you like a hint or try again?',
  },

  /**
   * Empty or near-silent clip. Not a verdict: it does not count as an attempt,
   * does not spend the hint and does not move progress. voice-ux.md asks for a
   * gentle "didn't catch that", so nothing here implies the student was wrong.
   */
  didntCatch: {
    heading: "Didn't catch that",
    body: 'I couldn’t hear an answer that time. Give it another go whenever you’re ready.',
    retry: 'Record again',
  },

  /** Reveal. Framed as normal rather than as failure. */
  reveal: {
    heading: 'Here it is',
    savedNote: 'Saved to your review list',
  },

  /** Exit confirmation. Says plainly what is and is not kept. */
  exit: {
    heading: 'Leave this session?',
    body: 'Your progress is saved, so you can pick up where you left off.',
    unsentBody:
      'Your progress is saved. The recording you haven’t sent yet will be discarded.',
    leave: 'Leave',
    stay: 'Keep going',
  },
} as const

/** Success screen. Three headline variants, one shared breakdown. */
export const SUCCESS_COPY = {
  mixed: {
    heading: 'You turned things around',
    body: (recovered: number) =>
      `${recovered} of these you couldn’t explain at first, and by the end you could.`,
  },
  clean: {
    heading: 'Every one, unaided',
    body: (total: number) => `All ${total} explained first try, without a hint.`,
  },
  /**
   * Nothing unaided. Claims the attempt rather than the result, because there is
   * no mastery to claim and pretending otherwise is the flattery the brief warns
   * about. The review list is the substance here.
   */
  none: {
    heading: 'You worked the whole topic out loud',
    body: () =>
      'None of these came unaided yet. That is worth knowing before an exam, and it is exactly what your review list is for.',
  },
  breakdown: {
    unaided: 'Explained unaided',
    hinted: 'Needed a hint',
    revealed: 'Revealed',
  },
  reviewTitle: 'Review these next',
  continue: 'Continue',
  tryAgain: 'Try again',
} as const

/** XP collection. */
export const XP_COPY = {
  heading: 'XP earned',
  /** Names why, so the number is not just a number. */
  note: (unaided: number) =>
    `${unaided} explained unaided, ${XP_PER_UNAIDED_TERM} XP each.`,
  collect: 'Collect',
} as const

/** Main screen. Copy from Figma 13610:10167. */
export const MAIN_COPY = {
  headline: 'If you can explain it out loud, you know it',
  speakToLearn: 'Speak to Learn',
  subtitle: 'See if you can explain what you studied',
  resume: (topic: string, done: number, total: number) =>
    `You were ${done} of ${total} through ${topic}. Want to pick it back up?`,
  resumeCta: 'Continue session',
  chatPlaceholder: 'Ask anything...',
  toolsTitle: 'Practice for test & exam',
} as const

export const TOPIC_SELECTION_COPY = {
  prompt: 'Pick a topic that you want to practice:',
  /** Figma says "Show more". The flow doc says "Load more"; Figma wins. */
  showMore: 'Show more',
  cta: "Let's go!",
  /** Accessible name for the radio group wrapping the rows. */
  groupLabel: 'Choose a topic to practise',
} as const
