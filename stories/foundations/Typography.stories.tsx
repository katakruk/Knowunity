import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import React from 'react'

// ─── Types ───────────────────────────────────────────────────────────────────

type TypEntry = {
  scale: string       // e.g. "display.l" — also drives CSS variable names
  size: string        // e.g. "103px"  (label, from tokens.json)
  weight: string      // e.g. "900"
  lineHeight: string  // e.g. "104px" or "1.2"
  letterSpacing: string // e.g. "-0.01em"
  sample: string
}

// ─── Token data ───────────────────────────────────────────────────────────────
// Source: knowunity-sprint/tokens/tokens.json
// CSS variable names: --typography-{scale.replace('.', '-')}-{property-kebab}
// None of these tokens carry a $description, so all show "No description".

const TYPE_SCALE: TypEntry[] = [
  // Display
  { scale: 'display.l',            size: '103px', weight: '900', lineHeight: '104px',  letterSpacing: '-0.01em', sample: 'Aa' },
  { scale: 'display.m',            size: '76px',  weight: '700', lineHeight: '76px',   letterSpacing: '-0.01em', sample: 'Aa' },
  { scale: 'display.s',            size: '59px',  weight: '700', lineHeight: '60px',   letterSpacing: '-0.01em', sample: 'Design' },
  { scale: 'display.xs',           size: '52px',  weight: '700', lineHeight: '1.2',    letterSpacing: '0em',     sample: 'Design' },
  // Headline
  { scale: 'headline.xl',          size: '44px',  weight: '700', lineHeight: '44px',   letterSpacing: '-0.01em', sample: 'Design system' },
  { scale: 'headline.l',           size: '33px',  weight: '700', lineHeight: '36px',   letterSpacing: '-0.01em', sample: 'Design system' },
  { scale: 'headline.m',           size: '28px',  weight: '700', lineHeight: '28px',   letterSpacing: '-0.01em', sample: 'The quick brown fox' },
  { scale: 'headline.s',           size: '21px',  weight: '700', lineHeight: '24px',   letterSpacing: '0em',     sample: 'The quick brown fox' },
  { scale: 'headline.xs.bold',     size: '18px',  weight: '600', lineHeight: '20px',   letterSpacing: '0.01em',  sample: 'The quick brown fox jumps' },
  { scale: 'headline.xs.regular',  size: '18px',  weight: '400', lineHeight: '20px',   letterSpacing: '0.01em',  sample: 'The quick brown fox jumps' },
  { scale: 'headline.xxs.bold',    size: '15px',  weight: '600', lineHeight: '16px',   letterSpacing: '0.01em',  sample: 'The quick brown fox jumps over the lazy dog' },
  { scale: 'headline.xxs.regular', size: '15px',  weight: '400', lineHeight: '16px',   letterSpacing: '0.01em',  sample: 'The quick brown fox jumps over the lazy dog' },
  // Body
  { scale: 'body.l.bold',          size: '24px',  weight: '600', lineHeight: '1.2',    letterSpacing: '0em',     sample: 'The quick brown fox jumps over the lazy dog' },
  { scale: 'body.l.regular',       size: '24px',  weight: '400', lineHeight: '1.2',    letterSpacing: '0em',     sample: 'The quick brown fox jumps over the lazy dog' },
  { scale: 'body.m.bold',          size: '18px',  weight: '600', lineHeight: '24px',   letterSpacing: '0.01em',  sample: 'The quick brown fox jumps over the lazy dog' },
  { scale: 'body.m.regular',       size: '18px',  weight: '400', lineHeight: '24px',   letterSpacing: '0.01em',  sample: 'The quick brown fox jumps over the lazy dog' },
  { scale: 'body.s.bold',          size: '15px',  weight: '600', lineHeight: '20px',   letterSpacing: '0.01em',  sample: 'The quick brown fox jumps over the lazy dog' },
  { scale: 'body.s.regular',       size: '15px',  weight: '400', lineHeight: '20px',   letterSpacing: '0.01em',  sample: 'The quick brown fox jumps over the lazy dog' },
  // Caption
  { scale: 'caption.m.bold',       size: '12px',  weight: '600', lineHeight: '16px',   letterSpacing: '0.01em',  sample: 'The quick brown fox jumps over the lazy dog. 1234567890' },
  { scale: 'caption.m.regular',    size: '12px',  weight: '400', lineHeight: '16px',   letterSpacing: '0.01em',  sample: 'The quick brown fox jumps over the lazy dog. 1234567890' },
  { scale: 'caption.s.bold',       size: '9px',   weight: '600', lineHeight: '12px',   letterSpacing: '0.01em',  sample: 'The quick brown fox jumps over the lazy dog. 1234567890' },
  { scale: 'caption.s.regular',    size: '9px',   weight: '400', lineHeight: '12px',   letterSpacing: '0.01em',  sample: 'The quick brown fox jumps over the lazy dog. 1234567890' },
]

