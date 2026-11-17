import React, { useState, useEffect } from 'react';
import {
  Heart,
  Scale,
  Users,
  ShieldCheck,
  ExternalLink,
  Copy,
  Check,
  Share2,
  FileText,
  Send,
  Award,
  Download,
  AlertCircle,
  Building2,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Lock,
  DollarSign,
  Home,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import { PlayerStats } from '../../types/game';
import { sound } from '../../utils/audio';

export interface FamilyReuniteActSectionProps {
  playerStats?: PlayerStats;
  onUpdateStats?: (delta: Partial<PlayerStats>) => void;
  onNavigateToLawLibrary?: (templateId?: string) => void;
  onClose?: () => void;
  isModal?: boolean;
}

interface Endorsement {
  id: string;
  name: string;
  location: string;
  message: string;
  timestamp: string;
}

const DEFAULT_ENDORSEMENTS: Endorsement[] = [
  {
    id: 'end-1',
    name: 'Jeanell Land',
    location: 'Detroit, MI',
    message: 'No parent should spend 26 days locked up over a civil rental misunderstanding while their children suffer and state garnishments destroy their future. Family unity is a constitutional right!',
    timestamp: 'Founder & Petitioner',
  },
  {
    id: 'end-2',
    name: 'Marcus Vance',
    location: 'Wayne County, MI',
    message: 'Ending wrongful wage garnishments for exonerated parents gives returning citizens real dignity and a fair chance to support their kids.',
    timestamp: '2 hours ago',
  },
  {
    id: 'end-3',
    name: 'Councilwoman T. Harris',
    location: 'Detroit City Council District 5',
    message: 'Our communities thrive when families heal together. We need statutory reparation bonds and immediate custody restoration post-dismissal.',
    timestamp: 'Yesterday',
  },
  {
    id: 'end-4',
    name: 'Keisha R.',
    location: 'Grand Rapids, MI',
    message: 'My brother was held pretrial for 40 days before charges were dropped; child support garnished 60% of his factory check. This bill is desperately needed.',
    timestamp: '3 days ago',
  },
  {
    id: 'end-5',
    name: 'Atty. David Sterling',
    location: 'Midwest Civil Defense League',
    message: 'Santosky v. Kramer established family integrity as a fundamental liberty. The Family Reunite Act codifies what the courts should have recognized all along.',
    timestamp: '5 days ago',
  },
];

export const FamilyReuniteActSection: React.FC<FamilyReuniteActSectionProps> = ({
  playerStats,
  onUpdateStats,
  onNavigateToLawLibrary,
  onClose,
  isModal = false,
}) => {
  const petitionUrl = 'https://www.change.org/FamilyReuniteAct';

  // Navigation tab inside the section
  const [activeTab, setActiveTab] = useState<'overview' | 'pillars' | 'endorse' | 'letter' | 'impact'>('overview');

  // Copy states
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedLetter, setCopiedLetter] = useState(false);

  // Endorsement form state
  const [signerName, setSignerName] = useState('');
  const [signerLocation, setSignerLocation] = useState('Detroit, MI');
  const [signerMessage, setSignerMessage] = useState('');
  const [hasEndorsed, setHasEndorsed] = useState<boolean>(() => {
    try {
      return localStorage.getItem('steareality_family_reunite_signed') === 'true';
    } catch {
      return false;
    }
  });

  const [endorsements, setEndorsements] = useState<Endorsement[]>(() => {
    try {
      const saved = localStorage.getItem('steareality_family_reunite_endorsements');
      return saved ? JSON.parse(saved) : DEFAULT_ENDORSEMENTS;
    } catch {
      return DEFAULT_ENDORSEMENTS;
    }
  });

  // Base signature count: 85 on Change.org + endorsements
  const baseChangeOrgCount = 85;
  const totalSignatureCount = baseChangeOrgCount + (endorsements.length - DEFAULT_ENDORSEMENTS.length);

  // Letter generator state
  const [letterRecipientType, setLetterRecipientType] = useState<'congress' | 'state_house' | 'governor'>('congress');
  const [constituentName, setConstituentName] = useState(signerName || 'Concerned Citizen');
  const [constituentCity, setConstituentCity] = useState(signerLocation || 'Detroit, Michigan');
  const [selectedPillarsForLetter, setSelectedPillarsForLetter] = useState<string[]>([
    'custody_restoration',
    'garnishment_moratorium',
    'corporate_liability',
  ]);

  const handleCopyLink = () => {
    sound.playClick();
    navigator.clipboard.writeText(petitionUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleShare = async () => {
    sound.playClick();
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Family Reunite Act (Change.org/FamilyReuniteAct)',
          text: 'Support the Family Reunite Act launched by Jeanell Land to protect families from wrongful separations, end predatory child support wage garnishments, and demand restorative justice.',
          url: petitionUrl,
        });
        return;
      } catch {
        // Fallback to copy link
      }
    }
    handleCopyLink();
  };

  const handleSignEndorsement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signerName.trim()) return;

    sound.playSuccess();
    const newEndorsement: Endorsement = {
      id: `end-${Date.now()}`,
      name: signerName.trim(),
      location: signerLocation.trim() || 'Detroit, MI',
      message:
        signerMessage.trim() ||
        'I strongly support the Family Reunite Act to protect families and stop wrongful child support garnishments.',
      timestamp: 'Just now',
    };

    const updated = [newEndorsement, ...endorsements];
    setEndorsements(updated);
    setHasEndorsed(true);

    try {
      localStorage.setItem('steareality_family_reunite_signed', 'true');
      localStorage.setItem('steareality_family_reunite_endorsements', JSON.stringify(updated));
    } catch {
      // ignore
    }

    if (onUpdateStats) {
      onUpdateStats({
        resilience: 20,
        redemptionPoints: 25,
        communityLegacy: 25,
      });
    }
  };

  const generatedLetterText = `Dear Honorable Representative / Senator,

I am writing to you as a constituent residing in ${constituentCity} to urge your immediate co-sponsorship and legislative enactment of the "Family Reunite Act" (official campaign: change.org/FamilyReuniteAct).

Inspired by the true journey of Jeanell Land—who survived 26 days of unlawful imprisonment over an extended and retrieved rental vehicle that gave birth to the 501(c)(3) One Stop Rehabilitation Center—this legislation addresses a devastating systemic failure: the traumatic and unlawful separation of children from innocent parents, compounded by predatory child support debt and automatic wage garnishments accumulated while individuals are falsely incarcerated.

The Family Reunite Act establishes the following essential statutory protections:
${selectedPillarsForLetter.includes('custody_restoration') ? '1. EXPEDITED CUSTODY RESTORATION: Prohibits the state from terminating parental rights solely on the basis of unproven arrests or pretrial detention, and mandates an expedited 14-day judicial hearing to restore physical and legal custody upon dismissal or exoneration.\n' : ''}${selectedPillarsForLetter.includes('garnishment_moratorium') ? '2. COMPLETE CHILD SUPPORT ARREARS VACATUR & GARNISHMENT MORATORIUM: Automatically abates and zeroes child support arrears, late surcharges, and state fees accrued during periods of unlawful arrest or detention, and dissolves 50%-65% payroll garnishment orders so exonerated parents can financially support their children.\n' : ''}${selectedPillarsForLetter.includes('reparation_bonds') ? '3. RESTORATIVE REPARATION BONDS: Establishes dedicated state and federal restitution bonds to fund counseling, transitional housing, and emergency recovery grants for children and parents subjected to wrongful familial separation.\n' : ''}${selectedPillarsForLetter.includes('corporate_liability') ? '4. CORPORATE LIABILITY FOR FALSE CRIMINAL REPORTS: Subjects rental car companies and commercial entities to treble civil damages when they weaponize police stolen property reports for civil contractual disputes.\n' : ''}${selectedPillarsForLetter.includes('visitation_rights') ? '5. PRESERVATION OF PARENTAL BONDS: Enforces free telephonic communication and guaranteed minor child visitation for detained parents prior to trial.\n' : ''}
The Supreme Court has long affirmed that freedom of personal choice in family life is one of the fundamental liberty interests protected by the Fourteenth Amendment (Santosky v. Kramer, 455 U.S. 745). No family should be destroyed by an administrative computer error, wrongful charge, or predatory debt collector.

Please stand on the side of justice, family healing, and fundamental civil rights by introducing and advancing the Family Reunite Act.

Respectfully submitted,
${constituentName}
${constituentCity}
Supporter of The Family Reunite Act (https://www.change.org/FamilyReuniteAct)`;

  const handleCopyLetter = () => {
    sound.playClick();
    navigator.clipboard.writeText(generatedLetterText);
    setCopiedLetter(true);
    setTimeout(() => setCopiedLetter(false), 2500);
  };

  const handleDownloadLetter = () => {
    sound.playClick();
    const blob = new Blob([generatedLetterText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Family_Reunite_Act_Letter_${constituentName.replace(/\s+/g, '_')}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-slate-950 border-2 border-rose-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-8 relative overflow-hidden text-slate-100">
      {/* Glow highlight */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* HEADER BANNER */}
      <div className="relative z-10 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-950/70 border border-rose-500/50 text-rose-300 text-xs font-bold uppercase tracking-wider shadow-inner">
              <Heart className="w-4 h-4 text-rose-400 fill-rose-500" />
              <span>Official Citizen Legislative Campaign · Change.org</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-3">
              <span>The Family Reunite Act</span>
              <span className="text-xs sm:text-sm font-mono font-bold px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                Change.org/FamilyReuniteAct
              </span>
            </h1>
            <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
              Launched by <strong>Jeanell Land</strong>, founder of One Stop Rehabilitation Center 501(c)(3), following her 26-day wrongful false imprisonment over a retrieved rental car. Fighting to end traumatic child welfare separations, quash predatory child support wage garnishments accumulated during wrongful detention, and secure restorative reparation bonds for families nationwide.
            </p>
          </div>

          {/* Action Button Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
            <a
              href={petitionUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playSuccess()}
              className="px-5 py-3 bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-black text-sm rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>Sign Petition on Change.org</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              onClick={handleCopyLink}
              className="px-4 py-3 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
              <span>{copiedLink ? 'Link Copied!' : 'Copy Link'}</span>
            </button>

            <button
              onClick={handleShare}
              className="px-4 py-3 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Share2 className="w-4 h-4 text-cyan-400" />
              <span>Share</span>
            </button>

            {onClose && (
              <button
                onClick={onClose}
                className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-all"
              >
                Close
              </button>
            )}
          </div>
        </div>

        {/* Live Petition Progress Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-rose-950/40 to-slate-900 border border-rose-500/30 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-rose-300">
                Civic Movement Tracker
              </div>
              <div className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                <span>{totalSignatureCount.toLocaleString()} Verified Supporters</span>
                <span className="text-xs font-bold text-amber-400 font-mono">
                  (Goal: 10,000 for Legislative Hearing)
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Listed under <em>Child Support &amp; Garnish Wages</em> and <em>Unfair Business Reform</em> on Change.org.
              </p>
            </div>
          </div>

          {/* Quick status pill */}
          <div className="flex items-center gap-2">
            {hasEndorsed ? (
              <div className="px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>You Have Endorsed the Bill!</span>
              </div>
            ) : (
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('endorse');
                }}
                className="px-4 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-200 text-xs font-bold flex items-center gap-2 cursor-pointer transition-all"
              >
                <Award className="w-4 h-4 text-rose-400" />
                <span>Affix Citizen In-Game Endorsement (+25 XP)</span>
              </button>
            )}
          </div>
        </div>

        {/* Navigation Tabs inside Section */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview & Mission', icon: Heart },
            { id: 'pillars', label: '6 Statutory Pillars', icon: Scale },
            { id: 'endorse', label: 'Endorse & Citizen Roll', icon: Users },
            { id: 'letter', label: 'Legislative Letter Generator', icon: FileText },
            { id: 'impact', label: 'Systemic Impact Simulator', icon: Sparkles },
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
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-slate-950 font-black shadow-md'
                    : 'bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-800'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB CONTENT 1: OVERVIEW & MISSION */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Story & Context */}
            <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-rose-400 text-xs font-mono font-bold uppercase tracking-wider">
                <AlertCircle className="w-4 h-4" />
                <span>The Real-Life Crucible: Why Jeanell Launched This Petition</span>
              </div>
              <h2 className="text-xl font-bold text-white">
                From 26 Days of False Imprisonment to a National Movement for Family Unity
              </h2>
              <div className="text-xs sm:text-sm text-slate-300 space-y-3 leading-relaxed">
                <p>
                  In Detroit, businesswoman, inventor, and mother <strong>Jeanell Land</strong> rented a vehicle, lawfully extended the contract with authorization, and returned the car to the depot. Due to rental company computer negligence, an automated stolen property complaint was filed with the police.
                </p>
                <p>
                  Jeanell was pulled over, arrested, and held for <strong>26 agonizing days</strong> in county jail without timely bailment validation before the prosecutor dismissed every charge with prejudice.
                </p>
                <div className="p-4 bg-rose-950/30 border border-rose-500/30 rounded-xl space-y-2 text-rose-200">
                  <div className="font-bold flex items-center gap-2 text-xs uppercase tracking-wide">
                    <Lock className="w-4 h-4 text-rose-400" />
                    <span>The Devastating Secondary Sentence: Destroying the Family</span>
                  </div>
                  <p className="text-xs leading-relaxed">
                    While locked up, innocent parents face catastrophic secondary traumas: child protective services initiates emergency custody removals, family courts treat pretrial detention as abandonment, and child support agencies assess massive arrears. When the parent is exonerated and released, they find their children placed elsewhere and <strong>50% to 65% of their paycheck garnished</strong> for debt accumulated while they were falsely detained!
                  </p>
                </div>
                <p>
                  Jeanell founded <strong>One Stop Rehabilitation Center 501(c)(3)</strong> to provide transitional housing, expungement aid, and legal defense. Now, she is advancing the <strong>Family Reunite Act</strong> to establish permanent statutory barriers against these injustices.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-2">
                <a
                  href={petitionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Read Full Petition on Change.org</span>
                </a>

                {onNavigateToLawLibrary && (
                  <button
                    onClick={() => onNavigateToLawLibrary('template_family_reunite_parental_rights')}
                    className="px-4 py-2.5 bg-indigo-950 hover:bg-indigo-900 text-indigo-300 border border-indigo-500/40 font-bold rounded-xl text-xs flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4 text-indigo-400" />
                    <span>View Model Court Pleading in Law Library</span>
                  </button>
                )}
              </div>
            </div>

            {/* Quick Summary Cards */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  <span>The Wage Garnishment Trap</span>
                </div>
                <h3 className="text-base font-bold text-white">How Innocent Parents Get Trapped in Debt</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Under existing laws in many jurisdictions, child support calculations continue to accrue even if a parent is locked up without conviction. The Family Reunite Act enforces mandatory vacatur of all arrears accrued during unconstitutional detentions under Title IV-D (45 CFR § 302.56) and MCL 552.603b.
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  <span>Reparation Bonds for Family Healing</span>
                </div>
                <h3 className="text-base font-bold text-white">Restorative Transition Grants</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Instead of forcing families to wait years for civil lawsuit resolutions, the bill establishes state restorative reparation bonds to immediately provide counseling vouchers, rapid re-housing funds, and food security stipends for re-entering families.
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  <span>Corporate Rental Accountability</span>
                </div>
                <h3 className="text-base font-bold text-white">Ending Weaponized Stolen Vehicle Reports</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Mandating treble civil penalties and criminal accountability for rental companies that treat payment delays or civil lease disputes as grand theft auto, putting innocent customers in danger of police violence and wrongful incarceration.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 2: THE 6 STATUTORY PILLARS */}
      {activeTab === 'pillars' && (
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl font-black text-white">The 6 Pillars of the Family Reunite Act</h2>
            <p className="text-xs text-slate-400">
              Model statutory standards drafted for introduction in the Michigan Legislature and the United States Congress.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                number: '01',
                title: 'Ban on Pretrial Parental Removal',
                tag: 'Constitutional Due Process',
                description:
                  'Prohibits child welfare agencies from initiating emergency protective custody or terminating parental rights solely on the basis of an arrest or pretrial detention without independent civil findings of abuse or neglect (Santosky v. Kramer).',
                citation: 'Santosky v. Kramer, 455 U.S. 745; 42 U.S.C. § 1983',
                icon: ShieldCheck,
                color: 'rose',
              },
              {
                number: '02',
                title: '14-Day Mandatory Custody Restoration',
                tag: 'Judicial Fast-Track',
                description:
                  'When criminal charges are dismissed, nolle prossed, or expunged, the family court must conduct an expedited hearing within 14 days and enter an immediate order restoring physical and legal custody to the exonerated parent.',
                citation: 'MCR 3.206; U.S. Const. amend. XIV',
                icon: Heart,
                color: 'amber',
              },
              {
                number: '03',
                title: 'Child Support Arrears Vacatur & Moratorium',
                tag: 'Financial Justice',
                description:
                  'Orders state Friend of the Court bureaus to automatically zero and dissolve all child support arrears, statutory interest, and payroll garnishments that accumulated while a parent was detained without income.',
                citation: '45 CFR § 302.56; MCL 552.603b',
                icon: DollarSign,
                color: 'emerald',
              },
              {
                number: '04',
                title: 'Restorative Reparation Bonds',
                tag: 'Victim Compensation',
                description:
                  'Authorizes state and municipal reparation bonds to fund immediate trauma therapy, stable transitional family housing, and child development stipends for households traumatized by wrongful state incarceration.',
                citation: 'MCL 691.1751 (Wrongful Imprisonment Compensation Act)',
                icon: Award,
                color: 'cyan',
              },
              {
                number: '05',
                title: 'Corporate Rental Accountability',
                tag: 'Commercial Reform',
                description:
                  'Classifies weaponized police reporting of civil rental bailment disputes as commercial consumer fraud with mandatory treble statutory damages, criminal perjury referrals, and revocation of municipal business licenses.',
                citation: 'U.C.C. Article 2A; MCL 600.2918',
                icon: Building2,
                color: 'indigo',
              },
              {
                number: '06',
                title: 'Protected Pretrial Family Communication',
                tag: 'Inmate Rights',
                description:
                  'Guarantees all detained parents free weekly telephonic and video communication with their minor children and in-person contact visits to protect the psychological attachment and wellbeing of children.',
                citation: 'UN Convention on Rights of the Child Art. 9; 18 U.S.C. § 4042',
                icon: MessageSquare,
                color: 'purple',
              },
            ].map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.number}
                  className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 space-y-3 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-black font-mono text-rose-400">{pillar.number}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        {pillar.tag}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-slate-800 text-rose-300">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="text-sm font-bold text-white">{pillar.title}</h3>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{pillar.description}</p>
                  </div>
                  <div className="pt-2 border-t border-slate-800 text-[10px] font-mono text-slate-400">
                    Authority: {pillar.citation}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB CONTENT 3: ENDORSE & CITIZEN ROLL */}
      {activeTab === 'endorse' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Endorsement Form */}
            <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-rose-400 text-xs font-mono font-bold uppercase tracking-wider">
                <Award className="w-4 h-4" />
                <span>Simulate &amp; Record In-Game Citizen Endorsement</span>
              </div>
              <h2 className="text-lg font-bold text-white">Add Your Voice to the Family Reunite Movement</h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                Affix your name and personal statement of solidarity. Your signature will be added to the in-game civic roll and award you with <strong>+20 Resilience, +25 Redemption Points, and +25 Community Legacy</strong>!
              </p>

              <form onSubmit={handleSignEndorsement} className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Your Full Name / Alias *</label>
                  <input
                    type="text"
                    required
                    value={signerName}
                    onChange={(e) => setSignerName(e.target.value)}
                    placeholder="e.g., Amari Land or Detroit Resident"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">City, State / Community</label>
                  <input
                    type="text"
                    value={signerLocation}
                    onChange={(e) => setSignerLocation(e.target.value)}
                    placeholder="e.g., Detroit, MI or Wayne County"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Personal Statement of Support (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={signerMessage}
                    onChange={(e) => setSignerMessage(e.target.value)}
                    placeholder="Why do you support ending wrongful family separation and child support garnishments?"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-black text-xs rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>Affix Citizen Signature (+25 XP)</span>
                </button>
              </form>

              {hasEndorsed && (
                <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs font-bold flex items-center gap-2 animate-fadeIn">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Thank you! Your citizen endorsement is active and contributing to the movement!</span>
                </div>
              )}
            </div>

            {/* Citizen Roll */}
            <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>Citizen Endorsement Roster</span>
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {endorsements.length} Endorsements Logged
                  </span>
                </div>
                <h3 className="text-base font-bold text-white">Voices for the Family Reunite Act</h3>
              </div>

              {/* Endorsements Scroll list */}
              <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
                {endorsements.map((end) => (
                  <div
                    key={end.id}
                    className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-1.5 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-white flex items-center gap-1.5">
                        <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
                        <span>{end.name}</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500">{end.timestamp}</span>
                    </div>
                    <div className="text-[11px] font-mono text-rose-300">{end.location}</div>
                    <p className="text-slate-300 text-xs italic leading-relaxed">"{end.message}"</p>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>Want to sign the official petition on Change.org?</span>
                <a
                  href={petitionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-rose-400 hover:text-rose-300 font-bold flex items-center gap-1"
                >
                  <span>Go to Change.org</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 4: LEGISLATIVE LETTER GENERATOR */}
      {activeTab === 'letter' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
                  <FileText className="w-4 h-4" />
                  <span>Citizen Legislative Action Tool</span>
                </div>
                <h2 className="text-xl font-bold text-white">Generate a Formal Constituent Letter to Lawmakers</h2>
                <p className="text-xs text-slate-300">
                  Customizable advocacy letter to your Congressperson, Senator, or Michigan State Representative advocating for the Family Reunite Act.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyLetter}
                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer transition-all"
                >
                  {copiedLetter ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
                  <span>{copiedLetter ? 'Copied to Clipboard!' : 'Copy Letter'}</span>
                </button>
                <button
                  onClick={handleDownloadLetter}
                  className="px-3.5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download .txt</span>
                </button>
              </div>
            </div>

            {/* Letter customization options */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">Your Constituent Name</label>
                <input
                  type="text"
                  value={constituentName}
                  onChange={(e) => setConstituentName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">City, State / District</label>
                <input
                  type="text"
                  value={constituentCity}
                  onChange={(e) => setConstituentCity(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">Legislative Target</label>
                <select
                  value={letterRecipientType}
                  onChange={(e) => setLetterRecipientType(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                >
                  <option value="congress">United States Representative / Senator</option>
                  <option value="state_house">Michigan State Representative / Senator</option>
                  <option value="governor">State Governor &amp; Attorney General</option>
                </select>
              </div>
            </div>

            {/* Pillar Checkboxes */}
            <div className="space-y-1.5 pt-2">
              <span className="text-[11px] font-bold text-slate-400 block">Select Key Demands to Highlight in Your Letter:</span>
              <div className="flex flex-wrap gap-2 text-xs">
                {[
                  { id: 'custody_restoration', label: '14-Day Mandatory Custody Restoration' },
                  { id: 'garnishment_moratorium', label: 'Child Support Arrears Vacatur & Garnishment Stop' },
                  { id: 'reparation_bonds', label: 'Restorative Reparation Bonds' },
                  { id: 'corporate_liability', label: 'Treble Penalties for False Rental Reports' },
                  { id: 'visitation_rights', label: 'Guaranteed Free Family Visitation in Detention' },
                ].map((item) => {
                  const isChecked = selectedPillarsForLetter.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        setSelectedPillarsForLetter((prev) =>
                          isChecked ? prev.filter((p) => p !== item.id) : [...prev, item.id]
                        );
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all flex items-center gap-1.5 ${
                        isChecked
                          ? 'bg-rose-950 border border-rose-500 text-rose-200'
                          : 'bg-slate-950 border border-slate-800 text-slate-400'
                      }`}
                    >
                      <Check className={`w-3.5 h-3.5 ${isChecked ? 'text-rose-400' : 'text-slate-600'}`} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Generated Letter Preview */}
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl font-mono text-xs text-slate-200 whitespace-pre-line leading-relaxed max-h-[300px] overflow-y-auto">
              {generatedLetterText}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 pt-2 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <span>Find Your Federal Representative:</span>
                <a
                  href="https://www.house.gov/representatives/find-your-representative"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 font-bold underline flex items-center gap-1"
                >
                  <span>house.gov</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span>Find Your US Senator:</span>
                <a
                  href="https://www.senate.gov/senators/senators-contact.htm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 font-bold underline flex items-center gap-1"
                >
                  <span>senate.gov</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 5: SYSTEMIC IMPACT SIMULATOR */}
      {activeTab === 'impact' && (
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl font-black text-white">Systemic Comparison: Today vs. Under Family Reunite Act</h2>
            <p className="text-xs text-slate-400">
              See what happens to an innocent working parent falsely locked up over a civil dispute under the status quo compared to the new legislative standard.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Status Quo Column */}
            <div className="bg-rose-950/20 border-2 border-rose-500/40 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-rose-500/30 pb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>The Status Quo (Broken System)</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold">
                  PUNITIVE &amp; CASCADING
                </span>
              </div>

              <div className="space-y-3 text-xs leading-relaxed text-slate-300">
                <div className="p-3 bg-slate-950/60 rounded-xl border border-rose-500/20 space-y-1">
                  <div className="font-bold text-rose-300">1. False Arrest on Civil Dispute</div>
                  <p>Parent detained 26 days on false rental theft allegation. Bail set high, preventing immediate release.</p>
                </div>
                <div className="p-3 bg-slate-950/60 rounded-xl border border-rose-500/20 space-y-1">
                  <div className="font-bold text-rose-300">2. Emergency Child Welfare Removal</div>
                  <p>State agencies deem children "neglected" due to parent's physical detention, placing children in foster care.</p>
                </div>
                <div className="p-3 bg-slate-950/60 rounded-xl border border-rose-500/20 space-y-1">
                  <div className="font-bold text-rose-300">3. Incarceration Child Support Arrears</div>
                  <p>Child support calculations continue unchecked. Interest surcharges and fees compound while parent cannot earn a wage.</p>
                </div>
                <div className="p-3 bg-slate-950/60 rounded-xl border border-rose-500/20 space-y-1">
                  <div className="font-bold text-rose-300">4. Charges Dismissed, but Trap Remains</div>
                  <p>Criminal charges are dropped with prejudice. However, child welfare takes 12-18 months to review custody, and 50% of the parent’s wages are garnished.</p>
                </div>
              </div>
            </div>

            {/* Family Reunite Act Column */}
            <div className="bg-emerald-950/20 border-2 border-emerald-500/40 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-emerald-500/30 pb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Under The Family Reunite Act</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                  RESTORATIVE &amp; CONSTITUTIONAL
                </span>
              </div>

              <div className="space-y-3 text-xs leading-relaxed text-slate-300">
                <div className="p-3 bg-slate-950/60 rounded-xl border border-emerald-500/20 space-y-1">
                  <div className="font-bold text-emerald-300">1. Commercial Criminalization Ban</div>
                  <p>Corporations barred from filing criminal theft charges for contractual rental delays, with treble damages for abuse.</p>
                </div>
                <div className="p-3 bg-slate-950/60 rounded-xl border border-emerald-500/20 space-y-1">
                  <div className="font-bold text-emerald-300">2. Family Integrity Preserved</div>
                  <p>Child welfare prohibited from treating pretrial detention as unfit parenting; free daily video calls and in-person visitation required.</p>
                </div>
                <div className="p-3 bg-slate-950/60 rounded-xl border border-emerald-500/20 space-y-1">
                  <div className="font-bold text-emerald-300">3. 14-Day Mandatory Reunification</div>
                  <p>Immediate judicial order restoring full custody within 14 business days of criminal case dismissal.</p>
                </div>
                <div className="p-3 bg-slate-950/60 rounded-xl border border-emerald-500/20 space-y-1">
                  <div className="font-bold text-emerald-300">4. Complete Arrears Vacatur &amp; Reparation Bond</div>
                  <p>Child support debt accrued while detained is automatically zeroed; transitional family reparation bond covers therapy and housing stability.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
