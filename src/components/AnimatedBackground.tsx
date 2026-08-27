import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Wind, Flame, Eye, EyeOff } from 'lucide-react';

interface Particle {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  originalAlpha: number;
  pulseSpeed: number;
  pulseOffset: number;
}

export const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [animationMode, setAnimationMode] = useState<'embers' | 'aurora' | 'festivo'>('embers');
  const [showControls, setShowControls] = useState<boolean>(false);
  const mouseRef = useRef<{ x: number; y: number; radius: number }>({ x: -1000, y: -1000, radius: 180 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current.x = e.touches[0].clientX;
        mouseRef.current.y = e.touches[0].clientY;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    // Warm Huanka Palette
    const colors = [
      '#e5aa38', // Maize Gold
      '#c86a3e', // Terracotta Clay
      '#f3be52', // Warm Amber
      '#e27b49', // Ochre
      '#9e1c3b', // Andean Berry
      '#f97316', // Fiery Orange
    ];

    const particleCount = Math.min(Math.floor((width * height) / 14000), 75);
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      const radius = Math.random() * 2.8 + 0.8;
      const alpha = Math.random() * 0.6 + 0.2;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius,
        vx: (Math.random() - 0.5) * 0.6,
        vy: -Math.random() * 0.8 - 0.2, // Drift upward like warm embers
        alpha,
        originalAlpha: alpha,
        color,
        pulseSpeed: Math.random() * 0.03 + 0.01,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Organic Ambient Wave Gradients in Background
      const grad1 = ctx.createRadialGradient(
        width * 0.2 + Math.sin(time * 0.5) * 80,
        height * 0.3 + Math.cos(time * 0.4) * 60,
        20,
        width * 0.2,
        height * 0.3,
        width * 0.5
      );
      grad1.addColorStop(0, 'rgba(200, 106, 62, 0.09)');
      grad1.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const grad2 = ctx.createRadialGradient(
        width * 0.8 - Math.cos(time * 0.4) * 70,
        height * 0.7 + Math.sin(time * 0.6) * 80,
        20,
        width * 0.8,
        height * 0.7,
        width * 0.5
      );
      grad2.addColorStop(0, 'rgba(229, 170, 56, 0.08)');
      grad2.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // 2. Draw Moving Particles & Connect Nearby Andean Lines
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around borders
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Interactive mouse repulsion / attraction
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouseRef.current.radius) {
          const force = (mouseRef.current.radius - dist) / mouseRef.current.radius;
          p.x -= (dx / dist) * force * 3;
          p.y -= (dy / dist) * force * 3;
        }

        // Pulse alpha
        const currentAlpha = p.originalAlpha + Math.sin(time * 2 + p.pulseOffset) * 0.25;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0.05, Math.min(currentAlpha, 0.85));
        ctx.shadowBlur = p.radius * 4;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
        ctx.globalAlpha = 1;

        // Connect nearby particles with subtle golden Andean geometric lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distNodes = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (distNodes < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = '#e5aa38';
            ctx.globalAlpha = (1 - distNodes / 110) * 0.12;
            ctx.lineWidth = 0.6;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [animationMode]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Background Deep Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#140c08] via-[#1c110b] to-[#0d0705]" />

      {/* Floating Giant Warm Orbs */}
      <div className="absolute top-1/4 left-1/5 w-[650px] h-[650px] bg-[#c86a3e]/15 rounded-full blur-[160px] animate-float-slow" />
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-[#e5aa38]/12 rounded-full blur-[170px] animate-float-reverse" />
      <div className="absolute bottom-10 left-1/3 w-[550px] h-[550px] bg-[#9e1c3b]/12 rounded-full blur-[150px]" />

      {/* Ambient Moving Mesh Texture */}
      <div 
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay pointer-events-none" 
        style={{
          backgroundImage: `radial-gradient(#e5aa38 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }} 
      />

      {/* Interactive 60fps Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Floating Atmosphere Pill Controller */}
      <div className="fixed bottom-6 left-6 z-40 pointer-events-auto hidden md:block">
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#1f130d]/80 border border-[#e5aa38]/30 backdrop-blur-xl shadow-2xl">
          <button
            onClick={() => setShowControls(!showControls)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-[#f3be52] hover:text-white hover:bg-[#c86a3e]/30 transition-all"
            title="Ajustar animación ambiental"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#f3be52] animate-pulse" />
            <span className="font-cinzel text-[11px] tracking-wide">Fondo Activo ✦</span>
          </button>
        </div>
      </div>
    </div>
  );
};
