'use client'

import React from 'react'
import Image from 'next/image'
import styles from './Mascot.module.css'

export type MascotMood = 'standby' | 'excited'
export type MascotSize = 'S' | 'M' | 'L' | 'XL'

/** Pixel sizes matching the illustration.* token scale */
const SIZE_PX: Record<MascotSize, number> = {
  S: 40,   // illustration.500
  M: 64,   // illustration.800
  L: 120,  // illustration.1500
  XL: 200, // illustration.2500
}

export interface MascotProps {
  /** Knowie's expression. */
  mood?: MascotMood
  /** Size bucket matching the illustration token scale. */
  size?: MascotSize
  className?: string
}

/**
 * Knowie the mascot — the purple ghost used throughout the recall flow.
 * Figma: mascotSlot component (3262:91073). Standby and excited moods.
 *
 * PNGs exported from Figma at 2× live in /public/mascot/.
 */
export function Mascot({ mood = 'standby', size = 'L', className }: MascotProps) {
  const px = SIZE_PX[size]
  return (
    <div
      className={[styles.root, className].filter(Boolean).join(' ')}
      style={{ width: px, height: px }}
    >
      <Image
        src={`/mascot/${mood}.png`}
        alt=""
        aria-hidden
        width={px * 2}
        height={px * 2}
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        priority
      />
    </div>
  )
}
