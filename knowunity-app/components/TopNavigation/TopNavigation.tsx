'use client'

import React from 'react'
import styles from './TopNavigation.module.css'
import { MenuIcon, LightningIcon, FlameIcon } from '../icons'

export interface TopNavigationProps {
  /** XP points displayed next to the lightning bolt. */
  xp?: number
  /** Streak days displayed next to the flame. */
  streakDays?: number
  onMenuClick?: () => void
}

/**
 * Top navigation bar for the Main Screen.
 * Figma: topNavigation (13593:4299).
 *
 * Left: hamburger menu button.
 * Centre: PRO badge + XP counter + streak counter.
 * Right: clock/goals icon (placeholder).
 */
export function TopNavigation({ xp = 0, streakDays = 0, onMenuClick }: TopNavigationProps) {
  return (
    <div className={styles.root}>
      <button type="button" className={styles.iconBtn} aria-label="Open menu" onClick={onMenuClick}>
        <MenuIcon className={styles.icon} aria-hidden />
      </button>

      <div className={styles.chips}>
        <span className={styles.proBadge} aria-label="Upgrade to Pro">
          <span className={styles.proText}>PRO</span>
          <span className={styles.upgradeText}>Upgrade</span>
        </span>
        <span className={styles.counter} aria-label={`${xp} XP`}>
          <LightningIcon className={styles.xpIcon} aria-hidden />
          <span>{xp}</span>
        </span>
        <span className={styles.counter} aria-label={`${streakDays} day streak`}>
          <FlameIcon className={styles.flameIcon} aria-hidden />
          <span>{streakDays}</span>
        </span>
      </div>

      <button type="button" className={styles.iconBtn} aria-label="Daily goals">
        {/* Clock icon — placeholder */}
        <svg viewBox="0 0 24 24" fill="none" width="24" height="24" aria-hidden>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M12 7V12L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>
    </div>
  )
}
