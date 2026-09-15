import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'
import { Scaffold } from '../../components/Scaffold'
import { StatusBar } from '../../components/StatusBar'
import { RecallHeader } from '../../components/RecallHeader'
import { MessageBubble } from '../../components/MessageBubble'
import { Button } from '../../components/Button'

const meta = {
  title: 'Components/Scaffold',
  component: Scaffold,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Scaffold>

export default meta
type Story = StoryObj<typeof meta>

/**
 * The bare shell: dark page, 390px, safe areas. Nothing in it.
 */
export const Empty: Story = {
  args: {
    chrome: <StatusBar />,
  },
}

/**
 * The composition every recall screen uses: edge-to-edge chrome, padded
 * content, a thumb-zone footer.
 */
export const WithChromeAndFooter: Story = {
  args: {
    chrome: (
      <>
        <StatusBar />
        <RecallHeader progress={0.4} xp={2} />
      </>
    ),
    children: <MessageBubble message="Content sits inside the 16px screen margins." showTail />,
    footer: (
      <Button variant="Primary" size="L">
        Continue
      </Button>
    ),
  },
}

/**
 * Two library components stacked, which is the thing screen 0 exists to prove:
 * that they compose without fighting over spacing.
 */
export const SmokeTest: Story = {
  args: {
    chrome: <StatusBar />,
    children: (
      <>
        <MessageBubble message="What are the main causes of World War I?" showTail />
        <MessageBubble
          message="You nailed it — alliances, nationalism, and the assassination of Franz Ferdinand."
          heading="Great answer!"
          variant="success"
          showTail
        />
      </>
    ),
    footer: (
      <Button variant="Primary" size="L">
        Continue
      </Button>
    ),
  },
}

/**
 * The canvas is capped at 390px however wide the window is, so the phone never
 * stretches on a desktop browser.
 */
export const CanvasIsCappedAt390: Story = {
  args: {
    chrome: <StatusBar />,
    children: <MessageBubble message="Capped." showTail />,
  },
  play: async ({ canvas }) => {
    const bubble = canvas.getByText('Capped.')
    const shell = bubble.closest('div[class*="root"]')
    await expect(shell).not.toBeNull()
    await expect((shell as HTMLElement).getBoundingClientRect().width).toBeLessThanOrEqual(390)
  },
}
