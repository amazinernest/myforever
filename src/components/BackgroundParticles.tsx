import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  baseOpacity: number;
  pulseSpeed: number;
  color: string;
}

export const BackgroundParticles: React.FC<{ isDark?: boolean }> = ({ isDark = false }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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

    const particles: Particle[] = [];
    const particleCount = Math.min(width < 768 ? 35 : 65, 75);

    const colorsLight = [
      'rgba(201, 151, 29, ', // subtle gold
      'rgba(184, 80, 106, ', // soft rose
      'rgba(229, 214, 200, ', // warm ivory
    ];

    const colorsDark = [
      'rgba(244, 222, 156, ', // gold glow
      'rgba(235, 148, 169, ', // pink spark
      'rgba(255, 255, 255, ', // pure white star
    ];

    const activeColors = isDark ? colorsDark : colorsLight;

    for (let i = 0; i < particleCount; i++) {
      const baseOp = Math.random() * 0.45 + 0.15;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * (isDark ? 2.2 : 3.2) + 0.8,
        speedX: (Math.random() - 0.5) * 0.25,
        speedY: -Math.random() * 0.35 - 0.1, // gentle upward drift
        opacity: baseOp,
        baseOpacity: baseOp,
        pulseSpeed: Math.random() * 0.02 + 0.008,
        color: activeColors[Math.floor(Math.random() * activeColors.length)],
      });
    }

    let time = 0;
    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around
        if (p.y < -10) p.y = height + 10;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Subtle pulsing glow
        const currentOpacity = p.baseOpacity + Math.sin(time * p.pulseSpeed * 100) * 0.15;
        const safeOpacity = Math.max(0.05, Math.min(0.85, currentOpacity));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${safeOpacity})`;
        ctx.shadowBlur = isDark ? 6 : 3;
        ctx.shadowColor = isDark ? 'rgba(244, 222, 156, 0.4)' : 'rgba(201, 151, 29, 0.2)';
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000"
      style={{ opacity: 0.85 }}
    />
  );
};
