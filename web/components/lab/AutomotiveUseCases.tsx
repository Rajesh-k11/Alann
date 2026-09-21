'use client';

import React, { useState } from 'react';
import {
  Car,
  Search,
  Scan,
  Activity,
  Lightbulb,
  MessageSquare,
  FileCheck,
  Smartphone,
  Monitor,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Cpu,
  ShieldCheck,
  ChevronRight,
  BatteryCharging,
} from '@/components/ui/icons';
import type { OrbTheme, OrbState, OrbVariant } from '@alann/orb-core';
import { AlannThinkingOrb } from '@alann/orb-web';

interface AutomotiveUseCasesProps {
  theme: OrbTheme;
}

interface UseCaseDef {
  id: string;
  title: string;
  subtitle: string;
  recommendedVariant: OrbVariant;
  recommendedState: OrbState;
  recommendedSize: number;
  description: string;
  vehicleContext: {
    vin: string;
    model: string;
    metrics: { label: string; value: string; status?: 'ok' | 'warning' | 'neutral' }[];
  };
}

const USE_CASES: UseCaseDef[] = [
  {
    id: 'search-data',
    title: '1. Searching Vehicle Data',
    subtitle: 'Global VIN Registry & Inventory Lookup',
    recommendedVariant: 'dark-01',
    recommendedState: 'searching',
    recommendedSize: 96,
    description: 'ALANN queries distributed motor vehicle databases, title registrations, and auction records to reconstruct complete history.',
    vehicleContext: {
      vin: 'WA1VAAF18N019482',
      model: '2024 Audi RS e-tron GT',
      metrics: [
        { label: 'Registry Match', value: 'Found in 3 nodes', status: 'ok' },
        { label: 'Title Escrow', value: 'Clear / 1 Owner', status: 'ok' },
        { label: 'Odometer Sync', value: '14,280 mi verified', status: 'ok' },
      ],
    },
  },
  {
    id: 'scan-vehicle',
    title: '2. Scanning Vehicle (360 LiDAR/VIN)',
    subtitle: 'Optical VIN & ADAS Sensor Inspection',
    recommendedVariant: 'dark-04',
    recommendedState: 'scanning',
    recommendedSize: 128,
    description: 'Precision LiDAR and high-speed optical scanning evaluates structural integrity, paint depth, panel alignment, and radar transceiver health.',
    vehicleContext: {
      vin: 'WP0AF2Y17PSA90214',
      model: '2024 Porsche Taycan Turbo S',
      metrics: [
        { label: 'LiDAR Mesh', value: '99.4% geometry match', status: 'ok' },
        { label: 'Paint Thickness', value: '112 µm (Factory OEM)', status: 'ok' },
        { label: 'Camera Calib', value: 'Within 0.02° tolerance', status: 'ok' },
      ],
    },
  },
  {
    id: 'analyze-vehicle',
    title: '3. Analyzing Vehicle Telemetry',
    subtitle: 'Powertrain Diagnostics & EV Battery Health',
    recommendedVariant: 'dark-02',
    recommendedState: 'analyzing',
    recommendedSize: 128,
    description: 'High-frequency telemetry ingestion analyzes cell voltage deviation, stator thermal dissipation, and inverter switching efficiency.',
    vehicleContext: {
      vin: '5YJ3E1EB8NF192834',
      model: '2023 Tesla Model 3 Performance',
      metrics: [
        { label: 'Battery SoH', value: '97.2% Capacity', status: 'ok' },
        { label: 'Cell Balance', value: 'Δ 4.2 mV (Optimal)', status: 'ok' },
        { label: 'Thermal Delta', value: '+1.8°C nominal', status: 'ok' },
      ],
    },
  },
  {
    id: 'find-insights',
    title: '4. Finding Vehicle Insights',
    subtitle: 'Predictive Depreciation & Anomaly Detection',
    recommendedVariant: 'dark-03',
    recommendedState: 'analyzing',
    recommendedSize: 96,
    description: 'Neural pattern matching uncovers subtle anomalies in braking regeneration and projects 36-month residual valuation curve.',
    vehicleContext: {
      vin: 'WBA53AY05PFL92811',
      model: '2023 BMW i4 M50 Gran Coupe',
      metrics: [
        { label: '36mo Residual', value: '62.4% Projected', status: 'ok' },
        { label: 'Brake Regen', value: 'Slight drag on Axle 2', status: 'warning' },
        { label: 'Tire Wear Index', value: '7.8 / 10 mm even', status: 'ok' },
      ],
    },
  },
  {
    id: 'assistant-thinking',
    title: '5. AI Assistant Thinking',
    subtitle: 'Conversational Automotive Voice Copilot',
    recommendedVariant: 'light-01',
    recommendedState: 'searching',
    recommendedSize: 64,
    description: 'ALANN conversational copilot processes driver voice commands and diagnostic inquiries in real-time with sub-second latency.',
    vehicleContext: {
      vin: 'SJNFAAJ10U1829102',
      model: '2024 Mercedes-AMG EQE SUV',
      metrics: [
        { label: 'Driver Intent', value: 'Querying Regen Fault', status: 'neutral' },
        { label: 'Synthesis', value: 'Formulating Action Plan', status: 'neutral' },
        { label: 'Latency', value: '42 ms response', status: 'ok' },
      ],
    },
  },
  {
    id: 'processing-info',
    title: '6. Processing Vehicle Information',
    subtitle: 'Certified Inspection Dossier Generation',
    recommendedVariant: 'light-02',
    recommendedState: 'complete',
    recommendedSize: 96,
    description: 'Finalizes multi-point diagnostic ledger, compiles digital inspection certificate, and cryptographically signs vehicle passport.',
    vehicleContext: {
      vin: 'SALWR2V42MA892019',
      model: '2024 Range Rover Sport EV',
      metrics: [
        { label: 'Passport Status', value: 'Cryptographically Signed', status: 'ok' },
        { label: 'Inspection Grade', value: 'Grade A+ (99.8/100)', status: 'ok' },
        { label: 'Escrow Lock', value: 'Verified Ready', status: 'ok' },
      ],
    },
  },
];

