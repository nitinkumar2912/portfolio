"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  baseOpacity: number;
};

const CONNECTION_DISTANCE = 170;
const PARTICLE_DENSITY = 0.00005;
const MIN_PARTICLES = 30;
const MAX_PARTICLES = 100;
const MOUSE_GLOW_RADIUS = 180;

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let particles: Particle[] = [];
    let animId = 0;
    let w = 0;
    let h = 0;

    function onMouseMove(e: MouseEvent) {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    }

    function onMouseLeave() {
      mouseRef.current = { x: -1000, y: -1000 };
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function createParticles() {
      const count = Math.min(
        Math.max(Math.floor(w * h * PARTICLE_DENSITY), MIN_PARTICLES),
        MAX_PARTICLES,
      );
      particles = Array.from({ length: count }, () => {
        const depth = Math.random();
        const baseOpacity = 0.08 + depth * 0.35;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.2 * (0.3 + depth * 0.7),
          vy: (Math.random() - 0.5) * 0.2 * (0.3 + depth * 0.7),
          radius: 0.5 + depth * 1.6,
          opacity: baseOpacity,
          baseOpacity,
        };
      });
    }

    function animate() {
      ctx!.clearRect(0, 0, w, h);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Update positions and mouse interaction
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;

        // Brighten particles near cursor
        const dmx = p.x - mx;
        const dmy = p.y - my;
        const mouseDist = Math.sqrt(dmx * dmx + dmy * dmy);
        if (mouseDist < MOUSE_GLOW_RADIUS) {
          const boost = (1 - mouseDist / MOUSE_GLOW_RADIUS) * 0.45;
          p.opacity = Math.min(p.baseOpacity + boost, 0.75);
        } else {
          p.opacity += (p.baseOpacity - p.opacity) * 0.05;
        }
      }

      // Cursor glow
      if (mx > 0 && my > 0) {
        const gradient = ctx!.createRadialGradient(mx, my, 0, mx, my, MOUSE_GLOW_RADIUS);
        gradient.addColorStop(0, "rgba(255, 255, 255, 0.035)");
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx!.beginPath();
        ctx!.arc(mx, my, MOUSE_GLOW_RADIUS, 0, Math.PI * 2);
        ctx!.fillStyle = gradient;
        ctx!.fill();
      }

      // Constellation lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distSq = dx * dx + dy * dy;

          if (distSq < CONNECTION_DISTANCE * CONNECTION_DISTANCE) {
            const dist = Math.sqrt(distSq);
            let alpha = (1 - dist / CONNECTION_DISTANCE) * 0.12;

            // Boost lines near cursor
            if (mx > 0 && my > 0) {
              const midX = (particles[i].x + particles[j].x) / 2;
              const midY = (particles[i].y + particles[j].y) / 2;
              const mdx = midX - mx;
              const mdy = midY - my;
              const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
              if (mDist < MOUSE_GLOW_RADIUS) {
                alpha += (1 - mDist / MOUSE_GLOW_RADIUS) * 0.1;
              }
            }

            ctx!.beginPath();
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.strokeStyle = `rgba(255,255,255,${alpha})`;
            ctx!.lineWidth = 0.6;
            ctx!.stroke();
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255,255,255,${p.opacity})`;
        ctx!.fill();
      }

      animId = requestAnimationFrame(animate);
    }

    resize();
    createParticles();
    animate();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: -1 }}
      aria-hidden="true"
    />
  );
}
