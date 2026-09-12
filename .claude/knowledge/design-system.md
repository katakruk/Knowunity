# Knowie Design System

Design token values live in `tokens/tokens.json` (at the repo root). This document covers when to use what, how components are structured, and what to avoid.

## Token layers

The system has two layers:

**Primitives** (`color.*`, `font.*`, `space.*`, `radius.*`, etc.) hold raw values. These exist to be referenced, not consumed directly.

**Semantic tokens** (`background.*`, `interactive.*`, `text.*`, etc.) reference primitives and carry usage guidance. Components always consume the semantic layer.

If you're building a component and find yourself reaching for `color.violet.500`, stop. Find the semantic token that describes *why* you need that color, not *what* it looks like.

## Color usage

### Backgrounds

- `background.page` — The deepest canvas layer. Use for app backgrounds and root containers.
- `background.surface` — Cards, panels, main content areas that sit above the page.
- `background.floating` — Modals, tooltips, dropdowns that float above other content.
- `background.stacking` — White overlays for emphasis on dark surfaces.
- `background.input` — Text fields and form inputs.
- `background.inverse` — Light backgrounds when inverting the dark UI (rare).
- `background.scrim` — Semi-transparent overlay behind modals.

### Interactive elements

Buttons use a three-state pattern: default → hover → active, plus loading and disabled states.

**Primary buttons** (main CTAs):
- Background: `interactive.primary` → `interactive.primaryHover` → `interactive.primaryActive`
- Text/icons: `interactive.onPrimary`
- Loading: `interactive.primary-loading`
- Disabled: `interactive.disabled`

**Secondary buttons** (alternative actions):
- Background: `interactive.secondary` → `interactive.secondaryHover` → `interactive.secondaryActive`
- Text/icons: `interactive.onSecondary`
- Loading: `interactive.secondary-loading`
- Disabled: `interactive.disabled`

**Destructive buttons** (delete, remove):
- Background: `interactive.destructive` → `interactive.destructiveHover` → `interactive.destructiveActive`
- Text/icons: `interactive.onDestructive`
- Loading: `interactive.destructive-loading`
- Disabled: `interactive.disabled`

**Touch feedback overlays**:
- On dark surfaces: `interactive.overlay.pressed`
- On light surfaces: `interactive.overlay.pressedInverse`

Do not use destructive colors for error messages. Destructive is for actions that destroy data. Error messages use `feedback.error.*`.

### Text

Text has three emphasis levels plus special-purpose variants:

- `text.primary` — Body text, headings, highest emphasis.
- `text.secondary` — Supporting text, captions, medium emphasis.
- `text.tertiary` — Metadata, timestamps, lowest emphasis.
- `text.disabled` — Inactive labels.
- `text.inverse` — Dark text on light backgrounds (inversions only).

**Links**:
- Default: `text.link`
- Hover: `text.linkHover`

**Feedback text** (not for buttons):
- Success: `text.success`
- Error: `text.error`
- Warning: `text.warning`

**Text on colored backgrounds**:
Always pair background tokens with their matching `on` tokens. Examples:
- `interactive.primary` → `interactive.onPrimary`
- `accent.brand.bold` → `accent.brand.onBold`
- `pro.subtle` → `pro.onSubtle`

If the background token has an `on` variant, use it. Do not substitute.

### Borders

- `border.default` — Standard borders, subtle separation.
- `border.strong` — High contrast borders for strong separation.
- `border.focus` — Keyboard focus rings.
- `border.error` — Invalid input outlines.
- `border.success` — Valid input outlines.
- `border.selected` — Active selection outline (not focus).

Focus and selection are different. Focus indicates keyboard navigation. Selection indicates a chosen item (like a selected card in a grid).

### Accents (category tags and labels)

Accent colors come in five hues, each with a bold/subtle pair:

