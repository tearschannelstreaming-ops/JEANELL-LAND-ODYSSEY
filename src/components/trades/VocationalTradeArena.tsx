import React, { useState } from 'react';
import { VocationalTradeTest, PlayerStats, StudentProfile } from '../../types/game';
import { sound } from '../../utils/audio';
import {
  Wrench,
  Zap,
  Briefcase,
  CheckCircle2,
  AlertCircle,
  FileText,
  DollarSign,
  Award,
  RotateCcw,
  Sparkles,
  ChevronRight,
  TrendingUp,
  Search,
  Upload,
  Users,
  Trophy,
  FileCheck,
  ShieldAlert,
  Bot,
  ShieldCheck,
  Home,
  FolderKanban,
  Stamp,
  Truck,
  FileBadge,
} from 'lucide-react';

export type VocationalTradeKey =
  | 'plumbing'
  | 'electrical'
  | 'avionics'
  | 'ai_training'
  | 'insurance'
  | 'real_estate'
  | 'project_management'
  | 'notary_public'
  | 'cdl_transportation';

interface VocationalTradeArenaProps {
  playerStats: PlayerStats;
  onUpdateStats: (delta: Partial<PlayerStats>) => void;
  profile: StudentProfile;
  onUpdateProfile?: (profile: StudentProfile) => void;
}

interface CompetitorCandidate {
  id: string;
  name: string;
  headline: string;
  trade: VocationalTradeKey;
  score: number;
  status: 'hired' | 'failed' | 'in_review';
  grit: number;
}

