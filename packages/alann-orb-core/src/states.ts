/**
 * ALANN AI Orb - Animation States & Dynamic Behavior
 * Defines parameters and transitions for idle, searching, scanning, analyzing, complete.
 */

import type { OrbState, StateDynamics } from './types';
import { lerp } from './math';

export const STATE_CONFIGS: Record<OrbState, StateDynamics> = {
  idle: {
    speedMultiplier: 0.55,
    scanSpeedMultiplier: 0.5,
    breathingIntensity: 0.035,
    breathingPeriod: 4.2,
    coreBrightness: 0.32,
    particleAgitation: 0.04,
    inwardPull: 0.0,
    expansionBloom: 0.0,
  },
  searching: {
    speedMultiplier: 1.15,
    scanSpeedMultiplier: 1.3,
    breathingIntensity: 0.07,
    breathingPeriod: 3.0,
    coreBrightness: 0.58,
    particleAgitation: 0.32,
    inwardPull: 0.02,
    expansionBloom: 0.0,
  },
  scanning: {
    speedMultiplier: 1.45,
    scanSpeedMultiplier: 2.25,
    breathingIntensity: 0.09,
    breathingPeriod: 2.4,
    coreBrightness: 0.78,
    particleAgitation: 0.48,
    inwardPull: 0.05,
    expansionBloom: 0.0,
  },
  analyzing: {
    speedMultiplier: 1.75,
    scanSpeedMultiplier: 1.1,
    breathingIntensity: 0.13,
    breathingPeriod: 1.7,
    coreBrightness: 0.96,
    particleAgitation: 0.82,
    inwardPull: 0.26,
    expansionBloom: 0.0,
  },
  complete: {
    speedMultiplier: 0.75,
    scanSpeedMultiplier: 0.6,
    breathingIntensity: 0.05,
    breathingPeriod: 3.5,
    coreBrightness: 0.82,
    particleAgitation: 0.12,
    inwardPull: -0.08, // Subtle expansion recoil
    expansionBloom: 0.18,
  },
};

/**
 * Smoothly blend two state dynamics (for uninterrupted state switching)
 */
export function blendStateDynamics(
  from: StateDynamics,
  to: StateDynamics,
  factor: number
): StateDynamics {
  const f = Math.max(0, Math.min(1, factor));
  return {
    speedMultiplier: lerp(from.speedMultiplier, to.speedMultiplier, f),
    scanSpeedMultiplier: lerp(from.scanSpeedMultiplier, to.scanSpeedMultiplier, f),
    breathingIntensity: lerp(from.breathingIntensity, to.breathingIntensity, f),
    breathingPeriod: lerp(from.breathingPeriod, to.breathingPeriod, f),
    coreBrightness: lerp(from.coreBrightness, to.coreBrightness, f),
    particleAgitation: lerp(from.particleAgitation, to.particleAgitation, f),
    inwardPull: lerp(from.inwardPull, to.inwardPull, f),
    expansionBloom: lerp(from.expansionBloom, to.expansionBloom, f),
  };
}

