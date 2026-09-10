# Project preferences

- Build a portfolio for Alessandro Vannelli's local-business website creation and redesign business.
- Alessandro directs design and reviews changes in a live local browser preview; the agent handles implementation and explains decisions plainly.
- Use Astro, reusable components, minimal dependencies, and structured CMS-ready content. Add React only for interaction that clearly needs application state.
- The approved direction is sleek, bespoke, editorial, modern, premium but approachable, with a restrained dark palette and deliberate asymmetry.
- Avoid generic agency templates, excessive rounded cards, decorative gradient blobs, stock dashboard art, repetitive icon grids, and vague marketing language.
- Use Alessandro Vannelli as the public name with “Independent web design & development” beneath it until a studio name is chosen.
- Current portfolio work is fictional concept work. Never invent clients, results, testimonials, awards, or qualifications.
- Keep desktop and mobile layouts intentionally composed, responsive, accessible, keyboard-friendly, and respectful of reduced motion.
- Project data lives in `src/data/portfolio.ts` as a single typed `Project[]`; the Showcase listing and the `/work/<slug>` case-study pages both render from it.
- Fill `liveUrl` / `repositoryUrl` only when a real URL exists. Empty strings render no button. Keep unavailable actions honest.
- Showcase previews are real screenshots of the built projects, stored in `public/work/`. Set a deliberate `previewPosition` per project so the crop keeps its branding at narrow widths.
- The inquiry form must never appear to submit successfully until a backend is connected.
- Start the local preview for design work and run a production build after meaningful changes.
- Create Git checkpoints only at user-approved milestones. Do not publish, deploy, or push publicly without Alessandro's instruction.

## Commands
- `npm install`
- `npm run dev` (http://127.0.0.1:4321)
- `npm run build`
- `npm run preview`

- Keep section copy and divider spacing compact, especially on desktop. Use succinct, unnumbered section headings.
- Capabilities should be a compact visual composition rather than a plain list.
- The header has no project CTA. Intro project CTAs open a fading inquiry dialog that reuses the footer form.

- Use Showcase instead of Selected Work in visitor-facing copy and navigation.
- Avoid pale green as the primary accent; the current site accent is warm copper.
- Capabilities uses a uniform, non-interactive matrix with its heading above it. About content belongs concisely in the introduction; do not add a separate About section.

- Keep copy concise and audit contrast whenever a section uses a light background.
- Capabilities is grouped into four static stages: Plan, Design, Build, and Launch.

- Place Process directly after the introduction. Keep the introduction compact on desktop with its bottom divider close to the content.

- Keep the opening free of redundant service labels. The Process section uses a lighter charcoal, preserving the continuous dark palette without cream or white bands.
- The intro headline is “Website built for business.” Do not use the circular AV background graphic. Keep Process directly below Showcase.
- Showcase begins directly below the introduction without a separate title block. Identify it with a small label integrated into the category navigation.
- The intro headline uses “Websites built for business.” Present Alessandro’s short bio in a compact profile card with a replaceable portrait slot. Center the desktop navigation in a restrained framed treatment.
- Use a polished paired treatment for the intro actions. The project inquiry dialog uses a spacious two-column desktop form and single-column mobile form. Showcase filtering crossfades subtly and respects reduced-motion preferences.
- Mobile navigation uses a compact framed overlay, numbered links, a distinct Contact action, animated menu/close icon, Escape support, and background scroll locking.
- Keep every Showcase preview the same size. Project information panels should be compact, consistently aligned, and use small capability tags rather than long stacked lists.
- Showcase rows alternate large-preview/small-details and small-details/large-preview. Never place a website preview in the narrow column.
