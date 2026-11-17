import React, { useState } from 'react';
import {
  X,
  Calendar,
  CheckCircle2,
  Clock,
  Flame,
  TrendingUp,
  Award,
  Sparkles,
  ArrowRight,
  Wind,
  Radio,
  ShieldCheck,
  Compass,
  DollarSign,
  BarChart3,
  History,
  AlertCircle,
  Gift,
  Share2,
} from 'lucide-react';
import {
  DailyMission,
  MissionHistoryEntry,
  ResilienceStreakState,
} from '../../data/dailyMissionData';
import { sound } from '../../utils/audio';

interface MissionHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: MissionHistoryEntry[];
  streak: ResilienceStreakState;
  currentMission: DailyMission;
  onNavigateToTab: (tab: DailyMission['targetTab']) => void;
  onCompleteMission: (missionId: string) => void;
  onShareStreak?: () => void;
}

export const MissionHistoryModal: React.FC<MissionHistoryModalProps> = ({
  isOpen,
  onClose,
  history,
  streak,
  currentMission,
  onNavigateToTab,
  onCompleteMission,
  onShareStreak,
}) => {
  const [activeView, setActiveView] = useState<'timeline' | 'growth'>('timeline');

  if (!isOpen) return null;

  const completedEntries = history.filter((h) => h.status === 'completed');
  const completionRate = Math.round((completedEntries.length / history.length) * 100);
  const totalWeekRedemption = completedEntries.reduce(
    (sum, h) => sum + h.redemptionPointsEarned,
    0
  );
  const totalWeekCash = completedEntries.reduce((sum, h) => sum + h.bonusCashEarned, 0);
  const totalWeekResilience = completedEntries.reduce(
    (sum, h) => sum + h.bonusResilienceEarned,
    0
  );

  // Reverse chronological for the timeline list (Today first, down to 6 days ago)
  const timelineList = [...history].reverse();

  const getCategoryIcon = (category: DailyMission['category']) => {
    switch (category) {
      case 'Wind Tunnel Lab':
        return <Wind className="w-4 h-4 text-cyan-400" />;
      case 'Detroit News & Radio':
        return <Radio className="w-4 h-4 text-rose-400" />;
      case 'Biometrics & Read Mode':
        return <ShieldCheck className="w-4 h-4 text-emerald-400" />;
      case 'Classmate Study':
        return <Sparkles className="w-4 h-4 text-amber-400" />;
      case 'Financial & MLS':
        return <Compass className="w-4 h-4 text-indigo-400" />;
      default:
        return <Flame className="w-4 h-4 text-amber-400" />;
    }
  };

  const streakLadder = [
    {
      days: 1,
      tier: 'Bronze Ignition',
      emoji: '🔥',
      multiplier: '1.0x',
      desc: 'Base Redemption Points on daily mission completion',
    },
    {
      days: 2,
      tier: 'Silver Momentum',
      emoji: '🥈',
      multiplier: '1.25x',
      desc: '+25% Redemption Point boost for 2–3 consecutive days',
    },
    {
      days: 4,
      tier: 'Gold Consistency',
      emoji: '🏆',
      multiplier: '1.5x',
      desc: '+50% Redemption Point boost for 4–6 consecutive days',
    },
    {
      days: 7,
      tier: 'Diamond Mastery',
      emoji: '💎',
      multiplier: '2.0x',
      desc: 'Double (2x) Redemption Points for a full 7-day week!',
    },
    {
      days: 14,
      tier: 'Unstoppable Sovereign',
      emoji: '👑',
      multiplier: '2.5x',
      desc: 'Maximum 2.5x Sovereign Multiplier + Academy Honors',
    },
  ];

  const maxPointsInWeek = Math.max(
    80,
    ...history.map((h) => h.redemptionPointsEarned || h.baseRedemptionReward)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden my-8">
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-slate-950 via-indigo-950/70 to-slate-950 p-6 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shadow-lg">
              <History className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-bold">
                  7-DAY CONSISTENCY &amp; STREAK LOG
                </span>
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border bg-gradient-to-r ${streak.streakBadge.color}`}
                >
                  <span>{streak.streakBadge.emoji}</span>
                  <span>{streak.currentStreakDays}-Day Active Streak ({streak.multiplier}x)</span>
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                Daily Mission History &amp; Engagement Growth
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {onShareStreak && (
              <button
                onClick={() => {
                  sound.playClick();
                  onShareStreak();
                }}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-black text-xs flex items-center gap-1.5 shadow-lg shadow-rose-500/20 transition-all hover:scale-105 cursor-pointer"
                title="Broadcast your current streak status and stats to your network"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share My Streak</span>
              </button>
            )}

            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
              title="Close Mission History"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 4 Key Weekly KPI Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-6 pb-4 bg-slate-950/60 border-b border-slate-800/80">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5">
            <div className="text-[10px] font-mono uppercase text-slate-400 flex items-center justify-between">
              <span>7-Day Consistency</span>
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <div className="text-xl font-black text-white mt-1">
              {completedEntries.length} / {history.length} Days
            </div>
            <div className="text-[11px] text-cyan-400 font-semibold mt-0.5">
              {completionRate}% Weekly Completion
            </div>
          </div>

          <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-3.5">
            <div className="text-[10px] font-mono uppercase text-slate-400 flex items-center justify-between">
              <span>Current Streak</span>
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            </div>
            <div className="text-xl font-black text-amber-300 mt-1">
              {streak.currentStreakDays} Consecutive
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Best Record: <strong className="text-white">{streak.bestStreakDays} Days</strong> ({streak.multiplier}x Boost)
            </div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5">
            <div className="text-[10px] font-mono uppercase text-slate-400 flex items-center justify-between">
              <span>7-Day Redemption</span>
              <Award className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="text-xl font-black text-amber-400 mt-1">
              +{totalWeekRedemption} Pts
            </div>
            <div className="text-[11px] text-emerald-400 font-semibold mt-0.5">
              +{totalWeekResilience}% Resilience Gained
            </div>
          </div>

          <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-3.5">
            <div className="text-[10px] font-mono uppercase text-slate-400 flex items-center justify-between">
              <span>7-Day Cash Earned</span>
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-xl font-black text-emerald-400 mt-1 font-mono">
              +${totalWeekCash.toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Credited to Academy Wallet
            </div>
          </div>
        </div>

        {/* 7-Day Visual Streak & Consistency Strip */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Past 7 Days Streak &amp; Multiplier Chain</span>
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              Complete daily goals consecutively to escalate your multiplier up to 2.5x!
            </span>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {history.map((day) => {
              const isCompleted = day.status === 'completed';
              const isPendingToday = day.status === 'pending_today';
              return (
                <div
                  key={day.date}
                  className={`rounded-xl p-2.5 border text-center transition-all flex flex-col items-center justify-between ${
                    isCompleted
                      ? 'bg-emerald-950/50 border-emerald-500/50 text-emerald-200 shadow-sm'
                      : isPendingToday
                      ? 'bg-amber-950/50 border-amber-400 text-amber-200 ring-1 ring-amber-400/50'
                      : 'bg-slate-900/70 border-slate-800 text-slate-500'
                  }`}
                >
                  <span className="text-[10px] font-mono uppercase font-bold tracking-tight">
                    {day.shortDayName}
                  </span>

                  <div className="my-1.5">
                    {isCompleted ? (
                      <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      </div>
                    ) : isPendingToday ? (
                      <div className="w-7 h-7 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center mx-auto animate-pulse">
                        <Clock className="w-4 h-4 text-amber-300" />
                      </div>
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center mx-auto">
                        <AlertCircle className="w-3.5 h-3.5 text-slate-500" />
                      </div>
                    )}
                  </div>

                  {isCompleted ? (
                    <div className="space-y-0.5">
                      <div className="text-[10px] font-black text-amber-300 font-mono">
                        +{day.redemptionPointsEarned} pts
                      </div>
                      <div className="text-[9px] font-mono bg-emerald-900/70 text-emerald-300 px-1.5 rounded">
                        {day.multiplierApplied}x Streak
                      </div>
                    </div>
                  ) : isPendingToday ? (
                    <div className="space-y-0.5">
                      <div className="text-[10px] font-bold text-amber-300">Active</div>
                      <div className="text-[9px] font-mono bg-amber-900/60 text-amber-200 px-1.5 rounded">
                        {day.multiplierApplied}x Ready
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-0.5">
                      <div className="text-[10px] text-slate-500">Missed</div>
                      <div className="text-[9px] font-mono text-slate-600">Reset</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Sub-Navigation Tabs inside Modal */}
        <div className="flex items-center gap-2 px-6 pt-4 border-b border-slate-800 bg-slate-900">
          <button
            onClick={() => {
              sound.playClick();
              setActiveView('timeline');
            }}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
              activeView === 'timeline'
                ? 'border-amber-400 text-amber-300 bg-slate-950/60'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <History className="w-4 h-4" />
            <span>7-Day Mission Timeline &amp; Past Rewards</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveView('growth');
            }}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
              activeView === 'growth'
                ? 'border-cyan-400 text-cyan-300 bg-slate-950/60'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Engagement Growth &amp; Multiplier Tiers</span>
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 max-h-[52vh] overflow-y-auto space-y-4">
          {activeView === 'timeline' ? (
            <div className="space-y-3">
              {timelineList.map((item) => {
                const isCompleted = item.status === 'completed';
                const isPendingToday = item.status === 'pending_today';

                return (
                  <div
                    key={item.date}
                    className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                      isCompleted
                        ? 'bg-slate-950/90 border-emerald-500/40 hover:border-emerald-500/60'
                        : isPendingToday
                        ? 'bg-gradient-to-r from-amber-950/40 via-slate-950 to-slate-950 border-amber-500/50'
                        : 'bg-slate-950/50 border-slate-800/80 opacity-75'
                    }`}
                  >
                    {/* Left: Timeline Date & Mission Info */}
                    <div className="flex items-start gap-3.5 flex-1">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border mt-0.5 ${
                          isCompleted
                            ? 'bg-emerald-950 border-emerald-500/50 text-emerald-400'
                            : isPendingToday
                            ? 'bg-amber-950 border-amber-500/50 text-amber-300'
                            : 'bg-slate-900 border-slate-800 text-slate-500'
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : isPendingToday ? (
                          <Clock className="w-5 h-5 animate-pulse" />
                        ) : (
                          <AlertCircle className="w-5 h-5" />
                        )}
                      </div>

                      <div className="space-y-1 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-mono font-bold text-white bg-slate-900 px-2.5 py-0.5 rounded border border-slate-700">
                            {item.dayLabel}
                          </span>

                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-slate-900 text-slate-300 border border-slate-800">
                            {getCategoryIcon(item.category)}
                            <span>{item.category}</span>
                          </span>

                          {isCompleted && (
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                              ✓ Completed {item.completedAtTime ? `at ${item.completedAtTime}` : ''}
                            </span>
                          )}

                          {isPendingToday && (
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                              In Progress Today
                            </span>
                          )}

                          {item.status === 'missed' && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                              Missed Goal (Streak Reset)
                            </span>
                          )}
                        </div>

                        <h4 className="text-sm font-bold text-white">{item.title}</h4>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          {item.shortDescription}
                        </p>
                      </div>
                    </div>

                    {/* Right: Rewards & Action */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0 border-t sm:border-t-0 border-slate-800 pt-2.5 sm:pt-0">
                      {isCompleted ? (
                        <div className="text-right space-y-1">
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/90 border border-emerald-500/40 text-xs font-black text-amber-300">
                            <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                            <span>+{item.redemptionPointsEarned} Redemption Pts</span>
                          </div>
                          <div className="flex items-center justify-end gap-2 text-[11px] font-mono">
                            <span className="text-emerald-400 font-bold">
                              +${item.bonusCashEarned} Cash
                            </span>
                            <span className="text-slate-600">·</span>
                            <span className="text-cyan-300">
                              {item.multiplierApplied}x Streak Boost
                            </span>
                          </div>
                        </div>
                      ) : isPendingToday ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              sound.playClick();
                              onNavigateToTab(item.targetTab);
                              onClose();
                            }}
                            className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black flex items-center gap-1 shadow-sm cursor-pointer"
                          >
                            <span>Go to Lab</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              sound.playSuccess();
                              onCompleteMission(currentMission.id);
                            }}
                            className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1 shadow-sm cursor-pointer"
                          >
                            <Gift className="w-3.5 h-3.5" />
                            <span>Claim +{item.redemptionPointsEarned} Pts</span>
                          </button>
                        </div>
                      ) : (
                        <div className="text-right">
                          <span className="text-xs font-mono text-slate-500 block">
                            0 Pts Earned
                          </span>
                          <button
                            onClick={() => {
                              sound.playClick();
                              onNavigateToTab(item.targetTab);
                              onClose();
                            }}
                            className="text-[11px] text-cyan-400 hover:text-cyan-300 underline font-semibold mt-0.5 cursor-pointer"
                          >
                            Practice Module Now →
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* TAB 2: ENGAGEMENT GROWTH & MULTIPLIER TIERS */
            <div className="space-y-6">
              {/* Bar Chart of Daily Redemption Points */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-cyan-400" />
                      <span>7-Day Redemption Point &amp; Consistency Growth</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Visualizing how consecutive daily completions compound your Redemption Point rewards.
                    </p>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-500/30">
                    Total: +{totalWeekRedemption} Pts
                  </span>
                </div>

                <div className="grid grid-cols-7 gap-3 items-end h-40 pt-6 px-2 border-b border-slate-800 pb-2">
                  {history.map((day) => {
                    const pts =
                      day.status === 'completed' ? day.redemptionPointsEarned : 0;
                    const heightPct = Math.max(8, Math.round((pts / maxPointsInWeek) * 100));

                    return (
                      <div
                        key={day.date}
                        className="flex flex-col items-center justify-end h-full gap-1.5"
                      >
                        <span className="text-[10px] font-mono font-bold text-amber-300">
                          {pts > 0 ? `+${pts}` : day.status === 'pending_today' ? 'Today' : '0'}
                        </span>
                        <div className="w-full max-w-[42px] bg-slate-900 rounded-t-lg overflow-hidden flex items-end h-28 border border-slate-800/80">
                          <div
                            style={{ height: `${heightPct}%` }}
                            className={`w-full rounded-t-md transition-all duration-500 ${
                              day.status === 'completed'
                                ? 'bg-gradient-to-t from-emerald-600 via-cyan-500 to-amber-400'
                                : day.status === 'pending_today'
                                ? 'bg-amber-500/40 border-t-2 border-amber-400 animate-pulse'
                                : 'bg-slate-800'
                            }`}
                          />
                        </div>
                        <span className="text-[10px] font-mono text-slate-400">
                          {day.shortDayName}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Resilience Streak Escalating Multiplier Ladder */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>Resilience Streak Multiplier Progression Tiers</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
                  {streakLadder.map((tier) => {
                    const isUnlocked = streak.currentStreakDays >= tier.days;
                    return (
                      <div
                        key={tier.tier}
                        className={`p-3 rounded-xl border text-xs space-y-1.5 ${
                          isUnlocked
                            ? 'bg-amber-950/30 border-amber-500/50 text-white shadow-md'
                            : 'bg-slate-900/60 border-slate-800 text-slate-400'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-base">{tier.emoji}</span>
                          <span
                            className={`font-mono font-black text-xs px-1.5 py-0.5 rounded ${
                              isUnlocked
                                ? 'bg-amber-400 text-slate-950'
                                : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {tier.multiplier}
                          </span>
                        </div>
                        <div className="font-bold text-white">{tier.tier}</div>
                        <div className="text-[10px] text-slate-400 leading-snug">
                          {tier.days}+ Day Streak: {tier.desc}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="text-slate-400">
            Consistency builds sovereign financial &amp; S.T.E.A.M. mastery. Never give up—from age 4½ to 90+!
          </div>
          <div className="flex items-center gap-2.5">
            {onShareStreak && (
              <button
                onClick={() => {
                  sound.playClick();
                  onShareStreak();
                }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 via-pink-600 to-cyan-600 hover:from-rose-500 hover:to-cyan-500 text-white font-bold flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share My Streak ({streak.currentStreakDays}d · {streak.multiplier}x)</span>
              </button>
            )}
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition-colors cursor-pointer"
            >
              Close History
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
