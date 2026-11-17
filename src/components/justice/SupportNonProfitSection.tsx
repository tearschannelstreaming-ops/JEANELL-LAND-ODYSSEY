import React, { useState, useEffect } from 'react';
import {
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Award,
  CheckCircle2,
  Gift,
  Building2,
  Users,
  Radio,
  FileText,
  DollarSign,
  ArrowRight,
  TrendingUp,
  Scale,
  Heart,
  Plus,
} from 'lucide-react';
import { PlayerStats } from '../../types/game';
import { sound } from '../../utils/audio';

interface SupportNonProfitProps {
  playerStats: PlayerStats;
  onUpdateStats: (delta: Partial<PlayerStats>) => void;
  onOpenServiceElection?: (serviceId?: string) => void;
}

interface MilestoneProject {
  id: string;
  title: string;
  category: string;
  goalPoints: number;
  currentPoints: number;
  beneficiaries: string;
  statutoryPillar: string;
  impactDescription: string;
  completedBadge: string;
}

const INITIAL_MILESTONES: MilestoneProject[] = [
  {
    id: 'milestone-haven-beds',
    title: '24/7 Domestic Violence Haven & Emergency Family Beds',
    category: 'Crisis Sanctuary',
    goalPoints: 500,
    currentPoints: 380,
    beneficiaries: '10 Families & Infants per month',
    statutoryPillar: 'Humanitarian Emergency Relief (IRS 509(a)(2))',
    impactDescription:
      'Provides immediate secure shelter beds, confidential trauma coaching, baby formula, and clean clothing for women and children escaping domestic violence in Metro Detroit.',
    completedBadge: 'Haven Shield Activated',
  },
  {
    id: 'milestone-landscaping-fleet',
    title: 'Landscaping Vocational Fleet for Veterans & Returning Citizens',
    category: 'Article II Mission',
    goalPoints: 1000,
    currentPoints: 740,
    beneficiaries: '35 Veterans & Returning Citizens',
    statutoryPillar: 'Article II LARA ID 802536743: Landscaping & Job Placement',
    impactDescription:
      'Funds commercial zero-turn mowers, trimmers, safety gear, and municipal beautification contracts, providing immediate living-wage employment and trade certification.',
    completedBadge: 'Green Horizon Fleet Deployed',
  },
  {
    id: 'milestone-foster-sanctuary',
    title: 'Aged-Out Foster Care Sanctuary & Life Skills Studio',
    category: 'Youth Empowerment',
    goalPoints: 1500,
    currentPoints: 1120,
    beneficiaries: '24 Young Adults aging out at 18',
    statutoryPillar: 'Youth Transition Services & Licensed Foster Guardianship',
    impactDescription:
      'Furnishes transitional apartments, banking literacy coaching, driver education, and collegiate enrollment pathways to prevent homelessness among youth leaving foster care.',
    completedBadge: 'Sovereign Bridge Sanctuary Established',
  },
  {
    id: 'milestone-food-pantry',
    title: 'Community Food Pantry & Infant Nutrition Logistics Hub',
    category: 'Direct Relief',
    goalPoints: 2000,
    currentPoints: 1650,
    beneficiaries: '5,000 lbs Fresh Produce & Formula monthly',
    statutoryPillar: 'Emergency Community Food Security',
    impactDescription:
      'Daily distribution of fresh groceries, organic baby formula, emergency diapers, and winter coats directly to neighborhood families in Detroit, Michigan.',
    completedBadge: 'Abundance Logistics Grid Online',
  },
  {
    id: 'milestone-clean-slate',
    title: 'ICHAT Record Expungement & Clean Slate Legal Defense Clinic',
    category: 'Legal Justice',
    goalPoints: 2500,
    currentPoints: 1980,
    beneficiaries: '100 Detroit Citizens clearing criminal records',
    statutoryPillar: 'Michigan Clean Slate Acts (P.A. 361-368 of 2020)',
    impactDescription:
      'Covers state application fees, fingerprinting, and attorney motions to expunge eligible historical convictions, removing employment and housing barriers.',
    completedBadge: '100 Clean Slates Restored',
  },
  {
    id: 'milestone-broadcast-tower',
    title: 'T.E.A.R.S. Channel 24/7 & TEARadio 100.1 FM Broadcast Expansion',
    category: 'Public Telecommunications',
    goalPoints: 3000,
    currentPoints: 2420,
    beneficiaries: '150,000+ Metro Detroit Listeners & Viewers',
    statutoryPillar: 'FCC Registration System (CORES) FRN: 0033922386',
    impactDescription:
      'Transmitter enhancements broadcasting financial literacy, student S.T.E.A.M. competitions, public health advisories, and sovereign wealth masterclasses across Wayne County.',
    completedBadge: 'Broadcast Voice Megawatt Online',
  },
];

