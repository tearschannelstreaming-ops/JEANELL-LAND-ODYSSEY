import React, { useState } from 'react';
import { AdultDilemmaNode, PlayerStats, UnlockedResource, CharacterReflection } from '../../types/game';
import { sound } from '../../utils/audio';
import {
  Heart,
  ShieldAlert,
  Flame,
  Scale,
  Sparkles,
  Users,
  CheckCircle2,
  AlertTriangle,
  Lock,
  PhoneCall,
  Compass,
  ExternalLink,
  BookOpen,
  RefreshCw,
  FolderLock,
  Info,
} from 'lucide-react';

interface AdultLifeMatrixProps {
  userAge: number;
  isBiometricallyVerified: boolean;
  onOpenBiometrics: () => void;
  playerStats: PlayerStats;
  onUpdateStats: (delta: Partial<PlayerStats>) => void;
  unlockedResourceIds?: string[];
  onUnlockResource?: (resource: UnlockedResource) => void;
}

export const ADULT_DILEMMAS: AdultDilemmaNode[] = [
  // 1. Domestic Violence
  {
    id: 'dilemma_dv',
    category: 'domestic_violence',
    title: 'Recognizing Domestic Violence & Choosing Life',
    situation:
      'As a young adult living with a partner, verbal hostility escalates into physical intimidation, financial deprivation, and isolation from loved ones. The partner demands control over your paychecks and threatens harm if you leave. In Better Forever (p. 32), Jeanell Land teaches that domestic abuse strips away your safety, autonomy, and mental health.',
    counselorGuidance:
      '“Domestic violence is never your fault. Your life and your children’s safety come before everything. National DV Hotline: 1-800-799-SAFE (7233) or One Stop Center 24/7 Shelter.”',
    options: [
      {
        id: 'dv_safety_exit',
        text: 'Execute Confidential Safety Plan & Relocate to Transitional Shelter',
        isCorrect: true,
        moralResilienceOutcome:
          'You courageously pack vital documents (birth certificates, social security cards) and seek emergency protection through One Stop Rehabilitation Center and legal counsel. You saved your life and broke the cycle of abuse.',
        resilienceDelta: 30,
        financialDelta: 500,
        safetyRating: 'safe',
        unlockedResources: [
          {
            id: 'res_national_dv_hotline',
            title: 'National Domestic Violence Hotline (24/7/365)',
            agencyOrOrg: 'National Domestic Violence Hotline & One Stop Center',
            url: 'https://www.thehotline.org',
            phone: '1-800-799-SAFE (7233) / Text "START" to 88788',
            category: 'Emergency & Health',
            whyItMatters: 'Confidential, free crisis intervention, personalized safety planning, and local safehouse bed coordination.',
            actionText: 'Access Safety Resources & Crisis Chat',
          },
          {
            id: 'res_michigan_legal_aid_dv',
            title: 'Michigan Legal Help: Personal Protection Orders (PPO)',
            agencyOrOrg: 'State Bar of Michigan & Legal Services',
            url: 'https://michiganlegalhelp.org',
            phone: '(888) 783-8190',
            category: 'Emergency & Health',
            whyItMatters: 'Free court-certified PPO filing toolkits, child custody emergency orders, and housing lease termination protection.',
            actionText: 'View PPO Legal Filing Kit',
          },
        ],
        characterReflection: {
          archetype: 'The Courageous Protector',
          isPositive: true,
          moralInsight: 'You valued your inherent dignity and life above false comfort or fear of the unknown.',
          tangibleConsequence: 'You achieved physical safety, preserved custody of your children, and established a foundation for independent thriving.',
          teachableLesson: 'True strength is not enduring cruelty; true strength is having the courage to protect your life and walk toward freedom.',
        },
      },
      {
        id: 'dv_stay_silent',
        text: 'Attempt to De-escalate Alone and Endure the Control in Silence',
        isCorrect: false,
        moralResilienceOutcome:
          'Enduring abuse in isolation drained your mental health and endangered your family. Personal adversity escalated until emergency hospital and police intervention occurred.',
        resilienceDelta: -25,
        financialDelta: -1200,
        safetyRating: 'dangerous',
        characterReflection: {
          archetype: 'The Silenced Peacemaker',
          isPositive: false,
          moralInsight: 'You hoped that appeasing an abuser would buy peace, confusing submission with conflict resolution.',
          tangibleConsequence: 'Your savings were depleted by the partner, your self-worth eroded, and physical safety was severely compromised.',
          teachableLesson: 'Abuse does not stop through silence or compliance. Boundaries and outside intervention are essential to preserve life.',
          redemptionOpportunity: 'Call 1-800-799-SAFE, seek confidential counseling at One Stop Center, and create an escape safety plan.',
        },
      },
    ],
  },

  // 2. Marriage & Estate Foundation
  {
    id: 'dilemma_marriage',
    category: 'marriage_partnership',
    title: 'Marriage, Faith & Legal Estate Foundation',
    situation:
      'You are preparing for marriage. Your partner suggests skipping formal legal discussions about debt, credit scores, and estate planning, arguing that "true love doesn’t need paperwork." However, you have worked hard to build real estate equity and want to ensure both families are protected under Michigan law.',
    counselorGuidance:
      '“In Better Forever (p. 52), Jeanell Land teaches that Wills, Trusts, and Life Insurance protect your loved ones from probate court. True love is having the courage to protect your partner’s future through transparent financial stewardship.”',
    options: [
      {
        id: 'marriage_transparent_trust',
        text: 'Establish Joint Pre-Marital Plan, Living Trust & Whole Life Policies',
        isCorrect: true,
        moralResilienceOutcome:
          'You hold loving, honest financial conversations, pull credit reports together, and establish a revocable living trust designating mutual beneficiaries. Your marriage begins on a rock-solid foundation.',
        resilienceDelta: 20,
        financialDelta: 2000,
        safetyRating: 'safe',
        unlockedResources: [
          {
            id: 'res_estate_planning_trust',
            title: 'Michigan Statutory Living Trust & Will Guidelines',
            agencyOrOrg: 'Michigan Dept of Financial & Insurance Services',
            url: 'https://www.michigan.gov/difs',
            category: 'Government & Taxes',
            whyItMatters: 'Protects assets from probate court, defines healthcare power of attorney, and preserves generational real estate wealth.',
            actionText: 'Review Living Trust & Will Guide',
          },
          {
            id: 'res_better_forever_marriage_budget',
            title: 'Better Forever Pre-Marital Financial Disclosure Checklist',
            agencyOrOrg: 'Jeanell Land Financial Education Series',
            url: 'https://onestoprehabilitationcenters.org',
            category: 'Business & Credit',
            whyItMatters: 'Pages 50–55 of Better Forever workbook: debt audit, credit alignment, and multi-generational wealth covenants.',
            actionText: 'Open Marriage Financial Workbook',
          },
        ],
        characterReflection: {
          archetype: 'The Generational Builder',
          isPositive: true,
          moralInsight: 'You recognized that romance without stewardship is reckless, choosing vulnerability and legal wisdom.',
          tangibleConsequence: 'Both partners enter the union with zero hidden debts, clear inheritance protections, and unified goals.',
          teachableLesson: 'Transparency in finance is an act of deep respect. Planning for the future honors the sacred covenant of marriage.',
        },
      },
      {
        id: 'marriage_avoid_conversation',
        text: 'Avoid Difficult Money Discussions to Prevent Relationship Friction',
        isCorrect: false,
        moralResilienceOutcome:
          'Hidden student loan debts and undisclosed high-interest credit card balances emerged within two years, causing deep stress and stalling your first home purchase.',
        resilienceDelta: -15,
        financialDelta: -2500,
        safetyRating: 'compromise',
        characterReflection: {
          archetype: 'The Avoidant Romantic',
          isPositive: false,
          moralInsight: 'You prioritized short-term harmony over long-term honesty, allowing fear of disagreement to bury critical facts.',
          tangibleConsequence: 'Your joint credit rating plunged, triggering mortgage loan rejections and persistent resentment.',
          teachableLesson: 'Unspoken assumptions become future crises. Real intimacy requires the maturity to discuss financial realities.',
          redemptionOpportunity: 'Commit to full financial disclosure today and schedule a free premarital counseling session.',
        },
      },
    ],
  },

  // 3. Drug Addiction & Burnout
  {
    id: 'dilemma_addiction',
    category: 'addiction_gambling',
    title: 'Navigating Burnout, Trauma & Substance Resistance',
    situation:
      'Working two jobs while studying aeronautical engineering and parenting brings you to the brink of physical exhaustion. Coworkers offer unprescribed stimulants and heavy alcohol to "numb the pressure, stay awake, and forget the stress."',
    counselorGuidance:
      '“Light University mental health coaching teaches that chemical crutches worsen trauma. Real healing comes from emotional coping mechanisms, honest prayer/meditation, and structured sleep.”',
    options: [
      {
        id: 'addiction_seek_health_counseling',
        text: 'Lean into Faith, Restorative Nutrition & Mental Health Coaching',
        isCorrect: true,
        moralResilienceOutcome:
          'You establish a strict 7–8 hour sleep routine (Better Forever p. 21 checklist), join a faith-based peer circle, and replace quick fixes with morning affirmations. Your mind remains razor sharp.',
        resilienceDelta: 25,
        financialDelta: 500,
        safetyRating: 'safe',
        unlockedResources: [
          {
            id: 'res_samhsa_helpline',
            title: 'SAMHSA National Substance & Mental Health Helpline',
            agencyOrOrg: 'Substance Abuse and Mental Health Services Admin',
            url: 'https://www.samhsa.gov/find-help/national-helpline',
            phone: '1-800-662-4357 (HELP) · 24/7 Free & Confidential',
            category: 'Emergency & Health',
            whyItMatters: 'Instant referrals to local treatment facilities, support groups, and community-based mental health professionals.',
            actionText: 'Connect with Mental Health Resources',
          },
          {
            id: 'res_light_university_coaching',
            title: 'Christian Trauma & Mental Health Recovery Framework',
            agencyOrOrg: 'Light University & One Stop Center Mentorship',
            url: 'https://www.lightuniversity.com',
            category: 'Faith & Mentorship',
            whyItMatters: 'Trauma-informed cognitive restructuring, stress management protocols, and certified faith-based life coaching.',
            actionText: 'Explore Trauma Recovery Protocols',
          },
        ],
        characterReflection: {
          archetype: 'The Resilient Sovereign',
          isPositive: true,
          moralInsight: 'You treated your mind and body as an irreplaceable temple rather than a disposable machine.',
          tangibleConsequence: 'Your cognitive faculties remained sharp for complex aerospace exams and engineering work.',
          teachableLesson: 'Endurance is built through intentional rest, disciplined nutrition, and honest community, not synthetic shortcuts.',
        },
      },
      {
        id: 'addiction_rely_on_stimulants',
        text: 'Accept the Chemical Quick Fix to Meet Work Deadlines',
        isCorrect: false,
        moralResilienceOutcome:
          'Tolerance built quickly, resulting in chronic anxiety, expensive pharmacy black-market bills, and a crash during an important engineering review.',
        resilienceDelta: -30,
        financialDelta: -1500,
        safetyRating: 'dangerous',
        characterReflection: {
          archetype: 'The Short-Circuit Striver',
          isPositive: false,
          moralInsight: 'You mortgaged your long-term physical and mental health for a momentary burst of artificial productivity.',
          tangibleConsequence: 'You developed dependence, suffered severe insomnia, and damaged your academic standing during final exams.',
          teachableLesson: 'A shortcut that destroys your health is never a shortcut to success. Sustainable ambition requires sobriety.',
          redemptionOpportunity: 'Call SAMHSA at 1-800-662-4357 and establish a natural recovery schedule.',
        },
      },
    ],
  },

  // 4. Gambling
  {
    id: 'dilemma_gambling',
    category: 'addiction_gambling',
    title: 'The Casino Mirage vs. True Generational Wealth',
    situation:
      'During a tough financial month where cash is tight, friends urge you to visit the Detroit casino, claiming they have a "guaranteed blackjack system" to turn $500 into $10,000 to solve your immediate bills. Better Forever (p. 29) cautions that mismanaged cash triggers scarcity behavior.',
    counselorGuidance:
      '“Cash is a tool to acquire income-producing assets. Gambling preys on the desperate by manufacturing illusions of quick wealth while draining mathematical equity.”',
    options: [
      {
        id: 'gambling_reject_trap',
        text: 'Reject the Gambling Illusion & Allocate $500 into Emergency Savings',
        isCorrect: true,
        moralResilienceOutcome:
          'You refuse to gamble your family’s security. Instead, you put the $500 into an interest-bearing account and pick up a weekend tax preparation client, earning $750 in honest, stress-free revenue.',
        resilienceDelta: 25,
        financialDelta: 1250,
        safetyRating: 'safe',
        unlockedResources: [
          {
            id: 'res_problem_gambling_helpline',
            title: 'Michigan Problem Gambling Helpline & Financial Counseling',
            agencyOrOrg: 'Michigan Dept of Health & Human Services',
            url: 'https://www.michigan.gov/mdhhs/keep-mi-healthy/mentalhealth/gambling',
            phone: '1-800-270-7117 (24/7 Confidential Helpline)',
            category: 'Emergency & Health',
            whyItMatters: 'Free gambling addiction treatment, debt restructuring resources, and family stabilization grants.',
            actionText: 'View Financial Recovery Resources',
          },
          {
            id: 'res_better_forever_cash_flow',
            title: 'Better Forever Emergency Fund & Income Multiplier Strategy',
            agencyOrOrg: 'Jeanell Land Financial Education',
            url: 'https://onestoprehabilitationcenters.org',
            category: 'Business & Credit',
            whyItMatters: 'Transforming $500 seed money into active side income through tax preparation, not high-stakes games.',
            actionText: 'Read Cash-Flow Acceleration Guide',
          },
        ],
        characterReflection: {
          archetype: 'The Disciplined Steward',
          isPositive: true,
          moralInsight: 'You understood the mathematical reality of probability and refused to gamble with your family’s dignity.',
          tangibleConsequence: 'Your emergency buffer protected you from unexpected car repairs without taking on high-interest debt.',
          teachableLesson: 'Generational wealth is constructed through steady compounding and verifiable skills, not random chance.',
        },
      },
      {
        id: 'gambling_chase_mirage',
        text: 'Wager the $500 in Hopes of a Fast Windfall',
        isCorrect: false,
        moralResilienceOutcome:
          'The house odds prevailed. Within two hours the $500 was lost, leaving you scrambling to pay rent and facing high-cost overdraft fees.',
        resilienceDelta: -20,
        financialDelta: -800,
        safetyRating: 'dangerous',
        characterReflection: {
          archetype: 'The Speculative Gambler',
          isPositive: false,
          moralInsight: 'Scarcity panic caused you to seek a miracle rather than doing the steady work of financial discipline.',
          tangibleConsequence: 'Rent was missed, incurring late penalties and damaging trust with your landlord.',
          teachableLesson: 'Casinos are engineered to extract wealth from hope. The only guaranteed winning system is investing in your own abilities.',
          redemptionOpportunity: 'Set a strict zero-gambling boundary, join an accountability group, and track every dollar.',
        },
      },
    ],
  },

  // 5. Relationships & Social Circle
  {
    id: 'dilemma_relationships',
    category: 'relationships',
    title: 'Social Circle Audit: Negative Peer Pull vs. Uplifting Mentors',
    situation:
      'As your career and real estate ventures begin to flourish, old acquaintances from the neighborhood accuse you of "acting brand new" and pressuring you to co-sign high-risk car loans, lend money without repayment contracts, and spend weekends partying rather than studying for state licensing exams.',
    counselorGuidance:
      '“In Better Forever (p. 18), Jeanell writes: ‘Show me your five closest friends, and I will show you your next five years.’ Surrounding yourself with ambitious, ethical peers is essential to protect your community legacy.”',
    options: [
      {
        id: 'rel_boundary_mentor_circle',
        text: 'Set Firm Financial Boundaries & Cultivate an Ambitious Mentorship Circle',
        isCorrect: true,
        moralResilienceOutcome:
          'You lovingly decline co-signing, explain your principles of stewardship, and invest your energy into professional networks, church leadership, and youth mentoring. Your network becomes your net worth.',
        resilienceDelta: 20,
        financialDelta: 1500,
        safetyRating: 'safe',
        unlockedResources: [
          {
            id: 'res_aiaa_mentorship_network',
            title: 'AIAA Aerospace Professional & Student Mentorship Network',
            agencyOrOrg: 'American Institute of Aeronautics and Astronautics',
            url: 'https://www.aiaa.org',
            category: 'Education & Grants',
            whyItMatters: 'Connects minority engineering students with senior propulsion and flight control directors.',
            actionText: 'Join Aerospace Mentorship Network',
          },
          {
            id: 'res_better_forever_boundaries',
            title: 'Better Forever Personal Boundary & Association Audit Tool',
            agencyOrOrg: 'One Stop Rehabilitation Center 501(c)(3)',
            url: 'https://onestoprehabilitationcenters.org',
            category: 'Faith & Mentorship',
            whyItMatters: 'Framework for saying "no" with grace and evaluating whether relationships promote mutual growth.',
            actionText: 'Download Association Audit Sheet',
          },
        ],
        characterReflection: {
          archetype: 'The Purpose-Driven Leader',
          isPositive: true,
          moralInsight: 'You recognized that true love does not enable dependency or reckless financial behavior.',
          tangibleConsequence: 'You avoided credit-destroying co-signing defaults and gained mentors who opened doors to commercial contracts.',
          teachableLesson: 'You cannot pull someone up if they are determined to drag you down. Elevate yourself so you can lift others with strength.',
        },
      },
      {
        id: 'rel_cave_to_guilt',
        text: 'Co-Sign the High-Risk Loan and Abandon Your Exam Prep out of Guilt',
        isCorrect: false,
        moralResilienceOutcome:
          'The acquaintance stopped making payments in month 4. Repossession agents targeted your bank accounts, and your credit score plunged by 140 points, forcing you to delay your broker exam.',
        resilienceDelta: -25,
        financialDelta: -3800,
        safetyRating: 'dangerous',
        characterReflection: {
          archetype: 'The Guilt-Bound People Pleaser',
          isPositive: false,
          moralInsight: 'You valued avoiding conflict and seeking temporary approval over your fiduciary duty to your own future.',
          tangibleConsequence: 'You inherited someone else’s debt, wrecked your credit rating, and delayed your professional license.',
          teachableLesson: 'Co-signing is assuming 100% of the risk with 0% of the control. Never sign what you cannot afford to gift outright.',
          redemptionOpportunity: 'Order your free credit report, dispute unauthorized charges, and enroll in a credit repair plan.',
        },
      },
    ],
  },

  // 6. Religion, Faith & Spiritual Ethics
  {
    id: 'dilemma_religion',
    category: 'faith_resilience',
    title: 'Spiritual Ethics in Business: Corrupt Kickbacks vs. Faithful Integrity',
    situation:
      'A wealthy real estate developer offers you a $25,000 cash "consulting fee" to sign off on false property assessment papers that would displace low-income families from a historic Detroit neighborhood. They whisper: "Nobody will ever know, and God wants you to be prosperous, right?"',
    counselorGuidance:
      '“Proverbs 28:6: ‘Better is a poor man who walks in his integrity than a rich man who is crooked in his ways.’ In Better Forever, Jeanell emphasizes that genuine prosperity has clean hands and honors our Creator through justice.”',
    options: [
      {
        id: 'faith_refuse_corruption',
        text: 'Stand on Spiritual Values: Refuse the Kickback & Protect the Community',
        isCorrect: true,
        moralResilienceOutcome:
          'You firmly reject the illicit offer and report the predatory scheme to the Detroit Fair Housing Commission. Your reputation as an incorruptible broker leads the City to award One Stop Center a $150,000 neighborhood development grant!',
        resilienceDelta: 35,
        financialDelta: 5000,
        safetyRating: 'safe',
        unlockedResources: [
          {
            id: 'res_fair_housing_center',
            title: 'Fair Housing Center of Metropolitan Detroit',
            agencyOrOrg: 'Fair Housing Center & US Dept of HUD',
            url: 'https://www.hud.gov/fairhousing',
            phone: '(313) 963-1274 · Detroit Regional Office',
            category: 'Government & Taxes',
            whyItMatters: 'Enforces equitable housing ordinances, investigates discriminatory zoning, and protects historic tenant rights.',
            actionText: 'Report Housing Violations',
          },
          {
            id: 'res_christian_business_fellowship',
            title: 'Marketplace Ethics & Faith-Based Leadership Coalition',
            agencyOrOrg: 'Christian Real Estate Alliance & One Stop Center',
            url: 'https://onestoprehabilitationcenters.org',
            category: 'Faith & Mentorship',
            whyItMatters: 'Ethical standards for business leaders, conflict-of-interest defense, and community re-investment principles.',
            actionText: 'View Marketplace Ethics Charter',
          },
        ],
        characterReflection: {
          archetype: 'The Incorruptible Watchman',
          isPositive: true,
          moralInsight: 'You recognized that divine blessings cannot be bought through dishonesty or the exploitation of the vulnerable.',
          tangibleConsequence: 'Your moral stature earned the lasting trust of civic leaders, unlocking major municipal revitalization grants.',
          teachableLesson: 'A good name is rather to be chosen than great riches. Integrity under fire is the ultimate mark of character.',
        },
      },
      {
        id: 'faith_accept_bribe',
        text: 'Rationalize the Deal, Take the $25,000, and Sign the False Papers',
        isCorrect: false,
        moralResilienceOutcome:
          'The state attorney general launched a grand jury investigation into the fraudulent assessments. Your name was published in city newspapers, your real estate license was suspended, and community trust was shattered.',
        resilienceDelta: -40,
        financialDelta: -10000,
        safetyRating: 'dangerous',
        characterReflection: {
          archetype: 'The Compromised Opportunist',
          isPositive: false,
          moralInsight: 'You traded your soul and moral compass for quick cash, rationalizing corruption under the guise of necessity.',
          tangibleConsequence: 'Your professional license was suspended, legal defense fees consumed the money, and your name was tarnished.',
          teachableLesson: 'The money acquired through dishonesty always extracts a price ten times higher than its value. There are no secret sins.',
          redemptionOpportunity: 'Cooperate fully with regulatory authorities, make restitution, and commit to restorative community service.',
        },
      },
    ],
  },
];

