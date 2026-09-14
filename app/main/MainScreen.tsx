'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { BottomNavbar } from '@/components/BottomNavbar'
import { ChatInput } from '@/components/ChatInput'
import { Mascot } from '@/components/Mascot'
import { MessageBubble } from '@/components/MessageBubble'
import { Scaffold } from '@/components/Scaffold'
import { StatusBar } from '@/components/StatusBar'
import { TextLink } from '@/components/TextLink'
import { TopNavigation } from '@/components/TopNavigation'
import { TopicChip } from '@/components/TopicChip'
import { MAIN_COPY, SESSION_LENGTH, TOPICS } from '../recall/content'
import styles from './MainScreen.module.css'

/**
 * How Speak to Learn is presented.
 *
 * `focal` for a student who has not tried it enough times yet, `chip` once it has
 * been shown often enough to have become noise. The trigger is impression count,
 * not completion: a prompt someone has repeatedly ignored has stopped working
 * whether or not they ever tried it.
 */
export type PromoState = 'focal' | 'chip'

export interface MainScreenProps {
  promo?: PromoState
  /** Topic of an unfinished session, if there is one. */
  resumeTopic?: string
  /** Terms already resolved in that session. */
  resumeProgress?: number
}

/**
 * The AI chat main screen, and the only entry point to active recall.
 *
 * Figma: Main Screen (13610:10167).
 *
 * Speak to Learn is the same `TopicChip` in both states, just positioned
 * differently: centred under a mascot and headline while it is focal, and in the
 * rail once it is demoted. SPEC.md called the focal version a new card; the frame
 * shows it is not.
 *
 * An unfinished session comes back as a message from Knowie in the thread. A
 * completed one leaves nothing here, deliberately: the summary was the ending.
 */
export function MainScreen({ promo = 'focal', resumeTopic, resumeProgress = 0 }: MainScreenProps) {
  const router = useRouter()
  const start = () => router.push('/recall')

  return (
    <Scaffold
      chrome={
        <>
          <StatusBar />
          <TopNavigation xp={2} streakDays={3} />
        </>
      }
      footer={
        <div className={styles.bottom}>
          <div className={styles.rail}>
            {promo === 'chip' && (
              <TopicChip label={MAIN_COPY.speakToLearn} type="activeRecall" onClick={start} />
            )}
            <TopicChip label="Flashcards" type="flashcard" />
            <TopicChip label="Quiz" type="quiz" />
            <TopicChip label="Notes" type="note" />
            <TopicChip label="Summary" type="summary" />
          </div>

          <ChatInput placeholder={MAIN_COPY.chatPlaceholder} />

          <div className={styles.navbar}>
            <BottomNavbar active="knowie" />
          </div>
        </div>
      }
    >
      <div className={styles.root}>
        {resumeTopic ? (
          <div className={styles.thread}>
            <div className={styles.message}>
              <Mascot mood="standby" size="S" />
              <MessageBubble
                message={MAIN_COPY.resume(resumeTopic, resumeProgress, SESSION_LENGTH)}
                showTail
              />
            </div>
            <div className={styles.resumeAction}>
              <TextLink onClick={start}>{MAIN_COPY.resumeCta}</TextLink>
            </div>
          </div>
        ) : promo === 'focal' ? (
          <div className={styles.focal}>
            <Mascot mood="standby" size="L" />
            <h1 className={styles.headline}>{MAIN_COPY.headline}</h1>
            <TopicChip label={MAIN_COPY.speakToLearn} type="activeRecall" onClick={start} />
            <p className={styles.subtitle}>{MAIN_COPY.subtitle}</p>
          </div>
        ) : null}
      </div>
    </Scaffold>
  )
}

/** The written topic, used as the resume example. */
export const DEMO_RESUME_TOPIC = TOPICS[0].name
