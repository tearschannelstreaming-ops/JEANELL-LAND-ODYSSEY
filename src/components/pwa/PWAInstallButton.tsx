import React, { useState } from 'react';
import { usePWAInstall, useOnlineStatus } from '../../hooks/usePWAInstall';
import {
  Download,
  Smartphone,
  Laptop,
  Check,
  X,
  Share2,
  PlusSquare,
  WifiOff,
  Globe,
  Copy,
  Image as ImageIcon,
  Shield,
  Tv,
  QrCode,
  Sparkles,
  Award,
  Briefcase,
  Play,
  Compass,
  BookOpen,
  History,
  Building2,
} from 'lucide-react';
import { sound } from '../../utils/audio';

const OFFICIAL_PWA_DOMAIN = 'https://stearealitythejeanelllandodyssey.com';
const SHARED_LIVE_PWA_URL =
  'https://ais-pre-vrod7onkee5fowxyo6zfp2-401364820245.us-west2.run.app';

export type PWALiveLaunchTarget =
  | 'detroit'
  | 'stear'
  | 'tears'
  | 'mls'
  | 'workbook'
  | 'course'
  | 'mission-history'
  | 'language-avatar';

interface TransferabilityMetric {
  id: string;
  label: string;
  description: string;
}

const TRANSFERABILITY_METRICS: TransferabilityMetric[] = [
  {
    id: 'clean_financials',
    label: 'Clean Financials',
    description: 'Audited P&L, EIN compliance, and clear separation of entity accounts',
  },
  {
    id: 'leadership_bench',
    label: 'Leadership Bench',
    description: 'Trained managers and principals capable of running daily operations',
  },
  {
    id: 'documented_processes',
    label: 'Documented Processes',
    description: 'SOPs, licensing manuals, and hybrid training workbooks in place',
  },
  {
    id: 'customer_concentration',
    label: 'Customer Concentration',
    description: 'Diversified client and student base across regions and service tracks',
  },
  {
    id: 'owner_dependency',
    label: 'Owner Dependency (Low = 5)',
    description: 'Business operates smoothly via automated systems & licensed brokers',
  },
  {
    id: 'transferable_relationships',
    label: 'Transferable Relationships',
    description: 'Institutional contracts, MLS/NACA affiliations, and community trust',
  },
  {
    id: 'realistic_valuation',
    label: 'Realistic Valuation Expectations',
    description: 'Data-backed enterprise valuation aligned with market multiples',
  },
];

