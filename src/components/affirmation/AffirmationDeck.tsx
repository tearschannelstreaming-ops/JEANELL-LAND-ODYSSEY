import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Heart,
  Shield,
  Plane,
  Building2,
  Award,
  Zap,
  Volume2,
  VolumeX,
  Copy,
  Check,
  RotateCcw,
  Compass,
  ArrowRight,
  BookOpen,
  Clock,
  Search,
  Filter,
  CheckCircle2,
  Bookmark,
  Share2,
  Play,
  Pause,
} from 'lucide-react';
import { HistoricalTurningPoint, AffirmationMantra, ActiveMantraBuff, TurningPointEra } from '../../types/affirmation';
import { PlayerStats } from '../../types/game';
import { HISTORICAL_TURNING_POINTS, getDailyTurningPoint } from '../../data/affirmationData';
import { sound } from '../../utils/audio';

interface AffirmationDeckProps {
  playerStats: PlayerStats;
  onUpdateStats: (delta: Partial<PlayerStats>) => void;
  activeMantra: ActiveMantraBuff | null;
  onSetActiveMantra: (mantra: ActiveMantraBuff | null) => void;
  onOpenTrivia?: () => void;
  onOpenStearSafe?: () => void;
  onReturnToMap?: () => void;
}

export const AffirmationDeck: React.FC<AffirmationDeckProps> = ({
  playerStats,
  onUpdateStats,
  activeMantra,
  onSetActiveMantra,
  onOpenTrivia,
  onOpenStearSafe,
  onReturnToMap,
}) => {
  // Navigation tabs within Affirmation Deck
  const [deckView, setDeckView] = useState<'daily' | 'archive' | 'mindful'>('daily');

  // Currently focused turning point card
  const [selectedPoint, setSelectedPoint] = useState<HistoricalTurningPoint>(() => getDailyTurningPoint(0));
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEra, setSelectedEra] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [justActivatedId, setJustActivatedId] = useState<string | null>(null);

  // Mindful breathing session states
  const [isBreathingActive, setIsBreathingActive] = useState<boolean>(false);
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');
  const [breathTimer, setBreathTimer] = useState<number>(4);

  // Time remaining on active buff
  const [timeLeftStr, setTimeLeftStr] = useState<string>('');

  // Calculate remaining buff time
  useEffect(() => {
    if (!activeMantra) {
      setTimeLeftStr('');
      return;
    }

    const updateTimer = () => {
      const now = Date.now();
      const diffMs = activeMantra.expiresAt - now;
      if (diffMs <= 0) {
        onSetActiveMantra(null);
        setTimeLeftStr('');
      } else {
        const mins = Math.floor(diffMs / 60000);
        const secs = Math.floor((diffMs % 60000) / 1000);
        setTimeLeftStr(`${mins}:${secs < 10 ? '0' : ''}${secs}`);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [activeMantra, onSetActiveMantra]);

  // Guided breathing loop
  useEffect(() => {
    if (!isBreathingActive) return;

    const interval = setInterval(() => {
      setBreathTimer((prev) => {
        if (prev > 1) {
          return prev - 1;
        } else {
          // Switch phases: Inhale (4s) -> Hold (4s) -> Exhale (4s)
          setBreathPhase((current) => {
            if (current === 'Inhale') return 'Hold';
            if (current === 'Hold') return 'Exhale';
            return 'Inhale';
          });
          return 4;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isBreathingActive]);

  // Audio quote speaker using Web Speech API
  const handleSpeakQuote = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      sound.playPing();
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.92;
      utterance.pitch = 1.05;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    } catch {
      setIsSpeaking(false);
    }
  };

  // Copy text to clipboard
  const handleCopyText = (text: string, id: string) => {
    try {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      sound.playPing();
      setTimeout(() => setCopiedId(null), 2000);
    } catch {}
  };

  // Handle selecting a mantra
  const handleSelectMantra = (point: HistoricalTurningPoint, mantra: AffirmationMantra) => {
    sound.playMantraChime();

    const durationMinutes = 15;
    const now = Date.now();
    const newBuff: ActiveMantraBuff = {
      id: `buff-${Date.now()}`,
      mantraId: mantra.id,
      mantraText: mantra.text,
      theme: mantra.theme,
      turningPointId: point.id,
      turningPointTitle: point.title,
      date: point.date,
      buffPercent: mantra.resilienceBonusPercent,
      activatedAt: now,
      durationMinutes,
      expiresAt: now + durationMinutes * 60 * 1000,
    };

    onSetActiveMantra(newBuff);
    // Grant immediate +5 resilience (temporary buff boost)
    onUpdateStats({ resilience: 5 });

    setJustActivatedId(mantra.id);
    setTimeout(() => setJustActivatedId(null), 3000);
  };

  // Filter turning points for archive
  const filteredPoints = HISTORICAL_TURNING_POINTS.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.coreQuote.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.historicalCrucible.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesEra = selectedEra === 'all' || p.era === selectedEra;
    return matchesSearch && matchesEra;
  });

  const getEraBadgeColor = (era: TurningPointEra) => {
    switch (era) {
      case 'University & Aeronautics':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
      case 'Real Estate & Wealth':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Youth & Foundations':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      case 'Patents & Inventions':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'Civic Leadership & Legacy':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      default:
        return 'bg-slate-700/50 text-slate-300 border-slate-600/30';
    }
  };

  const getThemeBadgeColor = (theme: string) => {
    switch (theme) {
      case 'Aeronautical Poise':
        return 'text-cyan-400 bg-cyan-950/60 border-cyan-500/40';
      case 'Grounded Community':
        return 'text-emerald-400 bg-emerald-950/60 border-emerald-500/40';
      case 'Tenacity & Vision':
        return 'text-amber-400 bg-amber-950/60 border-amber-500/40';
      case 'Strategic Mindset':
        return 'text-indigo-400 bg-indigo-950/60 border-indigo-500/40';
      default:
        return 'text-slate-300 bg-slate-900 border-slate-700';
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn max-w-7xl mx-auto px-4 sm:px-6">
      {/* Top Hero Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-slate-950 via-indigo-950/70 to-slate-950 border border-indigo-900/40 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
              Jeanell's Affirmation Deck · Historical Turning Points
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              Daily Resilience Mantras
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 font-mono font-medium">
                +5% Buff Available
              </span>
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed">
              Draw positive, resilience-building wisdom from the pivotal crucibles Jeanell Land faced across her
              aeronautical engineering, real estate investing, and civic leadership journey. Choose an active{' '}
              <span className="text-amber-300 font-medium">Daily Mantra</span> to bestow a temporary{' '}
              <strong className="text-emerald-400 font-semibold">+5% resilience buff</strong> to protect against fatigue and
              spark peak flow state.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center">
                <Heart className="w-5 h-5 text-rose-400" />
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-slate-400">Current Resilience</div>
                <div className="text-lg font-bold font-mono text-white flex items-center gap-2">
                  <span>{playerStats.resilience}%</span>
                  {activeMantra && (
                    <span className="text-xs font-normal text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/40">
                      +5% Buff Active
                    </span>
                  )}
                </div>
              </div>
            </div>

            {onOpenTrivia && (
              <button
                onClick={() => {
                  sound.playClick();
                  onOpenTrivia();
                }}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl text-xs font-semibold transition-all shadow-md cursor-pointer"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Test in Daily Trivia</span>
              </button>
            )}
          </div>
        </div>

        {/* ACTIVE MANTRA NOTIFICATION BAR */}
        {activeMantra ? (
          <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-emerald-950/40 -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 p-4 sm:px-8 border-b border-emerald-500/30">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4 text-emerald-300 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    Active Mantra Buff (+5% Resilience)
                  </span>
                  <span className="text-[11px] font-mono text-emerald-200 bg-emerald-900/60 px-2 py-0.5 rounded-full border border-emerald-500/40 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-emerald-400" />
                    {timeLeftStr || '15:00'} remaining
                  </span>
                </div>
                <p className="text-sm font-serif italic text-white mt-0.5 font-medium">
                  "{activeMantra.mantraText}"
                </p>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Turning Point: {activeMantra.turningPointTitle} ({activeMantra.date})
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => {
                  sound.playClick();
                  setDeckView('mindful');
                }}
                className="px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Heart className="w-3.5 h-3.5 text-emerald-400" />
                <span>Mindful Breathing</span>
              </button>
              <button
                onClick={() => handleSpeakQuote(activeMantra.mantraText)}
                className="p-2 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 rounded-lg transition-colors cursor-pointer"
                title="Recite Mantra"
              >
                <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              No mantra currently chosen today. Select one below to activate your +5% resilience buff!
            </span>
            <button
              onClick={() => {
                sound.playClick();
                setSelectedPoint(getDailyTurningPoint(0));
                setDeckView('daily');
              }}
              className="text-amber-400 hover:text-amber-300 font-medium underline cursor-pointer"
            >
              Draw Today's Card
            </button>
          </div>
        )}
      </div>

      {/* Subnavigation Tabs */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sound.playClick();
              setDeckView('daily');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              deckView === 'daily'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Today's Turning Point Card</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setDeckView('archive');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              deckView === 'archive'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Browse Full Deck ({HISTORICAL_TURNING_POINTS.length} Turning Points)</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setDeckView('mindful');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              deckView === 'mindful'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>Mindful Reflection & Mantras</span>
          </button>
        </div>

        <div className="text-xs text-slate-500 font-mono">
          Card #{selectedPoint.dayNumber} of {HISTORICAL_TURNING_POINTS.length}
        </div>
      </div>

      {/* VIEW 1: DAILY TURNING POINT CARD */}
      {deckView === 'daily' && (
        <div className="space-y-6">
          {/* Main Turning Point Card */}
          <div className="bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-2 border-amber-500/30 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
            {/* Ambient decorative elements */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

            {/* Card Header & Era metadata */}
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-xs px-2.5 py-0.5 rounded-full border font-medium ${getEraBadgeColor(selectedPoint.era)}`}>
                    {selectedPoint.era}
                  </span>
                  <span className="text-xs text-amber-400/90 font-mono font-medium">
                    {selectedPoint.date}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {selectedPoint.title}
                </h2>
                <div className="text-xs text-slate-400">{selectedPoint.subtitle}</div>
              </div>

              {/* Quick Actions on the Card */}
              <div className="flex items-center gap-2 self-start sm:self-center">
                <button
                  onClick={() => handleSpeakQuote(selectedPoint.coreQuote)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition-colors cursor-pointer ${
                    isSpeaking
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 animate-pulse'
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-700'
                  }`}
                  title="Listen to quote"
                >
                  <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{isSpeaking ? 'Reading...' : 'Listen'}</span>
                </button>

                <button
                  onClick={() => handleCopyText(`"${selectedPoint.coreQuote}" — Jeanell Land (${selectedPoint.date})`, selectedPoint.id)}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Copy quote"
                >
                  {copiedId === selectedPoint.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Quote of the Day Presentation */}
            <div className="relative z-10 my-6 bg-gradient-to-r from-amber-950/20 via-slate-900/60 to-amber-950/20 border-l-4 border-amber-400 rounded-r-xl p-5 sm:p-6">
              <div className="text-amber-400/40 text-4xl font-serif select-none -mb-3 leading-none">“</div>
              <p className="text-lg sm:text-xl font-serif italic text-amber-100/95 leading-relaxed font-normal">
                {selectedPoint.coreQuote}
              </p>
              <div className="mt-3 flex items-center justify-between text-xs text-amber-300/80 pt-2 border-t border-amber-500/10">
                <span className="font-semibold">— Jeanell Land</span>
                <span className="text-slate-400 font-sans italic">{selectedPoint.quoteContext}</span>
              </div>
            </div>

            {/* Historical Crucible & Triumph Breakdown */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-slate-950/80 border border-red-500/20 rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-red-400 uppercase tracking-wider">
                  <Shield className="w-3.5 h-3.5" />
                  <span>The Crucible Faced</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {selectedPoint.historicalCrucible}
                </p>
              </div>

              <div className="bg-slate-950/80 border border-emerald-500/20 rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  <Award className="w-3.5 h-3.5" />
                  <span>The Breakthrough & Lesson</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {selectedPoint.turningPointOutcome}
                </p>
              </div>
            </div>

            {/* SELECTABLE MANTRAS SECTION */}
            <div className="relative z-10 space-y-4 pt-4 border-t border-slate-800">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    Choose Your Mantra for This Turning Point
                  </h3>
                  <p className="text-xs text-slate-400">
                    Adopt one mantra below to receive your daily <strong className="text-emerald-400">+5% resilience buff</strong>.
                  </p>
                </div>
                <div className="text-xs text-amber-400 font-mono">
                  Select 1 Active Mantra
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {selectedPoint.mantras.map((mantra) => {
                  const isCurrentActive = activeMantra?.mantraId === mantra.id;
                  const wasJustActivated = justActivatedId === mantra.id;

                  return (
                    <div
                      key={mantra.id}
                      className={`relative rounded-xl p-4 transition-all duration-300 flex flex-col justify-between border ${
                        isCurrentActive
                          ? 'bg-gradient-to-b from-emerald-950/80 to-slate-950 border-emerald-400 ring-2 ring-emerald-400/30 shadow-lg'
                          : 'bg-slate-900/60 hover:bg-slate-900 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {/* Active / Just Activated Badge */}
                      {isCurrentActive && (
                        <div className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-bold text-[10px] uppercase tracking-wider flex items-center gap-1 shadow">
                          <Check className="w-3 h-3 stroke-[3]" />
                          <span>Active Mantra (+5%)</span>
                        </div>
                      )}

                      <div className="space-y-2">
                        <span className={`text-[10px] px-2 py-0.5 rounded border font-medium inline-block ${getThemeBadgeColor(mantra.theme)}`}>
                          {mantra.theme}
                        </span>
                        <p className="text-sm font-serif italic text-white font-medium leading-snug">
                          "{mantra.text}"
                        </p>
                        <p className="text-[11px] text-slate-400 leading-normal">
                          {mantra.affirmationFocus}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                        <span className="text-[11px] font-mono text-emerald-400 font-bold">
                          +{mantra.resilienceBonusPercent}% Buff
                        </span>

                        <button
                          onClick={() => handleSelectMantra(selectedPoint, mantra)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                            isCurrentActive
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/50 hover:bg-emerald-500/30'
                              : wasJustActivated
                              ? 'bg-emerald-500 text-slate-950'
                              : 'bg-amber-500/10 hover:bg-amber-500 text-amber-300 hover:text-slate-950 border border-amber-500/40'
                          }`}
                        >
                          {isCurrentActive ? (
                            <>
                              <Check className="w-3 h-3" />
                              <span>Chosen</span>
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-3 h-3" />
                              <span>Choose Mantra</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tags footer */}
            <div className="relative z-10 mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between flex-wrap gap-2 text-xs">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-slate-500 font-mono text-[11px]">Tags:</span>
                {selectedPoint.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300 text-[11px] border border-slate-700/60"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    sound.playClick();
                    // Draw random next card
                    const nextIndex = Math.floor(Math.random() * HISTORICAL_TURNING_POINTS.length);
                    setSelectedPoint(HISTORICAL_TURNING_POINTS[nextIndex]);
                  }}
                  className="px-3 py-1 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 rounded-lg text-xs font-medium flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Draw Another Day</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: BROWSE FULL DECK ARCHIVE */}
      {deckView === 'archive' && (
        <div className="space-y-6">
          {/* Filters Bar */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search turning points, quotes, tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="flex items-center gap-2 flex-wrap w-full md:w-auto">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              {['all', 'University & Aeronautics', 'Real Estate & Wealth', 'Patents & Inventions', 'Civic Leadership & Legacy'].map((era) => (
                <button
                  key={era}
                  onClick={() => {
                    sound.playClick();
                    setSelectedEra(era);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    selectedEra === era
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {era === 'all' ? 'All Eras' : era.split('&')[0].trim()}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredPoints.map((point) => {
              const isSelected = selectedPoint.id === point.id;
              const hasActiveMantraInPoint = activeMantra?.turningPointId === point.id;

              return (
                <div
                  key={point.id}
                  className={`rounded-xl p-5 border transition-all duration-300 flex flex-col justify-between relative group ${
                    isSelected
                      ? 'bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-amber-500/60 shadow-lg ring-1 ring-amber-500/30'
                      : 'bg-slate-950 hover:bg-slate-900/80 border-slate-800/90 hover:border-slate-700'
                  }`}
                >
                  {hasActiveMantraInPoint && (
                    <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[10px] font-bold">
                      Mantra Active (+5%)
                    </div>
                  )}

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] px-2 py-0.5 rounded border font-medium ${getEraBadgeColor(point.era)}`}>
                        {point.era}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">{point.date}</span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                      {point.title}
                    </h3>
                    <div className="text-[11px] text-slate-400">{point.subtitle}</div>

                    <div className="bg-slate-900/60 border-l-2 border-amber-400/80 p-3 rounded-r-lg">
                      <p className="text-xs font-serif italic text-amber-100/90 leading-snug">
                        "{point.coreQuote}"
                      </p>
                    </div>

                    <p className="text-xs text-slate-300 line-clamp-3">
                      {point.historicalCrucible}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-mono">
                      {point.mantras.length} Mantras Available
                    </span>

                    <button
                      onClick={() => {
                        sound.playClick();
                        setSelectedPoint(point);
                        setDeckView('daily');
                      }}
                      className="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500 text-amber-300 hover:text-slate-950 border border-amber-500/30 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>Study &amp; Pick Mantra</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredPoints.length === 0 && (
            <div className="text-center py-12 bg-slate-900/40 rounded-xl border border-slate-800">
              <Compass className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              <div className="text-sm font-semibold text-slate-300">No historical turning points matched your filter.</div>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedEra('all');
                }}
                className="mt-3 text-xs text-amber-400 underline cursor-pointer"
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* VIEW 3: MINDFUL REFLECTION & BREATHING */}
      {deckView === 'mindful' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-b from-indigo-950/40 via-slate-950 to-slate-950 border border-indigo-900/40 rounded-2xl p-6 sm:p-10 shadow-xl max-w-3xl mx-auto text-center space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
                <Heart className="w-3.5 h-3.5 text-cyan-400" />
                Resilience Mindful Anchor
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Guided Box Breathing with Your Daily Mantra
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
                Take 60 seconds to synchronize your nervous system with your chosen mantra. Inhale resilience, hold your
                focus, and exhale fatigue.
              </p>
            </div>

            {/* Active Mantra Presentation */}
            <div className="bg-slate-900/80 border border-amber-500/30 rounded-xl p-5 max-w-lg mx-auto">
              <div className="text-[11px] text-amber-400 font-semibold uppercase tracking-wider mb-1">
                Active Anchor Mantra
              </div>
              <p className="text-base font-serif italic text-white font-medium">
                "{activeMantra ? activeMantra.mantraText : selectedPoint.mantras[0].text}"
              </p>
              <div className="mt-2 text-[11px] text-slate-400">
                Turning Point: {activeMantra ? activeMantra.turningPointTitle : selectedPoint.title}
              </div>
            </div>

            {/* Animated Breathing Circle */}
            <div className="py-6 flex flex-col items-center justify-center">
              <div
                className={`w-44 h-44 rounded-full border-4 flex flex-col items-center justify-center transition-all duration-1000 relative ${
                  isBreathingActive
                    ? breathPhase === 'Inhale'
                      ? 'scale-110 border-cyan-400 bg-cyan-950/40 shadow-[0_0_35px_rgba(6,182,212,0.4)]'
                      : breathPhase === 'Hold'
                      ? 'scale-110 border-amber-400 bg-amber-950/40 shadow-[0_0_35px_rgba(245,158,11,0.4)]'
                      : 'scale-90 border-emerald-400 bg-emerald-950/30 shadow-[0_0_25px_rgba(52,211,153,0.3)]'
                    : 'border-slate-800 bg-slate-900/60'
                }`}
              >
                {isBreathingActive ? (
                  <>
                    <span className="text-xs uppercase tracking-widest text-slate-300 font-semibold">
                      {breathPhase}
                    </span>
                    <span className="text-4xl font-mono font-extrabold text-white my-1">
                      {breathTimer}
                    </span>
                    <span className="text-[10px] text-slate-400">Focus on the Mantra</span>
                  </>
                ) : (
                  <>
                    <Heart className="w-8 h-8 text-rose-400 mb-2" />
                    <span className="text-xs font-semibold text-slate-300">Ready to Center</span>
                  </>
                )}
              </div>

              {/* Start / Stop Button */}
              <div className="mt-6 flex items-center gap-3">
                <button
                  onClick={() => {
                    sound.playClick();
                    setIsBreathingActive(!isBreathingActive);
                  }}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    isBreathingActive
                      ? 'bg-rose-600 hover:bg-rose-500 text-white'
                      : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg'
                  }`}
                >
                  {isBreathingActive ? (
                    <>
                      <Pause className="w-4 h-4" />
                      <span>Pause Breathing</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      <span>Begin 4-4-4 Mindful Breathing</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => handleSpeakQuote(activeMantra ? activeMantra.mantraText : selectedPoint.mantras[0].text)}
                  className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 rounded-xl text-xs font-medium flex items-center gap-1.5 cursor-pointer"
                >
                  <Volume2 className="w-4 h-4 text-cyan-400" />
                  <span>Recite Mantra Aloud</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
