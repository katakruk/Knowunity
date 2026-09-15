'use client'

import React from 'react'
import { AudioPlayback } from '@/components/AudioPlayback'
import styles from './SentClip.module.css'

export interface SentClipProps {
  className?: string
}

/**
 * The answer the student just sent, shown as their side of the exchange.
 *
 * Right-aligned and narrower than the full-width playback bar on review audio.
 * That difference is the point: on review the bar is still actionable, here it is
 * a record of what was submitted, and it stays on screen through processing and
 * into the verdict so the student can play back what they said while reading how
 * it was judged.
 *
 * Figma: the playback row at the top of Processing (13612:11949) and of every
 * feedback frame, e.g. Feedback Positive (13610:10406).
 *
 * Built as a component on its second use, once the feedback screens needed the
 * same thing processing already had. Owns its own play state, since nothing above
 * it cares whether the clip is playing.
 */
export function SentClip({ className }: SentClipProps) {
  const [isPlaying, setIsPlaying] = React.useState(false)

  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')}>
      <AudioPlayback
        className={styles.player}
        isPlaying={isPlaying}
        onToggle={() => setIsPlaying((p) => !p)}
      />
    </div>
  )
}
