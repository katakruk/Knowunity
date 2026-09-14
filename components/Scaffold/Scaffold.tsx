'use client'

import React from 'react'
import styles from './Scaffold.module.css'

export interface ScaffoldProps {
  /**
   * Edge-to-edge chrome at the top: StatusBar, and RecallHeader where the
   * screen has one. Gets no side padding.
   */
  chrome?: React.ReactNode
  /**
   * The thumb-zone strip at the bottom, for the screen's primary action.
   * Padded and clear of the home indicator.
   */
  footer?: React.ReactNode
  /** Screen content. Padded to the 16px screen margins. */
  children?: React.ReactNode
  className?: string
}

/**
 * The device shell every screen renders inside.
 *
 * Not a Figma component. `platform-constraints.md` refers to a `scaffold` in
 * the design system, but no such component exists in the file, so this is the
 * code-side equivalent: one place that owns the 390px canvas, the dark page
 * background, the safe areas and the screen margins.
 *
 * Safe area insets only resolve to real values because app/layout.tsx sets
 * `viewportFit: 'cover'`. Without that they are 0 and content sits under the
 * status bar.
 */
export function Scaffold({ chrome, footer, children, className }: ScaffoldProps) {
  return (
    <div className={styles.viewport}>
      <div className={[styles.root, className].filter(Boolean).join(' ')}>
        {chrome && <div className={styles.chrome}>{chrome}</div>}
        <div className={styles.content}>{children}</div>
        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </div>
  )
}
