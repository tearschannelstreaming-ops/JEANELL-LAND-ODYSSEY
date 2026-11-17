import React, { useState } from 'react';
import {
  StoryStep,
  PlayerStats,
  DecisionChoice,
  AgeBracket,
  ClassmateStatusMap,
  ClassmateId,
  RelationshipState,
  UnlockedResource,
  GoldieReckoningNode,
  GoldieReckoningOption,
} from '../../types/game';
import { STORY_STEPS } from '../../data/storyData';
import { GOLDIE_RECKONING_NODES } from '../../data/goldieReckoningData';
import { sound } from '../../utils/audio';
import {
  ArrowRight,
  Compass,
  RotateCcw,
  Sparkles,
  Lock,
  Heart,
  Users,
  Award,
  Zap,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  UserX,
  UserCheck,
  Scale,
  FolderLock,
  ExternalLink,
  PhoneCall,
  RefreshCw,
  Bot,
  Flame,
  Shield,
  Scissors,
  AlertTriangle,
  Car,
} from 'lucide-react';

interface NarrativeCampaignProps {
  playerStats: PlayerStats;
  onUpdateStats: (delta: Partial<PlayerStats>) => void;
  onLaunchLab: (lab: 'aero' | 'propulsion' | 'finance' | 'community' | 'trades' | 'adult') => void;
  ageBracket: AgeBracket;
  classmateStatus: ClassmateStatusMap;
  onUpdateClassmate: (id: ClassmateId, status: RelationshipState) => void;
  onUnlockResource?: (resource: UnlockedResource) => void;
  onOpenMentorChat?: (step: StoryStep) => void;
}

