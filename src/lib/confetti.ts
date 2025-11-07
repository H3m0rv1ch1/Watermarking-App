/**
 * Lightweight confetti burst with two side cannons.
 * No dependencies. Draws to a temporary fullscreen canvas and cleans up.
 */

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  spin: number;
  life: number; // 0..1
  shape: 'rect' | 'circle';
};

const COLORS = ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#B97EF2', '#FF8FAB'];

function createCannons(canvas: HTMLCanvasElement, count: number): Particle[] {
  const particles: Particle[] = [];
  const h = canvas.height;
  const w = canvas.width;

  const spawnFrom = [
    { x: Math.max(40, w * 0.06), y: h - Math.max(40, h * 0.08), dir: 1 },
    { x: w - Math.max(40, w * 0.06), y: h - Math.max(40, h * 0.08), dir: -1 },
  ];

  spawnFrom.forEach((origin) => {
    for (let i = 0; i < count; i++) {
      const speed = 7 + Math.random() * 6; // initial speed
      const angle = (-Math.PI / 2) + origin.dir * (Math.PI / 8) + (Math.random() - 0.5) * (Math.PI / 6);
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;
      const size = 3 + Math.random() * 5;
      particles.push({
        x: origin.x,
        y: origin.y,
        vx,
        vy,
        size,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rotation: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.2,
        life: 1,
        shape: Math.random() < 0.5 ? 'rect' : 'circle',
      });
    }
  });

  return particles;
}

export function shootConfetti(options?: { duration?: number; particles?: number }) {
  const duration = options?.duration ?? 1800; // ms
  const perCannon = Math.max(50, Math.min(140, options?.particles ?? 100));

  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.inset = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    document.body.removeChild(canvas);
    return;
  }

  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resize();
  window.addEventListener('resize', resize);

  const particles = createCannons(canvas, perCannon);
  const gravity = 0.12;
  const drag = 0.996;
  const start = performance.now();

  const tick = (now: number) => {
    const elapsed = now - start;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p) => {
      p.vx *= drag;
      p.vy = p.vy * drag + gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.spin;
      p.life -= 0.005;

      // draw
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.fillStyle = p.color;
      if (p.shape === 'rect') {
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    });

    const alive = particles.some((p) => p.life > 0 && p.y < canvas.height + 60);
    if (elapsed < duration && alive) {
      requestAnimationFrame(tick);
    } else {
      window.removeEventListener('resize', resize);
      document.body.removeChild(canvas);
    }
  };

  requestAnimationFrame(tick);
}