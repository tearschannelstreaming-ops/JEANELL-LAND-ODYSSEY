import React, { useState, useEffect } from 'react';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  ShieldCheck,
  Sparkles,
  Award,
  Film,
  Smile,
  Rocket,
  Gift,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Tv,
} from 'lucide-react';
import { KidsVideoItem, KidsVideoCategory } from '../../types/kidsCourse';
import { KIDS_MOTIVATIONAL_MEDIA_LIBRARY } from '../../data/kidsCourseData';
import { sound } from '../../utils/audio';

interface KidsMotivationalMediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedVideo?: KidsVideoItem | null;
  academicLevel: number;
  onClaimReward: (reward: { academicStars: number; smartCash: number; resilienceBoost: number }, videoId: string) => void;
  isIntermittentAdBreak?: boolean;
}

export const KidsMotivationalMediaModal: React.FC<KidsMotivationalMediaModalProps> = ({
  isOpen,
  onClose,
  selectedVideo,
  academicLevel,
  onClaimReward,
  isIntermittentAdBreak = false,
}) => {
  const [currentVideo, setCurrentVideo] = useState<KidsVideoItem>(
    selectedVideo || KIDS_MOTIVATIONAL_MEDIA_LIBRARY[0]
  );
  const [activeCategory, setActiveCategory] = useState<KidsVideoCategory | 'all'>('all');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [playbackProgress, setPlaybackProgress] = useState<number>(0);
  const [skipCountdown, setSkipCountdown] = useState<number>(5);
  const [canSkip, setCanSkip] = useState<boolean>(false);
  const [activeSceneIndex, setActiveSceneIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasReflected, setHasReflected] = useState<boolean>(false);
  const [isRewardClaimed, setIsRewardClaimed] = useState<boolean>(false);
  const [narrationMuted, setNarrationMuted] = useState<boolean>(false);

  // Sync prop changes
  useEffect(() => {
    if (selectedVideo) {
      setCurrentVideo(selectedVideo);
      resetPlayback();
    }
  }, [selectedVideo]);

  const resetPlayback = () => {
    setIsPlaying(true);
    setPlaybackProgress(0);
    setSkipCountdown(5);
    setCanSkip(false);
    setActiveSceneIndex(0);
    setSelectedOptionId(null);
    setHasReflected(false);
    setIsRewardClaimed(false);
  };

  // Playback timer ticker
  useEffect(() => {
    if (!isOpen || !isPlaying || playbackProgress >= 100) return;

    const interval = setInterval(() => {
      setPlaybackProgress((prev) => {
        const next = prev + 5;
        if (next >= 100) {
          setIsPlaying(false);
          sound.playSuccess();
          return 100;
        }
        return next;
      });

      setSkipCountdown((prev) => {
        if (prev <= 1) {
          setCanSkip(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, isPlaying, playbackProgress]);

  // Update scene narrative index according to progress
  useEffect(() => {
    if (currentVideo.sceneNarrative.length > 0) {
      const sceneFraction = 100 / currentVideo.sceneNarrative.length;
      const calculatedIndex = Math.min(
        Math.floor(playbackProgress / sceneFraction),
        currentVideo.sceneNarrative.length - 1
      );
      if (calculatedIndex !== activeSceneIndex) {
        setActiveSceneIndex(calculatedIndex);
        // Optional speech synthesis for kids
        if (!narrationMuted && 'speechSynthesis' in window && isPlaying) {
          window.speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance(currentVideo.sceneNarrative[calculatedIndex]);
          utterance.rate = 0.95;
          utterance.pitch = 1.05;
          window.speechSynthesis.speak(utterance);
        }
      }
    }
  }, [playbackProgress, currentVideo, narrationMuted, isPlaying]);

  if (!isOpen) return null;

  const handleSelectVideo = (video: KidsVideoItem) => {
    sound.playClick();
    setCurrentVideo(video);
    resetPlayback();
  };

  const handleSkipOrComplete = () => {
    sound.playClick();
    setPlaybackProgress(100);
    setIsPlaying(false);
  };

  const handleOptionSelect = (optionId: string) => {
    if (hasReflected) return;
    setSelectedOptionId(optionId);
    setHasReflected(true);

    const chosen = currentVideo.reflectionQuestion.options.find((o) => o.id === optionId);
    if (chosen?.isCorrect) {
      sound.playSuccess();
      if (!isRewardClaimed) {
        setIsRewardClaimed(true);
        onClaimReward(currentVideo.reward, currentVideo.id);
      }
    } else {
      sound.playAlert();
    }
  };

  const filteredVideos = KIDS_MOTIVATIONAL_MEDIA_LIBRARY.filter(
    (v) => activeCategory === 'all' || v.category === activeCategory
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[94vh]">
        {/* Top Header Bar */}
        <div className="px-5 py-3.5 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Tv className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black tracking-wider uppercase text-amber-400">
                  {isIntermittentAdBreak ? '🌟 Intermittent Motivational Break' : 'Kids Inspiration & Safe Media Hub'}
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                  <ShieldCheck className="w-3 h-3" />
                  COPPA Safe · Certified Kid-Friendly
                </span>
              </div>
              <p className="text-[11px] text-slate-400 truncate max-w-md">
                {currentVideo.sponsorLabel}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setNarrationMuted(!narrationMuted);
                if ('speechSynthesis' in window) window.speechSynthesis.cancel();
              }}
              className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors"
              title={narrationMuted ? 'Unmute voice narration' : 'Mute voice narration'}
            >
              {narrationMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
            </button>
            <button
              onClick={() => {
                sound.playClick();
                if ('speechSynthesis' in window) window.speechSynthesis.cancel();
                onClose();
              }}
              className="p-2 rounded-lg bg-slate-800/80 hover:bg-rose-500/20 hover:text-rose-400 text-slate-400 transition-colors cursor-pointer"
              title="Close Player"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Category Navigation Pills */}
        <div className="px-5 py-2.5 bg-slate-950 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
            }`}
          >
            All Media ({KIDS_MOTIVATIONAL_MEDIA_LIBRARY.length})
          </button>
          <button
            onClick={() => setActiveCategory('anti_bullying')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeCategory === 'anti_bullying'
                ? 'bg-rose-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
            }`}
          >
            <Smile className="w-3.5 h-3.5 text-rose-400" />
            Anti-Bullying &amp; Upstanders
          </button>
          <button
            onClick={() => setActiveCategory('academic_achievement')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeCategory === 'academic_achievement'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
            }`}
          >
            <Rocket className="w-3.5 h-3.5 text-amber-300" />
            Academic AI Animations
          </button>
          <button
            onClick={() => setActiveCategory('upcoming_theater_movies')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeCategory === 'upcoming_theater_movies'
                ? 'bg-purple-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
            }`}
          >
            <Film className="w-3.5 h-3.5 text-purple-300" />
            Family Movies In Theaters
          </button>
          <button
            onClick={() => setActiveCategory('steam_toys_creative')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeCategory === 'steam_toys_creative'
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
            }`}
          >
            <Gift className="w-3.5 h-3.5 text-emerald-300" />
            Latest S.T.E.A.M. Toys
          </button>
        </div>

        {/* Main Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Simulated Video Player Screen */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-950 shadow-2xl aspect-video max-h-[380px] w-full flex flex-col justify-between">
            {/* Background Simulated Scene Graphics */}
            <div className="absolute inset-0 z-0">
              {currentVideo.animatedSceneType === 'classroom_upstander' && (
                <div className="w-full h-full bg-gradient-to-br from-indigo-950 via-slate-900 to-rose-950 relative overflow-hidden flex items-center justify-center p-6">
                  <div className="absolute -top-10 -left-10 w-48 h-48 bg-rose-500/20 rounded-full blur-3xl animate-pulse" />
                  <div className="absolute -bottom-10 -right-10 w-52 h-52 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" />
                  {/* Classroom Upstander Animation Art */}
                  <div className="relative z-10 flex flex-col items-center text-center space-y-3">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-400 to-amber-400 flex items-center justify-center text-3xl shadow-lg shadow-rose-500/30 transform hover:scale-105 transition-transform">
                        🤝
                      </div>
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center text-4xl shadow-lg shadow-emerald-500/30 animate-bounce">
                        🛡️
                      </div>
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-400 flex items-center justify-center text-3xl shadow-lg shadow-blue-500/30 transform hover:scale-105 transition-transform">
                        💖
                      </div>
                    </div>
                    <div className="inline-block px-3 py-1 rounded-full bg-slate-900/80 border border-rose-500/40 text-rose-300 text-xs font-bold tracking-wide">
                      UPSTANDER MISSION IN PROGRESS
                    </div>
                  </div>
                </div>
              )}

              {currentVideo.animatedSceneType === 'space_rocket' && (
                <div className="w-full h-full bg-gradient-to-b from-slate-950 via-indigo-950 to-cyan-950 relative overflow-hidden flex items-center justify-center p-6">
                  {/* Stars in space */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.4)_1px,transparent_1px),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.3)_1.5px,transparent_1px)] bg-[size:40px_40px]" />
                  <div className="relative z-10 flex flex-col items-center text-center space-y-3">
                    <div className="w-24 h-24 rounded-full bg-cyan-500/20 border-2 border-cyan-400/50 flex items-center justify-center text-5xl shadow-2xl shadow-cyan-500/40 animate-pulse">
                      🚀
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-cyan-400 font-mono text-xs font-black tracking-widest uppercase">
                        S.T.E.A.R.Safe Orbital Launch
                      </span>
                      <span className="text-amber-400 font-mono text-xs font-bold">
                        Mach 3.8
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {currentVideo.animatedSceneType === 'theater_trailer' && (
                <div className="w-full h-full bg-gradient-to-tr from-purple-950 via-slate-950 to-amber-950 relative overflow-hidden flex items-center justify-center p-6">
                  {/* Theater Spotlight effect */}
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(245,158,11,0.08)_0%,transparent_70%)]" />
                  <div className="relative z-10 flex flex-col items-center text-center space-y-2">
                    <div className="px-3 py-1 rounded-md bg-amber-500 text-slate-950 text-[11px] font-black tracking-wider uppercase shadow-md">
                      🎬 COMING TO THEATERS
                    </div>
                    <div className="text-3xl sm:text-4xl">🍿 🌟 🎥</div>
                    <h4 className="text-white font-black text-lg sm:text-xl tracking-tight drop-shadow-md">
                      {currentVideo.featuredProductOrTitle || currentVideo.title}
                    </h4>
                    <p className="text-xs text-amber-200 font-medium">
                      {currentVideo.releaseOrAgeInfo}
                    </p>
                  </div>
                </div>
              )}

              {currentVideo.animatedSceneType === 'toy_unboxing' && (
                <div className="w-full h-full bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 relative overflow-hidden flex items-center justify-center p-6">
                  <div className="relative z-10 flex flex-col items-center text-center space-y-3">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-emerald-400 to-teal-400 flex items-center justify-center text-4xl shadow-xl shadow-emerald-500/30">
                      ⚙️ ☀️
                    </div>
                    <div className="text-emerald-300 font-bold text-xs uppercase tracking-wide">
                      {currentVideo.featuredProductOrTitle}
                    </div>
                    <p className="text-[11px] text-slate-300 max-w-sm">
                      {currentVideo.releaseOrAgeInfo}
                    </p>
                  </div>
                </div>
              )}

              {currentVideo.animatedSceneType === 'detroit_skyline' && (
                <div className="w-full h-full bg-gradient-to-b from-sky-950 via-slate-900 to-amber-950 relative overflow-hidden flex items-center justify-center p-6">
                  <div className="relative z-10 flex flex-col items-center text-center space-y-2">
                    <div className="text-4xl">🏙️ 🌿 🛩️</div>
                    <div className="text-sky-300 font-black text-sm uppercase tracking-wide">
                      Detroit 2050 Green Skyline Blueprint
                    </div>
                    <p className="text-[11px] text-slate-300">
                      Architectural Modeling &amp; Community Solar Towers
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Video Overlay Top Badge */}
            <div className="relative z-10 p-3.5 flex items-center justify-between bg-gradient-to-b from-slate-950/90 to-transparent">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-slate-900/90 border border-slate-700 text-slate-200">
                  {currentVideo.ratingBadge}
                </span>
                <span className="text-[11px] font-semibold text-slate-300 truncate max-w-xs">
                  {currentVideo.title}
                </span>
              </div>

              {/* Skip / Timer Control */}
              <div className="flex items-center gap-2">
                {!canSkip ? (
                  <span className="px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700 text-slate-300 text-xs font-mono font-bold flex items-center gap-1.5 shadow-md">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    Skip in {skipCountdown}s
                  </span>
                ) : (
                  <button
                    onClick={handleSkipOrComplete}
                    className="px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 text-xs font-black flex items-center gap-1 shadow-lg shadow-amber-500/20 cursor-pointer transition-transform hover:scale-105"
                  >
                    <span>{playbackProgress >= 100 ? 'Replay' : 'Skip Video'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Closed Caption / Live Story Narrative Box */}
            <div className="relative z-10 p-4 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent">
              <div className="bg-slate-900/95 border border-slate-700/80 rounded-xl p-3 shadow-lg backdrop-blur">
                <div className="flex items-start gap-2.5">
                  <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 shrink-0 mt-0.5">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-semibold text-white leading-relaxed">
                      "{currentVideo.sceneNarrative[activeSceneIndex] || currentVideo.description}"
                    </p>
                    <div className="flex items-center gap-2 mt-1.5 text-[10px] text-slate-400">
                      <span>Scene {activeSceneIndex + 1} of {currentVideo.sceneNarrative.length}</span>
                      <span>·</span>
                      <span className="text-emerald-400 font-semibold">{currentVideo.moralOrLearningTakeaway}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Bar & Media Controls */}
              <div className="mt-2.5 flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-200 hover:text-white transition-colors cursor-pointer"
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-emerald-400" />}
                </button>

                <div className="flex-1 bg-slate-800 rounded-full h-2 overflow-hidden relative">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 via-emerald-400 to-amber-400 transition-all duration-300"
                    style={{ width: `${playbackProgress}%` }}
                  />
                </div>

                <span className="text-[11px] font-mono text-slate-400 font-bold shrink-0">
                  {playbackProgress}%
                </span>
              </div>
            </div>
          </div>

          {/* Moral Reflection & Reward Checkpoint */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Interactive Moral Reflection &amp; Stars Claim
                </h4>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                <span>Reward:</span>
                <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold">
                  +{currentVideo.reward.academicStars} Stars
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-bold">
                  +{currentVideo.reward.smartCash} Smart Cash
                </span>
                <span className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-bold">
                  +{currentVideo.reward.resilienceBoost}% Resilience
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-200 font-semibold">
              {currentVideo.reflectionQuestion.prompt}
            </p>

            <div className="grid grid-cols-1 gap-2 pt-1">
              {currentVideo.reflectionQuestion.options.map((opt) => {
                const isSelected = selectedOptionId === opt.id;
                let btnStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';
                if (hasReflected) {
                  if (opt.isCorrect) {
                    btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200';
                  } else if (isSelected && !opt.isCorrect) {
                    btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                  }
                } else if (isSelected) {
                  btnStyle = 'bg-cyan-950/80 border-cyan-500 text-cyan-200';
                }

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleOptionSelect(opt.id)}
                    disabled={hasReflected}
                    className={`p-3 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between gap-3 cursor-pointer ${btnStyle}`}
                  >
                    <span>{opt.text}</span>
                    {hasReflected && opt.isCorrect && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    )}
                    {hasReflected && isSelected && !opt.isCorrect && (
                      <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {hasReflected && isRewardClaimed && (
              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  <strong>Great Reflection!</strong> You earned +{currentVideo.reward.academicStars} Academic Stars, +{currentVideo.reward.smartCash} Smart Cash, and +{currentVideo.reward.resilienceBoost}% Resilience boost!
                </span>
              </div>
            )}
          </div>

          {/* More Videos in Library Carousel */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
              <span>Select Other Motivational Videos &amp; Movie/Toy Showcases</span>
              <span className="text-[11px] font-normal text-slate-500">
                Level Required: Level 1–{academicLevel}
              </span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {filteredVideos.map((vid) => {
                const isSelected = vid.id === currentVideo.id;
                const isLocked = vid.minAcademicLevel > academicLevel;

                return (
                  <button
                    key={vid.id}
                    disabled={isLocked}
                    onClick={() => handleSelectVideo(vid)}
                    className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between gap-2 relative overflow-hidden cursor-pointer ${
                      isSelected
                        ? 'bg-slate-800 border-cyan-500 shadow-md ring-1 ring-cyan-500/40'
                        : isLocked
                        ? 'bg-slate-950/60 border-slate-900 opacity-60 cursor-not-allowed'
                        : 'bg-slate-950 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[10px] font-bold text-cyan-400 uppercase truncate">
                          {vid.category.replace('_', ' ')}
                        </span>
                        <span className="text-[9px] font-mono font-semibold px-1.5 py-0.2 rounded bg-slate-900 border border-slate-800 text-slate-300">
                          {vid.durationSeconds}s
                        </span>
                      </div>
                      <h5 className="text-xs font-bold text-white line-clamp-1">
                        {vid.title}
                      </h5>
                      <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5">
                        {vid.subtitle}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-800/60">
                      <span>{vid.ratingBadge}</span>
                      {isLocked ? (
                        <span className="text-amber-400 font-bold">Unlocks Lvl {vid.minAcademicLevel}</span>
                      ) : (
                        <span className="text-emerald-400 font-bold">+{vid.reward.academicStars} Stars</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3">
          <div className="text-[11px] text-slate-400 flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Strictly COPPA-compliant &amp; non-behavioral educational advertising only.</span>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              if ('speechSynthesis' in window) window.speechSynthesis.cancel();
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors cursor-pointer"
          >
            Done &amp; Return to Academy
          </button>
        </div>
      </div>
    </div>
  );
};
