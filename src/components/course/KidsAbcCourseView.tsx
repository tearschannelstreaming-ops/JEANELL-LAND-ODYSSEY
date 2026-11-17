import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Volume2,
  Award,
  CheckCircle2,
  Tv,
  Users,
  ChevronRight,
  RotateCcw,
  Star,
  Printer,
  Shield,
  BookOpen,
  ArrowRight,
  Flame,
  Check,
  Plane,
  Heart,
  Smile,
} from 'lucide-react';
import { StudentProfile, PlayerStats } from '../../types/game';
import { ABC_LETTERS_DATA, ACADEMIC_ACHIEVEMENT_TIERS } from '../../data/kidsCourseData';
import { AbcLetterItem, AcademicAchievementTier } from '../../types/kidsCourse';
import { sound } from '../../utils/audio';

interface KidsAbcCourseViewProps {
  profile: StudentProfile;
  onUpdateProfile: (newProfile: StudentProfile) => void;
  playerStats: PlayerStats;
  onUpdateStats: (delta: Partial<PlayerStats>) => void;
  onOpenMotivationalBreak: () => void;
  onOpenEducatorRegistration: () => void;
}

export const KidsAbcCourseView: React.FC<KidsAbcCourseViewProps> = ({
  profile,
  onUpdateProfile,
  playerStats,
  onUpdateStats,
  onOpenMotivationalBreak,
  onOpenEducatorRegistration,
}) => {
  // Selected letter
  const [selectedLetter, setSelectedLetter] = useState<AbcLetterItem>(ABC_LETTERS_DATA[0]);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);

  // Mastered letters from localStorage
  const [masteredLetters, setMasteredLetters] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('steareality_mastered_abc_letters');
      return saved ? JSON.parse(saved) : ['A', 'B'];
    } catch {
      return ['A', 'B'];
    }
  });

  // Total kids academic stars
  const [earnedStars, setEarnedStars] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('steareality_kids_academic_stars');
      return saved ? parseInt(saved, 10) : 15;
    } catch {
      return 15;
    }
  });

  // Diploma modal view
  const [showDiplomaModal, setShowDiplomaModal] = useState<boolean>(false);

  // Calculate current academic tier
  const currentTier: AcademicAchievementTier =
    [...ACADEMIC_ACHIEVEMENT_TIERS]
      .reverse()
      .find((t) => earnedStars >= t.minStars) || ACADEMIC_ACHIEVEMENT_TIERS[0];

  const nextTier = ACADEMIC_ACHIEVEMENT_TIERS.find((t) => t.level === currentTier.level + 1);

  // Pronounce letter and text
  const handleSpeak = (text: string) => {
    sound.playClick();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85;
      utterance.pitch = 1.1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSelectLetter = (item: AbcLetterItem) => {
    sound.playClick();
    setSelectedLetter(item);
    setSelectedOptionId(null);
    setHasAnswered(false);
  };

  const handleAnswerChallenge = (optionId: string) => {
    if (hasAnswered) return;
    setSelectedOptionId(optionId);
    setHasAnswered(true);

    const chosen = selectedLetter.challenge.options.find((o) => o.id === optionId);
    if (chosen?.isCorrect) {
      sound.playSuccess();
      const newStars = earnedStars + 5;
      setEarnedStars(newStars);
      localStorage.setItem('steareality_kids_academic_stars', newStars.toString());

      if (!masteredLetters.includes(selectedLetter.letter)) {
        const nextMastered = [...masteredLetters, selectedLetter.letter];
        setMasteredLetters(nextMastered);
        localStorage.setItem('steareality_mastered_abc_letters', JSON.stringify(nextMastered));

        // Intermittent motivational ad break trigger every 3 mastered letters!
        if (nextMastered.length % 3 === 0) {
          setTimeout(() => {
            onOpenMotivationalBreak();
          }, 1200);
        }
      }

      onUpdateStats({
        resilience: Math.min(100, (playerStats.resilience || 70) + 2),
        steamMastery: Math.min(100, (playerStats.steamMastery || 60) + 3),
        kindnessPoints: Math.min(100, (playerStats.kindnessPoints || 50) + 4),
      });
    } else {
      sound.playAlert();
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Academic Achievement & Registration Command Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/70 to-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 shadow-sm flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 fill-slate-950" />
                Level {currentTier.level}: {currentTier.title}
              </span>
              <span className="text-xs text-cyan-300 font-semibold flex items-center gap-1 bg-cyan-950/60 border border-cyan-500/30 px-2.5 py-1 rounded-full">
                <Smile className="w-3.5 h-3.5" />
                "The Best Virtual Learning Course Game in the World"
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Interactive ABC's, Phonics &amp; S.T.E.A.M. Foundation
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Designed for young minds (Pre-K through 5th Grade). Master phonics, aerospace concepts, anti-bullying empathy, and Detroit ingenuity with voice narration and animated video checkpoints!
            </p>

            <div className="flex items-center gap-4 pt-1 text-xs">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{earnedStars} Stars Earned</span>
              </div>
              <span className="text-slate-600">·</span>
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>{masteredLetters.length} / 26 Letters Mastered</span>
              </div>
            </div>
          </div>

          {/* Action Hub: Motivational Ad-Break & Educator Registration */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto shrink-0">
            <button
              onClick={() => {
                sound.playClick();
                onOpenMotivationalBreak();
              }}
              className="px-4 py-3 rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-black text-xs shadow-lg shadow-rose-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer group hover:scale-[1.02]"
            >
              <Tv className="w-4 h-4 group-hover:animate-bounce" />
              <span>Watch Motivational Break (+Stars &amp; Ads)</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onOpenEducatorRegistration();
              }}
              className="px-4 py-3 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-black text-xs shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer group hover:scale-[1.02]"
            >
              <Users className="w-4 h-4" />
              <span>Teachers &amp; Guardians: Register Students</span>
            </button>
          </div>
        </div>

        {/* Level Progression Bar */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="font-bold text-white">{currentTier.badge}</span>
            <span>— {currentTier.motivationalQuote}</span>
          </div>

          {nextTier && (
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <span className="text-[11px] text-slate-400 whitespace-nowrap">
                Next: {nextTier.title} ({earnedStars}/{nextTier.minStars} ★)
              </span>
              <div className="w-32 bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-amber-400 to-cyan-400 h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(100, ((earnedStars - currentTier.minStars) / (nextTier.minStars - currentTier.minStars)) * 100)}%`,
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Learning Arena: 26 Alphabet Grid + Active Studio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: 26 Letters Palette (5 cols on lg) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>Alphabet Navigation (A–Z)</span>
            </h3>
            <span className="text-[11px] font-mono text-slate-400">
              {masteredLetters.length} / 26 Completed
            </span>
          </div>

          <div className="grid grid-cols-5 sm:grid-cols-6 lg:grid-cols-5 gap-2">
            {ABC_LETTERS_DATA.map((item) => {
              const isSelected = selectedLetter.letter === item.letter;
              const isMastered = masteredLetters.includes(item.letter);

              return (
                <button
                  key={item.letter}
                  onClick={() => handleSelectLetter(item)}
                  className={`aspect-square rounded-2xl flex flex-col items-center justify-center p-1 transition-all relative cursor-pointer border ${
                    isSelected
                      ? 'bg-cyan-500 text-slate-950 font-black shadow-lg shadow-cyan-500/30 scale-105 border-cyan-300 ring-2 ring-cyan-400/50'
                      : isMastered
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/40'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800'
                  }`}
                >
                  <span className="text-xl font-extrabold">{item.letter}</span>
                  <span className="text-[9px] truncate max-w-full font-medium opacity-80">
                    {item.word}
                  </span>

                  {isMastered && (
                    <div className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-[9px]">
                      ✓
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Certificate Milestone Button */}
          <div className="pt-3 border-t border-slate-800">
            <button
              onClick={() => {
                sound.playClick();
                setShowDiplomaModal(true);
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-700 text-amber-300 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span>View &amp; Print Official ABC Diploma Certificate</span>
            </button>
          </div>
        </div>

        {/* Right Column: Active Letter Interactive Studio (7 cols on lg) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6 flex flex-col justify-between">
          <div className="space-y-5">
            {/* Active Letter Header Card */}
            <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-5 relative overflow-hidden">
              <div className="flex items-center gap-5 text-center sm:text-left">
                {/* Big Letter Block */}
                <div
                  className="w-24 h-24 rounded-3xl flex items-center justify-center text-6xl font-black text-slate-950 shadow-2xl shrink-0"
                  style={{ backgroundColor: selectedLetter.accentColor }}
                >
                  {selectedLetter.letter}
                </div>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <span className="text-xs font-mono font-bold text-slate-400">
                      Phonics: {selectedLetter.phoneticSound}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-cyan-300 border border-slate-700">
                      {selectedLetter.category}
                    </span>
                  </div>
                  <h2 className="text-2xl font-black text-white">
                    {selectedLetter.letter} is for {selectedLetter.word}!
                  </h2>
                  <p className="text-xs text-slate-300">
                    {selectedLetter.tagline}
                  </p>
                </div>
              </div>

              {/* Audio Pronunciation Button */}
              <button
                onClick={() => handleSpeak(selectedLetter.speechText)}
                className="px-3.5 py-2.5 rounded-xl bg-cyan-950/80 border border-cyan-500/50 hover:bg-cyan-900 text-cyan-300 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shrink-0 shadow-md hover:scale-105"
                title="Hear audio pronunciation"
              >
                <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span>Hear Voice</span>
              </button>
            </div>

            {/* Fun S.T.E.A.M. & Detroit Lore Fact */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/90 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wide">
                  Kid-Scientist Fun Fact
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedLetter.funFact}
                </p>
              </div>
            </div>

            {/* Interactive Phonics & Vocabulary Challenge */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span>Interactive Star Challenge</span>
                </h4>
                <span className="text-xs font-mono text-emerald-400 font-bold">
                  +5 Stars &amp; +Mastery
                </span>
              </div>

              <p className="text-xs sm:text-sm font-semibold text-slate-200">
                {selectedLetter.challenge.question}
              </p>

              <div className="grid grid-cols-1 gap-2.5">
                {selectedLetter.challenge.options.map((opt) => {
                  const isSelected = selectedOptionId === opt.id;
                  let style = 'bg-slate-950 border-slate-800 text-slate-200 hover:border-slate-700 hover:bg-slate-900';

                  if (hasAnswered) {
                    if (opt.isCorrect) {
                      style = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-sm';
                    } else if (isSelected && !opt.isCorrect) {
                      style = 'bg-rose-950/80 border-rose-500 text-rose-200';
                    }
                  } else if (isSelected) {
                    style = 'bg-cyan-950/80 border-cyan-500 text-cyan-200';
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleAnswerChallenge(opt.id)}
                      disabled={hasAnswered}
                      className={`p-3.5 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between gap-3 cursor-pointer ${style}`}
                    >
                      <span>{opt.text}</span>
                      {hasAnswered && opt.isCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback box */}
              {hasAnswered && (
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 animate-fadeIn">
                  {selectedLetter.challenge.options.find((o) => o.id === selectedOptionId)?.isCorrect ? (
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>
                        Brilliant Job! Letter '{selectedLetter.letter}' is now stamped in your Learning Passport!
                      </span>
                    </div>
                  ) : (
                    <div className="text-xs text-rose-300 font-medium">
                      Almost there! Review the sound card and try again to master this letter!
                    </div>
                  )}

                  <p className="text-[11px] text-slate-400">
                    {selectedLetter.challenge.options.find((o) => o.id === selectedOptionId)?.explanation}
                  </p>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={() => {
                        sound.playClick();
                        setSelectedOptionId(null);
                        setHasAnswered(false);
                      }}
                      className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Try Challenge Again</span>
                    </button>

                    {/* Next Letter quick shortcut */}
                    {ABC_LETTERS_DATA.findIndex((l) => l.letter === selectedLetter.letter) < ABC_LETTERS_DATA.length - 1 && (
                      <button
                        onClick={() => {
                          const currIdx = ABC_LETTERS_DATA.findIndex((l) => l.letter === selectedLetter.letter);
                          handleSelectLetter(ABC_LETTERS_DATA[currIdx + 1]);
                        }}
                        className="text-xs text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <span>Next Letter</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Footnote */}
          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span>Powered by Jeanell Land &amp; All Your Needs Reality LLC</span>
            <span className="font-mono text-cyan-400">Ages 4–12 Safe Play</span>
          </div>
        </div>
      </div>

      {/* Diploma & Certificate Modal */}
      {showDiplomaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-slate-900 border-2 border-amber-500/60 rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-6">
            <div className="inline-flex p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 mb-1">
              <Award className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <div className="text-[11px] font-mono tracking-widest text-amber-400 uppercase font-black">
                Official Virtual Learning Academy Certificate
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                S.T.E.A.M. &amp; ABC's Scholar Diploma
              </h2>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                Awarded for outstanding curiosity, academic achievement, anti-bullying empathy, and mastering alphabet fundamentals.
              </p>
            </div>

            {/* Certificate Parchment Box */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-4 border-double border-amber-700/60 rounded-2xl p-6 text-slate-900 text-left space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-amber-900/20 pb-3">
                <span className="text-xs font-serif font-black uppercase text-amber-950">
                  Jeanell Land Educational Foundation
                </span>
                <span className="text-xs font-mono font-bold text-amber-900">
                  All Your Needs Reality LLC
                </span>
              </div>

              <div className="text-center py-2 space-y-1">
                <p className="text-xs uppercase tracking-widest font-serif text-slate-600">This certifies that</p>
                <h3 className="text-2xl font-black text-slate-950 font-serif underline decoration-amber-500">
                  {profile.name}
                </h3>
                <p className="text-xs text-slate-700 max-w-sm mx-auto pt-1 font-serif">
                  has officially achieved <strong>{currentTier.title}</strong> status with <strong>{masteredLetters.length}</strong> Mastered Letters and <strong>{earnedStars}</strong> Stars!
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-amber-900/20 text-[10px] text-slate-700 font-serif">
                <div>
                  <div className="font-bold">Jeanell Land</div>
                  <div className="text-slate-600">Licensed Broker &amp; Founder</div>
                </div>
                <div className="text-right">
                  <div className="font-bold">Date Verified</div>
                  <div className="text-slate-600">{new Date().toLocaleDateString()}</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  sound.playClick();
                  window.print();
                }}
                className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-2 cursor-pointer shadow-md"
              >
                <Printer className="w-4 h-4" />
                <span>Print Diploma</span>
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setShowDiplomaModal(false);
                }}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
