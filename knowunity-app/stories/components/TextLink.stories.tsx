import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, fn } from 'storybook/test'
import { TextLink } from '../../components/TextLink'

const meta = {
  title: 'Components/TextLink',
  component: TextLink,
  tags: ['autodocs'],
  args: { onClick: fn(), children: 'Show more' },
} satisfies Meta<typeof TextLink>

export default meta
type Story = StoryObj<typeof meta>

export const ShowMore: Story = {
  args: { children: 'Show more', align: 'end' },
}

export const SkipThisQuestion: Story = {
  args: { children: 'Skip this question', align: 'end' },
}

export const Disabled: Story = {
  args: { children: 'Show more', disabled: true },
}

export const TappingCallsOnClick: Story = {
  name: 'Tapping calls onClick',
  play: async ({ canvas, args }) => {
    await canvas.getByRole('button', { name: 'Show more' }).click()
    await expect(args.onClick).toHaveBeenCalled()
  },
}

export const DisabledSwallowsClick: Story = {
  name: 'Disabled swallows the click',
  args: { disabled: true },
  play: async ({ canvas, args }) => {
    const el = canvas.getByRole('button', { name: 'Show more' })
    await expect(el).toBeDisabled()
    await expect(args.onClick).not.toHaveBeenCalled()
  },
}

export const TouchTargetHoldsTheMinimum: Story = {
  name: 'Touch target holds the minimum',
  play: async ({ canvas }) => {
    const el = canvas.getByRole('button', { name: 'Show more' })
    // platform-constraints.md: 44px floor, and there is no hover on mobile to
    // make up for a small target.
    await expect(el.getBoundingClientRect().height).toBeGreaterThanOrEqual(44)
  },
}
