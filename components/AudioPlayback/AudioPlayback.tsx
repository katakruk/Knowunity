'use client'

import React from 'react'
import styles from './AudioPlayback.module.css'

export interface AudioPlaybackProps {
  /** Whether the audio is currently playing. Controls the icon. */
  isPlaying?: boolean
  /** Called when the play/pause button is tapped. */
  onToggle?: () => void
  className?: string
}

/**
 * Playback control for a user's recorded voice response.
 * Used on the Review Audio and Processing screens.
 * Figma: Audio Playback (design-system.md lines 281-304).
 *
 * Token bindings:
 * - Background: background.surface
 * - Corner radius: radius.400
 */
export function AudioPlayback({ isPlaying = false, onToggle, className }: AudioPlaybackProps) {
  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')}>
      <button
        type="button"
        className={styles.playBtn}
        aria-label={isPlaying ? 'Pause recording' : 'Play recording'}
        onClick={onToggle}
      >
        {isPlaying ? (
          /* Pause icon */
          <svg viewBox="0 0 16 16" fill="none" aria-hidden width="16" height="16">
            <rect x="3" y="2" width="3.5" height="12" rx="1" fill="currentColor"/>
            <rect x="9.5" y="2" width="3.5" height="12" rx="1" fill="currentColor"/>
          </svg>
        ) : (
          /* Play triangle */
          <svg viewBox="0 0 16 16" fill="none" aria-hidden width="16" height="16">
            <path d="M3 2.5L13.5 8L3 13.5V2.5Z" fill="currentColor"/>
          </svg>
        )}
      </button>
      <div className={styles.waveform} aria-hidden>
        <div className={styles.waveTrack} />
      </div>
    </div>
  )
}
