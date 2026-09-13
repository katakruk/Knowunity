import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { RecordingTimer } from '../../components/RecordingTimer'

const meta = {
  title: 'Components/RecordingTimer',
  component: RecordingTimer,
  tags: ['autodocs'],
  parameters: { backgrounds: { default: 'dark' } },
} satisfies Meta<typeof RecordingTimer>

export default meta
type Story = StoryObj<typeof meta>

export const Idle: Story = { name: 'Idle', args: { time: '0:00', isRecording: false } }
export const Recording: Story = { name: 'Recording', args: { time: '0:23', isRecording: true } }
