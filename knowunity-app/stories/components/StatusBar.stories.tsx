import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { StatusBar } from '../../components/StatusBar'

const meta = {
  title: 'Components/StatusBar',
  component: StatusBar,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof StatusBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { name: 'Default' }
export const CustomTime: Story = { name: 'Custom time', args: { time: '12:00' } }
