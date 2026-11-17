export interface DailyMission {
  id: string;
  title: string;
  shortDescription: string;
  category: 'Wind Tunnel Lab' | 'Detroit News & Radio' | 'Biometrics & Read Mode' | 'Classmate Study' | 'Financial & MLS';
  targetTab: 'labs' | 'tears' | 'course' | 'collaboration' | 'mls' | 'affirmations' | 'stear' | 'trivia';
  targetActionHint: string;
  redemptionReward: number;
  bonusCash: number;
  bonusResilience: number;
  isCompleted: boolean;
  assignedDate: string; // YYYY-MM-DD
  expiresAt: number; // Unix timestamp
}

export const DAILY_MISSION_POOL = [
  {
    id: 'mission_wind_tunnel',
    title: 'Master 1 Wind Tunnel Aerodynamics Session',
    shortDescription: 'Calibrate angle of attack and camber in the Aero Wind Tunnel Lab to achieve optimal aerodynamic lift.',
    category: 'Wind Tunnel Lab' as const,
    targetTab: 'labs' as const,
    targetActionHint: 'Launch Aero Wind Tunnel Lab and complete an aerodynamic calibration run.',
    redemptionReward: 35,
    bonusCash: 250,
    bonusResilience: 10,
  },
  {
    id: 'mission_detroit_news',
    title: 'Check Local News in Detroit & TEARadio 100.1 FM',
    shortDescription: 'Tune into Detroit Community Broadcasts and examine the 501(c)(3) radio preservation strategy.',
    category: 'Detroit News & Radio' as const,
    targetTab: 'tears' as const,
    targetActionHint: 'Open TEARadio 100.1 FM and review the FCC 30-Day Reconsideration or live broadcast transcript.',
    redemptionReward: 30,
    bonusCash: 200,
    bonusResilience: 10,
  },
  {
    id: 'mission_biometric_read',
    title: 'Complete 1 Proctored Biometric Video Read Session',
    shortDescription: 'Engage in camera-verified reading in the World Learning Studio to build academic literacy.',
    category: 'Biometrics & Read Mode' as const,
    targetTab: 'course' as const,
    targetActionHint: 'Verify camera face biometrics and certify a regional reading passage in World Learning.',
    redemptionReward: 40,
    bonusCash: 300,
    bonusResilience: 15,
  },
  {
    id: 'mission_classmate_study',
    title: 'Send a Study Request to Kendra or David',
    shortDescription: 'Collaborate with a high school classmate to activate the +25% S.T.E.A.M. Mastery multiplier.',
    category: 'Classmate Study' as const,
    targetTab: 'collaboration' as const,
    targetActionHint: 'Visit the Classmate Collaboration room and dispatch an academic study partnership.',
    redemptionReward: 25,
    bonusCash: 175,
    bonusResilience: 10,
  },
  {
    id: 'mission_mls_underwrite',
    title: 'Analyze 1 Nationwide MLS Multi-Family Property',
    shortDescription: 'Underwrite Detroit duplex cap rates and verify IRS cash-flow shelter principles.',
    category: 'Financial & MLS' as const,
    targetTab: 'mls' as const,
    targetActionHint: 'Browse the Nationwide MLS and inspect property investment financial metrics.',
    redemptionReward: 35,
    bonusCash: 350,
    bonusResilience: 10,
  },
  {
    id: 'mission_stear_calendar',
    title: 'Schedule or Review an Academic Milestone in S-T-E-A-R Safe',
    shortDescription: 'Coordinate a safe ride or virtual interview milestone using the S-T-E-A-R Safe calendar.',
    category: 'Financial & MLS' as const,
    targetTab: 'stear' as const,
    targetActionHint: 'Open S-T-E-A-R Safe and examine scheduled appointments or safe deliveries.',
    redemptionReward: 25,
    bonusCash: 150,
    bonusResilience: 8,
  },
  {
    id: 'mission_affirmation_mantra',
    title: 'Draw a Resilience Mantra in the Affirmation Deck',
    shortDescription: 'Internalize Jeanell Land’s core philosophy and activate a +5% Resilience Mindset buff.',
    category: 'Biometrics & Read Mode' as const,
    targetTab: 'affirmations' as const,
    targetActionHint: 'Draw a daily card from the Affirmation Deck and activate the mindset mantra.',
    redemptionReward: 30,
    bonusCash: 200,
    bonusResilience: 12,
  },
];

