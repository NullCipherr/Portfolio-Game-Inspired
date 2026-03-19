import React, { useEffect, useRef } from 'react';

interface AnimatedBackgroundProps {
  enabled: boolean;
  primaryRgb: string;
  graphicsQuality: 'low' | 'medium' | 'high';
}

const DENSITY_MAP = {
  high: 6000,
  medium: 12000,
  low: 25000,
} as const;

const BASE_SIZE = 2;
const BASE_SPEED = 0.5;
const RESPAWN_OFFSET = 10;
const TWINKLE_AMPLITUDE = 0.1;
const DPR_CAP = 1.5;

// Stride per particle:
// 0=x, 1=y, 2=depth, 3=size, 4=speedY, 5=baseOpacity, 6=oscillationOffset
const STRIDE = 7;
const X = 0;
const Y = 1;
const DEPTH = 2;
const SIZE = 3;
const SPEED_Y = 4;
const BASE_OPACITY = 5;
const OSCILLATION_OFFSET = 6;

const clamp01 = (value: number) => {
  if (value < 0) return 0;
  if (value > 1) return 1;
  return value;
};

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  enabled,
  primaryRgb,
  graphicsQuality,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number>(0);
  const resizeFrameId = useRef<number>(0);
  const isVisibleRef = useRef(true);

  const particleDataRef = useRef<Float32Array>(new Float32Array(0));
  const particleCountRef = useRef(0);

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const colorString = `rgb(${primaryRgb})`;

    let logicalWidth = 0;
    let logicalHeight = 0;

    const resetParticle = (index: number, randomY = false) => {
      const data = particleDataRef.current;
      const i = index * STRIDE;

      data[i + X] = Math.random() * logicalWidth;
      data[i + Y] = randomY
        ? Math.random() * logicalHeight
        : logicalHeight + RESPAWN_OFFSET;

      const depth = Math.random();
      data[i + DEPTH] = depth;
      data[i + SIZE] = (Math.random() * BASE_SIZE + 0.5) * (depth * 1.5 + 0.5);
      data[i + SPEED_Y] = (Math.random() * BASE_SPEED + 0.1) * (depth + 0.2);
      data[i + BASE_OPACITY] = (Math.random() * 0.4 + 0.1) * (depth + 0.3);
      data[i + OSCILLATION_OFFSET] = Math.random() * Math.PI * 2;
    };

    const initParticles = () => {
      const density = DENSITY_MAP[graphicsQuality] ?? DENSITY_MAP.medium;
      const nextParticleCount = Math.max(
        1,
        Math.floor((logicalWidth * logicalHeight) / density)
      );

      const currentCount = particleCountRef.current;

      if (currentCount !== nextParticleCount) {
        const nextData = new Float32Array(nextParticleCount * STRIDE);
        const copyCount = Math.min(currentCount, nextParticleCount);

        if (copyCount > 0) {
          nextData.set(
            particleDataRef.current.subarray(0, copyCount * STRIDE),
            0
          );
        }

        particleDataRef.current = nextData;
        particleCountRef.current = nextParticleCount;

        for (let index = copyCount; index < nextParticleCount; index++) {
          resetParticle(index, true);
        }
      }

      const data = particleDataRef.current;
      const count = particleCountRef.current;

      for (let index = 0; index < count; index++) {
        const i = index * STRIDE;

        if (data[i + X] > logicalWidth) {
          data[i + X] = Math.random() * logicalWidth;
        }

        if (data[i + Y] > logicalHeight) {
          data[i + Y] = Math.random() * logicalHeight;
        }
      }
    };

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP);

      logicalWidth = rect.width;
      logicalHeight = rect.height;

      canvas.width = Math.round(logicalWidth * dpr);
      canvas.height = Math.round(logicalHeight * dpr);
      canvas.style.width = `${logicalWidth}px`;
      canvas.style.height = `${logicalHeight}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles();
    };

    const animate = () => {
      if (isVisibleRef.current) {
        ctx.clearRect(0, 0, logicalWidth, logicalHeight);
        ctx.fillStyle = colorString;

        const time = performance.now() * 0.001;
        const data = particleDataRef.current;
        const count = particleCountRef.current;

        for (let index = 0; index < count; index++) {
          const i = index * STRIDE;

          data[i + Y] -= data[i + SPEED_Y];

          if (data[i + Y] < -RESPAWN_OFFSET) {
            resetParticle(index, false);
          }

          const twinkle =
            Math.sin(time + data[i + OSCILLATION_OFFSET]) * TWINKLE_AMPLITUDE;
          ctx.globalAlpha = clamp01(data[i + BASE_OPACITY] + twinkle);

          ctx.beginPath();
          ctx.arc(data[i + X], data[i + Y], data[i + SIZE], 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.globalAlpha = 1;
      }

      animationFrameId.current = window.requestAnimationFrame(animate);
    };

    const handleVisibilityChange = () => {
      isVisibleRef.current = document.visibilityState === 'visible';
    };

    const handleResize = () => {
      window.cancelAnimationFrame(resizeFrameId.current);
      resizeFrameId.current = window.requestAnimationFrame(resizeCanvas);
    };

    resizeCanvas();
    animate();

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('resize', handleResize);

    return () => {
      window.cancelAnimationFrame(animationFrameId.current);
      window.cancelAnimationFrame(resizeFrameId.current);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', handleResize);
    };
  }, [enabled, primaryRgb, graphicsQuality]);

  return (
    <div className="fixed inset-0 w-full h-full -z-10 bg-background pointer-events-none">
      {enabled && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 block w-full h-full"
          aria-hidden="true"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-background/80" />
    </div>
  );
};

export default AnimatedBackground;