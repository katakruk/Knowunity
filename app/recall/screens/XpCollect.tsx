'use client'

import React from 'react'
import { Button } from '@/components/Button'
import { Scaffold } from '@/components/Scaffold'
import { StatusBar } from '@/components/StatusBar'
import { XP_COPY } from '../content'
import styles from './XpCollect.module.css'
import shared from './shared.module.css'

export interface XpCollectProps {
  /** Total earned this session. */
  amount: number
  /** Terms explained unaided, which is what earned it. */
  unaided: number
  onCollect: () => void
}

/**
 * XP earned this session, animating in. No Figma frame.
 *
 * XP is a bonus for unaided terms, never a cost for hints: every term earns and
 * unaided earns more. Framed as gain so taking a hint never feels like losing
 * something, because a student protecting a number will guess instead of asking
 * for help, straight into the fail path hints exist to prevent.
 *
 * The note names what earned it. A number with no explanation invites the student
 * to work out the rule themselves, and the rule they infer is usually harsher than
 * the real one.
 *
 * This is the one moment XP is the loudest thing on screen. During the loop it
 * stays a small counter in `RecallHeader` so it does not compete with the recall,
 * which is the brief's own worry about the mechanic.
 */
export function XpCollect({ amount, unaided, onCollect }: XpCollectProps) {
  // Counts up rather than appearing, so the number is watched. Honours reduced
  // motion by landing on the total immediately instead of animating to it.
  const [shown, setShown] = React.useState(() => {
    if (typeof window === 'undefined') return amount
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? amount : 0
  })

  React.useEffect(() => {
    if (shown === amount) return
    const step = Math.max(1, Math.round(amount / 20))
    const id = window.setInterval(() => {
      setShown((v) => {
        const next = v + step
        if (next >= amount) {
          window.clearInterval(id)
          return amount
        }
        return next
      })
    }, 40)
    return () => window.clearInterval(id)
    // Runs once per amount; `shown` is deliberately not a dependency.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount])

  return (
    <Scaffold
      chrome={<StatusBar />}
      footer={
        <Button variant="Primary" size="L" className={shared.cta} onClick={onCollect}>
          {XP_COPY.collect}
        </Button>
      }
    >
      <div className={styles.root}>
        <p className={styles.heading}>{XP_COPY.heading}</p>
        <p className={styles.amount}>
          <svg className={styles.bolt} viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M13 2L4 14h6l-1 8 9-12h-6l1-8z"
              fill="var(--accent-brand-bold)"
            />
          </svg>
          {shown}
        </p>
        <p className={styles.note}>{XP_COPY.note(unaided)}</p>
      </div>
    </Scaffold>
  )
}
