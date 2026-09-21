'use client';

import React, { useState } from 'react';
import { Sun, Moon, Layers, Sparkles } from '@/components/ui/icons';
import type { OrbTheme, OrbState, OrbStandardSize, OrbVariant } from '@alann/orb-core';
import { LIGHT_VARIANTS, DARK_VARIANTS } from '@alann/orb-core';
import { VariantCard } from './VariantCard';

interface VariantGridProps {
  theme: OrbTheme;
  activeState: OrbState;
  activeSize: OrbStandardSize;
  speed: number;
  reducedMotion: boolean;
  onSelectForComparison?: (v: OrbVariant) => void;
}

export const VariantGrid: React.FC<VariantGridProps> = ({
  theme,
  activeState,
  activeSize,
  speed,
  reducedMotion,
  onSelectForComparison,
}) => {
  const isDark = theme === 'dark';
  const [filter, setFilter] = useState<'all' | 'light' | 'dark'>('all');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Category Filter Pills */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h2
            className="text-2xl font-bold tracking-tight"
            style={{ color: isDark ? '#F3EEFA' : '#1C1528' }}
          >
            All 8 Architectural Variations
          </h2>
          <p
            className="text-xs font-medium tracking-wide mt-1"
            style={{ color: isDark ? '#A193B8' : '#8A8A92' }}
          >
            Procedural particle fields engineered for automotive AI intelligence across Light and Dark substrate themes.
          </p>
        </div>

        <div
          className="inline-flex p-1 rounded-xl gap-1 text-xs font-semibold self-start sm:self-auto"
          style={{ backgroundColor: isDark ? '#2A2138' : '#ECECF1' }}
        >
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-lg transition-all ${
              filter === 'all' ? 'shadow-sm font-bold' : 'opacity-70 hover:opacity-100'
            }`}
            style={{
              backgroundColor:
                filter === 'all'
                  ? isDark
                    ? '#560267'
                    : '#340549'
                  : 'transparent',
              color:
                filter === 'all'
                  ? isDark
                    ? '#F3EEFA'
                    : '#FEFEFE'
                  : isDark
                  ? '#A193B8'
                  : '#1C1528',
            }}
          >
            All 8 Variations
          </button>

          <button
            onClick={() => setFilter('light')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${
              filter === 'light' ? 'shadow-sm font-bold' : 'opacity-70 hover:opacity-100'
            }`}
            style={{
              backgroundColor:
                filter === 'light'
                  ? isDark
                    ? '#560267'
                    : '#340549'
                  : 'transparent',
              color:
                filter === 'light'
                  ? isDark
                    ? '#F3EEFA'
                    : '#FEFEFE'
                  : isDark
                  ? '#A193B8'
                  : '#1C1528',
            }}
          >
            <Sun className="w-3 h-3 text-amber-400" />
            <span>Light Theme (4)</span>
          </button>

          <button
            onClick={() => setFilter('dark')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${
              filter === 'dark' ? 'shadow-sm font-bold' : 'opacity-70 hover:opacity-100'
            }`}
            style={{
              backgroundColor:
                filter === 'dark'
                  ? isDark
                    ? '#560267'
                    : '#340549'
                  : 'transparent',
              color:
                filter === 'dark'
                  ? isDark
                    ? '#F3EEFA'
                    : '#FEFEFE'
                  : isDark
                  ? '#A193B8'
                  : '#1C1528',
            }}
          >
            <Moon className="w-3 h-3 text-purple-400" />
            <span>Dark Theme (4)</span>
          </button>
        </div>
      </div>

      {/* LIGHT THEME SECTION */}
      {(filter === 'all' || filter === 'light') && (
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Sun className="w-4 h-4 text-amber-500" />
            <h3
              className="text-lg font-bold tracking-tight uppercase text-xs font-mono"
              style={{ color: isDark ? '#F3EEFA' : '#340549' }}
            >
              Light Theme Variations — Minimal, Pure, Contrast Controlled
            </h3>
            <span
              className="text-xs px-2 py-0.5 rounded-full font-mono font-medium"
              style={{
                backgroundColor: isDark ? '#2A2138' : '#ECECF1',
                color: isDark ? '#C084FC' : '#720488',
              }}
            >
              #340549 • #720488 • #F3EBFA
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {LIGHT_VARIANTS.map((vId) => (
              <VariantCard
                key={vId}
                variantId={vId}
                globalState={activeState}
                globalSize={activeSize}
                globalSpeed={speed}
                globalReducedMotion={reducedMotion}
                onSelectForComparison={onSelectForComparison}
              />
            ))}
          </div>
        </div>
      )}

      {/* DARK THEME SECTION */}
      {(filter === 'all' || filter === 'dark') && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Moon className="w-4 h-4 text-purple-400" />
            <h3
              className="text-lg font-bold tracking-tight uppercase text-xs font-mono"
              style={{ color: isDark ? '#F3EEFA' : '#560267' }}
            >
              Dark Theme Variations — Deep Atmospheric, Luminous, Sensor-Grade
            </h3>
            <span
              className="text-xs px-2 py-0.5 rounded-full font-mono font-medium"
              style={{
                backgroundColor: isDark ? '#2A2138' : '#ECECF1',
                color: isDark ? '#C084FC' : '#720488',
              }}
            >
              #560267 • #C084FC • #15101F
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {DARK_VARIANTS.map((vId) => (
              <VariantCard
                key={vId}
                variantId={vId}
                globalState={activeState}
                globalSize={activeSize}
                globalSpeed={speed}
                globalReducedMotion={reducedMotion}
                onSelectForComparison={onSelectForComparison}
              />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