export interface ResilienceStreakState {
  currentStreakDays: number;
  bestStreakDays: number;
  lastCompletedDate: string | null;
  multiplier: number; // e.g. 1.0, 1.25, 1.5, 2.0
  streakBadge: {
    tier: 'Bronze' | 'Silver' | 'Gold' | 'Diamond' | 'Unstoppable Sovereign';
    emoji: string;
    label: string;
    color: string;
  };
}

export function getStreakBadge(streakDays: number): ResilienceStreakState['streakBadge'] {
  if (streakDays >= 14) {
    return {
      tier: 'Unstoppable Sovereign',
      emoji: '👑',
      label: '14+ Day Sovereign Master (2.5x Multiplier)',
      color: 'from-amber-400 via-rose-500 to-indigo-500 text-slate-950 border-amber-300',
    };
  }
  if (streakDays >= 7) {
    return {
      tier: 'Diamond',
      emoji: '💎',
      label: '7-Day Diamond Streak (2.0x Multiplier)',
      color: 'from-cyan-400 to-blue-600 text-white border-cyan-300',
    };
  }
  if (streakDays >= 4) {
    return {
      tier: 'Gold',
      emoji: '🏆',
      label: '4-Day Gold Streak (1.5x Multiplier)',
      color: 'from-amber-400 to-yellow-600 text-slate-950 border-amber-300',
    };
  }
  if (streakDays >= 2) {
    return {
      tier: 'Silver',
      emoji: '🥈',
      label: '2-Day Silver Streak (1.25x Multiplier)',
      color: 'from-slate-200 to-slate-400 text-slate-950 border-white',
    };
  }
  return {
    tier: 'Bronze',
    emoji: '🔥',
    label: '1-Day Ignition Streak (1.0x Base)',
    color: 'from-amber-600 to-orange-700 text-white border-amber-500',
  };
}

export function calculateMultiplier(streakDays: number): number {
  if (streakDays >= 14) return 2.5;
  if (streakDays >= 7) return 2.0;
  if (streakDays >= 4) return 1.5;
  if (streakDays >= 2) return 1.25;
  return 1.0;
}

export function getOrLoadStreakState(): ResilienceStreakState {
  const storageKey = 'steareality_resilience_streak';
  const todayStr = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  try {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      const parsed: ResilienceStreakState = JSON.parse(saved);
      // Check if streak broke (more than 1 day missed)
      if (
        parsed.lastCompletedDate &&
        parsed.lastCompletedDate !== todayStr &&
        parsed.lastCompletedDate !== yesterday
      ) {
        // Streak expired
        const resetState: ResilienceStreakState = {
          currentStreakDays: 0,
          bestStreakDays: parsed.bestStreakDays || 0,
          lastCompletedDate: null,
          multiplier: 1.0,
          streakBadge: getStreakBadge(0),
        };
        localStorage.setItem(storageKey, JSON.stringify(resetState));
        return resetState;
      }
      return {
        ...parsed,
        multiplier: calculateMultiplier(parsed.currentStreakDays),
        streakBadge: getStreakBadge(parsed.currentStreakDays),
      };
    }
  } catch {}

  const initialStreak: ResilienceStreakState = {
    currentStreakDays: 3, // Initial starter boost for learner encouragement
    bestStreakDays: 3,
    lastCompletedDate: yesterday,
    multiplier: calculateMultiplier(3),
    streakBadge: getStreakBadge(3),
  };

  try {
    localStorage.setItem(storageKey, JSON.stringify(initialStreak));
  } catch {}

  return initialStreak;
}

