import { StoryStep } from '../types/game';

export const STORY_STEPS: StoryStep[] = [
  // ACT 0: High School Character Crucible (Springfield High School 1992)
  {
    id: 'act0_high_school_crossroads',
    actNumber: 0,
    actTitle: 'Act 0: High School Character Crucible',
    yearRange: '1992',
    sceneTitle: 'The Cafeteria Crucible: Popular Clout vs. Moral Courage',
    location: 'Springfield High School · Hallway & Cafeteria',
    summary:
      'In high school, Jeanell faced the universal pressure to conform. At lunch, the "popular crowd" began viciously teasing Marcus Vance—a quiet classmate obsessed with flight mechanics and computing—and Kendra Barnes, whose family was enduring severe financial hardship. The group pressured Jeanell to join in the mocking for instant "cool points".',
    juniorSummary:
      'At school, some classmates were being unkind to Marcus and Kendra because of their clothes and hobbies. The popular kids told Jeanell to laugh along with them. Jeanell had to decide: be kind and brave, or be mean just to fit in?',
    historicalContext:
      'Psychological studies show that early adolescent choices regarding bullying leave lasting neurological and reputational impacts. Empathy and moral courage early in life forge high emotional resilience and enduring lifelong networks.',
    challengeQuote:
      '“Popularity fades with the ringing of the last school bell. What remains forever is the character you demonstrated when someone needed an ally.”',
    choices: [
      {
        id: 'hs_choice_stand_up_ally',
        label: 'Stand Up with Moral Courage & Defend Marcus and Kendra',
        description:
          'Publicly reject the bullies, sit down with Marcus and Kendra, and invite them to form a weekend science and math study circle.',
        isCorrect: true,
        statImpact: { resilience: 25, kindnessPoints: 30, coolPoints: -15, steamMastery: 10 },
        coolPointsGain: -15,
        kindnessGain: 30,
        affectsClassmate: { characterId: 'marcus', newStatus: 'ally' },
        historicalOutcome:
          'The popular kids whispered, but you stood tall with unwavering self-respect. Marcus and Kendra never forgot the girl who defended their dignity when nobody else did. Your Resilience increased significantly!',
        nextStepId: 'act1_origins',
        unlockedResources: [
          {
            id: 'res_pacer_bullying_prevention',
            title: 'National Bullying Prevention Center & Youth Ally Guide',
            agencyOrOrg: 'PACER’s National Bullying Prevention Center',
            url: 'https://www.pacer.org/bullying',
            phone: '1-888-248-0822',
            category: 'Education & Grants',
            whyItMatters: 'Equips students with actionable scripts to safely intervene, support bullied peers, and foster school inclusion.',
            actionText: 'Access Student Ally Toolkit',
          },
          {
            id: 'res_detroit_stem_mentorship',
            title: 'Detroit Youth S.T.E.A.M. & Peer Mentorship Network',
            agencyOrOrg: 'One Stop Rehabilitation Center 501(c)(3)',
            url: 'https://onestoprehabilitationcenters.org',
            category: 'Faith & Mentorship',
            whyItMatters: 'Free peer-led science circles and coding workshops designed to empower urban youth.',
            actionText: 'Explore Youth S.T.E.A.M. Programs',
          },
        ],
        characterReflection: {
          archetype: 'The Upstander & Protector',
          isPositive: true,
          moralInsight: 'You valued human dignity and loyalty over fleeting hallway popularity.',
          tangibleConsequence: 'You earned the lifelong loyalty of two brilliant minds: Marcus (future Chief Avionics Architect) and Kendra (future Bank Vice President).',
          teachableLesson: 'True leadership is choosing what is right over what is easy. The allies you defend in youth become your greatest partners in adulthood.',
        },
      },
      {
        id: 'hs_choice_bully_for_clout',
        label: 'Join the Popular Crowd & Mock Them for Cool Points',
        description:
          'Laugh along, repeat a cruel joke, and sit at the "cool table" to secure immediate social status and popularity.',
        isCorrect: false,
        statImpact: { resilience: -20, coolPoints: 35, kindnessPoints: -30, communityLegacy: -15 },
        coolPointsGain: 35,
        kindnessGain: -30,
        affectsClassmate: { characterId: 'marcus', newStatus: 'bullied' },
        historicalOutcome:
          'You won shallow cheers from the popular crowd, but a gnawing guilt hollowed out your self-esteem. Marcus and Kendra looked at you with broken eyes. Your Resilience dropped by 20—and life has a long memory.',
        nextStepId: 'act1_origins',
        characterReflection: {
          archetype: 'The Clout Chaser',
          isPositive: false,
          moralInsight: 'You sacrificed your own empathy and an innocent person’s dignity to purchase temporary approval from bullies.',
          tangibleConsequence: 'You permanently severed trust with Marcus and Kendra. Decades later, when you need engineering bids and commercial loans, your past cruelty returns as closed doors and rejected proposals.',
          teachableLesson: 'The classmate you mock today might be the hiring director, commercial loan officer, or aerospace architect you need tomorrow. Kindness is both moral and strategic.',
          redemptionOpportunity: 'Commit to rebuilding your moral compass, apologizing for past harm, and never joining peer cruelty again.',
        },
      },
      {
        id: 'hs_choice_passive_bystander',
        label: 'Stay Silent & Slip Marcus a Quiet Apology Later',
        description:
          'Don’t participate in the bullying, but avoid taking a public stand to keep your head down.',
        isCorrect: true,
        statImpact: { resilience: 5, kindnessPoints: 10, coolPoints: 0 },
        coolPointsGain: 0,
        kindnessGain: 10,
        affectsClassmate: { characterId: 'marcus', newStatus: 'neutral' },
        historicalOutcome:
          'You preserved your quiet bubble, but missed the opportunity to forge a deep bond of loyalty. Your conscience is clean, though untested.',
        nextStepId: 'act1_origins',
      },
    ],
  },

  // ACT I: Early Motherhood & Foundational Science
  {
    id: 'act1_origins',
    actNumber: 1,
    actTitle: 'Act I: The Lift-Off of Resilience',
    yearRange: '1992 – 1998',
    sceneTitle: 'Calculus, Diapers, and Midnight Fluid Dynamics',
    location: 'Detroit, Michigan · East Side Neighborhood',
    summary:
      'As a young mother facing immense financial scarcity in 1990s Detroit, Jeanell refused to let statistics define her destiny. While working student jobs and feeding her infant daughter, she devoured advanced fluid mechanics textbooks by the glow of a desk lamp, fascinated by how curved airfoils conquer gravity through pressure differentials.',
    juniorSummary:
      'Jeanell became a mom at a young age. Even though times were tough and money was tight, she loved learning about airplanes and science. She studied late into the night while her baby slept, proving that determination can overcome any obstacle.',
    historicalContext:
      'In the mid-1990s, young mothers faced steep societal stigmas and lack of childcare infrastructure. Jeanell enrolled in college work-study programs while methodically mastering vector calculus and aeronautical theory.',
    challengeQuote:
      '“Lift isn’t just an aerodynamic force. It’s what happens when your internal resilience exerts more upward force than the weight of external doubt.”',
    choices: [
      {
        id: 'choice_windtunnel_mastery',
        label: 'Calibrate Airfoil in Virtual Wind Tunnel',
        description:
          'Dedicate late nights to mastering Navier-Stokes pressure gradients and wing camber geometry to ace the aeronautical engineering practical exam.',
        isCorrect: true,
        statImpact: { resilience: 20, steamMastery: 25 },
        historicalOutcome:
          'Your precise calculations on angle of attack impressed the engineering faculty, proving that high maternal dedication fuels intellectual precision.',
        nextStepId: 'act1_census_workstudy',
        triggerLab: 'aero',
        unlockedResources: [
          {
            id: 'res_nasa_stem_gateway',
            title: 'NASA STEM Engagement & Aeronautics Learning Modules',
            agencyOrOrg: 'NASA Aeronautics Research Mission Directorate',
            url: 'https://www.nasa.gov/learning-resources/nasa-stem-gateway',
            category: 'Education & Grants',
            whyItMatters: 'Free aeronautical physics simulations, wind tunnel guides, and college aerospace internships.',
            actionText: 'Explore NASA Aero Curriculum',
          },
        ],
      },
      {
        id: 'choice_community_study_circle',
        label: 'Organize Detroit Women STEM Study Circle',
        description:
          'Form an informal neighborhood study co-op with fellow young mothers, sharing childcare shifts while solving differential equations together.',
        isCorrect: true,
        statImpact: { resilience: 15, communityLegacy: 20, steamMastery: 15, kindnessPoints: 15 },
        historicalOutcome:
          'The study circle provided mutual survival and academic excellence, laying the early groundwork for community collaboration.',
        nextStepId: 'act1_census_workstudy',
      },
      {
        id: 'choice_high_resilience_breakthrough',
        label: '[High Resilience 60+] Pioneer Dual-Camber Rotor Blade Thesis',
        description:
          'Channel your unmatched resilience to author a groundbreaking student paper on high-efficiency camber for urban search-and-rescue helicopters.',
        minResilienceRequired: 60,
        isCorrect: true,
        statImpact: { resilience: 25, steamMastery: 35, communityLegacy: 15 },
        historicalOutcome:
          'Your exceptional focus unlocked an academic commendation and caught the eye of university aerospace research heads!',
        nextStepId: 'act1_census_workstudy',
        triggerLab: 'aero',
      },
    ],
  },

  {
    id: 'act1_census_workstudy',
    actNumber: 1,
    actTitle: 'Act I: The Lift-Off of Resilience',
    yearRange: '1997 – 1998',
    sceneTitle: 'Census Crew Leadership & Statistical Rigor',
    location: 'Detroit Metro & U.S. Census Field Operations',
    summary:
      'To fund her engineering studies and provide for her child, Jeanell joined Atwater Entertainment as a Data Collector and advanced to Crew Leader with the U.S. Census Bureau. She directed field teams across Detroit, auditing complex data charts and recognizing how systemic undercounting deprived working neighborhoods of vital federal infrastructure.',
    juniorSummary:
      'Jeanell got a job leading teams for the U.S. Census, counting families all across Detroit so schools and libraries would get the books and computers they deserved. She was super organized and honest.',
    historicalContext:
      'Accurate municipal data directly influences federal STEM education grants, highway engineering budgets, and public health facilities.',
    challengeQuote:
      '“Numbers tell the truth if you have the courage to audit every row. In rocketry or demographic counts, one missing variable skews the entire trajectory.”',
    choices: [
      {
        id: 'choice_audit_accuracy',
        label: 'Enforce Rigorous Statistical Auditing',
        description:
          'Implement a rigorous cross-verification system for census tracts, ensuring zero undercounts in historically marginalized zip codes.',
        isCorrect: true,
        statImpact: { steamMastery: 20, financialAcumen: 15, communityLegacy: 15, resilience: 10 },
        historicalOutcome:
          'Your team achieved a 99.4% verification rate, unlocking essential federal allocations for Detroit school laboratories and public libraries.',
        nextStepId: 'act2_propulsion_lab',
        unlockedResources: [
          {
            id: 'res_census_bureau_data',
            title: 'U.S. Census Bureau Demographic & Economic Tools',
            agencyOrOrg: 'U.S. Census Bureau',
            url: 'https://data.census.gov',
            category: 'Government & Taxes',
            whyItMatters: 'Learn how demographic data drives municipal infrastructure investment and federal grant allocation.',
            actionText: 'View Census Data Explorer',
          },
        ],
      },
      {
        id: 'choice_workstudy_business_integration',
        label: 'Synthesize Engineering Math with Business Accounting',
        description:
          'Apply analytical calculus to personal cash-flow forecasting at Jordan College, mastering how capital and momentum obey similar physical laws.',
        isCorrect: true,
        statImpact: { financialAcumen: 25, resilience: 15 },
        historicalOutcome:
          'You built a personal balance sheet that eliminated high-interest debt, proving that financial literacy is an engineer’s sharpest defensive shield.',
        nextStepId: 'act2_propulsion_lab',
      },
    ],
  },

  // ACT II: Aerospace Systems & High School Relationship Payoff
  {
    id: 'act2_propulsion_lab',
    actNumber: 2,
    actTitle: 'Act II: Supersonic Trajectory & Systems Design',
    yearRange: '1998 – 2004',
    sceneTitle: 'The Propulsion Lab & Tsiolkovsky’s Challenge',
    location: 'Aerospace Engineering Systems Facility',
    summary:
      'Stepping into advanced aerospace research, Jeanell faced the dual barrier of being often the only Black woman in technical design reviews. Assigned to suborbital propulsion simulations, she tackled rocket nozzle thrust vectoring and the brutal payload-to-fuel mass fractions governed by Tsiolkovsky’s rocket equation.',
    juniorSummary:
      'Jeanell worked in a rocket lab! Building rockets is hard because fuel is heavy and gravity pulls down. She had to solve equations so the rocket could reach space without shaking the scientific cameras inside.',
    historicalContext:
      'African American women comprised less than 3% of aerospace engineers in the early 2000s. Technical brilliance was mandatory to withstand institutional skepticism.',
    challengeQuote:
      '“Every gram of payload launched into space requires kilograms of fuel. In life, whatever dead weight you carry drains your escape velocity.”',
    choices: [
      {
        id: 'choice_solve_propulsion_puzzle',
        label: 'Optimize Thrust-to-Weight Ratio in Orbital Lab',
        description:
          'Engineer a multistage burn profile balancing structural G-forces and specific impulse to deliver sensitive atmospheric sensors to Low Earth Orbit.',
        isCorrect: true,
        statImpact: { steamMastery: 30, resilience: 20 },
        historicalOutcome:
          'Your simulation exceeded target delta-v by 14% while reducing payload vibration fatigue, silencing every critic in the hangar.',
        nextStepId: 'act2_avionics_contract_meeting',
        triggerLab: 'propulsion',
        unlockedResources: [
          {
            id: 'res_aiaa_propulsion_standards',
            title: 'AIAA Aerospace Standards & Rocket Dynamics Handbook',
            agencyOrOrg: 'American Institute of Aeronautics and Astronautics',
            url: 'https://www.aiaa.org',
            category: 'Education & Grants',
            whyItMatters: 'Comprehensive technical guidelines for specific impulse calculation, nozzle geometries, and staging physics.',
            actionText: 'View AIAA Technical Library',
          },
        ],
      },
      {
        id: 'choice_aerospace_mentorship',
        label: 'Mentor Detroit High School Apprentices',
        description:
          'Open the laboratory doors on weekends to host live rocketry demos for Detroit inner-city high school girls.',
        isCorrect: true,
        statImpact: { communityLegacy: 30, steamMastery: 15, resilience: 15, kindnessPoints: 20 },
        historicalOutcome:
          'Four of your mentees enrolled in mechanical and aerospace engineering programs, establishing an unbroken lineage of empowerment.',
        nextStepId: 'act2_avionics_contract_meeting',
      },
    ],
  },

  // KEY PAYOFF SCENE FOR MARCUS VANCE:
  {
    id: 'act2_avionics_contract_meeting',
    actNumber: 2,
    actTitle: 'Act II: Supersonic Trajectory & Systems Design',
    yearRange: '2002',
    sceneTitle: 'The Aerospace Boardroom: An Encounter with the Past',
    location: 'Midwest Aerospace Defense & Avionics Hangar',
    summary:
      'Jeanell enters a high-stakes competitive presentation for a major regional telemetry and guidance contract. Sitting at the head of the procurement board is the Chief Avionics Architect: Marcus Vance—the very classmate from high school whose fate hung on whether you stood by him or bullied him.',
    historicalContext:
      'Aerospace subcontracting relies heavily on trust, security clearance vetting, and personal character assessments. Past actions echo in unexpected professional circles.',
    challengeQuote:
      '“The world is remarkably small. Those you treat with compassion or contempt today will be the gatekeepers of your destiny tomorrow.”',
    choices: [
      {
        id: 'marcus_ally_partnership',
        label: 'Partner with Chief Architect Marcus Vance (Ally Reconnection)',
        description:
          'Marcus steps forward warmly: “Jeanell! You were the only person who stood up for me when everyone else laughed. Your character is unimpeachable. The avionics subcontract is yours!”',
        requiresAlly: 'marcus',
        isCorrect: true,
        statImpact: { steamMastery: 30, financialAcumen: 25, resilience: 25, communityLegacy: 20 },
        historicalOutcome:
          'Marcus awards your firm the prime subcontract and opens proprietary telemetry code to your team. Your past kindness returned as an invaluable career milestone!',
        nextStepId: 'act2_aero_industry_crossroads',
        unlockedResources: [
          {
            id: 'res_defense_subcontracting_hub',
            title: 'Minority & Women-Owned Aerospace Contractor Portal',
            agencyOrOrg: 'Federal Procurement & Aerospace Defense Council',
            url: 'https://www.sba.gov',
            category: 'Business & Credit',
            whyItMatters: 'Guidance on 8(a) certifications, defense subcontracting partnerships, and government RFP bidding.',
            actionText: 'Access Defense Subcontracting Guide',
          },
        ],
        characterReflection: {
          archetype: 'The Trusted Partner',
          isPositive: true,
          moralInsight: 'Your high school empathy created an enduring bond that transcended decades.',
          tangibleConsequence: 'You were awarded a $250,000 aerospace engineering subcontract without corporate friction.',
          teachableLesson: 'Integrity is an investment with compounding returns. Treating people with respect pays dividends throughout life.',
        },
      },
      {
        id: 'marcus_bullied_rejection',
        label: 'Face Rejection: Marcus Vance Remembers the Bullying',
        description:
          'Marcus stares at you with cold professionalism: “We require leaders of integrity and collaborative culture. In high school, you chose cruelty for laughs. Your bid is rejected.”',
        blockedIfBullied: 'marcus',
        isCorrect: false,
        statImpact: { resilience: -15, steamMastery: -10, financialAcumen: -20 },
        historicalOutcome:
          'The boardroom falls silent. Your bid is rejected on grounds of team culture and ethics. The shallow "cool points" you gained in high school cost you a $250,000 engineering contract.',
        nextStepId: 'act2_aero_industry_crossroads',
        characterReflection: {
          archetype: 'The Regretful Bystander',
          isPositive: false,
          moralInsight: 'Cruelty committed in youth does not simply vanish with graduation; it leaves a permanent impression in the memories of those harmed.',
          tangibleConsequence: 'You lost a career-defining $250,000 engineering contract and the respect of industry peers.',
          teachableLesson: 'When you demean someone to gain temporary popularity, you are mortgaging your future reputation. True character never participates in bullying.',
          redemptionOpportunity: 'Demonstrate genuine humility, acknowledge your past failing, and commit to uplifting underrepresented colleagues.',
        },
      },
      {
        id: 'marcus_neutral_review',
        label: 'Standard Technical Evaluation (Neutral High School Path)',
        description:
          'Marcus reviews your specifications neutrally without personal warmth or grudge, offering standard probationary testing.',
        isCorrect: true,
        statImpact: { steamMastery: 15, financialAcumen: 10, resilience: 10 },
        historicalOutcome:
          'You secure a modest probationary tier based purely on technical scores, with no personal alliance advantages.',
        nextStepId: 'act2_aero_industry_crossroads',
      },
    ],
  },

  {
    id: 'act2_aero_industry_crossroads',
    actNumber: 2,
    actTitle: 'Act II: Supersonic Trajectory & Systems Design',
    yearRange: '2003 – 2004',
    sceneTitle: 'The Dual Horizon: Corporate Sky vs. Community Roots',
    location: 'Dearborn Financial & Metro Detroit Boardroom',
    summary:
      'Jeanell earned professional credentials in Property & Casualty and Life & Health insurance, along with her Notary Public commission. She discovered a stark revelation: while aerospace propelled humankind toward the stars, predatory lending and lack of financial literacy were crippling families back home in Detroit.',
    juniorSummary:
      'Jeanell noticed that many families were losing their homes because banks gave them tricky loans they couldn’t understand. She decided to learn everything about money and insurance so she could protect people.',
    historicalContext:
      'The early 2000s saw predatory subprime mortgages target urban minority communities with complex adjustable rates disguised as affordability.',
    challengeQuote:
      '“What good is mastering flight dynamics if our families’ financial foundations are built on quicksand? I needed to engineer economic wings for my community.”',
    choices: [
      {
        id: 'choice_protect_homeowners',
        label: 'Launch Independent Insurance & Risk Advisory',
        description:
          'Join Aflac Metro Detroit to protect working families with supplemental coverage, ensuring medical catastrophes don’t result in foreclosure.',
        isCorrect: true,
        statImpact: { financialAcumen: 25, communityLegacy: 20, resilience: 15 },
        historicalOutcome:
          'You generated over $500,000 in protective coverage for local workers, shielding hundreds of homes during economic downturns.',
        nextStepId: 'act3_realestate_matrix',
      },
      {
        id: 'choice_dual_discipline_strategy',
        label: 'Master Real Estate Brokerage Licensing',
        description:
          'Complete rigorous state real estate licensing courses to decode property contracts, appraisal algorithms, and municipal zoning regulations.',
        isCorrect: true,
        statImpact: { financialAcumen: 30, steamMastery: 15, resilience: 15 },
        historicalOutcome:
          'Licensed in October 2004, you mastered both technical mechanics and property law—becoming a rare dual-discipline powerhouse.',
        nextStepId: 'act3_realestate_matrix',
      },
    ],
  },

  // ACT III: Real Estate & Financial Systems
  {
    id: 'act3_realestate_matrix',
    actNumber: 3,
    actTitle: 'Act III: Financial Engineering & Real Estate Matrix',
    yearRange: '2004 – 2019',
    sceneTitle: 'Reclaiming the City: Multi-Family Flats & Tax Law',
    location: 'Woodward Square Realty · Century 21 Detroit',
    summary:
      'Operating as a licensed Real Estate Agent and Tax Preparer, Jeanell mobilized her engineering mind to solve housing inequity. She conducted neighborhood market analyses, increased client occupancy rates by 45%, and guided first-time homebuyers through NACA and HUD programs.',
    juniorSummary:
      'Jeanell helped families buy their first homes and fix up neighborhood houses in Detroit. She used math to show them how to save money and never lose their homes.',
    historicalContext:
      'The 2008 Great Recession devastated Detroit real estate, with foreclosures rampant. Jeanell applied mathematical cash-flow analysis to help families acquire and preserve multi-family duplexes.',
    challengeQuote:
      '“Real estate isn’t just bricks and mortar. It’s mathematical leverage: assets bring in revenue instead of paying out. When structured correctly, it builds generational wealth.”',
    choices: [
      {
        id: 'choice_finance_simulator',
        label: 'Simulate Detroit 4-Unit Multi-Family Cashflow',
        description:
          'Calculate Cap Rate, Earnest Money, Amortization, and Tax Depreciation shields to turn a blighted multi-family property into sustainable housing.',
        isCorrect: true,
        statImpact: { financialAcumen: 30, communityLegacy: 20, resilience: 15 },
        historicalOutcome:
          'You structured a compliant loan package that yielded an 11.2% Cap Rate while keeping monthly tenant rent affordable.',
        nextStepId: 'act3_kendra_bank_meeting',
        triggerLab: 'finance',
        unlockedResources: [
          {
            id: 'res_naca_homebuyer_program',
            title: 'NACA: Neighborhood Assistance Corporation of America',
            agencyOrOrg: 'NACA Community Advocacy & Homeownership',
            url: 'https://www.naca.com',
            category: 'Housing & Mortgages',
            whyItMatters: 'Zero down payment, zero closing costs, zero points, and below-market interest rate mortgages for working families.',
            actionText: 'Explore NACA Homeownership Program',
          },
        ],
      },
      {
        id: 'choice_fight_foreclosures',
        label: 'Advocate for NACA Community Justice Mortgages',
        description:
          'Partner with the Neighborhood Assistance Corporation of America (NACA) to secure no-down-payment, low-interest mortgages for working families.',
        isCorrect: true,
        statImpact: { communityLegacy: 25, resilience: 20, financialAcumen: 15 },
        historicalOutcome:
          'Over 60 Detroit families transitioned from vulnerable renters into proud deed-holding property owners.',
        nextStepId: 'act3_kendra_bank_meeting',
      },
    ],
  },

  // KEY PAYOFF SCENE FOR KENDRA BARNES:
  {
    id: 'act3_kendra_bank_meeting',
    actNumber: 3,
    actTitle: 'Act III: Financial Engineering & Real Estate Matrix',
    yearRange: '2010',
    sceneTitle: 'The Commercial Loan Desk: Kendra’s Memory',
    location: 'Detroit Community Banking Division',
    summary:
      'To finance the acquisition and rehabilitation of an abandoned 4-unit apartment building for low-income mothers, Jeanell needs approval from the Senior Vice President of Community Underwriting: Kendra Barnes—the very girl from Springfield High School.',
    historicalContext:
      'Commercial bank underwriters hold absolute discretionary authority over interest margins, collateral waivers, and down payment requirements.',
    challengeQuote:
      '“Every seed of empathy or cruelty you plant in youth grows into a tree whose fruit you will one day have to eat.”',
    choices: [
      {
        id: 'kendra_ally_approval',
        label: 'Kendra Barnes Approves Preferred Community Loan (Ally Path)',
        description:
          'Kendra stands up with tears of joy: “Jeanell! You protected me when my family had nothing. I know your heart and your financial rigor. Loan approved with zero closing fees and prime rates!”',
        requiresAlly: 'marcus',
        isCorrect: true,
        statImpact: { financialAcumen: 35, communityLegacy: 35, resilience: 25 },
        historicalOutcome:
          'Kendra approves a $320,000 loan package at 3.9% interest, saving the project $48,000 in financing fees and sheltering 4 families.',
        nextStepId: 'act3_tax_empowerment',
        unlockedResources: [
          {
            id: 'res_michigan_lara_broker',
            title: 'Michigan Department of Licensing and Regulatory Affairs (LARA)',
            agencyOrOrg: 'State of Michigan Bureau of Professional Licensing',
            url: 'https://www.michigan.gov/lara',
            category: 'Government & Taxes',
            whyItMatters: 'Real estate broker licensing verification, fair lending compliance, and broker escrow management statutes.',
            actionText: 'View LARA Broker Licensing Standards',
          },
        ],
        characterReflection: {
          archetype: 'The Compassionate Visionary',
          isPositive: true,
          moralInsight: 'You understood that real estate is not just about profit, but about providing safe shelter for vulnerable families.',
          tangibleConsequence: 'You acquired the multi-family property with prime loan terms, providing affordable shelter to mothers and children.',
          teachableLesson: 'When your business goals align with community uplift, resources and alliances naturally multiply.',
        },
      },
      {
        id: 'kendra_bullied_denial',
        label: 'Kendra Enforces High-Risk Penalties (Bullied Path)',
        description:
          'Kendra recognizes you: “You laughed at my worn shoes and joined the hallway bullies. Your character risk is flagged. Loan denied.”',
        blockedIfBullied: 'marcus',
        isCorrect: false,
        statImpact: { resilience: -20, financialAcumen: -25, communityLegacy: -20 },
        historicalOutcome:
          'The loan is flatly denied. You are forced to seek predatory hard-money lenders with punishing 14% interest rates, painfully learning the permanent cost of high school cruelty.',
        nextStepId: 'act3_tax_empowerment',
        characterReflection: {
          archetype: 'The Burdened Debtor',
          isPositive: false,
          moralInsight: 'Your lack of compassion in high school came full circle, destroying your credibility with a key financial underwriter.',
          tangibleConsequence: 'You were subjected to punitive 14% hard-money interest rates, draining cash flow and delaying community renovations.',
          teachableLesson: 'Character is the invisible balance sheet. You cannot out-earn a reputation for cruelty.',
          redemptionOpportunity: 'Acknowledge the damage, make financial restitution, and demonstrate consistent ethical stewardship.',
        },
      },
      {
        id: 'kendra_neutral_terms',
        label: 'Standard Commercial Underwriting (Neutral Path)',
        description:
          'Kendra reviews the paperwork objectively, requiring standard 20% cash down and strict collateral pledges.',
        isCorrect: true,
        statImpact: { financialAcumen: 15, resilience: 10 },
        historicalOutcome:
          'You secure the loan after extensive delays and standard high down-payment requirements.',
        nextStepId: 'act3_tax_empowerment',
      },
    ],
  },

  {
    id: 'act3_tax_empowerment',
    actNumber: 3,
    actTitle: 'Act III: Financial Engineering & Real Estate Matrix',
    yearRange: '2019 – 2020',
    sceneTitle: 'The PTIN, EFIN & Tax Defense Shield',
    location: 'Liberty Tax · Intuit Remote Tax Command',
    summary:
      'Completing trade school credentials and earning her IRS PTIN and Electronic Filing Identification Number (EFIN), Jeanell prepared federal and corporate returns. She discovered that millions of dollars in Earned Income Tax Credits went unclaimed each year by families intimidated by IRS paperwork.',
    juniorSummary:
      'Jeanell learned how taxes work so she could help working moms get back their honest tax refunds from the government to buy shoes, school supplies, and food.',
    historicalContext:
      'The IRS tax code is thousands of pages long; high-net-worth individuals routinely exploit legal deductions while working-class taxpayers overpay penalties.',
    challengeQuote:
      '“Tax preparation with a sufficient understanding of tax law is how we recover our community’s hard-earned dollars from bureaucratic loss.”',
    choices: [
      {
        id: 'choice_free_community_clinic',
        label: 'Launch Free Neighborhood Tax Recovery Clinics',
        description:
          'Resolve federal audit notices and file back returns for low-income parents, putting refunds directly into college savings accounts.',
        isCorrect: true,
        statImpact: { communityLegacy: 25, financialAcumen: 20, resilience: 15, kindnessPoints: 25 },
        historicalOutcome:
          'You reclaimed over $1.2M in refunds and credits for Detroit households, cementing your reputation as a trusted community protector.',
        nextStepId: 'act4_one_stop_center',
        unlockedResources: [
          {
            id: 'res_irs_vita_program',
            title: 'IRS Volunteer Income Tax Assistance (VITA)',
            agencyOrOrg: 'Internal Revenue Service (IRS)',
            url: 'https://www.irs.gov/individuals/free-tax-return-preparation-for-qualifying-taxpayers',
            category: 'Government & Taxes',
            whyItMatters: 'Free tax filing assistance for persons making $64,000 or less, ensuring 100% of the Earned Income Tax Credit goes to families.',
            actionText: 'Find Local VITA Tax Sites',
          },
        ],
      },
      {
        id: 'choice_write_financial_workbook',
        label: 'Author “Better Forever: ABC’s of Financial Literacy”',
        description:
          'Transform 15+ years of real-world knowledge into a structured 8-week curriculum breaking down terms from Abandoned to Zoning Laws.',
        isCorrect: true,
        statImpact: { steamMastery: 20, financialAcumen: 25, communityLegacy: 20, resilience: 20 },
        historicalOutcome:
          'Your workbook became a viral community blueprint, teaching youth and adults alike that “the earlier you learn, the earlier you earn.”',
        nextStepId: 'act4_one_stop_center',
      },
    ],
  },

  // ACT IV: One Stop Center & Generational Legacy
  {
    id: 'act4_one_stop_center',
    actNumber: 4,
    actTitle: 'Act IV: Better Forever & The One Stop Movement',
    yearRange: '2020 – Present',
    sceneTitle: 'Founding One Stop Rehabilitation Center',
    location: 'Detroit, Michigan · One Stop 501(c)(3) Headquarters',
    summary:
      'In 2020, Jeanell culminated her lifetime of engineering, real estate, and finance into action: founding One Stop Rehabilitation Center 501(c)(3). The center offers an aged-out foster care facility, return citizens transition home, emergency family shelter, youth/senior mentoring, and job training.',
    juniorSummary:
      'Jeanell opened the One Stop Center! It helps teenagers who leave foster care have a safe place to sleep, helps people find good jobs, and teaches kids how to build rockets and save money.',
    historicalContext:
      'The COVID-19 pandemic and subsequent inflation disproportionately impacted Detroit. Holistic community centers bridging mental health coaching, job placement, and housing became literal lifelines.',
    challengeQuote:
      '“We serve a diverse community ages 0 to 99 years old. We are a community development agency. We Change Lives Better Forever.”',
    choices: [
      {
        id: 'choice_community_simulator',
        label: 'Optimize One Stop Resource Allocation Engine',
        description:
          'Direct municipal grant funding, housing beds, job training stipends, and mental health counseling across Detroit neighborhoods.',
        isCorrect: true,
        statImpact: { communityLegacy: 35, resilience: 25, financialAcumen: 20 },
        historicalOutcome:
          'Your balanced operational strategy lifted 350+ individuals out of crisis, creating a self-sustaining community development model.',
        nextStepId: 'act4_legacy_future',
        triggerLab: 'community',
        unlockedResources: [
          {
            id: 'res_one_stop_rehab_center',
            title: 'One Stop Rehabilitation Center 501(c)(3) Official Portal',
            agencyOrOrg: 'One Stop Rehabilitation Center · Detroit MI',
            url: 'https://onestoprehabilitationcenters.org',
            phone: '(844) I-GOT-NEEDS / 1-844-446-8633',
            category: 'Emergency & Health',
            whyItMatters: 'Aged-out foster youth housing, transitional shelter for men and women, return citizens re-entry, and emergency food pantries.',
            actionText: 'Connect with One Stop Services',
          },
        ],
      },
      {
        id: 'choice_mental_health_integration',
        label: 'Certify as Mental Health Coach (Light University)',
        description:
          'Integrate trauma-informed coaching with financial counseling, recognizing that financial stress and emotional wellness are inextricably linked.',
        isCorrect: true,
        statImpact: { resilience: 30, communityLegacy: 30, kindnessPoints: 25 },
        historicalOutcome:
          'By treating trauma alongside credit restoration, client recidivism dropped to near zero—proving holistic healing works.',
        nextStepId: 'act4_legacy_future',
      },
      {
        id: 'choice_endowment_founder',
        label: '[High Resilience 80+] Establish Permanent Detroit S.T.E.A.M. Endowment',
        description:
          'Leverage your decades of unyielding resilience and authentic community alliances to secure a $2.5M perpetual education endowment.',
        minResilienceRequired: 80,
        isCorrect: true,
        statImpact: { communityLegacy: 50, resilience: 30, financialAcumen: 30, steamMastery: 25 },
        historicalOutcome:
          'Marcus Vance and Kendra Barnes co-chair the endowment board! Because of your lifelong integrity, hundreds of Detroit youth now receive full aerospace and business college scholarships!',
        nextStepId: 'act4_legacy_future',
      },
    ],
  },

  {
    id: 'act4_legacy_future',
    actNumber: 4,
    actTitle: 'Act IV: Better Forever & The One Stop Movement',
    yearRange: '2025 & Beyond',
    sceneTitle: 'The S.T.E.A.Reality Vision for the Next Generation',
    location: 'Detroit Innovation Corridor · Project Management Institute (PMP)',
    summary:
      'Now studying for her PMI-PMP credential and directing marketing at T.E.A.R.S. Channel Marketing, Jeanell envisions S.T.E.A.Reality: fusing aeronautical engineering, financial literacy, and community building into an interactive video game for students worldwide.',
    juniorSummary:
      'Jeanell turned her real life into this video game so kids and teens all over the world can learn to be brave, solve science puzzles, and achieve their dreams!',
    historicalContext:
      'True generational wealth is knowledge shared. Through S.T.E.A.Reality, students step into historical simulations to solve the real equations of lift, orbital momentum, compound interest, and community revitalization.',
    challengeQuote:
      '“My journey from a teen mom to an aeronautical engineer, real estate broker, and community founder is living proof: no altitude is unreachable when knowledge fuels your wings.”',
    choices: [
      {
        id: 'choice_game_graduation',
        label: 'Graduate S.T.E.A.Reality & Complete Your 5-Year Plan',
        description:
          'Record your personal career roadmap, assess your life goals, and carry Jeanell Land’s principles of resilience into your own future.',
        isCorrect: true,
        statImpact: { resilience: 25, steamMastery: 25, financialAcumen: 25, communityLegacy: 25 },
        historicalOutcome:
          'You have completed the Odyssey of Jeanell Land! You now possess the foundational tools of aerospace engineering, financial freedom, and moral integrity.',
        unlockedResources: [
          {
            id: 'res_better_forever_workbook_full',
            title: 'Better Forever: ABC’s of Financial Literacy Workbook',
            agencyOrOrg: 'Jeanell Land & Better Forever Publishing',
            url: 'https://onestoprehabilitationcenters.org',
            category: 'Business & Credit',
            whyItMatters: 'The complete financial literacy workbook, 5-year planner, and weekly discipline guide by Jeanell Land.',
            actionText: 'Access Full Workbook Curriculum',
          },
        ],
      },
    ],
  },
];
