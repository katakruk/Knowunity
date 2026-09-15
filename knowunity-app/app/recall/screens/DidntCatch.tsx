'use client'

import React from 'react'
import { CircularButton } from '@/components/CircularButton'
import { Mascot } from '@/components/Mascot'
import { MessageBubble } from '@/components/MessageBubble'
import { RecallHeader } from '@/components/RecallHeader'
import { Scaffold } from '@/components/Scaffold'
import { StatusBar } from '@/components/StatusBar'
import { LOOP_COPY } from '../content'
import styles from './TermPrompt.module.css'

export interface DidntCatchProps {
  progress: number
  xp: number
  onRecordAgain: () => void
  onClose: () => void
}

/**
 * The clip was empty or under about a second. No Figma frame.
 *
 * Deliberately not a verdict. It does not count as an attempt, does not spend the
 * hint and does not move the progress bar, so a fumbled tap costs the student
 * nothing. `voice-ux.md` asks for a gentle "didn't catch that", and the copy is
 * written so nothing implies they were wrong: the app did not hear, rather than
 * the student did not know.
 *
 * `variant="default"` on the bubble, not `almost`: this is not a judgement, and
 * borrowing the miss styling would make it read as one.
 *
 * Reached through the full 5s processing wait rather than instantly, so it feels
 * like the app listened and came back, not like it rejected the tap.
 *
 * No `SentClip` here, unlike the feedback screens. There is no answer worth
 * replaying, and offering one would be odd.
 *
 * Reuses TermPrompt's layout module: identical structure, and the mic sits in the
 * same place so the student's thumb does not move.
 */
export function DidntCatch({ progress, xp, onRecordAgain, onClose }: DidntCatchProps) {
  return (
    <Scaffold
      chrome={
        <>
          <StatusBar />
          <RecallHeader progress={progress} xp={xp} onClose={onClose} />
        </>
      }
      footer={
        <div className={styles.micArea}>
          <p className={styles.tapToSpeak}>{LOOP_COPY.didntCatch.retry}</p>
          <CircularButton
            label="Record again"
            size="L"
            icon="Mic"
            onClick={onRecordAgain}
          />
        </div>
      }
    >
      <div className={styles.root}>
        <div className={styles.prompt}>
          <Mascot mood="standby" size="M" />
          <MessageBubble
            variant="default"
            heading={LOOP_COPY.didntCatch.heading}
            message={LOOP_COPY.didntCatch.body}
            showTail
          />
        </div>
      </div>
    </Scaffold>
  )
}
