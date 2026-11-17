import React, { useState } from 'react';
import {
  FileText,
  ShieldCheck,
  CheckCircle2,
  X,
  Printer,
  HeartHandshake,
  DollarSign,
  Building2,
  Scale,
  Sparkles,
  Phone,
  Mail,
  User,
  Clock,
  ArrowRight,
  BadgeCheck,
  Download,
  AlertCircle,
  Scissors,
  Shield,
  HelpCircle,
  Bot,
  Car,
  Award,
  Briefcase,
} from 'lucide-react';
import { JEANELL_LAND_SERVICES } from '../../data/servicesElectionData';
import { ServiceElectionItem, ClientServiceElection, JeanellServiceCategory } from '../../types/serviceElection';
import { sound } from '../../utils/audio';

interface ClientServiceElectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string;
  onServiceElected?: (election: ClientServiceElection) => void;
}

export const ClientServiceElectionModal: React.FC<ClientServiceElectionModalProps> = ({
  isOpen,
  onClose,
  preselectedServiceId,
  onServiceElected,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedService, setSelectedService] = useState<ServiceElectionItem>(() => {
    if (preselectedServiceId) {
      const found = JEANELL_LAND_SERVICES.find((s) => s.id === preselectedServiceId);
      if (found) return found;
    }
    return JEANELL_LAND_SERVICES[0];
  });

  // Client form states
  const [clientName, setClientName] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [urgency, setUrgency] = useState<'routine' | 'priority' | 'urgent_immediate'>('routine');
  const [donationAmount, setDonationAmount] = useState<string>('100');
  const [clientNotes, setClientNotes] = useState<string>('');

  // Retainer Confirmation State
  const [activeConfirmation, setActiveConfirmation] = useState<ClientServiceElection | null>(null);

  if (!isOpen) return null;

  const filteredServices = JEANELL_LAND_SERVICES.filter((svc) => {
    if (selectedCategory === 'all') return true;
    return svc.category === selectedCategory;
  });

  const handleSelectService = (svc: ServiceElectionItem) => {
    sound.playClick();
    setSelectedService(svc);
    setActiveConfirmation(null);
  };

  const handleSubmitElection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientEmail.trim()) {
      sound.playAlert();
      return;
    }

    sound.playSuccess();

    const confirmationNum = `RET-2026-JL-${Math.floor(100000 + Math.random() * 900000)}`;
    const feeDisplay =
      selectedService.pricingType === 'tax_deductible_donation'
        ? `$${donationAmount} (Tax-Deductible Contribution under IRC § 170)`
        : selectedService.estimatedPrice;

    const newElection: ClientServiceElection = {
      id: `election-${Date.now()}`,
      clientName: clientName.trim(),
      clientEmail: clientEmail.trim(),
      clientPhone: clientPhone.trim() || '(313) 510-3610',
      selectedServiceId: selectedService.id,
      serviceTitle: selectedService.title,
      category: selectedService.category,
      urgency,
      notes: clientNotes.trim() || 'Client elected services rendered by Jeanell Land & Associates.',
      status: 'engagement_letter_issued',
      electedDate: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      engagementConfirmationNumber: confirmationNum,
      feeStructure: feeDisplay,
      entityResponsible: selectedService.entityName,
      assignedAssociates: [selectedService.leadProfessional, 'Senior Client Case Manager'],
    };

    setActiveConfirmation(newElection);
    if (onServiceElected) {
      onServiceElected(newElection);
    }
  };

  const handlePrintRetainer = () => {
    sound.playClick();
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-slate-900 border border-slate-700 rounded-3xl p-4 sm:p-6 shadow-2xl space-y-4 my-auto max-h-[94vh] flex flex-col animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-3 shrink-0">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="p-1 rounded bg-amber-500/20 text-amber-400 border border-amber-500/40 text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> OFFICIAL SERVICE ELECTION &amp; RETAINER HUB
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded font-bold">
                PTIN: P02309637 · DAR #6504432062
              </span>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800 px-2 py-0.5 rounded font-bold">
                501(c)(3) EIN: 85-3488624
              </span>
            </div>

            <h2 className="text-base sm:text-lg font-black text-white leading-snug">
              Services Rendered by Jeanell Land &amp; Professional Associates
            </h2>
            <p className="text-xs text-slate-300">
              Elect professional tax preparation, real estate acquisitions, or community rehabilitation programs through One Stop Rehabilitation Center 501(c)(3).
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors shrink-0"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="flex border-b border-slate-800 bg-slate-950/80 p-1.5 rounded-xl gap-1.5 overflow-x-auto shrink-0">
          {[
            { id: 'all', label: 'All Services Menu', icon: Sparkles },
            { id: 'ai_training', label: 'AI Training & Prompting', icon: Bot, badge: 'High-Demand' },
            { id: 'tax_preparation', label: 'Tax Preparation (PTIN)', icon: FileText, badge: 'IRS PTIN' },
            { id: 'real_estate_deals', label: 'Real Estate & MLS (Broker)', icon: Building2, badge: 'DAR #6504432062' },
            { id: 'insurance_risk', label: 'Insurance & Risk Underwriting', icon: Shield, badge: 'DIFS Licensed' },
            { id: 'project_management', label: 'Project Management (PMP)', icon: Briefcase, badge: 'PMP Standards' },
            { id: 'notary_public', label: 'Notary Public Signing', icon: Award, badge: 'State Commissioned' },
            { id: 'cdl_transportation', label: 'CDL Class A & B Logistics', icon: Car, badge: 'FMCSA Certified' },
            { id: 'onestop_nonprofit', label: 'One Stop 501(c)(3) Nonprofit', icon: HeartHandshake, badge: '501(c)(3)' },
            { id: 'goldies_beauty_world', label: "Goldie's Beauty World Co-Op", icon: Scissors, badge: 'Patented' },
          ].map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedCategory(cat.id);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
                {cat.badge && (
                  <span
                    className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-bold ${
                      isSelected ? 'bg-amber-800 text-amber-200' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {cat.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Confirmation Screen IF Submitted */}
        {activeConfirmation ? (
          <div className="flex-1 overflow-y-auto space-y-4 p-5 bg-slate-950 rounded-2xl border-2 border-emerald-500/60 animate-in zoom-in-95 duration-200 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase text-emerald-400 block">
                    Official Service Election Confirmed &middot; Engagement Letter Generated
                  </span>
                  <h3 className="text-base font-bold text-white">
                    Confirmation #{activeConfirmation.engagementConfirmationNumber}
                  </h3>
                </div>
              </div>

              <button
                onClick={handlePrintRetainer}
                className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl border border-slate-700 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Engagement Letter</span>
              </button>
            </div>

            {/* Official Engagement Letter Document Preview */}
            <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-4 font-mono text-[11px] text-slate-300">
              <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                <div>
                  <strong className="text-white text-xs block">JEANELL LAND &amp; ASSOCIATES</strong>
                  <span>Headquarters: Detroit, Michigan</span>
                  <span className="block text-slate-400">Direct Office: (313) 510-3610 &middot; Email: jland@onestoprehabilitationcenters.org &middot; Web: onestoprehabilitationcenters.org</span>
                </div>
                <div className="text-right">
                  <span className="text-amber-400 font-bold block">{activeConfirmation.electedDate}</span>
                  <span className="text-slate-400">Status: Client Retainer Executed</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-slate-950 rounded-xl border border-slate-800">
                <div>
                  <span className="text-slate-500 block text-[10px]">CLIENT INFORMATION:</span>
                  <strong className="text-white text-xs">{activeConfirmation.clientName}</strong>
                  <span className="block text-slate-400">{activeConfirmation.clientEmail}</span>
                  <span className="block text-slate-400">{activeConfirmation.clientPhone}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">RESPONSIBLE ENTITY &amp; LEAD:</span>
                  <strong className="text-white text-xs">{activeConfirmation.entityResponsible}</strong>
                  <span className="block text-amber-300">Lead Professional: {selectedService.leadProfessional}</span>
                  <span className="block text-slate-400">{selectedService.statutoryAuthority}</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-slate-400 text-[10px] block uppercase font-bold">ELECTED SERVICE SPECIFICATIONS:</span>
                <p className="text-white font-bold text-xs">{activeConfirmation.serviceTitle}</p>
                <p className="text-slate-300 leading-relaxed font-sans">{selectedService.description}</p>
              </div>

              <div className="space-y-1.5">
                <span className="text-slate-400 text-[10px] block uppercase font-bold">FEE &amp; REMUNERATION STRUCTURE:</span>
                <p className="text-emerald-400 font-bold text-xs">{activeConfirmation.feeStructure}</p>
                {selectedService.category === 'onestop_nonprofit' && (
                  <p className="text-slate-400 text-[10px] italic">
                    * One Stop Rehabilitation Center is an IRS-determined 501(c)(3) Public Charity (Letter 947, DLN 26053700002260, Public Charity 509(a)(2)). Contributions and gifts are tax-deductible under Internal Revenue Code Section 170.
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 text-[10px] block uppercase font-bold">DELIVERABLES COMMITTED:</span>
                <ul className="list-disc pl-4 space-y-1 text-slate-300">
                  {selectedService.deliverables.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                <span>Authorized Signatory: /Jeanell Land/</span>
                <span>Verification Docket: {activeConfirmation.engagementConfirmationNumber}</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => setActiveConfirmation(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
              >
                &larr; Elect Another Service
              </button>

              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md"
              >
                Close &amp; Return to Application
              </button>
            </div>
          </div>
        ) : (
          /* Normal Interactive Service Election Split Screen */
          <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-4 text-xs">
            {/* Left Column: Services Catalog List (5 cols) */}
            <div className="lg:col-span-5 space-y-2.5 overflow-y-auto max-h-[60vh] pr-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold">
                Select Service to Elect ({filteredServices.length} Available)
              </span>

              {filteredServices.map((svc) => {
                const isSelected = selectedService.id === svc.id;
                return (
                  <div
                    key={svc.id}
                    onClick={() => handleSelectService(svc)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-slate-950 border-amber-500 shadow-md shadow-amber-950/30 ring-1 ring-amber-500/40'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase">
                        {svc.entityName}
                      </span>
                      <span
                        className={`text-[9px] font-mono px-2 py-0.5 rounded font-bold ${
                          svc.pricingType === 'free_nonprofit'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : svc.pricingType === 'tax_deductible_donation'
                            ? 'bg-purple-950 text-purple-300 border border-purple-800'
                            : 'bg-slate-800 text-amber-300'
                        }`}
                      >
                        {svc.pricingType === 'free_nonprofit' ? 'FREE 501(c)(3)' : svc.pricingType.toUpperCase()}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-white leading-snug">{svc.title}</h4>
                    <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">{svc.description}</p>

                    <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
                      <span className="text-amber-300 font-semibold">{svc.leadProfessional}</span>
                      <span className="text-slate-400 font-mono">{svc.estimatedPrice}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Selected Service Details & Election Form (7 cols) */}
            <div className="lg:col-span-7 bg-slate-950 p-4 sm:p-5 rounded-2xl border border-slate-800 space-y-4 flex flex-col justify-between">
              {/* Service Detailed Overview */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] font-mono text-amber-400 font-bold uppercase block">
                      {selectedService.leadTitle}
                    </span>
                    <h3 className="text-sm sm:text-base font-black text-white">{selectedService.title}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-emerald-400 font-mono block">
                      {selectedService.estimatedPrice}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">{selectedService.entityName}</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-300 leading-relaxed">{selectedService.description}</p>

                {/* Statutory Authority & Verified Credentials */}
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 space-y-1.5">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold block">
                    Verified Statutory Authority &amp; Government Credentials
                  </span>
                  <p className="text-[10px] text-slate-400">{selectedService.statutoryAuthority}</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {selectedService.credentials.map((cred, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px] font-mono text-slate-300 flex items-center gap-1"
                      >
                        <BadgeCheck className="w-3 h-3 text-emerald-400" />
                        <span>{cred}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Deliverables Checklist */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono text-amber-400 uppercase font-bold block">
                    Services Rendered &amp; Formal Deliverables
                  </span>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] text-slate-300">
                    {selectedService.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 bg-slate-900/60 p-2 rounded-lg border border-slate-800/80">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                        <span className="leading-tight">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Client Election & Retainer Submission Form */}
              <form onSubmit={handleSubmitElection} className="pt-3 border-t border-slate-800 space-y-3">
                <span className="text-[10px] font-mono text-white uppercase font-bold block">
                  Elect This Service &middot; Request Direct Engagement
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5 font-semibold">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="e.g. Marcus Vance"
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5 font-semibold">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder="client@example.com"
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5 font-semibold">Phone Number</label>
                    <input
                      type="tel"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="(313) 555-0199"
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white text-xs"
                    />
                  </div>
                </div>

                {/* Conditional Fields: Donation or Specific Notes */}
                {selectedService.pricingType === 'tax_deductible_donation' && (
                  <div className="p-3 bg-purple-950/40 border border-purple-500/40 rounded-xl space-y-2">
                    <label className="text-[11px] font-bold text-purple-300 block">
                      Select Charitable Contribution Amount (100% Tax Deductible under IRC § 170):
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {['25', '50', '100', '250', '500'].map((amt) => (
                        <button
                          type="button"
                          key={amt}
                          onClick={() => setDonationAmount(amt)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-colors ${
                            donationAmount === amt
                              ? 'bg-purple-600 text-white'
                              : 'bg-slate-900 text-slate-300 border border-slate-800 hover:text-white'
                          }`}
                        >
                          ${amt}
                        </button>
                      ))}
                      <input
                        type="number"
                        value={donationAmount}
                        onChange={(e) => setDonationAmount(e.target.value)}
                        placeholder="Custom $"
                        className="w-24 bg-slate-900 border border-slate-800 rounded-lg px-2 text-xs text-white font-mono"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5 font-semibold">
                    Specific Case Notes / Tax Years / Property Address / Needs
                  </label>
                  <textarea
                    rows={2}
                    value={clientNotes}
                    onChange={(e) => setClientNotes(e.target.value)}
                    placeholder="Describe specific tax forms, MLS target neighborhoods, housing/job placement needs, or timeline..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-400 font-semibold">Priority:</span>
                    {(['routine', 'priority', 'urgent_immediate'] as const).map((urg) => (
                      <button
                        type="button"
                        key={urg}
                        onClick={() => setUrgency(urg)}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase transition-colors ${
                          urgency === urg
                            ? 'bg-amber-500 text-slate-950'
                            : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {urg === 'urgent_immediate' ? 'URGENT' : urg}
                      </button>
                    ))}
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-950/40 flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Execute Service Retainer</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