- **Brand** (violet) — `accent.brand.bold` / `accent.brand.subtle`
- **Coral** — `accent.coral.bold` / `accent.coral.subtle`
- **Magenta** — `accent.magenta.bold` / `accent.magenta.subtle`
- **Blue** — `accent.blue.bold` / `accent.blue.subtle`
- **Green** — `accent.green.bold` / `accent.green.subtle`

**Bold** = solid background, high emphasis. **Subtle** = tinted background, low emphasis.

Always use the matching `on` token for text:
- `accent.coral.bold` → `accent.coral.onBold`
- `accent.blue.subtle` → `accent.blue.onSubtle`

Accent colors are for categorization and visual organization, not semantic meaning. Do not use green accents for success feedback or red accents for errors. Use `feedback.*` tokens for semantic states.

### Feedback (alerts and notices)

Success and error feedback follow the same bold/subtle pattern as accents:

**Success**:
- High emphasis: `feedback.success.bold` → `feedback.success.onBold`
- Low emphasis: `feedback.success.subtle` → `feedback.success.onSubtle`

**Error**:
- High emphasis: `feedback.error.bold` → `feedback.error.onBold`
- Low emphasis: `feedback.error.subtle` → `feedback.error.onSubtle`

Feedback tokens are for alert banners, toast notifications, and inline validation messages. Not for buttons.

### Pro (premium features)

Pro indicators follow the same bold/subtle pattern:

- High emphasis: `pro.bold` → `pro.onBold`
- Low emphasis: `pro.subtle` → `pro.onSubtle`

`pro.accent` exists for legacy compatibility. New designs use `pro.bold`.

### Highlight (selection and emphasis)

- `highlight.surface` — Background for selected list items, active states.
- `highlight.border` — Outline to pair with `highlight.surface`.

Use `highlight.*` for selected items in lists, sidebars, and navigation. Use `border.selected` for selection outlines on individual controls (like radio buttons).

### Mascot colors

- `mascot.primary` — Knowie's body color.
- `mascot.eyes` — Eye whites.
- `mascot.pupils` — Pupils.

These are illustration-only. Do not use mascot tokens for UI elements.

## Typography

The type scale is organized into four families: Display, Headline, Body, Caption.

**Display** (103px → 52px) — Hero text, page titles, largest text on screen. Use sparingly.

**Headline** (44px → 15px) — Section headings, card titles, content hierarchy.
- XL through S have one weight (bold).
- XS and XXS have bold/regular variants.

**Body** (24px → 15px) — Paragraphs, readable content, form labels.
- L, M, S each have bold/regular variants.

**Caption** (12px, 9px) — Small text, metadata, microcopy.
- M and S each have bold/regular variants.

Typography tokens are split into properties:
- `typography.body.m.bold.family` → font family reference
- `typography.body.m.bold.weight` → font weight reference
- `typography.body.m.bold.size` → pixel size
- `typography.body.m.bold.lineHeight` → line height (dimension or unitless number)
- `typography.body.m.bold.letterSpacing` → letter spacing in ems

Do not mix properties from different scale levels. If you're using `typography.body.m.bold.size`, use the entire `typography.body.m.bold.*` set.

## Spacing

Spacing tokens follow a scale from `space.0` (0px) through `space.4000` (160px), plus negative values for overlapping layouts.

Use spacing tokens for:
- Gaps in auto-layout containers
- Padding inside components
- Margins between sections

Common steps:
- `space.100` (4px), `space.200` (8px), `space.300` (12px), `space.400` (16px) — tight spacing
- `space.600` (24px), `space.800` (32px) — comfortable spacing
- `space.1200` (48px), `space.1600` (64px) — generous spacing between sections

Negative spacing (`space.negative-100` through `space.negative-600`) is for intentional overlap, like a badge overlapping a card corner. Do not use negative spacing to fix broken layouts.

## Border radius

- `radius.100` (4px), `radius.150` (6px), `radius.200` (8px) — Small controls, tags.
- `radius.400` (16px), `radius.600` (24px) — Cards, panels.
- `radius.800` (32px), `radius.900` (36px) — Large surfaces, modals.
- `radius.full` (9999px) — Pills, fully rounded buttons, avatars.