// ─── Component ───────────────────────────────────────────────────────────────

// Convert "display.l" → "--typography-display-l" prefix for CSS var lookups.
function cssPrefix(scale: string): string {
  return `--typography-${scale.replace(/\./g, '-')}`
}

// Detect the start of a new category from the scale name.
function categoryOf(scale: string): string {
  return scale.split('.')[0]
}

const CATEGORY_LABELS: Record<string, string> = {
  display:  'Display',
  headline: 'Headline',
  body:     'Body',
  caption:  'Caption',
}

function TypeRow({ entry, showDivider }: { entry: TypEntry; showDivider: boolean }) {
  const prefix = cssPrefix(entry.scale)

  return (
    <div>
      {showDivider && (
        <div style={{
          fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em',
          color: 'rgba(245,243,255,0.35)', padding: '24px 0 8px',
          borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: 0,
        }}>
          {CATEGORY_LABELS[categoryOf(entry.scale)]}
        </div>
      )}
      <div style={{ padding: '20px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        {/* Rendered sample */}
        <div style={{
          fontFamily: `var(${prefix}-family)`,
          fontWeight: `var(${prefix}-weight)`,
          fontSize: `var(${prefix}-size)`,
          lineHeight: `var(${prefix}-line-height)`,
          letterSpacing: `var(${prefix}-letter-spacing)`,
          color: 'var(--text-primary)',
          marginBottom: 10,
          wordBreak: 'break-word',
        }}>
          {entry.sample}
        </div>
        {/* Metadata row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 16px', alignItems: 'center' }}>
          <code style={{ fontSize: 11, color: '#a78bfa', fontFamily: 'monospace', fontWeight: 600 }}>
            typography.{entry.scale}
          </code>
          <MetaPill label="size"    value={entry.size} />
          <MetaPill label="weight"  value={entry.weight} />
          <MetaPill label="lh"      value={entry.lineHeight} />
          <MetaPill label="ls"      value={entry.letterSpacing} />
          <span style={{ fontSize: 11, color: 'rgba(245,243,255,0.25)', fontStyle: 'italic' }}>
            No description
          </span>
        </div>
      </div>
    </div>
  )
}

function MetaPill({ label, value }: { label: string; value: string }) {
  return (
    <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'rgba(245,243,255,0.45)' }}>
      <span style={{ color: 'rgba(245,243,255,0.3)' }}>{label}: </span>
      {value}
    </span>
  )
}

function TypeScale() {
  let lastCategory = ''
  return (
    <div style={{ padding: 24, fontFamily: 'system-ui, sans-serif', maxWidth: 900 }}>
      {TYPE_SCALE.map(entry => {
        const cat = categoryOf(entry.scale)
        const showDivider = cat !== lastCategory
        lastCategory = cat
        return <TypeRow key={entry.scale} entry={entry} showDivider={showDivider} />
      })}
    </div>
  )
}

// ─── Story ───────────────────────────────────────────────────────────────────

const meta = {
  title: 'Foundations/Typography',
  parameters: { layout: 'fullscreen' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const TypeScaleStory: Story = {
  name: 'Type Scale',
  render: () => <TypeScale />,
}
