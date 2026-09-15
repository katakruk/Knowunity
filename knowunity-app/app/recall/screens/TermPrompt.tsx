'use client'

import React from 'react'
import { CircularButton } from '@/components/CircularButton'
import { Mascot } from '@/components/Mascot'
import { MessageBubble } from '@/components/MessageBubble'
import { RecallHeader } from '@/components/RecallHeader'
import { Scaffold } from '@/components/Scaffold'
import { StatusBar } from '@/components/StatusBar'
import { TextLink } from '@/components/TextLink'
import { LOOP_COPY, type Term } from '../content'
import styles from './TermPrompt.module.css'

/** Which instance of the attempt cycle this is. Only the bubble content differs. */
export type PromptVariant = 'first' | 'retry' | 'hint'

export interface TermPromptProps {
  term: Term
  variant: PromptVariant
  progress: number
  xp: number
  onRecord: () => void
  /** Skip goes to the reveal, not past the term. Skip means reveal. */
  onSkip: () => void
  onClose: () => void
}

function bubbleMessage(term: Term, variant: PromptVariant): string {
  // The blank line is in the Figma frames: lead-in, gap, question. Rendered via
  // `white-space: pre-line` because MessageBubble takes a single string.
  if (variant === 'first') return `${LOOP_COPY.leadFirst}\n\n${term.question}`
  if (variant === 'retry') return `${LOOP_COPY.leadRetry}\n\n${term.question}`
  return `${term.question}\n\n${term.hint}`
}

/**
 * The resting state of every term: Knowie has asked, the mic is idle.
 *
 * Figma: Term Prompt (13610:10191), Try again / Term Prompt (13644:14133),
 * Hint / Prompt (13610:10217), Next Term Prompt (13610:10242). One layout, and
 * the variant only changes what is in the bubble.
 *
 * Skip is offered on the first and retry instances. The hint frame does not draw
 * it, and that is followed here: once a hint is on screen the student has a way
 * forward that is not skipping.
 */
export function TermPrompt({
  term,
  variant,
  progress,
  xp,
  onRecord,
  onSkip,
  onClose,
}: TermPromptProps) {
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
          <p className={styles.tapToSpeak}>{LOOP_COPY.tapToSpeak}</p>
          <CircularButton
            label="Start recording"
            size="L"
            icon="Mic"
            onClick={onRecord}
          />
        </div>
      }
    >
      <div className={styles.root}>
        <div className={styles.prompt}>
          {/* Figma draws 84px here. The component has S=40, M=64, L=120 and the
              illustration token scale has no 84 either, so Figma is off-scale and
              M is the nearest step. */}
          <Mascot mood="standby" size="M" />
          <MessageBubble
            className={styles.promptBubble}
            message={bubbleMessage(term, variant)}
            showTail
          />
        </div>

        {variant !== 'hint' && (
          <TextLink align="end" onClick={onSkip}>
            {LOOP_COPY.skip}
          </TextLink>
        )}
      </div>
    </Scaffold>
  )
}
