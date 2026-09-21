/**
 * ALANN AI Orb - Variant Definitions & Metadata
 * 4 Light Theme variants + 4 Dark Theme variants with distinct particle behaviors.
 */

import type { LightVariant, DarkVariant, OrbVariant, OrbTheme } from './types';

export interface VariantDefinition {
  id: OrbVariant;
  name: string;
  theme: OrbTheme;
  tagline: string;
  description: string;
  baseParticleCount: number;
  baseRadiusRatio: number; // Fraction of (size / 2)
  spinRate: number; // Base radians per second
  tiltAngle: number; // Base tilt radians
  scanSpeed: number; // Scan sweep frequency
  hasCoreGlow: boolean;
  hasInterconnections: boolean;
  hasMultiLayers: boolean;
  idealUseCase: string;
}

export const VARIANT_DEFINITIONS: Record<OrbVariant, VariantDefinition> = {
  // LIGHT THEME
  'light-01': {
    id: 'light-01',
    name: 'ALANN Intelligence',
    theme: 'light',
    tagline: 'Default Light Orb — Pure, Authoritative, Minimal',
    description: 'Clean spherical particle field with soft breathing and thin scanning meridian. Subtle particle depth on off-white substrate.',
    baseParticleCount: 180,
    baseRadiusRatio: 0.82,
    spinRate: 0.45,
    tiltAngle: 0.38,
    scanSpeed: 0.95,
    hasCoreGlow: false,
    hasInterconnections: false,
    hasMultiLayers: false,
    idealUseCase: 'General conversational AI assistant & UI header status',
  },
  'light-02': {
    id: 'light-02',
    name: 'Luminous Core',
    theme: 'light',
    tagline: 'Concentrated AI Processing Core',
    description: 'Particles become denser toward the center with a soft pale accent highlight and gentle centripetal flow.',
    baseParticleCount: 210,
    baseRadiusRatio: 0.80,
    spinRate: 0.52,
    tiltAngle: 0.42,
    scanSpeed: 0.85,
    hasCoreGlow: true,
    hasInterconnections: false,
    hasMultiLayers: false,
    idealUseCase: 'Deep computational processing & multi-source data synthesis',
  },
  'light-03': {
    id: 'light-03',
    name: 'Information Flow',
    theme: 'light',
    tagline: 'Continuous Spherical Data Stream',
    description: 'Particles flow along dual orbital streamlines around the sphere, with inward drift communicating information throughput.',
    baseParticleCount: 220,
    baseRadiusRatio: 0.84,
    spinRate: 0.65,
    tiltAngle: 0.48,
    scanSpeed: 1.1,
    hasCoreGlow: true,
    hasInterconnections: false,
    hasMultiLayers: false,
    idealUseCase: 'Live vehicle telemetry streaming & OBD-II data ingestion',
  },
  'light-04': {
    id: 'light-04',
    name: 'Precision Scan',
    theme: 'light',
    tagline: 'High-Precision Vehicle & Sensor Sweep',
    description: 'Crisp planar scanning meridian with temporary particle brightening and forward scanning echo wave. Tuned for automotive precision.',
    baseParticleCount: 190,
    baseRadiusRatio: 0.82,
    spinRate: 0.50,
    tiltAngle: 0.35,
    scanSpeed: 1.45,
    hasCoreGlow: false,
    hasInterconnections: false,
    hasMultiLayers: false,
    idealUseCase: 'VIN optical scan, barcode recognition, and exterior inspection',
  },

  // DARK THEME
  'dark-01': {
    id: 'dark-01',
    name: 'Deep Intelligence',
    theme: 'dark',
    tagline: 'Default Dark Orb — Atmospheric & Controlled',
    description: 'Deep atmospheric particle sphere on pure black. Controlled violet glow with calm, meditative scanning movement.',
    baseParticleCount: 190,
    baseRadiusRatio: 0.82,
    spinRate: 0.42,
    tiltAngle: 0.36,
    scanSpeed: 0.90,
    hasCoreGlow: true,
    hasInterconnections: false,
    hasMultiLayers: false,
    idealUseCase: 'In-cabin automotive digital cockpit & dark-mode dashboard',
  },
  'dark-02': {
    id: 'dark-02',
    name: 'Energy Core',
    theme: 'dark',
    tagline: 'Gravitational AI Nucleus with Dynamic Accretion',
    description: 'Strong central AI nucleus pulling particles inward. During analysis, orbital movement and luminous core brightness accelerate.',
    baseParticleCount: 220,
    baseRadiusRatio: 0.80,
    spinRate: 0.60,
    tiltAngle: 0.45,
    scanSpeed: 1.0,
    hasCoreGlow: true,
    hasInterconnections: false,
    hasMultiLayers: false,
    idealUseCase: 'Powertrain diagnostics, EV battery degradation & health calculations',
  },
  'dark-03': {
    id: 'dark-03',
    name: 'Neural Intelligence',
    theme: 'dark',
    tagline: 'Abstract Synaptic Intelligence Field',
    description: 'Subtle temporary proximity connections between neighboring particles. Minimalist dynamic lines evoking high-level cognitive deduction.',
    baseParticleCount: 170,
    baseRadiusRatio: 0.82,
    spinRate: 0.48,
    tiltAngle: 0.40,
    scanSpeed: 0.95,
    hasCoreGlow: true,
    hasInterconnections: true,
    hasMultiLayers: false,
    idealUseCase: 'Predictive market pricing, valuation models, and AI reasoning',
  },
  'dark-04': {
    id: 'dark-04',
    name: 'Deep Scan',
    theme: 'dark',
    tagline: 'Multi-Layered Automotive Radar / LiDAR Scan',
    description: '3 depth layers (core, vehicle envelope, scanning ring) with detection blips, scanning wave ripple, and state choreography: SEARCH -> DETECT -> PROCESS -> COMPLETE.',
    baseParticleCount: 240,
    baseRadiusRatio: 0.84,
    spinRate: 0.55,
    tiltAngle: 0.32,
    scanSpeed: 1.6,
    hasCoreGlow: true,
    hasInterconnections: false,
    hasMultiLayers: true,
    idealUseCase: 'Full vehicle 360 inspection, ADAS sensor calibration, and damage detection',
  },
};

export const LIGHT_VARIANTS: LightVariant[] = ['light-01', 'light-02', 'light-03', 'light-04'];
export const DARK_VARIANTS: DarkVariant[] = ['dark-01', 'dark-02', 'dark-03', 'dark-04'];
export const ALL_VARIANTS: OrbVariant[] = [...LIGHT_VARIANTS, ...DARK_VARIANTS];

