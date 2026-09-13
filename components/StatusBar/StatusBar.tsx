'use client'

import React from 'react'
import styles from './StatusBar.module.css'

export interface StatusBarProps {
  /** Override the displayed time. Defaults to "09:41". */
  time?: string
}

/**
 * Fake iOS status bar. Static chrome — not a real native component.
 * Shows fixed time, signal, wifi, battery indicators.
 * Figma node: 3085:7297 (Status Bar / Mode=Night)
 */
export function StatusBar({ time = '09:41' }: StatusBarProps) {
  return (
    <div className={styles.root} aria-hidden="true">
      <span className={styles.time}>{time}</span>
      <span className={styles.indicators}>
        {/* Signal bars */}
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
          <rect x="0" y="6" width="3" height="6" rx="1" fill="currentColor"/>
          <rect x="4.5" y="4" width="3" height="8" rx="1" fill="currentColor"/>
          <rect x="9" y="2" width="3" height="10" rx="1" fill="currentColor"/>
          <rect x="13.5" y="0" width="3" height="12" rx="1" fill="currentColor"/>
        </svg>
        {/* WiFi */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path d="M8 9.5C8.82843 9.5 9.5 10.1716 9.5 11C9.5 11.8284 8.82843 12.5 8 12.5C7.17157 12.5 6.5 11.8284 6.5 11C6.5 10.1716 7.17157 9.5 8 9.5Z" fill="currentColor"/>
          <path d="M3.5 6C5.15685 4.34315 7.02326 3.5 8 3.5C8.97674 3.5 10.8431 4.34315 12.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M0.5 3C2.83333 1 5.41667 0 8 0C10.5833 0 13.1667 1 15.5 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        {/* Battery */}
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="currentColor" strokeOpacity="0.35"/>
          <rect x="22.5" y="3.5" width="2" height="5" rx="1" fill="currentColor" fillOpacity="0.4"/>
          <rect x="2" y="2" width="16" height="8" rx="1.5" fill="currentColor"/>
        </svg>
      </span>
    </div>
  )
}
