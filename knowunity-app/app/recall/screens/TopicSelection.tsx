'use client'

import React from 'react'
import { Button } from '@/components/Button'
import { Mascot } from '@/components/Mascot'
import { MessageBubble } from '@/components/MessageBubble'
import { RadioGroup } from '@/components/RadioGroup'
import { RecallHeader } from '@/components/RecallHeader'
import { Scaffold } from '@/components/Scaffold'
import { StatusBar } from '@/components/StatusBar'
import { TextLink } from '@/components/TextLink'
import { TopicPromo } from '@/components/TopicPromo'
import { TOPICS, TOPIC_SELECTION_COPY, type TopicId } from '../content'
import styles from './TopicSelection.module.css'
import shared from './shared.module.css'

export interface TopicSelectionProps {
  selected: TopicId | null
  onSelect: (id: TopicId) => void
  onStart: () => void
  onClose: () => void
}

/**
 * Topic selection. Figma: Topic Selection / UnSelected (13646:14741) and
 * Selected (13645:14426).
 *
 * One topic per session, so the rows behave as radio buttons. Progress sits at
 * 0 because the term count is not known until a topic is picked; it resolves on
 * the screens after this one.
 *
 * "Let's go!" goes straight to the term prompt. There is no mic primer and no
 * permission step: access is assumed granted.
 */
export function TopicSelection({ selected, onSelect, onStart, onClose }: TopicSelectionProps) {
  return (
    <Scaffold
      chrome={
        <>
          <StatusBar />
          <RecallHeader progress={0} xp={0} onClose={onClose} />
        </>
      }
      footer={
        <Button
          variant="Primary"
          size="L"
          state={selected ? 'Default' : 'Disabled'}
          className={shared.cta}
          onClick={onStart}
        >
          {TOPIC_SELECTION_COPY.cta}
        </Button>
      }
    >
      <div className={styles.root}>
        <div className={styles.prompt}>
          <Mascot mood="standby" size="S" />
          <MessageBubble message={TOPIC_SELECTION_COPY.prompt} showTail />
        </div>

        <RadioGroup label={TOPIC_SELECTION_COPY.groupLabel} className={styles.list}>
          {TOPICS.map((topic) => (
            <TopicPromo
              key={topic.id}
              topic={topic.name}
              state={selected === topic.id ? 'Selected' : 'Unselected'}
              onClick={() => onSelect(topic.id)}
            />
          ))}
        </RadioGroup>

        {/* Reads "Show more" in Figma. The flow doc says "Load more"; Figma is
            the drawn artefact and wins. Inert in the prototype: the recents
            list is the four written rows. */}
        <TextLink align="end">{TOPIC_SELECTION_COPY.showMore}</TextLink>
      </div>
    </Scaffold>
  )
}
