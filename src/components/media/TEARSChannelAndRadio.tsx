import React, { useState, useEffect, useRef } from 'react';
import { TEARSMediaProgram } from '../../types/game';
import { sound } from '../../utils/audio';
import {
  Radio,
  Tv,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Sparkles,
  Music,
  Mic,
  Clock,
  CheckCircle2,
  RadioTower,
  ShieldAlert,
  FileText,
  AlertTriangle,
  ArrowRight,
  Scale,
  Download,
  BadgeCheck,
} from 'lucide-react';

export const TEARS_SHOWS: TEARSMediaProgram[] = [
  {
    id: 'show_1',
    title: 'The Better Forever Show: From Teen Mom to Aeronautical Engineer',
    host: 'Jeanell Land',
    duration: '28:40',
    category: 'Financial Freedom',
    description:
      'Jeanell Land shares her authentic journey through young motherhood in Detroit, midnight calculus, aerospace labs, and founding One Stop Rehabilitation Center.',
    broadcastTopic: 'Resilience, Aerodynamics, and Breaking Through Generational Poverty',
  },
  {
    id: 'show_2',
    title: 'Detroit Real Estate Masterclass: NACA Multi-Family Wealth',
    host: 'Jeanell Land & Kendra Barnes',
    duration: '34:15',
    category: 'Real Estate Masterclass',
    description:
      'How to evaluate 4-unit apartment buildings in Detroit, utilize NACA zero-down programs, and shelter cash flow with IRS depreciation.',
    broadcastTopic: 'Cap Rates, Amortization, and Property Rehabilitation',
  },
  {
    id: 'show_3',
    title: 'S.T.E.A.M. Horizons: Youth Rocketry & Wind Tunnel Innovation',
    host: 'Marcus Vance & Jeanell Land',
    duration: '22:10',
    category: 'Youth S.T.E.A.M.',
    description:
      'High school students from One Stop Center test airfoil camber and rocket stage separation, showing that hands-on STEM changes lives.',
    broadcastTopic: 'Tsiolkovsky Equation, Aerodynamic Lift, and Avionics',
  },
  {
    id: 'show_4',
    title: 'T.E.A.R.S. Channel Community Spotlight: Mental Health & Healing',
    host: 'Jeanell Land (Certified Mental Health Coach)',
    duration: '31:50',
    category: 'Community News',
    description:
      'Trauma-informed coaching, domestic violence protection, and holistic community support for families in transition.',
    broadcastTopic: 'Emotional Wellness, Overcoming Addiction, and Generational Legacy',
  },
];

