import React, { useState } from 'react';
import { CourseModule, StudentProfile, PlayerStats, UnlockedResource } from '../../types/game';
import { COURSE_CATALOG_INFO, COURSE_MODULES } from '../../data/courseData';
import { sound } from '../../utils/audio';
import {
  GraduationCap,
  BookOpen,
  Sparkles,
  Plane,
  Building2,
  Home,
  Radio,
  Wrench,
  Shield,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  MapPin,
  Clock,
  ArrowRight,
  Unlock,
  Award,
  Layers,
  Star,
  Users,
  Tv,
  Smile,
  Scale,
  Globe,
} from 'lucide-react';
import { GraduationAcademyView } from './GraduationAcademyView';
import { KidsAbcCourseView } from './KidsAbcCourseView';
import { ContractSigningAcademyView } from './ContractSigningAcademyView';
import { RegionalWorldLearningView } from './RegionalWorldLearningView';
import { KidsMotivationalMediaModal } from './KidsMotivationalMediaModal';
import { EducatorGuardianEnrollmentModal } from './EducatorGuardianEnrollmentModal';
import { KidsVideoItem, RegisteredStudent } from '../../types/kidsCourse';

interface CourseHubViewProps {
  profile: StudentProfile;
  onUpdateProfile: (newProfile: StudentProfile) => void;
  playerStats: PlayerStats;
  onUpdateStats: (delta: Partial<PlayerStats>) => void;
  onOpenCourseSale: () => void;
  onNavigateToMetaverse?: () => void;
  onOpenMentorChat?: (questionText?: string) => void;
  onOpenServiceElection?: () => void;
  initialMode?: 'kids_abc' | 'academy' | 'contracts' | 'regional' | 'masterclass';
}

