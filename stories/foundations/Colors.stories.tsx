import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import React from 'react'

// ─── Types & helpers ─────────────────────────────────────────────────────────

type Token = {
  token: string
  cssVar: string
  raw: string       // value as written in tokens.json (hex or {reference})
  resolved: string  // actual hex value
  description: string | null
}

function prim(token: string, cssVar: string, value: string, description: string | null = null): Token {
  return { token, cssVar, raw: value, resolved: value, description }
}

function sem(token: string, cssVar: string, ref: string, resolved: string, description: string): Token {
  return { token, cssVar, raw: ref, resolved, description }
}

// ─── Rendering components ────────────────────────────────────────────────────

function Swatch({ token, cssVar, raw, resolved, description }: Token) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{
        width: 48, height: 48, borderRadius: 8, flexShrink: 0,
        backgroundImage: 'repeating-conic-gradient(#3a3a3a 0% 25%, #1c1c1c 0% 50%)',
        backgroundSize: '10px 10px',
        position: 'relative',
        outline: '1px solid rgba(255,255,255,0.1)',
        outlineOffset: -1,
      }}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: 7, background: `var(${cssVar})` }} />
      </div>
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{ fontFamily: 'monospace', fontSize: 13, color: '#e4e0ff', fontWeight: 600, lineHeight: 1.4 }}>
          {token}
        </div>
        <div style={{ fontFamily: 'monospace', fontSize: 11, color: 'rgba(245,243,255,0.65)', marginTop: 2 }}>
          {cssVar}
        </div>
        <div style={{ fontFamily: 'monospace', fontSize: 11, color: 'rgba(245,243,255,0.65)', marginTop: 1 }}>
          {raw !== resolved ? `${raw} → ${resolved}` : resolved}
        </div>
        <div style={{
          fontSize: 11,
          color: description ? 'rgba(245,243,255,0.6)' : 'rgba(245,243,255,0.55)',
          fontStyle: description ? 'normal' : 'italic',
          marginTop: 3,
          lineHeight: 1.5,
        }}>
          {description ?? 'No description'}
        </div>
      </div>
    </div>
  )
}

interface GroupProps {
  label: string
  tokens: Token[]
}

