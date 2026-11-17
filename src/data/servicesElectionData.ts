import { ServiceElectionItem } from '../types/serviceElection';

export const JEANELL_LAND_SERVICES: ServiceElectionItem[] = [
  // 1. Tax Preparation & IRS Advisory
  {
    id: 'tax_1040_individual',
    title: 'Individual & Family Federal / State Tax Preparation (Form 1040)',
    category: 'tax_preparation',
    leadProfessional: 'Jeanell Land',
    leadTitle: 'IRS Authorized Paid Preparer (PTIN: P02309637)',
    credentials: [
      'IRS Form W-12 PTIN P02309637 (Active 2024 Renewal)',
      'One Stop Services Center L.L.C. (EIN: 85-3479358)',
      'SAM.gov Federal Procurement UEI: J9M1XVD4UYV5',
      'Dun & Bradstreet D-U-N-S®: 117718992',
    ],
    description:
      'Complete federal, Michigan, and City of Detroit income tax preparation for individuals, families, and sole proprietors. Maximizes Earned Income Tax Credit (EITC), Child Tax Credit, education deductions, and Schedule C self-employment expenses with bank-grade data security compliance.',
    pricingType: 'fixed',
    estimatedPrice: '$150 – $350 (Grant waivers available for low-income)',
    deliverables: [
      'IRS & State of Michigan e-File Transmission with Instant Confirmation',
      'Maximum Legal Refund & Tax Credit Optimization Analysis',
      'Schedule C Small Business Profit & Loss Optimization',
      'Year-Round Tax Record Storage & Audit Support Representation',
    ],
    statutoryAuthority: '31 C.F.R. Part 10 (Treasury Circular 230) & IRS Section 6109',
    entityName: 'One Stop Services Center L.L.C.',
    officialIdentifiers: {
      ptin: 'P02309637',
      ein: '85-3479358',
      duns: '117718992',
      samUei: 'J9M1XVD4UYV5',
    },
    highlight: 'Authorized IRS Paid Tax Preparer · Fast Electronic Filing',
  },
  {
    id: 'tax_business_corporate',
    title: 'Business Tax Preparation & Corporate Compliance (Forms 1065 / 1120 / 941)',
    category: 'tax_preparation',
    leadProfessional: 'Jeanell Land & Financial Associates',
    leadTitle: 'Business Tax Strategist & Corporate Filing Officer',
    credentials: [
      'IRS PTIN P02309637',
      'EIN: 85-3479358 (One Stop Services Center)',
      'FINRA SIE 3.0 / Capital Markets Compliance Standards',
    ],
    description:
      'Comprehensive annual and quarterly tax preparation for LLCs, S-Corporations, Partnerships, and commercial operators. Prepares Form 1065, Form 1120/1120-S, Form 941/940 employer returns, and Michigan Sales/Withholding taxes.',
    pricingType: 'fixed',
    estimatedPrice: '$450 – $1,200 (Tiered by gross volume)',
    deliverables: [
      'Federal Form 1065 / 1120-S Corporate Returns with Schedule K-1s',
      'Quarterly Form 941 Payroll & Form 940 FUTA Filings',
      'Michigan Department of Treasury Business & Sales Tax Returns',
      'Corporate Entity Classification & Election Advisory (Form 8832 / 2553)',
    ],
    statutoryAuthority: 'IRC Subchapter C & Subchapter S Regulations',
    entityName: 'One Stop Services Center L.L.C.',
    officialIdentifiers: {
      ptin: 'P02309637',
      ein: '85-3479358',
      duns: '117718992',
      samUei: 'J9M1XVD4UYV5',
    },
    highlight: 'Full-Cycle Corporate & Partnership Tax Compliance',
  },
  {
    id: 'tax_990_nonprofit',
    title: 'Nonprofit 501(c)(3) Annual IRS Information Filing (Form 990 / 990-EZ / 990-N)',
    category: 'tax_preparation',
    leadProfessional: 'Jeanell Land',
    leadTitle: 'Exempt Organizations Specialist & 501(c)(3) President',
    credentials: [
      'IRS Letter 947 DLN 26053700002260 (One Stop Rehabilitation Center)',
      'IRS PTIN P02309637',
      'Federal Public Charity Status 509(a)(2)',
    ],
    description:
      'Mandatory annual federal tax exemption reporting for 501(c)(3) public charities, religious groups, and civic foundations to safeguard tax-exempt status under Internal Revenue Code Section 501(c)(3).',
    pricingType: 'fixed',
    estimatedPrice: '$250 – $750 (Pro bono for qualifying Detroit grassroots groups)',
    deliverables: [
      'Form 990 / 990-EZ / 990-N Preparation & Electronic E-Filing',
      'Schedule A Public Support Percentage Computation',
      'Program Service Accomplishment Narrative Documentation',
      'Charitable Solicitation Disclosure Review',
    ],
    statutoryAuthority: 'IRC Section 6033 & Treasury Regulation § 1.6033-2',
    entityName: 'One Stop Services Center L.L.C.',
    officialIdentifiers: {
      ptin: 'P02309637',
      ein: '85-3479358',
      charityStatus: '509(a)(2)',
    },
    highlight: 'Protect Tax-Exempt Status with Certified Form 990 Filings',
  },

  // 2. Real Estate Deals & MLS Brokerage
  {
    id: 're_buyer_naca',
    title: 'First-Time Homebuyer Representation & NACA No-Down-Payment Financing',
    category: 'real_estate_deals',
    leadProfessional: 'Jeanell Land, Broker/Principal',
    leadTitle: 'Broker/Principal · All Your Needs Reality LLC (License #6504432062)',
    credentials: [
      'All Your Needs Reality LLC — Official Real Estate Brokerage (EIN: 93-3773484, D-U-N-S: 119175817, SAM UEI: J9M4QNB6NJS3)',
      'Jeanell Land, Broker/Principal · State of Michigan Real Estate Broker License #6504432062 (Exp: 08/06/2028)',
      'Detroit Association of REALTORS® (DAR Primary Application #6504432062)',
    ],
    description:
      'Dedicated buyer representation through All Your Needs Reality LLC (Jeanell Land, Broker/Principal) for Detroit and Michigan families utilizing NACA (Neighborhood Assistance Corporation of America) financing: No Down Payment, No Closing Costs, No Private Mortgage Insurance (PMI), and below-market interest rates.',
    pricingType: 'contingent',
    estimatedPrice: 'Seller-Paid Commission (100% Free to Qualified Homebuyer)',
    deliverables: [
      'Full MLS Nationwide Property Search & Private Showing Tours',
      'NACA Housing Counseling & Document Verification Coordination',
      'Purchase Agreement Drafting with Mandatory Protective Contingencies',
      'Home Inspection, Appraisal & Escrow Closing Management',
    ],
    statutoryAuthority: 'Michigan Occupational Code (Public Act 299 of 1980, Article 25)',
    entityName: 'All Your Needs Reality LLC',
    officialIdentifiers: {
      licenseNum: '6504432062',
      ein: '93-3773484',
      duns: '119175817',
      samUei: 'J9M4QNB6NJS3',
    },
    highlight: '0% Down Payment · $0 Closing Costs via NACA Mortgage Program',
  },
  {
    id: 're_commercial_acquisition',
    title: 'Commercial Real Estate Deals, Multi-Unit Acquisitions & Co-Op Structuring',
    category: 'real_estate_deals',
    leadProfessional: 'Jeanell Land, Broker/Principal',
    leadTitle: 'Broker/Principal · All Your Needs Reality LLC',
    credentials: [
      'All Your Needs Reality LLC · Principal Brokerage (EIN: 93-3773484 · SAM.gov: J9M4QNB6NJS3)',
      'State of Michigan Real Estate Broker License #6504432062',
      'Detroit Association of REALTORS® Member',
    ],
    description:
      'Specialized commercial property transactions, mixed-use development acquisitions, salon suite complexes, transitional housing facilities, and land contract structuring across Metropolitan Detroit.',
    pricingType: 'contingent',
    estimatedPrice: 'Standard Commercial Advisory Fee / Negotiated Commission',
    deliverables: [
      'Comprehensive Commercial Property Valuation & Pro-Forma Cash Flow Analysis',
      'Zoning, Environmental Phase I & Certificate of Occupancy Verification',
      'Commercial Lease-Option & Land Contract Financing Terms Drafting',
      'Closing Representation with Wayne County Register of Deeds Recording',
    ],
    statutoryAuthority: 'MCL 339.2501 et seq. (Michigan Real Estate Licensing)',
    entityName: 'All Your Needs Reality LLC',
    officialIdentifiers: {
      licenseNum: '6504432062',
      ein: '93-3773484',
      duns: '119175817',
    },
    highlight: 'Multi-Unit Portfolios & Commercial Deal Structuring',
  },

  // 3. One Stop Rehabilitation Center 501(c)(3) Nonprofit Community Services
  {
    id: 'onestop_job_placement_landscaping',
    title: 'Job Placement & Vocational Landscaping for Veterans, Returning Citizens & Foster Adults',
    category: 'onestop_nonprofit',
    leadProfessional: 'Jeanell Land',
    leadTitle: 'President & Executive Director, One Stop Rehabilitation Center',
    credentials: [
      'IRS 501(c)(3) Determination Letter 947 (DLN: 26053700002260, EIN: 85-3488624)',
      'State of Michigan LARA Articles of Incorporation (ID: 802536743, Filing #220307668950)',
      'Public Charity Status: 509(a)(2) · Effective Date: October 07, 2020',
      'FCC Registration System (CORES) FRN: 0033922386',
    ],
    description:
      'Article II Statutory Mission: Providing direct rehabilitation programs through job placement and municipal/commercial landscaping services for low-income citizens, military veterans, disabled individuals, returning citizens, and aged-out foster care adults across Detroit.',
    pricingType: 'free_nonprofit',
    estimatedPrice: '$0.00 (100% Free Public Community Service)',
    deliverables: [
      'Vocational Training in Commercial Groundskeeping, Heavy Equipment & Landscaping',
      'Direct Job Placement with Detroit Contractors & Municipal Entities',
      'Work Equipment, Safety Boots & Uniform Distribution',
      'Ongoing Employment Mentorship & Re-Entry Case Management',
    ],
    statutoryAuthority: 'IRC Section 501(c)(3) & Michigan Nonprofit Corporation Act 162 of 1982',
    entityName: 'One Stop Rehabilitation Center 501(c)(3)',
    officialIdentifiers: {
      ein: '85-3488624',
      laraId: '802536743',
      irsLetter: 'Letter 947 (Rev. 2-2020)',
      charityStatus: '509(a)(2) Public Charity',
      fccFrn: '0033922386',
    },
    highlight: 'Official Article II Mission: Job Placement & Landscaping Services',
  },
  {
    id: 'onestop_housing_domestic_violence',
    title: '24/7 Domestic Violence Haven Beds & Aged-Out Foster Care Sanctuary',
    category: 'onestop_nonprofit',
    leadProfessional: 'Jeanell Land',
    leadTitle: 'Licensed Foster Parent & Shelter Director',
    credentials: [
      'IRS 501(c)(3) Public Charity (EIN: 85-3488624)',
      'Michigan LARA Registered Domestic Nonprofit #802536743',
      'Detroit, Michigan Emergency Facility',
    ],
    description:
      'Emergency haven beds and transitional housing for women and children escaping domestic abuse, alongside structured residential sanctuary and life skills coaching for youth aging out of foster care at age 18.',
    pricingType: 'free_nonprofit',
    estimatedPrice: '$0.00 (Emergency Crisis Relief)',
    deliverables: [
      'Immediate Confidential Safe Bed Placement (24 Hours / 7 Days)',
      'Trauma-Informed Life Coaching & Mental Wellness Coordination',
      'Independent Living Skills: Budgeting, Cooking, Banking & Career Paths',
      'Long-Term Permanent Housing Transition Assistance',
    ],
    statutoryAuthority: 'IRC 501(c)(3) Humanitarian Relief Standards',
    entityName: 'One Stop Rehabilitation Center 501(c)(3)',
    officialIdentifiers: {
      ein: '85-3488624',
      laraId: '802536743',
      charityStatus: '509(a)(2)',
    },
    highlight: '24/7 Crisis Beds · Safe Sanctuary for Foster Youth & Families',
  },
  {
    id: 'onestop_tax_deductible_donation',
    title: 'Tax-Deductible Charitable Contribution / Sponsorship (IRC Section 170)',
    category: 'onestop_nonprofit',
    leadProfessional: 'Jeanell Land',
    leadTitle: 'President, One Stop Rehabilitation Center',
    credentials: [
      'IRS Official Determination Letter 947 (Effective Oct 07, 2020)',
      'DLN: 26053700002260 · Public Charity 509(a)(2)',
      'Qualified for Tax-Deductible Contributions under IRC § 170 / § 2055 / § 2522',
    ],
    description:
      'Make a tax-deductible donor contribution to fund emergency shelter beds, returning citizen job kits, food pantry logistics, and youth S.T.E.A.M. academies. Official IRS deduction receipt issued immediately.',
    pricingType: 'tax_deductible_donation',
    estimatedPrice: 'Donor Discretion ($25, $50, $100, $250, $500, or Custom)',
    deliverables: [
      'Official IRS Form 170 Charitable Contribution Tax Receipt',
      'Direct Impact Allocation: Food, Shelter, Landscaping Tools or Youth S.T.E.A.M.',
      'Sponsor Recognition on T.E.A.R.S. Channel 100.1 FM Broadcasts',
      'Quarterly Transparency & Program Accomplishment Impact Report',
    ],
    statutoryAuthority: 'IRC Section 170(c)(2) Charitable Deduction Code',
    entityName: 'One Stop Rehabilitation Center 501(c)(3)',
    officialIdentifiers: {
      ein: '85-3488624',
      laraId: '802536743',
      irsLetter: 'Letter 947 (Rev. 2-2020)',
    },
    highlight: '100% Tax-Deductible Donation under IRC § 170',
  },
  {
    id: 'onestop_expungement_ichat',
    title: 'ICHAT Record Expungement Legal Clinic & Clean Slate Re-Entry',
    category: 'onestop_nonprofit',
    leadProfessional: 'Jeanell Land & Legal Defense Advocates',
    leadTitle: 'Re-entry Program Director & Justice Advocate',
    credentials: [
      'One Stop Rehabilitation Center 501(c)(3) (EIN: 85-3488624)',
      'Michigan Clean Slate Act (Public Acts 361–368 of 2020)',
      'State of Michigan LARA ID: 802536743',
    ],
    description:
      'Pro bono legal advocacy and criminal history record clearing under Michigan Clean Slate legislation. Eradicates historical conviction barriers to secure employment, housing, and professional state licenses.',
    pricingType: 'free_nonprofit',
    estimatedPrice: '$0.00 (Pro Bono Re-Entry Service)',
    deliverables: [
      'Official Michigan ICHAT Criminal History Background Analysis',
      'Eligibility Verification for Misdemeanor and Felony Set-Aside Petitions',
      'Court Motion Drafting & Supporting Character Packet Preparation',
      'Representation and Hearing Coaching before Wayne County Circuit Court',
    ],
    statutoryAuthority: 'MCL 780.621 et seq. (Michigan Clean Slate Act)',
    entityName: 'One Stop Rehabilitation Center 501(c)(3)',
    officialIdentifiers: {
      ein: '85-3488624',
      laraId: '802536743',
    },
    highlight: 'Clear Criminal Records · Free Clean Slate Legal Clinic',
  },

  // 4. Insurance & Risk Solutions
  {
    id: 'insurance_consultation',
    title: 'Life, Commercial Property, Liability & Casualty Insurance Solutions',
    category: 'insurance_risk',
    leadProfessional: 'Jeanell Land',
    leadTitle: 'Licensed Resident Producer, State of Michigan DIFS',
    credentials: [
      'Michigan Department of Insurance & Financial Services (DIFS)',
      'Resident Producer License (System ID: 0323291, NPN: 7916345)',
      'Qualifications: Life, Accident & Health, Property, Casualty',
    ],
    description:
      'Risk assessment, life insurance structuring, key-person business coverage, commercial property protection, and liability policies for Detroit entrepreneurs and families.',
    pricingType: 'contingent',
    estimatedPrice: 'Free Policy Review & Quote Consultation',
    deliverables: [
      'Comprehensive Family / Business Risk Exposure Audit',
      'Multi-Carrier Competitive Insurance Premium Comparison',
      'Life Insurance Estate Planning (Term, Whole Life & IUL)',
      'Commercial Property & General Liability Policy Issuance',
    ],
    statutoryAuthority: 'Michigan Insurance Code (Public Act 218 of 1956)',
    entityName: 'One Stop Services Center L.L.C.',
    officialIdentifiers: {
      licenseNum: '0323291 (NPN: 7916345)',
      ein: '85-3479358',
    },
    highlight: 'Licensed DIFS Resident Producer · Complete Risk Coverage',
  },

  // 5. Goldie's Unique Beauty Creations Beauty World
  {
    id: 'goldies_coop_booth',
    title: 'Co-Operative Equity-Lease Booth Allocation (Hair Stylists & Nail Technicians)',
    category: 'goldies_beauty_world',
    leadProfessional: 'Jeanell Land',
    leadTitle: 'Managing Member & Master Stylist Mentor',
    credentials: [
      'USPTO Patent Docket #GOLDIES-BEAUTY-WORLD-PAT-2026-1021',
      'IRS EIN: 85-3559446 · SAM.gov UEI: J9R1TSCT26E1',
      'Domain: www.goldiesuniquebeautycreationsbeautyworld.com',
    ],
    description:
      'Join Goldie’s Unique Beauty Creations Beauty World under the patented Co-Operative Equity-Leasing model. Instead of paying dead rent, your weekly or monthly lease payments earn real commercial property equity and facility ownership shares, coupled with on-site free childcare.',
    pricingType: 'fixed',
    estimatedPrice: '$350 / week (55% converted directly to property equity)',
    deliverables: [
      'Dedicated 24/7 Styling Station or Private Nail Suite with Ventilation',
      'Accrual in Cryptographic Co-Op Equity Ledger (Equation E(t))',
      'Free On-Site Licensed Childcare for Children During Service Shifts',
      'Centralized 24/7 Online Client Booking via Official Web Portal',
    ],
    statutoryAuthority: '35 U.S.C. § 111 & Michigan Limited Liability Company Act',
    entityName: "Goldie's Unique Beauty Creations Beauty World L.L.C.",
    officialIdentifiers: {
      ein: '85-3559446',
      samUei: 'J9R1TSCT26E1',
    },
    highlight: 'No Dead Rent · Accumulate Real Property Ownership & Free Childcare',
  },

  // 6. AI Training & Applied Prompt Engineering
  {
    id: 'ai_training_mastery',
    title: 'AI Training, Applied Prompt Engineering & Workflow Automation',
    category: 'ai_training',
    leadProfessional: 'Jeanell Land & Technical Associates',
    leadTitle: 'S.T.E.A.M. Systems Engineer & AI Curriculum Director',
    credentials: [
      'Aeronautical Systems & Data Architecture Background',
      'One Stop Services Center L.L.C. (EIN: 85-3479358)',
      'Certified S.T.E.A.M. Virtual Academy Faculty',
    ],
    description:
      'Comprehensive hands-on AI training for students, adult night school scholars, entrepreneurs, and professionals. Covers modern AI foundation models, prompt engineering architectures, workflow automation, document classification, AI ethics, and practical business intelligence.',
    pricingType: 'fixed',
    estimatedPrice: '$200 – $600 (Scholarship grants available for enrolled students)',
    deliverables: [
      'Hands-on Prompt Engineering & Structured Reasoning Lab Practicums',
      'Business Workflow Automation with AI Agents & Data Pipelines',
      'Ethics, Privacy, Data Security & Verification Protocols',
      'Certificate of AI Systems & Prompt Architecture Completion',
    ],
    statutoryAuthority: 'Workforce Innovation and Opportunity Act (WIOA) Standards',
    entityName: 'One Stop Services Center L.L.C.',
    officialIdentifiers: {
      ein: '85-3479358',
      samUei: 'J9M1XVD4UYV5',
    },
    highlight: 'Master Applied AI & Prompt Engineering for High-Paying 21st-Century Careers',
  },

  // 7. Project Management Professional (PMP) & Grant Execution
  {
    id: 'project_management_pmp',
    title: 'Project Management & Capital Infrastructure Execution (PMP Standards)',
    category: 'project_management',
    leadProfessional: 'Jeanell Land',
    leadTitle: 'Senior Project Director & Capital Grant Administrator',
    credentials: [
      'SAM.gov Federal Procurement Registered UEI: J9M1XVD4UYV5',
      'One Stop Rehabilitation Center 501(c)(3) Capital Development Director',
      'Multi-Million Dollar Infill Construction & S.T.E.A.M. Facility Manager',
    ],
    description:
      'Professional project management services adhering to Project Management Institute (PMI) standards. Specializes in municipal infill development, federal grant compliance, Gantt milestone scheduling, stakeholder risk matrices, and multi-agency capital delivery.',
    pricingType: 'hourly',
    estimatedPrice: '$75 – $150 / hr (Tiered for non-profits and commercial builders)',
    deliverables: [
      'Work Breakdown Structure (WBS) & Critical Path Method (CPM) Scheduling',
      'Budget Burn Rate Analysis & Grant Expenditure Auditing',
      'Subcontractor Procurement, Vendor Vetting & Lien Waiver Management',
      'Monthly Executive Milestone Dashboards & Regulatory Reporting',
    ],
    statutoryAuthority: '2 CFR 200 (Uniform Guidance for Federal Grants & Capital Projects)',
    entityName: 'One Stop Services Center L.L.C.',
    officialIdentifiers: {
      ein: '85-3479358',
      samUei: 'J9M1XVD4UYV5',
      duns: '117718992',
    },
    highlight: 'Rigorous On-Time & On-Budget Project Execution from Inception to Handover',
  },

  // 8. Notary Public & Mobile Loan Signing
  {
    id: 'notary_public_signing',
    title: 'Certified Notary Public & Mobile Loan Signing Agent Services',
    category: 'notary_public',
    leadProfessional: 'Jeanell Land',
    leadTitle: 'State of Michigan Commissioned Notary Public',
    credentials: [
      'Commissioned by the State of Michigan (Wayne County)',
      'National Notary Association (NNA) Standards Compliance',
      'Errors & Omissions (E&O) Insured & Surety Bonded',
    ],
    description:
      'Official notarial acts, document authentications, and certified signing agent services. Administers sworn oaths, Jurats, Acknowledgments, power of attorney documents, certified deeds, trusts, real estate mortgage closings, and business entity formation filings.',
    pricingType: 'fixed',
    estimatedPrice: '$10 – $15 per notarial act (Travel signing fees quoted by mileage)',
    deliverables: [
      'Statutory Identity Verification & Notarial Certificate Execution',
      'Real Estate Loan & Mortgage Closing Document Package Certification',
      'Notarial Register Journal Logging & Embossed / Inked Seal Stamping',
      'Mobile On-Site Notarization across Metro Detroit and Wayne County',
    ],
    statutoryAuthority: 'Michigan Notary Public Act (MCL 55.261 et seq.)',
    entityName: 'One Stop Services Center L.L.C.',
    officialIdentifiers: {
      ein: '85-3479358',
    },
    highlight: 'State-Commissioned Notary Public · Reliable Mobile Real Estate & Legal Signings',
  },

  // 9. CDL Class A and Class B Commercial Transportation Training
  {
    id: 'cdl_transportation_class_ab',
    title: 'CDL Class A & Class B Commercial Driver Transportation Training & Placement',
    category: 'cdl_transportation',
    leadProfessional: 'Jeanell Land & Certified CDL Master Instructors',
    leadTitle: 'Commercial Transportation Program Director',
    credentials: [
      'FMCSA Entry-Level Driver Training (ELDT) Registered Standards',
      'One Stop Rehabilitation Center Workforce Development Division',
      'USDOT / Michigan Department of Transportation Safety Compliant',
    ],
    description:
      'Comprehensive Commercial Driver’s License (CDL) workforce training for Class A (combination tractor-trailers, 80,000 lbs GVWR) and Class B (heavy straight vehicles, box trucks, transit/school buses, dump trucks). Covers air brakes, pre-trip vehicle inspection, hazardous materials/tanker endorsements, hours of service (HOS), and direct commercial fleet job placement.',
    pricingType: 'fixed',
    estimatedPrice: 'Full Grant Funding Available via Michigan Reconnect & Workforce Grants',
    deliverables: [
      'Class A & Class B FMCSA Theory & Behind-the-Wheel Drive Yard Prep',
      'Air Brake Endorsement & Pre-Trip Safety Inspection Mastery',
      'Logbook Compliance, Electronic Logging Devices (ELD) & Road Safety',
      'Direct Career Placement with Regional Freight & Municipal Transit Fleets',
    ],
    statutoryAuthority: '49 CFR Part 380 (Federal Motor Carrier Safety Administration ELDT)',
    entityName: 'One Stop Rehabilitation Center 501(c)(3)',
    officialIdentifiers: {
      ein: '85-3488624',
      laraId: '802536743',
    },
    highlight: 'Class A & B CDL Licensing · High-Wage Transportation & Logistics Careers',
  },
];
