'use client';

import React from 'react';
import {
  Play,
  RotateCcw,
  Sliders,
  Maximize2,
  Gauge,
  Sparkles,
  LayoutGrid,
  Columns2,
  Car,
  Eye,
  Pause,
} from '@/components/ui/icons';
import type { OrbTheme, OrbState, OrbStandardSize } from '@alann/orb-core';

export type LabViewMode = 'grid' | 'comparison' | 'use-cases';

interface ControlsBarProps {
  theme: OrbTheme;
  activeView: LabViewMode;
  onViewChange: (v: LabViewMode) => void;
  activeState: OrbState;
  onStateChange: (s: OrbState) => void;
  activeSize: OrbStandardSize;
  onSizeChange: (s: OrbStandardSize) => void;
  speed: number;
  onSpeedChange: (s: number) => void;
  reducedMotion: boolean;
  onReducedMotionChange: (rm: boolean) => void;
  isCycling: boolean;
  onToggleCycling: () => void;
}

const STATES: { id: OrbState; label: string; desc: string }[] = [
  { id: 'idle', label: 'Idle', desc: 'Calm breathing, low energy' },
  { id: 'searching', label: 'Searching', desc: 'Active particles, scan initiation' },
  { id: 'scanning', label: 'Scanning', desc: 'High-speed sweep, detected flash' },
  { id: 'analyzing', label: 'Analyzing', desc: 'Centripetal core pull, intense processing' },
  { id: 'complete', label: 'Complete', desc: 'Energy bloom, pulse decay' },
];

const SIZES: OrbStandardSize[] = [64, 96, 128, 160, 240, 320];

