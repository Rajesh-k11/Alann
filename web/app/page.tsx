'use client';

import React, { useState, useEffect } from 'react';
import type { OrbTheme, OrbState, OrbStandardSize, OrbVariant } from '@alann/orb-core';
import { LabHeader } from '@/components/lab/LabHeader';
import { ControlsBar, type LabViewMode } from '@/components/lab/ControlsBar';
import { VariantGrid } from '@/components/lab/VariantGrid';
import { ComparisonMode } from '@/components/lab/ComparisonMode';
import { AutomotiveUseCases } from '@/components/lab/AutomotiveUseCases';
import { CodeExportModal } from '@/components/lab/CodeExportModal';
import { ShieldCheck, Cpu, Sparkles, Layers, Zap } from '@/components/ui/icons';

const CYCLE_ORDER: { state: OrbState; durationMs: number }[] = [
  { state: 'searching', durationMs: 3200 },
  { state: 'scanning', durationMs: 3400 },
  { state: 'analyzing', durationMs: 3600 },
  { state: 'complete', durationMs: 2800 },
  { state: 'idle', durationMs: 3000 },
];

export default function AlannLabPage() {
  const [theme, setTheme] = useState<OrbTheme>('dark');
  const [activeState, setActiveState] = useState<OrbState>('scanning');
  const [activeSize, setActiveSize] = useState<OrbStandardSize>(160);
  const [speed, setSpeed] = useState<number>(1.0);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [activeView, setActiveView] = useState<LabViewMode>('grid');
  const [isCycling, setIsCycling] = useState<boolean>(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [selectedVariant, setSelectedVariant] = useState<OrbVariant>('dark-04');

  // Synchronize <html> root class for tailwind dark mode
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
  }, [theme]);

  // Auto state cycling engine
  useEffect(() => {
    if (!isCycling) return;

    let currentIndex = CYCLE_ORDER.findIndex((c) => c.state === activeState);
    if (currentIndex === -1) currentIndex = 0;

    let timeoutId: ReturnType<typeof setTimeout>;

    const runNextStep = () => {
      currentIndex = (currentIndex + 1) % CYCLE_ORDER.length;
      const nextStep = CYCLE_ORDER[currentIndex];
      setActiveState(nextStep.state);
      timeoutId = setTimeout(runNextStep, nextStep.durationMs);
    };

    timeoutId = setTimeout(runNextStep, CYCLE_ORDER[currentIndex].durationMs);

    return () => clearTimeout(timeoutId);
  }, [isCycling, activeState]);

  const isDark = theme === 'dark';

  return (
    <main
      className="min-h-screen flex flex-col transition-colors duration-300 select-none"
      style={{
        backgroundColor: isDark ? '#000000' : '#FEFEFE',
        color: isDark ? '#F3EEFA' : '#1C1528',
      }}
    >
      {/* Top Navigation & Status Header */}
      <LabHeader
        theme={theme}
        onThemeChange={(t) => setTheme(t)}
        activeState={activeState}
        activeVariant={selectedVariant}
        onOpenExportModal={() => setIsExportModalOpen(true)}
      />

      {/* Global Interactive Controls Bar */}
      <ControlsBar
        theme={theme}
        activeView={activeView}
        onViewChange={setActiveView}
        activeState={activeState}
        onStateChange={setActiveState}
        activeSize={activeSize}
        onSizeChange={setActiveSize}
        speed={speed}
        onSpeedChange={setSpeed}
        reducedMotion={reducedMotion}
        onReducedMotionChange={setReducedMotion}
        isCycling={isCycling}
        onToggleCycling={() => setIsCycling(!isCycling)}
      />

      {/* Lab Banner / Metrics Summary */}
      <section
        className="border-b transition-colors"
        style={{
          backgroundColor: isDark ? 'rgba(21, 16, 31, 0.4)' : 'rgba(243, 235, 250, 0.4)',
          borderColor: isDark ? 'rgba(192, 132, 252, 0.08)' : 'rgba(52, 5, 73, 0.06)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
            
            <div className="flex items-center gap-6 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: isDark ? '#C084FC' : '#720488' }} />
                <span style={{ color: isDark ? '#A193B8' : '#8A8A92' }}>Design System:</span>
                <strong style={{ color: isDark ? '#F3EEFA' : '#1C1528' }}>ALANN Pure Tokens</strong>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: isDark ? '#C084FC' : '#720488' }} />
                <span style={{ color: isDark ? '#A193B8' : '#8A8A92' }}>Platforms:</span>
                <strong style={{ color: isDark ? '#F3EEFA' : '#1C1528' }}>Next.js Canvas + React Native Skia</strong>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: isDark ? '#C084FC' : '#720488' }} />
                <span style={{ color: isDark ? '#A193B8' : '#8A8A92' }}>Variations:</span>
                <strong style={{ color: isDark ? '#F3EEFA' : '#1C1528' }}>4 Light + 4 Dark (8 Total)</strong>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span style={{ color: isDark ? '#A193B8' : '#8A8A92' }}>Frame Rate:</span>
                <span className="font-bold text-emerald-400">Locked 60 FPS</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main View Display */}
      <div className="flex-1">
        {activeView === 'grid' && (
          <VariantGrid
            theme={theme}
            activeState={activeState}
            activeSize={activeSize}
            speed={speed}
            reducedMotion={reducedMotion}
            onSelectForComparison={(v) => {
              setSelectedVariant(v);
              setActiveView('comparison');
            }}
          />
        )}

        {activeView === 'comparison' && (
          <ComparisonMode
            theme={theme}
            globalState={activeState}
            globalSize={activeSize}
            speed={speed}
            reducedMotion={reducedMotion}
          />
        )}

        {activeView === 'use-cases' && (
          <AutomotiveUseCases theme={theme} />
        )}
      </div>

      {/* Footer */}
      <footer
        className="mt-auto border-t transition-colors"
        style={{
          backgroundColor: isDark ? '#15101F' : '#FEFEFE',
          borderColor: isDark ? 'rgba(192, 132, 252, 0.12)' : 'rgba(52, 5, 73, 0.1)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2 font-mono">
              <span className="font-bold" style={{ color: isDark ? '#F3EEFA' : '#1C1528' }}>
                ALANN AI Orb
              </span>
              <span className="opacity-40">•</span>
              <span style={{ color: isDark ? '#A193B8' : '#8A8A92' }}>
                Automotive-Grade Spherical Particle Intelligence
              </span>
            </div>

            <div className="flex items-center gap-6 font-mono text-[11px]"
              style={{ color: isDark ? '#A193B8' : '#8A8A92' }}
            >
              <span>Next.js 2D Canvas</span>
              <span>@shopify/react-native-skia</span>
              <span>Sub-pixel HiDPI</span>
              <span>Reduced Motion Calibrated</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Code Export Modal */}
      <CodeExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        theme={theme}
        variant={selectedVariant}
        state={activeState}
        size={activeSize}
        speed={speed}
      />
    </main>
  );
}

