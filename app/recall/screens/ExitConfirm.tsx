'use client'

import React from 'react'
import { Button } from '@/components/Button'
import { LOOP_COPY } from '../content'
import styles from './ExitConfirm.module.css'
import shared from './shared.module.css'

export interface ExitConfirmProps {
  /**
   * True when a recording exists that the student never sent. Changes the copy,
   * because the promise has to be precise about what is not kept.
   */
  hasUnsentRecording?: boolean
  onLeave: () => void
  onStay: () => void
}

/**
 * Confirmation before leaving mid-session. No Figma frame.
 *
 * An overlay rather than a screen: it appears over whatever the student was
 * doing, because that is the thing they are deciding whether to abandon.
 *
 * Built here rather than as a component: no dialog or sheet exists in the library
 * and this is the first thing to need one. Logged in component-gaps.md, so the
 * second thing that needs a sheet promotes it properly.
 *
 * Two copy variants. Progress saves either way, but an unsent recording does not,
 * and the dialog says so rather than making a blanket promise it cannot keep.
 * Discarding it is not a broken promise: the student never sent it, and keeping or
 * auto-sending would act against their intent.
 *
 * Staying is primary and comes first. The dialog exists to prevent accidental
 * loss, not to speed up leaving, and leaving is still one tap away.
 */
export function ExitConfirm({ hasUnsentRecording = false, onLeave, onStay }: ExitConfirmProps) {
  const headingId = 'exit-confirm-heading'
  const bodyId = 'exit-confirm-body'

  return (
    <div className={styles.scrim}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        aria-describedby={bodyId}
        className={styles.sheet}
      >
        <h2 id={headingId} className={styles.heading}>
          {LOOP_COPY.exit.heading}
        </h2>
        <p id={bodyId} className={styles.body}>
          {hasUnsentRecording ? LOOP_COPY.exit.unsentBody : LOOP_COPY.exit.body}
        </p>

        <div className={styles.actions}>
          <Button variant="Primary" size="L" className={shared.cta} onClick={onStay}>
            {LOOP_COPY.exit.stay}
          </Button>
          <Button variant="Secondary" size="L" className={shared.cta} onClick={onLeave}>
            {LOOP_COPY.exit.leave}
          </Button>
        </div>
      </div>
    </div>
  )
}
