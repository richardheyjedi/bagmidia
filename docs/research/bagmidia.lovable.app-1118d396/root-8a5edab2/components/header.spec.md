# Header specification

- Target: `index.html` header plus `src/main.js` navigation behavior.
- Interaction model: scroll-driven header state and click-driven mobile menu.
- Layout: fixed full-width, `z-index:50`; inner `max-w-7xl`, horizontal flex, logo at left, nav centered, CTA/menu at right.
- Initial: transparent background, `py-4`; scrolled clone state: translucent background, blur, card shadow, `py-2` after 24px.
- Desktop nav: hidden below 80rem, eight anchor links visible at/above 80rem.
- Assets: `/assets/logo.png`.
