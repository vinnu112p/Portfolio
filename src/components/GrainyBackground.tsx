import React, { useEffect, useRef } from 'react';

export const GrainyBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    // Pre-generate 10 patterns to avoid runtime pixel calculation loops
    const pregeneratedPatterns: CanvasPattern[] = [];
    const NUM_PATTERNS = 10;
    const patternSize = 256;

    for (let p = 0; p < NUM_PATTERNS; p++) {
      const offscreen = document.createElement('canvas');
      offscreen.width = patternSize;
      offscreen.height = patternSize;
      const offscreenCtx = offscreen.getContext('2d');
      if (offscreenCtx) {
        const imageData = offscreenCtx.createImageData(patternSize, patternSize);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
          const v = 16 + Math.floor(Math.random() * 20);
          data[i] = v;
          data[i + 1] = v;
          data[i + 2] = v;
          data[i + 3] = 255;
        }
        offscreenCtx.putImageData(imageData, 0, 0);
        const pattern = ctx.createPattern(offscreen, 'repeat');
        if (pattern) {
          pregeneratedPatterns.push(pattern);
        }
      }
    }

    let animationFrameId: number;
    let last = 0;
    const INTERVAL = 1000 / 24; // 24fps
    let patternIndex = 0;

    const drawNoise = (ts: number) => {
      animationFrameId = requestAnimationFrame(drawNoise);
      if (ts - last < INTERVAL) return;
      last = ts;

      if (pregeneratedPatterns.length > 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = pregeneratedPatterns[patternIndex];
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        patternIndex = (patternIndex + 1) % pregeneratedPatterns.length;
      }
    };

    animationFrameId = requestAnimationFrame(drawNoise);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      className="grainy-bg"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none',
      }}
    >
      <canvas
        ref={canvasRef}
        id="noiseCanvas"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          imageRendering: 'pixelated',
        }}
      />
    </div>
  );
};
