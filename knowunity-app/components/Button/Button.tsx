'use client'

import React from 'react'
import styles from './Button.module.css'
import { SlotIcon } from './SlotIcon'

/** Figma variant axis `variant`. */
export type ButtonVariant = 'Primary' | 'Secondary' | 'Tertiary'
/** Figma variant axis `size`. */
export type ButtonSize = 'S' | 'M' | 'L'
/** Figma variant axis `state`. */
export type ButtonState = 'Default' | 'Pressed' | 'Disabled' | 'Loading'

type NativeButtonProps = Omit<
  React.ComponentPropsWithoutRef<'button'>,
  'children' | 'disabled' | 'aria-busy'
>

export interface ButtonProps extends NativeButtonProps {
  /** Figma `variant`. */
  variant?: ButtonVariant
  /** Figma `size`. */
  size?: ButtonSize
  /**
   * Figma `state`. `Pressed` holds the press styling open for documentation;
   * a real touch reaches the same styling through `:active` on its own, so
   * leave this at `Default` in product code and set it only for `Disabled`
   * and `Loading`.
   */
  state?: ButtonState
  /** Figma boolean property `showLeftIcon`. */
  showLeftIcon?: boolean
  /** Figma boolean property `showRightIcon`. */
  showRightIcon?: boolean
  /** What goes in the left `iconSlot`. Falls back to the slot's Figma default. */
  leftIcon?: React.ReactNode
  /** What goes in the right `iconSlot`. Falls back to the slot's Figma default. */
  rightIcon?: React.ReactNode
  /** Figma text property `CTA`. One or two words, sentence case. */
  children: React.ReactNode
}

const variantClass: Record<ButtonVariant, string> = {
  Primary: styles.variantPrimary,
  Secondary: styles.variantSecondary,
  Tertiary: styles.variantTertiary,
}

const sizeClass: Record<ButtonSize, string> = {
  S: styles.sizeS,
  M: styles.sizeM,
  L: styles.sizeL,
}

function IconSlot({ children }: { children: React.ReactNode }) {
  if (children === undefined || children === null || children === false) {
    return <SlotIcon className={styles.icon} />
  }
  return <span className={styles.icon}>{children}</span>
}

export function Button({
  variant = 'Primary',
  size = 'L',
  state = 'Default',
  showLeftIcon = false,
  showRightIcon = false,
  leftIcon,
  rightIcon,
  children,
  className,
  type = 'button',
  ...rest
}: ButtonProps) {
  const isPressed = state === 'Pressed'
  const isDisabled = state === 'Disabled'
  const isLoading = state === 'Loading'

  return (
    <button
      type={type}
      // Loading blocks input the same way Disabled does; the CSS tells the two
      // apart via aria-busy so Loading keeps its own colours.
      disabled={isDisabled || isLoading}
      aria-busy={isLoading || undefined}
      data-pressed={isPressed ? '' : undefined}
      className={[styles.touchTarget, variantClass[variant], sizeClass[size], className]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      <span className={styles.pill}>
        {/* Loading collapses to the spinner alone, matching the Figma Loading
            variants where Label and both icon slots are off and only the
            Center Icon Container is on. */}
        {isLoading ? <SlotIcon className={`${styles.icon} ${styles.spinner}`} /> : null}
        {!isLoading && showLeftIcon ? <IconSlot>{leftIcon}</IconSlot> : null}
        <span className={isLoading ? `${styles.label} ${styles.labelHidden}` : styles.label}>
          {children}
        </span>
        {!isLoading && showRightIcon ? <IconSlot>{rightIcon}</IconSlot> : null}
      </span>
    </button>
  )
}
