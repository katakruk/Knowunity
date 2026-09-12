import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import React from 'react'

// ─── Token data ───────────────────────────────────────────────────────────────
// Source: knowunity-sprint/tokens/tokens.json

type SpaceToken = {
  token: string
  cssVar: string
  px: string       // raw value from tokens.json
  description: string
}

const POSITIVE: SpaceToken[] = [
  { token: 'space.0',    cssVar: '--space-0',    px: '0px',   description: '0px spacing step for gaps and padding in auto layout.' },
  { token: 'space.050',  cssVar: '--space-050',  px: '2px',   description: '2px spacing step for gaps and padding in auto layout.' },
  { token: 'space.100',  cssVar: '--space-100',  px: '4px',   description: '4px spacing step for gaps and padding in auto layout.' },
  { token: 'space.150',  cssVar: '--space-150',  px: '6px',   description: '6px spacing step for gaps and padding in auto layout.' },
  { token: 'space.200',  cssVar: '--space-200',  px: '8px',   description: '8px spacing step for gaps and padding in auto layout.' },
  { token: 'space.300',  cssVar: '--space-300',  px: '12px',  description: '12px spacing step for gaps and padding in auto layout.' },
  { token: 'space.400',  cssVar: '--space-400',  px: '16px',  description: '16px spacing step for gaps and padding in auto layout.' },
  { token: 'space.600',  cssVar: '--space-600',  px: '24px',  description: '24px spacing step for gaps and padding in auto layout.' },
  { token: 'space.700',  cssVar: '--space-700',  px: '28px',  description: '28px spacing step for gaps and padding in auto layout.' },
  { token: 'space.800',  cssVar: '--space-800',  px: '32px',  description: '32px spacing step for gaps and padding in auto layout.' },
  { token: 'space.1200', cssVar: '--space-1200', px: '48px',  description: '48px spacing step for gaps and padding in auto layout.' },
  { token: 'space.1600', cssVar: '--space-1600', px: '64px',  description: '64px spacing step for gaps and padding in auto layout.' },
  { token: 'space.2400', cssVar: '--space-2400', px: '96px',  description: '96px spacing step for gaps and padding in auto layout.' },
  { token: 'space.4000', cssVar: '--space-4000', px: '160px', description: '160px spacing step for gaps and padding in auto layout.' },
]

const NEGATIVE: SpaceToken[] = [
  { token: 'space.negative-100', cssVar: '--space-negative-100', px: '-4px',  description: '-4px spacing step for gaps and padding in auto layout.' },
  { token: 'space.negative-200', cssVar: '--space-negative-200', px: '-8px',  description: '-8px spacing step for gaps and padding in auto layout.' },
  { token: 'space.negative-300', cssVar: '--space-negative-300', px: '-12px', description: '-12px spacing step for gaps and padding in auto layout.' },
  { token: 'space.negative-400', cssVar: '--space-negative-400', px: '-16px', description: '-16px spacing step for gaps and padding in auto layout.' },
  { token: 'space.negative-600', cssVar: '--space-negative-600', px: '-24px', description: '-24px spacing step for gaps and padding in auto layout.' },
]

// ─── Component ───────────────────────────────────────────────────────────────

function SpaceRow({ token, cssVar, px, description }: SpaceToken) {
  const absPx = Math.abs(parseFloat(px))
  const isNegative = px.startsWith('-')
  const isZero = absPx === 0

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 16,
      padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.06)',
    }}>
      {/* Bar track */}
      <div style={{ width: 200, flexShrink: 0, position: 'relative', height: 20, display: 'flex', alignItems: 'center' }}>
        {/* Track baseline */}
        <div style={{ position: 'absolute', left: 0, right: 0, height: 1, background: 'rgba(255,255,255,0.1)' }} />
        {isZero ? (
          /* Zero marker */
          <div style={{ position: 'absolute', left: 0, width: 2, height: 12, background: 'rgba(145,120,230,0.5)', borderRadius: 1 }} />
        ) : isNegative ? (
          /* Negative bar — right-justified, dashed outline style */
          <div style={{
            position: 'absolute',
            right: 0,
            width: Math.min(absPx, 200),
            height: 8,
            borderRadius: 2,
            background: 'rgba(255,107,107,0.25)',
            border: '1px dashed rgba(255,107,107,0.6)',
          }} />
        ) : (
          /* Positive bar */
          <div style={{
            position: 'absolute',
            left: 0,
            width: Math.min(absPx, 200),
            height: 8,
            borderRadius: 2,
            background: 'rgba(145,120,230,0.5)',
          }} />
        )}
      </div>

      {/* Token info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
          <code style={{ fontFamily: 'monospace', fontSize: 13, color: '#e4e0ff', fontWeight: 600 }}>
            {token}
          </code>
          <code style={{ fontFamily: 'monospace', fontSize: 11, color: 'rgba(245,243,255,0.45)' }}>
            {cssVar}
          </code>
          <span style={{ fontFamily: 'monospace', fontSize: 12, color: isNegative ? '#ff8585' : 'rgba(245,243,255,0.7)', fontWeight: 600 }}>
            {px}
          </span>
        </div>
        <div style={{ fontSize: 11, color: 'rgba(245,243,255,0.6)', marginTop: 2 }}>
          {description}
        </div>
      </div>
    </div>
  )
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em',
      color: 'rgba(245,243,255,0.35)', padding: '24px 0 8px',
      borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: 0,
    }}>
      {children}
    </div>
  )
}

function SpacingScale() {
  return (
    <div style={{ padding: 24, fontFamily: 'system-ui, sans-serif', maxWidth: 900 }}>
      <SectionHeading>Positive</SectionHeading>
      {POSITIVE.map(t => <SpaceRow key={t.token} {...t} />)}
      <SectionHeading>Negative</SectionHeading>
      {NEGATIVE.map(t => <SpaceRow key={t.token} {...t} />)}
    </div>
  )
}

// ─── Story ───────────────────────────────────────────────────────────────────

const meta = {
  title: 'Foundations/Spacing',
  parameters: { layout: 'fullscreen' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const SpacingScaleStory: Story = {
  name: 'Spacing Scale',
  render: () => <SpacingScale />,
}