export const SupportNonProfitSection: React.FC<SupportNonProfitProps> = ({
  playerStats,
  onUpdateStats,
  onOpenServiceElection,
}) => {
  const [milestones, setMilestones] = useState<MilestoneProject[]>(() => {
    try {
      const saved = localStorage.getItem('steareality_nonprofit_milestones');
      return saved ? JSON.parse(saved) : INITIAL_MILESTONES;
    } catch {
      return INITIAL_MILESTONES;
    }
  });

  const [lastContributionMsg, setLastContributionMsg] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('steareality_nonprofit_milestones', JSON.stringify(milestones));
    } catch {
      // ignore
    }
  }, [milestones]);

  const handleContribute = (milestoneId: string, pts: number) => {
    const available = playerStats.redemptionPoints || 0;
    if (available <= 0) {
      sound.playAlert();
      setLastContributionMsg('You have 0 Redemption Points available. Reflect on Jeanell vs Goldie or pass vocational exams to earn more!');
      return;
    }

    const actualPts = Math.min(pts, available);
    sound.playSuccess();

    setMilestones((prev) =>
      prev.map((m) => {
        if (m.id === milestoneId) {
          const updated = m.currentPoints + actualPts;
          return { ...m, currentPoints: updated };
        }
        return m;
      })
    );

    // Update player stats: deduct redemption points, award community legacy points and resilience!
    onUpdateStats({
      redemptionPoints: -actualPts,
      communityLegacy: Math.round(actualPts * 1.5),
      resilience: Math.max(1, Math.round(actualPts * 0.4)),
    });

    const targetMilestone = milestones.find((m) => m.id === milestoneId);
    setLastContributionMsg(
      `Successfully contributed ${actualPts} Redemption Points to "${targetMilestone?.title}". Earned +${Math.round(
        actualPts * 1.5
      )} Community Legacy points!`
    );
  };

  const totalGoalAll = milestones.reduce((sum, m) => sum + m.goalPoints, 0);
  const totalCurrentAll = milestones.reduce((sum, m) => sum + m.currentPoints, 0);
  const overallPercent = Math.min(100, Math.round((totalCurrentAll / totalGoalAll) * 100));

  return (
    <div className="space-y-6">
      {/* 501(c)(3) Statutory Exemption & Identity Hero Banner */}
      <div className="bg-gradient-to-r from-amber-950/80 via-slate-900 to-emerald-950/80 border-2 border-emerald-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase bg-gradient-to-r from-emerald-400 to-green-500 text-slate-950 shadow-sm flex items-center gap-1.5">
                <HeartHandshake className="w-3.5 h-3.5" />
                OFFICIAL 501(c)(3) PUBLIC CHARITY · DETROIT, MI
              </span>
              <span className="text-[10px] font-mono text-amber-300 bg-amber-950/80 border border-amber-500/40 px-2.5 py-1 rounded-full font-bold">
                EIN: 85-3488624
              </span>
              <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/80 border border-cyan-500/40 px-2.5 py-1 rounded-full font-bold">
                Public Charity 509(a)(2)
              </span>
              <span className="text-[10px] font-mono text-purple-300 bg-purple-950/80 border border-purple-500/40 px-2.5 py-1 rounded-full font-bold">
                LARA ID: 802536743
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              One Stop Rehabilitation Center 501(c)(3)
            </h2>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Founded and directed by President <strong>Jeanell Land</strong>. Incorporated under Michigan Nonprofit Corporation Act 162 of 1982 and determined tax-exempt by the IRS under <strong>Letter 947 (DLN: 26053700002260)</strong>. Donors can deduct contributions under IRC Section 170. Headquartered in <strong>Detroit, Michigan</strong> &middot; Direct Line: (313) 510-3610.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-mono">
              <a
                href="https://onestoprehabilitationcenters.org"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded-lg bg-slate-950/80 border border-cyan-500/50 text-cyan-300 hover:text-cyan-200 font-bold flex items-center gap-1.5 transition-colors"
              >
                <span>🌐 Website: onestoprehabilitationcenters.org</span>
              </a>
              <a
                href="mailto:jland@onestoprehabilitationcenters.org"
                className="px-2.5 py-1 rounded-lg bg-slate-950/80 border border-emerald-500/50 text-emerald-300 hover:text-emerald-200 font-bold flex items-center gap-1.5 transition-colors"
              >
                <span>✉️ Email: jland@onestoprehabilitationcenters.org</span>
              </a>
            </div>

            <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800 text-xs space-y-1">
              <strong className="text-amber-400 text-[11px] block font-mono uppercase">
                Article II Statutory Corporate Mission:
              </strong>
              <p className="text-slate-300 italic text-[11px]">
                "We provide rehabilitation programs by providing job placement and landscaping services for low income, veterans, disabled, returning citizens and aged out foster care adults."
              </p>
            </div>
          </div>

          {/* Quick Stats & Action Widget */}
          <div className="bg-slate-950/90 border border-emerald-500/40 rounded-2xl p-5 shrink-0 max-w-sm w-full space-y-4 text-xs shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Your Available Balance</span>
              <span className="text-sm font-black font-mono text-amber-400">
                {playerStats.redemptionPoints || 0} Redemption Pts
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-300 font-semibold">Total Legacy Project Fulfillment</span>
                <span className="font-mono text-emerald-400 font-bold">{overallPercent}%</span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden border border-slate-800">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-amber-500 h-full transition-all duration-500"
                  style={{ width: `${overallPercent}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>{totalCurrentAll.toLocaleString()} pts pledged</span>
                <span>Goal: {totalGoalAll.toLocaleString()} pts</span>
              </div>
            </div>

            {onOpenServiceElection && (
              <button
                onClick={() => {
                  sound.playClick();
                  onOpenServiceElection();
                }}
                className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Elect Services Rendered (Taxes / Deals)</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Contribution Toast Message */}
      {lastContributionMsg && (
        <div className="p-3.5 bg-emerald-950/90 border border-emerald-500/60 rounded-xl text-xs text-emerald-200 flex items-center justify-between gap-3 animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{lastContributionMsg}</span>
          </div>
          <button
            onClick={() => setLastContributionMsg(null)}
            className="text-slate-400 hover:text-white text-xs font-bold px-2 py-0.5 rounded"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Community Legacy Project Milestones Grid */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              Active Community Legacy Milestones &amp; Progress Meters
            </h3>
            <p className="text-xs text-slate-400">
              Contribute your Redemption Points to fund tangible shelter, landscaping jobs, and record expungements.
            </p>
          </div>
          <span className="text-xs font-mono text-cyan-400 font-bold bg-slate-900 border border-slate-800 px-3 py-1 rounded-lg">
            6 Operational Pillars
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {milestones.map((milestone) => {
            const percent = Math.min(100, Math.round((milestone.currentPoints / milestone.goalPoints) * 100));
            const isCompleted = milestone.currentPoints >= milestone.goalPoints;

            return (
              <div
                key={milestone.id}
                className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
                  isCompleted
                    ? 'bg-slate-950 border-emerald-500/60 shadow-lg shadow-emerald-950/20'
                    : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-300 font-bold">
                      {milestone.category}
                    </span>
                    {isCompleted ? (
                      <span className="flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>ACHIEVED</span>
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-amber-400 font-bold">
                        {percent}% Funded
                      </span>
                    )}
                  </div>

                  <h4 className="text-sm font-bold text-white leading-snug">{milestone.title}</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{milestone.impactDescription}</p>

                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-[10px] space-y-1">
                    <div className="text-slate-400">
                      Impact Beneficiaries: <strong className="text-white">{milestone.beneficiaries}</strong>
                    </div>
                    <div className="text-slate-500 font-mono text-[9px]">{milestone.statutoryPillar}</div>
                  </div>
                </div>

                <div className="space-y-3 pt-2 border-t border-slate-800/80">
                  {/* Progress Meter */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono">
                      <span className="text-slate-400">
                        {milestone.currentPoints.toLocaleString()} / {milestone.goalPoints.toLocaleString()} pts
                      </span>
                      <span className={isCompleted ? 'text-emerald-400 font-bold' : 'text-slate-400'}>
                        {isCompleted ? milestone.completedBadge : `${milestone.goalPoints - milestone.currentPoints} pts to goal`}
                      </span>
                    </div>
                    <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
                      <div
                        className={`h-full transition-all duration-500 ${
                          isCompleted
                            ? 'bg-emerald-500'
                            : 'bg-gradient-to-r from-amber-500 to-emerald-500'
                        }`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>

                  {/* Contribution Buttons */}
                  <div className="flex items-center gap-1.5 pt-1">
                    <button
                      onClick={() => handleContribute(milestone.id, 10)}
                      disabled={playerStats.redemptionPoints <= 0}
                      className="flex-1 py-1.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-slate-200 border border-slate-700 hover:border-amber-500/40 rounded-lg text-[10px] font-bold font-mono transition-all"
                    >
                      +10 Pts
                    </button>
                    <button
                      onClick={() => handleContribute(milestone.id, 25)}
                      disabled={playerStats.redemptionPoints <= 0}
                      className="flex-1 py-1.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-slate-200 border border-slate-700 hover:border-amber-500/40 rounded-lg text-[10px] font-bold font-mono transition-all"
                    >
                      +25 Pts
                    </button>
                    <button
                      onClick={() => handleContribute(milestone.id, 50)}
                      disabled={playerStats.redemptionPoints <= 0}
                      className="flex-1 py-1.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-amber-300 border border-amber-500/40 rounded-lg text-[10px] font-bold font-mono transition-all"
                    >
                      +50 Pts
                    </button>
                    <button
                      onClick={() => handleContribute(milestone.id, playerStats.redemptionPoints)}
                      disabled={playerStats.redemptionPoints <= 0}
                      className="px-2.5 py-1.5 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 disabled:opacity-40 text-slate-950 font-black rounded-lg text-[10px] uppercase font-mono transition-all"
                      title="Contribute all remaining redemption points"
                    >
                      Max
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tax-Deductible Contribution & Professional Services Election Callout */}
      <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider block">
            IRC Section 170 Tax Deductibility &middot; Direct Engagement
          </span>
          <h4 className="text-base font-bold text-white">
            Elect Services Rendered or Sponsor One Stop Programs Directly
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Need professional tax preparation (IRS PTIN P02309637), a Detroit real estate deal structured (Broker #6504432062), or wish to make an official tax-deductible charitable contribution to One Stop Rehabilitation Center 501(c)(3)?
          </p>
        </div>

        {onOpenServiceElection && (
          <button
            onClick={() => {
              sound.playClick();
              onOpenServiceElection();
            }}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-xl flex items-center gap-2 cursor-pointer shrink-0"
          >
            <span>Open Services Retainer Menu</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
