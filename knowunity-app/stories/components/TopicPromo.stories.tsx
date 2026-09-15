import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, fn, userEvent } from 'storybook/test'
import React from 'react'
import { TopicPromo } from '../../components/TopicPromo'

// ─── Docs ─────────────────────────────────────────────────────────────────────

// The "What it is" paragraph is the component set's description in Figma
// (Topic Promo 13646:15298), verbatim. Everything below it comes from the
// Topic Promo section of knowunity-sprint/.claude/knowledge/design-system.md.
const FIGMA_DESCRIPTION = `
**What it is**

Single-select topic row for the Topic Selection screen. One topic per session, so rows behave as radio buttons, not filters.

**When to use it**

The recents list on the Topic Selection screen, where the student picks the one topic for the session.

**What the states mean**

- **Unselected** - available but not chosen. Plain surface, regular label weight, empty circle.
- **Selected** - the chosen topic. \`background-stacking\` lifts the row off the surface, the label goes bold, and the indicator fills. Only one row in a list may be Selected at a time.

**Don't**

Don't use it as a filter or a multi-select list. The session takes exactly one topic, so a second Selected row is a bug.

Don't rely on the lifted fill alone to carry selection. The indicator and the label weight are what make it legible without colour.

Don't reach for it for the study-mode rail on the Main Screen. That's \`TopicChip\`.

**Accessibility**

Each row is a \`role="radio"\`. A radio must sit inside a \`role="radiogroup"\` with an accessible name, so the list container is the consumer's job, not this component's. The stories below supply one. See **In context: the recents list**.

**Known gaps carried over from Figma**

The notebook glyph is a fixed vector, not a swap slot, so every topic gets the same icon. Figma has the same limitation; its \`iconSlot\` set is the convention that would fix it in both places.

The glyph body binds \`pro.accent\`, which \`design-system.md\` documents as legacy ("New designs use \`pro.bold\`"). It is kept here so code and Figma agree, and it is flagged in the design-system doc.

Figma binds the filled indicator to \`text/link\`. This uses \`accent.brand.bold\` with its matching \`accent.brand.on-bold\` for the check, which is the same colour but a proper bold/on pair rather than a link colour on a control.
`

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Components/TopicPromo',
  component: TopicPromo,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: FIGMA_DESCRIPTION } },
  },
  // A lone radio is an a11y violation without a radiogroup parent, and the row
  // stretches to its container, so every story renders inside the 390px column
  // it is designed for.
  decorators: [
    Story => (
      <div
        role="radiogroup"
        aria-label="Topic"
        style={{ inlineSize: 390, padding: 16, boxSizing: 'border-box' }}
      >
        <Story />
      </div>
    ),
  ],
  args: {
    topic: 'Ancient Greece',
    onClick: fn(),
  },
  argTypes: {
    state: {
      control: 'inline-radio',
      options: ['Selected', 'Unselected'],
    },
  },
} satisfies Meta<typeof TopicPromo>

export default meta
type Story = StoryObj<typeof meta>

// ─── Variants, named after the Figma State axis ───────────────────────────────

export const Selected: Story = {
  args: { state: 'Selected' },
}

export const Unselected: Story = {
  args: { state: 'Unselected' },
}

// ─── Composition ──────────────────────────────────────────────────────────────

export const BothStates: Story = {
  name: 'Both states',
  render: args => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <TopicPromo {...args} topic="Ancient Greece" state="Selected" />
      <TopicPromo {...args} topic="Geometry" state="Unselected" />
    </div>
  ),
}

export const RecentsList: Story = {
  name: 'In context: the recents list',
  render: args => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <TopicPromo {...args} topic="Ancient Greece" state="Selected" />
      <TopicPromo {...args} topic="Geometry" state="Unselected" />
      <TopicPromo {...args} topic="English IELTS prep" state="Unselected" />
      <TopicPromo {...args} topic="Biology: cell structure" state="Unselected" />
    </div>
  ),
  play: async ({ canvas }) => {
    // Exactly one row may be chosen, because the session takes one topic.
    const radios = canvas.getAllByRole('radio')
    await expect(radios).toHaveLength(4)
    await expect(radios.filter(r => r.getAttribute('aria-checked') === 'true')).toHaveLength(1)
  },
}

export const LongTopic: Story = {
  name: 'Long topic name truncates',
  args: {
    state: 'Unselected',
    topic: 'The causes and consequences of the Peloponnesian War',
  },
  play: async ({ canvas }) => {
    // The label must truncate rather than push the indicator out of the row.
    const row = canvas.getByRole('radio')
    await expect(row.scrollWidth).toBeLessThanOrEqual(row.clientWidth)
  },
}

// ─── Interaction ──────────────────────────────────────────────────────────────

export const ClickFires: Story = {
  name: 'Tapping an Unselected row calls onClick',
  args: { state: 'Unselected' },
  play: async ({ canvas, args }) => {
    await userEvent.click(canvas.getByRole('radio'))
    await expect(args.onClick).toHaveBeenCalled()
  },
}

export const SelectedIsAnnounced: Story = {
  name: 'Selected row is announced as checked',
  args: { state: 'Selected' },
  play: async ({ canvas }) => {
    const row = canvas.getByRole('radio', { name: 'Ancient Greece' })
    await expect(row).toBeChecked()
  },
}
