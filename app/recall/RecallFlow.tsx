'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { DidntCatch } from './screens/DidntCatch'
import { ExitConfirm } from './screens/ExitConfirm'
import { FeedbackMiss } from './screens/FeedbackMiss'
import { FeedbackPass } from './screens/FeedbackPass'
import { Intro } from './screens/Intro'
import { RecordingTurn, type TurnPhase } from './screens/RecordingTurn'
import { Reveal } from './screens/Reveal'
import { Success, type SessionResult, type TermOutcome } from './screens/Success'
import { TermPrompt, type PromptVariant } from './screens/TermPrompt'
import { TopicSelection } from './screens/TopicSelection'
import { XpCollect } from './screens/XpCollect'
import { SESSION_LENGTH, TERMS, XP_PER_UNAIDED_TERM, type TopicId } from './content'
import type { RecallState } from './state'

/**
 * How long the mocked judge takes.
 *
 * Deliberately 5s, which is longer than the brief's <4s target rather than inside
 * it. Set on 2026-09-14 to test whether the wait state holds attention at a
 * realistic bad-day latency, not just a good one. Shorten it if testers bail here.
 */
const PROCESSING_MS = 5000

const INTRO_SEEN_KEY = 'knowie.recall.introSeen'

/**
 * The seen-once flag, read as an external store rather than in an effect.
 *
 * localStorage does not exist during server rendering, so the server snapshot is
 * always `false` and React reconciles it after hydration. Reading it in a
 * `useState` initialiser would either crash on the server or cause a hydration
 * mismatch; reading it in an effect means a setState cascade.
 *
 * Nothing else writes this key mid-session, so subscribe is a no-op.
 */
const subscribeToIntroSeen = () => () => {}
const getIntroSeen = () => window.localStorage.getItem(INTRO_SEEN_KEY) === 'true'
const getIntroSeenOnServer = () => false

/**
 * Demo session results, one per Success variant.
 *
 * The prototype has one written term, so a ten-term session cannot be played all
 * the way through yet. These stand in so all three headline variants are reachable
 * and reviewable, which is what the verification steps need.
 */
const DEMO_RESULTS: Record<'mixed' | 'clean' | 'none', SessionResult> = {
  mixed: {
    outcomes: ['unaided', 'unaided', 'hinted', 'unaided', 'revealed', 'hinted', 'unaided'],
    recovered: 2,
    reviewTerms: [
      { question: 'What made Greek democracy different from modern democracy?', outcome: 'hinted' },
      { question: 'Why did the Peloponnesian War weaken Athens?', outcome: 'revealed' },
      { question: 'What was the role of the agora?', outcome: 'hinted' },
    ],
  },
  clean: {
    outcomes: ['unaided', 'unaided', 'unaided', 'unaided', 'unaided'],
    recovered: 0,
    reviewTerms: [],
  },
  none: {
    outcomes: ['hinted', 'revealed', 'hinted', 'revealed'],
    recovered: 0,
    reviewTerms: [
      { question: 'What made Greek democracy different from modern democracy?', outcome: 'hinted' },
      { question: 'Why did the Peloponnesian War weaken Athens?', outcome: 'revealed' },
      { question: 'What was the role of the agora?', outcome: 'hinted' },
      { question: 'How was an Athenian jury chosen?', outcome: 'revealed' },
    ],
  },
}

export interface RecallFlowProps {
  /**
   * From `?state=`. Forces a screen and bypasses the seen-once check, so every
   * state is reachable without playing through the session. This is what makes
   * the verification steps in SPEC.md runnable.
   */
  initialState?: RecallState
  /** From `?exit=1`. Raises the exit confirmation over the current screen. */
  initialExit?: boolean
}

