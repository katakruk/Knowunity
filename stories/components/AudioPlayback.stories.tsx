import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'
import { AudioPlayback } from '../../components/AudioPlayback'

const meta = {
  title: 'Components/AudioPlayback',
  component: AudioPlayback,
  tags: ['autodocs'],
  parameters: { backgrounds: { default: 'dark' } },
  args: { onToggle: fn() },
} satisfies Meta<typeof AudioPlayback>

export default meta
type Story = StoryObj<typeof meta>

export const Paused: Story = { name: 'Paused', args: { isPlaying: false } }
export const Playing: Story = { name: 'Playing', args: { isPlaying: true } }
