export const site = {
  name: 'Alessandro Vannelli',
  title: 'Alessandro Vannelli — Websites built around the business behind them',
  description: 'Distinctive, fast websites for local businesses, designed and developed by Alessandro Vannelli.',
  email: 'hello@example.com',
};

export const categories = [
  'All projects',
  'Interactive & Browser Experiences',
  'Construction & Engineering',
  'Hospitality',
] as const;
export type Category = (typeof categories)[number];
export type ProjectCategory = Exclude<Category, 'All projects'>;

export interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
}

export interface ProjectFeature {
  title: string;
  detail: string;
}

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  /** Short label shown above the project name in the showcase. */
  type: string;
  year: string;
  /** One-line summary used in the showcase listing. */
  description: string;
  /** Longer overview used on the project page. */
  overview: string[];
  role: string;
  technologies: string[];
  /** Compact tags shown on the showcase card. */
  capabilities: string[];
  previewImage: string;
  previewAlt: string;
  /** Deliberate object-position for the preview crop. */
  previewPosition: string;
  galleryImages: GalleryImage[];
  features: ProjectFeature[];
  /**
   * Deployed URL for the project. Leave empty until the project is actually live —
   * an empty string renders no live action at all, never a broken or localhost link.
   */
  liveUrl: string;
  /** Label for the live action, e.g. 'LAUNCH ARCADE' or 'VIEW LIVE SITE'. */
  liveLabel: string;
  /** Add the public repository URL here if one is published. Empty means no button is rendered. */
  repositoryUrl: string;
  /** True for self-directed concept work with no real client behind it. */
  conceptProject: boolean;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    slug: 'insertcoin',
    title: 'InsertCoin',
    category: 'Interactive & Browser Experiences',
    type: 'Personal browser arcade',
    year: '2025',
    description:
      'A browser arcade with five original games, each built on a shared React shell and a typed Phaser mounting contract.',
    overview: [
      'InsertCoin is a personal browser arcade: a title screen, a game-selection interface, and five original games that all run in the browser with no accounts, backend, or external asset downloads.',
      'Every game plugs into one typed contract. A registry entry describes the game and lazy-loads its module; the module returns start, pause, restart, and destroy handlers and publishes score, lives, and status through a single callback. The shared shell renders the cabinet, readouts, and controls from that snapshot, so adding a game needs no new routes or page components.',
    ],
    role: 'Sole designer and developer — interaction design, visual system, game design, and all frontend and game code.',
    technologies: ['React 19', 'TypeScript', 'Vite', 'Phaser 3', 'Web Audio API', 'CSS', 'Playwright'],
    capabilities: ['Game UI', 'Phaser integration', 'State management', 'Responsive controls'],
    previewImage: '/work/insertcoin-preview.webp',
    previewAlt: 'InsertCoin game-selection screen showing the Circuit Break cabinet on a dark neon arcade layout',
    previewPosition: 'left top',
    galleryImages: [
      {
        src: '/work/insertcoin-title.webp',
        alt: 'InsertCoin title screen with a large wordmark and a press-start button',
        caption: 'Title screen',
      },
      {
        src: '/work/insertcoin-cabinets.webp',
        alt: 'Game selection list showing several arcade cabinets with generated preview artwork',
        caption: 'Cabinet artwork in the selection list',
      },
      {
        src: '/work/insertcoin-game.webp',
        alt: 'Circuit Break gameplay view with score readouts and a launch-ball prompt',
        caption: 'Circuit Break running in the shared game shell',
      },
    ],
    features: [
      {
        title: 'One mounting contract, five games',
        detail:
          'Circuit Break (brick breaker), Silly Fish (one-button swimmer), Air Hockey (player vs CPU), Night Shift (cockpit racer), and Iron Viper (side-scrolling run & gun) all implement the same mount/controller interface.',
      },
      {
        title: 'Phaser scenes written from scratch',
        detail:
          'Each game separates its simulation model from its Phaser scene, so physics, collisions, and match rules are testable independently of rendering and input.',
      },
      {
        title: 'A shell that adapts to game type',
        detail:
          'The shared shell reads optional score, match, and race modes from the published snapshot to render scoreboards, countdowns, racing statistics, and held-pointer touch controls.',
      },
      {
        title: 'No external assets',
        detail:
          'All cabinet artwork is drawn as React and Phaser graphics, and sound cues are generated at runtime with the Web Audio API. Audio starts muted and is toggled from the header.',
      },
      {
        title: 'Local persistence and accessibility',
        detail:
          'High scores and sound preferences persist in local storage when available. Menus are keyboard-operable, game state is mirrored in a live region, and reduced-motion preferences disable entrance and blinking animations.',
      },
    ],
    liveUrl: 'https://insertcoin.alexvannelli.com',
    liveLabel: 'LAUNCH ARCADE',
    repositoryUrl: '',
    conceptProject: false,
    featured: true,
  },
  {
    slug: 'alderspan',
    title: 'Alderspan Engineering',
    category: 'Construction & Engineering',
    type: 'Independent engineering consultancy concept',
    year: '2025',
    description:
      'A self-directed concept for an engineering consultancy: an editorial multi-page site with an animated identity and original structural illustration.',
    overview: [
      'Alderspan Engineering is an independent concept project, not client work. The consultancy, its people, projects, and statistics are all invented, and every piece of architectural imagery is an original vector illustration rather than a photograph.',
      'The brief I set myself was to make technical work feel readable: an editorial layout with generous type, a filtered project index, and case-study pages that carry drawings, figures, and plain-language description without turning into a brochure.',
    ],
    role: 'Self-directed concept — brand identity, editorial art direction, illustration, and frontend development.',
    technologies: ['React 19', 'TypeScript', 'Vite', 'React Router 7', 'Web Animations API', 'SVG', 'CSS', 'Playwright'],
    capabilities: ['SVG identity', 'Animated intro', 'Editorial layout', 'Case-study system'],
    previewImage: '/work/alderspan-preview.webp',
    previewAlt: 'Alderspan Engineering homepage hero reading “Engineering with consequence.” beside a tied-arch structural drawing',
    previewPosition: 'left 10%',
    galleryImages: [
      {
        src: '/work/alderspan-projects.webp',
        alt: 'Alderspan project index with discipline filters and illustrated project cards',
        caption: 'Filtered project index',
      },
      {
        src: '/work/alderspan-case-study.webp',
        alt: 'Morrow Viaduct case-study page with a large vector illustration and a fictional-concept label',
        caption: 'Case-study page, labelled as a fictional concept',
      },
      {
        src: '/work/alderspan-expertise.webp',
        alt: 'Alderspan expertise page listing engineering disciplines in an editorial layout',
        caption: 'Expertise disciplines',
      },
    ],
    features: [
      {
        title: 'Custom vector identity',
        detail:
          'The mark combines a vertical support, a triangular cantilever, and an intermediate chord — drawn as SVG so it stays crisp at every size and can be animated path by path.',
      },
      {
        title: 'Logo-to-navigation intro',
        detail:
          'On first visit the lockup starts centred and oversized, the mark draws itself, the wordmark fades in, and the whole thing travels to its real header position over about 1.75 seconds using the Web Animations API. The header reserves the final space throughout, so nothing shifts.',
      },
      {
        title: 'An intro that knows when to stay out of the way',
        detail:
          'Session storage skips the sequence after its first completion, a reduced-motion preference skips it entirely, and a resize mid-animation ends it safely.',
      },
      {
        title: 'Content-driven project system',
        detail:
          'Projects live in one typed data file. Adding an entry creates its route, its index card, and its homepage feature automatically; disciplines and filter counts are derived rather than hand-maintained.',
      },
      {
        title: 'Original structural illustration',
        detail:
          'Four scalable architectural concept illustrations and an inline load-path diagram were drawn as SVG for the site, keeping the page weight low and the drawings sharp on any display.',
      },
      {
        title: 'Honest about being a concept',
        detail:
          'Case studies carry a visible “fictional concept” label, and the contact form validates locally and shows a demo acknowledgement without transmitting or storing anything.',
      },
    ],
    liveUrl: 'https://alderspan.alexvannelli.com',
    liveLabel: 'VIEW LIVE SITE',
    repositoryUrl: '',
    conceptProject: true,
    featured: true,
  },
  {
    slug: 'morrow-and-crumb',
    title: 'Morrow & Crumb',
    category: 'Hospitality',
    type: 'Boutique bakery concept',
    year: '2025',
    description:
      'A self-directed bakery concept built around a hand-and-croissant mark, drawn pastry illustrations, and a warm editorial menu.',
    overview: [
      'Morrow & Crumb is an independent concept project. The bakery, its address, hours, menu, and contact details are all invented for the purpose of the design.',
      'It is deliberately a small static site — one page, three sections — which put the weight on identity, illustration, and typography rather than on structure. Everything is hand-written CSS with no UI framework.',
    ],
    role: 'Self-directed concept — identity design, illustration, art direction, and frontend development.',
    technologies: ['React 19', 'TypeScript', 'Vite', 'SVG illustration', 'Hand-written CSS'],
    capabilities: ['Brand identity', 'Pastry illustration', 'Intro animation', 'Menu system'],
    previewImage: '/work/morrow-crumb-preview.webp',
    previewAlt: 'Morrow & Crumb homepage after the logo animation, with the hand-and-croissant mark and the headline “Baked slowly. Gone quickly.”',
    previewPosition: 'left top',
    galleryImages: [
      {
        src: '/work/morrow-crumb-menu.webp',
        alt: 'Menu grid of pastries, each with a drawn illustration, price, and description',
        caption: 'Illustrated menu grid',
      },
      {
        src: '/work/morrow-crumb-detail.webp',
        alt: 'Lower menu items and the footer showing hours, contact details, and the bakery mark',
        caption: 'Menu detail and footer',
      },
    ],
    features: [
      {
        title: 'Hand-and-croissant mark',
        detail:
          'The logo is a custom SVG component — an open hand offering a croissant — used at every scale from the favicon to the header lockup and the footer.',
      },
      {
        title: 'Intro-to-header transition',
        detail:
          'A dedicated animation hook runs the opening logo sequence and flips a single revealed flag on the page, which the header and hero read to settle into their resting state. Timing lives in one place and is easy to retune.',
      },
      {
        title: 'Drawn pastry illustrations',
        detail:
          'Every menu item has its own vector illustration rather than a stock photograph, which keeps the palette consistent and the page light.',
      },
      {
        title: 'Warm editorial visual system',
        detail:
          'A honey and cream palette, a display serif paired with a quiet sans, a torn wave dividing hero from menu, and drifting background shapes give the page its character without decoration for its own sake.',
      },
      {
        title: 'Menu driven by data',
        detail:
          'Items, prices, categories, and notes live in one typed file, so the menu can be reordered or reseasoned without touching layout code.',
      },
      {
        title: 'Responsive static site',
        detail:
          'The two-column hero, the menu grid, and the footer collapse cleanly down to phone widths, and the whole thing builds to static files.',
      },
    ],
    liveUrl: 'https://morrowcrumb.alexvannelli.com',
    liveLabel: 'VIEW LIVE SITE',
    repositoryUrl: '',
    conceptProject: true,
  },
];

export const getProject = (slug: string) => projects.find((project) => project.slug === slug);

export const process = [
  { number: '01', name: 'Discover', text: 'Define the audience, goals, content, and required functionality.' },
  { number: '02', name: 'Design', text: 'Shape the visual direction and review key pages together.' },
  { number: '03', name: 'Build', text: 'Build, test, and refine the approved direction across devices.' },
  { number: '04', name: 'Launch', text: 'Confirm ownership, editing, hosting, and support before going live.' },
];
