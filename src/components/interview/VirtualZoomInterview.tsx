import React, { useState, useEffect } from 'react';
import { PlayerStats, StudentProfile } from '../../types/game';
import { sound } from '../../utils/audio';
import {
  Video,
  Mic,
  MicOff,
  VideoOff,
  PhoneOff,
  User,
  CheckCircle2,
  Award,
  Sparkles,
  DollarSign,
  Briefcase,
  Share2,
} from 'lucide-react';

interface VirtualZoomInterviewProps {
  playerStats: PlayerStats;
  onUpdateStats: (delta: Partial<PlayerStats>) => void;
  profile: StudentProfile;
}

export const VirtualZoomInterview: React.FC<VirtualZoomInterviewProps> = ({
  playerStats,
  onUpdateStats,
  profile,
}) => {
  const [isCallActive, setIsCallActive] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [isMicMuted, setIsMicMuted] = useState<boolean>(false);
  const [isVideoOn, setIsVideoOn] = useState<boolean>(true);
  const [interviewScore, setInterviewScore] = useState<{ professionalism: number; technical: number }>({
    professionalism: 0,
    technical: 0,
  });
  const [currentFeedback, setCurrentFeedback] = useState<string>('');
  const [offerExtended, setOfferExtended] = useState<boolean>(false);
  const [callDuration, setCallDuration] = useState<number>(0);

  const hasBlazer = profile.inventory?.includes('item_blazer');

  // Interview Questions
  const interviewQuestions = [
    {
      id: 'q1',
      question:
        '“Welcome to Midwest Aerospace Dynamics. In our flight systems division, we often face intense schedule deadlines and unexpected technical turbulence. Tell me about a time in your life when personal adversity tested you, and how you responded.”',
      options: [
        {
          id: 'q1_a',
          text: '“As a young student balancing family duties and midnight calculus, I learned that external doubt is just static friction. I constructed rigorous weekly time-blocking schedules (Better Forever principles) and converted pressure into aerodynamic lift.”',
          profDelta: 30,
          techDelta: 20,
          reaction: '“Outstanding poise. That kind of internal discipline and resilience is exactly what flight systems require.”',
        },
        {
          id: 'q1_b',
          text: '“I usually just work through the night with caffeine until things sort themselves out, though it gets chaotic sometimes.”',
          profDelta: 10,
          techDelta: 10,
          reaction: '“Honest, but reactive. We look for structured problem-solving methodologies.”',
        },
        {
          id: 'q1_c',
          text: '“I blame broken equipment or uncooperative team members when things fall apart.”',
          profDelta: -20,
          techDelta: -10,
          reaction: '“Accountability is essential here; shifting blame is a red flag on our flight line.”',
        },
      ],
    },
    {
      id: 'q2',
      question:
        '“In our telemetry systems, a sudden pressure drop or sensor deviation occurs during a live wind tunnel run. How do you isolate the root failure before aborting the test?”',
      options: [
        {
          id: 'q2_a',
          text: '“I audit the Navier-Stokes pressure differentials at the leading edge, check the angle of attack relative to the critical stall boundary (~14°), and verify sensor harness grounding continuity with a true-RMS multimeter.”',
          profDelta: 25,
          techDelta: 35,
          reaction: '“Superb technical precision. You understand both theoretical fluid mechanics and practical electronics.”',
        },
        {
          id: 'q2_b',
          text: '“I would crank the tunnel airspeed to maximum power to see if the problem clears up on its own.”',
          profDelta: -10,
          techDelta: -25,
          reaction: '“That would tear the airfoil off the mounting rig and damage sensitive laser instrumentation!”',
        },
        {
          id: 'q2_c',
          text: '“I would safely pause the tunnel, review the live log traces, and consult the chief technician before making adjustments.”',
          profDelta: 20,
          techDelta: 15,
          reaction: '“Safe and methodical. Good laboratory protocol.”',
        },
      ],
    },
    {
      id: 'q3',
      question:
        '“Our corporate mission emphasizes community impact and ethical stewardship in Detroit. Why are community mentoring and transparent ethics important to your career?”',
      options: [
        {
          id: 'q3_a',
          text: '“True generational wealth is knowledge shared. Through the One Stop Center and Better Forever framework, lifting up the next generation of women and youth in STEM ensures our engineering advancements benefit the entire community.”',
          profDelta: 35,
          techDelta: 20,
          reaction: '“Inspiring vision. You embody the holistic leadership and character this company is founded on.”',
        },
        {
          id: 'q3_b',
          text: '“I’m mostly here for the high salary, but I don’t mind attending an occasional charity dinner.”',
          profDelta: 0,
          techDelta: 0,
          reaction: '“We look for engineers whose values align with our civic commitments.”',
        },
      ],
    },
  ];

  // Call timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isCallActive && !offerExtended) {
      timer = setInterval(() => {
        setCallDuration((c) => c + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isCallActive, offerExtended]);

  const handleStartCall = () => {
    sound.playClick();
    setIsCallActive(true);
    setCurrentQuestionIndex(0);
    setCallDuration(0);
    setOfferExtended(false);
    setCurrentFeedback(
      hasBlazer
        ? '“Hello! I notice you are wearing an executive blazer and sharp attire. That speaks volumes about your respect for our team.”'
        : '“Welcome to the virtual interview room. Please ensure your microphone and camera are clear.”'
    );
    setInterviewScore({
      professionalism: hasBlazer ? 20 : 10,
      technical: 10,
    });
  };

  const handleAnswer = (opt: (typeof interviewQuestions)[0]['options'][0]) => {
    sound.playClick();
    const newProf = interviewScore.professionalism + opt.profDelta;
    const newTech = interviewScore.technical + opt.techDelta;

    setInterviewScore({
      professionalism: newProf,
      technical: newTech,
    });
    setCurrentFeedback(opt.reaction);

    if (opt.profDelta > 0) {
      sound.playSuccess();
    } else {
      sound.playAlert();
    }

    if (currentQuestionIndex < interviewQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex((prev) => prev + 1);
        setCurrentFeedback('');
      }, 2500);
    } else {
      // Completed interview evaluation
      setTimeout(() => {
        const total = newProf + newTech;
        if (total >= 70) {
          sound.playSuccess();
          setOfferExtended(true);
          onUpdateStats({
            steamMastery: 25,
            financialAcumen: 25,
            resilience: 20,
            earningsBalance: 3500, // $3,500 signing bonus
          });
        } else {
          sound.playAlert();
        }
      }, 2500);
    }
  };

  const handleEndCall = () => {
    sound.playClick();
    setIsCallActive(false);
    setCallDuration(0);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const totalScore = interviewScore.professionalism + interviewScore.technical;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
            <Video className="w-4 h-4" />
            <span>VIRTUAL INTERVIEW ROOM · REMOTE VIDEO CONFERENCING</span>
          </div>
          <h2 className="text-2xl font-bold text-white mt-1">
            Live Employer Video Interview &amp; Hiring Evaluation
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Test your poise, technical reasoning, and professional presence in simulated virtual video interviews with real Detroit and aerospace employers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {hasBlazer ? (
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/70 border border-emerald-500/50 px-2.5 py-1 rounded-lg flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Executive Attire Equipped (+15% Impression)</span>
            </span>
          ) : (
            <span className="text-xs font-mono text-slate-500 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
              Standard Attire (Shop has Executive Blazer)
            </span>
          )}
        </div>
      </div>

      {!isCallActive ? (
        /* Call Lobby / Pre-Interview Screen */
        <div className="bg-slate-950 p-8 rounded-xl border border-slate-800 text-center max-w-lg mx-auto space-y-4 shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
            <Video className="w-8 h-8" />
          </div>

          <div>
            <h3 className="text-lg font-bold text-white">Midwest Aerospace &amp; Flight Systems</h3>
            <p className="text-xs text-slate-400 mt-1">
              Interview for Position: <strong className="text-cyan-300">Senior Flight Systems Lead</strong>
            </p>
            <p className="text-xs text-slate-400">Interviewer: Dr. Evelyn Vance (Chief Research Scientist)</p>
          </div>

          <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs text-slate-300 space-y-1 text-left">
            <div className="font-semibold text-white">Interview Protocol:</div>
            <div>• Three structured technical &amp; behavioral questions</div>
            <div>• Real-time Professionalism &amp; Technical Accuracy scoring</div>
            <div>• $85,000 / year offer + $3,500 signing bonus upon 70%+ pass score</div>
          </div>

          <button
            onClick={handleStartCall}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-colors shadow-lg flex items-center justify-center gap-2"
          >
            <Video className="w-4 h-4" />
            <span>Join Video Interview Room</span>
          </button>
        </div>
      ) : (
        /* Active Video Call Interface (Zoom-Style) */
        <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl space-y-0">
          {/* Top Video Call Bar */}
          <div className="bg-slate-900/90 px-5 py-3 border-b border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
              <span className="font-bold text-white">Midwest Aerospace Video Interview</span>
              <span className="text-slate-500 font-mono">· Duration: {formatTime(callDuration)}</span>
            </div>

            <div className="flex items-center gap-3 font-mono text-[11px]">
              <span className="text-cyan-400">Prof: {interviewScore.professionalism}%</span>
              <span className="text-emerald-400">Tech: {interviewScore.technical}%</span>
              <span className="text-white font-bold">Total: {totalScore}%</span>
            </div>
          </div>

          {/* Main Video Stage */}
          <div className="relative aspect-video max-h-[460px] bg-slate-900 flex items-center justify-center overflow-hidden">
            {/* Interviewer Video Simulation */}
            <div className="text-center space-y-3 p-6 z-10">
              <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-cyan-600 to-emerald-500 border-4 border-slate-800 flex items-center justify-center mx-auto text-white shadow-xl">
                <User className="w-14 h-14" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Dr. Evelyn Vance</h4>
                <p className="text-xs text-cyan-300 font-mono">Chief Research Scientist · Midwest Aerospace</p>
              </div>

              {/* Animated Speaking Waveform */}
              <div className="flex justify-center items-center gap-1 h-4">
                {[12, 24, 16, 28, 20, 14, 26].map((h, i) => (
                  <div
                    key={i}
                    style={{ height: `${h}px` }}
                    className="w-1 bg-emerald-400 rounded-full animate-pulse"
                  />
                ))}
              </div>
            </div>

            {/* Self-View Picture-in-Picture (Bottom-Right) */}
            <div className="absolute bottom-4 right-4 w-36 sm:w-44 aspect-video bg-slate-950 rounded-xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col justify-between p-2 z-20">
              <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
                <span>Self-View</span>
                <span className="text-emerald-400">HD</span>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-slate-300">
                  <User className="w-4 h-4" />
                </div>
                <span className="text-[10px] text-white font-bold block mt-0.5">{profile.name} (Candidate)</span>
              </div>
              <div className="text-[9px] text-slate-500 text-right font-mono">
                {isMicMuted ? 'Muted' : 'Mic Active'}
              </div>
            </div>
          </div>

          {/* Question / Dialogue Card Area */}
          <div className="p-5 bg-slate-950 border-t border-slate-800 space-y-4">
            {!offerExtended ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-cyan-400 font-mono uppercase">
                    QUESTION {currentQuestionIndex + 1} OF {interviewQuestions.length}
                  </span>
                  <span className="text-slate-400 text-xs">Select your verbal response:</span>
                </div>

                <p className="text-sm text-slate-100 font-medium bg-slate-900 p-3.5 rounded-xl border border-slate-800 leading-relaxed">
                  {interviewQuestions[currentQuestionIndex].question}
                </p>

                {currentFeedback && (
                  <div className="p-3 bg-slate-900/90 rounded-lg border border-cyan-500/40 text-xs text-cyan-300 italic">
                    Interviewer reaction: {currentFeedback}
                  </div>
                )}

                <div className="grid grid-cols-1 gap-2.5">
                  {interviewQuestions[currentQuestionIndex].options.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => handleAnswer(opt)}
                      className="p-3 rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-850 hover:border-cyan-500/50 text-left text-xs text-slate-200 transition-colors leading-relaxed"
                    >
                      {opt.text}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* Offer Extended Screen */
              <div className="bg-slate-900 p-5 rounded-xl border border-emerald-500/50 space-y-3 animate-in fade-in">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <Sparkles className="w-5 h-5" />
                  <span>OFFICIAL EMPLOYMENT OFFER EXTENDED!</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  “Congratulations, {profile.name}! Your interview score of {totalScore}% exceeded our senior qualification standards. We are extending a formal contract for Senior Flight Systems Lead at $85,000/year, and your $3,500 signing bonus has been deposited directly into your wallet balance!”
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={handleEndCall}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg"
                  >
                    Accept Offer &amp; Return to City Map
                  </button>
                </div>
              </div>
            )}

            {/* Video Call Controls Toolbar */}
            <div className="flex items-center justify-center gap-3 pt-3 border-t border-slate-800/80">
              <button
                onClick={() => {
                  sound.playClick();
                  setIsMicMuted(!isMicMuted);
                }}
                className={`p-2.5 rounded-full border transition-colors ${
                  isMicMuted ? 'bg-red-950 border-red-500 text-red-300' : 'bg-slate-900 border-slate-700 text-slate-200'
                }`}
                title="Mute/Unmute Mic"
              >
                {isMicMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  setIsVideoOn(!isVideoOn);
                }}
                className={`p-2.5 rounded-full border transition-colors ${
                  !isVideoOn ? 'bg-red-950 border-red-500 text-red-300' : 'bg-slate-900 border-slate-700 text-slate-200'
                }`}
                title="Toggle Video"
              >
                {!isVideoOn ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4" />}
              </button>

              <button
                onClick={handleEndCall}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-full flex items-center gap-1.5 shadow-md"
              >
                <PhoneOff className="w-4 h-4" />
                <span>Leave Meeting</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
