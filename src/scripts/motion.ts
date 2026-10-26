/**
 * Progressive motion for the exhibition.
 *
 * Every behaviour here is an enhancement: the markup is complete, visible
 * and operable before this runs, and anything that moves is skipped when
 * the viewer prefers reduced motion. Nothing hijacks scrolling.
 */

const reduced = matchMedia('(prefers-reduced-motion: reduce)');

/* ---------------------------------------------------------------------
   Scroll reveal
   Marks [data-reveal] elements as shown once ~15% visible. Siblings get a
   --i index (unless the markup sets one) so groups arrive in sequence.
   --------------------------------------------------------------------- */
function initReveal() {
  const items = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (!items.length) return;

  if (reduced.matches || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.setAttribute('data-shown', ''));
    return;
  }

  const groups = new Map<Element, number>();
  items.forEach((el) => {
    if (el.style.getPropertyValue('--i')) return;
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
    (entries) => entries.forEach((entry) => entry.isIntersecting && show(entry.target)),
    { threshold: 0.15, rootMargin: '0px 0px -6% 0px' },
  );
  items.forEach((el) => observer.observe(el));

  /* An instant jump (anchor link, restored scroll, find-in-page) can carry
     an element past the viewport between frames, so the observer never
     sees it. Sweep anything at or above the fold, then detach. */
  const sweep = () => {
    pending.forEach((el) => {
      if (el.getBoundingClientRect().top < innerHeight) show(el);
    });
    if (!pending.size) removeEventListener('scroll', sweep);
  };
  addEventListener('scroll', sweep, { passive: true });
  requestAnimationFrame(sweep);
}

/* ---------------------------------------------------------------------
   Hand-drawn strokes
   Measures each path so the dash animation in CSS matches its length.
   --------------------------------------------------------------------- */
function initDraw() {
  document.querySelectorAll<SVGPathElement>('[data-draw] path').forEach((path) => {
    path.style.setProperty('--len', String(Math.ceil(path.getTotalLength()) + 2));
  });
}

/* ---------------------------------------------------------------------
   Depth
   [data-depth] layers drift against the scroll by a fraction of their
   distance from the viewport centre, capped so nothing travels far.
   --------------------------------------------------------------------- */
function initDepth() {
  const layers = [...document.querySelectorAll<HTMLElement>('[data-depth]')];
  if (!layers.length || reduced.matches) return;

  let frame = 0;
  const update = () => {
    frame = 0;
    const mid = innerHeight / 2;
    layers.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.bottom < -200 || rect.top > innerHeight + 200) return;
      const depth = Number(el.dataset.depth) || 0;
      const offset = Math.max(-48, Math.min(48, (mid - (rect.top + rect.height / 2)) * depth));
      el.style.setProperty('--py', `${offset.toFixed(1)}px`);
    });
  };
  const request = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };
  addEventListener('scroll', request, { passive: true });
  addEventListener('resize', request, { passive: true });
  update();
}

/* ---------------------------------------------------------------------
   Header world
   The header takes on the world of whatever section sits just beneath
   it ([data-header-world]; ivory "paper" when none does), and swaps its
   role line for that section's label. On the homepage the three-part rail
   fills as the reader moves through each world.
   This is not motion, so it runs under reduced motion too.
   --------------------------------------------------------------------- */
function initHeaderWorld() {
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (!header) return;
  const zones = [...document.querySelectorAll<HTMLElement>('[data-header-world]')];
  const role = header.querySelector<HTMLElement>('[data-role]');
  const fallback = role?.textContent ?? '';
  const rail = [...header.querySelectorAll<HTMLElement>('[data-rail]')].map((segment) => ({
    segment,
    section: document.getElementById(segment.dataset.rail ?? ''),
  }));

  let frame = 0;
  let current: HTMLElement | null | undefined;
  const update = () => {
    frame = 0;
    const probe = header.offsetHeight + 1;
    const zone = zones.find((el) => {
      const rect = el.getBoundingClientRect();
      return rect.top <= probe && rect.bottom > probe;
    }) ?? null;
    if (zone !== current) {
      current = zone;
      header.dataset.world = zone?.dataset.headerWorld ?? 'paper';
      if (role) role.textContent = zone?.dataset.headerLabel ?? fallback;
    }
    rail.forEach(({ segment, section }) => {
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, (probe - rect.top) / rect.height));
      segment.style.setProperty('--p', progress.toFixed(3));
    });
  };
  const request = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };
  addEventListener('scroll', request, { passive: true });
  addEventListener('resize', request, { passive: true });
  update();
}

function start() {
  initDraw();
  initReveal();
  initDepth();
  initHeaderWorld();
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
  document.querySelectorAll<HTMLElement>('[data-depth]').forEach((el) => el.style.removeProperty('--py'));
});
