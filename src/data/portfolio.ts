import type { ImageMetadata } from 'astro';

import insertcoinHome from '../assets/work/insertcoin-home.webp';
import insertcoinSelect from '../assets/work/insertcoin-select.webp';
import insertcoinHockey from '../assets/work/insertcoin-air-hockey.webp';
import insertcoinMobile from '../assets/work/insertcoin-mobile.webp';
import alderspanHome from '../assets/work/alderspan-home.webp';
import alderspanProjects from '../assets/work/alderspan-projects.webp';
import alderspanCase from '../assets/work/alderspan-case.webp';
import alderspanMobile from '../assets/work/alderspan-mobile.webp';
import morrowHome from '../assets/work/morrow-home.webp';
import morrowMenu from '../assets/work/morrow-menu.webp';
import morrowMobile from '../assets/work/morrow-mobile.webp';

export const site = {
  name: 'Alessandro Vannelli',
  role: 'Independent web design & development',
  title: 'Alessandro Vannelli — Different worlds, built from scratch',
  description:
    'Alessandro Vannelli is an independent web designer and developer who builds distinctive websites from a blank page, each with an identity of its own.',
  url: 'https://alexvannelli.com',
  /** Placeholder until the real address is chosen. The inquiry form composes an email to it. */
  email: 'hello@example.com',
};

export interface Shot {
  src: ImageMetadata;
  alt: string;
  caption: string;
}

export interface Decision {
  title: string;
  detail: string;
}

export interface Project {
  slug: string;
  number: string;
  title: string;
  /** Short descriptor, e.g. "Browser arcade". */
  kind: string;
  /** How the introduction refers to it in a sentence, e.g. "an arcade". */
  phrase: string;
  category: string;
  /** The project's own headline, quoted from the live site. */
  headline: string;
  /** One sentence for the homepage. */
  summary: string;
  /** Longer overview for the case study. */
  overview: string[];
  role: string;
  technologies: string[];
  /** Self-directed concept with no real client behind it. */
  concept: boolean;
  logo: string;
  /** Deployed site. Every project listed here must have a real URL. */
  liveUrl: string;
  liveLabel: string;
  domain: string;
  /** The single most recognisable view, used in the homepage hero stack. */
  poster: Shot;
  /** The lead image of the project's own world and case study. */
  cover: Shot;
  mobile: Shot;
  gallery: Shot[];
  decisions: Decision[];
}

/* Homepages double as the hero poster and the world's lead image. */
const alderspanHomeShot: Shot = {
  src: alderspanHome,
  alt: 'Alderspan Engineering homepage reading “Engineering with consequence.” beside a blueprint drawing of a tied-arch bridge',
  caption: 'Homepage',
};
const morrowHomeShot: Shot = {
  src: morrowHome,
  alt: 'Morrow & Crumb homepage reading “Baked slowly. Gone quickly.” beside a card listing the week’s opening hours',
  caption: 'Homepage',
};

export interface Game {
  number: string;
  name: string;
  genre: string;
  tagline: string;
}

/** InsertCoin's cabinets, as they appear on the live arcade floor. */
export const games: Game[] = [
  { number: '01', name: 'Circuit Break', genre: 'Brick breaker', tagline: 'Break the pattern.' },
  { number: '02', name: 'Silly Fish', genre: 'One-button swimmer', tagline: 'Small fish. Big ambitions.' },
  { number: '03', name: 'Air Hockey', genre: 'Player vs CPU', tagline: 'Seven goals. One table.' },
];

