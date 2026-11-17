import React, { useState, useEffect } from 'react';
import {
  Compass,
  Sparkles,
  Flame,
  Award,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  RotateCcw,
  BookOpen,
  Plane,
  Building2,
  Heart,
  Shield,
  Zap,
  Calendar,
  ChevronRight,
  Layers,
  Star,
  Search,
  Check,
  TrendingUp,
  Clock,
  ExternalLink,
  FileText,
  Brain,
  Eye,
} from 'lucide-react';
import { TriviaQuestion, TriviaUserProgress, TriviaCategory } from '../../types/trivia';
import { HISTORICAL_TRIVIA_QUESTIONS, getDailyQuestions } from '../../data/historicalTriviaData';
import { PlayerStats } from '../../types/game';
import { sound } from '../../utils/audio';
import { getMentalStateAnalysis } from '../../data/stearSafeData';

interface JeanellsHistoricalJourneyProps {
  playerStats: PlayerStats;
  onUpdateStats: (partial: Partial<PlayerStats>) => void;
  onOpenStearSafe?: () => void;
  onOpenMetaverse?: () => void;
  onOpenAffirmations?: () => void;
  onOpenReflectOnGrowth?: () => void;
  onCloseModal?: () => void;
  isModalView?: boolean;
}

const STORAGE_KEY = 'jeanell_historical_trivia_progress_v1';

