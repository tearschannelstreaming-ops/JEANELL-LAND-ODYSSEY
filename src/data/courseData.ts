import { CourseModule } from '../types/game';

export interface CourseCatalogInfo {
  title: string;
  subtitle: string;
  author: string;
  institution: string;
  officialEnrollmentUrl: string;
  description: string;
  price: number;
  promoCode: string;
  discountedPrice: number;
  totalLevelsUnlocked: number;
  includesCertificate: boolean;
  totalHours: number;
  accreditedPillars: string[];
}

export const COURSE_CATALOG_INFO: CourseCatalogInfo = {
  title: "Jeanell Land's S.T.E.A.M. Mastery & Wealth Creation Masterclass",
  subtitle: "American Edition Version 1 · The 101-Level Trans-American Odyssey",
  author: "Jeanell Land",
  institution: "One Stop Rehabilitation Center 501(c)(3) & T.E.A.R.S. Foundation",
  officialEnrollmentUrl: "https://gemini.google.com/u/1/app/55e875b6239bd9a0",
  description: "An intensive masterclass synthesizing aeronautical engineering fluid physics, Detroit community leadership, nationwide MLS real estate acquisition, media broadcasting, vocational trade licensing, and generational wealth compounding across all 50 states.",
  price: 199,
  promoCode: "JEANELL101",
  discountedPrice: 0, // 100% free with community scholarship code JEANELL101!
  totalLevelsUnlocked: 101,
  includesCertificate: true,
  totalHours: 36,
  accreditedPillars: [
    "Aeronautical Engineering & Flight Mechanics",
    "Detroit Community Development & Non-Profit Leadership",
    "Nationwide MLS Systems & NACA Real Estate Financing",
    "T.E.A.R.S. Channel & TEARadio 100.1 FM Media Broadcasting",
    "Vocational Trade Apprenticeship & Code Compliance",
    "Generational Wealth Preservation & Asset Protection",
  ],
};

