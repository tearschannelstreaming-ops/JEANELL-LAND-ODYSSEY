import { PlayerStats } from '../types/game';

export interface GrowthDataPoint {
  id: string;
  label: string;
  fullDate: string;
  kind: 'daily' | 'live';
  resilience: number;
  steamMastery: number;
  financialAcumen: number;
  note?: string;
}

const STORAGE_KEY = 'steareality_growth_history_v1';
const MAX_STORED_POINTS = 24;

function clampPercent(value: number): number {
  return Math.min(100, Math.max(0, Math.round(value)));
}

function formatDayLabel(daysAgo: number): { label: string; fullDate: string } {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  if (daysAgo === 0) {
    return {
      label: 'Today',
      fullDate: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    };
  }
  const shortWeekday = date.toLocaleDateString('en-US', { weekday: 'short' });
  const fullDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  return { label: shortWeekday, fullDate };
}

export function buildBaselineGrowthHistory(currentStats: PlayerStats): GrowthDataPoint[] {
  const targetRes = clampPercent(currentStats.resilience);
  const targetSteam = clampPercent(currentStats.steamMastery);
  const targetFinance = clampPercent(currentStats.financialAcumen);

  // 6 prior daily progression checkpoints leading naturally to today's live metrics
  const offsets: Array<{
    daysAgo: number;
    resOffset: number;
    steamOffset: number;
    finOffset: number;
    note: string;
  }> = [
    { daysAgo: 6, resOffset: -20, steamOffset: -19, finOffset: -21, note: 'Detroit Orientation Baseline' },
    { daysAgo: 5, resOffset: -16, steamOffset: -15, finOffset: -17, note: 'Aero Wind Tunnel Calibration' },
    { daysAgo: 4, resOffset: -12, steamOffset: -11, finOffset: -14, note: 'Financial Literacy Workbook' },
    { daysAgo: 3, resOffset: -9, steamOffset: -8, finOffset: -10, note: 'Propulsion & Credit Lab' },
    { daysAgo: 2, resOffset: -5, steamOffset: -5, finOffset: -6, note: 'Community Rehab Checkpoint' },
    { daysAgo: 1, resOffset: -2, steamOffset: -2, finOffset: -3, note: 'Daily Mission Streak' },
    { daysAgo: 0, resOffset: 0, steamOffset: 0, finOffset: 0, note: 'Current Telemetry' },
  ];

  return offsets.map((step, index) => {
    const { label, fullDate } = formatDayLabel(step.daysAgo);
    return {
      id: `baseline-${index}`,
      label,
      fullDate,
      kind: step.daysAgo === 0 ? 'live' : 'daily',
      resilience: clampPercent(Math.max(12, targetRes + step.resOffset)),
      steamMastery: clampPercent(Math.max(10, targetSteam + step.steamOffset)),
      financialAcumen: clampPercent(Math.max(10, targetFinance + step.finOffset)),
      note: step.note,
    };
  });
}

export function loadOrInitGrowthHistory(currentStats: PlayerStats): GrowthDataPoint[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length >= 2) {
        const latest = parsed[parsed.length - 1] as GrowthDataPoint;
        const nextRes = clampPercent(currentStats.resilience);
        const nextSteam = clampPercent(currentStats.steamMastery);
        const nextFin = clampPercent(currentStats.financialAcumen);

        if (
          latest.resilience !== nextRes ||
          latest.steamMastery !== nextSteam ||
          latest.financialAcumen !== nextFin
        ) {
          const synced: GrowthDataPoint[] = [
            ...parsed.slice(0, parsed.length - 1),
            {
              ...latest,
              resilience: nextRes,
              steamMastery: nextSteam,
              financialAcumen: nextFin,
            },
          ];
          localStorage.setItem(STORAGE_KEY, JSON.stringify(synced));
          return synced;
        }
        return parsed;
      }
    }
  } catch {
    // Fall back to clean baseline if storage is unavailable or malformed
  }

  const initial = buildBaselineGrowthHistory(currentStats);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
  } catch {
    // Ignore storage quota errors
  }
  return initial;
}

export function recordGrowthSnapshot(
  currentStats: PlayerStats,
  note?: string
): GrowthDataPoint[] {
  const existing = loadOrInitGrowthHistory(currentStats);
  const nextRes = clampPercent(currentStats.resilience);
  const nextSteam = clampPercent(currentStats.steamMastery);
  const nextFin = clampPercent(currentStats.financialAcumen);

  const last = existing[existing.length - 1];
  const now = new Date();
  const timeLabel = now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });
  const fullDate = `${now.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })} · ${timeLabel}`;

  // If no change in the three core growth dimensions, return existing
  if (
    last &&
    last.resilience === nextRes &&
    last.steamMastery === nextSteam &&
    last.financialAcumen === nextFin
  ) {
    return existing;
  }

  const nextPoint: GrowthDataPoint = {
    id: `pt-${Date.now()}`,
    label: timeLabel,
    fullDate,
    kind: 'live',
    resilience: nextRes,
    steamMastery: nextSteam,
    financialAcumen: nextFin,
    note: note || 'Telemetry Update',
  };

  // Keep daily anchor points + most recent live points within cap
  const updated = [...existing, nextPoint].slice(-MAX_STORED_POINTS);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Ignore storage quota errors
  }
  return updated;
}

export function resetGrowthHistory(initialStats: PlayerStats): GrowthDataPoint[] {
  const fresh: GrowthDataPoint[] = [
    {
      id: 'reset-start',
      label: 'Start',
      fullDate: 'Baseline Reset',
      kind: 'daily',
      resilience: clampPercent(initialStats.resilience),
      steamMastery: clampPercent(initialStats.steamMastery),
      financialAcumen: clampPercent(initialStats.financialAcumen),
      note: 'Simulation Reset Baseline',
    },
    {
      id: `reset-live-${Date.now()}`,
      label: 'Today',
      fullDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      kind: 'live',
      resilience: clampPercent(initialStats.resilience),
      steamMastery: clampPercent(initialStats.steamMastery),
      financialAcumen: clampPercent(initialStats.financialAcumen),
      note: 'Active Session',
    },
  ];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
  } catch {
    // Ignore storage quota errors
  }
  return fresh;
}
