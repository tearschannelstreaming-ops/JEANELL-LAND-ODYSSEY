export type AgeBracket = 'junior' | 'teen' | 'adult'; // junior: 8-11, teen: 12-16, adult: 17+

export type ClassmateId = 'marcus' | 'kendra' | 'david';
export type RelationshipState = 'ally' | 'bullied' | 'neutral';
export type ClassmateStatusMap = Record<ClassmateId, RelationshipState>;

export interface ClassmateRelationship {
  status: RelationshipState;
  notes: string;
}

export interface PlayerStats {
  resilience: number;      // 0 - 100 (Dynamic Resilience Meter)
  redemptionPoints: number;// 0 - 100+ (Goldie's Reckoning & Sovereign Rebirth Score)
  steamMastery: number;    // 0 - 100
  financialAcumen: number; // 0 - 100
  communityLegacy: number; // 0 - 100
  coolPoints: number;      // Temporary high school clout
  kindnessPoints: number;  // Enduring social connection & empathy score
  earningsBalance: number; // Cash balance from commissions and employment contracts
}

export interface StudentProfile {
  name: string;
  age: number;
  ageBracket: AgeBracket;
  grade: string;
  parentName: string;
  parentEmail: string;
  registeredAt: string;
  isBiometricallyVerified: boolean;
  isPremiumMember: boolean;
  isCoursePurchased?: boolean;
  unlockedLevelsCount?: number; // 2 in demo mode (Detroit levels 1 & 2), 101 when course purchased!
  currentLevelNumber?: number; // 1 to 101
  courseCertificateIssuedAt?: string;
  characterTitle: string;
  characterLevel: number;
  inventory: string[];        // IDs of purchased shop items
  ownedPropertyIds: string[]; // MLS property IDs purchased
  unlockedResourceIds: string[]; // IDs of resources unlocked by correct decisions
  resumeText?: string;
  resumeFileName?: string;
  generationalSuffix?: string; // Jr., Sr., I, II, III, IV, V, None
  isNightSchool?: boolean; // 100% Virtual Night School (Ages 4.5 to 90+)
  biometricHash?: string; // BIO-SHA256 face verification hash for anti-namesake protection
  governmentIdNumber?: string; // Proctored ID for high school diploma conferral
  grantLaptopStatus?: string; // State Cyber Charter School grant laptop status
}

export interface UnlockedResource {
  id: string;
  title: string;
  agencyOrOrg: string;
  url: string;
  phone?: string;
  category: 'Education & Grants' | 'Housing & Mortgages' | 'Government & Taxes' | 'Emergency & Health' | 'Business & Credit' | 'Faith & Mentorship' | 'Banking & Wealth';
  whyItMatters: string;
  actionText: string;
}

export interface CharacterReflection {
  archetype: string;
  isPositive: boolean;
  moralInsight: string;
  tangibleConsequence: string;
  teachableLesson: string;
  redemptionOpportunity?: string;
}

export interface ShopItem {
  id: string;
  name: string;
  category: 'Professional Attire' | 'Engineering Equipment' | 'Study Materials' | 'Community Aid';
  price: number;
  description: string;
  perkDescription: string;
  statBonus: Partial<PlayerStats>;
}

export interface MLSProperty {
  id: string;
  mlsNumber: string;
  title: string;
  address: string;
  city: string;
  state: string;
  price: number;
  units: number;
  beds: number;
  baths: number;
  sqft: number;
  grossMonthlyRent: number;
  capRate: number;
  propertyTaxAnnual: number;
  insuranceAnnual: number;
  description: string;
  isPurchased?: boolean;
}

export interface ZoomInterviewQuestion {
  id: string;
  question: string;
  options: {
    id: string;
    text: string;
    professionalismDelta: number;
    technicalDelta: number;
    interviewerReaction: string;
  }[];
}

export interface ZoomInterviewScenario {
  id: string;
  companyName: string;
  jobTitle: string;
  interviewerName: string;
  interviewerTitle: string;
  requiredGrit: number;
  salary: string;
  signingBonus: number;
  questions: ZoomInterviewQuestion[];
}

export interface TEARSMediaProgram {
  id: string;
  title: string;
  host: string;
  duration: string;
  category: 'Community News' | 'Real Estate Masterclass' | 'Financial Freedom' | 'Youth S.T.E.A.M.';
  description: string;
  broadcastTopic: string;
}

export interface VerifiedCredential {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  category: 'License' | 'Degree' | 'Certification' | 'Trade Award' | 'Notary';
  verificationHash: string;
  status: 'verified' | 'pending' | 'reviewing';
  statBonuses: Partial<PlayerStats>;
}

