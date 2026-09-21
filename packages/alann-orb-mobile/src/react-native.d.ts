// Ambient definitions for react-native and @shopify/react-native-skia
// Allows @alann/orb-mobile to compile in monorepos without requiring react-native runtime dependencies.

declare module 'react-native' {
  export interface ViewStyle {
    [key: string]: any;
  }
  export const View: any;
  export const StyleSheet: {
    create: (styles: any) => any;
  };
  export const AppState: {
    currentState: string;
    addEventListener: (type: string, handler: (state: AppStateStatus) => void) => { remove: () => void };
  };
  export const AccessibilityInfo: {
    isReduceMotionEnabled: () => Promise<boolean>;
    addEventListener: (type: string, handler: (enabled: boolean) => void) => { remove: () => void };
  };
  export type AppStateStatus = 'active' | 'background' | 'inactive' | 'unknown' | 'extension';
}

declare module '@shopify/react-native-skia' {
  export const Canvas: any;
  export const Picture: any;
  export const Skia: any;
  export const createPicture: (callback: (canvas: any) => void, bounds?: any) => any;
  export const PaintStyle: {
    Fill: any;
    Stroke: any;
  };
  export type SkPicture = any;
}

declare module 'react-native-svg' {
  export const Svg: any;
  export const Circle: any;
  export const Line: any;
  export const Ellipse: any;
  export const G: any;
  export const Defs: any;
  export const RadialGradient: any;
  export const Stop: any;
}