export const TEARSChannelAndRadio: React.FC = () => {
  const [activeMediaTab, setActiveMediaTab] = useState<'tv' | 'radio'>('tv');

  // Video State
  const [selectedShow, setSelectedShow] = useState<TEARSMediaProgram>(TEARS_SHOWS[0]);
  const [isPlayingVideo, setIsPlayingVideo] = useState<boolean>(true);
  const [videoTimestampSec, setVideoTimestampSec] = useState<number>(142);

  // Radio State
  const [isRadioPlaying, setIsRadioPlaying] = useState<boolean>(false);
  const [radioFreq, setRadioFreq] = useState<number>(100.1); // MHz
  const [activeSegmentIndex, setActiveSegmentIndex] = useState<number>(0);
  const [isFccDetailsOpen, setIsFccDetailsOpen] = useState<boolean>(true);
  const [activeStrategyTab, setActiveStrategyTab] = useState<'reconsideration' | 'nce_lpfm' | 'translator' | 'digital'>('reconsideration');

  // Procedural Radio Synth Ref
  const radioOscRef = useRef<OscillatorNode | null>(null);
  const radioGainRef = useRef<GainNode | null>(null);

  const radioSegments = [
    {
      title: 'Morning Financial Affirmations with Jeanell Land',
      host: 'Jeanell Land (Live from Detroit Studios)',
      transcript:
        '“Good morning Detroit! Remember: The earlier you learn, the earlier you earn. Take control of your weekly planner today. Eat a balanced meal, turn off the noise, and align your passion with your purpose. You have the power to build generational wealth.”',
    },
    {
      title: 'Detroit Trade Spotlight: The Backbone of Our City',
      host: 'Guest Marcus Vance',
      transcript:
        '“We’re talking with vocational apprentices today. From master plumbers troubleshooting water pressure in historic duplexes to aerospace technicians wiring rocket avionics, skilled hands and sharp minds build the future.”',
    },
    {
      title: 'Community Call-In: Overcoming Adversity',
      host: 'Caller Kendra Barnes',
      transcript:
        '“Hello Jeanell! I’m calling in to thank you for teaching our community about NACA mortgages and life insurance. My family just closed on our first 2-family flat with zero down payment!”',
    },
  ];

  // Video playback loop
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlayingVideo) {
      interval = setInterval(() => {
        setVideoTimestampSec((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlayingVideo]);

  // Procedural Web Audio Synth for 100.1 FM Radio
  useEffect(() => {
    if (isRadioPlaying) {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) {
          const ctx = new AudioCtx();
          const isTuned = Math.abs(radioFreq - 100.1) < 0.2;

          if (isTuned) {
            // Warm Detroit Soul Chord Triad (F-minor / Ab / C)
            const osc1 = ctx.createOscillator();
            const gain = ctx.createGain();
            osc1.type = 'triangle';
            osc1.frequency.setValueAtTime(174.61, ctx.currentTime); // F3 warm bass
            gain.gain.setValueAtTime(0.04, ctx.currentTime);
            osc1.connect(gain);
            gain.connect(ctx.destination);
            osc1.start();
            radioOscRef.current = osc1;
            radioGainRef.current = gain;
          } else {
            // Static noise when tuning off frequency
            const osc1 = ctx.createOscillator();
            const gain = ctx.createGain();
            osc1.type = 'sawtooth';
            osc1.frequency.setValueAtTime(80 + Math.random() * 40, ctx.currentTime);
            gain.gain.setValueAtTime(0.02, ctx.currentTime);
            osc1.connect(gain);
            gain.connect(ctx.destination);
            osc1.start();
            radioOscRef.current = osc1;
            radioGainRef.current = gain;
          }
        }
      } catch {
        // silent
      }
    } else {
      if (radioOscRef.current) {
        try {
          radioOscRef.current.stop();
          radioOscRef.current.disconnect();
        } catch {}
        radioOscRef.current = null;
      }
    }

    return () => {
      if (radioOscRef.current) {
        try {
          radioOscRef.current.stop();
          radioOscRef.current.disconnect();
        } catch {}
        radioOscRef.current = null;
      }
    };
  }, [isRadioPlaying, radioFreq]);

  const handleToggleRadio = () => {
    sound.playClick();
    setIsRadioPlaying(!isRadioPlaying);
  };

  const formatVideoTime = (totalSec: number) => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const isStationTuned = Math.abs(radioFreq - 100.1) < 0.2;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-400">
            <RadioTower className="w-4 h-4" />
            <span>T.E.A.R.S. CHANNEL MARKETING &amp; MEDIA NETWORK</span>
          </div>
          <h2 className="text-2xl font-bold text-white mt-1">
            T.E.A.R.S. Channel Video &amp; TEARadio 100.1 FM Detroit
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Directed by Jeanell Land: Watch educational community broadcasts and tune into 100.1 FM Detroit for live financial affirmations and S.T.E.A.M. conversations.
          </p>
        </div>

        {/* Media Switcher Tabs */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 gap-1 text-xs">
          <button
            onClick={() => {
              sound.playClick();
              setActiveMediaTab('tv');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-colors ${
              activeMediaTab === 'tv'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Tv className="w-4 h-4" />
            <span>T.E.A.R.S. Channel Video</span>
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setActiveMediaTab('radio');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-colors ${
              activeMediaTab === 'radio'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Radio className="w-4 h-4" />
            <span>TEARadio 100.1 FM</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: T.E.A.R.S. CHANNEL VIDEO TV PLAYER */}
      {activeMediaTab === 'tv' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Video Monitor (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="relative aspect-video bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl flex flex-col justify-between p-5">
              {/* Broadcast Watermark */}
              <div className="flex items-center justify-between text-xs font-mono z-10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                  <span className="font-bold text-white tracking-wider">T.E.A.R.S. CHANNEL BROADCAST</span>
                </div>
                <span className="text-cyan-400 bg-slate-900/90 px-2 py-0.5 rounded border border-slate-800">
                  Detroit Media Studio
                </span>
              </div>

              {/* Central Video Monitor with Actual MP4 Playback */}
              <div className="my-auto rounded-xl overflow-hidden bg-black border border-slate-800 relative z-10 aspect-video flex items-center justify-center">
                <video
                  src="/assets/aistudio/T.E.A.R.S._Splash_Video_bc80f339.mp4"
                  controls
                  autoPlay={isPlayingVideo}
                  loop
                  playsInline
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="z-10 text-center pb-1">
                <span className="text-[11px] font-mono text-amber-400 uppercase tracking-widest block">
                  {selectedShow.category} · {selectedShow.title}
                </span>
                <p className="text-[11px] text-slate-300 font-mono">Host: {selectedShow.host}</p>
              </div>

              {/* Lower Third Ticker */}
              <div className="z-10 bg-slate-900/90 p-3 rounded-xl border border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span className="text-rose-400 font-bold uppercase">Topic: {selectedShow.broadcastTopic}</span>
                  <span>{formatVideoTime(videoTimestampSec)} / {selectedShow.duration}</span>
                </div>
                <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${Math.min(100, (videoTimestampSec / 1800) * 100)}%` }}
                    className="h-full bg-rose-500 rounded-full"
                  />
                </div>
              </div>
            </div>

            {/* Video Controls */}
            <div className="flex items-center justify-between bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    sound.playClick();
                    setIsPlayingVideo(!isPlayingVideo);
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg font-bold transition-colors"
                >
                  {isPlayingVideo ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isPlayingVideo ? 'Pause Episode' : 'Play Episode'}</span>
                </button>
              </div>

              <div className="text-slate-400 text-xs">
                Director of Marketing: <strong className="text-white">Jeanell Land</strong> · Detroit, MI
              </div>
            </div>
          </div>

          {/* Episode Guide Playlist (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              T.E.A.R.S. PROGRAM GUIDE:
            </span>

            <div className="space-y-2.5">
              {TEARS_SHOWS.map((show) => {
                const isSelected = selectedShow.id === show.id;

                return (
                  <div
                    key={show.id}
                    onClick={() => {
                      sound.playClick();
                      setSelectedShow(show);
                      setVideoTimestampSec(12);
                    }}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all space-y-1.5 ${
                      isSelected
                        ? 'bg-slate-950 border-rose-500 ring-1 ring-rose-500 shadow-lg'
                        : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="text-cyan-400">{show.category}</span>
                      <span className="text-slate-500">{show.duration}</span>
                    </div>

                    <h4 className="text-xs font-bold text-white leading-snug line-clamp-2">{show.title}</h4>
                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">{show.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: TEARADIO 100.1 FM LIVE DETROIT RADIO */}
      {activeMediaTab === 'radio' && (
        <div className="space-y-6">
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6">
            {/* Radio Frequency Tuner Display */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-xl bg-slate-900 border border-slate-800">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-rose-950 border border-rose-500/50 flex items-center justify-center text-rose-400">
                  <Radio className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold font-mono text-white tabular-nums">
                      {radioFreq.toFixed(1)}
                    </span>
                    <span className="text-sm font-bold text-rose-400 font-mono">MHz FM</span>
                  </div>
                  <span className="text-xs text-slate-400">
                    {isStationTuned ? 'TEARadio 100.1 FM · The Voice of Detroit' : 'Searching Frequency · Static'}
                  </span>
                </div>
              </div>

              {/* Station Presets */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    sound.playClick();
                    setRadioFreq(100.1);
                  }}
                  className={`px-3 py-1.5 text-xs font-mono font-bold rounded-lg border transition-colors ${
                    isStationTuned
                      ? 'bg-rose-600 border-rose-500 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  PRESET: 100.1 FM (TEARadio)
                </button>

                <button
                  onClick={handleToggleRadio}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold transition-colors shadow-md ${
                    isRadioPlaying
                      ? 'bg-amber-600 hover:bg-amber-500 text-white'
                      : 'bg-rose-600 hover:bg-rose-500 text-white'
                  }`}
                >
                  {isRadioPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isRadioPlaying ? 'Turn Off Radio' : 'Power On TEARadio (Live Stream)'}</span>
                </button>
              </div>
            </div>

            {/* Frequency Tuning Slider */}
            <div className="space-y-1.5 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
              <div className="flex justify-between text-xs text-slate-300 font-mono">
                <span>FM Dial Tuner</span>
                <span className="text-cyan-400">{radioFreq.toFixed(1)} FM</span>
              </div>
              <input
                type="range"
                min="88.1"
                max="107.9"
                step="0.2"
                value={radioFreq}
                onChange={(e) => {
                  setRadioFreq(parseFloat(e.target.value));
                  sound.playAeroTone(180 + parseFloat(e.target.value) * 3);
                }}
                className="w-full h-2.5 bg-slate-950 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>88.1</span>
                <span>94.5</span>
                <span className="text-rose-400 font-bold">100.1 (TEARadio Detroit)</span>
                <span>105.9</span>
                <span>107.9</span>
              </div>
            </div>

            {/* Live Radio Transcript & Segment Spotlight */}
            <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Mic className="w-4 h-4" />
                  <span>ON AIR: {radioSegments[activeSegmentIndex].title}</span>
                </span>
                <span className="text-xs text-slate-500 font-mono">Live Studio Broadcast</span>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-slate-200 text-xs leading-relaxed italic">
                {radioSegments[activeSegmentIndex].transcript}
              </div>

              {/* Segment Switcher */}
              <div className="flex gap-2">
                {radioSegments.map((seg, idx) => (
                  <button
                    key={seg.title}
                    onClick={() => {
                      sound.playClick();
                      setActiveSegmentIndex(idx);
                    }}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                      activeSegmentIndex === idx
                        ? 'bg-rose-950/70 border-rose-500 text-rose-200'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Segment #{idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Official FCC Broadcast Licensing Action Center & Strategy Roadmap */}
            <div className="bg-slate-900 border-2 border-rose-500/50 rounded-2xl p-5 sm:p-6 space-y-5 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

              {/* Status Header */}
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-gradient-to-r from-rose-500 to-amber-500 text-slate-950 font-mono flex items-center gap-1.5">
                      <ShieldAlert className="w-3.5 h-3.5" />
                      FCC LMS ACTION DOCKET · FILE #0000303897
                    </span>
                    <span className="text-[10px] font-mono text-rose-300 bg-rose-950/80 border border-rose-500/40 px-2 py-0.5 rounded font-bold">
                      Status: Dismissed (10/21/2026)
                    </span>
                    <span className="text-[10px] font-mono text-amber-300 bg-amber-950/80 border border-amber-500/40 px-2 py-0.5 rounded font-bold">
                      30-Day Clock: Due Nov 20, 2026
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-white">
                    TEARadio 100.1 FM (Channel 261) · Terrestrial Licensing Strategy
                  </h3>
                  <p className="text-xs text-slate-300">
                    One Stop Rehabilitation Center (FRN: 0033922386 · Facility ID: 797586). Review why the FCC dismissed the filing and execute your next regulatory move.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href="/public/assets/aistudio/Licensing_and_Management_System_f86b6935.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 hover:border-cyan-400 text-cyan-300 hover:text-cyan-200 text-xs font-mono font-bold flex items-center gap-1.5 transition-all"
                  >
                    <FileText className="w-4 h-4" />
                    <span>View FCC Filing (PDF)</span>
                  </a>
                </div>
              </div>

              {/* Technical Specifications Summary */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-mono">
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                  <span className="text-[10px] text-slate-500 block uppercase">Frequency &amp; Channel</span>
                  <span className="text-rose-400 font-bold">100.1 MHz (Ch. 261)</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                  <span className="text-[10px] text-slate-500 block uppercase">Effective Radiated Power</span>
                  <span className="text-amber-400 font-bold">6.0 kW (Non-Dir)</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                  <span className="text-[10px] text-slate-500 block uppercase">Transmitter Site</span>
                  <span className="text-slate-300 font-bold text-[11px] truncate block">Detroit, Michigan</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                  <span className="text-[10px] text-slate-500 block uppercase">Coordinates (NAD83)</span>
                  <span className="text-cyan-400 font-bold text-[11px]">42°23'28"N 83°12'43"W</span>
                </div>
              </div>

              {/* Diagnostic Box: Why Did the FCC Dismiss It? */}
              <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/30 text-xs space-y-2">
                <div className="flex items-center gap-2 font-bold text-rose-300">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>Why Did the FCC Dismiss File #0000303897 on October 21, 2026?</span>
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  <strong>1. Filing Type Conflict:</strong> The application was filed as a <em>"Construction Permit"</em> under <em>"FM Rulemaking"</em>. In the FCC rules, an FM Rulemaking petition is used only to amend the Table of Allotments (47 C.F.R. § 73.202) to add a vacant frequency to a city—it does not grant an authorization to construct or transmit.
                  <br />
                  <strong>2. Commercial vs. Noncommercial Mismatch:</strong> Page 1 requested fee exemptions as a 501(c)(3) Noncommercial Educational entity, but Page 2 checked <em>"Facility Type: Commercial"</em>. In major markets like Detroit, commercial FM channels require competitive cash auctions (47 C.F.R. § 73.5000), not fee-exempt non-profit permits.
                  <br />
                  <strong>3. Spacing &amp; Canadian Border Clearance:</strong> Channel 261 (100.1 FM) requires strict geographic separation from adjacent stations (47 C.F.R. § 73.207) and international treaty coordination with ISED Canada across the Detroit River.
                </p>
              </div>

              {/* Strategic Decision Menu: What Should You Do Next? */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-1.5">
                    <Scale className="w-4 h-4 text-amber-400" />
                    <span>Your 4 Strategic Options Moving Forward:</span>
                  </span>
                  <span className="text-[11px] font-mono text-cyan-400">Select a roadmap</span>
                </div>

                {/* Tabs */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                  {[
                    { id: 'reconsideration', label: '1. 30-Day Reconsideration', badge: 'Deadline: Nov 20' },
                    { id: 'nce_lpfm', label: '2. NCE / LPFM Band', badge: '501(c)(3) Protected' },
                    { id: 'translator', label: '3. Lease FM Translator', badge: 'Instant Detroit Air' },
                    { id: 'digital', label: '4. Digital Web Stream', badge: 'Active 24/7 Now' },
                  ].map((tab) => {
                    const isActive = activeStrategyTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => {
                          sound.playClick();
                          setActiveStrategyTab(tab.id as any);
                        }}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          isActive
                            ? 'bg-rose-950/80 border-rose-500 text-white shadow-md'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <div className="text-xs font-bold">{tab.label}</div>
                        <div className="text-[10px] font-mono text-amber-300 mt-0.5">{tab.badge}</div>
                      </button>
                    );
                  })}
                </div>

                {/* Tab Details Content */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-3">
                  {activeStrategyTab === 'reconsideration' && (
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Option 1: File Petition for Reconsideration (47 C.F.R. § 1.106)</span>
                      </h4>
                      <p className="text-slate-300 text-[11px] leading-relaxed">
                        Under FCC regulations, any applicant has <strong>30 calendar days from the date of dismissal (October 21, 2026)</strong> to petition the Media Bureau for reconsideration. The final deadline is <strong>November 20, 2026</strong>.
                      </p>
                      <ul className="space-y-1 text-[11px] text-slate-400 list-disc list-inside">
                        <li>Log into FCC LMS using FRN <strong className="text-white">0033922386</strong>.</li>
                        <li>Download the official Media Bureau dismissal letter from the "Actions" tab to read the exact defect cited.</li>
                        <li>If dismissal was without prejudice, submit an amended filing or motion clarifying the non-profit educational nature of One Stop Rehabilitation Center.</li>
                      </ul>
                    </div>
                  )}

                  {activeStrategyTab === 'nce_lpfm' && (
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                        <BadgeCheck className="w-4 h-4 text-cyan-400" />
                        <span>Option 2: Apply in the Reserved Noncommercial Band (88.1 – 91.9 MHz) or LPFM</span>
                      </h4>
                      <p className="text-slate-300 text-[11px] leading-relaxed">
                        Because One Stop Rehabilitation Center is a recognized <strong>501(c)(3) public charity</strong>, you are eligible for the FCC's Noncommercial Educational (NCE) reserved frequencies (Channels 201–260 = 88.1 to 91.9 MHz) or a Low Power FM (LPFM - 100 Watt) station.
                      </p>
                      <ul className="space-y-1 text-[11px] text-slate-400 list-disc list-inside">
                        <li><strong>No Cash Auctions:</strong> Reserved band stations are awarded through a community point system, NOT commercial auctions.</li>
                        <li><strong>100% Fee-Exempt:</strong> Zero application or regulatory fees under FCC Section 1.1116.</li>
                        <li>Retain a broadcast consulting engineer to identify open frequencies in Wayne County that comply with Canadian border treaties.</li>
                      </ul>
                    </div>
                  )}

                  {activeStrategyTab === 'translator' && (
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                        <ArrowRight className="w-4 h-4 text-amber-400" />
                        <span>Option 3: Lease an Existing FM Translator or HD-2/HD-3 Subchannel in Detroit</span>
                      </h4>
                      <p className="text-slate-300 text-[11px] leading-relaxed">
                        The fastest path to broadcasting on a Detroit car radio dial without waiting years for FCC rulemakings:
                      </p>
                      <ul className="space-y-1 text-[11px] text-slate-400 list-disc list-inside">
                        <li><strong>HD Subchannel Lease:</strong> Major Detroit FM stations (such as WDET, WRCJ, or commercial groups) often lease digital HD-2 or HD-3 audio subchannels to community organizations for a monthly fee.</li>
                        <li><strong>FM Translator Partnership:</strong> Rebroadcast TEARadio on an active local FM translator covering the Detroit metro core.</li>
                        <li>Commercial deal structuring can be executed through Jeanell Land's brokerage division (All Your Needs Reality LLC).</li>
                      </ul>
                    </div>
                  )}

                  {activeStrategyTab === 'digital' && (
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                        <RadioTower className="w-4 h-4 text-rose-400" />
                        <span>Option 4: Scale TEARadio 100.1 FM Digital Web Streaming Today</span>
                      </h4>
                      <p className="text-slate-300 text-[11px] leading-relaxed">
                        Do not let FCC paperwork stall your community impact! Digital internet radio requires <strong>no FCC construction permit, no frequency allotments, and zero spectrum clearance</strong>.
                      </p>
                      <ul className="space-y-1 text-[11px] text-slate-400 list-disc list-inside">
                        <li>Stream 24/7 on <strong className="text-cyan-300">onestoprehabilitationcenters.org</strong> and the S.T.E.A.Reality app.</li>
                        <li>Broadcast youth S.T.E.A.M. competitions, financial literacy podcasts, and live mentor call-ins globally.</li>
                        <li>Monetize via IRS Section 170 tax-deductible donor sponsorships while the terrestrial frequency is being perfected.</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
