import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'
import { RecallHeader } from '../../components/RecallHeader'

const meta = {
  title: 'Components/RecallHeader',
  component: RecallHeader,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: { xp: 2, onClose: fn() },
} satisfies Meta<typeof RecallHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Start: Story = { name: 'Start (0%)', args: { progress: 0 } }
export const Mid: Story = { name: 'Mid (40%)', args: { progress: 0.4 } }
export const NearEnd: Story = { name: 'Near end (80%)', args: { progress: 0.8 } }
