import React, { useMemo, useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import {
  Shield,
  Wind,
  PiggyBank,
  HeartHandshake,
  TrendingUp,
  TrendingDown,
  Minus,
  Activity,
} from 'lucide-react';
import { PlayerStats } from '../../types/game';
import { GrowthDataPoint } from '../../data/growthHistoryData';

type MetricFilter = 'all' | 'resilience' | 'steamMastery' | 'financialAcumen';
type ChartMode = 'area' | 'line';
type RangeMode = '7d' | 'all';

interface GrowthDashboardProps {
  stats: PlayerStats;
  history: GrowthDataPoint[];
  onRecordCheckpoint?: () => void;
}

interface CustomTooltipPayloadItem {
  dataKey?: string;
  name?: string;
  value?: number;
  color?: string;
  payload?: GrowthDataPoint;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: CustomTooltipPayloadItem[];
  label?: string;
}

const METRIC_META = {
  resilience: {
    key: 'resilience' as const,
    label: 'Resilience',
    shortLabel: 'Resilience',
    stroke: '#22d3ee',
    textClass: 'text-cyan-300',
    valueClass: 'text-cyan-400',
    activeBorderClass: 'border-cyan-500/60 bg-cyan-950/20',
    dotClass: 'bg-cyan-400',
  },
  steamMastery: {
    key: 'steamMastery' as const,
    label: 'STEAM Mastery',
    shortLabel: 'STEAM',
    stroke: '#a78bfa',
    textClass: 'text-violet-300',
    valueClass: 'text-violet-400',
    activeBorderClass: 'border-violet-500/60 bg-violet-950/20',
    dotClass: 'bg-violet-400',
  },
  financialAcumen: {
    key: 'financialAcumen' as const,
    label: 'Financial Acumen',
    shortLabel: 'Finance',
    stroke: '#34d399',
    textClass: 'text-emerald-300',
    valueClass: 'text-emerald-400',
    activeBorderClass: 'border-emerald-500/60 bg-emerald-950/20',
    dotClass: 'bg-emerald-400',
  },
};

const GrowthTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  const point = payload[0]?.payload;

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-950/95 px-3 py-2.5 shadow-xl backdrop-blur-sm min-w-[180px]">
      <div className="flex items-center justify-between gap-3 border-b border-slate-800 pb-1.5 mb-2">
        <span className="text-xs font-semibold text-white">{point?.fullDate || label}</span>
        {point?.note && (
          <span className="text-[10px] font-medium text-slate-400 truncate max-w-[130px]">
            {point.note}
          </span>
        )}
      </div>
      <div className="space-y-1.5">
        {payload.map((entry) => (
          <div key={entry.dataKey} className="flex items-center justify-between gap-4 text-xs">
            <span className="flex items-center gap-1.5 text-slate-300">
              <span
                className="inline-block w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: entry.color }}
              />
              <span>{entry.name}</span>
            </span>
            <span className="font-mono tabular-nums font-bold text-white">
              {entry.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const GrowthDashboard: React.FC<GrowthDashboardProps> = ({
  stats,
  history,
  onRecordCheckpoint,
}) => {
  const [metricFilter, setMetricFilter] = useState<MetricFilter>('all');
  const [chartMode, setChartMode] = useState<ChartMode>('area');
  const [rangeMode, setRangeMode] = useState<RangeMode>('7d');

  const chartData = useMemo(() => {
    if (history.length === 0) return [];
    if (rangeMode === 'all') return history;

    const dailyPoints = history.filter((pt) => pt.kind === 'daily');
    const latestPoint = history[history.length - 1];
    if (dailyPoints.length === 0) {
      return history.slice(-7);
    }
    const baseSlice = dailyPoints.slice(-6);
    const hasLatest = baseSlice.some((pt) => pt.id === latestPoint.id);
    return hasLatest ? baseSlice : [...baseSlice, latestPoint];
  }, [history, rangeMode]);

  const deltas = useMemo(() => {
    const first = chartData[0];
    if (!first) {
      return { resilience: 0, steamMastery: 0, financialAcumen: 0 };
    }
    return {
      resilience: Math.round(stats.resilience - first.resilience),
      steamMastery: Math.round(stats.steamMastery - first.steamMastery),
      financialAcumen: Math.round(stats.financialAcumen - first.financialAcumen),
    };
  }, [chartData, stats.resilience, stats.steamMastery, stats.financialAcumen]);

  const handleToggleMetric = (metric: Exclude<MetricFilter, 'all'>) => {
    setMetricFilter((prev) => (prev === metric ? 'all' : metric));
  };

  const showResilience = metricFilter === 'all' || metricFilter === 'resilience';
  const showSteam = metricFilter === 'all' || metricFilter === 'steamMastery';
  const showFinance = metricFilter === 'all' || metricFilter === 'financialAcumen';

  const renderDeltaBadge = (delta: number) => {
    if (delta > 0) {
      return (
        <span className="inline-flex items-center gap-0.5 text-[11px] font-mono tabular-nums font-semibold text-emerald-400">
          <TrendingUp className="w-3 h-3" />
          +{delta}%
        </span>
      );
    }
    if (delta < 0) {
      return (
        <span className="inline-flex items-center gap-0.5 text-[11px] font-mono tabular-nums font-semibold text-rose-400">
          <TrendingDown className="w-3 h-3" />
          {delta}%
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-0.5 text-[11px] font-mono tabular-nums font-medium text-slate-400">
        <Minus className="w-3 h-3" />
        0%
      </span>
    );
  };

  return (
    <div className="pt-3 space-y-3">
      {/* Interactive Metric Summary Strip (Click any tile to focus series) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {/* Resilience */}
        <button
          type="button"
          onClick={() => handleToggleMetric('resilience')}
          className={`text-left px-3 py-2.5 rounded-lg border transition-colors cursor-pointer ${
            metricFilter === 'resilience'
              ? METRIC_META.resilience.activeBorderClass
              : 'bg-slate-950/90 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-semibold text-cyan-300 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>Resilience</span>
            </span>
            {renderDeltaBadge(deltas.resilience)}
          </div>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-xl font-mono tabular-nums font-bold text-white">
              {stats.resilience}%
            </span>
            <span className="text-[11px] text-slate-400">
              {metricFilter === 'resilience' ? 'Focused' : 'Click to isolate'}
            </span>
          </div>
        </button>

        {/* STEAM Mastery */}
        <button
          type="button"
          onClick={() => handleToggleMetric('steamMastery')}
          className={`text-left px-3 py-2.5 rounded-lg border transition-colors cursor-pointer ${
            metricFilter === 'steamMastery'
              ? METRIC_META.steamMastery.activeBorderClass
              : 'bg-slate-950/90 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-semibold text-violet-300 flex items-center gap-1.5">
              <Wind className="w-3.5 h-3.5 text-violet-400 shrink-0" />
              <span>STEAM Mastery</span>
            </span>
            {renderDeltaBadge(deltas.steamMastery)}
          </div>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-xl font-mono tabular-nums font-bold text-white">
              {stats.steamMastery}%
            </span>
            <span className="text-[11px] text-slate-400">
              {metricFilter === 'steamMastery' ? 'Focused' : 'Click to isolate'}
            </span>
          </div>
        </button>

        {/* Financial Acumen */}
        <button
          type="button"
          onClick={() => handleToggleMetric('financialAcumen')}
          className={`text-left px-3 py-2.5 rounded-lg border transition-colors cursor-pointer ${
            metricFilter === 'financialAcumen'
              ? METRIC_META.financialAcumen.activeBorderClass
              : 'bg-slate-950/90 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-semibold text-emerald-300 flex items-center gap-1.5">
              <PiggyBank className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Financial Acumen</span>
            </span>
            {renderDeltaBadge(deltas.financialAcumen)}
          </div>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-xl font-mono tabular-nums font-bold text-white">
              {stats.financialAcumen}%
            </span>
            <span className="text-[11px] text-slate-400">
              {metricFilter === 'financialAcumen' ? 'Focused' : 'Click to isolate'}
            </span>
          </div>
        </button>
      </div>

      {/* Growth Chart Panel */}
      <div className="rounded-lg border border-slate-800 bg-slate-950/90 p-3.5">
        {/* Controls Header */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 pb-3 mb-2 border-b border-slate-800/80">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400 shrink-0" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Growth Dashboard
              </h2>
            </div>

            <div className="hidden sm:flex items-center gap-3 text-[11px] text-slate-400 border-l border-slate-800 pl-3">
              <span className="flex items-center gap-1.5">
                <HeartHandshake className="w-3.5 h-3.5 text-amber-400" />
                <span>Community Legacy:</span>
                <span className="font-mono tabular-nums font-semibold text-amber-300">
                  {stats.communityLegacy}%
                </span>
              </span>
            </div>
          </div>

          {/* Series Filter, Chart Type & Range Controls */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Series Filter */}
            <div className="inline-flex items-center rounded-md border border-slate-800 bg-slate-900 p-0.5 text-[11px]">
              {(
                [
                  { id: 'all', label: 'All' },
                  { id: 'resilience', label: 'Resilience' },
                  { id: 'steamMastery', label: 'STEAM' },
                  { id: 'financialAcumen', label: 'Finance' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setMetricFilter(tab.id)}
                  className={`px-2 py-1 rounded font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    metricFilter === tab.id
                      ? 'bg-slate-800 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Chart Mode */}
            <div className="inline-flex items-center rounded-md border border-slate-800 bg-slate-900 p-0.5 text-[11px]">
              <button
                type="button"
                onClick={() => setChartMode('area')}
                className={`px-2 py-1 rounded font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  chartMode === 'area'
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Area
              </button>
              <button
                type="button"
                onClick={() => setChartMode('line')}
                className={`px-2 py-1 rounded font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  chartMode === 'line'
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Line
              </button>
            </div>

            {/* Timeframe */}
            <div className="inline-flex items-center rounded-md border border-slate-800 bg-slate-900 p-0.5 text-[11px]">
              <button
                type="button"
                onClick={() => setRangeMode('7d')}
                className={`px-2 py-1 rounded font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  rangeMode === '7d'
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                7D Trend
              </button>
              <button
                type="button"
                onClick={() => setRangeMode('all')}
                className={`px-2 py-1 rounded font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  rangeMode === 'all'
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Session Log
              </button>
            </div>
          </div>
        </div>

        {/* Chart Body */}
        {chartData.length === 0 ? (
          <div className="h-[230px] flex flex-col items-center justify-center text-center gap-2 border border-dashed border-slate-800 rounded-md">
            <p className="text-xs text-slate-400">
              No growth checkpoints recorded yet. Complete a lab, mission, or reflection to plot your progress.
            </p>
            {onRecordCheckpoint && (
              <button
                type="button"
                onClick={onRecordCheckpoint}
                className="px-3 py-1.5 rounded-md bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold cursor-pointer"
              >
                Log First Checkpoint
              </button>
            )}
          </div>
        ) : (
          <div className="w-full h-[230px]">
            <ResponsiveContainer width="100%" height={230}>
              {chartMode === 'area' ? (
                <AreaChart
                  data={chartData}
                  margin={{ top: 8, right: 10, left: -12, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="growthResilienceFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.32} />
                      <stop offset="95%" stopColor="#22d3ee" stopOpacity={0.02} />
                    </linearGradient>
                    <linearGradient id="growthSteamFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.28} />
                      <stop offset="95%" stopColor="#a78bfa" stopOpacity={0.02} />
                    </linearGradient>
                    <linearGradient id="growthFinanceFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#34d399" stopOpacity={0.28} />
                      <stop offset="95%" stopColor="#34d399" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis
                    dataKey="label"
                    stroke="#64748b"
                    tick={{ fill: '#94a3b8', fontSize: 11 }}
                    tickLine={false}
                    axisLine={{ stroke: '#334155' }}
                    minTickGap={16}
                  />
                  <YAxis
                    domain={[0, 100]}
                    ticks={[0, 25, 50, 75, 100]}
                    tickFormatter={(val: number) => `${val}%`}
                    stroke="#64748b"
                    tick={{ fill: '#94a3b8', fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip content={<GrowthTooltip />} />
                  {showResilience && (
                    <Area
                      type="monotone"
                      dataKey="resilience"
                      name="Resilience"
                      stroke="#22d3ee"
                      strokeWidth={2.25}
                      fill="url(#growthResilienceFill)"
                      activeDot={{ r: 5, fill: '#22d3ee', stroke: '#0f172a', strokeWidth: 2 }}
                      isAnimationActive={false}
                    />
                  )}
                  {showSteam && (
                    <Area
                      type="monotone"
                      dataKey="steamMastery"
                      name="STEAM Mastery"
                      stroke="#a78bfa"
                      strokeWidth={2.25}
                      fill="url(#growthSteamFill)"
                      activeDot={{ r: 5, fill: '#a78bfa', stroke: '#0f172a', strokeWidth: 2 }}
                      isAnimationActive={false}
                    />
                  )}
                  {showFinance && (
                    <Area
                      type="monotone"
                      dataKey="financialAcumen"
                      name="Financial Acumen"
                      stroke="#34d399"
                      strokeWidth={2.25}
                      fill="url(#growthFinanceFill)"
                      activeDot={{ r: 5, fill: '#34d399', stroke: '#0f172a', strokeWidth: 2 }}
                      isAnimationActive={false}
                    />
                  )}
                </AreaChart>
              ) : (
                <RechartsLineChart
                  data={chartData}
                  margin={{ top: 8, right: 10, left: -12, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis
                    dataKey="label"
                    stroke="#64748b"
                    tick={{ fill: '#94a3b8', fontSize: 11 }}
                    tickLine={false}
                    axisLine={{ stroke: '#334155' }}
                    minTickGap={16}
                  />
                  <YAxis
                    domain={[0, 100]}
                    ticks={[0, 25, 50, 75, 100]}
                    tickFormatter={(val: number) => `${val}%`}
                    stroke="#64748b"
                    tick={{ fill: '#94a3b8', fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip content={<GrowthTooltip />} />
                  {showResilience && (
                    <Line
                      type="monotone"
                      dataKey="resilience"
                      name="Resilience"
                      stroke="#22d3ee"
                      strokeWidth={2.5}
                      dot={{ r: 3, fill: '#22d3ee', strokeWidth: 0 }}
                      activeDot={{ r: 5, fill: '#22d3ee', stroke: '#0f172a', strokeWidth: 2 }}
                      isAnimationActive={false}
                    />
                  )}
                  {showSteam && (
                    <Line
                      type="monotone"
                      dataKey="steamMastery"
                      name="STEAM Mastery"
                      stroke="#a78bfa"
                      strokeWidth={2.5}
                      dot={{ r: 3, fill: '#a78bfa', strokeWidth: 0 }}
                      activeDot={{ r: 5, fill: '#a78bfa', stroke: '#0f172a', strokeWidth: 2 }}
                      isAnimationActive={false}
                    />
                  )}
                  {showFinance && (
                    <Line
                      type="monotone"
                      dataKey="financialAcumen"
                      name="Financial Acumen"
                      stroke="#34d399"
                      strokeWidth={2.5}
                      dot={{ r: 3, fill: '#34d399', strokeWidth: 0 }}
                      activeDot={{ r: 5, fill: '#34d399', stroke: '#0f172a', strokeWidth: 2 }}
                      isAnimationActive={false}
                    />
                  )}
                </RechartsLineChart>
              )}
            </ResponsiveContainer>
          </div>
        )}

        {/* Compact Legend Footer */}
        <div className="mt-2 pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
          <div className="flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2.5 h-0.5 rounded bg-cyan-400" />
              <span className={showResilience ? 'text-slate-200' : 'text-slate-500'}>
                Resilience
              </span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2.5 h-0.5 rounded bg-violet-400" />
              <span className={showSteam ? 'text-slate-200' : 'text-slate-500'}>
                STEAM Mastery
              </span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2.5 h-0.5 rounded bg-emerald-400" />
              <span className={showFinance ? 'text-slate-200' : 'text-slate-500'}>
                Financial Acumen
              </span>
            </span>
          </div>
          <span className="font-mono tabular-nums text-slate-500">
            {chartData.length} checkpoints plotted
          </span>
        </div>
      </div>
    </div>
  );
};