export const NarrativeCampaign: React.FC<NarrativeCampaignProps> = ({
  playerStats,
  onUpdateStats,
  onLaunchLab,
  ageBracket,
  classmateStatus,
  onUpdateClassmate,
  onUnlockResource,
  onOpenMentorChat,
}) => {
  // Mode toggle: Standard Inspiring Odyssey vs Goldie's Reckoning
  const [isGoldieReckoningMode, setIsGoldieReckoningMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem('steareality_goldie_reckoning_toggle') === 'true';
    } catch {
      return false;
    }
  });

  // Standard Campaign state
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [chosenChoices, setChosenChoices] = useState<Record<string, DecisionChoice>>({});
  const [lastImpactNotice, setLastImpactNotice] = useState<{ text: string; positive: boolean } | null>(null);
  const [restoredSteps, setRestoredSteps] = useState<string[]>([]);

  // Goldie's Reckoning state
  const [goldieNodeIndex, setGoldieNodeIndex] = useState<number>(0);
  const [chosenGoldieOptions, setChosenGoldieOptions] = useState<Record<string, GoldieReckoningOption>>({});

  const currentStep = STORY_STEPS[currentStepIndex] || STORY_STEPS[0];
  const selectedChoice = chosenChoices[currentStep.id];

  const currentGoldieNode = GOLDIE_RECKONING_NODES[goldieNodeIndex] || GOLDIE_RECKONING_NODES[0];
  const selectedGoldieChoice = chosenGoldieOptions[currentGoldieNode.id];

  // Redemption points (default fallback to 0 if not yet set)
  const redemptionPoints = playerStats.redemptionPoints ?? 25;

  const getRedemptionTier = (pts: number) => {
    if (pts >= 75) {
      return {
        title: 'Sanctuary Titan · One Stop Founder & Foster Guardian',
        perk: 'Complete sovereign rebirth. Maximum resilience recovery rate; all One Stop & S-T-E-A-R safety perks active.',
        color: 'text-emerald-300 border-emerald-500 bg-emerald-950/50',
      };
    }
    if (pts >= 50) {
      return {
        title: 'Sovereign Purpose · Goldie Retired Forever',
        perk: 'The bullet at 33 and false arrest at 40 converted into institutional defense. +15% baseline grit buffer.',
        color: 'text-amber-300 border-amber-500 bg-amber-950/50',
      };
    }
    if (pts >= 25) {
      return {
        title: 'Breaking the Chains · Awakening Out of Fast Money',
        perk: 'Recognizing that street dice and toxic gilded cages lead to destruction. Financial literacy unlocking.',
        color: 'text-purple-300 border-purple-500 bg-purple-950/50',
      };
    }
    return {
      title: 'Survival Street Armor · Goldie Era',
      perk: 'Navigating raw survival as an unmarried teen mom of 4, braiding hair, and driving night cabs.',
      color: 'text-red-300 border-red-500 bg-red-950/50',
    };
  };

  const redemptionTier = getRedemptionTier(redemptionPoints);

  // Resilience Tier calculation
  const getResilienceTier = (res: number) => {
    if (res >= 90) return { title: 'Transcendent Resilience', perk: 'All high-level partnerships auto-unlocked; +4° Aero stall buffer; -0.75% mortgage interest discount.', color: 'text-amber-300 border-amber-500 bg-amber-950/40' };
    if (res >= 75) return { title: 'Unbreakable Resolve', perk: 'Unlocks rare leadership options, +3° Aero stall buffer; -0.5% mortgage rate discount.', color: 'text-purple-300 border-purple-500 bg-purple-950/40' };
    if (res >= 50) return { title: 'Steadfast Focus', perk: 'Unlocks high-resilience dialogue; +1.5° Aero stall buffer.', color: 'text-cyan-300 border-cyan-500 bg-cyan-950/40' };
    return { title: 'Developing Grit', perk: 'Standard resilience envelope. Face adversity directly to forge higher grit.', color: 'text-slate-300 border-slate-700 bg-slate-900/60' };
  };

  const currentTier = getResilienceTier(playerStats.resilience);

  // Toggle mode
  const handleToggleMode = (mode: boolean) => {
    sound.playClick();
    setIsGoldieReckoningMode(mode);
    localStorage.setItem('steareality_goldie_reckoning_toggle', mode ? 'true' : 'false');
  };

  // Standard Choice Handler
  const handleSelectChoice = (choice: DecisionChoice) => {
    if (choice.minResilienceRequired && playerStats.resilience < choice.minResilienceRequired) {
      sound.playAlert();
      return;
    }
    if (choice.requiresAlly && classmateStatus[choice.requiresAlly] !== 'ally') {
      sound.playAlert();
      return;
    }

    sound.playClick();
    setChosenChoices((prev) => ({
      ...prev,
      [currentStep.id]: choice,
    }));

    onUpdateStats({
      resilience: choice.statImpact.resilience || 0,
      steamMastery: choice.statImpact.steamMastery || 0,
      financialAcumen: choice.statImpact.financialAcumen || 0,
      communityLegacy: choice.statImpact.communityLegacy || 0,
      coolPoints: choice.coolPointsGain || 0,
      kindnessPoints: choice.kindnessGain || 0,
    });

    if (choice.affectsClassmate) {
      onUpdateClassmate(choice.affectsClassmate.characterId, choice.affectsClassmate.newStatus);
    }

    if (choice.isCorrect && choice.unlockedResources && onUnlockResource) {
      choice.unlockedResources.forEach((r) => onUnlockResource(r));
    }

    const resDelta = choice.statImpact.resilience || 0;
    if (resDelta >= 0) {
      sound.playSuccess();
      setLastImpactNotice({
        text: `+${resDelta} Resilience forge! Character resilience strengthened.`,
        positive: true,
      });
    } else {
      sound.playAlert();
      setLastImpactNotice({
        text: `${resDelta} Resilience setback. Consequence applied to character growth.`,
        positive: false,
      });
    }

    setTimeout(() => setLastImpactNotice(null), 4500);
  };

  // Goldie's Reckoning Choice Handler
  const handleSelectGoldieChoice = (option: GoldieReckoningOption) => {
    sound.playClick();
    setChosenGoldieOptions((prev) => ({
      ...prev,
      [currentGoldieNode.id]: option,
    }));

    // Update stats including separate Redemption Points
    onUpdateStats({
      resilience: option.statDelta.resilience || 0,
      financialAcumen: option.statDelta.financialAcumen || 0,
      steamMastery: option.statDelta.steamMastery || 0,
      communityLegacy: option.statDelta.communityLegacy || 0,
      kindnessPoints: option.statDelta.kindnessPoints || 0,
      coolPoints: option.statDelta.coolPoints || 0,
      earningsBalance: option.cashDelta || 0,
      redemptionPoints: option.redemptionDelta,
    });

    if (option.unlockedResource && onUnlockResource) {
      onUnlockResource(option.unlockedResource);
    }

    if (option.persona === 'jeanell_redemption') {
      sound.playSuccess();
      setLastImpactNotice({
        text: `+${option.redemptionDelta} Redemption Points! Jeanell's sovereign path chosen.`,
        positive: true,
      });
    } else {
      sound.playAlert();
      setLastImpactNotice({
        text: `${option.redemptionDelta} Redemption setback. Goldie's high-risk impulse selected.`,
        positive: false,
      });
    }

    setTimeout(() => setLastImpactNotice(null), 4500);
  };

  const handleNextStep = () => {
    sound.playClick();
    if (currentStepIndex < STORY_STEPS.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handleNextGoldieStep = () => {
    sound.playClick();
    if (goldieNodeIndex < GOLDIE_RECKONING_NODES.length - 1) {
      setGoldieNodeIndex((prev) => prev + 1);
    }
  };

  const handleRestart = () => {
    sound.playClick();
    setCurrentStepIndex(0);
    setChosenChoices({});
  };

  const handleRestartGoldie = () => {
    sound.playClick();
    setGoldieNodeIndex(0);
    setChosenGoldieOptions({});
  };

  const handleAcknowledgeReflection = () => {
    sound.playSuccess();
    setRestoredSteps((prev) => [...prev, currentStep.id]);
    onUpdateStats({
      resilience: 10,
      kindnessPoints: 10,
    });
  };

  return (
    <div className="space-y-6">
      {/* NARRATIVE MODE TOGGLE HEADER */}
      <div className="bg-slate-900 border-2 border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>Story Campaign Mode Selector</span>
          </div>
          <h2 className="text-lg font-black text-white">
            {isGoldieReckoningMode ? (
              <span className="text-red-400 flex items-center gap-2">
                <Flame className="w-5 h-5 text-red-500 animate-pulse" />
                <span>Goldie's Reckoning: High-Risk Alter Ego Crossroads</span>
              </span>
            ) : (
              <span className="text-cyan-300 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <span>The Inspiring Odyssey: Aerospace &amp; Community Building</span>
              </span>
            )}
          </h2>
          <p className="text-xs text-slate-300">
            {isGoldieReckoningMode
              ? "Face the high-risk survival crucibles that shaped Jeanell Land: teen motherhood, braiding hair, 6 years in Detroit cabs, false arrest, and retiring Goldie."
              : "Experience the historic academic, aeronautical, and financial breakthroughs from Springfield High to NASA wind tunnel trials."}
          </p>
        </div>

        {/* The Toggle Button */}
        <div className="flex items-center gap-2 p-1.5 bg-slate-950 rounded-xl border border-slate-800 shrink-0">
          <button
            onClick={() => handleToggleMode(false)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              !isGoldieReckoningMode
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Standard Campaign</span>
          </button>
          <button
            onClick={() => handleToggleMode(true)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              isGoldieReckoningMode
                ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-md shadow-red-950/60 animate-pulse'
                : 'text-red-400 hover:text-red-300'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Goldie's Reckoning</span>
          </button>
        </div>
      </div>

      {/* ========================================================== */}
      {/* MODE 1: GOLDIE'S RECKONING (High-Risk Alter Ego Crossroads) */}
      {/* ========================================================== */}
      {isGoldieReckoningMode ? (
        <div className="space-y-6 animate-fadeIn">
          {/* Dedicated REDEMPTION POINTS HUD (Tracked separately from standard resilience) */}
          <div className="bg-gradient-to-r from-red-950/50 via-slate-900 to-amber-950/50 border-2 border-red-500/40 rounded-2xl p-5 shadow-2xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-red-500/20 border border-red-500/50 text-red-400">
                  <Flame className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-black text-white tracking-wider">
                      REDEMPTION POINTS METER
                    </h3>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${redemptionTier.color}`}>
                      {redemptionTier.title}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-0.5">{redemptionTier.perk}</p>
                </div>
              </div>

              {/* Dual Meters Comparison: Resilience vs Redemption */}
              <div className="flex items-center gap-4 text-xs font-mono">
                <div className="bg-slate-950/90 px-3 py-1.5 rounded-lg border border-red-500/30">
                  <span className="text-slate-400">Redemption: </span>
                  <span className="text-red-400 font-bold text-base tabular-nums">
                    {redemptionPoints} pts
                  </span>
                </div>

                <div className="bg-slate-950/90 px-3 py-1.5 rounded-lg border border-slate-800">
                  <span className="text-slate-400">Standard Resilience: </span>
                  <span className="text-rose-400 font-bold text-sm tabular-nums">
                    {playerStats.resilience}%
                  </span>
                </div>

                <div className="bg-slate-950/90 px-3 py-1.5 rounded-lg border border-slate-800">
                  <span className="text-slate-400">Cash: </span>
                  <span className="text-emerald-400 font-bold tabular-nums">
                    ${playerStats.earningsBalance.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Redemption Points Progress Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>Goldie's Survival Armor (0 pts)</span>
                <span className="text-amber-400 font-bold">Awakened Sovereignty (50 pts)</span>
                <span className="text-emerald-400 font-bold">One Stop Matriarch (100+ pts)</span>
              </div>
              <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-red-500/30 p-0.5">
                <div
                  style={{ width: `${Math.min(100, Math.max(5, redemptionPoints))}%` }}
                  className="h-full rounded-full bg-gradient-to-r from-red-600 via-amber-500 to-emerald-400 transition-all duration-500"
                />
              </div>
            </div>

            {lastImpactNotice && (
              <div
                className={`p-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 border animate-in fade-in ${
                  lastImpactNotice.positive
                    ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-200'
                    : 'bg-red-950/80 border-red-500/50 text-red-200'
                }`}
              >
                {lastImpactNotice.positive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span>{lastImpactNotice.text}</span>
              </div>
            )}
          </div>

          {/* Goldie Timeline Track */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2 text-xs font-bold text-red-400">
                <Flame className="w-4 h-4 text-red-500" />
                <span>GOLDIE'S RECKONING CRUCIBLES · {currentGoldieNode.crucibleCategory.toUpperCase()}</span>
              </div>
              <span className="text-xs font-mono text-slate-400">
                Node {goldieNodeIndex + 1} of {GOLDIE_RECKONING_NODES.length} · {currentGoldieNode.ageOrYear}
              </span>
            </div>

            {/* Dots */}
            <div className="grid grid-cols-8 gap-2">
              {GOLDIE_RECKONING_NODES.map((node, idx) => {
                const isDone = !!chosenGoldieOptions[node.id];
                const isCurrent = idx === goldieNodeIndex;

                return (
                  <button
                    key={node.id}
                    onClick={() => {
                      sound.playClick();
                      setGoldieNodeIndex(idx);
                    }}
                    className={`h-2.5 rounded-full transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-red-500 ring-2 ring-red-400'
                        : isDone
                        ? 'bg-emerald-500'
                        : 'bg-slate-800 hover:bg-slate-700'
                    }`}
                    title={`${node.ageOrYear}: ${node.title}`}
                  />
                );
              })}
            </div>
          </div>

          {/* Current High-Risk Decision Card */}
          <div className="bg-slate-950 border-2 border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-mono font-bold text-amber-400 uppercase">
                  Historical Crucible · {currentGoldieNode.ageOrYear}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                  {currentGoldieNode.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-red-950 border border-red-500/40 text-red-300 text-xs font-bold uppercase">
                  {currentGoldieNode.crucibleCategory}
                </span>
              </div>
            </div>

            {/* Narrative Context & Dilemma */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-1.5">
                <span className="text-[10px] font-bold uppercase text-red-400 block tracking-wider">
                  The Street Survival Crucible
                </span>
                <p className="text-slate-300 leading-relaxed">{currentGoldieNode.dilemmaSummary}</p>
              </div>

              <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-1.5">
                <span className="text-[10px] font-bold uppercase text-amber-400 block tracking-wider">
                  Systemic Trap &amp; Context
                </span>
                <p className="text-slate-300 leading-relaxed">{currentGoldieNode.systemicTrap}</p>
              </div>
            </div>

            {/* High-Risk Options: Goldie Impulse vs Jeanell Redemption */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Choose the Fork in the Road:
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {currentGoldieNode.options.map((option) => {
                  const isSelected = selectedGoldieChoice?.id === option.id;
                  const isJeanell = option.persona === 'jeanell_redemption';

                  return (
                    <div
                      key={option.id}
                      onClick={() => handleSelectGoldieChoice(option)}
                      className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                        isSelected
                          ? isJeanell
                            ? 'bg-emerald-950/60 border-emerald-400 ring-2 ring-emerald-500/40 shadow-xl'
                            : 'bg-red-950/60 border-red-500 ring-2 ring-red-500/40 shadow-xl'
                          : isJeanell
                          ? 'bg-slate-900 hover:bg-emerald-950/20 border-emerald-500/30'
                          : 'bg-slate-900 hover:bg-red-950/20 border-red-500/30'
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                              isJeanell
                                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                : 'bg-red-500/20 text-red-300 border-red-500/40'
                            }`}
                          >
                            {isJeanell ? "Jeanell's Redemption Pathway" : "Goldie's Survival Impulse"}
                          </span>

                          <span
                            className={`text-[10px] font-mono font-bold ${
                              option.riskLevel === 'Extreme' ? 'text-red-400' : 'text-amber-300'
                            }`}
                          >
                            Risk: {option.riskLevel}
                          </span>
                        </div>

                        <h5 className={`text-sm font-bold ${isJeanell ? 'text-emerald-200' : 'text-red-200'}`}>
                          {option.title}
                        </h5>

                        <p className="text-xs text-slate-300 leading-relaxed">{option.actionText}</p>
                      </div>

                      <div className="space-y-2 pt-2 border-t border-slate-800 text-[11px]">
                        <div className="flex items-center justify-between font-mono">
                          <span className="text-slate-400">Redemption Delta:</span>
                          <span
                            className={`font-bold ${
                              option.redemptionDelta > 0 ? 'text-emerald-400' : 'text-red-400'
                            }`}
                          >
                            {option.redemptionDelta > 0 ? '+' : ''}
                            {option.redemptionDelta} pts
                          </span>
                        </div>

                        {option.cashDelta && (
                          <div className="flex items-center justify-between font-mono">
                            <span className="text-slate-400">Cash Flow:</span>
                            <span
                              className={`font-bold ${
                                option.cashDelta > 0 ? 'text-emerald-400' : 'text-rose-400'
                              }`}
                            >
                              {option.cashDelta > 0 ? '+' : ''}${option.cashDelta}
                            </span>
                          </div>
                        )}

                        <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
                          <strong className="text-white block mb-0.5">Consequence:</strong>
                          {option.tangibleConsequence}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Historical Lesson Footer */}
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-xs space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
                Historical Life Crucible Takeaway
              </span>
              <p className="text-slate-300 leading-relaxed">{currentGoldieNode.historicalLesson}</p>
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                onClick={handleRestartGoldie}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restart Crucibles</span>
              </button>

              <button
                onClick={handleNextGoldieStep}
                disabled={!selectedGoldieChoice}
                className={`flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-xl transition-all shadow-md ${
                  selectedGoldieChoice
                    ? 'bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white cursor-pointer'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                <span>
                  {goldieNodeIndex < GOLDIE_RECKONING_NODES.length - 1
                    ? 'Next Crucible Node'
                    : 'Complete Goldie Reckoning'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* ========================================================== */
        /* MODE 2: STANDARD INSPIRING ODYSSEY CAMPAIGN                */
        /* ========================================================== */
        <div className="space-y-6 animate-fadeIn">
          {/* Dynamic Resilience HUD Bar */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-rose-950/60 border border-rose-500/50 text-rose-400">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-white tracking-wide">
                      DYNAMIC RESILIENCE METER
                    </h3>
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold border ${currentTier.color}`}>
                      {currentTier.title}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{currentTier.perk}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono">
                <div className="bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                  <span className="text-slate-400">Resilience: </span>
                  <span className="text-rose-400 font-bold text-sm tabular-nums">{playerStats.resilience}%</span>
                </div>

                <div className="bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                  <span className="text-slate-400">Redemption: </span>
                  <span className="text-red-400 font-bold tabular-nums">{redemptionPoints} pts</span>
                </div>

                <div className="bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                  <span className="text-slate-400">Kindness: </span>
                  <span className={`font-bold tabular-nums ${playerStats.kindnessPoints >= 20 ? 'text-emerald-400' : 'text-slate-300'}`}>
                    {playerStats.kindnessPoints} pts
                  </span>
                </div>
              </div>
            </div>

            {/* Resilience Visual Bar */}
            <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
              <div
                style={{ width: `${playerStats.resilience}%` }}
                className={`h-full transition-all duration-500 ${
                  playerStats.resilience >= 75
                    ? 'bg-gradient-to-r from-rose-500 via-purple-500 to-amber-400'
                    : playerStats.resilience >= 50
                    ? 'bg-gradient-to-r from-rose-500 to-cyan-400'
                    : 'bg-rose-500'
                }`}
              />
            </div>

            {lastImpactNotice && (
              <div
                className={`p-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 border animate-in fade-in ${
                  lastImpactNotice.positive
                    ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-200'
                    : 'bg-red-950/80 border-red-500/50 text-red-200'
                }`}
              >
                {lastImpactNotice.positive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span>{lastImpactNotice.text}</span>
              </div>
            )}
          </div>

          {/* Campaign Timeline Progress Track */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
                <Compass className="w-4 h-4" />
                <span>HISTORICAL SIMULATION CAMPAIGN · {currentStep.actTitle.toUpperCase()}</span>
              </div>
              <span className="text-xs font-mono text-slate-400 tabular-nums">
                Step {currentStepIndex + 1} of {STORY_STEPS.length} · {currentStep.yearRange}
              </span>
            </div>

            {/* Step dots */}
            <div className="grid grid-cols-9 gap-1.5">
              {STORY_STEPS.map((step, idx) => {
                const isDone = !!chosenChoices[step.id];
                const isCurrent = idx === currentStepIndex;

                return (
                  <button
                    key={step.id}
                    onClick={() => {
                      sound.playClick();
                      setCurrentStepIndex(idx);
                    }}
                    className={`h-2 rounded-full transition-all ${
                      isCurrent
                        ? 'bg-cyan-400 ring-2 ring-cyan-500/50'
                        : isDone
                        ? 'bg-emerald-500'
                        : 'bg-slate-800 hover:bg-slate-700'
                    }`}
                    title={`${step.actTitle}: ${step.sceneTitle}`}
                  />
                );
              })}
            </div>
          </div>

          {/* Current Step Scene Display */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8 space-y-6">
            <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase font-semibold">{currentStep.actTitle}</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">{currentStep.sceneTitle}</h2>
                <div className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                  <span>📍 {currentStep.location}</span>
                  <span>•</span>
                  <span>📅 {currentStep.yearRange}</span>
                </div>
              </div>

              {onOpenMentorChat && (
                <button
                  onClick={() => {
                    sound.playClick();
                    onOpenMentorChat(currentStep);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 text-xs font-medium transition-colors shrink-0"
                >
                  <Bot className="w-3.5 h-3.5" />
                  <span>Ask Mentor Jeanell</span>
                </button>
              )}
            </div>

            {/* Context & Summary */}
            <div className="space-y-3">
              <p className="text-sm text-slate-200 leading-relaxed font-sans">
                {ageBracket === 'junior' && currentStep.juniorSummary ? currentStep.juniorSummary : currentStep.summary}
              </p>

              <div className="p-3.5 bg-slate-950/80 rounded-lg border-l-2 border-cyan-400 text-xs text-slate-300 space-y-1">
                <span className="font-mono text-cyan-300 text-[10px] uppercase font-bold tracking-wider block">
                  Historical Context &amp; Significance
                </span>
                <p className="leading-relaxed">{currentStep.historicalContext}</p>
              </div>

              {currentStep.challengeQuote && (
                <blockquote className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs italic text-slate-300 font-serif">
                  {currentStep.challengeQuote}
                </blockquote>
              )}
            </div>

            {/* Decision Choices */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                <span>Critical Life Decision:</span>
                <span className="text-[11px] text-slate-400 font-normal">Select one choice to progress</span>
              </h3>

              <div className="grid grid-cols-1 gap-3">
                {currentStep.choices.map((choice) => {
                  const isSelected = selectedChoice?.id === choice.id;
                  const isLockedByResilience = choice.minResilienceRequired && playerStats.resilience < choice.minResilienceRequired;
                  const isLockedByAlly = choice.requiresAlly && classmateStatus[choice.requiresAlly] !== 'ally';
                  const isLocked = isLockedByResilience || isLockedByAlly;

                  return (
                    <button
                      key={choice.id}
                      onClick={() => handleSelectChoice(choice)}
                      disabled={isLocked as boolean}
                      className={`text-left p-4 rounded-xl border transition-all relative ${
                        isSelected
                          ? 'bg-cyan-950/40 border-cyan-400 shadow-lg shadow-cyan-950/40'
                          : isLocked
                          ? 'bg-slate-950/40 border-slate-800 text-slate-600 opacity-60 cursor-not-allowed'
                          : 'bg-slate-950 hover:bg-slate-800/80 border-slate-800 text-slate-200 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white">{choice.label}</span>
                            {isSelected && (
                              <span className="text-[10px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-1.5 py-0.2 rounded font-mono">
                                Selected
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-400 leading-relaxed">{choice.description}</p>
                        </div>

                        {isLocked && (
                          <div className="p-1.5 rounded bg-slate-900 border border-slate-700 text-slate-400 shrink-0">
                            <Lock className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </div>

                      {/* Stat Preview Tag */}
                      <div className="mt-3 flex flex-wrap items-center gap-2 text-[10px] font-mono">
                        {choice.statImpact.resilience !== undefined && (
                          <span className={choice.statImpact.resilience >= 0 ? 'text-rose-400' : 'text-slate-500'}>
                            {choice.statImpact.resilience >= 0 ? '+' : ''}{choice.statImpact.resilience} Resilience
                          </span>
                        )}
                        {choice.statImpact.steamMastery !== undefined && (
                          <span className="text-cyan-400">+{choice.statImpact.steamMastery} Aero</span>
                        )}
                        {choice.statImpact.financialAcumen !== undefined && (
                          <span className="text-emerald-400">+{choice.statImpact.financialAcumen} Finance</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Outcome Display */}
            {selectedChoice && (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 animate-in fade-in">
                <div className="text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>Historical Outcome &amp; Impact</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedChoice.historicalOutcome}
                </p>

                {/* Character Reflection */}
                {selectedChoice.characterReflection && (
                  <div className="pt-2 border-t border-slate-850 space-y-2">
                    <span className="text-[11px] font-bold text-slate-400 uppercase">Character Reflection:</span>
                    <p className="text-xs text-slate-300 italic font-serif">
                      “{selectedChoice.characterReflection.teachableLesson}”
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Action Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                onClick={handleRestart}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restart Campaign</span>
              </button>

              <button
                onClick={handleNextStep}
                disabled={!selectedChoice}
                className={`flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-lg transition-colors shadow-sm ${
                  selectedChoice
                    ? 'bg-cyan-600 hover:bg-cyan-500 text-white cursor-pointer'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                <span>{currentStepIndex < STORY_STEPS.length - 1 ? 'Next Timeline Node' : 'Complete Odyssey'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
