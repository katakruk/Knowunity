import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { MessageBubble } from '../../components/MessageBubble'

const meta = {
  title: 'Components/MessageBubble',
  component: MessageBubble,
  tags: ['autodocs'],
  parameters: { backgrounds: { default: 'dark' } },
  args: { message: 'What are the main causes of World War I?' },
} satisfies Meta<typeof MessageBubble>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { name: 'Default', args: { variant: 'default', showTail: true } }
export const WithTail: Story = { name: 'With tail', args: { variant: 'default', showTail: true, message: 'Now record your answer — try to say it out loud.' } }
export const Success: Story = {
  name: 'Success',
  args: {
    variant: 'success',
    heading: 'Great answer!',
    message: 'You nailed it — alliances, nationalism, and the assassination of Franz Ferdinand.',
    showTail: true,
  },
}
export const Almost: Story = {
  name: 'Almost',
  args: {
    variant: 'almost',
    heading: 'Almost!',
    message: 'You mentioned alliances but forgot nationalism. Want to try again?',
    showTail: true,
  },
}
