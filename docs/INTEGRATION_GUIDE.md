# ALANN AI Orb Animation System — Production Integration Guide

A production-ready automotive AI Orb animation system engineered for **Next.js (Web)** and **React Native (Mobile)**, inspired by the mathematical and particle foundations of `Jakubantalik/thinking-orbs`.

Designed around the core principle:
> **One Design Language, Two Platform-Appropriate Rendering Implementations.**

---

## 1. Architecture Overview

```
alann-orb/
├── packages/
│   ├── alann-orb-core/          # Platform-independent mathematical & geometry engine
│   │   ├── colors.ts            # Official ALANN light/dark color tokens & RGB math
│   │   ├── types.ts             # Dot, Line, CoreGlow, ScanRing, OrbFrame interfaces
│   │   ├── states.ts            # Dynamic parameters for idle, searching, scanning, analyzing, complete
│   │   ├── variants.ts          # Algorithmic definitions of all 8 variations
│   │   ├── math.ts              # Fibonacci lattice, 3D Euler projection, value noise
│   │   └── engine.ts            # computeOrbFrame() pure evaluation function
│   │
│   ├── alann-orb-web/           # Web Canvas implementation for Next.js / React
│   │   ├── OrbCanvas.ts         # High-performance 2D Canvas painter
│   │   └── AlannThinkingOrb.tsx # HiDPI, IntersectionObserver, Page Visibility, a11y
│   │
│   └── alann-orb-mobile/        # Native mobile implementation for React Native
│       ├── OrbSkia.tsx          # @shopify/react-native-skia GPU-accelerated renderer
│       ├── OrbFallbackNative.tsx# Zero-dependency vector fallback for non-Skia setups
│       ├── hooks.ts             # AppState background pause & AccessibilityInfo hooks
│       └── AlannThinkingOrb.tsx # React Native universal component
│
└── web/                         # ALANN AI ORB LAB (Showcase, Playground & Testbench)
    └── app/                     # Next.js interactive lab with all 8 variants & use cases
```

---

## 2. Official ALANN Design Tokens

Only official ALANN brand tokens are used. No external or random brand colors are permitted.

### Light Theme
| Token | Hex | RGB | Usage |
|---|---|---|---|
| Primary | `#340549` | `rgb(52, 5, 73)` | Deep plum — primary particles, foreground depth |
| Secondary | `#720488` | `rgb(114, 4, 136)` | Vibrant royal purple — scan flare, active state boost |
| Accent | `#F3EBFA` | `rgb(243, 235, 250)` | Luminous pale lavender — core highlight & soft ambient |
| Background | `#FEFEFE` | `rgb(254, 254, 254)` | Canvas backdrop substrate |
| Surface / Cards | `#ECECF1` | `rgb(236, 236, 241)` | UI container & module borders |
| Primary Text | `#1C1528` | `rgb(28, 21, 40)` | High-contrast copy |
| Secondary Text | `#8A8A92` | `rgb(138, 138, 146)` | Subtitles & captions |

### Dark Theme
| Token | Hex | RGB | Usage |
|---|---|---|---|
| Primary | `#560267` | `rgb(86, 2, 103)` | Deep electric violet — core backdrop & atmospheric halo |
| Secondary | `#C084FC` | `rgb(192, 132, 252)` | Radiant lavender/violet — foreground particles & scan front |
| Accent | `#15101F` | `rgb(21, 16, 31)` | Obsidian purple-black — ambient shadow & depth absorption |
| Background | `#000000` | `rgb(0, 0, 0)` | Pure black OLED substrate |
| Surface / Cards | `#2A2138` | `rgb(42, 33, 56)` | Digital cockpit cards & HUD plates |
| Primary Text | `#F3EEFA` | `rgb(243, 238, 250)` | Luminous white-violet headers |
| Secondary Text | `#A193B8` | `rgb(161, 147, 184)` | Muted telemetry copy |

---

## 3. Web Integration (Next.js + React)

### Installation
```bash
npm install @alann/orb-web @alann/orb-core
```

