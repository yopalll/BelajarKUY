---
name: Rocket Growth Modern
colors:
  surface: '#FFFFFF'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae7e7'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1b1b1c'
  on-surface-variant: '#4f434c'
  inverse-surface: '#303030'
  inverse-on-surface: '#f3f0ef'
  outline: '#80737d'
  outline-variant: '#d2c2cd'
  surface-tint: '#844981'
  primary: '#300033'
  on-primary: '#ffffff'
  primary-container: '#4a154b'
  on-primary-container: '#be7db9'
  inverse-primary: '#f6afef'
  secondary: '#855400'
  on-secondary: '#ffffff'
  secondary-container: '#ffb145'
  on-secondary-container: '#6f4600'
  tertiary: '#181814'
  on-tertiary: '#ffffff'
  tertiary-container: '#2d2c28'
  on-tertiary-container: '#95938d'
  error: '#D91E18'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffd6f8'
  primary-fixed-dim: '#f6afef'
  on-primary-fixed: '#370139'
  on-primary-fixed-variant: '#693168'
  secondary-fixed: '#ffddb7'
  secondary-fixed-dim: '#ffb95c'
  on-secondary-fixed: '#2a1700'
  on-secondary-fixed-variant: '#653e00'
  tertiary-fixed: '#e6e2db'
  tertiary-fixed-dim: '#c9c6c0'
  on-tertiary-fixed: '#1c1c18'
  on-tertiary-fixed-variant: '#484742'
  background: '#fcf9f8'
  on-background: '#1b1b1c'
  surface-variant: '#e5e2e1'
  success: '#2D8A56'
  warning: '#E67E22'
  background-subtle: '#F8F5F2'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  caption:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 64px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
---

## Brand & Style

The brand personality is **Professional, Energetic, and Scholarly**. It aims to inspire upward mobility and personal growth, using the rocket symbol as a core metaphor for the learning journey. The target audience includes students and lifelong learners looking for a vibrant, modern platform that feels both trustworthy and exciting.

The design style follows a **Corporate / Modern** aesthetic with a high-energy twist. It utilizes a generous amount of whitespace to ensure clarity in educational content, paired with distinctive rounded shapes and a sophisticated color palette that balances deep, authoritative tones with bright, optimistic accents. Visual accents should leverage the rocket icon for decorative elements, progress indicators, and favicons to reinforce the "launch your career" narrative.

## Colors

The palette is anchored by a **Deep Burgundy/Purple** (`#4A154B`) which provides an academic and premium feel. This is contrasted by **Vibrant Amber** (`#FFB144`), used for high-impact calls to action and "success" moments like course completions. 

The background system uses a **Cream/White** (`#FCF8F1`) base rather than pure white to reduce eye strain during long study sessions. Status colors (Success, Warning, Error) are adjusted for high legibility against this warm background. Surfaces like cards and modals should primarily use pure `#FFFFFF` to create a subtle layered effect over the off-white background.

## Typography

This design system uses **Plus Jakarta Sans** for all levels to maintain a cohesive, friendly, and contemporary look. The font's slightly wider proportions and open counters make it excellent for on-screen legibility in course materials.

- **Headlines:** Use Bold or ExtraBold weights to create a strong hierarchy against body text.
- **Body Text:** Maintains a generous line height (1.5x) to support long-form reading.
- **Labels:** Set in SemiBold or Bold to differentiate from body text in metadata contexts like course categories or price tags.

## Layout & Spacing

The layout utilizes a **12-column fluid grid** for desktop and a **4-column grid** for mobile. A standard 24px gutter provides ample breathing room between cards in the marketplace grid.

Spacing follows an 8px rhythmic scale. For marketplace views, focus on "Comfortable" density. Content-heavy pages (like a lesson viewer) should switch to a "Focused" layout, centering the content and maximizing lateral whitespace to minimize distractions.

## Elevation & Depth

Visual hierarchy is established through a **Tonal Layering** approach combined with **Ambient Shadows**. 

1. **Level 0 (Background):** The Cream background (`#FCF8F1`).
2. **Level 1 (Cards/Surfaces):** Pure White (`#FFFFFF`) with a very soft, diffused shadow (12% opacity of the Primary color) to create a warm depth.
3. **Level 2 (Popovers/Modals):** High elevation with a slightly sharper shadow to indicate immediate priority.

Avoid heavy borders; use subtle 1px outlines in a 10% tint of the Primary color only when elements need extra definition against the white surface.

## Shapes

The design system employs a **Rounded** shape language to feel approachable and modern. 
- **Standard elements** (Buttons, Inputs): use `rounded-lg` (1rem).
- **Large containers** (Course Cards, Hero Sections): use `rounded-xl` (1.5rem) or `2xl` to emphasize the friendly brand personality.
- **Badges and Avatars:** Utilize the pill-shape (full rounding) to contrast against the structured grid of the marketplace.

## Components

### Buttons
- **Primary:** Deep Purple background with White text. Use `rounded-lg` and bold typography.
- **Secondary:** White background with Deep Purple border and text.
- **Accent:** Vibrant Orange background with Deep Purple text (for "Buy Now" or "Enroll").

### Cards
Course cards feature a `2xl` corner radius, a clean image header, and a white surface. The shadow should feel "weightless" and tinted with the primary hue.

### Input Fields
Inputs use a warm-gray background and a 2px border on focus that transitions to the Primary Purple. Labels should always be visible above the field in `label-md` style.

### Badges / Chips
Category badges use a subtle 10% opacity tint of the Primary or Secondary color as a background, with full-opacity text of the same hue. Use `rounded-full` (pill shape).

### Progress Bars
Special brand component: Uses a gradient from Deep Purple to Vibrant Orange, with the Rocket icon as the progress "head" to gamify the learning experience.