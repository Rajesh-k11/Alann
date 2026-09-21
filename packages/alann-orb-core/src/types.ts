/**
 * ALANN AI Orb - Shared Types & Interfaces
 */

import type { RGB } from './colors';

export type OrbTheme = 'light' | 'dark';

export type LightVariant = 'light-01' | 'light-02' | 'light-03' | 'light-04';
export type DarkVariant = 'dark-01' | 'dark-02' | 'dark-03' | 'dark-04';
export type OrbVariant = LightVariant | DarkVariant;

export type OrbState = 'idle' | 'searching' | 'scanning' | 'analyzing' | 'complete';

export type OrbStandardSize = 64 | 96 | 128 | 160 | 240 | 320;
export type OrbSize = OrbStandardSize | number;

/**
 * Projected 2D/3D Particle
 */
export interface Dot {
  x: number;
  y: number;
  z: number; // Normalized depth: -1 (farthest) to 1 (closest)
  r: number; // Radius in pixels
  color: RGB;
  alpha: number; // 0 to 1
  glow?: number; // 0 to 1 (controlled luminance)
  layer?: number; // Layer grouping (0 = core, 1 = main sphere, 2 = detection/outer)
}

/**
 * Connection line between particles (e.g. for dark-03 Neural Intelligence)
 */
export interface Line {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: RGB;
  alpha: number;
  width: number;
}

/**
 * Soft atmospheric core / glow
 */
export interface CoreGlow {
  cx: number;
  cy: number;
  radius: number;
  color: RGB;
  intensity: number; // 0 to 1
}

/**
 * Scan meridian ring projection (for precision scan variations)
 */
export interface ScanRing {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  rotation: number;
  color: RGB;
  alpha: number;
  width: number;
}

/**
 * Complete rendered frame instruction set.
 * Platform agnostic: Web Canvas and React Native Skia consume this identical output.
 */
export interface OrbFrame {
  dots: Dot[];
  lines: Line[];
  core?: CoreGlow;
  scanRing?: ScanRing;
}

/**
 * State parameters influencing physics & appearance
 */
export interface StateDynamics {
  speedMultiplier: number;
  scanSpeedMultiplier: number;
  breathingIntensity: number;
  breathingPeriod: number;
  coreBrightness: number;
  particleAgitation: number;
  inwardPull: number; // For analyzing state centripetal flow
  expansionBloom: number; // For complete state pulse
}

/**
 * Universal component props exposed across Web and Mobile
 */
export interface AlannThinkingOrbProps {
  /**
   * Orb color theme
   * @default 'dark'
   */
  theme?: OrbTheme;

  /**
   * Visual variation (4 light, 4 dark)
   * @default theme === 'light' ? 'light-01' : 'dark-01'
   */
  variant?: OrbVariant;

  /**
   * Current intelligence state
   * @default 'idle'
   */
  state?: OrbState;

  /**
   * Render size in pixels (supports responsive sizes: 64, 96, 128, 160, 240, 320)
   * @default 160
   */
  size?: OrbSize;

  /**
   * Animation speed multiplier
   * @default 1
   */
  speed?: number;

  /**
   * Force reduced motion (renders calm, static calibrated frame)
   * If not provided, automatically respects system preference.
   */
  reducedMotion?: boolean;

  /**
   * Pause animation loop (e.g. when offscreen or hidden)
   * @default false
   */
  paused?: boolean;

  /**
   * Accessible text description for screen readers
   */
  accessibilityLabel?: string;

  /**
   * Optional custom CSS class name (Web)
   */
  className?: string;

  /**
   * Optional inline styles
   */
  style?: any;
}

