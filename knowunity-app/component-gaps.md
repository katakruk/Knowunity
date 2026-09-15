# Component gaps

Things a screen needed that Storybook did not have.

One line per gap: what it was, which screen needed it, how it was handled. If a
gap appears here twice, from two different screens, it stops being a workaround
and becomes a real component with a story. See `.claude/skills/build-screen`.

## Open

- **No blur or elevation tokens** — exit confirmation. `background.floating` is
  glass at 60% opacity, which implies a backdrop blur, and the system has no blur
  token to pair with it. The sheet layers floating over an opaque
  `background.surface` instead, the same way `design-system.md` layers
  `background.stacking` on Topic Promo. A `blur.*` scale would settle it properly.
- **No sheet or dialog component** — exit confirmation. Built inside the screen
  from tokens: scrim, bottom-anchored surface, `role="dialog"` with
  `aria-modal`. Second thing that needs a sheet should promote it to a component.
- **Per-row icon accent on `TopicPromo`** — topic selection. Figma draws a
  different accent colour on each row's notebook; the component has no accent,
  icon or `className` prop, and its glyph is a raw vector group. Worked around in
  `TopicSelection.module.css` by overriding `--pro-accent` per row with
  `nth-child`. Proper fix is an accent prop on the component. Also means the Main
  Screen chip rail will not inherit the colours.
- **Multi-paragraph bubble content** — term prompt, recording, review. The Figma
  bubbles carry a lead-in line, a blank line, then the question. `MessageBubble`
  renders `message` as a single `<p>` and exposes no hook for its inner text, so
  the screens set `white-space: pre-line` on the descendant `p` and pass `\n\n`.
  Second occurrence of this should become a `paragraphs` prop or a slot.
- **Reduced-motion state for `ProcessingAnimation` and `RecordingTimer`** —
  recording, processing. Neither component handles `prefers-reduced-motion`, so
  the blanket guard in `globals.css` freezes them: the orbiting particles stop
  mid-orbit in a vertical stack, which reads as a glitch rather than a calm
  state. Status is still legible from the "Considering ...." line and the
  counting timer, so nothing is broken, but "reduce, do not remove" is not met.
  Fix belongs inside the components; the visual design is Open in SPEC.md.
- **No 84px mascot** — term prompt, recording, review, feedback pass. Figma draws
  the mascot at 84px on every loop frame. `Mascot` has S=40, M=64, L=120, and the
  illustration token scale has no 84 either (500=40, 800=64, 1500=120). Using M.
  Figma is the thing off-scale here, not the code.

## Resolved

- **Sent clip** — needed by processing, then by every feedback frame once the clip
  was added to them in Figma on 2026-09-14. Second occurrence, so built properly:
  now `components/SentClip/` with a story. Right-aligned and narrower than the
  review-audio bar, which stays full width because it is still actionable. Owns its
  own play state.
- **Text link** — needed by topic selection ("Show more") and then the term prompt
  ("Skip this question"). Second occurrence, so built properly: now
  `components/TextLink/` with a story. Label-only, no pill, 44px target. Both
  screens use it.

- **Device shell** — needed by every screen. `platform-constraints.md` refers to a
  `scaffold` in the design system but nothing was built. Now
  `components/Scaffold/`, owning the 390px canvas, safe areas and screen margins.
- **`role="radiogroup"` wrapper** — topic selection. `TopicPromo` renders
  `role="radio"` and its docs require a named group around it. Now
  `components/RadioGroup/`.

## Bugs found in library components while building screens

Fixed in place rather than worked around, because in each case the component
contradicted its own documentation or the platform constraints.

- **`TopicChip` never rendered the activeRecall mic.** Its own prop docs say
  "activeRecall renders the mic icon inline", the Figma frame draws a mic, and
  `ICONS.activeRecall` was `null`. Now wired to `MicSmallIcon`. Found building the
  main screen.
- **`ChatInput` overflowed the canvas at 320px.** Its `<input>` is `flex: 1` but an
  input carries an intrinsic minimum width, and flex items do not shrink past that
  without `min-inline-size: 0`. Pushed the document 9px wider than an iPhone SE.
  Found building the main screen.

## Missing tokens

Not component gaps, but the same kind of problem. Flag rather than invent.

- **No amber accent.** The accent set is brand, coral, magenta, blue, green.
  Figma's second topic row is amber; green is standing in for it.
- **No `interactive.tertiary`.** Deliberate: `Button`'s Tertiary variant borrows
  `--interactive-overlay-pressed`, documented in `Button.module.css`.
- **No token for a recording pulse.** `RecordingTimer` and `ProcessingAnimation`
  use primitives, which `design-system.md` records as known.
