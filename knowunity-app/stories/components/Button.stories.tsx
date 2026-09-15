import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, fn, userEvent } from 'storybook/test'
import React from 'react'
import { Button } from '../../components/Button'
import type { ButtonSize, ButtonState, ButtonVariant } from '../../components/Button'

// ─── Docs ─────────────────────────────────────────────────────────────────────
// Verbatim from the component set's description in Figma (9003:6667).

const FIGMA_DESCRIPTION = `
**What it is**

Primary call-to-action with 3 visual styles (Primary/Secondary/Tertiary), 3 sizes, and 4 interaction states. Supports optional left/right icons and editable text.

**When to use it**

For main actions users need to take: submitting forms, confirming choices, or progressing through flows. Primary variant used most in example screens (Large size).

**Don't**

Use Primary variant for multiple actions on the same screen. It dilutes focus. Save Primary for the one key action.

---

**Notes on this implementation**

Nothing was reused: Storybook held only the four Foundations docs pages (Colors, Radius, Spacing, Typography) and no components, so this is the first component in the library.

Colours come from \`design-system.md\`, not from Figma's bindings, because the design owner named the doc as the source of truth where the two disagreed. Figma left Pressed identical to Default, bound Disabled to \`background/surface\`, and bound Loading to the resting fill; the doc's \`interactive.*Active\`, \`interactive.disabled\` and \`interactive.*Loading\` are used instead.

The \`<button>\` element is the 48px touch target from \`platform-constraints.md\` and the coloured pill is a child of it, so the 32px and 40px pills keep their drawn height without shrinking the hit area.

Tertiary is not documented in \`design-system.md\`. Its default, disabled and loading colours follow Figma (\`text/primary\`, \`text/disabled\`, \`text/link\`). Its pressed state uses \`interactive.overlay.pressed\`, the doc's touch-feedback layer for dark surfaces, rather than a new \`interactive.tertiary\` token.
`

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: FIGMA_DESCRIPTION } },
  },
  // Secondary's fill and Tertiary's pressed overlay are both white at low
  // alpha, so their real contrast depends on what sits behind them. Without an
  // opaque ancestor axe gives up and measures against white, which is both
  // wrong and not a situation these buttons are ever in: they sit on the page
  // background. Painting it here makes the a11y check measure the real thing.
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
    children: 'Start recall',
    variant: 'Primary',
    size: 'L',
    state: 'Default',
    showLeftIcon: false,
    showRightIcon: false,
    onClick: fn(),
  },
  argTypes: {
    variant: {
      options: ['Primary', 'Secondary', 'Tertiary'] satisfies ButtonVariant[],
      control: 'inline-radio',
      description: 'Figma variant axis `variant`.',
    },
    size: {
      options: ['S', 'M', 'L'] satisfies ButtonSize[],
      control: 'inline-radio',
      description: 'Figma variant axis `size`.',
    },
    state: {
      options: ['Default', 'Pressed', 'Disabled', 'Loading'] satisfies ButtonState[],
      control: 'inline-radio',
      description: 'Figma variant axis `state`.',
    },
    showLeftIcon: { control: 'boolean', description: 'Figma boolean property `showLeftIcon`.' },
    showRightIcon: { control: 'boolean', description: 'Figma boolean property `showRightIcon`.' },
    children: { control: 'text', description: 'Figma text property `CTA`.' },
    leftIcon: { control: false },
    rightIcon: { control: false },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// ─── One story per Figma variant, named the way Figma names them ─────────────
// Size L is the size the Figma description calls out as the most used.

export const PrimaryLDefault: Story = {
  name: 'Primary, L, Default',
  args: { variant: 'Primary', size: 'L', state: 'Default' },
}

export const PrimaryLPressed: Story = {
  name: 'Primary, L, Pressed',
  args: { variant: 'Primary', size: 'L', state: 'Pressed' },
}

export const PrimaryLDisabled: Story = {
  name: 'Primary, L, Disabled',
  args: { variant: 'Primary', size: 'L', state: 'Disabled' },
}

export const PrimaryLLoading: Story = {
  name: 'Primary, L, Loading',
  args: { variant: 'Primary', size: 'L', state: 'Loading' },
}

export const SecondaryLDefault: Story = {
  name: 'Secondary, L, Default',
  args: { variant: 'Secondary', size: 'L', state: 'Default' },
}

export const SecondaryLPressed: Story = {
  name: 'Secondary, L, Pressed',
  args: { variant: 'Secondary', size: 'L', state: 'Pressed' },
}

export const SecondaryLDisabled: Story = {
  name: 'Secondary, L, Disabled',
  args: { variant: 'Secondary', size: 'L', state: 'Disabled' },
}

export const SecondaryLLoading: Story = {
  name: 'Secondary, L, Loading',
  args: { variant: 'Secondary', size: 'L', state: 'Loading' },
}

export const TertiaryLDefault: Story = {
  name: 'Tertiary, L, Default',
  args: { variant: 'Tertiary', size: 'L', state: 'Default' },
}

export const TertiaryLPressed: Story = {
  name: 'Tertiary, L, Pressed',
  args: { variant: 'Tertiary', size: 'L', state: 'Pressed' },
}

export const TertiaryLDisabled: Story = {
  name: 'Tertiary, L, Disabled',
  args: { variant: 'Tertiary', size: 'L', state: 'Disabled' },
}

export const TertiaryLLoading: Story = {
  name: 'Tertiary, L, Loading',
  args: { variant: 'Tertiary', size: 'L', state: 'Loading' },
}

// ─── Full grid, so all 36 Figma cells are visible ───────────────────────────

const VARIANTS: ButtonVariant[] = ['Primary', 'Secondary', 'Tertiary']
const STATES: ButtonState[] = ['Default', 'Pressed', 'Disabled', 'Loading']

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

function VariantGrid({ size }: { size: ButtonSize }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-600)',
        padding: 'var(--space-400)',
        background: 'var(--background-page)',
      }}
    >
      {VARIANTS.map(variant => (
        <div key={variant} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-200)' }}>
          <GridLabel>{`${variant}, ${size}`}</GridLabel>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--space-300)' }}>
            {STATES.map(state => (
              <div key={state} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-100)' }}>
                <Button variant={variant} size={size} state={state}>
                  Start recall
                </Button>
                <GridLabel>{state}</GridLabel>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export const AllStatesSizeS: Story = {
  name: 'All variants, S, all states',
  parameters: { layout: 'fullscreen' },
  render: () => <VariantGrid size="S" />,
}

export const AllStatesSizeM: Story = {
  name: 'All variants, M, all states',
  parameters: { layout: 'fullscreen' },
  render: () => <VariantGrid size="M" />,
}

export const AllStatesSizeL: Story = {
  name: 'All variants, L, all states',
  parameters: { layout: 'fullscreen' },
  render: () => <VariantGrid size="L" />,
}

// ─── Icon slots ─────────────────────────────────────────────────────────────

export const ShowLeftIcon: Story = {
  name: 'showLeftIcon',
  args: { showLeftIcon: true },
}

export const ShowRightIcon: Story = {
  name: 'showRightIcon',
  args: { showRightIcon: true },
}

export const ShowBothIcons: Story = {
  name: 'showLeftIcon + showRightIcon',
  args: { showLeftIcon: true, showRightIcon: true },
}

// ─── Behaviour ──────────────────────────────────────────────────────────────

export const ClickFires: Story = {
  name: 'Tapping a Default button calls onClick',
  args: { state: 'Default' },
  play: async ({ args, canvas }) => {
    const button = canvas.getByRole('button', { name: 'Start recall' })
    await expect(button).toBeEnabled()
    await userEvent.click(button)
    await expect(args.onClick).toHaveBeenCalledOnce()
  },
}

export const DisabledSwallowsClick: Story = {
  name: 'Disabled blocks onClick',
  args: { state: 'Disabled' },
  play: async ({ args, canvas }) => {
    const button = canvas.getByRole('button', { name: 'Start recall' })
    await expect(button).toBeDisabled()
    await userEvent.click(button, { pointerEventsCheck: 0 })
    await expect(args.onClick).not.toHaveBeenCalled()
  },
}

export const TouchTargetHoldsTheMinimum: Story = {
  name: 'Size S keeps the minimum touch target',
  args: { size: 'S' },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: 'Start recall' })
    const pill = button.firstElementChild as HTMLElement

    const read = (name: string) =>
      parseFloat(getComputedStyle(document.documentElement).getPropertyValue(name))

    // The 48px floor from platform-constraints.md lives on the button, and the
    // 32px pill sits inside it. If the pill ever becomes the button box again
    // this is the assertion that catches it.
    await expect(button.getBoundingClientRect().height).toBe(read('--touch-target-minimum'))
    await expect(pill.getBoundingClientRect().height).toBe(read('--control-height-s'))
  },
}

export const LoadingSwallowsClickAndKeepsItsName: Story = {
  name: 'Loading blocks onClick and keeps its accessible name',
  args: { state: 'Loading' },
  play: async ({ args, canvas }) => {
    // The label is hidden visually but stays in the accessibility tree, so the
    // button is still findable by its name while it is busy.
    const button = canvas.getByRole('button', { name: 'Start recall' })
    await expect(button).toHaveAttribute('aria-busy', 'true')
    await expect(button).toBeDisabled()
    await userEvent.click(button, { pointerEventsCheck: 0 })
    await expect(args.onClick).not.toHaveBeenCalled()
  },
}
