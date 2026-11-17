import React, { useState, useMemo } from 'react';
import {
  Scale,
  Search,
  BookOpen,
  FileText,
  Copy,
  Check,
  Bookmark,
  BookmarkCheck,
  Download,
  Plane,
  Home,
  Shield,
  Volume2,
  Printer,
  Edit3,
  Filter,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ExternalLink,
  X,
  FileCheck,
  Building2,
  AlertTriangle,
  Compass,
  GraduationCap,
  Gavel,
} from 'lucide-react';
import { LawLibraryTerm, CaseStudyTemplate, PlayerStats } from '../../types/game';
import { LAW_LIBRARY_TERMS, CASE_STUDY_TEMPLATES } from '../../data/lawLibraryData';
import { sound } from '../../utils/audio';

export interface LawLibrarySectionProps {
  playerStats: PlayerStats;
  onUpdateStats: (delta: Partial<PlayerStats>) => void;
  onOpenMentorChat?: (questionText?: string) => void;
  onOpenGoldie?: () => void;
  initialDisputeFilter?: 'all' | 'aeronautical' | 'community' | 'civil_rights';
}

export const LawLibrarySection: React.FC<LawLibrarySectionProps> = ({
  playerStats,
  onUpdateStats,
  onOpenMentorChat,
  onOpenGoldie,
  initialDisputeFilter = 'all',
}) => {
  // Navigation sub-tabs: 'all' | 'templates' | 'terms' | 'bookmarks'
  const [activeSubTab, setActiveSubTab] = useState<'all' | 'templates' | 'terms' | 'bookmarks'>('all');

  // Search query & Category filter
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDisputeFilter, setSelectedDisputeFilter] = useState<'all' | 'aeronautical' | 'community' | 'civil_rights'>(
    initialDisputeFilter
  );

  // Modal / Drawer Selection
  const [activeTemplate, setActiveTemplate] = useState<CaseStudyTemplate | null>(null);
  const [activeTerm, setActiveTerm] = useState<LawLibraryTerm | null>(null);

  // Copy feedback state
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Template Customizer State
  const [isCustomizing, setIsCustomizing] = useState<boolean>(false);
  const [customPetitioner, setCustomPetitioner] = useState<string>('Jeanell Land');
  const [customRespondent, setCustomRespondent] = useState<string>('Commercial Entity / City Agency');
  const [customDocket, setCustomDocket] = useState<string>('Case No. 2026-CV-04892');
  const [customIncidentDate, setCustomIncidentDate] = useState<string>('October 14, 2016');
  const [customLocation, setCustomLocation] = useState<string>('Detroit / Wayne County, MI');
  const [customExhibits, setCustomExhibits] = useState<string>(
    'Exhibit A: Contract Extension Confirmation Receipts; Exhibit B: Depot Return Photos with GPS EXIF Metadata'
  );

  // Bookmarks (saved in localStorage)
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('steareality_bookmarked_legal_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Studied/Mastered items (saved in localStorage)
  const [masteredIds, setMasteredIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('steareality_studied_legal_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Toggle Bookmark
  const handleToggleBookmark = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    sound.playClick();
    setBookmarkedIds((prev) => {
      const updated = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      localStorage.setItem('steareality_bookmarked_legal_items', JSON.stringify(updated));
      return updated;
    });
  };

  // Mark Term or Template as Mastered / Studied (+Redemption Points)
  const handleMarkMastered = (id: string, titleOrTerm: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!masteredIds.includes(id)) {
      const updated = [...masteredIds, id];
      setMasteredIds(updated);
      localStorage.setItem('steareality_studied_legal_items', JSON.stringify(updated));
      sound.playSuccess();
      onUpdateStats({
        resilience: 10,
        redemptionPoints: 15,
        communityLegacy: 15,
      });
    }
  };

  // Pronounce Legal Term
  const handlePronounce = (term: LawLibraryTerm, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    sound.playClick();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(term.term);
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Filtered Terms
  const filteredTerms = useMemo(() => {
    return LAW_LIBRARY_TERMS.filter((term) => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        query === '' ||
        term.term.toLowerCase().includes(query) ||
        term.plainEnglishDefinition.toLowerCase().includes(query) ||
        term.formalLegalDefinition.toLowerCase().includes(query) ||
        term.statutoryOrRegulatoryCitation.toLowerCase().includes(query) ||
        term.realWorldApplication.toLowerCase().includes(query) ||
        term.exampleScenario.toLowerCase().includes(query);

      const matchesCategory =
        selectedDisputeFilter === 'all' ||
        (selectedDisputeFilter === 'aeronautical' && term.category === 'Aeronautical & Aerospace') ||
        (selectedDisputeFilter === 'community' && term.category === 'Community & Municipal') ||
        (selectedDisputeFilter === 'civil_rights' &&
          (term.category === 'Civil Rights & Torts' || term.category === 'Constitutional & Criminal Defense'));

      const matchesBookmark = activeSubTab !== 'bookmarks' || bookmarkedIds.includes(term.id);

      return matchesSearch && matchesCategory && matchesBookmark;
    });
  }, [searchQuery, selectedDisputeFilter, activeSubTab, bookmarkedIds]);

  // Filtered Templates
  const filteredTemplates = useMemo(() => {
    return CASE_STUDY_TEMPLATES.filter((tpl) => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        query === '' ||
        tpl.title.toLowerCase().includes(query) ||
        tpl.summary.toLowerCase().includes(query) ||
        tpl.jurisdiction.toLowerCase().includes(query) ||
        tpl.categoryLabel.toLowerCase().includes(query) ||
        tpl.governingLaw.some((law) => law.toLowerCase().includes(query)) ||
        tpl.coreLegalIssues.some((issue) => issue.toLowerCase().includes(query)) ||
        tpl.templatePleadingText.toLowerCase().includes(query);

      const matchesCategory =
        selectedDisputeFilter === 'all' ||
        (selectedDisputeFilter === 'aeronautical' && tpl.disputeType === 'aeronautical') ||
        (selectedDisputeFilter === 'community' && tpl.disputeType === 'community') ||
        (selectedDisputeFilter === 'civil_rights' && tpl.disputeType === 'civil_rights');

      const matchesBookmark = activeSubTab !== 'bookmarks' || bookmarkedIds.includes(tpl.id);

      return matchesSearch && matchesCategory && matchesBookmark;
    });
  }, [searchQuery, selectedDisputeFilter, activeSubTab, bookmarkedIds]);

  // Generate populated custom pleading text
  const getPopulatedPleadingText = (tpl: CaseStudyTemplate) => {
    let text = tpl.templatePleadingText;
    if (isCustomizing) {
      text = text
        .replace(/JEANELL LAND/g, customPetitioner.toUpperCase())
        .replace(/Jeanell Land/g, customPetitioner)
        .replace(/Rental Agency|APEX SURVEILLANCE & LOGISTICS LLC|METRO APARTMENT HOLDINGS LLC|GLOBAL AERO-DEFENSE LOGISTICS CORP\./g, customRespondent)
        .replace(/October 14, 2016|September 12, 2026|October 12, 2026|August 18, 2026/g, customIncidentDate)
        .replace(/Wayne County, Michigan|Detroit, Michigan/g, customLocation)
        .replace(/Exhibit A: Bank Ledger & Extension Confirmation #EXT-88912/g, customExhibits.split(';')[0] || 'Exhibit A')
        .replace(/Exhibit B: Timestamped Depot Return Photograph & GPS Exif Data/g, customExhibits.split(';')[1] || 'Exhibit B');
    }
    return text;
  };

  // Copy Full Brief to Clipboard
  const handleCopyBrief = (tpl: CaseStudyTemplate) => {
    sound.playClick();
    const pleadingContent = getPopulatedPleadingText(tpl);
    const fullBriefText = `======================================================================
${tpl.captionHeader.court}
----------------------------------------------------------------------
${isCustomizing ? customPetitioner.toUpperCase() + ', Petitioner/Plaintiff,' : tpl.captionHeader.plaintiffOrPetitioner}
v.
${isCustomizing ? customRespondent + ', Respondent/Defendant.' : tpl.captionHeader.defendantOrRespondent}
${isCustomizing ? customDocket : tpl.captionHeader.caseOrDocketNumber}
${tpl.captionHeader.documentTitle}
======================================================================

DISPUTE CLASSIFICATION: ${tpl.categoryLabel.toUpperCase()}
JURISDICTION: ${tpl.jurisdiction}

GOVERNING STATUTES & AUTHORITIES:
${tpl.governingLaw.map((law, idx) => `  [${idx + 1}] ${law}`).join('\n')}

CORE LEGAL ISSUES RAISED:
${tpl.coreLegalIssues.map((issue, idx) => `  * ${issue}`).join('\n')}

======================================================================
MODEL PLEADING TEXT:
======================================================================

${pleadingContent}

======================================================================
COURT FILING & PROCEDURAL GUIDANCE:
======================================================================
${tpl.practicalFilingGuidance}
Generated via S-T-E-A-R Reality Justice Hub & Procedural Simulator
`;

    navigator.clipboard.writeText(fullBriefText).then(() => {
      setCopiedId(tpl.id);
      sound.playSuccess();
      setTimeout(() => setCopiedId(null), 3000);
    });
  };

  // Print / Export Plain Text
  const handleExportBrief = (tpl: CaseStudyTemplate) => {
    sound.playClick();
    const pleadingContent = getPopulatedPleadingText(tpl);
    const element = document.createElement('a');
    const file = new Blob([pleadingContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${tpl.id}_legal_draft.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const totalItemsCount = LAW_LIBRARY_TERMS.length + CASE_STUDY_TEMPLATES.length;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Law Library Top Banner & Search */}
      <div className="bg-slate-900/90 border border-emerald-500/30 rounded-3xl p-6 sm:p-7 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <Scale className="w-3.5 h-3.5 text-emerald-400" />
              S-T-E-A-R Legal Research &amp; Briefcase
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
              <span>Searchable Law Library</span>
              <span className="text-xs font-mono font-bold px-2.5 py-1 bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 rounded-full">
                {CASE_STUDY_TEMPLATES.length} Dispute Templates · {LAW_LIBRARY_TERMS.length} Legal Terms
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Browse authentic statutory authorities, court pleadings, and legal definitions addressing real-world{' '}
              <strong className="text-cyan-300 font-semibold">aeronautical disputes</strong> (FAA Part 107 drone airspace,
              prior art patent defense, AIR21 whistleblower safety) and{' '}
              <strong className="text-amber-300 font-semibold">community disputes</strong> (car rental bailment defense,
              illegal lockouts, Fair Housing zoning, Michigan Clean Slate expungement).
            </p>
          </div>

          {/* Quick Mastery & Briefcase Stats */}
          <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-4 shrink-0 max-w-sm w-full space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
                <span>Law Mastery Tracker</span>
              </span>
              <span className="font-mono text-emerald-400 font-bold">
                {masteredIds.length} / {totalItemsCount} Mastered
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-500 to-cyan-400 h-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.round((masteredIds.length / totalItemsCount) * 100))}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/80">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Redemption Bonus:</span>
                <strong className="text-amber-300 font-mono">+{masteredIds.length * 15} pts</strong>
              </span>
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveSubTab('bookmarks');
                }}
                className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold cursor-pointer"
              >
                <Bookmark className="w-3 h-3" />
                <span>{bookmarkedIds.length} Saved</span>
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar & Primary Filters */}
        <div className="mt-6 pt-5 border-t border-slate-800 space-y-4">
          <div className="flex flex-col md:flex-row items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search legal terminology, statutes (e.g. 49 U.S.C. § 40103, MCL 750.413), case templates, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sub-Tab View Mode Selector */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0 w-full md:w-auto overflow-x-auto">
              {[
                { id: 'all', label: `All (${filteredTerms.length + filteredTemplates.length})`, icon: LayersIcon },
                { id: 'templates', label: `Case Templates (${filteredTemplates.length})`, icon: FileText },
                { id: 'terms', label: `Legal Terms (${filteredTerms.length})`, icon: BookOpen },
                { id: 'bookmarks', label: `Saved (${bookmarkedIds.length})`, icon: Bookmark },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    sound.playClick();
                    setActiveSubTab(tab.id as any);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                    activeSubTab === tab.id
                      ? 'bg-emerald-500 text-slate-950 shadow'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <tab.icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Domain Category Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 shrink-0 flex items-center gap-1">
              <Filter className="w-3 h-3 text-emerald-400" />
              <span>Dispute Domain:</span>
            </span>

            {[
              { id: 'all', label: 'All Disputes & Laws' },
              { id: 'aeronautical', label: '✈️ Aeronautical & FAA Regulations', highlight: 'border-cyan-500/40 text-cyan-300' },
              { id: 'community', label: '🏘️ Community & Municipal Disputes', highlight: 'border-amber-500/40 text-amber-300' },
              { id: 'civil_rights', label: '⚖️ Civil Rights & Criminal Defense', highlight: 'border-rose-500/40 text-rose-300' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedDisputeFilter(cat.id as any);
                }}
                className={`px-3 py-1 rounded-full font-medium transition-all cursor-pointer whitespace-nowrap text-xs border ${
                  selectedDisputeFilter === cat.id
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold shadow'
                    : 'bg-slate-950/80 text-slate-300 hover:text-white border-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================== */}
      {/* SECTION 1: CASE STUDY TEMPLATES (Aeronautical & Community) */}
      {/* ========================================================== */}
      {(activeSubTab === 'all' || activeSubTab === 'templates' || activeSubTab === 'bookmarks') && (
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-white tracking-tight flex items-center gap-2">
                  <span>Real-World Case Study Pleading Templates</span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-cyan-950 text-cyan-300 border border-cyan-500/40 rounded-full">
                    {filteredTemplates.length} Available
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  Model motions, briefs, and administrative complaints ready to review, customize, and copy.
                </p>
              </div>
            </div>

            {onOpenMentorChat && (
              <button
                onClick={() => {
                  sound.playClick();
                  onOpenMentorChat('Can you guide me through analyzing legal briefs for aeronautical and community disputes?');
                }}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg text-xs font-semibold text-cyan-300 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Ask Legal Mentor</span>
              </button>
            )}
          </div>

          {filteredTemplates.length === 0 ? (
            <div className="p-8 text-center bg-slate-900/60 rounded-2xl border border-slate-800 text-slate-400 text-xs">
              No dispute case study templates match your current filter. Try selecting &quot;All Disputes&quot; or clearing your search term.
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredTemplates.map((template) => {
                const isAero = template.disputeType === 'aeronautical';
                const isCommunity = template.disputeType === 'community';
                const isCivil = template.disputeType === 'civil_rights';
                const isBookmarked = bookmarkedIds.includes(template.id);
                const isMastered = masteredIds.includes(template.id);
                const isCopied = copiedId === template.id;

                return (
                  <div
                    key={template.id}
                    className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 space-y-4 shadow-lg transition-all flex flex-col justify-between group"
                  >
                    <div className="space-y-3">
                      {/* Card Header badges */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 border ${
                              isAero
                                ? 'bg-cyan-950/80 text-cyan-300 border-cyan-500/40'
                                : isCommunity
                                ? 'bg-amber-950/80 text-amber-300 border-amber-500/40'
                                : 'bg-rose-950/80 text-rose-300 border-rose-500/40'
                            }`}
                          >
                            {isAero && <Plane className="w-3 h-3" />}
                            {isCommunity && <Home className="w-3 h-3" />}
                            {isCivil && <Shield className="w-3 h-3" />}
                            <span>{template.categoryLabel}</span>
                          </span>

                          {isMastered && (
                            <span className="px-2 py-0.5 bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 rounded-md text-[9px] font-mono font-bold flex items-center gap-1">
                              <CheckCircle2 className="w-2.5 h-2.5" />
                              <span>Mastered</span>
                            </span>
                          )}
                        </div>

                        {/* Bookmark Button */}
                        <button
                          onClick={(e) => handleToggleBookmark(template.id, e)}
                          title={isBookmarked ? 'Remove from Saved' : 'Save to Briefcase'}
                          className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                            isBookmarked
                              ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          {isBookmarked ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                        </button>
                      </div>

                      {/* Template Title */}
                      <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug">
                        {template.title}
                      </h4>

                      {/* Jurisdiction */}
                      <div className="text-[11px] text-slate-400 flex items-center gap-1.5 font-mono">
                        <Gavel className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                        <span className="truncate">{template.jurisdiction}</span>
                      </div>

                      {/* Summary */}
                      <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                        {template.summary}
                      </p>

                      {/* Core Legal Issues */}
                      <div className="space-y-1 pt-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Core Issues:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {template.coreLegalIssues.slice(0, 3).map((issue, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 bg-slate-950 rounded text-[10px] text-slate-300 border border-slate-800 truncate max-w-full"
                            >
                              • {issue}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Governing Law Pills */}
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Governing Law &amp; Precedent:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {template.governingLaw.map((law, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 bg-indigo-950/50 text-indigo-300 rounded text-[10px] font-mono border border-indigo-500/30"
                            >
                              {law}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                      <button
                        onClick={() => {
                          sound.playClick();
                          setActiveTemplate(template);
                          handleMarkMastered(template.id, template.title);
                        }}
                        className="px-3.5 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow transition-all"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Read &amp; Customize Brief</span>
                      </button>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleCopyBrief(template)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold border flex items-center gap-1.5 cursor-pointer transition-all ${
                            isCopied
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                              : 'bg-slate-950 text-slate-300 hover:text-white border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{isCopied ? 'Copied!' : 'Copy'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ========================================================== */}
      {/* SECTION 2: LEGAL TERMINOLOGY GLOSSARY                      */}
      {/* ========================================================== */}
      {(activeSubTab === 'all' || activeSubTab === 'terms' || activeSubTab === 'bookmarks') && (
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-white tracking-tight flex items-center gap-2">
                  <span>Real-World Legal Terminology &amp; Doctrines</span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-500/40 rounded-full">
                    {filteredTerms.length} Definitions
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  Searchable plain-English definitions, statutory citations, and practical application examples.
                </p>
              </div>
            </div>
          </div>

          {filteredTerms.length === 0 ? (
            <div className="p-8 text-center bg-slate-900/60 rounded-2xl border border-slate-800 text-slate-400 text-xs">
              No legal terminology matches your current search criteria.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTerms.map((term) => {
                const isBookmarked = bookmarkedIds.includes(term.id);
                const isMastered = masteredIds.includes(term.id);

                return (
                  <div
                    key={term.id}
                    className="bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 rounded-2xl p-5 space-y-3.5 shadow-md flex flex-col justify-between transition-all group"
                  >
                    <div className="space-y-2.5">
                      {/* Top Header */}
                      <div className="flex items-start justify-between gap-2">
                        <span className="px-2 py-0.5 bg-slate-950 border border-slate-800 rounded-md text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          {term.category}
                        </span>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={(e) => handlePronounce(term, e)}
                            title="Listen to pronunciation"
                            className="p-1 rounded bg-slate-950 border border-slate-800 text-slate-400 hover:text-emerald-300 transition-colors cursor-pointer"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={(e) => handleToggleBookmark(term.id, e)}
                            title={isBookmarked ? 'Remove Bookmark' : 'Save to Briefcase'}
                            className={`p-1 rounded border transition-colors cursor-pointer ${
                              isBookmarked
                                ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                            }`}
                          >
                            {isBookmarked ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>

                      {/* Term & Pronunciation */}
                      <div>
                        <h4 className="text-sm sm:text-base font-black text-white group-hover:text-emerald-300 transition-colors">
                          {term.term}
                        </h4>
                        {term.pronunciation && (
                          <div className="text-[11px] text-slate-400 font-mono italic">
                            [{term.pronunciation}]
                          </div>
                        )}
                      </div>

                      {/* Plain English Highlight */}
                      <div className="p-3 bg-amber-950/20 border border-amber-500/30 rounded-xl space-y-1">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          <span>In Plain English:</span>
                        </div>
                        <p className="text-xs text-amber-100/90 leading-relaxed">
                          {term.plainEnglishDefinition}
                        </p>
                      </div>

                      {/* Formal Legal Definition */}
                      <div className="space-y-1">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Formal Definition &amp; Statute:
                        </div>
                        <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                          {term.formalLegalDefinition}
                        </p>
                        <div className="text-[10px] font-mono text-indigo-300 bg-indigo-950/40 px-2 py-0.5 rounded border border-indigo-500/30 truncate">
                          {term.statutoryOrRegulatoryCitation}
                        </div>
                      </div>

                      {/* Real-World Application */}
                      <div className="text-[11px] text-slate-400 space-y-0.5">
                        <strong className="text-slate-300">Application: </strong>
                        <span className="line-clamp-2">{term.realWorldApplication}</span>
                      </div>
                    </div>

                    {/* Bottom Action */}
                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
                      <button
                        onClick={() => {
                          sound.playClick();
                          setActiveTerm(term);
                          handleMarkMastered(term.id, term.term);
                        }}
                        className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
                      >
                        <span>Examine Deep Dive &amp; Case Context</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>

                      {isMastered ? (
                        <span className="text-[10px] text-emerald-400 font-mono font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Mastered (+15 pts)</span>
                        </span>
                      ) : (
                        <button
                          onClick={(e) => handleMarkMastered(term.id, term.term, e)}
                          className="px-2 py-0.5 bg-slate-950 hover:bg-emerald-950 border border-slate-800 hover:border-emerald-500/40 rounded text-[10px] font-semibold text-slate-300 hover:text-emerald-300 cursor-pointer transition-colors"
                        >
                          Mark Learned
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ========================================================== */}
      {/* MODAL / DRAWER: DETAILED CASE STUDY TEMPLATE & CUSTOMIZER  */}
      {/* ========================================================== */}
      {activeTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
          <div className="bg-slate-900 border-2 border-emerald-500/40 rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 bg-slate-950 border-b border-slate-800 flex items-start justify-between gap-4 shrink-0">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 bg-emerald-950 border border-emerald-500/40 text-emerald-300 rounded text-[10px] font-bold uppercase tracking-wider">
                    {activeTemplate.categoryLabel}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{activeTemplate.jurisdiction}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-white">{activeTemplate.title}</h3>
              </div>

              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTemplate(null);
                }}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 cursor-pointer transition-colors shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-5 sm:p-6 space-y-6 overflow-y-auto flex-1 text-xs sm:text-sm">
              {/* Summary Box */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <div className="font-bold text-slate-300 flex items-center gap-2 text-xs uppercase tracking-wider">
                  <BookOpen className="w-4 h-4 text-emerald-400" />
                  <span>Case Dispute Summary &amp; Background:</span>
                </div>
                <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                  {activeTemplate.summary}
                </p>
              </div>

              {/* Legal Issues & Governing Law */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <div className="font-bold text-slate-300 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                    <Scale className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Core Legal Issues Raised:</span>
                  </div>
                  <ul className="space-y-1 text-slate-300">
                    {activeTemplate.coreLegalIssues.map((issue, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-cyan-400 font-bold">•</span>
                        <span>{issue}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <div className="font-bold text-slate-300 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                    <Gavel className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Governing Statutes &amp; Precedents:</span>
                  </div>
                  <ul className="space-y-1.5 text-slate-300">
                    {activeTemplate.governingLaw.map((law, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 font-mono text-[11px] text-indigo-300">
                        <span className="text-indigo-400 font-bold font-sans">§</span>
                        <span>{law}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Mode Toggle: Standard Model vs. Interactive Customizer */}
              <div className="flex items-center justify-between border-t border-slate-800 pt-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      sound.playClick();
                      setIsCustomizing(false);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      !isCustomizing
                        ? 'bg-emerald-500 text-slate-950 shadow'
                        : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    Standard Model Pleading
                  </button>

                  <button
                    onClick={() => {
                      sound.playClick();
                      setIsCustomizing(true);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      isCustomizing
                        ? 'bg-cyan-500 text-slate-950 shadow font-black'
                        : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Interactive Case Customizer</span>
                  </button>
                </div>

                <span className="text-[11px] text-slate-400 hidden sm:inline">
                  {isCustomizing ? 'Customizing variables live in pleading' : 'Standard statutory verbatim text'}
                </span>
              </div>

              {/* Interactive Customizer Inputs (when active) */}
              {isCustomizing && (
                <div className="p-4 bg-cyan-950/20 border border-cyan-500/40 rounded-2xl space-y-3 animate-fadeIn text-xs">
                  <div className="font-bold text-cyan-300 text-xs flex items-center gap-1.5">
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Live Case Customizer: Substitute Your Real-World Information</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Petitioner / Plaintiff Name</label>
                      <input
                        type="text"
                        value={customPetitioner}
                        onChange={(e) => setCustomPetitioner(e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-400 font-mono text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Respondent / Opposing Party</label>
                      <input
                        type="text"
                        value={customRespondent}
                        onChange={(e) => setCustomRespondent(e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-400 font-mono text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Docket / Case Number</label>
                      <input
                        type="text"
                        value={customDocket}
                        onChange={(e) => setCustomDocket(e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-400 font-mono text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Date of Incident</label>
                      <input
                        type="text"
                        value={customIncidentDate}
                        onChange={(e) => setCustomIncidentDate(e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-400 font-mono text-xs"
                      />
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Evidence Exhibits (Semicolon separated)</label>
                      <input
                        type="text"
                        value={customExhibits}
                        onChange={(e) => setCustomExhibits(e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-400 font-mono text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Full Formal Caption & Pleading Box */}
              <div className="border border-slate-700 bg-slate-950 rounded-2xl p-5 space-y-4 font-mono text-xs shadow-inner">
                {/* Court Caption Header */}
                <div className="border-b border-slate-800 pb-4 space-y-2 text-center text-slate-200">
                  <div className="font-bold text-indigo-400 whitespace-pre-line text-xs uppercase tracking-wider">
                    {activeTemplate.captionHeader.court}
                  </div>
                  <div className="flex flex-col sm:flex-row items-center justify-between text-left text-[11px] pt-2 border-t border-slate-800/60 gap-2">
                    <div>
                      <div className="font-bold text-emerald-300">
                        {isCustomizing ? customPetitioner.toUpperCase() + ', Petitioner,' : activeTemplate.captionHeader.plaintiffOrPetitioner}
                      </div>
                      <div className="text-slate-400 text-[10px]">v.</div>
                      <div className="font-bold text-rose-300">
                        {isCustomizing ? customRespondent + ', Respondent.' : activeTemplate.captionHeader.defendantOrRespondent}
                      </div>
                    </div>
                    <div className="text-right text-slate-400 font-mono text-[10px] sm:max-w-xs">
                      <div>{isCustomizing ? customDocket : activeTemplate.captionHeader.caseOrDocketNumber}</div>
                      <div className="text-amber-300 font-bold uppercase">{activeTemplate.captionHeader.documentTitle}</div>
                    </div>
                  </div>
                </div>

                {/* Verbatim Pleading Body */}
                <div className="whitespace-pre-line text-slate-200 leading-relaxed text-[11px] sm:text-xs max-h-96 overflow-y-auto pr-2 font-mono">
                  {getPopulatedPleadingText(activeTemplate)}
                </div>
              </div>

              {/* Practical Filing Guidance Box */}
              <div className="p-4 bg-indigo-950/30 border border-indigo-500/30 rounded-2xl space-y-1.5 text-xs">
                <div className="font-bold text-indigo-300 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                  <Compass className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Where &amp; How to File This Document:</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {activeTemplate.practicalFilingGuidance}
                </p>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyBrief(activeTemplate)}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow transition-all"
                >
                  {copiedId === activeTemplate.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedId === activeTemplate.id ? 'Copied Full Brief!' : 'Copy Full Pleading to Clipboard'}</span>
                </button>

                <button
                  onClick={() => handleExportBrief(activeTemplate)}
                  className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all"
                >
                  <Download className="w-4 h-4 text-cyan-400" />
                  <span>Download .txt Draft</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleBookmark(activeTemplate.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold border flex items-center gap-1.5 cursor-pointer transition-colors ${
                    bookmarkedIds.includes(activeTemplate.id)
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                      : 'bg-slate-900 text-slate-300 hover:text-white border-slate-800'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>{bookmarkedIds.includes(activeTemplate.id) ? 'Saved in Briefcase' : 'Save to Briefcase'}</span>
                </button>

                <button
                  onClick={() => {
                    sound.playClick();
                    setActiveTemplate(null);
                  }}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-bold cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================== */}
      {/* MODAL: DETAILED LEGAL TERM DEEP-DIVE                      */}
      {/* ========================================================== */}
      {activeTerm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
          <div className="bg-slate-900 border-2 border-emerald-500/40 rounded-3xl max-w-2xl w-full flex flex-col shadow-2xl overflow-hidden my-auto">
            {/* Term Header */}
            <div className="p-5 sm:p-6 bg-slate-950 border-b border-slate-800 flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 bg-emerald-950 border border-emerald-500/40 text-emerald-300 rounded text-[10px] font-bold uppercase tracking-wider">
                    {activeTerm.category}
                  </span>
                  {activeTerm.pronunciation && (
                    <span className="text-xs text-slate-400 font-mono italic">[{activeTerm.pronunciation}]</span>
                  )}
                </div>
                <h3 className="text-xl font-black text-white flex items-center gap-2">
                  <span>{activeTerm.term}</span>
                  <button
                    onClick={() => handlePronounce(activeTerm)}
                    title="Pronounce aloud"
                    className="p-1 rounded bg-slate-900 hover:bg-slate-800 text-emerald-400 cursor-pointer"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </h3>
              </div>

              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTerm(null);
                }}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Term Details Body */}
            <div className="p-5 sm:p-6 space-y-4 overflow-y-auto text-xs sm:text-sm">
              <div className="p-4 bg-amber-950/20 border border-amber-500/30 rounded-2xl space-y-1.5">
                <div className="font-bold text-amber-400 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Plain-English Meaning:</span>
                </div>
                <p className="text-amber-100 leading-relaxed">{activeTerm.plainEnglishDefinition}</p>
              </div>

              <div className="space-y-1.5 p-4 bg-slate-950 rounded-2xl border border-slate-800">
                <div className="font-bold text-slate-400 text-xs uppercase tracking-wider">
                  Formal Legal &amp; Statutory Definition:
                </div>
                <p className="text-slate-200 leading-relaxed">{activeTerm.formalLegalDefinition}</p>
                <div className="mt-2 text-indigo-300 font-mono text-xs bg-indigo-950/50 p-2 rounded-xl border border-indigo-500/30">
                  <strong>Citation: </strong>
                  {activeTerm.statutoryOrRegulatoryCitation}
                </div>
              </div>

              <div className="space-y-1.5 p-4 bg-slate-950 rounded-2xl border border-slate-800">
                <div className="font-bold text-cyan-400 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Real-World S-T-E-A-R &amp; Detroit Community Context:</span>
                </div>
                <p className="text-slate-300 leading-relaxed">{activeTerm.realWorldApplication}</p>
              </div>

              <div className="space-y-1.5 p-4 bg-slate-950 rounded-2xl border border-slate-800">
                <div className="font-bold text-emerald-400 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <FileCheck className="w-3.5 h-3.5" />
                  <span>Concrete Scenario Example:</span>
                </div>
                <p className="text-slate-300 leading-relaxed italic">{activeTerm.exampleScenario}</p>
              </div>
            </div>

            {/* Term Footer */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => handleToggleBookmark(activeTerm.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border flex items-center gap-1.5 cursor-pointer ${
                  bookmarkedIds.includes(activeTerm.id)
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                    : 'bg-slate-900 text-slate-300 hover:text-white border-slate-800'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>{bookmarkedIds.includes(activeTerm.id) ? 'Saved' : 'Save to Briefcase'}</span>
              </button>

              <div className="flex items-center gap-2">
                {onOpenMentorChat && (
                  <button
                    onClick={() => {
                      sound.playClick();
                      setActiveTerm(null);
                      onOpenMentorChat(`Can you explain the doctrine of "${activeTerm.term}" and how it applies in legal practice?`);
                    }}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Ask Mentor</span>
                  </button>
                )}
                <button
                  onClick={() => {
                    sound.playClick();
                    setActiveTerm(null);
                  }}
                  className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl text-xs font-black cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper icon
function LayersIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}
