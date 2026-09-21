/**
 * ALANN AI Design Tokens - Colors
 * Strict adherence to the official ALANN color palette.
 * No random brand colors are introduced.
 */

export interface AlannPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  primaryText: string;
  secondaryText: string;
}

export interface AlannRgbPalette {
  primary: [number, number, number];
  secondary: [number, number, number];
  accent: [number, number, number];
  background: [number, number, number];
  surface: [number, number, number];
  primaryText: [number, number, number];
  secondaryText: [number, number, number];
}

export const ALANN_LIGHT_COLORS: AlannPalette = {
  primary: '#340549',
  secondary: '#720488',
  accent: '#F3EBFA',
  background: '#FEFEFE',
  surface: '#ECECF1',
  primaryText: '#1C1528',
  secondaryText: '#8A8A92',
};

export const ALANN_DARK_COLORS: AlannPalette = {
  primary: '#560267',
  secondary: '#C084FC',
  accent: '#15101F',
  background: '#000000',
  surface: '#2A2138',
  primaryText: '#F3EEFA',
  secondaryText: '#A193B8',
};

/**
 * Pre-parsed RGB values for high-frequency frame calculation without string parsing overhead.
 */
export const ALANN_LIGHT_RGB: AlannRgbPalette = {
  primary: [52, 5, 73],       // #340549
  secondary: [114, 4, 136],   // #720488
  accent: [243, 235, 250],    // #F3EBFA
  background: [254, 254, 254],// #FEFEFE
  surface: [236, 236, 241],   // #ECECF1
  primaryText: [28, 21, 40],   // #1C1528
  secondaryText: [138, 138, 146], // #8A8A92
};

export const ALANN_DARK_RGB: AlannRgbPalette = {
  primary: [86, 2, 103],      // #560267
  secondary: [192, 132, 252], // #C084FC
  accent: [21, 16, 31],       // #15101F
  background: [0, 0, 0],      // #000000
  surface: [42, 33, 56],      // #2A2138
  primaryText: [243, 238, 250], // #F3EEFA
  secondaryText: [161, 147, 184], // #A193B8
};

export type RGB = [number, number, number];
export type RGBA = [number, number, number, number];

/**
 * Linearly interpolate between two RGB colors
 */
export function lerpColor(c1: RGB, c2: RGB, factor: number): RGB {
  const f = Math.max(0, Math.min(1, factor));
  return [
    Math.round(c1[0] + (c2[0] - c1[0]) * f),
    Math.round(c1[1] + (c2[1] - c1[1]) * f),
    Math.round(c1[2] + (c2[2] - c1[2]) * f),
  ];
}

/**
 * Format RGBA into CSS rgba string
 */
export function toRgbaString(rgb: RGB, alpha: number = 1): string {
  const a = Math.max(0, Math.min(1, alpha));
  return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${a.toFixed(3)})`;
}

/**
 * Format RGBA into normalized float array [0..1] for Skia / WebGL
 */
export function toNormalizedRgba(rgb: RGB, alpha: number = 1): RGBA {
  return [rgb[0] / 255, rgb[1] / 255, rgb[2] / 255, Math.max(0, Math.min(1, alpha))];
}

