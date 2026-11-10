# Behavior bible

## Header and navigation

- Fixed at the top with transparent background and `py-4` at scroll position 0.
- Local clone changes to translucent background, blur and shadow after `window.scrollY > 24`.
- Desktop nav is visible from the original `xl` breakpoint (`80rem`); on smaller widths the menu button opens a translucent vertical panel.
- Anchor links use native smooth scrolling from the extracted global CSS.

## Reveal animations

- Original markup carries initial `opacity: 0` and translate/scale inline values, indicating hydration-driven entrance reveals.
- Clone reproduces the observable result with `IntersectionObserver`, opacity/translate transition and a 0.12 viewport threshold.

## Examples

- Example cards have hover lift, image zoom and a zoom icon.
- Clicking a card opens a centered image lightbox; Escape or the close/backdrop click closes it.

## Configurator

- Two model cards use `aria-pressed` selection; the selected card has navy border/ring.
- SVG front/back spaces are keyboard-focusable `role="button"` items. The clone toggles selected space outlines and updates the selection count.
- Continue scrolls to the contact section once at least one space is selected.

## FAQ

- Accordion is click-driven, single-open at a time. Panels use the original closed/open data attributes and the extracted accordion CSS animation classes.

## Contact form

- Two role pills switch between advertiser and bakery context.
- Submit builds a WhatsApp URL with the entered details; no data is persisted locally.

## Responsive sweep from extracted CSS

- Desktop: max-width containers, two-column hero/contact areas, five-step process row, four-column examples.
- Tablet: three-column impact cards and two-column grids where `md` rules apply.
- Mobile: stacked sections, vertical process timeline, two-column examples, mobile nav button and compact spacing.
