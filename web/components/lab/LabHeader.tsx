'use client';

import React, { useState, useEffect } from 'react';
import { Sun, Moon, Code2, Cpu, ShieldCheck, Sparkles, Activity } from '@/components/ui/icons';
import type { OrbTheme, OrbState, OrbVariant } from '@alann/orb-core';

interface LabHeaderProps {
  theme: OrbTheme;
  onThemeChange: (t: OrbTheme) => void;
  activeState: OrbState;
  activeVariant: OrbVariant;
  onOpenExportModal: () => void;
}

export const LabHeader: React.FC<LabHeaderProps> = ({
  theme,
  onThemeChange,
  activeState,
  activeVariant,
  onOpenExportModal,
}) => {
  const isDark = theme === 'dark';
  const [fps, setFps] = useState(60);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;

    const measure = (now: number) => {
      frameCount++;
      if (now - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastTime)));
        frameCount = 0;
        lastTime = now;
      }
      animId = requestAnimationFrame(measure);
    };

    animId = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <header className="border-b transition-colors duration-300"
      style={{
        backgroundColor: isDark ? 'rgba(21, 16, 31, 0.85)' : 'rgba(254, 254, 254, 0.85)',
        borderColor: isDark ? 'rgba(192, 132, 252, 0.15)' : 'rgba(52, 5, 73, 0.12)',
        backdropFilter: 'blur(16px)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Brand & Lab Title */}
          <div>
            <div className="flex items-center gap-3">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm tracking-wider shadow-sm"
                style={{
                  backgroundColor: isDark ? '#560267' : '#340549',
                  color: isDark ? '#F3EEFA' : '#FEFEFE',
                  border: isDark ? '1px solid #C084FC' : '1px solid #720488',
                }}
              >
                AL
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold tracking-tight"
                    style={{ color: isDark ? '#F3EEFA' : '#1C1528' }}
                  >
                    ALANN AI ORB LAB
                  </h1>
                  <span 
                    className="px-2 py-0.5 text-xs font-semibold rounded-full uppercase tracking-wider"
                    style={{
                      backgroundColor: isDark ? 'rgba(192, 132, 252, 0.18)' : 'rgba(114, 4, 136, 0.12)',
                      color: isDark ? '#C084FC' : '#720488',
                    }}
                  >
                    v1.0 Production
                  </span>
                </div>
                <p className="text-xs font-medium tracking-wide mt-0.5"
                  style={{ color: isDark ? '#A193B8' : '#8A8A92' }}
                >
                  Intelligence in Motion • Web Canvas & React Native Skia
                </p>
              </div>
            </div>
          </div>

          {/* Status Indicators & Global Controls */}
          <div className="flex items-center flex-wrap gap-3">
            
            {/* FPS & Health Monitor */}
            <div 
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono"
              style={{
                backgroundColor: isDark ? '#2A2138' : '#ECECF1',
                color: isDark ? '#A193B8' : '#8A8A92',
                border: isDark ? '1px solid rgba(192, 132, 252, 0.15)' : '1px solid rgba(52, 5, 73, 0.1)',
              }}
            >
              <Activity className="w-3.5 h-3.5" style={{ color: isDark ? '#C084FC' : '#720488' }} />
              <span className="font-semibold" style={{ color: isDark ? '#F3EEFA' : '#1C1528' }}>
                {fps} FPS
              </span>
              <span className="opacity-40">•</span>
              <span className="capitalize">{activeState}</span>
            </div>

            {/* Automotive Engine Badge */}
            <div 
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono"
              style={{
                backgroundColor: isDark ? '#2A2138' : '#ECECF1',
                color: isDark ? '#A193B8' : '#8A8A92',
                border: isDark ? '1px solid rgba(192, 132, 252, 0.15)' : '1px solid rgba(52, 5, 73, 0.1)',
              }}
            >
              <Cpu className="w-3.5 h-3.5" style={{ color: isDark ? '#C084FC' : '#720488' }} />
              <span>Dual-Platform Core</span>
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={() => onThemeChange(isDark ? 'light' : 'dark')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all shadow-sm active:scale-95"
              style={{
                backgroundColor: isDark ? '#2A2138' : '#ECECF1',
                color: isDark ? '#F3EEFA' : '#1C1528',
                border: isDark ? '1px solid #C084FC' : '1px solid #720488',
              }}
              title={`Switch to ${isDark ? 'Light' : 'Dark'} Theme`}
            >
              {isDark ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-300" />
                  <span>Light Theme</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-purple-700" />
                  <span>Dark Theme</span>
                </>
              )}
            </button>

            {/* Code Export Button */}
            <button
              onClick={onOpenExportModal}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white transition-all shadow-md active:scale-95 hover:opacity-95"
              style={{
                backgroundColor: isDark ? '#560267' : '#340549',
                border: isDark ? '1px solid #C084FC' : '1px solid #720488',
              }}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Integration Code</span>
            </button>

          </div>
        </div>
      </div>
    </header>
  );
};

