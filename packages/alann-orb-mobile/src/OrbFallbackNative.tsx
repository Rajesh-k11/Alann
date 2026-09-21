/**
 * ALANN AI Orb - React Native Modular Fallback Renderer
 * Used when @shopify/react-native-skia is not installed or available.
 * Employs native vector drawing (react-native-svg) with 100% public component API parity.
 * Never uses WebViews or HTML Canvas APIs.
 */

import React from 'react';
import { View } from 'react-native';
import type { OrbFrame } from '@alann/orb-core';
import { toRgbaString } from '@alann/orb-core';

export interface OrbFallbackNativeProps {
  frame: OrbFrame;
  size: number;
}

let SvgLib: any = null;
try {
  SvgLib = require('react-native-svg');
} catch {
  SvgLib = null;
}

export const OrbFallbackNative: React.FC<OrbFallbackNativeProps> = ({ frame, size }) => {
  if (SvgLib) {
    const { Svg, Circle, Line, Ellipse, G, Defs, RadialGradient, Stop } = SvgLib;

    return (
      <View style={{ width: size, height: size }}>
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <Defs>
            {frame.core && (
              <RadialGradient id="alannCoreGrad" cx="50%" cy="50%" rx="50%" ry="50%">
                <Stop
                  offset="0%"
                  stopColor={toRgbaString(frame.core.color, 0.25 * frame.core.intensity)}
                />
                <Stop offset="100%" stopColor={toRgbaString(frame.core.color, 0)} />
              </RadialGradient>
            )}
          </Defs>

          {/* Core Glow */}
          {frame.core && (
            <Circle
              cx={frame.core.cx}
              cy={frame.core.cy}
              r={frame.core.radius}
              fill="url(#alannCoreGrad)"
            />
          )}

          {/* Scan Ring */}
          {frame.scanRing && (
            <G
              transform={`rotate(${(frame.scanRing.rotation * 180) / Math.PI} ${frame.scanRing.cx} ${frame.scanRing.cy})`}
            >
              <Ellipse
                cx={frame.scanRing.cx}
                cy={frame.scanRing.cy}
                rx={frame.scanRing.rx}
                ry={frame.scanRing.ry}
                fill="none"
                stroke={toRgbaString(frame.scanRing.color, frame.scanRing.alpha)}
                strokeWidth={frame.scanRing.width}
              />
            </G>
          )}

          {/* Connecting Lines */}
          {frame.lines.map((l, i) => (
            <Line
              key={`l-${i}`}
              x1={l.x1}
              y1={l.y1}
              x2={l.x2}
              y2={l.y2}
              stroke={toRgbaString(l.color, l.alpha)}
              strokeWidth={l.width}
            />
          ))}

          {/* Particles */}
          {frame.dots.map((d, i) => {
            if (d.alpha < 0.02 || d.r < 0.2) return null;
            return (
              <Circle
                key={`d-${i}`}
                cx={d.x}
                cy={d.y}
                r={d.r}
                fill={toRgbaString(d.color, d.alpha)}
              />
            );
          })}
        </Svg>
      </View>
    );
  }

  // Fallback if neither Skia nor Svg is available: optimized native View particles
  return (
    <View style={{ width: size, height: size, position: 'relative' }}>
      {frame.dots.map((d, i) => {
        if (d.alpha < 0.04 || d.r < 0.3) return null;
        const diam = d.r * 2;
        return (
          <View
            key={`nv-${i}`}
            style={{
              position: 'absolute',
              left: d.x - d.r,
              top: d.y - d.r,
              width: diam,
              height: diam,
              borderRadius: d.r,
              backgroundColor: toRgbaString(d.color, d.alpha),
            }}
          />
        );
      })}
    </View>
  );
};

