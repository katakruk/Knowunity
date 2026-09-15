'use client'

import React from 'react'
import styles from './BottomNavbar.module.css'
import { SearchIcon, TargetIcon, TrophyIcon, ChatAIIcon } from '../icons'

export type NavTab = 'search' | 'goals' | 'achievements' | 'knowie' | 'profile'

export interface BottomNavbarProps {
  /** Which tab is currently active. */
  active?: NavTab
  onTabChange?: (tab: NavTab) => void
  /** User avatar URL. Falls back to initials placeholder. */
  avatarSrc?: string
}

const TABS: { id: NavTab; label: string; Icon: React.ComponentType<{ className?: string }> | null }[] = [
  { id: 'search', label: 'Search', Icon: SearchIcon },
  { id: 'goals', label: 'Goals', Icon: TargetIcon },
  { id: 'achievements', label: 'Achievements', Icon: TrophyIcon },
  { id: 'knowie', label: 'Knowie', Icon: ChatAIIcon },
  { id: 'profile', label: 'Profile', Icon: null },
]

/**
 * Bottom navigation bar shown on the Main Screen.
 * Figma: Navbar (13593:6005).
 */
export function BottomNavbar({ active, onTabChange, avatarSrc }: BottomNavbarProps) {
  return (
    <nav className={styles.root} aria-label="Main navigation">
      {TABS.map(({ id, label, Icon }) => {
        const isActive = active === id
        return (
          <button
            key={id}
            type="button"
            className={[styles.tab, isActive ? styles.tabActive : ''].join(' ')}
            aria-label={label}
            aria-current={isActive ? 'page' : undefined}
            onClick={() => onTabChange?.(id)}
          >
            {id === 'profile' ? (
              <div className={styles.avatar} aria-hidden>
                {avatarSrc ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={avatarSrc} alt="" className={styles.avatarImg} />
                ) : (
                  <span className={styles.avatarFallback}>K</span>
                )}
              </div>
            ) : (
              Icon && <Icon className={styles.icon} />
            )}
          </button>
        )
      })}
    </nav>
  )
}
