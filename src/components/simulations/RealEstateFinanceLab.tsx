import React, { useState } from 'react';
import { Building2, DollarSign, Calculator, TrendingUp, CheckCircle2, ShieldCheck, Home } from 'lucide-react';
import { sound } from '../../utils/audio';

interface FinanceLabProps {
  onMasteryEarned?: (points: number) => void;
  resilience?: number;
}

export const RealEstateFinanceLab: React.FC<FinanceLabProps> = ({ onMasteryEarned, resilience = 50 }) => {
  // Property configuration
  const [propertyType, setPropertyType] = useState<'single' | 'duplex' | 'fourplex'>('fourplex');
  const [purchasePrice, setPurchasePrice] = useState<number>(240000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(10);
  const [loanProgram, setLoanProgram] = useState<'naca' | 'fha' | 'conventional'>('naca');
  const [rentPerUnit, setRentPerUnit] = useState<number>(950);
  const [activeChallenge, setActiveChallenge] = useState<number>(0);
  const [challengeMessage, setChallengeMessage] = useState<string>('');
  const [completedChallenges, setCompletedChallenges] = useState<number[]>([]);

  // Units
  const unitsCount = propertyType === 'single' ? 1 : propertyType === 'duplex' ? 2 : 4;
  const grossMonthlyRent = unitsCount * rentPerUnit;
  const grossAnnualRent = grossMonthlyRent * 12;

  // Resilience Interest Perk
  const resilienceInterestDiscount = resilience >= 75 ? 0.005 : resilience >= 50 ? 0.0025 : 0;
  const baseRate = loanProgram === 'naca' ? 0.045 : loanProgram === 'fha' ? 0.055 : 0.065;
  const interestRate = Math.max(0.02, baseRate - resilienceInterestDiscount);
  const effectiveDownPercent = loanProgram === 'naca' ? 0 : downPaymentPercent;
  const downPaymentAmount = purchasePrice * (effectiveDownPercent / 100);
  const earnestMoneyDeposit = Math.round(purchasePrice * 0.015); // 1.5% EMD
  const loanAmount = purchasePrice - downPaymentAmount;

  // Monthly Mortgage calculation (30-year fixed)
  const monthlyRate = interestRate / 12;
  const numPayments = 360;
  const monthlyPI =
    loanAmount > 0
      ? (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
        (Math.pow(1 + monthlyRate, numPayments) - 1)
      : 0;

  // Operational Expenses
  const monthlyPropertyTax = (purchasePrice * 0.024) / 12; // Detroit ~2.4% effective
  const monthlyInsurance = 135 * (propertyType === 'fourplex' ? 1.8 : propertyType === 'duplex' ? 1.4 : 1.0);
  const monthlyMaintenance = grossMonthlyRent * 0.08;
  const monthlyVacancy = grossMonthlyRent * 0.05;
  const totalMonthlyExpenses = monthlyPropertyTax + monthlyInsurance + monthlyMaintenance + monthlyVacancy;

  // Net Operating Income (NOI does not include debt service)
  const annualOperatingExpenses = totalMonthlyExpenses * 12;
  const annualNOI = grossAnnualRent - annualOperatingExpenses;
  const monthlyNOI = annualNOI / 12;

  // Net Cash Flow (after mortgage P&I)
  const monthlyCashFlow = Math.round(monthlyNOI - monthlyPI);
  const annualCashFlow = monthlyCashFlow * 12;

  // Return Metrics
  const capRate = ((annualNOI / purchasePrice) * 100).toFixed(1);
  const totalCashInvested = Math.max(1000, downPaymentAmount + earnestMoneyDeposit + 3500); // closing costs
  const cashOnCash = ((annualCashFlow / totalCashInvested) * 100).toFixed(1);
  const annualDebtService = monthlyPI * 12;
  const dscr = annualDebtService > 0 ? (annualNOI / annualDebtService).toFixed(2) : 'N/A';

  // IRS Depreciation (Building value = 80% of price / 27.5 years)
  const annualDepreciationShield = Math.round((purchasePrice * 0.8) / 27.5);

  // Challenges
  const challenges = [
    {
      id: 1,
      title: 'Detroit 4-Plex Positive Cash Flow',
      goal: 'Structure a 4-Unit property generating monthly cash flow >= $900 with rent per unit <= $1,050.',
      eval: (cf: number, cap: number, d: number) => cf >= 900 && propertyType === 'fourplex' && rentPerUnit <= 1050,
      hint: 'A 4-plex provides four income streams with shared roof and foundation, boosting net cash flow.',
    },
    {
      id: 2,
      title: 'NACA Economic Justice Financing',
      goal: 'Utilize NACA program (0% down) with a Cap Rate >= 9.0% and DSCR >= 1.25.',
      eval: (_cf: number, cap: number, d: number) => loanProgram === 'naca' && cap >= 9.0 && d >= 1.25,
      hint: 'NACA eliminates down payments and costly private mortgage insurance (PMI), dramatically improving coverage.',
    },
    {
      id: 3,
      title: 'Tax Shield Optimization',
      goal: 'Generate an annual IRS depreciation shield of at least $6,500 while maintaining a positive Cash-on-Cash >= 10%.',
      eval: (cf: number, cap: number, _d: number, coc: number, dep: number) => dep >= 6500 && coc >= 10,
      hint: 'Higher asset values increase depreciation write-offs, legally sheltering cash distributions.',
    },
  ];

  const handleVerify = () => {
    sound.playClick();
    const curr = challenges[activeChallenge];
    const passed = curr.eval(
      monthlyCashFlow,
      parseFloat(capRate),
      typeof dscr === 'string' ? parseFloat(dscr) : 0,
      parseFloat(cashOnCash),
      annualDepreciationShield
    );

    if (passed) {
      sound.playSuccess();
      setChallengeMessage('Financial Blueprint Verified! Asset metrics satisfy risk-adjusted cashflow standards.');
      if (!completedChallenges.includes(curr.id)) {
        setCompletedChallenges([...completedChallenges, curr.id]);
        if (onMasteryEarned) {
          onMasteryEarned(25);
        }
      }
    } else {
      sound.playAlert();
      setChallengeMessage('Variance Detected: Tweak property type, loan program, or purchase price to satisfy constraints.');
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 border-b border-slate-800 bg-slate-950/60">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
            <Building2 className="w-4 h-4" />
            <span>REAL ESTATE & FINANCIAL SYSTEMS LAB · S.T.E.A.M. MODULE 03</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">Multi-Family Property Cashflow & Equity Engine</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Engineered by Jeanell Land: Analyze Detroit housing capitalization rates, NACA loan leverage, and tax depreciation shields.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Licensed Broker &amp; EFIN Tax Standards</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left Interactive Output & Cashflow Waterfall (7 cols) */}
        <div className="lg:col-span-7 bg-slate-950 p-5 space-y-6 border-b lg:border-b-0 lg:border-r border-slate-800">
          {/* Headline Financial KPI Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-lg">
              <span className="block text-[11px] text-slate-400 uppercase tracking-wider">Monthly Cashflow</span>
              <span className={`text-lg font-bold font-mono tabular-nums ${monthlyCashFlow >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                ${monthlyCashFlow.toLocaleString()}
              </span>
              <span className="block text-[10px] text-slate-500 mt-0.5">Net in pocket</span>
            </div>
            <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-lg">
              <span className="block text-[11px] text-slate-400 uppercase tracking-wider">Cap Rate</span>
              <span className="text-lg font-bold text-cyan-300 font-mono tabular-nums">{capRate}%</span>
              <span className="block text-[10px] text-slate-500 mt-0.5">Unleveraged ROI</span>
            </div>
            <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-lg">
              <span className="block text-[11px] text-slate-400 uppercase tracking-wider">DSCR Ratio</span>
              <span className="text-lg font-bold text-amber-300 font-mono tabular-nums">{dscr}x</span>
              <span className="block text-[10px] text-slate-500 mt-0.5">Target &gt; 1.25x</span>
            </div>
            <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-lg">
              <span className="block text-[11px] text-slate-400 uppercase tracking-wider">Tax Shield</span>
              <span className="text-lg font-bold text-purple-300 font-mono tabular-nums">${annualDepreciationShield.toLocaleString()}/yr</span>
              <span className="block text-[10px] text-slate-500 mt-0.5">27.5y IRS write-off</span>
            </div>
          </div>

          {/* Monthly Waterfall Visualization */}
          <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-lg space-y-3">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-200">
              <span>MONTHLY INCOME &amp; EXPENSE WATERFALL</span>
              <span className="font-mono text-cyan-400">Total Inflow: ${grossMonthlyRent.toLocaleString()}</span>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between items-center p-2 rounded bg-slate-950 border border-slate-800/80">
                <span className="text-slate-300 font-sans flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                  Gross Rental Revenue ({unitsCount} {unitsCount > 1 ? 'Units' : 'Unit'} @ ${rentPerUnit}/mo)
                </span>
                <span className="text-emerald-400 font-bold">+${grossMonthlyRent.toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center p-2 rounded bg-slate-950 border border-slate-800/80">
                <span className="text-slate-300 font-sans flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
                  Property Tax &amp; Insurance (P&amp;C)
                </span>
                <span className="text-amber-400 font-semibold">-${Math.round(monthlyPropertyTax + monthlyInsurance).toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center p-2 rounded bg-slate-950 border border-slate-800/80">
                <span className="text-slate-300 font-sans flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-slate-400 inline-block" />
                  Maintenance (8%) &amp; Vacancy (5%) Reserve
                </span>
                <span className="text-slate-400 font-semibold">-${Math.round(monthlyMaintenance + monthlyVacancy).toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center p-2 rounded bg-slate-950 border border-slate-800/80">
                <span className="text-slate-300 font-sans flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-400 inline-block" />
                  Mortgage Principal &amp; Interest ({loanProgram.toUpperCase()} @ {(interestRate * 100).toFixed(1)}%)
                </span>
                <span className="text-red-400 font-semibold">-${Math.round(monthlyPI).toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center p-2.5 rounded bg-emerald-950/40 border border-emerald-500/40 font-bold">
                <span className="text-emerald-200 font-sans">Net Discretionary Cash Flow</span>
                <span className="text-emerald-300 text-sm font-mono">+${monthlyCashFlow.toLocaleString()} / month</span>
              </div>
            </div>
          </div>

          {/* 10-Year Wealth Compounding Graph simulation */}
          <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-lg space-y-2">
            <div className="flex justify-between text-xs text-slate-300 font-semibold">
              <span className="flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
                <span>10-Year Generational Wealth Projection</span>
              </span>
              <span className="text-[11px] text-slate-500 font-sans">Appreciation (3.5%/yr) + Loan Amortization</span>
            </div>

            <div className="h-16 flex items-end gap-2 pt-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((year) => {
                const approxEquity = Math.round(
                  downPaymentAmount +
                    (purchasePrice * Math.pow(1.035, year) - purchasePrice) +
                    (loanAmount * (year / 30) * 0.7)
                );
                const heightPercent = Math.min(100, Math.max(15, (approxEquity / 220000) * 100));

                return (
                  <div key={year} className="flex-1 flex flex-col items-center gap-1 group">
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className="w-full bg-gradient-to-t from-cyan-600 to-emerald-400 rounded-t transition-all group-hover:brightness-125"
                    />
                    <span className="text-[9px] text-slate-500 font-mono">Y{year}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Financial Controls (5 cols) */}
        <div className="lg:col-span-5 p-5 space-y-5 bg-slate-900 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-200 tracking-wide">
              ACQUISITION PARAMETERS
            </h3>

            {/* Property Type Selector */}
            <div className="space-y-1.5">
              <label className="text-xs text-slate-300 font-medium">Detroit Property Structure</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { type: 'single', label: 'Single Family', price: 120000 },
                  { type: 'duplex', label: '2-Family Flat', price: 175000 },
                  { type: 'fourplex', label: '4-Unit Flat', price: 240000 },
                ].map((item) => (
                  <button
                    key={item.type}
                    onClick={() => {
                      sound.playClick();
                      setPropertyType(item.type as any);
                      setPurchasePrice(item.price);
                    }}
                    className={`p-2 rounded-lg text-xs font-medium border text-center transition-colors ${
                      propertyType === item.type
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="font-bold">{item.label}</div>
                    <div className="text-[10px] text-slate-500 font-mono">${(item.price / 1000).toFixed(0)}k est</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Loan Program Selector */}
            <div className="space-y-1.5">
              <label className="text-xs text-slate-300 font-medium">Financing Program</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'naca', label: 'N.A.C.A.', desc: '0% Down · 4.5%' },
                  { id: 'fha', label: 'F.H.A.', desc: '3.5% Down · 5.5%' },
                  { id: 'conventional', label: 'Conventional', desc: '10% Down · 6.5%' },
                ].map((l) => (
                  <button
                    key={l.id}
                    onClick={() => {
                      sound.playClick();
                      setLoanProgram(l.id as any);
                    }}
                    className={`p-2 rounded-lg text-xs font-medium border text-center transition-colors ${
                      loanProgram === l.id
                        ? 'bg-cyan-950/70 border-cyan-500 text-cyan-200'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="font-bold">{l.label}</div>
                    <div className="text-[10px] text-slate-500 font-mono">{l.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Slider: Purchase Price */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-medium">Purchase Price</span>
                <span className="text-emerald-400 font-mono font-semibold tabular-nums">${purchasePrice.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="80000"
                max="450000"
                step="5000"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(parseInt(e.target.value, 10))}
                className="w-full h-2 bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>$80k</span>
                <span>$250k</span>
                <span>$450k</span>
              </div>
            </div>

            {/* Slider: Monthly Rent per Unit */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-medium">Fair Market Rent per Unit</span>
                <span className="text-cyan-400 font-mono font-semibold tabular-nums">${rentPerUnit} / mo</span>
              </div>
              <input
                type="range"
                min="650"
                max="1600"
                step="25"
                value={rentPerUnit}
                onChange={(e) => setRentPerUnit(parseInt(e.target.value, 10))}
                className="w-full h-2 bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>$650 (Affordable)</span>
                <span>$1,000 (Median)</span>
                <span>$1,600 (Market)</span>
              </div>
            </div>
          </div>

          {/* Student Mission Box */}
          <div className="pt-3 border-t border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                FINANCIAL MATRIX CHALLENGE
              </span>
              <div className="flex gap-1.5">
                {challenges.map((c, idx) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      sound.playClick();
                      setActiveChallenge(idx);
                      setChallengeMessage('');
                    }}
                    className={`w-6 h-6 text-xs font-mono font-medium rounded transition-colors ${
                      activeChallenge === idx
                        ? 'bg-emerald-600 text-white'
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

            {challengeMessage && (
              <div className="p-2.5 rounded bg-slate-950 border border-slate-800 text-xs text-emerald-300">
                {challengeMessage}
              </div>
            )}

            <button
              onClick={handleVerify}
              className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm"
            >
              Verify Pro Forma Returns
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
