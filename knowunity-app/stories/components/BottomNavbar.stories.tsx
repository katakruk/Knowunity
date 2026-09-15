import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'
import { BottomNavbar } from '../../components/BottomNavbar'

const meta = {
  title: 'Components/BottomNavbar',
  component: BottomNavbar,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen', backgrounds: { default: 'dark' } },
  args: { onTabChange: fn() },
} satisfies Meta<typeof BottomNavbar>

export default meta
type Story = StoryObj<typeof meta>

export const Search: Story = { name: 'Search active', args: { active: 'search' } }
export const Goals: Story = { name: 'Goals active', args: { active: 'goals' } }
export const Achievements: Story = { name: 'Achievements active', args: { active: 'achievements' } }
export const Knowie: Story = { name: 'Knowie active', args: { active: 'knowie' } }
export const Profile: Story = { name: 'Profile active', args: { active: 'profile' } }
