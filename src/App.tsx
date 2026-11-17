import React, { useState, useEffect } from 'react';
import { PlayerStats, StudentProfile, ParentalControls, ClassmateStatusMap, ClassmateId, RelationshipState, StoryStep } from './types/game';
import { NarrativeCampaign } from './components/narrative/NarrativeCampaign';
import { AeroWindTunnelLab } from './components/simulations/AeroWindTunnelLab';
import { RocketPropulsionLab } from './components/simulations/RocketPropulsionLab';
import { RealEstateFinanceLab } from './components/simulations/RealEstateFinanceLab';
import { DetroitCommunityRehabLab } from './components/simulations/DetroitCommunityRehabLab';
import { WorkbookSection } from './components/workbook/WorkbookSection';
import { GlossarySection } from './components/glossary/GlossarySection';
import { ParentControlsModal } from './components/parent/ParentControlsModal';
import { AdultLifeMatrix } from './components/adult/AdultLifeMatrix';
import { VocationalTradeArena } from './components/trades/VocationalTradeArena';
import { CredentialVault } from './components/credentials/CredentialVault';
import { BiometricScannerModal } from './components/biometrics/BiometricScannerModal';
import { DetroitSceneNavigator } from './components/detroit/DetroitSceneNavigator';
import { CityShop } from './components/shop/CityShop';
import { VirtualZoomInterview } from './components/interview/VirtualZoomInterview';
import { NationwideMLSBrowser } from './components/realestate/NationwideMLSBrowser';
import { TEARSChannelAndRadio } from './components/media/TEARSChannelAndRadio';
import { MentorChatModal } from './components/mentor/MentorChatModal';
import { CourseSaleModal } from './components/course/CourseSaleModal';
import { CourseHubView } from './components/course/CourseHubView';
import { RegionalWorldLearningView } from './components/course/RegionalWorldLearningView';
import { MetaverseBoardView } from './components/metaverse/MetaverseBoardView';
import { GlobalMediaPermissionModal, MediaPermissionState } from './components/media/GlobalMediaPermissionModal';
import { DailyMissionCard } from './components/missions/DailyMissionCard';
import { MissionHistoryModal } from './components/missions/MissionHistoryModal';
import {
  getOrGenerateDailyMission,
  DailyMission,
  getOrLoadStreakState,
  recordStreakMissionCompleted,
  ResilienceStreakState,
  getOrLoadMissionHistory,
  recordCompletedMissionInHistory,
  MissionHistoryEntry,
} from './data/dailyMissionData';
import { SixYearOldKidsHub } from './components/kids/SixYearOldKidsHub';
import { TearsSplashVideoModal } from './components/media/TearsSplashVideoModal';
import { ResilienceMeterOverlay } from './components/telemetry/ResilienceMeterOverlay';
import { ReflectOnGrowthModal } from './components/telemetry/ReflectOnGrowthModal';
import { GrowthDashboard } from './components/telemetry/GrowthDashboard';
import {
  GrowthDataPoint,
  loadOrInitGrowthHistory,
  recordGrowthSnapshot,
  resetGrowthHistory,
} from './data/growthHistoryData';
import { STEARSafeHub } from './components/stear/STEARSafeHub';
import { STEARPipOverlay } from './components/stear/STEARPipOverlay';
import { JeanellsHistoricalJourney } from './components/trivia/JeanellsHistoricalJourney';
import { AffirmationDeck } from './components/affirmation/AffirmationDeck';
import { ClassmateCollaborationView } from './components/collaboration/ClassmateCollaborationView';
import { JeanellVsGoldieView } from './components/narrative/JeanellVsGoldieView';
import { JusticeHubView } from './components/justice/JusticeHubView';
import { StockMarketVaultLab } from './components/finance/StockMarketVaultLab';
import { ClientServiceElectionModal } from './components/services/ClientServiceElectionModal';
import { SocialStatsShareModal } from './components/social/SocialStatsShareModal';
import { PWAInstallButton, OfflineIndicator, PWALiveLaunchTarget } from './components/pwa/PWAInstallButton';
import {
  LanguageVoiceAvatarModal,
  AvatarPortraitSVG,
} from './components/onboarding/LanguageVoiceAvatarModal';
import {
  loadUserPreferences,
  saveUserPreferences,
  SUPPORTED_LANGUAGES,
  AVATAR_OUTFITS,
  FACIAL_FEATURES,
  PERSONAL_EMOJIS,
  UserPreferencesAndAvatarState,
  speakWithPersona,
} from './data/languageAvatarData';
import { SafeRideBooking, SafeDeliveryOrder, CalendarAppointment, PipNotification } from './types/stear';
import { ActiveMantraBuff } from './types/affirmation';
import { ActiveCollaborationBonus, LabType } from './types/collaboration';
import { INITIAL_CALENDAR_APPOINTMENTS, INITIAL_ACTIVE_RIDE, INITIAL_ACTIVE_DELIVERY } from './data/stearSafeData';
import { STORY_STEPS } from './data/storyData';
import { sound } from './utils/audio';
import {
  Compass,
  Wind,
  Rocket,
  Building2,
  HeartHandshake,
  BookOpen,
  GraduationCap,
  Layers,
  Volume2,
  VolumeX,
  RotateCcw,
  Sparkles,
  Shield,
  Heart,
  Clock,
  User,
  Users,
  Scan,
  Briefcase,
  Scale,
  Award,
  Store,
  Video,
  Home,
  Radio,
  MapPin,
  Bot,
  Car,
  Calendar as CalendarIcon,
  Bell,
  Utensils,
  Flame,
  TrendingUp,
  LineChart,
  Brain,
  Camera,
  Share2,
  Globe,
  Mic,
  Smile,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  LayoutGrid,
  Check,
  Zap,
} from 'lucide-react';

export type TabType =
  | 'detroit'
  | 'stear'
  | 'trivia'
  | 'affirmations'
  | 'collaboration'
  | 'goldie'
  | 'justice'
  | 'market'
  | 'metaverse'
  | 'course'
  | 'campaign'
  | 'trades'
  | 'adult'
  | 'vault'
  | 'labs'
  | 'workbook'
  | 'codex'
  | 'shop'
  | 'zoom'
  | 'mls'
  | 'tears';

export type HubId = 'academy' | 'steam' | 'detroit' | 'wealth';

export interface NavHub {
  id: HubId;
  label: string;
  icon: string;
  shortLabel: string;
  description: string;
}

export interface NavModule {
  id: TabType;
  label: string;
  shortLabel?: string;
  hub: HubId;
  badge?: string;
}

export const NAV_HUBS: NavHub[] = [
  { id: 'academy', label: 'Academy & Diplomas', shortLabel: 'Academy', icon: '🎓', description: 'Virtual Academy K-12, Night School, Contract Signing & Workbook' },
  { id: 'steam', label: 'S.T.E.A.M. Labs', shortLabel: 'S.T.E.A.M.', icon: '🚀', description: 'Wind Tunnel, Rocket Propulsion, Trades & Zoom Boardroom' },
  { id: 'detroit', label: 'Detroit & Safe', shortLabel: 'Detroit', icon: '🏙️', description: 'Detroit Map, S-T-E-A-R Safe, TEARadio 100.1 & Campaign' },
  { id: 'wealth', label: 'Mindset & Wealth', shortLabel: 'Wealth', icon: '⚖️', description: 'Affirmations, Justice Hub, Savings, MLS & Goldie' },
];