export const COURSE_MODULES: CourseModule[] = [
  {
    id: "mod_1_aero",
    moduleNumber: 1,
    title: "Aeronautical Engineering & The Fluid Physics of Upward Lift",
    subtitle: "Overcoming Downward Drag in Atmosphere and in Life",
    pillar: "Aeronautical Engineering",
    iconName: "Plane",
    summary: "Master the mathematical and aerodynamic foundations of flight: Bernoulli's principle, Newton's third law of action-reaction, boundary layer viscosity, vortex generation, and wind tunnel calibration.",
    lessons: [
      {
        id: "les_1_1",
        title: "Lesson 1: Bernoulli vs. Newton — The Dual Nature of Aerodynamic Lift",
        durationMinutes: 45,
        lectureSummary: "Understand how cambered airfoils accelerate airflow across the upper suction surface, dropping static pressure (Bernoulli) while deflecting the mass of air downward (Newton's 3rd Law: action and reaction).",
        scenerySetting: "Coleman A. Young International Airport Runway 15/33 & High-Speed Wind Tunnel",
        keyFormulasOrLaws: [
          "Lift Equation: L = 0.5 * rho * v^2 * S * Cl",
          "Bernoulli Equation: P_1 + 0.5 * rho * v_1^2 = P_2 + 0.5 * rho * v_2^2",
          "Angle of Attack (alpha): Critical stall angle typically occurs between 14° and 18°",
        ],
        patentInsight: "Patentable vortex-shedding boundary layer micro-actuators prevent sudden aerodynamic stall.",
      },
      {
        id: "les_1_2",
        title: "Lesson 2: Subsonic vs. Supersonic Shockwaves & The Whitcomb Area Rule",
        durationMinutes: 50,
        lectureSummary: "Investigate transonic wave drag and how contouring aircraft fuselage cross-sectional areas prevents coalescing shock fronts.",
        scenerySetting: "NASA Glenn Research Center Transonic Wind Tunnel Test Chamber",
        keyFormulasOrLaws: [
          "Mach Number: M = v / a (Speed of Sound a = sqrt(gamma * R * T))",
          "Critical Mach: M_crit is the freestream Mach number where local airflow first reaches Mach 1",
        ],
        patentInsight: "Novel low-boom fuselage geometries that diffuse shockwave energy into harmless acoustic pressure.",
      },
    ],
    interactiveChallenge: {
      id: "chal_mod_1",
      prompt: "Your aircraft experiences severe wing buffeting at an angle of attack of 15.2 degrees while climbing through turbulence. Airspeed is bleeding off at 3 knots per second. How do you recover?",
      options: [
        {
          id: "opt_pitch_down_reenergize",
          text: "Lower nose pitch angle to 8 degrees, deploy leading-edge slats to re-energize boundary airflow, and add throttle.",
          isCorrect: true,
          feedback: "Correct! Reducing angle of attack restores laminar airflow over the wings, instantly ending boundary layer separation and preventing an unrecoverable stall spin.",
          reflection: {
            archetype: "The Aerodynamic Master",
            isPositive: true,
            moralInsight: "When facing turbulence, lowering your angle of resistance and taking in fresh momentum re-establishes upward trajectory.",
            tangibleConsequence: "Flight airspeed stabilized at 120 knots; climb rate restored to +850 ft/min.",
            teachableLesson: "Do not pull backward when stalling; ease forward to regain flow and lift.",
          },
          statDelta: { steamMastery: 20, resilience: 15, earningsBalance: 1500 },
          unlockedResource: {
            id: "res_course_aero_handbook",
            title: "FAA Pilot’s Handbook of Aeronautical Knowledge (PHAK) Chapter 5: Aerodynamics",
            agencyOrOrg: "Federal Aviation Administration",
            url: "https://www.faa.gov/regulations_policies/handbooks_manuals/aviation/phak",
            category: "Education & Grants",
            whyItMatters: "The official federal manual on aircraft flight dynamics, lift-drag ratios, and stall recovery procedures.",
            actionText: "Download FAA Aerodynamics Chapter & Interactive Lift Calculations",
          },
        },
        {
          id: "opt_yank_stick",
          text: "Pull the flight yoke all the way back to your chest to force the nose up toward the clouds.",
          isCorrect: false,
          feedback: "Disastrous! Exceeding critical angle of attack causes the entire upper wing airflow to detach completely, entering an immediate deep aerodynamic stall.",
          reflection: {
            archetype: "The Panic Operator",
            isPositive: false,
            moralInsight: "Reacting out of fear by pulling harder against insurmountable laws causes rapid collapse.",
            tangibleConsequence: "Stick shaker and stall horn sound; aircraft drops 1,200 feet in altitude.",
            teachableLesson: "Brute force against fluid resistance always precipitates stall.",
          },
          statDelta: { steamMastery: -10, resilience: -5 },
        },
      ],
    },
    fieldTripScenery: {
      locationName: "Coleman A. Young Aero Research Hangar",
      cityState: "Detroit, MI",
      interactiveTask: "Calibrate wind tunnel boundary layer pressure transducers across 5 camber angles.",
      historicalConnection: "Where Jeanell Land studied aerodynamic blueprints and translated physical flight principles into life metaphors.",
    },
  },

  {
    id: "mod_2_community",
    moduleNumber: 2,
    title: "The Detroit Community Blueprint: Non-Profit & S.T.E.A.M. Leadership",
    subtitle: "Founding One Stop Rehabilitation Center 501(c)(3) & Serving Ages 0–99",
    pillar: "Community Development",
    iconName: "Building2",
    summary: "Learn the rigorous mechanics of community development: filing IRS Form 1023, administering HUD emergency shelter grants, operating youth food pantries, and structuring housing for aged-out foster youth.",
    lessons: [
      {
        id: "les_2_1",
        title: "Lesson 1: 501(c)(3) Non-Profit Governance & Fiduciary Stewardship",
        durationMinutes: 40,
        lectureSummary: "How to draft organizational bylaws, assemble an independent board of directors, maintain public charity status under IRC Section 509(a)(1), and file pristine annual IRS Form 990 reports.",
        scenerySetting: "One Stop Rehabilitation Center Main Office · West Grand Blvd Corridor, Detroit",
        keyFormulasOrLaws: [
          "IRC Section 501(c)(3): Exemption from federal income tax for charitable, educational, or scientific purposes",
          "Public Support Test: At least 33.3% of total revenue must originate from public donors and grants",
          "Form 990 Public Transparency: Mandated public disclosure of all executive compensation and program expenditures",
        ],
        patentInsight: "Algorithmic community need matching systems that direct pantry food and emergency shelter beds in real time.",
      },
      {
        id: "les_2_2",
        title: "Lesson 2: Aged-Out Foster Youth Housing & Re-Entry Integration",
        durationMinutes: 45,
        lectureSummary: "Creating transitional independent living programs with life skills, credit building, vocational trade apprenticeships, and mental health counseling.",
        scenerySetting: "Transitional Residential Complex · Detroit West Side",
        keyFormulasOrLaws: [
          "Chafee Foster Care Independence Program (CFCIP): Title IV-E funding for housing and vocational support",
          "HUD Section 811 Supportive Housing: Permanent supportive housing vouchers for vulnerable youth and disabled adults",
        ],
        patentInsight: "Holistic life telemetry matrices that track student trauma recovery alongside financial literacy scores.",
      },
    ],
    interactiveChallenge: {
      id: "chal_mod_2",
      prompt: "A $300,000 city block grant offers funding for youth transitional housing, but requires a 25% matching fund commitment within 60 days. How do you structure the match?",
      options: [
        {
          id: "opt_stack_corporate_match",
          text: "Partner with local trade unions for certified in-kind labor match and secure local foundation philanthropic pledge letters.",
          isCorrect: true,
          feedback: "Brilliant! HUD and municipal grant boards fully count certified in-kind union labor hours and foundation pledges toward the 25% match ($75,000 value), unlocking the full $300,000 without taking on high-interest commercial debt.",
          reflection: {
            archetype: "The Coalition Architect",
            isPositive: true,
            moralInsight: "True community builders weave diverse community assets together into an unbreakable funding rope.",
            tangibleConsequence: "$300,000 grant disbursed; 16 aged-out foster youth gain secure, fully furnished apartments.",
            teachableLesson: "In-kind labor and institutional partnerships can satisfy grant matching requirements cleanly.",
          },
          statDelta: { communityLegacy: 25, financialAcumen: 20, earningsBalance: 3000 },
          unlockedResource: {
            id: "res_hud_esg_guide",
            title: "HUD Emergency Solutions Grant (ESG) & Match Requirement Guidelines",
            agencyOrOrg: "U.S. Department of Housing and Urban Development",
            url: "https://www.hudexchange.info/programs/esg",
            category: "Housing & Mortgages",
            whyItMatters: "Official federal guide on matching fund documentation, eligible in-kind contributions, and shelter compliance.",
            actionText: "Access HUD ESG Match Documentation & Grant Toolkits",
          },
        },
        {
          id: "opt_divert_food_funds",
          text: "Divert emergency food pantry donations from the pantry checking account to pay the cash match.",
          isCorrect: false,
          feedback: "Illegal and unethical! Commingling restricted donor funds violates 501(c)(3) federal law and leaves hungry families with empty pantry shelves.",
          reflection: {
            archetype: "The Reckless Administrator",
            isPositive: false,
            moralInsight: "Robbing restricted charitable funds to chase matching grants is a betrayal of sacred public trust.",
            tangibleConsequence: "State Attorney General issues an inquiry; community food pantry forced to turn away 50 families.",
            teachableLesson: "Never commingle or repurpose restricted charitable donations.",
          },
          statDelta: { communityLegacy: -30, kindnessPoints: -25, resilience: -10 },
        },
      ],
    },
    fieldTripScenery: {
      locationName: "One Stop Rehabilitation Center 501(c)(3) Headquarters",
      cityState: "Detroit, MI",
      interactiveTask: "Distribute 100 food pantry emergency boxes and conduct youth life-skills intake interviews.",
      historicalConnection: "Founded by Jeanell Land with the mission 'Serving ages 0–99' and hotline (844) I-GOT-NEEDS.",
    },
  },

  {
    id: "mod_3_real_estate",
    moduleNumber: 3,
    title: "Nationwide Real Estate Mastery & MLS Acquisition Systems",
    subtitle: "20+ Years Real Estate Broker Experience · NACA Loans & Multi-Family Wealth",
    pillar: "Real Estate & MLS",
    iconName: "Home",
    summary: "Discover how Jeanell Land negotiated commercial sales, represented first-time homebuyers with NACA 0%-down mortgages, evaluated multi-family cashflow, conducted MLS CMAs, and built permanent equity.",
    lessons: [
      {
        id: "les_3_1",
        title: "Lesson 1: The NACA Mortgage Blueprint — 0% Down, 0 Fees, 0 Points",
        durationMinutes: 45,
        lectureSummary: "How the Neighborhood Assistance Corporation of America (NACA) program allows low-to-moderate income buyers to buy single or 1-4 unit multi-family properties without predatory fees, PMI, or down payment barriers.",
        scenerySetting: "Woodward Square Realty Office · Royal Oak, MI",
        keyFormulasOrLaws: [
          "Payment Shock Savings: Documenting rent vs. target mortgage payment difference for 3-6 consecutive months",
          "Debt-to-Income (DTI) Ratios: Front-end housing ratio <= 33%, Back-end total debt ratio <= 40%",
          "Multi-Family Rent Offset: 75% of projected legal rental income counts toward loan qualification",
        ],
        patentInsight: "Automated underwriting qualification engines that verify rent receipts and bank statements instantly.",
      },
      {
        id: "les_3_2",
        title: "Lesson 2: Comparative Market Analysis (CMA) & Cap Rate Valuation",
        durationMinutes: 50,
        lectureSummary: "How to pull active, pending, and sold MLS comps within a 0.5-mile radius, make line-item adjustments for square footage, bedroom count, and basement finish, and calculate Capitalization Rate (Cap Rate).",
        scenerySetting: "Nationwide MLS Multiple Listing Service Terminal",
        keyFormulasOrLaws: [
          "Capitalization Rate: Cap Rate = Net Operating Income (NOI) / Property Purchase Price",
          "Net Operating Income (NOI) = Gross Operating Income - Operating Expenses (Taxes, Insurance, Repairs, Vacancy)",
          "Gross Rent Multiplier (GRM) = Purchase Price / Gross Annual Rent",
        ],
        patentInsight: "Dynamic GIS appraisal algorithms adjusting valuations based on proximity to community hubs and transit.",
      },
    ],
    interactiveChallenge: {
      id: "chal_mod_3",
      prompt: "You are analyzing a Detroit 4-unit apartment building listed on the MLS for $320,000. Each unit rents for $900/month. Annual taxes are $4,800, insurance is $2,400, and you reserve 10% for maintenance. What is your Net Operating Income (NOI) and Cap Rate?",
      options: [
        {
          id: "opt_correct_noi_cap",
          text: "Gross Rent: $43,200. Operating Expenses: $11,520. NOI: $31,680. Cap Rate: 9.9% (Outstanding cashflow!).",
          isCorrect: true,
          feedback: "Spot on! $43,200 gross rent minus $4,800 taxes minus $2,400 insurance minus $4,320 (10% maintenance) equals $31,680 NOI. Dividing $31,680 by $320,000 gives a 9.9% Cap Rate, providing exceptional debt coverage.",
          reflection: {
            archetype: "The Master Underwriter",
            isPositive: true,
            moralInsight: "Disciplined mathematical valuation protects your capital from speculative market bubbles.",
            tangibleConsequence: "Offer accepted at list price; generates $1,850/month in net passive cashflow after mortgage payment.",
            teachableLesson: "Always calculate NOI before considering debt service.",
          },
          statDelta: { financialAcumen: 25, resilience: 15, earningsBalance: 3500 },
          unlockedResource: {
            id: "res_nar_mls_standards",
            title: "National Association of Realtors (NAR) Code of Ethics & MLS Property Evaluation Tools",
            agencyOrOrg: "National Association of Realtors",
            url: "https://www.nar.realtor",
            category: "Housing & Mortgages",
            whyItMatters: "Industry standard ethical guidelines and Multiple Listing Service property comp standards.",
            actionText: "Access Official Realtor MLS Evaluation Calculators & Forms",
          },
        },
        {
          id: "opt_ignore_expenses",
          text: "Forget expenses! Cap rate is just Gross Rent / Price which equals 13.5%, so buy it with no cash reserves.",
          isCorrect: false,
          feedback: "Fatal error! You completely ignored real estate property taxes, hazard insurance, and tenant maintenance. When winter freezes the pipes, you have no reserve funds.",
          reflection: {
            archetype: "The Blind Gambler",
            isPositive: false,
            moralInsight: "Ignoring inevitable operating expenses leads directly to mortgage default and property foreclosure.",
            tangibleConsequence: "Winter furnace breakdown drains your personal bank account by $6,500.",
            teachableLesson: "Gross rent is not profit; operating expenses must always be accounted for.",
          },
          statDelta: { financialAcumen: -15, earningsBalance: -2500 },
        },
      ],
    },
    fieldTripScenery: {
      locationName: "Woodward Square Realty Office",
      cityState: "Royal Oak / Detroit, MI",
      interactiveTask: "Underwrite a multi-family MLS listing and draft a NACA loan purchase agreement.",
      historicalConnection: "Where Jeanell Land served first-time homebuyers with NACA programs and built equity over two decades.",
    },
  },

  {
    id: "mod_4_media",
    moduleNumber: 4,
    title: "Media, Broadcasting & Community Marketing",
    subtitle: "Directing T.E.A.R.S. Channel & Broadcasting on TEARadio 100.1 FM",
    pillar: "Media & Broadcasting",
    iconName: "Radio",
    summary: "Discover the power of community media: broadcast frequency engineering, FCC public interest mandates, live radio hosting, narrative marketing, and youth voice syndication.",
    lessons: [
      {
        id: "les_4_1",
        title: "Lesson 1: Radio Frequency Engineering & Audio Signal Flow",
        durationMinutes: 35,
        lectureSummary: "How FM transmitters modulate 100.1 MHz carrier waves, manage audio compressor/limiters to prevent signal splatter, and configure broadcast audio mixers.",
        scenerySetting: "TEARadio 100.1 FM Live Studio Booth · Detroit Media District",
        keyFormulasOrLaws: [
          "Wavelength: lambda = c / f (where c = 3 * 10^8 m/s, f = 100.1 MHz -> lambda = 2.99 meters)",
          "FCC Part 73: Operating standards for commercial and non-commercial educational FM broadcast stations",
          "Audio Loudness (LUFS): Integrated loudness standards (-24 LUFS for broadcast) preventing ear fatigue",
        ],
        patentInsight: "Hyper-local community emergency alert broadcast systems with synchronized smartphone notification.",
      },
      {
        id: "les_4_2",
        title: "Lesson 2: Educational Narrative Storytelling & Public Interest Media",
        durationMinutes: 40,
        lectureSummary: "Using broadcasting to educate the public on youth S.T.E.A.M. careers, financial literacy, foster care advocacy, and community revitalization.",
        scenerySetting: "T.E.A.R.S. Channel Television Control Room",
        keyFormulasOrLaws: [
          "FCC Public Interest Standard: Broadcasters must serve the public interest, convenience, and necessity",
          "Fair Housing Act Advertising Regulations: Strict prohibition of discriminatory wording in real estate broadcasting",
        ],
        patentInsight: "Interactive broadcast streaming channels allowing listeners to ask real-time STEM questions to mentors on air.",
      },
    ],
    interactiveChallenge: {
      id: "chal_mod_4",
      prompt: "During a live TEARadio 100.1 FM broadcast on financial literacy, a corporate payday lender offers a $5,000 monthly advertising contract if you air their high-interest loan commercials. Do you accept?",
      options: [
        {
          id: "opt_reject_protect_listeners",
          text: "Reject the predatory contract and replace it with community credit union and S.T.E.A.M. apprenticeship sponsors.",
          isCorrect: true,
          feedback: "Noble choice! Preserving the ethical integrity of your broadcast station protects thousands of listeners from predatory debt. A local credit union and trade union step up to sponsor the show for $6,500/month!",
          reflection: {
            archetype: "The Uncompromised Voice",
            isPositive: true,
            moralInsight: "A media platform is a sacred trust; never monetize the exploitation of your community.",
            tangibleConsequence: "Station ratings soar; praised by community leaders for protecting listeners.",
            teachableLesson: "Integrity attracts higher-caliber, aligned sponsors over the long term.",
          },
          statDelta: { communityLegacy: 25, kindnessPoints: 20, earningsBalance: 2500 },
          unlockedResource: {
            id: "res_fcc_broadcast_rules",
            title: "FCC Broadcast Public and The Media Handbook",
            agencyOrOrg: "Federal Communications Commission",
            url: "https://www.fcc.gov/media/radio/public-and-broadcasting",
            category: "Business & Credit",
            whyItMatters: "Federal guidelines on broadcast station public inspection files, sponsorship identification, and public interest mandates.",
            actionText: "Download FCC Broadcast Handbook & Public Interest Rules",
          },
        },
        {
          id: "opt_take_predatory_cash",
          text: "Take the $5,000 payday lender money and run aggressive commercials targeting desperate low-income families.",
          isCorrect: false,
          feedback: "Hypocrisy! Your broadcast preaches financial freedom while your commercial breaks advertise 400% interest loans that trap listeners in debt.",
          reflection: {
            archetype: "The Sellout Broadcaster",
            isPositive: false,
            moralInsight: "Trading listener welfare for advertising dollars destroys the moral authority of your mission.",
            tangibleConsequence: "Listeners boycott the show; loyal community supporters cancel their donations.",
            teachableLesson: "Your brand reputation is destroyed the moment you sell out your values.",
          },
          statDelta: { communityLegacy: -25, kindnessPoints: -20, earningsBalance: 1500 },
        },
      ],
    },
    fieldTripScenery: {
      locationName: "T.E.A.R.S. Channel & TEARadio 100.1 FM Studios",
      cityState: "Detroit, MI",
      interactiveTask: "Host a live 30-minute educational broadcast on aeronautical engineering and community housing.",
      historicalConnection: "Where Jeanell Land directed media campaigns, gave youth a voice, and syndicated educational programming.",
    },
  },

  {
    id: "mod_5_trades",
    moduleNumber: 5,
    title: "Vocational Trades & Building Systems Licensing",
    subtitle: "Electrical, Plumbing, HVAC & City Building Code Compliance",
    pillar: "Vocational Trades",
    iconName: "Wrench",
    summary: "Hands-on mastery of vocational trades: reading MEP blueprints, National Electrical Code (NEC) load calculations, hydraulic plumbing slopes, and passing official municipal trade examinations.",
    lessons: [
      {
        id: "les_5_1",
        title: "Lesson 1: National Electrical Code (NEC) & 3-Phase Power Systems",
        durationMinutes: 45,
        lectureSummary: "Sizing commercial electrical panels, wire ampacity tables (NEC Article 310), ground-fault circuit interrupters (GFCI), arc-fault circuit interrupters (AFCI), and 3-phase motor power calculations.",
        scenerySetting: "Detroit Municipal Infrastructure Testing Bureau · Hart Plaza",
        keyFormulasOrLaws: [
          "Ohm's Law & Power: V = I * R, P = V * I (Single Phase), P = sqrt(3) * V_L * I_L * PF (3-Phase)",
          "Voltage Drop Limit: NEC recommends max 3% drop on branch circuits, 5% total across feeder and branch",
          "Conduit Fill Ratio: 40% maximum allowable fill for 3 or more conductors to prevent thermal buildup",
        ],
        patentInsight: "Modular wireless electrical breaker monitoring systems that detect micro-arc signatures before fires ignite.",
      },
      {
        id: "les_5_2",
        title: "Lesson 2: Drain-Waste-Vent (DWV) Plumbing Hydraulics & Slope",
        durationMinutes: 40,
        lectureSummary: "Hydraulic sizing of building sanitary drainage lines, trap seals to prevent sewer gas entry, and atmospheric vent stack equalization.",
        scenerySetting: "Commercial Multi-Family Renovation Jobsite · Detroit, MI",
        keyFormulasOrLaws: [
          "Sanitary Drainage Slope: Minimum 1/4 inch fall per linear foot for pipes 2 inches or smaller; 1/8 inch for pipes 3-6 inches",
          "Hydraulic Flow Rate: Manning Equation for open-channel gravity gravity drain velocity",
        ],
        patentInsight: "Water-recycling greywater diverters that harvest bathwater for toilet flushing and urban agricultural irrigation.",
      },
    ],
    interactiveChallenge: {
      id: "chal_mod_5",
      prompt: "You are wiring a 100-amp subpanel located 150 feet away from the main distribution board. At full load, 120V single-phase, what gauge copper wire must you pull to keep voltage drop under the 3% NEC limit?",
      options: [
        {
          id: "opt_upsize_copper_wire",
          text: "Upsize to #1 AWG copper wire to offset resistance over the 150-foot run, keeping voltage drop at 2.4%.",
          isCorrect: true,
          feedback: "Master electrician accuracy! Standard #3 AWG wire would have produced a 4.1% voltage drop (exceeding the 3% NEC limit and risking motor burnout). Upsizing to #1 AWG keeps voltage drop at a safe 2.4%.",
          reflection: {
            archetype: "The Master Craftsman",
            isPositive: true,
            moralInsight: "True technical excellence never guesses at wire gauges or tolerances; calculation ensures safety.",
            tangibleConsequence: "Electrical inspector signs off on the permit on first inspection with zero revisions.",
            teachableLesson: "Always calculate voltage drop over long conductor runs to protect expensive equipment.",
          },
          statDelta: { steamMastery: 20, resilience: 15, earningsBalance: 2800 },
          unlockedResource: {
            id: "res_nfpa_nec_70",
            title: "NFPA 70: National Electrical Code (NEC) Free Public Access Portal",
            agencyOrOrg: "National Fire Protection Association",
            url: "https://www.nfpa.org/codes-and-standards/nfpa-70-standard-development/70",
            category: "Education & Grants",
            whyItMatters: "The official national benchmark for safe electrical design, installation, and inspection.",
            actionText: "Access NFPA 70 National Electrical Code Tables & Ampacity Charts",
          },
        },
        {
          id: "opt_cheap_thin_wire",
          text: "Use thin #6 AWG wire because it is $300 cheaper and fits more easily into the conduit pipe.",
          isCorrect: false,
          feedback: "Severe fire hazard! #6 AWG wire over a 150-foot run at 100 amps will experience a 7.2% voltage drop, causing the wire insulation to overheat and melt.",
          reflection: {
            archetype: "The Firetrap Installer",
            isPositive: false,
            moralInsight: "Undersizing electrical wire to save a quick buck risks burning down the entire building.",
            tangibleConsequence: "Inspector red-tags the jobsite; fined $1,000 and forced to rip out all installed wiring.",
            teachableLesson: "Never compromise on conductor ampacity and thermal limits.",
          },
          statDelta: { steamMastery: -15, earningsBalance: -1500 },
        },
      ],
    },
    fieldTripScenery: {
      locationName: "Detroit Municipal Infrastructure & Trades Testing Hall",
      cityState: "Detroit, MI",
      interactiveTask: "Complete an electrical conduit bending test and wire a 3-way lighting circuit for municipal inspection.",
      historicalConnection: "Where thousands of Detroiters certify their trade credentials for high-paying infrastructure union careers.",
    },
  },

  {
    id: "mod_6_wealth",
    moduleNumber: 6,
    title: "Generational Wealth & Financial Acumen",
    subtitle: "700+ FICO Credit Optimization, Debt Elimination & Estate Asset Protection",
    pillar: "Generational Wealth",
    iconName: "Shield",
    summary: "The definitive guide to financial independence: master the 5 factors of credit scoring, utilize the debt avalanche snowball method, structure irrevocable trusts, and preserve generational equity.",
    lessons: [
      {
        id: "les_6_1",
        title: "Lesson 1: The Credit Architecture — Engineering a 750+ FICO Score",
        durationMinutes: 40,
        lectureSummary: "Deconstruct the 5 factors: Payment History (35%), Credit Utilization (30%), Length of History (15%), Credit Mix (10%), and New Inquiries (10%). Learn how keeping revolving utilization below 7% creates an elite credit tier.",
        scenerySetting: "Financial District Executive Boardroom · Detroit, MI",
        keyFormulasOrLaws: [
          "Credit Utilization Ratio: (Total Revolving Balances / Total Credit Limits) * 100 < 7%",
          "Statement Closing Date vs Due Date: Pay balances before statement generation to report 1-3% utilization",
          "Fair Credit Reporting Act (FCRA): Legal 30-day requirement for credit bureaus to investigate disputed inaccuracies",
        ],
        patentInsight: "Credit simulation engines that model exact score point swings before making financial moves.",
      },
      {
        id: "les_6_2",
        title: "Lesson 2: Compound Growth, Velocity of Money & Generational Trusts",
        durationMinutes: 45,
        lectureSummary: "The rule of 72, index fund equity compounding, separating operating assets from holding assets, and avoiding probate court through pour-over wills and revocable living trusts.",
        scenerySetting: "Asset Preservation Vault & Estate Library",
        keyFormulasOrLaws: [
          "Rule of 72: Years to Double Money = 72 / Annual Interest Rate",
          "Compound Interest: A = P * (1 + r/n)^(n*t)",
          "Estate Tax Exemption & Probate Avoidance: Assets held in a living trust bypass public probate court entirely",
        ],
        patentInsight: "Multi-generational trust distribution algorithms that release capital upon achievement of STEM or trade milestones.",
      },
    ],
    interactiveChallenge: {
      id: "chal_mod_6",
      prompt: "You receive a $10,000 real estate commission check. You currently have a $4,000 credit card balance charging 24.99% APR, a $3,000 student loan at 4.5%, and an emergency savings of only $500. How do you deploy the $10,000?",
      options: [
        {
          id: "opt_smart_wealth_deploy",
          text: "Immediately wipe out the $4,000 credit card debt (guaranteed 25% return!), allocate $3,000 to emergency reserves, and invest $3,000 in index funds.",
          isCorrect: true,
          feedback: "Financial masterclass execution! Eliminating the 24.99% credit card debt is equivalent to an immediate risk-free 25% return on investment. Funding your emergency reserve shields you from unexpected shocks, and index investing starts compound growth.",
          reflection: {
            archetype: "The Wealth Architect",
            isPositive: true,
            moralInsight: "Freedom is built not on what you spend, but on what you retain and shield from predatory interest rates.",
            tangibleConsequence: "FICO credit score increases by 68 points; saved $1,000 in annual credit card interest.",
            teachableLesson: "Always attack high-interest consumer debt before seeking speculative investment yields.",
          },
          statDelta: { financialAcumen: 30, resilience: 20, earningsBalance: 4000 },
          unlockedResource: {
            id: "res_cfpb_wealth_guide",
            title: "Consumer Financial Protection Bureau (CFPB) Debt Elimination & Credit Optimization Toolkit",
            agencyOrOrg: "Consumer Financial Protection Bureau",
            url: "https://www.consumerfinance.gov/consumer-tools",
            category: "Banking & Wealth",
            whyItMatters: "Official federal financial tools for disputing credit errors, budgeting, and eliminating debt.",
            actionText: "Access CFPB Debt Snowball & Credit Building Worksheets",
          },
        },
        {
          id: "opt_buy_luxury_watch",
          text: "Spend $8,000 on a designer luxury watch to 'look rich' and pay minimum payments on the 24.99% credit card.",
          isCorrect: false,
          feedback: "The trap of false wealth! The watch loses 40% of its value the second you leave the store, while the credit card debt compounds relentlessly, eating your income.",
          reflection: {
            archetype: "The Ostentatious Debtor",
            isPositive: false,
            moralInsight: "Looking rich while being broke on paper is the fastest path to financial ruin.",
            tangibleConsequence: "Remaining cash exhausted; interest payments exceed $120/month indefinitely.",
            teachableLesson: "True wealth is quiet and invested; fake wealth is loud and depreciating.",
          },
          statDelta: { coolPoints: 10, financialAcumen: -25, earningsBalance: -8000 },
        },
      ],
    },
    fieldTripScenery: {
      locationName: "Detroit Financial District Vault & Asset Trust Room",
      cityState: "Detroit, MI",
      interactiveTask: "Draft a family generational wealth trust flowchart and eliminate high-interest debt line items.",
      historicalConnection: "Where Jeanell Land structured non-profit trusts, safeguarded community assets, and taught financial literacy.",
    },
  },
];
