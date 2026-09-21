/**
 * ALANN AI Orb - Procedural Animation & Geometry Engine
 * Platform-independent: calculates exact dot positions, line connections,
 * core glows, and scan rings for every frame.
 */

import {
  ALANN_LIGHT_RGB,
  ALANN_DARK_RGB,
  lerpColor,
  type RGB,
} from './colors';
import {
  angleDelta,
  clamp,
  fibSpherePoint,
  getAdaptiveParticleCount,
  lerp,
  makeProjection,
  smoothstep,
  vnoise,
} from './math';
import { STATE_CONFIGS } from './states';
import type {
  CoreGlow,
  Dot,
  Line,
  OrbFrame,
  OrbSize,
  OrbState,
  OrbVariant,
  ScanRing,
} from './types';
import { VARIANT_DEFINITIONS } from './variants';

/** Fixed time evaluated when reduced motion is preferred or requested */
export const REDUCED_MOTION_TIME = 1.42;

/**
 * Compute a complete, self-contained OrbFrame for any variant, state, and timestamp.
 * Both Web Canvas and React Native Skia consume this identical output without modification.
 */
export function computeOrbFrame(
  variant: OrbVariant,
  state: OrbState = 'idle',
  size: OrbSize = 160,
  timeSeconds: number,
  customSpeed: number = 1,
  reducedMotion: boolean = false
): OrbFrame {
  const sizeNum = typeof size === 'number' ? size : 160;
  const vDef = VARIANT_DEFINITIONS[variant] || VARIANT_DEFINITIONS['dark-01'];
  const sDyn = STATE_CONFIGS[state] || STATE_CONFIGS.idle;
  const isDark = vDef.theme === 'dark';
  const palette = isDark ? ALANN_DARK_RGB : ALANN_LIGHT_RGB;

  const t = reducedMotion ? REDUCED_MOTION_TIME : timeSeconds;
  const effSpeed = vDef.spinRate * sDyn.speedMultiplier * customSpeed;

  const cx = sizeNum / 2;
  const cy = sizeNum / 2;

  // Breathing modulation: subtle organic expansion & contraction
  const breathCycle = (t * Math.PI * 2) / sDyn.breathingPeriod;
  const breath = 1 + sDyn.breathingIntensity * Math.sin(breathCycle);

  // State-based expansion / inward pull
  let radiusMultiplier = breath;
  if (state === 'analyzing') {
    radiusMultiplier -= sDyn.inwardPull * 0.35 * (0.8 + 0.2 * Math.sin(t * 8));
  } else if (state === 'complete') {
    radiusMultiplier += sDyn.expansionBloom * Math.exp(-((t * 2) % 3));
  }

  const baseRadius = (sizeNum / 2) * vDef.baseRadiusRatio * radiusMultiplier;

  // Sub-linear dot radius scaling: ensures small orbs (64px) stay crisp while large orbs don't become bloated
  const radScale = Math.pow(sizeNum / 160, 0.58);
  const minDotR = sizeNum <= 64 ? 1.15 : sizeNum <= 96 ? 1.0 : 0.85;

  // 3D Orientation angles
  const yaw = t * effSpeed;
  const pitch = vDef.tiltAngle + 0.07 * Math.sin(t * 0.38);
  const roll = 0.04 * Math.cos(t * 0.28);
  const project = makeProjection(yaw, pitch, roll, cx, cy, baseRadius);

  // Scan meridian tracking
  const scanSweep = t * vDef.scanSpeed * sDyn.scanSpeedMultiplier * customSpeed;

  // Particle count adapted dynamically to display size
  const particleCount = getAdaptiveParticleCount(sizeNum, vDef.baseParticleCount);

  const dots: Dot[] = [];
  const lines: Line[] = [];

  // -------------------------------------------------------------------------
  // CORE GLOW (if enabled for variant)
  // -------------------------------------------------------------------------
  let core: CoreGlow | undefined;
  if (vDef.hasCoreGlow || sDyn.coreBrightness > 0.4) {
    const coreRad = baseRadius * (variant.includes('02') ? 0.46 : 0.32);
    const coreIntensity = clamp(
      sDyn.coreBrightness * (0.75 + 0.25 * Math.sin(t * 3.5)),
      0.1,
      1.0
    );
    core = {
      cx,
      cy,
      radius: coreRad,
      color: isDark ? palette.secondary : palette.primary,
      intensity: coreIntensity,
    };
  }

  // -------------------------------------------------------------------------
  // SCAN RING (for precision scan variants like light-04 and dark-04)
  // -------------------------------------------------------------------------
  let scanRing: ScanRing | undefined;
  if (variant === 'light-04' || variant === 'dark-04' || state === 'scanning') {
    const scanAlpha =
      state === 'scanning' ? 0.45 : state === 'analyzing' ? 0.35 : 0.22;
    scanRing = {
      cx,
      cy,
      rx: baseRadius * 1.04,
      ry: baseRadius * 0.32,
      rotation: (scanSweep * 0.8) % (Math.PI * 2),
      color: palette.secondary,
      alpha: scanAlpha,
      width: sizeNum <= 96 ? 1 : 1.5,
    };
  }

  // -------------------------------------------------------------------------
  // GENERATE PARTICLES PER VARIANT
  // -------------------------------------------------------------------------
  for (let i = 0; i < particleCount; i++) {
    let [ux, uy, uz] = fibSpherePoint(i, particleCount);
    let layer = 1;

    // --- Variant-specific coordinate modulations ---
    if (variant === 'light-02') {
      // Luminous Core: radial density bias toward center + gentle inward spiral
      const bias = Math.pow(i / particleCount, 0.68);
      const inwardDrift = 0.22 * Math.sin(t * 1.2 + i * 0.1);
      const rMod = 0.65 + 0.35 * bias + inwardDrift * (state === 'analyzing' ? 0.3 : 0.1);
      ux *= rMod;
      uy *= rMod;
      uz *= rMod;
    } else if (variant === 'light-03') {
      // Information Flow: particles stream along dual inclination bands + spiral
      const band = i % 2 === 0 ? 1 : -1;
      const streamAngle = t * 1.4 * (0.8 + 0.4 * ((i * 17) % 7) / 7);
      const orbitLat = band * 0.45 + 0.15 * Math.sin(streamAngle * 0.5 + i);
      const orbitLon = (i / particleCount) * Math.PI * 2 + streamAngle;
      const cosLat = Math.cos(orbitLat);
      ux = cosLat * Math.cos(orbitLon);
      uy = Math.sin(orbitLat) + 0.08 * Math.sin(t * 2 + i);
      uz = cosLat * Math.sin(orbitLon);
    } else if (variant === 'dark-02') {
      // Energy Core: particles pulled toward center gravitationally
      const pull = sDyn.inwardPull * 0.4;
      const distFactor = 0.72 + 0.28 * Math.sin(i * 3.7 + t * 1.8);
      const radMod = 1 - pull * (1 - distFactor);
      ux *= radMod;
      uy *= radMod;
      uz *= radMod;
    } else if (variant === 'dark-04') {
      // Deep Scan: 3 Depth layers
      if (i % 5 === 0) {
        // Inner analytical layer
        layer = 0;
        const innerRad = 0.42 + 0.08 * Math.sin(t * 4 + i);
        ux *= innerRad;
        uy *= innerRad;
        uz *= innerRad;
      } else if (i % 7 === 0) {
        // Outer sensor detection blips
        layer = 2;
        const outerRad = 1.12 + 0.05 * Math.sin(t * 2.5 + i);
        ux *= outerRad;
        uy *= outerRad;
        uz *= outerRad;
      }
    }

    // Organic micro-agitation noise
    if (sDyn.particleAgitation > 0.05) {
      const agitationAmp = 0.045 * sDyn.particleAgitation;
      const n1 = vnoise(ux * 2 + t * 0.8, uy * 2) - 0.5;
      const n2 = vnoise(uy * 2, uz * 2 + t * 0.8) - 0.5;
      const n3 = vnoise(uz * 2 + t * 0.8, ux * 2) - 0.5;
      ux += n1 * agitationAmp;
      uy += n2 * agitationAmp;
      uz += n3 * agitationAmp;
    }

    // 3D Projection
    const [px, py, pz] = project(ux, uy, uz);
    const depth = (pz + 1) / 2; // 0 (far) to 1 (near)

    // Calculate angular delta to scanning meridian
    const particleLon = Math.atan2(uz, ux);
    const dScan = angleDelta(particleLon + yaw, scanSweep);

    // Scan excitation response (gaussian envelope)
    const scanWidth = variant === 'light-04' ? 0.16 : 0.26;
    const scanProximity = Math.exp(-(dScan * dScan) / (scanWidth * scanWidth));
    const isForeground = pz > -0.15;
    const scanBoost = isForeground ? scanProximity * Math.max(0, pz + 0.3) : 0;

    // Radius calculation with depth perspective
    let dotRadius = (0.75 + 1.65 * depth + 1.25 * scanBoost) * radScale;
    if (layer === 0) dotRadius *= 0.85;
    if (layer === 2) dotRadius *= 1.35;
    dotRadius = Math.max(minDotR, dotRadius);

    // Color & Alpha calculation
    let dotColor: RGB;
    let alpha: number;

    if (isDark) {
      // Dark Theme: Primary #560267, Secondary #C084FC, Accent #15101F
      const colorBlend = clamp(depth * 0.8 + scanBoost * 0.9, 0, 1);
      dotColor = lerpColor(palette.primary, palette.secondary, colorBlend);

      // Distant particles fade into background, scan-struck particles shine
      const baseAlpha = 0.22 + 0.65 * Math.pow(depth, 1.4);
      alpha = clamp(baseAlpha + scanBoost * 0.55, 0.15, 1.0);
    } else {
      // Light Theme: Primary #340549, Secondary #720488, Accent #F3EBFA
      // In light theme, foreground dots are crisp deep purple; scan flares vibrant purple
      const colorBlend = clamp(scanBoost * 1.2, 0, 1);
      dotColor = lerpColor(palette.primary, palette.secondary, colorBlend);

      // Light theme depth: far dots are lighter/softer, near dots are denser
      const baseAlpha = 0.18 + 0.76 * Math.pow(depth, 1.2);
      alpha = clamp(baseAlpha + scanBoost * 0.4, 0.15, 0.96);
    }

    // Analyzing state: pulse dot brightness
    if (state === 'analyzing') {
      alpha = clamp(alpha * (0.85 + 0.3 * Math.sin(t * 6 + i)), 0.2, 1.0);
    }

    dots.push({
      x: px,
      y: py,
      z: pz,
      r: dotRadius,
      color: dotColor,
      alpha,
      glow: scanBoost > 0.4 ? scanBoost : undefined,
      layer,
    });
  }

  // -------------------------------------------------------------------------
  // INTERCONNECTIONS (for dark-03 Neural Intelligence)
  // -------------------------------------------------------------------------
  if (vDef.hasInterconnections) {
    const connectionDist = sizeNum * (sizeNum <= 96 ? 0.22 : 0.17);
    const maxConnectionsPerNode = 2;
    const connectedCount = new Array(dots.length).fill(0);

    // Filter to foreground particles for clean performance & legibility
    for (let i = 0; i < dots.length; i++) {
      if (dots[i].z < 0.1) continue;
      if (connectedCount[i] >= maxConnectionsPerNode) continue;

      for (let j = i + 1; j < dots.length; j++) {
        if (dots[j].z < 0.1) continue;
        if (connectedCount[j] >= maxConnectionsPerNode) continue;

        const dx = dots[i].x - dots[j].x;
        const dy = dots[i].y - dots[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < connectionDist && dist > 8) {
          const proximity = 1 - dist / connectionDist;
          const lineAlpha = proximity * 0.32 * Math.min(dots[i].alpha, dots[j].alpha);
          if (lineAlpha > 0.04) {
            lines.push({
              x1: dots[i].x,
              y1: dots[i].y,
              x2: dots[j].x,
              y2: dots[j].y,
              color: palette.secondary,
              alpha: lineAlpha,
              width: sizeNum <= 96 ? 0.75 : 1.0,
            });
            connectedCount[i]++;
            connectedCount[j]++;
          }
        }
      }
    }
  }

  // -------------------------------------------------------------------------
  // FINAL Z-SORTING (Far to Near)
  // -------------------------------------------------------------------------
  dots.sort((a, b) => a.z - b.z);

  return {
    dots,
    lines,
    core,
    scanRing,
  };
}