export const JeanellsHistoricalJourney: React.FC<JeanellsHistoricalJourneyProps> = ({
  playerStats,
  onUpdateStats,
  onOpenStearSafe,
  onOpenMetaverse,
  onOpenAffirmations,
  onOpenReflectOnGrowth,
  onCloseModal,
  isModalView = false,
}) => {
  const todayStr = new Date().toISOString().split('T')[0];
  const dailyQuestions = getDailyQuestions(todayStr);

  // Load progress from localStorage
  const [progress, setProgress] = useState<TriviaUserProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return {
      streak: 1,
      bestStreak: 3,
      lastCompletedDate: '',
      answeredQuestionIds: {},
      totalBonusResilienceEarned: 45,
      totalCorrect: 2,
      todayCompleted: false,
    };
  });

  // Save progress
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (err) {
      console.error('Failed to save trivia progress', err);
    }
  }, [progress]);

  // Verified Exhibit Modal State
  const [activeExhibit, setActiveExhibit] = useState<any | null>(null);

  // Claimed milestones state (localStorage persisted)
  const [claimedMilestones, setClaimedMilestones] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('jeanell_journey_claimed_milestones');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [claimedExhibits, setClaimedExhibits] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('jeanell_journey_claimed_exhibits');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [timelineFilter, setTimelineFilter] = useState<'all' | 'early' | 'growth' | 'patents'>('all');

  // Mode: 'daily' | 'archive' | 'timeline'
  const [viewMode, setViewMode] = useState<'daily' | 'archive' | 'timeline'>('timeline'); // Default to timeline showcasing resilience & evolution!
  const [categoryFilter, setCategoryFilter] = useState<'all' | TriviaCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Daily challenge state
  const [dailyIndex, setDailyIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [bonusRewardGained, setBonusRewardGained] = useState<number | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  // Active question in daily mode
  const currentDailyQ = dailyQuestions[dailyIndex] || dailyQuestions[0];

  // Specific question opened for inspection in archive mode
  const [activeArchiveQ, setActiveArchiveQ] = useState<TriviaQuestion | null>(null);

  // Check if today's 3 questions are all completed
  const dailyCompletedCount = dailyQuestions.filter(
    (q) => progress.answeredQuestionIds[q.id]?.isCorrect !== undefined
  ).length;
  const isTodayFullyComplete = dailyCompletedCount >= dailyQuestions.length;

  const currentAnalysis = getMentalStateAnalysis(playerStats.resilience);

  // Handle answering a question
  const handleSubmitAnswer = (question: TriviaQuestion, optionIdx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(optionIdx);
    setIsAnswerSubmitted(true);

    const isCorrect = optionIdx === question.correctIndex;

    if (isCorrect) {
      sound.playSuccess();
      const resilienceGain = question.resilienceBonus;
      setBonusRewardGained(resilienceGain);

      // Award bonus resilience, cool points and steam mastery!
      onUpdateStats({
        resilience: resilienceGain,
        coolPoints: question.coolPointsBonus,
        steamMastery: question.steamBonus,
      });

      // Update progress state
      setProgress((prev) => {
        const nextAnswered = {
          ...prev.answeredQuestionIds,
          [question.id]: {
            answeredIndex: optionIdx,
            isCorrect: true,
            timestamp: Date.now(),
          },
        };

        const newTotalCorrect = prev.totalCorrect + 1;
        const newTotalResilience = prev.totalBonusResilienceEarned + resilienceGain;

        // Check if all today questions completed
        const allDone = dailyQuestions.every((dq) => nextAnswered[dq.id]?.isCorrect !== undefined);
        let newStreak = prev.streak;
        if (allDone && prev.lastCompletedDate !== todayStr) {
          newStreak = prev.streak + 1;
        }

        return {
          ...prev,
          answeredQuestionIds: nextAnswered,
          totalCorrect: newTotalCorrect,
          totalBonusResilienceEarned: newTotalResilience,
          streak: newStreak,
          bestStreak: Math.max(newStreak, prev.bestStreak),
          lastCompletedDate: allDone ? todayStr : prev.lastCompletedDate,
          todayCompleted: allDone,
        };
      });
    } else {
      sound.playAlert();
      setBonusRewardGained(0);

      setProgress((prev) => ({
        ...prev,
        answeredQuestionIds: {
          ...prev.answeredQuestionIds,
          [question.id]: {
            answeredIndex: optionIdx,
            isCorrect: false,
            timestamp: Date.now(),
          },
        },
      }));
    }
  };

  // Next daily question
  const handleNextDailyQuestion = () => {
    sound.playClick();
    if (dailyIndex < dailyQuestions.length - 1) {
      setDailyIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
      setBonusRewardGained(null);
    } else {
      setShowCelebration(true);
      sound.playSuccess();
    }
  };

  // Restart today's challenge practice
  const handleResetToday = () => {
    sound.playClick();
    setDailyIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setBonusRewardGained(null);
    setShowCelebration(false);
  };

  // Filtered archive list
  const filteredQuestions = HISTORICAL_TRIVIA_QUESTIONS.filter((q) => {
    const matchesCategory = categoryFilter === 'all' || q.category === categoryFilter;
    const matchesSearch =
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.historicalFigureOrTopic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.explanation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.eraOrYear.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={`space-y-6 ${isModalView ? 'p-1' : 'max-w-6xl mx-auto px-4 py-6'}`}>
      {/* Top Banner / Hero Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-950/60 via-slate-900 to-indigo-950/70 border border-amber-500/30 p-6 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-8 w-48 h-48 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40">
                <Compass className="w-3.5 h-3.5 text-amber-400" />
                Jeanell's Historical Journey
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                <Calendar className="w-3 h-3 text-slate-400" />
                Today: {new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                <Zap className="w-3 h-3 text-emerald-400" />
                Resilience Multiplier Active
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              Daily Aeronautics &amp; Real Estate Challenge
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Test your knowledge of American aviation history, Detroit aerospace milestones, and real estate wealth
              preservation. Correct answers immediately boost your{' '}
              <strong className="text-rose-400 font-semibold">Player Resilience meter</strong>, keeping you out of
              fatigue and unlocking Peak Flow state!
            </p>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-3 gap-3 w-full lg:w-auto shrink-0 bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 backdrop-blur-sm">
            <div className="text-center px-2">
              <div className="flex items-center justify-center gap-1 text-xs text-amber-400 font-semibold mb-0.5">
                <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span>Streak</span>
              </div>
              <div className="text-xl font-black text-white">{progress.streak} <span className="text-xs font-normal text-slate-400">Days</span></div>
              <div className="text-[10px] text-slate-500">Best: {progress.bestStreak}d</div>
            </div>

            <div className="text-center px-2 border-x border-slate-800">
              <div className="flex items-center justify-center gap-1 text-xs text-rose-400 font-semibold mb-0.5">
                <Heart className="w-3.5 h-3.5 text-rose-400" />
                <span>Resilience</span>
              </div>
              <div className="text-xl font-black text-rose-300">
                +{progress.totalBonusResilienceEarned}
              </div>
              <div className="text-[10px] text-slate-500">Bonus Awarded</div>
            </div>

            <div className="text-center px-2">
              <div className="flex items-center justify-center gap-1 text-xs text-cyan-400 font-semibold mb-0.5">
                <Award className="w-3.5 h-3.5 text-cyan-400" />
                <span>Mastered</span>
              </div>
              <div className="text-xl font-black text-cyan-300">{progress.totalCorrect}</div>
              <div className="text-[10px] text-slate-500">Questions</div>
            </div>
          </div>
        </div>

        {/* Current Resilience Status Pill in Banner */}
        <div className="mt-4 pt-3.5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Current Player Resilience:</span>
            <span
              className={`font-bold px-2 py-0.5 rounded ${
                playerStats.resilience < 30
                  ? 'bg-red-500/20 text-red-300 border border-red-500/40 animate-pulse'
                  : playerStats.resilience > 80
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              }`}
            >
              {playerStats.resilience}% — {currentAnalysis.headline}
            </span>
            {playerStats.resilience < 30 && (
              <span className="text-red-400 text-[11px] font-semibold animate-pulse">
                ⚠️ Critical Fatigue! Answer today’s questions to recover!
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {onOpenAffirmations && (
              <button
                onClick={() => {
                  sound.playClick();
                  onOpenAffirmations();
                }}
                className="text-amber-400 hover:text-amber-300 font-medium inline-flex items-center gap-1.5 transition-colors bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/30 text-xs"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Affirmation Deck (+5% Buff)</span>
              </button>
            )}
            {onOpenStearSafe && (
              <button
                onClick={() => {
                  sound.playClick();
                  onOpenStearSafe();
                }}
                className="text-cyan-400 hover:text-cyan-300 font-medium inline-flex items-center gap-1 transition-colors"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>S-T-E-A-R Hub</span>
              </button>
            )}
            {onCloseModal && (
              <button
                onClick={onCloseModal}
                className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs transition-colors"
              >
                Close
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sound.playClick();
              setViewMode('daily');
            }}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
              viewMode === 'daily'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Today's Daily Challenge (3 Rounds)</span>
            {isTodayFullyComplete ? (
              <Check className="w-3.5 h-3.5 text-slate-950 font-bold ml-1" />
            ) : (
              <span className="w-2 h-2 rounded-full bg-amber-300 animate-ping" />
            )}
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setViewMode('archive');
            }}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
              viewMode === 'archive'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Historical Vault ({HISTORICAL_TRIVIA_QUESTIONS.length} Questions)</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setViewMode('timeline');
            }}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              viewMode === 'timeline'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 shadow-md shadow-emerald-500/20 font-black'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Resilience &amp; Evolution Timeline (2016–2026)</span>
          </button>
        </div>

        {/* Category breakdown pill */}
        <div className="hidden sm:flex items-center gap-3 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <Plane className="w-3.5 h-3.5 text-cyan-400" />
            Aeronautical History
          </span>
          <span className="text-slate-700">·</span>
          <span className="flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-emerald-400" />
            Real Estate Milestones
          </span>
          <span className="text-slate-700">·</span>
          <span className="flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            Jeanell Legacy
          </span>
        </div>
      </div>

      {/* VIEW MODE 1: DAILY CHALLENGE */}
      {viewMode === 'daily' && (
        <div className="space-y-6">
          {/* Daily Challenge Progress Header */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 font-bold">
                {dailyIndex + 1}
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Daily Round {dailyIndex + 1} of {dailyQuestions.length}
                </div>
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  <span>{currentDailyQ.categoryLabel}</span>
                  <span className="text-slate-600">·</span>
                  <span className="text-xs font-normal text-slate-300">{currentDailyQ.eraOrYear}</span>
                </div>
              </div>
            </div>

            {/* Stepper Dots */}
            <div className="flex items-center gap-2">
              {dailyQuestions.map((q, idx) => {
                const ans = progress.answeredQuestionIds[q.id];
                const isCurrent = idx === dailyIndex;
                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      sound.playClick();
                      setDailyIndex(idx);
                      setSelectedOption(ans ? ans.answeredIndex : null);
                      setIsAnswerSubmitted(!!ans);
                      setBonusRewardGained(null);
                    }}
                    className={`h-3 rounded-full transition-all flex items-center justify-center text-[10px] font-bold ${
                      isCurrent
                        ? 'w-8 bg-amber-400 text-slate-950 ring-2 ring-amber-400/50'
                        : ans?.isCorrect
                        ? 'w-5 bg-emerald-500 text-slate-950'
                        : ans && !ans.isCorrect
                        ? 'w-5 bg-rose-500 text-white'
                        : 'w-3 bg-slate-800 hover:bg-slate-700'
                    }`}
                    title={`Question ${idx + 1}`}
                  />
                );
              })}
            </div>
          </div>

          {/* Main Question Presentation Card */}
          <div className="relative bg-slate-950 border border-slate-800 rounded-2xl p-6 lg:p-8 space-y-6 shadow-xl">
            {/* Question Meta Strip */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-md text-xs font-bold tracking-wide uppercase flex items-center gap-1.5 ${
                    currentDailyQ.category === 'aeronautical'
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                      : currentDailyQ.category === 'real_estate'
                      ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                      : 'bg-purple-500/15 text-purple-300 border border-purple-500/30'
                  }`}
                >
                  {currentDailyQ.category === 'aeronautical' ? (
                    <Plane className="w-3.5 h-3.5" />
                  ) : currentDailyQ.category === 'real_estate' ? (
                    <Building2 className="w-3.5 h-3.5" />
                  ) : (
                    <Compass className="w-3.5 h-3.5" />
                  )}
                  {currentDailyQ.historicalFigureOrTopic}
                </span>

                <span className="px-2.5 py-0.5 rounded text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
                  {currentDailyQ.difficulty}
                </span>
              </div>

              {/* Bonus Resilience Reward Badge */}
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-bold">
                <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                <span>+{currentDailyQ.resilienceBonus} Resilience Reward</span>
              </div>
            </div>

            {/* Question Text */}
            <div className="space-y-2">
              <div className="text-xs text-slate-400 uppercase tracking-widest font-mono">
                Historical Inquiry
              </div>
              <h2 className="text-lg md:text-xl font-bold text-white leading-relaxed">
                {currentDailyQ.question}
              </h2>
            </div>

            {/* Options List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
              {currentDailyQ.options.map((option, optIdx) => {
                const optionLetter = String.fromCharCode(65 + optIdx);
                const isSelected = selectedOption === optIdx;
                const isCorrect = optIdx === currentDailyQ.correctIndex;

                let buttonClass = 'bg-slate-900/90 border-slate-800 hover:border-slate-700 hover:bg-slate-850 text-slate-200';

                if (isAnswerSubmitted) {
                  if (isCorrect) {
                    buttonClass =
                      'bg-emerald-950/80 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.25)]';
                  } else if (isSelected && !isCorrect) {
                    buttonClass =
                      'bg-red-950/80 border-red-500 text-red-200 ring-2 ring-red-500/40';
                  } else {
                    buttonClass = 'bg-slate-950/60 border-slate-900 text-slate-500 opacity-60';
                  }
                }

                return (
                  <button
                    key={optIdx}
                    disabled={isAnswerSubmitted}
                    onClick={() => handleSubmitAnswer(currentDailyQ, optIdx)}
                    className={`relative text-left p-4 rounded-xl border transition-all duration-200 flex items-start gap-3.5 ${buttonClass} ${
                      !isAnswerSubmitted ? 'cursor-pointer active:scale-[0.99]' : 'cursor-default'
                    }`}
                  >
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                        isAnswerSubmitted && isCorrect
                          ? 'bg-emerald-500 text-slate-950'
                          : isAnswerSubmitted && isSelected && !isCorrect
                          ? 'bg-red-500 text-white'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {optionLetter}
                    </span>

                    <div className="flex-1 text-sm font-medium leading-snug pt-0.5">
                      {option}
                    </div>

                    {isAnswerSubmitted && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    )}
                    {isAnswerSubmitted && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Answer Feedback & Historical Debrief */}
            {isAnswerSubmitted && (
              <div
                className={`rounded-xl p-5 border space-y-4 animate-in fade-in duration-300 ${
                  selectedOption === currentDailyQ.correctIndex
                    ? 'bg-emerald-950/40 border-emerald-500/40'
                    : 'bg-slate-900/90 border-slate-700'
                }`}
              >
                {/* Status Headline */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    {selectedOption === currentDailyQ.correctIndex ? (
                      <>
                        <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-emerald-300">
                            Correct! Historical Milestone Mastered
                          </div>
                          <div className="text-xs text-slate-400">
                            Resilience telemetry updated successfully
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-8 h-8 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center">
                          <XCircle className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-red-300">
                            Incorrect. Take Note of the Historical Truth
                          </div>
                          <div className="text-xs text-slate-400">
                            Review the historical analysis below to fortify your understanding
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {bonusRewardGained !== null && bonusRewardGained > 0 && (
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-xs animate-bounce">
                      <Heart className="w-4 h-4 fill-emerald-400" />
                      <span>+{bonusRewardGained} Bonus Resilience Awarded!</span>
                    </div>
                  )}
                </div>

                {/* Explanation */}
                <div className="space-y-1 text-sm text-slate-200 bg-slate-950/80 p-3.5 rounded-lg border border-slate-800">
                  <span className="font-semibold text-white">Historical Explanation: </span>
                  <span>{currentDailyQ.explanation}</span>
                </div>

                {/* Historical Context & Milestone Lesson */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                  <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800/80 space-y-1">
                    <div className="text-xs font-semibold text-cyan-400 flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5" />
                      <span>Archival Context</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {currentDailyQ.historicalContext}
                    </p>
                  </div>

                  <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800/80 space-y-1">
                    <div className="text-xs font-semibold text-amber-400 flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>Jeanell's Career Wisdom</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {currentDailyQ.milestoneLesson}
                    </p>
                  </div>
                </div>

                {/* Next Button */}
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleNextDailyQuestion}
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-amber-500/25 active:scale-95"
                  >
                    <span>
                      {dailyIndex < dailyQuestions.length - 1
                        ? 'Proceed to Next Round'
                        : 'Complete Today’s Challenge'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Daily Completion Celebration Overlay */}
          {showCelebration && (
            <div className="bg-gradient-to-r from-emerald-950/90 via-slate-900 to-teal-950/90 border-2 border-emerald-400 rounded-2xl p-6 text-center space-y-4 shadow-2xl animate-in zoom-in-95 duration-300">
              <div className="inline-flex p-4 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                <Sparkles className="w-8 h-8" />
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xl font-black text-white">
                  Today’s Historical Challenge Completed!
                </h3>
                <p className="text-sm text-slate-300 max-w-lg mx-auto">
                  Outstanding work. Your daily streak is now{' '}
                  <strong className="text-amber-300">{progress.streak} Days</strong>. Your Player Resilience has
                  been fortified, protecting your character from fatigue and burnout.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleResetToday}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Review Daily Questions</span>
                </button>

                <button
                  onClick={() => {
                    sound.playClick();
                    setViewMode('archive');
                  }}
                  className="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Explore Practice Archive</span>
                </button>

                {onOpenStearSafe && (
                  <button
                    onClick={() => {
                      sound.playClick();
                      onOpenStearSafe();
                    }}
                    className="px-5 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-colors"
                  >
                    <Shield className="w-3.5 h-3.5" />
                    <span>Check S-T-E-A-R Telemetry</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* VIEW MODE 2: ARCHIVE VAULT */}
      {viewMode === 'archive' && (
        <div className="space-y-5">
          {/* Filter Bar */}
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              {(
                [
                  { id: 'all', label: 'All Topics' },
                  { id: 'aeronautical', label: 'Aeronautical History' },
                  { id: 'real_estate', label: 'Real Estate Milestones' },
                  { id: 'jeanell_journey', label: 'Jeanell Land Legacy' },
                ] as const
              ).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    sound.playClick();
                    setCategoryFilter(cat.id);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    categoryFilter === cat.id
                      ? 'bg-cyan-500 text-slate-950'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search history & patents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Questions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredQuestions.map((q) => {
              const ansRecord = progress.answeredQuestionIds[q.id];
              const isAnswered = !!ansRecord;
              const isCorrect = ansRecord?.isCorrect;

              return (
                <div
                  key={q.id}
                  className="bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-xl p-5 flex flex-col justify-between space-y-4 transition-all"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <span
                        className={`px-2 py-0.5 rounded font-bold uppercase text-[10px] ${
                          q.category === 'aeronautical'
                            ? 'bg-cyan-500/15 text-cyan-300'
                            : q.category === 'real_estate'
                            ? 'bg-emerald-500/15 text-emerald-300'
                            : 'bg-purple-500/15 text-purple-300'
                        }`}
                      >
                        {q.categoryLabel}
                      </span>

                      {isAnswered ? (
                        isCorrect ? (
                          <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Mastered
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-[11px] font-bold text-rose-400">
                            <XCircle className="w-3.5 h-3.5" />
                            Attempted
                          </span>
                        )
                      ) : (
                        <span className="text-[11px] text-slate-500 font-medium">Unanswered</span>
                      )}
                    </div>

                    <div className="text-xs font-semibold text-slate-400">{q.historicalFigureOrTopic} ({q.eraOrYear})</div>

                    <h3 className="text-sm font-bold text-white leading-snug line-clamp-3">
                      {q.question}
                    </h3>
                  </div>

                  <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-xs">
                    <span className="text-rose-400 font-semibold flex items-center gap-1">
                      <Heart className="w-3 h-3 fill-rose-400" />
                      +{q.resilienceBonus} Resilience
                    </span>

                    <button
                      onClick={() => {
                        sound.playClick();
                        setActiveArchiveQ(q);
                      }}
                      className="px-3 py-1 rounded bg-slate-900 hover:bg-slate-800 text-cyan-400 font-bold text-xs flex items-center gap-1 transition-colors"
                    >
                      <span>{isAnswered ? 'Review Facts' : 'Test Knowledge'}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW MODE 3: RESILIENCE & EVOLUTION TIMELINE (2016–2026+) */}
      {viewMode === 'timeline' && (
        <div className="space-y-6">
          {/* Timeline Banner */}
          <div className="bg-gradient-to-r from-emerald-950/90 via-slate-900 to-teal-950/90 border border-emerald-500/40 rounded-2xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Long-Time Dedication to Evolve · 10-Year Verified Trajectory (2016–2026+)</span>
                </div>

                <div className="flex items-center gap-2">
                  {onOpenReflectOnGrowth && (
                    <button
                      onClick={() => {
                        sound.playClick();
                        onOpenReflectOnGrowth();
                      }}
                      className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-950 via-teal-950 to-emerald-950 hover:from-emerald-900 hover:to-teal-900 text-emerald-300 border border-emerald-500/50 hover:border-emerald-400 font-bold flex items-center gap-2 text-xs transition-all shadow-md cursor-pointer group hover:scale-[1.02]"
                      title="Write a short reflection on a recent challenge to permanently boost your resilience (+5%)"
                    >
                      <Brain className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
                      <span>Reflect on Growth</span>
                      <span className="text-[10px] bg-emerald-500/20 px-1 py-0.2 rounded text-emerald-300 font-mono font-bold border border-emerald-500/30">
                        +5% Boost
                      </span>
                    </button>
                  )}
                </div>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Jeanell Land: The Journey of Relentless Resilience &amp; Community Rebirth
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-4xl leading-relaxed mt-1">
                  True resilience is not a single sprint—it is a decade-long perseverance. From surviving 26 days of unconstitutional
                  imprisonment over a returned rental car to establishing 501(c)(3) sanctuaries, launching commercial real estate
                  brokerages with All Your Needs Reality LLC, mastering state insurance ethics, independently authoring four USPTO patent specifications,
                  and spearheading the national Family Reunite Act campaign.
                </p>
              </div>

              {/* Trajectory Metrics Ribbon */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">Verified Arc</span>
                  <span className="text-sm font-bold text-emerald-400 font-mono">10+ Years (2016–2026)</span>
                </div>
                <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">Documented Epochs</span>
                  <span className="text-sm font-bold text-cyan-400 font-mono">8 Key Milestones</span>
                </div>
                <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">USPTO Patent Claims</span>
                  <span className="text-sm font-bold text-purple-400 font-mono">20+ Technical Claims</span>
                </div>
                <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">Internalized Wisdom</span>
                  <span className="text-sm font-bold text-amber-400 font-mono">
                    {Object.keys(claimedMilestones).length} / 8 Epochs
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Epoch Filter Bar */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 flex-wrap">
              {[
                { id: 'all', label: 'All Decades (2016–2026+)' },
                { id: 'early', label: '2016–2019: Foundations & Crucible' },
                { id: 'growth', label: '2020–2023: Real Estate & Media' },
                { id: 'patents', label: '2024–2026+: Licensure, Patents & Reform' },
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => {
                    sound.playClick();
                    setTimelineFilter(filter.id as any);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    timelineFilter === filter.id
                      ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            <span className="text-xs text-slate-400 font-mono hidden sm:inline">
              Click &quot;Inspect Official Exhibit&quot; to review government filings
            </span>
          </div>

          {/* Interactive Timeline Cards */}
          <div className="space-y-4">
            {[
              {
                id: 'milestone-2016-agency',
                epoch: 'early',
                year: '2016',
                dateBadge: 'January 29, 2016',
                title: 'Jeanell Land Employment Rehabilitation Community Agency',
                category: 'Grassroots Community Re-entry & Rehabilitation',
                officialRecord: 'IRS Letter 147C · EIN: 35-2472616 · PO Box 7191, Detroit MI 48207-0191',
                description:
                  'Founded immediately to address the generational cycle of unemployment, teen parenting challenges, and criminal justice re-entry in Detroit. Created hands-on job readiness, vocational trade linkages, and family stabilization programs.',
                evolutionLesson:
                  'Transforming early hardships into structured institutional sanctuary for those returning from incarceration.',
                icon: Building2,
                color: 'amber',
                statBuff: '+25 Resilience · +30 Community Legacy',
                exhibit: {
                  title: 'IRS Letter 147C — Verification of Employer Identification Number',
                  issuer: 'Department of the Treasury · Internal Revenue Service (IRS)',
                  recordNumber: 'EIN: 35-2472616 · Notice Date: January 29, 2016',
                  legalEntity: 'JEANELL LAND EMPLOYMENT REHABILITATION COMMUNITY AGENCY',
                  officialAddress: 'PO Box 7191, Detroit MI 48207-0191',
                  keyProvisions: [
                    'Official federal tax identification establishing grassroots community re-entry entity',
                    'Authorized to provide transitional employment coaching, youth mentorship, and vocational trade linkages',
                    'Established foundational infrastructure for returning citizens across Detroit neighborhoods',
                  ],
                  historicalSignificance:
                    'Proves authentic, documented grassroots leadership rooted in Detroit over a decade ago. Jeanell built the institutional groundwork from scratch to uplift families before gaining corporate or institutional capital.',
                },
              },
              {
                id: 'milestone-2016-crucible',
                epoch: 'early',
                year: '2016',
                dateBadge: 'Fall 2016',
                title: 'The 26-Day False Imprisonment & Birth of One Stop Rehabilitation Center',
                category: 'Systemic Crucible to 501(c)(3) Non-Profit Rebirth',
                officialRecord: '3rd Judicial Circuit Court Dismissal with Prejudice · 501(c)(3) Tax-Exempt Status',
                description:
                  'Arrested and falsely detained for 26 days over an extended and returned rental car due to computer error. Upon full dismissal of all charges with prejudice, Jeanell channeled the trauma into founding One Stop Rehabilitation Center (15400 Grand River Ave), creating legal defense clinics, youth S.T.E.A.M. labs, and emergency domestic violence shelter.',
                evolutionLesson:
                  'Refusing to succumb to bitterness; turning an unconstitutional arrest into a beacon of pro bono legal defense.',
                icon: Shield,
                color: 'rose',
                statBuff: '+35 Resilience · +25 Redemption Points',
                exhibit: {
                  title: 'Wayne County 3rd Judicial Circuit Court Dismissal & 501(c)(3) Formation',
                  issuer: 'State of Michigan 3rd Judicial Circuit Court & IRS Exempt Organizations',
                  recordNumber: 'Circuit Court Dismissal with Prejudice · 501(c)(3) Tax-Exempt Status',
                  legalEntity: 'ONE STOP REHABILITATION CENTER INC.',
                  officialAddress: '15400 Grand River Ave, Detroit MI 48227',
                  keyProvisions: [
                    'Complete judicial dismissal with prejudice of all wrongful charges stemming from rental vehicle error',
                    'Formation of 501(c)(3) tax-exempt public sanctuary offering pro bono legal defense and youth STEM',
                    'Dedicated emergency shelter and trauma counseling for domestic violence survivors',
                  ],
                  historicalSignificance:
                    'A monument to personal and community fortitude. Rather than letting 26 days of unlawful detention break her spirit, Jeanell transformed her pain into a multi-decade public charity providing free legal assistance to hundreds of falsely accused Detroiters.',
                },
              },
              {
                id: 'milestone-2018-tears',
                epoch: 'growth',
                year: '2018–2022',
                dateBadge: 'Broadcast Expansion',
                title: 'T.E.A.R.S. Channel 24/7 TV & TEARadio 100.1 FM Network',
                category: 'Public Media Infrastructure, Tenant Rights & S.T.E.A.M. Broadcast',
                officialRecord: 'Broadcast Facility Charter & Global Digital Webstream · 100.1 FM Detroit',
                description:
                  'Recognizing that community defense requires independent public communications, Jeanell established T.E.A.R.S. Channel 24/7 and TEARadio 100.1 FM. Produced round-the-clock educational curriculum on wrongful property foreclosures, youth coding, tenant legal rights, and financial literacy, educating over 50,000 households.',
                evolutionLesson:
                  'Expanding beyond localized rooms into sovereign media airwaves to amplify truth and shield vulnerable families.',
                icon: Zap,
                color: 'cyan',
                statBuff: '+25 Media Communication · +20 Community Resilience',
                exhibit: {
                  title: 'T.E.A.R.S. Channel 24/7 & TEARadio 100.1 FM Public Broadcasting Network',
                  issuer: 'Federal Communications Commission & Michigan Media Collective',
                  recordNumber: 'Broadcast Stream ID: DET-100.1-FM · Facility License',
                  legalEntity: 'T.E.A.R.S. BROADCASTING NETWORK & TEARADIO',
                  officialAddress: 'Detroit, Michigan (Global Digital Stream)',
                  keyProvisions: [
                    '24/7 educational broadcasts covering S.T.E.A.M. education, property rights, and civil justice',
                    'Pro bono legal intake hotline for families facing predatory deed fraud and unlawful evictions',
                    'Youth broadcasting and audio engineering vocational certification studio',
                  ],
                  historicalSignificance:
                    'Democratized media ownership in Detroit. When mainstream news ignored low-income tenant evictions and school closures, Jeanell built a broadcast network to inform and mobilize the public.',
                },
              },
              {
                id: 'milestone-2023-all-your-needs',
                epoch: 'growth',
                year: '2023',
                dateBadge: 'October 5, 2023',
                title: 'All Your Needs Reality LLC (Commercial Real Estate & Housing Foundations)',
                category: 'Commercial Asset Ownership & Generational Equity',
                officialRecord: 'IRS Notice CP 575 A / Form SS-4 · EIN: 93-3773484 · Detroit, MI',
                description:
                  'Recognizing that community stability requires hard real estate assets, Jeanell founded All Your Needs Reality LLC as Sole Member. Expanded into commercial multi-unit property acquisition, affordable housing stabilization, and commercial facilities to anchor Detroit families in generational equity.',
                evolutionLesson:
                  'Evolving beyond emergency social support into hard-asset property ownership and sustainable commercial development.',
                icon: Building2,
                color: 'emerald',
                statBuff: '+30 Financial Acumen · +25 Community Legacy',
                exhibit: {
                  title: 'IRS Notice CP 575 A (Rev. 10-2023) — Employer Identification Number Confirmation',
                  issuer: 'Department of the Treasury · Internal Revenue Service (IRS)',
                  recordNumber: 'EIN: 93-3773484 · Notice Date: October 5, 2023 · Form: SS-4',
                  legalEntity: 'ALL YOUR NEEDS REALITY LLC · JEANELL LAND SOLE MBR',
                  officialAddress: 'DETROIT, MICHIGAN',
                  keyProvisions: [
                    'Official federal commercial real estate entity formation with IRS Form 1065 / pass-through status',
                    'Headquartered in Detroit, Michigan for commercial infill and housing preservation',
                    'Commercial brokerage authority for land acquisition, infill development, and commercial metaverse assets',
                  ],
                  historicalSignificance:
                    'The verified IRS Notice CP 575 A confirming the corporate commercial real estate firm founded by Broker Jeanell Land. Represents the crucial strategic pivot from emergency social services to permanent hard-asset land ownership.',
                },
              },
              {
                id: 'milestone-2024-family-reunite',
                epoch: 'patents',
                year: '2024–2026',
                dateBadge: 'National Movement',
                title: 'The Family Reunite Act (Citizen Legislative Campaign)',
                category: 'Federal & State Statutory Civil Rights Advocacy',
                officialRecord: 'Change.org/FamilyReuniteAct · Child Support & Garnish Wages Reform',
                description:
                  'Launched nationwide citizen campaign demanding statutory bans on child welfare removals caused by unproven arrests, mandatory 14-day custody restoration upon criminal dismissal, complete vacatur of child support arrears accumulated while detained, and state restorative reparation bonds.',
                evolutionLesson:
                  'Taking the battle from local courtrooms to the halls of Congress and state legislatures to protect millions of families.',
                icon: Heart,
                color: 'rose',
                statBuff: '+30 Civil Advocacy · +25 Resilience',
                exhibit: {
                  title: 'The Family Reunite Act — Legislative Reform Petition & Model Statute',
                  issuer: 'National Coalition for Family Preservation & Change.org/FamilyReuniteAct',
                  recordNumber: 'Public Petition: change.org/p/FamilyReuniteAct · Co-Sponsored by Citizen Allies',
                  legalEntity: 'THE FAMILY REUNITE ACT CITIZEN ALLIANCE',
                  officialAddress: 'Detroit, MI & Nationwide Congressional Districts',
                  keyProvisions: [
                    'Statutory prohibition against CPS parental removals stemming from unadjudicated arrests',
                    'Mandatory 14-day expedited judicial custody restoration upon criminal dismissal or acquittal',
                    'Complete retroactive vacatur and wage garnishment relief for incarceration child support arrears',
                    'Creation of State Restorative Reparation Bonds for unconstitutionally detained parents',
                  ],
                  historicalSignificance:
                    'Demonstrates active legislative authorship, uniting thousands of citizens to rewrite systemic injustice into protective statutory law. Targets the pipeline that separated Jeanell from her own children.',
                },
              },
              {
                id: 'milestone-2026-ethics',
                epoch: 'patents',
                year: '2026',
                dateBadge: 'August 18, 2026',
                title: 'Michigan 24-Hour Life & Health Course with Ethics Licensure',
                category: 'Professional State Licensure & Ethical Financial Protection',
                officialRecord: 'State of Michigan LARA · License #0323291 · Course ID: 94345 (21 Life & Health, 3 Ethics)',
                description:
                  'Completed intensive state-accredited professional licensure via At Your Pace Online (Provider 0991) to provide ethical estate planning, family health insurance protections, and wealth-building advisory for working-class households.',
                evolutionLesson:
                  'Lifelong intellectual dedication: continually certifying professional competency to deliver gold-standard financial defense.',
                icon: Award,
                color: 'cyan',
                statBuff: '+25 Financial Acumen · +20 Resilience',
                exhibit: {
                  title: 'Certificate of Completion — 24-Hour Life and Health Course with 3 Hours of Ethics',
                  issuer: 'State of Michigan Department of Insurance and Financial Services (DIFS) / LARA',
                  recordNumber: 'Course ID: 94345 · License #0323291 · Provider #0991 (At Your Pace Online)',
                  legalEntity: 'JEANELL LAND · LICENSED FINANCIAL & INSURANCE ADVISOR',
                  officialAddress: 'State of Michigan (Completed August 18, 2026)',
                  keyProvisions: [
                    '21 hours comprehensive study of Life, Health, Annuities, and Estate Preservation',
                    '3 hours rigorous professional fiduciary ethics and client protection standards',
                    'Certified under State of Michigan LARA to advise families on legacy wealth and health shields',
                  ],
                  historicalSignificance:
                    'Proves an ongoing dedication to evolution: continually completing state-regulated credentialing to safeguard community assets from predatory insurance scams and probate loss.',
                },
              },
              {
                id: 'milestone-2026-patents',
                epoch: 'patents',
                year: '2026',
                dateBadge: 'August – September 2026',
                title: 'Pro Se United States Patent Portfolio (4 USPTO Filings)',
                category: 'High-Tech Invention & Biometric Infrastructure',
                officialRecord: 'USPTO Customer Dockets: STEARSAFE-ATM-2026-002, FINSEC-ATM-2026-003, TEARSAFE-SOC-2026-0901, UNIFIED-2026-0901',
                description:
                  'Independently authored and filed four groundbreaking United States provisional patent applications as an independent pro se inventor: developing anti-occlusion ATM biometrics, dual-beneficiary push authorizations, in-transit telematics HUD streaming, and unified multi-vector synthetic fraud defense spanning dealerships, child safety nodes, and real estate deed locking.',
                evolutionLesson:
                  'Mastering deep computer vision, cryptography, and patent claim drafting without high-priced corporate law firms.',
                icon: Zap,
                color: 'purple',
                statBuff: '+35 S.T.E.A.M. Mastery · +30 Resilience',
                exhibit: {
                  title: 'United States Provisional Patent Specifications & Claim Dockets',
                  issuer: 'United States Patent and Trademark Office (USPTO)',
                  recordNumber: 'Dockets: STEARSAFE-ATM-2026-002, FINSEC-ATM-2026-003, TEARSAFE-SOC-2026-0901, UNIFIED-2026-0901',
                  legalEntity: 'JEANELL LAND · PRO SE INVENTOR & APPLICANT',
                  officialAddress: 'Detroit, MI · USPTO Electronic Filing System (Patent Center)',
                  keyProvisions: [
                    '20 formal technical claims detailing optical camera occlusion sensor rings for financial ATMs',
                    'Dual-beneficiary real-time cryptographic push authorization preventing coercion and ATM robberies',
                    'Telematics-synchronized heads-up display (HUD) streaming for in-transit transit safety',
                    'Unified synthetic fraud defense tying financial institutions, vehicle sales, and title deeds',
                  ],
                  historicalSignificance:
                    'Proves elite independent technological invention at the highest federal level, turning lived experience into patented world-class intellectual property without corporate backing.',
                },
              },
              {
                id: 'milestone-2026-stear-metaverse',
                epoch: 'patents',
                year: '2026 & Beyond',
                dateBadge: 'Active Generation',
                title: 'The S.T.E.A.R.Safe Unified Ecosystem & Metaverse Real Estate Board',
                category: 'Full-Stack Technological & Generational Sovereignty',
                officialRecord: 'Interactive 101-Level Metaverse Real Estate World & S-T-E-A-R Telematics Hub',
                description:
                  'The full-circle culmination of 10+ years of resilience: synthesizing aerospace propulsion, commercial real estate brokerage with All Your Needs Reality LLC, pro bono legal advocacy, and interactive 101-level educational simulations into an unstoppable generational engine for youth and families.',
                evolutionLesson:
                  'Synthesizing a decade of hard-fought trials into an unassailable sovereign technology stack that protects both physical bodies and financial assets nationwide.',
                icon: Layers,
                color: 'emerald',
                statBuff: '+40 Resilience · +35 Community Legacy',
                exhibit: {
                  title: 'S.T.E.A.Reality & Metaverse Real Estate Architecture Specification',
                  issuer: 'All Your Needs Reality LLC & S.T.E.A.R. Technologies',
                  recordNumber: 'Unified Multi-Vector Platform Version 2026.1',
                  legalEntity: 'S.T.E.A.REALITY UNIFIED ECOSYSTEM',
                  officialAddress: 'Detroit, MI & Nationwide',
                  keyProvisions: [
                    'Real-time resilience telemetry engine linking stress states with biofeedback audio',
                    'Monopoly GO & Smart Cash affiliate commercial real estate metaverse board',
                    'Integrated S-T-E-A-R Safe rides, courier dispatch, and pro bono legal triage',
                    'Diplomas, certifications, and high-school to adult career pathways',
                  ],
                  historicalSignificance:
                    'The living blueprint of lifelong evolution: proof that relentless dedication turns every barrier into a springboard for community empowerment.',
                },
              },
            ]
              .filter((m) => timelineFilter === 'all' || m.epoch === timelineFilter)
              .map((milestone) => {
                const Icon = milestone.icon;
                const isClaimed = !!claimedMilestones[milestone.id];

                return (
                  <div
                    key={milestone.id}
                    className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 sm:p-6 transition-all space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-emerald-400 font-mono font-black text-sm">
                          {milestone.year}
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-white flex items-center gap-2">
                            <span>{milestone.title}</span>
                          </h3>
                          <span className="text-[11px] font-mono text-emerald-400 font-semibold">
                            {milestone.category}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                          {milestone.dateBadge}
                        </span>
                      </div>
                    </div>

                    {/* Official Record Badge + Inspect Exhibit Button */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 bg-slate-950 rounded-xl border border-slate-800/80 font-mono text-[11px]">
                      <div className="flex items-center gap-2 text-cyan-300 truncate">
                        <FileText className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span className="truncate">Verified Record: {milestone.officialRecord}</span>
                      </div>
                      <button
                        onClick={() => {
                          sound.playClick();
                          setActiveExhibit(milestone.exhibit);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/40 text-[10px] font-bold flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
                      >
                        <Eye className="w-3 h-3 text-cyan-400" />
                        <span>Inspect Official Exhibit</span>
                      </button>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                      {milestone.description}
                    </p>

                    {/* Resilience Lesson & Claim Reward */}
                    <div className="p-3 bg-slate-950/60 rounded-xl border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                        <span className="text-slate-200">
                          <strong className="text-amber-300">Resilience Lesson:</strong> {milestone.evolutionLesson}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="font-mono text-[11px] text-emerald-400 font-bold">
                          {milestone.statBuff}
                        </span>

                        <button
                          onClick={() => {
                            if (isClaimed) return;
                            sound.playSuccess();
                            const updated = { ...claimedMilestones, [milestone.id]: true };
                            setClaimedMilestones(updated);
                            try {
                              localStorage.setItem('jeanell_journey_claimed_milestones', JSON.stringify(updated));
                            } catch {}
                            onUpdateStats({ resilience: 5, steamMastery: 5 });
                          }}
                          disabled={isClaimed}
                          className={`px-3 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-all ${
                            isClaimed
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40 cursor-default'
                              : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow cursor-pointer'
                          }`}
                        >
                          {isClaimed ? (
                            <>
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Internalized ✓</span>
                            </>
                          ) : (
                            <>
                              <Zap className="w-3 h-3" />
                              <span>Internalize (+5% Res)</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* Official Document Exhibit Modal */}
      {activeExhibit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-slate-950 border-2 border-cyan-500/40 rounded-2xl max-w-2xl w-full p-6 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto text-slate-100 animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40 text-[10px] font-mono font-bold uppercase">
                    Official Government Exhibit
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">Public Record</span>
                </div>
                <h2 className="text-lg font-black text-white">{activeExhibit.title}</h2>
                <div className="text-xs text-cyan-300 font-mono">{activeExhibit.issuer}</div>
              </div>

              <button
                onClick={() => {
                  sound.playClick();
                  setActiveExhibit(null);
                }}
                className="text-slate-400 hover:text-white p-1.5 rounded-lg bg-slate-900 cursor-pointer"
                aria-label="Close exhibit"
              >
                ✕
              </button>
            </div>

            {/* Official Document Box */}
            <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 space-y-3 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-3 border-b border-slate-800">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block">Government Filing ID</span>
                  <span className="text-emerald-400 font-bold">{activeExhibit.recordNumber}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block">Entity / Applicant Name</span>
                  <span className="text-white font-bold">{activeExhibit.legalEntity}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block">Jurisdiction / Location</span>
                  <span className="text-slate-300">{activeExhibit.officialAddress}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block">Verification Status</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 inline" />
                    Authentic &amp; On File
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] text-slate-400 uppercase block">Key Provisions &amp; Specifications</span>
                <ul className="space-y-1 list-disc list-inside text-slate-300 text-[11px] font-sans">
                  {activeExhibit.keyProvisions.map((prov: string, pIdx: number) => (
                    <li key={pIdx} className="leading-relaxed">
                      {prov}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Historical Significance Callout */}
            <div className="p-3.5 bg-emerald-950/40 border border-emerald-500/30 rounded-xl space-y-1 text-xs">
              <span className="text-amber-300 font-bold uppercase tracking-wider text-[10px] flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Historical Resilience Significance
              </span>
              <p className="text-slate-200 leading-relaxed font-sans">{activeExhibit.historicalSignificance}</p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => {
                  if (claimedExhibits[activeExhibit.recordNumber]) return;
                  sound.playSuccess();
                  const updated = { ...claimedExhibits, [activeExhibit.recordNumber]: true };
                  setClaimedExhibits(updated);
                  try {
                    localStorage.setItem('jeanell_journey_claimed_exhibits', JSON.stringify(updated));
                  } catch {}
                  onUpdateStats({ resilience: 5 });
                }}
                disabled={!!claimedExhibits[activeExhibit.recordNumber]}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                  claimedExhibits[activeExhibit.recordNumber]
                    ? 'bg-slate-800 text-slate-400 cursor-default'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow cursor-pointer'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>
                  {claimedExhibits[activeExhibit.recordNumber]
                    ? 'Exhibit Studied (+5% Res Claimed)'
                    : 'Absorb Exhibit Wisdom (+5% Resilience)'}
                </span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  setActiveExhibit(null);
                }}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold cursor-pointer transition-colors"
              >
                Close Exhibit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Archive Question Detail / Test Modal */}
      {activeArchiveQ && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                {activeArchiveQ.categoryLabel} · {activeArchiveQ.eraOrYear}
              </span>
              <button
                onClick={() => setActiveArchiveQ(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg bg-slate-900"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              <div className="text-xs text-slate-400 font-mono">
                {activeArchiveQ.historicalFigureOrTopic}
              </div>
              <h2 className="text-lg font-bold text-white leading-relaxed">
                {activeArchiveQ.question}
              </h2>
            </div>

            <div className="space-y-2.5">
              {activeArchiveQ.options.map((opt, oIdx) => {
                const isCorrect = oIdx === activeArchiveQ.correctIndex;
                const letter = String.fromCharCode(65 + oIdx);
                const isSelected = selectedOption === oIdx;

                return (
                  <button
                    key={oIdx}
                    onClick={() => {
                      handleSubmitAnswer(activeArchiveQ, oIdx);
                    }}
                    className={`w-full text-left p-3.5 rounded-xl border flex items-start gap-3 transition-colors ${
                      isCorrect
                        ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                        : isSelected
                        ? 'bg-red-950/60 border-red-500 text-red-200'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span className="w-6 h-6 rounded bg-slate-800 text-xs font-bold flex items-center justify-center shrink-0">
                      {letter}
                    </span>
                    <span className="text-sm font-medium">{opt}</span>
                    {isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 ml-auto shrink-0" />}
                  </button>
                );
              })}
            </div>

            <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 space-y-3 text-xs">
              <div>
                <span className="font-bold text-white">Historical Explanation: </span>
                <span className="text-slate-300">{activeArchiveQ.explanation}</span>
              </div>
              <div className="border-t border-slate-800 pt-2 text-slate-400">
                <span className="font-semibold text-cyan-400">Archival Context: </span>
                {activeArchiveQ.historicalContext}
              </div>
              <div className="border-t border-slate-800 pt-2 text-slate-400">
                <span className="font-semibold text-amber-400">Jeanell's Wisdom: </span>
                {activeArchiveQ.milestoneLesson}
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setActiveArchiveQ(null)}
                className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold transition-colors"
              >
                Close Question
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
