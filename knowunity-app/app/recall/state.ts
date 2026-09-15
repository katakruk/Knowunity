/**
 * Screen identity for the recall takeover.
 *
 * Deliberately not in RecallFlow.tsx: that file is `'use client'`, and the
 * server component in page.tsx needs `isRecallState` to validate `?state=`.
 * A server module cannot call a function exported from a client module, so the
 * shared, environment-neutral pieces live here.
 */

/** Which screen is showing. */
export type RecallState =
  | 'intro'
  | 'topics'
  | 'prompt'
  | 'prompt-retry'
  | 'prompt-hint'
  | 'recording'
  | 'review'
  | 'processing'
  | 'didnt-catch'
  | 'feedback-pass'
  | 'feedback-pass-assisted'
  | 'feedback-partial'
  | 'feedback-fail'
  | 'reveal'
  | 'success'
  | 'success-clean'
  | 'success-none'
  | 'xp'

/**
 * `?state=` accepts exactly these, so every state has a URL. This is what makes
 * SPEC.md's verification runnable without playing a ten-term session by hand.
 *
 * The exit confirmation is not here: it is an overlay on top of whichever screen
 * the student was on, so it has no state of its own. `?exit=1` raises it.
 */
const DEEP_LINKABLE: RecallState[] = [
  'intro',
  'topics',
  'prompt',
  'prompt-retry',
  'prompt-hint',
  'recording',
  'review',
  'processing',
  'didnt-catch',
  'feedback-pass',
  'feedback-pass-assisted',
  'feedback-partial',
  'feedback-fail',
  'reveal',
  'success',
  'success-clean',
  'success-none',
  'xp',
]

export function isRecallState(value: string | undefined): value is RecallState {
  return value !== undefined && (DEEP_LINKABLE as string[]).includes(value)
}
