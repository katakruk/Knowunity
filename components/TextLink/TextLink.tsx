'use client'

import React from 'react'
import styles from './TextLink.module.css'

type NativeButtonProps = Omit<React.ComponentPropsWithoutRef<'button'>, 'children'>

export interface TextLinkProps extends NativeButtonProps {
  /** The label. Sentence case, per design-system.md. */
  children: React.ReactNode
  /** Which end of the container it sits at. Figma right-aligns both current uses. */
  align?: 'start' | 'end'
}

/**
 * A bare text action: label only, no pill and no fill.
 *
 * Built as a component on its second use. "Show more" on topic selection and
 * "Skip this question" in the recall loop both needed it, and two screens
 * hand-rolling the same thing is how a design system rots.
 *
 * Not a Figma component: the frames draw these as loose text nodes. Deliberately
 * not `Button variant="Tertiary"`, which still draws a pill and a pressed fill.
 *
 * The label is small but the touch target is not: 44px minimum, since there is no
 * hover on mobile to compensate.
 */
export function TextLink({ children, align = 'start', className, type = 'button', ...rest }: TextLinkProps) {
  return (
    <button
      type={type}
      className={[styles.root, align === 'end' ? styles.alignEnd : '', className]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </button>
  )
}
