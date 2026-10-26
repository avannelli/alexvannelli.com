/**
 * The About section's terminal effects: digital rain on a canvas behind
 * the content, and headlines that decode from scrambled glyphs.
 *
 * Both are enhancements. The rain only draws while the section is on
 * screen, at a capped frame rate, and neither runs under reduced motion.
 */

const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const GLYPHS = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789ABCDEF<>/=+*';
// Decoding uses ASCII only, so a monospace line keeps its width while it resolves.
const CIPHER = '01ABCDEF<>/=+*#%&$@';
const pick = (set = GLYPHS) => set[Math.floor(Math.random() * set.length)];

/* ---------------------------------------------------------------------
   Digital rain
   One column of glyphs per cell width; each column has a falling head
   drawn bright, and the canvas is washed with translucent black each frame
   so older glyphs fade into trails.
   --------------------------------------------------------------------- */
function initRain(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const cell = 18;
  let columns: number[] = [];
  let width = 0;
  let height = 0;
  let running = false;
  let last = 0;

  const resize = () => {
    const ratio = Math.min(devicePixelRatio || 1, 2);
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.font = `15px "Geist Mono", ui-monospace, monospace`;
    const count = Math.ceil(width / cell);
    columns = Array.from({ length: count }, (_, i) => columns[i] ?? Math.floor(Math.random() * -60));
  };

  const draw = (time: number) => {
    if (!running) return;
    requestAnimationFrame(draw);
    if (time - last < 55) return; // ~18fps reads as film, and costs little
    last = time;
    ctx.fillStyle = 'rgba(1, 6, 3, 0.16)';
    ctx.fillRect(0, 0, width, height);
    columns.forEach((row, i) => {
      const x = i * cell;
      const y = row * cell;
      if (y > 0) {
        ctx.fillStyle = 'rgba(0, 255, 70, 0.55)';
        ctx.fillText(pick(), x, y - cell);
        ctx.fillStyle = '#d8ffe0';
        ctx.fillText(pick(), x, y);
      }
      columns[i] = y > height && Math.random() > 0.965 ? Math.floor(Math.random() * -20) : row + 1;
    });
  };

  resize();
  addEventListener('resize', resize, { passive: true });
  new IntersectionObserver(([entry]) => {
    const visible = entry.isIntersecting;
    if (visible && !running) {
      running = true;
      requestAnimationFrame(draw);
    }
    running = visible;
  }).observe(canvas);
}

/* ---------------------------------------------------------------------
   Decode
   Each [data-decode] element is scrambled as soon as the script runs and
   resolves left to right once scrolled into view. The real text is on the
   parent's aria-label, so assistive tech never reads the cipher.
   --------------------------------------------------------------------- */
const scramble = (target: string, resolved: number) =>
  [...target].map((ch, i) => (i < resolved || ch === ' ' ? ch : pick(CIPHER))).join('');

function decode(el: HTMLElement, delay: number) {
  const target = el.dataset.text ?? '';
  let frame = 0;
  setTimeout(() => {
    const timer = setInterval(() => {
      frame += 1;
      const resolved = Math.floor(frame / 2);
      el.textContent = scramble(target, resolved);
      if (resolved >= target.length) {
        clearInterval(timer);
        el.textContent = target;
      }
    }, 34);
  }, delay);
}

function start() {
  if (reduced.matches) return;
  document.querySelectorAll<HTMLCanvasElement>('[data-rain]').forEach(initRain);

  const items = [...document.querySelectorAll<HTMLElement>('[data-decode]')];
  if (!items.length) return;
  items.forEach((el) => {
    el.dataset.text = el.textContent ?? '';
    el.textContent = scramble(el.dataset.text, 0);
  });
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        decode(entry.target as HTMLElement, items.indexOf(entry.target as HTMLElement) * 260);
      });
    },
    { threshold: 0.6 },
  );
  items.forEach((el) => observer.observe(el));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', start, { once: true });
} else {
  start();
}
