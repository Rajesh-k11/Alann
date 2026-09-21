'use client';

import React, { useState } from 'react';
import { X, Check, Copy, Terminal, Smartphone, Monitor, Cpu } from '@/components/ui/icons';
import type { OrbTheme, OrbState, OrbStandardSize, OrbVariant } from '@alann/orb-core';

interface CodeExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: OrbTheme;
  variant: OrbVariant;
  state: OrbState;
  size: OrbStandardSize;
  speed: number;
}

export const CodeExportModal: React.FC<CodeExportModalProps> = ({
  isOpen,
  onClose,
  theme,
  variant,
  state,
  size,
  speed,
}) => {
  if (!isOpen) return null;

  const isDark = theme === 'dark';
  const [activeTab, setActiveTab] = useState<'web' | 'mobile' | 'core'>('web');
  const [copied, setCopied] = useState(false);

  const webSnippet = `// 1. Install package in your Next.js application:
// npm install @alann/orb-web @alann/orb-core

'use client';

import React from 'react';
import { AlannThinkingOrb } from '@alann/orb-web';

export default function VehicleInspectPage() {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-[#000000]">
      <AlannThinkingOrb
        theme="${theme}"
        variant="${variant}"
        state="${state}"
        size={${size}}
        speed={${speed}}
      />
    </div>
  );
}`;

  const mobileSnippet = `// 1. Install in your React Native project:
// npm install @alann/orb-mobile @alann/orb-core @shopify/react-native-skia

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AlannThinkingOrb } from '@alann/orb-mobile';

export function MobileVehicleScanner() {
  return (
    <View style={styles.container}>
      <AlannThinkingOrb
        theme="${theme}"
        variant="${variant}"
        state="${state}"
        size={${size}}
        speed={${speed}}
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
});`;

  const coreSnippet = `// Direct mathematical engine usage (Custom renderer, WebGL, or CanvasKit)
import { computeOrbFrame, VARIANT_DEFINITIONS, STATE_CONFIGS } from '@alann/orb-core';

// Evaluate frame at timestamp t (seconds)
const timeSeconds = performance.now() / 1000;
const frame = computeOrbFrame(
  '${variant}',   // Variant key
  '${state}',     // State ('idle' | 'searching' | 'scanning' | 'analyzing' | 'complete')
  ${size},          // Display size in pixels
  timeSeconds,    // Continuous animation clock
  ${speed},            // Speed multiplier
  false           // Reduced motion flag
);

// frame contains:
// - frame.dots: Z-sorted particles { x, y, z, r, color: [r,g,b], alpha, glow }
// - frame.lines: Interconnecting edges { x1, y1, x2, y2, color, alpha, width }
// - frame.core: Core glow { cx, cy, radius, color, intensity }
// - frame.scanRing: Projected meridian scan ring { cx, cy, rx, ry, rotation, color, alpha }`;

  const currentSnippet =
    activeTab === 'web'
      ? webSnippet
      : activeTab === 'mobile'
      ? mobileSnippet
      : coreSnippet;

  const copyCode = () => {
    navigator.clipboard.writeText(currentSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-3xl rounded-3xl border shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        style={{
          backgroundColor: isDark ? '#15101F' : '#FEFEFE',
          borderColor: isDark ? 'rgba(192, 132, 252, 0.25)' : 'rgba(52, 5, 73, 0.2)',
        }}
      >
        {/* Modal Header */}
        <div
          className="p-6 pb-4 border-b flex items-center justify-between"
          style={{
            borderColor: isDark ? 'rgba(192, 132, 252, 0.1)' : 'rgba(52, 5, 73, 0.08)',
          }}
        >
          <div>
            <h3
              className="text-lg font-bold tracking-tight"
              style={{ color: isDark ? '#F3EEFA' : '#1C1528' }}
            >
              ALANN Production Integration Snippet
            </h3>
            <p
              className="text-xs font-mono mt-0.5"
              style={{ color: isDark ? '#C084FC' : '#720488' }}
            >
              Active Preset: {variant} • {state.toUpperCase()} • {size}px • {theme.toUpperCase()}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl opacity-70 hover:opacity-100 transition-all"
            style={{
              backgroundColor: isDark ? '#2A2138' : '#ECECF1',
              color: isDark ? '#F3EEFA' : '#1C1528',
            }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Platform Selection Tabs */}
        <div
          className="px-6 pt-4 flex items-center gap-2 border-b"
          style={{
            borderColor: isDark ? 'rgba(192, 132, 252, 0.1)' : 'rgba(52, 5, 73, 0.08)',
          }}
        >
          <button
            onClick={() => setActiveTab('web')}
            className={`flex items-center gap-2 pb-3 px-2 text-xs font-semibold border-b-2 transition-all ${
              activeTab === 'web' ? 'border-purple-500' : 'border-transparent opacity-60 hover:opacity-100'
            }`}
            style={{ color: isDark ? '#F3EEFA' : '#1C1528' }}
          >
            <Monitor className="w-4 h-4" />
            <span>Next.js (Web Canvas)</span>
          </button>

          <button
            onClick={() => setActiveTab('mobile')}
            className={`flex items-center gap-2 pb-3 px-2 text-xs font-semibold border-b-2 transition-all ${
              activeTab === 'mobile' ? 'border-purple-500' : 'border-transparent opacity-60 hover:opacity-100'
            }`}
            style={{ color: isDark ? '#F3EEFA' : '#1C1528' }}
          >
            <Smartphone className="w-4 h-4" />
            <span>React Native (Skia / Native)</span>
          </button>

          <button
            onClick={() => setActiveTab('core')}
            className={`flex items-center gap-2 pb-3 px-2 text-xs font-semibold border-b-2 transition-all ${
              activeTab === 'core' ? 'border-purple-500' : 'border-transparent opacity-60 hover:opacity-100'
            }`}
            style={{ color: isDark ? '#F3EEFA' : '#1C1528' }}
          >
            <Cpu className="w-4 h-4" />
            <span>Core Mathematical Engine</span>
          </button>
        </div>

        {/* Code Block Container */}
        <div className="p-6 overflow-y-auto flex-1 font-mono text-xs relative">
          <div className="absolute top-8 right-8 z-10">
            <button
              onClick={copyCode}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white shadow-md active:scale-95 transition-all"
              style={{
                backgroundColor: isDark ? '#560267' : '#340549',
                border: isDark ? '1px solid #C084FC' : '1px solid #720488',
              }}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>

          <pre
            className="p-4 rounded-2xl overflow-x-auto leading-relaxed border"
            style={{
              backgroundColor: isDark ? '#000000' : '#ECECF1',
              borderColor: isDark ? 'rgba(192, 132, 252, 0.15)' : 'rgba(52, 5, 73, 0.1)',
              color: isDark ? '#F3EEFA' : '#1C1528',
            }}
          >
            <code>{currentSnippet}</code>
          </pre>
        </div>

        {/* Modal Footer */}
        <div
          className="p-4 px-6 border-t flex items-center justify-between text-xs font-mono opacity-75"
          style={{
            borderColor: isDark ? 'rgba(192, 132, 252, 0.1)' : 'rgba(52, 5, 73, 0.08)',
            backgroundColor: isDark ? '#2A2138' : '#ECECF1',
            color: isDark ? '#A193B8' : '#8A8A92',
          }}
        >
          <span>One Design Language • Two Rendering Implementations</span>
          <span>Zero External Colors</span>
        </div>
      </div>
    </div>
  );
};

