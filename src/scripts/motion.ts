/**
 * Motion primitives for the design system's three interactive signatures:
 * cursor spotlights, scroll-revealed entrances and hero parallax.
 *
 * Each one is progressive: the markup is complete and legible before this
 * runs, and every effect is skipped when the viewer prefers reduced motion.
 * Nothing here is required to read or operate the page.
 */

const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = matchMedia('(pointer: fine)');

/* ---------------------------------------------------------------------
   Spotlight
   Writes the cursor's position on the surface as --mx/--my percentages.
   The gradient itself lives in CSS, so this stays a coordinate feed.
   --------------------------------------------------------------------- */
function initSpotlights() {
  if (!finePointer.matches) return;

  const surfaces = document.querySelectorAll<HTMLElement>('[data-spotlight]');
  if (!surfaces.length) return;

  // One rAF for all surfaces: pointermove fires far faster than we paint.
  let pending: { el: HTMLElement; x: number; y: number } | null = null;
  let frame = 0;

  const flush = () => {
    frame = 0;
    if (!pending) return;
    const { el, x, y } = pending;
    el.style.setProperty('--mx', `${x}%`);
    el.style.setProperty('--my', `${y}%`);
    pending = null;
  };

  surfaces.forEach((el) => {
    el.addEventListener(
      'pointermove',
      (event) => {
        const rect = el.getBoundingClientRect();
        pending = {
          el,
          x: ((event.clientX - rect.left) / rect.width) * 100,
          y: ((event.clientY - rect.top) / rect.height) * 100,
        };
        if (!frame) frame = requestAnimationFrame(flush);
      },
      { passive: true },
    );
  });
}

/* ---------------------------------------------------------------------
   Scroll reveal
   Fade-up entrance once the element is ~18% visible. Siblings stagger via
   a --i index so a group arrives as a sequence rather than all at once.
   --------------------------------------------------------------------- */
function initReveal() {
  const items = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (!items.length) return;

  if (reduced.matches || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.setAttribute('data-shown', ''));
    return;
  }

  // Index within the nearest reveal group drives the stagger delay.
  const groups = new Map<Element, number>();
  items.forEach((el) => {
    const parent = el.parentElement ?? document.body;
    const next = groups.get(parent) ?? 0;
    el.style.setProperty('--i', String(next));
    groups.set(parent, next + 1);
  });

  const pending = new Set<HTMLElement>(items);
  const show = (el: Element) => {
    el.setAttribute('data-shown', '');
    pending.delete(el as HTMLElement);
    observer.unobserve(el);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) show(entry.target);
      });
    },
    { threshold: 0.18, rootMargin: '0px 0px -5% 0px' },
  );

  items.forEach((el) => observer.observe(el));

  /* Safety net. An instant jump — an anchor link, a restored scroll position,
     a find-in-page — can move the viewport past an element between frames, so
     the observer never sees it intersect and it stays at opacity 0 forever.
     This sweeps anything that has ended up at or above the fold and detaches
     itself once every element has been shown. */
  const sweep = () => {
    pending.forEach((el) => {
      if (el.getBoundingClientRect().top < innerHeight) show(el);
    });
    if (!pending.size) removeEventListener('scroll', sweep);
  };
  addEventListener('scroll', sweep, { passive: true });
  // Run once for anything already in view (or already scrolled past) on load.
  requestAnimationFrame(sweep);
}

/* ---------------------------------------------------------------------
   Hero parallax
   Over the first viewport the name settles by at most 8px and shrinks
   to .98. It stays legible while the cards come into view.
   --------------------------------------------------------------------- */
function initParallax() {
  const hero = document.querySelector<HTMLElement>('[data-parallax]');
  if (!hero || reduced.matches) return;

  let frame = 0;

  const update = () => {
    frame = 0;
    // Progress through the first viewport height, clamped to 0..1.
    const progress = Math.min(scrollY / innerHeight, 1);
    hero.style.setProperty('--p-y', `${(progress * 8).toFixed(1)}px`);
    hero.style.setProperty('--p-scale', (1 - progress * 0.02).toFixed(4));
  };

  const onScroll = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };

  addEventListener('scroll', onScroll, { passive: true });
  update();
}

function start() {
  initSpotlights();
  initReveal();
  initParallax();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', start, { once: true });
} else {
  start();
}

// If the viewer turns reduced motion on mid-session, settle everything.
reduced.addEventListener('change', () => {
  if (!reduced.matches) return;
  document.querySelectorAll('[data-reveal]').forEach((el) => el.setAttribute('data-shown', ''));
  const hero = document.querySelector<HTMLElement>('[data-parallax]');
  hero?.style.removeProperty('--p-y');
  hero?.style.removeProperty('--p-scale');
});
