import React, { useState } from 'react';
import {
  Shield,
  Heart,
  Scale,
  Sparkles,
  Flame,
  ArrowRight,
  Car,
  Users,
  Award,
  Volume2,
  VolumeX,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  BookOpen,
  ExternalLink,
  Phone,
  Home,
  Zap,
  Scissors,
  Dices,
  Lock,
  HeartHandshake,
  Compass,
  Globe,
} from 'lucide-react';
import { GOLDIE_VS_JEANELL_MILESTONES, GoldieCrucibleMilestone } from '../../data/goldieChroniclesData';
import { PlayerStats } from '../../types/game';
import { sound } from '../../utils/audio';

interface JeanellVsGoldieViewProps {
  playerStats: PlayerStats;
  onUpdateStats: (delta: Partial<PlayerStats>) => void;
  onOpenOneStop?: () => void;
  onOpenStearSafe?: () => void;
  onOpenPatent?: () => void;
  onOpenMentorChat?: (questionText?: string) => void;
  onOpenAffirmations?: () => void;
  onReturnToMap?: () => void;
}

export const JeanellVsGoldieView: React.FC<JeanellVsGoldieViewProps> = ({
  playerStats,
  onUpdateStats,
  onOpenOneStop,
  onOpenStearSafe,
  onOpenPatent,
  onOpenMentorChat,
  onOpenAffirmations,
  onReturnToMap,
}) => {
  const [selectedMilestone, setSelectedMilestone] = useState<GoldieCrucibleMilestone>(
    GOLDIE_VS_JEANELL_MILESTONES[0]
  );
  const [reflectedMilestones, setReflectedMilestones] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('steareality_reflected_goldie');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isGoldieRetired, setIsGoldieRetired] = useState<boolean>(() => {
    try {
      return localStorage.getItem('steareality_goldie_retired') === 'true';
    } catch {
      return false;
    }
  });

  const [filterType, setFilterType] = useState<string>('all');
  const [speakingText, setSpeakingText] = useState<string | null>(null);
  const [activePerspective, setActivePerspective] = useState<'both' | 'goldie' | 'jeanell'>('both');
  const [showCeremonyModal, setShowCeremonyModal] = useState<boolean>(false);

  // Audio quote speaker
  const handleSpeak = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      sound.playPing();
      return;
    }

    if (speakingText === text) {
      window.speechSynthesis.cancel();
      setSpeakingText(null);
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.92;
      utterance.pitch = 1.05;
      utterance.onend = () => setSpeakingText(null);
      utterance.onerror = () => setSpeakingText(null);
      setSpeakingText(text);
      window.speechSynthesis.speak(utterance);
    } catch {
      setSpeakingText(null);
    }
  };

  // Handle reflecting on a crucible milestone
  const handleReflectMilestone = (milestone: GoldieCrucibleMilestone) => {
    if (reflectedMilestones.includes(milestone.id)) return;

    sound.playSuccess();
    const nextReflected = [...reflectedMilestones, milestone.id];
    setReflectedMilestones(nextReflected);
    localStorage.setItem('steareality_reflected_goldie', JSON.stringify(nextReflected));

    onUpdateStats({
      resilience: milestone.statBonus.resilience,
      communityLegacy: milestone.statBonus.communityLegacy,
      kindnessPoints: milestone.statBonus.kindnessPoints,
    });
  };

  // Ceremonial retirement of Goldie alter ego
  const handleRetireGoldieCeremony = () => {
    sound.playMantraChime();
    setIsGoldieRetired(true);
    localStorage.setItem('steareality_goldie_retired', 'true');
    setShowCeremonyModal(true);

    onUpdateStats({
      resilience: 25,
      communityLegacy: 35,
      kindnessPoints: 25,
    });
  };

  const filteredMilestones =
    filterType === 'all'
      ? GOLDIE_VS_JEANELL_MILESTONES
      : GOLDIE_VS_JEANELL_MILESTONES.filter((m) => m.goldieReality.hardshipType === filterType);

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 pb-16 animate-fadeIn">
      {/* Hero Dual Banner: Jeanell vs Goldie */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-2 border-amber-500/30 p-6 sm:p-10 shadow-2xl">
        {/* Ambient glows */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Scale className="w-3.5 h-3.5 text-amber-400" />
              The True Biography · Crucible of Transformation
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Jeanell <span className="text-red-400 font-serif italic">vs.</span> Goldie
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Before she was an aeronautical researcher, licensed broker, and founder of One Stop
              Rehabilitation Center, she walked the streets as <strong className="text-red-400 font-semibold">“Goldie”</strong>—an
              alter ego forged in survival as an unmarried teen mother of four, braiding hair, driving Detroit cabs from 20 to 26,
              gambling, selling drugs, surviving domestic violence, sexual assault, and losing three loved ones to gun violence.
            </p>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              At age 33, being shot in the wrong crowd forced her to retire the fast life. At age 40, being falsely arrested
              and held for 26 days without justice over an extended, returned rental car sealed her purpose:
              <span className="text-emerald-300 font-medium"> Goldie was retired forever</span>. She became Jeanell again,
              founded One Stop Rehabilitation Center, and became a licensed foster parent to shield Detroit youth.
            </p>

            {/* Quick action buttons */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              {onOpenAffirmations && (
                <button
                  onClick={() => {
                    sound.playClick();
                    onOpenAffirmations();
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold hover:bg-amber-500/30 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Daily Affirmation Deck (+5% Buff)</span>
                </button>
              )}
              {onOpenStearSafe && (
                <button
                  onClick={() => {
                    sound.playClick();
                    onOpenStearSafe();
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-bold hover:bg-cyan-500/30 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Shield className="w-3.5 h-3.5 text-cyan-400" />
                  <span>S-T-E-A-R Safe Transit Hub</span>
                </button>
              )}
            </div>
          </div>

          {/* Alter Ego Retirement Status Card */}
          <div className="bg-slate-950/90 border-2 border-slate-800 rounded-2xl p-5 shrink-0 max-w-sm w-full space-y-4 text-center">
            <div className="text-xs uppercase tracking-wider font-bold text-slate-400">
              Alter Ego Status
            </div>

            {isGoldieRetired ? (
              <div className="space-y-2">
                <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 text-xs font-bold uppercase">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Goldie Officially Retired</span>
                </div>
                <p className="text-sm font-serif italic text-white font-medium">
                  “Goldie died so Jeanell could build.”
                </p>
                <div className="text-xs text-slate-400">
                  Jeanell Land · Licensed Foster Parent &amp; One Stop 501(c)(3) Founder
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-red-300 text-xs font-bold uppercase">
                  <Flame className="w-4 h-4 text-red-400 animate-pulse" />
                  <span>The Crucible of Rebirth</span>
                </div>
                <p className="text-xs text-slate-300">
                  Ready to honor the scars and seal the transformation?
                </p>
                <button
                  onClick={handleRetireGoldieCeremony}
                  className="w-full py-2.5 px-4 bg-gradient-to-r from-amber-600 via-rose-600 to-emerald-600 hover:from-amber-500 hover:to-emerald-500 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Ceremonially Retire Goldie</span>
                </button>
              </div>
            )}

            <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Crucibles Mastered:</span>
              <span className="font-mono font-bold text-emerald-400">
                {reflectedMilestones.length} / {GOLDIE_VS_JEANELL_MILESTONES.length}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Identity Contrast Pill Strip */}
        <div className="mt-8 pt-6 border-t border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/30 flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 font-bold shrink-0 mt-0.5">
              G
            </div>
            <div className="space-y-1">
              <div className="text-xs font-bold text-red-300 uppercase tracking-wider flex items-center gap-2">
                <span>Goldie · The Survival Alter Ego</span>
                <span className="px-1.5 py-0.2 rounded text-[9px] bg-red-900/60 text-red-200">Street Armor</span>
              </div>
              <div className="text-xs text-slate-300 leading-relaxed">
                Unmarried teen mom of 4, braiding hair hustle, cab driver (ages 20–26), gambling, selling drugs, controlling sugar daddies, sexual assault & domestic violence survivor, lost 3 to gun violence (ages 22, 23, 29), jailed at 20 for felonious assault, shot at 33, 26 days falsely jailed at 40.
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold shrink-0 mt-0.5">
              JL
            </div>
            <div className="space-y-1">
              <div className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-2">
                <span>Jeanell Land · The Resurrected Matriarch</span>
                <span className="px-1.5 py-0.2 rounded text-[9px] bg-emerald-900/60 text-emerald-200">Sovereign Builder</span>
              </div>
              <div className="text-xs text-slate-300 leading-relaxed">
                Licensed foster parent, founder of One Stop Rehabilitation Center 501(c)(3), aeronautical flight researcher, real estate broker, insurance agent, author of <em>Better Forever</em>, architect of S-T-E-A-R Safe autonomous transit.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Perspective Toggle */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-wrap gap-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
          {[
            { id: 'all', label: `All ${GOLDIE_VS_JEANELL_MILESTONES.length} Crucibles` },
            { id: 'Survival Hustle', label: 'Survival Hustle (Braids & Cabs)' },
            { id: 'Street Pressures', label: 'Gambling & Drug Economy' },
            { id: 'Incarceration & Injustice', label: 'Felony at 20 & 26 Days Falsely Jailed' },
            { id: 'Gun Violence & Grief', label: 'Gunshot at 33 & 3 Loved Ones Lost' },
            { id: 'Domestic Abuse & Control', label: 'Surviving Abuse & Sugar Daddies' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                sound.playClick();
                setFilterType(tab.id);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                filterType === tab.id
                  ? 'bg-amber-500 text-slate-950 font-bold shadow'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Perspective view selector */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => {
              sound.playClick();
              setActivePerspective('both');
            }}
            className={`px-2.5 py-1 rounded-lg font-medium cursor-pointer transition-colors ${
              activePerspective === 'both' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Duality Mirror
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setActivePerspective('goldie');
            }}
            className={`px-2.5 py-1 rounded-lg font-medium cursor-pointer transition-colors ${
              activePerspective === 'goldie' ? 'bg-red-500 text-white font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Goldie's Fire
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setActivePerspective('jeanell');
            }}
            className={`px-2.5 py-1 rounded-lg font-medium cursor-pointer transition-colors ${
              activePerspective === 'jeanell' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Jeanell's Wisdom
          </button>
        </div>
      </div>

      {/* Main Dual Mirror Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sidebar Milestone Selector */}
        <div className="lg:col-span-4 space-y-2.5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between mb-2">
            <span className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>The 9 Turning Crucibles</span>
            </span>
            <span className="text-[10px] text-slate-500 font-mono">
              {reflectedMilestones.length}/{GOLDIE_VS_JEANELL_MILESTONES.length} Reflected
            </span>
          </h2>

          {filteredMilestones.map((m) => {
            const isSelected = selectedMilestone.id === m.id;
            const isReflected = reflectedMilestones.includes(m.id);

            return (
              <div
                key={m.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedMilestone(m);
                }}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer text-left ${
                  isSelected
                    ? 'bg-slate-900 border-amber-500 shadow-md ring-1 ring-amber-500/40'
                    : 'bg-slate-950 hover:bg-slate-900/60 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-mono text-amber-400 text-[11px] font-semibold">{m.ageOrYear}</span>
                  {isReflected && (
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>Absorbed</span>
                    </span>
                  )}
                </div>
                <div className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                  {m.title}
                </div>
                <div className="text-[11px] text-slate-400 truncate mt-0.5">
                  {m.goldieReality.hardshipType}
                </div>
              </div>
            );
          })}
        </div>

        {/* Center/Right: The Dual Crucible Card */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-slate-950 border-2 border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 flex-wrap gap-2">
              <div>
                <span className="text-xs font-mono font-bold text-amber-400">{selectedMilestone.ageOrYear}</span>
                <h2 className="text-xl sm:text-2xl font-black text-white">{selectedMilestone.title}</h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleSpeak(selectedMilestone.jeanellTransformation.wisdom)}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 rounded-lg text-xs font-medium flex items-center gap-1.5 cursor-pointer"
                  title="Listen to Jeanell's Words"
                >
                  <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{speakingText === selectedMilestone.jeanellTransformation.wisdom ? 'Speaking...' : 'Listen to Jeanell'}</span>
                </button>
                <button
                  onClick={() => handleSpeak(selectedMilestone.goldieReality.quote)}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 rounded-lg text-xs font-medium flex items-center gap-1.5 cursor-pointer"
                  title="Listen to Goldie's Words"
                >
                  <Volume2 className="w-3.5 h-3.5 text-red-400" />
                  <span>{speakingText === selectedMilestone.goldieReality.quote ? 'Speaking...' : 'Listen to Goldie'}</span>
                </button>
              </div>
            </div>

            {/* Side-by-Side Dual Comparison */}
            <div className={`grid gap-6 my-6 ${
              activePerspective === 'both' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'
            }`}>
              {/* Left Side: The Goldie Reality */}
              {(activePerspective === 'both' || activePerspective === 'goldie') && (
                <div className="bg-gradient-to-b from-red-950/40 via-slate-950 to-slate-950 border border-red-500/30 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 text-[10px] font-bold uppercase tracking-wider border border-red-500/40">
                      {selectedMilestone.goldieReality.badge}
                    </span>
                    <span className="text-[10px] text-red-400/80 font-mono">Survival Armor</span>
                  </div>
                  <h3 className="text-base font-bold text-red-200">
                    {selectedMilestone.goldieReality.headline}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {selectedMilestone.goldieReality.story}
                  </p>

                  {/* Goldie Quote */}
                  <div className="p-3 bg-red-950/60 border-l-2 border-red-500 rounded-r-lg text-xs font-serif italic text-red-100/90 leading-snug">
                    {selectedMilestone.goldieReality.quote}
                  </div>
                </div>
              )}

              {/* Right Side: The Jeanell Transformation */}
              {(activePerspective === 'both' || activePerspective === 'jeanell') && (
                <div className="bg-gradient-to-b from-emerald-950/40 via-slate-950 to-slate-950 border border-emerald-500/30 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/40">
                      {selectedMilestone.jeanellTransformation.badge}
                    </span>
                    <span className="text-[10px] text-emerald-400/80 font-mono">Sovereign Purpose</span>
                  </div>
                  <h3 className="text-base font-bold text-emerald-200">
                    {selectedMilestone.jeanellTransformation.headline}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {selectedMilestone.jeanellTransformation.breakthrough}
                  </p>

                  <div className="p-2.5 bg-emerald-950/50 rounded-lg border border-emerald-500/20 text-xs">
                    <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase block">
                      Institutional Legacy Created:
                    </span>
                    <span className="text-slate-200 font-semibold">{selectedMilestone.jeanellTransformation.legacyProgram}</span>
                  </div>

                  {/* Jeanell Wisdom */}
                  <div className="p-3 bg-emerald-950/60 border-l-2 border-emerald-400 rounded-r-lg text-xs font-serif italic text-emerald-100/90 leading-snug">
                    {selectedMilestone.jeanellTransformation.wisdom}
                  </div>
                </div>
              )}
            </div>

            {/* Core Resilience Lesson & Claim Bonus */}
            <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1 max-w-xl">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
                  Resilience Takeaway for the Player
                </span>
                <p className="text-xs text-slate-200 font-medium leading-relaxed">
                  {selectedMilestone.resilienceLesson}
                </p>
                <div className="text-[11px] font-mono text-slate-400">
                  Bonus: +{selectedMilestone.statBonus.resilience} Resilience · +{selectedMilestone.statBonus.communityLegacy} Community Legacy · +{selectedMilestone.statBonus.kindnessPoints} Empathy
                </div>
              </div>

              {reflectedMilestones.includes(selectedMilestone.id) ? (
                <div className="px-4 py-2 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center gap-1.5 shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Crucible Reflected &amp; Absorbed</span>
                </div>
              ) : (
                <button
                  onClick={() => handleReflectMilestone(selectedMilestone)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 text-slate-950 font-black text-xs transition-all shadow-md flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Absorb Lesson (+Resilience)</span>
                </button>
              )}
            </div>

            {/* Goldie's Beauty World Patent & LLC Showcase Card */}
            <div className="mt-5 p-4 rounded-2xl bg-gradient-to-r from-amber-950/60 via-slate-900 to-indigo-950/60 border border-amber-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-amber-500 text-slate-950">
                    USPTO Patent Docket
                  </span>
                  <span className="text-[10px] font-mono text-amber-300 font-bold">
                    GOLDIES-PAT-2026
                  </span>
                  <span className="text-[10px] font-mono text-emerald-300 font-bold">
                    EIN: 85-3559446
                  </span>
                  <span className="text-[10px] font-mono text-cyan-300 font-bold">
                    SAM.gov: J9R1TSCT26E1
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white">
                  Goldie’s Unique Beauty Creations Beauty World L.L.C.
                </h4>
                <p className="text-[11px] text-slate-300">
                  <em>"Where Beauty Is More Than Skin Deep"</em> &middot; 24/7 continuous operations, co-op equity leasing, and free on-site childcare.
                </p>
                <div className="text-[10px] text-cyan-400 font-mono">
                  Official Portal: www.goldiesuniquebeautycreationsbeautyworld.com
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href="https://www.goldiesuniquebeautycreationsbeautyworld.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Visit Domain</span>
                </a>
                {onOpenPatent && (
                  <button
                    onClick={() => {
                      sound.playClick();
                      onOpenPatent();
                    }}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold text-xs transition-all shadow-md flex items-center gap-1 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>View Patent Application</span>
                  </button>
                )}
              </div>
            </div>

            {/* Cross Links to Programs */}
            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between flex-wrap gap-3 text-xs">
              <div className="flex items-center gap-3">
                <a
                  href="https://onestoprehabilitationcenters.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold"
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>One Stop Rehabilitation Center Official Site</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {onOpenMentorChat && (
                <button
                  onClick={() =>
                    onOpenMentorChat(
                      `Jeanell, can you tell me more about your transition from Goldie, surviving being shot at 33 and the 26-day false arrest, to becoming a licensed foster parent and creating One Stop Rehabilitation Center?`
                    )
                  }
                  className="text-amber-400 hover:text-amber-300 font-semibold underline cursor-pointer"
                >
                  Ask Mentor Jeanell About This Transformation →
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Retirement Ceremony Modal */}
      {showCeremonyModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border-2 border-emerald-500/60 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 text-center shadow-2xl animate-scaleUp">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-400">
              <Sparkles className="w-8 h-8 animate-pulse" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
                The Sacred Retirement Ceremony
              </span>
              <h3 className="text-2xl font-black text-white">
                Goldie is Retired Forever
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                You have honored Goldie for surviving teen motherhood, the hair braiding hustle, six years in Detroit cabs, street grief, domestic violence, and a near-fatal gunshot wound at 33. Her armor kept you alive. Now, Jeanell is resurrected: licensed foster parent, founder of One Stop Rehabilitation Center, and champion of second chances.
              </p>
            </div>

            <div className="p-4 bg-emerald-950/50 border border-emerald-500/30 rounded-2xl text-xs space-y-1 font-mono text-emerald-300">
              <div>+25 Dynamic Resilience Buff Awarded</div>
              <div>+35 Community Legacy Points Added</div>
              <div>+25 Empathy &amp; Kindness Points Earned</div>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                setShowCeremonyModal(false);
              }}
              className="w-full py-3 bg-gradient-to-r from-emerald-500 to-amber-500 hover:from-emerald-400 hover:to-amber-400 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider shadow-lg transition-all cursor-pointer"
            >
              Continue in Jeanell's Light
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
