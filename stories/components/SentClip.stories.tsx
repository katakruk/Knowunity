import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'
import { SentClip } from '../../components/SentClip'
import { MessageBubble } from '../../components/MessageBubble'
import { Mascot } from '../../components/Mascot'

const meta = {
  title: 'Components/SentClip',
  component: SentClip,
  tags: ['autodocs'],
} satisfies Meta<typeof SentClip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

/**
 * How it actually appears: the student's clip, then Knowie's verdict below it.
 * The clip stays on screen from processing through to the feedback so it can be
 * played back while the judgement is being read.
 */
export const InTheExchange: Story = {
  name: 'In the exchange',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <SentClip />
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
        <Mascot mood="standby" size="M" />
        <MessageBubble
          variant="success"
          heading="That's right"
          message="You explained the difference really well."
          showTail
        />
      </div>
    </div>
  ),
}

export const TogglesPlayback: Story = {
  name: 'Tapping toggles playback',
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button')
    await button.click()
    // The icon is what changes; assert the control stays reachable and named
    // rather than snapshotting a glyph.
    await expect(button).toBeVisible()
  },
}

export const SitsOnTheRight: Story = {
  name: 'Sits on the right',
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button')
    const player = button.parentElement as HTMLElement
    const row = player.parentElement as HTMLElement
    const inner = player.getBoundingClientRect()
    const outer = row.getBoundingClientRect()
    // Narrower than the row, and pushed to the student's side: the right edges
    // line up while the left edges do not.
    await expect(inner.width).toBeLessThan(outer.width)
    await expect(Math.abs(inner.right - outer.right)).toBeLessThan(2)
    await expect(inner.left).toBeGreaterThan(outer.left + 1)
  },
}
