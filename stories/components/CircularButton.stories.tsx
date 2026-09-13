import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, fn, userEvent } from 'storybook/test'
import React from 'react'
import { CircularButton, DOC_BINDING_CLASS } from '../../components/CircularButton'
import type { CircularButtonIcon, CircularButtonSize } from '../../components/CircularButton'

// ─── Docs ─────────────────────────────────────────────────────────────────────

const FIGMA_DESCRIPTION = `
**What it is**

Circular action buttons for recording controls. Use for primary recording actions (pause, delete, send). Size L for the main action, Size S for secondary actions. Don't use for navigation or non-recording actions - use standard rectangular buttons instead.

**When to use it**

Recording controls in the active recall flow: pause and resume recording, delete recording, send response.

**Don't**

Don't use for navigation, page actions, or non-recording features. Don't use Size L for secondary actions, keep it for the primary control.

---

**Read this before you trust the colours**

Figma and \`design-system.md\` disagree about what this component looks like, and not by a little. Figma binds it to the **primary** ladder: a near-white circle with a near-black glyph. The doc binds it to the **secondary** ladder: a translucent white circle with a light glyph.

| | Figma binds | design-system.md says | Shipped |
| --- | --- | --- | --- |
| Background, Default | \`interactive/primary\` | \`interactive.secondary\` | \`interactive.primary\` |
| Background, Pressed | \`interactive/primaryActive\` | \`interactive.secondaryActive\` | \`interactive.primaryActive\` |
| Icon | \`accent/brand/onBold\` | \`interactive.onSecondary\` | \`interactive.onPrimary\` |

**Figma wins here**, against the usual rule that the doc wins, because this component set lives on a Figma page named "New Components" and is newer than the doc section describing it. **\`design-system.md\` lines 264-267 need updating.** The story **"Compared with design-system.md"** shows both readings side by side.

The one place Figma is not followed is the glyph. Figma pairs its \`interactive/primary\` background with an \`accent/brand/onBold\` glyph, which skips the matching "on" token that the doc explicitly forbids skipping. The glyph uses \`interactive.onPrimary\`. The two values are one shade apart, and the pairing is a mistake in either reading.

**Other things found in the Figma set**

The L pressed variant is misnamed \`State=Presse\`. The doc spells it Pressed, so the prop uses Pressed.

The four variants are built three different ways: S/Default, S/Pressed and L/Presse use an \`ELLIPSE\` child named Background with the icon layered on top, while L/Default is an auto-layout frame with its own fill and a 40px corner radius. All four render as the same circle, so this is one implementation.

The icon set is inconsistent too: Mic and Delete are filled, Send and Pause are stroked with a hardcoded black and bound to no variable at all. All four are normalised to \`currentColor\` in \`components/icons\`, so the button owns the colour through one token.

There is no Disabled and no Loading variant in this set, unlike the pill Button, so this component has neither. \`disabled\` is deliberately not accepted as a prop rather than shipped with an undesigned appearance.

**Reuse**

The pill \`Button\` was not reused. It is a text-labelled pill with a three-variant colour ladder and four states; this is a fixed-diameter icon-only circle with two states and no label. Sharing an implementation would mean bending both. The new \`components/icons\` module is shared and will be reused by whatever needs Mic, Delete, Send or Pause next.
`

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Components/Button Circular',
  component: CircularButton,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: FIGMA_DESCRIPTION } },
  },
  // The doc's resting fill is white at 10% alpha, so its real contrast depends
  // on what sits behind it. Without an opaque ancestor axe gives up and measures
  // against white, which is both wrong and not a situation this button is ever
  // in: it sits on the page background.
  decorators: [
    Story => (
      <div
        style={{
          display: 'inline-flex',
          padding: 'var(--space-400)',
          background: 'var(--background-page)',
        }}
      >
        <Story />
      </div>
    ),
  ],
  args: {
    label: 'Start recording',
    size: 'S',
    state: 'Default',
    icon: 'Mic',
    onClick: fn(),
  },
  argTypes: {
    size: {
      options: ['S', 'L'] satisfies CircularButtonSize[],
      control: 'inline-radio',
      description: 'Figma variant axis `Size`.',
    },
    state: {
      options: ['Default', 'Pressed'],
      control: 'inline-radio',
      description: 'Figma variant axis `State`.',
    },
    icon: {
      options: ['Mic', 'Delete', 'Send', 'Pause'] satisfies CircularButtonIcon[],
      control: 'select',
      description: 'Figma instance-swap property `icon`.',
    },
    label: { control: 'text', description: 'Accessible name. Required.' },
  },
} satisfies Meta<typeof CircularButton>

export default meta
type Story = StoryObj<typeof meta>

// ─── One story per Figma variant, named the way Figma names them ─────────────

export const SDefault: Story = {
  name: 'S, Default',
  args: { size: 'S', state: 'Default' },
}

export const SPressed: Story = {
  name: 'S, Pressed',
  args: { size: 'S', state: 'Pressed' },
}

