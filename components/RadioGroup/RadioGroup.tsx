'use client'

import React from 'react'

export interface RadioGroupProps {
  /**
   * Accessible name for the group. Required: an unnamed radiogroup tells a
   * screen reader nothing about what is being chosen.
   */
  label: string
  /** The radio rows. `TopicPromo` renders `role="radio"` and belongs here. */
  children: React.ReactNode
  className?: string
}

/**
 * Wrapper that turns a list of radio rows into a named radio group.
 *
 * `TopicPromo` renders `role="radio"` and its docs require consumers to wrap it
 * in an element with `role="radiogroup"` and an accessible name. This is that
 * wrapper. It has no styling of its own so the consuming screen keeps control
 * of layout and spacing.
 */
export function RadioGroup({ label, children, className }: RadioGroupProps) {
  return (
    <div role="radiogroup" aria-label={label} className={className}>
      {children}
    </div>
  )
}
