import React, { useState } from 'react';
import {
  Scale,
  Shield,
  Phone,
  ExternalLink,
  BookOpen,
  FileText,
  Upload,
  CheckCircle2,
  AlertTriangle,
  Heart,
  Users,
  Search,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Building2,
  PhoneCall,
  Lock,
  Compass,
  MapPin,
  Clock,
  Stamp,
  Camera,
  FileCheck,
  Hash,
  Database,
  CloudUpload,
  ShieldAlert,
  HelpCircle,
  HeartHandshake,
} from 'lucide-react';
import { JusticeResource, LegalSimulationStep, PlayerStats } from '../../types/game';
import {
  JUSTICE_RESOURCES,
  LEGAL_SIMULATION_STEPS,
  FILING_LOCATIONS_DIRECTORY,
  LOCAL_DETROIT_PRECINCTS,
  FilingLocation,
  LocalPrecinctInfo,
} from '../../data/justiceHubData';
import { LAW_LIBRARY_TERMS, CASE_STUDY_TEMPLATES } from '../../data/lawLibraryData';
import { LawLibrarySection } from './LawLibrarySection';
import { FamilyReuniteActSection } from './FamilyReuniteActSection';
import { SupportNonProfitSection } from './SupportNonProfitSection';
import { ClientServiceElectionModal } from '../services/ClientServiceElectionModal';
import { sound } from '../../utils/audio';

interface JusticeHubViewProps {
  playerStats: PlayerStats;
  onUpdateStats: (delta: Partial<PlayerStats>) => void;
  onOpenMentorChat?: (questionText?: string) => void;
  onOpenGoldie?: () => void;
  onReturnToMap?: () => void;
  onOpenServiceElection?: (serviceId?: string) => void;
}

