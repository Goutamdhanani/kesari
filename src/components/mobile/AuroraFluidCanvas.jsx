import React, { useRef, useEffect } from 'react';

/**
 * AuroraFluidCanvas
 * Realistic Northern Lights (Aurora Borealis) fluid simulation.
 * Renders undulating organic curtain ribbons with vertical magnetic ray striations
 * using hardware-accelerated 2D Canvas and harmonic wave physics at 60fps.
 */
export default function AuroraFluidCanvas({ className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId;
    let width = 0;
    let height = 0;
    let time = 0;

    // Handle high-DPI retina displays
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(width * dpr, 100);
      canvas.height = Math.max(height * dpr, 100);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // 4 Distinct Northern Lights Fluid Ribbon Curtains
    const ribbons = [
      {
        // 1. Classic Emerald / Neon Mint Aurora Ribbon
        baseY: 0.32,
        amplitude: 32,
        speed: 0.0016,
        freq: 0.007,
        phase: 0,
        gradientStart: 'rgba(5, 255, 161, 0.75)',
        gradientMid: 'rgba(0, 242, 254, 0.45)',
        gradientTop: 'rgba(0, 242, 254, 0)',
        rayColor: 'rgba(5, 255, 175, 0.38)',
        curtainHeight: 140,
        rayCount: 42
      },
      {
        // 2. Polar Cyan & Electric Teal Flow
        baseY: 0.40,
        amplitude: 28,
        speed: 0.0012,
        freq: 0.009,
        phase: 2.1,
        gradientStart: 'rgba(0, 245, 255, 0.7)',
        gradientMid: 'rgba(0, 114, 255, 0.35)',
        gradientTop: 'rgba(0, 66, 217, 0)',
        rayColor: 'rgba(0, 245, 255, 0.32)',
        curtainHeight: 160,
        rayCount: 38
      },
      {
        // 3. Ethereal High-Atmosphere Violet / Purple Crest
        baseY: 0.22,
        amplitude: 38,
        speed: 0.0009,
        freq: 0.006,
        phase: 4.3,
        gradientStart: 'rgba(168, 85, 247, 0.65)',
        gradientMid: 'rgba(217, 70, 239, 0.3)',
        gradientTop: 'rgba(139, 92, 246, 0)',
        rayColor: 'rgba(192, 132, 252, 0.3)',
        curtainHeight: 180,
        rayCount: 35
      },
      {
        // 4. Warm Scarlet / Signature Netflix Red Crest Streak
        baseY: 0.48,
        amplitude: 24,
        speed: 0.002,
        freq: 0.011,
        phase: 1.2,
        gradientStart: 'rgba(229, 9, 20, 0.68)',
        gradientMid: 'rgba(255, 75, 43, 0.32)',
        gradientTop: 'rgba(245, 158, 11, 0)',
        rayColor: 'rgba(255, 80, 80, 0.35)',
        curtainHeight: 130,
        rayCount: 30
      }
    ];

    // Main 60fps render loop
    const render = () => {
      time += 16;
      ctx.clearRect(0, 0, width, height);

      // Additive screen blend mode makes overlapping aurora waves ignite with light
      ctx.globalCompositeOperation = 'screen';

      ribbons.forEach((ribbon) => {
        const baseY = height * ribbon.baseY;
        const waveStep = 6;
        const points = [];

        // Calculate smooth undulating ribbon baseline using superposition of waves
        for (let x = -20; x <= width + 20; x += waveStep) {
          const t = time * ribbon.speed;
          const y =
            baseY +
            Math.sin(x * ribbon.freq + t + ribbon.phase) * ribbon.amplitude +
            Math.cos(x * (ribbon.freq * 0.65) - t * 0.8) * (ribbon.amplitude * 0.55) +
            Math.sin(x * 0.02 + t * 1.5) * 6; // fine high-frequency flutter

          points.push({ x, y });
        }

        if (points.length < 2) return;

        // A) Draw Vertical Magnetic Auroral Rays (The iconic Northern Lights "curtain" look)
        const rayStep = width / ribbon.rayCount;
        for (let r = 0; r < ribbon.rayCount; r++) {
          const rayX = r * rayStep + Math.sin(time * 0.001 + r) * 6;
          const t = time * ribbon.speed;
          const rayBaseY =
            baseY +
            Math.sin(rayX * ribbon.freq + t + ribbon.phase) * ribbon.amplitude +
            Math.cos(rayX * (ribbon.freq * 0.65) - t * 0.8) * (ribbon.amplitude * 0.55);

          // Ray oscillates upward into the night sky
          const rayLength =
            ribbon.curtainHeight * (0.6 + 0.4 * Math.sin(r * 0.45 + time * 0.002));
          const rayAlpha =
            0.2 + 0.35 * Math.sin(r * 0.6 + time * 0.0025);

          if (rayAlpha > 0.05) {
            const rayGrad = ctx.createLinearGradient(rayX, rayBaseY, rayX, rayBaseY - rayLength);
            rayGrad.addColorStop(0, ribbon.rayColor.replace(/[\d\.]+\)$/, `${rayAlpha})`));
            rayGrad.addColorStop(0.5, ribbon.gradientMid.replace(/[\d\.]+\)$/, `${rayAlpha * 0.5})`));
            rayGrad.addColorStop(1, 'rgba(0,0,0,0)');

            ctx.fillStyle = rayGrad;
            ctx.fillRect(rayX - 1.5, rayBaseY - rayLength, 3, rayLength);
          }
        }

        // B) Draw the Continuous Fluid Ribbon Curtain
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);

        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }

        // Complete the filled polygon up to the curtain apex
        ctx.lineTo(width + 20, 0);
        ctx.lineTo(-20, 0);
        ctx.closePath();

        const curtainGrad = ctx.createLinearGradient(0, baseY + ribbon.amplitude, 0, baseY - ribbon.curtainHeight);
        curtainGrad.addColorStop(0, ribbon.gradientStart);
        curtainGrad.addColorStop(0.45, ribbon.gradientMid);
        curtainGrad.addColorStop(1, ribbon.gradientTop);

        ctx.fillStyle = curtainGrad;
        ctx.fill();

        // C) Draw luminous bottom edge filament line of the aurora ribbon
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.strokeStyle = ribbon.gradientStart;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      ro.disconnect();
    };
  }, []);

  return (
    <div className={`aurora-fluid-viewport ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} className="aurora-fluid-canvas" />
      <div className="aurora-fluid-vignette" />
      <div className="aurora-fluid-glass-gloss" />
    </div>
  );
}
