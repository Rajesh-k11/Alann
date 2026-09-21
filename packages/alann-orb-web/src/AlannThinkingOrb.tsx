/**
 * ALANN AI Thinking Orb - Web / Next.js Component
 * High-performance 2D Canvas renderer with automatic DPI scaling,
 * viewport culling, visibility detection, and accessibility support.
 */

'use client';

import React, { useEffect, useRef, useMemo } from 'react';
import type { AlannThinkingOrbProps, OrbVariant } from '@alann/orb-core';
import { computeOrbFrame, VARIANT_DEFINITIONS } from '@alann/orb-core';
import { paintOrbFrame } from './OrbCanvas';

export const AlannThinkingOrb: React.FC<AlannThinkingOrbProps> = ({
  theme = 'dark',
  variant,
  state = 'idle',
  size = 160,
  speed = 1,
  reducedMotion: controlledReducedMotion,
  paused = false,
  accessibilityLabel,
  className = '',
  style = {},
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Derive active variant matching theme if not explicitly provided
  const activeVariant: OrbVariant = useMemo(() => {
    if (variant) return variant;
    return theme === 'light' ? 'light-01' : 'dark-01';
  }, [variant, theme]);

  // Accessibility label
  const accessibleText = useMemo(() => {
    if (accessibilityLabel) return accessibilityLabel;
    const vDef = VARIANT_DEFINITIONS[activeVariant];
    return `ALANN AI Orb (${vDef?.name ?? activeVariant}) - State: ${state}`;
  }, [accessibilityLabel, activeVariant, state]);

  // Numeric size
  const sizeNum = typeof size === 'number' ? size : 160;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Detect system reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let isReducedMotion =
      typeof controlledReducedMotion === 'boolean'
        ? controlledReducedMotion
        : mediaQuery.matches;

    const handleMotionChange = (e: MediaQueryListEvent) => {
      if (typeof controlledReducedMotion !== 'boolean') {
        isReducedMotion = e.matches;
        renderSingleFrame();
      }
    };
    mediaQuery.addEventListener('change', handleMotionChange);

    // Visibility & Viewport Tracking
    let isIntersecting = true;
    let isTabVisible = document.visibilityState === 'visible';

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          isIntersecting = entry.isIntersecting;
        }
      },
      { threshold: 0.05 }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const handleVisibilityChange = () => {
      isTabVisible = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Setup Canvas Resolution with DevicePixelRatio for Retina Crispness
    const updateCanvasDpi = () => {
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      canvas.width = Math.round(sizeNum * dpr);
      canvas.height = Math.round(sizeNum * dpr);
      canvas.style.width = `${sizeNum}px`;
      canvas.style.height = `${sizeNum}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    updateCanvasDpi();

    // Render a single static instant
    const renderSingleFrame = (t: number = 0) => {
      const frame = computeOrbFrame(
        activeVariant,
        state,
        sizeNum,
        t,
        speed,
        isReducedMotion
      );
      paintOrbFrame(ctx, frame, sizeNum, sizeNum);
    };

    // Initial render
    renderSingleFrame(0);

    if (isReducedMotion || paused) {
      return () => {
        mediaQuery.removeEventListener('change', handleMotionChange);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        observer.disconnect();
      };
    }

    // High-performance 60fps animation loop
    let animationFrameId = 0;
    let startTime = performance.now();
    let isRunning = true;

    const tick = (now: number) => {
      if (!isRunning) return;

      if (isIntersecting && isTabVisible && !paused) {
        const elapsedSeconds = (now - startTime) / 1000;
        renderSingleFrame(elapsedSeconds);
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      isRunning = false;
      cancelAnimationFrame(animationFrameId);
      mediaQuery.removeEventListener('change', handleMotionChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      observer.disconnect();
    };
  }, [activeVariant, state, sizeNum, speed, controlledReducedMotion, paused]);

  return (
    <div
      ref={containerRef}
      className={`inline-flex items-center justify-center relative select-none ${className}`}
      style={{
        width: sizeNum,
        height: sizeNum,
        ...style,
      }}
      role="img"
      aria-label={accessibleText}
    >
      <canvas
        ref={canvasRef}
        className="block pointer-events-none"
        style={{
          width: sizeNum,
          height: sizeNum,
        }}
      />
    </div>
  );
};

