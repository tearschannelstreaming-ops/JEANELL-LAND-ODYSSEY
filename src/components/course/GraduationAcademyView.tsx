import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  Award,
  BookOpen,
  Calculator,
  Atom,
  Globe,
  Cpu,
  Languages,
  Wrench,
  Compass,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Volume2,
  Printer,
  X,
  FileCheck,
  Check,
  Shield,
  Layers,
  Star,
  Users,
  Laptop,
  Moon,
  Scan,
  ShieldCheck,
} from 'lucide-react';
import { StudentProfile, PlayerStats } from '../../types/game';
import {
  EDUCATIONAL_COURSES_DATA,
  DIPLOMA_CREDENTIALS,
  EducationalTier,
  EducationalCourseGame,
  DiplomaCredential,
} from '../../data/k12AndTradeGraduationData';
import { sound } from '../../utils/audio';

interface GraduationAcademyViewProps {
  profile: StudentProfile;
  onUpdateProfile: (newProfile: StudentProfile) => void;
  playerStats: PlayerStats;
  onUpdateStats: (delta: Partial<PlayerStats>) => void;
  onOpenMentorChat?: (questionText?: string) => void;
  onOpenCourseSale?: () => void;
}

export const GraduationAcademyView: React.FC<GraduationAcademyViewProps> = ({
  profile,
  onUpdateProfile,
  playerStats,
  onUpdateStats,
  onOpenMentorChat,
  onOpenCourseSale,
}) => {
  // Active Educational Tier
  const [selectedTier, setSelectedTier] = useState<EducationalTier>('elementary');

  // Active Subject Filter within Tier
  const [subjectFilter, setSubjectFilter] = useState<string>('all');

  // Active Game Selected to Play
  const [activeGameId, setActiveGameId] = useState<string>(EDUCATIONAL_COURSES_DATA[0].id);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);

  // Completed Course Game IDs (persisted in localStorage)
  const [completedGameIds, setCompletedGameIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('steareality_completed_course_games');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Diploma Modal to View/Print
  const [viewingDiploma, setViewingDiploma] = useState<DiplomaCredential | null>(null);

  // 100% Virtual Night School Mode (24/7 Hours · Ages 4.5 to 90+)
  const [isNightSchoolMode, setIsNightSchoolMode] = useState<boolean>(profile.isNightSchool || false);
  const [showGrantLaptopModal, setShowGrantLaptopModal] = useState<boolean>(false);

  // Adult Lifelong Diploma
  const adultNeverGiveUpDiploma = DIPLOMA_CREDENTIALS.find((d) => d.id === 'diploma_adult_never_give_up');

  // Find currently active game object
  const activeGame =
    EDUCATIONAL_COURSES_DATA.find((g) => g.id === activeGameId) ||
    EDUCATIONAL_COURSES_DATA.find((g) => g.tier === selectedTier) ||
    EDUCATIONAL_COURSES_DATA[0];

  // Current Diploma for Selected Tier
  const currentDiploma = DIPLOMA_CREDENTIALS.find((d) => d.tier === selectedTier);

  // Filtered games for current tier and subject
  const currentTierGames = EDUCATIONAL_COURSES_DATA.filter((g) => g.tier === selectedTier);
  const filteredGames = currentTierGames.filter(
    (g) => subjectFilter === 'all' || g.subject === subjectFilter
  );

  // Check if current diploma is earned
  const isCurrentDiplomaEarned =
    currentDiploma &&
    currentDiploma.requiredGameIds.every((id) => completedGameIds.includes(id));

  // Audio Pronunciation Helper
  const handleSpeakText = (text: string) => {
    sound.playClick();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Submit Answer
  const handleSelectOption = (optionId: string) => {
    if (hasAnswered) return;
    setSelectedOptionId(optionId);
    setHasAnswered(true);

    const option = activeGame.options.find((o) => o.id === optionId);
    if (option?.isCorrect) {
      sound.playSuccess();
      if (!completedGameIds.includes(activeGame.id)) {
        const next = [...completedGameIds, activeGame.id];
        setCompletedGameIds(next);
        localStorage.setItem('steareality_completed_course_games', JSON.stringify(next));

        onUpdateStats({
          ...option.statDelta,
          earningsBalance: (playerStats.earningsBalance || 0) + (option.cashBonus || 100),
        });
      }
    } else {
      sound.playAlert();
      if (option?.statDelta) {
        onUpdateStats(option.statDelta);
      }
    }
  };

  const handleNextGame = () => {
    sound.playClick();
    setSelectedOptionId(null);
    setHasAnswered(false);

    const currentIndex = currentTierGames.findIndex((g) => g.id === activeGame.id);
    const nextGame = currentTierGames[(currentIndex + 1) % currentTierGames.length];
    if (nextGame) {
      setActiveGameId(nextGame.id);
    }
  };

  const handleResetCurrentGame = () => {
    sound.playClick();
    setSelectedOptionId(null);
    setHasAnswered(false);
  };

  // Switch Tier
  const handleSelectTier = (tier: EducationalTier) => {
    sound.playClick();
    setSelectedTier(tier);
    setSubjectFilter('all');
    setSelectedOptionId(null);
    setHasAnswered(false);
    const firstGame = EDUCATIONAL_COURSES_DATA.find((g) => g.tier === tier);
    if (firstGame) {
      setActiveGameId(firstGame.id);
    }
  };

  // Total completed stats
  const totalCompleted = completedGameIds.length;
  const totalAvailable = EDUCATIONAL_COURSES_DATA.length;
  const completionPercentage = Math.round((totalCompleted / totalAvailable) * 100);

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 pb-16 animate-fadeIn">
      {/* Academy Top Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-indigo-950/40 to-slate-950 border-2 border-indigo-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-xs font-bold uppercase tracking-wider">
              <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
              Comprehensive Academic Graduation Pathway
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              K–12 Diplomas, CE &amp; Skilled Trades Academy
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Start with <strong>fundamental basics in math, science, English, social studies, and STEM learning</strong>.
              Progress through academic levels to complete all educational requirements to graduate with{' '}
              <strong className="text-emerald-300">Elementary</strong>,{' '}
              <strong className="text-cyan-300">Middle</strong>, and{' '}
              <strong className="text-indigo-300">High School Diplomas</strong>, followed by accredited{' '}
              <strong className="text-amber-300">Continuing Education (CE) units</strong>,{' '}
              <strong className="text-purple-300">Skilled Trades apprenticeships</strong>, and{' '}
              <strong className="text-rose-300">World Language courses</strong> (Spanish, French, ASL, Arabic) all in an interactive game format!
            </p>
          </div>

          {/* Academic Graduation Status Card */}
          <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-4 shrink-0 max-w-sm w-full space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>Overall Graduation Progress</span>
              </span>
              <span className="font-mono text-emerald-400 font-bold">
                {totalCompleted} / {totalAvailable} Courses Passed
              </span>
            </div>

            <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-500 via-cyan-400 to-indigo-500 h-full transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/80">
              <span>Student: <strong className="text-white">{profile.name}</strong></span>
              {currentDiploma && isCurrentDiplomaEarned ? (
                <button
                  onClick={() => {
                    sound.playSuccess();
                    setViewingDiploma(currentDiploma);
                  }}
                  className="px-2.5 py-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-lg text-xs flex items-center gap-1 cursor-pointer transition-transform hover:scale-105"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>View Diploma!</span>
                </button>
              ) : (
                <span className="text-amber-400 font-semibold flex items-center gap-1">
                  <span>{currentDiploma ? `${currentDiploma.requiredGameIds.filter(id => completedGameIds.includes(id)).length}/${currentDiploma.requiredGameIds.length} Req.` : 'In Progress'}</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Educational Tier Navigation Bar */}
        <div className="flex items-center gap-2 mt-6 pt-6 border-t border-slate-800/80 overflow-x-auto pb-1">
          {[
            { id: 'elementary', label: '🎒 Elementary School (K–5)', icon: BookOpen, color: 'emerald' },
            { id: 'middle', label: '📐 Middle School (6–8)', icon: Calculator, color: 'cyan' },
            { id: 'high_school', label: '🎓 High School Diploma (9–12)', icon: GraduationCap, color: 'indigo' },
            { id: 'languages', label: '🌍 World Languages (Polyglot)', icon: Languages, color: 'rose' },
            { id: 'ce_courses', label: '📜 Continuing Education (CE)', icon: Award, color: 'amber' },
            { id: 'trades', label: '🛠️ Skilled Trades & Apprenticeship', icon: Wrench, color: 'purple' },
          ].map((tier) => {
            const isSelected = selectedTier === tier.id;
            const tierGames = EDUCATIONAL_COURSES_DATA.filter((g) => g.tier === tier.id);
            const tierCompleted = tierGames.filter((g) => completedGameIds.includes(g.id)).length;
            const isTierDone = tierGames.length > 0 && tierCompleted === tierGames.length;

            return (
              <button
                key={tier.id}
                onClick={() => handleSelectTier(tier.id as EducationalTier)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap border shrink-0 ${
                  isSelected
                    ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white border-cyan-400 shadow-lg'
                    : 'bg-slate-900/90 text-slate-300 hover:text-white border-slate-800'
                }`}
              >
                <tier.icon className="w-4 h-4" />
                <span>{tier.label}</span>
                <span
                  className={`px-1.5 py-0.2 rounded text-[10px] font-mono ${
                    isTierDone
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                      : 'bg-slate-950 text-slate-400 border border-slate-800'
                  }`}
                >
                  {tierCompleted}/{tierGames.length}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 100% VIRTUAL NIGHT SCHOOL & CHARTER SCHOOL GRANT LAPTOP BANNER */}
      <div className="bg-gradient-to-r from-purple-950/60 via-slate-900 to-cyan-950/60 border border-purple-500/40 rounded-2xl p-4 sm:p-5 shadow-xl space-y-3">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-bold text-xs border border-purple-500/40 flex items-center gap-1.5">
                <Moon className="w-3.5 h-3.5 text-purple-400" />
                100% Virtual Night School
              </span>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono text-[11px] font-bold">
                Ages 4 ½ to Post-Retirement 90+
              </span>
              <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold text-[11px] flex items-center gap-1">
                <Laptop className="w-3 h-3" />
                Grant Laptop Included
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-black text-white">
              The ABC’s of Financial Literacy Academy · "Never Give Up" Self-Paced Creed
            </h3>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              Never give up — even if you are 90 years old and completing the course at your own pace, you can receive an accredited high school diploma. All students funded through public charter school grants receive a homework laptop. Adult students provide government ID and pass live facial recognition upon registration to ensure diplomas are received by the exact legal person without generational confusion (Jr., Sr., I, II).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => {
                sound.playClick();
                setIsNightSchoolMode(!isNightSchoolMode);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border ${
                isNightSchoolMode
                  ? 'bg-purple-600 hover:bg-purple-500 text-white border-purple-400 shadow-lg shadow-purple-500/20'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-700'
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
              <span>{isNightSchoolMode ? 'Night School: ACTIVE (24/7 Virtual)' : 'Enable Night School Mode'}</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setShowGrantLaptopModal(true);
              }}
              className="px-3.5 py-2 rounded-xl bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-200 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow"
            >
              <Laptop className="w-3.5 h-3.5 text-cyan-400" />
              <span>Grant Laptop Info</span>
            </button>

            {adultNeverGiveUpDiploma && (
              <button
                onClick={() => {
                  sound.playSuccess();
                  setViewingDiploma(adultNeverGiveUpDiploma);
                }}
                className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 shadow-md shadow-amber-500/20"
              >
                <Award className="w-3.5 h-3.5" />
                <span>View Adult Diploma (Ages 4.5 - 90+)</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Diploma Completion Alert Banner (When Tier is Mastered!) */}
      {isCurrentDiplomaEarned && currentDiploma && (
        <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-cyan-950/80 border-2 border-emerald-500/60 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl animate-fadeIn">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-300 shrink-0">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Requirements Satisfied · Official Credential Unlocked!</span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-white">{currentDiploma.title}</h3>
              <p className="text-xs text-slate-300">
                You have passed all required academic course games. Your official diploma is ready to examine and print.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playSuccess();
              setViewingDiploma(currentDiploma);
            }}
            className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 cursor-pointer transition-transform hover:scale-105 shrink-0"
          >
            <Printer className="w-4 h-4" />
            <span>Open &amp; Print Official Diploma</span>
          </button>
        </div>
      )}

      {/* Main Two-Column Game Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (5 Cols): Course Curriculum List & Subject Filter */}
        <div className="lg:col-span-5 space-y-3">
          {/* Subject Filter Pills */}
          <div className="flex items-center justify-between text-xs px-1">
            <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">
              Curriculum Courses ({filteredGames.length})
            </span>
            <div className="flex items-center gap-1 overflow-x-auto text-[11px]">
              {['all', 'Math', 'Science', 'English (ELA)', 'Social Studies', 'STEM Learning', 'World Languages', 'Continuing Education', 'Skilled Trades']
                .filter((subj) => subj === 'all' || currentTierGames.some((g) => g.subject === subj))
                .map((subj) => (
                  <button
                    key={subj}
                    onClick={() => {
                      sound.playClick();
                      setSubjectFilter(subj);
                    }}
                    className={`px-2 py-0.5 rounded-md font-medium cursor-pointer transition-colors ${
                      subjectFilter === subj
                        ? 'bg-indigo-500 text-slate-950 font-bold'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {subj === 'all' ? 'All' : subj}
                  </button>
                ))}
            </div>
          </div>

          {/* List of Game Cards */}
          <div className="space-y-2 max-h-[700px] overflow-y-auto pr-1">
            {filteredGames.map((game) => {
              const isSelected = game.id === activeGame.id;
              const isCompleted = completedGameIds.includes(game.id);

              return (
                <button
                  key={game.id}
                  onClick={() => {
                    sound.playClick();
                    setActiveGameId(game.id);
                    setSelectedOptionId(null);
                    setHasAnswered(false);
                  }}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 border-cyan-400 shadow-md shadow-cyan-500/10'
                      : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-900 border border-slate-800 text-cyan-300">
                          {game.subject}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">{game.gradeLevelOrCredits}</span>
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-white truncate">{game.title}</div>
                      <p className="text-[11px] text-slate-400 line-clamp-1">{game.summary}</p>
                    </div>

                    <div className="shrink-0 flex flex-col items-end gap-1.5 pt-0.5">
                      {isCompleted ? (
                        <span className="w-6 h-6 rounded-full bg-emerald-950 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
                          <Check className="w-3.5 h-3.5" />
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-400">
                          Req.
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column (7 Cols): The Playable Interactive Game Arena */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900/90 border-2 border-indigo-500/30 rounded-3xl p-6 sm:p-7 shadow-xl space-y-5">
            {/* Game Card Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 bg-indigo-950 border border-indigo-500/40 text-indigo-300 rounded text-[10px] font-bold uppercase tracking-wider">
                    {activeGame.tierLabel}
                  </span>
                  <span className="px-2 py-0.5 bg-slate-950 border border-slate-800 text-slate-400 rounded text-[10px] font-mono">
                    {activeGame.gradeLevelOrCredits}
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-black text-white">{activeGame.title}</h2>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                {activeGame.tier === 'languages' && (
                  <button
                    onClick={() => handleSpeakText(activeGame.gamePrompt)}
                    title="Pronounce passage aloud"
                    className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-rose-300 cursor-pointer transition-colors"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                )}
                {onOpenMentorChat && (
                  <button
                    onClick={() => {
                      sound.playClick();
                      onOpenMentorChat(`Can you explain the educational principles behind "${activeGame.title}"?`);
                    }}
                    className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-semibold text-cyan-300 flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Ask Mentor</span>
                  </button>
                )}
              </div>
            </div>

            {/* Interactive Game Prompt */}
            <div className="space-y-3">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Interactive Problem Challenge:</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                  {activeGame.gamePrompt}
                </p>

                {activeGame.codeOrEquation && (
                  <div className="p-2.5 bg-indigo-950/40 border border-indigo-500/30 rounded-xl text-xs font-mono text-cyan-300">
                    <strong>Formula / Protocol: </strong> {activeGame.codeOrEquation}
                  </div>
                )}
              </div>

              {/* Multiple Choice Options */}
              <div className="space-y-2.5">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Select the Correct Solution or Procedure:
                </div>

                {activeGame.options.map((option) => {
                  const isSelected = selectedOptionId === option.id;
                  let borderClass = 'border-slate-800 hover:border-slate-700 bg-slate-950/70 text-slate-200';

                  if (hasAnswered) {
                    if (option.isCorrect) {
                      borderClass = 'border-emerald-500/70 bg-emerald-950/30 text-emerald-200';
                    } else if (isSelected && !option.isCorrect) {
                      borderClass = 'border-rose-500/70 bg-rose-950/30 text-rose-200';
                    } else {
                      borderClass = 'border-slate-800/40 bg-slate-950/30 text-slate-500';
                    }
                  } else if (isSelected) {
                    borderClass = 'border-cyan-400 bg-cyan-950/40 text-cyan-200';
                  }

                  return (
                    <button
                      key={option.id}
                      onClick={() => handleSelectOption(option.id)}
                      disabled={hasAnswered}
                      className={`w-full text-left p-3.5 rounded-2xl border transition-all text-xs sm:text-sm flex items-start gap-3 cursor-pointer ${borderClass}`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 text-[11px] font-bold ${
                          hasAnswered && option.isCorrect
                            ? 'border-emerald-400 text-emerald-400'
                            : isSelected && hasAnswered && !option.isCorrect
                            ? 'border-rose-400 text-rose-400'
                            : 'border-slate-700 text-slate-400'
                        }`}
                      >
                        {hasAnswered && option.isCorrect ? '✓' : isSelected && !option.isCorrect ? '✗' : '•'}
                      </div>
                      <div className="flex-1 leading-snug">{option.text}</div>
                    </button>
                  );
                })}
              </div>

              {/* Feedback and Scientific / Legal Explanations */}
              {hasAnswered && (
                <div className="space-y-3 animate-fadeIn pt-2">
                  {selectedOptionId && activeGame.options.find((o) => o.id === selectedOptionId)?.isCorrect ? (
                    <div className="p-4 bg-emerald-950/40 border border-emerald-500/40 rounded-2xl space-y-1.5 text-xs text-emerald-200">
                      <div className="font-bold flex items-center gap-1.5 text-emerald-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Correct Solution! Course Standard Mastered</span>
                      </div>
                      <p className="leading-relaxed">
                        {activeGame.options.find((o) => o.id === selectedOptionId)?.explanation}
                      </p>
                      <div className="text-[11px] text-emerald-400 font-mono pt-1">
                        +15 Resilience · +10 STEAM Mastery · +$100 Cash Bonus Credited!
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 bg-rose-950/40 border border-rose-500/40 rounded-2xl space-y-1.5 text-xs text-rose-200">
                      <div className="font-bold flex items-center gap-1.5 text-rose-300">
                        <span>Review Required:</span>
                      </div>
                      <p className="leading-relaxed">
                        {activeGame.options.find((o) => o.id === selectedOptionId)?.explanation ||
                          'Incorrect solution. Review the formula and real-world takeaways below.'}
                      </p>
                      <button
                        onClick={handleResetCurrentGame}
                        className="px-3 py-1 bg-rose-900 hover:bg-rose-800 text-white rounded-lg text-xs font-bold cursor-pointer transition-colors mt-1"
                      >
                        Try Again
                      </button>
                    </div>
                  )}

                  {/* Context and Key Takeaway */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                      <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">
                        Real-World Detroit Connection:
                      </span>
                      <p className="text-slate-300 text-[11px] leading-relaxed">
                        {activeGame.realWorldConnection}
                      </p>
                    </div>

                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                      <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                        Educational Standard &amp; Code:
                      </span>
                      <p className="text-slate-300 text-[11px] leading-relaxed font-mono">
                        {activeGame.diplomaRequirement}
                      </p>
                    </div>
                  </div>

                  {/* Next Lesson / Course Action */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={handleResetCurrentGame}
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Replay Problem</span>
                    </button>

                    <button
                      onClick={handleNextGame}
                      className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-400 hover:to-cyan-400 text-slate-950 font-black rounded-xl text-xs flex items-center gap-2 cursor-pointer shadow transition-all"
                    >
                      <span>Proceed to Next Course Challenge</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================== */}
      {/* MODAL: OFFICIAL ORNATE DIPLOMA & CREDENTIAL DISPLAY        */}
      {/* ========================================================== */}
      {viewingDiploma && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
          <div className="bg-slate-900 border-2 border-amber-500/40 rounded-3xl max-w-3xl w-full p-6 sm:p-10 shadow-2xl space-y-5 relative overflow-hidden my-auto">
            {/* Close Button */}
            <button
              onClick={() => {
                sound.playClick();
                setViewingDiploma(null);
              }}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-950 text-slate-400 hover:text-white border border-slate-800 cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Credential Mode Switcher for High School Level */}
            {viewingDiploma.tier === 'high_school' && (
              <div className="flex flex-wrap items-center justify-center gap-2 pt-1 pb-2">
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    const stdDip = DIPLOMA_CREDENTIALS.find((d) => d.id === 'diploma_high_school');
                    if (stdDip) setViewingDiploma(stdDip);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    viewingDiploma.id === 'diploma_high_school'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  Standard High School Diploma
                </button>

                {adultNeverGiveUpDiploma && (
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setViewingDiploma(adultNeverGiveUpDiploma);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      viewingDiploma.id === 'diploma_adult_never_give_up'
                        ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                        : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    <Moon className="w-3.5 h-3.5" />
                    <span>Adult &amp; Senior "Never Give Up" Diploma (Ages 4 ½ - 90+)</span>
                  </button>
                )}
              </div>
            )}

            {/* Diploma Canvas (Parchment Aesthetic) */}
            <div className="bg-gradient-to-b from-amber-50 via-amber-100/90 to-amber-50 text-slate-900 rounded-2xl p-6 sm:p-10 border-8 border-double border-amber-800/40 shadow-inner space-y-5 text-center relative select-none">
              {/* Corner Ornaments */}
              <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-amber-800" />
              <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-amber-800" />
              <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-amber-800" />
              <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-amber-800" />

              {/* Institution Header */}
              <div className="space-y-1">
                <div className="text-[11px] font-serif uppercase tracking-[0.25em] text-amber-900 font-bold">
                  {viewingDiploma.institution}
                </div>
                <div className="w-24 h-0.5 bg-amber-800/40 mx-auto my-1.5" />
                <h2 className="text-xl sm:text-2xl font-serif font-black text-amber-950 tracking-wide uppercase">
                  {viewingDiploma.title}
                </h2>
                <div className="text-xs font-serif italic text-amber-900">
                  {viewingDiploma.subTitle}
                </div>
              </div>

              {/* Recipient Conferral */}
              <div className="space-y-1.5 py-2">
                <div className="text-xs font-serif uppercase tracking-widest text-amber-800">
                  This Certifies That
                </div>
                <div className="text-2xl sm:text-3xl font-serif font-black text-amber-950 underline decoration-amber-600 decoration-1 underline-offset-8">
                  {profile.name} {profile.generationalSuffix && profile.generationalSuffix !== 'None' ? (
                    <span className="no-underline text-xl font-mono text-amber-900 font-black ml-1">
                      {profile.generationalSuffix}
                    </span>
                  ) : ''}
                </div>
                <div className="text-xs font-serif italic text-amber-900 pt-2">
                  has satisfactorily completed all required academic curricula, laboratory challenges, and civic standards with the distinction of
                </div>
                <div className="text-sm font-serif font-bold text-amber-900 uppercase tracking-wider">
                  {viewingDiploma.recipientHonor}
                </div>
              </div>

              {/* "Never Give Up" Creed Block if Adult/Senior Lifelong Diploma */}
              {(viewingDiploma.id === 'diploma_adult_never_give_up' || viewingDiploma.neverGiveUpCreedText) && (
                <div className="p-3 bg-amber-900/10 border border-amber-800/30 rounded-xl space-y-1 max-w-xl mx-auto">
                  <div className="text-[10px] font-serif font-black uppercase tracking-wider text-amber-900">
                    ⭐ "Never Give Up" Creed · 100% Virtual Night School &amp; Lifelong Completion
                  </div>
                  <p className="text-xs font-serif italic text-amber-950 leading-relaxed">
                    "{viewingDiploma.neverGiveUpCreedText || 'Never give up if you are 90 years old and complete the course at your own pace can receive a high school diploma.'}"
                  </p>
                </div>
              )}

              {/* Biometric Facial Recognition & Legal Anti-Namesake Assurance */}
              {(viewingDiploma.isBiometricVerificationRequired || viewingDiploma.id === 'diploma_adult_never_give_up' || profile.age >= 18) && (
                <div className="p-2.5 bg-amber-950/10 border border-amber-800/30 rounded-xl text-left space-y-1">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-amber-950 font-bold">
                    <span className="flex items-center gap-1.5">
                      <Scan className="w-3.5 h-3.5 text-amber-900" />
                      BIOMETRIC FACE HASH: {profile.biometricHash || 'BIO-SHA256-89EC-SR-VERIFIED'}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-700 text-white font-sans text-[9px] uppercase font-bold tracking-wider">
                      ✓ Legal Namesake Bound
                    </span>
                  </div>
                  <div className="text-[9px] text-amber-900/90 leading-tight">
                    Adult Identification &amp; Biometric Face Recognition guarantee diploma is awarded to the exact legal individual — preventing inadvertent misallocation between <strong>Jr., Sr., I, II</strong>, or generational family namesakes. State Cyber Charter Registry (MCL 380.551).
                  </div>
                </div>
              )}

              {/* Bottom Signatures and Gold Foil Seal */}
              <div className="pt-4 border-t border-amber-800/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Director Signature */}
                <div className="text-left space-y-1">
                  <div className="font-serif italic text-base text-amber-950 font-bold border-b border-amber-800 pb-0.5 min-w-[170px]">
                    {viewingDiploma.signatory}
                  </div>
                  <div className="text-[10px] font-serif uppercase text-amber-900 tracking-wider">
                    {viewingDiploma.signatoryTitle}
                  </div>
                </div>

                {/* Foil Seal Icon */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-600 via-yellow-400 to-amber-600 border-4 border-amber-800 shadow-lg flex items-center justify-center text-amber-950 shrink-0 transform rotate-12">
                  <div className="text-center">
                    <Award className="w-6 h-6 mx-auto" />
                    <div className="text-[7px] font-serif font-black uppercase tracking-tighter">OFFICIAL SEAL</div>
                  </div>
                </div>

                {/* Verification Date */}
                <div className="text-right space-y-1">
                  <div className="font-mono text-xs text-amber-950 border-b border-amber-800 pb-0.5 min-w-[170px]">
                    {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                  <div className="text-[10px] font-serif uppercase text-amber-900 tracking-wider">
                    Date of Graduation &amp; Entry
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
              <span className="text-xs text-slate-400 font-mono">
                Verification ID: STR-DIP-{viewingDiploma.tier.toUpperCase()}-2026 {profile.generationalSuffix ? `· Suffix: ${profile.generationalSuffix}` : ''}
              </span>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow transition-all"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Diploma</span>
                </button>
                <button
                  onClick={() => setViewingDiploma(null)}
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
      {/* MODAL: STATE CYBER CHARTER GRANT LAPTOP PROGRAM            */}
      {/* ========================================================== */}
      {showGrantLaptopModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
          <div className="bg-slate-900 border-2 border-cyan-500/40 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden my-auto">
            {/* Close */}
            <button
              onClick={() => {
                sound.playClick();
                setShowGrantLaptopModal(false);
              }}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-950 text-slate-400 hover:text-white border border-slate-800 cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <Laptop className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-black text-white">
                    Public Charter School Grant · Free Student Laptop
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    $0 Tuition / Grant Funded
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Statutory provision under Michigan Cyber School Law (MCL 380.551 - MCL 380.561)
                </p>
              </div>
            </div>

            {/* Hardware Card */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <span className="text-xs font-bold text-white">Assigned Hardware Model:</span>
                <span className="text-xs font-mono text-cyan-400 font-bold">
                  Lenovo ThinkPad S.T.E.A.M. Homework Edition
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="space-y-1">
                  <span className="text-slate-400 text-[11px] block">Display &amp; Processing:</span>
                  <p className="text-white font-medium">15.6" Full HD (1920x1080) Anti-Glare IPS</p>
                  <p className="text-slate-300 text-[11px]">Intel Core i5 / AMD Ryzen 5 Processor</p>
                </div>

                <div className="space-y-1">
                  <span className="text-slate-400 text-[11px] block">Memory &amp; Storage:</span>
                  <p className="text-white font-medium">16GB High-Speed DDR4 RAM</p>
                  <p className="text-slate-300 text-[11px]">512GB PCIe NVMe Solid State Drive</p>
                </div>

                <div className="space-y-1">
                  <span className="text-slate-400 text-[11px] block">Camera &amp; Biometrics:</span>
                  <p className="text-white font-medium">HD 1080p Webcam with Privacy Shutter</p>
                  <p className="text-emerald-400 text-[11px]">Passes Proctored Facial Recognition for Diplomas</p>
                </div>

                <div className="space-y-1">
                  <span className="text-slate-400 text-[11px] block">Connectivity:</span>
                  <p className="text-white font-medium">Wi-Fi 6 (802.11ax) + Bluetooth 5.2</p>
                  <p className="text-slate-300 text-[11px]">LTE eSIM for Title I home connectivity</p>
                </div>
              </div>
            </div>

            {/* Preloaded Software Deck */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Preloaded Academic &amp; Homework Suite:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                {[
                  'The ABC’s of Financial Literacy',
                  'S.T.E.A.R. Flight Simulator',
                  'Contract & Legal Signer',
                  'A–Z Phonics Audio Deck',
                  'IRS 1023/990 Workshop',
                  '24/7 Night School Proctor',
                ].map((item, idx) => (
                  <div key={idx} className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-[11px] flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Close Button */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <span className="text-xs text-slate-400">
                Grant Fulfillment Status: <strong className="text-emerald-400">Ready for Shipment upon Enrollment</strong>
              </span>

              <button
                onClick={() => setShowGrantLaptopModal(false)}
                className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs cursor-pointer shadow transition-all"
              >
                Close Specification
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
