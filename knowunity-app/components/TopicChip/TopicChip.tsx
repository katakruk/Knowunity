'use client'

import React from 'react'
import styles from './TopicChip.module.css'
import { FlashcardIcon, QuizIcon, NoteIcon, SummaryIcon, MicSmallIcon } from '../icons'

export type TopicChipType = 'flashcard' | 'quiz' | 'note' | 'summary' | 'activeRecall'

const ICONS: Record<TopicChipType, React.ComponentType<{ className?: string }> | null> = {
  flashcard: FlashcardIcon,
  quiz: QuizIcon,
  note: NoteIcon,
  summary: SummaryIcon,
  // Was null, which contradicted this component's own documented behaviour and the
  // Figma frame: Speak to Learn is drawn with a mic. Fixed 2026-09-14.
  activeRecall: MicSmallIcon,
}

export interface TopicChipProps {
  /** Display label shown inside the chip. */
  label: string
  /** Icon variant. activeRecall renders the mic icon inline. */
  type?: TopicChipType
  active?: boolean
  onClick?: () => void
}

/**
 * Scrollable study mode chip on the Main Screen.
 * Figma: topic chip (13593:4659 etc).
 */
export function TopicChip({ label, type, active = false, onClick }: TopicChipProps) {
  const Icon = type ? ICONS[type] : null
  return (
    <button
      type="button"
      className={[styles.root, active ? styles.active : ''].filter(Boolean).join(' ')}
      onClick={onClick}
    >
      {Icon && <Icon className={styles.icon} />}
      <span className={styles.label}>{label}</span>
    </button>
  )
}
