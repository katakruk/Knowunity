'use client'

import React from 'react'
import styles from './TopicPromo.module.css'
import { TopicIcon, CheckGlyph } from './TopicIcon'

export type TopicPromoState = 'Selected' | 'Unselected'

export interface TopicPromoProps {
  /** Figma `topic`. The topic name shown in the row. */
  topic: string
  /** Figma `State`. Whether this row is the chosen topic for the session. */
  state?: TopicPromoState
  onClick?: () => void
}

/**
 * Single-select topic row for the Topic Selection screen. One topic per session,
 * so rows behave as radio buttons, not filters.
 *
 * Figma: Topic Promo (13646:15298).
 *
 * Renders as `role="radio"`, so consumers must wrap a list of these in an
 * element with `role="radiogroup"` and an accessible name.
 */
export function TopicPromo({ topic, state = 'Unselected', onClick }: TopicPromoProps) {
  const isSelected = state === 'Selected'
  return (
    <button
      type="button"
      role="radio"
      aria-checked={isSelected}
      className={[styles.root, isSelected ? styles.selected : ''].filter(Boolean).join(' ')}
      onClick={onClick}
    >
      <span className={styles.item}>
        <TopicIcon
          className={styles.icon}
          bodyClassName={styles.iconBody}
          detailClassName={styles.iconDetail}
        />
        <span
          className={[styles.label, isSelected ? styles.labelSelected : '']
            .filter(Boolean)
            .join(' ')}
        >
          {topic}
        </span>
        <span
          className={[
            styles.indicator,
            isSelected ? styles.indicatorSelected : styles.indicatorUnselected,
          ].join(' ')}
        >
          {isSelected && <CheckGlyph className={styles.check} />}
        </span>
      </span>
    </button>
  )
}