## Icons and illustrations

**Icons** (`icon.100` through `icon.400`) — UI icons, controls, navigation. Sizes range from 8px to 32px.

**Illustrations** (`illustration.500` through `illustration.4000`) — Mascot and spot illustrations. Sizes range from 40px to 320px.

These are box dimensions (width and height), not stroke weights.

## Responsive tokens

Responsive tokens define breakpoint behavior:

- `responsive.device.desktop/tablet/mobile` — Breakpoint name strings for conditional logic.
- `responsive.device-width.desktop/tablet/mobile` — Viewport widths (1200px / 768px / 375px).
- `responsive.scale.desktop/tablet/mobile` — Typographic scale multipliers (1 / 1 / 1.25).

Mobile steps up typography by 1.25× to improve readability on small screens.

## Components

### Message Bubble

**What it is:** Speech bubble for Knowie's questions, hints, and feedback. Pair with a mascot component when composing screens. Use `showTail=false` when the bubble doesn't need a directional pointer. Don't use for user responses - those have different styling.

**Properties:**
- `message` (text) - the bubble content
- `showTail` (boolean, default true) - show/hide the speech tail

**Structure:**
```
Message Bubble
├─ Tail (bound to showTail visibility)
└─ Content
    └─ Message [text, bound to message property]
```

**Token bindings:**
- Content background → `background.surface`
- Content corner radius → `radius.400`
- Content padding → `space.400` (all sides)
- Message text → `text.primary`
- Tail fill → `background.surface`

**When to use:** Whenever Knowie speaks to the user - questions, hints, feedback messages, or explanations.

**What not to do:** Don't use for user responses, system messages, or tooltips that aren't from Knowie.

---

### Button / Circular

**What it is:** Circular action buttons for recording controls. Use for primary recording actions (pause, delete, send). Size L for the main action, Size S for secondary actions. Don't use for navigation or non-recording actions - use standard rectangular buttons instead.

**Variants:**
- `Size` - S (48px), L (80px)
- `State` - Default, Pressed

**Properties:**
- `icon` (instance swap) - swaps between icon variants (Mic, Delete, Send, Pause)

**Structure:**
```
Button / Circular
├─ Background [ellipse]
└─ Icon [instance swap slot]
```

**Token bindings:**
- Background (Default) → `interactive.secondary`
- Background (Pressed) → `interactive.secondaryActive`
- Icon color → `interactive.onSecondary`

**When to use:** Recording controls in the active recall flow - pause/resume recording, delete recording, send response.

**What states mean:**
- **Default** - resting state, ready to tap
- **Pressed** - active press state (use for touch feedback)

**What not to do:** Don't use for navigation, page actions, or non-recording features. Don't use Size L for secondary actions - keep it for the primary control.

---

### Audio Playback

**What it is:** Audio playback control for reviewing recorded voice responses before submission. Use this after a user records their answer to let them listen back and confirm or re-record. Don't use for pre-recorded content, long-form audio, or music playback - this is specifically for short voice recordings the user just created (typically under 60 seconds).

**Properties:** None (state is controlled externally)

**Structure:**
```
Audio Playback
├─ Play Button [icon]
└─ Waveform [progress line]
```

**Token bindings:**
- Background → `background.surface`
- Corner radius → `radius.400`
- Padding → `space.300` (all sides)
- Item spacing → `space.300`

**When to use:** Review Audio screen after a user records their spoken response, before they submit it.

**What not to do:** Don't use for Knowie's audio, pre-recorded instructions, or any audio longer than 2 minutes. This is only for user-recorded voice responses in the recall loop.

---

## Component conventions

When creating new components, follow these naming and structure patterns:

### Naming variants

Use `Property=Value` format in component names to create variant axes. Each unique combination must exist as a separate component before combining into a component set.

Examples:
- `Size=S, State=Default`
- `Size=L, State=Pressed`

