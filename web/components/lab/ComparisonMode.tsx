'use client';

import React, { useState } from 'react';
import { Columns2, ArrowLeftRight, Check, Sliders, Sparkles, Cpu } from '@/components/ui/icons';
import type { OrbTheme, OrbState, OrbStandardSize, OrbVariant } from '@alann/orb-core';
import { ALL_VARIANTS, VARIANT_DEFINITIONS } from '@alann/orb-core';
import { AlannThinkingOrb } from '@alann/orb-web';

interface ComparisonModeProps {
  theme: OrbTheme;
  globalState: OrbState;
  globalSize: OrbStandardSize;
  speed: number;
  reducedMotion: boolean;
}

export const ComparisonMode: React.FC<ComparisonModeProps> = ({
  theme,
  globalState,
  globalSize,
  speed,
  reducedMotion,
}) => {
  const isDark = theme === 'dark';

  const [leftVariant, setLeftVariant] = useState<OrbVariant>('light-01');
  const [rightVariant, setRightVariant] = useState<OrbVariant>('dark-01');
  const [syncState, setSyncState] = useState<boolean>(true);
  const [leftState, setLeftState] = useState<OrbState>(globalState);
  const [rightState, setRightState] = useState<OrbState>(globalState);

  const leftDef = VARIANT_DEFINITIONS[leftVariant];
  const rightDef = VARIANT_DEFINITIONS[rightVariant];

  const handleGlobalStateChange = (st: OrbState) => {
    setLeftState(st);
    setRightState(st);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <Columns2 className="w-5 h-5 text-purple-400" />
            <h2
              className="text-2xl font-bold tracking-tight"
              style={{ color: isDark ? '#F3EEFA' : '#1C1528' }}
            >
              Side-by-Side Architectural Comparator
            </h2>
          </div>
          <p
            className="text-xs font-medium tracking-wide mt-1"
            style={{ color: isDark ? '#A193B8' : '#8A8A92' }}
          >
            Directly benchmark any two orb variations simultaneously with synchronized animation frames and metric differentials.
          </p>
        </div>

        {/* Sync Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSyncState(!syncState)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              syncState ? 'shadow-sm' : 'opacity-70'
            }`}
            style={{
              backgroundColor: syncState
                ? isDark
                  ? '#560267'
                  : '#340549'
                : isDark
                ? '#2A2138'
                : '#ECECF1',
              color: syncState
                ? isDark
                  ? '#F3EEFA'
                  : '#FEFEFE'
                : isDark
                ? '#A193B8'
                : '#1C1528',
              border: syncState
                ? isDark
                  ? '1px solid #C084FC'
                  : '1px solid #720488'
                : '1px solid transparent',
            }}
          >
            {syncState ? 'States Synchronized' : 'Independent States'}
          </button>
        </div>
      </div>

      {/* Comparison Stage Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        
        {/* LEFT ORB */}
        <div
          className="rounded-3xl border p-6 flex flex-col items-center justify-between transition-all"
          style={{
            backgroundColor: leftDef.theme === 'dark' ? '#15101F' : '#FEFEFE',
            borderColor: isDark ? 'rgba(192, 132, 252, 0.18)' : 'rgba(52, 5, 73, 0.14)',
          }}
        >
          {/* Variant Selector Left */}
          <div className="w-full flex items-center justify-between gap-3 pb-4 border-b"
            style={{
              borderColor: leftDef.theme === 'dark' ? 'rgba(192, 132, 252, 0.1)' : 'rgba(52, 5, 73, 0.08)',
            }}
          >
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider block opacity-70"
                style={{ color: leftDef.theme === 'dark' ? '#A193B8' : '#8A8A92' }}
              >
                Slot A — Variant
              </span>
              <select
                value={leftVariant}
                onChange={(e) => setLeftVariant(e.target.value as OrbVariant)}
                className="text-sm font-bold bg-transparent cursor-pointer rounded py-1 pr-2 outline-none"
                style={{ color: leftDef.theme === 'dark' ? '#F3EEFA' : '#1C1528' }}
              >
                {ALL_VARIANTS.map((v) => (
                  <option key={v} value={v} className="bg-neutral-900 text-white">
                    {v.toUpperCase()} — {VARIANT_DEFINITIONS[v].name}
                  </option>
                ))}
              </select>
            </div>

            {/* State selector for Left */}
            <div className="flex items-center gap-1">
              {(['idle', 'searching', 'scanning', 'analyzing', 'complete'] as OrbState[]).map((st) => (
                <button
                  key={st}
                  onClick={() => {
                    setLeftState(st);
                    if (syncState) setRightState(st);
                  }}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase transition-all ${
                    (syncState ? globalState : leftState) === st ? 'font-bold' : 'opacity-60 hover:opacity-100'
                  }`}
                  style={{
                    backgroundColor:
                      (syncState ? globalState : leftState) === st
                        ? leftDef.theme === 'dark'
                          ? '#560267'
                          : '#340549'
                        : leftDef.theme === 'dark'
                        ? '#2A2138'
                        : '#ECECF1',
                    color:
                      (syncState ? globalState : leftState) === st
                        ? leftDef.theme === 'dark'
                          ? '#F3EEFA'
                          : '#FEFEFE'
                        : leftDef.theme === 'dark'
                        ? '#A193B8'
                        : '#1C1528',
                  }}
                >
                  {st.slice(0, 3)}
                </button>
              ))}
            </div>
          </div>

          {/* Orb Canvas View */}
          <div className="py-12 flex items-center justify-center min-h-[300px] w-full">
            <AlannThinkingOrb
              theme={leftDef.theme}
              variant={leftVariant}
              state={syncState ? globalState : leftState}
              size={Math.max(160, globalSize)}
              speed={speed}
              reducedMotion={reducedMotion}
            />
          </div>

          {/* Specs Footer */}
          <div className="w-full text-center pt-4 border-t"
            style={{
              borderColor: leftDef.theme === 'dark' ? 'rgba(192, 132, 252, 0.1)' : 'rgba(52, 5, 73, 0.08)',
            }}
          >
            <p className="text-xs font-semibold" style={{ color: leftDef.theme === 'dark' ? '#F3EEFA' : '#1C1528' }}>
              {leftDef.name} ({leftDef.theme.toUpperCase()})
            </p>
            <p className="text-[11px] mt-0.5" style={{ color: leftDef.theme === 'dark' ? '#A193B8' : '#8A8A92' }}>
              {leftDef.idealUseCase}
            </p>
          </div>
        </div>

        {/* RIGHT ORB */}
        <div
          className="rounded-3xl border p-6 flex flex-col items-center justify-between transition-all"
          style={{
            backgroundColor: rightDef.theme === 'dark' ? '#15101F' : '#FEFEFE',
            borderColor: isDark ? 'rgba(192, 132, 252, 0.18)' : 'rgba(52, 5, 73, 0.14)',
          }}
        >
          {/* Variant Selector Right */}
          <div className="w-full flex items-center justify-between gap-3 pb-4 border-b"
            style={{
              borderColor: rightDef.theme === 'dark' ? 'rgba(192, 132, 252, 0.1)' : 'rgba(52, 5, 73, 0.08)',
            }}
          >
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider block opacity-70"
                style={{ color: rightDef.theme === 'dark' ? '#A193B8' : '#8A8A92' }}
              >
                Slot B — Variant
              </span>
              <select
                value={rightVariant}
                onChange={(e) => setRightVariant(e.target.value as OrbVariant)}
                className="text-sm font-bold bg-transparent cursor-pointer rounded py-1 pr-2 outline-none"
                style={{ color: rightDef.theme === 'dark' ? '#F3EEFA' : '#1C1528' }}
              >
                {ALL_VARIANTS.map((v) => (
                  <option key={v} value={v} className="bg-neutral-900 text-white">
                    {v.toUpperCase()} — {VARIANT_DEFINITIONS[v].name}
                  </option>
                ))}
              </select>
            </div>

            {/* State selector for Right */}
            <div className="flex items-center gap-1">
              {(['idle', 'searching', 'scanning', 'analyzing', 'complete'] as OrbState[]).map((st) => (
                <button
                  key={st}
                  onClick={() => {
                    setRightState(st);
                    if (syncState) setLeftState(st);
                  }}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase transition-all ${
                    (syncState ? globalState : rightState) === st ? 'font-bold' : 'opacity-60 hover:opacity-100'
                  }`}
                  style={{
                    backgroundColor:
                      (syncState ? globalState : rightState) === st
                        ? rightDef.theme === 'dark'
                          ? '#560267'
                          : '#340549'
                        : rightDef.theme === 'dark'
                        ? '#2A2138'
                        : '#ECECF1',
                    color:
                      (syncState ? globalState : rightState) === st
                        ? rightDef.theme === 'dark'
                          ? '#F3EEFA'
                          : '#FEFEFE'
                        : rightDef.theme === 'dark'
                        ? '#A193B8'
                        : '#1C1528',
                  }}
                >
                  {st.slice(0, 3)}
                </button>
              ))}
            </div>
          </div>

          {/* Orb Canvas View */}
          <div className="py-12 flex items-center justify-center min-h-[300px] w-full">
            <AlannThinkingOrb
              theme={rightDef.theme}
              variant={rightVariant}
              state={syncState ? globalState : rightState}
              size={Math.max(160, globalSize)}
              speed={speed}
              reducedMotion={reducedMotion}
            />
          </div>

          {/* Specs Footer */}
          <div className="w-full text-center pt-4 border-t"
            style={{
              borderColor: rightDef.theme === 'dark' ? 'rgba(192, 132, 252, 0.1)' : 'rgba(52, 5, 73, 0.08)',
            }}
          >
            <p className="text-xs font-semibold" style={{ color: rightDef.theme === 'dark' ? '#F3EEFA' : '#1C1528' }}>
              {rightDef.name} ({rightDef.theme.toUpperCase()})
            </p>
            <p className="text-[11px] mt-0.5" style={{ color: rightDef.theme === 'dark' ? '#A193B8' : '#8A8A92' }}>
              {rightDef.idealUseCase}
            </p>
          </div>
        </div>

      </div>

      {/* Differential Architectural Table */}
      <div
        className="rounded-2xl border overflow-hidden"
        style={{
          backgroundColor: isDark ? '#15101F' : '#FEFEFE',
          borderColor: isDark ? 'rgba(192, 132, 252, 0.18)' : 'rgba(52, 5, 73, 0.14)',
        }}
      >
        <div
          className="px-6 py-3 border-b flex items-center gap-2"
          style={{
            borderColor: isDark ? 'rgba(192, 132, 252, 0.1)' : 'rgba(52, 5, 73, 0.08)',
            backgroundColor: isDark ? '#2A2138' : '#ECECF1',
          }}
        >
          <Cpu className="w-4 h-4" style={{ color: isDark ? '#C084FC' : '#720488' }} />
          <h3 className="text-xs font-bold font-mono uppercase tracking-wider"
            style={{ color: isDark ? '#F3EEFA' : '#1C1528' }}
          >
            Metric & Physics Differential
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr
                className="border-b text-left font-mono"
                style={{
                  borderColor: isDark ? 'rgba(192, 132, 252, 0.1)' : 'rgba(52, 5, 73, 0.08)',
                  color: isDark ? '#A193B8' : '#8A8A92',
                }}
              >
                <th className="py-3 px-6">Metric</th>
                <th className="py-3 px-6">{leftDef.name} ({leftDef.id})</th>
                <th className="py-3 px-6">{rightDef.name} ({rightDef.id})</th>
              </tr>
            </thead>
            <tbody
              className="divide-y font-mono"
              style={{
                borderColor: isDark ? 'rgba(192, 132, 252, 0.05)' : 'rgba(52, 5, 73, 0.05)',
                color: isDark ? '#F3EEFA' : '#1C1528',
              }}
            >
              <tr>
                <td className="py-2.5 px-6 font-semibold opacity-75">Theme Substrate</td>
                <td className="py-2.5 px-6 uppercase">{leftDef.theme}</td>
                <td className="py-2.5 px-6 uppercase">{rightDef.theme}</td>
              </tr>
              <tr>
                <td className="py-2.5 px-6 font-semibold opacity-75">Base Particle Count</td>
                <td className="py-2.5 px-6">{leftDef.baseParticleCount} pts</td>
                <td className="py-2.5 px-6">{rightDef.baseParticleCount} pts</td>
              </tr>
              <tr>
                <td className="py-2.5 px-6 font-semibold opacity-75">Scan Sweep Velocity</td>
                <td className="py-2.5 px-6">{leftDef.scanSpeed} rad/s</td>
                <td className="py-2.5 px-6">{rightDef.scanSpeed} rad/s</td>
              </tr>
              <tr>
                <td className="py-2.5 px-6 font-semibold opacity-75">Radial Envelope Ratio</td>
                <td className="py-2.5 px-6">{leftDef.baseRadiusRatio}</td>
                <td className="py-2.5 px-6">{rightDef.baseRadiusRatio}</td>
              </tr>
              <tr>
                <td className="py-2.5 px-6 font-semibold opacity-75">Core Radiance</td>
                <td className="py-2.5 px-6">{leftDef.hasCoreGlow ? 'Active Luminous' : 'Dormant'}</td>
                <td className="py-2.5 px-6">{rightDef.hasCoreGlow ? 'Active Luminous' : 'Dormant'}</td>
              </tr>
              <tr>
                <td className="py-2.5 px-6 font-semibold opacity-75">Synaptic Connections</td>
                <td className="py-2.5 px-6">{leftDef.hasInterconnections ? 'Dynamic Synapses' : 'None'}</td>
                <td className="py-2.5 px-6">{rightDef.hasInterconnections ? 'Dynamic Synapses' : 'None'}</td>
              </tr>
              <tr>
                <td className="py-2.5 px-6 font-semibold opacity-75">Multi-Layer Sensor Shell</td>
                <td className="py-2.5 px-6">{leftDef.hasMultiLayers ? '3-Layer ADAS' : 'Single Shell'}</td>
                <td className="py-2.5 px-6">{rightDef.hasMultiLayers ? '3-Layer ADAS' : 'Single Shell'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

