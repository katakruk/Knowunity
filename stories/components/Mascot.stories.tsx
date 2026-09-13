import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import React from 'react'
import { Mascot } from '../../components/Mascot'

const meta = {
  title: 'Components/Mascot',
  component: Mascot,
  tags: ['autodocs'],
  parameters: {
    backgrounds: { default: 'dark' },
  },
} satisfies Meta<typeof Mascot>

export default meta
type Story = StoryObj<typeof meta>

export const Standby: Story = { name: 'Standby', args: { mood: 'standby', size: 'L' } }
export const Excited: Story = { name: 'Excited', args: { mood: 'excited', size: 'L' } }
export const AllSizes: Story = {
  name: 'All sizes',
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-end' }}>
      {(['S', 'M', 'L', 'XL'] as const).map(size => (
        <Mascot key={size} mood="standby" size={size} />
      ))}
    </div>
  ),
}
