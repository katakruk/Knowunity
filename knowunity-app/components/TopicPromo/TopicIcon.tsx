import React from 'react'

/**
 * Notebook glyph used by TopicPromo, exported from the Figma component
 * (Glyph, inside Topic Promo 13646:15298).
 *
 * The two fills in Figma are `pro/accent` (the notebook body) and
 * `accent/brand/onBold` (the outline and detail). Neither is applied here as a
 * hex: both are set from CSS variables in TopicPromo.module.css, so the glyph
 * recolours with the tokens like everything else.
 */
export function TopicIcon({ bodyClassName, detailClassName, ...props }: {
  bodyClassName?: string
  detailClassName?: string
} & React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 27 32" fill="none" aria-hidden focusable="false" {...props}>
      <path
        className={bodyClassName}
        d="M19.878 3.16151C19.7698 1.40206 18.3354 0 16.5763 0C16.2651 0 15.9674 0.0412371 15.6832 0.123711C15.3991 0.0412371 15.0878 0 14.7901 0C13.1393 0 11.7726 1.22337 11.5155 2.83161H8.60616C3.85655 2.83161 0 7.05155 0 12.2474V22.5842C0 27.7801 3.85655 32 8.60616 32H17.6453C22.3949 32 26.265 27.7801 26.265 22.5842V12.2474C26.265 7.91752 23.5722 4.24742 19.8916 3.16151H19.878Z"
      />
      <path
        className={detailClassName}
        d="M17.6314 29.4433H8.59218C5.23633 29.4433 2.50293 26.3642 2.50293 22.5842V12.2474C2.50293 8.46734 5.23633 5.38831 8.59218 5.38831H17.6314C20.9872 5.38831 23.7206 8.46734 23.7206 12.2474V22.5842C23.7206 26.3642 20.9872 29.4433 17.6314 29.4433ZM8.59218 6.99655C6.10235 6.99655 4.08615 9.34707 4.08615 12.2474V22.5842C4.08615 25.4845 6.11589 27.835 8.59218 27.835H17.6314C20.1212 27.835 22.1374 25.4845 22.1374 22.5842V12.2474C22.1374 9.34707 20.1077 6.99655 17.6314 6.99655H8.59218Z"
      />
      <path
        className={detailClassName}
        d="M18.1722 15.7254H11.3522C10.9192 15.7254 10.5674 15.368 10.5674 14.9282V10.9144C10.5674 10.4746 10.9192 10.1172 11.3522 10.1172H18.1722C18.6052 10.1172 18.957 10.4746 18.957 10.9144V14.9282C18.957 15.368 18.6052 15.7254 18.1722 15.7254ZM12.1506 14.1172H17.4009V11.6979H12.1506V14.1172Z"
      />
      <path
        className={detailClassName}
        d="M7.68525 28.6874C7.25224 28.6874 6.90039 28.33 6.90039 27.8902V6.80427C6.90039 6.36441 7.25224 6.00702 7.68525 6.00702C8.11826 6.00702 8.47007 6.36441 8.47007 6.80427V27.8902C8.47007 28.33 8.11826 28.6874 7.68525 28.6874Z"
      />
      <path
        className={detailClassName}
        d="M14.9519 6.88646C14.5188 6.88646 14.167 6.52908 14.167 6.08921V3.36756C14.167 2.9277 14.5188 2.57031 14.9519 2.57031C15.3849 2.57031 15.7367 2.9277 15.7367 3.36756V6.08921C15.7367 6.52908 15.3849 6.88646 14.9519 6.88646Z"
      />
      <path
        className={detailClassName}
        d="M16.4001 6.88646C15.9671 6.88646 15.6152 6.52908 15.6152 6.08921V3.36756C15.6152 2.9277 15.9671 2.57031 16.4001 2.57031C16.8331 2.57031 17.1849 2.9277 17.1849 3.36756V6.08921C17.1849 6.52908 16.8331 6.88646 16.4001 6.88646Z"
      />
    </svg>
  )
}

/** Check glyph shown inside the indicator when the row is Selected. */
export function CheckGlyph(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden focusable="false" {...props}>
      <path
        d="M3 8.5L6.2 11.7L13 4.9"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
