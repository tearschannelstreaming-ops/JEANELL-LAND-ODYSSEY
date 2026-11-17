import React, { useState } from 'react';
import { VerifiedCredential, MarketplaceAd, StudentProfile, PlayerStats } from '../../types/game';
import { sound } from '../../utils/audio';
import {
  Award,
  Upload,
  CheckCircle2,
  FileCheck,
  Shield,
  Star,
  Plus,
  Briefcase,
  Megaphone,
  Sparkles,
  Lock,
  DollarSign,
  HeartHandshake,
  Building2,
  ExternalLink,
  FileText,
  Radio,
  Car,
  ShieldCheck,
  Scale,
  Printer,
  BookOpen,
  TrendingUp,
  X,
  Eye,
  BadgeCheck,
  Home,
  Globe,
  Download,
  Calculator,
  Baby,
  ArrowRight,
} from 'lucide-react';
import { GoldiePatentApplicationModal } from './GoldiePatentApplicationModal';
import { SupportNonProfitSection } from '../justice/SupportNonProfitSection';
import { ClientServiceElectionModal } from '../services/ClientServiceElectionModal';
import { JEANELL_LAND_SERVICES } from '../../data/servicesElectionData';

interface CredentialVaultProps {
  profile: StudentProfile;
  onUpdateProfile: (newProfile: StudentProfile) => void;
  playerStats: PlayerStats;
  onUpdateStats: (delta: Partial<PlayerStats>) => void;
  onOpenBiometrics: () => void;
  onOpenServiceElection?: (serviceId?: string) => void;
}

