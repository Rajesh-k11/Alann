/**
 * ALANN AI Orb - Web Canvas 2D Renderer
 * High-performance, hardware-accelerated drawing routines.
 * Optimized for desktop, tablet, mobile web, and Retina/HiDPI displays.
 */

import type { OrbFrame, Dot, Line, CoreGlow, ScanRing } from '@alann/orb-core';
import { toRgbaString } from '@alann/orb-core';

/**
 * Paint a single OrbFrame to an HTML5 2D Canvas context.
 * Strictly uses 2D canvas drawing primitives without expensive CSS/SVG filter effects.
 */
export function paintOrbFrame(
  ctx: CanvasRenderingContext2D,
  frame: OrbFrame,
  width: number,
  height: number
): void {
  // Clear the drawing area
  ctx.clearRect(0, 0, width, height);

  // -------------------------------------------------------------------------
  // 1. CORE GLOW PASS (Rendered behind particles)
  // -------------------------------------------------------------------------
  if (frame.core && frame.core.intensity > 0.05) {
    paintCoreGlow(ctx, frame.core);
  }

  // -------------------------------------------------------------------------
  // 2. SCAN RING PASS
  // -------------------------------------------------------------------------
  if (frame.scanRing && frame.scanRing.alpha > 0.02) {
    paintScanRing(ctx, frame.scanRing);
  }

  // -------------------------------------------------------------------------
  // 3. INTERCONNECTION LINES PASS (Rendered before dots so dots sit on top)
  // -------------------------------------------------------------------------
  if (frame.lines.length > 0) {
    paintLines(ctx, frame.lines);
  }

  // -------------------------------------------------------------------------
  // 4. PARTICLES / DOTS PASS (Z-sorted far to near)
  // -------------------------------------------------------------------------
  paintDots(ctx, frame.dots);
}

function paintCoreGlow(ctx: CanvasRenderingContext2D, core: CoreGlow): void {
  const { cx, cy, radius, color, intensity } = core;
  const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);

  const innerAlpha = 0.28 * intensity;
  const midAlpha = 0.12 * intensity;

  gradient.addColorStop(0, toRgbaString(color, innerAlpha));
  gradient.addColorStop(0.55, toRgbaString(color, midAlpha));
  gradient.addColorStop(1, toRgbaString(color, 0));

  ctx.save();
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function paintScanRing(ctx: CanvasRenderingContext2D, ring: ScanRing): void {
  const { cx, cy, rx, ry, rotation, color, alpha, width } = ring;

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(rotation);
  ctx.beginPath();
  ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
  ctx.strokeStyle = toRgbaString(color, alpha);
  ctx.lineWidth = width;
  ctx.stroke();
  ctx.restore();
}

function paintLines(ctx: CanvasRenderingContext2D, lines: Line[]): void {
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    ctx.beginPath();
    ctx.moveTo(l.x1, l.y1);
    ctx.lineTo(l.x2, l.y2);
    ctx.strokeStyle = toRgbaString(l.color, l.alpha);
    ctx.lineWidth = l.width;
    ctx.stroke();
  }
}

function paintDots(ctx: CanvasRenderingContext2D, dots: Dot[]): void {
  for (let i = 0; i < dots.length; i++) {
    const d = dots[i];
    if (d.alpha < 0.02 || d.r < 0.2) continue;

    // Optional subtle aura for scan-activated detection particles
    if (d.glow && d.glow > 0.4) {
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r * 1.8, 0, Math.PI * 2);
      ctx.fillStyle = toRgbaString(d.color, d.alpha * 0.25 * d.glow);
      ctx.fill();
    }

    // Main particle
    ctx.beginPath();
    ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
    ctx.fillStyle = toRgbaString(d.color, d.alpha);
    ctx.fill();
  }
}

