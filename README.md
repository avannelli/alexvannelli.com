# Alessandro Vannelli portfolio

Single-page Astro portfolio for Alessandro's independent web design and development practice. The opening links to three deployed projects, followed by the process and a project inquiry dialog.

## Local development

Use Node 24 (see .nvmrc), then run:

- npm install
- npm run dev ? http://127.0.0.1:4321
- npm run build
- npm run preview

Astro builds one static page in dist/. The project has no React integration, CSS framework, or external runtime dependency. Fonts and the three project logos are served locally from public/.

## Content

The hero cards read from the typed Project[] in src/data/portfolio.ts. Each entry has a live URL; cards open that deployed site in a new tab. The same file contains the four process steps and site metadata. Project entries are concept work and personal work, not client commissions.

The inquiry form is a preview. It validates fields locally and clearly states that it cannot send a submission.

## Deployment

astro.config.mjs sets the canonical site URL to https://alexvannelli.com. A static host can publish dist/ after running npm run build. No environment variables are required.
