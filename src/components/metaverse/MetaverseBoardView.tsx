import React, { useState } from 'react';
import { AmericanLevel, PlayerStats, StudentProfile, UnlockedResource } from '../../types/game';
import { ALL_STATES_101_LEVELS } from '../../data/allStates101Levels';
import { sound } from '../../utils/audio';
import {
  Dice5,
  Sparkles,
  Plane,
  Building2,
  Home,
  Shield,
  Award,
  Lock,
  Unlock,
  MapPin,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Zap,
  DollarSign,
  Users,
  Compass,
  ExternalLink,
  GraduationCap,
  Layers,
  ArrowRight,
} from 'lucide-react';

interface MetaverseBoardViewProps {
  playerStats: PlayerStats;
  onUpdateStats: (delta: Partial<PlayerStats>) => void;
  profile: StudentProfile;
  onUpdateProfile: (newProfile: StudentProfile) => void;
  onOpenCourseSale: () => void;
  onOpenMentorChat?: () => void;
}

export const MetaverseBoardView: React.FC<MetaverseBoardViewProps> = ({
  playerStats,
  onUpdateStats,
  profile,
  onUpdateProfile,
  onOpenCourseSale,
  onOpenMentorChat,
}) => {
  const [boardMode, setBoardMode] = useState<'all_states' | 'monopoly_circuit'>('all_states');
  const [selectedLevelNumber, setSelectedLevelNumber] = useState<number>(profile.currentLevelNumber || 1);
  const [circuitTileIndex, setCircuitTileIndex] = useState<number>(0);
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [diceValues, setDiceValues] = useState<[number, number]>([3, 4]);
  const [activeChallengeStep, setActiveChallengeStep] = useState<AmericanLevel | null>(null);
  const [challengeOptionSelected, setChallengeOptionSelected] = useState<string | null>(null);
  const [challengeSubmitted, setChallengeSubmitted] = useState<boolean>(false);
  const [filterState, setFilterState] = useState<string>('ALL');

  const unlockedCount = profile.isCoursePurchased ? 101 : (profile.unlockedLevelsCount || 2);
  const currentSelectedLevel = ALL_STATES_101_LEVELS.find((l) => l.levelNumber === selectedLevelNumber) || ALL_STATES_101_LEVELS[0];

  // Distinct US States list for filtering
  const statesList = Array.from(new Set(ALL_STATES_101_LEVELS.map((l) => l.stateName))).sort();

  const filteredLevels = filterState === 'ALL'
    ? ALL_STATES_101_LEVELS
    : ALL_STATES_101_LEVELS.filter((l) => l.stateName === filterState);

  // Monopoly Circuit (40 Tiles based on the first 40 American Levels)
  const circuitTiles = ALL_STATES_101_LEVELS.slice(0, 40);

  const handleRollDice = () => {
    if (isRolling) return;
    sound.playDice();
    setIsRolling(true);

    const roll1 = Math.floor(Math.random() * 6) + 1;
    const roll2 = Math.floor(Math.random() * 6) + 1;
    const totalRoll = roll1 + roll2;

    setTimeout(() => {
      setDiceValues([roll1, roll2]);
      setIsRolling(false);
      sound.playSuccess();

      if (boardMode === 'monopoly_circuit') {
        const nextIndex = (circuitTileIndex + totalRoll) % 40;
        setCircuitTileIndex(nextIndex);
        const landedLevel = circuitTiles[nextIndex];
        setSelectedLevelNumber(landedLevel.levelNumber);
        setActiveChallengeStep(landedLevel);
        setChallengeOptionSelected(null);
        setChallengeSubmitted(false);

        // Check for Passing GO (Index 0)
        if (nextIndex < circuitTileIndex) {
          onUpdateStats({ earningsBalance: 2000 });
        }
      } else {
        // Advance on 101 level map
        const maxLevel = profile.isCoursePurchased ? 101 : unlockedCount;
        const nextLevel = Math.min(maxLevel, (profile.currentLevelNumber || 1) + totalRoll);
        onUpdateProfile({ ...profile, currentLevelNumber: nextLevel });
        setSelectedLevelNumber(nextLevel);
        const landed = ALL_STATES_101_LEVELS.find((l) => l.levelNumber === nextLevel) || ALL_STATES_101_LEVELS[0];
        setActiveChallengeStep(landed);
        setChallengeOptionSelected(null);
        setChallengeSubmitted(false);
      }
    }, 600);
  };

  const handleSelectLevel = (lvl: AmericanLevel) => {
    sound.playClick();
    setSelectedLevelNumber(lvl.levelNumber);

    if (lvl.levelNumber <= unlockedCount) {
      setActiveChallengeStep(lvl);
      setChallengeOptionSelected(null);
      setChallengeSubmitted(false);
    }
  };

  const handleOptionChoose = (optId: string) => {
    if (challengeSubmitted) return;
    sound.playClick();
    setChallengeOptionSelected(optId);
  };

  const handleSubmitDecision = () => {
    if (!activeChallengeStep || !challengeOptionSelected || challengeSubmitted) return;
    sound.playClick();
    setChallengeSubmitted(true);

    const chosen = activeChallengeStep.challenge.options.find((o) => o.id === challengeOptionSelected);
    if (!chosen) return;

    if (chosen.isCorrect) {
      sound.playSuccess();
      onUpdateStats(chosen.statBonus);
      if (chosen.unlockedResource && !profile.unlockedResourceIds.includes(chosen.unlockedResource.id)) {
        onUpdateProfile({
          ...profile,
          unlockedResourceIds: [...profile.unlockedResourceIds, chosen.unlockedResource.id],
        });
      }
    } else {
      sound.playError();
      onUpdateStats(chosen.statBonus);
    }
  };

  const getColorGroupClass = (group?: string) => {
    switch (group) {
      case 'cyan':
        return 'bg-cyan-500';
      case 'purple':
        return 'bg-purple-500';
      case 'orange':
        return 'bg-amber-500';
      case 'red':
        return 'bg-red-500';
      case 'yellow':
        return 'bg-yellow-400';
      case 'green':
        return 'bg-emerald-500';
      case 'darkblue':
        return 'bg-blue-600';
      case 'gold':
        return 'bg-amber-300';
      default:
        return 'bg-slate-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Metaverse Navigation Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>S.T.E.A.REALITY METAVERSE · MONOPOLY &amp; LIFE GAME BOARD</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-1">
              Trans-American 101-Level Curriculum &amp; Board
            </h1>
            <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Navigate real-world locations across all 50 US states plus Washington D.C. Roll the dice, acquire property deeds, make high-stakes life crossroads decisions, and build community wealth.
            </p>
          </div>

          {/* Right Controls: Mode Toggle & Dice Roller */}
          <div className="flex flex-wrap items-center gap-3">
            {/* View Mode Toggle */}
            <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-bold">
              <button
                onClick={() => {
                  sound.playClick();
                  setBoardMode('all_states');
                }}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  boardMode === 'all_states'
                    ? 'bg-cyan-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                101-Level Map ({unlockedCount}/101)
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setBoardMode('monopoly_circuit');
                }}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  boardMode === 'monopoly_circuit'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Monopoly Board (40 Tiles)
              </button>
            </div>

            {/* Interactive Dice Roll Button */}
            <button
              onClick={handleRollDice}
              disabled={isRolling}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 transition-all cursor-pointer disabled:opacity-50"
            >
              <Dice5 className={`w-4 h-4 ${isRolling ? 'animate-spin' : ''}`} />
              <span>
                {isRolling
                  ? 'Rolling...'
                  : `Roll Dice (${diceValues[0]} + ${diceValues[1]} = ${diceValues[0] + diceValues[1]})`}
              </span>
            </button>
          </div>
        </div>

        {/* Patentable System Architecture Badge */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-400">
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
            <span>
              <strong>100% Patentable Architecture:</strong> Dual-Helix Educational Game Loop (DHEGL™) &amp; Trans-American Progression Matrix (ATCPM™)
            </span>
          </div>

          {!profile.isCoursePurchased && (
            <button
              onClick={() => {
                sound.playClick();
                onOpenCourseSale();
              }}
              className="flex items-center gap-1.5 text-amber-300 font-bold hover:underline"
            >
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>Levels 3–101 Locked: Purchase Course to Unlock All ($0 with code JEANELL101)</span>
            </button>
          )}
        </div>
      </div>

      {/* VIEW 1: 101-LEVEL TRANS-AMERICAN ODYSSEY GRID */}
      {boardMode === 'all_states' && (
        <div className="space-y-4">
          {/* State Filter Strip */}
          <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl flex items-center justify-between gap-4 overflow-x-auto text-xs">
            <div className="flex items-center gap-2 shrink-0">
              <span className="font-bold text-slate-300">Filter By State:</span>
              <select
                value={filterState}
                onChange={(e) => {
                  sound.playClick();
                  setFilterState(e.target.value);
                }}
                className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-cyan-300 font-semibold focus:outline-none"
              >
                <option value="ALL">All 50 States + DC (101 Levels)</option>
                {statesList.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-3 shrink-0 text-slate-400 text-[11px]">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                <span>Unlocked ({unlockedCount})</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-700 inline-block"></span>
                <span>Locked ({101 - unlockedCount})</span>
              </span>
            </div>
          </div>

          {/* 101 Levels Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-[520px] overflow-y-auto pr-1">
            {filteredLevels.map((lvl) => {
              const isUnlocked = lvl.levelNumber <= unlockedCount;
              const isSelected = lvl.levelNumber === selectedLevelNumber;

              return (
                <div
                  key={lvl.levelNumber}
                  onClick={() => handleSelectLevel(lvl)}
                  className={`p-3.5 rounded-xl border transition-all text-left relative cursor-pointer ${
                    isSelected
                      ? 'bg-slate-800/90 border-cyan-400 shadow-lg shadow-cyan-500/10'
                      : isUnlocked
                      ? 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
                      : 'bg-slate-950/80 border-slate-900 opacity-60 hover:opacity-80'
                  }`}
                >
                  {/* Top Level Bar */}
                  <div className="flex items-center justify-between text-xs mb-2">
                    <div className="flex items-center gap-1.5 font-mono font-bold">
                      <span className="text-cyan-400">LVL {lvl.levelNumber}</span>
                      <span className="text-slate-500">·</span>
                      <span className="text-white">{lvl.stateCode}</span>
                    </div>

                    {isUnlocked ? (
                      <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-semibold">
                        <Unlock className="w-3 h-3" />
                        <span>Ready</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[10px] text-amber-400 font-semibold">
                        <Lock className="w-3 h-3" />
                        <span>Locked</span>
                      </span>
                    )}
                  </div>

                  {/* Landmark & City */}
                  <div className="text-xs font-bold text-white line-clamp-1">{lvl.landmark}</div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-cyan-400 shrink-0" />
                    <span className="truncate">{lvl.city}, {lvl.stateName}</span>
                  </div>

                  {/* Monopoly Deed & Category Tag */}
                  <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
                    <span className="text-slate-400 truncate">{lvl.category}</span>
                    {lvl.monopolyDeed && (
                      <span className="font-mono text-emerald-400 font-bold">
                        ${lvl.monopolyDeed.purchaseCost}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 2: ISOMETRIC / 3D MONOPOLY & THE GAME OF LIFE PERIMETER BOARD */}
      {boardMode === 'monopoly_circuit' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-400" />
                <span>Monopoly &amp; Life Circuit Track (Detroit Level 1 &amp; Beyond)</span>
              </h2>
              <p className="text-xs text-slate-400">
                Landed on Tile #{circuitTileIndex + 1}: <strong>{circuitTiles[circuitTileIndex]?.landmark}</strong>
              </p>
            </div>

            <div className="text-xs text-slate-400 font-mono bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
              Wallet Balance: <strong className="text-emerald-400">${playerStats.earningsBalance.toLocaleString()}</strong>
            </div>
          </div>

          {/* 3D-styled Board Track Visualization */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2">
            {circuitTiles.slice(0, 16).map((tile, idx) => {
              const isCurrent = idx === circuitTileIndex % 16;
              return (
                <div
                  key={tile.levelNumber}
                  onClick={() => {
                    sound.playClick();
                    setCircuitTileIndex(idx);
                    setSelectedLevelNumber(tile.levelNumber);
                    setActiveChallengeStep(tile);
                  }}
                  className={`p-2.5 rounded-lg border text-left transition-all relative cursor-pointer ${
                    isCurrent
                      ? 'bg-indigo-950/80 border-indigo-400 ring-2 ring-indigo-500/50 shadow-lg'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {/* Property Color Header */}
                  <div className={`h-1.5 rounded-full mb-1.5 ${getColorGroupClass(tile.monopolyDeed?.colorGroup)}`} />
                  <div className="text-[10px] font-mono text-cyan-400 font-bold">#{idx + 1} {tile.stateCode}</div>
                  <div className="text-[11px] font-semibold text-white truncate">{tile.city}</div>
                  <div className="text-[9px] text-slate-400 truncate">{tile.monopolyDeed ? `$${tile.monopolyDeed.purchaseCost}` : 'Event'}</div>

                  {isCurrent && (
                    <div className="absolute -top-1.5 -right-1.5 bg-indigo-500 text-white rounded-full p-0.5">
                      <Plane className="w-3 h-3" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SELECTED LEVEL DETAIL / ACTIVE CHALLENGE MODAL & DEED */}
      {currentSelectedLevel && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400">
                <span>LEVEL {currentSelectedLevel.levelNumber} OF 101</span>
                <span>·</span>
                <span>{currentSelectedLevel.stateName.toUpperCase()}</span>
                <span>·</span>
                <span>{currentSelectedLevel.category}</span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white mt-1">
                {currentSelectedLevel.landmark}
              </h2>
              <div className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>{currentSelectedLevel.city}, {currentSelectedLevel.stateName}</span>
              </div>
            </div>

            {/* Locked vs Unlocked Badge */}
            <div>
              {currentSelectedLevel.levelNumber <= unlockedCount ? (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-950/60 border border-emerald-500/40 rounded-full text-xs font-bold text-emerald-300">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>CLEARANCE UNLOCKED</span>
                </div>
              ) : (
                <button
                  onClick={() => {
                    sound.playClick();
                    onOpenCourseSale();
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-amber-950/60 border border-amber-500/50 rounded-full text-xs font-bold text-amber-300 hover:bg-amber-900/60 transition-colors cursor-pointer"
                >
                  <Lock className="w-4 h-4" />
                  <span>LOCKED · UNLOCK IN COURSE SALE</span>
                </button>
              )}
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
            {currentSelectedLevel.locationDescription}
          </p>

          {/* Monopoly Deed & Game of Life Fork Box */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Deed Card */}
            {currentSelectedLevel.monopolyDeed && (
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Home className="w-3.5 h-3.5 text-amber-400" />
                    <span>Monopoly Property Deed</span>
                  </div>
                  <span className={`w-3 h-3 rounded-full ${getColorGroupClass(currentSelectedLevel.monopolyDeed.colorGroup)}`} />
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Deed Value:</span>
                    <span className="font-mono text-emerald-400 font-bold">${currentSelectedLevel.monopolyDeed.purchaseCost}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Base Rent:</span>
                    <span className="font-mono text-white font-bold">${currentSelectedLevel.monopolyDeed.baseRent}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Duplex / Lab Rent:</span>
                    <span className="font-mono text-cyan-400 font-bold">${currentSelectedLevel.monopolyDeed.houseRent[1]}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Mortgage Value:</span>
                    <span className="font-mono text-slate-300 font-bold">${currentSelectedLevel.monopolyDeed.mortgageValue}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Life Event & Career Fork */}
            {currentSelectedLevel.lifeEvent && (
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-purple-400" />
                    <span>The Game of Life Career Fork</span>
                  </div>
                  <span className="text-[11px] font-mono text-purple-400 capitalize">
                    {currentSelectedLevel.lifeEvent.careerTrack.replace('_', ' ')}
                  </span>
                </div>
                <div className="text-xs space-y-1">
                  <div className="text-slate-200 font-medium">
                    {currentSelectedLevel.lifeEvent.milestoneName}
                  </div>
                  <div className="text-emerald-400 font-mono text-[11px]">
                    Salary Bonus: +${currentSelectedLevel.lifeEvent.salaryBonus.toLocaleString()}
                  </div>
                  {currentSelectedLevel.lifeEvent.familyPegReward && (
                    <div className="text-amber-300 text-[11px]">
                      Vehicle Peg Reward: {currentSelectedLevel.lifeEvent.familyPegReward}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Level Interactive Challenge */}
          {currentSelectedLevel.levelNumber <= unlockedCount ? (
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Interactive Challenge: {currentSelectedLevel.challenge.title}</span>
              </div>
              <p className="text-xs md:text-sm text-slate-200 leading-relaxed">
                {currentSelectedLevel.challenge.scenario}
              </p>

              {/* Options */}
              <div className="space-y-2.5">
                {currentSelectedLevel.challenge.options.map((opt) => {
                  const isSelected = challengeOptionSelected === opt.id;
                  let style = 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300';

                  if (challengeSubmitted) {
                    if (opt.isCorrect) {
                      style = 'bg-emerald-950/40 border-emerald-500/80 text-emerald-200';
                    } else if (isSelected) {
                      style = 'bg-rose-950/40 border-rose-500/80 text-rose-200';
                    }
                  } else if (isSelected) {
                    style = 'bg-cyan-950/40 border-cyan-500/80 text-white';
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleOptionChoose(opt.id)}
                      disabled={challengeSubmitted}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs md:text-sm transition-all cursor-pointer ${style}`}
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 text-[10px] ${
                            isSelected ? 'bg-cyan-500 border-cyan-400 text-slate-950 font-bold' : 'border-slate-700'
                          }`}
                        >
                          {isSelected ? '✓' : ''}
                        </span>
                        <span className="flex-1">{opt.label}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {!challengeSubmitted ? (
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleSubmitDecision}
                    disabled={!challengeOptionSelected}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer disabled:opacity-40"
                  >
                    <span>Submit Decision</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                /* Reveal Reflection & Consequence */
                <div className="space-y-3 pt-3 border-t border-slate-800">
                  {(() => {
                    const chosen = currentSelectedLevel.challenge.options.find(
                      (o) => o.id === challengeOptionSelected
                    );
                    if (!chosen) return null;

                    return (
                      <div className="space-y-3 text-xs">
                        <div
                          className={`p-3.5 rounded-xl border ${
                            chosen.isCorrect
                              ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-200'
                              : 'bg-rose-950/40 border-rose-500/60 text-rose-200'
                          }`}
                        >
                          <div className="font-bold uppercase tracking-wider mb-1">
                            {chosen.isCorrect ? 'Correct Decision Unlocked!' : 'Incorrect Decision Consequence'}
                          </div>
                          <div>{chosen.consequence}</div>
                        </div>

                        {/* Character Reflection */}
                        <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl space-y-1.5">
                          <div className="text-cyan-400 font-bold">
                            Reflection: {chosen.reflection.archetype}
                          </div>
                          <div className="text-slate-300">
                            <strong>Moral Insight:</strong> {chosen.reflection.moralInsight}
                          </div>
                          <div className="text-amber-300/90">
                            <strong>Lesson:</strong> {chosen.reflection.teachableLesson}
                          </div>
                        </div>

                        {/* Unlocked Resource */}
                        {chosen.isCorrect && chosen.unlockedResource && (
                          <div className="bg-cyan-950/40 border border-cyan-500/50 p-3.5 rounded-xl">
                            <div className="text-xs font-bold text-cyan-300">
                              Unlocked Resource: {chosen.unlockedResource.title}
                            </div>
                            <div className="text-slate-300 text-[11px] mt-1">
                              {chosen.unlockedResource.whyItMatters}
                            </div>
                            <a
                              href={chosen.unlockedResource.url}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-xs font-bold text-cyan-400 underline underline-offset-4 mt-2"
                            >
                              <span>{chosen.unlockedResource.actionText}</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
          ) : (
            <div className="bg-slate-950 border border-amber-500/30 rounded-xl p-6 text-center space-y-3">
              <Lock className="w-8 h-8 text-amber-400 mx-auto" />
              <h3 className="text-base font-bold text-white">
                Level {currentSelectedLevel.levelNumber} is Locked
              </h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                This American landmark requires enrollment in Jeanell Land's Masterclass. Enrolling unlocks all 101 levels covering two locations in every state.
              </p>
              <button
                onClick={() => {
                  sound.playClick();
                  onOpenCourseSale();
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-extrabold text-xs shadow-lg transition-all cursor-pointer"
              >
                Enroll Free with Code JEANELL101 &amp; Unlock Level {currentSelectedLevel.levelNumber}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
