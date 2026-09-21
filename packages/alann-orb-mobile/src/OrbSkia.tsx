/**
 * ALANN AI Orb - React Native Skia Renderer
 * Uses @shopify/react-native-skia for native GPU-accelerated drawing.
 * Renders into an SkPicture on JS thread and rasterizes on UI thread.
 */

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import type { OrbFrame, Dot, Line } from '@alann/orb-core';

// We import Skia types conditionally so environments without Skia can still compile
export interface OrbSkiaProps {
  frame: OrbFrame;
  size: number;
}

let SkiaLib: any = null;
try {
  SkiaLib = require('@shopify/react-native-skia');
} catch {
  SkiaLib = null;
}

export const isSkiaAvailable = (): boolean => {
  return !!SkiaLib && !!SkiaLib.createPicture;
};

export const OrbSkia: React.FC<OrbSkiaProps> = ({ frame, size }) => {
  if (!isSkiaAvailable()) {
    return null;
  }

  const { Canvas, Picture, Skia, createPicture, PaintStyle } = SkiaLib;
  const [picture, setPicture] = useState<any>(null);

  // Pre-allocate paints and float buffer to prevent Hermes GC pressure
  const paints = useMemo(() => {
    const fill = Skia.Paint();
    fill.setAntiAlias(true);

    const stroke = Skia.Paint();
    stroke.setAntiAlias(true);
    stroke.setStyle(PaintStyle.Stroke);

    return { fill, stroke };
  }, [Skia, PaintStyle]);

  const rgbaBuffer = useRef(new Float32Array(4)).current;

  useEffect(() => {
    const { fill, stroke } = paints;

    const setColor = (paint: any, color: [number, number, number], alpha: number) => {
      rgbaBuffer[0] = color[0] / 255;
      rgbaBuffer[1] = color[1] / 255;
      rgbaBuffer[2] = color[2] / 255;
      rgbaBuffer[3] = Math.max(0, Math.min(1, alpha));
      paint.setColor(rgbaBuffer);
    };

    const pic = createPicture((canvas: any) => {
      // 1. Core Glow Pass
      if (frame.core && frame.core.intensity > 0.05) {
        setColor(fill, frame.core.color, 0.22 * frame.core.intensity);
        canvas.drawCircle(frame.core.cx, frame.core.cy, frame.core.radius, fill);
      }

      // 2. Scan Ring Pass
      if (frame.scanRing && frame.scanRing.alpha > 0.02) {
        setColor(stroke, frame.scanRing.color, frame.scanRing.alpha);
        stroke.setStrokeWidth(frame.scanRing.width);
        canvas.save();
        canvas.translate(frame.scanRing.cx, frame.scanRing.cy);
        canvas.rotate(frame.scanRing.rotation, 0, 0);
        const rect = Skia.XYWHRect(
          -frame.scanRing.rx,
          -frame.scanRing.ry,
          frame.scanRing.rx * 2,
          frame.scanRing.ry * 2
        );
        canvas.drawOval(rect, stroke);
        canvas.restore();
      }

      // 3. Interconnection Lines
      for (let i = 0; i < frame.lines.length; i++) {
        const l = frame.lines[i];
        setColor(stroke, l.color, l.alpha);
        stroke.setStrokeWidth(l.width);
        canvas.drawLine(l.x1, l.y1, l.x2, l.y2, stroke);
      }

      // 4. Particles (Dots)
      for (let i = 0; i < frame.dots.length; i++) {
        const d = frame.dots[i];
        if (d.alpha < 0.02 || d.r < 0.2) continue;

        setColor(fill, d.color, d.alpha);
        canvas.drawCircle(d.x, d.y, d.r, fill);
      }
    }, Skia.XYWHRect(0, 0, size, size));

    setPicture(pic);
  }, [frame, size, paints, rgbaBuffer, Skia, createPicture]);

  return (
    <View style={{ width: size, height: size }}>
      <Canvas style={{ width: size, height: size }}>
        {picture ? <Picture picture={picture} /> : null}
      </Canvas>
    </View>
  );
};