export const CredentialVault: React.FC<CredentialVaultProps> = ({
  profile,
  onUpdateProfile,
  playerStats,
  onUpdateStats,
  onOpenBiometrics,
  onOpenServiceElection,
}) => {
  const [activeTab, setActiveTab] = useState<'onestop' | 'services' | 'patent' | 'credentials' | 'marketplace' | 'premium'>('onestop');
  const [isPatentModalOpen, setIsPatentModalOpen] = useState<boolean>(false);
  const [isServicesModalOpen, setIsServicesModalOpen] = useState<boolean>(false);
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | undefined>(undefined);
  const [selectedExhibitImage, setSelectedExhibitImage] = useState<{
    title: string;
    src?: string;
    authority: string;
    docNumber: string;
    details: string[];
  } | null>(null);

  // Pre-loaded & uploaded credentials
  const [credentials, setCredentials] = useState<VerifiedCredential[]>([
    {
      id: 'cred_all_your_needs_reality',
      title: 'All Your Needs Reality LLC (IRS CP 575 A / Form SS-4)',
      issuer: 'Internal Revenue Service (IRS Cincinnati OH)',
      issueDate: 'October 5, 2023',
      category: 'Certification',
      verificationHash: 'EIN: 93-3773484 · Jeanell Land Sole MBR · Detroit, MI',
      status: 'verified',
      statBonuses: { financialAcumen: 30, communityLegacy: 25, resilience: 20 },
    },
    {
      id: 'cred_jeanell_agency_2016',
      title: 'Jeanell Land Employment Rehabilitation Community Agency (IRS LTR 147C)',
      issuer: 'Internal Revenue Service (IRS Ogden UT)',
      issueDate: 'January 29, 2016',
      category: 'Certification',
      verificationHash: 'EIN: 35-2472616 · PO Box 7191, Detroit MI 48207-0191 · Workforce Re-entry Sanctuary',
      status: 'verified',
      statBonuses: { communityLegacy: 30, resilience: 25, coolPoints: 15 },
    },
    {
      id: 'cred_mi_life_health_2026',
      title: 'Michigan 24 Hour Life & Health Course with Ethics',
      issuer: 'State of Michigan LARA & At Your Pace Online (Provider 0991)',
      issueDate: 'August 18, 2026',
      category: 'License',
      verificationHash: 'License No: 0323291 · Course ID: 94345 (21 Life & Health, 3 Ethics)',
      status: 'verified',
      statBonuses: { financialAcumen: 25, resilience: 20, steamMastery: 10 },
    },
    {
      id: 'cred_uspto_patents_2026',
      title: 'USPTO Multi-Vector Biometric & Telematics Patent Portfolio',
      issuer: 'United States Patent and Trademark Office (USPTO)',
      issueDate: 'August – September 2026',
      category: 'Certification',
      verificationHash: 'Pro Se Inventor: Jeanell Land · Dockets: STEARSAFE-ATM-2026-002, FINSEC-ATM-2026-003, TEARSAFE-SOC-2026-0901, UNIFIED-2026-0901',
      status: 'verified',
      statBonuses: { steamMastery: 35, resilience: 30, communityLegacy: 30 },
    },
    {
      id: 'cred_re_license',
      title: 'State of Michigan Real Estate Broker License',
      issuer: 'Michigan Department of Licensing and Regulatory Affairs (LARA)',
      issueDate: 'October 2004',
      category: 'License',
      verificationHash: 'MI-RE-BROKER-849204-VERIFIED',
      status: 'verified',
      statBonuses: { financialAcumen: 25, communityLegacy: 15 },
    },
    {
      id: 'cred_tax_efin',
      title: 'IRS PTIN & Authorized E-File Provider (EFIN)',
      issuer: 'Internal Revenue Service (IRS)',
      issueDate: 'December 2004 / 2023',
      category: 'Certification',
      verificationHash: 'IRS-EFIN-093821-COMPLIANT',
      status: 'verified',
      statBonuses: { financialAcumen: 20, resilience: 10 },
    },
    {
      id: 'cred_insurance_pc',
      title: 'Life & Health / Property & Casualty Producer License',
      issuer: 'Dearborn Financial / State of Michigan',
      issueDate: 'March 2003',
      category: 'License',
      verificationHash: 'MI-INS-PROD-77391-ACTIVE',
      status: 'verified',
      statBonuses: { financialAcumen: 20, resilience: 15 },
    },
  ]);

  // Upload Form State
  const [newTitle, setNewTitle] = useState<string>('');
  const [newIssuer, setNewIssuer] = useState<string>('');
  const [newCategory, setNewCategory] = useState<VerifiedCredential['category']>('Certification');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadSuccess, setUploadSuccess] = useState<string>('');

  // Marketplace Ads
  const [ads, setAds] = useState<MarketplaceAd[]>([
    {
      id: 'ad_1',
      ownerName: 'Jeanell Land',
      businessTitle: 'Better Forever Financial Consulting & Tax Preparation',
      serviceCategory: 'Financial Services & Real Estate',
      contactEmail: 'jland@onestoprehabilitationcenters.org',
      phone: '(844) I-GOT-NEEDS',
      description: 'Comprehensive financial literacy, 501(c)(3) community development, and multi-family real estate guidance.',
      isFeatured: true,
      postedAt: 'October 2026',
    },
    {
      id: 'ad_2',
      ownerName: 'Marcus Vance',
      businessTitle: 'Apex Avionics & Suborbital Systems',
      serviceCategory: 'Aerospace Engineering',
      contactEmail: 'mvance@midwestaero.com',
      phone: '(313) 555-0192',
      description: 'Precision telemetry harnesses and digital flight control calibration for commercial research aircraft.',
      isFeatured: true,
      postedAt: 'October 2026',
    },
  ]);

  // New Ad Form
  const [adBusiness, setAdBusiness] = useState<string>('');
  const [adCategory, setAdCategory] = useState<string>('Vocational Trades');
  const [adDesc, setAdDesc] = useState<string>('');
  const [adPhone, setAdPhone] = useState<string>('');

  const characterLevel = Math.max(1, 1 + credentials.length);
  const characterTitles = [
    'Apprentice S.T.E.A.M. Explorer',
    'Certified Technician & Analyst',
    'Senior Flight Systems Engineer',
    'Licensed Real Estate Broker & Underwriter',
    'Master Founder & Community Executive',
  ];
  const currentTitle = characterTitles[Math.min(characterTitles.length - 1, characterLevel - 1)];

  const handleUploadCredential = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newIssuer.trim()) return;

    sound.playClick();
    setIsUploading(true);

    setTimeout(() => {
      const hash = `VERIFIED-${newCategory.toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;
      const newCred: VerifiedCredential = {
        id: `cred_${Date.now()}`,
        title: newTitle,
        issuer: newIssuer,
        issueDate: new Date().toLocaleDateString(),
        category: newCategory,
        verificationHash: hash,
        status: 'verified',
        statBonuses: {
          resilience: 15,
          steamMastery: newCategory === 'Degree' || newCategory === 'Trade Award' ? 25 : 10,
          financialAcumen: newCategory === 'License' ? 25 : 10,
        },
      };

      setCredentials([newCred, ...credentials]);
      setIsUploading(false);
      setNewTitle('');
      setNewIssuer('');
      sound.playSuccess();
      setUploadSuccess(`Credential Verified! Character leveled up to Level ${characterLevel + 1}!`);
      setTimeout(() => setUploadSuccess(''), 4000);

      onUpdateStats({
        resilience: 15,
        steamMastery: 20,
        financialAcumen: 15,
        communityLegacy: 15,
      });

      onUpdateProfile({
        ...profile,
        characterLevel: characterLevel + 1,
        characterTitle: currentTitle,
      });
    }, 1200);
  };

  const handleCreateAd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adBusiness.trim() || !adDesc.trim()) return;

    sound.playClick();
    const newAd: MarketplaceAd = {
      id: `ad_${Date.now()}`,
      ownerName: profile.name,
      businessTitle: adBusiness,
      serviceCategory: adCategory,
      contactEmail: profile.parentEmail || 'student@example.com',
      phone: adPhone || '(313) 555-0144',
      description: adDesc,
      isFeatured: profile.isPremiumMember,
      postedAt: new Date().toLocaleDateString(),
    };

    setAds([newAd, ...ads]);
    setAdBusiness('');
    setAdDesc('');
    setAdPhone('');
    sound.playSuccess();
  };

  const handleUpgradePremium = () => {
    sound.playSuccess();
    onUpdateProfile({
      ...profile,
      isPremiumMember: true,
    });
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl space-y-6 p-6">
      {/* Header with Character Evolution Status */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-6 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
            <Award className="w-4 h-4" />
            <span>CHARACTER EVOLUTION &amp; CREDENTIAL VAULT</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
            {profile.name} · Level {characterLevel}
          </h2>
          <p className="text-xs text-cyan-300 font-mono mt-0.5">
            Rank: {currentTitle} · {credentials.length} Verified Credentials
          </p>
        </div>

        <div className="flex items-center gap-3">
          {profile.isBiometricallyVerified ? (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/70 border border-emerald-500/50 text-xs text-emerald-300 font-mono">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Biometrics Certified</span>
            </div>
          ) : (
            <button
              onClick={onOpenBiometrics}
              className="px-3 py-1.5 text-xs font-semibold text-cyan-300 bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/40 rounded-lg transition-colors shadow-sm"
            >
              Verify Face Biometrics
            </button>
          )}

          {profile.isPremiumMember ? (
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-950/70 border border-amber-500/50 text-xs text-amber-300 font-semibold font-mono">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>PRO Premium Member</span>
            </span>
          ) : (
            <button
              onClick={handleUpgradePremium}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-500 rounded-lg transition-colors shadow-sm"
            >
              Unlock Premium Access ($19)
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 gap-2 overflow-x-auto pb-0.5">
        {[
          { id: 'onestop', label: 'One Stop Rehabilitation Center 501(c)(3) & Exhibits', icon: HeartHandshake },
          { id: 'services', label: 'Elect Services (Taxes, Deals, 501c3)', icon: Sparkles },
          { id: 'patent', label: "Goldie's Beauty World Patent & LLC (USPTO)", icon: Sparkles },
          { id: 'credentials', label: 'Verified Credentials & Diplomas', icon: FileCheck },
          { id: 'marketplace', label: 'Community Business Marketplace & Ads', icon: Megaphone },
          { id: 'premium', label: 'Premium Benefits & Employer Spotlight', icon: Star },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => {
                sound.playClick();
                setActiveTab(tab.id as any);
              }}
              className={`flex items-center gap-2 pb-3 px-3.5 text-xs font-semibold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'border-amber-400 text-amber-300 font-bold'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {uploadSuccess && (
        <div className="p-3 bg-emerald-950/80 border border-emerald-500/50 rounded-lg text-xs text-emerald-300 flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          <span>{uploadSuccess}</span>
        </div>
      )}

      {/* TAB 0: One Stop Rehabilitation Center 501(c)(3) & Sovereign Institutional Portfolio */}
      {activeTab === 'onestop' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Hero Banner */}
          <div className="bg-gradient-to-r from-amber-950/80 via-slate-900 to-indigo-950/80 border-2 border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 shadow-sm flex items-center gap-1.5">
                    <HeartHandshake className="w-3.5 h-3.5" />
                    FOUNDED BY JEANELL LAND · DETROIT, MI
                  </span>
                  <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/80 border border-emerald-500/40 px-2.5 py-1 rounded-full font-bold">
                    Federal 501(c)(3) Non-Profit
                  </span>
                  <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/80 border border-cyan-500/40 px-2.5 py-1 rounded-full font-bold">
                    FCC FRN: 0033922386
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  One Stop Rehabilitation Center
                </h1>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  Headquartered in <strong>Detroit, Michigan</strong>. Directed by President Jeanell Land, One Stop Rehabilitation Center provides comprehensive transitional housing, aged-out foster youth care, domestic violence shelter, returning citizens re-entry, expungement legal clinics, youth S.T.E.A.M. academies, and public telecommunications broadcasting.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                    <span className="text-[10px] uppercase text-slate-400 font-bold block">President / Founder</span>
                    <span className="font-bold text-white text-xs">Jeanell Land</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                    <span className="text-[10px] uppercase text-slate-400 font-bold block">Federal Tax EIN</span>
                    <span className="font-mono text-amber-400 font-bold text-xs">85-3488624</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                    <span className="text-[10px] uppercase text-slate-400 font-bold block">FCC CORES FRN</span>
                    <span className="font-mono text-cyan-400 font-bold text-xs">0033922386</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                    <span className="text-[10px] uppercase text-slate-400 font-bold block">Official Direct Line</span>
                    <span className="font-mono text-emerald-400 font-bold text-xs">(313) 510-3610</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                    <span className="text-[10px] uppercase text-slate-400 font-bold block">Official Website</span>
                    <a
                      href="https://onestoprehabilitationcenters.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-cyan-300 hover:text-cyan-200 font-bold text-[11px] truncate block"
                    >
                      onestoprehabilitationcenters.org
                    </a>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                    <span className="text-[10px] uppercase text-slate-400 font-bold block">Official Email</span>
                    <a
                      href="mailto:jland@onestoprehabilitationcenters.org"
                      className="font-mono text-emerald-300 hover:text-emerald-200 font-bold text-[11px] truncate block"
                    >
                      jland@onestoprehabilitationcenters.org
                    </a>
                  </div>
                </div>
              </div>

              {/* Verified Badge Container & Logo Preview */}
              <div className="flex flex-col items-center gap-3 shrink-0">
                <div className="w-28 h-28 rounded-3xl bg-slate-950 border-2 border-amber-500/50 p-2 shadow-xl flex items-center justify-center overflow-hidden">
                  <img
                    src="/public/assets/aistudio/All_Your_Needs_Broker_Jeanell_Land_logo_eee8bd91.png"
                    alt="All Your Needs Reality & One Stop Rehabilitation Center Seal"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-center">
                  <div className="text-xs font-bold text-amber-300">All Your Needs Reality LLC</div>
                  <div className="text-[10px] text-slate-400 font-mono">Commercial Brokerage Sister Entity</div>
                </div>
              </div>
            </div>
          </div>

          {/* 6 Core Community Service Pillars */}
          <div className="space-y-3">
            <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center justify-between">
              <span>One Stop Rehabilitation Center · 6 Core Operational Pillars</span>
              <span className="text-[11px] font-normal text-emerald-400">Wayne County &amp; Statewide Reach</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {[
                {
                  title: '24/7 Domestic Violence Haven Beds',
                  icon: Shield,
                  color: 'text-rose-400',
                  badge: 'Emergency Sanctuary',
                  desc: 'Immediate protective placement for mothers and children fleeing abuse, paired with confidential shelter, security, and trauma-informed legal counseling.',
                },
                {
                  title: 'Aged-Out Foster Youth Housing',
                  icon: Home,
                  color: 'text-amber-400',
                  badge: 'Licensed Sanctuary',
                  desc: 'Preventing homelessness for young adults aging out of the child welfare system at 18, providing stable transitional housing, life skills, and college preparation.',
                },
                {
                  title: 'Returning Citizens Re-entry & Expungement',
                  icon: Scale,
                  color: 'text-emerald-400',
                  badge: 'Restorative Justice',
                  desc: 'Conducting free ICHAT criminal background audits and clean-slate expungement petitions to remove barriers to employment, housing, and civil rights.',
                },
                {
                  title: 'Youth S.T.E.A.M. & Flight Aeronautics Lab',
                  icon: Sparkles,
                  color: 'text-cyan-400',
                  badge: 'Aerospace Academy',
                  desc: 'Wind tunnel fluid physics, biometric security systems, and interactive computer workstations training young Detroiters in aerospace and trade sciences.',
                },
                {
                  title: 'Community Food Pantry & Emergency Relief',
                  icon: HeartHandshake,
                  color: 'text-yellow-400',
                  badge: 'Direct Relief',
                  desc: 'Daily distribution of fresh groceries, baby formula, emergency hygiene supplies, and winter coats directly to neighborhood families.',
                },
                {
                  title: 'FCC Telecommunications & Broadcast Media',
                  icon: Radio,
                  color: 'text-indigo-400',
                  badge: 'FCC FRN: 0033922386',
                  desc: 'Operating T.E.A.R.S. Channel 24/7 and TEARadio 100.1 FM to broadcast financial literacy, sovereign wealth education, and youth achievement.',
                },
              ].map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 flex flex-col justify-between space-y-2.5 transition-all shadow-md"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300">
                          <Icon className={`w-4 h-4 ${pillar.color}`} />
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300 font-bold">
                          {pillar.badge}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-white">{pillar.title}</h4>
                      <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{pillar.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Primary Evidence Gallery: Authentic Licenses, Logos & Regulatory Exhibits */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-black text-white uppercase tracking-wider">
                  Official Institutional Exhibits &amp; Verified Regulatory Credentials
                </h3>
                <p className="text-[11px] text-slate-400">
                  Click any document to inspect official state, federal, IRS, and USPTO dockets full-size.
                </p>
              </div>
              <span className="text-xs font-mono text-cyan-400 font-bold">
                20 Verified Primary Exhibits
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Exhibit 1: All Your Needs Reality Logo */}
              <div
                onClick={() => {
                  sound.playClick();
                  setSelectedExhibitImage({
                    title: 'All Your Needs Reality LLC Official Brokerage Seal',
                    src: '/public/assets/aistudio/All_Your_Needs_Broker_Jeanell_Land_logo_eee8bd91.png',
                    authority: 'Commercial Brokerage Division · Broker Jeanell Land',
                    docNumber: 'Established 2023 · License #6504432062',
                    details: [
                      'Commercial brokerage firm founded and led by Broker Jeanell Land.',
                      'Headquartered in Detroit, Michigan.',
                      'Primary REALTOR® Member of the Detroit Association of REALTORS® (DAR).',
                      'Integrates real estate acquisitions with One Stop Rehabilitation housing missions.',
                    ],
                  });
                }}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-amber-500/60 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="aspect-video w-full rounded-xl bg-slate-900 border border-slate-800 overflow-hidden flex items-center justify-center p-3 group-hover:scale-[1.02] transition-transform">
                    <img
                      src="/public/assets/aistudio/All_Your_Needs_Broker_Jeanell_Land_logo_eee8bd91.png"
                      alt="All Your Needs Reality Logo"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-amber-400 font-bold uppercase block">
                      Exhibit 1 · Brokerage Seal
                    </span>
                    <h4 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                      All Your Needs Reality LLC Official Insignia
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Broker Jeanell Land (Est. 2023) · Detroit Association of REALTORS®
                    </p>
                  </div>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                  <span>License #6504432062</span>
                  <span className="text-cyan-400 font-bold flex items-center gap-1">
                    <Eye className="w-3 h-3" /> Click to Inspect
                  </span>
                </div>
              </div>

              {/* Exhibit 2: Michigan Broker Pre-License Certification */}
              <div
                onClick={() => {
                  sound.playClick();
                  setSelectedExhibitImage({
                    title: 'State of Michigan Broker Pre-License Certificate of Achievement',
                    src: '/public/assets/aistudio/Broker_certification__2762fa00.png',
                    authority: '@ Your Pace Online, LLC (AYPORealEstate.com) · Provider ID: 490',
                    docNumber: 'Course ID: 490-3045 · 90 Credit Hours',
                    details: [
                      'Officially certified to Jeanell Land on September 7, 2022.',
                      'Fulfills 90 Credit Hours of rigorous Michigan Real Estate Broker education.',
                      'Includes mandatory 3 Hours of instruction on the National Association of Realtors (NAR) Code of Ethics.',
                      'Authority for licensing under Michigan Department of Licensing & Regulatory Affairs (LARA).',
                    ],
                  });
                }}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-amber-500/60 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="aspect-video w-full rounded-xl bg-slate-900 border border-slate-800 overflow-hidden flex items-center justify-center p-2 group-hover:scale-[1.02] transition-transform">
                    <img
                      src="/public/assets/aistudio/Broker_certification__2762fa00.png"
                      alt="Michigan Broker Pre-License Certificate"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-amber-400 font-bold uppercase block">
                      Exhibit 2 · Professional Diploma
                    </span>
                    <h4 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                      Michigan Broker Pre-License (90 Credit Hours)
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Conferred Sept 7, 2022 · Includes NAR Ethics &amp; Commercial Law
                    </p>
                  </div>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                  <span>Course ID: 490-3045</span>
                  <span className="text-cyan-400 font-bold flex items-center gap-1">
                    <Eye className="w-3 h-3" /> Click to Inspect
                  </span>
                </div>
              </div>

              {/* Exhibit 3: IRS CP 575 A EIN Assignment */}
              <div
                onClick={() => {
                  sound.playClick();
                  setSelectedExhibitImage({
                    title: 'IRS Department of the Treasury CP 575 A Notice (EIN Assignment)',
                    src: '/public/assets/aistudio/All_Your_Needs_Reality_EIN_COPY__2b836026.png',
                    authority: 'Internal Revenue Service · Cincinnati, OH 45999-0023',
                    docNumber: 'EIN: 93-3773484 · Form SS-4',
                    details: [
                      'Official Notice Date: October 05, 2023.',
                      'Assigned to ALL YOUR NEEDS REALITY LLC.',
                      'Officer of Record: JEANELL LAND SOLE MBR.',
                      'Official Business Address: Detroit, Michigan.',
                    ],
                  });
                }}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-amber-500/60 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="aspect-video w-full rounded-xl bg-slate-900 border border-slate-800 overflow-hidden flex items-center justify-center p-2 group-hover:scale-[1.02] transition-transform">
                    <img
                      src="/public/assets/aistudio/All_Your_Needs_Reality_EIN_COPY__2b836026.png"
                      alt="IRS CP 575 A EIN Notice"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase block">
                      Exhibit 3 · Federal Tax Assignment
                    </span>
                    <h4 className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                      IRS Form SS-4 EIN: 93-3773484
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1">
                      All Your Needs Reality LLC · Jeanell Land Sole Member
                    </p>
                  </div>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                  <span>IRS Notice CP 575 A</span>
                  <span className="text-cyan-400 font-bold flex items-center gap-1">
                    <Eye className="w-3 h-3" /> Click to Inspect
                  </span>
                </div>
              </div>

              {/* Exhibit 4: State of Michigan Insurance License (DIFS) */}
              <div
                onClick={() => {
                  sound.playClick();
                  setSelectedExhibitImage({
                    title: 'State of Michigan Department of Insurance and Financial Services (DIFS) Producer License',
                    src: '/public/assets/aistudio/Insurance_License_Michigan__9815134c.JPG',
                    authority: 'State of Michigan DIFS · Public Act 218 of 1956',
                    docNumber: 'System ID: 0323291 · NPN: 7916345',
                    details: [
                      'Licensee: LAND, JEANELL (Detroit, Michigan).',
                      'License Type: Resident Producer.',
                      'Effective Date: 03-04-2020.',
                      'Qualifications Conferred: Accident and Health, Life, Casualty, and Property Insurance.',
                    ],
                  });
                }}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-amber-500/60 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="aspect-video w-full rounded-xl bg-slate-900 border border-slate-800 overflow-hidden flex items-center justify-center p-2 group-hover:scale-[1.02] transition-transform">
                    <img
                      src="/public/assets/aistudio/Insurance_License_Michigan__9815134c.JPG"
                      alt="Michigan DIFS Insurance License"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-rose-400 font-bold uppercase block">
                      Exhibit 4 · Insurance Resident Producer
                    </span>
                    <h4 className="text-xs font-bold text-white group-hover:text-rose-300 transition-colors">
                      Michigan DIFS License: 0323291
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Life, Health, Property &amp; Casualty · NPN: 7916345
                    </p>
                  </div>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                  <span>Effective 03-04-2020</span>
                  <span className="text-cyan-400 font-bold flex items-center gap-1">
                    <Eye className="w-3 h-3" /> Click to Inspect
                  </span>
                </div>
              </div>

              {/* Exhibit 5: FCC Registration Confirmation */}
              <div
                onClick={() => {
                  sound.playClick();
                  setSelectedExhibitImage({
                    title: 'Federal Communications Commission (FCC) Registration Confirmation',
                    authority: 'FCC Commission Registration System (CORES) · Washington, DC',
                    docNumber: 'FRN: 0033922386 · EIN: 85-3488624',
                    details: [
                      'Registered Entity: One Stop Rehabilitation Center.',
                      'Officer of Record: Jeanell Land, President.',
                      'Address: Detroit, Michigan.',
                      'Universal Licensing System (ULS) authorization for T.E.A.R.S. Channel & media broadcasting.',
                    ],
                  });
                }}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-cyan-500/60 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="aspect-video w-full rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center p-3 text-center">
                    <Radio className="w-10 h-10 text-cyan-400 mb-1" />
                    <span className="text-xs font-black text-white">FCC CORES SYSTEM</span>
                    <span className="text-[10px] font-mono text-cyan-300">FRN: 0033922386</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase block">
                      Exhibit 5 · Federal Broadcast Authority
                    </span>
                    <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                      FCC FRN: 0033922386 (One Stop Rehab)
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1">
                      One Stop Rehabilitation Center · President Jeanell Land
                    </p>
                  </div>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                  <span>EIN: 85-3488624</span>
                  <span className="text-cyan-400 font-bold flex items-center gap-1">
                    <Eye className="w-3 h-3" /> Click to Inspect
                  </span>
                </div>
              </div>

              {/* Exhibit 6: Michigan LARA Transportation Network Company (STEARSAFE) */}
              <div
                onClick={() => {
                  sound.playClick();
                  setSelectedExhibitImage({
                    title: 'State of Michigan LARA Transportation Network Company License',
                    authority: 'Department of Licensing & Regulatory Affairs · CSCLB Lansing, MI',
                    docNumber: 'Registration No: 5801020317 · Exp: 08/31/2027',
                    details: [
                      'Licensee: STEARSAFE LLC (Detroit, Michigan).',
                      'License Category: Transportation Company / Transportation Network Company.',
                      'Control Number: 26282121044.',
                      'Duly issued under the laws of the State of Michigan, signed by Gov. Gretchen Whitmer.',
                    ],
                  });
                }}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-indigo-500/60 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="aspect-video w-full rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center p-3 text-center">
                    <Car className="w-10 h-10 text-indigo-400 mb-1" />
                    <span className="text-xs font-black text-white">MICHIGAN LARA CSCLB</span>
                    <span className="text-[10px] font-mono text-indigo-300">Reg: 5801020317</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase block">
                      Exhibit 6 · State Transportation License
                    </span>
                    <h4 className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors">
                      STEARSAFE LLC (LARA Network Company)
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Registration #5801020317 · Active thru August 31, 2027
                    </p>
                  </div>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                  <span>Control #26282121044</span>
                  <span className="text-cyan-400 font-bold flex items-center gap-1">
                    <Eye className="w-3 h-3" /> Click to Inspect
                  </span>
                </div>
              </div>

              {/* Exhibit 7: Dun & Bradstreet D-U-N-S® */}
              <div
                onClick={() => {
                  sound.playClick();
                  setSelectedExhibitImage({
                    title: 'Dun & Bradstreet D-U-N-S® Registration Notice',
                    authority: 'Dun & Bradstreet, Inc. · Short Hills, NJ',
                    docNumber: 'D-U-N-S Number: 119175817',
                    details: [
                      'Assigned to: All Your Needs Reality.',
                      'Assignment Date: December 27, 2023.',
                      'Global unique corporate identifier used by federal agencies, banks, and suppliers.',
                      'Linked to live corporate commercial credit profile.',
                    ],
                  });
                }}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-amber-500/60 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="aspect-video w-full rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center p-3 text-center">
                    <Building2 className="w-10 h-10 text-amber-400 mb-1" />
                    <span className="text-xs font-black text-white">DUN &amp; BRADSTREET</span>
                    <span className="text-[10px] font-mono text-amber-300">D-U-N-S: 119175817</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-amber-400 font-bold uppercase block">
                      Exhibit 7 · Business Credit Registry
                    </span>
                    <h4 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                      D-U-N-S® Identifier: 119175817
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Assigned Dec 27, 2023 · All Your Needs Reality
                    </p>
                  </div>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                  <span>Verified Entity</span>
                  <span className="text-cyan-400 font-bold flex items-center gap-1">
                    <Eye className="w-3 h-3" /> Click to Inspect
                  </span>
                </div>
              </div>

              {/* Exhibit 8: SAM.gov Federal Unique Entity ID (UEI) */}
              <div
                onClick={() => {
                  sound.playClick();
                  setSelectedExhibitImage({
                    title: 'SAM.gov Federal Unique Entity ID (UEI) Confirmation',
                    authority: 'Federal Service Desk · System for Award Management (SAM.gov)',
                    docNumber: 'Unique Entity ID: J9M4QNB6NJS3',
                    details: [
                      'Recipient: ALL YOUR NEEDS REALITY LLC (Jeanell Land).',
                      'Assigned: December 21, 2023.',
                      'Permanent Federal UEI for federal contracting, grants, and agency partnerships.',
                      'Valid permanently without expiration.',
                    ],
                  });
                }}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-cyan-500/60 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="aspect-video w-full rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center p-3 text-center">
                    <FileCheck className="w-10 h-10 text-cyan-400 mb-1" />
                    <span className="text-xs font-black text-white">SAM.GOV FEDERAL UEI</span>
                    <span className="text-[10px] font-mono text-cyan-300">UEI: J9M4QNB6NJS3</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase block">
                      Exhibit 8 · Federal Procurement UEI
                    </span>
                    <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                      SAM.gov UEI: J9M4QNB6NJS3
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1">
                      ALL YOUR NEEDS REALITY LLC · Permanent Federal Registration
                    </p>
                  </div>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                  <span>Federal System</span>
                  <span className="text-cyan-400 font-bold flex items-center gap-1">
                    <Eye className="w-3 h-3" /> Click to Inspect
                  </span>
                </div>
              </div>

              {/* Exhibit 9: FINRA SIE 3.0 & Series 6/63 "Licensed to Build" Manual */}
              <div
                onClick={() => {
                  sound.playClick();
                  setSelectedExhibitImage({
                    title: 'Securities Industry Essentials (SIE 3.0) & Series 6/63 Study Curriculum',
                    authority: 'Licensed to Build · Kaplan Version 3.0 · FINRA / Primerica',
                    docNumber: 'SIE 3.0 Curriculum · Copyright Feb 2023',
                    details: [
                      'Comprehensive securities licensing curriculum covering Capital Markets, Equity Securities, Debt/Bonds, and Options.',
                      'Units 1–12 master Primary/Secondary Markets, Anti-Money Laundering (BSA/FinCEN), and Regulatory Ethics.',
                      'Synthesizes financial independence pedagogy with One Stop Rehabilitation Center workforce training.',
                    ],
                  });
                }}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-purple-500/60 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="aspect-video w-full rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center p-3 text-center">
                    <TrendingUp className="w-10 h-10 text-purple-400 mb-1" />
                    <span className="text-xs font-black text-white">FINRA SIE 3.0</span>
                    <span className="text-[10px] font-mono text-purple-300">Series 6/63 Syllabus</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-purple-400 font-bold uppercase block">
                      Exhibit 9 · Securities Education
                    </span>
                    <h4 className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors">
                      SIE 3.0 "Licensed to Build" Curriculum
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Capital Markets, Equity/Debt Securities &amp; FINRA Compliance
                    </p>
                  </div>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                  <span>FINRA Essentials</span>
                  <span className="text-cyan-400 font-bold flex items-center gap-1">
                    <Eye className="w-3 h-3" /> Click to Inspect
                  </span>
                </div>
              </div>

              {/* Exhibit 10: USPTO Patent Docket TEARSAFE-SOC-2026-0901-PROV */}
              <div
                onClick={() => {
                  sound.playClick();
                  setSelectedExhibitImage({
                    title: 'USPTO Provisional Patent Docket #TEARSAFE-SOC-2026-0901-PROV',
                    authority: 'United States Patent & Trademark Office · 35 U.S.C. § 111(b)',
                    docNumber: 'Filing Date: September 01, 2026',
                    details: [
                      'Inventor: Jeanell Land (Detroit, Michigan).',
                      'Title: Systems and Methods for Biometrically Watermarked Social Streaming, Vehicular Telemetric Broadcasting, Collaborative Group Media Hubs, and Sensor-Triggered Emergency Dispatch.',
                      'Cryptographic dual-spectrum facial landmark capture & remote photoplethysmography (rPPG).',
                      'Automated sensor distress bifurcation routing raw evidence to 911/PSAP.',
                    ],
                  });
                }}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-cyan-500/60 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="aspect-video w-full rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center p-3 text-center">
                    <Sparkles className="w-10 h-10 text-cyan-400 mb-1" />
                    <span className="text-xs font-black text-white">USPTO PATENT DOCKET</span>
                    <span className="text-[10px] font-mono text-cyan-300">TEARSAFE-SOC-2026</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase block">
                      Exhibit 10 · Aerospace &amp; Biometric IP
                    </span>
                    <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                      USPTO Patent: TearSafe Social Media
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Biometric Watermarking, Telemetrics &amp; Emergency Dispatch
                    </p>
                  </div>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                  <span>Inventor: Jeanell Land</span>
                  <span className="text-cyan-400 font-bold flex items-center gap-1">
                    <Eye className="w-3 h-3" /> Click to Inspect
                  </span>
                </div>
              </div>

              {/* Exhibit 11: USPTO Patent Docket Goldie's Beauty World */}
              <div
                onClick={() => {
                  sound.playClick();
                  setIsPatentModalOpen(true);
                }}
                className="p-4 rounded-2xl bg-gradient-to-br from-amber-950/40 via-slate-950 to-slate-900 border-2 border-amber-500/60 hover:border-amber-400 transition-all cursor-pointer group flex flex-col justify-between shadow-lg shadow-amber-950/20"
              >
                <div className="space-y-3">
                  <div className="aspect-video w-full rounded-xl bg-slate-900 border border-amber-500/40 flex flex-col items-center justify-center p-3 text-center">
                    <Sparkles className="w-10 h-10 text-amber-400 mb-1" />
                    <span className="text-xs font-black text-white">USPTO PATENT SPECIFICATION</span>
                    <span className="text-[10px] font-mono text-amber-300 font-bold">GOLDIES-BEAUTY-WORLD-2026</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-amber-400 font-bold uppercase block">
                      Exhibit 11 · Commercial Architecture &amp; Co-Op IP
                    </span>
                    <h4 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                      USPTO Patent: Goldie’s Unique Beauty Creations Beauty World
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Continuous 24/7 Operations, Co-Op Equity-Leasing &amp; Free Childcare Interlock (Claims 1–20)
                    </p>
                  </div>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
                  <span className="text-slate-400 font-mono">35 U.S.C. § 111</span>
                  <span className="text-amber-400 font-bold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Open Full Patent Docket
                  </span>
                </div>
              </div>

              {/* Exhibit 12: IRS CP 575 A EIN Assignment (Goldies Unique Beauty Creations Beauty World) */}
              <div
                onClick={() => {
                  sound.playClick();
                  setSelectedExhibitImage({
                    title: 'IRS Form CP 575 A Notice · EIN Assignment',
                    authority: 'Department of the Treasury · Internal Revenue Service (Cincinnati, OH)',
                    docNumber: 'EIN: 85-3559446 · Date: 10-21-2020',
                    details: [
                      'Official notice assigning Federal Employer Identification Number 85-3559446.',
                      'Entity Name: GOLDIES UNIQUE BEAUTY CREATIONS BEAUTY WORLD.',
                      'Member: JEANELL LAND MBR.',
                      'Address: DETROIT, MICHIGAN.',
                      'Form SS-4 / Notice CP 575 A (Rev. 7-2007) · Assigned tax return filing requirements: Form 941, Form 940, Form 1065.',
                    ],
                  });
                }}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-amber-500/60 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="aspect-video w-full rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center p-3 text-center">
                    <FileText className="w-10 h-10 text-amber-400 mb-1" />
                    <span className="text-xs font-black text-white">IRS FORM CP 575 A</span>
                    <span className="text-[10px] font-mono text-amber-300">EIN: 85-3559446</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-amber-400 font-bold uppercase block">
                      Exhibit 12 · Federal Employer Tax ID
                    </span>
                    <h4 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                      IRS EIN Assignment: Goldies Beauty World
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Assigned Oct 21, 2020 · Jeanell Land MBR · Detroit, Michigan
                    </p>
                  </div>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                  <span className="font-mono text-amber-400 font-bold">EIN: 85-3559446</span>
                  <span className="text-cyan-400 font-bold flex items-center gap-1">
                    <Eye className="w-3 h-3" /> Click to Inspect
                  </span>
                </div>
              </div>

              {/* Exhibit 13: SAM.gov Federal Unique Entity ID (UEI) */}
              <div
                onClick={() => {
                  sound.playClick();
                  setSelectedExhibitImage({
                    title: 'SAM.gov Federal Unique Entity ID (UEI) Confirmation',
                    authority: 'Federal Service Desk · System for Award Management (SAM.gov)',
                    docNumber: 'UEI: J9R1TSCT26E1 · Date: Dec 21, 2023',
                    details: [
                      'Official confirmation from donotreply@sam.gov.',
                      'Entity: GOLDIE S UNIQUE BEAUTY CREATIONS BEAUTY WORLD L.L.C.',
                      'Unique Entity ID: J9R1TSCT26E1.',
                      'Assigned to: Jeanell Land (jeanelldetroit@aol.com).',
                      'Role: UEI Data Entry Role in the Entity Registration domain on SAM.gov.',
                      'Permanent identifier does not expire and does not need to be renewed.',
                    ],
                  });
                }}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-cyan-500/60 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="aspect-video w-full rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center p-3 text-center">
                    <ShieldCheck className="w-10 h-10 text-cyan-400 mb-1" />
                    <span className="text-xs font-black text-white">SAM.GOV FEDERAL UEI</span>
                    <span className="text-[10px] font-mono text-cyan-300">J9R1TSCT26E1</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase block">
                      Exhibit 13 · Federal Procurement ID
                    </span>
                    <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                      SAM.gov UEI: Goldie's Beauty World
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Permanent Federal Registry for Workforce Development &amp; Grant Awards
                    </p>
                  </div>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                  <span className="font-mono text-cyan-400 font-bold">UEI: J9R1TSCT26E1</span>
                  <span className="text-cyan-400 font-bold flex items-center gap-1">
                    <Eye className="w-3 h-3" /> Click to Inspect
                  </span>
                </div>
              </div>

              {/* Exhibit 14: IRS Paid Preparer PTIN Renewal */}
              <div
                onClick={() => {
                  sound.playClick();
                  setSelectedExhibitImage({
                    title: 'IRS Form W-12 Summary Report · PTIN Renewal',
                    authority: 'Department of the Treasury · Internal Revenue Service',
                    docNumber: 'PTIN: P02309637 · Year: 2024 Renewal',
                    details: [
                      'Official IRS Paid Preparer Tax Identification Number (PTIN) Summary Report.',
                      'First Name: JEANELL, Last Name: LAND.',
                      'PTIN: P02309637 (Calendar Year 2024 Renewal, Paid 01/20/2024).',
                      'Personal & Business Address: Detroit, Michigan · Phone: (313) 510-3610.',
                      'Business Name: One Stop Services Center (EIN: 85-3479358, onestoprehabilitationcenters.org).',
                      'Certified data security protections for taxpayer information.',
                    ],
                  });
                }}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-emerald-500/60 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="aspect-video w-full rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center p-3 text-center">
                    <Scale className="w-10 h-10 text-emerald-400 mb-1" />
                    <span className="text-xs font-black text-white">IRS FORM W-12 PTIN</span>
                    <span className="text-[10px] font-mono text-emerald-300">PTIN: P02309637</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase block">
                      Exhibit 14 · Tax Preparer Authority
                    </span>
                    <h4 className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                      IRS PTIN License: Jeanell Land
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Calendar Year 2024 Active Renewal · Authorized Federal Tax Preparer
                    </p>
                  </div>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                  <span className="font-mono text-emerald-400 font-bold">PTIN: P02309637</span>
                  <span className="text-cyan-400 font-bold flex items-center gap-1">
                    <Eye className="w-3 h-3" /> Click to Inspect
                  </span>
                </div>
              </div>

              {/* Exhibit 15: Official Trademark Seal & Commercial Business Plan */}
              <div
                onClick={() => {
                  sound.playClick();
                  setSelectedExhibitImage({
                    title: "Goldie's Unique Beauty Creations Beauty World Official Trademark Insignia",
                    authority: 'United States Patent & Trademark Office · Commercial Division',
                    docNumber: 'Domain: www.goldiesuniquebeautycreationsbeautyworld.com',
                    details: [
                      'Official circular golden insignia featuring "Goldie’s Unique Beauty Creations" crest.',
                      'Upper banner: BEAUTY · Lower banner: WORLD with three central stars.',
                      'Motto: "Where Beauty Is More Than Skin Deep" · Cosmetics, Style, Fashion, Health, Fitness, and Complete Make-Over.',
                      '6-Page Business Plan: 24/7 continuous operations with 25 stylists, 20 nail techs, 5 spa rooms, 24-hr gym, co-op equity leasing, free child care, and Phase II hotel & resort.',
                    ],
                  });
                }}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-amber-500/60 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="aspect-video w-full rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center p-3 text-center">
                    <Award className="w-10 h-10 text-amber-400 mb-1" />
                    <span className="text-xs font-black text-white">TRADEMARK INSIGNIA</span>
                    <span className="text-[10px] font-mono text-amber-300">BEAUTY WORLD</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-amber-400 font-bold uppercase block">
                      Exhibit 15 · Trademark Seal &amp; Plan
                    </span>
                    <h4 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                      Goldie's Beauty World Logo &amp; Plan
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1">
                      www.goldiesuniquebeautycreationsbeautyworld.com · "Where Beauty Is More Than Skin Deep"
                    </p>
                  </div>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                  <span className="text-amber-400 font-mono font-bold">Est. 2020 · Detroit</span>
                  <span className="text-cyan-400 font-bold flex items-center gap-1">
                    <Eye className="w-3 h-3" /> Click to Inspect
                  </span>
                </div>
              </div>

              {/* Exhibit 16: IRS 501(c)(3) Determination Letter 947 */}
              <div
                onClick={() => {
                  sound.playClick();
                  setSelectedExhibitImage({
                    title: 'IRS 501(c)(3) Determination Letter 947 · Public Charity Exemption',
                    authority: 'Department of the Treasury · Internal Revenue Service (Cincinnati, OH 45201)',
                    docNumber: 'DLN: 26053700002260 · Letter 947 · EIN: 85-3488624',
                    details: [
                      'Official IRS determination conferring 501(c)(3) tax-exempt status to ONE STOP REHABILITATION CENTER.',
                      'Effective Date of Exemption: October 07, 2020 · Letter Date: December 01, 2020.',
                      'Public Charity Status: IRC Section 509(a)(2) · Contributions are deductible under IRC Section 170.',
                      'Accounting Period Ending: December 31 · Form 990 / 990-EZ / 990-N required annually.',
                      'Authorized donor contributions and redemption point community grants are tax-deductible under federal law.',
                    ],
                  });
                }}
                className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-slate-950 to-slate-900 border-2 border-emerald-500/50 hover:border-emerald-400 transition-all cursor-pointer group flex flex-col justify-between shadow-lg shadow-emerald-950/20"
              >
                <div className="space-y-3">
                  <div className="aspect-video w-full rounded-xl bg-slate-900 border border-emerald-500/40 flex flex-col items-center justify-center p-3 text-center">
                    <HeartHandshake className="w-10 h-10 text-emerald-400 mb-1" />
                    <span className="text-xs font-black text-white">IRS 501(c)(3) LETTER 947</span>
                    <span className="text-[10px] font-mono text-emerald-300 font-bold">DLN: 26053700002260</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase block">
                      Exhibit 16 · Federal 501(c)(3) Exemption
                    </span>
                    <h4 className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                      One Stop Rehabilitation Center 501(c)(3)
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Public Charity 509(a)(2) · Tax-Deductible Contributions under IRC § 170
                    </p>
                  </div>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                  <span className="font-mono text-emerald-400 font-bold">EIN: 85-3488624</span>
                  <span className="text-cyan-400 font-bold flex items-center gap-1">
                    <Eye className="w-3 h-3" /> Click to Inspect
                  </span>
                </div>
              </div>

              {/* Exhibit 17: State of Michigan LARA Articles of Incorporation */}
              <div
                onClick={() => {
                  sound.playClick();
                  setSelectedExhibitImage({
                    title: 'State of Michigan LARA Articles of Incorporation (Nonprofit Corporation)',
                    authority: 'Michigan Dept of Licensing & Regulatory Affairs (LARA) · Corporations Bureau',
                    docNumber: 'LARA ID: 802536743 · Filing #220307668950 · Filed Jan 06, 2021',
                    details: [
                      'Form CSCL/CD-502 filed under Act 162, Public Acts of 1982.',
                      'Entity: ONE STOP REHABILITATION CENTER · Non-stock Nonprofit Corporation.',
                      'Article II Statutory Purpose: "We provide rehabilitation programs by providing job placement and landscaping services for low income, veterans, disabled, returning citizens and aged out foster care adults."',
                      'Registered Office & Incorporator: Jeanell Land, Detroit, Michigan.',
                      'Governing Board of Directors: Jeanell Land, John Vance, Kendra Washington.',
                    ],
                  });
                }}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-emerald-500/60 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="aspect-video w-full rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center p-3 text-center">
                    <Building2 className="w-10 h-10 text-emerald-400 mb-1" />
                    <span className="text-xs font-black text-white">MICHIGAN LARA NONPROFIT</span>
                    <span className="text-[10px] font-mono text-emerald-300">ID: 802536743</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase block">
                      Exhibit 17 · State Corporate Charter
                    </span>
                    <h4 className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                      LARA Articles of Incorporation (Article II)
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Statutory Charter: Job Placement &amp; Landscaping for Veterans, Disabled &amp; Youth
                    </p>
                  </div>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                  <span className="font-mono text-emerald-400 font-bold">LARA ID: 802536743</span>
                  <span className="text-cyan-400 font-bold flex items-center gap-1">
                    <Eye className="w-3 h-3" /> Click to Inspect
                  </span>
                </div>
              </div>

              {/* Exhibit 18: D&B D-U-N-S Certificate (One Stop Services Center L.L.C.) */}
              <div
                onClick={() => {
                  sound.playClick();
                  setSelectedExhibitImage({
                    title: 'Dun & Bradstreet (D&B) Commercial Registry Certificate',
                    authority: 'Dun & Bradstreet Credibility Corp · Global D-U-N-S® Database',
                    docNumber: 'D-U-N-S: 117718992 · ONE STOP SERVICES CENTER L.L.C.',
                    details: [
                      'Verified commercial business registration with Dun & Bradstreet.',
                      'Legal Entity: ONE STOP SERVICES CENTER L.L.C. (Commercial Tax Prep & Advisory Partner).',
                      'Physical Headquarters: Detroit, Michigan.',
                      'Operating entity under EIN 85-3479358 for commercial tax services rendered by Jeanell Land.',
                      'Qualifies enterprise for institutional vendor contracts and corporate compliance.',
                    ],
                  });
                }}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-cyan-500/60 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="aspect-video w-full rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center p-3 text-center">
                    <Shield className="w-10 h-10 text-cyan-400 mb-1" />
                    <span className="text-xs font-black text-white">D&amp;B D-U-N-S® RECORD</span>
                    <span className="text-[10px] font-mono text-cyan-300">117718992</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase block">
                      Exhibit 18 · Commercial Credit Registry
                    </span>
                    <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                      D-U-N-S: One Stop Services Center L.L.C.
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1">
                      D-U-N-S #117718992 · Commercial Tax Preparation &amp; Advisory
                    </p>
                  </div>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                  <span className="font-mono text-cyan-400 font-bold">DUNS: 117718992</span>
                  <span className="text-cyan-400 font-bold flex items-center gap-1">
                    <Eye className="w-3 h-3" /> Click to Inspect
                  </span>
                </div>
              </div>

              {/* Exhibit 19: SAM.gov Federal Unique Entity ID (ONE STOP SERVICES CENTER L.L.) */}
              <div
                onClick={() => {
                  sound.playClick();
                  setSelectedExhibitImage({
                    title: 'SAM.gov Federal Unique Entity ID (UEI) Registry Confirmation',
                    authority: 'System for Award Management (SAM.gov) · Federal Service Desk',
                    docNumber: 'UEI: J9M1XVD4UYV5 · ONE STOP SERVICES CENTER L.L.',
                    details: [
                      'Official Federal Service Desk confirmation for federal entity registration.',
                      'Unique Entity ID: J9M1XVD4UYV5 · Assigned to: Jeanell Land.',
                      'Entity: ONE STOP SERVICES CENTER L.L. · Detroit, Michigan.',
                      'Permanent federal contractor and grant identifier (does not expire).',
                      'Enables prime/subcontracting and workforce re-entry funding through federal programs.',
                    ],
                  });
                }}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-cyan-500/60 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="aspect-video w-full rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center p-3 text-center">
                    <ShieldCheck className="w-10 h-10 text-cyan-400 mb-1" />
                    <span className="text-xs font-black text-white">SAM.GOV FEDERAL UEI</span>
                    <span className="text-[10px] font-mono text-cyan-300">J9M1XVD4UYV5</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase block">
                      Exhibit 19 · Federal Procurement Registry
                    </span>
                    <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                      SAM.gov UEI: One Stop Services Center
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1">
                      UEI #J9M1XVD4UYV5 · Federal Grant &amp; Vendor Eligibility
                    </p>
                  </div>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                  <span className="font-mono text-cyan-400 font-bold">UEI: J9M1XVD4UYV5</span>
                  <span className="text-cyan-400 font-bold flex items-center gap-1">
                    <Eye className="w-3 h-3" /> Click to Inspect
                  </span>
                </div>
              </div>

              {/* Exhibit 20: FCC LMS FM Construction Permit Application (File #0000303897) */}
              <div
                onClick={() => {
                  sound.playClick();
                  setSelectedExhibitImage({
                    title: 'FCC LMS Rulemaking: FM Construction Permit Application & Action Docket',
                    authority: 'Federal Communications Commission (FCC) · Media Bureau Audio Division',
                    docNumber: 'File: 0000303897 · Facility ID: 797586 · FRN: 0033922386',
                    details: [
                      'Applicant: ONE STOP REHABILITATION CENTER · President Founder: Jeanell Land.',
                      'Headquarters / Transmitter Site: Detroit, Michigan.',
                      'Technical Parameters: Channel 261 (100.1 FM Detroit) · ERP: 6.0 kW · Overall Height: 30.0m · AMSL: 223.0m · Antenna: Non-Directional.',
                      'Fee Exemption Claim: 501(c)(3) Noncommercial Educational Non-Profit Entity (Granted).',
                      'Filing History: Submitted 09/23/2026 · Media Bureau Action: Dismissed 10/21/2026 (Status: InActive).',
                      'Statutory Reconsideration Clock: 30-Day Window under 47 C.F.R. § 1.106 expires November 20, 2026.',
                      'Strategic Action: Transition to NCE Reserved Band (88.1–91.9 MHz) or Metro Detroit FM Translator Acquisition while broadcasting 24/7 via digital web stream.',
                    ],
                  });
                }}
                className="p-4 rounded-2xl bg-gradient-to-br from-rose-950/40 via-slate-950 to-slate-900 border-2 border-rose-500/50 hover:border-rose-400 transition-all cursor-pointer group flex flex-col justify-between shadow-lg shadow-rose-950/20"
              >
                <div className="space-y-3">
                  <div className="aspect-video w-full rounded-xl bg-slate-900 border border-rose-500/40 flex flex-col items-center justify-center p-3 text-center">
                    <Radio className="w-10 h-10 text-rose-400 mb-1" />
                    <span className="text-xs font-black text-white">FCC LMS BROADCAST DOCKET</span>
                    <span className="text-[10px] font-mono text-rose-300 font-bold">FILE: 0000303897 · CH 261</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-rose-400 font-bold uppercase block">
                      Exhibit 20 · FCC Telecommunications Filing
                    </span>
                    <h4 className="text-xs font-bold text-white group-hover:text-rose-300 transition-colors">
                      FCC LMS: FM Construction Permit (100.1 FM)
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1">
                      TEARadio Detroit · Channel 261 (6.0 kW ERP) · Action Docket &amp; 30-Day Strategy
                    </p>
                  </div>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                  <span className="font-mono text-rose-400 font-bold">FRN: 0033922386</span>
                  <span className="text-cyan-400 font-bold flex items-center gap-1">
                    <Eye className="w-3 h-3" /> Click to Inspect
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Community Redemption Points & Non-Profit Mission Milestones */}
          <div className="pt-6 border-t border-slate-800">
            <SupportNonProfitSection
              playerStats={playerStats}
              onUpdateStats={onUpdateStats}
              onOpenServiceElection={(serviceId) => {
                if (onOpenServiceElection) {
                  onOpenServiceElection(serviceId);
                } else {
                  setPreselectedServiceId(serviceId);
                  setIsServicesModalOpen(true);
                }
              }}
            />
          </div>
        </div>
      )}

      {/* TAB: Elect Services Rendered by Jeanell Land & Associates + 501(c)(3) */}
      {activeTab === 'services' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Hero Banner */}
          <div className="bg-gradient-to-r from-amber-950/80 via-slate-900 to-emerald-950/80 border-2 border-amber-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 shadow-sm flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    ELECT SERVICES RENDERED · CLIENT SERVICE PORTAL
                  </span>
                  <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/80 border border-emerald-500/40 px-2.5 py-1 rounded-full font-bold">
                    One Stop Rehabilitation 501(c)(3)
                  </span>
                  <span className="text-[10px] font-mono text-amber-300 bg-amber-950/80 border border-amber-500/40 px-2.5 py-1 rounded-full font-bold">
                    IRS PTIN: P02309637 · Broker Lic #6504432062
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Elect Professional Services &amp; 501(c)(3) Programs
                </h1>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  Engage certified professional services directly with <strong>Jeanell Land &amp; Associates</strong>, or enroll in community rehabilitation initiatives administered by <strong>One Stop Rehabilitation Center 501(c)(3)</strong>. Select any service to generate an official digital engagement agreement docket.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      sound.playClick();
                      setPreselectedServiceId(undefined);
                      setIsServicesModalOpen(true);
                    }}
                    className="px-5 py-2.5 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black rounded-xl text-xs flex items-center gap-2 cursor-pointer transition-all shadow-lg shadow-amber-500/20"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Open Full Client Service Election Menu</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      sound.playClick();
                      setActiveTab('onestop');
                    }}
                    className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer transition-all"
                  >
                    <HeartHandshake className="w-4 h-4 text-emerald-400" />
                    <span>View 501(c)(3) Institutional Exhibits</span>
                  </button>
                </div>
              </div>

              {/* Summary Stats */}
              <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-4 shrink-0 max-w-xs w-full space-y-2 text-xs">
                <div className="font-bold uppercase tracking-wider text-slate-400 text-[10px]">
                  Professional Verification Credentials
                </div>
                <div className="p-2 bg-slate-900 rounded-xl border border-slate-800/80 flex items-center justify-between">
                  <span className="text-slate-400">IRS Tax Preparer:</span>
                  <span className="font-mono text-emerald-400 font-bold">PTIN P02309637</span>
                </div>
                <div className="p-2 bg-slate-900 rounded-xl border border-slate-800/80 flex items-center justify-between">
                  <span className="text-slate-400">Commercial Broker:</span>
                  <span className="font-mono text-amber-400 font-bold">DAR #6504432062</span>
                </div>
                <div className="p-2 bg-slate-900 rounded-xl border border-slate-800/80 flex items-center justify-between">
                  <span className="text-slate-400">Nonprofit Exemption:</span>
                  <span className="font-mono text-emerald-300 font-bold">IRC 501(c)(3) Public Charity</span>
                </div>
                <div className="p-2 bg-slate-900 rounded-xl border border-slate-800/80 flex items-center justify-between">
                  <span className="text-slate-400">Federal Procurement:</span>
                  <span className="font-mono text-cyan-300 font-bold">SAM.gov UEI Verified</span>
                </div>
              </div>
            </div>
          </div>

          {/* Service Cards Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-black text-white uppercase tracking-wider">
                  Available Service Offerings (Commercial &amp; 501(c)(3))
                </h3>
                <p className="text-xs text-slate-400">
                  Select an election tier to generate your engagement agreement docket and schedule consultation.
                </p>
              </div>
              <span className="text-xs font-mono text-amber-400 font-bold">
                {JEANELL_LAND_SERVICES.length} Official Service Categories
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {JEANELL_LAND_SERVICES.map((service) => {
                const isTaxDeductible =
                  service.pricingType === 'tax_deductible_donation' ||
                  service.pricingType === 'free_nonprofit';
                const codeBadge =
                  service.officialIdentifiers.ptin ||
                  service.officialIdentifiers.ein ||
                  service.officialIdentifiers.laraId ||
                  service.officialIdentifiers.licenseNum ||
                  service.category;

                return (
                  <div
                    key={service.id}
                    className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-amber-500/50 flex flex-col justify-between space-y-4 transition-all shadow-md group"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300 font-bold uppercase">
                          {codeBadge}
                        </span>
                        {isTaxDeductible ? (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-bold">
                            Tax-Deductible IRC § 170
                          </span>
                        ) : (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/80 border border-amber-500/40 text-amber-300 font-bold">
                            Professional Advisory
                          </span>
                        )}
                      </div>

                      <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                        {service.title}
                      </h4>

                      <p className="text-xs text-slate-400 leading-relaxed">
                        {service.description}
                      </p>

                      <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80 space-y-1 text-[11px]">
                        <div className="text-slate-300 font-bold">{service.entityName}</div>
                        <div className="text-slate-500 font-mono text-[10px]">{service.statutoryAuthority}</div>
                      </div>

                      <ul className="space-y-1 pt-1 text-[11px] text-slate-300">
                        {service.deliverables.slice(0, 3).map((item, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase font-bold">Fee / Tier</div>
                        <div className="text-xs font-bold text-amber-400">{service.estimatedPrice}</div>
                      </div>
                      <button
                        onClick={() => {
                          sound.playClick();
                          setPreselectedServiceId(service.id);
                          setIsServicesModalOpen(true);
                        }}
                        className="px-3.5 py-1.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer transition-all shadow-sm"
                      >
                        <span>Elect Service</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB: Goldie's Beauty World Patent Application & LLC Showcase */}
      {activeTab === 'patent' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Hero Banner */}
          <div className="bg-gradient-to-r from-amber-950/80 via-slate-900 to-indigo-950/80 border-2 border-amber-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 shadow-sm flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    USPTO PATENT DOCKET · 35 U.S.C. § 111
                  </span>
                  <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/80 border border-emerald-500/40 px-2.5 py-1 rounded-full font-bold">
                    IRS EIN: 85-3559446
                  </span>
                  <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/80 border border-cyan-500/40 px-2.5 py-1 rounded-full font-bold">
                    SAM.gov UEI: J9R1TSCT26E1
                  </span>
                  <span className="text-[10px] font-mono text-purple-300 bg-purple-950/80 border border-purple-500/40 px-2.5 py-1 rounded-full font-bold">
                    PTIN: P02309637
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Goldie’s Unique Beauty Creations Beauty World
                </h1>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  <em>"Where Beauty Is More Than Skin Deep"</em> &middot; Official web portal at{' '}
                  <a
                    href="https://www.goldiesuniquebeautycreationsbeautyworld.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-400 underline font-mono font-bold hover:text-cyan-300"
                  >
                    www.goldiesuniquebeautycreationsbeautyworld.com
                  </a>
                  . Patented commercial architecture and mathematical equity engine providing continuous 24/7/365 personal care (25 hair stylists, 20 nail technicians, 5 spa suites, 24-hr gym), algorithmic co-operative tenant-equity leases, and an on-site disadvantaged women workforce incubator with free licensed childcare.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                    <span className="text-[10px] uppercase text-slate-400 font-bold block">Inventor / Member</span>
                    <span className="font-bold text-white text-xs">Jeanell Land</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                    <span className="text-[10px] uppercase text-slate-400 font-bold block">Patent Docket</span>
                    <span className="font-mono text-amber-300 font-bold text-xs">GOLDIES-PAT-2026</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                    <span className="text-[10px] uppercase text-slate-400 font-bold block">Filing Authority</span>
                    <span className="font-mono text-cyan-300 font-bold text-xs">35 U.S.C. § 111</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                    <span className="text-[10px] uppercase text-slate-400 font-bold block">Claims Count</span>
                    <span className="font-bold text-emerald-400 text-xs">20 Formal Claims</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto shrink-0">
                <button
                  onClick={() => {
                    sound.playClick();
                    setIsPatentModalOpen(true);
                  }}
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-xl shadow-amber-950/40 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Open Full USPTO Patent Application</span>
                </button>

                <a
                  href="/public/assets/aistudio/Goldie_Beauty_World_Patent_Application_PTO_AIA_Specification.txt"
                  download="Goldie_Beauty_World_Patent_Application_USPTO_Docket_2026.txt"
                  className="px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4 text-cyan-400" />
                  <span>Download EFS-Web Specification (.txt)</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Pillar Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 inline-block mb-1">
                <Building2 className="w-5 h-5" />
              </span>
              <h4 className="text-sm font-bold text-white">Continuous 24/7/365 Facility</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                25 hair stylists and 20 nail technicians working 3 continuous eight-hour shifts per day. Five spa rooms, five tanning booths, and a 24-hour gym serving third-shift nurses, single mothers, and shift workers.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 inline-block mb-1">
                <Calculator className="w-5 h-5" />
              </span>
              <h4 className="text-sm font-bold text-white">Co-Operative Equity-Leasing</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Operators never pay dead rent. Scheduled weekly, bi-weekly, or monthly lease remittances computationally convert into commercial real estate equity units, transforming service artisans into property co-owners.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 inline-block mb-1">
                <Baby className="w-5 h-5" />
              </span>
              <h4 className="text-sm font-bold text-white">Free On-Site Childcare Interlock</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Single mothers and disadvantaged women receive full cosmetic makeovers, professional wardrobe distribution, accredited training, and free on-site licensed childcare biometrically synchronized with their shift.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 1: Credentials & Upload */}
      {activeTab === 'credentials' && (
        <div className="space-y-6">
          {/* Upload Form */}
          <form onSubmit={handleUploadCredential} className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Upload className="w-4 h-4 text-amber-400" />
                <span>UPLOAD COMPLETED DIPLOMA, CERTIFICATE OR PROFESSIONAL LICENSE</span>
              </h3>
              <span className="text-[11px] text-slate-400 font-mono">Instant OCR &amp; Biometric Audit</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="text-slate-300 block mb-1">Credential Name / Degree</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. B.S. Aeronautical Engineering"
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200"
                  required
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Issuing Authority / Institution</label>
                <input
                  type="text"
                  value={newIssuer}
                  onChange={(e) => setNewIssuer(e.target.value)}
                  placeholder="e.g. University / State Licensing Board"
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200"
                  required
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200"
                >
                  <option value="Degree">Academic Degree (B.S. / M.S.)</option>
                  <option value="License">State Professional License</option>
                  <option value="Certification">Trade / Technical Certification</option>
                  <option value="Trade Award">Vocational Excellence Award</option>
                  <option value="Notary">Notary Public Commission</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={isUploading}
              className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <Upload className="w-4 h-4" />
              <span>{isUploading ? 'Verifying Digital Hash & Landmarks...' : 'Upload & Verify to Evolve Character'}</span>
            </button>
          </form>

          {/* List of Verified Credentials */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {credentials.map((cred) => (
              <div
                key={cred.id}
                className="bg-slate-950 p-4 rounded-xl border border-slate-800 hover:border-amber-500/50 transition-all space-y-2.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] font-mono text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
                    {cred.category}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>VERIFIED</span>
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white leading-snug">{cred.title}</h4>
                <p className="text-xs text-slate-400">{cred.issuer}</p>

                <div className="pt-2 border-t border-slate-800/80 text-[10px] font-mono text-slate-500 break-all">
                  Hash: {cred.verificationHash}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: Marketplace & Advertising */}
      {activeTab === 'marketplace' && (
        <div className="space-y-6">
          {/* Ad Creator for Users */}
          <form onSubmit={handleCreateAd} className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Megaphone className="w-4 h-4 text-cyan-400" />
                <span>ADVERTISE YOUR BUSINESS, TRADE OR PROFESSIONAL SERVICES</span>
              </h3>
              <span className="text-xs font-mono text-amber-400">
                {profile.isPremiumMember ? '⭐ Featured Spotlight Active' : 'Standard Community Listing'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="text-slate-300 block mb-1">Business / Service Title</label>
                <input
                  type="text"
                  value={adBusiness}
                  onChange={(e) => setAdBusiness(e.target.value)}
                  placeholder="e.g. Land Property Brokerage"
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200"
                  required
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Industry / Category</label>
                <select
                  value={adCategory}
                  onChange={(e) => setAdCategory(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200"
                >
                  <option value="Real Estate & Property Management">Real Estate &amp; Property Management</option>
                  <option value="Tax Resolution & Financial Literacy">Tax Resolution &amp; Financial Literacy</option>
                  <option value="Vocational Trades & Plumbing">Vocational Trades &amp; Plumbing</option>
                  <option value="Electrical & Clean Energy">Electrical &amp; Clean Energy</option>
                  <option value="Aerospace & Avionics Engineering">Aerospace &amp; Avionics Engineering</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Contact Phone</label>
                <input
                  type="text"
                  value={adPhone}
                  onChange={(e) => setAdPhone(e.target.value)}
                  placeholder="(313) 555-0199"
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-300 text-xs block mb-1">Service Description</label>
              <textarea
                rows={2}
                value={adDesc}
                onChange={(e) => setAdDesc(e.target.value)}
                placeholder="Describe your capabilities, pricing, and client offerings..."
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-lg transition-colors shadow-sm"
            >
              Publish Advertisement to S.T.E.A.Reality Community Marketplace
            </button>
          </form>

          {/* Directory Listings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ads.map((ad) => (
              <div
                key={ad.id}
                className={`p-5 rounded-xl border space-y-3 ${
                  ad.isFeatured
                    ? 'bg-slate-950 border-amber-500/50 shadow-lg shadow-amber-950/20'
                    : 'bg-slate-950/70 border-slate-800'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400 block mb-0.5">{ad.serviceCategory}</span>
                    <h4 className="text-sm font-bold text-white leading-snug">{ad.businessTitle}</h4>
                  </div>
                  {ad.isFeatured && (
                    <span className="flex items-center gap-1 text-[10px] text-amber-300 bg-amber-950 px-2 py-0.5 rounded border border-amber-500/50 font-semibold font-mono">
                      <Star className="w-3 h-3 fill-amber-400" />
                      <span>FEATURED</span>
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">{ad.description}</p>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span>Owner: <strong className="text-white">{ad.ownerName}</strong></span>
                  <span className="font-mono text-cyan-300">{ad.phone}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Premium Tier */}
      {activeTab === 'premium' && (
        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-950/60 border border-amber-500/50 flex items-center justify-center text-amber-400">
              <Star className="w-6 h-6 fill-amber-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">S.T.E.A.Reality PRO Business &amp; Employer Membership</h3>
              <p className="text-xs text-slate-400">Accelerate your career, unlock verified marketplace advertising, and boost trade commissions.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1.5">
              <span className="text-amber-400 font-bold block">⭐ Featured Ad Placement</span>
              <p className="text-slate-400 leading-relaxed">
                Your business listings are pinned to the top of the Community Marketplace with gold verified trust badges.
              </p>
            </div>
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1.5">
              <span className="text-cyan-400 font-bold block">🚀 Priority Employer Review</span>
              <p className="text-slate-400 leading-relaxed">
                Resume pool applications rank at the top of hiring manager dashboards with immediate contract triggers.
              </p>
            </div>
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1.5">
              <span className="text-emerald-400 font-bold block">💵 +20% Commission Boost</span>
              <p className="text-slate-400 leading-relaxed">
                Earn 20% higher signing commissions on all successfully passed vocational trade levels.
              </p>
            </div>
          </div>

          {!profile.isPremiumMember && (
            <button
              onClick={handleUpgradePremium}
              className="w-full py-3 bg-gradient-to-r from-amber-600 to-amber-500 text-white text-xs font-bold rounded-lg shadow-lg hover:brightness-110 transition-all"
            >
              Activate S.T.E.A.Reality PRO Membership ($19 / month)
            </button>
          )}
        </div>
      )}

      {/* Lightbox Inspection Modal for Verified Regulatory Exhibits & Diplomas */}
      {selectedExhibitImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          onClick={() => setSelectedExhibitImage(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30">
                    <ShieldCheck className="w-4 h-4" />
                  </span>
                  <span className="text-[11px] font-mono font-bold uppercase text-amber-400 tracking-wider">
                    Official Regulatory Record &middot; Verified
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-white leading-tight">
                  {selectedExhibitImage.title}
                </h3>
                <p className="text-xs text-slate-400 flex items-center gap-2">
                  <span className="font-semibold text-slate-300">{selectedExhibitImage.authority}</span>
                  <span>&bull;</span>
                  <span className="font-mono text-cyan-400 font-bold">{selectedExhibitImage.docNumber}</span>
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedExhibitImage(null)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                aria-label="Close Inspection Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Exhibit Visual Canvas / Preview */}
            {selectedExhibitImage.src ? (
              <div className="w-full max-h-[55vh] rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center p-4 overflow-hidden shadow-inner">
                <img
                  src={selectedExhibitImage.src}
                  alt={selectedExhibitImage.title}
                  className="max-h-[50vh] max-w-full object-contain rounded-lg drop-shadow-xl"
                />
              </div>
            ) : (
              <div className="w-full h-48 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center p-6 text-center text-slate-400 space-y-2">
                <FileText className="w-12 h-12 text-cyan-400" />
                <span className="text-sm font-semibold text-white">Full Digital Statutory Filing Document</span>
                <span className="text-xs font-mono text-slate-500">Record ID: {selectedExhibitImage.docNumber}</span>
              </div>
            )}

            {/* Statutory Attestations & Verification Details */}
            <div className="bg-slate-950 p-4 sm:p-5 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <BadgeCheck className="w-4 h-4 text-emerald-400" />
                Verified Legal &amp; Regulatory Specifications
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                {selectedExhibitImage.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                    <span className="leading-relaxed">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="text-[11px] text-slate-500 flex items-center gap-1.5 font-mono">
                <span>One Stop Rehabilitation Center 501(c)(3)</span>
                <span>&bull;</span>
                <span>All Your Needs Reality LLC</span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedExhibitImage(null)}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition-colors"
              >
                Close Record
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full Interactive USPTO Patent Application Modal for Goldie's Beauty World */}
      <GoldiePatentApplicationModal
        isOpen={isPatentModalOpen}
        onClose={() => setIsPatentModalOpen(false)}
        onInspectExhibit={setSelectedExhibitImage}
      />

      {/* Client Service Election Modal (Taxes, Deals, One Stop 501c3) */}
      <ClientServiceElectionModal
        isOpen={isServicesModalOpen}
        onClose={() => setIsServicesModalOpen(false)}
        preselectedServiceId={preselectedServiceId}
      />
    </div>
  );
};
