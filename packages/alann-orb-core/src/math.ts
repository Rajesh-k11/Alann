/**
 * ALANN AI Orb - Math & Geometry Utilities
 * High performance deterministic 3D spherical math and projection functions.
 */

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

/**
 * Shortest angular distance between two angles (in radians), signed.
 * Normalized to [-PI, PI].
 */
export function angleDelta(a: number, b: number): number {
  const d = (a - b) % (Math.PI * 2);
  return ((d + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
}

/**
 * Deterministic hash in [0, 1) based on integer or float coordinates.
 */
export function hashD(a: number, b: number): number {
  const h = Math.sin(a * 12.9898 + b * 78.233) * 43758.5453;
  return h - Math.floor(h);
}

/**
 * 2D Smooth Value Noise
 */
export function vnoise(x: number, y: number): number {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  let fx = x - xi;
  let fy = y - yi;
  fx = fx * fx * (3 - 2 * fx);
  fy = fy * fy * (3 - 2 * fy);
  const a = hashD(xi, yi);
  const b = hashD(xi + 1, yi);
  const c = hashD(xi, yi + 1);
  const d = hashD(xi + 1, yi + 1);
  return a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy;
}

/**
 * Generates uniform points on a unit sphere using the Fibonacci lattice.
 * Guarantees equal area distribution without clustering at poles.
 */
export function fibSpherePoint(i: number, n: number): [number, number, number] {
  const goldenRatio = (1 + Math.sqrt(5)) / 2;
  const goldenAngle = 2 * Math.PI * (1 - 1 / goldenRatio); // ~2.399963 rad
  const y = 1 - (2 * (i + 0.5)) / n; // -1 to 1
  const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
  const theta = goldenAngle * i;
  const x = Math.cos(theta) * radiusAtY;
  const z = Math.sin(theta) * radiusAtY;
  return [x, y, z];
}

export type Projector = (x: number, y: number, z: number) => [number, number, number];

/**
 * 3D Euler rotation and center projection.
 * Returns [screenX, screenY, depthZ] where depthZ is in [-1, 1].
 */
export function makeProjection(
  yaw: number,
  pitch: number,
  roll: number,
  cx: number,
  cy: number,
  scale: number
): Projector {
  const cyaw = Math.cos(yaw);
  const syaw = Math.sin(yaw);
  const cpitch = Math.cos(pitch);
  const spitch = Math.sin(pitch);
  const croll = Math.cos(roll);
  const sroll = Math.sin(roll);

  return (x: number, y: number, z: number): [number, number, number] => {
    // 1. Yaw (around Y axis)
    const x1 = x * cyaw + z * syaw;
    const z1 = -x * syaw + z * cyaw;
    const y1 = y;

    // 2. Pitch (around X axis)
    const y2 = y1 * cpitch - z1 * spitch;
    const z2 = y1 * spitch + z1 * cpitch;
    const x2 = x1;

    // 3. Roll (around Z axis)
    const x3 = x2 * croll - y2 * sroll;
    const y3 = x2 * sroll + y2 * croll;
    const z3 = z2;

    // Projected to screen coordinates with slight perspective compression
    const perspective = 1 / (1 - z3 * 0.18);
    const px = cx + x3 * scale * perspective;
    const py = cy - y3 * scale * perspective;

    return [px, py, z3];
  };
}

/**
 * Adaptive particle count calculation based on render size.
 * Smaller orbs have fewer particles to avoid visual crowding;
 * larger orbs scale up gracefully for rich atmospheric depth.
 */
export function getAdaptiveParticleCount(size: number, baseCount: number): number {
  const scale = Math.pow(size / 160, 0.65);
  const count = Math.round(baseCount * scale);
  return Math.max(36, Math.min(540, count));
}