export interface VocationalTradeTest {
  id: string;
  title: string;
  trade: 'plumbing' | 'electrical' | 'avionics' | 'real_estate' | 'ai_training' | 'insurance' | 'project_management' | 'notary_public' | 'cdl_transportation';
  employerName: string;
  startingSalary: string;
  commissionRate: string;
  passingScorePercent: number; // 80%
  description: string;
}

export interface MarketplaceAd {
  id: string;
  ownerName: string;
  businessTitle: string;
  serviceCategory: string;
  contactEmail: string;
  phone: string;
  description: string;
  isFeatured: boolean;
  postedAt: string;
}

export interface AdultDilemmaNode {
  id: string;
  category: 'domestic_violence' | 'marriage_partnership' | 'addiction_gambling' | 'faith_resilience' | 'relationships' | 'wealth_protection';
  title: string;
  situation: string;
  counselorGuidance: string;
  options: {
    id: string;
    text: string;
    moralResilienceOutcome: string;
    resilienceDelta: number;
    financialDelta: number;
    safetyRating: 'safe' | 'dangerous' | 'compromise';
    isCorrect: boolean;
    unlockedResources?: UnlockedResource[];
    characterReflection?: CharacterReflection;
  }[];
}

export interface ParentalControls {
  enabled: boolean;
  pin: string;
  dailyTimeLimitMinutes: number;
  timeSpentTodayMinutes: number;
  soundEnabled: boolean;
  ageFilterEnforced: boolean;
}

export interface DecisionChoice {
  id: string;
  label: string;
  description: string;
  statImpact: Partial<PlayerStats>;
  historicalOutcome: string;
  nextStepId?: string;
  triggerLab?: 'aero' | 'propulsion' | 'finance' | 'community' | 'trades' | 'adult';
  minResilienceRequired?: number;
  coolPointsGain?: number;
  kindnessGain?: number;
  isCorrect?: boolean;
  unlockedResources?: UnlockedResource[];
  characterReflection?: CharacterReflection;
  affectsClassmate?: {
    characterId: ClassmateId;
    newStatus: RelationshipState;
  };
  requiresAlly?: ClassmateId;
  blockedIfBullied?: ClassmateId;
}

export interface StoryStep {
  id: string;
  actNumber: number;
  actTitle: string;
  yearRange: string;
  sceneTitle: string;
  location: string;
  summary: string;
  juniorSummary?: string;
  historicalContext: string;
  challengeQuote: string;
  choices: DecisionChoice[];
}

export interface GlossaryItem {
  id: string;
  term: string;
  letter: string;
  category: 'Aeronautics & STEM' | 'Real Estate & Housing' | 'Banking & Wealth' | 'Taxes & Legal' | 'Community & Nonprofit';
  definition: string;
  juniorDefinition?: string;
  applicationInGame: string;
  authorNote?: string;
}

export interface AmericanLevel {
  levelNumber: number; // 1 to 101
  stateCode: string;   // e.g. 'MI', 'AL', 'AK', 'DC'
  stateName: string;   // e.g. 'Michigan', 'Alabama'
  city: string;        // e.g. 'Detroit', 'Huntsville'
  landmark: string;    // e.g. 'Coleman A. Young International Airport'
  locationDescription: string;
  category: 'Aeronautical & Space' | 'Community Development' | 'Real Estate & MLS' | 'Media & Broadcasting' | 'Vocational Trades' | 'Financial & Commerce';
  coordinates: { x: number; y: number }; // Percentage coords on US Map
  tileType: 'property' | 'railroad' | 'utility' | 'chance' | 'community' | 'payday' | 'crossroads' | 'milestone';
  monopolyDeed?: {
    colorGroup: string;
    purchaseCost: number;
    baseRent: number;
    houseRent: number[];
    mortgageValue: number;
  };
  lifeEvent?: {
    careerTrack: 'aero_engineer' | 'trade_master' | 'realty_mogul' | 'community_founder';
    milestoneName: string;
    salaryBonus: number;
    familyPegReward?: string;
  };
  challenge: {
    title: string;
    scenario: string;
    options: {
      id: string;
      label: string;
      isCorrect: boolean;
      consequence: string;
      reflection: CharacterReflection;
      unlockedResource?: UnlockedResource;
      statBonus: Partial<PlayerStats>;
    }[];
  };
}

export interface CourseLesson {
  id: string;
  title: string;
  durationMinutes: number;
  lectureSummary: string;
  scenerySetting: string;
  keyFormulasOrLaws: string[];
  patentInsight: string;
}

