'use client'

import React from 'react'
import styles from './RecallHeader.module.css'
import { LightningIcon } from '../icons'

export interface RecallHeaderProps {
  /** 0–1 fraction of the session completed. */
  progress?: number
  /** XP earned this session, shown next to the lightning bolt. */
  xp?: number
  /** Called when the × close button is tapped. */
  onClose?: () => void
}

/**
 * Top navigation bar for every screen in the active-recall loop.
 * Figma component: Progress Navigation (13596:4267).
 *
 * Left: × close button.
 * Centre: filled progress track with a leading dot.
 * Right: lightning bolt + XP count.
 */
export function RecallHeader({ progress = 0, xp = 0, onClose }: RecallHeaderProps) {
  const pct = Math.max(0, Math.min(1, progress))

  return (
    <div className={styles.root}>
      <button
        type="button"
        className={styles.closeBtn}
        aria-label="Close active recall"
        onClick={onClose}
      >
        ×
      </button>

      <div className={styles.track} role="progressbar" aria-label="Session progress" aria-valuenow={Math.round(pct * 100)} aria-valuemin={0} aria-valuemax={100}>
        <div className={styles.fill} style={{ width: `${pct * 100}%` }} />
        <div className={styles.dot} style={{ left: `calc(${pct * 100}% - 6px)` }} />
      </div>

      <div className={styles.xp}>
        <LightningIcon className={styles.lightning} aria-hidden />
        <span className={styles.xpValue}>{xp}</span>
      </div>
    </div>
  )
}
