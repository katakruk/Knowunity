import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'
import { TopNavigation } from '../../components/TopNavigation'

const meta = {
  title: 'Components/TopNavigation',
  component: TopNavigation,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen', backgrounds: { default: 'dark' } },
  args: { onMenuClick: fn() },
} satisfies Meta<typeof TopNavigation>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { name: 'Default', args: { xp: 1240, streakDays: 7 } }
export const NewUser: Story = { name: 'New user', args: { xp: 0, streakDays: 0 } }