export const AdultLifeMatrix: React.FC<AdultLifeMatrixProps> = ({
  userAge,
  isBiometricallyVerified,
  onOpenBiometrics,
  playerStats,
  onUpdateStats,
  unlockedResourceIds = [],
  onUnlockResource,
}) => {
  const [selectedDilemmaId, setSelectedDilemmaId] = useState<string>('dilemma_dv');
  const [completedChoices, setCompletedChoices] = useState<Record<string, string>>({});
  const [selectedOption, setSelectedOption] = useState<AdultDilemmaNode['options'][0] | null>(null);
  const [activeTab, setActiveTab] = useState<'matrix' | 'resource_binder'>('matrix');
  const [restoredDilemmaIds, setRestoredDilemmaIds] = useState<string[]>([]);
  const [showReflectionModal, setShowReflectionModal] = useState<boolean>(false);

  const currentDilemma = ADULT_DILEMMAS.find((d) => d.id === selectedDilemmaId) || ADULT_DILEMMAS[0];

  const handleChoose = (opt: AdultDilemmaNode['options'][0]) => {
    sound.playClick();
    setSelectedOption(opt);
    setCompletedChoices((prev) => ({
      ...prev,
      [currentDilemma.id]: opt.id,
    }));

    onUpdateStats({
      resilience: opt.resilienceDelta,
      financialAcumen: Math.round(opt.financialDelta / 50),
      earningsBalance: opt.financialDelta,
    });

    if (opt.isCorrect) {
      sound.playSuccess();
      if (opt.unlockedResources && onUnlockResource) {
        opt.unlockedResources.forEach((r) => onUnlockResource(r));
      }
    } else {
      sound.playAlert();
    }
  };

  const handleRestorativeAction = () => {
    sound.playSuccess();
    setRestoredDilemmaIds((prev) => [...prev, currentDilemma.id]);
    onUpdateStats({
      resilience: 15,
      kindnessPoints: 10,
    });
  };

  // Collect all currently unlocked resources across all completed choices
  const allUnlockedResources: UnlockedResource[] = [];
  ADULT_DILEMMAS.forEach((d) => {
    const choiceId = completedChoices[d.id];
    if (choiceId) {
      const opt = d.options.find((o) => o.id === choiceId);
      if (opt?.isCorrect && opt.unlockedResources) {
        allUnlockedResources.push(...opt.unlockedResources);
      }
    }
  });

  // Age Gate Check (Age 17+)
  if (userAge < 17) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center max-w-xl mx-auto space-y-4">
        <div className="w-14 h-14 rounded-full bg-slate-800 border border-amber-500/40 flex items-center justify-center mx-auto text-amber-400">
          <Lock className="w-7 h-7" />
        </div>
        <h3 className="text-lg font-bold text-white">Adult Real-World Life Matrix Locked</h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          The Adult Life Decision Matrix explores mature challenges—such as marriage contracts, domestic violence escape strategies, substance addiction prevention, gambling resistance, relationships, and spiritual ethics.
          This module is designed exclusively for players <strong>Ages 17 and older</strong>.
        </p>
        <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-400">
          Current Registered Age: <strong className="text-cyan-400">{userAge} Years Old</strong>.
          Parents can manage age permissions in the Parental Portal.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-400">
            <Scale className="w-4 h-4" />
            <span>ADULT 17+ REAL-WORLD DECISION MATRIX &amp; ETHICS FORUM</span>
          </div>
          <h2 className="text-2xl font-bold text-white mt-1">
            Personal Adversity, Ethics &amp; Character Reflection
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Real adult challenges: Marriage, domestic violence escape, addiction prevention, gambling, toxic relationships, and spiritual ethics.
            Correct decisions unlock verified resources; incorrect decisions trigger character reflections and consequences.
          </p>
        </div>

        {/* Biometrics & View Mode Tabs */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('matrix');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'matrix'
                ? 'bg-rose-950/80 border border-rose-500/60 text-rose-200'
                : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Decision Matrix
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('resource_binder');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              activeTab === 'resource_binder'
                ? 'bg-cyan-950/80 border border-cyan-500/60 text-cyan-200'
                : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <FolderLock className="w-3.5 h-3.5 text-cyan-400" />
            <span>Unlocked Resources ({allUnlockedResources.length})</span>
          </button>

          {isBiometricallyVerified ? (
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/70 border border-emerald-500/50 text-xs text-emerald-300 font-mono">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Face Biometrics OK</span>
            </div>
          ) : (
            <button
              onClick={onOpenBiometrics}
              className="px-3 py-1.5 rounded-lg bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/50 text-xs text-cyan-200 font-semibold transition-colors shadow-sm"
            >
              <span>Scan Face</span>
            </button>
          )}
        </div>
      </div>

      {activeTab === 'resource_binder' ? (
        /* Unlocked Resources Binder View */
        <div className="space-y-6">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <FolderLock className="w-4 h-4 text-cyan-400" />
                <span>Verified Resource Binder (Unlocked via Correct Decisions)</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Each time you choose the ethical, high-resilience path, real-world verified hotlines, toolkits, and assistance programs are permanently unlocked.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('matrix')}
              className="text-xs font-bold text-cyan-400 hover:underline"
            >
              ← Back to Dilemmas
            </button>
          </div>

          {allUnlockedResources.length === 0 ? (
            <div className="p-8 text-center bg-slate-950 rounded-xl border border-slate-800 text-slate-400 space-y-2">
              <Info className="w-8 h-8 mx-auto text-slate-500" />
              <p className="text-xs">No resources unlocked yet. Complete any ethical decision in the Matrix to unlock links!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {allUnlockedResources.map((res) => (
                <div
                  key={res.id}
                  className="bg-slate-950 p-4 rounded-xl border border-cyan-500/40 space-y-3 hover:border-cyan-400 transition-colors shadow-md"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/70 px-2 py-0.5 rounded border border-cyan-600/40 uppercase">
                      {res.category}
                    </span>
                    {res.phone && (
                      <span className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-1">
                        <PhoneCall className="w-3.5 h-3.5" />
                        {res.phone}
                      </span>
                    )}
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-white">{res.title}</h4>
                    <span className="text-xs text-slate-400 block">{res.agencyOrOrg}</span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">{res.whyItMatters}</p>

                  <a
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-cyan-600/90 hover:bg-cyan-500 text-white text-xs font-semibold rounded-lg transition-colors"
                  >
                    <span>{res.actionText}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Main Matrix View */
        <div className="space-y-6">
          {/* Dilemma Selector Tabs (All 6 Adult Life Domains) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {ADULT_DILEMMAS.map((d) => {
              const isSelected = selectedDilemmaId === d.id;
              const completedChoiceId = completedChoices[d.id];
              const completedOpt = completedChoiceId
                ? d.options.find((o) => o.id === completedChoiceId)
                : null;
              const isSafe = completedOpt?.isCorrect;

              return (
                <button
                  key={d.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedDilemmaId(d.id);
                    const existingOpt = completedChoiceId
                      ? d.options.find((o) => o.id === completedChoiceId) || null
                      : null;
                    setSelectedOption(existingOpt);
                  }}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    isSelected
                      ? 'bg-rose-950/70 border-rose-500 text-white shadow-lg shadow-rose-950/40'
                      : completedChoiceId
                      ? isSafe
                        ? 'bg-slate-950 border-emerald-600/50 text-emerald-300'
                        : 'bg-slate-950 border-red-600/50 text-red-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="text-[10px] font-mono uppercase text-slate-500">
                    {d.category.replace('_', ' ')}
                  </div>
                  <div className="text-xs font-bold mt-1 line-clamp-1">{d.title}</div>
                </button>
              );
            })}
          </div>

          {/* Active Dilemma Card */}
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-rose-400 uppercase tracking-wider mb-1">
                <span>SCENARIO CATEGORY:</span>
                <span className="font-bold text-white">{currentDilemma.category.replace('_', ' ')}</span>
              </div>
              <h3 className="text-xl font-bold text-white">{currentDilemma.title}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-2.5">
                {currentDilemma.situation}
              </p>
            </div>

            {/* Counselor Guidance Box */}
            <div className="p-4 bg-slate-900/90 rounded-xl border border-amber-500/30 text-xs sm:text-sm text-amber-200/90 italic leading-relaxed">
              <span className="font-bold not-italic text-amber-300 block mb-1 text-xs">
                JEANELL LAND &amp; TRAUMA COACH GUIDANCE:
              </span>
              {currentDilemma.counselorGuidance}
            </div>

            {/* Decision Choices */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold text-slate-200 uppercase tracking-wider block">
                CHOOSE YOUR ADULT LIFE ACTION:
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentDilemma.options.map((opt) => {
                  const isSelected = completedChoices[currentDilemma.id] === opt.id;
                  const isSafe = opt.isCorrect;

                  return (
                    <div
                      key={opt.id}
                      onClick={() => handleChoose(opt)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? isSafe
                            ? 'bg-slate-900 border-emerald-400 ring-1 ring-emerald-500 shadow-lg'
                            : 'bg-slate-900 border-red-500 ring-1 ring-red-500 shadow-lg'
                          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="text-xs sm:text-sm font-bold text-white leading-snug">
                          {opt.text}
                        </span>
                        {isSelected && (
                          <CheckCircle2
                            className={`w-4 h-4 shrink-0 ${
                              isSafe ? 'text-emerald-400' : 'text-red-400'
                            }`}
                          />
                        )}
                      </div>

                      <div className="flex items-center gap-3 text-[11px] font-mono mt-3">
                        <span className={opt.resilienceDelta >= 0 ? 'text-rose-400 font-bold' : 'text-red-400 font-bold'}>
                          {opt.resilienceDelta >= 0 ? '+' : ''}
                          {opt.resilienceDelta} Resilience
                        </span>
                        <span className={opt.financialDelta >= 0 ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
                          {opt.financialDelta >= 0 ? '+' : ''}${opt.financialDelta}
                        </span>
                        <span
                          className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${
                            isSafe
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-600'
                              : 'bg-red-950 text-red-400 border border-red-600'
                          }`}
                        >
                          {isSafe ? 'Ethical & Safe' : 'Harmful Consequence'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RESULTS SECTION: Correct Unlocked Resources OR Incorrect Character Reflection */}
            {selectedOption && (
              <div className="space-y-4 pt-4 border-t border-slate-800 animate-in fade-in">
                {/* Immediate Outcome Narrative */}
                <div
                  className={`p-4 rounded-xl border text-xs sm:text-sm leading-relaxed ${
                    selectedOption.isCorrect
                      ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-200'
                      : 'bg-red-950/30 border-red-500/50 text-red-200'
                  }`}
                >
                  <span className="font-bold block mb-1">
                    {selectedOption.isCorrect ? '✅ Moral Victory & Outcome:' : '⚠️ Consequence of Choice:'}
                  </span>
                  <p>{selectedOption.moralResilienceOutcome}</p>
                </div>

                {/* IF CORRECT DECISION: Render Unlocked Resources */}
                {selectedOption.isCorrect && selectedOption.unlockedResources && (
                  <div className="bg-slate-900 p-5 rounded-xl border border-cyan-500/40 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                        <FolderLock className="w-4 h-4 text-cyan-400" />
                        <span>UNLOCKED VERIFIED RESOURCES &amp; CRISIS DIRECTORY</span>
                      </span>
                      <span className="text-[11px] font-mono text-emerald-400">
                        Saved to Your Resource Binder
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      {selectedOption.unlockedResources.map((res) => (
                        <div
                          key={res.id}
                          className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 space-y-2 hover:border-cyan-500/50 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950 px-1.5 py-0.5 rounded">
                              {res.category}
                            </span>
                            {res.phone && (
                              <span className="text-xs font-mono text-emerald-400 font-bold">
                                {res.phone}
                              </span>
                            )}
                          </div>
                          <h5 className="text-xs font-bold text-white">{res.title}</h5>
                          <p className="text-[11px] text-slate-300 leading-normal">{res.whyItMatters}</p>
                          <a
                            href={res.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 mt-1"
                          >
                            <span>{res.actionText}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* IF INCORRECT DECISION: Render Character Mirror & Reflection */}
                {!selectedOption.isCorrect && selectedOption.characterReflection && (
                  <div className="bg-slate-900 p-5 rounded-xl border border-red-500/40 space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <div className="flex items-center gap-2 text-red-400">
                        <Scale className="w-5 h-5" />
                        <span className="text-xs font-bold uppercase tracking-wider">
                          THE CHARACTER MIRROR: WHAT THIS CHOICE REVEALS ABOUT YOU
                        </span>
                      </div>
                      <span className="text-xs font-mono text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-600/40">
                        Archetype: {selectedOption.characterReflection.archetype}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800">
                        <span className="text-slate-400 font-bold block mb-1">
                          Inner Motive &amp; Moral Insight:
                        </span>
                        <p className="text-slate-300 leading-relaxed">
                          {selectedOption.characterReflection.moralInsight}
                        </p>
                      </div>

                      <div className="bg-slate-950 p-3.5 rounded-lg border border-red-950">
                        <span className="text-red-400 font-bold block mb-1">
                          Tangible Consequence to Life &amp; Family:
                        </span>
                        <p className="text-slate-300 leading-relaxed">
                          {selectedOption.characterReflection.tangibleConsequence}
                        </p>
                      </div>
                    </div>

                    <div className="p-3.5 bg-slate-950 rounded-lg border border-amber-500/30 text-xs text-amber-200 space-y-1">
                      <span className="font-bold text-amber-400 block">
                        Jeanell Land’s Wisdom on Restoring Character:
                      </span>
                      <p className="leading-relaxed">
                        {selectedOption.characterReflection.teachableLesson}
                      </p>
                    </div>

                    {/* Restorative Action / Rebound Pledge */}
                    {selectedOption.characterReflection.redemptionOpportunity && (
                      <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                        <div className="text-xs text-slate-400 max-w-md">
                          <strong className="text-slate-200">Redemption Opportunity:</strong>{' '}
                          {selectedOption.characterReflection.redemptionOpportunity}
                        </div>

                        {restoredDilemmaIds.includes(currentDilemma.id) ? (
                          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950 border border-emerald-500/50 text-xs text-emerald-300 font-semibold">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Character Reflection Acknowledged (+15 Grit Restored)</span>
                          </div>
                        ) : (
                          <button
                            onClick={handleRestorativeAction}
                            className="flex items-center gap-1.5 px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-lg transition-colors shadow-sm"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                            <span>Reflect &amp; Rebound (+15 Resilience)</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
