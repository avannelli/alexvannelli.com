# Project preferences

- Build a portfolio for Alessandro Vannelli's local-business website creation and redesign business.
- Alessandro directs design and reviews changes in a live local browser preview; the agent handles implementation and explains decisions plainly.
- Use Astro, reusable components, minimal dependencies, and structured CMS-ready content. Add React only for interaction that clearly needs application state.
- Avoid generic agency templates, excessive rounded cards, decorative gradient blobs, stock dashboard art, repetitive icon grids, and vague marketing language.
- Use Alessandro Vannelli as the public name with “Independent web design & development” beneath it until a studio name is chosen.
- Current portfolio work is concept and personal work. Never invent clients, results, testimonials, awards, or qualifications. Project facts come from the live sites; re-check them there before changing copy (InsertCoin currently has three games, not five).
- Keep desktop and mobile layouts intentionally composed, responsive, accessible, keyboard-friendly, and respectful of reduced motion.
- Start the local preview for design work and run a production build after meaningful changes.
- Create Git checkpoints only at user-approved milestones. Do not publish, deploy, or push publicly without Alessandro's instruction.

## Direction — The Digital Exhibition (October 2026)

The site was redesigned around **“Different worlds. Built from scratch.”** The portfolio itself is a neutral ivory exhibition wall; each project is presented as its own world in its own palette. This replaced the earlier dark Linear-style system.

- Pages: the homepage (hero → selected work → three worlds → About → Contact) and one case study per project at `/work/<slug>`. Case studies were deliberately reintroduced with this redesign.
- The header is the **top edge of the triptych**. Its three columns sit on the same `--s1` / `--s2` split points as the hero (declared on `:root` in `global.css`): the name and “AV” monogram in the arcade third, Work / About / Contact in the blueprint third, “Start a project” in the bakery third. Scrolling, it takes on the world beneath it via `data-world` (`tri`, a project slug, `ink` or the default `paper`) set from `[data-header-world]` sections; the monogram restyles per world, the role line becomes a “Now viewing — 0X / 03 …” readout, and a three-part rail fills through the worlds. On phones the nav spreads over the second and third columns so Contact sits in the bakery third.
- The introduction under the hero is a **two-sided 3D postcard** (`Intro.astro`). The front is a vintage “Greetings from WORLDS” card: giant extruded letters, each pair tinted in one world's identity over its real screenshot, on a sunset/sunburst sky. With JS it arrives face up, turns itself over once in view, tilts toward the pointer with a glare and a holographic foil on the letters, shifts its layers for depth, and flips with a click on the card or the “Turn it over” button (lifting off the page while its floor shadow narrows); it turns to the back when anything on it is focused. The back has an airmail stripe border, a “Par avion · By air mail” label and an inked postmark. On phones the two faces simply stack. Without JS or under reduced motion only the message side shows. The back is the message side: on the address side three perforated stamps (one per world, each in its own identity, each linking to its world) cancelled by a postmark, an address “to you, and the business you’re building” and a “Write back” link that opens the inquiry dialog. (Earlier inline-token and plain-paragraph versions were replaced.)
- The hero is a **triptych**: three full-size layers (one per world) clipped to vertical slices by the registered properties `--s1` / `--s2`. Every layer sets the headline in the same place so the sentence runs unbroken across the worlds. Each slice is a link to its project; hovering or focusing one widens it, and the worlds wipe in on load. It is pure CSS — keep it that way. Only the first layer's headline is exposed to assistive tech; the others are `aria-hidden`. (The earlier fanned screenshot stack was rejected.)
- Every project world is composed differently on purpose — do not normalise them into one card layout:
  - **InsertCoin**: violet arcade, neon seam, scanlines, perspective floor grid, CRT power-on entrance.
  - **Alderspan**: blueprint blue, ruler seam, drafting grid, sheets that plot in with dimension lines, a title block instead of a card.
  - **Morrow & Crumb**: cream and honey, the bakery's wave as its seam, a drawn wheat sprig, pages that settle onto the table.
