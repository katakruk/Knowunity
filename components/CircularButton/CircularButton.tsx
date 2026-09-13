'use client'

import React from 'react'
import styles from './CircularButton.module.css'
import { DeleteIcon, MicIcon, PauseIcon, SendIcon } from '../icons'

/** Figma variant axis `Size`. */
export type CircularButtonSize = 'S' | 'L'
/**
 * Figma variant axis `State`.
 *
 * Figma's L pressed variant is misnamed `State=Presse`. design-system.md spells
 * it Pressed and lists exactly these two, so the typo is treated as a typo.
 */
export type CircularButtonState = 'Default' | 'Pressed'
/** Figma instance-swap property `icon`, limited to the four glyphs the slot offers. */
export type CircularButtonIcon = 'Mic' | 'Delete' | 'Send' | 'Pause'

type NativeButtonProps = Omit<
  React.ComponentPropsWithoutRef<'button'>,
  'children' | 'disabled' | 'aria-label'
>

export interface CircularButtonProps extends NativeButtonProps {
  /**
   * What the button does, for screen readers. Required: this button is a glyph
   * with no text, so without it the control is unnamed.
   */
  label: string
  /** Figma `Size`. S for secondary recording actions, L for the one primary action. */
  size?: CircularButtonSize
  /**
   * Figma `State`. `Pressed` holds the press styling open for documentation; a
   * real touch reaches it through `:active` on its own, so leave this alone in
   * product code.
   */
  state?: CircularButtonState
  /** Figma `icon`. */
  icon?: CircularButtonIcon
}

const ICONS: Record<CircularButtonIcon, React.ComponentType<{ className?: string }>> = {
  Mic: MicIcon,
  Delete: DeleteIcon,
  Send: SendIcon,
  Pause: PauseIcon,
}

const sizeClass: Record<CircularButtonSize, string> = {
  S: styles.sizeS,
  L: styles.sizeL,
}

export function CircularButton({
  label,
  size = 'S',
  state = 'Default',
  icon = 'Mic',
  className,
  type = 'button',
  ...rest
}: CircularButtonProps) {
  const Icon = ICONS[icon]

  return (
    <button
      type={type}
      aria-label={label}
      data-pressed={state === 'Pressed' ? '' : undefined}
      className={[styles.root, sizeClass[size], className].filter(Boolean).join(' ')}
      {...rest}
    >
      <Icon className={styles.icon} />
    </button>
  )
}

/**
 * The class that repaints the button with the bindings documented in
 * design-system.md, for the side-by-side comparison story only. Not part of the
 * component's API.
 */
export const DOC_BINDING_CLASS = styles.docBinding
