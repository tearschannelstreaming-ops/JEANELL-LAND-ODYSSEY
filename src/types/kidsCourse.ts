export type GuardianRole = 'teacher' | 'administrator' | 'parent' | 'guardian';

export type KidsVideoCategory =
  | 'anti_bullying'
  | 'academic_achievement'
  | 'upcoming_theater_movies'
  | 'steam_toys_creative';

export interface KidsVideoItem {
  id: string;
  category: KidsVideoCategory;
  title: string;
  subtitle: string;
  durationSeconds: number;
  minAcademicLevel: number; // 1 to 5
  ratingBadge: 'G - All Ages' | 'PG - Family' | 'COPPA Safe' | 'Educator Verified';
  sponsorLabel: string;
  description: string;
  animatedSceneType: 'space_rocket' | 'classroom_upstander' | 'robot_lab' | 'theater_trailer' | 'toy_unboxing' | 'detroit_skyline';
  sceneNarrative: string[];
  moralOrLearningTakeaway: string;
  reflectionQuestion: {
    prompt: string;
    options: {
      id: string;
      text: string;
      isCorrect: boolean;
    }[];
  };
  reward: {
    academicStars: number;
    smartCash: number;
    resilienceBoost: number;
  };
  // Metadata for movies / toys
  releaseOrAgeInfo?: string;
  featuredProductOrTitle?: string;
}

export interface AbcLetterItem {
  letter: string;
  phoneticSound: string;
  word: string;
  tagline: string;
  category: 'Aeronautics' | 'Biometrics' | 'Compassion' | 'Innovation' | 'Earth Science' | 'Community';
  funFact: string;
  speechText: string;
  challenge: {
    question: string;
    options: {
      id: string;
      text: string;
      isCorrect: boolean;
      explanation: string;
    }[];
  };
  accentColor: string;
}

export interface RegisteredStudent {
  id: string;
  fullName: string;
  generationalSuffix?: string; // e.g. 'None' | 'Jr.' | 'Sr.' | 'II' | 'III' | 'IV' | 'V'
  age: number; // 4.5 up to 90+ years old
  gradeLevel: string; // 'Pre-K (Age 4.5)' | 'Kindergarten' | '1st-5th Grade' | '6th-8th Grade' | '9th-12th Grade' | 'Adult / Senior High School Completion (Never Give Up)';
  schoolOrDistrict: string;
  registeredByRole: GuardianRole;
  guardianName: string;
  guardianEmail: string;
  registeredDate: string;
  enrollmentPlan: 'free_open_world' | 'certified_institutional_pass' | 'charter_school_grant_funded';
  currentAcademicLevel: number; // 1 to 5
  earnedStars: number;
  completedLetters: string[];
  watchedVideoIds: string[];
  isCertifiedEnrolled: boolean;
  notes?: string;
  // Adult & Senior Student Verification Gates
  isAdultStudent?: boolean;
  governmentIdType?: 'Michigan Real ID Driver License' | 'Michigan State ID' | 'US Passport' | 'Military ID';
  governmentIdNumber?: string;
  isBiometricallyVerifiedFace?: boolean;
  facialRecognitionHash?: string;
  // Night School & Laptop Grant Provisioning
  isNightSchoolEnrolled?: boolean;
  grantLaptopAssigned?: boolean;
  grantLaptopStatus?: 'Eligible' | 'Provisioned' | 'Shipped' | 'Delivered';
  grantLaptopModel?: string;
  isSeniorLifelongLearner?: boolean; // For 70-90+ years old self-paced high school completion
}

export interface AcademicAchievementTier {
  level: number;
  title: string;
  badge: string;
  minStars: number;
  unlockedPerk: string;
  motivationalQuote: string;
  color: string;
}

export interface HomeschoolPackageConfig {
  studentName: string;
  gradeLevel: string;
  curriculumModel: 'steam_wealth_custom' | 'public_school_aligned';
  schoolDistrictAlignment: string; // e.g. 'Detroit Public Schools Community District (DPSCD)'
  weeklyHoursTarget: number;
  coreSubjects: string[];
  specializedTracks: {
    realEstate: boolean;
    insurance: boolean;
    financeAndBanking: boolean;
    financialMath: boolean;
    businessDevelopment: boolean;
  };
  sharedTimePublicSchoolElectives: boolean; // Michigan MCL 388.1766b shared time
  portfolioRecordKeeping: boolean;
}

export interface CteCareerPathway {
  id: string;
  name: string;
  cipCode: string; // Federal Classification of Instructional Programs code
  specialization: 'Real Estate' | 'Insurance' | 'Finance' | 'Mathematics' | 'Business Development';
  description: string;
  industryCertifications: string[];
  keyCourses: string[];
}

export interface VirtualCharterSchoolBlueprint {
  schoolName: string;
  missionStatement: string;
  statutoryBasis: string;
  authorizerOptions: {
    name: string;
    type: 'Public University' | 'Community College' | 'Intermediate School District';
    location: string;
  }[];
  gradeSpan: 'K-8' | '9-12' | 'K-12' | '6-12';
  statePerPupilFunding: number; // e.g., $9,608
  projectedInitialEnrollment: number;
  pathways: CteCareerPathway[];
  legalMilestones: {
    step: number;
    title: string;
    legalStatute: string;
    description: string;
    status: 'Ready' | 'In Progress' | 'Required for Charter';
  }[];
}