export const LDefault: Story = {
  name: 'L, Default',
  args: { size: 'L', state: 'Default' },
}

export const LPressed: Story = {
  name: 'L, Pressed',
  args: { size: 'L', state: 'Pressed' },
}

// ─── Grids ──────────────────────────────────────────────────────────────────

function GridLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontFamily: 'var(--typography-caption-m-bold-family)',
        fontSize: 'var(--typography-caption-m-bold-size)',
        fontWeight: 'var(--typography-caption-m-bold-weight)',
        lineHeight: 'var(--typography-caption-m-bold-line-height)',
        letterSpacing: 'var(--typography-caption-m-bold-letter-spacing)',
        textTransform: 'uppercase',
        color: 'var(--text-tertiary)',
      }}
    >
      {children}
    </div>
  )
}

const ICONS: CircularButtonIcon[] = ['Mic', 'Delete', 'Send', 'Pause']

export const AllSizesAndStates: Story = {
  name: 'All sizes, all states',
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-600)' }}>
      {(['S', 'L'] as CircularButtonSize[]).map(size => (
        <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-200)' }}>
          <GridLabel>{`Size ${size}`}</GridLabel>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-400)' }}>
            {(['Default', 'Pressed'] as const).map(state => (
              <div key={state} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-100)' }}>
                <CircularButton label="Start recording" size={size} state={state} icon="Mic" />
                <GridLabel>{state}</GridLabel>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
}

export const AllIcons: Story = {
  name: 'All icon options',
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-600)' }}>
      {(['S', 'L'] as CircularButtonSize[]).map(size => (
        <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-200)' }}>
          <GridLabel>{`Size ${size}`}</GridLabel>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-400)' }}>
            {ICONS.map(icon => (
              <div key={icon} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-100)' }}>
                <CircularButton label={icon} size={size} icon={icon} />
                <GridLabel>{icon}</GridLabel>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
}

// ─── The open decision ──────────────────────────────────────────────────────

export const BindingComparison: Story = {
  name: 'Compared with design-system.md',
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-600)' }}>
      {[
        { title: 'Figma — shipped', cls: undefined },
        { title: 'design-system.md — not shipped, doc is stale', cls: DOC_BINDING_CLASS },
      ].map(({ title, cls }) => (
        <div key={title} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-200)' }}>
          <GridLabel>{title}</GridLabel>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-400)' }}>
            {(['Default', 'Pressed'] as const).map(state => (
              <div key={state} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-100)' }}>
                <CircularButton label="Start recording" size="L" state={state} icon="Mic" className={cls} />
                <GridLabel>{state}</GridLabel>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
}

// ─── Intended composition ───────────────────────────────────────────────────

export const RecordingControls: Story = {
  name: 'In context: recording controls',
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--space-600)',
        padding: 'var(--space-600)',
      }}
    >
      <CircularButton label="Delete recording" size="S" icon="Delete" />
      <CircularButton label="Pause recording" size="L" icon="Pause" />
      <CircularButton label="Send response" size="S" icon="Send" />
    </div>
  ),
}

// ─── Behaviour ──────────────────────────────────────────────────────────────

export const ClickFires: Story = {
  name: 'Tapping calls onClick',
  play: async ({ args, canvas }) => {
    const button = canvas.getByRole('button', { name: 'Start recording' })
    await userEvent.click(button)
    await expect(args.onClick).toHaveBeenCalledOnce()
  },
}

export const TouchTargetHoldsTheMinimum: Story = {
  name: 'Both sizes clear the minimum touch target',
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-400)' }}>
      <CircularButton label="Small" size="S" icon="Mic" />
      <CircularButton label="Large" size="L" icon="Mic" />
    </div>
  ),
  play: async ({ canvas }) => {
    const read = (name: string) =>
      parseFloat(getComputedStyle(document.documentElement).getPropertyValue(name))
    const minimum = read('--touch-target-minimum')

    const small = canvas.getByRole('button', { name: 'Small' }).getBoundingClientRect()
    const large = canvas.getByRole('button', { name: 'Large' }).getBoundingClientRect()

    // S is exactly the minimum, which is why this component is its own hit area
    // rather than sitting inside a wrapper the way the pill Button does.
    await expect(small.width).toBe(read('--control-circular-s'))
    await expect(small.width).toBe(minimum)
    await expect(large.width).toBe(read('--control-circular-l'))
    await expect(large.width).toBeGreaterThan(minimum)

    // Circles, not ovals.
    await expect(small.width).toBe(small.height)
    await expect(large.width).toBe(large.height)
  },
}

export const IconOnlyButtonIsNamed: Story = {
  name: 'Icon-only button carries an accessible name',
  args: { label: 'Delete recording', icon: 'Delete' },
  play: async ({ canvas }) => {
    // There is no text in this button, so the label prop is the only thing
    // standing between it and being announced as "button".
    await expect(canvas.getByRole('button', { name: 'Delete recording' })).toBeInTheDocument()
  },
}
