# Alessandro Vannelli portfolio

An Astro static site for Alessandro's independent web-design practice. It showcases three real
projects — InsertCoin, Alderspan Engineering, and Morrow & Crumb — plus capabilities, a four-stage
process, and an inquiry form with placeholder-only submission behavior.

## Requirements

Node 22 or newer (Astro 7 requires `>=22.12.0`). The version is pinned in `.nvmrc`.

## Local development

Run `npm install`, then `npm run dev`. Open http://127.0.0.1:4321. Changes refresh automatically.

Run `npm run build` to type-generate and produce the static site in `dist/`, and `npm run preview`
to serve that build locally.

## Content

All project content is typed in `src/data/portfolio.ts` as a single `Project[]`. Both the Showcase
listing and the `/work/<slug>` case-study pages render from it — nothing is duplicated.

Preview and gallery screenshots live in `public/work/` and are served from root-relative paths.
The portfolio does not reference any neighbouring project directory.

### Linking a deployed project

Set the project's `liveUrl` in `src/data/portfolio.ts`. While it is an empty string, no live action
renders at all — there is never a broken or localhost link. When set, `src/components/LiveLink.astro`
renders the project's `liveLabel` ("LAUNCH ARCADE" for InsertCoin, "VIEW LIVE SITE" for the other
two) on both the showcase card and the case-study sidebar, opening in a new tab with
`rel="noopener noreferrer"`. `repositoryUrl` behaves the same way.

## Deployment — Cloudflare Pages

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Output directory | `dist` |
| Node version | 22 (from `.nvmrc`) |

No environment variables are required. The site is fully static and multi-page: Astro emits a real
`index.html` for every route, so no SPA fallback and no top-level `404.html` are needed.

The canonical site URL is set to `https://alexvannelli.com` in `astro.config.mjs`. The site is
indexable — there is no `robots` meta directive.

There is no React integration, CSS framework, icon package, or external image asset. Google Fonts
are loaded over the network with system fallbacks.
