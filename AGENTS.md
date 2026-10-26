# Project preferences

- Build a portfolio for Alessandro Vannelli's local-business website creation and redesign business.
- Alessandro directs design and reviews changes in a live local browser preview; the agent handles implementation and explains decisions plainly.
- Use Astro, reusable components, minimal dependencies, and structured CMS-ready content. Add React only for interaction that clearly needs application state.
- The approved direction is sleek, bespoke, editorial, modern, premium but approachable, with a restrained dark palette and deliberate asymmetry.
- Avoid generic agency templates, excessive rounded cards, decorative gradient blobs, stock dashboard art, repetitive icon grids, and vague marketing language.
- Use Alessandro Vannelli as the public name with “Independent web design & development” beneath it until a studio name is chosen.
- Current portfolio work is fictional concept work. Never invent clients, results, testimonials, awards, or qualifications.
- Keep desktop and mobile layouts intentionally composed, responsive, accessible, keyboard-friendly, and respectful of reduced motion.
- The site is a single page. There is no Showcase section and no `/work/<slug>` case-study pages; they were removed. Do not reintroduce them.
- Project data lives in `src/data/portfolio.ts` as a single typed `Project[]`. Only the hero reference cards render from it, using `title`, `slug`, `category`, the logo in `public/work/`, and `liveUrl`.
- The three hero reference cards link straight to the deployed sites in a new tab. `liveUrl` must hold a real URL for every project the hero lists.
- The inquiry form must never appear to submit successfully until a backend is connected.
- Start the local preview for design work and run a production build after meaningful changes.
- Create Git checkpoints only at user-approved milestones. Do not publish, deploy, or push publicly without Alessandro's instruction.

## Design system — Linear / Modern

- The site follows a Linear-style dark design system. Every colour, radius, shadow and duration is a custom property in `theme.css`; nothing downstream hardcodes one.
- Background: `#050506` base with a fixed radial falloff from top-centre plus a 1.5% noise film. Two layers only — **no animated gradient blobs, no grid overlay.** The blobs the source system calls mandatory were deliberately declined; they read as a marketing template here.
- Accent `#5E6AD2` is for fills, borders and glows. It is 4.33:1 as text, so accent **words** use `--accent-text` (`#7C87E8`, 6.3:1). Never set `--accent` on small text.
- Tertiary copy uses `--faint` (`rgba(255,255,255,.6)`). Anything below ~.46 alpha fails AA on this background once composited.
- Typography uses locally hosted Sora for the hero, Space Grotesk for the interface, and Geist Mono for technical labels.
- The three project cards sit on one line and are each dressed in their own site's palette: InsertCoin is the violet/magenta arcade with scanlines and yellow marquee type, Alderspan is the green-black practice with a drawing grid and warm orange, Morrow & Crumb is the cream bakery with a honey band and cocoa ink. All of it is driven by `--card-*` variables on `.site-<slug>`; the shared rules stay generic.
- Morrow & Crumb is a light surface on a dark page. Any text on it must clear 4.5:1 against **both** ends of its cream gradient — `#8a6733` looked fine and measured 3.96:1.
- Shadows are always multi-layer (border highlight + diffuse + ambient, plus an accent glow when active). Never a single shadow.
- Motion: one easing curve (`--ease`, expo-out), 200/300/600ms steps, movement capped at 8px, scale at .98–1.02. Nothing bouncy.

## Component primitives

- There is **no site navigation.** The header is the name and one Contact action; the footer carries the Process and Contact links. The mobile menu, its button and its panel were removed with it.
- `.btn` with `--primary` / `--secondary` / `--ghost` and a `--sm` size is the only button. Do not write a one-off button style.
- The project cards share site-card rules and use card variables for their individual palettes.
- `scripts/motion.ts` provides three progressive behaviours via attributes: `data-spotlight` (cursor-tracking glow), `data-reveal` (staggered fade-up) and `data-parallax` (hero). All are skipped under `prefers-reduced-motion`, and the page is complete and legible without the script — the `.js` class on `<html>` gates the hidden-until-revealed state.
- Stylesheets: `theme.css` (tokens, reset, base, motion primitives), `global.css` (button, panel, header, footer, dialog, form), `home.css` (page composition). Keep them free of dead rules; the repo has been verified at zero unmatched selectors and zero unused tokens.
- `global.css` and `home.css` are desktop-first (`max-width` queries), so narrower breakpoints must come **last** in the file.

## Commands
- `npm install`
- `npm run dev` (http://127.0.0.1:4321)
- `npm run build`
- `npm run preview`

- Keep section copy and divider spacing compact, especially on desktop. Use succinct, unnumbered section headings.
- The header Contact action and the approach CTA open the inquiry dialog.

- Avoid pale green as the primary accent; the site accent is indigo (#5E6AD2).
- About content belongs concisely in the introduction; do not add a separate About section.

- Keep copy concise and audit contrast whenever a section uses a light background.
- The hero carries the name, one descriptor line and the three cards — nothing else. The fake catalogue chrome (MODEL 01 / SERIES A, EST. 2026, CATALOGUE VOL. 01, W 1440 × H 900, INTERFACE · FEATURE SET) was removed as filler. Do not reintroduce invented spec text.

- There is no Capabilities section: it duplicated Process and was removed. Do not reintroduce it.
- Place Process directly after the opening.

- Keep the opening free of redundant service labels. The Process section uses a lighter charcoal, preserving the continuous dark palette without cream or white bands.
- The project inquiry dialog uses a two-column desktop form and single-column mobile form.
