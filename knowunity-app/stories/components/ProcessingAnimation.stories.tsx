import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ProcessingAnimation } from '../../components/ProcessingAnimation'

const meta = {
  title: 'Components/ProcessingAnimation',
  component: ProcessingAnimation,
  tags: ['autodocs'],
  parameters: { backgrounds: { default: 'dark' } },
} satisfies Meta<typeof ProcessingAnimation>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { name: 'Processing' }