export interface CourseModule {
  id: string;
  moduleNumber: number;
  title: string;
  subtitle: string;
  pillar: 'Aeronautical Engineering' | 'Community Development' | 'Real Estate & MLS' | 'Media & Broadcasting' | 'Vocational Trades' | 'Generational Wealth';
  iconName: string;
  summary: string;
  lessons: CourseLesson[];
  interactiveChallenge: {
    id: string;
    prompt: string;
    options: {
      id: string;
      text: string;
      isCorrect: boolean;
      feedback: string;
      reflection: CharacterReflection;
      statDelta: Partial<PlayerStats>;
      unlockedResource?: UnlockedResource;
    }[];
  };
  fieldTripScenery: {
    locationName: string;
    cityState: string;
    interactiveTask: string;
    historicalConnection: string;
  };
}

// ==========================================
// Goldie's Reckoning Narrative Types
// ==========================================
export interface GoldieReckoningOption {
  id: string;
  persona: 'goldie_impulse' | 'jeanell_redemption';
  title: string;
  actionText: string;
  rationale: string;
  riskLevel: 'Extreme' | 'High' | 'Moderate' | 'Calculated';
  statDelta: Partial<PlayerStats>;
  redemptionDelta: number;
  cashDelta?: number;
  moralInsight: string;
  tangibleConsequence: string;
  audioVoiceover?: string;
  unlockedResource?: UnlockedResource;
}

export interface GoldieReckoningNode {
  id: string;
  ageOrYear: string;
  title: string;
  crucibleCategory:
    | 'Teen Motherhood'
    | 'Fast Money & Gambling'
    | 'Detroit Cab Driver'
    | 'Felonious Assault'
    | 'Lost Loved Ones'
    | 'Controlling Sugar Daddies'
    | 'Gunshot at 33'
    | '26-Day False Arrest'
    | 'One Stop Rebirth';
  dilemmaSummary: string;
  streetContext: string;
  systemicTrap: string;
  options: GoldieReckoningOption[];
  historicalLesson: string;
}

// ==========================================
// Stock Market, Saving & Phase Two Trading Types
// ==========================================
export interface MarketStock {
  symbol: string;
  companyName: string;
  sector: 'Aerospace & Defense' | 'Green Mobility' | 'Urban Real Estate REIT' | 'Clean Tech' | 'Semiconductors';
  currentPrice: number;
  dailyChangePercent: number;
  history: number[]; // Last 7 prices
  description: string;
  volatility: 'Low' | 'Medium' | 'High';
  fundamentals: {
    peRatio: number;
    dividendYield: number;
    quarterlyGrowth: string;
  };
}

export interface PlayerPortfolioHolding {
  symbol: string;
  shares: number;
  avgBuyPrice: number;
}

export interface StockPredictionRound {
  id: string;
  stockSymbol: string;
  headlineNews: string;
  marketClue: string;
  actualTrend: 'bullish' | 'bearish';
  payoutMultiplier: number;
  explanation: string;
}

// ==========================================
// Justice Hub & Legal Defense Types
// ==========================================
export interface JusticeResource {
  id: string;
  category:
    | 'Family Reunification & Civil Advocacy'
    | 'Internal Affairs & Oversight'
    | 'Legal Aid & Public Defenders'
    | 'Bar Associations & Wrongful Conviction'
    | 'Police Precincts & Civilian Liaisons'
    | 'Whistleblower Portals'
    | 'Crisis & Suicide Hotlines'
    | 'Domestic Violence Shelters'
    | 'Crime Reporting & Anonymous Tips'
    | 'Appeals Courts & Expungement';
  title: string;
  agencyOrOrg: string;
  jurisdictionOrArea: string; // e.g., 'Detroit / Wayne County' or 'National (USA)'
  phone?: string;
  url: string;
  description: string;
  howToAccess: string;
  isEmergency?: boolean;
}

export interface LegalSimulationStep {
  id: string;
  mode: 'document' | 'upload' | 'file' | 'advocate';
  title: string;
  scenario: string;
  instructions: string;
  taskPrompt: string;
  correctAction: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  practicalTakeaway: string;
}

// ==========================================
// Law Library & Case Study Template Types
// ==========================================
export interface LawLibraryTerm {
  id: string;
  term: string;
  category: 'Aeronautical & Aerospace' | 'Community & Municipal' | 'Constitutional & Criminal Defense' | 'Civil Rights & Torts';
  pronunciation?: string;
  plainEnglishDefinition: string;
  formalLegalDefinition: string;
  statutoryOrRegulatoryCitation: string;
  realWorldApplication: string;
  exampleScenario: string;
}

export interface CaseStudyTemplate {
  id: string;
  title: string;
  disputeType: 'aeronautical' | 'community' | 'civil_rights';
  categoryLabel: string;
  jurisdiction: string;
  captionHeader: {
    court: string;
    plaintiffOrPetitioner: string;
    defendantOrRespondent: string;
    caseOrDocketNumber: string;
    documentTitle: string;
  };
  summary: string;
  coreLegalIssues: string[];
  governingLaw: string[];
  templatePleadingText: string;
  practicalFilingGuidance: string;
}

