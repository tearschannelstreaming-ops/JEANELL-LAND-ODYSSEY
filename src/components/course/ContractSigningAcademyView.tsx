import React, { useState, useEffect } from 'react';
import {
  FileText,
  CheckCircle2,
  Award,
  BookOpen,
  Scale,
  Building2,
  PenTool,
  Stamp,
  ShieldAlert,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Search,
  Printer,
  ChevronRight,
  Star,
  Users,
  Check,
  AlertTriangle,
} from 'lucide-react';
import { CONTRACT_COURSES } from '../../data/contractCoursesData';
import { ContractCourse, ContractAcademicTier } from '../../types/contractEducation';
import { StudentProfile, PlayerStats } from '../../types/game';
import { sound } from '../../utils/audio';
import { ContractDocumentSignerModal } from './ContractDocumentSignerModal';
import { GraduateContractCredentialModal } from './GraduateContractCredentialModal';

interface ContractSigningAcademyViewProps {
  profile: StudentProfile;
  onUpdateProfile: (newProfile: StudentProfile) => void;
  playerStats: PlayerStats;
  onUpdateStats: (delta: Partial<PlayerStats>) => void;
  onOpenMentorChat?: (questionText?: string) => void;
  onOpenServiceElection?: () => void;
}

export const ContractSigningAcademyView: React.FC<ContractSigningAcademyViewProps> = ({
  profile,
  onUpdateProfile,
  playerStats,
  onUpdateStats,
  onOpenMentorChat,
  onOpenServiceElection,
}) => {
  const [selectedCourseCode, setSelectedCourseCode] = useState<string>('100');
  const [tierFilter, setTierFilter] = useState<'all' | ContractAcademicTier>('all');
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasAnsweredChallenge, setHasAnsweredChallenge] = useState<boolean>(false);
  const [isSignerModalOpen, setIsSignerModalOpen] = useState<boolean>(false);
  const [isCredentialModalOpen, setIsCredentialModalOpen] = useState<boolean>(false);

  // Completed Course Codes (persisted in localStorage)
  const [completedCodes, setCompletedCodes] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('steareality_completed_contract_courses');
      return saved ? JSON.parse(saved) : ['100']; // Default course 100 started
    } catch {
      return ['100'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('steareality_completed_contract_courses', JSON.stringify(completedCodes));
    } catch (e) {
      console.error(e);
    }
  }, [completedCodes]);

  const currentCourse = CONTRACT_COURSES.find((c) => c.code === selectedCourseCode) || CONTRACT_COURSES[0];

  const filteredCourses = CONTRACT_COURSES.filter(
    (c) => tierFilter === 'all' || c.tier === tierFilter
  );

  const isCurrentCourseCompleted = completedCodes.includes(currentCourse.code);

  const handleSelectOption = (optionId: string) => {
    if (hasAnsweredChallenge) return;
    setSelectedOptionId(optionId);
    setHasAnsweredChallenge(true);

    const chosen = currentCourse.interactiveChallenge.options.find((o) => o.id === optionId);
    if (chosen?.isCorrect) {
      sound.playSuccess();
      onUpdateStats({
        ...currentCourse.reward.statDelta,
        earningsBalance: (playerStats.earningsBalance || 0) + (currentCourse.reward.cashHonorarium || 50),
      });

      if (!completedCodes.includes(currentCourse.code)) {
        setCompletedCodes((prev) => [...prev, currentCourse.code]);
      }
    } else {
      sound.playError();
      onUpdateStats({ resilience: Math.max(0, (playerStats.resilience || 50) - 2) });
    }
  };

  const handleResetChallenge = () => {
    sound.playClick();
    setSelectedOptionId(null);
    setHasAnsweredChallenge(false);
  };

  const handleCompleteDocumentExecution = (docId: string) => {
    sound.playSuccess();
    if (!completedCodes.includes(currentCourse.code)) {
      setCompletedCodes((prev) => [...prev, currentCourse.code]);
      onUpdateStats({
        ...currentCourse.reward.statDelta,
        earningsBalance: (playerStats.earningsBalance || 0) + (currentCourse.reward.cashHonorarium || 50),
      });
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-10">
      {/* Academy Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/30 rounded-2xl p-5 sm:p-7 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                Grades 2 to Graduate &amp; Later Learning · Courses 100–440
              </span>
              <span className="text-xs text-cyan-300 font-mono">Jeanell Land Legal Literacy Institute</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Manuscript Penmanship to Contracts, Real Estate, 501(c)(3) &amp; Later Learning Jurisprudence
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Starting in second grade, scholars master <strong className="text-cyan-300">manuscript penmanship</strong>{' '}
              as the strict legal prerequisite to contract signing. Progress through sequential levels to master fine
              print audits, binding covenants, notary public seals, Wayne County warranty deeds, and IRS Forms{' '}
              <strong className="text-amber-300">1023-EZ, 1023, and 990</strong>. In <strong className="text-purple-300">later learning</strong>,
              master <strong className="text-white">Consumer Law, Constitutional Law, CFPB Rules, Business Law &amp; Advanced Contract Law</strong>.
            </p>
          </div>

          {/* Progress Box & Graduate Diploma Button */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center space-y-2.5 shrink-0 w-full sm:w-auto">
            <div className="flex items-center justify-between gap-3 text-xs">
              <span className="text-slate-400 font-mono">Progress:</span>
              <span className="font-bold text-amber-300 font-mono">
                {completedCodes.length} / {CONTRACT_COURSES.length} Courses
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full sm:w-44 h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <div
                style={{ width: `${(completedCodes.length / CONTRACT_COURSES.length) * 100}%` }}
                className="h-full bg-gradient-to-r from-cyan-400 via-indigo-400 to-amber-400 rounded-full transition-all duration-300"
              />
            </div>

            <button
              onClick={() => {
                sound.playClick();
                setIsCredentialModalOpen(true);
              }}
              className="w-full py-2 px-3 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20 cursor-pointer"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Graduate Credential</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tier Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-semibold">
        {[
          { id: 'all', label: 'All Courses (100–440)' },
          { id: 'elementary_manuscript', label: '2nd–5th Grade: Manuscript & Assent (100–103)' },
          { id: 'middle_binding', label: 'Middle–High: Binding Contracts & Notary (200–203)' },
          { id: 'graduate_deeds_nonprofit', label: 'Graduate: Deeds, Registered Agent & 501(c)(3) (300–310)' },
          { id: 'later_learning_jurisprudence', label: '⚖️ Later Learning: Consumer, Constitutional, CFPB, Business & Contract Law (400–440)' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              sound.playClick();
              setTierFilter(tab.id as any);
            }}
            className={`px-3 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              tierFilter === tab.id
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Course Carousel / Horizontal Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
        {filteredCourses.map((c) => {
          const isSelected = selectedCourseCode === c.code;
          const isCompleted = completedCodes.includes(c.code);
          const isLaterLearning = c.tier === 'later_learning_jurisprudence';
          return (
            <button
              key={c.code}
              onClick={() => {
                sound.playClick();
                setSelectedCourseCode(c.code);
                setSelectedOptionId(null);
                setHasAnsweredChallenge(false);
              }}
              className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col justify-between min-h-[96px] ${
                isSelected
                  ? isLaterLearning
                    ? 'bg-gradient-to-b from-purple-950 to-slate-900 border-purple-400 ring-2 ring-purple-400/40 shadow-lg'
                    : 'bg-gradient-to-b from-indigo-950 to-slate-900 border-cyan-400 ring-2 ring-cyan-400/40 shadow-lg'
                  : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-black text-white">Course {c.code}</span>
                {isCompleted ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-slate-700 shrink-0" />
                )}
              </div>

              <div className="text-[10px] text-slate-300 font-semibold line-clamp-2 my-1">
                {c.title.split(':')[1]?.trim() || c.title}
              </div>

              <div
                className={`text-[9px] font-mono rounded px-1 py-0.5 truncate ${
                  isLaterLearning
                    ? 'text-purple-300 bg-purple-950/70 border border-purple-500/30 font-bold'
                    : 'text-cyan-400 bg-cyan-950/60'
                }`}
              >
                {c.gradeLevelBadge}
              </div>
            </button>
          );
        })}
      </div>

      {/* ACTIVE COURSE DETAIL VIEW */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 sm:p-7 shadow-xl space-y-6">
        {/* Course Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                COURSE {currentCourse.code} · {currentCourse.gradeLevelBadge.toUpperCase()}
              </span>
              <span className="text-xs text-slate-400 font-mono">Statutory: {currentCourse.statutoryBasis}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">{currentCourse.title}</h2>
            <p className="text-xs sm:text-sm text-cyan-400 font-mono">{currentCourse.subtitle}</p>
          </div>

          {/* Action Launch Document Signer Pad */}
          <div className="flex items-center gap-2.5 shrink-0 w-full md:w-auto">
            <button
              onClick={() => {
                sound.playClick();
                setIsSignerModalOpen(true);
              }}
              className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer"
            >
              <PenTool className="w-4 h-4" />
              <span>Launch Document Signer &amp; Practice Pad</span>
            </button>
          </div>
        </div>

        {/* Overview & Key Competencies */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-4">
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
                Curriculum Overview
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                {currentCourse.overview}
              </p>
            </div>

            {/* Special 2nd Grade Manuscript Guide for Course 100 */}
            {currentCourse.manuscriptGuide && (
              <div className="p-4 bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-950 rounded-xl border border-indigo-500/40 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-indigo-300 font-bold font-mono">
                  <PenTool className="w-4 h-4 text-cyan-400" />
                  <span>2nd Grade Manuscript Penmanship Protocol</span>
                </div>
                <div className="text-slate-300 leading-relaxed italic font-serif">
                  "{currentCourse.manuscriptGuide.signaturePhilosophy}"
                </div>
                <ul className="space-y-1 text-slate-300 text-[11px] list-disc list-inside pt-1">
                  {currentCourse.manuscriptGuide.strokeInstructions.map((inst, idx) => (
                    <li key={idx}>{inst}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Core Competencies List */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
                Mandatory Legal Competencies
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {currentCourse.keyCompetencies.map((comp, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 bg-slate-900/60 rounded-lg border border-slate-800 text-slate-300 flex items-start gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span className="leading-snug">{comp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Sample Document Preview & Practice Launch */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4 bg-slate-900/40 p-4 rounded-xl border border-slate-800">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-1.5 font-mono">
                  <FileText className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Authentic Legal Instrument</span>
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  {currentCourse.sampleDocument.documentType.toUpperCase()}
                </span>
              </div>

              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs space-y-1.5">
                <div className="font-bold text-white font-serif">{currentCourse.sampleDocument.title}</div>
                <div className="text-[11px] text-slate-400">{currentCourse.sampleDocument.subtitle}</div>
                <div className="flex items-center justify-between text-[10px] text-cyan-400 font-mono pt-1 border-t border-slate-800">
                  <span>Filing Authority:</span>
                  <span className="text-slate-300">{currentCourse.sampleDocument.officialFilingAuthority}</span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-amber-400 font-mono">
                  <span>Notary Required:</span>
                  <span className="text-slate-300">{currentCourse.sampleDocument.notaryRequired ? 'Yes (MCL 55.287)' : 'No'}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  sound.playClick();
                  setIsSignerModalOpen(true);
                }}
                className="w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 border border-slate-700 transition-colors cursor-pointer"
              >
                <Search className="w-3.5 h-3.5 text-cyan-400" />
                <span>Examine Clauses &amp; Practice Signature</span>
              </button>
            </div>

            {/* Course Rewards Plate */}
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800/80 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-400 text-[10px] font-mono block">COMPLETION REWARD:</span>
                <span className="text-amber-300 font-bold font-mono">+{currentCourse.reward.legalStars} Stars · ${currentCourse.reward.cashHonorarium}</span>
              </div>
              <div className="flex gap-1.5 text-[10px] font-mono">
                {currentCourse.reward.statDelta.resilience && (
                  <span className="px-1.5 py-0.5 rounded bg-rose-950/80 text-rose-300 border border-rose-500/30">
                    +{currentCourse.reward.statDelta.resilience}% Res
                  </span>
                )}
                {currentCourse.reward.statDelta.financialAcumen && (
                  <span className="px-1.5 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                    +{currentCourse.reward.statDelta.financialAcumen}% Fin
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* INTERACTIVE LEGAL KNOWLEDGE CHALLENGE */}
        <div className="pt-4 border-t border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Scale className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                Course {currentCourse.code} Examination &amp; Concept Test
              </h3>
            </div>
            {hasAnsweredChallenge && (
              <button
                onClick={handleResetChallenge}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Retry Question</span>
              </button>
            )}
          </div>

          <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-3">
            <p className="text-xs sm:text-sm font-medium text-slate-200">
              {currentCourse.interactiveChallenge.prompt}
            </p>

            <div className="space-y-2">
              {currentCourse.interactiveChallenge.options.map((opt) => {
                const isSelected = selectedOptionId === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id)}
                    disabled={hasAnsweredChallenge}
                    className={`w-full text-left p-3 rounded-xl border text-xs transition-all cursor-pointer flex items-start gap-2.5 ${
                      hasAnsweredChallenge
                        ? opt.isCorrect
                          ? 'bg-emerald-950/80 border-emerald-500/60 text-emerald-200 font-semibold'
                          : isSelected
                          ? 'bg-red-950/80 border-red-500/60 text-red-200'
                          : 'bg-slate-950/40 border-slate-800/60 text-slate-500 opacity-60'
                        : 'bg-slate-950 hover:bg-slate-800/80 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="font-mono text-cyan-400 font-bold shrink-0">{opt.id.toUpperCase()}.</span>
                    <span className="leading-relaxed flex-1">{opt.text}</span>
                  </button>
                );
              })}
            </div>

            {hasAnsweredChallenge && (
              <div className="pt-2">
                {currentCourse.interactiveChallenge.options.find((o) => o.id === selectedOptionId)?.isCorrect ? (
                  <div className="p-3 bg-emerald-950/50 border border-emerald-500/40 rounded-lg text-xs text-emerald-200 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">Lawful Concept Mastered! </strong>
                      {currentCourse.interactiveChallenge.options.find((o) => o.id === selectedOptionId)?.explanation}
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-red-950/50 border border-red-500/40 rounded-lg text-xs text-red-200 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">Legal Concept Clarification: </strong>
                      {currentCourse.interactiveChallenge.options.find((o) => o.id === selectedOptionId)?.explanation}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Connection to Jeanell Land Professional Services & Non-Profit Callout */}
      <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
          <div className="space-y-0.5">
            <div className="font-bold text-white">
              Professional Legal &amp; Financial Services Integration
            </div>
            <div className="text-slate-400">
              IRS Tax Preparation (PTIN P02309637) · Real Estate Deals (DAR Broker #6504432062) · One Stop 501(c)(3)
            </div>
          </div>
        </div>

        {onOpenServiceElection && (
          <button
            onClick={() => {
              sound.playClick();
              onOpenServiceElection();
            }}
            className="px-4 py-2 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md shrink-0 cursor-pointer"
          >
            Elect Professional Retainer Services
          </button>
        )}
      </div>

      {/* Interactive Document Signer Modal */}
      <ContractDocumentSignerModal
        isOpen={isSignerModalOpen}
        onClose={() => setIsSignerModalOpen(false)}
        document={currentCourse.sampleDocument}
        studentName={profile.name}
        onCompleteExecution={handleCompleteDocumentExecution}
      />

      {/* Graduate Credential Modal */}
      <GraduateContractCredentialModal
        isOpen={isCredentialModalOpen}
        onClose={() => setIsCredentialModalOpen(false)}
        studentName={profile.name}
        completedCount={completedCodes.length}
        totalCoursesCount={CONTRACT_COURSES.length}
      />
    </div>
  );
};
