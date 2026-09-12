import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import React from 'react'

// ─── Token data ───────────────────────────────────────────────────────────────
// Source: knowunity-sprint/tokens/tokens.json

type RadiusToken = {
  token: string
  cssVar: string
  px: string
  description: string
}

const RADIUS_TOKENS: RadiusToken[] = [
  { token: 'radius.100', cssVar: '--radius-100', px: '4px',    description: '4px corner radius.' },
  { token: 'radius.150', cssVar: '--radius-150', px: '6px',    description: '6px corner radius.' },
  { token: 'radius.200', cssVar: '--radius-200', px: '8px',    description: '8px corner radius.' },
  { token: 'radius.400', cssVar: '--radius-400', px: '16px',   description: '16px corner radius.' },
  { token: 'radius.600', cssVar: '--radius-600', px: '24px',   description: '24px corner radius.' },
  { token: 'radius.800', cssVar: '--radius-800', px: '32px',   description: '32px corner radius.' },
  { token: 'radius.900', cssVar: '--radius-900', px: '36px',   description: '36px corner radius.' },
  { token: 'radius.full', cssVar: '--radius-full', px: '9999px', description: 'Fully rounded corner radius.' },
]

// ─── Component ───────────────────────────────────────────────────────────────

function RadiusRow({ token, cssVar, px, description }: RadiusToken) {
  const numPx = parseFloat(px)
  const isFull = px === '9999px'
  // Box size: large enough to show the radius clearly, capped at 96px
  const boxSize = isFull ? 64 : Math.max(64, Math.min(numPx * 3, 96))

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 20,
      padding: '16px 0', borderBottom: '1px solid rgba(255,255,255,0.06)',
    }}>
      {/* Radius box */}
      <div style={{ width: 96, display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexShrink: 0 }}>
        <div style={{
          width: boxSize,
          height: boxSize,
          borderRadius: `var(${cssVar})`,
          background: 'rgba(145,120,230,0.2)',
          border: '1.5px solid rgba(145,120,230,0.6)',
          flexShrink: 0,
        }} />
      </div>

      {/* Token info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap', marginBottom: 2 }}>
          <code style={{ fontFamily: 'monospace', fontSize: 13, color: '#e4e0ff', fontWeight: 600 }}>
            {token}
          </code>
          <code style={{ fontFamily: 'monospace', fontSize: 11, color: 'rgba(245,243,255,0.45)' }}>
            {cssVar}
          </code>
          <span style={{ fontFamily: 'monospace', fontSize: 12, color: 'rgba(245,243,255,0.7)', fontWeight: 600 }}>
            {px}
          </span>
        </div>
        <div style={{ fontSize: 11, color: 'rgba(245,243,255,0.6)' }}>
          {description}
        </div>
      </div>
    </div>
  )
}

function RadiusScale() {
  return (
    <div style={{ padding: 24, fontFamily: 'system-ui, sans-serif', maxWidth: 900 }}>
      <div style={{
        fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em',
        color: 'rgba(245,243,255,0.35)', paddingBottom: 8,
        borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: 0,
      }}>
        Corner Radius
      </div>
      {RADIUS_TOKENS.map(t => <RadiusRow key={t.token} {...t} />)}
    </div>
  )
}

// ─── Story ───────────────────────────────────────────────────────────────────

const meta = {
  title: 'Foundations/Radius',
  parameters: { layout: 'fullscreen' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const RadiusScaleStory: Story = {
  name: 'Radius Scale',
  render: () => <RadiusScale />,
}