export function RecallFlow({ initialState, initialExit = false }: RecallFlowProps) {
  const router = useRouter()
  const introSeen = React.useSyncExternalStore(
    subscribeToIntroSeen,
    getIntroSeen,
    getIntroSeenOnServer,
  )

  // `null` means "nothing has forced a screen yet", so the screen is derived
  // from whether the intro has been seen. A deep link and any advance through
  // the flow both set it.
  const [forced, setForced] = React.useState<RecallState | null>(initialState ?? null)
  const state: RecallState = forced ?? (introSeen ? 'topics' : 'intro')

  const [selected, setSelected] = React.useState<TopicId | null>(null)
  const [exiting, setExiting] = React.useState(initialExit)

  // ── Session state ─────────────────────────────────────────────────────────
  // Which term, which attempt at it, whether its hint has been spent, and how
  // every term before it ended. The outcomes are what the Success screen reads,
  // so the summary reports the run the student actually had.
  const [termIndex, setTermIndex] = React.useState(0)
  const [attempt, setAttempt] = React.useState(0)
  // The hint is spent once per term. Two attempts, and it stays offered on any
  // miss until it is used.
  const [hintUsed, setHintUsed] = React.useState(false)
  const [outcomes, setOutcomes] = React.useState<TermOutcome[]>([])

  function handleIntroContinue() {
    // Deep-linking into the intro must not mark it seen, or verification cannot
    // check the once-ever rule and the forced state in the same run.
    if (!initialState) window.localStorage.setItem(INTRO_SEEN_KEY, 'true')
    setForced('topics')
  }

  const term = TERMS[Math.min(termIndex, TERMS.length - 1)]

  /** Records how the current term ended and moves on, or ends the session. */
  function finishTerm(outcome: TermOutcome) {
    const next = [...outcomes, outcome]
    setOutcomes(next)
    setAttempt(0)
    setHintUsed(false)

    if (termIndex + 1 >= TERMS.length) {
      setForced('success')
      return
    }
    setTermIndex(termIndex + 1)
    setForced('prompt')
  }

  // Progress counts resolved terms only, so it does not move for a retry, a hint
  // or a didn't-catch-that.
  //
  // A term counts the moment its verdict is on screen, not when the student taps
  // Continue: the bar moving is part of the payoff, and Figma's feedback frame
  // draws it already advanced. `outcomes` is only appended on Continue, so the
  // current term is added here rather than double-counted.
  const verdictOnScreen =
    state === 'feedback-pass' || state === 'feedback-pass-assisted' || state === 'reveal'
  const progress = (outcomes.length + (verdictOnScreen ? 1 : 0)) / SESSION_LENGTH

  const unaidedSoFar = outcomes.filter((o) => o === 'unaided').length
  // Same for XP: an unaided pass earns as it is announced, not a screen later.
  const earnedNow = state === 'feedback-pass' ? 1 : 0
  const xp = (unaidedSoFar + earnedNow) * XP_PER_UNAIDED_TERM

  /**
   * What the Success and XP screens report.
   *
   * A run played through uses its own outcomes. The `success-clean` and
   * `success-none` deep links use fixtures instead, because the scripted run only
   * ever produces the mixed shape and those two variants still have to be
   * reviewable. Deep-linking straight to `success` with nothing played also falls
   * back to a fixture rather than claiming a session of zero terms.
   */
  const result: SessionResult =
    state === 'success-clean'
      ? DEMO_RESULTS.clean
      : state === 'success-none'
        ? DEMO_RESULTS.none
        : outcomes.length > 0
          ? {
              outcomes,
              // Terms that came back partial or failed and were then explained
              // after a hint or a retry. That is what "what changed" names.
              recovered: outcomes.filter((o) => o === 'hinted').length,
              reviewTerms: TERMS.slice(0, outcomes.length)
                .map((t, i) => ({ question: t.question, outcome: outcomes[i] }))
                .filter(
                  (r): r is { question: string; outcome: Exclude<TermOutcome, 'unaided'> } =>
                    r.outcome !== 'unaided',
                ),
            }
          : DEMO_RESULTS.mixed

  // An unsent recording exists on review and nowhere else. The exit copy has to be
  // precise about that, since progress saves but an unsent clip does not.
  const hasUnsentRecording = state === 'review'

  function screen() {
    if (state === 'intro') {
      return <Intro onContinue={handleIntroContinue} onClose={() => setExiting(true)} />
    }

    if (state === 'topics') {
      return (
        <TopicSelection
          selected={selected}
          onSelect={setSelected}
          onStart={() => setForced('prompt')}
          onClose={() => setExiting(true)}
        />
      )
    }

    if (state === 'prompt' || state === 'prompt-retry' || state === 'prompt-hint') {
      const variant: PromptVariant =
        state === 'prompt-hint' ? 'hint' : state === 'prompt-retry' ? 'retry' : 'first'
      return (
        <TermPrompt
          term={term}
          variant={variant}
          progress={progress}
          xp={xp}
          onRecord={() => setForced('recording')}
          // Skip means reveal, not a blank pass: the student still gets the answer.
          onSkip={() => setForced('reveal')}
          onClose={() => setExiting(true)}
        />
      )
    }

    if (state === 'recording' || state === 'review' || state === 'processing') {
      return (
        <RecordingTurn
          term={term}
          phase={state as TurnPhase}
          progress={progress}
          xp={xp}
          onStop={() => setForced('review')}
          onDelete={() => setForced('prompt')}
          onResume={() => setForced('recording')}
          onSend={() => {
            setForced('processing')
            // The verdict is hard-coded per term and per attempt, so a run is
            // identical every time. Term 3 comes back partial first, which is what
            // takes the student through the hint ladder.
            const verdict = term.script[Math.min(attempt, term.script.length - 1)]
            window.setTimeout(() => {
              if (verdict === 'pass') {
                setForced(hintUsed ? 'feedback-pass-assisted' : 'feedback-pass')
              } else {
                setForced(verdict === 'partial' ? 'feedback-partial' : 'feedback-fail')
              }
            }, PROCESSING_MS)
          }}
          onClose={() => setExiting(true)}
        />
      )
    }

    if (state === 'didnt-catch') {
      return (
        <DidntCatch
          progress={progress}
          xp={xp}
          onRecordAgain={() => setForced('recording')}
          onClose={() => setExiting(true)}
        />
      )
    }

    if (state === 'feedback-pass' || state === 'feedback-pass-assisted') {
      return (
        <FeedbackPass
          term={term}
          assisted={state === 'feedback-pass-assisted'}
          progress={progress}
          xp={xp}
          // Hinted or retried passes still count as hinted in the summary: the
          // student got there, but not unaided.
          onContinue={() => finishTerm(hintUsed ? 'hinted' : 'unaided')}
          onClose={() => setExiting(true)}
        />
      )
    }

    if (state === 'feedback-partial' || state === 'feedback-fail') {
      return (
        <FeedbackMiss
          kind={state === 'feedback-partial' ? 'partial' : 'fail'}
          hintAvailable={!hintUsed}
          progress={progress}
          xp={xp}
          onSeeHint={() => {
            setHintUsed(true)
            setAttempt(attempt + 1)
            setForced('prompt-hint')
          }}
          onTryAgain={() => {
            setAttempt(attempt + 1)
            setForced('prompt-retry')
          }}
          onClose={() => setExiting(true)}
        />
      )
    }

    if (state === 'reveal') {
      return (
        <Reveal
          term={term}
          progress={progress}
          xp={xp}
          onContinue={() => finishTerm('revealed')}
          onClose={() => setExiting(true)}
        />
      )
    }

    if (state === 'success' || state === 'success-clean' || state === 'success-none') {
      return (
        <Success
          result={result}
          onContinue={() => setForced('xp')}
          // Replays only the terms that needed help. Restarts the run for now,
          // since a partial replay needs per-term selection the session does not
          // track yet.
          onTryAgain={() => {
            setOutcomes([])
            setTermIndex(0)
            setAttempt(0)
            setHintUsed(false)
            setForced('prompt')
          }}
        />
      )
    }

    // 'xp'
    const unaided = result.outcomes.filter((o) => o === 'unaided').length
    return (
      <XpCollect
        amount={unaided * XP_PER_UNAIDED_TERM}
        unaided={unaided}
        // A completed session returns to an unchanged chat: no summary message and
        // no trace in the thread.
        onCollect={() => router.push('/')}
      />
    )
  }

  return (
    <>
      {screen()}
      {exiting && (
        <ExitConfirm
          hasUnsentRecording={hasUnsentRecording}
          onLeave={() => router.push('/')}
          onStay={() => setExiting(false)}
        />
      )}
    </>
  )
}
