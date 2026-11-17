import React, { useState } from 'react';
import { HeartHandshake, Users, Shield, Sparkles, CheckCircle2, Award, RefreshCw } from 'lucide-react';
import { sound } from '../../utils/audio';

interface CommunityLabProps {
  onMasteryEarned?: (points: number) => void;
  resilience?: number;
}

interface FacilityModule {
  id: string;
  name: string;
  category: string;
  cost: number;
  monthlyOperating: number;
  capacityPeople: number;
  wellbeingBoost: number;
  steamBoost: number;
  zoningRequired: string;
  description: string;
}

export const DetroitCommunityRehabLab: React.FC<CommunityLabProps> = ({ onMasteryEarned, resilience = 50 }) => {
  // Available Community Modules (inspired by One Stop Rehabilitation Center)
  const availableModules: FacilityModule[] = [
    {
      id: 'shelter_foster',
      name: 'Aged-Out Foster Youth Housing',
      category: 'Residential Support',
      cost: 95000,
      monthlyOperating: 4200,
      capacityPeople: 24,
      wellbeingBoost: 22,
      steamBoost: 10,
      zoningRequired: 'R-2 Residential',
      description: 'Safe transitional housing and life skills mentoring for young adults leaving foster care at age 18.',
    },
    {
      id: 'return_citizens',
      name: 'Returning Citizens Re-entry Hub',
      category: 'Vocational Reintegration',
      cost: 85000,
      monthlyOperating: 3800,
      capacityPeople: 30,
      wellbeingBoost: 20,
      steamBoost: 15,
      zoningRequired: 'B-2 Commercial',
      description: 'Job placement, trade apprenticeships, and financial literacy to reintegrate returning citizens into Detroit industry.',
    },
    {
      id: 'steam_academy',
      name: 'Youth S.T.E.A.M. & Financial Academy',
      category: 'Education & Tech',
      cost: 110000,
      monthlyOperating: 4800,
      capacityPeople: 60,
      wellbeingBoost: 18,
      steamBoost: 35,
      zoningRequired: 'B-1 Community',
      description: 'Computer lab, wind tunnel demonstration bench, and ABCs of Financial Literacy workshops.',
    },
    {
      id: 'family_shelter',
      name: 'Emergency Family Shelter & Pantry',
      category: 'Crisis Relief',
      cost: 75000,
      monthlyOperating: 3500,
      capacityPeople: 40,
      wellbeingBoost: 25,
      steamBoost: 5,
      zoningRequired: 'R-3 Multi-Unit',
      description: 'Immediate shelter beds, clothing closet, and pantry distributions for families experiencing housing instability.',
    },
    {
      id: 'mental_health_clinic',
      name: 'Trauma & Mental Health Coaching Suite',
      category: 'Holistic Wellness',
      cost: 65000,
      monthlyOperating: 3100,
      capacityPeople: 45,
      wellbeingBoost: 28,
      steamBoost: 8,
      zoningRequired: 'B-1 Community',
      description: 'Non-clinical cognitive support, coping strategies, and faith-based coaching guided by Light University standards.',
    },
  ];

  const resilienceGrantBonus = resilience >= 75 ? 50000 : resilience >= 50 ? 25000 : 0;
  const totalGrantBudget = 420000 + resilienceGrantBonus;
  const [selectedIds, setSelectedIds] = useState<string[]>(['shelter_foster', 'steam_academy', 'mental_health_clinic']);
  const [activeChallenge, setActiveChallenge] = useState<number>(0);
  const [feedbackMsg, setFeedbackMsg] = useState<string>('');
  const [completedChallenges, setCompletedChallenges] = useState<number[]>([]);

  // Calculate totals
  const activeModules = availableModules.filter((m) => selectedIds.includes(m.id));
  const totalCost = activeModules.reduce((acc, m) => acc + m.cost, 0);
  const remainingGrant = totalGrantBudget - totalCost;
  const totalMonthlyOp = activeModules.reduce((acc, m) => acc + m.monthlyOperating, 0);
  const totalCapacity = activeModules.reduce((acc, m) => acc + m.capacityPeople, 0);
  const wellbeingScore = Math.min(100, activeModules.reduce((acc, m) => acc + m.wellbeingBoost, 0));
  const steamScore = Math.min(100, activeModules.reduce((acc, m) => acc + m.steamBoost, 0));

  // Challenges
  const challenges = [
    {
      id: 1,
      title: 'Balanced Community Hub',
      goal: 'Achieve Wellbeing Score >= 65 and S.T.E.A.M. Score >= 45 while staying within the $420,000 grant budget.',
      eval: (wb: number, st: number, rem: number) => wb >= 65 && st >= 45 && rem >= 0,
      hint: 'Include the Youth S.T.E.A.M. Academy along with high-impact residential and wellness wings.',
    },
    {
      id: 2,
      title: 'Maximum Safety Net (Capacity >= 110)',
      goal: 'Serve at least 110 Detroit citizens concurrently while maintaining positive grant reserve.',
      eval: (_wb: number, _st: number, rem: number, cap: number) => cap >= 110 && rem >= 0,
      hint: 'Combine Emergency Family Shelter with Returning Citizens Hub and Foster Youth housing.',
    },
    {
      id: 3,
      title: 'Fiscal Sustainability (OpEx < $12,000/mo)',
      goal: 'Keep monthly operating expenses under $12,000 while maintaining a Wellbeing Score >= 60.',
      eval: (wb: number, _st: number, rem: number, _cap: number, op: number) => op <= 12000 && wb >= 60 && rem >= 0,
      hint: 'Carefully balance operational overhead of each unit without overextending staffing costs.',
    },
  ];

  const toggleModule = (id: string) => {
    sound.playClick();
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleVerify = () => {
    sound.playClick();
    const curr = challenges[activeChallenge];
    const passed = curr.eval(wellbeingScore, steamScore, remainingGrant, totalCapacity, totalMonthlyOp);

    if (passed) {
      sound.playSuccess();
      setFeedbackMsg('Community Allocation Approved! Your One Stop Center model demonstrates exceptional civic resilience.');
      if (!completedChallenges.includes(curr.id)) {
        setCompletedChallenges([...completedChallenges, curr.id]);
        if (onMasteryEarned) {
          onMasteryEarned(25);
        }
      }
    } else {
      sound.playAlert();
      setFeedbackMsg('Allocation Imbalance: Check remaining grant funds or ensure target metrics are satisfied.');
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 border-b border-slate-800 bg-slate-950/60">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-rose-400">
            <HeartHandshake className="w-4 h-4" />
            <span>COMMUNITY ECOSYSTEM LAB &middot; S.T.E.A.M. MODULE 04</span>
            <span className="text-slate-600">&bull;</span>
            <span className="font-mono text-[11px] text-amber-400 font-bold bg-amber-950/50 px-2 py-0.5 rounded border border-amber-500/30">
              501(c)(3) EIN: 85-3488624
            </span>
            <span className="font-mono text-[11px] text-cyan-400 font-bold bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-500/30">
              FCC FRN: 0033922386
            </span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1.5 flex items-center gap-2">
            One Stop Rehabilitation Center Resource Allocation Engine
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            President Jeanell Land &middot; Detroit, Michigan &middot; Directing 24/7 emergency shelter beds, aged-out foster youth sanctuary, returning citizen re-entry, and youth S.T.E.A.M. labs.
          </p>
        </div>

        <button
          onClick={() => {
            sound.playClick();
            setSelectedIds(['shelter_foster', 'steam_academy']);
            setFeedbackMsg('');
          }}
          className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-lg transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Allocation</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left Community Blueprint & Impact Meters (7 cols) */}
        <div className="lg:col-span-7 bg-slate-950 p-5 space-y-6 border-b lg:border-b-0 lg:border-r border-slate-800">
          {/* Key Metric Tickers */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-lg">
              <span className="block text-[11px] text-slate-400 uppercase tracking-wider">Remaining Grant</span>
              <span className={`text-lg font-bold font-mono tabular-nums ${remainingGrant >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                ${remainingGrant.toLocaleString()}
              </span>
              <span className="block text-[10px] text-slate-500 mt-0.5">Budget: $420,000</span>
            </div>
            <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-lg">
              <span className="block text-[11px] text-slate-400 uppercase tracking-wider">People Served</span>
              <span className="text-lg font-bold text-cyan-300 font-mono tabular-nums">{totalCapacity} / yr</span>
              <span className="block text-[10px] text-slate-500 mt-0.5">Direct families &amp; youth</span>
            </div>
            <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-lg">
              <span className="block text-[11px] text-slate-400 uppercase tracking-wider">Monthly OpEx</span>
              <span className="text-lg font-bold text-amber-300 font-mono tabular-nums">${totalMonthlyOp.toLocaleString()}</span>
              <span className="block text-[10px] text-slate-500 mt-0.5">Staff &amp; facilities</span>
            </div>
            <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-lg">
              <span className="block text-[11px] text-slate-400 uppercase tracking-wider">Wellbeing Index</span>
              <span className="text-lg font-bold text-rose-300 font-mono tabular-nums">{wellbeingScore}/100</span>
              <span className="block text-[10px] text-slate-500 mt-0.5">Resilience rating</span>
            </div>
          </div>

          {/* Impact Progress Sliders */}
          <div className="space-y-4 bg-slate-900/60 p-4 rounded-lg border border-slate-800">
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
              COMMUNITY RESILIENCE INDEX METRICS
            </h4>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">Holistic Community Wellbeing</span>
                <span className="text-rose-400 font-mono font-bold tabular-nums">{wellbeingScore}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div
                  style={{ width: `${wellbeingScore}%` }}
                  className="h-full bg-gradient-to-r from-rose-500 to-amber-400 rounded-full transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">S.T.E.A.M. &amp; Financial Literacy Empowerment</span>
                <span className="text-cyan-400 font-mono font-bold tabular-nums">{steamScore}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div
                  style={{ width: `${steamScore}%` }}
                  className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full transition-all"
                />
              </div>
            </div>
          </div>

          {/* Detroit City Block Grid Blueprint */}
          <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-lg space-y-3">
            <div className="flex justify-between items-center text-xs text-slate-300">
              <span className="font-semibold uppercase tracking-wider">ONE STOP CENTER DETROIT FACILITY MAP</span>
              <span className="text-slate-500 text-[11px]">Woodward Ave &amp; Grand Blvd Corridor</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {availableModules.map((m) => {
                const isSelected = selectedIds.includes(m.id);
                return (
                  <div
                    key={m.id}
                    className={`p-3 rounded-lg border transition-all ${
                      isSelected
                        ? 'bg-slate-900 border-cyan-500/80 shadow-md shadow-cyan-950/40'
                        : 'bg-slate-950/60 border-slate-800/80 opacity-50'
                    }`}
                  >
                    <div className="text-[10px] text-cyan-400 font-mono uppercase">{m.zoningRequired}</div>
                    <div className="text-xs font-bold text-white mt-1 leading-snug">{m.name}</div>
                    <div className="text-[11px] text-slate-400 mt-1">Cap: {m.capacityPeople} people</div>
                    <div className="text-[10px] text-emerald-400 font-mono mt-0.5">${m.cost.toLocaleString()} grant</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Allocation Controls (5 cols) */}
        <div className="lg:col-span-5 p-5 space-y-5 bg-slate-900 flex flex-col justify-between">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-200 tracking-wide">
              FACILITY ALLOCATION SELECTION
            </h3>
            <p className="text-xs text-slate-400">
              Toggle operational wings to balance budget, social impact, and vocational education.
            </p>

            <div className="space-y-2">
              {availableModules.map((mod) => {
                const isChecked = selectedIds.includes(mod.id);
                return (
                  <div
                    key={mod.id}
                    onClick={() => toggleModule(mod.id)}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      isChecked
                        ? 'bg-slate-950 border-rose-500/70'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-400'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {}} // handled by div
                            className="rounded bg-slate-900 border-slate-700 text-rose-500 focus:ring-0 cursor-pointer"
                          />
                          <span className={`text-xs font-bold ${isChecked ? 'text-white' : 'text-slate-300'}`}>
                            {mod.name}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1 leading-relaxed pl-5">
                          {mod.description}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-xs font-mono font-semibold text-emerald-400 block tabular-nums">
                          ${(mod.cost / 1000).toFixed(0)}k
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono block tabular-nums">
                          +${mod.monthlyOperating}/mo
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Challenge Box */}
          <div className="pt-3 border-t border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                COMMUNITY LAB CHALLENGE
              </span>
              <div className="flex gap-1.5">
                {challenges.map((c, idx) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      sound.playClick();
                      setActiveChallenge(idx);
                      setFeedbackMsg('');
                    }}
                    className={`w-6 h-6 text-xs font-mono font-medium rounded transition-colors ${
                      activeChallenge === idx
                        ? 'bg-rose-600 text-white'
                        : completedChallenges.includes(c.id)
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-600'
                        : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {c.id}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 space-y-1.5">
              <div className="flex items-start justify-between gap-2">
                <h4 className="text-xs font-bold text-white">{challenges[activeChallenge].title}</h4>
                {completedChallenges.includes(challenges[activeChallenge].id) && (
                  <span className="flex items-center gap-1 text-[11px] text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Completed</span>
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{challenges[activeChallenge].goal}</p>
              <p className="text-[11px] text-slate-500 italic">Hint: {challenges[activeChallenge].hint}</p>
            </div>

            {feedbackMsg && (
              <div className="p-2.5 rounded bg-slate-950 border border-slate-800 text-xs text-rose-300">
                {feedbackMsg}
              </div>
            )}

            <button
              onClick={handleVerify}
              className="w-full py-2.5 px-4 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm"
            >
              Verify Community Allocation Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