export function recordStreakMissionCompleted(): ResilienceStreakState {
  const current = getOrLoadStreakState();
  const todayStr = new Date().toISOString().split('T')[0];

  if (current.lastCompletedDate === todayStr) {
    return current; // already credited today
  }

  const nextStreak = current.currentStreakDays + 1;
  const best = Math.max(current.bestStreakDays, nextStreak);
  const multiplier = calculateMultiplier(nextStreak);
  const badge = getStreakBadge(nextStreak);

  const updated: ResilienceStreakState = {
    currentStreakDays: nextStreak,
    bestStreakDays: best,
    lastCompletedDate: todayStr,
    multiplier,
    streakBadge: badge,
  };

  try {
    localStorage.setItem('steareality_resilience_streak', JSON.stringify(updated));
  } catch {}

  return updated;
}

/**
 * Deterministically generates or loads the unique 24-hour daily mission for the student
 */
export function getOrGenerateDailyMission(): DailyMission {
  const todayStr = new Date().toISOString().split('T')[0];
  const storageKey = 'steareality_daily_mission';

  try {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      const parsed: DailyMission = JSON.parse(saved);
      if (parsed.assignedDate === todayStr && parsed.expiresAt > Date.now()) {
        return parsed;
      }
    }
  } catch {}

  // Generate deterministic index based on date string (day, month, year)
  let hash = 0;
  for (let i = 0; i < todayStr.length; i++) {
    hash = (hash << 5) - hash + todayStr.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % DAILY_MISSION_POOL.length;
  const template = DAILY_MISSION_POOL[index];

  // Set expiration to 23:59:59 of current day local time
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const newMission: DailyMission = {
    ...template,
    assignedDate: todayStr,
    expiresAt: endOfDay.getTime(),
    isCompleted: false,
  };

  try {
    localStorage.setItem(storageKey, JSON.stringify(newMission));
  } catch {}

  return newMission;
}

export interface MissionHistoryEntry {
  date: string; // YYYY-MM-DD
  dayLabel: string; // e.g., "Wed, Nov 12" or "Today"
  shortDayName: string; // e.g., "Wed"
  missionId: string;
  title: string;
  shortDescription: string;
  category: DailyMission['category'];
  targetTab: DailyMission['targetTab'];
  status: 'completed' | 'missed' | 'pending_today';
  streakDayAtCompletion: number;
  multiplierApplied: number;
  baseRedemptionReward: number;
  redemptionPointsEarned: number;
  bonusCashEarned: number;
  bonusResilienceEarned: number;
  completedAtTime?: string;
}

function getDeterministicMissionForDate(dateStr: string) {
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = (hash << 5) - hash + dateStr.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % DAILY_MISSION_POOL.length;
  return DAILY_MISSION_POOL[index];
}

function formatDayLabels(dateObj: Date, isToday: boolean, isYesterday: boolean) {
  const shortDayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
  const monthDay = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  if (isToday) {
    return { dayLabel: `Today · ${monthDay}`, shortDayName: 'Today' };
  }
  if (isYesterday) {
    return { dayLabel: `Yesterday · ${monthDay}`, shortDayName };
  }
  return { dayLabel: `${shortDayName}, ${monthDay}`, shortDayName };
}

/**
 * Generates or loads the past 7 days of daily mission history, synchronized with current mission & streak
 */
