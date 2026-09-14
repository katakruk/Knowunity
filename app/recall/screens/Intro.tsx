'use client'

import React from 'react'
import { Button } from '@/components/Button'
import { Mascot } from '@/components/Mascot'
import { RecallHeader } from '@/components/RecallHeader'
import { Scaffold } from '@/components/Scaffold'
import { StatusBar } from '@/components/StatusBar'
import { INTRO_COPY } from '../content'
import styles from './Intro.module.css'
import shared from './shared.module.css'

export interface IntroProps {
  onContinue: () => void
  onClose: () => void
}

/**
 * First-run education. Figma: First-Run Education (13610:10462).
 *
 * Deliberately has no MessageBubble. The frame is a centred mascot with a
 * headline and a paragraph, not Knowie speaking from a bubble. SPEC.md listed
 * one; the frame is the authority.
 *
 * RecallHeader is on this frame. Progress has nothing to count yet because no
 * topic is chosen, so it sits at 0 as it does on topic selection.
 *
 * Shown once ever, one CTA, no skip control: with text this short there is
 * nothing to skip and no reason to tell reading from skipping apart.
 */
export function Intro({ onContinue, onClose }: IntroProps) {
  return (
    <Scaffold
      chrome={
        <>
          <StatusBar />
          <RecallHeader progress={0} xp={0} onClose={onClose} />
        </>
      }
      footer={
        <Button variant="Primary" size="L" className={shared.cta} onClick={onContinue}>
          {INTRO_COPY.cta}
        </Button>
      }
    >
      <div className={styles.root}>
        <Mascot mood="standby" size="L" />
        <div className={styles.text}>
          <h1 className={styles.heading}>{INTRO_COPY.heading}</h1>
          <p className={styles.body}>{INTRO_COPY.body}</p>
        </div>
      </div>
    </Scaffold>
  )
}