**Variant property names:**
- Use sentence case: `Size`, `State`, `Type` (not `size`, `state`, `type`)
- Use single words where possible
- Common axes: `Size`, `State`, `Type`, `Style`

**Variant value names:**
- Use single capital letter for sizes: `S`, `M`, `L`, `XL`
- Use full words for states: `Default`, `Hover`, `Pressed`, `Disabled`
- Use descriptive words for types: `Primary`, `Secondary`, `Destructive`

### Layer naming inside components

**For containers:**
- Use descriptive names that explain role: `Background`, `Content`, `Container`, `Wrapper`
- Never use generic names like `Frame`, `Rectangle`, `Ellipse` unless it's a primitive shape being used as-is

**For interactive elements:**
- Buttons: `[Action] Button` - e.g., `Play Button`, `Delete Button`
- Icons: `Icon` (if swappable) or `Icon / [Name]` (if specific)
- Text: `Label`, `Message`, `Title`, `Description`

**For structural elements:**
- `Tail` (for speech bubble pointers)
- `Waveform` (for audio visualization)
- `Progress` (for progress indicators)

### Properties

**TEXT properties:**
- Use lowercase for property names: `message`, `label`, `title`
- Provide sensible defaults that show what the text should contain

**BOOLEAN properties:**
- Start with verbs: `showTail`, `showIcon`, `isDisabled`
- Default to the most common state (usually `true`)

**INSTANCE_SWAP properties:**
- Use lowercase singular: `icon`, `mascot`, `illustration`
- Must link to an actual instance node in the component
- Provide a default component that makes sense for the primary use case

### Token bindings

Bind every color, spacing, and radius value to a semantic token from `tokens/tokens.json`. Never hardcode hex values or pixel dimensions that have semantic meaning.

**Colors:** Use `figma.variables.setBoundVariableForPaint()` to bind fill and stroke colors
**Spacing:** Use `setBoundVariable('paddingLeft', variable)` for padding and gaps
**Radius:** Use `setBoundVariable('cornerRadius', variable)` for corner radius

If a value you need doesn't have a token, stop and flag it rather than hardcoding. The system might be incomplete.

---

## Component composition

Every component should declare:
1. **What it's for** — the use case, not the implementation.
2. **Slots** — named areas for content (label, icon, action).
3. **States** — default, hover, active, disabled, loading, error.
4. **Token bindings** — which semantic token controls which property.

Example button scaffold:
```
Button
├─ Background: interactive.primary (default)
│              interactive.primaryHover (hover)
│              interactive.primaryActive (active)
│              interactive.primary-loading (loading)
│              interactive.disabled (disabled)
├─ Text: interactive.onPrimary
├─ Padding: space.300 (vertical), space.600 (horizontal)
├─ Radius: radius.200
└─ Typography: typography.body.m.bold
```

When a component needs a state that doesn't exist in the tokens, flag it before inventing a solution. The system might be incomplete.

## Naming conventions

### Tokens

Semantic tokens follow this pattern:
```
{purpose}.{role}.{variant}
```

- **Purpose** = what it's for (background, text, interactive)
- **Role** = more specific context (primary, error, page)
- **Variant** = state or emphasis (hover, bold, subtle)

Never put appearance words in semantic token names. "Purple button" becomes `interactive.primary`, not `interactive.purple`. Appearance words (`violet`, `dark`, `light`) stay in the primitive layer.

### Components

Use sentence case for all labels, buttons, headings, and UI text. Capitalize only proper nouns (names, brands, products).

Examples:
- ✅ "Save changes"
- ✅ "Upgrade to Pro"
- ✅ "Learn more about Knowie"
- ❌ "Save Changes"
- ❌ "Learn More"

## Never do this

### Never invent values

If `tokens/tokens.json` doesn't have the value you need, do not make one up. Stop and say "this token is missing" rather than filling the gap with a hardcoded value. Inventing values fractures the system.

Examples of what NOT to do:
- Using `#7b65e0` directly instead of a token reference.
- Creating `interactive.tertiary` because you need a third button style but the token doesn't exist.
- Interpolating between two spacing values to get "something in between."