export function getOrLoadMissionHistory(
  currentMission: DailyMission,
  streak: ResilienceStreakState
): MissionHistoryEntry[] {
  const storageKey = 'steareality_mission_history_v1';
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];

  let storedMap: Record<string, MissionHistoryEntry> = {};
  try {
    const raw = localStorage.getItem(storageKey);
    if (raw) {
      const parsed: MissionHistoryEntry[] = JSON.parse(raw);
      parsed.forEach((item) => {
        storedMap[item.date] = item;
      });
    }
  } catch {}

  const entries: MissionHistoryEntry[] = [];

  // Build 7-day window from 6 days ago (offset = 6) down to Today (offset = 0)
  for (let offset = 6; offset >= 0; offset--) {
    const d = new Date(today.getTime() - offset * 86400000);
    const dateStr = d.toISOString().split('T')[0];
    const isToday = offset === 0;
    const isYesterday = offset === 1;
    const { dayLabel, shortDayName } = formatDayLabels(d, isToday, isYesterday);

    if (isToday) {
      const mult = streak.multiplier;
      const earnedPts = currentMission.isCompleted
        ? Math.round(currentMission.redemptionReward * mult)
        : 0;
      const existingToday = storedMap[dateStr];
      entries.push({
        date: dateStr,
        dayLabel,
        shortDayName,
        missionId: currentMission.id,
        title: currentMission.title,
        shortDescription: currentMission.shortDescription,
        category: currentMission.category,
        targetTab: currentMission.targetTab,
        status: currentMission.isCompleted ? 'completed' : 'pending_today',
        streakDayAtCompletion: currentMission.isCompleted
          ? streak.currentStreakDays
          : streak.currentStreakDays + 1,
        multiplierApplied: mult,
        baseRedemptionReward: currentMission.redemptionReward,
        redemptionPointsEarned: currentMission.isCompleted
          ? existingToday?.redemptionPointsEarned || earnedPts
          : Math.round(currentMission.redemptionReward * mult),
        bonusCashEarned: currentMission.bonusCash,
        bonusResilienceEarned: currentMission.bonusResilience,
        completedAtTime: currentMission.isCompleted
          ? existingToday?.completedAtTime || 'Completed Today'
          : undefined,
      });
      continue;
    }

    if (storedMap[dateStr]) {
      entries.push({
        ...storedMap[dateStr],
        dayLabel,
        shortDayName,
      });
      continue;
    }

    // Seed realistic historical entries for past 6 days aligned with starter streak
    const template = getDeterministicMissionForDate(dateStr);
    // Offset 1, 2, 3 correspond to the 3-day active starter streak; offset 5 & 6 also completed, offset 4 was a rest/missed day
    const wasCompleted = offset <= 3 || offset >= 5;
    const simulatedStreakDay =
      offset === 3 ? 1 : offset === 2 ? 2 : offset === 1 ? 3 : offset === 6 ? 1 : offset === 5 ? 2 : 0;
    const simMult = calculateMultiplier(simulatedStreakDay);
    const completionTimes = ['4:15 PM', '6:42 PM', '5:18 PM', '7:05 PM', '3:50 PM', '8:12 PM'];

    entries.push({
      date: dateStr,
      dayLabel,
      shortDayName,
      missionId: template.id,
      title: template.title,
      shortDescription: template.shortDescription,
      category: template.category,
      targetTab: template.targetTab,
      status: wasCompleted ? 'completed' : 'missed',
      streakDayAtCompletion: simulatedStreakDay,
      multiplierApplied: simMult,
      baseRedemptionReward: template.redemptionReward,
      redemptionPointsEarned: wasCompleted ? Math.round(template.redemptionReward * simMult) : 0,
      bonusCashEarned: wasCompleted ? template.bonusCash : 0,
      bonusResilienceEarned: wasCompleted ? template.bonusResilience : 0,
      completedAtTime: wasCompleted ? completionTimes[offset % completionTimes.length] : undefined,
    });
  }

  try {
    localStorage.setItem(storageKey, JSON.stringify(entries));
  } catch {}

  return entries;
}

export function recordCompletedMissionInHistory(
  completedMission: DailyMission,
  updatedStreak: ResilienceStreakState
): MissionHistoryEntry[] {
  const history = getOrLoadMissionHistory({ ...completedMission, isCompleted: true }, updatedStreak);
  const todayStr = new Date().toISOString().split('T')[0];
  const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const updatedHistory = history.map((entry) => {
    if (entry.date === todayStr) {
      return {
        ...entry,
        status: 'completed' as const,
        streakDayAtCompletion: updatedStreak.currentStreakDays,
        multiplierApplied: updatedStreak.multiplier,
        redemptionPointsEarned: Math.round(completedMission.redemptionReward * updatedStreak.multiplier),
        bonusCashEarned: completedMission.bonusCash,
        bonusResilienceEarned: completedMission.bonusResilience,
        completedAtTime: timeStr,
      };
    }
    return entry;
  });

  try {
    localStorage.setItem('steareality_mission_history_v1', JSON.stringify(updatedHistory));
  } catch {}

  return updatedHistory;
}