export const CourseHubView: React.FC<CourseHubViewProps> = ({
  profile,
  onUpdateProfile,
  playerStats,
  onUpdateStats,
  onOpenCourseSale,
  onNavigateToMetaverse,
  onOpenMentorChat,
  onOpenServiceElection,
  initialMode = 'kids_abc',
}) => {
  // Hub Mode: 'kids_abc' (Kids ABC Foundation), 'academy' (K-12 Diplomas & Trades), 'contracts' (100-440 Legal & 501c3), 'regional' (World Regions, Biometric Read Mode & Typing), or 'masterclass' (Advanced 6 Pillars)
  const [hubMode, setHubMode] = useState<'kids_abc' | 'academy' | 'contracts' | 'regional' | 'masterclass'>(
    initialMode || (profile.ageBracket === 'junior' || profile.age < 12 ? 'kids_abc' : 'academy')
  );
  const [hubFadePhase, setHubFadePhase] = useState<'idle' | 'fade-out' | 'fade-in'>('idle');

  const switchHubModeWithFade = (nextMode: 'kids_abc' | 'academy' | 'contracts' | 'regional' | 'masterclass') => {
    if (nextMode === hubMode) return;
    setHubFadePhase('fade-out');
    window.setTimeout(() => {
      setHubMode(nextMode);
      setHubFadePhase('fade-in');
      window.setTimeout(() => {
        setHubFadePhase('idle');
      }, 240);
    }, 200);
  };

  const [selectedModuleId, setSelectedModuleId] = useState<string>(COURSE_MODULES[0].id);
  const [activeTab, setActiveTab] = useState<'syllabus' | 'scenery' | 'challenge'>('syllabus');
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

  // Kids Motivational Video Modal State
  const [isKidsMediaModalOpen, setIsKidsMediaModalOpen] = useState<boolean>(false);
  const [selectedKidsVideo, setSelectedKidsVideo] = useState<KidsVideoItem | null>(null);
  const [isIntermittentBreak, setIsIntermittentBreak] = useState<boolean>(false);

  // Educator & Guardian Student Registration Modal
  const [isEducatorModalOpen, setIsEducatorModalOpen] = useState<boolean>(false);

  // Claim reward from kids video
  const handleClaimKidsReward = (
    reward: { academicStars: number; smartCash: number; resilienceBoost: number },
    _videoId: string
  ) => {
    onUpdateStats({
      earningsBalance: (playerStats.earningsBalance || 0) + reward.smartCash,
      resilience: Math.min(100, (playerStats.resilience || 70) + reward.resilienceBoost),
      kindnessPoints: Math.min(100, (playerStats.kindnessPoints || 50) + 5),
    });
  };

  // Switch student from registration roster
  const handleSelectActiveStudent = (student: RegisteredStudent) => {
    onUpdateProfile({
      ...profile,
      name: student.fullName,
      age: student.age,
      grade: student.gradeLevel,
      ageBracket: student.age < 12 ? 'junior' : student.age < 17 ? 'teen' : 'adult',
    });
  };

  const currentModule = COURSE_MODULES.find((m) => m.id === selectedModuleId) || COURSE_MODULES[0];

  const getPillarIcon = (pillar: CourseModule['pillar']) => {
    switch (pillar) {
      case 'Aeronautical Engineering':
        return <Plane className="w-5 h-5 text-cyan-400" />;
      case 'Community Development':
        return <Building2 className="w-5 h-5 text-emerald-400" />;
      case 'Real Estate & MLS':
        return <Home className="w-5 h-5 text-amber-400" />;
      case 'Media & Broadcasting':
        return <Radio className="w-5 h-5 text-rose-400" />;
      case 'Vocational Trades':
        return <Wrench className="w-5 h-5 text-indigo-400" />;
      case 'Generational Wealth':
        return <Shield className="w-5 h-5 text-purple-400" />;
    }
  };

  const handleSelectOption = (optId: string) => {
    if (hasSubmitted) return;
    sound.playClick();
    setSelectedOptionId(optId);
  };

  const handleSubmitChallenge = () => {
    if (!selectedOptionId || hasSubmitted) return;
    sound.playClick();
    setHasSubmitted(true);

    const chosen = currentModule.interactiveChallenge.options.find((o) => o.id === selectedOptionId);
    if (!chosen) return;

    if (chosen.isCorrect) {
      sound.playSuccess();
      onUpdateStats(chosen.statDelta);
      if (chosen.unlockedResource && !profile.unlockedResourceIds.includes(chosen.unlockedResource.id)) {
        onUpdateProfile({
          ...profile,
          unlockedResourceIds: [...profile.unlockedResourceIds, chosen.unlockedResource.id],
        });
      }
    } else {
      sound.playError();
      onUpdateStats(chosen.statDelta);
    }
  };

  const handleResetChallenge = () => {
    sound.playClick();
    setSelectedOptionId(null);
    setHasSubmitted(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 pb-12 animate-fadeIn relative">
      {/* Subtle Fade-Through-Black Transition Overlay */}
      <div
        className={`pointer-events-none fixed inset-0 z-50 bg-black transition-opacity duration-200 ${
          hubFadePhase === 'fade-out'
            ? 'opacity-95'
            : hubFadePhase === 'fade-in'
              ? 'opacity-40'
              : 'opacity-0'
        }`}
      />

      {/* Academy, Kids ABC, Regional World Studio & Masterclass Hub Switcher */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 p-2.5 bg-slate-900/90 border border-slate-800 rounded-2xl shadow-lg">
        <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto pb-1 lg:pb-0">
          <button
            onClick={() => {
              sound.playClick();
              switchHubModeWithFade('kids_abc');
            }}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              hubMode === 'kids_abc'
                ? 'bg-gradient-to-r from-amber-400 via-rose-400 to-indigo-500 text-slate-950 font-black shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-white bg-slate-950/80 border border-slate-800'
            }`}
          >
            <Star className="w-4 h-4 text-amber-950 fill-amber-950" />
            <span>Kids ABC's &amp; S.T.E.A.M. World</span>
            <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-slate-950/40 text-slate-950 font-black">
              Best in the World
            </span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              switchHubModeWithFade('academy');
            }}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              hubMode === 'academy'
                ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-slate-950 font-black shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white bg-slate-950/80 border border-slate-800'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>K–12 Diplomas, CE &amp; Trades Academy</span>
            <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-slate-950/40 text-slate-200">
              Elementary to Grad
            </span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              switchHubModeWithFade('contracts');
            }}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              hubMode === 'contracts'
                ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 text-white font-black shadow-md shadow-indigo-500/20'
                : 'text-slate-400 hover:text-white bg-slate-950/80 border border-slate-800'
            }`}
          >
            <Scale className="w-4 h-4 text-cyan-300" />
            <span>Contract &amp; Law (100–440)</span>
            <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-slate-950/40 text-amber-300 font-bold">
              2nd Gr to Law
            </span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              switchHubModeWithFade('regional');
            }}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              hubMode === 'regional'
                ? 'bg-gradient-to-r from-cyan-500 via-emerald-500 to-teal-500 text-slate-950 font-black shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white bg-slate-950/80 border border-slate-800'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>World Regions, Biometric Read &amp; Typing</span>
            <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-slate-950/40 text-white font-bold">
              Camera Verified
            </span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              switchHubModeWithFade('masterclass');
            }}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              hubMode === 'masterclass'
                ? 'bg-gradient-to-r from-cyan-500 to-indigo-500 text-slate-950 font-black shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white bg-slate-950/80 border border-slate-800'
            }`}
          >
            <Plane className="w-4 h-4" />
            <span>S.T.E.A.M. 6-Pillar Masterclass</span>
            <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-slate-950/40 text-slate-200">
              101 Levels
            </span>
          </button>
        </div>

        <div className="flex items-center gap-2.5 text-xs font-semibold shrink-0 w-full lg:w-auto justify-between lg:justify-end">
          <button
            onClick={() => {
              sound.playClick();
              setIsEducatorModalOpen(true);
            }}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-cyan-500/20 cursor-pointer"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Register Students (Teachers &amp; Guardians)</span>
          </button>

          <div className="flex items-center gap-2 text-slate-400">
            <span className="hidden sm:inline">Active:</span>
            <span className="text-white font-bold bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
              {profile.name}
            </span>
          </div>
        </div>
      </div>

      {hubMode === 'kids_abc' ? (
        <KidsAbcCourseView
          profile={profile}
          onUpdateProfile={onUpdateProfile}
          playerStats={playerStats}
          onUpdateStats={onUpdateStats}
          onOpenMotivationalBreak={() => {
            setIsIntermittentBreak(true);
            setSelectedKidsVideo(null);
            setIsKidsMediaModalOpen(true);
          }}
          onOpenEducatorRegistration={() => setIsEducatorModalOpen(true)}
        />
      ) : hubMode === 'academy' ? (
        <GraduationAcademyView
          profile={profile}
          onUpdateProfile={onUpdateProfile}
          playerStats={playerStats}
          onUpdateStats={onUpdateStats}
          onOpenMentorChat={onOpenMentorChat}
          onOpenCourseSale={onOpenCourseSale}
        />
      ) : hubMode === 'contracts' ? (
        <ContractSigningAcademyView
          profile={profile}
          onUpdateProfile={onUpdateProfile}
          playerStats={playerStats}
          onUpdateStats={onUpdateStats}
          onOpenMentorChat={onOpenMentorChat}
          onOpenServiceElection={onOpenServiceElection}
        />
      ) : hubMode === 'regional' ? (
        <RegionalWorldLearningView
          playerName={profile.name}
          onRewardEarned={(statDelta, cashBonus) => {
            sound.playSuccess();
            onUpdateStats({
              ...statDelta,
              earningsBalance: cashBonus,
            });
          }}
        />
      ) : (
        <div className="space-y-6">
          {/* Top Hero Banner */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-950/60 border border-cyan-500/40 rounded-full text-xs font-bold text-cyan-300 mb-2">
                  <GraduationCap className="w-4 h-4 text-amber-400" />
                  <span>JEANELL LAND S.T.E.A.M. &amp; WEALTH MASTERCLASS</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                  Course Sceneries &amp; Masterclass Challenges
                </h1>
            <p className="text-xs md:text-sm text-slate-300 mt-2 leading-relaxed">
              Explore authentic scenarios across aeronautics fluid mechanics, Detroit non-profit administration, nationwide MLS acquisitions, and generational trusts grounded in Jeanell Land's curriculum.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => {
                sound.playClick();
                onOpenCourseSale();
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all cursor-pointer whitespace-nowrap"
            >
              <Award className="w-4 h-4 text-amber-300" />
              <span>
                {profile.isCoursePurchased
                  ? 'View 101-Level Certificate'
                  : 'Enroll in Course & Unlock All 101 Levels'}
              </span>
            </button>

            {onNavigateToMetaverse && (
              <button
                onClick={() => {
                  sound.playClick();
                  onNavigateToMetaverse();
                }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-xs transition-colors cursor-pointer whitespace-nowrap"
              >
                <Plane className="w-4 h-4 text-cyan-400" />
                <span>101-Level Metaverse Board</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Grid: Module Selector (Left) & Module Content (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: 6 Accredited Modules */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
            Course Modules (6 Core Pillars)
          </div>

          <div className="space-y-2">
            {COURSE_MODULES.map((mod) => {
              const isSelected = mod.id === selectedModuleId;
              return (
                <button
                  key={mod.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedModuleId(mod.id);
                    setActiveTab('syllabus');
                    setSelectedOptionId(null);
                    setHasSubmitted(false);
                  }}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                    isSelected
                      ? 'bg-slate-800/90 border-cyan-500/80 shadow-lg shadow-cyan-500/10'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40 text-slate-400'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 shrink-0 mt-0.5">
                      {getPillarIcon(mod.pillar)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 text-[11px]">
                        <span className="font-mono text-cyan-400 font-bold">MODULE {mod.moduleNumber}</span>
                        <span className="text-slate-500 text-[10px]">{mod.lessons.length} Lessons</span>
                      </div>
                      <div className={`text-xs font-bold truncate mt-0.5 ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                        {mod.title}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate mt-0.5">{mod.pillar}</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Module Viewports */}
        <div className="lg:col-span-8 space-y-4">
          {/* Sub-Tabs: Syllabus & Formulas | Field Trip Scenery | Interactive Challenge */}
          <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('syllabus');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'syllabus'
                  ? 'bg-cyan-600 text-white'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Syllabus &amp; Formulas</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('scenery');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'scenery'
                  ? 'bg-cyan-600 text-white'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Interactive Scenery</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('challenge');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'challenge'
                  ? 'bg-cyan-600 text-white'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Masterclass Challenge</span>
            </button>
          </div>

          {/* Tab 1: Syllabus & Formulas */}
          {activeTab === 'syllabus' && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
                  <span>MODULE {currentModule.moduleNumber} · {currentModule.pillar}</span>
                </div>
                <h2 className="text-xl font-bold text-white mt-1">{currentModule.title}</h2>
                <p className="text-xs text-slate-400 mt-0.5">{currentModule.subtitle}</p>
                <p className="text-xs text-slate-300 mt-3 leading-relaxed bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                  {currentModule.summary}
                </p>
              </div>

              {/* Lessons */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Accredited Video Lectures &amp; Applied Units
                </h3>

                <div className="space-y-3">
                  {currentModule.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="bg-slate-950 border border-slate-800/80 rounded-xl p-4 space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h4 className="text-sm font-bold text-white">{lesson.title}</h4>
                        <div className="flex items-center gap-1 text-[11px] text-slate-400">
                          <Clock className="w-3 h-3 text-cyan-400" />
                          <span>{lesson.durationMinutes} min lecture</span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed">
                        {lesson.lectureSummary}
                      </p>

                      {/* Formulas & Laws */}
                      <div className="bg-slate-900/90 rounded-lg p-3 border border-slate-800 space-y-1.5">
                        <div className="text-[11px] font-bold text-cyan-300 uppercase tracking-wider">
                          Key Scientific / Legal Formulas:
                        </div>
                        {lesson.keyFormulasOrLaws.map((formula, idx) => (
                          <div
                            key={idx}
                            className="font-mono text-xs text-emerald-300 bg-slate-950/80 px-2.5 py-1 rounded border border-slate-800/80"
                          >
                            {formula}
                          </div>
                        ))}
                      </div>

                      {/* Patentable System Insight */}
                      <div className="text-[11px] text-amber-300/90 bg-amber-950/30 border border-amber-500/30 rounded-lg p-2.5">
                        <strong>100% Patentable Architecture Note:</strong> {lesson.patentInsight}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Interactive Scenery */}
          {activeTab === 'scenery' && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>REAL-LIFE SCENERY FIELD TRIP · MODULE {currentModule.moduleNumber}</span>
                </div>
                <h2 className="text-xl font-bold text-white mt-1">
                  {currentModule.fieldTripScenery.locationName}
                </h2>
                <div className="text-xs text-slate-400 font-mono mt-0.5">
                  {currentModule.fieldTripScenery.cityState}
                </div>
              </div>

              {/* Scenery Visual Simulation Box */}
              <div className="relative rounded-xl overflow-hidden border border-slate-700 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/60 p-8 text-center space-y-4">
                <div className="inline-flex p-3 rounded-2xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-400 shadow-lg shadow-cyan-500/20">
                  {getPillarIcon(currentModule.pillar)}
                </div>
                <h3 className="text-lg font-bold text-white">
                  Field Investigation &amp; Scenery Setting
                </h3>
                <p className="text-xs text-slate-300 max-w-lg mx-auto leading-relaxed">
                  {currentModule.fieldTripScenery.historicalConnection}
                </p>

                <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl max-w-md mx-auto text-left space-y-2">
                  <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Interactive Field Task:</span>
                  </div>
                  <div className="text-xs text-slate-200">
                    {currentModule.fieldTripScenery.interactiveTask}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      sound.playSuccess();
                      setActiveTab('challenge');
                    }}
                    className="px-5 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                  >
                    Enter Scenery Challenge Now
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Interactive Challenge with Decision Consequences */}
          {activeTab === 'challenge' && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>S.T.E.A.M. &amp; WEALTH CHALLENGE · MODULE {currentModule.moduleNumber}</span>
                </div>
                <h2 className="text-xl font-bold text-white mt-1">Decision Crossroad &amp; Character Test</h2>
                <p className="text-xs text-slate-300 mt-2 bg-slate-950 p-3.5 rounded-lg border border-slate-800 leading-relaxed font-medium">
                  {currentModule.interactiveChallenge.prompt}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {currentModule.interactiveChallenge.options.map((opt) => {
                  const isSelected = selectedOptionId === opt.id;
                  let cardStyle = 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300';

                  if (hasSubmitted) {
                    if (opt.isCorrect) {
                      cardStyle = 'bg-emerald-950/40 border-emerald-500/80 text-emerald-200';
                    } else if (isSelected) {
                      cardStyle = 'bg-rose-950/40 border-rose-500/80 text-rose-200';
                    }
                  } else if (isSelected) {
                    cardStyle = 'bg-cyan-950/40 border-cyan-500/80 text-white';
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectOption(opt.id)}
                      disabled={hasSubmitted}
                      className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${cardStyle}`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold ${
                            isSelected
                              ? 'border-cyan-400 bg-cyan-500 text-slate-950'
                              : 'border-slate-700 bg-slate-900 text-slate-400'
                          }`}
                        >
                          {isSelected ? '✓' : ''}
                        </div>
                        <div className="flex-1 text-xs md:text-sm leading-relaxed">{opt.text}</div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Action Buttons */}
              {!hasSubmitted ? (
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleSubmitChallenge}
                    disabled={!selectedOptionId}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all cursor-pointer disabled:opacity-40"
                  >
                    <span>Confirm Decision &amp; View Reflection</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                /* Consequence & Reflection Reveal */
                <div className="space-y-4 pt-4 border-t border-slate-800">
                  {(() => {
                    const chosen = currentModule.interactiveChallenge.options.find(
                      (o) => o.id === selectedOptionId
                    );
                    if (!chosen) return null;

                    return (
                      <div className="space-y-4">
                        <div
                          className={`p-4 rounded-xl border space-y-2 ${
                            chosen.isCorrect
                              ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-200'
                              : 'bg-rose-950/40 border-rose-500/60 text-rose-200'
                          }`}
                        >
                          <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider">
                            {chosen.isCorrect ? (
                              <>
                                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                <span>CORRECT DECISION · VERIFIED RESOURCE UNLOCKED</span>
                              </>
                            ) : (
                              <>
                                <AlertTriangle className="w-4 h-4 text-rose-400" />
                                <span>INCORRECT DECISION · REALISTIC CONSEQUENCE ENCOUNTERED</span>
                              </>
                            )}
                          </div>
                          <p className="text-xs md:text-sm leading-relaxed">{chosen.feedback}</p>
                        </div>

                        {/* Character Reflection Box */}
                        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2 text-xs">
                          <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-800">
                            <span className="font-semibold text-cyan-400">
                              Character Reflection: {chosen.reflection.archetype}
                            </span>
                            <span>{chosen.reflection.isPositive ? 'Moral Growth +' : 'Growth Area'}</span>
                          </div>
                          <div className="text-slate-300">
                            <strong>Moral Insight:</strong> {chosen.reflection.moralInsight}
                          </div>
                          <div className="text-slate-300">
                            <strong>Tangible Result:</strong> {chosen.reflection.tangibleConsequence}
                          </div>
                          <div className="text-amber-300/90 font-medium">
                            <strong>Teachable Lesson:</strong> {chosen.reflection.teachableLesson}
                          </div>
                        </div>

                        {/* Unlocked Resource Link if correct */}
                        {chosen.isCorrect && chosen.unlockedResource && (
                          <div className="bg-cyan-950/40 border border-cyan-500/60 rounded-xl p-4 space-y-2">
                            <div className="flex items-center justify-between text-xs font-bold text-cyan-300">
                              <span className="flex items-center gap-1.5">
                                <Unlock className="w-4 h-4 text-emerald-400" />
                                <span>Direct Educational Resource Unlocked</span>
                              </span>
                              <span className="text-[11px] text-slate-400 font-mono">
                                {chosen.unlockedResource.category}
                              </span>
                            </div>
                            <div className="text-sm font-bold text-white">
                              {chosen.unlockedResource.title}
                            </div>
                            <p className="text-xs text-slate-300">
                              {chosen.unlockedResource.whyItMatters}
                            </p>
                            <a
                              href={chosen.unlockedResource.url}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 underline underline-offset-4 pt-1"
                            >
                              <span>{chosen.unlockedResource.actionText}</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        )}

                        <div className="pt-2 flex justify-end">
                          <button
                            onClick={handleResetChallenge}
                            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
                          >
                            Try Challenge Again
                          </button>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )}

  {/* Kids Motivational Media & COPPA-Safe Intermittent Ad Player Modal */}
  <KidsMotivationalMediaModal
    isOpen={isKidsMediaModalOpen}
    onClose={() => setIsKidsMediaModalOpen(false)}
    selectedVideo={selectedKidsVideo}
    academicLevel={Math.min(5, Math.max(1, Math.floor(((playerStats.steamMastery || 50) / 20) + 1)))}
    onClaimReward={handleClaimKidsReward}
    isIntermittentAdBreak={isIntermittentBreak}
  />

  {/* Educator, Administrator & Guardian Student Enrollment Modal */}
  <EducatorGuardianEnrollmentModal
    isOpen={isEducatorModalOpen}
    onClose={() => setIsEducatorModalOpen(false)}
    onSelectActiveStudent={handleSelectActiveStudent}
  />
</div>
  );
};

