import React, { useState } from 'react';
import { PlayerStats, StudentProfile } from '../../types/game';
import { sound } from '../../utils/audio';
import {
  MapPin,
  Building,
  Navigation,
  Compass,
  Store,
  Video,
  Home,
  Radio,
  Users,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Bot,
  Layers,
  GraduationCap,
  Shield,
  Car,
  Flame,
  Scale,
  PiggyBank,
} from 'lucide-react';

interface DetroitSceneNavigatorProps {
  playerStats: PlayerStats;
  onUpdateStats: (delta: Partial<PlayerStats>) => void;
  profile: StudentProfile;
  onNavigateTo: (tab: 'stear' | 'trivia' | 'affirmations' | 'collaboration' | 'goldie' | 'justice' | 'market' | 'metaverse' | 'course' | 'campaign' | 'trades' | 'adult' | 'vault' | 'labs' | 'workbook' | 'codex' | 'shop' | 'zoom' | 'mls' | 'tears') => void;
  onOpenMentor?: () => void;
}

interface DetroitLocation {
  id: string;
  name: string;
  district: string;
  address: string;
  storySignificance: string;
  availableAction: string;
  targetTab: 'shop' | 'zoom' | 'mls' | 'tears' | 'trades' | 'labs' | 'campaign' | 'vault';
  unlockedLevel: number;
  highlight: string;
}

