import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import React from 'react'
import { fn } from 'storybook/test'
import { TopicChip } from '../../components/TopicChip'

const meta = {
  title: 'Components/TopicChip',
  component: TopicChip,
  tags: ['autodocs'],
  parameters: { backgrounds: { default: 'dark' } },
  args: { onClick: fn(), label: 'Flashcards' },
} satisfies Meta<typeof TopicChip>

export default meta
type Story = StoryObj<typeof meta>

export const Flashcard: Story = { name: 'Flashcard', args: { type: 'flashcard', label: 'Flashcards' } }
export const Quiz: Story = { name: 'Quiz', args: { type: 'quiz', label: 'Quiz' } }
export const Note: Story = { name: 'Note', args: { type: 'note', label: 'Notes' } }
export const Summary: Story = { name: 'Summary', args: { type: 'summary', label: 'Summary' } }
export const ActiveRecall: Story = { name: 'Active recall', args: { type: 'activeRecall', label: 'Active recall', active: true } }
export const AllChips: Story = {
  name: 'All chips',
  render: (args) => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <TopicChip {...args} type="flashcard" label="Flashcards" />
      <TopicChip {...args} type="quiz" label="Quiz" />
      <TopicChip {...args} type="note" label="Notes" />
      <TopicChip {...args} type="summary" label="Summary" />
      <TopicChip {...args} type="activeRecall" label="Active recall" active />
    </div>
  ),
}
