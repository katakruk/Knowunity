'use client'

import React from 'react'
import styles from './ChatInput.module.css'
import { PlusIcon, MicSmallIcon } from '../icons'

export interface ChatInputProps {
  placeholder?: string
  onPlusClick?: () => void
  onMicClick?: () => void
  /** Value for the text input (controlled). */
  value?: string
  onChange?: (value: string) => void
}

/**
 * Chat input bar at the bottom of the Main Screen.
 * Figma: Chat Input (13610:10179 area).
 *
 * Left: + button (opens tools/attachments).
 * Centre: text input ("Ask anything...").
 * Right: microphone button.
 */
export function ChatInput({
  placeholder = 'Ask anything...',
  onPlusClick,
  onMicClick,
  value,
  onChange,
}: ChatInputProps) {
  return (
    <div className={styles.root}>
      <button type="button" className={styles.plusBtn} aria-label="Add" onClick={onPlusClick}>
        <PlusIcon className={styles.plusIcon} aria-hidden />
      </button>
      <input
        type="text"
        className={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange?.(e.target.value)}
        aria-label={placeholder}
      />
      <button type="button" className={styles.micBtn} aria-label="Voice input" onClick={onMicClick}>
        <MicSmallIcon className={styles.micIcon} aria-hidden />
      </button>
    </div>
  )
}