export const JusticeHubView: React.FC<JusticeHubViewProps> = ({
  playerStats,
  onUpdateStats,
  onOpenMentorChat,
  onOpenGoldie,
  onReturnToMap,
  onOpenServiceElection,
}) => {
  // Main tabs: Resources & Hotlines | Support Non-Profit 501c3 | Where to Go to File | Interactive Animated Games | Law Library | Family Reunite Act
  const [activeTab, setActiveTab] = useState<'resources' | 'support_nonprofit' | 'locations' | 'games' | 'library' | 'reunite'>('resources');
  const [isServiceModalOpen, setIsServiceModalOpen] = useState<boolean>(false);
  const [libraryInitialFilter, setLibraryInitialFilter] = useState<'all' | 'aeronautical' | 'community' | 'civil_rights'>('all');

  // Directory filter state
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedZipCode, setSelectedZipCode] = useState<string>('48204'); // default Detroit zip

  // Location selector state in "Where to Go to File"
  const [selectedLocation, setSelectedLocation] = useState<FilingLocation>(FILING_LOCATIONS_DIRECTORY[0]);

  // Interactive Games state
  const [activeGameIndex, setActiveGameIndex] = useState<number>(0);
  const [selectedGameChoice, setSelectedGameChoice] = useState<string | null>(null);
  const [completedGames, setCompletedGames] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('steareality_completed_justice_games');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Hands-on Animated Simulation States
  // Game 1: Interactive Evidence Journaling Tags
  const [documentedTags, setDocumentedTags] = useState<string[]>([]);
  // Game 2: Animated Upload & Hash Generation
  const [isHashing, setIsHashing] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploadComplete, setIsUploadComplete] = useState<boolean>(false);
  // Game 4: Animated Courthouse Rubber Stamp
  const [isStampDropped, setIsStampDropped] = useState<boolean>(false);
  const [isDocumentFiled, setIsDocumentFiled] = useState<boolean>(false);

  const categories = [
    { id: 'all', label: 'All Resources' },
    { id: 'Family Reunification & Civil Advocacy', label: '❤️ Family Reunite Act & Advocacy' },
    { id: 'Internal Affairs & Oversight', label: 'Internal Affairs & Oversight' },
    { id: 'Legal Aid & Public Defenders', label: 'Legal Aid & Public Defenders' },
    { id: 'Bar Associations & Wrongful Conviction', label: 'Bar Assoc & Innocence' },
    { id: 'Police Precincts & Civilian Liaisons', label: 'Precinct Desks' },
    { id: 'Whistleblower Portals', label: 'Whistleblower Links' },
    { id: 'Crisis & Suicide Hotlines', label: '988 Crisis Hotlines' },
    { id: 'Domestic Violence Shelters', label: 'DV Shelters & Haven' },
    { id: 'Crime Reporting & Anonymous Tips', label: 'Crime Stoppers' },
    { id: 'Appeals Courts & Expungement', label: 'Appeals & Expungement' },
  ];

  // Matched local precinct
  const matchedPrecinct =
    LOCAL_DETROIT_PRECINCTS.find((p) => p.zipCodes.includes(selectedZipCode)) ||
    LOCAL_DETROIT_PRECINCTS[0];

  const filteredResources = JUSTICE_RESOURCES.filter((res) => {
    const matchesCat = selectedCategory === 'all' || res.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.jurisdictionOrArea.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const currentGame = LEGAL_SIMULATION_STEPS[activeGameIndex] || LEGAL_SIMULATION_STEPS[0];

  // Game Option Selector
  const handleGameOptionSelect = (optionId: string) => {
    if (selectedGameChoice) return;
    setSelectedGameChoice(optionId);

    const opt = currentGame.options.find((o) => o.id === optionId);
    if (opt?.isCorrect) {
      sound.playSuccess();
      if (!completedGames.includes(currentGame.id)) {
        const next = [...completedGames, currentGame.id];
        setCompletedGames(next);
        localStorage.setItem('steareality_completed_justice_games', JSON.stringify(next));

        onUpdateStats({
          resilience: 15,
          redemptionPoints: 20,
          communityLegacy: 15,
        });
      }
    } else {
      sound.playAlert();
    }
  };

  const handleNextGame = () => {
    sound.playClick();
    setSelectedGameChoice(null);
    setIsStampDropped(false);
    setIsDocumentFiled(false);
    setIsUploadComplete(false);
    setUploadProgress(0);
    setActiveGameIndex((prev) => (prev + 1) % LEGAL_SIMULATION_STEPS.length);
  };

  // Animated Hands-On: Document Tag Toggle
  const toggleDocumentTag = (tag: string) => {
    sound.playClick();
    setDocumentedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // Animated Hands-On: Start Hash & Upload
  const handleStartUpload = () => {
    sound.playClick();
    setIsHashing(true);
    setUploadProgress(0);
    setIsUploadComplete(false);

    let current = 0;
    const timer = setInterval(() => {
      current += 20;
      setUploadProgress(current);
      if (current >= 100) {
        clearInterval(timer);
        setIsHashing(false);
        setIsUploadComplete(true);
        sound.playSuccess();
        onUpdateStats({
          resilience: 10,
          redemptionPoints: 10,
        });
      }
    }, 250);
  };

  // Animated Hands-On: Physical Rubber Stamp Strike
  const handlePressRubberStamp = () => {
    sound.playRubberStamp();
    setIsStampDropped(true);
    setTimeout(() => {
      setIsDocumentFiled(true);
      sound.playSuccess();
      onUpdateStats({
        resilience: 20,
        redemptionPoints: 25,
        communityLegacy: 20,
      });
    }, 600);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 pb-16 animate-fadeIn">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-indigo-950/40 to-slate-950 border-2 border-indigo-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Glow ambient */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-xs font-bold uppercase tracking-wider">
              <Scale className="w-3.5 h-3.5 text-indigo-400" />
              Civil Rights, Legal Defense &amp; Oversight Hub
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Justice Hub &amp; Procedural Filing Simulator
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Inspired by Jeanell Land’s true 26-day false imprisonment over an extended and retrieved rental car that gave birth
              to One Stop Rehabilitation Center 501(c)(3). Access real legal defense, Internal Affairs, whistleblower portals,
              browse the <strong>searchable Law Library</strong> for aeronautical and community dispute templates, and play animated simulations showing exactly <strong>how to document, upload, and where to go to file</strong>.
            </p>

            {/* Quick Law Library, Advocacy & Non-Profit Shortcuts */}
            <div className="flex items-center gap-2 pt-1 flex-wrap">
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('support_nonprofit');
                }}
                className="px-2.5 py-1 bg-gradient-to-r from-emerald-950 via-emerald-900/80 to-teal-950 hover:from-emerald-900 hover:to-teal-900 text-emerald-200 border border-emerald-500/50 rounded-lg text-[11px] font-bold flex items-center gap-1.5 cursor-pointer transition-all shadow-sm"
              >
                <HeartHandshake className="w-3.5 h-3.5 text-emerald-400" />
                <span>Support One Stop 501(c)(3)</span>
                <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-emerald-500/30 text-emerald-300">Milestone Meters</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  setIsServiceModalOpen(true);
                }}
                className="px-2.5 py-1 bg-gradient-to-r from-amber-950 via-amber-900/80 to-yellow-950 hover:from-amber-900 hover:to-yellow-900 text-amber-200 border border-amber-500/50 rounded-lg text-[11px] font-bold flex items-center gap-1.5 cursor-pointer transition-all shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Elect Services (Taxes, Deals, 501c3)</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('reunite');
                }}
                className="px-2.5 py-1 bg-gradient-to-r from-rose-950 via-rose-900/80 to-amber-950 hover:from-rose-900 hover:to-amber-900 text-rose-200 border border-rose-500/50 rounded-lg text-[11px] font-bold flex items-center gap-1.5 cursor-pointer transition-all shadow-sm"
              >
                <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                <span>The Family Reunite Act</span>
                <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-rose-500/30 text-rose-300">Change.org</span>
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('library');
                  setLibraryInitialFilter('aeronautical');
                }}
                className="px-2.5 py-1 bg-cyan-950/70 hover:bg-cyan-900/80 text-cyan-300 border border-cyan-500/40 rounded-lg text-[11px] font-bold flex items-center gap-1.5 cursor-pointer transition-all"
              >
                <span>✈️ Aeronautical Disputes</span>
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('library');
                  setLibraryInitialFilter('community');
                }}
                className="px-2.5 py-1 bg-amber-950/70 hover:bg-amber-900/80 text-amber-300 border border-amber-500/40 rounded-lg text-[11px] font-bold flex items-center gap-1.5 cursor-pointer transition-all"
              >
                <span>🏘️ Community Pleadings</span>
              </button>
            </div>
          </div>

          {/* Quick Emergency Speed Dial */}
          <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-4 shrink-0 max-w-sm w-full space-y-2 text-xs">
            <div className="font-bold uppercase tracking-wider text-slate-400 text-[10px] flex items-center justify-between">
              <span>Emergency Lifelines</span>
              <span className="text-rose-400 font-bold">24/7 Free &amp; Confidential</span>
            </div>
            <div className="p-2.5 bg-rose-950/40 border border-rose-500/30 rounded-xl flex items-center justify-between">
              <div>
                <div className="font-bold text-rose-200">988 Suicide &amp; Crisis Lifeline</div>
                <div className="text-[10px] text-slate-400">Call or Text 24/7/365</div>
              </div>
              <a
                href="tel:988"
                className="px-3 py-1 bg-rose-500 hover:bg-rose-400 text-slate-950 font-black rounded-lg text-xs"
              >
                988
              </a>
            </div>
            <div className="p-2.5 bg-indigo-950/40 border border-indigo-500/30 rounded-xl flex items-center justify-between">
              <div>
                <div className="font-bold text-indigo-200">National Domestic Violence Hotline</div>
                <div className="text-[10px] text-slate-400">1-800-799-SAFE (7233)</div>
              </div>
              <a
                href="tel:18007997233"
                className="px-3 py-1 bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-black rounded-lg text-xs"
              >
                Call
              </a>
            </div>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-2 mt-6 pt-6 border-t border-slate-800/80 overflow-x-auto pb-1">
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('resources');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'resources'
                ? 'bg-indigo-500 text-slate-950 shadow-md'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Community Directory &amp; Hotlines</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('support_nonprofit');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'support_nonprofit'
                ? 'bg-emerald-500 text-slate-950 shadow-md font-black'
                : 'bg-emerald-950/40 text-emerald-300 hover:text-white border border-emerald-500/40'
            }`}
          >
            <HeartHandshake className="w-4 h-4 text-emerald-400" />
            <span>Support Non-Profit (One Stop 501c3)</span>
            <span className="px-1.5 py-0.2 bg-emerald-900/60 text-emerald-200 border border-emerald-500/50 rounded text-[9px] font-mono">
              Milestone Meters
            </span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('locations');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'locations'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Where to Go to File (Courts &amp; Precincts)</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('games');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'games'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Animated Legal Games (Document, Upload, File)</span>
            <span className="px-1.5 py-0.2 bg-amber-950/60 text-amber-300 border border-amber-500/40 rounded text-[9px] font-mono">
              {completedGames.length}/{LEGAL_SIMULATION_STEPS.length}
            </span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('library');
              setLibraryInitialFilter('all');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'library'
                ? 'bg-emerald-500 text-slate-950 shadow-md font-black'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>Searchable Law Library &amp; Case Studies</span>
            <span className="px-1.5 py-0.2 bg-emerald-950/60 text-emerald-300 border border-emerald-500/40 rounded text-[9px] font-mono">
              {CASE_STUDY_TEMPLATES.length + LAW_LIBRARY_TERMS.length}
            </span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('reunite');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'reunite'
                ? 'bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 text-white shadow-lg shadow-rose-500/25 font-black'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
            <span>The Family Reunite Act</span>
            <span className="px-1.5 py-0.2 bg-rose-950/60 text-rose-300 border border-rose-500/40 rounded text-[9px] font-mono">
              Change.org
            </span>
          </button>
        </div>
      </div>

      {/* ==================================================== */}
      {/* VIEW 1: COMMUNITY DIRECTORY & VERIFIED HOTLINES      */}
      {/* ==================================================== */}
      {activeTab === 'resources' && (
        <div className="space-y-6">
          {/* Filters & Search */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search legal aid, precincts, whistleblowers, internal affairs, appeals..."
                className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500"
              />
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedCategory(c.id);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === c.id
                    ? 'bg-indigo-500 text-slate-950 font-bold'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Resource Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredResources.map((res) => (
              <div
                key={res.id}
                className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4 hover:border-indigo-500/50 transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="px-2 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-slate-300 font-mono">
                      {res.category}
                    </span>
                    <span className="text-indigo-400 font-semibold">{res.jurisdictionOrArea}</span>
                  </div>

                  <h3 className="text-sm font-bold text-white leading-tight">{res.title}</h3>
                  <div className="text-[11px] text-slate-400 font-medium">{res.agencyOrOrg}</div>
                  <p className="text-xs text-slate-300 leading-relaxed">{res.description}</p>
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-800/80">
                  <div className="text-[11px] text-slate-400">
                    <strong className="text-slate-200 block text-[10px] uppercase">How to Access:</strong>
                    {res.howToAccess}
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    {res.phone ? (
                      <a
                        href={`tel:${res.phone}`}
                        className="text-xs font-mono font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>{res.phone}</span>
                      </a>
                    ) : <span />}

                    <a
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                    >
                      <span>Official Portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* VIEW 2: WHERE TO GO TO FILE (COURTS & PRECINCTS)     */}
      {/* ==================================================== */}
      {activeTab === 'locations' && (
        <div className="space-y-6">
          {/* Local Precinct Finder by Zip Code */}
          <div className="bg-slate-950 border-2 border-cyan-500/30 rounded-2xl p-6 space-y-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase">
                  Local Area Jurisdiction &amp; Precinct Desk Finder
                </span>
                <h3 className="text-lg font-black text-white">Find Your Assigned Precinct &amp; Court District</h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Select your Detroit zip code to display the designated desk phone, commanding officer, and community liaison.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-mono">Zip Code:</span>
                <select
                  value={selectedZipCode}
                  onChange={(e) => {
                    sound.playClick();
                    setSelectedZipCode(e.target.value);
                  }}
                  className="bg-slate-900 border border-cyan-500/50 rounded-xl px-3 py-2 text-white font-mono text-xs font-bold"
                >
                  <option value="48201">48201 (Midtown / Brush Park)</option>
                  <option value="48204">48204 (Dexter-Linwood / Boston Edison)</option>
                  <option value="48205">48205 (Gratiot Ave / Eastside)</option>
                  <option value="48209">48209 (Southwest / Mexicantown)</option>
                  <option value="48219">48219 (Northwest / McNichols)</option>
                  <option value="48221">48221 (Seven Mile Corridor)</option>
                  <option value="48226">48226 (Downtown / Financial District)</option>
                </select>
              </div>
            </div>

            {/* Matched Precinct Card */}
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-cyan-400 block">Assigned Station:</span>
                <div className="font-bold text-white text-sm">{matchedPrecinct.precinctNumber} · {matchedPrecinct.name}</div>
                <div className="text-slate-400">{matchedPrecinct.address}</div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-cyan-400 block">Desk Contacts:</span>
                <div className="font-mono text-emerald-400 font-bold">{matchedPrecinct.phone}</div>
                <div className="text-slate-300">{matchedPrecinct.commander}</div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-cyan-400 block">Civilian Liaison:</span>
                <div className="text-slate-200">{matchedPrecinct.liaisonOfficer}</div>
                <div className="text-[11px] text-slate-400 truncate">Neighborhoods: {matchedPrecinct.neighborhoods}</div>
              </div>
            </div>
          </div>

          {/* Physical Courthouse & Agency Directory */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Sidebar Building List */}
            <div className="lg:col-span-5 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-cyan-400" />
                <span>Primary Filing Venues in Detroit</span>
              </h3>

              {FILING_LOCATIONS_DIRECTORY.map((loc) => {
                const isSelected = selectedLocation.id === loc.id;
                return (
                  <div
                    key={loc.id}
                    onClick={() => {
                      sound.playClick();
                      setSelectedLocation(loc);
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer text-left ${
                      isSelected
                        ? 'bg-slate-900 border-cyan-400 shadow-lg ring-1 ring-cyan-500/40'
                        : 'bg-slate-950 hover:bg-slate-900/60 border-slate-800'
                    }`}
                  >
                    <div className="text-xs font-mono text-cyan-400 font-bold">{loc.division}</div>
                    <h4 className="text-sm font-bold text-white mt-0.5">{loc.name}</h4>
                    <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                      <span>{loc.address}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Main Location Detail Stage */}
            <div className="lg:col-span-7 bg-slate-950 border-2 border-slate-800 rounded-2xl p-6 sm:p-8 space-y-5 shadow-2xl">
              <div className="border-b border-slate-800 pb-4">
                <span className="text-xs font-mono font-bold text-cyan-400">{selectedLocation.division}</span>
                <h3 className="text-xl font-black text-white mt-1">{selectedLocation.name}</h3>
                <div className="text-xs text-slate-300 mt-1 flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{selectedLocation.address}</span>
                </div>
              </div>

              {/* Exact Room / Window & Hours */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-cyan-400 block">Exact Filing Window:</span>
                  <div className="font-bold text-white text-sm">{selectedLocation.roomOrWindow}</div>
                  <div className="text-slate-400 text-[11px]">Phone: {selectedLocation.phone}</div>
                </div>

                <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-cyan-400 block">Operating Hours:</span>
                  <div className="font-bold text-emerald-400 text-sm">{selectedLocation.hours}</div>
                  <div className="text-slate-400 text-[11px]">{selectedLocation.feeInfo}</div>
                </div>
              </div>

              {/* Accepted Filings */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Accepted Pleadings &amp; Petitions at this Counter:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedLocation.acceptedFilings.map((f, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-200 flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Security & Parking Protocols */}
              <div className="space-y-3 pt-3 border-t border-slate-800 text-xs">
                <div className="p-3 bg-amber-950/20 border border-amber-500/30 rounded-xl space-y-1">
                  <span className="font-bold text-amber-300 block flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                    <span>Security Checkpoint Rules:</span>
                  </span>
                  <p className="text-slate-300 leading-relaxed text-[11px]">
                    {selectedLocation.securityProtocol}
                  </p>
                </div>

                <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl space-y-1">
                  <span className="font-bold text-slate-300 block">Transit &amp; Parking Instructions:</span>
                  <p className="text-slate-400 leading-relaxed text-[11px]">
                    {selectedLocation.transitParking}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* VIEW 3: ANIMATED REALISTIC LEGAL GAMES               */}
      {/* ==================================================== */}
      {activeTab === 'games' && (
        <div className="space-y-6">
          {/* Game Stepper Header */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 flex items-center justify-between flex-wrap gap-4">
            <div>
              <span className="text-xs font-mono font-bold text-amber-400">
                Interactive Legal Simulation · Game {activeGameIndex + 1} of {LEGAL_SIMULATION_STEPS.length}
              </span>
              <h2 className="text-xl font-black text-white">{currentGame.title}</h2>
            </div>

            <div className="flex items-center gap-2">
              {LEGAL_SIMULATION_STEPS.map((step, idx) => (
                <button
                  key={step.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedGameChoice(null);
                    setActiveGameIndex(idx);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeGameIndex === idx
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : completedGames.includes(step.id)
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : 'bg-slate-900 text-slate-400 border border-slate-800'
                  }`}
                >
                  <span>Game {idx + 1}</span>
                  {completedGames.includes(step.id) && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                </button>
              ))}
            </div>
          </div>

          {/* HANDS-ON ANIMATED WORKSPACE */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Scenario & Multiple Choice Logic */}
            <div className="lg:col-span-6 bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-5">
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block">
                  Factual Real-Life Case Study
                </span>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                  {currentGame.scenario}
                </p>
                <div className="text-xs text-amber-300 font-semibold pt-1">
                  {currentGame.taskPrompt}
                </div>
              </div>

              {/* Choices */}
              <div className="space-y-3">
                {currentGame.options.map((opt) => {
                  const isSelected = selectedGameChoice === opt.id;
                  let btnClass = 'bg-slate-900 hover:bg-slate-850 border-slate-800 text-slate-200';
                  if (selectedGameChoice) {
                    if (opt.isCorrect) {
                      btnClass = 'bg-emerald-950/70 border-emerald-500 text-emerald-100 ring-1 ring-emerald-500/40';
                    } else if (isSelected && !opt.isCorrect) {
                      btnClass = 'bg-rose-950/70 border-rose-500 text-rose-100';
                    }
                  }

                  return (
                    <div
                      key={opt.id}
                      onClick={() => handleGameOptionSelect(opt.id)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer text-left ${btnClass}`}
                    >
                      <div className="text-xs leading-relaxed">{opt.text}</div>
                      {selectedGameChoice && (
                        <div className="mt-2.5 pt-2.5 border-t border-slate-800 text-xs">
                          <span className={opt.isCorrect ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                            {opt.isCorrect ? '✓ Valid Procedural Law: ' : '✗ Flawed Legal Strategy: '}
                          </span>
                          <span className="text-slate-300">{opt.explanation}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Practical Takeaway & Next */}
              {selectedGameChoice && (
                <div className="p-4 bg-emerald-950/40 border border-emerald-500/40 rounded-xl space-y-2 animate-fadeIn">
                  <div className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Statutory Defense Takeaway</span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">{currentGame.practicalTakeaway}</p>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[11px] font-mono text-emerald-400">+15 Resilience · +20 Redemption Points</span>
                    <button
                      onClick={handleNextGame}
                      className="px-4 py-2 bg-gradient-to-r from-amber-500 to-emerald-500 text-slate-950 font-bold rounded-lg text-xs cursor-pointer shadow"
                    >
                      Next Legal Simulation →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Tactile Animated Simulation Canvas */}
            <div className="lg:col-span-6 bg-slate-950 border-2 border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-6">
              {/* ANIMATED CANVAS 1: "HOW TO DOCUMENT" (Interactive Legal Pad) */}
              {activeGameIndex === 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                      <FileText className="w-4 h-4" />
                      <span>Contemporaneous Evidence Journal (Yellow Pad)</span>
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">FRE 803(1) Present Sense</span>
                  </div>

                  {/* Yellow Legal Pad Visual */}
                  <div className="bg-[#fef9c3] text-slate-900 rounded-xl p-5 shadow-2xl border border-amber-300 space-y-3 font-serif relative overflow-hidden">
                    {/* Red left margin line of legal pad */}
                    <div className="absolute top-0 bottom-0 left-8 w-[1.5px] bg-red-400 opacity-60" />

                    <div className="pl-6 space-y-2 text-xs leading-relaxed">
                      <div className="border-b border-blue-200 pb-1 font-mono text-[11px] font-bold text-slate-700">
                        DATE: OCT 16, 2026 · TIME: 10:14 AM EST · LOCATION: WOODWARD &amp; GRAND BLVD
                      </div>

                      <div className="text-xs text-slate-800">
                        INCIDENT NARRATIVE: Pulled over during routine transit. Officer claimed rental vehicle was flagged stolen.
                        Presented electronic rental extension and return receipt. Officer refused badge number initially.
                      </div>

                      {/* Interactive Evidence Tagging Pills */}
                      <div className="pt-2">
                        <span className="text-[10px] font-sans uppercase font-bold text-slate-600 block mb-1">
                          Click to tag contemporaneous evidence items:
                        </span>
                        <div className="flex flex-wrap gap-1.5 font-sans">
                          {[
                            'Patrol Car Unit: #3-12',
                            'Officer Badge: #4891',
                            'Rental Return Timestamp: 10:14 AM',
                            'Passenger Witness: Marcus V.',
                            'Body Cam Request Stated Verbatim',
                          ].map((tag) => {
                            const isTagged = documentedTags.includes(tag);
                            return (
                              <button
                                key={tag}
                                onClick={() => toggleDocumentTag(tag)}
                                className={`px-2 py-1 rounded text-[10px] font-bold transition-all cursor-pointer ${
                                  isTagged
                                    ? 'bg-emerald-700 text-white shadow-sm'
                                    : 'bg-amber-100 hover:bg-amber-200 text-slate-800 border border-amber-300'
                                }`}
                              >
                                {isTagged ? '✓ ' : '+ '}
                                {tag}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {documentedTags.length >= 3 && (
                        <div className="p-2 bg-emerald-100 border border-emerald-400 rounded text-emerald-900 text-[11px] font-sans font-bold flex items-center gap-1.5 animate-fadeIn">
                          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                          <span>Contemporaneous journal completed. Holds up under cross-examination!</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ANIMATED CANVAS 2: "HOW TO UPLOAD" (Digital Chain of Custody & Hash Vault) */}
              {activeGameIndex === 1 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                      <CloudUpload className="w-4 h-4" />
                      <span>Digital Chain of Custody &amp; Cryptographic Hash Vault</span>
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">SHA-256 Verified</span>
                  </div>

                  {/* Terminal File Box */}
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3 font-mono text-xs">
                    <div className="flex items-center justify-between text-slate-400 text-[11px]">
                      <span>File: rental_return_dashcam_raw.mp4</span>
                      <span className="text-emerald-400">Size: 42.8 MB (Uncompressed)</span>
                    </div>

                    <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-[11px] space-y-1">
                      <div className="text-slate-400">EXIF Metadata:</div>
                      <div className="text-cyan-300">GPS: 42.3314° N, 83.0458° W (Detroit Rental Depot)</div>
                      <div className="text-cyan-300">Timestamp: 2026-10-16T10:14:22Z (UTC)</div>
                      <div className="text-amber-300 truncate">
                        SHA-256: 7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] text-slate-400">
                        <span>Uploading to Triple-Redundant Encrypted Vaults...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                        <div
                          style={{ width: `${uploadProgress}%` }}
                          className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-300"
                        />
                      </div>
                    </div>

                    {!isUploadComplete ? (
                      <button
                        onClick={handleStartUpload}
                        disabled={isHashing}
                        className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 text-white font-bold rounded-lg text-xs cursor-pointer flex items-center justify-center gap-2"
                      >
                        <Upload className="w-4 h-4" />
                        <span>{isHashing ? 'Generating SHA-256 Hash & Archiving...' : 'Upload Unedited Evidence'}</span>
                      </button>
                    ) : (
                      <div className="p-2.5 bg-emerald-950/70 border border-emerald-500/50 rounded-lg text-emerald-300 text-xs font-bold flex items-center gap-2 animate-fadeIn">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Evidence Stored with Digital Chain of Custody Certificate!</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ANIMATED CANVAS 3: "HOW TO FILE" (The Rubber Stamp Clerk Counter) */}
              {activeGameIndex === 2 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Stamp className="w-4 h-4" />
                      <span>The Courthouse Clerk Counter &amp; Official Rubber Stamp</span>
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">Room 101 Filing Window</span>
                  </div>

                  {/* Document Ready to be Stamped */}
                  <div className="bg-slate-900 border-2 border-slate-700 rounded-xl p-5 space-y-4 relative shadow-2xl">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-xs">
                      <span className="font-bold text-white uppercase tracking-wider">
                        STATE OF MICHIGAN · 3RD JUDICIAL CIRCUIT
                      </span>
                      <span className="text-slate-400 font-mono">Form MC-20 / Exhibit A Attached</span>
                    </div>

                    <div className="text-xs text-slate-300 space-y-1 font-mono">
                      <div>PETITIONER: JEANELL LAND · PRO BONO IN PRO PER</div>
                      <div>RESPONDENT: STATE OF MICHIGAN / RENTAL CLAIM</div>
                      <div>RELIEF SOUGHT: DISMISSAL WITH PREJUDICE &amp; CITIZEN IA REPORT</div>
                    </div>

                    {/* Official Rubber Stamp Seal (Animated Drop) */}
                    {isStampDropped && (
                      <div className="my-2 p-3 border-4 border-red-600 rounded-xl bg-red-950/30 text-red-400 font-mono text-center rotate-[-3deg] shadow-lg animate-scaleUp">
                        <div className="text-[11px] font-black uppercase tracking-widest text-red-500">
                          ★★ CLERK OF THE COURT ★★
                        </div>
                        <div className="text-xs font-black tracking-wider text-red-400">
                          FILED &amp; TIME-STAMPED
                        </div>
                        <div className="text-[10px] text-red-300">
                          OCTOBER 16, 2026 · 10:14 AM · DOCKET #26-0842-CA
                        </div>
                        <div className="text-[9px] text-red-400">CERTIFIED CONFORMED COPY FOR DEFENDANT</div>
                      </div>
                    )}

                    {!isDocumentFiled ? (
                      <button
                        onClick={handlePressRubberStamp}
                        className="w-full py-3 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-black rounded-xl text-xs uppercase tracking-wider cursor-pointer shadow-lg flex items-center justify-center gap-2 animate-pulse"
                      >
                        <Stamp className="w-4 h-4" />
                        <span>Stamp Document at Clerk Counter (Ker-Thunk!)</span>
                      </button>
                    ) : (
                      <div className="p-3 bg-emerald-950/70 border border-emerald-500/50 rounded-xl text-emerald-300 text-xs font-bold flex items-center justify-between animate-fadeIn">
                        <span className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Pleading Formally Filed &amp; Docketed! Certified Copy Acquired.</span>
                        </span>
                        <span className="text-[10px] font-mono text-emerald-400">+25 Redemption Pts</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ANIMATED CANVAS 4: "WHERE TO GO TO FILE" (Courthouse Routing Map) */}
              {activeGameIndex === 3 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Compass className="w-4 h-4" />
                      <span>Detroit Legal Jurisdiction &amp; Building Navigator</span>
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">Routing Simulator</span>
                  </div>

                  <div className="grid grid-cols-1 gap-2.5 text-xs font-mono">
                    {[
                      {
                        title: '1. Internal Affairs Citizen Misconduct Complaint',
                        destination: 'DPD Headquarters (1301 Third Ave, 5th Floor Room 502)',
                        isCorrect: true,
                      },
                      {
                        title: '2. Criminal Court Emergency Appeal & Bond Reduction',
                        destination: 'Frank Murphy Hall of Justice (1441 St. Antoine St, Room 101)',
                        isCorrect: true,
                      },
                      {
                        title: '3. Section 1983 Civil Rights Lawsuit & County FOIA',
                        destination: 'Coleman A. Young Municipal Center (2 Woodward Ave, Room 201)',
                        isCorrect: true,
                      },
                      {
                        title: '4. Michigan Clean Slate Expungement & Family Sanctuary',
                        destination: 'One Stop Rehabilitation Center 501(c)(3) (15400 Grand River Ave)',
                        isCorrect: true,
                      },
                    ].map((route, i) => (
                      <div
                        key={i}
                        className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1 hover:border-indigo-500/40 transition-colors"
                      >
                        <div className="text-indigo-300 font-bold">{route.title}</div>
                        <div className="text-emerald-400 text-[11px] flex items-center gap-1">
                          <ArrowRight className="w-3 h-3" />
                          <span>{route.destination}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ANIMATED CANVAS 5: "HOW TO ADVOCATE & MOBILIZE" (The Family Reunite Act Petition & Citizen Seal) */}
              {activeGameIndex === 4 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                      <span>Legislative Mobilization · The Family Reunite Act</span>
                    </span>
                    <span className="text-[10px] font-mono text-amber-400">Change.org/FamilyReuniteAct</span>
                  </div>

                  <div className="bg-slate-900 border-2 border-rose-500/30 rounded-xl p-5 space-y-4 shadow-2xl text-xs">
                    <div className="p-3 bg-rose-950/40 border border-rose-500/30 rounded-xl space-y-1">
                      <div className="text-[11px] font-bold text-rose-300 uppercase tracking-wider">
                        Official Citizen Petition Status
                      </div>
                      <div className="text-white font-bold text-sm">
                        Protecting Families &amp; Quashing Predatory Child Support Garnishment
                      </div>
                      <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                        Modeled on Jeanell Land's 26-day crucible and One Stop Rehabilitation Center's restorative mission.
                      </p>
                    </div>

                    <div className="space-y-2 font-mono text-[11px]">
                      <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800">
                        <span className="text-slate-400">Demand 1: Mandatory 14-Day Custody Restoration</span>
                        <span className="text-emerald-400 font-bold">✓ Enforceable</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800">
                        <span className="text-slate-400">Demand 2: Incarceration Arrears Vacatur</span>
                        <span className="text-emerald-400 font-bold">✓ Zero Arrears</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800">
                        <span className="text-slate-400">Demand 3: Restorative Reparation Bonds</span>
                        <span className="text-emerald-400 font-bold">✓ Funded Trust</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        sound.playClick();
                        setActiveTab('reunite');
                      }}
                      className="w-full py-3 bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-black rounded-xl text-xs uppercase tracking-wider cursor-pointer shadow-lg flex items-center justify-center gap-2"
                    >
                      <Heart className="w-4 h-4 fill-white" />
                      <span>Open Family Reunite Act Action Center →</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Bottom Quick Navigation */}
              <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
                <span>Completed: {completedGames.length} / {LEGAL_SIMULATION_STEPS.length} Simulations</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      sound.playClick();
                      setActiveTab('library');
                      setLibraryInitialFilter('all');
                    }}
                    className="text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer flex items-center gap-1"
                  >
                    <Scale className="w-3.5 h-3.5" />
                    <span>Open Law Library &amp; Model Briefs →</span>
                  </button>
                  {onOpenGoldie && (
                    <button
                      onClick={() => {
                        sound.playClick();
                        onOpenGoldie();
                      }}
                      className="text-amber-400 hover:text-amber-300 underline font-medium cursor-pointer"
                    >
                      Jeanell vs Goldie →
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* VIEW: SUPPORT NON-PROFIT (ONE STOP 501(c)(3))       */}
      {/* ==================================================== */}
      {activeTab === 'support_nonprofit' && (
        <SupportNonProfitSection
          playerStats={playerStats}
          onUpdateStats={onUpdateStats}
          onOpenServiceElection={(serviceId) => {
            if (onOpenServiceElection) {
              onOpenServiceElection(serviceId);
            } else {
              setIsServiceModalOpen(true);
            }
          }}
        />
      )}

      {/* ==================================================== */}
      {/* VIEW 4: SEARCHABLE LAW LIBRARY & CASE TEMPLATES     */}
      {/* ==================================================== */}
      {activeTab === 'library' && (
        <LawLibrarySection
          playerStats={playerStats}
          onUpdateStats={onUpdateStats}
          onOpenMentorChat={onOpenMentorChat}
          onOpenGoldie={onOpenGoldie}
          initialDisputeFilter={libraryInitialFilter}
        />
      )}

      {/* ==================================================== */}
      {/* VIEW 5: THE FAMILY REUNITE ACT ACTION CENTER         */}
      {/* ==================================================== */}
      {activeTab === 'reunite' && (
        <FamilyReuniteActSection
          playerStats={playerStats}
          onUpdateStats={onUpdateStats}
          onNavigateToLawLibrary={(templateId) => {
            sound.playClick();
            setActiveTab('library');
            setLibraryInitialFilter('civil_rights');
          }}
        />
      )}

      {/* Client Service Election Modal (IRS Tax Prep, Real Estate, One Stop 501c3) */}
      <ClientServiceElectionModal
        isOpen={isServiceModalOpen}
        onClose={() => setIsServiceModalOpen(false)}
      />
    </div>
  );
};
