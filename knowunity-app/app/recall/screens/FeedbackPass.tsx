'use client'

import React from 'react'
import { Button } from '@/components/Button'
import { Mascot } from '@/components/Mascot'
import { MessageBubble } from '@/components/MessageBubble'
import { RecallHeader } from '@/components/RecallHeader'
import { Scaffold } from '@/components/Scaffold'
import { SentClip } from '@/components/SentClip'
import { StatusBar } from '@/components/StatusBar'
import { LOOP_COPY, type Term } from '../content'
import styles from './FeedbackPass.module.css'
import shared from './shared.module.css'

export interface FeedbackPassProps {
  term: Term
  /** True when the pass came after a hint or a retry rather than unaided. */
  assisted?: boolean
  progress: number
  xp: number
  onContinue: () => void
  onClose: () => void
}

/**
 * The payoff moment. Knowie names what the student got right, then they continue.
 *
 * Figma: Feedback Positive (13610:10406) and the hinted or retried outcome
 * (13610:10434). The two frames are drawn identically; only the copy would differ
 * in a real session.
 *
 * Advance is always an explicit tap. Never auto-advance: a student who wants to
 * sit with a win should be allowed to, and one reading slowly should not be moved
 * on mid-sentence.
 */
export function FeedbackPass({
  term,
  assisted = false,
  progress,
  xp,
  onContinue,
  onClose,
}: FeedbackPassProps) {
  return (
    <Scaffold
      chrome={
        <>
          <StatusBar />
          <RecallHeader progress={progress} xp={xp} onClose={onClose} />
        </>
      }
      footer={
        <Button variant="Primary" size="L" className={shared.cta} onClick={onContinue}>
          {LOOP_COPY.continue}
        </Button>
      }
    >
      <div className={styles.root}>
        {/* The answer stays on screen with the verdict, so the student can play
            back what they said while reading how it was judged. */}
        <SentClip />

        <div className={styles.prompt}>
          {/* Figma draws 84px here. The component has S=40, M=64, L=120 and the
              illustration token scale has no 84 either, so Figma is off-scale and
              M is the nearest step. */}
          <Mascot mood="standby" size="M" />
          <MessageBubble
            variant="success"
            heading={term.passHeading}
            message={
              assisted
                ? `${term.passBody} That one took a hint, so it is on your review list.`
                : term.passBody
            }
            showTail
          />
        </div>
      </div>
    </Scaffold>
  )
}
