'use client';

import React, { useState } from 'react';
import { Check, Copy, Sparkles, Layers, Compass, Radio } from '@/components/ui/icons';
import type { OrbVariant, OrbState, OrbStandardSize } from '@alann/orb-core';
import { VARIANT_DEFINITIONS } from '@alann/orb-core';
import { AlannThinkingOrb } from '@alann/orb-web';

interface VariantCardProps {
  variantId: OrbVariant;
  globalState: OrbState;
  globalSize: OrbStandardSize;
  globalSpeed: number;
  globalReducedMotion: boolean;
  onSelectForComparison?: (v: OrbVariant) => void;
}

export const VariantCard: React.FC<VariantCardProps> = ({
  variantId,
  globalState,
  globalSize,
  globalSpeed,
  globalReducedMotion,
  onSelectForComparison,
}) => {
  const vDef = VARIANT_DEFINITIONS[variantId];
  const isDark = vDef.theme === 'dark';

  // Allow independent local state preview
  const [localState, setLocalState] = useState<OrbState | null>(null);
  const [copied, setCopied] = useState(false);

  const effectiveState = localState ?? globalState;

  const copyCode = () => {
    const code = `<AlannThinkingOrb
  theme="${vDef.theme}"
  variant="${variantId}"
  state="${effectiveState}"
  size={${globalSize}}
  speed={${globalSpeed}}
/>`;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="flex flex-col rounded-2xl border transition-all duration-300 hover:shadow-xl relative overflow-hidden group"
      style={{
        backgroundColor: isDark ? '#15101F' : '#FEFEFE',
        borderColor: isDark ? 'rgba(192, 132, 252, 0.18)' : 'rgba(52, 5, 73, 0.14)',
      }}
    >
      {/* Top Header */}
      <div className="p-4 pb-2 flex items-start justify-between gap-2 border-b"
        style={{
          borderColor: isDark ? 'rgba(192, 132, 252, 0.08)' : 'rgba(52, 5, 73, 0.06)',
        }}
      >
        <div>
          <div className="flex items-center gap-2">
            <span
              className="px-2 py-0.5 text-xs font-mono font-bold rounded-md"
              style={{
                backgroundColor: isDark ? '#2A2138' : '#ECECF1',
                color: isDark ? '#C084FC' : '#720488',
                border: isDark ? '1px solid rgba(192, 132, 252, 0.2)' : '1px solid rgba(114, 4, 136, 0.15)',
              }}
            >
              {variantId.toUpperCase()}
            </span>
            <h3
              className="text-base font-bold tracking-tight"
              style={{ color: isDark ? '#F3EEFA' : '#1C1528' }}
            >
              {vDef.name}
            </h3>
          </div>
          <p
            className="text-xs font-medium mt-1 line-clamp-1"
            style={{ color: isDark ? '#A193B8' : '#8A8A92' }}
          >
            {vDef.tagline}
          </p>
        </div>

        {/* Quick Copy JSX */}
        <button
          onClick={copyCode}
          className="p-1.5 rounded-lg opacity-70 hover:opacity-100 transition-all text-xs flex items-center gap-1"
          style={{
            backgroundColor: isDark ? '#2A2138' : '#ECECF1',
            color: isDark ? '#F3EEFA' : '#1C1528',
          }}
          title="Copy React JSX"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      {/* Orb Stage Canvas Presentation */}
      <div
        className="flex items-center justify-center py-8 relative min-h-[220px] transition-colors"
        style={{
          backgroundColor: isDark ? '#000000' : '#FEFEFE',
          backgroundImage: isDark
            ? 'radial-gradient(circle at center, rgba(86, 2, 103, 0.15) 0%, transparent 70%)'
            : 'radial-gradient(circle at center, rgba(243, 235, 250, 0.8) 0%, transparent 70%)',
        }}
      >
        <AlannThinkingOrb
          theme={vDef.theme}
          variant={variantId}
          state={effectiveState}
          size={globalSize}
          speed={globalSpeed}
          reducedMotion={globalReducedMotion}
        />
      </div>

      {/* Card Body & Specs */}
      <div className="p-4 pt-3 flex-1 flex flex-col justify-between border-t"
        style={{
          borderColor: isDark ? 'rgba(192, 132, 252, 0.08)' : 'rgba(52, 5, 73, 0.06)',
          backgroundColor: isDark ? '#15101F' : '#FEFEFE',
        }}
      >
        <p
          className="text-xs leading-relaxed mb-3"
          style={{ color: isDark ? '#A193B8' : '#1C1528' }}
        >
          {vDef.description}
        </p>

        {/* Technical Badges */}
        <div className="grid grid-cols-2 gap-2 text-xs font-mono mb-4">
          <div
            className="p-1.5 rounded-md flex items-center justify-between"
            style={{ backgroundColor: isDark ? '#2A2138' : '#ECECF1' }}
          >
            <span style={{ color: isDark ? '#A193B8' : '#8A8A92' }}>Particles:</span>
            <span className="font-bold" style={{ color: isDark ? '#F3EEFA' : '#1C1528' }}>
              {vDef.baseParticleCount}
            </span>
          </div>

          <div
            className="p-1.5 rounded-md flex items-center justify-between"
            style={{ backgroundColor: isDark ? '#2A2138' : '#ECECF1' }}
          >
            <span style={{ color: isDark ? '#A193B8' : '#8A8A92' }}>Scan Speed:</span>
            <span className="font-bold" style={{ color: isDark ? '#F3EEFA' : '#1C1528' }}>
              {vDef.scanSpeed}x
            </span>
          </div>

          <div
            className="p-1.5 rounded-md flex items-center justify-between"
            style={{ backgroundColor: isDark ? '#2A2138' : '#ECECF1' }}
          >
            <span style={{ color: isDark ? '#A193B8' : '#8A8A92' }}>Core Glow:</span>
            <span className="font-bold" style={{ color: isDark ? '#F3EEFA' : '#1C1528' }}>
              {vDef.hasCoreGlow ? 'Active' : 'Dormant'}
            </span>
          </div>

          <div
            className="p-1.5 rounded-md flex items-center justify-between"
            style={{ backgroundColor: isDark ? '#2A2138' : '#ECECF1' }}
          >
            <span style={{ color: isDark ? '#A193B8' : '#8A8A92' }}>Topology:</span>
            <span className="font-bold truncate ml-1" style={{ color: isDark ? '#F3EEFA' : '#1C1528' }}>
              {vDef.hasInterconnections
                ? 'Synaptic'
                : vDef.hasMultiLayers
                ? '3-Layer'
                : 'Spherical'}
            </span>
          </div>
        </div>

        {/* Recommended Automotive Use Case */}
        <div
          className="p-2 rounded-lg text-xs mb-3 flex items-start gap-1.5"
          style={{
            backgroundColor: isDark ? 'rgba(86, 2, 103, 0.25)' : 'rgba(243, 235, 250, 0.75)',
            border: isDark ? '1px solid rgba(192, 132, 252, 0.15)' : '1px solid rgba(114, 4, 136, 0.12)',
          }}
        >
          <Compass className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: isDark ? '#C084FC' : '#720488' }} />
          <div>
            <span className="font-semibold" style={{ color: isDark ? '#F3EEFA' : '#340549' }}>
              Automotive Role:
            </span>{' '}
            <span style={{ color: isDark ? '#A193B8' : '#8A8A92' }}>
              {vDef.idealUseCase}
            </span>
          </div>
        </div>

        {/* Local State Quick Test Buttons */}
        <div className="flex items-center justify-between gap-1 pt-2 border-t"
          style={{
            borderColor: isDark ? 'rgba(192, 132, 252, 0.08)' : 'rgba(52, 5, 73, 0.06)',
          }}
        >
          <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: isDark ? '#A193B8' : '#8A8A92' }}>
            Test:
          </span>
          <div className="flex items-center gap-1 flex-wrap">
            {(['idle', 'searching', 'scanning', 'analyzing', 'complete'] as OrbState[]).map((st) => (
              <button
                key={st}
                onClick={() => setLocalState(effectiveState === st && localState !== null ? null : st)}
                className={`px-1.5 py-0.5 rounded text-[10px] font-mono uppercase transition-all ${
                  effectiveState === st ? 'font-bold' : 'opacity-60 hover:opacity-100'
                }`}
                style={{
                  backgroundColor:
                    effectiveState === st
                      ? isDark
                        ? '#560267'
                        : '#340549'
                      : isDark
                      ? '#2A2138'
                      : '#ECECF1',
                  color:
                    effectiveState === st
                      ? isDark
                        ? '#F3EEFA'
                        : '#FEFEFE'
                      : isDark
                      ? '#A193B8'
                      : '#1C1528',
                }}
              >
                {st.slice(0, 4)}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