If the token is missing, either:
1. The design is asking for something outside the system (validate the design).
2. The system is incomplete (add the token properly).

### Never use CSS fallback values

Do not write `var(--token, #333)` or any fallback syntax. If a token resolves to nothing, that's a bug to fix, not to hide. Fallbacks mask missing tokens and make the system unreliable.

### Never use appearance words in semantic names

Semantic tokens describe purpose, not appearance. Words like "purple," "dark," "light," "bright," or "faded" describe how a color looks. Those belong in the primitive layer only.

Wrong:
- `interactive.lightPurple`
- `background.darkSurface`
- `text.fadedGray`

Right:
- `interactive.secondary` (purpose: alternative action)
- `background.surface` (purpose: elevated content area)
- `text.tertiary` (purpose: lowest emphasis content)

If you find yourself wanting to name a token by its appearance, step back and ask what role it plays. The role is the name.

### Never read primitives directly

Components consume the semantic layer. The semantic layer references primitives. If you're building a button and reading `color.violet.500` directly, you've skipped a layer.

Primitives exist to:
1. Hold raw values in one place.
2. Be referenced by semantic tokens.
3. Support theme changes without touching components.

The only code that should read primitives is the code that defines semantic tokens. Everything else reads semantic tokens.

### Never skip the "on" token

If a background token has a matching `on` token, use it. Do not substitute a different text token because it "looks close enough."

Wrong:
```
background: interactive.primary
color: text.primary  // looks wrong, hard to read
```

Right:
```
background: interactive.primary
color: interactive.onPrimary  // correct pairing
```

The `on` tokens are calculated for contrast and tested for accessibility. Substituting them breaks that guarantee.

### Never reuse tokens across contexts

Each semantic token has a defined purpose. Do not reuse `interactive.destructive` for error message backgrounds because "they're both red." Buttons use `interactive.*`, alert messages use `feedback.*`.

If two things need the same color for different reasons, they should reference the same primitive via different semantic tokens. The primitive is the shared value; the semantic tokens are the separate meanings.

### Never break sentence case

Sentence case means: capitalize the first letter, lowercase the rest, except proper nouns.

- ✅ "Upload photo"
- ✅ "Connect to Spotify"
- ❌ "Upload Photo"
- ❌ "Connect To Spotify"
- ❌ "UPLOAD PHOTO"

This applies to buttons, labels, headings, menu items, and all UI copy. The only exceptions are acronyms (e.g., "API key") and proper nouns (e.g., "Save to Knowie").

### Never use interactive tokens for non-interactive elements

`interactive.*` tokens are for buttons, links, and controls that respond to input. Do not use them for static badges, labels, or decorative elements. Use `accent.*` for category tags, `feedback.*` for status indicators, `text.*` for static content.

If it doesn't respond to a click or tap, it shouldn't use an interactive token.

### Never mix bold and subtle from different color groups

Each accent and feedback group (brand, coral, blue, success, error) has a bold/subtle pair that shares the same hue. Do not pair `accent.coral.bold` with `accent.blue.onBold`. The background and foreground must come from the same color group.

Right:
- `accent.coral.bold` + `accent.coral.onBold`
- `feedback.error.subtle` + `feedback.error.onSubtle`

Wrong:
- `accent.coral.bold` + `accent.magenta.onBold`
- `feedback.success.bold` + `feedback.error.onBold`

## When the system doesn't fit

If you're working on a design and the tokens don't support it, do not work around the system. Instead:

1. **Document the gap** — what's missing, what you're trying to build, why existing tokens don't work.
2. **Validate the design** — is the design asking for something intentionally outside the system, or is the system incomplete?
3. **Propose a token** — if the system is incomplete, propose the missing token with its purpose, value, and where it fits in the structure.
4. **Update `tokens/tokens.json`** — add the token properly, then use it.

Systems grow by adding intentional pieces, not by letting components invent their own values. Treat every gap as feedback on the system, not a license to bypass it.