function Group({ label, tokens }: GroupProps) {
  return (
    <div style={{ marginBottom: 40 }}>
      <div style={{
        fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em',
        color: 'rgba(245,243,255,0.55)', marginBottom: 8, paddingBottom: 6,
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}>
        {label}
      </div>
      {tokens.map(t => <Swatch key={t.token} {...t} />)}
    </div>
  )
}

function Page({ groups }: { groups: GroupProps[] }) {
  return (
    <div style={{ padding: 24, fontFamily: 'system-ui, sans-serif', maxWidth: 900 }}>
      {groups.map(g => <Group key={g.label} {...g} />)}
    </div>
  )
}

// ─── Token data ───────────────────────────────────────────────────────────────

const BACKGROUND: Token[] = [
  sem('background.page',     '--background-page',     '{color.navy.950}',      '#090c18',   'Deep app canvas, the darkest layer, for page backgrounds.'),
  sem('background.surface',  '--background-surface',  '{color.navy.800}',      '#22242f',   'Cards, panels, elevated containers above page backgrounds.'),
  sem('background.inverse',  '--background-inverse',  '{color.violet.50}',     '#f4f2ff',   'Light backgrounds in dark UI for rare light-on-dark inversions.'),
  sem('background.scrim',    '--background-scrim',    '{color.alpha.dark-50}', '#0a0a0a80', 'Semi-transparent overlay dimming content behind modals.'),
  sem('background.floating', '--background-floating', '{color.alpha.glass-60}','#3d3d3d99', 'Modals, tooltips, dropdowns above surface layer.'),
  sem('background.stacking', '--background-stacking', '{color.alpha.light-10}','#ffffff1a', 'White overlays or highlights for emphasis on dark surfaces.'),
  sem('background.input',    '--background-input',    '{color.navy.900}',      '#1a1c26',   'Text field backgrounds for form inputs.'),
]

const INTERACTIVE: Token[] = [
  sem('interactive.primary',                   '--interactive-primary',                   '{color.violet.50}',      '#f4f2ff',   'Main action buttons for primary CTAs.'),
  sem('interactive.primaryHover',              '--interactive-primary-hover',             '{color.violet.100}',     '#e4e0ff',   'Primary button hover state for mouse-over.'),
  sem('interactive.primaryActive',             '--interactive-primary-active',            '{color.violet.200}',     '#d2ccfa',   'Primary button active state when pressed.'),
  sem('interactive.primary-loading',           '--interactive-primary-loading',           '{color.violet-loading}', '#aba9b3',   'Primary button loading state for async actions.'),
  sem('interactive.secondary',                 '--interactive-secondary',                 '{color.alpha.light-10}', '#ffffff1a', 'Alternative actions for secondary CTAs with less emphasis.'),
  sem('interactive.secondaryHover',            '--interactive-secondary-hover',           '{color.alpha.light-18}', '#ffffff2e', 'Secondary button hover state for mouse-over.'),
  sem('interactive.secondaryActive',           '--interactive-secondary-active',          '{color.alpha.light-24}', '#ffffff3d', 'Secondary button active state when pressed.'),
  sem('interactive.secondary-loading',         '--interactive-secondary-loading',         '{color.gray-loading}',   '#1a1a1a',   'Secondary button loading state for async actions.'),
  sem('interactive.destructive',               '--interactive-destructive',               '{color.red.400}',        '#ff6b6b',   'Delete/remove actions that destroy data.'),
  sem('interactive.destructiveHover',          '--interactive-destructive-hover',         '{color.red.300}',        '#ff8585',   'Destructive button hover state for mouse-over.'),
  sem('interactive.destructiveActive',         '--interactive-destructive-active',        '{color.red.500}',        '#e85555',   'Destructive button active state when pressed.'),
  sem('interactive.destructive-loading',       '--interactive-destructive-loading',       '{color.red-loading}',    '#cc3333',   'Destructive button loading state for async actions.'),
  sem('interactive.disabled',                  '--interactive-disabled',                  '{color.gray.240}',       '#3d3d3d',   'Inactive state for disabled buttons and controls.'),
  sem('interactive.onPrimary',                 '--interactive-on-primary',                '{color.navy.950}',       '#090c18',   'Text and icons on primary buttons.'),
  sem('interactive.onSecondary',               '--interactive-on-secondary',              '{color.violet.50}',      '#f4f2ff',   'Text and icons on secondary buttons.'),
  sem('interactive.onDestructive',             '--interactive-on-destructive',            '{color.red.950}',        '#2a0808',   'Text and icons on destructive buttons.'),
  sem('interactive.overlay.pressed',           '--interactive-overlay-pressed',           '{color.alpha.light-10}', '#ffffff1a', 'Temporary overlay when pressing for touch feedback.'),
  sem('interactive.overlay.pressedInverse',    '--interactive-overlay-pressed-inverse',   '{color.alpha.dark-10}',  '#0a0a0a1a','Temporary overlay when pressing light surfaces.'),
]

const TEXT_TOKENS: Token[] = [
  sem('text.primary',   '--text-primary',   '{color.violet.50}',      '#f4f2ff',   'Highest emphasis content for headings and body text.'),
  sem('text.secondary', '--text-secondary', '{color.alpha.light-68}', '#f5f3ffad', 'Medium emphasis content for supporting text and captions.'),
  sem('text.tertiary',  '--text-tertiary',  '{color.alpha.light-48}', '#f5f3ff7a', 'Lowest emphasis content for metadata and timestamps.'),
  sem('text.inverse',   '--text-inverse',   '{color.navy.950}',       '#090c18',   'Dark text on light backgrounds for inversions from dark mode.'),
  sem('text.link',      '--text-link',      '{color.violet.500}',     '#9178e6',   'Hyperlinks for clickable links.'),
  sem('text.linkHover', '--text-link-hover','{color.violet.300}',     '#a78bfa',   'Link hover state for mouse-over links.'),
  sem('text.disabled',  '--text-disabled',  '{color.alpha.light-40}', '#ffffff66', 'Inactive text for disabled labels.'),
  sem('text.success',   '--text-success',   '{color.green.300}',      '#4ae5b0',   'Success messages for positive feedback text.'),
  sem('text.error',     '--text-error',     '{color.red.200}',        '#fca5a5',   'Error messages for validation errors and alerts.'),
  sem('text.warning',   '--text-warning',   '{color.gold.300}',       '#fcd34d',   'Warning messages for caution text.'),
  sem('text.onAccent',  '--text-on-accent', '{color.violet.950}',     '#0e0a18',   'Text on colored accent backgrounds.'),
]

const BORDER_TOKENS: Token[] = [
  sem('border.default',  '--border-default',  '{color.alpha.light-10}', '#ffffff1a', 'Standard borders for subtle separation and containers.'),
  sem('border.strong',   '--border-strong',   '{color.alpha.light-25}', '#ffffff40', 'High contrast borders for strong separation.'),
  sem('border.focus',    '--border-focus',    '{color.violet.300}',     '#a78bfa',   'Keyboard navigation outline for focus rings.'),
  sem('border.error',    '--border-error',    '{color.red.400}',        '#ff6b6b',   'Invalid input indicator for error state outlines.'),
  sem('border.success',  '--border-success',  '{color.green.500}',      '#00c386',   'Valid input confirmation for success state outlines.'),
  sem('border.selected', '--border-selected', '{color.violet.500}',     '#9178e6',   'Currently chosen item for active selection outline.'),
]

const HIGHLIGHT_TOKENS: Token[] = [
  sem('highlight.surface', '--highlight-surface', '{color.violet.900}', '#15103a', 'Selected or emphasized background for list items and active states.'),
  sem('highlight.border',  '--highlight-border',  '{color.violet.400}', '#7b65e0', 'Selected or emphasized outline matching highlight surface.'),
]

const MASCOT_TOKENS: Token[] = [
  sem('mascot.primary', '--mascot-primary', '{color.violet.500}', '#9178e6', "Knowie's body color for mascot illustration only."),
  sem('mascot.eyes',    '--mascot-eyes',    '{color.neutral.0}',  '#ffffff', "Knowie's eye whites for mascot illustration only."),
  sem('mascot.pupils',  '--mascot-pupils',  '{color.neutral.950}','#0a0a0a', "Knowie's eye pupils for mascot illustration only."),
]

const PRO_TOKENS: Token[] = [
  sem('pro.bold',     '--pro-bold',      '{color.gold.400}', '#f5b53d', 'Premium badge background for Pro feature indicators.'),
  sem('pro.onBold',   '--pro-on-bold',   '{color.gold.950}', '#2a1d04', 'Text on pro bold background.'),
  sem('pro.subtle',   '--pro-subtle',    '{color.gold.900}', '#3a2d0b', 'Subtle premium background for low-emphasis Pro indicators.'),
  sem('pro.onSubtle', '--pro-on-subtle', '{color.gold.300}', '#fcd34d', 'Text on pro subtle background.'),
  sem('pro.accent',   '--pro-accent',    '{color.gold.400}', '#f5b53d', 'Premium accent for legacy compatibility.'),
]

const ACCENT_TOKENS: GroupProps[] = [
  { label: 'Brand', tokens: [
    sem('accent.brand.bold',     '--accent-brand-bold',      '{color.violet.500}', '#9178e6', 'Brand purple solid background for category tags and subject labels.'),
    sem('accent.brand.onBold',   '--accent-brand-on-bold',   '{color.violet.950}', '#0e0a18', 'Text on brand bold background.'),
    sem('accent.brand.subtle',   '--accent-brand-subtle',    '{color.violet.900}', '#15103a', 'Brand purple tinted background for subtle category emphasis.'),
    sem('accent.brand.onSubtle', '--accent-brand-on-subtle', '{color.violet.400}', '#7b65e0', 'Text on brand subtle background.'),
  ]},
  { label: 'Coral', tokens: [
    sem('accent.coral.bold',     '--accent-coral-bold',      '{color.coral.400}', '#fb7e5b', 'Coral solid background for category tags.'),
    sem('accent.coral.onBold',   '--accent-coral-on-bold',   '{color.coral.950}', '#2e0f06', 'Text on coral bold background.'),
    sem('accent.coral.subtle',   '--accent-coral-subtle',    '{color.coral.900}', '#512e2c', 'Coral tinted background for subtle category emphasis.'),
    sem('accent.coral.onSubtle', '--accent-coral-on-subtle', '{color.coral.200}', '#ffb59b', 'Text on coral subtle background.'),
  ]},
  { label: 'Magenta', tokens: [
    sem('accent.magenta.bold',     '--accent-magenta-bold',      '{color.magenta.400}', '#e879c0', 'Magenta solid background for category tags.'),
    sem('accent.magenta.onBold',   '--accent-magenta-on-bold',   '{color.magenta.950}', '#2c0a20', 'Text on magenta bold background.'),
    sem('accent.magenta.subtle',   '--accent-magenta-subtle',    '{color.magenta.900}', '#380d29', 'Magenta tinted background for subtle category emphasis.'),
    sem('accent.magenta.onSubtle', '--accent-magenta-on-subtle', '{color.magenta.200}', '#f7b5de', 'Text on magenta subtle background.'),
  ]},
  { label: 'Blue', tokens: [
    sem('accent.blue.bold',     '--accent-blue-bold',      '{color.blue.400}', '#5fa0fc', 'Blue solid background for category tags.'),
    sem('accent.blue.onBold',   '--accent-blue-on-bold',   '{color.blue.950}', '#06173b', 'Text on blue bold background.'),
    sem('accent.blue.subtle',   '--accent-blue-subtle',    '{color.blue.900}', '#0a1635', 'Blue tinted background for subtle category emphasis.'),
    sem('accent.blue.onSubtle', '--accent-blue-on-subtle', '{color.blue.300}', '#7ba8f2', 'Text on blue subtle background.'),
  ]},
  { label: 'Green', tokens: [
    sem('accent.green.bold',     '--accent-green-bold',      '{color.green.500}', '#00c386', 'Green solid background for category tags.'),
    sem('accent.green.onBold',   '--accent-green-on-bold',   '{color.green.950}', '#0a1f18', 'Text on green bold background.'),
    sem('accent.green.subtle',   '--accent-green-subtle',    '{color.green.900}', '#0a2e22', 'Green tinted background for subtle category emphasis.'),
    sem('accent.green.onSubtle', '--accent-green-on-subtle', '{color.green.300}', '#4ae5b0', 'Text on green subtle background.'),
  ]},
]

const FEEDBACK_TOKENS: GroupProps[] = [
  { label: 'Success', tokens: [
    sem('feedback.success.bold',     '--feedback-success-bold',      '{color.green.500}', '#00c386', 'Success alert background for high-emphasis success notices.'),
    sem('feedback.success.onBold',   '--feedback-success-on-bold',   '{color.green.950}', '#0a1f18', 'Text on success background.'),
    sem('feedback.success.subtle',   '--feedback-success-subtle',    '{color.green.900}', '#0a2e22', 'Subtle success background for low-emphasis success notices.'),
    sem('feedback.success.onSubtle', '--feedback-success-on-subtle', '{color.green.300}', '#4ae5b0', 'Text on subtle success background.'),
  ]},
  { label: 'Error', tokens: [
    sem('feedback.error.bold',     '--feedback-error-bold',      '{color.red.400}', '#ff6b6b', 'Error alert background for high-emphasis error messages.'),
    sem('feedback.error.onBold',   '--feedback-error-on-bold',   '{color.red.950}', '#2a0808', 'Text on error background.'),
    sem('feedback.error.subtle',   '--feedback-error-subtle',    '{color.red.900}', '#532831', 'Subtle error background for low-emphasis error notices.'),
    sem('feedback.error.onSubtle', '--feedback-error-on-subtle', '{color.red.200}', '#fca5a5', 'Text on subtle error background.'),
  ]},
]

const PRIMITIVE_TOKENS: GroupProps[] = [
  { label: 'Navy', tokens: [
    prim('color.navy.950', '--color-navy-950', '#090c18'),
    prim('color.navy.900', '--color-navy-900', '#1a1c26'),
    prim('color.navy.800', '--color-navy-800', '#22242f'),
  ]},
  { label: 'Neutral', tokens: [
    prim('color.neutral.950', '--color-neutral-950', '#0a0a0a'),
    prim('color.neutral.0',   '--color-neutral-0',   '#ffffff'),
  ]},
  { label: 'Violet', tokens: [
    prim('color.violet.50',  '--color-violet-50',  '#f4f2ff'),
    prim('color.violet.100', '--color-violet-100', '#e4e0ff'),
    prim('color.violet.200', '--color-violet-200', '#d2ccfa'),
    prim('color.violet.300', '--color-violet-300', '#a78bfa'),
    prim('color.violet.400', '--color-violet-400', '#7b65e0'),
    prim('color.violet.500', '--color-violet-500', '#9178e6'),
    prim('color.violet.900', '--color-violet-900', '#15103a'),
    prim('color.violet.950', '--color-violet-950', '#0e0a18'),
  ]},
  { label: 'Green', tokens: [
    prim('color.green.300', '--color-green-300', '#4ae5b0'),
    prim('color.green.500', '--color-green-500', '#00c386'),
    prim('color.green.900', '--color-green-900', '#0a2e22'),
    prim('color.green.950', '--color-green-950', '#0a1f18'),
  ]},
  { label: 'Red', tokens: [
    prim('color.red.200', '--color-red-200', '#fca5a5'),
    prim('color.red.300', '--color-red-300', '#ff8585'),
    prim('color.red.400', '--color-red-400', '#ff6b6b'),
    prim('color.red.500', '--color-red-500', '#e85555'),
    prim('color.red.900', '--color-red-900', '#532831'),
    prim('color.red.950', '--color-red-950', '#2a0808'),
  ]},
  { label: 'Coral', tokens: [
    prim('color.coral.200', '--color-coral-200', '#ffb59b'),
    prim('color.coral.400', '--color-coral-400', '#fb7e5b'),
    prim('color.coral.900', '--color-coral-900', '#512e2c'),
    prim('color.coral.950', '--color-coral-950', '#2e0f06'),
  ]},
  { label: 'Blue', tokens: [
    prim('color.blue.300', '--color-blue-300', '#7ba8f2'),
    prim('color.blue.400', '--color-blue-400', '#5fa0fc'),
    prim('color.blue.900', '--color-blue-900', '#0a1635'),
    prim('color.blue.950', '--color-blue-950', '#06173b'),
  ]},
  { label: 'Magenta', tokens: [
    prim('color.magenta.200', '--color-magenta-200', '#f7b5de'),
    prim('color.magenta.400', '--color-magenta-400', '#e879c0'),
    prim('color.magenta.900', '--color-magenta-900', '#380d29'),
    prim('color.magenta.950', '--color-magenta-950', '#2c0a20'),
  ]},
  { label: 'Gold', tokens: [
    prim('color.gold.300', '--color-gold-300', '#fcd34d'),
    prim('color.gold.400', '--color-gold-400', '#f5b53d'),
    prim('color.gold.900', '--color-gold-900', '#3a2d0b'),
    prim('color.gold.950', '--color-gold-950', '#2a1d04'),
  ]},
  { label: 'Alpha', tokens: [
    prim('color.alpha.light-10', '--color-alpha-light-10', '#ffffff1a'),
    prim('color.alpha.light-18', '--color-alpha-light-18', '#ffffff2e'),
    prim('color.alpha.light-24', '--color-alpha-light-24', '#ffffff3d'),
    prim('color.alpha.light-25', '--color-alpha-light-25', '#ffffff40'),
    prim('color.alpha.light-40', '--color-alpha-light-40', '#ffffff66'),
    prim('color.alpha.light-48', '--color-alpha-light-48', '#f5f3ff7a'),
    prim('color.alpha.light-68', '--color-alpha-light-68', '#f5f3ffad'),
    prim('color.alpha.dark-10',  '--color-alpha-dark-10',  '#0a0a0a1a'),
    prim('color.alpha.dark-50',  '--color-alpha-dark-50',  '#0a0a0a80'),
    prim('color.alpha.glass-60', '--color-alpha-glass-60', '#3d3d3d99'),
  ]},
  { label: 'Gray', tokens: [
    prim('color.gray.240',    '--color-gray-240',    '#3d3d3d'),
    prim('color.gray-loading','--color-gray-loading','#1a1a1a'),
  ]},
  { label: 'Misc', tokens: [
    prim('color.mascot.inkwell',  '--color-mascot-inkwell',  '#9178e6'),
    prim('color.mascot.eyes',     '--color-mascot-eyes',     '#0a0a0a'),
    prim('color.violet-loading',  '--color-violet-loading',  '#aba9b3'),
    prim('color.red-loading',     '--color-red-loading',     '#cc3333'),
    prim('color.white.hint',      '--color-white-hint',      '#b3b3b3'),
    prim('color.white.transcript','--color-white-transcript','#d9d9d9'),
    prim('color.white.stat',      '--color-white-stat',      '#e6e6e6'),
    prim('color.yellow-verdict',  '--color-yellow-verdict',  '#ffcc33'),
  ]},
]

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Foundations/Colors',
  parameters: { layout: 'fullscreen' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

// ─── Stories ─────────────────────────────────────────────────────────────────

export const Background: Story = {
  render: () => <Page groups={[{ label: 'Background', tokens: BACKGROUND }]} />,
}

export const Interactive: Story = {
  render: () => <Page groups={[{ label: 'Interactive', tokens: INTERACTIVE }]} />,
}

export const Text: Story = {
  render: () => <Page groups={[{ label: 'Text', tokens: TEXT_TOKENS }]} />,
}

export const Border: Story = {
  render: () => <Page groups={[{ label: 'Border', tokens: BORDER_TOKENS }]} />,
}

export const Highlight: Story = {
  render: () => <Page groups={[{ label: 'Highlight', tokens: HIGHLIGHT_TOKENS }]} />,
}

export const Mascot: Story = {
  render: () => <Page groups={[{ label: 'Mascot', tokens: MASCOT_TOKENS }]} />,
}

export const Pro: Story = {
  render: () => <Page groups={[{ label: 'Pro', tokens: PRO_TOKENS }]} />,
}

export const Accent: Story = {
  render: () => <Page groups={ACCENT_TOKENS} />,
}

export const Feedback: Story = {
  render: () => <Page groups={FEEDBACK_TOKENS} />,
}

export const Primitives: Story = {
  render: () => <Page groups={PRIMITIVE_TOKENS} />,
}
