import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Heart,
  Brain,
  CheckCircle2,
  X,
  BookOpen,
  Calendar,
  Flame,
  Award,
  ChevronRight,
  Send,
  Zap,
  Clock,
  Trash2,
  Share2,
  Camera,
} from 'lucide-react';
import { sound } from '../../utils/audio';

export interface GrowthReflection {
  id: string;
  timestamp: string;
  category: string;
  challengeText: string;
  lessonLearned: string;
  boostAmount: number;
}

interface ReflectOnGrowthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyBoost: (boostAmount: number, reflection: GrowthReflection) => void;
  currentResilience: number;
  onOpenShareModal?: () => void;
}

const STORAGE_KEY = 'steareality_growth_reflections';

const PROMPT_STARTERS = [
  'I learned that taking a deep breath and writing down the facts keeps me in control.',
  'I realized that setbacks are just aerodynamic drag that prepares me for greater lift.',
  'When things felt unfair, I stayed focused on solutions and documented everything.',
  'I discovered that asking for advice is a sign of strategic strength, not weakness.',
  'I learned to separate what I can control from what I cannot, and pour energy into what matters.',
];

const CATEGORIES = [
  'Overcoming a Setback',
  'Learning from a Mistake',
  'Patience & Emotional Endurance',
  'Standing Up for Justice',
  'Academic or Technical Challenge',
  'Family & Community Growth',
];