export const ControlsBar: React.FC<ControlsBarProps> = ({
  theme,
  activeView,
  onViewChange,
  activeState,
  onStateChange,
  activeSize,
  onSizeChange,
  speed,
  onSpeedChange,
  reducedMotion,
  onReducedMotionChange,
  isCycling,
  onToggleCycling,
}) => {
  const isDark = theme === 'dark';

  return (
    <div
      className="border-b transition-colors duration-200"
      style={{
        backgroundColor: isDark ? '#15101F' : '#FEFEFE',
        borderColor: isDark ? 'rgba(192, 132, 252, 0.12)' : 'rgba(52, 5, 73, 0.1)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col gap-4">
          
          {/* Row 1: Primary View Tabs & Auto Sequence */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            
            {/* View Mode Switcher */}
            <div
              className="inline-flex p-1 rounded-xl gap-1 text-xs font-semibold"
              style={{
                backgroundColor: isDark ? '#2A2138' : '#ECECF1',
              }}
            >
              <button
                onClick={() => onViewChange('grid')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all ${
                  activeView === 'grid' ? 'shadow-sm' : 'opacity-70 hover:opacity-100'
                }`}
                style={{
                  backgroundColor:
                    activeView === 'grid'
                      ? isDark
                        ? '#560267'
                        : '#340549'
                      : 'transparent',
                  color:
                    activeView === 'grid'
                      ? isDark
                        ? '#F3EEFA'
                        : '#FEFEFE'
                      : isDark
                      ? '#A193B8'
                      : '#8A8A92',
                }}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>8 Orb Gallery</span>
              </button>

              <button
                onClick={() => onViewChange('comparison')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all ${
                  activeView === 'comparison' ? 'shadow-sm' : 'opacity-70 hover:opacity-100'
                }`}
                style={{
                  backgroundColor:
                    activeView === 'comparison'
                      ? isDark
                        ? '#560267'
                        : '#340549'
                      : 'transparent',
                  color:
                    activeView === 'comparison'
                      ? isDark
                        ? '#F3EEFA'
                        : '#FEFEFE'
                      : isDark
                      ? '#A193B8'
                      : '#8A8A92',
                }}
              >
                <Columns2 className="w-3.5 h-3.5" />
                <span>Side-by-Side Comparison</span>
              </button>

              <button
                onClick={() => onViewChange('use-cases')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all ${
                  activeView === 'use-cases' ? 'shadow-sm' : 'opacity-70 hover:opacity-100'
                }`}
                style={{
                  backgroundColor:
                    activeView === 'use-cases'
                      ? isDark
                        ? '#560267'
                        : '#340549'
                      : 'transparent',
                  color:
                    activeView === 'use-cases'
                      ? isDark
                        ? '#F3EEFA'
                        : '#FEFEFE'
                      : isDark
                      ? '#A193B8'
                      : '#8A8A92',
                }}
              >
                <Car className="w-3.5 h-3.5" />
                <span>Automotive Experiences (6)</span>
              </button>
            </div>

            {/* Auto Sequence / Cycle Button */}
            <button
              onClick={onToggleCycling}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all active:scale-95 shadow-sm"
              style={{
                backgroundColor: isCycling
                  ? isDark
                    ? '#C084FC'
                    : '#720488'
                  : isDark
                  ? '#2A2138'
                  : '#ECECF1',
                color: isCycling
                  ? isDark
                    ? '#15101F'
                    : '#FEFEFE'
                  : isDark
                  ? '#F3EEFA'
                  : '#1C1528',
                border: isDark
                  ? '1px solid rgba(192, 132, 252, 0.3)'
                  : '1px solid rgba(52, 5, 73, 0.2)',
              }}
            >
              {isCycling ? (
                <>
                  <Pause className="w-3.5 h-3.5 animate-pulse" />
                  <span>Cycle Mode Active</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  <span>Auto State Sequence</span>
                </>
              )}
            </button>
          </div>

          {/* Row 2: State Switcher & Physics Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t"
            style={{
              borderColor: isDark ? 'rgba(192, 132, 252, 0.08)' : 'rgba(52, 5, 73, 0.06)',
            }}
          >
            {/* 5 States Toggle Buttons */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span
                className="text-xs font-mono uppercase tracking-wider mr-1"
                style={{ color: isDark ? '#A193B8' : '#8A8A92' }}
              >
                State:
              </span>
              {STATES.map((st) => {
                const isSelected = activeState === st.id;
                return (
                  <button
                    key={st.id}
                    onClick={() => {
                      if (isCycling) onToggleCycling();
                      onStateChange(st.id);
                    }}
                    className={`px-3 py-1 text-xs font-medium rounded-lg transition-all active:scale-95 ${
                      isSelected ? 'shadow-sm font-semibold' : 'opacity-80 hover:opacity-100'
                    }`}
                    style={{
                      backgroundColor: isSelected
                        ? isDark
                          ? '#560267'
                          : '#340549'
                        : isDark
                        ? '#2A2138'
                        : '#ECECF1',
                      color: isSelected
                        ? isDark
                          ? '#F3EEFA'
                          : '#FEFEFE'
                        : isDark
                        ? '#A193B8'
                        : '#1C1528',
                      border: isSelected
                        ? isDark
                          ? '1px solid #C084FC'
                          : '1px solid #720488'
                        : '1px solid transparent',
                    }}
                    title={st.desc}
                  >
                    {st.label}
                  </button>
                );
              })}
            </div>

            {/* Size, Speed, and Reduced Motion Controls */}
            <div className="flex items-center gap-4 flex-wrap">
              
              {/* Size Selector */}
              <div className="flex items-center gap-1">
                <span
                  className="text-xs font-mono uppercase tracking-wider mr-1"
                  style={{ color: isDark ? '#A193B8' : '#8A8A92' }}
                >
                  Size:
                </span>
                <div
                  className="inline-flex p-0.5 rounded-lg gap-0.5 text-xs font-mono"
                  style={{ backgroundColor: isDark ? '#2A2138' : '#ECECF1' }}
                >
                  {SIZES.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => onSizeChange(sz)}
                      className={`px-2 py-0.5 rounded-md transition-all ${
                        activeSize === sz ? 'font-bold shadow-sm' : 'opacity-70 hover:opacity-100'
                      }`}
                      style={{
                        backgroundColor:
                          activeSize === sz
                            ? isDark
                              ? '#560267'
                              : '#340549'
                            : 'transparent',
                        color:
                          activeSize === sz
                            ? isDark
                              ? '#F3EEFA'
                              : '#FEFEFE'
                            : isDark
                            ? '#A193B8'
                            : '#1C1528',
                      }}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Speed Slider */}
              <div className="flex items-center gap-2">
                <Gauge className="w-3.5 h-3.5" style={{ color: isDark ? '#C084FC' : '#720488' }} />
                <span
                  className="text-xs font-mono"
                  style={{ color: isDark ? '#A193B8' : '#8A8A92' }}
                >
                  {speed.toFixed(1)}x
                </span>
                <input
                  type="range"
                  min="0.2"
                  max="2.5"
                  step="0.1"
                  value={speed}
                  onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
                  className="w-20 h-1.5 rounded-lg appearance-none cursor-pointer accent-purple-500"
                  style={{ backgroundColor: isDark ? '#2A2138' : '#ECECF1' }}
                />
              </div>

              {/* Reduced Motion Toggle */}
              <button
                onClick={() => onReducedMotionChange(!reducedMotion)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  reducedMotion ? 'font-semibold' : 'opacity-75 hover:opacity-100'
                }`}
                style={{
                  backgroundColor: reducedMotion
                    ? isDark
                      ? 'rgba(192, 132, 252, 0.2)'
                      : 'rgba(114, 4, 136, 0.15)'
                    : isDark
                    ? '#2A2138'
                    : '#ECECF1',
                  color: reducedMotion
                    ? isDark
                      ? '#C084FC'
                      : '#720488'
                    : isDark
                    ? '#A193B8'
                    : '#8A8A92',
                  border: reducedMotion
                    ? isDark
                      ? '1px solid #C084FC'
                      : '1px solid #720488'
                    : '1px solid transparent',
                }}
                title="Toggle Reduced Motion mode"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Reduced Motion {reducedMotion ? 'ON' : 'OFF'}</span>
              </button>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