export const NAV_MODULES: NavModule[] = [
  // 1. Academy & Diplomas
  { id: 'course', label: 'Virtual Academy (K–12)', shortLabel: 'Virtual Academy', hub: 'academy', badge: '100–310' },
  { id: 'workbook', label: 'Financial Workbook', shortLabel: 'Workbook', hub: 'academy', badge: 'Jeanell Land' },
  { id: 'codex', label: 'Financial Codex', shortLabel: 'Codex', hub: 'academy' },
  { id: 'metaverse', label: 'Metaverse Board', shortLabel: 'Metaverse (101)', hub: 'academy', badge: '101 Lvls' },

  // 2. S.T.E.A.M. Labs
  { id: 'labs', label: 'S.T.E.A.M. Labs', shortLabel: 'Sim Labs', hub: 'steam', badge: 'Aero & Rocket' },
  { id: 'trades', label: 'Vocational Trades', shortLabel: 'Trades', hub: 'steam' },
  { id: 'collaboration', label: 'Classmates Study', shortLabel: 'Classmates', hub: 'steam', badge: '+25%' },
  { id: 'zoom', label: 'Virtual Zoom', shortLabel: 'Zoom Boardroom', hub: 'steam' },

  // 3. Detroit & Community
  { id: 'detroit', label: 'Detroit City Map', shortLabel: 'Detroit Map', hub: 'detroit', badge: 'Level 1' },
  { id: 'stear', label: 'S-T-E-A-R Safe', shortLabel: 'S-T-E-A-R Safe', hub: 'detroit', badge: '24/7' },
  { id: 'tears', label: 'TEARadio 100.1 FM', shortLabel: 'TEARadio', hub: 'detroit', badge: 'Live' },
  { id: 'campaign', label: 'Campaign Journey', shortLabel: 'Campaign', hub: 'detroit' },
  { id: 'trivia', label: "Jeanell's Journey", shortLabel: 'Trivia & Story', hub: 'detroit' },

  // 4. Mindset & Wealth
  { id: 'affirmations', label: 'Affirmation Deck', shortLabel: 'Affirmations', hub: 'wealth', badge: '+5% Buff' },
  { id: 'goldie', label: 'Jeanell vs Goldie', shortLabel: 'Alter Ego', hub: 'wealth', badge: 'Goldie' },
  { id: 'justice', label: 'Justice Hub', shortLabel: 'Justice & Law', hub: 'wealth', badge: 'Consumer Law' },
  { id: 'market', label: 'Savings & Market', shortLabel: 'Savings/Market', hub: 'wealth' },
  { id: 'mls', label: 'Nationwide MLS', shortLabel: 'MLS Real Estate', hub: 'wealth' },
  { id: 'adult', label: 'Adult Matrix (17+)', shortLabel: 'Adult (17+)', hub: 'wealth' },
  { id: 'shop', label: 'City Shop', shortLabel: 'City Shop', hub: 'wealth' },
  { id: 'vault', label: 'Credential Vault', shortLabel: 'Vault', hub: 'wealth' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('detroit'); // Start on Level 1 Detroit Scene Scheme as requested!
  const [selectedHub, setSelectedHub] = useState<HubId>('detroit');

  const [selectedLab, setSelectedLab] = useState<'aero' | 'propulsion' | 'finance' | 'community' | 'regional_world'>('aero');
  const [labFadePhase, setLabFadePhase] = useState<'idle' | 'fade-out' | 'fade-in'>('idle');
  const [pendingLabLabel, setPendingLabLabel] = useState<string>('');

  const switchLabWithFade = (
    nextLab: 'aero' | 'propulsion' | 'finance' | 'community' | 'regional_world',
    label?: string
  ) => {
    if (nextLab === selectedLab && activeTab === 'labs') return;
    const labNames: Record<'aero' | 'propulsion' | 'finance' | 'community' | 'regional_world', string> = {
      aero: 'Aero Wind Tunnel Lab',
      propulsion: 'Rocket Propulsion Lab',
      finance: 'Real Estate Cashflow Lab',
      community: 'Detroit Community Rehab Lab',
      regional_world: 'World Regions, Read Mode & Typing Lab',
    };
    setPendingLabLabel(label || labNames[nextLab]);
    setLabFadePhase('fade-out');
    window.setTimeout(() => {
      setSelectedLab(nextLab);
      setLabFadePhase('fade-in');
      window.setTimeout(() => {
        setLabFadePhase('idle');
      }, 260);
    }, 220);
  };

  const [isMuted, setIsMuted] = useState<boolean>(sound.getMuted());
  const [isParentModalOpen, setIsParentModalOpen] = useState<boolean>(false);
  const [isBiometricModalOpen, setIsBiometricModalOpen] = useState<boolean>(false);
  const [isMentorModalOpen, setIsMentorModalOpen] = useState<boolean>(false);
  const [isCourseSaleModalOpen, setIsCourseSaleModalOpen] = useState<boolean>(false);
  const [isReflectOnGrowthModalOpen, setIsReflectOnGrowthModalOpen] = useState<boolean>(false);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState<boolean>(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [isSplashVideoModalOpen, setIsSplashVideoModalOpen] = useState<boolean>(false);
  const [isKidsModeActive, setIsKidsModeActive] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('steareality_is_kids_mode');
      return saved ? JSON.parse(saved) : true; // Default friendly mode on!
    } catch {
      return true;
    }
  });
  const [mentorChapterStep, setMentorChapterStep] = useState<StoryStep | undefined>(undefined);

  // Global Media & Biometric Permissions State (Camera & Microphone at session start)
  const [mediaPermissions, setMediaPermissions] = useState<MediaPermissionState>(() => {
    try {
      const saved = localStorage.getItem('steareality_media_permissions');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {}
    return {
      hasRequested: false,
      cameraGranted: false,
      micGranted: false,
      biometricReady: false,
      streamMode: 'denied',
    };
  });
  const [isMediaPermissionModalOpen, setIsMediaPermissionModalOpen] = useState<boolean>(false);

  // Daily Mission 24-Hour Goal System, Resilience Streak Multiplier & 7-Day History
  const [resilienceStreak, setResilienceStreak] = useState<ResilienceStreakState>(() => getOrLoadStreakState());
  const [dailyMission, setDailyMission] = useState<DailyMission>(() => getOrGenerateDailyMission());
  const [missionHistory, setMissionHistory] = useState<MissionHistoryEntry[]>(() =>
    getOrLoadMissionHistory(getOrGenerateDailyMission(), getOrLoadStreakState())
  );
  const [isMissionHistoryOpen, setIsMissionHistoryOpen] = useState<boolean>(false);

  // User Native Language, Voice Guide Persona & Level-Up Avatar State
  const [userPrefs, setUserPrefs] = useState<UserPreferencesAndAvatarState>(() =>
    loadUserPreferences()
  );
  const [isLanguageAvatarModalOpen, setIsLanguageAvatarModalOpen] = useState<boolean>(() => {
    const loaded = loadUserPreferences();
    return !loaded.hasCompletedInitialSetup;
  });
  const [recentUnlockBanner, setRecentUnlockBanner] = useState<string | null>(null);

  const activeLang =
    SUPPORTED_LANGUAGES.find((l) => l.code === userPrefs.language) ||
    SUPPORTED_LANGUAGES[0];

  const handleUpdateUserPrefs = (next: UserPreferencesAndAvatarState) => {
    setUserPrefs(next);
    saveUserPreferences(next);
  };

  const handlePWALiveLaunch = (target: PWALiveLaunchTarget) => {
    sound.playClick();
    if (target === 'mission-history') {
      setIsMissionHistoryOpen(true);
      return;
    }
    if (target === 'language-avatar') {
      setIsLanguageAvatarModalOpen(true);
      return;
    }
    setActiveTab(target);
  };

  // Support PWA shortcut URL parameters (?tab=..., ?modal=...)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const modalParam = params.get('modal');
      const tabParam = params.get('tab');
      if (modalParam === 'mission-history') {
        setIsMissionHistoryOpen(true);
      } else if (modalParam === 'language-avatar') {
        setIsLanguageAvatarModalOpen(true);
      }
      if (tabParam) {
        const mappedTab = tabParam === 'media' ? 'tears' : tabParam;
        setActiveTab(mappedTab as TabType);
      }
    } catch {}
  }, []);

  // Dashboard Simplification toggles (Anti-clutter controls)
  const [isDetailedTelemetryOpen, setIsDetailedTelemetryOpen] = useState<boolean>(false);
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState<boolean>(false);

  // Synchronize active hub when activeTab changes
  useEffect(() => {
    const match = NAV_MODULES.find((m) => m.id === activeTab);
    if (match && match.hub !== selectedHub) {
      setSelectedHub(match.hub);
    }
  }, [activeTab]);

  const handleCompleteDailyMission = (missionId: string) => {
    if (dailyMission.id === missionId && !dailyMission.isCompleted) {
      sound.playSuccess();
      const updatedMission = { ...dailyMission, isCompleted: true };
      setDailyMission(updatedMission);
      try {
        localStorage.setItem('steareality_daily_mission', JSON.stringify(updatedMission));
      } catch {}

      // Advance Resilience Streak and calculate multiplier boost
      const updatedStreak = recordStreakMissionCompleted();
      setResilienceStreak(updatedStreak);
      const updatedHist = recordCompletedMissionInHistory(updatedMission, updatedStreak);
      setMissionHistory(updatedHist);
      const multipliedRedemption = Math.round(dailyMission.redemptionReward * updatedStreak.multiplier);

      updateStats({
        redemptionPoints: multipliedRedemption,
        resilience: dailyMission.bonusResilience,
        earningsBalance: dailyMission.bonusCash,
      });

      const missionNotif: PipNotification = {
        id: `notif-${Date.now()}`,
        type: 'resilience',
        title: `Daily Goal Completed! ${updatedStreak.streakBadge.emoji}`,
        message: `Earned +${multipliedRedemption} Redemption Points (${updatedStreak.multiplier}x Multiplier!), +${dailyMission.bonusResilience}% Resilience & +$${dailyMission.bonusCash} Cash for completing "${dailyMission.title}"! Consecutive Streak: ${updatedStreak.currentStreakDays} days!`,
        timestamp: 'Just now',
        isRead: false,
        urgency: 'high',
        actionLabel: 'View Redemption',
        actionTab: 'goldie',
      };
      setPipNotifications((prev) => [missionNotif, ...prev]);
    }
  };

  // Auto-prompt media permissions on initial mount if not requested yet
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const saved = localStorage.getItem('steareality_media_permissions');
        if (!saved) {
          setIsMediaPermissionModalOpen(true);
        }
      } catch {
        setIsMediaPermissionModalOpen(true);
      }
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // S-T-E-A-R Safe & PIP States
  const [stearInitialTab, setStearInitialTab] = useState<'rides' | 'deliveries' | 'calendar' | 'sentinel'>('rides');
  const [activeRide, setActiveRide] = useState<SafeRideBooking | null>(INITIAL_ACTIVE_RIDE);
  const [activeDelivery, setActiveDelivery] = useState<SafeDeliveryOrder | null>(INITIAL_ACTIVE_DELIVERY);
  const [calendarAppointments, setCalendarAppointments] = useState<CalendarAppointment[]>(INITIAL_CALENDAR_APPOINTMENTS);
  const [isPipOpen, setIsPipOpen] = useState<boolean>(true);
  const [pipNotifications, setPipNotifications] = useState<PipNotification[]>([
    {
      id: 'notif-1',
      type: 'ride',
      title: 'S-T-E-A-R Safe Ride En Route',
      message: 'Marcus Vance in Chevy Bolt EUV is arriving in 3 mins. Handshake Safety PIN: 4892.',
      timestamp: 'Just now',
      isRead: false,
      urgency: 'high',
      actionLabel: 'Track Ride',
      actionTab: 'stear',
    },
    {
      id: 'notif-2',
      type: 'calendar',
      title: 'Interview Alert: Boeing Propulsion',
      message: 'Virtual Zoom technical interview starts at 02:30 PM. Prepare your NACA airfoil slides.',
      timestamp: '15m ago',
      isRead: false,
      urgency: 'medium',
      actionLabel: 'Open Zoom',
      actionTab: 'zoom',
    },
    {
      id: 'notif-3',
      type: 'resilience',
      title: 'Resilience Telemetry Online',
      message: 'Adaptive mental state monitor active. Auto-triggers visual alert below 30% or flow state above 80%.',
      timestamp: '1h ago',
      isRead: true,
      urgency: 'low',
    },
  ]);

  // Student Profile
  const [profile, setProfile] = useState<StudentProfile>({
    name: 'Amari',
    age: 17, // default 17 to unlock adult decisions & vocational testing
    ageBracket: 'adult',
    grade: '12th Grade / College Prep',
    parentName: 'Mrs. Land',
    parentEmail: 'parent@example.com',
    registeredAt: new Date().toLocaleDateString(),
    isBiometricallyVerified: true,
    isPremiumMember: false,
    isCoursePurchased: false,
    unlockedLevelsCount: 2, // Levels 1 & 2 Detroit unlocked initially; 101 unlocked upon course purchase!
    currentLevelNumber: 1,
    characterTitle: 'Senior Flight Systems Engineer',
    characterLevel: 3,
    inventory: ['item_blazer'],
    ownedPropertyIds: ['prop_detroit_duplex'],
    unlockedResourceIds: ['res_one_stop_rehab_center'],
    resumeFileName: 'Amari_Land_Resume_Apprentice.pdf',
  });

  // Parental Controls
  const [controls, setControls] = useState<ParentalControls>({
    enabled: false,
    pin: '1234',
    dailyTimeLimitMinutes: 60,
    timeSpentTodayMinutes: 22,
    soundEnabled: true,
    ageFilterEnforced: true,
  });

  // Player Stats including Dynamic Resilience & Earnings Balance
  const [stats, setStats] = useState<PlayerStats>({
    resilience: 65,
    redemptionPoints: 25,
    steamMastery: 45,
    financialAcumen: 45,
    communityLegacy: 40,
    coolPoints: 10,
    kindnessPoints: 30,
    earningsBalance: 4200,
  });

  const [growthHistory, setGrowthHistory] = useState<GrowthDataPoint[]>(() =>
    loadOrInitGrowthHistory(stats)
  );
  const lastRecordedGrowthRef = React.useRef({
    resilience: stats.resilience,
    steamMastery: stats.steamMastery,
    financialAcumen: stats.financialAcumen,
  });

  // Classmate Relationship Tracking
  const [classmateStatus, setClassmateStatus] = useState<ClassmateStatusMap>({
    marcus: 'ally',
    kendra: 'ally',
    david: 'neutral',
  });

  // Active Mantra Buff from Affirmation Deck (+5% resilience buff)
  const [activeMantra, setActiveMantra] = useState<ActiveMantraBuff | null>(() => {
    try {
      const saved = localStorage.getItem('steareality_active_mantra');
      if (saved) {
        const parsed: ActiveMantraBuff = JSON.parse(saved);
        if (parsed.expiresAt > Date.now()) {
          return parsed;
        }
      }
    } catch {}
    return null;
  });

  const handleSetActiveMantra = (mantra: ActiveMantraBuff | null) => {
    setActiveMantra(mantra);
    if (mantra) {
      localStorage.setItem('steareality_active_mantra', JSON.stringify(mantra));
    } else {
      localStorage.removeItem('steareality_active_mantra');
    }
  };

  // Active Classmate Collaboration Bonus (+25% in STEAM Labs)
  const [activeCollaboration, setActiveCollaboration] = useState<ActiveCollaborationBonus | null>(() => {
    try {
      const saved = localStorage.getItem('steareality_active_collaboration');
      if (saved) {
        const parsed: ActiveCollaborationBonus = JSON.parse(saved);
        if (parsed.expiresAt > Date.now()) {
          return parsed;
        }
      }
    } catch {}
    return null;
  });

  const handleSetActiveCollaboration = (collab: ActiveCollaborationBonus | null) => {
    setActiveCollaboration(collab);
    if (collab) {
      localStorage.setItem('steareality_active_collaboration', JSON.stringify(collab));
      setPipNotifications((prev) => [
        {
          id: `notif-${Date.now()}`,
          type: 'resilience',
          title: `Study Request Accepted: ${collab.classmateName}`,
          message: `${collab.classmateName} joined your study session in ${collab.labName}! +${collab.bonusPercent}% Mastery Bonus is now active.`,
          timestamp: 'Just now',
          isRead: false,
          urgency: 'high',
          actionLabel: `Open ${collab.labName.split(' ')[0]} Lab`,
          actionTab: 'labs',
        },
        ...prev,
      ]);
    } else {
      localStorage.removeItem('steareality_active_collaboration');
    }
  };

  // Load state from localStorage
  useEffect(() => {
    const savedStats = localStorage.getItem('steareality_stats');
    if (savedStats) {
      try {
        const parsed = JSON.parse(savedStats);
        const merged: PlayerStats = {
          ...stats,
          ...parsed,
          redemptionPoints: parsed.redemptionPoints ?? stats.redemptionPoints ?? 25,
        };
        lastRecordedGrowthRef.current = {
          resilience: merged.resilience,
          steamMastery: merged.steamMastery,
          financialAcumen: merged.financialAcumen,
        };
        setStats(merged);
        setGrowthHistory(loadOrInitGrowthHistory(merged));
      } catch {}
    }

    const savedProfile = localStorage.getItem('steareality_profile');
    if (savedProfile) {
      try {
        setProfile(JSON.parse(savedProfile));
      } catch {}
    }

    const savedControls = localStorage.getItem('steareality_controls');
    if (savedControls) {
      try {
        setControls(JSON.parse(savedControls));
      } catch {}
    }

    const savedClassmate = localStorage.getItem('steareality_classmate');
    if (savedClassmate) {
      try {
        setClassmateStatus(JSON.parse(savedClassmate));
      } catch {}
    }
  }, []);

  // Append time-series growth snapshot whenever Resilience, STEAM Mastery, or Financial Acumen changes
  useEffect(() => {
    const prev = lastRecordedGrowthRef.current;
    if (
      prev.resilience !== stats.resilience ||
      prev.steamMastery !== stats.steamMastery ||
      prev.financialAcumen !== stats.financialAcumen
    ) {
      lastRecordedGrowthRef.current = {
        resilience: stats.resilience,
        steamMastery: stats.steamMastery,
        financialAcumen: stats.financialAcumen,
      };
      setGrowthHistory(recordGrowthSnapshot(stats));
    }
  }, [stats.resilience, stats.steamMastery, stats.financialAcumen]);

  const updateStats = (delta: Partial<PlayerStats>) => {
    setStats((prev) => {
      const next: PlayerStats = {
        resilience: Math.min(100, Math.max(0, prev.resilience + (delta.resilience || 0))),
        redemptionPoints: Math.max(0, (prev.redemptionPoints ?? 25) + (delta.redemptionPoints || 0)),
        steamMastery: Math.min(100, Math.max(0, prev.steamMastery + (delta.steamMastery || 0))),
        financialAcumen: Math.min(100, Math.max(0, prev.financialAcumen + (delta.financialAcumen || 0))),
        communityLegacy: Math.min(100, Math.max(0, prev.communityLegacy + (delta.communityLegacy || 0))),
        coolPoints: Math.max(0, prev.coolPoints + (delta.coolPoints || 0)),
        kindnessPoints: Math.max(0, prev.kindnessPoints + (delta.kindnessPoints || 0)),
        earningsBalance: Math.max(0, prev.earningsBalance + (delta.earningsBalance || 0)),
      };
      localStorage.setItem('steareality_stats', JSON.stringify(next));
      return next;
    });
  };

  const handleUpdateProfile = (newProfile: StudentProfile) => {
    setProfile(newProfile);
    localStorage.setItem('steareality_profile', JSON.stringify(newProfile));
  };

  const handleCompleteLevelAndUnlockReward = () => {
    sound.playSuccess();
    const nextLevel = (profile.characterLevel || 1) + 1;
    const nextUnlockedLevels = Math.max(profile.unlockedLevelsCount || 2, nextLevel + 1);

    // Find newly unlocked outfit, facial feature, and personal emoji for nextLevel
    const unlockedOutfit =
      AVATAR_OUTFITS.find((o) => o.unlockLevel === nextLevel) ||
      AVATAR_OUTFITS[Math.min(nextLevel - 1, AVATAR_OUTFITS.length - 1)];
    const unlockedEmoji =
      PERSONAL_EMOJIS.find((e) => e.unlockLevel === nextLevel) ||
      PERSONAL_EMOJIS[Math.min(nextLevel - 1, PERSONAL_EMOJIS.length - 1)];
    const unlockedFeature = FACIAL_FEATURES.find((f) => f.unlockLevel === nextLevel);

    const updatedPrefs: UserPreferencesAndAvatarState = {
      ...userPrefs,
      hasCompletedInitialSetup: true,
      outfitId: unlockedOutfit.id,
      personalEmoji: unlockedEmoji.emoji,
      ...(unlockedFeature?.category === 'hair' ? { hairId: unlockedFeature.id } : {}),
      ...(unlockedFeature?.category === 'eyewear' ? { eyewearId: unlockedFeature.id } : {}),
      ...(unlockedFeature?.category === 'eyes' ? { eyesId: unlockedFeature.id } : {}),
      ...(unlockedFeature?.category === 'smile' ? { smileId: unlockedFeature.id } : {}),
    };
    handleUpdateUserPrefs(updatedPrefs);

    const updatedProfile: StudentProfile = {
      ...profile,
      characterLevel: nextLevel,
      currentLevelNumber: nextLevel,
      unlockedLevelsCount: nextUnlockedLevels,
    };
    handleUpdateProfile(updatedProfile);

    updateStats({
      redemptionPoints: 35,
      resilience: 8,
      earningsBalance: 250,
      coolPoints: 20,
    });

    const bannerMsg = `Level ${nextLevel} Reached! Unlocked ${unlockedOutfit.emoji} ${unlockedOutfit.name}${
      unlockedFeature ? `, ${unlockedFeature.emoji} ${unlockedFeature.name}` : ''
    } & ${unlockedEmoji.emoji} Emoji!`;
    setRecentUnlockBanner(bannerMsg);
    setIsLanguageAvatarModalOpen(true);

    speakWithPersona(
      `${activeLang.welcomeGreeting} Level ${nextLevel}!`,
      userPrefs.language,
      userPrefs.voicePersona
    );
  };

  const handleUpdateControls = (newControls: ParentalControls) => {
    setControls(newControls);
    localStorage.setItem('steareality_controls', JSON.stringify(newControls));
  };

  const handleUpdateClassmate = (id: ClassmateId, status: RelationshipState) => {
    setClassmateStatus((prev) => {
      const next = { ...prev, [id]: status };
      localStorage.setItem('steareality_classmate', JSON.stringify(next));
      return next;
    });
  };

  const handleToggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      sound.playSuccess();
    }
  };

  const handleResetGame = () => {
    if (window.confirm('Reset your S.T.E.A.Reality simulation journey and telemetry?')) {
      sound.playClick();
      const initial: PlayerStats = {
        resilience: 55,
        redemptionPoints: 25,
        steamMastery: 35,
        financialAcumen: 30,
        communityLegacy: 35,
        coolPoints: 10,
        kindnessPoints: 20,
        earningsBalance: 1200,
      };
      setStats(initial);
      lastRecordedGrowthRef.current = {
        resilience: initial.resilience,
        steamMastery: initial.steamMastery,
        financialAcumen: initial.financialAcumen,
      };
      setGrowthHistory(resetGrowthHistory(initial));
      setClassmateStatus({ marcus: 'neutral', kendra: 'neutral', david: 'neutral' });
      localStorage.removeItem('steareality_stats');
      localStorage.removeItem('steareality_workbook');
      localStorage.removeItem('steareality_classmate');
      setActiveTab('detroit');
    }
  };

  // S-T-E-A-R Safe Handlers
  const handleBookRide = (ride: SafeRideBooking) => {
    setActiveRide(ride);
    sound.playNotification();
    const newNotif: PipNotification = {
      id: `notif-${Date.now()}`,
      type: 'ride',
      title: 'Safe Ride Dispatched',
      message: `${ride.title} booked to ${ride.destinationName}. Driver ${ride.driverName} en route (PIN: ${ride.safetyPin}).`,
      timestamp: 'Just now',
      isRead: false,
      urgency: 'high',
      actionLabel: 'Track Ride',
      actionTab: 'stear',
    };
    setPipNotifications((prev) => [newNotif, ...prev]);
  };

  const handleCompleteRide = () => {
    if (activeRide) {
      sound.playSuccess();
      updateStats({ resilience: 10, coolPoints: 15 });
      const newNotif: PipNotification = {
        id: `notif-${Date.now()}`,
        type: 'ride',
        title: 'Ride Completed Safely',
        message: `Arrived safely at ${activeRide.destinationName}. Handshake confirmed (+10% Stamina).`,
        timestamp: 'Just now',
        isRead: false,
        urgency: 'low',
      };
      setPipNotifications((prev) => [newNotif, ...prev]);
      setActiveRide(null);
    }
  };

  const handleOrderDelivery = (delivery: SafeDeliveryOrder) => {
    setActiveDelivery(delivery);
    sound.playNotification();
    const newNotif: PipNotification = {
      id: `notif-${Date.now()}`,
      type: 'delivery',
      title: 'S-T-E-A-R Drop Dispatched',
      message: `${delivery.title} ordered! Courier ${delivery.courierName} on ${delivery.courierVehicle} arriving in ${delivery.etaMinutes}m.`,
      timestamp: 'Just now',
      isRead: false,
      urgency: 'medium',
      actionLabel: 'View Drop',
      actionTab: 'stear',
    };
    setPipNotifications((prev) => [newNotif, ...prev]);
  };

  const handleCompleteDelivery = () => {
    if (activeDelivery) {
      sound.playSuccess();
      updateStats({ resilience: activeDelivery.resilienceBoost });
      const newNotif: PipNotification = {
        id: `notif-${Date.now()}`,
        type: 'delivery',
        title: 'Drop Delivered & Consumed',
        message: `${activeDelivery.title} delivered! Player Resilience boosted by +${activeDelivery.resilienceBoost}%.`,
        timestamp: 'Just now',
        isRead: false,
        urgency: 'low',
      };
      setPipNotifications((prev) => [newNotif, ...prev]);
      setActiveDelivery(null);
    }
  };

  const handleAddAppointment = (appointment: CalendarAppointment) => {
    setCalendarAppointments((prev) => [appointment, ...prev]);
    sound.playNotification();
    const newNotif: PipNotification = {
      id: `notif-${Date.now()}`,
      type: 'calendar',
      title: 'Appointment Scheduled',
      message: `${appointment.title} set for ${appointment.date} at ${appointment.time}. PIP alarm active.`,
      timestamp: 'Just now',
      isRead: false,
      urgency: 'medium',
      actionLabel: 'View Calendar',
      actionTab: 'stear',
    };
    setPipNotifications((prev) => [newNotif, ...prev]);
  };

  const handleCompleteAppointment = (id: string) => {
    setCalendarAppointments((prev) =>
      prev.map((apt) => {
        if (apt.id === id) {
          updateStats({ resilience: apt.resilienceReward, coolPoints: apt.coolPointsReward });
          const newNotif: PipNotification = {
            id: `notif-${Date.now()}`,
            type: 'calendar',
            title: 'Milestone Completed!',
            message: `Attended: ${apt.title}. Rewards: +${apt.resilienceReward}% Resilience, +${apt.coolPointsReward} Cool Points!`,
            timestamp: 'Just now',
            isRead: false,
            urgency: 'low',
          };
          setPipNotifications((p) => [newNotif, ...p]);
          return { ...apt, isCompleted: true };
        }
        return apt;
      })
    );
  };

  const handleMarkNotificationRead = (id: string) => {
    setPipNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const handleClearAllNotifications = () => {
    setPipNotifications([]);
  };

  const getResilienceBadge = (res: number) => {
    if (res >= 90) return { label: 'Transcendent (Perks Max)', color: 'text-amber-300 border-amber-500/50 bg-amber-950/40' };
    if (res >= 75) return { label: 'Unbreakable Resolve', color: 'text-purple-300 border-purple-500/50 bg-purple-950/40' };
    if (res >= 50) return { label: 'Steadfast Focus', color: 'text-cyan-300 border-cyan-500/50 bg-cyan-950/40' };
    return { label: 'Developing Grit', color: 'text-slate-400 border-slate-700 bg-slate-900' };
  };

  const tier = getResilienceBadge(stats.resilience);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500/20 selection:text-cyan-200">
      {/* HEADER SECTION: Kids Mode vs Standard Mode */}
      {isKidsModeActive ? (
        <header className="border-b border-amber-400/30 bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 sticky top-0 z-40 backdrop-blur-md shadow-lg shadow-amber-500/5">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 px-4 sm:px-6 py-3">
            {/* Kids Brand */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 via-rose-400 to-indigo-500 flex items-center justify-center text-xl shadow-md shadow-amber-500/20">
                🎈
              </div>
              <div>
                <div className="text-base sm:text-lg font-black text-amber-300 tracking-wide flex items-center gap-1.5">
                  <span>ABC's Academy Kids</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-200 border border-amber-400/40">
                    Ages 4½–8
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 hidden sm:block">
                  Friendly Fun with Founder Jeanell Land · Detroit, MI
                </p>
              </div>
            </div>

            {/* Kids Stats & Controls */}
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              {/* Custom Avatar & Native Language Button */}
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setIsLanguageAvatarModalOpen(true);
                }}
                title="Choose Native Language, Voice Guide, Facial Features & Outfits"
                className="flex items-center gap-2 px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border-2 border-cyan-400/60 rounded-2xl text-xs font-black text-white cursor-pointer shadow-md"
              >
                <AvatarPortraitSVG prefs={userPrefs} size={32} showEmojiBadge={false} />
                <span>
                  {activeLang.flag} {userPrefs.personalEmoji} Lvl {profile.characterLevel}
                </span>
              </button>

              {/* Star Points */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 border border-amber-400/30 rounded-xl text-amber-300 font-black text-xs shadow-sm">
                <span className="text-base">⭐</span>
                <span>{stats.redemptionPoints} Stars</span>
              </div>

              {/* Resilience Streak (Clickable for 7-Day History) */}
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setIsMissionHistoryOpen(true);
                }}
                title="View 7-Day Daily Mission History & Streak Rewards"
                className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 border border-amber-500/40 rounded-xl text-amber-300 font-bold text-xs cursor-pointer transition-colors"
              >
                <span>{resilienceStreak.streakBadge.emoji}</span>
                <span>{activeLang.ui.missionHistoryBtn}</span>
                <span className="text-[10px] font-mono bg-black/40 px-1 rounded text-amber-200 ml-0.5">
                  {resilienceStreak.multiplier}x
                </span>
              </button>

              {/* Sound Toggle */}
              <button
                onClick={handleToggleSound}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
                title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
              </button>

              {/* PWA Install & Live Links Button */}
              <PWAInstallButton
                compact={true}
                labelOverride={activeLang.ui.pwaLiveLinksBtn}
                onLiveLaunch={handlePWALiveLaunch}
              />

              {/* Switch Back to Standard Mode */}
              <button
                onClick={() => {
                  sound.playClick();
                  setIsKidsModeActive(false);
                  try {
                    localStorage.setItem('steareality_is_kids_mode', JSON.stringify(false));
                  } catch {}
                }}
                className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                title="Switch to Standard Dashboard (Ages 8+ and Adult)"
              >
                <span>{activeLang.ui.standardModeBtn}</span>
              </button>
            </div>
          </div>
        </header>
      ) : (
        /* STANDARD ADULT / YOUTH DASHBOARD HEADER */
        <header className="border-b border-slate-800/90 bg-slate-950/90 backdrop-blur-md sticky top-0 z-40">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 lg:gap-8 px-4 sm:px-6 py-3">
            {/* Zone 1: Wordmark with S.T.E.A.R.S. SAFE & T.E.A.R.S. CHANNEL Medallions */}
            <div className="flex items-center gap-3 shrink-0">
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  sound.playClick();
                  setActiveTab('detroit');
                }}
                className="group flex items-center gap-2.5 cursor-pointer"
              >
                <div className="flex items-center -space-x-1.5">
                  <img
                    src="/icon.svg"
                    alt="S.T.E.A.R.S. SAFE"
                    className="w-9 h-9 rounded-full border border-cyan-400/60 shadow-md"
                  />
                  <img
                    src="/tears-channel-icon.svg"
                    alt="T.E.A.R.S. CHANNEL"
                    className="w-8 h-8 rounded-full border border-slate-400/60 shadow-md hidden sm:block"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="text-lg font-black tracking-tight text-white group-hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                    <span>S.T.E.A.Reality</span>
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-300">
                      K–12 to 90+
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 hidden xl:inline font-mono">
                    stearealitythejeanelllandodyssey.com
                  </span>
                </div>
              </a>
            </div>

            {/* Zone 2: 4 Clean Hub Navigation Buttons (Translated into Native Language) */}
            <nav className="hidden md:flex items-center gap-1.5 p-1 bg-slate-900/90 rounded-xl border border-slate-800 shadow-inner">
              {NAV_HUBS.map((hub) => {
                const isHubActive = selectedHub === hub.id;
                const translatedLabel = activeLang.ui.hubs[hub.id] || hub.label;
                return (
                  <button
                    key={hub.id}
                    onClick={() => {
                      sound.playClick();
                      setSelectedHub(hub.id);
                      const currentTabInHub = NAV_MODULES.find((m) => m.id === activeTab && m.hub === hub.id);
                      if (!currentTabInHub) {
                        const firstInHub = NAV_MODULES.find((m) => m.hub === hub.id);
                        if (firstInHub) setActiveTab(firstInHub.id);
                      }
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      isHubActive
                        ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-500/20'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`}
                    title={hub.description}
                  >
                    <span>{hub.icon}</span>
                    <span>{translatedLabel}</span>
                  </button>
                );
              })}
            </nav>

            {/* Zone 3: Primary Actions & Utilities */}
            <div className="flex items-center gap-2 shrink-0 flex-wrap">
              {/* Native Language, Voice & Avatar Wardrobe Studio Trigger */}
              <button
                onClick={() => {
                  sound.playClick();
                  setIsLanguageAvatarModalOpen(true);
                }}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 border border-cyan-400/50 rounded-xl shadow-sm transition-all cursor-pointer"
                title="Choose Native Language, Voice Guide, Personal Emoji & Level Outfits"
              >
                <AvatarPortraitSVG prefs={userPrefs} size={28} showEmojiBadge={false} />
                <span>
                  {activeLang.flag} {userPrefs.personalEmoji} Lvl {profile.characterLevel}
                </span>
              </button>

              {/* Primary Action: 7-Day Mission History Modal Trigger */}
              <button
                onClick={() => {
                  sound.playClick();
                  setIsMissionHistoryOpen(true);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-amber-200 bg-amber-950/70 hover:bg-amber-900/80 border border-amber-500/50 rounded-xl shadow-sm transition-all cursor-pointer"
                title="Open 7-Day Daily Mission History, Streak Progression & Past Rewards"
              >
                <span>{resilienceStreak.streakBadge.emoji}</span>
                <span>{activeLang.ui.missionHistoryBtn}</span>
                <span className="hidden sm:inline-block text-[10px] font-mono bg-amber-400 text-slate-950 font-black px-1.5 rounded">
                  {resilienceStreak.multiplier}x
                </span>
              </button>

              {/* Primary Action 1: Ask Mentor */}
              <button
                onClick={() => {
                  sound.playClick();
                  setIsMentorModalOpen(true);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-lg shadow-sm shadow-cyan-500/20 transition-all cursor-pointer"
                title="AI Mentor Chat: Ask questions to Aeronautical Engineer & Founder Jeanell Land"
              >
                <Bot className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{activeLang.ui.askMentorBtn}</span>
              </button>

              {/* PWA Cross-Platform Install & Live Links Action */}
              <PWAInstallButton
                compact={true}
                labelOverride={activeLang.ui.pwaLiveLinksBtn}
                onLiveLaunch={handlePWALiveLaunch}
              />

              {/* Kids Mode Friendly 6-Year-Old Toggle */}
              <button
                onClick={() => {
                  sound.playClick();
                  setIsKidsModeActive(true);
                  try {
                    localStorage.setItem('steareality_is_kids_mode', JSON.stringify(true));
                  } catch {}
                  sound.playSuccess();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-black rounded-lg border bg-gradient-to-r from-amber-500/20 to-rose-500/20 text-amber-300 border-amber-400/40 hover:border-amber-300 hover:bg-amber-500/30 transition-all cursor-pointer shadow-sm"
                title="Switch to 6-Year-Old Friendly Big Touch Button Hub"
              >
                <Smile className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                <span>{activeLang.ui.kidsHubBtn}</span>
              </button>

              {/* Portals & Tools Dropdown Menu */}
              <div className="relative">
                <button
                  onClick={() => setIsToolsDropdownOpen(!isToolsDropdownOpen)}
                  className={`flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                    isToolsDropdownOpen
                      ? 'bg-slate-800 text-white border-slate-600'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
                  }`}
                  title="Academy Portals, Biometrics, PIP & Services"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="hidden md:inline">Tools</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {/* Dropdown Menu Popup */}
                {isToolsDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-slate-950 border border-slate-800 rounded-xl shadow-2xl p-2 z-50 space-y-1 backdrop-blur-md">
                    <div className="px-2 py-1 text-[10px] font-mono text-slate-400 uppercase font-bold border-b border-slate-800/80 mb-1">
                      Academy Tools &amp; Portals
                    </div>

                    <button
                      onClick={() => {
                        sound.playClick();
                        setIsToolsDropdownOpen(false);
                        setIsPipOpen(!isPipOpen);
                      }}
                      className="w-full flex items-center justify-between px-2.5 py-1.5 text-xs rounded-lg text-slate-300 hover:bg-slate-900 hover:text-white transition-colors cursor-pointer text-left"
                    >
                      <span className="flex items-center gap-2">
                        <Bell className="w-3.5 h-3.5 text-cyan-400" />
                        <span>S-T-E-A-R PIP Screen</span>
                      </span>
                      {pipNotifications.filter((n) => !n.isRead).length > 0 && (
                        <span className="px-1.5 py-0.2 rounded-full bg-rose-600 text-white text-[9px] font-bold">
                          {pipNotifications.filter((n) => !n.isRead).length}
                        </span>
                      )}
                    </button>

                    <button
                      onClick={() => {
                        sound.playClick();
                        setIsToolsDropdownOpen(false);
                        setIsCourseSaleModalOpen(true);
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs rounded-lg text-slate-300 hover:bg-slate-900 hover:text-white transition-colors cursor-pointer text-left"
                    >
                      <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
                      <span>{profile.isCoursePurchased ? '101 Levels Unlocked 🎓' : 'Course & 101 Levels'}</span>
                    </button>

                    <button
                      onClick={() => {
                        sound.playClick();
                        setIsToolsDropdownOpen(false);
                        setIsServiceModalOpen(true);
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs rounded-lg text-slate-300 hover:bg-slate-900 hover:text-white transition-colors cursor-pointer text-left"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>Elect Services &amp; 501(c)(3)</span>
                    </button>

                    <button
                      onClick={() => {
                        sound.playClick();
                        setIsToolsDropdownOpen(false);
                        setIsBiometricModalOpen(true);
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs rounded-lg text-slate-300 hover:bg-slate-900 hover:text-white transition-colors cursor-pointer text-left"
                    >
                      <Scan className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{profile.isBiometricallyVerified ? 'Biometrics OK' : 'Scan Face'}</span>
                    </button>

                    <button
                      onClick={() => {
                        sound.playClick();
                        setIsToolsDropdownOpen(false);
                        setIsMediaPermissionModalOpen(true);
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs rounded-lg text-slate-300 hover:bg-slate-900 hover:text-white transition-colors cursor-pointer text-left"
                    >
                      <Camera className="w-3.5 h-3.5 text-emerald-400" />
                      <span>
                        {mediaPermissions.cameraGranted && mediaPermissions.micGranted
                          ? 'Camera & Mic: Live'
                          : 'Enable A/V Diagnostic'}
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        sound.playClick();
                        setIsToolsDropdownOpen(false);
                        setIsParentModalOpen(true);
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs rounded-lg text-cyan-300 hover:bg-cyan-950/60 transition-colors cursor-pointer text-left font-semibold"
                    >
                      <Shield className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Parent Portal (Ages 8+)</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Sound Toggle */}
              <button
                onClick={handleToggleSound}
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
                title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
                aria-label="Toggle Audio"
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
              </button>
            </div>
          </div>
        </header>
      )}

      {/* Sub-Navigation Strip for Active Hub (Standard Mode Only) */}
      {!isKidsModeActive && (
        <div className="bg-slate-950/95 border-b border-slate-800/80 px-4 sm:px-6 py-2 shadow-sm">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 overflow-x-auto">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 shrink-0 hidden sm:inline mr-1">
                {NAV_HUBS.find((h) => h.id === selectedHub)?.label}:
              </span>
              {NAV_MODULES.filter((m) => m.hub === selectedHub).map((mod) => {
                const isActive = activeTab === mod.id;
                return (
                  <button
                    key={mod.id}
                    onClick={() => {
                      sound.playClick();
                      setActiveTab(mod.id);
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm'
                        : 'text-slate-400 hover:text-white bg-slate-900/60 hover:bg-slate-800 border border-transparent'
                    }`}
                  >
                    <span>{mod.label}</span>
                    {mod.badge && (
                      <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-black/40 text-cyan-300 border border-cyan-500/30">
                        {mod.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Hub Quick Info Badge */}
            <div className="hidden lg:flex items-center gap-2 text-[11px] font-mono text-slate-400 shrink-0">
              <span className="text-cyan-400">4 Core Hubs</span>
              <span>·</span>
              <span>20 Modules Total</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Container */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 flex-1 space-y-6">
        {/* 6-Year-Old Kid-Friendly Touch Hub (Giant Buttons, Voice, Video & Workbook Covers) */}
        {isKidsModeActive && (
          <div className="space-y-4">
            <SixYearOldKidsHub
              studentName={profile.name}
              onNavigateToTab={(tab) => {
                setActiveTab(tab as any);
              }}
              onOpenVideoSplash={() => setIsSplashVideoModalOpen(true)}
              userPrefs={userPrefs}
              currentLevel={profile.characterLevel}
              onOpenLanguageAvatarModal={() => setIsLanguageAvatarModalOpen(true)}
              onCompleteLevelAndUnlockReward={handleCompleteLevelAndUnlockReward}
              onPWALiveLaunch={handlePWALiveLaunch}
            />

            {/* Quick 5-Button Kid Activity Switcher */}
            <div className="p-3 bg-slate-900/90 border border-amber-400/30 rounded-2xl flex flex-wrap items-center justify-center gap-2 shadow-lg">
              <span className="text-xs font-bold text-amber-300 mr-2 flex items-center gap-1">
                <span>🎈 Quick Pick:</span>
              </span>
              {[
                { id: 'course', label: '🅰️ Letter Fun & Reading', color: 'from-amber-500 to-yellow-500' },
                { id: 'labs', label: '🚀 Fly Planes & Rockets', color: 'from-cyan-500 to-blue-500' },
                { id: 'workbook', label: '🎨 Color & Workbook', color: 'from-emerald-500 to-teal-500' },
                { id: 'tears', label: '📻 Kids Radio & Music', color: 'from-rose-500 to-pink-500' },
                { id: 'stear', label: '🛡️ S-T-E-A-R Safe Ride', color: 'from-indigo-500 to-purple-500' },
              ].map((act) => (
                <button
                  key={act.id}
                  onClick={() => {
                    sound.playClick();
                    setActiveTab(act.id as any);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer shadow-md ${
                    activeTab === act.id
                      ? `bg-gradient-to-r ${act.color} text-slate-950 ring-2 ring-white/50 scale-105`
                      : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800'
                  }`}
                >
                  {act.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Real-Time Player Resilience & Telemetry Ribbon (Standard Mode Only) */}
        {!isKidsModeActive && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 shadow-lg backdrop-blur">
            {/* Sleek Summary Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
              <div className="flex flex-wrap items-center gap-2.5">
                <div>
                  <h1 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
                    <span>Jeanell Land S.T.E.A.M. Telemetry</span>
                    <span className="text-slate-400 font-normal text-xs">· Detroit, MI</span>
                  </h1>
                </div>

                <span className={`px-2.5 py-0.5 rounded-md border text-xs font-semibold ${tier.color}`}>
                  {tier.label}
                </span>

                {/* Resilience Streak Badge (Clickable for 7-Day Mission History) */}
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setIsMissionHistoryOpen(true);
                  }}
                  title="Open 7-Day Mission History & Consistency Log"
                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border shadow-sm bg-gradient-to-r ${resilienceStreak.streakBadge.color} hover:opacity-90 transition-opacity cursor-pointer`}
                >
                  <span>{resilienceStreak.streakBadge.emoji}</span>
                  <span>{resilienceStreak.currentStreakDays}-Day Streak</span>
                  <span className="font-mono text-[10px] bg-black/40 px-1 rounded text-white">
                    {resilienceStreak.multiplier}x Multiplier
                  </span>
                </button>
              </div>

              {/* Quick Actions & Telemetry Expander */}
              <div className="flex items-center gap-2 text-xs flex-wrap">
                <span className="font-mono text-amber-300 font-bold bg-slate-950 px-2.5 py-1 rounded border border-amber-500/40 flex items-center gap-1" title="Redemption Points earned from daily goals and Goldie alter-ego crucibles">
                  <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>Redemption: {stats.redemptionPoints} pts</span>
                </span>

                <span className="font-mono text-emerald-400 font-bold bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
                  Wallet: ${(stats.earningsBalance || 0).toLocaleString()}
                </span>

                <button
                  onClick={() => {
                    sound.playClick();
                    setIsReflectOnGrowthModalOpen(true);
                  }}
                  className="px-2.5 py-1 rounded-md bg-emerald-950/80 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-500/40 font-bold flex items-center gap-1 transition-all cursor-pointer"
                  title="Reflect on growth (+5% Resilience)"
                >
                  <Brain className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Reflect (+5%)</span>
                </button>

                <button
                  onClick={() => {
                    sound.playClick();
                    setIsDetailedTelemetryOpen(!isDetailedTelemetryOpen);
                  }}
                  className="px-2.5 py-1 rounded-md bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-700 font-semibold flex items-center gap-1 transition-all cursor-pointer"
                  title="Toggle Deep Metrics & Resilience Formulas"
                >
                  <LineChart className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{isDetailedTelemetryOpen ? 'Hide Deep Telemetry' : 'Deep Telemetry'}</span>
                  {isDetailedTelemetryOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>
              </div>
            </div>

            {/* Recharts Growth Dashboard (Resilience, STEAM Mastery & Financial Acumen Over Time) */}
            <GrowthDashboard
              stats={stats}
              history={growthHistory}
              onRecordCheckpoint={() => {
                setGrowthHistory(recordGrowthSnapshot(stats, 'Manual Checkpoint'));
              }}
            />

            {/* Expandable Deep Telemetry & Formulas */}
            {isDetailedTelemetryOpen && (
              <div className="mt-4 pt-4 border-t border-slate-800">
                <ResilienceMeterOverlay
                  resilience={stats.resilience}
                  onUpdateResilience={(delta) => updateStats({ resilience: delta })}
                  onOpenStearHub={(initialTab) => {
                    setActiveTab('stear');
                    if (initialTab) setStearInitialTab(initialTab);
                  }}
                  onOpenMentorChat={() => {
                    setMentorChapterStep(undefined);
                    setIsMentorModalOpen(true);
                  }}
                  onOpenTrivia={() => {
                    sound.playClick();
                    setActiveTab('trivia');
                  }}
                  onOpenAffirmations={() => {
                    sound.playClick();
                    setActiveTab('affirmations');
                  }}
                  onOpenGoldie={() => {
                    sound.playClick();
                    setActiveTab('goldie');
                  }}
                  onOpenShareModal={() => setIsShareModalOpen(true)}
                  activeMantra={activeMantra}
                />
              </div>
            )}
          </div>
        )}

        {/* 24-Hour Daily Mission Ribbon with Resilience Streak Multiplier */}
        <DailyMissionCard
          mission={dailyMission}
          streak={resilienceStreak}
          onNavigateToTab={(tab) => {
            setActiveTab(tab as any);
          }}
          onCompleteMission={handleCompleteDailyMission}
          onOpenHistory={() => setIsMissionHistoryOpen(true)}
        />

        {/* Quick Mobile Navigation Filter Strip (Clean 2-level Hub & Item switcher) */}
        {!isKidsModeActive && (
          <div className="flex md:hidden flex-col gap-2 p-3 bg-slate-900/90 border border-slate-800 rounded-xl">
            {/* Row 1: The 4 Hubs */}
            <div className="flex gap-1.5 overflow-x-auto pb-1">
              {NAV_HUBS.map((hub) => (
                <button
                  key={hub.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedHub(hub.id);
                    const firstInHub = NAV_MODULES.find((m) => m.hub === hub.id);
                    if (firstInHub) setActiveTab(firstInHub.id);
                  }}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap transition-colors flex items-center gap-1 ${
                    selectedHub === hub.id
                      ? 'bg-cyan-600 text-white'
                      : 'bg-slate-950 text-slate-400 border border-slate-800'
                  }`}
                >
                  <span>{hub.icon}</span>
                  <span>{hub.shortLabel}</span>
                </button>
              ))}
            </div>

            {/* Row 2: Selected Hub's Modules */}
            <div className="flex gap-1.5 overflow-x-auto">
              {NAV_MODULES.filter((m) => m.hub === selectedHub).map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    sound.playClick();
                    setActiveTab(item.id);
                  }}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
                    activeTab === item.id
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
                      : 'bg-slate-950 text-slate-400 border border-slate-800'
                  }`}
                >
                  {item.shortLabel || item.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* DYNAMIC VIEWPORTS */}
        {activeTab === 'detroit' && (
          <DetroitSceneNavigator
            playerStats={stats}
            onUpdateStats={updateStats}
            profile={profile}
            onNavigateTo={(tab) => {
              setActiveTab(tab as any);
            }}
            onOpenMentor={() => {
              setMentorChapterStep(undefined);
              setIsMentorModalOpen(true);
            }}
          />
        )}

        {activeTab === 'stear' && (
          <STEARSafeHub
            playerStats={stats}
            onUpdateStats={updateStats}
            profile={profile}
            activeRide={activeRide}
            activeDelivery={activeDelivery}
            appointments={calendarAppointments}
            onBookRide={handleBookRide}
            onCompleteRide={handleCompleteRide}
            onOrderDelivery={handleOrderDelivery}
            onCompleteDelivery={handleCompleteDelivery}
            onAddAppointment={handleAddAppointment}
            onCompleteAppointment={handleCompleteAppointment}
            onNavigateToTab={(tab) => {
              sound.playClick();
              setActiveTab(tab as any);
            }}
            initialTab={stearInitialTab}
          />
        )}

        {activeTab === 'trivia' && (
          <JeanellsHistoricalJourney
            playerStats={stats}
            onUpdateStats={updateStats}
            onOpenStearSafe={() => setActiveTab('stear')}
            onOpenMetaverse={() => setActiveTab('metaverse')}
            onOpenAffirmations={() => setActiveTab('affirmations')}
            onOpenReflectOnGrowth={() => setIsReflectOnGrowthModalOpen(true)}
          />
        )}

        {activeTab === 'affirmations' && (
          <AffirmationDeck
            playerStats={stats}
            onUpdateStats={updateStats}
            activeMantra={activeMantra}
            onSetActiveMantra={handleSetActiveMantra}
            onOpenTrivia={() => setActiveTab('trivia')}
            onOpenStearSafe={() => setActiveTab('stear')}
            onReturnToMap={() => setActiveTab('detroit')}
          />
        )}

        {activeTab === 'collaboration' && (
          <ClassmateCollaborationView
            playerStats={stats}
            onUpdateStats={updateStats}
            classmateStatus={classmateStatus}
            onUpdateClassmate={handleUpdateClassmate}
            activeCollaboration={activeCollaboration}
            onSetActiveCollaboration={handleSetActiveCollaboration}
            onLaunchLab={(lab) => {
              setActiveTab('labs');
              switchLabWithFade(lab);
            }}
            onOpenCampaign={() => setActiveTab('campaign')}
          />
        )}

        {activeTab === 'goldie' && (
          <JeanellVsGoldieView
            playerStats={stats}
            onUpdateStats={updateStats}
            onOpenStearSafe={() => setActiveTab('stear')}
            onOpenAffirmations={() => setActiveTab('affirmations')}
            onReturnToMap={() => setActiveTab('detroit')}
            onOpenPatent={() => setActiveTab('vault')}
            onOpenMentorChat={(questionText) => {
              setMentorChapterStep(undefined);
              setIsMentorModalOpen(true);
            }}
          />
        )}

        {activeTab === 'justice' && (
          <JusticeHubView
            playerStats={stats}
            onUpdateStats={updateStats}
            onOpenGoldie={() => setActiveTab('goldie')}
            onReturnToMap={() => setActiveTab('detroit')}
            onOpenMentorChat={() => {
              setMentorChapterStep(undefined);
              setIsMentorModalOpen(true);
            }}
            onOpenServiceElection={() => setIsServiceModalOpen(true)}
          />
        )}

        {activeTab === 'market' && (
          <StockMarketVaultLab
            playerStats={stats}
            onUpdateStats={updateStats}
            onNavigateToTab={(tab) => setActiveTab(tab as any)}
            onTriggerNotification={(title, message) => {
              setPipNotifications((prev) => [
                {
                  id: `notif-${Date.now()}`,
                  type: 'resilience',
                  title,
                  message,
                  timestamp: 'Just now',
                  isRead: false,
                  urgency: 'high',
                  actionLabel: 'Open Market',
                  actionTab: 'market',
                },
                ...prev,
              ]);
            }}
          />
        )}

        {activeTab === 'metaverse' && (
          <MetaverseBoardView
            playerStats={stats}
            onUpdateStats={updateStats}
            profile={profile}
            onUpdateProfile={handleUpdateProfile}
            onOpenCourseSale={() => setIsCourseSaleModalOpen(true)}
            onOpenMentorChat={() => {
              setMentorChapterStep(undefined);
              setIsMentorModalOpen(true);
            }}
          />
        )}

        {activeTab === 'course' && (
          <CourseHubView
            profile={profile}
            onUpdateProfile={handleUpdateProfile}
            playerStats={stats}
            onUpdateStats={updateStats}
            onOpenCourseSale={() => setIsCourseSaleModalOpen(true)}
            onNavigateToMetaverse={() => setActiveTab('metaverse')}
            onOpenMentorChat={(questionText) => {
              setMentorChapterStep(undefined);
              setIsMentorModalOpen(true);
            }}
            onOpenServiceElection={() => setIsServiceModalOpen(true)}
          />
        )}

        {activeTab === 'shop' && (
          <CityShop
            playerStats={stats}
            onUpdateStats={updateStats}
            profile={profile}
            onUpdateProfile={handleUpdateProfile}
          />
        )}

        {activeTab === 'zoom' && (
          <VirtualZoomInterview
            playerStats={stats}
            onUpdateStats={updateStats}
            profile={profile}
          />
        )}

        {activeTab === 'mls' && (
          <NationwideMLSBrowser
            playerStats={stats}
            onUpdateStats={updateStats}
            profile={profile}
            onUpdateProfile={handleUpdateProfile}
          />
        )}

        {activeTab === 'tears' && <TEARSChannelAndRadio />}

        {activeTab === 'campaign' && (
          <NarrativeCampaign
            playerStats={stats}
            onUpdateStats={updateStats}
            onLaunchLab={(lab) => {
              sound.playClick();
              if (lab === 'trades') {
                setActiveTab('trades');
              } else if (lab === 'adult') {
                setActiveTab('adult');
              } else {
                setActiveTab('labs');
                switchLabWithFade(lab);
              }
            }}
            ageBracket={profile.ageBracket}
            classmateStatus={classmateStatus}
            onUpdateClassmate={handleUpdateClassmate}
            onUnlockResource={(resource) => {
              if (!profile.unlockedResourceIds?.includes(resource.id)) {
                handleUpdateProfile({
                  ...profile,
                  unlockedResourceIds: [...(profile.unlockedResourceIds || []), resource.id],
                });
              }
            }}
            onOpenMentorChat={(step) => {
              setMentorChapterStep(step);
              setIsMentorModalOpen(true);
            }}
          />
        )}

        {activeTab === 'trades' && (
          <VocationalTradeArena
            playerStats={stats}
            onUpdateStats={updateStats}
            profile={profile}
            onUpdateProfile={handleUpdateProfile}
          />
        )}

        {activeTab === 'adult' && (
          <AdultLifeMatrix
            userAge={profile.age}
            isBiometricallyVerified={profile.isBiometricallyVerified}
            onOpenBiometrics={() => setIsBiometricModalOpen(true)}
            playerStats={stats}
            onUpdateStats={updateStats}
            unlockedResourceIds={profile.unlockedResourceIds || []}
            onUnlockResource={(resource) => {
              if (!profile.unlockedResourceIds?.includes(resource.id)) {
                handleUpdateProfile({
                  ...profile,
                  unlockedResourceIds: [...(profile.unlockedResourceIds || []), resource.id],
                });
              }
            }}
          />
        )}

        {activeTab === 'vault' && (
          <CredentialVault
            profile={profile}
            onUpdateProfile={handleUpdateProfile}
            playerStats={stats}
            onUpdateStats={updateStats}
            onOpenBiometrics={() => setIsBiometricModalOpen(true)}
            onOpenServiceElection={() => setIsServiceModalOpen(true)}
          />
        )}

        {activeTab === 'labs' && (
          <div className="space-y-4 relative">
            {/* Subtle Fade-Through-Black Simulation Transition Overlay */}
            <div
              className={`pointer-events-none fixed inset-0 z-50 bg-black transition-opacity duration-200 flex items-center justify-center ${
                labFadePhase === 'fade-out'
                  ? 'opacity-95'
                  : labFadePhase === 'fade-in'
                    ? 'opacity-45'
                    : 'opacity-0'
              }`}
            >
              {labFadePhase !== 'idle' && (
                <div className="px-6 py-3 rounded-2xl bg-slate-950/90 border border-cyan-500/40 text-cyan-300 text-xs font-mono uppercase tracking-widest flex items-center gap-3 shadow-2xl">
                  <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
                  <span>Calibrating Simulation: {pendingLabLabel}...</span>
                </div>
              )}
            </div>

            {/* Lab Sub-Nav Bar */}
            <div className="flex border-b border-slate-800 bg-slate-900/60 p-2 rounded-xl gap-2 overflow-x-auto items-center">
              {[
                { id: 'aero', label: 'Aero Wind Tunnel Lab', icon: Wind },
                { id: 'propulsion', label: 'Rocket Propulsion Lab', icon: Rocket },
                { id: 'finance', label: 'Real Estate Cashflow Lab', icon: Building2 },
                { id: 'community', label: 'Detroit Community Rehab Lab', icon: HeartHandshake },
                { id: 'regional_world', label: 'World Regions, Biometric Read & Typing Lab', icon: Globe },
              ].map((lab) => {
                const Icon = lab.icon;
                const isSelected = selectedLab === lab.id;

                return (
                  <button
                    key={lab.id}
                    onClick={() => {
                      sound.playClick();
                      switchLabWithFade(lab.id as any, lab.label);
                    }}
                    className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
                      isSelected
                        ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/20'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{lab.label}</span>
                  </button>
                );
              })}

              {/* Classmate Collaboration Button */}
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('collaboration');
                }}
                className={`ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer shrink-0 ${
                  activeCollaboration
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30'
                    : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700'
                }`}
                title="Send Study Requests to Kendra or David to unlock temporary +25% Mastery Bonuses"
              >
                <Users className="w-3.5 h-3.5 text-cyan-400" />
                <span>
                  {activeCollaboration
                    ? `Co-Pilot: ${activeCollaboration.classmateName.split(' ')[0]} (+${activeCollaboration.bonusPercent}%)`
                    : 'Study Requests (+25% Bonus)'}
                </span>
              </button>
            </div>

            {/* Classmate Collaboration Status Banner */}
            {activeCollaboration && activeCollaboration.labFocus === selectedLab ? (
              <div className="bg-gradient-to-r from-emerald-950/70 via-slate-900 to-cyan-950/70 border-2 border-emerald-500/60 rounded-xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 text-emerald-300 animate-spin" style={{ animationDuration: '6s' }} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-white">
                        Active Study Partner: {activeCollaboration.classmateName} ({activeCollaboration.classmateTitle})
                      </span>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.2 rounded-full font-mono font-bold">
                        +{activeCollaboration.bonusPercent}% Mastery Multiplier Active
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 mt-0.5">
                      Topic: <strong className="text-amber-300">{activeCollaboration.topic}</strong> · {activeCollaboration.coPilotTip}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    sound.playClick();
                    setActiveTab('collaboration');
                  }}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-medium cursor-pointer shrink-0"
                >
                  Partner Details
                </button>
              </div>
            ) : activeCollaboration ? (
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <Users className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>
                    {activeCollaboration.classmateName} is currently studying in <strong>{activeCollaboration.labName}</strong> (+{activeCollaboration.bonusPercent}% Bonus).
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      sound.playClick();
                      switchLabWithFade(activeCollaboration.labFocus);
                    }}
                    className="text-cyan-400 hover:text-cyan-300 font-semibold underline cursor-pointer"
                  >
                    Switch to {activeCollaboration.labName.split(' ')[0]} Lab →
                  </button>
                  <button
                    onClick={() => {
                      sound.playClick();
                      setActiveTab('collaboration');
                    }}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 text-[11px] cursor-pointer"
                  >
                    Study Requests
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>
                    Need an academic boost? Send a virtual Study Request to <strong>Kendra</strong> or <strong>David</strong> to unlock a temporary <strong className="text-amber-300">+25% Mastery Bonus</strong> in this lab.
                  </span>
                </div>
                <button
                  onClick={() => {
                    sound.playClick();
                    setActiveTab('collaboration');
                  }}
                  className="text-cyan-400 hover:text-cyan-300 font-bold underline shrink-0 cursor-pointer text-xs"
                >
                  Send Study Request →
                </button>
              </div>
            )}

            {/* Lab Renderers with Fade-Through-Black Wrapper & Collaboration Multiplier */}
            <div
              className={`transition-opacity duration-200 ${
                labFadePhase !== 'idle' ? 'opacity-10' : 'opacity-100'
              }`}
            >
              {selectedLab === 'aero' && (
                <AeroWindTunnelLab
                  resilience={stats.resilience}
                  onMasteryEarned={(pts) => {
                    const isBonus = activeCollaboration && activeCollaboration.labFocus === 'aero';
                    const bonusMultiplier = isBonus ? activeCollaboration.bonusMultiplier : 1;
                    const finalPts = Math.round(pts * bonusMultiplier);
                    if (isBonus) sound.playSuccess();
                    updateStats({ steamMastery: finalPts, resilience: Math.round(finalPts * 0.5) });
                  }}
                />
              )}

              {selectedLab === 'propulsion' && (
                <RocketPropulsionLab
                  resilience={stats.resilience}
                  onMasteryEarned={(pts) => {
                    const isBonus = activeCollaboration && activeCollaboration.labFocus === 'propulsion';
                    const bonusMultiplier = isBonus ? activeCollaboration.bonusMultiplier : 1;
                    const finalPts = Math.round(pts * bonusMultiplier);
                    if (isBonus) sound.playSuccess();
                    updateStats({ steamMastery: finalPts, resilience: Math.round(finalPts * 0.4) });
                  }}
                />
              )}

              {selectedLab === 'finance' && (
                <RealEstateFinanceLab
                  resilience={stats.resilience}
                  onMasteryEarned={(pts) => {
                    const isBonus = activeCollaboration && activeCollaboration.labFocus === 'finance';
                    const bonusMultiplier = isBonus ? activeCollaboration.bonusMultiplier : 1;
                    const finalPts = Math.round(pts * bonusMultiplier);
                    if (isBonus) sound.playSuccess();
                    updateStats({ financialAcumen: finalPts, communityLegacy: Math.round(finalPts * 0.5) });
                  }}
                />
              )}

              {selectedLab === 'community' && (
                <DetroitCommunityRehabLab
                  resilience={stats.resilience}
                  onMasteryEarned={(pts) => {
                    const isBonus = activeCollaboration && activeCollaboration.labFocus === 'community';
                    const bonusMultiplier = isBonus ? activeCollaboration.bonusMultiplier : 1;
                    const finalPts = Math.round(pts * bonusMultiplier);
                    if (isBonus) sound.playSuccess();
                    updateStats({ communityLegacy: finalPts, resilience: Math.round(finalPts * 0.4) });
                  }}
                />
              )}

              {selectedLab === 'regional_world' && (
                <RegionalWorldLearningView
                  playerName={profile.name}
                  onRewardEarned={(statDelta, cashBonus) => {
                    sound.playSuccess();
                    updateStats({
                      ...statDelta,
                      earningsBalance: cashBonus,
                    });
                  }}
                />
              )}
            </div>
          </div>
        )}

        {activeTab === 'workbook' && <WorkbookSection />}

        {activeTab === 'codex' && <GlossarySection />}
      </main>

      {/* Parental Controls & Registration Modal */}
      <ParentControlsModal
        isOpen={isParentModalOpen}
        onClose={() => setIsParentModalOpen(false)}
        profile={profile}
        onUpdateProfile={handleUpdateProfile}
        controls={controls}
        onUpdateControls={handleUpdateControls}
        playerStats={stats}
        classmateStatus={classmateStatus}
      />

      {/* Biometrics Face Verification Modal */}
      <BiometricScannerModal
        isOpen={isBiometricModalOpen}
        onClose={() => setIsBiometricModalOpen(false)}
        userName={profile.name}
        userAge={profile.age}
        onVerificationComplete={() => {
          handleUpdateProfile({
            ...profile,
            isBiometricallyVerified: true,
          });
          updateStats({ resilience: 10, steamMastery: 10 });
        }}
      />

      {/* AI Mentor Chat Modal */}
      <MentorChatModal
        isOpen={isMentorModalOpen}
        onClose={() => setIsMentorModalOpen(false)}
        currentStoryStep={mentorChapterStep}
        allSteps={STORY_STEPS}
        profile={profile}
        playerStats={stats}
      />

      {/* Official Course Sale & 101 Levels Unlock Modal */}
      <CourseSaleModal
        isOpen={isCourseSaleModalOpen}
        onClose={() => setIsCourseSaleModalOpen(false)}
        profile={profile}
        onUpdateProfile={handleUpdateProfile}
        playerStats={stats}
        onUpdateStats={updateStats}
        onNavigateToMetaverse={() => {
          setIsCourseSaleModalOpen(false);
          setActiveTab('metaverse');
        }}
      />

      {/* S-T-E-A-R Picture-in-Picture (PIP) Floating Sentinel */}
      <STEARPipOverlay
        activeRide={activeRide}
        activeDelivery={activeDelivery}
        upcomingAppointments={calendarAppointments}
        notifications={pipNotifications}
        onMarkNotificationRead={handleMarkNotificationRead}
        onClearAllNotifications={handleClearAllNotifications}
        onOpenStearHub={(tab) => {
          setActiveTab('stear');
          if (tab) setStearInitialTab(tab);
        }}
        onNavigateToTab={(tab) => {
          sound.playClick();
          setActiveTab(tab as any);
        }}
        onCompleteRide={handleCompleteRide}
        onCompleteDelivery={handleCompleteDelivery}
        isOpen={isPipOpen}
        onToggleOpen={() => setIsPipOpen(!isPipOpen)}
      />

      {/* Global Reflect on Growth Modal */}
      <ReflectOnGrowthModal
        isOpen={isReflectOnGrowthModalOpen}
        onClose={() => setIsReflectOnGrowthModalOpen(false)}
        onApplyBoost={(boost) => {
          updateStats({ resilience: boost });
        }}
        currentResilience={stats.resilience}
        onOpenShareModal={() => setIsShareModalOpen(true)}
      />

      {/* Social Media Sharing & Stats Snapshot Generator Modal */}
      <SocialStatsShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        stats={stats}
        profile={profile}
        streak={resilienceStreak}
        onRewardPlayer={(reward) => updateStats(reward)}
      />

      {/* Global Client Service Election Modal (Taxes, Deals, One Stop 501c3) */}
      <ClientServiceElectionModal
        isOpen={isServiceModalOpen}
        onClose={() => setIsServiceModalOpen(false)}
      />

      {/* Global Camera & Microphone Permission & Biometric Ready Modal */}
      <GlobalMediaPermissionModal
        isOpen={isMediaPermissionModalOpen}
        onClose={() => setIsMediaPermissionModalOpen(false)}
        studentName={profile.name}
        initialState={mediaPermissions}
        onPermissionsUpdated={(perms) => {
          setMediaPermissions(perms);
          if (perms.cameraGranted || perms.biometricReady) {
            handleUpdateProfile({
              ...profile,
              isBiometricallyVerified: true,
              biometricHash: perms.biometricHash || profile.biometricHash,
            });
          }
        }}
      />

      {/* T.E.A.R.S. Channel Splash Video Modal */}
      <TearsSplashVideoModal
        isOpen={isSplashVideoModalOpen}
        onClose={() => setIsSplashVideoModalOpen(false)}
        onRewardPlayer={() => {
          updateStats({
            earningsBalance: 150,
            resilience: 10,
            kindnessPoints: 10,
          });
        }}
      />

      {/* 7-Day Daily Mission History & Streak Consistency Modal */}
      <MissionHistoryModal
        isOpen={isMissionHistoryOpen}
        onClose={() => setIsMissionHistoryOpen(false)}
        history={missionHistory}
        streak={resilienceStreak}
        currentMission={dailyMission}
        onNavigateToTab={(tab) => {
          setActiveTab(tab as any);
        }}
        onCompleteMission={handleCompleteDailyMission}
        onShareStreak={() => {
          setIsMissionHistoryOpen(false);
          setIsShareModalOpen(true);
        }}
      />

      {/* Beginning Download & Anytime Native Language, Voice Guide & Level-Up Avatar Studio Modal */}
      <LanguageVoiceAvatarModal
        isOpen={isLanguageAvatarModalOpen}
        onClose={() => setIsLanguageAvatarModalOpen(false)}
        prefs={userPrefs}
        onUpdatePrefs={handleUpdateUserPrefs}
        currentLevel={profile.characterLevel}
        onCompleteLevelAndUnlockReward={handleCompleteLevelAndUnlockReward}
        recentUnlockBanner={recentUnlockBanner}
      />

      {/* Clean Footer adhering to Section 1.B */}
      <footer className="border-t border-slate-900 bg-slate-950 mt-12 py-6 px-6 text-xs text-slate-500 text-center">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-slate-400">
            Dedicated to the inspiring life and educational work of <strong className="text-slate-200">Jeanell Land</strong> · Detroit, Michigan.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 text-slate-400">
            <a
              href="https://onestoprehabilitationcenters.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
            >
              onestoprehabilitationcenters.org
            </a>
            <span aria-hidden="true">·</span>
            <a
              href="mailto:jland@onestoprehabilitationcenters.org"
              className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
            >
              jland@onestoprehabilitationcenters.org
            </a>
            <span aria-hidden="true">·</span>
            <span>T.E.A.R.S. Channel 100.1 FM</span>
            <span aria-hidden="true">·</span>
            <span>(313) 510-3610</span>
          </div>
        </div>
      </footer>
      <OfflineIndicator />
    </div>
  );
}