export const projects: Project[] = [
  {
    slug: 'insertcoin',
    number: '01',
    title: 'InsertCoin',
    kind: 'Browser arcade',
    phrase: 'an arcade',
    category: 'Interactive',
    headline: 'A little escape. A lot of play.',
    summary:
      'A personal browser arcade with three original games. No install, no account, no downloads — press start and play.',
    overview: [
      'InsertCoin is a personal browser arcade: a title screen, an arcade floor of game cabinets, and three original games that all run in the browser with no accounts, backend, or external asset downloads.',
      'Every game plugs into one typed contract. A registry entry describes the game and lazy-loads its module; the module returns start, pause, restart and destroy handlers and publishes score, lives and status through a single callback. The shared shell renders the cabinet, readouts and controls from that snapshot, so adding a game needs no new routes or page components.',
    ],
    role: 'Sole designer and developer — interaction design, visual system, game design, and all frontend and game code.',
    technologies: ['React 19', 'TypeScript', 'Vite', 'Phaser 3', 'Web Audio API', 'CSS', 'Playwright'],
    concept: false,
    logo: '/work/insertcoin-logo.svg',
    liveUrl: 'https://insertcoin.alexvannelli.com',
    liveLabel: 'Play the arcade',
    domain: 'insertcoin.alexvannelli.com',
    poster: {
      src: insertcoinHome,
      alt: 'InsertCoin title screen with a large neon wordmark, a spinning coin and a press-start button',
      caption: 'Title screen',
    },
    cover: {
      src: insertcoinSelect,
      alt: 'InsertCoin arcade floor reading “Choose your game”, with cabinets for Circuit Break, Silly Fish and Air Hockey',
      caption: 'The arcade floor',
    },
    mobile: {
      src: insertcoinMobile,
      alt: 'InsertCoin title screen on a phone, with the yellow wordmark and a press-start button',
      caption: 'Title screen on a phone',
    },
    gallery: [
      {
        src: insertcoinHockey,
        alt: 'Air Hockey running in the shared game shell, with a player-versus-CPU scoreboard above the rink',
        caption: 'Air Hockey in the shared shell',
      },
    ],
    decisions: [
      {
        title: 'One mounting contract, every game',
        detail:
          'Circuit Break, Silly Fish and Air Hockey all implement the same mount and controller interface, so the shell never needs to know which game it is running.',
      },
      {
        title: 'Phaser scenes written from scratch',
        detail:
          'Each game separates its simulation model from its Phaser scene, so physics, collisions and match rules are testable independently of rendering and input.',
      },
      {
        title: 'A shell that adapts to the game',
        detail:
          'The shared shell reads optional score and match modes from the published snapshot to render the right scoreboard, readouts and touch controls for each cabinet.',
      },
      {
        title: 'No external assets',
        detail:
          'All cabinet artwork is drawn as React and Phaser graphics, and sound cues are generated at runtime with the Web Audio API. Audio starts muted and is toggled from the header.',
      },
      {
        title: 'Persistence and accessibility',
        detail:
          'High scores and sound preferences persist in local storage when available. Menus are keyboard-operable, game state is mirrored in a live region, and reduced-motion preferences disable entrance and blinking animations.',
      },
    ],
  },
  {
    slug: 'alderspan',
    number: '02',
    title: 'Alderspan Engineering',
    kind: 'Engineering consultancy concept',
    phrase: 'an engineering practice',
    category: 'Construction & Engineering',
    headline: 'Engineering with consequence.',
    summary:
      'A self-directed concept for an engineering consultancy: an editorial multi-page site with an animated identity and original structural drawings.',
    overview: [
      'Alderspan Engineering is an independent concept project, not client work. The consultancy, its people, projects and statistics are all invented, and every piece of architectural imagery is an original vector illustration rather than a photograph.',
      'The brief I set myself was to make technical work feel readable: an editorial layout with generous type, a filtered project index, and case-study pages that carry drawings, figures and plain-language description without turning into a brochure.',
    ],
    role: 'Self-directed concept — brand identity, editorial art direction, illustration and frontend development.',
    technologies: ['React 19', 'TypeScript', 'Vite', 'React Router 7', 'Web Animations API', 'SVG', 'CSS', 'Playwright'],
    concept: true,
    logo: '/work/alderspan-logo.svg',
    liveUrl: 'https://alderspan.alexvannelli.com',
    liveLabel: 'Visit the site',
    domain: 'alderspan.alexvannelli.com',
    poster: alderspanHomeShot,
    cover: alderspanHomeShot,
    mobile: {
      src: alderspanMobile,
      alt: 'Alderspan Engineering homepage on a phone, with the headline above the blueprint drawing',
      caption: 'Homepage on a phone',
    },
    gallery: [
      {
        src: alderspanProjects,
        alt: 'Alderspan project index reading “Projects with lasting purpose.”, with a cable-stayed bridge blueprint and filtered project cards',
        caption: 'Project index',
      },
      {
        src: alderspanCase,
        alt: 'North Basin Crossing case-study page with a large illustration of a pedestrian bridge over water, labelled fictional concept',
        caption: 'Case study, labelled as a fictional concept',
      },
    ],
    decisions: [
      {
        title: 'Custom vector identity',
        detail:
          'The mark combines a vertical support, a triangular cantilever and an intermediate chord — drawn as SVG so it stays crisp at every size and can be animated path by path.',
      },
      {
        title: 'Logo-to-navigation intro',
        detail:
          'On first visit the lockup starts centred and oversized, the mark draws itself, the wordmark fades in, and the whole thing travels to its real header position using the Web Animations API. The header reserves the final space throughout, so nothing shifts.',
      },
      {
        title: 'An intro that knows when to stay out of the way',
        detail:
          'Session storage skips the sequence after its first completion, a reduced-motion preference skips it entirely, and a resize mid-animation ends it safely.',
      },
      {
        title: 'Content-driven project system',
        detail:
          'Projects live in one typed data file. Adding an entry creates its route, its index card and its homepage feature automatically; disciplines and filter counts are derived rather than hand-maintained.',
      },
      {
        title: 'Honest about being a concept',
        detail:
          'Case studies carry a visible “fictional concept” label, and the contact form validates locally and shows a demo acknowledgement without transmitting or storing anything.',
      },
    ],
  },
  {
    slug: 'morrow-and-crumb',
    number: '03',
    title: 'Morrow & Crumb',
    kind: 'Neighbourhood bakery concept',
    phrase: 'a bakery',
    category: 'Hospitality',
    headline: 'Baked slowly. Gone quickly.',
    summary:
      'A self-directed bakery concept built around a hand-and-croissant mark, drawn pastry illustrations and a warm editorial menu.',
    overview: [
      'Morrow & Crumb is an independent concept project. The bakery, its address, hours, menu and contact details are all invented for the purpose of the design.',
      'It is deliberately a small static site, which put the weight on identity, illustration and typography rather than on structure. Everything is hand-written CSS with no UI framework.',
    ],
    role: 'Self-directed concept — identity design, illustration, art direction and frontend development.',
    technologies: ['React 19', 'TypeScript', 'Vite', 'SVG illustration', 'Hand-written CSS'],
    concept: true,
    logo: '/work/morrow-crumb-logo.svg',
    liveUrl: 'https://morrowcrumb.alexvannelli.com',
    liveLabel: 'Visit the bakery',
    domain: 'morrowcrumb.alexvannelli.com',
    poster: morrowHomeShot,
    cover: morrowHomeShot,
    mobile: {
      src: morrowMobile,
      alt: 'Morrow & Crumb homepage on a phone, with the serif headline and a read-the-menu button',
      caption: 'Homepage on a phone',
    },
    gallery: [
      {
        src: morrowMenu,
        alt: 'The bakery menu laid out like an open book, with drawn pastry illustrations beside each item and its price',
        caption: 'The illustrated menu',
      },
    ],
    decisions: [
      {
        title: 'Hand-and-croissant mark',
        detail:
          'The logo is a custom SVG component — an open hand offering a croissant — used at every scale from the favicon to the header lockup and the footer.',
      },
      {
        title: 'Intro-to-header transition',
        detail:
          'A dedicated animation hook runs the opening logo sequence and flips a single revealed flag, which the header and hero read to settle into their resting state. Timing lives in one place and is easy to retune.',
      },
      {
        title: 'Drawn pastry illustrations',
        detail:
          'Every menu item has its own vector illustration rather than a stock photograph, which keeps the palette consistent and the page light.',
      },
      {
        title: 'A warm editorial system',
        detail:
          'A honey and cream palette, a display serif paired with a quiet sans, and a soft wave dividing hero from menu give the page its character without decoration for its own sake.',
      },
      {
        title: 'Menu driven by data',
        detail:
          'Items, prices, categories and notes live in one typed file, so the menu can be reordered or reseasoned without touching layout code.',
      },
    ],
  },
];

export const getProject = (slug: string) => projects.find((project) => project.slug === slug);

export interface Interest {
  slug: 'games' | 'lifting' | 'pitbulls' | 'hockey';
  title: string;
  /**
   * A few lines in Alessandro's own words about why this matters to him.
   * While it is empty the tile stays a static illustration on the live
   * site, and the local preview shows a reminder in its place.
   */
  description: string;
}

/** The "Off the clock" tiles in the About section. */
export const interests: Interest[] = [
  { slug: 'games', title: 'Video games', description: '' },
  { slug: 'lifting', title: 'Lifting', description: '' },
  { slug: 'pitbulls', title: 'Pitbulls', description: '' },
  { slug: 'hockey', title: 'Hockey', description: '' },
];

export const process = [
  { number: '01', name: 'Discover', text: 'Define the audience, goals, content and what the site needs to do.' },
  { number: '02', name: 'Design', text: 'Shape the visual direction and review the key pages together.' },
  { number: '03', name: 'Build', text: 'Build, test and refine the approved direction across devices.' },
  { number: '04', name: 'Launch', text: 'Confirm ownership, editing, hosting and support before going live.' },
];
