import React, { useEffect, useRef } from 'react';

export const LiquidOverlay: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Subtle fluid wave parameters
    const render = () => {
      time += 0.0035; // Slow, organic, continuous fluid motion

      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // Layer 1: Dark smoked-glass base tint (pure solid black tint)
      ctx.fillStyle = 'rgba(0, 0, 0, 0.12)';
      ctx.fillRect(0, 0, width, height);

      // Layer 2: Organic liquid wave caustics & soft refractions
      // Wave 1: Gentle diagonal rolling fluid wave
      const grad1 = ctx.createRadialGradient(
        width * (0.35 + Math.sin(time * 0.8) * 0.15),
        height * (0.4 + Math.cos(time * 0.6) * 0.15),
        width * 0.1,
        width * (0.4 + Math.sin(time * 0.8) * 0.15),
        height * (0.4 + Math.cos(time * 0.6) * 0.15),
        width * 0.75
      );
      grad1.addColorStop(0, 'rgba(255, 255, 255, 0.035)'); // Very subtle specular highlight
      grad1.addColorStop(0.35, 'rgba(20, 20, 24, 0.04)');
      grad1.addColorStop(0.7, 'rgba(5, 5, 7, 0.08)');
      grad1.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      // Wave 2: Counter fluid drift across bottom-right
      const grad2 = ctx.createRadialGradient(
        width * (0.7 + Math.cos(time * 0.7) * 0.18),
        height * (0.65 + Math.sin(time * 0.9) * 0.14),
        width * 0.08,
        width * (0.7 + Math.cos(time * 0.7) * 0.18),
        height * (0.65 + Math.sin(time * 0.9) * 0.14),
        width * 0.65
      );
      grad2.addColorStop(0, 'rgba(230, 18, 29, 0.025)'); // Whisper of crimson refraction
      grad2.addColorStop(0.4, 'rgba(255, 255, 255, 0.02)');
      grad2.addColorStop(0.8, 'rgba(5, 5, 5, 0.06)');
      grad2.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // Wave 3: Fine liquid membrane ripple line
      ctx.beginPath();
      const waveY1 = height * 0.3 + Math.sin(time * 1.2) * 45;
      const waveY2 = height * 0.7 + Math.cos(time * 1.1) * 40;

      const lineGrad = ctx.createLinearGradient(0, waveY1, width, waveY2);
      lineGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
      lineGrad.addColorStop(0.4, 'rgba(255, 255, 255, 0.025)');
      lineGrad.addColorStop(0.6, 'rgba(255, 255, 255, 0.035)');
      lineGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.strokeStyle = lineGrad;
      ctx.lineWidth = 140;
      ctx.filter = 'blur(60px)';
      ctx.moveTo(-50, waveY1);
      ctx.bezierCurveTo(
        width * 0.35, waveY1 + Math.sin(time * 1.5) * 60,
        width * 0.65, waveY2 - Math.cos(time * 1.3) * 60,
        width + 50, waveY2
      );
      ctx.stroke();
      ctx.filter = 'none';

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-30 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Smoked glass membrane container with soft subtle blur and pure black tint */}
      <div className="absolute inset-0 bg-black/14 backdrop-blur-[1.5px]" />
      
      {/* Animated fluid canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-90 mix-blend-screen pointer-events-none"
      />

      {/* Subtle organic refractive glass edge vignettes */}
      <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(5,5,5,0.4)] pointer-events-none" />
    </div>
  );
};
