'use client'

import React from 'react'
import { AudioPlayback } from '@/components/AudioPlayback'
import { CircularButton } from '@/components/CircularButton'
import { Mascot } from '@/components/Mascot'
import { MessageBubble } from '@/components/MessageBubble'
import { ProcessingAnimation } from '@/components/ProcessingAnimation'
import { RecallHeader } from '@/components/RecallHeader'
import { RecordingTimer } from '@/components/RecordingTimer'
import { Scaffold } from '@/components/Scaffold'
import { SentClip } from '@/components/SentClip'
import { StatusBar } from '@/components/StatusBar'
import { LOOP_COPY, type Term } from '../content'
import styles from './RecordingTurn.module.css'

export type TurnPhase = 'recording' | 'review' | 'processing'

export interface RecordingTurnProps {
  term: Term
  phase: TurnPhase
  progress: number
  xp: number
  /** Stop recording and go to review. */
  onStop: () => void
  /** Discard the take and go back to the prompt. */
  onDelete: () => void
  /** Keep recording onto the same take. */
  onResume: () => void
  /** Submit for judging. Never disabled. */
  onSend: () => void
  onClose: () => void
}

function formatElapsed(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

/**
 * One spoken turn: recording, reviewing the take, then waiting for the judge.
 *
 * Figma: Recording (13610:10268), Review Audio (13610:10339), Processing
 * (13612:11949), plus the Hint and Try again instances of the same three.
 *
 * Built as one screen because the primary control morphs in place rather than
 * being three separate controls. Pause becomes Send in the same spot.
 *
 * Push-to-talk with an explicit send: nothing is submitted without a tap, Send is
 * never disabled, and there is no auto-detection of when the student stopped
 * talking.
 */
export function RecordingTurn({
  term,
  phase,
  progress,
  xp,
  onStop,
  onDelete,
  onResume,
  onSend,
  onClose,
}: RecordingTurnProps) {
  // Elapsed time is real while recording. The clip itself is mocked, but a timer
  // that does not move would make the recording state ambiguous, which is the one
  // thing it cannot be.
  const [elapsed, setElapsed] = React.useState(0)
  const [isPlaying, setIsPlaying] = React.useState(false)

  React.useEffect(() => {
    if (phase !== 'recording') return
    const id = window.setInterval(() => setElapsed((s) => s + 1), 1000)
    return () => window.clearInterval(id)
  }, [phase])

  return (
    <Scaffold
      chrome={
        <>
          <StatusBar />
          <RecallHeader progress={progress} xp={xp} onClose={onClose} />
        </>
      }
      footer={
        phase === 'processing' ? undefined : (
          <div className={styles.controls}>
            <div className={styles.slotStart}>
              <CircularButton
                label="Delete recording"
                size="S"
                icon="Delete"
                onClick={onDelete}
              />
            </div>

            {phase === 'recording' ? (
              <CircularButton label="Stop recording" size="L" icon="Pause" onClick={onStop} />
            ) : (
              <CircularButton label="Send answer" size="L" icon="Send" onClick={onSend} />
            )}

            <div className={styles.slotEnd}>
              {phase === 'review' && (
                <CircularButton
                  label="Keep recording"
                  size="S"
                  icon="Mic"
                  onClick={onResume}
                />
              )}
            </div>
          </div>
        )
      }
    >
      <div className={styles.root}>
        {phase === 'processing' ? (
          <div className={styles.exchange}>
            <SentClip />
            <div className={styles.prompt}>
              {/* Processing draws 45px in Figma, unlike the 84px on recording and
                  review. S is the nearest step. */}
              <Mascot mood="standby" size="S" />
              <MessageBubble message={LOOP_COPY.considering} showTail />
            </div>
          </div>
        ) : (
          <div className={styles.prompt}>
            {/* 84px in Figma; the component has no 84 and neither does the
                illustration token scale, so M is the nearest step. */}
            <Mascot mood="standby" size="M" />
            <MessageBubble
              className={styles.promptBubble}
              message={`${LOOP_COPY.leadFirst}\n\n${term.question}`}
              showTail
            />
          </div>
        )}

        <div className={styles.status}>
          {phase === 'recording' && (
            <RecordingTimer time={formatElapsed(elapsed)} isRecording />
          )}
          {phase === 'processing' && <ProcessingAnimation />}
        </div>

        {phase === 'review' && (
          <div className={styles.playback}>
            <AudioPlayback isPlaying={isPlaying} onToggle={() => setIsPlaying((p) => !p)} />
          </div>
        )}
      </div>
    </Scaffold>
  )
}
