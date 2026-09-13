'use client'

import React from 'react'
import styles from './RecordingTimer.module.css'

export interface RecordingTimerProps {
  /** Elapsed time string, e.g. "0:23". */
  time?: string
  /** Whether recording is active (plays the ripple animation). */
  isRecording?: boolean
}

/**
 * Animated recording state indicator used on the Recording screen.
 * Shows elapsed time in the centre; expanding ripple circles convey
 * that the microphone is live.
 *
 * Animation design from project_recording_animation memory:
 * - 3 ripple circles, 240px container
 * - scale 0.6→1, opacity 1→0, ease-out, 2s, staggered 0.5s apart
 *
 * Token bindings (approximated from memory — uses primitive-layer colours
 * because no semantic token covers "recording pulse"):
 * - Ripple: accent.brand.subtle at 0.2 opacity
 * - Timer text: text.primary
 */
export function RecordingTimer({ time = '0:00', isRecording = true }: RecordingTimerProps) {
  return (
    <div className={styles.root} aria-label={`Recording time: ${time}`} role="timer">
      {isRecording && (
        <>
          <div className={`${styles.ripple} ${styles.ripple1}`} aria-hidden />
          <div className={`${styles.ripple} ${styles.ripple2}`} aria-hidden />
          <div className={`${styles.ripple} ${styles.ripple3}`} aria-hidden />
        </>
      )}
      <div className={styles.time}>{time}</div>
    </div>
  )
}
