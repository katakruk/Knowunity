'use client'

import React from 'react'
import styles from './ProcessingAnimation.module.css'

/**
 * Orbiting particles animation for the Processing screen.
 * Conveys that Knowie is evaluating the user's spoken response.
 *
 * Animation spec from project_processing_animation memory:
 * - Centre dot: 16px, pulses scale 1→1.3→1, opacity 1→0.7→1, 2s
 * - Particle 1 (30px orbit): 360° in 3s
 * - Particle 2 (55px orbit): −360° in 2.5s (reverse)
 * - Particle 3 (25px orbit): 360° in 3.5s
 * - Subtle orbit rings at 0.15 opacity
 */
export function ProcessingAnimation() {
  return (
    <div className={styles.root} aria-label="Processing" role="status">
      {/* Orbit rings */}
      <div className={`${styles.ring} ${styles.ring25}`} aria-hidden />
      <div className={`${styles.ring} ${styles.ring30}`} aria-hidden />
      <div className={`${styles.ring} ${styles.ring55}`} aria-hidden />

      {/* Orbiting particles */}
      <div className={`${styles.orbit} ${styles.orbit1}`} aria-hidden>
        <div className={`${styles.particle} ${styles.particle1}`} />
      </div>
      <div className={`${styles.orbit} ${styles.orbit2}`} aria-hidden>
        <div className={`${styles.particle} ${styles.particle2}`} />
      </div>
      <div className={`${styles.orbit} ${styles.orbit3}`} aria-hidden>
        <div className={`${styles.particle} ${styles.particle3}`} />
      </div>

      {/* Centre dot */}
      <div className={styles.centre} aria-hidden />
    </div>
  )
}