export const ReflectOnGrowthModal: React.FC<ReflectOnGrowthModalProps> = ({
  isOpen,
  onClose,
  onApplyBoost,
  currentResilience,
  onOpenShareModal,
}) => {
  const [activeTab, setActiveTab] = useState<'reflect' | 'journal'>('reflect');
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
  const [challengeText, setChallengeText] = useState('');
  const [lessonText, setLessonText] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastBoost, setLastBoost] = useState(5);

  // Reflections history
  const [reflections, setReflections] = useState<GrowthReflection[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reflections));
    } catch (err) {
      console.error('Failed to save reflections', err);
    }
  }, [reflections]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lessonText.trim() || lessonText.trim().length < 8) return;

    sound.playSuccess();
    const boost = 5; // Permanent resilience boost
    setLastBoost(boost);

    const newReflection: GrowthReflection = {
      id: `refl-${Date.now()}`,
      timestamp: new Date().toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      category: selectedCategory,
      challengeText: challengeText.trim() || 'Overcoming daily obstacles and pushing forward',
      lessonLearned: lessonText.trim(),
      boostAmount: boost,
    };

    setReflections((prev) => [newReflection, ...prev]);
    onApplyBoost(boost, newReflection);
    setIsSubmitted(true);
  };

  const handleResetForAnother = () => {
    sound.playClick();
    setChallengeText('');
    setLessonText('');
    setIsSubmitted(false);
  };

  const handleDeleteReflection = (id: string) => {
    sound.playClick();
    setReflections((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border-2 border-emerald-500/40 rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-slate-100">
        {/* Glow ambient */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="relative z-10 flex items-start justify-between gap-4 border-b border-slate-800 pb-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/40 text-emerald-300">
              <Brain className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-950/70 border border-emerald-500/30">
                  Resilience Growth Engine
                </span>
                <span className="text-xs font-mono text-slate-400">Current: {currentResilience}%</span>
              </div>
              <h2 className="text-xl font-black text-white tracking-tight">Reflect on Growth</h2>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 mb-5">
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('reflect');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'reflect'
                ? 'bg-emerald-500 text-slate-950 shadow-md font-black'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Reflect on a Challenge</span>
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('journal');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'journal'
                ? 'bg-emerald-500 text-slate-950 shadow-md font-black'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Growth Journal ({reflections.length})</span>
          </button>
        </div>

        {/* TAB 1: REFLECTION SUBMISSION FORM */}
        {activeTab === 'reflect' && (
          <div className="space-y-4">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Motivational Quote banner */}
                <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-2xl flex items-center gap-3 text-xs text-slate-300">
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <p className="leading-relaxed">
                    <em>
                      "Adversity isn't the end of your flight plan—it's the aerodynamic resistance that lifts your wings
                      when you reflect and extract the lesson."
                    </em>{' '}
                    <span className="text-amber-300 font-bold">— Jeanell Land</span>
                  </p>
                </div>

                {/* Category Selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    What area of growth does this challenge touch?
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => {
                          sound.playClick();
                          setSelectedCategory(cat);
                        }}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                          selectedCategory === cat
                            ? 'bg-emerald-600 text-white border border-emerald-400'
                            : 'bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Optional brief context of challenge */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    The Challenge (Optional brief note)
                  </label>
                  <input
                    type="text"
                    value={challengeText}
                    onChange={(e) => setChallengeText(e.target.value)}
                    placeholder="e.g. Tough quiz, unfair criticism, feeling overwhelmed, or balancing work"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>

                {/* Core Question: What did you learn? */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-emerald-300">
                      What short sentence or lesson did you learn from this challenge? *
                    </label>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {lessonText.length} chars (min 8)
                    </span>
                  </div>
                  <textarea
                    rows={3}
                    required
                    value={lessonText}
                    onChange={(e) => setLessonText(e.target.value)}
                    placeholder="Write a short, honest sentence about the strength, habit, or perspective you gained..."
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors leading-relaxed"
                  />
                </div>

                {/* Starter suggestions */}
                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                    Need inspiration? Click a thought starter:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {PROMPT_STARTERS.slice(0, 3).map((prompt, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          sound.playClick();
                          setLessonText(prompt);
                        }}
                        className="text-[11px] text-left p-1.5 px-2 bg-slate-800/80 hover:bg-slate-750 text-slate-300 rounded-lg border border-slate-700/60 transition-colors cursor-pointer"
                      >
                        "{prompt}"
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={lessonText.trim().length < 8}
                  className="w-full py-3 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-black text-xs rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer transform hover:scale-[1.01]"
                >
                  <Zap className="w-4 h-4 fill-slate-950" />
                  <span>Record Reflection &amp; Boost Resilience (+5% Permanent Boost)</span>
                </button>
              </form>
            ) : (
              /* Success confirmation state */
              <div className="p-6 bg-emerald-950/50 border border-emerald-500/50 rounded-2xl space-y-4 text-center animate-in fade-in zoom-in-95">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-300">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
                    Resilience Fortified
                  </span>
                  <h3 className="text-xl font-black text-white">+{lastBoost}% Permanent Resilience Added!</h3>
                  <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                    Your reflection has been immortalized into your Growth Journal. Each challenge you consciously
                    process permanently elevates your cognitive bandwidth and mental fortitude.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-950/80 rounded-xl border border-emerald-500/30 text-left text-xs space-y-1">
                  <div className="text-[10px] font-mono text-emerald-400 uppercase font-bold">
                    {selectedCategory}
                  </div>
                  <div className="text-slate-200 italic font-serif">"{lessonText}"</div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
                  <button
                    onClick={handleResetForAnother}
                    className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl cursor-pointer transition-colors"
                  >
                    Write Another Reflection
                  </button>
                  {onOpenShareModal && (
                    <button
                      onClick={() => {
                        sound.playClick();
                        onClose();
                        onOpenShareModal();
                      }}
                      className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs rounded-xl cursor-pointer shadow-md transition-all flex items-center gap-1.5"
                      title="Share your new Resilience & STEAM stats on social media"
                    >
                      <Camera className="w-3.5 h-3.5 text-cyan-200" />
                      <span>Share Stats Snapshot</span>
                    </button>
                  )}
                  <button
                    onClick={() => {
                      sound.playClick();
                      onClose();
                    }}
                    className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-xl cursor-pointer shadow-md transition-colors"
                  >
                    Done &amp; Resume Journey
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: GROWTH JOURNAL */}
        {activeTab === 'journal' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Your Cumulative Growth Insights</span>
              <span className="font-mono text-emerald-400">
                Total Boosts: +{reflections.length * 5}% Resilience
              </span>
            </div>

            {reflections.length === 0 ? (
              <div className="p-8 text-center bg-slate-950/60 rounded-2xl border border-slate-800 space-y-2">
                <Brain className="w-8 h-8 text-slate-600 mx-auto" />
                <div className="text-sm font-bold text-slate-400">No reflections logged yet</div>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Take a moment to reflect on a recent obstacle. Documenting your lessons transforms stress into lasting
                  endurance.
                </p>
                <button
                  onClick={() => {
                    sound.playClick();
                    setActiveTab('reflect');
                  }}
                  className="mt-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs cursor-pointer"
                >
                  Write Your First Reflection
                </button>
              </div>
            ) : (
              <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
                {reflections.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-2xl space-y-2 text-xs transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono text-[10px] font-bold border border-emerald-500/30">
                          {item.category}
                        </span>
                        <span className="text-[10px] text-slate-500 flex items-center gap-1 font-mono">
                          <Clock className="w-3 h-3 text-slate-500" />
                          {item.timestamp}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-emerald-400 font-bold">
                          +{item.boostAmount}%
                        </span>
                        <button
                          onClick={() => handleDeleteReflection(item.id)}
                          className="text-slate-600 hover:text-red-400 p-1 transition-colors"
                          title="Delete reflection"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {item.challengeText && (
                      <div className="text-[11px] text-slate-400">
                        <strong className="text-slate-300">Context:</strong> {item.challengeText}
                      </div>
                    )}

                    <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800/80 font-serif text-slate-200 italic leading-relaxed">
                      "{item.lessonLearned}"
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
