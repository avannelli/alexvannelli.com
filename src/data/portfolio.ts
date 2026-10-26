export const site = {
  name: 'Alessandro Vannelli',
  title: 'Alessandro Vannelli ? Websites built around the business behind them',
  description: 'Distinctive, fast websites for local businesses, designed and developed by Alessandro Vannelli.',
  email: 'hello@example.com',
};

export interface Project {
  slug: string;
  title: string;
  category: string;
  type: string;
  logo: string;
  liveUrl: string;
}

export const projects: Project[] = [
  { slug: 'insertcoin', title: 'InsertCoin', category: 'Interactive & Browser Experiences',
    type: 'Personal browser arcade', logo: '/work/insertcoin-logo.svg',
    liveUrl: 'https://insertcoin.alexvannelli.com' },
  { slug: 'alderspan', title: 'Alderspan Engineering', category: 'Construction & Engineering',
    type: 'Independent engineering consultancy concept', logo: '/work/alderspan-logo.svg',
    liveUrl: 'https://alderspan.alexvannelli.com' },
  { slug: 'morrow-and-crumb', title: 'Morrow & Crumb', category: 'Hospitality',
    type: 'Boutique bakery concept', logo: '/work/morrow-crumb-logo.svg',
    liveUrl: 'https://morrowcrumb.alexvannelli.com' },
];

export const process = [
  { name: 'Discover', text: 'Define the audience, goals, content, and required functionality.' },
  { name: 'Design', text: 'Shape the visual direction and review key pages together.' },
  { name: 'Build', text: 'Build, test, and refine the approved direction across devices.' },
  { name: 'Launch', text: 'Confirm ownership, editing, hosting, and support before going live.' },
];
