import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'
import { ChatInput } from '../../components/ChatInput'

const meta = {
  title: 'Components/ChatInput',
  component: ChatInput,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen', backgrounds: { default: 'dark' } },
  args: { onPlusClick: fn(), onMicClick: fn(), onChange: fn() },
} satisfies Meta<typeof ChatInput>

export default meta
type Story = StoryObj<typeof meta>

export const Empty: Story = { name: 'Empty', args: { placeholder: 'Ask Knowie anything…' } }
export const WithValue: Story = { name: 'With value', args: { value: 'What caused WWI?', placeholder: 'Ask Knowie anything…' } }
