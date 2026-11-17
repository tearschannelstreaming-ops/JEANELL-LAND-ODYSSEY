import React, { useState, useEffect, useRef } from 'react';
import { StoryStep, StudentProfile, PlayerStats } from '../../types/game';
import { sound } from '../../utils/audio';
import {
  Sparkles,
  Plane,
  Building2,
  Send,
  X,
  BookOpen,
  Compass,
  ChevronRight,
  RefreshCw,
  Shield,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'mentor';
  text: string;
  timestamp: string;
  topic?: 'aeronautics' | 'community' | 'general';
  chapterTitle?: string;
}

interface MentorChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentStoryStep?: StoryStep;
  allSteps: StoryStep[];
  profile: StudentProfile;
  playerStats?: PlayerStats;
}

const PRESET_QUESTIONS: {
  topic: 'aeronautics' | 'community' | 'general';
  categoryLabel: string;
  icon: any;
  questions: { text: string }[];
}[] = [
  {
    topic: 'aeronautics',
    categoryLabel: 'Aeronautical Engineering & Flight Physics',
    icon: Plane,
    questions: [
      { text: 'How does Bernoulli’s Principle generate aerodynamic lift on an airfoil?' },
      { text: 'What is the critical stall boundary at 14° angle of attack (AoA)?' },
      { text: 'How did your aeronautical engineering training help you solve problems under intense pressure in Detroit?' },
      { text: 'What math and physics concepts from high school were most vital when studying aerospace flight dynamics?' },
    ],
  },
  {
    topic: 'community',
    categoryLabel: 'Community Development & Better Forever Wealth',
    icon: Building2,
    questions: [
      { text: 'How did you transform abandoned Detroit properties into thriving community assets with One Stop Rehabilitation Center?' },
      { text: 'What is the "Better Forever" philosophy and how can youth apply it daily?' },
      { text: 'How do you structure fair lease-to-own programs for families facing credit barriers?' },
      { text: 'How can youth build social capital and allies in high school without succumbing to peer pressure or bullying?' },
    ],
  },
  {
    topic: 'general',
    categoryLabel: 'Resilience & Overcoming Adversity',
    icon: Compass,
    questions: [
      { text: 'Who was "Goldie", and how did you survive raising four children alone in Detroit?' },
      { text: 'How did surviving a gunshot wound at age 33 force you to retire from the streets?' },
      { text: 'How did spending 26 days falsely jailed at age 40 inspire you to create One Stop Rehab Center?' },
      { text: 'What led you to become a licensed foster parent and advocate for aged-out youth?' },
      { text: 'What should someone do when they make a huge mistake and feel their character is compromised?' },
    ],
  },
];

