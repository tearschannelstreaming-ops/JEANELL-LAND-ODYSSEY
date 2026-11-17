import React, { useState, useEffect } from 'react';
import {
  Compass,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Clock,
  Award,
  Flame,
  Radio,
  Wind,
  ShieldCheck,
  Zap,
  RefreshCw,
  Gift,
  History,
} from 'lucide-react';
import { DailyMission, ResilienceStreakState } from '../../data/dailyMissionData';
import { sound } from '../../utils/audio';

interface DailyMissionCardProps {
  mission: DailyMission;
  streak: ResilienceStreakState;
  onNavigateToTab: (tab: DailyMission['targetTab']) => void;
  onCompleteMission: (missionId: string) => void;
  onOpenHistory?: () => void;
}

export const DailyMissionCard: React.FC<DailyMissionCardProps> = ({
  mission,
  streak,
  onNavigateToTab,
  onCompleteMission,
  onOpenHistory,
}) => {
  const [timeLeftStr, setTimeLeftStr] = useState<string>('');

  useEffect(() => {
    const updateCountdown = () => {
      const remainingMs = Math.max(0, mission.expiresAt - Date.now());
      const hours = Math.floor(remainingMs / (1000 * 60 * 60));
      const minutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remainingMs % (1000 * 60)) / 1000);
      setTimeLeftStr(`${hours}h ${minutes}m ${seconds}s`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [mission.expiresAt]);

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

  return (
    <div
      className={`rounded-2xl border transition-all p-4 shadow-lg relative overflow-hidden ${
        mission.isCompleted
          ? 'bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-950 border-emerald-500/50'
          : 'bg-gradient-to-r from-amber-950/40 via-slate-900 to-indigo-950/40 border-amber-500/40 hover:border-amber-400/60'
      }`}
    >
      {/* Background Accent Shimmer */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
        {/* Mission Details */}
        <div className="space-y-1.5 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase tracking-wider">
              {getCategoryIcon(mission.category)}
              24-Hour Daily Goal
            </span>

            {/* Resilience Streak Badge (Clickable to view 7-day history) */}
            <button
              type="button"
              onClick={() => {
                if (onOpenHistory) {
                  sound.playClick();
                  onOpenHistory();
                }
              }}
              title="Click to open 7-Day Mission History & Streak Progression"
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border shadow-sm bg-gradient-to-r ${streak.streakBadge.color} hover:opacity-90 transition-opacity cursor-pointer`}
            >
              <span>{streak.streakBadge.emoji}</span>
              <span>{streak.currentStreakDays}-Day Streak</span>
              <span className="font-mono text-[9px] bg-black/30 px-1.5 rounded text-white ml-0.5">
                {streak.multiplier}x Pts
              </span>
            </button>

            <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Resets in: {timeLeftStr}</span>
            </span>

            {mission.isCompleted && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                Completed Today
              </span>
            )}
          </div>

          <h3 className="text-base font-black text-white flex items-center gap-2">
            <span>{mission.title}</span>
          </h3>

          <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
            {mission.shortDescription}
          </p>

          <div className="text-[11px] text-slate-400 font-medium flex flex-wrap items-center gap-2">
            <div>
              <span className="text-amber-400 font-bold">Goal Objective:</span> {mission.targetActionHint}
            </div>
            <span className="hidden sm:inline text-slate-600">·</span>
            <div className="text-cyan-300 font-mono text-[10px] flex items-center gap-1">
              <span>{streak.streakBadge.label}</span>
            </div>
          </div>
        </div>

        {/* Rewards and Actions */}
        <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-800/80">
          {/* Rewards Badge with Multiplier Breakdown */}
          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 rounded-xl bg-slate-950/80 border border-amber-500/40 text-center">
              <div className="text-[9px] font-mono uppercase text-slate-400 flex items-center justify-center gap-1">
                <span>Reward</span>
                {streak.multiplier > 1.0 && (
                  <span className="text-amber-400 font-bold">({streak.multiplier}x Boost)</span>
                )}
              </div>
              <div className="text-xs font-black text-amber-300 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>+{Math.round(mission.redemptionReward * streak.multiplier)} Redemption Pts</span>
              </div>
            </div>

            <div className="hidden sm:block px-2.5 py-1.5 rounded-xl bg-slate-950/80 border border-emerald-500/30 text-center">
              <div className="text-[9px] font-mono uppercase text-slate-400">Bonus Cash</div>
              <div className="text-xs font-black text-emerald-400">
                +${mission.bonusCash}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {onOpenHistory && (
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  onOpenHistory();
                }}
                className="px-3 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
                title="View 7-Day Mission History, Streak Progression & Past Rewards"
              >
                <History className="w-3.5 h-3.5 text-amber-400" />
                <span>Mission History (7d)</span>
              </button>
            )}

            {!mission.isCompleted ? (
              <>
                <button
                  onClick={() => {
                    sound.playClick();
                    onNavigateToTab(mission.targetTab);
                  }}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-slate-950 text-xs font-black shadow-md shadow-amber-500/20 flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
                >
                  <span>Go to Mission</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => {
                    sound.playSuccess();
                    onCompleteMission(mission.id);
                  }}
                  className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 shadow-sm"
                  title="Claim your completed daily goal reward"
                >
                  <Gift className="w-3.5 h-3.5" />
                  <span>Claim</span>
                </button>
              </>
            ) : (
              <div className="px-4 py-2 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-black flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-300" />
                <span>Claimed (+{Math.round(mission.redemptionReward * streak.multiplier)} Redemption)</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
