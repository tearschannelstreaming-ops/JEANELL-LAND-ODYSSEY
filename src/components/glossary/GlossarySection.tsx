import React, { useState } from 'react';
import { GLOSSARY_ITEMS } from '../../data/glossaryData';
import { GlossaryItem } from '../../types/game';
import { sound } from '../../utils/audio';
import { BookOpen, Search, CheckCircle2, HelpCircle, Award, Sparkles, Filter } from 'lucide-react';

export const GlossarySection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedItem, setSelectedItem] = useState<GlossaryItem | null>(null);

  // Flashcard Quiz Mode
  const [isQuizMode, setIsQuizMode] = useState<boolean>(false);
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizFeedback, setQuizFeedback] = useState<string>('');
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<string | null>(null);

  const categories = [
    'All',
    'Aeronautics & STEM',
    'Real Estate & Housing',
    'Banking & Wealth',
    'Taxes & Legal',
  ];

  const filteredItems = GLOSSARY_ITEMS.filter((item) => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.letter.toLowerCase() === searchTerm.toLowerCase();
    return matchesCat && matchesSearch;
  });

  // Quiz items (take 5 distinct items)
  const quizItems = GLOSSARY_ITEMS.slice(0, 5);
  const currentQuizItem = quizItems[quizIndex];

  // Generate 3 choices for the quiz
  const getQuizOptions = (item: GlossaryItem) => {
    const wrong = GLOSSARY_ITEMS.filter((g) => g.id !== item.id).slice(0, 2);
    const choices = [item, ...wrong].sort(() => 0.5 - Math.random());
    return choices;
  };

  const handleStartQuiz = () => {
    sound.playClick();
    setIsQuizMode(true);
    setQuizIndex(0);
    setQuizScore(0);
    setQuizFeedback('');
    setSelectedQuizAnswer(null);
  };

  const handleAnswerQuiz = (chosenTerm: string) => {
    sound.playClick();
    setSelectedQuizAnswer(chosenTerm);
    if (chosenTerm === currentQuizItem.term) {
      sound.playSuccess();
      setQuizScore((s) => s + 1);
      setQuizFeedback('Correct! You understand the foundational concept.');
    } else {
      sound.playAlert();
      setQuizFeedback(`Incorrect. The correct term is "${currentQuizItem.term}".`);
    }
  };

  const handleNextQuizQuestion = () => {
    sound.playClick();
    setSelectedQuizAnswer(null);
    setQuizFeedback('');
    if (quizIndex < quizItems.length - 1) {
      setQuizIndex(quizIndex + 1);
    } else {
      // Completed quiz
      sound.playSuccess();
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
            <BookOpen className="w-4 h-4" />
            <span>THE S.T.E.A.M. &amp; FINANCIAL CODEX</span>
          </div>
          <h2 className="text-2xl font-bold text-white mt-1">
            ABC’s of Aeronautical Engineering &amp; Wealth
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Comprehensive reference directly derived from Jeanell Land’s Better Forever workbook and aerospace systems curriculum.
          </p>
        </div>

        <button
          onClick={handleStartQuiz}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>{isQuizMode ? 'Restart Flashcard Quiz' : 'Launch Knowledge Quiz'}</span>
        </button>
      </div>

      {/* Quiz Modal / Card if active */}
      {isQuizMode && (
        <div className="bg-slate-950 p-5 rounded-xl border border-cyan-500/50 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
              FLASHCARD CHALLENGE · QUESTION {quizIndex + 1} OF {quizItems.length}
            </span>
            <span className="text-xs font-mono text-emerald-400 tabular-nums">
              Score: {quizScore} / {quizItems.length}
            </span>
          </div>

          <div className="space-y-2">
            <span className="text-xs text-slate-400">Which term matches this definition?</span>
            <p className="text-sm text-white font-medium bg-slate-900 p-3 rounded-lg border border-slate-800 leading-relaxed">
              "{currentQuizItem.definition}"
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {getQuizOptions(currentQuizItem).map((opt) => (
              <button
                key={opt.id}
                onClick={() => !selectedQuizAnswer && handleAnswerQuiz(opt.term)}
                disabled={!!selectedQuizAnswer}
                className={`p-3 rounded-lg text-xs font-semibold border text-left transition-colors ${
                  selectedQuizAnswer === opt.term
                    ? opt.term === currentQuizItem.term
                      ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                      : 'bg-red-950 border-red-500 text-red-200'
                    : selectedQuizAnswer && opt.term === currentQuizItem.term
                    ? 'bg-emerald-950/60 border-emerald-600 text-emerald-300'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                {opt.term}
              </button>
            ))}
          </div>

          {quizFeedback && (
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200">
              <span>{quizFeedback}</span>
              {quizIndex < quizItems.length - 1 ? (
                <button
                  onClick={handleNextQuizQuestion}
                  className="px-3 py-1 bg-cyan-600 hover:bg-cyan-500 text-white rounded font-medium"
                >
                  Next Term
                </button>
              ) : (
                <button
                  onClick={() => setIsQuizMode(false)}
                  className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-medium"
                >
                  Finish Quiz ({quizScore}/{quizItems.length})
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search terms, equations, or definitions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Category Filter Buttons */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                sound.playClick();
                setSelectedCategory(cat);
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-cyan-600 text-white'
                  : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Glossary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              sound.playClick();
              setSelectedItem(item);
            }}
            className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 hover:border-cyan-500/50 cursor-pointer transition-all space-y-2 group"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                {item.term}
              </span>
              <span className="text-[10px] font-mono text-cyan-400 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                {item.letter}
              </span>
            </div>

            <div className="text-[11px] text-slate-500">
              {item.category}
            </div>

            <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
              {item.definition}
            </p>

            {item.authorNote && (
              <p className="text-[11px] text-amber-300/90 italic pt-1 border-t border-slate-800/80 line-clamp-2">
                {item.authorNote}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Detailed Modal if an item is clicked */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-lg w-full p-6 space-y-4 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-xs font-mono text-cyan-400 block mb-0.5">{selectedItem.category}</span>
                <h3 className="text-lg font-bold text-white">{selectedItem.term}</h3>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs leading-relaxed text-slate-300">
              <div>
                <strong className="text-white block mb-1">Foundational Definition:</strong>
                <p className="bg-slate-950 p-3 rounded-lg border border-slate-800">{selectedItem.definition}</p>
              </div>

              <div>
                <strong className="text-white block mb-1">Application in S.T.E.A.Reality:</strong>
                <p className="text-slate-400">{selectedItem.applicationInGame}</p>
              </div>

              {selectedItem.authorNote && (
                <div className="p-3 bg-amber-950/40 border border-amber-500/40 rounded-lg text-amber-200 italic">
                  {selectedItem.authorNote}
                </div>
              )}
            </div>

            <button
              onClick={() => setSelectedItem(null)}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg transition-colors"
            >
              Close Codex
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