export const MentorChatModal: React.FC<MentorChatModalProps> = ({
  isOpen,
  onClose,
  currentStoryStep,
  allSteps,
  profile,
  playerStats,
}) => {
  const [selectedActIndex, setSelectedActIndex] = useState<number>(
    currentStoryStep?.actNumber ?? 0
  );
  const [activeFilterTopic, setActiveFilterTopic] = useState<'all' | 'aeronautics' | 'community'>('all');
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sync selectedActIndex if currentStoryStep changes
  useEffect(() => {
    if (currentStoryStep) {
      setSelectedActIndex(currentStoryStep.actNumber);
    }
  }, [currentStoryStep]);

  const activeStep: StoryStep =
    allSteps.find((s) => s.actNumber === selectedActIndex) || allSteps[0];

  const studentName = profile?.name || 'Amari';

  // Initial welcome message based on selected chapter
  useEffect(() => {
    if (messages.length === 0 && activeStep) {
      setMessages([
        {
          id: 'welcome_msg',
          sender: 'mentor',
          text: `Greetings ${studentName}! I'm Jeanell Land. Right now in your simulation, we are reflecting on **${activeStep.actTitle}**: *"${activeStep.sceneTitle}"* (${activeStep.yearRange || 'Detroit'}). \n\nWhether you have questions about the flight physics of an airfoil, how we engineered solutions in aerospace, or how we revitalized historic neighborhoods in Detroit with the *Better Forever* mindset, ask me anything. Every challenge you face is raw fuel for your resilience!`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          chapterTitle: activeStep.actTitle,
        },
      ]);
    }
  }, [activeStep, messages.length, studentName]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    sound.playClick();

    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/mentor-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userQuestion: text,
          message: text,
          chapterTitle: `${activeStep.actTitle}: ${activeStep.sceneTitle}`,
          chapterContext: `${activeStep.historicalContext} ${activeStep.summary}`,
          actNumber: activeStep.actNumber,
          yearRange: activeStep.yearRange,
          topic: activeFilterTopic === 'all' ? 'general' : activeFilterTopic,
          studentAge: profile.age,
          history: messages.slice(-6).map((m) => ({
            role: m.sender === 'user' ? 'user' : 'model',
            text: m.text,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      sound.playSuccess();

      const mentorMsg: ChatMessage = {
        id: `mentor_${Date.now()}`,
        sender: 'mentor',
        text: data.reply || "Keep pushing forward. Every equation solved and every neighborhood block restored begins with conviction.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        chapterTitle: activeStep.actTitle,
      };

      setMessages((prev) => [...prev, mentorMsg]);
    } catch (err: any) {
      console.error('Mentor chat error:', err);
      // Helpful fallback with grounded wisdom
      const fallbackMsg: ChatMessage = {
        id: `mentor_fallback_${Date.now()}`,
        sender: 'mentor',
        text: `In both aeronautics and community development, turbulent air will test your equilibrium. When studying Bernoulli's principle ($P_1 + \\frac{1}{2}\\rho v_1^2 = P_2 + \\frac{1}{2}\\rho v_2^2$), faster air velocity creates lower pressure over the wing, lifting the plane into the sky. Similarly in Detroit community building, creating positive momentum and opportunities lifts the entire neighborhood. Never allow temporary setbacks to ground your flight!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        chapterTitle: activeStep.actTitle,
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectChapter = (actNum: number) => {
    sound.playClick();
    setSelectedActIndex(actNum);
    const step = allSteps.find((s) => s.actNumber === actNum);
    if (step) {
      const switchNote: ChatMessage = {
        id: `switch_${Date.now()}`,
        sender: 'mentor',
        text: `Switched perspective to **${step.actTitle}**: *${step.sceneTitle}* (${step.yearRange || 'Detroit'}). What engineering challenges or community lessons would you like to explore here?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        chapterTitle: step.actTitle,
      };
      setMessages((prev) => [...prev, switchNote]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl w-full max-w-5xl h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header Bar */}
        <div className="p-4 bg-gradient-to-r from-emerald-950/80 via-slate-900 to-indigo-950/80 border-b border-emerald-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-500 flex items-center justify-center shadow-lg border border-emerald-300/40 text-white font-black text-xl">
                JL
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-slate-900 rounded-full animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-white tracking-wide">
                  Jeanell Land, Mentor AI
                </h2>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Live Guidance
                </span>
              </div>
              <p className="text-xs text-slate-300 flex items-center gap-2">
                <span>Aeronautical Engineer</span>
                <span>•</span>
                <span>Detroit Community Developer</span>
                <span>•</span>
                <span>Better Forever Foundation</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sound.playClick();
                setMessages([]);
              }}
              title="Reset conversation"
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors text-xs flex items-center gap-1 border border-slate-700/50"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="hidden sm:inline">Reset</span>
            </button>
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Chapter Selection Pillstrip */}
        <div className="bg-slate-950/80 px-4 py-2 border-b border-slate-800 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-slate-400 font-bold whitespace-nowrap flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
            Chapter Context:
          </span>
          {allSteps.map((step) => {
            const isSelected = selectedActIndex === step.actNumber;
            return (
              <button
                key={step.id}
                onClick={() => handleSelectChapter(step.actNumber)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60'
                }`}
              >
                <span>Act {step.actNumber}</span>
                <span className="hidden md:inline text-[11px] opacity-80 truncate max-w-[140px]">
                  {step.sceneTitle}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Left / Bottom Sidebar: Prompt Starter Decks */}
          <div className="w-full md:w-80 bg-slate-950/60 border-b md:border-b-0 md:border-r border-slate-800/80 flex flex-col p-3 overflow-y-auto max-h-48 md:max-h-full">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Featured Topics
              </span>
              <div className="flex gap-1 text-[10px]">
                <button
                  onClick={() => setActiveFilterTopic('all')}
                  className={`px-1.5 py-0.5 rounded ${
                    activeFilterTopic === 'all'
                      ? 'bg-emerald-500/30 text-emerald-300 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setActiveFilterTopic('aeronautics')}
                  className={`px-1.5 py-0.5 rounded ${
                    activeFilterTopic === 'aeronautics'
                      ? 'bg-sky-500/30 text-sky-300 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Aero
                </button>
                <button
                  onClick={() => setActiveFilterTopic('community')}
                  className={`px-1.5 py-0.5 rounded ${
                    activeFilterTopic === 'community'
                      ? 'bg-amber-500/30 text-amber-300 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Community
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {PRESET_QUESTIONS.filter(
                (deck) => activeFilterTopic === 'all' || deck.topic === activeFilterTopic
              ).map((deck, idx) => {
                const IconComponent = deck.icon;
                return (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800/80 space-y-1.5"
                  >
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200">
                      <IconComponent
                        className={`w-4 h-4 ${
                          deck.topic === 'aeronautics'
                            ? 'text-sky-400'
                            : deck.topic === 'community'
                            ? 'text-amber-400'
                            : 'text-emerald-400'
                        }`}
                      />
                      <span>{deck.categoryLabel}</span>
                    </div>
                    <div className="space-y-1">
                      {deck.questions.map((q, qIdx) => (
                        <button
                          key={qIdx}
                          onClick={() => handleSendMessage(q.text)}
                          disabled={isLoading}
                          className="w-full text-left p-1.5 rounded-lg text-[11px] leading-tight text-slate-300 hover:text-emerald-300 hover:bg-emerald-950/30 border border-transparent hover:border-emerald-500/30 transition-all flex items-start gap-1 group"
                        >
                          <ChevronRight className="w-3 h-3 text-slate-500 group-hover:text-emerald-400 shrink-0 mt-0.5" />
                          <span>{q.text}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Context Card */}
            <div className="mt-auto pt-3 hidden md:block">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-950/40 to-slate-900 border border-emerald-500/20 text-[11px] text-slate-300">
                <div className="font-bold text-emerald-400 mb-1 flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5" /> Active Story Chapter
                </div>
                <p className="line-clamp-2 text-slate-400 text-[10px]">
                  {activeStep.sceneTitle} ({activeStep.yearRange}) - {activeStep.location}
                </p>
                <div className="mt-2 text-[10px] text-emerald-300 font-semibold">
                  Resilience Score: {playerStats?.resilience ?? 65}/100
                </div>
              </div>
            </div>
          </div>

          {/* Right Main Area: Chat Thread */}
          <div className="flex-1 flex flex-col bg-slate-900/60 overflow-hidden">
            {/* Scrollable messages container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => {
                const isMentor = msg.sender === 'mentor';
                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-3 ${
                      isMentor ? 'justify-start' : 'justify-end'
                    }`}
                  >
                    {isMentor && (
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-black text-xs shrink-0 shadow-md">
                        JL
                      </div>
                    )}
                    <div
                      className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 shadow-md ${
                        isMentor
                          ? 'bg-slate-800/90 border border-slate-700/80 text-slate-100'
                          : 'bg-emerald-600 text-white ml-auto'
                      }`}
                    >
                      {isMentor && (
                        <div className="flex items-center justify-between text-[11px] text-emerald-400 mb-1 font-bold">
                          <span className="flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-emerald-400" />
                            Jeanell Land • {msg.chapterTitle || 'Odyssey'}
                          </span>
                          <span className="text-slate-400 font-normal">{msg.timestamp}</span>
                        </div>
                      )}
                      {!isMentor && (
                        <div className="text-[11px] text-emerald-100/80 mb-1 font-semibold text-right">
                          {studentName} • {msg.timestamp}
                        </div>
                      )}

                      <div className="text-sm leading-relaxed whitespace-pre-line space-y-2">
                        {msg.text.split('\n\n').map((para, pIdx) => (
                          <p key={pIdx}>
                            {para}
                          </p>
                        ))}
                      </div>
                    </div>
                    {!isMentor && (
                      <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400 font-bold text-xs shrink-0">
                        {studentName.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-black text-xs shrink-0 animate-pulse">
                    JL
                  </div>
                  <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-4 text-slate-300 text-xs flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>Jeanell Land is reflecting on flight dynamics and community strategy...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-slate-950/90 border-t border-slate-800">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder={`Ask Jeanell about aerodynamics, flight tests, or Detroit neighborhood revitalization...`}
                  className="flex-1 bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim() || isLoading}
                  className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm flex items-center gap-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/20"
                >
                  <Send className="w-4 h-4" />
                  <span className="hidden sm:inline">Ask Mentor</span>
                </button>
              </form>
              <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 px-1">
                <span>
                  Context-aware mentor powered by Gemini 2.5 • Grounded in Jeanell Land's life
                </span>
                <span className="text-emerald-400 font-medium hidden sm:inline">
                  Aeronautics & Community Development
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
