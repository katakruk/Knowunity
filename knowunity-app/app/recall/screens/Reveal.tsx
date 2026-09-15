'use client'

import React from 'react'
import { Button } from '@/components/Button'
import { Mascot } from '@/components/Mascot'
import { MessageBubble } from '@/components/MessageBubble'
import { RecallHeader } from '@/components/RecallHeader'
import { Scaffold } from '@/components/Scaffold'
import { StatusBar } from '@/components/StatusBar'
import { LOOP_COPY, type Term } from '../content'
import styles from './Reveal.module.css'
import shared from './shared.module.css'

export interface RevealProps {
  term: Term
  progress: number
  xp: number
  onContinue: () => void
  onClose: () => void
}

/**
 * The full answer. No Figma frame.
 *
 * Reached two ways: a second miss, or skip. Skip means reveal rather than a blank
 * pass, so nothing is wasted when a student says they do not know. Both routes
 * land here and the summary counts both as revealed.
 *
 * Framed as normal, not as failure. No red, no "you got this wrong": the brief is
 * explicit that a false or harsh negative is more demoralising here than in
 * multiple choice, and this is the lowest point in the session.
 *
 * No `SentClip`. Arriving by skip means there is no clip at all, and showing one
 * on one route but not the other would make the screen inconsistent for no gain.
 *
 * The saved-to-review confirmation is the point of the screen beyond the answer
 * itself: it makes the summary's review list visibly earned instead of appearing
 * from nowhere at the end.
 */
export function Reveal({ term, progress, xp, onContinue, onClose }: RevealProps) {
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
        <div className={styles.prompt}>
          <Mascot mood="standby" size="M" />
          <MessageBubble
            variant="default"
            heading={LOOP_COPY.reveal.heading}
            message={term.answer}
            showTail
          />
        </div>

        <p className={styles.saved}>
          <svg
            className={styles.savedIcon}
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden
          >
            <path
              d="M3 8.5L6 11.5L13 4.5"
              stroke="var(--text-secondary)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {LOOP_COPY.reveal.savedNote}
        </p>
      </div>
    </Scaffold>
  )
}