export const PWAInstallButton: React.FC<{
  compact?: boolean;
  labelOverride?: string;
  onLiveLaunch?: (target: PWALiveLaunchTarget) => void;
}> = ({ compact = false, labelOverride, onLiveLaunch }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [activeTab, setActiveTab] = useState<
    'install' | 'icons' | 'screenshots' | 'transferability'
  >('install');
  const [copiedDomain, setCopiedDomain] = useState(false);
  const [copiedLiveUrl, setCopiedLiveUrl] = useState(false);
  const [scores, setScores] = useState<Record<string, number>>({
    clean_financials: 5,
    leadership_bench: 4,
    documented_processes: 5,
    customer_concentration: 4,
    owner_dependency: 4,
    transferable_relationships: 5,
    realistic_valuation: 5,
  });

  const liveOriginUrl =
    typeof window !== 'undefined' && window.location?.origin
      ? window.location.origin
      : SHARED_LIVE_PWA_URL;

  const handleOpenHub = () => {
    sound.playClick();
    setShowGuideModal(true);
  };

  const handleDirectInstall = async () => {
    sound.playClick();
    if (isInstallable) {
      await install();
    } else {
      setShowGuideModal(true);
    }
  };

  const copyToClipboard = async (text: string, type: 'domain' | 'live') => {
    sound.playSuccess();
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'domain') {
        setCopiedDomain(true);
        setTimeout(() => setCopiedDomain(false), 2500);
      } else {
        setCopiedLiveUrl(true);
        setTimeout(() => setCopiedLiveUrl(false), 2500);
      }
    } catch {
      // Fallback ignored
    }
  };

  const handleSharePWA = async () => {
    sound.playClick();
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'S.T.E.A.Reality: The Jeanell Land Odyssey (S.T.E.A.R.S. SAFE & T.E.A.R.S. CHANNEL)',
          text: 'Launch the live S.T.E.A.Reality & ABC Financial Literacy Academy PWA!',
          url: liveOriginUrl,
        });
      } catch {
        // Cancelled
      }
    } else {
      copyToClipboard(liveOriginUrl, 'live');
    }
  };

  const triggerLiveNavigation = (target: PWALiveLaunchTarget) => {
    sound.playSuccess();
    if (onLiveLaunch) {
      onLiveLaunch(target);
    }
    setShowGuideModal(false);
  };

  const totalScore = Object.values(scores).reduce((acc, v) => acc + v, 0);
  const maxPossibleScore = TRANSFERABILITY_METRICS.length * 5;

  const liveQuickLaunchItems: {
    target: PWALiveLaunchTarget;
    title: string;
    subtitle: string;
    pathLabel: string;
    icon: React.ReactNode;
    badge: string;
  }[] = [
    {
      target: 'language-avatar',
      title: 'Native Language, Voice & Avatar Studio',
      subtitle: 'Choose your language, voice persona, facial features & level outfits',
      pathLabel: '/?modal=language-avatar',
      icon: <Globe className="w-4 h-4 text-cyan-400" />,
      badge: '10 Languages',
    },
    {
      target: 'mission-history',
      title: '7-Day Daily Mission History',
      subtitle: 'View completed missions, streak multiplier & past rewards',
      pathLabel: '/?modal=mission-history',
      icon: <History className="w-4 h-4 text-amber-400" />,
      badge: '7-Day Log',
    },
    {
      target: 'stear',
      title: 'S.T.E.A.R.S. SAFE Biometric & Ride Hub',
      subtitle: '24/7 Safe Rides, Drops, Sentinel & Face Biometrics',
      pathLabel: '/?tab=stear',
      icon: <Shield className="w-4 h-4 text-emerald-400" />,
      badge: 'S.T.E.A.R.S. SAFE',
    },
    {
      target: 'tears',
      title: 'T.E.A.R.S. CHANNEL & Radio 100.1 FM',
      subtitle: 'Broadcast Television, Splash Video & Detroit News',
      pathLabel: '/?tab=tears',
      icon: <Tv className="w-4 h-4 text-rose-400" />,
      badge: 'T.E.A.R.S. TV',
    },
    {
      target: 'mls',
      title: 'All Your Needs Reality LLC · MLS Portal',
      subtitle: 'Jeanell Land, Broker/Principal (#6504432062) · NACA & Commercial',
      pathLabel: '/?tab=mls',
      icon: <Building2 className="w-4 h-4 text-indigo-400" />,
      badge: 'Brokerage',
    },
    {
      target: 'workbook',
      title: "The ABC's of Financial Literacy Workbook",
      subtitle: 'Interactive 6-Week Hybrid Training Guide & Coloring Book',
      pathLabel: '/?tab=workbook',
      icon: <BookOpen className="w-4 h-4 text-amber-300" />,
      badge: 'ABC Book',
    },
  ];

  return (
    <>
      <div className="inline-flex items-center gap-1.5">
        <button
          onClick={handleOpenHub}
          title="Open Live Usable PWA Links, App Install, Icons & Screenshots"
          className={`group relative inline-flex items-center gap-2 rounded-xl font-bold transition-all shadow-md active:scale-95 cursor-pointer ${
            compact
              ? 'px-3 py-1.5 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs border border-cyan-300/40'
              : 'px-4 py-2.5 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs sm:text-sm border border-cyan-300/40'
          }`}
        >
          <img
            src="/icon.svg"
            alt="S.T.E.A.R.S. SAFE"
            className="w-4 h-4 rounded-full border border-white/50 object-cover"
          />
          <Download className="w-3.5 h-3.5 text-white animate-bounce" />
          <span className="tracking-wide">
            {labelOverride
              ? labelOverride
              : isInstalled
              ? 'Live PWA Hub'
              : compact
              ? 'Live PWA & Install'
              : 'Live PWA Links & Install App'}
          </span>
        </button>
      </div>

      {/* Comprehensive Live PWA Links, Icons, Screenshots & Business Transferability Modal */}
      {showGuideModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto animate-fadeIn">
          <div className="relative w-full max-w-4xl rounded-3xl bg-slate-900 border border-cyan-500/40 shadow-2xl overflow-hidden my-8 text-slate-100">
            {/* Top Header */}
            <div className="bg-gradient-to-r from-slate-950 via-indigo-950/80 to-slate-950 p-6 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center -space-x-2">
                  <img
                    src="/icon.svg"
                    alt="S.T.E.A.R.S. SAFE Icon"
                    className="w-14 h-14 rounded-2xl border-2 border-cyan-400 shadow-lg bg-slate-950"
                  />
                  <img
                    src="/tears-channel-icon.svg"
                    alt="T.E.A.R.S. CHANNEL Icon"
                    className="w-14 h-14 rounded-2xl border-2 border-slate-300 shadow-lg bg-slate-950"
                  />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      ● LIVE &amp; USABLE PWA HUB
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                      iOS · ANDROID · WINDOWS · MAC · SMART TV
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-black text-white mt-1">
                    stearealitythejeanelllandodyssey.com · Live PWA Launcher
                  </h2>
                  <p className="text-xs text-slate-400">
                    Click any live module below to navigate instantly, copy the live playable link, or install the app!
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowGuideModal(false)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Live Action & Copy Bar */}
            <div className="px-6 py-3.5 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
                <span className="text-xs text-slate-300 font-bold">Live Playable PWA Link:</span>
                <button
                  onClick={() => copyToClipboard(liveOriginUrl, 'live')}
                  className="text-xs font-mono font-bold text-emerald-300 hover:text-emerald-200 underline truncate cursor-pointer"
                  title="Click to copy live working URL"
                >
                  {liveOriginUrl}
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => copyToClipboard(liveOriginUrl, 'live')}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                >
                  {copiedLiveUrl ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLiveUrl ? 'Copied Live URL!' : 'Copy Live App Link'}</span>
                </button>

                <button
                  onClick={() => copyToClipboard(OFFICIAL_PWA_DOMAIN, 'domain')}
                  className="px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                >
                  {copiedDomain ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedDomain ? 'Copied Domain!' : 'Copy Custom Domain'}</span>
                </button>

                <button
                  onClick={handleSharePWA}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 border border-slate-700 transition-colors cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Share</span>
                </button>

                {isInstallable && !isInstalled && (
                  <button
                    onClick={handleDirectInstall}
                    className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black flex items-center gap-1.5 shadow-md transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Install App Now</span>
                  </button>
                )}
              </div>
            </div>

            {/* Sub-Navigation Tabs */}
            <div className="flex flex-wrap items-center gap-1 px-6 pt-3 border-b border-slate-800 bg-slate-900">
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('install');
                }}
                className={`px-4 py-2.5 text-xs font-bold rounded-t-xl border-b-2 flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'install'
                    ? 'border-cyan-400 text-cyan-300 bg-slate-950/70'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <Compass className="w-4 h-4" />
                <span>Live PWA Quick-Launch &amp; Install</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('icons');
                }}
                className={`px-4 py-2.5 text-xs font-bold rounded-t-xl border-b-2 flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'icons'
                    ? 'border-amber-400 text-amber-300 bg-slate-950/70'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <Shield className="w-4 h-4" />
                <span>S.T.E.A.R.S. SAFE &amp; T.E.A.R.S. Icons</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('screenshots');
                }}
                className={`px-4 py-2.5 text-xs font-bold rounded-t-xl border-b-2 flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'screenshots'
                    ? 'border-emerald-400 text-emerald-300 bg-slate-950/70'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                <span>App Store &amp; PWA Screenshots (3)</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('transferability');
                }}
                className={`px-4 py-2.5 text-xs font-bold rounded-t-xl border-b-2 flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'transferability'
                    ? 'border-purple-400 text-purple-300 bg-slate-950/70'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>Business Transferability Scorecard</span>
              </button>
            </div>

            {/* Tab Content Body */}
            <div className="p-6 max-h-[58vh] overflow-y-auto space-y-5">
              {activeTab === 'install' && (
                <div className="space-y-5">
                  {/* Live In-App Quick Launch Links Grid */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-black text-white flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-cyan-400" />
                        <span>Live Usable PWA Shortcut Links (Click Any Card to Launch Instantly)</span>
                      </h3>
                      <span className="text-[11px] font-mono text-emerald-400 font-bold">
                        100% Live Navigation
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {liveQuickLaunchItems.map((item) => (
                        <button
                          key={item.target}
                          onClick={() => triggerLiveNavigation(item.target)}
                          className="p-4 rounded-2xl bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-cyan-400/60 text-left transition-all flex flex-col justify-between gap-3 group cursor-pointer shadow-md"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 group-hover:border-cyan-500/40">
                              {item.icon}
                            </div>
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                              {item.badge}
                            </span>
                          </div>
                          <div>
                            <div className="text-xs font-black text-white group-hover:text-cyan-300 transition-colors">
                              {item.title}
                            </div>
                            <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                              {item.subtitle}
                            </p>
                          </div>
                          <div className="flex items-center justify-between pt-2 border-t border-slate-900 text-[10px] font-mono text-emerald-400">
                            <span>{item.pathLabel}</span>
                            <span className="inline-flex items-center gap-1 font-bold">
                              <Play className="w-3 h-3 fill-emerald-400" /> Launch Now
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Domain & QR Card */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                    <div className="md:col-span-2 space-y-3">
                      <h4 className="text-sm font-black text-white">
                        Live Playable URL &amp; Custom Domain Configuration
                      </h4>
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-slate-900 border border-emerald-500/40">
                          <div className="text-xs truncate max-w-md">
                            <span className="text-emerald-400 block text-[10px] font-mono uppercase font-bold">
                              ● Active Live Cloud App Link (Works Immediately on All Devices)
                            </span>
                            <span className="font-mono font-bold text-white truncate">
                              {liveOriginUrl}
                            </span>
                          </div>
                          <button
                            onClick={() => copyToClipboard(liveOriginUrl, 'live')}
                            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold cursor-pointer"
                          >
                            {copiedLiveUrl ? '✓ Copied!' : 'Copy Live Link'}
                          </button>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-slate-900 border border-slate-800">
                          <div className="text-xs">
                            <span className="text-cyan-400 block text-[10px] font-mono uppercase font-bold">
                              Official Custom Brand Domain (Manifest &amp; Canonical ID)
                            </span>
                            <span className="font-mono font-bold text-cyan-300">
                              {OFFICIAL_PWA_DOMAIN}
                            </span>
                          </div>
                          <button
                            onClick={() => copyToClipboard(OFFICIAL_PWA_DOMAIN, 'domain')}
                            className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-bold border border-cyan-500/30 cursor-pointer"
                          >
                            {copiedDomain ? '✓ Copied!' : 'Copy Brand Domain'}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Stylized QR Code & Medallion Seal */}
                    <div className="flex flex-col items-center justify-center bg-slate-900 p-4 rounded-2xl border border-slate-800 text-center space-y-2">
                      <div className="relative p-3 bg-white rounded-2xl shadow-lg">
                        <QrCode className="w-20 h-20 text-slate-950" />
                        <img
                          src="/icon.svg"
                          alt="S.T.E.A.R.S. Seal"
                          className="w-7 h-7 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white shadow"
                        />
                      </div>
                      <div className="text-[11px] font-bold text-white">
                        Scan or Share Live PWA
                      </div>
                    </div>
                  </div>

                  {/* Platform Installation Steps */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs">
                      <div className="font-bold text-cyan-300 flex items-center gap-2">
                        <Share2 className="w-4 h-4 text-cyan-400" />
                        <span>iPhone &amp; iPad (iOS Safari):</span>
                      </div>
                      <ol className="list-decimal list-inside space-y-1 text-slate-300 leading-relaxed">
                        <li>Tap the <strong>Share</strong> button in Safari.</li>
                        <li>Tap <strong>Add to Home Screen</strong> <PlusSquare className="w-3.5 h-3.5 inline text-cyan-400" />.</li>
                        <li>Launches full-screen with the <strong>S.T.E.A.R.S. SAFE</strong> metallic icon!</li>
                      </ol>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs">
                      <div className="font-bold text-emerald-300 flex items-center gap-2">
                        <Laptop className="w-4 h-4 text-emerald-400" />
                        <span>Android, Windows, Mac &amp; Smart TV:</span>
                      </div>
                      <ol className="list-decimal list-inside space-y-1 text-slate-300 leading-relaxed">
                        <li>Click <strong>Install App Now</strong> or the browser address bar install icon.</li>
                        <li>On Android Chrome: Tap <strong>⋮ Menu → Install App</strong>.</li>
                        <li>Includes offline caching, voice synthesis, and level-up outfits!</li>
                      </ol>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'icons' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* S.T.E.A.R.S. SAFE Primary App Icon */}
                    <div className="bg-slate-950 p-5 rounded-2xl border border-cyan-500/30 flex flex-col items-center text-center space-y-3">
                      <img
                        src="/icon.svg"
                        alt="S.T.E.A.R.S. SAFE Metallic Medallion"
                        className="w-32 h-32 rounded-3xl border-2 border-cyan-400/50 shadow-xl bg-slate-900"
                      />
                      <div>
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold">
                          Primary Home Screen Icon
                        </span>
                        <h4 className="text-base font-black text-white mt-1">
                          S.T.E.A.R.S. SAFE Medallion
                        </h4>
                      </div>
                      <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                        <a
                          href="/pwa-512x512.png"
                          download="STEARS-SAFE-512x512.png"
                          className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono text-cyan-300 border border-slate-700"
                        >
                          Download 512x512 PNG
                        </a>
                        <a
                          href="/pwa-192x192.png"
                          download="STEARS-SAFE-192x192.png"
                          className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono text-cyan-300 border border-slate-700"
                        >
                          Download 192x192 PNG
                        </a>
                        <a
                          href="/icon.svg"
                          download="STEARS-SAFE-Vector.svg"
                          className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono text-amber-300 border border-slate-700"
                        >
                          Download Vector SVG
                        </a>
                      </div>
                    </div>

                    {/* T.E.A.R.S. CHANNEL Broadcast Medallion Icon */}
                    <div className="bg-slate-950 p-5 rounded-2xl border border-slate-700 flex flex-col items-center text-center space-y-3">
                      <img
                        src="/tears-channel-icon.svg"
                        alt="T.E.A.R.S. CHANNEL 3D Chrome Medallion"
                        className="w-32 h-32 rounded-3xl border-2 border-slate-400/50 shadow-xl bg-slate-900 p-1"
                      />
                      <div>
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold">
                          Broadcast &amp; Media Shortcut Icon
                        </span>
                        <h4 className="text-base font-black text-white mt-1">
                          T.E.A.R.S. CHANNEL Medallion
                        </h4>
                      </div>
                      <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                        <a
                          href="/tears-channel-512x512.png"
                          download="TEARS-CHANNEL-512x512.png"
                          className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono text-cyan-300 border border-slate-700"
                        >
                          Download 512x512 PNG
                        </a>
                        <a
                          href="/tears-channel-icon.svg"
                          download="TEARS-CHANNEL-Vector.svg"
                          className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono text-amber-300 border border-slate-700"
                        >
                          Download Vector SVG
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'screenshots' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden flex flex-col justify-between">
                      <img
                        src="/screenshots/pwa-wide-workbook.png"
                        alt="The ABC's of Financial Literacy Workbook Screenshot"
                        className="w-full h-44 object-cover border-b border-slate-800"
                      />
                      <div className="p-3.5 flex items-center justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold block">
                            Wide Screenshot · 1280x720
                          </span>
                          <h4 className="text-xs font-bold text-white">
                            The ABC&apos;s of Financial Literacy Workbook
                          </h4>
                        </div>
                        <a
                          href="/screenshots/pwa-wide-workbook.png"
                          download="pwa-wide-workbook-1280x720.png"
                          className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-cyan-300 shrink-0"
                        >
                          Download
                        </a>
                      </div>
                    </div>

                    <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden flex flex-col justify-between">
                      <img
                        src="/screenshots/pwa-wide-ecosystem.png"
                        alt="S.T.E.A.R.S. SAFE & T.E.A.R.S. CHANNEL Ecosystem Screenshot"
                        className="w-full h-44 object-cover border-b border-slate-800"
                      />
                      <div className="p-3.5 flex items-center justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block">
                            Wide Screenshot · 1280x720
                          </span>
                          <h4 className="text-xs font-bold text-white">
                            S.T.E.A.R.S. SAFE &amp; T.E.A.R.S. CHANNEL Ecosystem
                          </h4>
                        </div>
                        <a
                          href="/screenshots/pwa-wide-ecosystem.png"
                          download="pwa-wide-ecosystem-1280x720.png"
                          className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-emerald-300 shrink-0"
                        >
                          Download
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-950 rounded-2xl border border-slate-800 p-4 flex flex-col sm:flex-row items-center gap-4">
                    <img
                      src="/screenshots/pwa-narrow-mobile.png"
                      alt="Mobile Portrait PWA Screenshot"
                      className="w-28 h-48 object-cover rounded-xl border border-slate-700 shrink-0"
                    />
                    <div className="space-y-2 flex-1">
                      <span className="text-[10px] font-mono uppercase text-amber-400 font-bold">
                        Mobile Form Factor (`narrow`) · 750x1334
                      </span>
                      <h4 className="text-sm font-bold text-white">
                        Mobile Standalone Portrait Preview
                      </h4>
                      <a
                        href="/screenshots/pwa-narrow-mobile.png"
                        download="pwa-narrow-mobile-750x1334.png"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-bold border border-amber-500/30"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download 750x1334 Mobile Screenshot</span>
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'transferability' && (
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-emerald-950/60 via-slate-950 to-slate-950 p-5 rounded-2xl border border-emerald-500/40 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
                        EXECUTIVE AUDIENCE REFLECTION · SCORE EACH AREA 1–5
                      </span>
                      <h3 className="text-base sm:text-lg font-black text-white mt-0.5">
                        What Makes Your Business Transferable?
                      </h3>
                    </div>
                    <div className="bg-slate-900 px-4 py-2.5 rounded-xl border border-emerald-500/40 text-center">
                      <span className="text-[10px] font-mono uppercase text-slate-400 block">
                        Transferability Score
                      </span>
                      <span className="text-xl font-black text-emerald-400 font-mono">
                        {totalScore} / {maxPossibleScore}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {TRANSFERABILITY_METRICS.map((metric) => {
                      const currentVal = scores[metric.id] || 5;
                      return (
                        <div
                          key={metric.id}
                          className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex flex-col justify-between gap-2"
                        >
                          <div>
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-white">{metric.label}</span>
                              <span className="text-xs font-mono font-bold text-emerald-400">
                                {currentVal} / 5
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-400 mt-0.5">{metric.description}</p>
                          </div>

                          <div className="flex items-center gap-1.5 pt-1">
                            {[1, 2, 3, 4, 5].map((num) => (
                              <button
                                key={num}
                                onClick={() => {
                                  sound.playClick();
                                  setScores((prev) => ({ ...prev, [metric.id]: num }));
                                }}
                                className={`flex-1 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                                  currentVal >= num
                                    ? 'bg-emerald-600 text-white shadow-sm'
                                    : 'bg-slate-900 text-slate-500 hover:bg-slate-800'
                                }`}
                              >
                                {num}
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-400">
                <Tv className="w-4 h-4 text-cyan-400" />
                <span>
                  All PWA links are live &amp; usable inside the app and across all platforms.
                </span>
              </div>
              <button
                onClick={() => setShowGuideModal(false)}
                className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 font-bold text-white shadow-md transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-xl bg-amber-500/95 backdrop-blur-md px-3.5 py-2 text-xs font-bold text-slate-950 shadow-2xl border border-amber-300 animate-pulse">
      <WifiOff className="w-4 h-4 text-slate-950" />
      <span>Offline Mode — Cached S.T.E.A.M. &amp; Literacy curriculum active</span>
    </div>
  );
};
