'use client'

import React from 'react'
import styles from './MessageBubble.module.css'

export type MessageBubbleVariant = 'default' | 'success' | 'almost'

export interface MessageBubbleProps {
  /** Main message body. */
  message: string
  /** Optional heading shown in bold above the message. */
  heading?: string
  /** Visual style. success = green heading + check icon; almost = bold heading. */
  variant?: MessageBubbleVariant
  /** Show the triangular tail pointing left toward Knowie. Default true. */
  showTail?: boolean
  className?: string
}

/**
 * Knowie's speech bubble. Pairs with Mascot when Knowie is speaking.
 * Figma: Message Bubble (design-system.md lines 217-242).
 *
 * Token bindings:
 * - Background: background.surface
 * - Text: text.primary
 * - Heading (success): feedback.success.bold
 */
export function MessageBubble({
  message,
  heading,
  variant = 'default',
  showTail = true,
  className,
}: MessageBubbleProps) {
  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')}>
      {showTail && <div className={styles.tail} aria-hidden />}
      <div className={styles.content}>
        {heading && (
          <div className={[styles.heading, styles[`heading_${variant}`]].join(' ')}>
            {variant === 'success' && (
              <span className={styles.checkIcon} aria-hidden>
                <svg viewBox="0 0 20 20" fill="none" width="20" height="20">
                  <rect width="20" height="20" rx="4" fill="var(--feedback-success-bold)"/>
                  <path d="M5 10L8.5 13.5L15 7" stroke="var(--feedback-success-on-bold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            )}
            {heading}
          </div>
        )}
        <p className={styles.message}>{message}</p>
      </div>
    </div>
  )
}
