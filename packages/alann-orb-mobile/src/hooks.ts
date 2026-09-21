/**
 * React Native Hooks for ALANN AI Orb
 * Handles AppState background pausing and accessibility reduced motion.
 */

import { useState, useEffect } from 'react';
import { AppState, AccessibilityInfo, type AppStateStatus } from 'react-native';

export function nowSeconds(): number {
  return typeof performance !== 'undefined' && performance.now
    ? performance.now() / 1000
    : Date.now() / 1000;
}

export function useAppStateActive(): boolean {
  const [isActive, setIsActive] = useState<boolean>(() => AppState.currentState === 'active');

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextState: AppStateStatus) => {
      setIsActive(nextState === 'active');
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return isActive;
}

export function useReducedMotionNative(): boolean {
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setReducedMotion);

    const subscription = AccessibilityInfo.addEventListener(
      'reduceMotionChanged',
      (enabled: boolean) => {
        setReducedMotion(enabled);
      }
    );

    return () => {
      subscription.remove();
    };
  }, []);

  return reducedMotion;
}