### Usage
```tsx
'use client';

import React from 'react';
import { AlannThinkingOrb } from '@alann/orb-web';

export function VehicleScanner() {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-black">
      <AlannThinkingOrb
        theme="dark"
        variant="dark-04"
        state="scanning"
        size={160}
        speed={1.0}
      />
    </div>
  );
}
```

### Web Performance Features
- **Canvas 2D**: Pure 2D canvas drawing with zero DOM nodes per particle.
- **Hardware HiDPI**: Scales canvas by `window.devicePixelRatio` for razor-sharp rendering on Retina and high-DPI displays.
- **IntersectionObserver**: Automatically pauses drawing loop when the orb scrolls out of the viewport.
- **Page Visibility API**: Pauses computation when the user switches tabs, minimizing battery drain.
- **Zero React Re-renders**: Animation ticks run entirely inside `requestAnimationFrame` on canvas context; no React state triggers.
- **Reduced Motion**: Automatically honors `prefers-reduced-motion: reduce` by freezing on a calibrated static instant ($t = 1.42\text{s}$).

---

## 4. Mobile Integration (React Native)

### Installation
```bash
npm install @alann/orb-mobile @alann/orb-core
# For GPU-accelerated Skia rendering:
npm install @shopify/react-native-skia
```

### Usage
```tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AlannThinkingOrb } from '@alann/orb-mobile';

export function MobileVehicleScanner() {
  return (
    <View style={styles.container}>
      <AlannThinkingOrb
        theme="dark"
        variant="dark-02"
        state="analyzing"
        size={128}
        speed={1.0}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
  },
});
```

### Mobile Performance & Skia Architecture
- **Skia GPU Acceleration**: Uses `@shopify/react-native-skia` with `createPicture` and UI-thread rasterization.
- **Zero GC Allocation in Loop**: Reuses pre-allocated `Skia.Paint()` and static `Float32Array(4)` color buffers, preventing garbage collection stalls in Hermes.
- **Modular Fallback**: If `@shopify/react-native-skia` is not present, automatically switches to `OrbFallbackNative` (using `react-native-svg` or native primitives) with zero API differences.
- **AppState Background Pause**: Connects to `AppState.addEventListener` to stop all animation when the app is backgrounded.
- **Accessibility**: Sets native `accessibilityRole="image"` and dynamic `accessibilityLabel`.

---

## 5. The 8 Architectural Variations

| Variant ID | Name | Theme | Particle & Motion Behavior | Automotive Domain |
|---|---|---|---|---|
| `light-01` | **ALANN Intelligence** | Light | Clean spherical Fibonacci field, soft breathing, thin scanning meridian. Minimalist, premium. | Conversational AI copilot & app header status |
| `light-02` | **Luminous Core** | Light | Radial density bias toward center ($r \propto u^{0.68}$), gentle centripetal flow, soft `#F3EBFA` core highlight. | Computational processing & data synthesis |
| `light-03` | **Information Flow** | Light | Dual orbital streamline bands rotating at harmonic angles, particles drifting along streamlines. | Real-time vehicle telemetry & OBD-II streaming |
| `light-04` | **Precision Scan** | Light | Planar scanning meridian ring with sharp gaussian excitation, forward scanning echo wave. | VIN optical scan, barcode recognition |
| `dark-01` | **Deep Intelligence** | Dark | Deep atmospheric particle sphere on `#000000`, controlled `#560267` and `#C084FC` glow, calm rotation. | In-cabin digital cockpit & dark HUD |
| `dark-02` | **Energy Core** | Dark | Gravitational AI nucleus pulling particles inward. Analyzing state intensifies core brightness and orbital velocity. | EV battery degradation & powertrain diagnostics |
| `dark-03` | **Neural Intelligence** | Dark | Abstract intelligence field with delicate proximity connections between nearby particles. | Predictive residual valuation & AI insights |
| `dark-04` | **Deep Scan** | Dark | 3 depth shells (core, vehicle shell, sensor ring) with detection blips and energy pulse. | Full vehicle 360 LiDAR/Radar inspection |

---

## 6. Animation States

