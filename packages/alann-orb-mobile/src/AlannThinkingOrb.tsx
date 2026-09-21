/**
 * ALANN AI Thinking Orb - React Native Component
 * Production native implementation with Skia GPU acceleration,
 * modular fallback rendering, AppState detection, and accessibility.
 */

import React, { useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';
import type { AlannThinkingOrbProps, OrbVariant, OrbFrame } from '@alann/orb-core';
import { computeOrbFrame, VARIANT_DEFINITIONS } from '@alann/orb-core';
import { OrbSkia, isSkiaAvailable } from './OrbSkia';
import { OrbFallbackNative } from './OrbFallbackNative';
import { nowSeconds, useAppStateActive, useReducedMotionNative } from './hooks';

export const AlannThinkingOrb: React.FC<AlannThinkingOrbProps> = ({
  theme = 'dark',
  variant,
  state = 'idle',
  size = 160,
  speed = 1,
  reducedMotion: controlledReducedMotion,
  paused = false,
  accessibilityLabel,
  style,
}) => {
  const sizeNum = typeof size === 'number' ? size : 160;
  const isAppActive = useAppStateActive();
  const systemReducedMotion = useReducedMotionNative();

  const isReducedMotion =
    typeof controlledReducedMotion === 'boolean'
      ? controlledReducedMotion
      : systemReducedMotion;

  // Resolve variant
  const activeVariant: OrbVariant = useMemo(() => {
    if (variant) return variant;
    return theme === 'light' ? 'light-01' : 'dark-01';
  }, [variant, theme]);

  // Accessibility label
  const accessibleText = useMemo(() => {
    if (accessibilityLabel) return accessibilityLabel;
    const vDef = VARIANT_DEFINITIONS[activeVariant];
    return `ALANN AI Orb (${vDef?.name ?? activeVariant}) - State: ${state}`;
  }, [accessibilityLabel, activeVariant, state]);

  // Frame state
  const [frame, setFrame] = useState<OrbFrame>(() =>
    computeOrbFrame(activeVariant, state, sizeNum, 0, speed, isReducedMotion)
  );

  useEffect(() => {
    if (isReducedMotion || paused || !isAppActive) {
      setFrame(
        computeOrbFrame(activeVariant, state, sizeNum, 0, speed, isReducedMotion)
      );
      return;
    }

    let rafId = 0;
    let running = true;
    const startTime = nowSeconds();

    const loop = () => {
      if (!running) return;
      const elapsed = nowSeconds() - startTime;
      const nextFrame = computeOrbFrame(
        activeVariant,
        state,
        sizeNum,
        elapsed,
        speed,
        false
      );
      setFrame(nextFrame);
      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
    };
  }, [activeVariant, state, sizeNum, speed, isReducedMotion, paused, isAppActive]);

  const hasSkia = isSkiaAvailable();

  return (
    <View
      accessible
      accessibilityRole="image"
      accessibilityLabel={accessibleText}
      style={[
        styles.container,
        { width: sizeNum, height: sizeNum },
        style as ViewStyle,
      ]}
    >
      {hasSkia ? (
        <OrbSkia frame={frame} size={sizeNum} />
      ) : (
        <OrbFallbackNative frame={frame} size={sizeNum} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

