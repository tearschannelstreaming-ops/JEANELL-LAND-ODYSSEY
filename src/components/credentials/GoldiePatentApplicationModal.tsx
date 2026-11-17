import React, { useState } from 'react';
import {
  FileText,
  ShieldCheck,
  CheckCircle2,
  X,
  Printer,
  Download,
  ExternalLink,
  Sparkles,
  Building2,
  Users,
  Heart,
  Baby,
  Calculator,
  Layers,
  Award,
  Globe,
  Scissors,
  FileCheck,
  Eye,
} from 'lucide-react';
import { GOLDIE_PATENT_APPLICATION } from '../../data/goldiePatentData';
import { sound } from '../../utils/audio';

interface GoldiePatentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInspectExhibit?: (exhibit: {
    title: string;
    src?: string;
    authority: string;
    docNumber: string;
    details: string[];
  }) => void;
}

export const GoldiePatentApplicationModal: React.FC<GoldiePatentModalProps> = ({
  isOpen,
  onClose,
  onInspectExhibit,
}) => {
  const [activeTab, setActiveTab] = useState<
    'specification' | 'claims' | 'drawings' | 'equity_calc' | 'credentials' | 'business_plan'
  >('specification');

  // Interactive Co-Op Equity Calculator state
  const [paymentCadence, setPaymentCadence] = useState<'weekly' | 'biweekly' | 'monthly'>('weekly');
  const [paymentAmount, setPaymentAmount] = useState<number>(350); // $350/week standard
  const [mentorshipHours, setMentorshipHours] = useState<number>(6); // 6 hours/week mentoring trainees
  const [monthsActive, setMonthsActive] = useState<number>(24); // 24 months

  if (!isOpen) return null;

  const data = GOLDIE_PATENT_APPLICATION;

  // Calculate equity
  const paymentsPerMonth = paymentCadence === 'weekly' ? 4.33 : paymentCadence === 'biweekly' ? 2.16 : 1;
  const totalPayments = paymentAmount * paymentsPerMonth * monthsActive;
  const alphaEquityRate = 0.55; // 55% converted to equity
  const directEquityEarned = totalPayments * alphaEquityRate;
  const mentorshipBonusPerMonth = mentorshipHours * 25; // $25 equity credit per mentorship hour
  const totalMentorshipEquity = mentorshipBonusPerMonth * monthsActive;
  const reserveDeduction = totalPayments * 0.08; // 8% maintenance reserve
  const netTenantEquity = Math.round(directEquityEarned + totalMentorshipEquity - reserveDeduction);
  const ownershipPercentage = Math.min(15, Number(((netTenantEquity / 750000) * 100).toFixed(2)));

  const handlePrint = () => {
    sound.playClick();
    window.print();
  };

  const handleDownloadSpec = () => {
    sound.playClick();
    const link = document.createElement('a');
    link.href = '/public/assets/aistudio/Goldie_Beauty_World_Patent_Application_PTO_AIA_Specification.txt';
    link.download = 'Goldie_Beauty_World_Patent_Application_USPTO_Docket_2026.txt';
    link.click();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-slate-900 border border-amber-500/40 rounded-3xl p-4 sm:p-6 shadow-2xl space-y-4 my-auto max-h-[94vh] flex flex-col animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-3 shrink-0">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="p-1 rounded bg-amber-500/20 text-amber-400 border border-amber-500/40 text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> USPTO PATENT APPLICATION · 35 U.S.C. § 111
              </span>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800 px-2 py-0.5 rounded font-bold">
                Docket: {data.docketNumber}
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded font-bold">
                EIN: 85-3559446 · SAM UEI: J9R1TSCT26E1
              </span>
            </div>

            <h2 className="text-base sm:text-lg font-black text-white leading-snug">
              Goldie’s Unique Beauty Creations Beauty World
            </h2>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
              <span>Inventor: <strong className="text-amber-300">Jeanell Land</strong> (PTIN: P02309637)</span>
              <span className="text-slate-600">&bull;</span>
              <span>Detroit, Michigan</span>
              <span className="text-slate-600">&bull;</span>
              <a
                href="https://www.goldiesuniquebeautycreationsbeautyworld.com"
                target="_blank"
                rel="noreferrer"
                className="text-cyan-400 hover:text-cyan-300 font-mono flex items-center gap-1 underline"
              >
                <Globe className="w-3 h-3" /> www.goldiesuniquebeautycreationsbeautyworld.com
              </a>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handlePrint}
              className="hidden sm:flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 transition-colors"
              title="Print USPTO Filing Application"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
            <button
              onClick={handleDownloadSpec}
              className="flex items-center gap-1 px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-lg shadow-sm transition-colors"
              title="Download Full USPTO Specification (.txt)"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download (.txt)</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-950/80 p-1.5 rounded-xl gap-1.5 overflow-x-auto shrink-0">
          {[
            { id: 'specification', label: 'Specification (AIA § 111)', icon: FileText },
            { id: 'claims', label: 'Claims 1–20', icon: ShieldCheck, badge: '20 Claims' },
            { id: 'drawings', label: 'Drawings & Figures', icon: Layers, badge: 'FIGS. 1–6' },
            { id: 'equity_calc', label: 'Co-Op Equity Algorithm', icon: Calculator, badge: 'Equation E(t)' },
            { id: 'credentials', label: 'Federal & IRS ID', icon: FileCheck, badge: 'EIN & UEI' },
            { id: 'business_plan', label: 'Original Business Plan', icon: Award },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  sound.playClick();
                  setActiveTab(tab.id as any);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-bold ${
                      isSelected
                        ? 'bg-amber-800 text-amber-200'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-4 text-xs">
          {/* TAB 1: Specification */}
          {activeTab === 'specification' && (
            <div className="space-y-4 bg-slate-950 p-5 rounded-2xl border border-slate-800 leading-relaxed font-sans">
              <div className="bg-slate-900/80 p-4 rounded-xl border border-amber-500/30 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h3 className="font-bold text-white text-sm">
                    Official USPTO Patent Specification Document
                  </h3>
                  <p className="text-slate-300 text-[11px]">
                    Drafted in full accordance with 35 U.S.C. § 112 and 37 C.F.R. § 1.53 for Goldie’s Unique Beauty Creations Beauty World L.L.C.
                  </p>
                </div>
              </div>

              {/* Title & Transmittal Metadata */}
              <div className="border border-slate-800 rounded-xl p-4 bg-slate-900/50 space-y-2">
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block font-bold">
                  Title of the Invention
                </span>
                <h4 className="text-sm font-black text-white">{data.title}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-300 pt-2 border-t border-slate-800">
                  <div>
                    <span className="text-slate-500 block">Inventor:</span>
                    <strong className="text-white">{data.inventor.name}</strong> &middot; {data.inventor.residence}
                  </div>
                  <div>
                    <span className="text-slate-500 block">Assignee Entity:</span>
                    <strong className="text-white">{data.assignee.legalName}</strong> (EIN: {data.assignee.ein.split(' ')[0]})
                  </div>
                </div>
              </div>

              {/* Abstract */}
              <div className="border border-slate-800 rounded-xl p-4 bg-slate-900/50 space-y-1.5">
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block font-bold">
                  Abstract of the Disclosure
                </span>
                <p className="text-slate-300 leading-relaxed text-xs">{data.abstract}</p>
              </div>

              {/* Technical Field */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Technical Field &amp; Cooperative Patent Classification
                </h4>
                <p className="text-slate-300">{data.technicalField}</p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {data.classification.cpcCodes.map((code, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 font-mono text-[10px] text-cyan-300"
                    >
                      {code}
                    </span>
                  ))}
                </div>
              </div>

              {/* Background & Prior Art */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Background of the Invention &amp; Prior Art Deficiencies
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {data.backgroundAndPriorArt.map((point, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 text-slate-300 space-y-1"
                    >
                      <span className="text-amber-400 font-bold block text-[11px]">
                        Deficiency 0{idx + 1}
                      </span>
                      <p className="text-[11px] leading-relaxed">{point}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detailed Description Sections */}
              <div className="space-y-4 pt-3">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Detailed Description of Preferred Embodiments
                </h4>
                {data.detailedDescriptionSections.map((sec) => (
                  <div
                    key={sec.sectionId}
                    className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 space-y-2"
                  >
                    <h5 className="text-xs font-bold text-amber-300">{sec.title}</h5>
                    {sec.paragraphs.map((p, pIdx) => (
                      <p key={pIdx} className="text-slate-300 leading-relaxed text-[11px]">
                        {p}
                      </p>
                    ))}
                  </div>
                ))}
              </div>

              {/* Statutory Declaration */}
              <div className="border border-emerald-500/30 rounded-xl p-4 bg-emerald-950/20 space-y-2">
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block font-bold">
                  Statutory Declaration &amp; Oath (37 C.F.R. § 1.63)
                </span>
                <p className="text-slate-300 italic text-[11px] leading-relaxed">
                  "{data.statutoryDeclaration.statement}"
                </p>
                <div className="flex items-center justify-between text-[11px] text-emerald-300 font-mono pt-2 border-t border-emerald-500/30">
                  <span>Signed: /Jeanell Land/</span>
                  <span>Date: {data.statutoryDeclaration.verificationDate}</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Formal Claims (1 to 20) */}
          {activeTab === 'claims' && (
            <div className="space-y-3">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">Formal Patent Claims (35 U.S.C. § 112)</h3>
                  <p className="text-slate-400 text-xs">
                    Comprehensive claim set establishing broad patent protection over continuous-operations, co-op equity, and childcare interlocks.
                  </p>
                </div>
                <span className="text-xs font-mono text-amber-400 font-bold bg-amber-950/60 px-3 py-1 rounded-lg border border-amber-500/40">
                  3 Independent &middot; 17 Dependent Claims
                </span>
              </div>

              <div className="space-y-3">
                {data.claims.map((claim) => (
                  <div
                    key={claim.claimNumber}
                    className={`p-4 rounded-2xl border transition-all ${
                      claim.type === 'independent'
                        ? 'bg-slate-950 border-amber-500/60 shadow-lg shadow-amber-950/20'
                        : 'bg-slate-950/70 border-slate-800'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-800/80">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                            claim.type === 'independent'
                              ? 'bg-amber-500 text-slate-950'
                              : 'bg-slate-800 text-cyan-300'
                          }`}
                        >
                          Claim {claim.claimNumber} &middot; {claim.type.toUpperCase()}
                        </span>
                        {claim.dependsOn && (
                          <span className="text-[10px] font-mono text-slate-400">
                            Depends on Claim {claim.dependsOn}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium italic">
                        {claim.summary}
                      </span>
                    </div>

                    <p className="text-slate-200 leading-relaxed text-[11px] font-mono">
                      {claim.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Drawings & Figures */}
          {activeTab === 'drawings' && (
            <div className="space-y-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <h3 className="text-sm font-bold text-white">Technical Patent Drawings (FIGS. 1–6)</h3>
                <p className="text-slate-400 text-xs">
                  Physical spatial schematics, computational architecture, and lifecycle state machines.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.briefDescriptionOfDrawings.map((fig) => (
                  <div
                    key={fig.figNumber}
                    className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-amber-500/50 transition-all space-y-3 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono font-bold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
                          {fig.figNumber}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">USPTO Architectural Figure</span>
                      </div>
                      <h4 className="text-sm font-bold text-white">{fig.title}</h4>
                      <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{fig.description}</p>
                    </div>

                    <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800/80 space-y-1.5 mt-2">
                      <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold block">
                        Core Blueprint Components
                      </span>
                      <ul className="space-y-1">
                        {fig.elements.map((elem, idx) => (
                          <li key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-300">
                            <span className="text-amber-400 font-bold">&bull;</span>
                            <span>{elem}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Co-Op Equity Algorithm Calculator */}
          {activeTab === 'equity_calc' && (
            <div className="space-y-5 bg-slate-950 p-5 rounded-2xl border border-slate-800">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-amber-400" />
                    Algorithmic Co-Operative Equity-Lease Engine
                  </h3>
                  <p className="text-slate-400 text-xs mt-0.5">
                    Live simulation of the patented equity accrual equation: how tenant-operators transform periodic payments into commercial real estate ownership.
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded-lg border border-cyan-800">
                  Equation E(t)
                </span>
              </div>

              {/* Mathematical Formula Display */}
              <div className="bg-slate-900 p-4 rounded-xl border border-amber-500/30 text-center space-y-2">
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-bold">
                  Patented Equity Accumulation Formula
                </span>
                <div className="text-lg sm:text-xl font-mono text-white font-black tracking-wide">
                  E(t) = ∑ [ P_k &middot; α_k + β &middot; M_k ] - Ω_reserve
                </div>
                <p className="text-[11px] text-slate-400 max-w-2xl mx-auto leading-relaxed">
                  {data.equityLeaseAlgorithm.explanation}
                </p>
              </div>

              {/* Interactive Parameter Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-300 block">Payment Cadence &amp; Amount</label>
                  <div className="flex gap-1 mb-2">
                    {(['weekly', 'biweekly', 'monthly'] as const).map((cad) => (
                      <button
                        key={cad}
                        onClick={() => {
                          sound.playClick();
                          setPaymentCadence(cad);
                          setPaymentAmount(cad === 'weekly' ? 350 : cad === 'biweekly' ? 700 : 1500);
                        }}
                        className={`flex-1 py-1 text-[10px] font-bold uppercase rounded ${
                          paymentCadence === cad
                            ? 'bg-amber-500 text-slate-950 font-black'
                            : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {cad}
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(Math.max(50, Number(e.target.value)))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono text-xs font-bold"
                  />
                  <span className="text-[10px] text-slate-500 block">Scheduled remittance per period</span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-300 block">
                    Apprenticeship Mentorship Hours: <strong className="text-amber-400">{mentorshipHours} hrs/wk</strong>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    step="1"
                    value={mentorshipHours}
                    onChange={(e) => setMentorshipHours(Number(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                  <span className="text-[10px] text-slate-500 block">
                    +$25 equity credit per hour instructing workforce candidates
                  </span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-300 block">
                    Tenure Duration: <strong className="text-cyan-400">{monthsActive} Months</strong>
                  </label>
                  <input
                    type="range"
                    min="6"
                    max="60"
                    step="6"
                    value={monthsActive}
                    onChange={(e) => setMonthsActive(Number(e.target.value))}
                    className="w-full accent-cyan-500"
                  />
                  <span className="text-[10px] text-slate-500 block">
                    Vesting horizon toward full condominium deed or LLC units
                  </span>
                </div>
              </div>

              {/* Results & Accumulated Wealth Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">
                    Total Payments Remitted
                  </span>
                  <span className="text-base sm:text-lg font-black font-mono text-slate-300">
                    ${Math.round(totalPayments).toLocaleString()}
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Gross cash outlay</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">
                    Mentorship Bonus Credits
                  </span>
                  <span className="text-base sm:text-lg font-black font-mono text-amber-400">
                    +${Math.round(totalMentorshipEquity).toLocaleString()}
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Workforce instruction equity</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-amber-500/40 bg-amber-950/20">
                  <span className="text-[10px] text-amber-400 uppercase tracking-wider block font-bold">
                    Net Tenant Equity E(t)
                  </span>
                  <span className="text-base sm:text-lg font-black font-mono text-emerald-400">
                    ${netTenantEquity.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-emerald-300 block mt-0.5">Real property capital ownership</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-cyan-500/40 bg-cyan-950/20">
                  <span className="text-[10px] text-cyan-400 uppercase tracking-wider block font-bold">
                    Facility Ownership Share
                  </span>
                  <span className="text-base sm:text-lg font-black font-mono text-cyan-300">
                    {ownershipPercentage}%
                  </span>
                  <span className="text-[10px] text-cyan-400 block mt-0.5">Co-operative voting voting units</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  <strong>The Anti-Booth Rental Transformation:</strong> In a conventional salon, after 24 months at $350/week, a stylist has paid <strong className="text-red-400">${Math.round(totalPayments).toLocaleString()}</strong> with <strong className="text-red-400">$0 equity</strong> and zero rights. Under Goldie’s patented model, that same stylist now owns <strong className="text-emerald-400">${netTenantEquity.toLocaleString()}</strong> in commercial property equity and {ownershipPercentage}% of facility voting power.
                </p>
              </div>
            </div>
          )}

          {/* TAB 5: Federal & IRS Government Credentials */}
          {activeTab === 'credentials' && (
            <div className="space-y-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">Verified Federal &amp; State Statutory Credentials</h3>
                  <p className="text-slate-400 text-xs">
                    Primary source government filings backing Goldie’s Unique Beauty Creations Beauty World L.L.C.
                  </p>
                </div>
                <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-800">
                  5 Verified Government Records
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* IRS CP 575 A EIN */}
                <div
                  onClick={() => {
                    sound.playClick();
                    if (onInspectExhibit) {
                      onInspectExhibit({
                        title: 'IRS Form CP 575 A Notice · EIN Assignment',
                        authority: 'Department of the Treasury · Internal Revenue Service (Cincinnati, OH)',
                        docNumber: 'EIN: 85-3559446 · Date: 10-21-2020',
                        details: [
                          'Official notice assigning Federal Employer Identification Number 85-3559446.',
                          'Entity: GOLDIES UNIQUE BEAUTY CREATIONS BEAUTY WORLD.',
                          'Member: JEANELL LAND MBR.',
                          'Address of Record: Detroit, Michigan.',
                          'Assigned forms: Form 941 (04/30/2021), Form 940 (01/31/2022), Form 1065 (03/15/2021).',
                        ],
                      });
                    }
                  }}
                  className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-amber-500/50 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">
                      IRS Form CP 575 A
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                      Active
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                    Federal Employer Identification Number (EIN)
                  </h4>
                  <div className="mt-2 space-y-1 text-[11px] text-slate-300">
                    <p>EIN: <strong className="font-mono text-amber-400">85-3559446</strong></p>
                    <p>Assigned to: <strong>GOLDIES UNIQUE BEAUTY CREATIONS BEAUTY WORLD</strong></p>
                    <p className="text-slate-500 text-[10px]">Notice Date: October 21, 2020 · Member: Jeanell Land</p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-cyan-400">
                    <span>Detroit, Michigan</span>
                    <span className="flex items-center gap-1 font-bold"><Eye className="w-3 h-3" /> Inspect Document</span>
                  </div>
                </div>

                {/* SAM.gov UEI */}
                <div
                  onClick={() => {
                    sound.playClick();
                    if (onInspectExhibit) {
                      onInspectExhibit({
                        title: 'SAM.gov Federal Unique Entity ID (UEI) Confirmation',
                        authority: 'Federal Service Desk · System for Award Management (SAM.gov)',
                        docNumber: 'UEI: J9R1TSCT26E1 · Date: Dec 21, 2023',
                        details: [
                          'Official confirmation email from donotreply@sam.gov.',
                          'Entity: GOLDIE S UNIQUE BEAUTY CREATIONS BEAUTY WORLD L.L.C.',
                          'Unique Entity ID: J9R1TSCT26E1.',
                          'Assigned to: Jeanell Land (jeanelldetroit@aol.com).',
                          'Role: UEI Data Entry Role in the Entity Registration domain on SAM.gov.',
                          'Permanent identifier: does not expire and does not need to be renewed.',
                        ],
                      });
                    }
                  }}
                  className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-cyan-500/50 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase">
                      SAM.gov Federal Procurement
                    </span>
                    <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800">
                      Permanent
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                    SAM.gov Federal Unique Entity Identifier (UEI)
                  </h4>
                  <div className="mt-2 space-y-1 text-[11px] text-slate-300">
                    <p>UEI: <strong className="font-mono text-cyan-400">J9R1TSCT26E1</strong></p>
                    <p>Entity: <strong>GOLDIE S UNIQUE BEAUTY CREATIONS BEAUTY WORLD L.L.C</strong></p>
                    <p className="text-slate-500 text-[10px]">Issued Dec 21, 2023 · Authorizes Federal Grant Receipt</p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-cyan-400">
                    <span>Entity Registration Domain</span>
                    <span className="flex items-center gap-1 font-bold"><Eye className="w-3 h-3" /> Inspect Document</span>
                  </div>
                </div>

                {/* IRS PTIN Renewal */}
                <div
                  onClick={() => {
                    sound.playClick();
                    if (onInspectExhibit) {
                      onInspectExhibit({
                        title: 'IRS Form W-12 Summary Report · PTIN Renewal',
                        authority: 'Department of the Treasury · Internal Revenue Service',
                        docNumber: 'PTIN: P02309637 · Year: 2024 Renewal',
                        details: [
                          'Official IRS Paid Preparer Tax Identification Number (PTIN) Application and Renewal.',
                          'First Name: JEANELL, Last Name: LAND.',
                          'PTIN: P02309637 (Calendar Year 2024 Renewal, Paid 01/20/2024).',
                          'Address: Detroit, Michigan.',
                          'Business: One Stop Services Center (EIN: 85-3479358, onestoprehabilitationcenters.org).',
                          'Certified data security protections for taxpayer information.',
                        ],
                      });
                    }
                  }}
                  className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">
                      IRS Form W-12 PTIN
                    </span>
                    <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                      2024 Active
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                    IRS Paid Preparer Tax Identification Number (PTIN)
                  </h4>
                  <div className="mt-2 space-y-1 text-[11px] text-slate-300">
                    <p>PTIN: <strong className="font-mono text-emerald-400">P02309637</strong></p>
                    <p>Holder: <strong>JEANELL LAND</strong> (Date of Birth: 08/22/1974)</p>
                    <p className="text-slate-500 text-[10px]">Authorized Federal Tax Return Preparer</p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-cyan-400">
                    <span>Fee Paid 01/20/2024</span>
                    <span className="flex items-center gap-1 font-bold"><Eye className="w-3 h-3" /> Inspect Document</span>
                  </div>
                </div>

                {/* Official Trademark Logo & Domain */}
                <div
                  onClick={() => {
                    sound.playClick();
                    if (onInspectExhibit) {
                      onInspectExhibit({
                        title: "Goldie's Unique Beauty Creations Beauty World Official Trademark Seal",
                        authority: 'United States Patent & Trademark Office · Principal Register',
                        docNumber: 'Domain: www.goldiesuniquebeautycreationsbeautyworld.com',
                        details: [
                          'Official circular golden insignia featuring "Goldie’s Unique Beauty Creations" crest.',
                          'Upper banner: BEAUTY &middot; Lower banner: WORLD with three central stars.',
                          'Symbolizes total personal maintenance, cosmetics, style, fashion, health, and fitness under one roof.',
                          'Domain: www.goldiesuniquebeautycreationsbeautyworld.com.',
                        ],
                      });
                    }
                  }}
                  className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-amber-500/50 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">
                      Trademark Seal &amp; Domain
                    </span>
                    <span className="text-[10px] font-mono text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800">
                      Registered
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                    Goldie’s Unique Beauty Creations Seal
                  </h4>
                  <div className="mt-2 space-y-1 text-[11px] text-slate-300">
                    <p>Motto: <em>"Where Beauty Is More Than Skin Deep"</em></p>
                    <p className="font-mono text-cyan-300 text-[10px]">www.goldiesuniquebeautycreationsbeautyworld.com</p>
                    <p className="text-slate-500 text-[10px]">Gold circular filigree insignia with 3 stars</p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-cyan-400">
                    <span>Est. 2020 &middot; Detroit, MI</span>
                    <span className="flex items-center gap-1 font-bold"><Eye className="w-3 h-3" /> Inspect Seal</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: Original Business Plan Blueprint */}
          {activeTab === 'business_plan' && (
            <div className="space-y-4 bg-slate-950 p-5 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-white">
                    Original Business Plan: Goldie’s Unique Beauty Creations Beauty World L.L.C.
                  </h3>
                  <p className="text-slate-400 text-xs">
                    "Where Beauty Is More Than Skin Deep" &middot; Cosmetics, Style, Fashion, Health, Fitness, and Complete Make-Over
                  </p>
                </div>
                <span className="text-xs font-mono text-amber-400 font-bold">6 Comprehensive Operational Pages</span>
              </div>

              <div className="space-y-3 text-[11px] leading-relaxed text-slate-300">
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <h4 className="font-bold text-white text-xs">Concept &amp; Core Vision</h4>
                  <p>
                    A new concept in total personal maintenance and personal possessions care in a one-stop convenient shopping and service center. Offering convenient and professional services, quality products, and the latest in Food and Fashion—all available under one roof in a multi-unit kaleidoscope of stores and shops designed to fulfill every personal consumer need.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <h5 className="font-bold text-amber-300 text-xs">Continuous 24-Hour Services</h5>
                    <ul className="space-y-1 text-slate-300">
                      <li>&bull; <strong>Beauty &amp; Barber Services:</strong> 25 master stylists serving adults and children 24 hours a day and major holidays.</li>
                      <li>&bull; <strong>Private Nail Salons:</strong> 20 nail technicians providing acrylic, gel, fill-ins, and repairs 24 hours a day.</li>
                      <li>&bull; <strong>Fitness Room:</strong> Open 24 hours a day with certified fitness and nutritional specialists.</li>
                    </ul>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <h5 className="font-bold text-cyan-300 text-xs">Wellness, Spa &amp; Leisure</h5>
                    <ul className="space-y-1 text-slate-300">
                      <li>&bull; <strong>Spa &amp; Tanning:</strong> 5 Spa Treatment Rooms and 5 Tanning Booths available 7 days a week.</li>
                      <li>&bull; <strong>Dance &amp; Yoga:</strong> Flexible schedule classes accommodating non-standard work shifts.</li>
                      <li>&bull; <strong>Health Products Store:</strong> Vitamins, oils, minerals, and supplements open 7 days a week.</li>
                    </ul>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <h5 className="font-bold text-emerald-300 text-xs">Unique Operating Innovations</h5>
                    <ul className="space-y-1 text-slate-300">
                      <li>&bull; <strong>Co-Operative Equity Leasing:</strong> Vendors do not pay rent; they earn equity in their commercial space and gain true business ownership.</li>
                      <li>&bull; <strong>Federal Funding for Disadvantaged Women:</strong> Work training, beauty makeovers, clothing, fitness, and <em>free childcare</em> on-site.</li>
                      <li>&bull; <strong>Entrepreneurial Training &amp; Apprenticeships:</strong> Mandatory training and vendor apprentice partnerships.</li>
                    </ul>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <h5 className="font-bold text-rose-300 text-xs">Phase II Hotel &amp; Talent Studio</h5>
                    <ul className="space-y-1 text-slate-300">
                      <li>&bull; <strong>Hotel &amp; Resort:</strong> Permanent vacation and recreation space with equity positions in the facility and 24-hr room service.</li>
                      <li>&bull; <strong>Fashion Competitions:</strong> Semi-annual contests feeding on-site garment manufacturing for Goldie’s Unique Special Boutique.</li>
                      <li>&bull; <strong>Talent Agency &amp; Photo Studio:</strong> Captures client beauty portfolios and executes direct job placement.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800 shrink-0 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <span className="font-mono text-cyan-400 font-bold">Goldie's Unique Beauty Creations Beauty World L.L.C.</span>
            <span>&bull;</span>
            <span className="text-slate-500 font-mono">USPTO EFS-Web Ready Specification</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadSpec}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-colors border border-slate-700 flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export USPTO Specification (.txt)</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl transition-colors shadow-md"
            >
              Close Docket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