| State | Motion Dynamics | Meridian Scan | Core Brightness |
|---|---|---|---|
| `idle` | Calm, slow breathing ($T = 4.2\text{s}$), $0.55\times$ base speed | Gentle slow sweep ($0.5\times$) | $0.32$ dormant |
| `searching` | Agitated particles, orbital velocity $1.15\times$ | Scan accelerates to $1.3\times$ | $0.58$ active |
| `scanning` | High-speed sweep ($1.45\times$), particles caught in sweep flare | Meridian sweeps at $2.25\times$ with echo wave | $0.78$ luminous |
| `analyzing` | Centripetal flow: particles pulled toward center | Calm internal sweep ($1.1\times$) | $0.96$ intense pulse |
| `complete` | Radiant energy expansion bloom, gentle pulse decay | Calm return to idle | $0.82 \to 0.35$ decay |

---

## 7. Responsive Sizing & Adaptive Scaling

Standard sizes: `64px`, `96px`, `128px`, `160px`, `240px`, `320px`.

The engine automatically adapts particle counts using a sub-linear power law:
$$N_{\text{particles}} = \operatorname{clamp}\left(\left\lfloor N_{\text{base}} \times \left(\frac{\text{size}}{160}\right)^{0.65}\right\rfloor, 36, 540\right)$$

- **64px**: 36–50 particles, dot radius $\ge 1.15\text{px}$. Prevents visual crowding while remaining recognizable in mobile top bars and notification headers.
- **160px**: 180–220 particles. Standard cockpit and mobile hero size.
- **320px**: 450–540 particles. Rich atmospheric depth for desktop inspection stages and automotive showrooms.

---

## 8. TypeScript Component API Reference

```typescript
export interface AlannThinkingOrbProps {
  /** Color theme: 'light' | 'dark' (default: 'dark') */
  theme?: 'light' | 'dark';

  /**
   * Specific variation ID:
   * 'light-01' | 'light-02' | 'light-03' | 'light-04' |
   * 'dark-01'  | 'dark-02'  | 'dark-03'  | 'dark-04'
   */
  variant?: OrbVariant;

  /** Intelligence state: 'idle' | 'searching' | 'scanning' | 'analyzing' | 'complete' */
  state?: OrbState;

  /** Display size in pixels: 64 | 96 | 128 | 160 | 240 | 320 | number (default: 160) */
  size?: OrbSize;

  /** Animation speed multiplier (default: 1.0) */
  speed?: number;

  /** Force reduced motion mode (calibrated static instant) */
  reducedMotion?: boolean;

  /** Manually pause the animation loop (default: false) */
  paused?: boolean;

  /** Accessibility description for screen readers */
  accessibilityLabel?: string;

  /** Additional CSS class names (Web only) */
  className?: string;

  /** Inline styles (React.CSSProperties on Web, ViewStyle on Mobile) */
  style?: any;
}
```

---

## 9. Netlify Deployment

This repository is pre-configured for one-click deployment to [Netlify](https://www.netlify.com).

### Key Files
- [`netlify.toml`](file:///e:/Alann%20Animation/netlify.toml): Configures the build command (`npm run build`), publish directory (`web/out`), Node 20 runtime, security headers, and single-page application redirects.
- [`web/next.config.mjs`](file:///e:/Alann%20Animation/web/next.config.mjs): Configured with `output: 'export'` and `images: { unoptimized: true }` for pure static export.
- [`.gitignore`](file:///e:/Alann%20Animation/.gitignore): Explicitly excludes `web/.next/` and `web/out/` from version control.

### Deployment Options

#### Option A: Connect via Netlify Web UI (Recommended)
1. Push your repository to GitHub / GitLab / Bitbucket.
2. Log in to **Netlify** and click **Add new site** > **Import an existing project**.
3. Select your repository.
4. Netlify will automatically detect [`netlify.toml`](file:///e:/Alann%20Animation/netlify.toml):
   - **Base directory**: (leave blank or `.`)
   - **Build command**: `npm run build`
   - **Publish directory**: `web/out`
5. Click **Deploy site**.

#### Option B: Deploy via Netlify CLI
```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Log in
netlify login

# Deploy preview
netlify deploy

# Deploy to production
netlify deploy --prod
```