export const VocationalTradeArena: React.FC<VocationalTradeArenaProps> = ({
  playerStats,
  onUpdateStats,
  profile,
  onUpdateProfile,
}) => {
  const [selectedTrade, setSelectedTrade] = useState<VocationalTradeKey>('plumbing');
  const [activeTab, setActiveTab] = useState<'board' | 'resume' | 'test' | 'competition' | 'contract'>('board');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Resume State
  const [resumeHeadline, setResumeHeadline] = useState<string>(
    `${profile.name} · S.T.E.A.M. & Technical Trades Specialist`
  );
  const [resumeBio, setResumeBio] = useState<string>(
    'Motivated apprentice certified in precision systems, diagnostics, AI prompts, insurance compliance, and commercial logistics. Committed to highest safety and ethical standards.'
  );
  const [resumeUploadedFileName, setResumeUploadedFileName] = useState<string>(
    profile.resumeFileName || 'Resume_Certified_Apprentice.pdf'
  );
  const [resumeSkills, setResumeSkills] = useState<string[]>([
    'Hydraulic P-Trap Assembly',
    'GFCI Circuit Placement',
    'AI Prompt Engineering & RAG',
    'DIFS Insurance Compliance',
    'Real Estate Title & MLS Analysis',
    'PMP WBS & Critical Path',
    'Michigan Notary Jurats & Oaths',
    'CDL Class A Air Brake Inspection',
  ]);
  const [newSkillInput, setNewSkillInput] = useState<string>('');
  const [isResumeSaved, setIsResumeSaved] = useState<boolean>(true);

  // Trade 1: Plumbing Assembly State
  const plumbingParts = [
    { id: 'tailpiece', name: '1. Tailpiece Pipe from Sink Basin', correctStep: 1 },
    { id: 'ptrap', name: '2. P-Trap Water Seal Curve', correctStep: 2 },
    { id: 'slipnut', name: '3. Slip Nut & Rubber Gasket Washer', correctStep: 3 },
    { id: 'drainarm', name: '4. Wall Drain Extension Arm', correctStep: 4 },
    { id: 'shutoff', name: '5. Dual Water Shutoff Valves & Flex Line', correctStep: 5 },
  ];
  const [assembledPlumbing, setAssembledPlumbing] = useState<string[]>([]);
  const [plumbingLeakDiag, setPlumbingLeakDiag] = useState<string>('');
  const [plumbingScore, setPlumbingScore] = useState<number | null>(null);

  // Trade 2: Electrical Placement State
  const [outletSelections, setOutletSelections] = useState<{
    kitchenSink: string;
    livingRoom: string;
    heavyAppliance: string;
    hotWireColor: string;
  }>({
    kitchenSink: '',
    livingRoom: '',
    heavyAppliance: '',
    hotWireColor: '',
  });
  const [electricalScore, setElectricalScore] = useState<number | null>(null);

  // Trade 3: Avionics State
  const [avionicsBusContinuity, setAvionicsBusContinuity] = useState<string>('');
  const [avionicsTelemetryRate, setAvionicsTelemetryRate] = useState<string>('');
  const [avionicsScore, setAvionicsScore] = useState<number | null>(null);

  // Trade 4: AI Training State
  const [aiPromptStrategy, setAiPromptStrategy] = useState<string>('');
  const [aiTemperatureChoice, setAiTemperatureChoice] = useState<string>('');
  const [aiDefenseGuardrail, setAiDefenseGuardrail] = useState<string>('');
  const [aiEvalFramework, setAiEvalFramework] = useState<string>('');
  const [aiScore, setAiScore] = useState<number | null>(null);

  // Trade 5: Insurance State
  const [insCoInsuranceClause, setInsCoInsuranceClause] = useState<string>('');
  const [insValuationMethod, setInsValuationMethod] = useState<string>('');
  const [insDifsCompliance, setInsDifsCompliance] = useState<string>('');
  const [insExclusionRider, setInsExclusionRider] = useState<string>('');
  const [insuranceScore, setInsuranceScore] = useState<number | null>(null);

  // Trade 6: Real Estate State
  const [reDeedType, setReDeedType] = useState<string>('');
  const [reTitleSearch, setReTitleSearch] = useState<string>('');
  const [reCapRateMath, setReCapRateMath] = useState<string>('');
  const [reClosingDisclosure, setReClosingDisclosure] = useState<string>('');
  const [realEstateScore, setRealEstateScore] = useState<number | null>(null);

  // Trade 7: Project Management State
  const [pmWbsMethod, setPmWbsMethod] = useState<string>('');
  const [pmCriticalPath, setPmCriticalPath] = useState<string>('');
  const [pmEvmMetric, setPmEvmMetric] = useState<string>('');
  const [pmChangeBoard, setPmChangeBoard] = useState<string>('');
  const [pmScore, setPmScore] = useState<number | null>(null);

  // Trade 8: Notary Public State
  const [notaryIdRule, setNotaryIdRule] = useState<string>('');
  const [notaryJuratVsAck, setNotaryJuratVsAck] = useState<string>('');
  const [notaryJournalProtocol, setNotaryJournalProtocol] = useState<string>('');
  const [notarySealPlacement, setNotarySealPlacement] = useState<string>('');
  const [notaryScore, setNotaryScore] = useState<number | null>(null);

  // Trade 9: CDL Class A & B State
  const [cdlAirBrakeLab, setCdlAirBrakeLab] = useState<string>('');
  const [cdlGvwrRule, setCdlGvwrRule] = useState<string>('');
  const [cdlHosLimit, setCdlHosLimit] = useState<string>('');
  const [cdlCouplingCheck, setCdlCouplingCheck] = useState<string>('');
  const [cdlScore, setCdlScore] = useState<number | null>(null);

  // Employer Contract State
  const [awardedContract, setAwardedContract] = useState<{
    employer: string;
    role: string;
    salary: string;
    commission: number;
    score: number;
    timestamp: string;
  } | null>(null);

  // Competing applicants for all 9 trades
  const initialCompetitors: CompetitorCandidate[] = [
    // Plumbing
    {
      id: 'comp_1',
      name: 'Sarah Jenkins',
      headline: 'Senior Plumbing Apprentice · Cass Tech Grad',
      trade: 'plumbing',
      score: 86,
      status: 'hired',
      grit: 68,
    },
    {
      id: 'comp_2',
      name: 'Darius Miller',
      headline: 'Journeyman Plumbing Trainee',
      trade: 'plumbing',
      score: 74,
      status: 'failed',
      grit: 52,
    },
    // Electrical
    {
      id: 'comp_3',
      name: 'Tyler Washington',
      headline: 'Residential Electrical Specialist',
      trade: 'electrical',
      score: 88,
      status: 'hired',
      grit: 72,
    },
    {
      id: 'comp_4',
      name: 'Ashley Brooks',
      headline: 'Industrial Wire Apprentice',
      trade: 'electrical',
      score: 65,
      status: 'failed',
      grit: 45,
    },
    // Avionics
    {
      id: 'comp_5',
      name: 'Marcus Vance',
      headline: 'Avionics Architect & Payload Lead',
      trade: 'avionics',
      score: 96,
      status: 'hired',
      grit: 85,
    },
    {
      id: 'comp_6',
      name: 'Elena Rostova',
      headline: 'Flight Bus Wire Specialist',
      trade: 'avionics',
      score: 72,
      status: 'failed',
      grit: 58,
    },
    // AI Training
    {
      id: 'comp_7',
      name: 'Deon Carter',
      headline: 'Lead Prompt Architect · Wayne State AI Fellow',
      trade: 'ai_training',
      score: 92,
      status: 'hired',
      grit: 80,
    },
    {
      id: 'comp_8',
      name: 'Maya Lin',
      headline: 'Junior LLM Evaluator & Prompt Tester',
      trade: 'ai_training',
      score: 71,
      status: 'failed',
      grit: 58,
    },
    // Insurance
    {
      id: 'comp_9',
      name: 'Raymond Clark',
      headline: 'Chartered Property Casualty Underwriter (CPCU)',
      trade: 'insurance',
      score: 89,
      status: 'hired',
      grit: 75,
    },
    {
      id: 'comp_10',
      name: 'Brenda Hayes',
      headline: 'Adjuster Trainee · DIFS Licensing Candidate',
      trade: 'insurance',
      score: 66,
      status: 'failed',
      grit: 48,
    },
    // Real Estate
    {
      id: 'comp_11',
      name: 'Kendra Vance',
      headline: 'Licensed Real Estate & MLS Broker Associate',
      trade: 'real_estate',
      score: 94,
      status: 'hired',
      grit: 82,
    },
    {
      id: 'comp_12',
      name: 'Carlton Davis',
      headline: 'Title Search Apprentice & Deed Examiner',
      trade: 'real_estate',
      score: 72,
      status: 'failed',
      grit: 54,
    },
    // Project Management
    {
      id: 'comp_13',
      name: 'David Washington',
      headline: 'PMP Certified Capital Infrastructure Lead',
      trade: 'project_management',
      score: 91,
      status: 'hired',
      grit: 79,
    },
    {
      id: 'comp_14',
      name: 'Samantha Reed',
      headline: 'WBS & Milestone Coordinator',
      trade: 'project_management',
      score: 68,
      status: 'failed',
      grit: 50,
    },
    // Notary Public
    {
      id: 'comp_15',
      name: 'Patricia Miller',
      headline: 'State Commissioned Notary & Certified Signing Agent',
      trade: 'notary_public',
      score: 95,
      status: 'hired',
      grit: 88,
    },
    {
      id: 'comp_16',
      name: 'Jerome King',
      headline: 'Junior Mobile Signing Apprentice',
      trade: 'notary_public',
      score: 73,
      status: 'failed',
      grit: 55,
    },
    // CDL Class A and B
    {
      id: 'comp_17',
      name: 'Alonzo Jackson',
      headline: 'Class A HazMat & Air Brake Endorsed Master Driver',
      trade: 'cdl_transportation',
      score: 93,
      status: 'hired',
      grit: 84,
    },
    {
      id: 'comp_18',
      name: 'Corey Brooks',
      headline: 'Class B Heavy Straight Vehicle Trainee',
      trade: 'cdl_transportation',
      score: 69,
      status: 'failed',
      grit: 51,
    },
  ];

  // Employer Job Board - All 9 Disciplines
  const jobListings: Array<{
    trade: VocationalTradeKey;
    role: string;
    employer: string;
    salary: string;
    commission: number;
    passingMin: number;
    description: string;
    reqSkills: string[];
    icon: any;
  }> = [
    {
      trade: 'ai_training',
      role: 'AI Training Specialist & Prompt Automation Engineer',
      employer: 'Detroit AI Systems & Innovation Labs',
      salary: '$98,000 / year',
      commission: 4800,
      passingMin: 80,
      description: 'Design robust system prompts, configure RAG context injection, calibrate model temperatures, and safeguard enterprise workflows against prompt injections.',
      reqSkills: ['Prompt Architecture', 'RAG Guardrails', 'AI Ethics & Hallucination Mitigation'],
      icon: Bot,
    },
    {
      trade: 'insurance',
      role: 'Licensed Risk Underwriter & DIFS Compliance Specialist',
      employer: 'Great Lakes DIFS Assurance & Underwriting Group',
      salary: '$82,000 / year',
      commission: 3900,
      passingMin: 80,
      description: 'Underwrite commercial liability, audit co-insurance 80% clauses, calculate Replacement Cost vs ACV depreciation, and ensure DIFS regulatory compliance.',
      reqSkills: ['DIFS Compliance', 'Co-Insurance Audit', 'Replacement Cost Valuation'],
      icon: ShieldCheck,
    },
    {
      trade: 'real_estate',
      role: 'Real Estate & MLS Acquisition Manager',
      employer: 'All Your Needs Reality LLC · Jeanell Land, Broker/Principal',
      salary: '$88,000 / year',
      commission: 4200,
      passingMin: 80,
      description: 'Under the direction of Jeanell Land, Broker/Principal (License #6504432062), analyze Nationwide MLS listings, audit title chains for encumbrances, execute General Warranty Deed settlements, and calculate Net Operating Income Cap Rates.',
      reqSkills: ['Warranty Deed Execution', 'Title Search Encumbrance', 'Cap Rate Underwriting'],
      icon: Home,
    },
    {
      trade: 'project_management',
      role: 'Project Management Professional (PMP) Infrastructure Lead',
      employer: 'PMP Capital Project & Infrastructure Bureau',
      salary: '$94,000 / year',
      commission: 4600,
      passingMin: 80,
      description: 'Decompose 100% WBS scope packages, identify zero-slack Critical Path sequences, track Earned Value Management (CPI/SPI), and lead change control boards.',
      reqSkills: ['WBS Decomposition', 'Critical Path Method', 'Earned Value Management'],
      icon: FolderKanban,
    },
    {
      trade: 'notary_public',
      role: 'Commissioned Notary Public & Mobile Loan Signing Officer',
      employer: 'Michigan Notary Public & Certified Signing Bureau',
      salary: '$64,000 / year',
      commission: 3100,
      passingMin: 80,
      description: 'Administer lawful oaths for Jurats, authenticate government IDs, execute acknowledgment certificates, maintain chronological journals, and avoid unauthorized practice of law.',
      reqSkills: ['Satisfactory Identification', 'Jurat vs Acknowledgment', 'Journal Record Protocol'],
      icon: Stamp,
    },
    {
      trade: 'cdl_transportation',
      role: 'CDL Class A & Class B Commercial Fleet Transportation Specialist',
      employer: 'Great Lakes Intermodal Freight & Transit Logistics',
      salary: '$78,500 / year',
      commission: 3600,
      passingMin: 80,
      description: 'Execute mandatory 7-step pre-trip inspections, conduct air brake LAB tests (Leaks, Alarm, Button), maintain FMCSA Hours-of-Service ELD logs, and couple fifth wheels.',
      reqSkills: ['Air Brake LAB Inspection', 'Class A GVWR Standards', 'FMCSA Hours of Service'],
      icon: Truck,
    },
    {
      trade: 'plumbing',
      role: 'Master Plumbing Systems Specialist',
      employer: 'Detroit Municipal Infrastructure & Housing',
      salary: '$68,500 / year',
      commission: 2800,
      passingMin: 80,
      description: 'Troubleshoot complex drainage, assemble P-trap seals, and clear pipeline pressure blocks in Detroit multi-family homes.',
      reqSkills: ['P-Trap Assembly', 'Leak Diagnosis', 'Code Compliance'],
      icon: Wrench,
    },
    {
      trade: 'electrical',
      role: 'Certified Residential & Industrial Electrician',
      employer: 'Great Lakes Clean Energy Solutions',
      salary: '$74,000 / year',
      commission: 3400,
      passingMin: 80,
      description: 'Wire GFCI water-safety zones, calculate 15A/20A load ratings, and eliminate ground fault fire risks.',
      reqSkills: ['GFCI Wiring', 'Load Calculations', 'Color Standards'],
      icon: Zap,
    },
    {
      trade: 'avionics',
      role: 'Aerospace Telemetry & Avionics Harness Tech',
      employer: 'Midwest Aero Dynamics & Flight Systems',
      salary: '$92,000 / year',
      commission: 4500,
      passingMin: 80,
      description: 'Calibrate high-frequency sensor buses and certify zero-short circuit continuity for suborbital payloads.',
      reqSkills: ['Telemetry Calibration', 'Avionics Harness', 'Sensor Grounding'],
      icon: Sparkles,
    },
  ];

  const filteredJobs = jobListings.filter((j) => {
    const matchesSearch =
      j.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.employer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.trade.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = categoryFilter === 'all' || j.trade === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const currentJob = jobListings.find((j) => j.trade === selectedTrade) || jobListings[0];

  // Evaluate Plumbing Test
  const handleEvaluatePlumbing = () => {
    sound.playClick();
    let score = 0;

    // Check assembly order (50 pts)
    const expected = ['tailpiece', 'ptrap', 'slipnut', 'drainarm', 'shutoff'];
    let correctCount = 0;
    expected.forEach((item, idx) => {
      if (assembledPlumbing[idx] === item) correctCount++;
    });
    score += (correctCount / expected.length) * 50;

    // Check leak diagnostic (50 pts)
    if (plumbingLeakDiag === 'gasket_aerator') {
      score += 50;
    } else if (plumbingLeakDiag === 'overtighten') {
      score += 15;
    }

    const finalScore = Math.round(score);
    setPlumbingScore(finalScore);

    if (finalScore >= 80) {
      sound.playSuccess();
      const contract = {
        employer: currentJob.employer,
        role: currentJob.role,
        salary: currentJob.salary,
        commission: currentJob.commission,
        score: finalScore,
        timestamp: new Date().toLocaleTimeString(),
      };
      setAwardedContract(contract);
      onUpdateStats({
        steamMastery: 20,
        financialAcumen: 20,
        earningsBalance: currentJob.commission,
      });
    } else {
      sound.playAlert();
    }
  };

  // Evaluate Electrical Test
  const handleEvaluateElectrical = () => {
    sound.playClick();
    let score = 0;

    if (outletSelections.kitchenSink === 'gfci') score += 25;
    if (outletSelections.livingRoom === 'standard_15a') score += 25;
    if (outletSelections.heavyAppliance === 'dedicated_20a') score += 25;
    if (outletSelections.hotWireColor === 'black') score += 25;

    setElectricalScore(score);

    if (score >= 80) {
      sound.playSuccess();
      const contract = {
        employer: currentJob.employer,
        role: currentJob.role,
        salary: currentJob.salary,
        commission: currentJob.commission,
        score,
        timestamp: new Date().toLocaleTimeString(),
      };
      setAwardedContract(contract);
      onUpdateStats({
        steamMastery: 25,
        financialAcumen: 20,
        earningsBalance: currentJob.commission,
      });
    } else {
      sound.playAlert();
    }
  };

  // Evaluate Avionics Test
  const handleEvaluateAvionics = () => {
    sound.playClick();
    let score = 0;
    if (avionicsBusContinuity === 'zero_ohm') score += 50;
    if (avionicsTelemetryRate === 'can_bus_1mbps') score += 50;
    setAvionicsScore(score);
    if (score >= 80) {
      sound.playSuccess();
      setAwardedContract({
        employer: currentJob.employer,
        role: currentJob.role,
        salary: currentJob.salary,
        commission: currentJob.commission,
        score,
        timestamp: new Date().toLocaleTimeString(),
      });
      onUpdateStats({ steamMastery: 25, financialAcumen: 20, earningsBalance: currentJob.commission });
    } else {
      sound.playAlert();
    }
  };

  // Evaluate AI Training Test
  const handleEvaluateAiTraining = () => {
    sound.playClick();
    let score = 0;
    if (aiPromptStrategy === 'structured_few_shot') score += 25;
    if (aiTemperatureChoice === 'low_deterministic') score += 25;
    if (aiDefenseGuardrail === 'xml_delimiter_sanitized') score += 25;
    if (aiEvalFramework === 'grounded_rag_metric') score += 25;
    setAiScore(score);
    if (score >= 80) {
      sound.playSuccess();
      setAwardedContract({
        employer: currentJob.employer,
        role: currentJob.role,
        salary: currentJob.salary,
        commission: currentJob.commission,
        score,
        timestamp: new Date().toLocaleTimeString(),
      });
      onUpdateStats({ steamMastery: 30, financialAcumen: 25, earningsBalance: currentJob.commission });
    } else {
      sound.playAlert();
    }
  };

  // Evaluate Insurance Test
  const handleEvaluateInsurance = () => {
    sound.playClick();
    let score = 0;
    if (insCoInsuranceClause === '80_percent_replacement') score += 25;
    if (insValuationMethod === 'rcv_no_depreciation') score += 25;
    if (insDifsCompliance === 'michigan_statutory_difs') score += 25;
    if (insExclusionRider === 'special_perils_endorsement') score += 25;
    setInsuranceScore(score);
    if (score >= 80) {
      sound.playSuccess();
      setAwardedContract({
        employer: currentJob.employer,
        role: currentJob.role,
        salary: currentJob.salary,
        commission: currentJob.commission,
        score,
        timestamp: new Date().toLocaleTimeString(),
      });
      onUpdateStats({ steamMastery: 20, financialAcumen: 30, earningsBalance: currentJob.commission });
    } else {
      sound.playAlert();
    }
  };

  // Evaluate Real Estate Test
  const handleEvaluateRealEstate = () => {
    sound.playClick();
    let score = 0;
    if (reDeedType === 'general_warranty') score += 25;
    if (reTitleSearch === 'schedule_b_encumbrance_cure') score += 25;
    if (reCapRateMath === 'noi_divided_by_value') score += 25;
    if (reClosingDisclosure === 'trid_3_day_rule') score += 25;
    setRealEstateScore(score);
    if (score >= 80) {
      sound.playSuccess();
      setAwardedContract({
        employer: currentJob.employer,
        role: currentJob.role,
        salary: currentJob.salary,
        commission: currentJob.commission,
        score,
        timestamp: new Date().toLocaleTimeString(),
      });
      onUpdateStats({ steamMastery: 20, financialAcumen: 30, earningsBalance: currentJob.commission });
    } else {
      sound.playAlert();
    }
  };

  // Evaluate Project Management Test
  const handleEvaluateProjectManagement = () => {
    sound.playClick();
    let score = 0;
    if (pmWbsMethod === '100_percent_rule') score += 25;
    if (pmCriticalPath === 'zero_float_longest_path') score += 25;
    if (pmEvmMetric === 'cpi_over_one_under_budget') score += 25;
    if (pmChangeBoard === 'formal_ccb_charter') score += 25;
    setPmScore(score);
    if (score >= 80) {
      sound.playSuccess();
      setAwardedContract({
        employer: currentJob.employer,
        role: currentJob.role,
        salary: currentJob.salary,
        commission: currentJob.commission,
        score,
        timestamp: new Date().toLocaleTimeString(),
      });
      onUpdateStats({ steamMastery: 25, financialAcumen: 25, earningsBalance: currentJob.commission });
    } else {
      sound.playAlert();
    }
  };

  // Evaluate Notary Public Test
  const handleEvaluateNotaryPublic = () => {
    sound.playClick();
    let score = 0;
    if (notaryIdRule === 'unexpired_gov_photo_id') score += 25;
    if (notaryJuratVsAck === 'jurat_mandatory_oath') score += 25;
    if (notaryJournalProtocol === 'contemporaneous_log_signature') score += 25;
    if (notarySealPlacement === 'clear_of_text_legible') score += 25;
    setNotaryScore(score);
    if (score >= 80) {
      sound.playSuccess();
      setAwardedContract({
        employer: currentJob.employer,
        role: currentJob.role,
        salary: currentJob.salary,
        commission: currentJob.commission,
        score,
        timestamp: new Date().toLocaleTimeString(),
      });
      onUpdateStats({ steamMastery: 20, financialAcumen: 25, earningsBalance: currentJob.commission });
    } else {
      sound.playAlert();
    }
  };

  // Evaluate CDL Class A and B Test
  const handleEvaluateCdl = () => {
    sound.playClick();
    let score = 0;
    if (cdlAirBrakeLab === 'leaks_alarm_60_button_20_45') score += 25;
    if (cdlGvwrRule === 'class_a_over_26k_towing_over_10k') score += 25;
    if (cdlHosLimit === '11_hour_driving_10_off') score += 25;
    if (cdlCouplingCheck === 'fifth_wheel_jaw_lock_no_gap') score += 25;
    setCdlScore(score);
    if (score >= 80) {
      sound.playSuccess();
      setAwardedContract({
        employer: currentJob.employer,
        role: currentJob.role,
        salary: currentJob.salary,
        commission: currentJob.commission,
        score,
        timestamp: new Date().toLocaleTimeString(),
      });
      onUpdateStats({ steamMastery: 25, financialAcumen: 25, earningsBalance: currentJob.commission });
    } else {
      sound.playAlert();
    }
  };

  const handleTogglePlumbingPart = (partId: string) => {
    sound.playClick();
    if (assembledPlumbing.includes(partId)) {
      setAssembledPlumbing(assembledPlumbing.filter((p) => p !== partId));
    } else {
      setAssembledPlumbing([...assembledPlumbing, partId]);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setResumeUploadedFileName(file.name);
      sound.playSuccess();
      setIsResumeSaved(true);
      if (onUpdateProfile) {
        onUpdateProfile({
          ...profile,
          resumeFileName: file.name,
        });
      }
    }
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkillInput.trim()) {
      sound.playClick();
      setResumeSkills([...resumeSkills, newSkillInput.trim()]);
      setNewSkillInput('');
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
            <Briefcase className="w-4 h-4" />
            <span>VOCATIONAL S.T.E.A.M. TRADES &amp; EMPLOYER HIRING ARENA</span>
          </div>
          <h2 className="text-2xl font-bold text-white mt-1">
            Job Search, Resume Upload &amp; Trade Skills Levels
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Compete with other player candidates for employer contracts: Upload your resume, complete hands-on troubleshooting (80%+ to pass), render scores, and earn cash commissions!
          </p>
        </div>

        {/* Player Earnings Balance */}
        <div className="bg-slate-950 px-4 py-2 rounded-xl border border-emerald-500/50 flex items-center gap-3">
          <DollarSign className="w-5 h-5 text-emerald-400" />
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Commission Balance</span>
            <span className="text-base font-bold text-emerald-400 font-mono tabular-nums">
              ${(playerStats.earningsBalance || 0).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap border-b border-slate-800 gap-2">
        {[
          { id: 'board', label: '1. Job Search & Openings', icon: Search },
          { id: 'resume', label: '2. Upload Resume Profile', icon: FileText },
          { id: 'competition', label: '3. Applicant Pool & Leaderboard', icon: Users },
          { id: 'test', label: '4. Practical Level (80% Required)', icon: Wrench },
          { id: 'contract', label: '5. Awarded Contracts & Commissions', icon: Award },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => {
                sound.playClick();
                setActiveTab(tab.id as any);
              }}
              className={`flex items-center gap-2 pb-3 px-3 text-xs font-semibold border-b-2 transition-colors ${
                isActive
                  ? 'border-cyan-400 text-cyan-300'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: Job Search & Openings */}
      {activeTab === 'board' && (
        <div className="space-y-6">
          {/* Search bar & Discipline Filter */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search jobs across AI, Insurance, Real Estate, Project Mgmt, Notary, CDL, Trades..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Discipline Quick Filters */}
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: 'all', label: 'All 9 Disciplines' },
                { id: 'ai_training', label: 'AI Training' },
                { id: 'insurance', label: 'Insurance' },
                { id: 'real_estate', label: 'Real Estate' },
                { id: 'project_management', label: 'Project Mgmt' },
                { id: 'notary_public', label: 'Notary Public' },
                { id: 'cdl_transportation', label: 'CDL Class A/B' },
                { id: 'plumbing', label: 'Plumbing' },
                { id: 'electrical', label: 'Electrical' },
                { id: 'avionics', label: 'Avionics' },
              ].map((pill) => (
                <button
                  key={pill.id}
                  onClick={() => {
                    sound.playClick();
                    setCategoryFilter(pill.id);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors border ${
                    categoryFilter === pill.id
                      ? 'bg-cyan-950/80 text-cyan-300 border-cyan-500/60'
                      : 'bg-slate-950/70 text-slate-400 border-slate-800 hover:text-slate-200'
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredJobs.map((job) => {
              const isSelected = selectedTrade === job.trade;
              const JobIcon = job.icon;

              return (
                <div
                  key={job.trade}
                  onClick={() => {
                    sound.playClick();
                    setSelectedTrade(job.trade);
                  }}
                  className={`p-5 rounded-xl border cursor-pointer transition-all space-y-3 ${
                    isSelected
                      ? 'bg-slate-950 border-cyan-500 ring-1 ring-cyan-500 shadow-xl'
                      : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400">
                        <JobIcon className="w-4 h-4" />
                      </div>
                      <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider font-mono">
                        {job.employer}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-600/40 shrink-0">
                      +${job.commission} Comm.
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white leading-snug">{job.role}</h3>
                    <span className="text-xs font-mono text-slate-300">{job.salary}</span>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">{job.description}</p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {job.reqSkills.map((sk) => (
                      <span key={sk} className="text-[10px] bg-slate-900 text-slate-300 px-2 py-0.5 rounded border border-slate-800">
                        {sk}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-500">Min Score: {job.passingMin}%+</span>
                    <span className="text-cyan-400 font-semibold flex items-center gap-1">
                      <span>Select &amp; Test</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Action Navigation */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('resume');
              }}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-700 text-white rounded-lg text-xs font-bold"
            >
              <Upload className="w-4 h-4 text-cyan-400" />
              <span>Customize / Upload Resume</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('competition');
              }}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-700 text-white rounded-lg text-xs font-bold"
            >
              <Users className="w-4 h-4 text-amber-400" />
              <span>View Competing Candidates ({initialCompetitors.filter((c) => c.trade === selectedTrade).length + 1})</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('test');
              }}
              className="flex items-center gap-2 px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-bold ml-auto"
            >
              <span>Start Practical Assessment for {currentJob.role} →</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: Resume Profile & Upload */}
      {activeTab === 'resume' && (
        <div className="space-y-6">
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-cyan-400" />
                  <span>Candidate Verified Resume Profile</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Employers inspect your verified resume, technical skills, and practical troubleshooting scores before issuing contracts.
                </p>
              </div>

              {/* Upload file simulation */}
              <label className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/50 text-cyan-200 text-xs font-semibold cursor-pointer transition-colors">
                <Upload className="w-4 h-4" />
                <span>Upload New Resume File</span>
                <input type="file" accept=".pdf,.doc,.docx,.txt" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-slate-300 font-bold block mb-1">Uploaded Resume Document:</label>
                <div className="flex items-center gap-2 p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs">
                  <FileCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-mono text-white">{resumeUploadedFileName}</span>
                  <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-600 ml-auto font-mono">
                    VERIFIED CANDIDATE ATTACHMENT
                  </span>
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 font-bold block mb-1">Professional Title / Headline:</label>
                <input
                  type="text"
                  value={resumeHeadline}
                  onChange={(e) => setResumeHeadline(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-bold block mb-1">Candidate Profile Summary:</label>
                <textarea
                  rows={3}
                  value={resumeBio}
                  onChange={(e) => setResumeBio(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-bold block mb-1">Verified Technical Skills:</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {resumeSkills.map((sk) => (
                    <span
                      key={sk}
                      className="text-xs font-mono bg-cyan-950/70 border border-cyan-600/40 text-cyan-200 px-2.5 py-1 rounded-lg flex items-center gap-1.5"
                    >
                      <span>{sk}</span>
                      <button
                        onClick={() => setResumeSkills(resumeSkills.filter((s) => s !== sk))}
                        className="text-slate-500 hover:text-red-400 ml-1 font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>

                <form onSubmit={handleAddSkill} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add technical skill (e.g., Soldering, Amperage Calculation)..."
                    value={newSkillInput}
                    onChange={(e) => setNewSkillInput(e.target.value)}
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold"
                  >
                    Add Skill
                  </button>
                </form>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => {
                  sound.playSuccess();
                  setActiveTab('test');
                }}
                className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-lg shadow-sm"
              >
                Save Profile &amp; Take Assessment →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Competing Applicants & Leaderboard */}
      {activeTab === 'competition' && (
        <div className="space-y-6">
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-400" />
                <span>Applicant Pool &amp; Candidate Rankings for {currentJob.role}</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Employers only award contracts to candidates achieving 80% or higher. Your score determines final placement!
              </p>
            </div>
            <button
              onClick={() => setActiveTab('test')}
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-lg"
            >
              Take Practical Exam
            </button>
          </div>

          <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 font-mono uppercase text-[10px]">
                <tr>
                  <th className="p-3.5">Candidate</th>
                  <th className="p-3.5">Headline &amp; Background</th>
                  <th className="p-3.5">Practical Score</th>
                  <th className="p-3.5">Resilience</th>
                  <th className="p-3.5">Employer Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {/* Current Player Row */}
                <tr className="bg-cyan-950/40 border-l-4 border-l-cyan-400">
                  <td className="p-3.5 font-bold text-cyan-300 flex items-center gap-2">
                    <Trophy className="w-3.5 h-3.5 text-amber-400" />
                    <span>{profile.name} (YOU)</span>
                  </td>
                  <td className="p-3.5 text-slate-300">
                    <div>{resumeHeadline}</div>
                    <span className="text-[10px] text-cyan-400 font-mono">{resumeUploadedFileName}</span>
                  </td>
                  <td className="p-3.5 font-mono font-bold">
                    {selectedTrade === 'plumbing'
                      ? plumbingScore !== null
                        ? `${plumbingScore}%`
                        : 'Pending Exam'
                      : selectedTrade === 'electrical'
                      ? electricalScore !== null
                        ? `${electricalScore}%`
                        : 'Pending Exam'
                      : selectedTrade === 'avionics'
                      ? avionicsScore !== null
                        ? `${avionicsScore}%`
                        : 'Pending Exam'
                      : selectedTrade === 'ai_training'
                      ? aiScore !== null
                        ? `${aiScore}%`
                        : 'Pending Exam'
                      : selectedTrade === 'insurance'
                      ? insuranceScore !== null
                        ? `${insuranceScore}%`
                        : 'Pending Exam'
                      : selectedTrade === 'real_estate'
                      ? realEstateScore !== null
                        ? `${realEstateScore}%`
                        : 'Pending Exam'
                      : selectedTrade === 'project_management'
                      ? pmScore !== null
                        ? `${pmScore}%`
                        : 'Pending Exam'
                      : selectedTrade === 'notary_public'
                      ? notaryScore !== null
                        ? `${notaryScore}%`
                        : 'Pending Exam'
                      : selectedTrade === 'cdl_transportation'
                      ? cdlScore !== null
                        ? `${cdlScore}%`
                        : 'Pending Exam'
                      : 'Pending Exam'}
                  </td>
                  <td className="p-3.5 font-mono text-rose-400 font-bold">{playerStats.resilience}%</td>
                  <td className="p-3.5">
                    {awardedContract ? (
                      <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-600 font-mono text-[10px]">
                        HIRED (Contract Signed)
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800 font-mono text-[10px]">
                        In Assessment
                      </span>
                    )}
                  </td>
                </tr>

                {/* Other candidates */}
                {initialCompetitors
                  .filter((c) => c.trade === selectedTrade)
                  .map((comp) => (
                    <tr key={comp.id} className="hover:bg-slate-900/40">
                      <td className="p-3.5 font-medium text-white">{comp.name}</td>
                      <td className="p-3.5 text-slate-400">{comp.headline}</td>
                      <td className="p-3.5 font-mono font-bold text-slate-200">{comp.score}%</td>
                      <td className="p-3.5 font-mono text-rose-300">{comp.grit}%</td>
                      <td className="p-3.5">
                        {comp.score >= 80 ? (
                          <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-600/40 font-mono text-[10px]">
                            HIRED (80%+ Passed)
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded bg-red-950/60 text-red-400 border border-red-600/40 font-mono text-[10px]">
                            FAILED LEVEL (&lt;80%)
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: Practical Troubleshooting Simulation */}
      {activeTab === 'test' && (
        <div className="space-y-6">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase">Assessment Simulation</span>
              <h3 className="text-base font-bold text-white">{currentJob.role} Practical Exam</h3>
            </div>
            <span className="text-xs font-mono text-amber-400 bg-amber-950/60 px-2.5 py-1 rounded border border-amber-500/40">
              Pass Target: 80% or Higher
            </span>
          </div>

          {/* PLUMBING SIMULATION */}
          {selectedTrade === 'plumbing' && (
            <div className="space-y-5 bg-slate-950 p-6 rounded-xl border border-slate-800">
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-white">Part A: Sink Drainage Assembly Sequence</h4>
                <p className="text-xs text-slate-400">
                  Select and assemble the sink plumbing parts in the exact physical order from sink strainer to wall drain outlet:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  {plumbingParts.map((part) => {
                    const isAdded = assembledPlumbing.includes(part.id);
                    const orderIndex = assembledPlumbing.indexOf(part.id);

                    return (
                      <div
                        key={part.id}
                        onClick={() => handleTogglePlumbingPart(part.id)}
                        className={`p-3 rounded-lg border cursor-pointer flex items-center justify-between transition-colors ${
                          isAdded
                            ? 'bg-cyan-950/70 border-cyan-400 text-cyan-100'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <span className="text-xs font-medium">{part.name}</span>
                        {isAdded && (
                          <span className="text-xs font-bold font-mono text-cyan-300 bg-cyan-900 px-2 py-0.5 rounded">
                            Step #{orderIndex + 1}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Leak Troubleshooting Question */}
              <div className="space-y-2 pt-3 border-t border-slate-800">
                <h4 className="text-sm font-bold text-white">Part B: Hydraulic Pressure &amp; Leak Diagnostic</h4>
                <p className="text-xs text-slate-400">
                  The sink operates with water leaking at the slip nut joint and sluggish aerator pressure. What is the correct trade protocol?
                </p>

                <div className="space-y-2 pt-1">
                  {[
                    {
                      id: 'gasket_aerator',
                      label: 'Replace worn beveled rubber gasket washer, hand-tighten plus 1/4 turn, and unscrew/clean clogged aerator screen mesh.',
                    },
                    {
                      id: 'overtighten',
                      label: 'Use an oversized pipe wrench to crank the plastic slip nut as tightly as possible until threads strip.',
                    },
                    {
                      id: 'glue',
                      label: 'Coat all rubber gaskets with PVC solvent glue and seal shut permanently.',
                    },
                  ].map((ans) => (
                    <div
                      key={ans.id}
                      onClick={() => {
                        sound.playClick();
                        setPlumbingLeakDiag(ans.id);
                      }}
                      className={`p-3 rounded-lg border text-xs cursor-pointer transition-colors ${
                        plumbingLeakDiag === ans.id
                          ? 'bg-cyan-950/70 border-cyan-400 text-white'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {ans.label}
                    </div>
                  ))}
                </div>
              </div>

              {plumbingScore !== null && (
                <div
                  className={`p-4 rounded-xl border text-xs font-semibold flex flex-wrap items-center justify-between gap-3 ${
                    plumbingScore >= 80
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                      : 'bg-red-950/80 border-red-500 text-red-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {plumbingScore >= 80 ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5 text-red-400" />}
                    <span>
                      {plumbingScore >= 80
                        ? `PASSED LEVEL! Score: ${plumbingScore}%. Scores rendered to employer. Employment contract unlocked!`
                        : `FAILED LEVEL. Score: ${plumbingScore}%. Employers reject candidates scoring under 80%. You must reassemble properly to pass.`}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {plumbingScore < 80 ? (
                      <button
                        onClick={() => {
                          setAssembledPlumbing([]);
                          setPlumbingLeakDiag('');
                          setPlumbingScore(null);
                        }}
                        className="px-3 py-1 bg-red-800 hover:bg-red-700 text-white rounded font-bold"
                      >
                        Retry Level
                      </button>
                    ) : (
                      <button
                        onClick={() => setActiveTab('contract')}
                        className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-bold"
                      >
                        View Signed Contract →
                      </button>
                    )}
                  </div>
                </div>
              )}

              <button
                onClick={handleEvaluatePlumbing}
                className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-lg transition-colors shadow-sm"
              >
                Submit Plumbing Diagnostic for Employer Scoring
              </button>
            </div>
          )}

          {/* ELECTRICAL SIMULATION */}
          {selectedTrade === 'electrical' && (
            <div className="space-y-5 bg-slate-950 p-6 rounded-xl border border-slate-800">
              <h4 className="text-sm font-bold text-white">Electrical Circuit Safety &amp; Code Placement</h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="text-slate-300 block mb-1">Within 6ft of Kitchen/Bathroom Water Source:</label>
                  <select
                    value={outletSelections.kitchenSink}
                    onChange={(e) => setOutletSelections({ ...outletSelections, kitchenSink: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200"
                  >
                    <option value="">Select Outlet Type...</option>
                    <option value="gfci">GFCI (Ground Fault Circuit Interrupter - Code Required)</option>
                    <option value="standard">Standard 15A Duplex</option>
                    <option value="unfused">Unfused Extension Tap</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">Dry Living Room General Outlets:</label>
                  <select
                    value={outletSelections.livingRoom}
                    onChange={(e) => setOutletSelections({ ...outletSelections, livingRoom: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200"
                  >
                    <option value="">Select Outlet Type...</option>
                    <option value="standard_15a">Tamper-Resistant 15A 120V Circuit</option>
                    <option value="exposed">Exposed Terminal Bus</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">Heavy Refrigerator / Microwave Circuit:</label>
                  <select
                    value={outletSelections.heavyAppliance}
                    onChange={(e) => setOutletSelections({ ...outletSelections, heavyAppliance: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200"
                  >
                    <option value="">Select Circuit Specification...</option>
                    <option value="dedicated_20a">Dedicated 20-Amp 12-AWG Wire Circuit</option>
                    <option value="shared_10a">Shared 10-Amp Light Circuit</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">US Standard 120V Hot Wire Color:</label>
                  <select
                    value={outletSelections.hotWireColor}
                    onChange={(e) => setOutletSelections({ ...outletSelections, hotWireColor: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200"
                  >
                    <option value="">Select Wire Color...</option>
                    <option value="black">Black Wire (Hot Carrier)</option>
                    <option value="white">White Wire (Neutral)</option>
                    <option value="green">Bare Copper / Green (Ground)</option>
                  </select>
                </div>
              </div>

              {electricalScore !== null && (
                <div
                  className={`p-4 rounded-xl border text-xs font-semibold flex flex-wrap items-center justify-between gap-3 ${
                    electricalScore >= 80
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                      : 'bg-red-950/80 border-red-500 text-red-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {electricalScore >= 80 ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5 text-red-400" />}
                    <span>
                      {electricalScore >= 80
                        ? `PASSED LEVEL! Score: ${electricalScore}%. Scores rendered to employer. Employment contract unlocked!`
                        : `FAILED LEVEL. Score: ${electricalScore}%. Score below 80%. Rewire outlets safely to pass.`}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {electricalScore < 80 ? (
                      <button
                        onClick={() => {
                          setOutletSelections({ kitchenSink: '', livingRoom: '', heavyAppliance: '', hotWireColor: '' });
                          setElectricalScore(null);
                        }}
                        className="px-3 py-1 bg-red-800 hover:bg-red-700 text-white rounded font-bold"
                      >
                        Retry Wiring
                      </button>
                    ) : (
                      <button
                        onClick={() => setActiveTab('contract')}
                        className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-bold"
                      >
                        View Signed Contract →
                      </button>
                    )}
                  </div>
                </div>
              )}

              <button
                onClick={handleEvaluateElectrical}
                className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-lg transition-colors shadow-sm"
              >
                Submit Electrical Diagnostic for Employer Scoring
              </button>
            </div>
          )}

          {/* AVIONICS SIMULATION */}
          {selectedTrade === 'avionics' && (
            <div className="space-y-5 bg-slate-950 p-6 rounded-xl border border-slate-800">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                <Zap className="w-6 h-6 text-cyan-400" />
                <div>
                  <h4 className="text-sm font-bold text-white">Aerospace Avionics Harness &amp; Bus Telemetry Diagnostic</h4>
                  <p className="text-xs text-slate-400">Calibrate payload bus lines and ensure zero fault tolerance before rocket ascent.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="text-slate-300 block mb-1">Payload Harness Bus Resistance Test:</label>
                  <select
                    value={avionicsBusContinuity}
                    onChange={(e) => setAvionicsBusContinuity(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200"
                  >
                    <option value="">Select Continuity Measurement...</option>
                    <option value="zero_ohm">0.05 Ω (Zero-Short Ground Continuity - Flight Certified)</option>
                    <option value="open_circuit">Infinite Ω (Open Broken Trace)</option>
                    <option value="floating">Floating Unshielded Stray Inductance</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">Telemetry Bus Baud &amp; Communication Protocol:</label>
                  <select
                    value={avionicsTelemetryRate}
                    onChange={(e) => setAvionicsTelemetryRate(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200"
                  >
                    <option value="">Select Telemetry Bus Protocol...</option>
                    <option value="can_bus_1mbps">CAN-Bus / SpaceWire Dual Redundant 1 Mbps (Military Spec)</option>
                    <option value="unshielded_serial">Unshielded Single-Wire 9600 Baud UART</option>
                  </select>
                </div>
              </div>

              {avionicsScore !== null && (
                <div
                  className={`p-4 rounded-xl border text-xs font-semibold flex flex-wrap items-center justify-between gap-3 ${
                    avionicsScore >= 80
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                      : 'bg-red-950/80 border-red-500 text-red-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {avionicsScore >= 80 ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5 text-red-400" />}
                    <span>
                      {avionicsScore >= 80
                        ? `PASSED LEVEL! Score: ${avionicsScore}%. Telemetry verified. Employment contract unlocked!`
                        : `FAILED LEVEL. Score: ${avionicsScore}%. Score below 80%. Re-check aerospace bus resistance.`}
                    </span>
                  </div>
                  {avionicsScore >= 80 ? (
                    <button onClick={() => setActiveTab('contract')} className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-bold">
                      View Signed Contract →
                    </button>
                  ) : (
                    <button onClick={() => setAvionicsScore(null)} className="px-3 py-1 bg-red-800 hover:bg-red-700 text-white rounded font-bold">
                      Retry
                    </button>
                  )}
                </div>
              )}

              <button
                onClick={handleEvaluateAvionics}
                className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-lg transition-colors shadow-sm"
              >
                Submit Avionics Diagnostic for Employer Scoring
              </button>
            </div>
          )}

          {/* AI TRAINING SIMULATION */}
          {selectedTrade === 'ai_training' && (
            <div className="space-y-5 bg-slate-950 p-6 rounded-xl border border-slate-800">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                <Bot className="w-6 h-6 text-cyan-400" />
                <div>
                  <h4 className="text-sm font-bold text-white">AI Training, Prompt Architecture &amp; Enterprise Guardrails</h4>
                  <p className="text-xs text-slate-400">Configure production prompt pipelines, hallucination mitigation, and injection defense.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="text-slate-300 block mb-1">1. Prompt Engineering Architecture:</label>
                  <select
                    value={aiPromptStrategy}
                    onChange={(e) => setAiPromptStrategy(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200"
                  >
                    <option value="">Select Strategy...</option>
                    <option value="structured_few_shot">Structured Few-Shot Prompt with Explicit Schema &amp; JSON Constraints (Recommended)</option>
                    <option value="unconstrained_freeform">Vague open-ended instructions without input sanitization or boundaries</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">2. Deterministic Extraction Temperature:</label>
                  <select
                    value={aiTemperatureChoice}
                    onChange={(e) => setAiTemperatureChoice(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200"
                  >
                    <option value="">Select Temperature...</option>
                    <option value="low_deterministic">Temperature 0.0 - 0.2 (Low variance, factual consistency &amp; code determinism)</option>
                    <option value="high_random">Temperature 1.8 - 2.0 (High randomness, hallucinations, unstable output)</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">3. Adversarial Prompt Injection Defense:</label>
                  <select
                    value={aiDefenseGuardrail}
                    onChange={(e) => setAiDefenseGuardrail(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200"
                  >
                    <option value="">Select Defense Protocol...</option>
                    <option value="xml_delimiter_sanitized">XML Delimiter Encapsulation (&lt;user_input&gt;) &amp; Strict System Directive Precedence</option>
                    <option value="raw_concatenation">Direct string concatenation with user input overriding system rules</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">4. Model Evaluation &amp; Hallucination Audit:</label>
                  <select
                    value={aiEvalFramework}
                    onChange={(e) => setAiEvalFramework(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200"
                  >
                    <option value="">Select Evaluation Framework...</option>
                    <option value="grounded_rag_metric">RAG Triad (Context Relevance, Groundedness, Answer Relevance) on Golden Benchmark</option>
                    <option value="vibes_check">Subjective informal casual read without accuracy metrics</option>
                  </select>
                </div>
              </div>

              {aiScore !== null && (
                <div
                  className={`p-4 rounded-xl border text-xs font-semibold flex flex-wrap items-center justify-between gap-3 ${
                    aiScore >= 80
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                      : 'bg-red-950/80 border-red-500 text-red-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {aiScore >= 80 ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5 text-red-400" />}
                    <span>
                      {aiScore >= 80
                        ? `PASSED LEVEL! Score: ${aiScore}%. AI architecture and safety thresholds met. Contract unlocked!`
                        : `FAILED LEVEL. Score: ${aiScore}%. Minimum 80% required. Optimize prompt structure and injection defense.`}
                    </span>
                  </div>
                  {aiScore >= 80 ? (
                    <button onClick={() => setActiveTab('contract')} className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-bold">
                      View Signed Contract →
                    </button>
                  ) : (
                    <button onClick={() => setAiScore(null)} className="px-3 py-1 bg-red-800 hover:bg-red-700 text-white rounded font-bold">
                      Retry
                    </button>
                  )}
                </div>
              )}

              <button
                onClick={handleEvaluateAiTraining}
                className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-lg transition-colors shadow-sm"
              >
                Submit AI Prompt Engineering Assessment for Employer Scoring
              </button>
            </div>
          )}

          {/* INSURANCE SIMULATION */}
          {selectedTrade === 'insurance' && (
            <div className="space-y-5 bg-slate-950 p-6 rounded-xl border border-slate-800">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                <ShieldCheck className="w-6 h-6 text-cyan-400" />
                <div>
                  <h4 className="text-sm font-bold text-white">Commercial Insurance Risk Underwriting &amp; DIFS Compliance</h4>
                  <p className="text-xs text-slate-400">Evaluate property casualty risk covenants, co-insurance penalties, and statutory Michigan DIFS standards.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="text-slate-300 block mb-1">1. Commercial Co-Insurance Clause Standard:</label>
                  <select
                    value={insCoInsuranceClause}
                    onChange={(e) => setInsCoInsuranceClause(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200"
                  >
                    <option value="">Select Clause Covenant...</option>
                    <option value="80_percent_replacement">80% Co-Insurance Clause: Insured must carry ≥80% replacement value to prevent fractional claim penalty</option>
                    <option value="zero_minimum">No minimum coverage required; insurer covers 100% loss regardless of valuation</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">2. Property Loss Claim Valuation Method:</label>
                  <select
                    value={insValuationMethod}
                    onChange={(e) => setInsValuationMethod(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200"
                  >
                    <option value="">Select Valuation Standard...</option>
                    <option value="rcv_no_depreciation">Replacement Cost Value (RCV): Pays to repair/replace with new material without physical depreciation deduction</option>
                    <option value="acv_depreciated">Actual Cash Value (ACV) only, deducting 60% for age and wear</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">3. Michigan DIFS Statutory Solvency Protection:</label>
                  <select
                    value={insDifsCompliance}
                    onChange={(e) => setInsDifsCompliance(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200"
                  >
                    <option value="">Select DIFS Compliance Rule...</option>
                    <option value="michigan_statutory_difs">Michigan Property &amp; Casualty Guaranty Association (MCL § 500.7901) Solvency Backstop</option>
                    <option value="unregistered_offshore">Unlicensed offshore mutual pool without statutory state reserves</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">4. Policy Fine Print Exclusion Audit:</label>
                  <select
                    value={insExclusionRider}
                    onChange={(e) => setInsExclusionRider(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200"
                  >
                    <option value="">Select Rider Protocol...</option>
                    <option value="special_perils_endorsement">Execute Special Causes of Loss Form with explicit Sewer Backup, Flood &amp; Ordinance/Law endorsements</option>
                    <option value="assume_covered">Assume standard policy automatically covers surface flood and municipal code upgrades</option>
                  </select>
                </div>
              </div>

              {insuranceScore !== null && (
                <div
                  className={`p-4 rounded-xl border text-xs font-semibold flex flex-wrap items-center justify-between gap-3 ${
                    insuranceScore >= 80
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                      : 'bg-red-950/80 border-red-500 text-red-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {insuranceScore >= 80 ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5 text-red-400" />}
                    <span>
                      {insuranceScore >= 80
                        ? `PASSED LEVEL! Score: ${insuranceScore}%. DIFS Underwriting certification verified. Contract unlocked!`
                        : `FAILED LEVEL. Score: ${insuranceScore}%. Score below 80%. Review co-insurance 80% rule and DIFS compliance.`}
                    </span>
                  </div>
                  {insuranceScore >= 80 ? (
                    <button onClick={() => setActiveTab('contract')} className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-bold">
                      View Signed Contract →
                    </button>
                  ) : (
                    <button onClick={() => setInsuranceScore(null)} className="px-3 py-1 bg-red-800 hover:bg-red-700 text-white rounded font-bold">
                      Retry
                    </button>
                  )}
                </div>
              )}

              <button
                onClick={handleEvaluateInsurance}
                className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-lg transition-colors shadow-sm"
              >
                Submit Insurance Risk Underwriting Assessment for Employer Scoring
              </button>
            </div>
          )}

          {/* REAL ESTATE SIMULATION */}
          {selectedTrade === 'real_estate' && (
            <div className="space-y-5 bg-slate-950 p-6 rounded-xl border border-slate-800">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                <Home className="w-6 h-6 text-cyan-400" />
                <div>
                  <h4 className="text-sm font-bold text-white">Real Estate Warranty Deed Conveyance, Title Chain &amp; Cap Rate</h4>
                  <p className="text-xs text-slate-400">Perform title clearance, warranty deed execution, and commercial Net Operating Income underwriting.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="text-slate-300 block mb-1">1. Deed Conveyance Instrument Standard:</label>
                  <select
                    value={reDeedType}
                    onChange={(e) => setReDeedType(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200"
                  >
                    <option value="">Select Deed Instrument...</option>
                    <option value="general_warranty">General Warranty Deed: Grantor warrants title defense against all defects throughout entire chain of title</option>
                    <option value="quitclaim">Quitclaim Deed without warranties of title or defense against preexisting encumbrances</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">2. Title Search Schedule B Encumbrance Action:</label>
                  <select
                    value={reTitleSearch}
                    onChange={(e) => setReTitleSearch(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200"
                  >
                    <option value="">Select Title Resolution...</option>
                    <option value="schedule_b_encumbrance_cure">Schedule B Cure: Require seller escrow payoff for outstanding tax forfeitures &amp; mechanic liens at closing</option>
                    <option value="ignore_liens">Close transaction without title insurance or lien releases</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">3. Capitalization Rate (Cap Rate) Formula:</label>
                  <select
                    value={reCapRateMath}
                    onChange={(e) => setReCapRateMath(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200"
                  >
                    <option value="">Select Formula...</option>
                    <option value="noi_divided_by_value">Cap Rate = Net Operating Income (NOI) ÷ Purchase Price ($48,000 NOI ÷ $600,000 = 8.0% Cap Rate)</option>
                    <option value="gross_divided_mortgage">Gross Rent ÷ Monthly Mortgage Payment</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">4. TRID / CFPB Closing Disclosure Rule:</label>
                  <select
                    value={reClosingDisclosure}
                    onChange={(e) => setReClosingDisclosure(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200"
                  >
                    <option value="">Select Mandatory Notice Period...</option>
                    <option value="trid_3_day_rule">TRID 3-Day Rule: Borrower must receive final Closing Disclosure at least 3 business days before settlement</option>
                    <option value="same_day_closing">Immediate same-day verbal confirmation without waiting period</option>
                  </select>
                </div>
              </div>

              {realEstateScore !== null && (
                <div
                  className={`p-4 rounded-xl border text-xs font-semibold flex flex-wrap items-center justify-between gap-3 ${
                    realEstateScore >= 80
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                      : 'bg-red-950/80 border-red-500 text-red-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {realEstateScore >= 80 ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5 text-red-400" />}
                    <span>
                      {realEstateScore >= 80
                        ? `PASSED LEVEL! Score: ${realEstateScore}%. Real Estate underwriting certification verified. Contract unlocked!`
                        : `FAILED LEVEL. Score: ${realEstateScore}%. Score below 80%. Verify warranty deed covenant and Cap Rate formula.`}
                    </span>
                  </div>
                  {realEstateScore >= 80 ? (
                    <button onClick={() => setActiveTab('contract')} className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-bold">
                      View Signed Contract →
                    </button>
                  ) : (
                    <button onClick={() => setRealEstateScore(null)} className="px-3 py-1 bg-red-800 hover:bg-red-700 text-white rounded font-bold">
                      Retry
                    </button>
                  )}
                </div>
              )}

              <button
                onClick={handleEvaluateRealEstate}
                className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-lg transition-colors shadow-sm"
              >
                Submit Real Estate &amp; Title Assessment for Employer Scoring
              </button>
            </div>
          )}

          {/* PROJECT MANAGEMENT SIMULATION */}
          {selectedTrade === 'project_management' && (
            <div className="space-y-5 bg-slate-950 p-6 rounded-xl border border-slate-800">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                <FolderKanban className="w-6 h-6 text-cyan-400" />
                <div>
                  <h4 className="text-sm font-bold text-white">Project Management Professional (PMP) WBS, Critical Path &amp; EVM</h4>
                  <p className="text-xs text-slate-400">Deconstruct capital project scope baselines, compute float tolerances, and track Earned Value.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="text-slate-300 block mb-1">1. Work Breakdown Structure (WBS) Decomposition:</label>
                  <select
                    value={pmWbsMethod}
                    onChange={(e) => setPmWbsMethod(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200"
                  >
                    <option value="">Select WBS Principle...</option>
                    <option value="100_percent_rule">100% Rule: WBS includes exactly 100% of scope down to manageable Work Packages with no overlaps</option>
                    <option value="ad_hoc">Unstructured brainstorm list without deliverables or work package codes</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">2. Critical Path Method (CPM) Float / Slack Rule:</label>
                  <select
                    value={pmCriticalPath}
                    onChange={(e) => setPmCriticalPath(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200"
                  >
                    <option value="">Select Critical Path Definition...</option>
                    <option value="zero_float_longest_path">Critical Path: Longest sequence of dependent activities, each possessing Zero Total Float (delay delays project)</option>
                    <option value="highest_cost">Sequence with highest expenditure regardless of dependencies</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">3. Earned Value Management (EVM) Interpretation:</label>
                  <select
                    value={pmEvmMetric}
                    onChange={(e) => setPmEvmMetric(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200"
                  >
                    <option value="">Select EVM Status (CPI = 1.15)...</option>
                    <option value="cpi_over_one_under_budget">CPI = EV ÷ AC = 1.15: Project is under budget, earning $1.15 in value for every $1.00 spent</option>
                    <option value="over_budget">CPI = 1.15 indicates catastrophic 15% budget overrun</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">4. Scope Baseline Change Control Governance:</label>
                  <select
                    value={pmChangeBoard}
                    onChange={(e) => setPmChangeBoard(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200"
                  >
                    <option value="">Select Governance Protocol...</option>
                    <option value="formal_ccb_charter">Formal Change Control Board (CCB): Evaluate integrated impact on cost, schedule, and quality before updating baseline</option>
                    <option value="hallway_approvals">Verbal ad-hoc changes implemented directly without baseline revision</option>
                  </select>
                </div>
              </div>

              {pmScore !== null && (
                <div
                  className={`p-4 rounded-xl border text-xs font-semibold flex flex-wrap items-center justify-between gap-3 ${
                    pmScore >= 80
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                      : 'bg-red-950/80 border-red-500 text-red-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {pmScore >= 80 ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5 text-red-400" />}
                    <span>
                      {pmScore >= 80
                        ? `PASSED LEVEL! Score: ${pmScore}%. PMP Infrastructure competence certified. Contract unlocked!`
                        : `FAILED LEVEL. Score: ${pmScore}%. Score below 80%. Review WBS 100% rule, Critical Path float, and CPI.`}
                    </span>
                  </div>
                  {pmScore >= 80 ? (
                    <button onClick={() => setActiveTab('contract')} className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-bold">
                      View Signed Contract →
                    </button>
                  ) : (
                    <button onClick={() => setPmScore(null)} className="px-3 py-1 bg-red-800 hover:bg-red-700 text-white rounded font-bold">
                      Retry
                    </button>
                  )}
                </div>
              )}

              <button
                onClick={handleEvaluateProjectManagement}
                className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-lg transition-colors shadow-sm"
              >
                Submit Project Management Assessment for Employer Scoring
              </button>
            </div>
          )}

          {/* NOTARY PUBLIC SIMULATION */}
          {selectedTrade === 'notary_public' && (
            <div className="space-y-5 bg-slate-950 p-6 rounded-xl border border-slate-800">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                <Stamp className="w-6 h-6 text-cyan-400" />
                <div>
                  <h4 className="text-sm font-bold text-white">Michigan Notary Public Law, Jurats &amp; Mobile Loan Signing</h4>
                  <p className="text-xs text-slate-400">Enforce MCL § 55.285 identification rules, Jurat verbal oaths, journal keeping, and anti-fraud protocols.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="text-slate-300 block mb-1">1. Signer Identification Standard (MCL § 55.285):</label>
                  <select
                    value={notaryIdRule}
                    onChange={(e) => setNotaryIdRule(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200"
                  >
                    <option value="">Select Identification Evidence...</option>
                    <option value="unexpired_gov_photo_id">Satisfactory Evidence: Valid, unexpired government photo ID (Driver's License, Passport, State ID) or sworn credible witness</option>
                    <option value="social_profile">A username on social media or an unsigned corporate membership card</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">2. Jurat vs. Acknowledgment Protocol:</label>
                  <select
                    value={notaryJuratVsAck}
                    onChange={(e) => setNotaryJuratVsAck(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200"
                  >
                    <option value="">Select Required Notarial Procedure...</option>
                    <option value="jurat_mandatory_oath">Jurat ("Subscribed &amp; sworn"): Signer MUST sign in notary's physical presence AND take an oath/affirmation to truth</option>
                    <option value="pre_signed_mail">Jurat document can be pre-signed and mailed in without physical oath</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">3. Notarial Record Journal Requirement:</label>
                  <select
                    value={notaryJournalProtocol}
                    onChange={(e) => setNotaryJournalProtocol(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200"
                  >
                    <option value="">Select Journal Protocol...</option>
                    <option value="contemporaneous_log_signature">Record contemporaneous log: Date/time, type of act, document title, signer legal name, ID details, fee, and signature</option>
                    <option value="no_log">Maintain no logbook to minimize document archiving</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">4. Commission Seal Placement &amp; Integrity:</label>
                  <select
                    value={notarySealPlacement}
                    onChange={(e) => setNotarySealPlacement(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200"
                  >
                    <option value="">Select Seal Standard...</option>
                    <option value="clear_of_text_legible">Affix crisp, legible ink stamp on document margin clear of legal text, signatures, and notary block; NEVER stamp blank pages</option>
                    <option value="stamp_over_text">Stamp heavily directly across the borrower signature so text is obliterated</option>
                  </select>
                </div>
              </div>

              {notaryScore !== null && (
                <div
                  className={`p-4 rounded-xl border text-xs font-semibold flex flex-wrap items-center justify-between gap-3 ${
                    notaryScore >= 80
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                      : 'bg-red-950/80 border-red-500 text-red-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {notaryScore >= 80 ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5 text-red-400" />}
                    <span>
                      {notaryScore >= 80
                        ? `PASSED LEVEL! Score: ${notaryScore}%. Michigan Notary Commission standards satisfied. Contract unlocked!`
                        : `FAILED LEVEL. Score: ${notaryScore}%. Score below 80%. Review ID verification laws and Jurat oath requirements.`}
                    </span>
                  </div>
                  {notaryScore >= 80 ? (
                    <button onClick={() => setActiveTab('contract')} className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-bold">
                      View Signed Contract →
                    </button>
                  ) : (
                    <button onClick={() => setNotaryScore(null)} className="px-3 py-1 bg-red-800 hover:bg-red-700 text-white rounded font-bold">
                      Retry
                    </button>
                  )}
                </div>
              )}

              <button
                onClick={handleEvaluateNotaryPublic}
                className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-lg transition-colors shadow-sm"
              >
                Submit Notary Public Assessment for Employer Scoring
              </button>
            </div>
          )}

          {/* CDL CLASS A & B SIMULATION */}
          {selectedTrade === 'cdl_transportation' && (
            <div className="space-y-5 bg-slate-950 p-6 rounded-xl border border-slate-800">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                <Truck className="w-6 h-6 text-cyan-400" />
                <div>
                  <h4 className="text-sm font-bold text-white">CDL Class A &amp; B Air Brakes, GVWR &amp; FMCSA Commercial Fleet Safety</h4>
                  <p className="text-xs text-slate-400">Master the 3-step air brake LAB test, Class A combination ratings, and FMCSA Hours-of-Service rules.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="text-slate-300 block mb-1">1. Mandatory Air Brake "LAB" Inspection Sequence:</label>
                  <select
                    value={cdlAirBrakeLab}
                    onChange={(e) => setCdlAirBrakeLab(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200"
                  >
                    <option value="">Select Air Brake Test Steps...</option>
                    <option value="leaks_alarm_60_button_20_45">LAB Test: 1) Leaks (&lt;3 PSI loss straight, &lt;4 combo in 1 min), 2) Low Air Alarm activates ≥60 PSI, 3) Buttons pop out at 20-45 PSI</option>
                    <option value="honk_horn">Honk air horn and immediately drive onto the highway without pressure testing</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">2. Class A vs. Class B Commercial GVWR Rating:</label>
                  <select
                    value={cdlGvwrRule}
                    onChange={(e) => setCdlGvwrRule(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200"
                  >
                    <option value="">Select Vehicle Classification...</option>
                    <option value="class_a_over_26k_towing_over_10k">Class A CDL: Any combination of vehicles with Gross Combination Weight Rating (GCWR) ≥26,001 lbs, towing a unit &gt;10,000 lbs GVWR</option>
                    <option value="passenger_car">Standard driver license allows towing 40-foot commercial freight trailers</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">3. FMCSA Hours of Service (HOS) 11-Hour Rule:</label>
                  <select
                    value={cdlHosLimit}
                    onChange={(e) => setCdlHosLimit(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200"
                  >
                    <option value="">Select HOS Limitation...</option>
                    <option value="11_hour_driving_10_off">11-Hour Driving Rule: May drive a maximum of 11 hours after 10 consecutive hours off duty; mandatory 30-min break within 8 hrs</option>
                    <option value="unlimited_drive">Drive 20 hours continuously if load is urgent</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">4. Tractor-Trailer Fifth Wheel Coupling Inspection:</label>
                  <select
                    value={cdlCouplingCheck}
                    onChange={(e) => setCdlCouplingCheck(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200"
                  >
                    <option value="">Select Coupling Verification...</option>
                    <option value="fifth_wheel_jaw_lock_no_gap">No space between fifth wheel &amp; trailer apron; locking jaws securely closed around kingpin shank; safety latch engaged</option>
                    <option value="loose_gap">Leave a 3-inch gap between plates and drive slowly</option>
                  </select>
                </div>
              </div>

              {cdlScore !== null && (
                <div
                  className={`p-4 rounded-xl border text-xs font-semibold flex flex-wrap items-center justify-between gap-3 ${
                    cdlScore >= 80
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                      : 'bg-red-950/80 border-red-500 text-red-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {cdlScore >= 80 ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5 text-red-400" />}
                    <span>
                      {cdlScore >= 80
                        ? `PASSED LEVEL! Score: ${cdlScore}%. CDL Class A & B FMCSA safety standards verified. Contract unlocked!`
                        : `FAILED LEVEL. Score: ${cdlScore}%. Score below 80%. Review air brake LAB test and GVWR combination standards.`}
                    </span>
                  </div>
                  {cdlScore >= 80 ? (
                    <button onClick={() => setActiveTab('contract')} className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-bold">
                      View Signed Contract →
                    </button>
                  ) : (
                    <button onClick={() => setCdlScore(null)} className="px-3 py-1 bg-red-800 hover:bg-red-700 text-white rounded font-bold">
                      Retry
                    </button>
                  )}
                </div>
              )}

              <button
                onClick={handleEvaluateCdl}
                className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-lg transition-colors shadow-sm"
              >
                Submit CDL Class A &amp; B Air Brakes Assessment for Employer Scoring
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 5: Awarded Employment Contracts & Commission Payouts */}
      {activeTab === 'contract' && (
        <div className="space-y-6">
          {awardedContract ? (
            <div className="bg-slate-950 p-6 rounded-xl border border-emerald-500/50 space-y-5 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2 text-emerald-400">
                  <Award className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-wider font-mono">
                    OFFICIAL EMPLOYMENT CONTRACT EXECUTED
                  </span>
                </div>
                <span className="text-xs font-mono text-slate-400">
                  Certified: {awardedContract.timestamp}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block mb-0.5">Employing Entity</span>
                  <span className="text-white font-bold text-sm">{awardedContract.employer}</span>
                </div>
                <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block mb-0.5">Appointed Position</span>
                  <span className="text-cyan-400 font-bold text-sm">{awardedContract.role}</span>
                </div>
                <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block mb-0.5">Annual Starting Salary</span>
                  <span className="text-slate-200 font-bold font-mono text-sm">{awardedContract.salary}</span>
                </div>
                <div className="bg-slate-900 p-3.5 rounded-lg border border-emerald-500/40">
                  <span className="text-slate-500 block mb-0.5">Placement Commission Paid to Account</span>
                  <span className="text-emerald-400 font-bold font-mono text-sm">
                    +${awardedContract.commission.toLocaleString()} Deposited
                  </span>
                </div>
              </div>

              <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-lg text-xs text-emerald-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>
                  Congratulations, {profile.name}! Your practical test score of {awardedContract.score}% satisfied employer hiring thresholds.
                  Signing commission of ${awardedContract.commission} was credited to your balance sheet!
                </span>
              </div>
            </div>
          ) : (
            <div className="bg-slate-950 p-8 rounded-xl border border-slate-800 text-center space-y-3">
              <Briefcase className="w-10 h-10 text-slate-600 mx-auto" />
              <h4 className="text-sm font-bold text-white">No Executed Contracts Yet</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Complete any vocational trade level with a score of 80% or higher to unlock official employment contracts and commission deposits!
              </p>
              <button
                onClick={() => setActiveTab('test')}
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold rounded-lg"
              >
                Start Trade Test Now
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
