'use client'

import React from 'react'
import { Button } from '@/components/Button'
import { Mascot } from '@/components/Mascot'
import { Scaffold } from '@/components/Scaffold'
import { StatusBar } from '@/components/StatusBar'
import { SUCCESS_COPY } from '../content'
import styles from './Success.module.css'
import shared from './shared.module.css'

/** How a term ended. Skipped folds into revealed, per sprint-context.md. */
export type TermOutcome = 'unaided' | 'hinted' | 'revealed'

export interface SessionResult {
  outcomes: TermOutcome[]
  /**
   * Terms the student could not explain at first and could by the end. Needs
   * per-term history, not just the final outcome, which is why it is passed in
   * rather than derived from `outcomes`.
   */
  recovered: number
  /** Question text for the terms on the review list, in session order. */
  reviewTerms: { question: string; outcome: Exclude<TermOutcome, 'unaided'> }[]
}

export interface SuccessProps {
  result: SessionResult
  onContinue: () => void
  onTryAgain: () => void
}

function count(outcomes: TermOutcome[], kind: TermOutcome) {
  return outcomes.filter((o) => o === kind).length
}

/**
 * End of session. No Figma frame.
 *
 * Three headline variants, because "what changed" says nothing in two of the three
 * possible sessions:
 *
 * - Mixed: leads with the terms that moved from missed to explained, which rewards
 *   the student who struggled and recovered.
 * - Clean run: every term unaided first try, so there is no shift to name and the
 *   claim becomes the clean run itself.
 * - Nothing unaided: claims the attempt rather than the result. This variant makes
 *   no mastery claim, which is the part of the brief it cannot satisfy, and that is
 *   deliberate: asserting mastery here would be the flattery the brief warns about.
 *
 * The breakdown is the evidence for whichever claim the headline makes. The review
 * list is filled by outcome, never by unaided terms, and it is framed as things to
 * do next rather than things that went wrong.
 *
 * No `RecallHeader`: the session is over, so a progress bar and a close button have
 * nothing left to do.
 */
export function Success({ result, onContinue, onTryAgain }: SuccessProps) {
  const total = result.outcomes.length
  const unaided = count(result.outcomes, 'unaided')
  const hinted = count(result.outcomes, 'hinted')
  const revealed = count(result.outcomes, 'revealed')

  const variant =
    unaided === total ? 'clean' : unaided === 0 ? 'none' : 'mixed'

  const copy = SUCCESS_COPY[variant]
  const body =
    variant === 'clean'
      ? SUCCESS_COPY.clean.body(total)
      : variant === 'mixed'
        ? SUCCESS_COPY.mixed.body(result.recovered)
        : SUCCESS_COPY.none.body()

  return (
    <Scaffold
      chrome={<StatusBar />}
      footer={
        <div className={styles.actions}>
          <Button variant="Primary" size="L" className={shared.cta} onClick={onContinue}>
            {SUCCESS_COPY.continue}
          </Button>
          {/* Replays only the terms that needed help, so it is not a comparable
              session and its summary cannot make the same claim. */}
          {unaided < total && (
            <Button variant="Secondary" size="L" className={shared.cta} onClick={onTryAgain}>
              {SUCCESS_COPY.tryAgain}
            </Button>
          )}
        </div>
      }
    >
      <div className={styles.root}>
        <div className={styles.header}>
          <Mascot mood="excited" size="L" />
          <h1 className={styles.heading}>{copy.heading}</h1>
          <p className={styles.body}>{body}</p>
        </div>

        <div className={styles.breakdown}>
          <div className={`${styles.row} ${styles.rowLead}`}>
            <span className={styles.rowLabel}>{SUCCESS_COPY.breakdown.unaided}</span>
            <span className={styles.rowValue}>
              {unaided} of {total}
            </span>
          </div>
          <div className={styles.row}>
            <span className={styles.rowLabel}>{SUCCESS_COPY.breakdown.hinted}</span>
            <span className={styles.rowValue}>{hinted}</span>
          </div>
          <div className={styles.row}>
            {/* Skipped terms are inside this count, not a category of their own. */}
            <span className={styles.rowLabel}>{SUCCESS_COPY.breakdown.revealed}</span>
            <span className={styles.rowValue}>{revealed}</span>
          </div>
        </div>

        {result.reviewTerms.length > 0 && (
          <div className={styles.review}>
            <h2 className={styles.reviewTitle}>{SUCCESS_COPY.reviewTitle}</h2>
            <ul className={styles.reviewList}>
              {result.reviewTerms.map((t) => (
                <li key={t.question} className={styles.reviewItem}>
                  <span className={styles.reviewTag}>
                    {t.outcome === 'hinted'
                      ? SUCCESS_COPY.breakdown.hinted
                      : SUCCESS_COPY.breakdown.revealed}
                  </span>
                  {t.question}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Scaffold>
  )
}
