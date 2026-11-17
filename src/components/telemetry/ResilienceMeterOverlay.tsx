import React, { useState, useEffect } from 'react';
import { Heart, AlertTriangle, Sparkles, Activity, ShieldAlert, ArrowRight, Zap, RefreshCw, Car, Utensils, Bot, Compass, Award, Flame, Scale, Brain, Camera, Share2 } from 'lucide-react';
import { sound } from '../../utils/audio';
import { getMentalStateAnalysis } from '../../data/stearSafeData';
import { ActiveMantraBuff } from '../../types/affirmation';
import { ReflectOnGrowthModal, GrowthReflection } from './ReflectOnGrowthModal';

interface ResilienceMeterOverlayProps {
  resilience: number;
  onUpdateResilience: (delta: number) => void;
  onOpenStearHub: (initialTab?: 'rides' | 'deliveries' | 'calendar') => void;
  onOpenMentorChat: () => void;
  onOpenTrivia?: () => void;
  onOpenAffirmations?: () => void;
  onOpenGoldie?: () => void;
  onOpenShareModal?: () => void;
  activeMantra?: ActiveMantraBuff | null;
}

export const ResilienceMeterOverlay: React.FC<ResilienceMeterOverlayProps> = ({
  resilience,
  onUpdateResilience,
  onOpenStearHub,
  onOpenMentorChat,
  onOpenTrivia,
  onOpenAffirmations,
  onOpenGoldie,
  onOpenShareModal,
  activeMantra,
}) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isReflectModalOpen, setIsReflectModalOpen] = useState(false);
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathCount, setBreathCount] = useState(4);
  const [lastThreshold, setLastThreshold] = useState<'critical' | 'peak' | 'normal'>('normal');

  const analysis = getMentalStateAnalysis(resilience);
  const isCritical = resilience < 30;
  const isPeak = resilience > 80;

  // Audio alert and ping when crossing critical or peak thresholds
  useEffect(() => {
    if (isCritical && lastThreshold !== 'critical') {
      sound.playAlert();
      setLastThreshold('critical');
    } else if (isPeak && lastThreshold !== 'peak') {
      sound.playSuccess();
      setLastThreshold('peak');
    } else if (!isCritical && !isPeak && lastThreshold !== 'normal') {
      setLastThreshold('normal');
    }
  }, [isCritical, isPeak, lastThreshold]);

  // Breathing reset exercise handler
  const handleStartBreathwork = () => {
    sound.playClick();
    setBreathingActive(true);
    setBreathCount(4);
    const interval = setInterval(() => {
      setBreathCount((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setBreathingActive(false);
          onUpdateResilience(10);
          sound.playSuccess();
          return 4;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="relative">
      {/* Visual Animation Overlay on the Stat Card */}
      <div
        className={`relative p-3 rounded-xl transition-all duration-500 overflow-hidden ${
          isCritical
            ? 'bg-gradient-to-br from-red-950/90 via-slate-950 to-slate-900 border-2 border-red-500 shadow-[0_0_25px_rgba(239,68,68,0.45)] ring-2 ring-red-500/40'
            : isPeak
            ? 'bg-gradient-to-br from-emerald-950/80 via-slate-950 to-teal-950/70 border-2 border-emerald-400 shadow-[0_0_28px_rgba(52,211,153,0.35)] ring-2 ring-emerald-400/40'
            : 'bg-slate-950 border border-slate-800/80 hover:border-slate-700'
        }`}
      >
        {/* Animated Background Waves / Vignette */}
        {isCritical && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -inset-1 bg-red-600/10 animate-pulse rounded-xl" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/15 rounded-full blur-2xl animate-ping opacity-60" />
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-rose-600/20 rounded-full blur-xl animate-pulse" />
          </div>
        )}

        {isPeak && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -inset-1 bg-emerald-500/10 rounded-xl" />
            <div className="absolute -top-10 -right-10 w-36 h-36 bg-emerald-400/20 rounded-full blur-2xl animate-pulse" />
            <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-teal-400/15 rounded-full blur-xl" />
          </div>
        )}

        {/* Card Header & Values */}
        <div className="relative z-10 space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-3.5 w-3.5">
                {isCritical ? (
                  <>
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                    <AlertTriangle className="relative inline-flex h-3.5 w-3.5 text-red-400" />
                  </>
                ) : isPeak ? (
                  <>
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                    <Sparkles className="relative inline-flex h-3.5 w-3.5 text-emerald-400" />
                  </>
                ) : (
                  <Heart className="w-3.5 h-3.5 text-rose-400" />
                )}
              </span>

              <span
                className={`font-semibold tracking-wide ${
                  isCritical ? 'text-red-300' : isPeak ? 'text-emerald-300' : 'text-rose-300'
                }`}
              >
                Resilience Meter
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <span
                className={`font-mono font-bold text-sm tabular-nums px-1.5 py-0.5 rounded ${
                  isCritical
                    ? 'text-red-200 bg-red-900/60 border border-red-500/60 animate-pulse'
                    : isPeak
                    ? 'text-emerald-200 bg-emerald-900/50 border border-emerald-400/60'
                    : 'text-rose-400'
                }`}
              >
                {resilience}%
              </span>
            </div>
          </div>

          {/* Progress Bar with dynamic gradients and pulse styling */}
          <div className="w-full h-2 bg-slate-900/90 rounded-full overflow-hidden p-0.5 border border-slate-800">
            <div
              style={{ width: `${resilience}%` }}
              className={`h-full rounded-full transition-all duration-500 ${
                isCritical
                  ? 'bg-gradient-to-r from-red-600 via-rose-500 to-amber-500 shadow-[0_0_10px_rgba(239,68,68,0.8)] animate-pulse'
                  : isPeak
                  ? 'bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-300 shadow-[0_0_12px_rgba(52,211,153,0.7)]'
                  : 'bg-gradient-to-r from-rose-500 to-amber-400'
              }`}
            />
          </div>

            {/* Direct Mental State Feedback Badge */}
          <div className="pt-0.5 space-y-1">
            {isCritical ? (
              <div className="flex items-center justify-between gap-1 text-[10px] text-red-300 bg-red-950/70 border border-red-500/40 rounded px-2 py-1">
                <div className="flex items-center gap-1 truncate font-medium">
                  <ShieldAlert className="w-3 h-3 text-red-400 shrink-0 animate-bounce" />
                  <span className="truncate">CRITICAL STRAIN (&lt;30%) · Burnout Imminent</span>
                </div>
                <button
                  onClick={() => setIsDetailsOpen(true)}
                  className="text-red-200 hover:text-white underline shrink-0 font-bold ml-1 cursor-pointer"
                >
                  Feedback
                </button>
              </div>
            ) : isPeak ? (
              <div className="flex items-center justify-between gap-1 text-[10px] text-emerald-300 bg-emerald-950/70 border border-emerald-500/40 rounded px-2 py-1">
                <div className="flex items-center gap-1 truncate font-medium">
                  <Zap className="w-3 h-3 text-emerald-300 shrink-0" />
                  <span className="truncate">PEAK FLOW (&gt;80%) · Unshakable Fortitude</span>
                </div>
                <button
                  onClick={() => setIsDetailsOpen(true)}
                  className="text-emerald-200 hover:text-white underline shrink-0 font-bold ml-1 cursor-pointer"
                >
                  Feedback
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between text-[10px] text-slate-400 px-0.5">
                <span className="flex items-center gap-1 font-mono">
                  <Activity className="w-2.5 h-2.5 text-cyan-400" />
                  State: Balanced Focus (30-80%)
                </span>
                <button
                  onClick={() => setIsDetailsOpen(true)}
                  className="text-cyan-400 hover:text-cyan-300 text-[10px] cursor-pointer"
                >
                  Telemetry
                </button>
              </div>
            )}

            {/* Active Mantra Buff Badge */}
            {activeMantra && (
              <div
                onClick={() => {
                  sound.playClick();
                  if (onOpenAffirmations) onOpenAffirmations();
                }}
                className="flex items-center justify-between gap-1 text-[10px] text-amber-200 bg-amber-950/60 border border-amber-500/40 rounded px-2 py-1 cursor-pointer hover:bg-amber-950/90 transition-colors shadow-sm"
                title="Click to view Affirmation Deck & Mantra Details"
              >
                <div className="flex items-center gap-1.5 truncate">
                  <Sparkles className="w-3 h-3 text-amber-400 shrink-0 animate-spin" style={{ animationDuration: '6s' }} />
                  <span className="truncate font-serif italic text-amber-100">
                    Mantra: "{activeMantra.mantraText}"
                  </span>
                </div>
                <span className="text-emerald-300 font-mono font-bold shrink-0 text-[9px] bg-emerald-950/80 px-1 py-0.2 rounded border border-emerald-500/40">
                  +5% Buff
                </span>
              </div>
            )}
          </div>

          {/* Action Buttons: Reflect on Growth & Social Media Snapshot */}
          <div className="grid grid-cols-2 gap-1.5 mt-1.5">
            <button
              onClick={() => {
                sound.playClick();
                setIsReflectModalOpen(true);
              }}
              className="py-1.5 px-1.5 bg-gradient-to-r from-emerald-950/90 to-teal-900/60 hover:from-emerald-900 hover:to-teal-800 text-emerald-200 border border-emerald-500/40 hover:border-emerald-400 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1 transition-all shadow-sm cursor-pointer group"
              title="Reflect on a recent challenge to permanently boost resilience (+5%)"
            >
              <Brain className="w-3 h-3 text-emerald-400 group-hover:scale-110 transition-transform shrink-0" />
              <span className="truncate">Reflect (+5%)</span>
            </button>

            {onOpenShareModal && (
              <button
                onClick={() => {
                  sound.playClick();
                  onOpenShareModal();
                }}
                className="py-1.5 px-1.5 bg-gradient-to-r from-cyan-950/90 to-blue-900/60 hover:from-cyan-900 hover:to-blue-800 text-cyan-200 border border-cyan-500/40 hover:border-cyan-400 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1 transition-all shadow-sm cursor-pointer group"
                title="Generate high-resolution social media card snapshot of Resilience and STEAM stats"
              >
                <Camera className="w-3 h-3 text-cyan-400 group-hover:scale-110 transition-transform shrink-0" />
                <span className="truncate">Share Card</span>
              </button>
            )}
          </div>

          {/* Quick Interactive Testing & Rescue Bar */}
          <div className="pt-1 flex items-center justify-between border-t border-slate-800/60 text-[10px]">
            <span className="text-slate-500 font-mono text-[9px]">Simulate:</span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  sound.playClick();
                  onUpdateResilience(-15);
                }}
                className="px-1.5 py-0.5 rounded bg-slate-900 hover:bg-red-950 hover:text-red-300 border border-slate-800 text-slate-400 text-[9px] transition-colors"
                title="Simulate Fatigue (-15%)"
              >
                -15%
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  onUpdateResilience(20 - resilience); // set to 20%
                }}
                className="px-1.5 py-0.5 rounded bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-800/60 text-[9px] font-bold transition-colors"
                title="Test Critical &lt;30% State"
              >
                &lt;30%
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  onUpdateResilience(65 - resilience); // set to 65%
                }}
                className="px-1.5 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-[9px] transition-colors"
                title="Test Balanced 65% State"
              >
                65%
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  onUpdateResilience(88 - resilience); // set to 88%
                }}
                className="px-1.5 py-0.5 rounded bg-emerald-950/60 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/60 text-[9px] font-bold transition-colors"
                title="Test Peak &gt;80% State"
              >
                &gt;80%
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  onUpdateResilience(15);
                }}
                className="px-1.5 py-0.5 rounded bg-slate-900 hover:bg-emerald-950 hover:text-emerald-300 border border-slate-800 text-slate-400 text-[9px] transition-colors"
                title="Boost Resilience (+15%)"
              >
                +15%
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Direct Mental Feedback & Resilience Support Modal */}
      {isDetailsOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Ambient Background Radial */}
            <div
              className={`absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl pointer-events-none ${
                isCritical ? 'bg-red-500/20' : isPeak ? 'bg-emerald-500/20' : 'bg-cyan-500/15'
              }`}
            />

            <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div
                  className={`p-2 rounded-xl border ${
                    isCritical
                      ? 'bg-red-950/80 border-red-500/60 text-red-400'
                      : isPeak
                      ? 'bg-emerald-950/80 border-emerald-500/60 text-emerald-400'
                      : 'bg-slate-800 border-slate-700 text-cyan-400'
                  }`}
                >
                  {isCritical ? <ShieldAlert className="w-5 h-5" /> : isPeak ? <Sparkles className="w-5 h-5" /> : <Activity className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white tracking-wide">
                    Player Mental State &amp; Resilience Telemetry
                  </h3>
                  <p className="text-xs text-slate-400">Direct Cognitive Feedback · Jeanell Land Biometrics</p>
                </div>
              </div>
              <button
                onClick={() => {
                  sound.playClick();
                  setIsDetailsOpen(false);
                }}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 text-xs font-semibold cursor-pointer"
              >
                ✕ Close
              </button>
            </div>

            {/* Current State Diagnostic Box */}
            <div
              className={`p-4 rounded-xl border mb-5 transition-all ${
                isCritical
                  ? 'bg-red-950/40 border-red-500/50 shadow-inner text-red-200'
                  : isPeak
                  ? 'bg-emerald-950/40 border-emerald-500/50 shadow-inner text-emerald-200'
                  : 'bg-slate-950 border-slate-800 text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase font-mono tracking-wider font-bold">
                  {analysis.headline}
                </span>
                <span className="text-sm font-mono font-bold px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                  {resilience}% Resilience
                </span>
              </div>
              <p className="text-xs leading-relaxed text-slate-300 mb-3">{analysis.description}</p>
              <div className="p-2.5 rounded-lg bg-black/40 border border-white/10 text-xs text-slate-200 flex items-start gap-2">
                <Zap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-amber-300">Prescribed Action: </span>
                  {analysis.recommendedAction}
                </div>
              </div>
            </div>

            {/* Direct Rescue Actions Integrated with S-T-E-A-R Safe */}
            <div className="space-y-3 mb-5">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <span>Immediate Mental Fortitude Actions</span>
                <span className="text-[10px] font-normal text-slate-500">(Powered by S-T-E-A-R Safe)</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {/* Action 0: Reflect on Growth & Permanent Boost */}
                <button
                  onClick={() => {
                    sound.playClick();
                    setIsDetailsOpen(false);
                    setIsReflectModalOpen(true);
                  }}
                  className="sm:col-span-2 flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-emerald-950/80 via-slate-950 to-teal-950/80 hover:from-emerald-900/90 hover:to-teal-900/90 border border-emerald-500/50 hover:border-emerald-400 text-left transition-all group cursor-pointer shadow-lg shadow-emerald-500/10"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 group-hover:scale-105 transition-transform">
                      <Brain className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <span>Reflect on Growth (Cognitive Reframing)</span>
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
                          +5% Permanent Boost
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-300">
                        Write what you learned from a recent challenge to permanently expand mental fortitude
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Action 0.5: Share Stats & Social Snapshot */}
                {onOpenShareModal && (
                  <button
                    onClick={() => {
                      sound.playClick();
                      setIsDetailsOpen(false);
                      onOpenShareModal();
                    }}
                    className="sm:col-span-2 flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-cyan-950/80 via-slate-950 to-blue-950/80 hover:from-cyan-900/90 hover:to-blue-900/90 border border-cyan-500/50 hover:border-cyan-400 text-left transition-all group cursor-pointer shadow-lg shadow-cyan-500/10"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-lg bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 group-hover:scale-105 transition-transform">
                        <Camera className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-1.5">
                          <span>Social Media Snapshot Generator</span>
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold">
                            HD Share Card
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-300">
                          Create 1200x630 card of your Resilience ({resilience}%) &amp; STEAM Mastery for X, LinkedIn, or Instagram
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                  </button>
                )}

                {/* Action 1: S-T-E-A-R Safe Ride */}
                <button
                  onClick={() => {
                    sound.playClick();
                    setIsDetailsOpen(false);
                    onOpenStearHub('rides');
                  }}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-cyan-500/40 text-left transition-all group cursor-pointer"
                >
                  <div className="p-2 rounded-lg bg-cyan-950/70 border border-cyan-500/40 text-cyan-400 group-hover:scale-105 transition-transform">
                    <Car className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-white flex items-center gap-1">
                      <span>Book Safe Ride</span>
                      <ArrowRight className="w-3 h-3 text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                    <div className="text-[11px] text-slate-400">Escort home / campus (+10% Stamina)</div>
                  </div>
                </button>

                {/* Action 2: Brain Food Delivery */}
                <button
                  onClick={() => {
                    sound.playClick();
                    setIsDetailsOpen(false);
                    onOpenStearHub('deliveries');
                  }}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-emerald-500/40 text-left transition-all group cursor-pointer"
                >
                  <div className="p-2 rounded-lg bg-emerald-950/70 border border-emerald-500/40 text-emerald-400 group-hover:scale-105 transition-transform">
                    <Utensils className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-white flex items-center gap-1">
                      <span>Order Brain Food</span>
                      <ArrowRight className="w-3 h-3 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                    <div className="text-[11px] text-slate-400">Omega-3 meal drop (+15% Resilience)</div>
                  </div>
                </button>

                {/* Action 3: Guided Breathwork Decompression */}
                <button
                  onClick={handleStartBreathwork}
                  disabled={breathingActive}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-amber-500/40 text-left transition-all group cursor-pointer"
                >
                  <div className="p-2 rounded-lg bg-amber-950/70 border border-amber-500/40 text-amber-400 group-hover:scale-105 transition-transform">
                    <RefreshCw className={`w-4 h-4 ${breathingActive ? 'animate-spin' : ''}`} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-white">
                      {breathingActive ? `Breathe In... (${breathCount}s)` : 'Decompression Breathwork'}
                    </div>
                    <div className="text-[11px] text-slate-400">Instant vagal reset (+10% Resilience)</div>
                  </div>
                </button>

                {/* Action 4: Ask Mentor Jeanell */}
                <button
                  onClick={() => {
                    sound.playClick();
                    setIsDetailsOpen(false);
                    onOpenMentorChat();
                  }}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-blue-500/40 text-left transition-all group cursor-pointer"
                >
                  <div className="p-2 rounded-lg bg-blue-950/70 border border-blue-500/40 text-blue-400 group-hover:scale-105 transition-transform">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-white flex items-center gap-1">
                      <span>Call Mentor Jeanell</span>
                      <ArrowRight className="w-3 h-3 text-blue-400 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                    <div className="text-[11px] text-slate-400">Engineering &amp; life guidance</div>
                  </div>
                </button>

                {/* Action 5: Jeanell's Historical Trivia Challenge */}
                {onOpenTrivia && (
                  <button
                    onClick={() => {
                      sound.playClick();
                      setIsDetailsOpen(false);
                      onOpenTrivia();
                    }}
                    className="sm:col-span-2 flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-amber-950/70 via-slate-950 to-indigo-950/70 hover:from-amber-900/80 hover:to-indigo-900/80 border border-amber-500/40 hover:border-amber-400 text-left transition-all group cursor-pointer shadow-lg shadow-amber-500/10"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-lg bg-amber-500/20 border border-amber-500/50 text-amber-400 group-hover:scale-105 transition-transform">
                        <Compass className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-1.5">
                          <span>Jeanell's Historical Journey Daily Trivia</span>
                          <span className="px-1.5 py-0.2 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded text-[10px]">
                            Recommended
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-300">
                          Answer aeronautical &amp; real estate milestones to gain <strong className="text-rose-400">+15 to +25 Resilience Points</strong>
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform shrink-0" />
                  </button>
                )}

                {/* Action 6: Affirmation Deck & Daily Mantra */}
                {onOpenAffirmations && (
                  <button
                    onClick={() => {
                      sound.playClick();
                      setIsDetailsOpen(false);
                      onOpenAffirmations();
                    }}
                    className="sm:col-span-2 flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-emerald-950/70 via-slate-950 to-teal-950/70 hover:from-emerald-900/80 hover:to-teal-900/80 border border-emerald-500/40 hover:border-emerald-400 text-left transition-all group cursor-pointer shadow-lg shadow-emerald-500/10"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-lg bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 group-hover:scale-105 transition-transform">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-1.5">
                          <span>Jeanell's Affirmation Deck &amp; Daily Mantras</span>
                          <span className="px-1.5 py-0.2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded text-[10px]">
                            +5% Buff
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-300">
                          Draw resilient quotes from historical turning points and activate a <strong className="text-emerald-400">+5% Resilience Buff</strong>
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform shrink-0" />
                  </button>
                )}

                {/* Action 7: Jeanell vs Goldie (Crucible of Transformation) */}
                {onOpenGoldie && (
                  <button
                    onClick={() => {
                      sound.playClick();
                      setIsDetailsOpen(false);
                      onOpenGoldie();
                    }}
                    className="sm:col-span-2 flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-rose-950/70 via-slate-950 to-amber-950/70 hover:from-rose-900/80 hover:to-amber-900/80 border border-rose-500/40 hover:border-rose-400 text-left transition-all group cursor-pointer shadow-lg shadow-rose-500/10"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-lg bg-rose-500/20 border border-rose-500/50 text-rose-400 group-hover:scale-105 transition-transform">
                        <Flame className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-1.5">
                          <span>Jeanell vs. Goldie: The Crucible of Transformation</span>
                          <span className="px-1.5 py-0.2 bg-rose-500/20 text-rose-300 border border-rose-500/40 rounded text-[10px]">
                            Biographical Rebirth
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-300">
                          Reflect on teen motherhood, 6-year cab shifts, false arrest, and retiring Goldie to become a licensed foster parent (<strong className="text-rose-300">+15 to +50 Resilience</strong>)
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-rose-400 group-hover:translate-x-1 transition-transform shrink-0" />
                  </button>
                )}
              </div>
            </div>

            {/* Test Simulation Controls */}
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">Test Resilience Level:</span>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    sound.playClick();
                    onUpdateResilience(20 - resilience);
                  }}
                  className="px-2.5 py-1 bg-red-950 text-red-300 border border-red-800 rounded font-semibold text-xs hover:bg-red-900 transition-colors cursor-pointer"
                >
                  20% Critical
                </button>
                <button
                  onClick={() => {
                    sound.playClick();
                    onUpdateResilience(65 - resilience);
                  }}
                  className="px-2.5 py-1 bg-slate-800 text-slate-200 border border-slate-700 rounded font-semibold text-xs hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  65% Normal
                </button>
                <button
                  onClick={() => {
                    sound.playClick();
                    onUpdateResilience(90 - resilience);
                  }}
                  className="px-2.5 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded font-semibold text-xs hover:bg-emerald-900 transition-colors cursor-pointer"
                >
                  90% Peak Flow
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reflect on Growth Modal */}
      <ReflectOnGrowthModal
        isOpen={isReflectModalOpen}
        onClose={() => setIsReflectModalOpen(false)}
        onApplyBoost={(boost) => {
          onUpdateResilience(boost);
        }}
        currentResilience={resilience}
        onOpenShareModal={onOpenShareModal}
      />
    </div>
  );
};
