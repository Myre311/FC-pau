'use client';

import { useEffect, useRef } from 'react';

// Canvas hero — port direct de fcpau-index.html.
// Lignes de flux Perlin + sparks + grille perspective + lueurs radiales
// + diagonales décoratives. Pause auto sur onglet inactif.
// Léger (60 lignes ~95 sparks) — OK mobile mid-range.

export function HeroCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W = 0;
    let H = 0;
    let frame = 0;
    let animId = 0;

    function resize() {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }
    resize();
    const onResize = () => resize();
    window.addEventListener('resize', onResize, { passive: true });

    function noise(x, y, t) {
      return (
        Math.sin(x * 0.018 + t * 0.0006) *
        Math.cos(y * 0.014 + t * 0.0005) *
        Math.sin((x + y) * 0.009 + t * 0.0004)
      );
    }

    class FlowLine {
      constructor() {
        this.reset(true);
      }
      reset(init) {
        this.x = Math.random() * W;
        this.y = init ? Math.random() * H : Math.random() < 0.5 ? 0 : H;
        this.pts = [];
        this.life = 0;
        this.maxLife = 160 + Math.random() * 220;
        this.speed = 0.55 + Math.random() * 0.9;
        this.width = 0.25 + Math.random() * 0.55;
        this.bright = 0.08 + Math.random() * 0.28;
        this.hue = Math.random() < 0.75 ? '255,204,0' : '203,167,77';
      }
      update() {
        const n = noise(this.x, this.y, frame);
        const angle = n * Math.PI * 3.5;
        this.x += Math.cos(angle) * this.speed;
        this.y += Math.sin(angle) * this.speed * 0.7;
        this.pts.push({ x: this.x, y: this.y });
        if (this.pts.length > 55) this.pts.shift();
        this.life++;
      }
      draw() {
        if (this.pts.length < 2) return;
        const t = this.life / this.maxLife;
        const fade = t < 0.15 ? t / 0.15 : t > 0.7 ? 1 - (t - 0.7) / 0.3 : 1;
        ctx.beginPath();
        ctx.moveTo(this.pts[0].x, this.pts[0].y);
        for (let i = 1; i < this.pts.length; i++) ctx.lineTo(this.pts[i].x, this.pts[i].y);
        ctx.strokeStyle = `rgba(${this.hue},${fade * this.bright})`;
        ctx.lineWidth = this.width;
        ctx.stroke();
      }
      dead() {
        return (
          this.life >= this.maxLife ||
          this.x < -80 ||
          this.x > W + 80 ||
          this.y < -80 ||
          this.y > H + 80
        );
      }
    }

    class Spark {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * W;
        this.y = Math.random() * H;
        this.r = 0.3 + Math.random() * 0.9;
        this.a = 0.05 + Math.random() * 0.3;
        this.ph = Math.random() * Math.PI * 2;
        this.sp = 0.004 + Math.random() * 0.012;
        this.col = Math.random() < 0.7 ? '255,204,0' : '255,255,255';
      }
      draw() {
        const a = this.a * (0.4 + 0.6 * Math.sin(frame * this.sp + this.ph));
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.col},${a})`;
        ctx.fill();
      }
    }

    function drawStructure() {
      ctx.save();
      const cx = W * 0.5,
        cy = H * 0.58,
        fov = 900;
      const gc = 14,
        gr = 10,
        gW = W * 1.6,
        gH = H * 1.2,
        ox = -gW / 2,
        oz = 80;
      const sc = (frame * 0.00014) % (1 / gr);
      for (let r = 0; r <= gr; r++) {
        const z = oz + (r / gr + sc) * gH;
        const s = fov / (fov + z);
        const py = cy + H * 0.38 * s;
        const xl = cx + ox * s,
          xr = cx + (ox + gW) * s;
        const a = Math.max(0, 0.18 - (r / gr) * 0.16);
        ctx.beginPath();
        ctx.moveTo(xl, py);
        ctx.lineTo(xr, py);
        ctx.strokeStyle = `rgba(26,29,56,${a})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
      for (let c = 0; c <= gc; c++) {
        const xo = ox + (c / gc) * gW;
        const s0 = fov / (fov + oz),
          s1 = fov / (fov + oz + gH);
        const x0 = cx + xo * s0,
          y0 = cy + H * 0.38 * s0;
        const x1 = cx + xo * s1,
          y1 = cy + H * 0.38 * s1;
        const dist = Math.abs(c / gc - 0.5) * 2;
        const a = Math.max(0, 0.14 - dist * 0.1);
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.strokeStyle = `rgba(26,29,56,${a})`;
        ctx.lineWidth = 0.4;
        ctx.stroke();
      }
      ctx.restore();
    }

    function drawGlow() {
      const px = 0.63,
        py = 0.44;
      const p = 0.82 + 0.18 * Math.sin(frame * 0.0009);

      const g = ctx.createRadialGradient(W * px, H * py, 0, W * px, H * py, W * 0.44 * p);
      g.addColorStop(0, 'rgba(255,204,0,0.072)');
      g.addColorStop(0.4, 'rgba(20,25,55,0.03)');
      g.addColorStop(1, 'rgba(4,9,29,0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);

      const g2 = ctx.createRadialGradient(W * 0.12, H * 0.35, 0, W * 0.12, H * 0.35, W * 0.28);
      g2.addColorStop(0, 'rgba(30,35,80,0.06)');
      g2.addColorStop(1, 'rgba(4,9,29,0)');
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, W, H);

      const g3 = ctx.createRadialGradient(W * px, H * py, 0, W * px, H * py, W * 0.12 * p);
      g3.addColorStop(0, 'rgba(255,204,0,0.1)');
      g3.addColorStop(1, 'rgba(255,204,0,0)');
      ctx.fillStyle = g3;
      ctx.fillRect(0, 0, W, H);
    }

    function drawDiagonals() {
      ctx.save();
      const g = ctx.createLinearGradient(0, H * 0.8, W * 0.35, 0);
      g.addColorStop(0, 'rgba(255,204,0,0)');
      g.addColorStop(0.45, 'rgba(255,204,0,0.055)');
      g.addColorStop(1, 'rgba(255,204,0,0)');
      ctx.beginPath();
      ctx.moveTo(-10, H * 0.8);
      ctx.lineTo(W * 0.35, -10);
      ctx.strokeStyle = g;
      ctx.lineWidth = 1;
      ctx.stroke();

      const g2 = ctx.createLinearGradient(W * 0.55, H, W * 0.9, H * 0.1);
      g2.addColorStop(0, 'rgba(203,167,77,0)');
      g2.addColorStop(0.5, 'rgba(203,167,77,0.04)');
      g2.addColorStop(1, 'rgba(203,167,77,0)');
      ctx.beginPath();
      ctx.moveTo(W * 0.55, H);
      ctx.lineTo(W * 0.9, H * 0.1);
      ctx.strokeStyle = g2;
      ctx.lineWidth = 0.8;
      ctx.stroke();
      ctx.restore();
    }

    const lines = Array.from({ length: 65 }, () => new FlowLine());
    const sparks = Array.from({ length: 90 }, () => new Spark());

    function draw() {
      animId = requestAnimationFrame(draw);
      frame++;
      ctx.fillStyle = '#04091D';
      ctx.fillRect(0, 0, W, H);
      drawStructure();
      drawGlow();
      drawDiagonals();
      sparks.forEach((s) => s.draw());
      ctx.lineCap = 'round';
      for (let i = lines.length - 1; i >= 0; i--) {
        lines[i].draw();
        lines[i].update();
        if (lines[i].dead()) lines[i].reset();
      }
      while (lines.length < 65) lines.push(new FlowLine());
    }
    draw();

    function onVisibility() {
      if (document.hidden) cancelAnimationFrame(animId);
      else draw();
    }
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