- Contact is a **neon sign on a brick wall at night** (`Contact.astro`): “Have a world in mind?” as an outlined tube and “Let’s build it.” as a script tube on an acrylic backer, flickering on when revealed (`data-reveal="neon"`), with one letter that buzzes now and then; an “OPEN — for new projects” card swinging from a nail; and a switch plate (Arcade / Blueprint / Bakery) that cross-fades `--neon` (a registered property) across the sign, the wall glow and the `.btn--neon` button. Switches appear only with JS; reduced motion shows the sign steadily lit.
- About is themed as a **retro Matrix terminal**: phosphor green on black (`--m-*` on `.about`), CRT scanlines and vignette, digital rain on a canvas and a headline that decodes from scrambled ASCII (`scripts/matrix.ts`, skipped under reduced motion; the real headline is the `h2`'s `aria-label`). Labels are shell prompts, the bio is `cat about.txt` ending on a waiting cursor, the process is a `./run project` boot sequence with `[ OK ]`s, and the header takes a `matrix` world over it. The interest cards inside keep their own palettes.
- About holds the personal side, including **Off the clock** (`Interests.astro`): four tiles (video games, lifting, pitbulls, hockey), each a small world. The pitbull is a portrait of Alessandro's own dog — a Staffordshire terrier / red-nose pitbull / boxer mix (copper-red coat, liver nose, amber eyes, rose ears, boxer jowls, white blaze). Hockey is the Montreal Canadiens, his team: his stall in a Habs dressing room, with a home sweater hung back-out reading VANNELLI 14 (name and number are constants at the top of `interests/HabsStall.astro`). The dog is drawn in `interests/Pitbull.astro` as a layered vector portrait in puppy proportions (big round head, large low eyes, short muzzle, floppy ears, big paws) — Alessandro asked for it cute and puppy-like. The CH crest is an NHL trademark and is deliberately not reproduced. Each tile is with its own palette (`--i-*` on `.i-<slug>`) and an illustration that animates when selected. Selecting a tile opens a panel in its palette with Alessandro's description from `interests` in `portfolio.ts`. **Descriptions are Alessandro's to write — never invent them.** An empty description shows a where-to-write-it reminder in the dev preview only; in production that tile renders as a plain, non-interactive illustration.
- No invented spec text or fake chrome. Annotations must be true labels of what is shown (e.g. “A–02 · Project index”).

## Design system

- Tokens live in `theme.css`. Paper `#f2ede3`, ink `#16130f`, `--ink-faint` `#6b6458` is the floor for small text (4.9:1). The portfolio accent is indigo: `--accent` `#3d48b8` for text, `--accent-bright` `#5e6ad2` for strokes and fills only. Avoid pale green as an accent.
- Project palettes are `--w-*` variables on `.world-<slug>` in `worlds.css`, shared by the homepage section and the case study. Decoration that belongs to the homepage section is scoped to `.world.world-<slug>`.
- Morrow & Crumb is a light surface: any small text on it must clear 4.5:1 against the darker end of its cream gradient (`#ecd8b4`). `--w-accent` there is for large display type only.
- Typography is locally hosted: Instrument Serif (display), Space Grotesk (interface), Geist Mono (labels).
- Shadows are always multi-layer. Never a single shadow.
- Screenshots are real captures of the live sites in `src/assets/work/`, served through `astro:assets` so Astro generates responsive WebP sizes. Re-capture rather than editing them.

## Component primitives

- `.btn` with `--primary` / `--light` / `--ghost` / `--world` and a `--sm` size is the only button. `--world` takes its colours from the surrounding `--w-*` variables. Do not write a one-off button style.
- `BrowserFrame` and `PhoneFrame` wrap every screenshot. `WorldActions` is the live-site + case-study pair used in every world.
- `scripts/motion.ts` provides progressive behaviours via attributes: `data-reveal` (fade-up, plus `lines`, `crt`, `plot` and `settle` variants), `data-draw` (self-drawing strokes), `data-depth` (scroll drift) and `data-tone="dark"` (header inversion). All are skipped under `prefers-reduced-motion`, and the page is complete and legible without the script — the `.js` class on `<html>` gates every hidden starting state. No scroll hijacking, loaders or custom cursors.
- Stylesheets: `theme.css` (tokens, reset, base, motion primitives), `global.css` (buttons, header, footer, frames, dialog, form), `home.css` (hero, work intro, about, contact), `worlds.css` (project palettes and worlds), `case.css` (case studies). All are desktop-first (`max-width` queries), so narrower breakpoints come **last**.
- The inquiry form has no backend. It composes a pre-filled email in the visitor's own mail app and says so; it must never appear to have delivered anything. It composes to `site.email` in `portfolio.ts`.

## Commands
- `npm install`
- `npm run dev` (http://127.0.0.1:4321)
- `npm run build`
- `npm run preview`
