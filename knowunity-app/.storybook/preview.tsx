import type { Preview } from '@storybook/nextjs-vite'
import React from 'react'

// Load the generated design-system CSS (CSS custom properties for all
// tokens — colors, spacing, typography, etc.). Every story renders with
// the full token set applied, the same way the live app does.
// Source of truth: ../knowunity-sprint/tokens/tokens.json
// Regenerate with: npm run tokens
import '../styles/tokens.css'

const preview: Preview = {
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: 'var(--background-page)', minHeight: '100vh' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    // Dark mode only — one background option removes the light/dark
    // toggle from the toolbar so stories are never accidentally viewed
    // without the correct context. The color is --background-page
    // (#090c18), the deepest layer of the design system.
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          // Literal because Storybook's backgrounds addon writes this straight
          // onto the preview canvas, outside the token scope. Value is
          // --background-page; change it with that token.
          value: '#090c18',
        },
      ],
    },

    // Component stories default to 390px — the iOS mobile canvas width
    // this project targets. The viewport selector in the toolbar lets
    // you switch if needed.
    //
    // Documentation pages (MDX files, colour-swatch tables, etc.) are
    // NOT affected by this setting. They render as full-width HTML pages
    // in the Storybook panel, so a page of swatches has as much room as
    // the panel gives it.
    viewport: {
      defaultViewport: 'mobile390',
      viewports: {
        mobile390: {
          name: 'Mobile 390px',
          styles: {
            width: '390px',
            height: '844px',
          },
        },
      },
    },

    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
};

export default preview;