export const AutomotiveUseCases: React.FC<AutomotiveUseCasesProps> = ({ theme }) => {
  const isDark = theme === 'dark';
  const [selectedCaseId, setSelectedCaseId] = useState<string>('scan-vehicle');
  const [platformView, setPlatformView] = useState<'web' | 'mobile'>('web');

  const activeCase = USE_CASES.find((c) => c.id === selectedCaseId) || USE_CASES[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <Car className="w-5 h-5 text-purple-400" />
            <h2
              className="text-2xl font-bold tracking-tight"
              style={{ color: isDark ? '#F3EEFA' : '#1C1528' }}
            >
              Real-World Automotive Experiences
            </h2>
          </div>
          <p
            className="text-xs font-medium tracking-wide mt-1"
            style={{ color: isDark ? '#A193B8' : '#8A8A92' }}
          >
            Experience how the ALANN AI Orb naturally integrates into mission-critical vehicle software across Web and Mobile.
          </p>
        </div>

        {/* Platform Toggle: Web Dashboard vs Mobile Phone */}
        <div
          className="inline-flex p-1 rounded-xl gap-1 text-xs font-semibold self-start sm:self-auto"
          style={{ backgroundColor: isDark ? '#2A2138' : '#ECECF1' }}
        >
          <button
            onClick={() => setPlatformView('web')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all ${
              platformView === 'web' ? 'shadow-sm font-bold' : 'opacity-70 hover:opacity-100'
            }`}
            style={{
              backgroundColor:
                platformView === 'web'
                  ? isDark
                    ? '#560267'
                    : '#340549'
                  : 'transparent',
              color:
                platformView === 'web'
                  ? isDark
                    ? '#F3EEFA'
                    : '#FEFEFE'
                  : isDark
                  ? '#A193B8'
                  : '#1C1528',
            }}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Web Platform (Next.js)</span>
          </button>

          <button
            onClick={() => setPlatformView('mobile')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all ${
              platformView === 'mobile' ? 'shadow-sm font-bold' : 'opacity-70 hover:opacity-100'
            }`}
            style={{
              backgroundColor:
                platformView === 'mobile'
                  ? isDark
                    ? '#560267'
                    : '#340549'
                  : 'transparent',
              color:
                platformView === 'mobile'
                  ? isDark
                    ? '#F3EEFA'
                    : '#FEFEFE'
                  : isDark
                  ? '#A193B8'
                  : '#1C1528',
            }}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile Platform (React Native)</span>
          </button>
        </div>
      </div>

      {/* Navigation Pills for the 6 Use Cases */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-8">
        {USE_CASES.map((uc) => {
          const isSelected = uc.id === selectedCaseId;
          return (
            <button
              key={uc.id}
              onClick={() => setSelectedCaseId(uc.id)}
              className={`p-3 rounded-xl text-left border transition-all active:scale-95 ${
                isSelected ? 'shadow-md font-semibold' : 'opacity-75 hover:opacity-100'
              }`}
              style={{
                backgroundColor: isSelected
                  ? isDark
                    ? '#2A2138'
                    : '#ECECF1'
                  : isDark
                  ? '#15101F'
                  : '#FEFEFE',
                borderColor: isSelected
                  ? isDark
                    ? '#C084FC'
                    : '#720488'
                  : isDark
                  ? 'rgba(192, 132, 252, 0.12)'
                  : 'rgba(52, 5, 73, 0.1)',
              }}
            >
              <span
                className="text-[10px] font-mono block uppercase tracking-wider mb-1"
                style={{ color: isDark ? '#C084FC' : '#720488' }}
              >
                Use Case
              </span>
              <p
                className="text-xs font-bold leading-tight"
                style={{ color: isDark ? '#F3EEFA' : '#1C1528' }}
              >
                {uc.title.replace(/^\d+\.\s*/, '')}
              </p>
            </button>
          );
        })}
      </div>

      {/* Interactive Application Stage */}
      {platformView === 'web' ? (
        /* WEB PLATFORM SIMULATION: Desktop Automotive Cockpit Dashboard */
        <div
          className="rounded-3xl border overflow-hidden shadow-2xl transition-all"
          style={{
            backgroundColor: isDark ? '#15101F' : '#FEFEFE',
            borderColor: isDark ? 'rgba(192, 132, 252, 0.2)' : 'rgba(52, 5, 73, 0.15)',
          }}
        >
          {/* Mock Browser Title Bar */}
          <div
            className="px-6 py-3 border-b flex items-center justify-between text-xs"
            style={{
              backgroundColor: isDark ? '#2A2138' : '#ECECF1',
              borderColor: isDark ? 'rgba(192, 132, 252, 0.1)' : 'rgba(52, 5, 73, 0.08)',
            }}
          >
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400 opacity-80" />
              <div className="w-3 h-3 rounded-full bg-amber-400 opacity-80" />
              <div className="w-3 h-3 rounded-full bg-emerald-400 opacity-80" />
              <span className="ml-3 font-mono opacity-60 text-[11px]"
                style={{ color: isDark ? '#A193B8' : '#8A8A92' }}
              >
                https://portal.alann.ai/inspect/{activeCase.vehicleContext.vin}
              </span>
            </div>
            <div className="flex items-center gap-2 font-mono text-[11px]"
              style={{ color: isDark ? '#C084FC' : '#720488' }}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Next.js Canvas Engine (Hardware Accelerated)</span>
            </div>
          </div>

          {/* Web Dashboard Content */}
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              
              {/* Left Column: Vehicle Profile & Live Telemetry */}
              <div className="lg:col-span-1 space-y-4">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider"
                    style={{ color: isDark ? '#C084FC' : '#720488' }}
                  >
                    Active Vehicle Dossier
                  </span>
                  <h3 className="text-xl font-bold mt-1"
                    style={{ color: isDark ? '#F3EEFA' : '#1C1528' }}
                  >
                    {activeCase.vehicleContext.model}
                  </h3>
                  <p className="text-xs font-mono mt-0.5"
                    style={{ color: isDark ? '#A193B8' : '#8A8A92' }}
                  >
                    VIN: {activeCase.vehicleContext.vin}
                  </p>
                </div>

                <div className="space-y-2">
                  {activeCase.vehicleContext.metrics.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl flex items-center justify-between text-xs"
                      style={{
                        backgroundColor: isDark ? '#2A2138' : '#ECECF1',
                        border: isDark ? '1px solid rgba(192, 132, 252, 0.1)' : '1px solid rgba(52, 5, 73, 0.08)',
                      }}
                    >
                      <span style={{ color: isDark ? '#A193B8' : '#8A8A92' }}>{m.label}</span>
                      <span className="font-mono font-bold flex items-center gap-1.5"
                        style={{
                          color:
                            m.status === 'warning'
                              ? '#f59e0b'
                              : isDark
                              ? '#F3EEFA'
                              : '#1C1528',
                        }}
                      >
                        {m.status === 'ok' && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                        {m.status === 'warning' && <AlertCircle className="w-3 h-3 text-amber-400" />}
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Center Column: The AI Orb in Action */}
              <div
                className="lg:col-span-1 flex flex-col items-center justify-center p-8 rounded-3xl relative"
                style={{
                  backgroundColor: isDark ? '#000000' : '#FEFEFE',
                  border: isDark ? '1px solid rgba(192, 132, 252, 0.15)' : '1px solid rgba(52, 5, 73, 0.12)',
                  backgroundImage: isDark
                    ? 'radial-gradient(circle at center, rgba(86, 2, 103, 0.25) 0%, transparent 70%)'
                    : 'radial-gradient(circle at center, rgba(243, 235, 250, 0.9) 0%, transparent 70%)',
                }}
              >
                <div className="relative">
                  <AlannThinkingOrb
                    theme={theme}
                    variant={activeCase.recommendedVariant}
                    state={activeCase.recommendedState}
                    size={activeCase.recommendedSize * 1.5}
                    speed={1}
                  />
                </div>

                <div className="mt-4 text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold"
                    style={{
                      backgroundColor: isDark ? '#2A2138' : '#ECECF1',
                      color: isDark ? '#C084FC' : '#720488',
                    }}
                  >
                    <span className="w-2 h-2 rounded-full animate-ping"
                      style={{ backgroundColor: isDark ? '#C084FC' : '#720488' }}
                    />
                    <span>{activeCase.recommendedState.toUpperCase()} ACTIVE</span>
                  </div>
                  <p className="text-[11px] font-mono mt-1 opacity-70"
                    style={{ color: isDark ? '#A193B8' : '#8A8A92' }}
                  >
                    Variant: {activeCase.recommendedVariant}
                  </p>
                </div>
              </div>

              {/* Right Column: AI Intelligence Analysis Feed */}
              <div className="lg:col-span-1 space-y-4">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider"
                    style={{ color: isDark ? '#C084FC' : '#720488' }}
                  >
                    ALANN AI Stream
                  </span>
                  <h4 className="text-base font-bold mt-1"
                    style={{ color: isDark ? '#F3EEFA' : '#1C1528' }}
                  >
                    {activeCase.subtitle}
                  </h4>
                  <p className="text-xs leading-relaxed mt-1"
                    style={{ color: isDark ? '#A193B8' : '#1C1528' }}
                  >
                    {activeCase.description}
                  </p>
                </div>

                <div
                  className="p-4 rounded-2xl font-mono text-xs space-y-2 border"
                  style={{
                    backgroundColor: isDark ? '#000000' : '#ECECF1',
                    borderColor: isDark ? 'rgba(192, 132, 252, 0.15)' : 'rgba(52, 5, 73, 0.1)',
                    color: isDark ? '#A193B8' : '#1C1528',
                  }}
                >
                  <div className="flex items-center gap-1.5 opacity-60">
                    <Activity className="w-3 h-3 text-emerald-400" />
                    <span>[STREAM:INIT] Sensor sync established</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-purple-400">&gt;</span>
                    <span>Scanning vehicle coordinate lattice...</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-purple-400">&gt;</span>
                    <span className="font-semibold" style={{ color: isDark ? '#F3EEFA' : '#340549' }}>
                      Telemetry packet verified: 100% parity
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      ) : (
        /* MOBILE PLATFORM SIMULATION: React Native Smartphone Mockup */
        <div className="flex justify-center py-6">
          <div
            className="w-full max-w-[360px] rounded-[48px] border-[8px] p-4 shadow-2xl relative transition-all"
            style={{
              backgroundColor: isDark ? '#000000' : '#FEFEFE',
              borderColor: isDark ? '#2A2138' : '#ECECF1',
            }}
          >
            {/* Phone Notch / Dynamic Island */}
            <div className="w-28 h-5 rounded-full mx-auto mb-6 flex items-center justify-center"
              style={{ backgroundColor: isDark ? '#15101F' : '#ECECF1' }}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-neutral-800 mr-2" />
              <div className="w-1.5 h-1.5 rounded-full bg-neutral-700" />
            </div>

            {/* Mobile App Header with Compact AI Orb */}
            <div className="flex items-center justify-between pb-4 border-b mb-6"
              style={{
                borderColor: isDark ? 'rgba(192, 132, 252, 0.1)' : 'rgba(52, 5, 73, 0.08)',
              }}
            >
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider"
                  style={{ color: isDark ? '#C084FC' : '#720488' }}
                >
                  ALANN Mobile (Skia)
                </span>
                <h4 className="text-sm font-bold" style={{ color: isDark ? '#F3EEFA' : '#1C1528' }}>
                  Vehicle Copilot
                </h4>
              </div>

              {/* Compact 64px AI Orb inside Mobile Top Bar */}
              <div className="relative">
                <AlannThinkingOrb
                  theme={theme}
                  variant={activeCase.recommendedVariant}
                  state={activeCase.recommendedState}
                  size={48}
                  speed={1}
                />
              </div>
            </div>

            {/* Mobile Interactive Screen Body */}
            <div className="space-y-4">
              
              {/* Primary Mobile Orb Centerpiece */}
              <div
                className="py-8 rounded-3xl flex flex-col items-center justify-center relative overflow-hidden"
                style={{
                  backgroundColor: isDark ? '#15101F' : '#ECECF1',
                  border: isDark ? '1px solid rgba(192, 132, 252, 0.15)' : '1px solid rgba(52, 5, 73, 0.1)',
                }}
              >
                <AlannThinkingOrb
                  theme={theme}
                  variant={activeCase.recommendedVariant}
                  state={activeCase.recommendedState}
                  size={activeCase.recommendedSize}
                  speed={1}
                />

                <div className="mt-3 text-center">
                  <span className="text-[10px] font-mono uppercase tracking-widest font-bold px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: isDark ? '#2A2138' : '#FEFEFE',
                      color: isDark ? '#C084FC' : '#720488',
                    }}
                  >
                    {activeCase.recommendedState}
                  </span>
                  <p className="text-xs font-semibold mt-1" style={{ color: isDark ? '#F3EEFA' : '#1C1528' }}>
                    {activeCase.vehicleContext.model}
                  </p>
                </div>
              </div>

              {/* Mobile Quick Telemetry Card */}
              <div
                className="p-4 rounded-2xl space-y-2 text-xs"
                style={{
                  backgroundColor: isDark ? '#15101F' : '#ECECF1',
                }}
              >
                <div className="flex justify-between font-mono">
                  <span style={{ color: isDark ? '#A193B8' : '#8A8A92' }}>Scan Target:</span>
                  <span className="font-bold truncate ml-2" style={{ color: isDark ? '#F3EEFA' : '#1C1528' }}>
                    {activeCase.vehicleContext.vin}
                  </span>
                </div>
                <div className="flex justify-between font-mono">
                  <span style={{ color: isDark ? '#A193B8' : '#8A8A92' }}>Engine Status:</span>
                  <span className="text-emerald-400 font-bold">Connected • 60 FPS</span>
                </div>
              </div>

              {/* Mobile Action Button */}
              <button
                className="w-full py-3 rounded-xl font-bold text-xs text-white shadow-lg active:scale-95 transition-all"
                style={{
                  backgroundColor: isDark ? '#560267' : '#340549',
                  border: isDark ? '1px solid #C084FC' : '1px solid #720488',
                }}
              >
                Review Certified Diagnostics
              </button>

            </div>

            {/* Mobile Home Bar */}
            <div className="w-32 h-1 rounded-full mx-auto mt-6 bg-neutral-600 opacity-60" />

          </div>
        </div>
      )}

    </div>
  );
};

