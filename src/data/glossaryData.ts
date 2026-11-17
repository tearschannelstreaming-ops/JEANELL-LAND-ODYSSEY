import { GlossaryItem } from '../types/game';

export const GLOSSARY_ITEMS: GlossaryItem[] = [
  // A
  {
    id: 'airfoil',
    term: 'Airfoil & Camber',
    letter: 'A',
    category: 'Aeronautics & STEM',
    definition:
      'A streamlined body shaped to produce an aerodynamic reaction (lift) perpendicular to its direction of motion. Camber refers to the asymmetry between the upper and lower surfaces of an aerofoil.',
    applicationInGame: 'Tuning camber and angle of attack in the Aero-Lab generates upward lift force countering gravity.',
    authorNote: 'Aeronautical Engineering fundamental: curvature speeds up upper air velocity, reducing static pressure.',
  },
  {
    id: 'assets',
    term: 'Assets',
    letter: 'A',
    category: 'Banking & Wealth',
    definition:
      'Things that hold value and bring in revenue instead of paying out. Assets include real estate, vehicles, gold, business locations, and cash reserves.',
    applicationInGame: 'In the Real Estate Lab, acquiring income-producing multi-family properties converts capital into cash-flow assets.',
    authorNote: 'Jeanell Land: "Some assets become liabilities when it costs more to maintain than they generate in return."',
  },
  {
    id: 'accounting',
    term: 'Accounting & Bookkeeping',
    letter: 'A',
    category: 'Taxes & Legal',
    definition:
      'A method of systematically tracking assets, liabilities, revenues, and expenditures over time. Modern accounting software enables automated tracking.',
    applicationInGame: 'Used in monthly budget tracking to ensure balanced balance sheets and audit compliance.',
    authorNote: 'Jeanell Land: "Accounting methods have been used for centuries. Master the numbers, master your destiny."',
  },
  // B
  {
    id: 'bernoulli',
    term: "Bernoulli's Principle",
    letter: 'B',
    category: 'Aeronautics & STEM',
    definition:
      'In fluid dynamics, an increase in the speed of a fluid occurs simultaneously with a decrease in static pressure. When air moves faster over a curved upper wing surface, lower pressure above pulls the wing upward.',
    applicationInGame: 'Governs the pressure differential vectors rendered in the wind tunnel simulation.',
  },
  {
    id: 'banking',
    term: 'Banking',
    letter: 'B',
    category: 'Banking & Wealth',
    definition:
      'Financial institutions that safeguard deposits and lend capital. Banks charge borrowers higher interest rates than they pay out to depositors.',
    applicationInGame: 'Managing deposits, opening business checking accounts, and securing favorable commercial mortgage terms.',
    authorNote: 'Jeanell Land: "Learn how the bank profits from your capital so you can employ capital for your family."',
  },
  {
    id: 'beneficiaries',
    term: 'Beneficiaries',
    letter: 'B',
    category: 'Banking & Wealth',
    definition:
      'A person designated to receive property or assets upon death or when specific legal trust conditions are satisfied.',
    applicationInGame: 'Essential for generational wealth transfer and life insurance estate planning.',
  },
  // C
  {
    id: 'credit',
    term: 'Credit & Credit Cards',
    letter: 'C',
    category: 'Banking & Wealth',
    definition:
      'A contractual agreement in which a borrower receives goods or money now and agrees to repay the lender later with interest. Misused credit results in financial hardship.',
    applicationInGame: 'Building prime credit scores unlocks lower interest rates on aircraft prototypes and property loans.',
    authorNote: 'Jeanell Land: "Be careful with credit products; if misused they cause great financial harm, but when mastered they are powerful leverage."',
  },
  {
    id: 'cap_rate',
    term: 'Capitalization Rate (Cap Rate)',
    letter: 'C',
    category: 'Real Estate & Housing',
    definition:
      'The ratio of Net Operating Income (NOI) to property asset value: Cap Rate = NOI / Purchase Price. Indicates the unleveraged rate of return.',
    applicationInGame: 'In the Real Estate Lab, players aim for Cap Rates > 8% in Detroit property rehabilitations.',
  },
  // D
  {
    id: 'drag',
    term: 'Drag (Parasitic & Induced)',
    letter: 'D',
    category: 'Aeronautics & STEM',
    definition:
      'Aerodynamic force opposing an aircraft’s motion through the air. Parasitic drag stems from skin friction and form, while induced drag is the inevitable byproduct of generating lift.',
    applicationInGame: 'Higher angles of attack increase lift but exponentially increase induced drag until aerodynamic stall.',
  },
  {
    id: 'depreciation',
    term: 'Depreciation & Tax Shields',
    letter: 'D',
    category: 'Taxes & Legal',
    definition:
      'How loss in value is tracked over time. In real estate, the IRS permits residential property wear-and-tear to be written off over 27.5 years, shielding cash flow from taxation.',
    applicationInGame: 'Applies in the Finance Lab to shelter Detroit rental profits from state and federal income taxes.',
    authorNote: 'Jeanell Land: "Depreciation can be used for significant tax credits and wealth retention."',
  },
  // E
  {
    id: 'earnest_money',
    term: 'Earnest Money Deposit (EMD)',
    letter: 'E',
    category: 'Real Estate & Housing',
    definition:
      'A deposit made to a seller representing that a buyer is entering into a contract in good faith. Demonstrates serious intent to purchase real property.',
    applicationInGame: 'Putting down 1-3% EMD secures Detroit multi-family homes during property acquisition escrow.',
    authorNote: 'Jeanell Land: "Earnest Money Deposit is to purchase agreements as a Security Deposit is to a lease."',
  },
  {
    id: 'equity',
    term: 'Equity',
    letter: 'E',
    category: 'Real Estate & Housing',
    definition:
      'The difference between the appraised fair market value of an asset and the remaining debt balance owed against it.',
    applicationInGame: 'As mortgage principal is paid down and property appreciates, equity compounds net worth.',
  },
  // G
  {
    id: 'generational_wealth',
    term: 'Generational Wealth',
    letter: 'G',
    category: 'Banking & Wealth',
    definition:
      'Assets, real property, businesses, and intellectual resources accumulated and passed down to future generations to ensure lasting financial security.',
    applicationInGame: 'The overarching endgame goal of Jeanell Land’s Better Forever framework.',
    authorNote: 'Jeanell Land: "When properly structured through trusts and insurance, inheritance taxes will not erode your family legacy."',
  },
  // H
  {
    id: 'hud',
    term: 'H.U.D. (Housing & Urban Development)',
    letter: 'H',
    category: 'Real Estate & Housing',
    definition:
      'The U.S. federal agency responsible for national policy and programs addressing housing needs, fair housing laws, and community development block grants.',
    applicationInGame: 'Accessing HUD grant programs enables the One Stop Center to rehabilitate abandoned properties into family shelters.',
  },
  // I
  {
    id: 'insurance',
    term: 'Insurance & Risk Underwriting',
    letter: 'I',
    category: 'Banking & Wealth',
    definition:
      'A legal contract (policy) where an individual or entity receives financial protection or reimbursement against losses from an insurance company.',
    applicationInGame: 'Structuring Life & Health plus Property & Casualty policies protects engineering labs and community housing.',
    authorNote: 'Jeanell Land: "Insurance is for the living! Structured correctly, permanent insurance builds cash value and generational wealth."',
  },
  // L
  {
    id: 'lift_to_drag',
    term: 'Lift-to-Drag Ratio (L/D)',
    letter: 'L',
    category: 'Aeronautics & STEM',
    definition:
      'The amount of lift generated by a wing or vehicle divided by the aerodynamic drag it creates. A measure of aerodynamic efficiency.',
    applicationInGame: 'Commercial gliders and high-efficiency airliners target L/D ratios between 15 and 22.',
  },
  // N
  {
    id: 'naca',
    term: 'N.A.C.A. (Neighborhood Assistance Corp.)',
    letter: 'N',
    category: 'Real Estate & Housing',
    definition:
      'A nonprofit community advocacy organization committed to economic justice through homeownership, offering no-down-payment, no-fee, below-market mortgages without credit score minimums.',
    applicationInGame: 'Utilized in Act III to transition Detroit neighborhood families into stable homeownership.',
  },
  // R
  {
    id: 'roi',
    term: 'Return on Investment (ROI)',
    letter: 'R',
    category: 'Banking & Wealth',
    definition:
      'A performance measure used to evaluate the efficiency or profitability of an investment: ROI = (Net Profit / Cost of Investment) × 100%.',
    applicationInGame: 'Calculated in all simulation labs to measure the financial and educational dividend of every decision.',
  },
  // T
  {
    id: 'tsiolkovsky',
    term: 'Tsiolkovsky Rocket Equation',
    letter: 'T',
    category: 'Aeronautics & STEM',
    definition:
      'The fundamental law of rocketry: Δv = v_e · ln(m_0 / m_f). The change in velocity is proportional to exhaust velocity and the natural logarithm of the initial to final mass ratio.',
    applicationInGame: 'In the Propulsion Lab, students burn fuel stages to reach the 7,800 m/s delta-v required for Low Earth Orbit.',
  },
  // Z
  {
    id: 'zoning',
    term: 'Zoning Laws & Urban Masterplans',
    letter: 'Z',
    category: 'Real Estate & Housing',
    definition:
      'Municipal regulations governing how real property can and cannot be used in specific geographic areas (residential, commercial, industrial, mixed-use).',
    applicationInGame: 'Navigating Detroit zoning permits enables opening transitional shelters and community training facilities.',
    authorNote: 'Jeanell Land: "Zoning laws dictate the types of buildings and activities permitted in local areas. Always verify zoning before purchasing."',
  },
];
