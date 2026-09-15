'use client'

import React from 'react'
import { Button } from '@/components/Button'
import { Mascot } from '@/components/Mascot'
import { MessageBubble } from '@/components/MessageBubble'
import { RecallHeader } from '@/components/RecallHeader'
import { Scaffold } from '@/components/Scaffold'
import { SentClip } from '@/components/SentClip'
import { StatusBar } from '@/components/StatusBar'
import { LOOP_COPY } from '../content'
import styles from './FeedbackMiss.module.css'
import shared from './shared.module.css'

export type MissKind = 'partial' | 'fail'

export interface FeedbackMissProps {
  kind: MissKind
  /** False once the hint has been used, which removes "See hint". */
  hintAvailable: boolean
  progress: number
  xp: number
  onSeeHint: () => void
  onTryAgain: () => void
  onClose: () => void
}

/**
 * Partly right, or not right. Figma: Feedback almost there (13610:10477) and
 * Feedback Negative (13610:10505).
 *
 * One layout for both. The difference is copy, deliberately: a fail reads from
 * what Knowie says, not from a red treatment. `MessageBubble` has no error
 * variant and `design-system.md` says not to add one, so both use `almost`.
 *
 * Both ways forward stay available because the ladder counts attempts, not
 * options: picking "Try again" first does not forfeit the hint. Once the hint has
 * been spent, only "Try again" remains, and a second miss goes to the reveal.
 *
 * `SentClip` stays on screen. With the transcript cut, replaying your own answer
 * is the nearest thing to recourse when you think Knowie misheard you.
 */
export function FeedbackMiss({
  kind,
  hintAvailable,
  progress,
  xp,
  onSeeHint,
  onTryAgain,
  onClose,
}: FeedbackMissProps) {
  const copy = kind === 'partial' ? LOOP_COPY.partial : LOOP_COPY.fail

  return (
    <Scaffold
      chrome={
        <>
          <StatusBar />
          <RecallHeader progress={progress} xp={xp} onClose={onClose} />
        </>
      }
      footer={
        <div className={styles.choices}>
          {hintAvailable && (
            <div className={styles.choice}>
              <Button variant="Primary" size="L" className={shared.cta} onClick={onSeeHint}>
                {LOOP_COPY.seeHint}
              </Button>
            </div>
          )}
          <div className={styles.choice}>
            <Button variant="Secondary" size="L" className={shared.cta} onClick={onTryAgain}>
              {LOOP_COPY.tryAgain}
            </Button>
          </div>
        </div>
      }
    >
      <div className={styles.root}>
        <SentClip />

        <div className={styles.prompt}>
          {/* 84px in Figma; the component has no 84 and neither does the
              illustration token scale, so M is the nearest step. */}
          <Mascot mood="standby" size="M" />
          <MessageBubble
            variant="almost"
            heading={copy.heading}
            message={copy.body()}
            showTail
          />
        </div>
      </div>
    </Scaffold>
  )
}
