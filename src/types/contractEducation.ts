import { PlayerStats } from './game';

export type ContractCourseCode =
  | '100'
  | '101'
  | '102'
  | '103'
  | '200'
  | '201'
  | '202'
  | '203'
  | '300'
  | '310'
  | '400'
  | '410'
  | '420'
  | '430'
  | '440';

export type ContractAcademicTier =
  | 'elementary_manuscript' // 2nd to 5th Grade (100-103)
  | 'middle_binding'        // Middle to Early High School (200-203)
  | 'graduate_deeds_nonprofit' // High School to Graduate / Professional (300-310)
  | 'later_learning_jurisprudence'; // Later Learning: Consumer Law, Constitutional Law, CFPB Rules, Business Law & Contract Law (400-440)

export interface ContractClause {
  id: string;
  sectionNumber: string;
  title: string;
  content: string;
  plainEnglishExplanation: string;
  isFinePrintTrap?: boolean;
  trapWarning?: string;
  negotiationRemedy?: string;
}

export interface NotaryVerificationData {
  state: string;
  county: string;
  juratOrAcknowledgment: 'Acknowledgment' | 'Jurat';
  signatoryIdentifiedBy: 'Michigan Real ID Driver License' | 'US Passport' | 'Military ID' | 'Personal Knowledge';
  notaryPublicName: string;
  commissionExpirationDate: string;
  actingInCounty: string;
  notarySealText: string;
}

export interface LegalDocumentTemplate {
  documentId: string;
  documentType:
    | 'manuscript_signature_card'
    | 'binding_contract'
    | 'notarized_agreement'
    | 'real_estate_deed'
    | 'registered_agent_agreement'
    | 'form_1023_ez_nonprofit'
    | 'form_1023_standard_nonprofit'
    | 'form_990_annual_return'
    | 'consumer_debt_validation_notice'
    | 'constitutional_due_process_petition'
    | 'cfpb_regulation_f_complaint'
    | 'llc_operating_agreement_business_law'
    | 'advanced_contract_unconscionability_defense';
  title: string;
  subtitle: string;
  governingLaw: string;
  parties: {
    partyA: string;
    partyB: string;
    roleA: string;
    roleB: string;
  };
  clauses: ContractClause[];
  notaryRequired: boolean;
  notaryData?: NotaryVerificationData;
  officialFilingAuthority: string; // e.g. 'State of Michigan LARA' | 'Wayne County Register of Deeds' | 'Internal Revenue Service (IRS)'
}

export interface ContractCourse {
  code: ContractCourseCode;
  title: string;
  subtitle: string;
  tier: ContractAcademicTier;
  gradeLevelBadge: string; // e.g. '2nd Grade Prerequisite', 'Elementary 4th-5th', 'Middle School', 'High School', 'Graduate / Professional'
  prerequisite: string;
  statutoryBasis: string;
  overview: string;
  keyCompetencies: string[];
  manuscriptGuide?: {
    focusSkill: string;
    strokeInstructions: string[];
    sampleLetterGroup: string[];
    signaturePhilosophy: string;
  };
  sampleDocument: LegalDocumentTemplate;
  interactiveChallenge: {
    prompt: string;
    options: {
      id: string;
      text: string;
      isCorrect: boolean;
      explanation: string;
    }[];
  };
  reward: {
    statDelta: Partial<PlayerStats>;
    legalStars: number;
    cashHonorarium?: number;
  };
}

export interface ContractGraduateCredential {
  studentName: string;
  completionDate: string;
  credentialId: string;
  title: string;
  seriesCompleted: string;
  institution: string;
  signatory: string;
  signatoryTitle: string;
  verificationHash: string;
  honorsTitle: string;
}