export const DetroitSceneNavigator: React.FC<DetroitSceneNavigatorProps> = ({
  playerStats,
  onUpdateStats,
  profile,
  onNavigateTo,
  onOpenMentor,
}) => {
  const [selectedLocId, setSelectedLocId] = useState<string>('woodward_cultural');

  const detroitLocations: DetroitLocation[] = [
    {
      id: 'woodward_cultural',
      name: 'Woodward Ave & Cultural Center',
      district: 'Midtown Detroit · Wayne State / DIA',
      address: '5200 Woodward Ave, Detroit, MI 48202',
      storySignificance:
        'Where young Jeanell walked with her textbooks, attending collegiate lectures, studying advanced calculus, and utilizing the Detroit Public Library science stacks.',
      availableAction: 'Visit University Tech Supply Shop & Bookstore',
      targetTab: 'shop',
      unlockedLevel: 1,
      highlight: 'Heart of Detroit S.T.E.A.M. & academic history',
    },
    {
      id: 'goldies_beauty_world',
      name: 'Goldie’s Unique Beauty Creations Beauty World L.L.C.',
      district: 'Northwest Commercial Corridor · Detroit, Michigan',
      address: 'Detroit, Michigan · www.goldiesuniquebeautycreationsbeautyworld.com',
      storySignificance:
        'The patented continuous 24/7 aesthetic & wellness complex founded by Jeanell Land (IRS EIN: 85-3559446, SAM.gov UEI: J9R1TSCT26E1). Houses 25 stylists, 20 nail technicians, 5 spa pods, 24-hr gym, co-op equity leasing, and on-site free childcare for working mothers.',
      availableAction: 'Inspect USPTO Patent Application & Commercial Docket',
      targetTab: 'vault',
      unlockedLevel: 1,
      highlight: 'Continuous 24/7/365 Operations · Co-Op Equity Leasing & Free Childcare',
    },
    {
      id: 'onestop_center',
      name: 'One Stop Rehabilitation Center 501(c)(3)',
      district: 'Northwest Detroit Community Sanctuary',
      address: 'Detroit, Michigan · (313) 510-3610 · FCC FRN: 0033922386',
      storySignificance:
        'The headquarters of the 501(c)(3) community development center founded by President Jeanell Land (EIN: 85-3488624, FCC CORES FRN: 0033922386). Providing 24/7 domestic violence haven beds, aged-out foster youth sanctuary, returning citizen re-entry, and emergency food relief.',
      availableAction: 'Volunteer, Donate Pantry Kits or Manage Shelter Beds',
      targetTab: 'labs',
      unlockedLevel: 1,
      highlight: 'Official 501(c)(3) serving Detroiters from ages 0 to 99',
    },
    {
      id: 'tears_studio',
      name: 'T.E.A.R.S. Channel & TEARadio 100.1 FM Studios',
      district: 'Downtown Detroit Media District',
      address: 'Woodward Corridor Media Center, Detroit, MI',
      storySignificance:
        'Where Jeanell Land directs marketing, broadcasting educational shows on financial literacy, youth entrepreneurship, and community empowerment.',
      availableAction: 'Watch TEARS Channel & Listen to TEARadio 100.1 FM',
      targetTab: 'tears',
      unlockedLevel: 1,
      highlight: 'Broadcasting live across Metro Detroit',
    },
    {
      id: 'woodward_realty',
      name: 'Woodward Square Realty & Century 21 Office',
      district: 'Royal Oak / North Woodward Corridor',
      address: 'Woodward Ave, Royal Oak, MI',
      storySignificance:
        'Where Jeanell negotiated commercial property sales, represented first-time homebuyers with NACA loans, and built her real estate practice.',
      availableAction: 'Search & Buy Properties on Nationwide MLS System',
      targetTab: 'mls',
      unlockedLevel: 1,
      highlight: 'Over 20+ years of real estate broker experience',
    },
    {
      id: 'city_airport_hangar',
      name: 'Coleman A. Young International Airport & Aero Hangar',
      district: 'East Side Industrial Park · Detroit, MI',
      address: '11499 Conner St, Detroit, MI 48213',
      storySignificance:
        'The aerospace research hangar where experimental airfoils, wind tunnel models, and rocket propulsion telemetry are calibrated.',
      availableAction: 'Conduct Virtual Zoom Interview with Aerospace Employers',
      targetTab: 'zoom',
      unlockedLevel: 1,
      highlight: 'Aeronautical engineering systems & flight test rigs',
    },
    {
      id: 'municipal_trades_hall',
      name: 'Detroit Municipal Infrastructure & Trades Hall',
      district: 'Downtown Civic Center · Hart Plaza',
      address: '2 Woodward Ave, Detroit, MI 48226',
      storySignificance:
        'The licensing testing bureau where journeyman plumbers, certified electricians, and building inspectors certify technical competency.',
      availableAction: 'Take Vocational Trade Exam for Employment Contract',
      targetTab: 'trades',
      unlockedLevel: 1,
      highlight: 'City infrastructure & vocational careers',
    },
  ];

  const currentLocation = detroitLocations.find((l) => l.id === selectedLocId) || detroitLocations[0];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
            <Compass className="w-4 h-4" />
            <span>LEVEL 1 STORY MAP · DETROIT, MICHIGAN</span>
          </div>
          <h2 className="text-2xl font-bold text-white mt-1">
            Real-Life Detroit Historical Locations &amp; City Hub
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Explore authentic Detroit landmarks from Jeanell Land's life journey: visit university halls, shop for tools, buy MLS properties, and tune into TEARadio 100.1 FM.
          </p>
        </div>

        {/* Quick Location Action Buttons */}
        <div className="flex flex-wrap gap-2 text-xs">
          <button
            onClick={() => {
              sound.playClick();
              onNavigateTo('metaverse');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-950/80 hover:bg-indigo-900/80 border border-indigo-500/50 text-indigo-200 font-bold transition-all shadow-sm"
          >
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            <span>Metaverse Board (101 Levels)</span>
          </button>
          <button
            onClick={() => {
              sound.playClick();
              onNavigateTo('course');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/80 hover:bg-cyan-900/80 border border-cyan-500/50 text-cyan-200 font-bold transition-all shadow-sm"
          >
            <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
            <span>Masterclass &amp; Sceneries</span>
          </button>
          <button
            onClick={() => {
              sound.playClick();
              onNavigateTo('stear');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-cyan-500/50 text-cyan-200 font-bold transition-all shadow-sm"
            title="Book Safe Rides, Deliveries & Manage Master Calendar"
          >
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
            <span>S-T-E-A-R Safe &amp; Calendar</span>
          </button>
          <button
            onClick={() => {
              sound.playClick();
              onNavigateTo('trivia');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-950/80 to-slate-900 hover:from-amber-900/80 hover:to-slate-800 border border-amber-500/50 text-amber-200 font-bold transition-all shadow-sm"
            title="Jeanell's Historical Journey Daily Trivia (Earn Resilience Bonus)"
          >
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>Jeanell's Daily Trivia</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          </button>
          <button
            onClick={() => {
              sound.playClick();
              onNavigateTo('affirmations');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-950/80 to-slate-900 hover:from-emerald-900/80 hover:to-slate-800 border border-emerald-500/50 text-emerald-200 font-bold transition-all shadow-sm"
            title="Jeanell's Affirmation Deck (Choose Daily Mantra for +5% Resilience Buff)"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Affirmation Deck (+5% Buff)</span>
          </button>
          <button
            onClick={() => {
              sound.playClick();
              onNavigateTo('collaboration');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-950/80 to-slate-900 hover:from-blue-900/80 hover:to-slate-800 border border-cyan-500/50 text-cyan-200 font-bold transition-all shadow-sm"
            title="Classmate Collaboration (Send Study Requests to Kendra or David for +25% Mastery Buff)"
          >
            <Users className="w-3.5 h-3.5 text-cyan-400" />
            <span>Classmate Study Requests (+25%)</span>
          </button>
          <button
            onClick={() => {
              sound.playClick();
              onNavigateTo('goldie');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-red-950/80 to-slate-900 hover:from-red-900/80 hover:to-slate-800 border border-red-500/50 text-red-200 font-bold transition-all shadow-sm"
            title="Jeanell vs Goldie Alter Ego Crucibles & Rebirth"
          >
            <Flame className="w-3.5 h-3.5 text-red-400" />
            <span>Jeanell vs Goldie</span>
          </button>
          <button
            onClick={() => {
              sound.playClick();
              onNavigateTo('justice');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-indigo-950/80 to-slate-900 hover:from-indigo-900/80 hover:to-slate-800 border border-indigo-500/50 text-indigo-200 font-bold transition-all shadow-sm"
            title="Justice Hub: Internal Affairs, Legal Aid & Documentation Games"
          >
            <Scale className="w-3.5 h-3.5 text-indigo-400" />
            <span>Justice Hub &amp; Defense</span>
          </button>
          <button
            onClick={() => {
              sound.playClick();
              onNavigateTo('market');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-950/80 to-slate-900 hover:from-emerald-900/80 hover:to-slate-800 border border-emerald-500/50 text-emerald-200 font-bold transition-all shadow-sm"
            title="Savings Vault & Stock Market Prediction Game (Phase Two)"
          >
            <PiggyBank className="w-3.5 h-3.5 text-emerald-400" />
            <span>Savings &amp; Market (Phase 2)</span>
          </button>
          <button
            onClick={() => {
              sound.playClick();
              onNavigateTo('course');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-950/80 to-slate-900 hover:from-cyan-900/80 hover:to-slate-800 border border-cyan-500/50 text-cyan-200 font-bold transition-all shadow-sm"
            title="K-12 Diplomas, CE & Trades Academy (Math, Science, English, STEM, Languages & Diplomas)"
          >
            <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
            <span>Academy &amp; Diplomas (K–12)</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          </button>
          <button
            onClick={() => {
              sound.playClick();
              onNavigateTo('shop');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-700 text-slate-200 font-medium transition-colors"
          >
            <Store className="w-3.5 h-3.5 text-cyan-400" />
            <span>City Shop</span>
          </button>
          <button
            onClick={() => {
              sound.playClick();
              onNavigateTo('zoom');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-700 text-slate-200 font-medium transition-colors"
          >
            <Video className="w-3.5 h-3.5 text-emerald-400" />
            <span>Virtual Zoom Interview</span>
          </button>
          <button
            onClick={() => {
              sound.playClick();
              onNavigateTo('mls');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-700 text-slate-200 font-medium transition-colors"
          >
            <Home className="w-3.5 h-3.5 text-amber-400" />
            <span>Nationwide MLS</span>
          </button>
          <button
            onClick={() => {
              sound.playClick();
              onNavigateTo('tears');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-700 text-slate-200 font-medium transition-colors"
          >
            <Radio className="w-3.5 h-3.5 text-rose-400" />
            <span>TEARadio 100.1 FM</span>
          </button>
          <button
            onClick={() => {
              sound.playClick();
              if (onOpenMentor) onOpenMentor();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold transition-all shadow-sm"
          >
            <Bot className="w-3.5 h-3.5" />
            <span>Ask Mentor Jeanell</span>
          </button>
        </div>
      </div>

      {/* Detroit Interactive Map Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Location Pin Cards (5 cols) */}
        <div className="lg:col-span-5 space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
            DETROIT METROPOLITAN LANDMARKS:
          </span>

          {detroitLocations.map((loc) => {
            const isSelected = selectedLocId === loc.id;

            return (
              <div
                key={loc.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedLocId(loc.id);
                }}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-slate-950 border-cyan-400 shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-500/50'
                    : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <MapPin className={`w-4 h-4 shrink-0 ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`} />
                    <h3 className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                      {loc.name}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400 shrink-0">Lvl {loc.unlockedLevel}</span>
                </div>

                <div className="text-[11px] text-slate-400 mt-1 pl-6">
                  {loc.district}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Detailed Location Scene Showcase (7 cols) */}
        <div className="lg:col-span-7 bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block mb-1">
                  DETROIT SCENE SPOTLIGHT
                </span>
                <h3 className="text-lg font-bold text-white">{currentLocation.name}</h3>
                <span className="text-xs text-slate-400">{currentLocation.address}</span>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-500/40">
                {currentLocation.highlight}
              </span>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Historical Story Significance:
              </span>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-900 p-4 rounded-xl border border-slate-800">
                {currentLocation.storySignificance}
              </p>
            </div>

            {/* City Life Interactive Opportunity */}
            <div className="p-4 bg-cyan-950/30 border border-cyan-500/40 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-cyan-300 text-xs font-bold">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Available Real-World Activity at this Location:</span>
              </div>
              <p className="text-xs text-slate-200">
                {currentLocation.availableAction}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playSuccess();
              onNavigateTo(currentLocation.targetTab as any);
            }}
            className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-lg transition-colors shadow-md flex items-center justify-center gap-2"
          >
            <span>Enter Location: {currentLocation.availableAction}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
