import { JusticeResource, LegalSimulationStep } from '../types/game';

export const JUSTICE_RESOURCES: JusticeResource[] = [
  // 0. Citizen Legislative Petitions & Family Reunification
  {
    id: 'res-family-reunite-act',
    category: 'Family Reunification & Civil Advocacy',
    title: 'Family Reunite Act Petition (Change.org/FamilyReuniteAct)',
    agencyOrOrg: 'National Family Reunification Movement & Jeanell Land',
    jurisdictionOrArea: 'Detroit, Michigan & Nationwide (USA)',
    phone: '313-267-4600',
    url: 'https://www.change.org/FamilyReuniteAct',
    description: 'Official citizen legislative petition launched by Jeanell Land advocating for federal and state statutory reform to reunite families separated by wrongful arrests, incarceration, corporate greed, and systemic child welfare barriers. Urges lawmakers to protect fundamental parental rights, halt wrongful garnishment, and establish pathways for families to heal together.',
    howToAccess: 'Visit https://www.change.org/FamilyReuniteAct to sign, share, and track the petition progress.',
    isEmergency: false,
  },
  {
    id: 'res-family-reunite-act-action-center',
    category: 'Family Reunification & Civil Advocacy',
    title: 'One Stop Family Reunite Action Center & Reparation Coalition',
    agencyOrOrg: 'One Stop Rehabilitation Center 501(c)(3)',
    jurisdictionOrArea: 'Detroit, Wayne County & Midwest',
    phone: '313-555-ONESTOP',
    url: 'https://www.change.org/FamilyReuniteAct',
    description: 'Community advocacy initiative founded by Jeanell Land providing direct assistance for families fighting wrongful child protective removals, petitioning for vacatur of predatory child support arrears accumulated during incarceration, and advocating for state reparation bonds.',
    howToAccess: 'Sign the petition online at https://www.change.org/FamilyReuniteAct or visit 15400 Grand River Ave, Detroit.',
    isEmergency: false,
  },
  {
    id: 'res-foc-arrears-relief',
    category: 'Family Reunification & Civil Advocacy',
    title: 'Wayne County Friend of the Court · Incarceration Arrears Relief Bureau',
    agencyOrOrg: '3rd Judicial Circuit Court Family Division',
    jurisdictionOrArea: 'Wayne County / Detroit, MI',
    phone: '877-543-2660',
    url: 'https://www.3rdcc.org/divisions/friend-of-the-court',
    description: 'Official intake desk for filing motions to abate child support arrears, quash wage garnishment, and request parenting time modifications following dismissal of criminal charges under MCL 552.603b.',
    howToAccess: 'Coleman A. Young Municipal Center, 2 Woodward Ave, Detroit, MI 48226 or online via MiChildSupport portal.',
    isEmergency: false,
  },

  // 1. Internal Affairs & Civilian Oversight
  {
    id: 'res-ia-detroit',
    category: 'Internal Affairs & Oversight',
    title: 'Detroit Police Department Internal Affairs Bureau (IAB)',
    agencyOrOrg: 'Detroit Police Department Headquarters',
    jurisdictionOrArea: 'Detroit & Wayne County',
    phone: '313-596-2499',
    url: 'https://detroitmi.gov/departments/police-department/internal-affairs',
    description: 'Investigates allegations of police misconduct, excessive force, civil rights violations, and administrative corruption.',
    howToAccess: 'Call directly or file a confidential Form DPD-652 online or in person at 1301 Third Ave, Detroit.',
  },
  {
    id: 'res-bopc-detroit',
    category: 'Internal Affairs & Oversight',
    title: 'Detroit Board of Police Commissioners (Civilian Oversight)',
    agencyOrOrg: 'City of Detroit Charter Civilian Board',
    jurisdictionOrArea: 'Detroit Citywide',
    phone: '313-596-2499',
    url: 'https://detroitmi.gov/government/boards/board-police-commissioners',
    description: 'Independent civilian board with supervisory authority over DPD policies, disciplinary appeals, and citizen complaints.',
    howToAccess: 'Attend public weekly hearings every Thursday at 3:00 PM or submit written testimony via their civilian portal.',
  },

  // 2. Legal Aid & Public Defenders
  {
    id: 'res-legal-aid-michigan',
    category: 'Legal Aid & Public Defenders',
    title: 'Michigan Legal Help & Legal Aid and Defender Association',
    agencyOrOrg: 'LADA (Legal Aid and Defender Association)',
    jurisdictionOrArea: 'Wayne, Oakland & Macomb Counties',
    phone: '877-964-4700',
    url: 'https://michiganlegalhelp.org',
    description: 'Free legal representation and self-help toolkits for low-income residents in civil rights, housing, family law, and expungement.',
    howToAccess: 'Intake line open Monday–Thursday 9:00 AM – 3:00 PM or visit 613 Abbott St, Detroit.',
  },
  {
    id: 'res-nds-detroit',
    category: 'Legal Aid & Public Defenders',
    title: 'Neighborhood Defender Service (NDS) of Detroit',
    agencyOrOrg: 'Wayne County Indigent Defense Provider',
    jurisdictionOrArea: 'Wayne County Criminal Courts',
    phone: '313-964-1110',
    url: 'https://ndsdetroit.org',
    description: 'Client-centered public defense offering trial representation, social workers, and post-conviction advocacy.',
    howToAccess: 'Assigned by Wayne County Third Judicial Circuit Court or call for client family intake.',
  },

  // 3. Bar Associations & Wrongful Conviction Units
  {
    id: 'res-state-bar-michigan',
    category: 'Bar Associations & Wrongful Conviction',
    title: 'State Bar of Michigan Lawyer Referral & Ethics Bureau',
    agencyOrOrg: 'State Bar of Michigan',
    jurisdictionOrArea: 'Statewide (Michigan)',
    phone: '800-968-0738',
    url: 'https://www.michbar.org',
    description: 'Connects citizens with vetted attorneys, manages grievance commission complaints against corrupt lawyers, and pro bono referrals.',
    howToAccess: 'Use the online Lawyer Referral Service (LRS) or call the ethics hotline.',
  },
  {
    id: 'res-innocence-clinic',
    category: 'Bar Associations & Wrongful Conviction',
    title: 'Michigan Innocence Clinic (University of Michigan Law)',
    agencyOrOrg: 'University of Michigan Law School',
    jurisdictionOrArea: 'Statewide Michigan',
    phone: '734-763-9358',
    url: 'https://law.umich.edu/special-programs/clinics/michigan-innocence-clinic',
    description: 'Exonerates wrongfully convicted individuals across Michigan, particularly where non-DNA evidence demonstrates actual innocence.',
    howToAccess: 'Submit written questionnaire and court docket documents via postal mail or legal advocate referral.',
  },

  // 4. Police Departments & Precincts
  {
    id: 'res-dpd-precincts',
    category: 'Police Precincts & Civilian Liaisons',
    title: 'Detroit Police Department Precinct Directory (1st to 12th)',
    agencyOrOrg: 'Detroit Police Department Non-Emergency Dispatch',
    jurisdictionOrArea: 'Detroit Precincts 1–12',
    phone: '313-267-4600',
    url: 'https://detroitmi.gov/departments/police-department/precincts',
    description: 'Direct contact info for local precinct desks: 2nd Precinct (313-596-5200), 7th Precinct (313-596-5700), 10th Precinct (313-596-1000), 12th Precinct (313-596-1200).',
    howToAccess: 'Call non-emergency dispatch or visit your designated local precinct desk with government ID.',
  },

  // 5. Whistleblower Portals
  {
    id: 'res-osha-whistleblower',
    category: 'Whistleblower Portals',
    title: 'OSHA Federal Whistleblower Protection Program',
    agencyOrOrg: 'U.S. Department of Labor',
    jurisdictionOrArea: 'National (USA)',
    phone: '800-321-6742',
    url: 'https://www.whistleblowers.gov',
    description: 'Enforces statutory protections for employees who report corporate fraud, safety hazards, environmental violations, or airline security flaws.',
    howToAccess: 'File a complaint online within statutory deadlines (30 to 180 days depending on statute).',
  },
  {
    id: 'res-doj-civil-rights',
    category: 'Whistleblower Portals',
    title: 'U.S. Department of Justice Civil Rights Division',
    agencyOrOrg: 'U.S. Department of Justice',
    jurisdictionOrArea: 'National (USA)',
    phone: '855-856-1247',
    url: 'https://civilrights.justice.gov',
    description: 'Federal investigation portal for patterns of police misconduct, housing discrimination, hate crimes, and systemic voting rights violations.',
    howToAccess: 'Submit an online report detailing incident dates, officer names/badge numbers, and witness contacts.',
  },

  // 6. Crisis & Suicide Hotlines
  {
    id: 'res-988-lifeline',
    category: 'Crisis & Suicide Hotlines',
    title: '988 Suicide & Crisis Lifeline (24/7/365 Free & Confidential)',
    agencyOrOrg: 'SAMHSA & National Crisis Network',
    jurisdictionOrArea: 'National (USA) & Local Dispatch',
    phone: '988',
    url: 'https://988lifeline.org',
    description: 'Immediate compassionate support for anyone in suicidal crisis, mental health distress, or emotional trauma. Available by call or text.',
    howToAccess: 'Dial or text 988 anytime. Spanish and TTY options available.',
    isEmergency: true,
  },
  {
    id: 'res-crisis-text-line',
    category: 'Crisis & Suicide Hotlines',
    title: 'Crisis Text Line (Free 24/7 Confidential Mental Health)',
    agencyOrOrg: 'Crisis Text Line',
    jurisdictionOrArea: 'National (USA)',
    phone: 'Text HOME to 741741',
    url: 'https://www.crisistextline.org',
    description: 'Connect with a trained volunteer crisis counselor via SMS for panic attacks, depression, and trauma.',
    howToAccess: 'Send SMS message with word "HOME" to 741741.',
    isEmergency: true,
  },

  // 7. Domestic Violence Shelters & Hotlines
  {
    id: 'res-nat-dv-hotline',
    category: 'Domestic Violence Shelters',
    title: 'National Domestic Violence Hotline (1-800-799-SAFE)',
    agencyOrOrg: 'National Domestic Violence Center',
    jurisdictionOrArea: 'National (USA)',
    phone: '800-799-7233',
    url: 'https://www.thehotline.org',
    description: 'Confidential crisis intervention, safety planning, and emergency shelter bed locator for survivors of domestic violence and coercive control.',
    howToAccess: 'Call 1-800-799-SAFE (7233) or text "START" to 88788.',
    isEmergency: true,
  },
  {
    id: 'res-one-stop-dv-haven',
    category: 'Domestic Violence Shelters',
    title: 'One Stop Rehabilitation Center 24/7 Domestic Violence Haven Beds',
    agencyOrOrg: 'One Stop Rehabilitation Center 501(c)(3)',
    jurisdictionOrArea: 'Detroit & Wayne County',
    phone: '(313) 510-3610',
    url: 'https://onestoprehabilitationcenters.org',
    description: 'Transitional housing beds, trauma-informed mental health coaching, credit restoration, and legal escorts founded by Jeanell Land.',
    howToAccess: 'Direct family intake line or hospital emergency department social worker referral.',
    isEmergency: true,
  },

  // 8. Crime Reporting & Anonymous Tips
  {
    id: 'res-crime-stoppers',
    category: 'Crime Reporting & Anonymous Tips',
    title: 'Crime Stoppers of Michigan (1-800-SPEAK-UP)',
    agencyOrOrg: 'Crime Stoppers USA Affiliate',
    jurisdictionOrArea: 'Southeast Michigan',
    phone: '800-773-2587',
    url: 'https://1800speakup.org',
    description: '100% anonymous crime reporting with cash rewards up to $2,500. Phone calls are never recorded and IP addresses are not tracked.',
    howToAccess: 'Call 1-800-SPEAK-UP or submit an encrypted online tip.',
  },

  // 9. Appeals Courts & Expungement
  {
    id: 'res-michigan-appeals',
    category: 'Appeals Courts & Expungement',
    title: 'Michigan Court of Appeals & State Appellate Defender Office (SADO)',
    agencyOrOrg: 'Michigan Judicial Branch',
    jurisdictionOrArea: 'Statewide (Michigan)',
    phone: '313-974-5700',
    url: 'https://www.courts.michigan.gov/courts/court-of-appeals',
    description: 'Handles appeals from Wayne County Circuit Court and trial courts. SADO provides appellate defense for indigent individuals seeking to overturn convictions.',
    howToAccess: 'File a Claim of Appeal within 21 or 42 days of entry of judgment or motion for new trial.',
  },
  {
    id: 'res-clean-slate-michigan',
    category: 'Appeals Courts & Expungement',
    title: 'Michigan Clean Slate Automated Expungement & One Stop Clinic',
    agencyOrOrg: 'Michigan Department of Attorney General & One Stop Center',
    jurisdictionOrArea: 'Statewide Michigan',
    phone: '313-456-0240',
    url: 'https://www.michigan.gov/ag/initiatives/expungement-initiative',
    description: 'Information and legal clinics for setting aside convictions under Michigan Clean Slate laws, removing criminal records to unlock housing and jobs.',
    howToAccess: 'Attend free monthly One Stop Rehabilitation Center expungement clinics or check your ICHAT criminal history.',
  },
];

export const LEGAL_SIMULATION_STEPS: LegalSimulationStep[] = [
  // 1. HOW TO DOCUMENT
  {
    id: 'sim_document_incident',
    mode: 'document',
    title: 'Game 1: How to Document (The Evidence Journaling Protocol)',
    scenario:
      'You are pulled over on Woodward Ave. The officer asks you to step out, refuses to provide their badge number, and issues a summons for an extended rental vehicle that you have valid paperwork for. How do you document this interaction legally and accurately?',
    instructions:
      'Select the legally bulletproof method for contemporaneous note-taking that will hold up in court or Internal Affairs review.',
    taskPrompt: 'Which documentation method preserves maximum evidentiary integrity?',
    correctAction: 'opt_contemporaneous_log',
    options: [
      {
        id: 'opt_contemporaneous_log',
        text: 'Write a contemporaneous timestamped journal entry immediately: patrol car unit number, exact time, street intersection, badge number or physical description, badge patch, names of all passengers, and verbatim quotes. Keep the original without scratching out words.',
        isCorrect: true,
        explanation: 'Contemporaneous notes written immediately after an incident are legally recognized as highly credible evidence under federal and state rules of evidence.',
      },
      {
        id: 'opt_social_media_rant',
        text: 'Post an angry, generalized video on social media accusing the whole department without writing down the officer’s vehicle number, badge, or time.',
        isCorrect: false,
        explanation: 'Emotional social media posts without specific times, dates, and badge numbers cannot be introduced as verified legal evidence in an administrative hearing.',
      },
      {
        id: 'opt_rewrite_later',
        text: 'Wait two weeks until your court date, then try to reconstruct what happened from memory on a scrap paper with altered dates.',
        isCorrect: false,
        explanation: 'Delayed notes with alterations are easily challenged by prosecutors as fabricated or contaminated by faded memory.',
      },
    ],
    practicalTakeaway:
      'Always document: Date, Exact Time, Location/Cross Streets, Vehicle Unit Number, Officer Name & Badge Number, and verbatim quotes in an unedited journal.',
  },

  // 2. HOW TO UPLOAD
  {
    id: 'sim_upload_evidence',
    mode: 'upload',
    title: 'Game 2: How to Upload (Digital Chain of Custody & Metadata)',
    scenario:
      'You have phone video footage of the interaction, a digital PDF receipt showing your rental car contract extension, and photos of the returned vehicle on the rental lot. How do you upload and archive these files to guarantee digital chain of custody?',
    instructions:
      'Choose the upload procedure that prevents file corruption, preserves original EXIF metadata, and proves the files were never altered.',
    taskPrompt: 'What is the correct protocol for uploading digital evidence?',
    correctAction: 'opt_metadata_backup',
    options: [
      {
        id: 'opt_metadata_backup',
        text: 'Preserve the original raw camera files with untouched EXIF metadata (GPS coordinates, creation timestamp). Create two redundant encrypted cloud backups (e.g. Google Drive / encrypted vault) and export an uncompressed copy to a USB drive for your attorney.',
        isCorrect: true,
        explanation: 'Raw uncompressed files preserve EXIF metadata and file hashes, proving authenticity against claims of editing or deepfakes.',
      },
      {
        id: 'opt_screenshot_text',
        text: 'Take a blurry screenshot of the video on your phone screen and text it to a friend via SMS, then delete the original video to save phone storage.',
        isCorrect: false,
        explanation: 'SMS compression strips metadata and degrades resolution, destroying forensic chain of custody.',
      },
      {
        id: 'opt_edit_filters',
        text: 'Apply video filters and add dramatic background music to make the video look more compelling before submitting.',
        isCorrect: false,
        explanation: 'Any editorial modification to video files can lead a judge to exclude the footage as contaminated or tampered with.',
      },
    ],
    practicalTakeaway:
      'Never edit evidence files. Preserve untouched originals with full EXIF metadata and store copies in multiple secure cloud locations.',
  },

  // 3. HOW TO FILE
  {
    id: 'sim_file_complaint',
    mode: 'file',
    title: 'Game 3: How to File (Administrative & Court Submission)',
    scenario:
      'You have your documented timeline and uploaded evidence of wrongful arrest. You want to file an official complaint with Internal Affairs and an expungement motion with the court clerk. What is the lawful step-by-step procedure?',
    instructions:
      'Identify the proper legal sequence for filing complaints and court pleadings.',
    taskPrompt: 'What is the required legal procedure for formal filing?',
    correctAction: 'opt_formal_filing_seq',
    options: [
      {
        id: 'opt_formal_filing_seq',
        text: '1. Complete the official sworn complaint form (signed under penalty of perjury). 2. Attach chronologically indexed evidence exhibits (Exhibit A, B, C). 3. Serve copies via certified mail with return receipt requested or file in person with the clerk, obtaining a time-stamped copy for your personal records.',
        isCorrect: true,
        explanation: 'A time-stamped clerk receipt and certified mail tracking number prove the exact date the agency or court received your filing, preventing bureaucratic dismissal.',
      },
      {
        id: 'opt_anonymous_email',
        text: 'Send an anonymous one-sentence email to the precinct contact form with no exhibits or contact information.',
        isCorrect: false,
        explanation: 'Anonymous emails with no verifiable exhibits are routinely archived without formal investigation or docketing.',
      },
      {
        id: 'opt_shout_in_hallway',
        text: 'Walk into the court hallway and demand the bailiff arrest the rental car company manager immediately.',
        isCorrect: false,
        explanation: 'Courts only act on formal written motions and verified pleadings filed with the clerk of the court.',
      },
    ],
    practicalTakeaway:
      'Always get a physical time-stamped copy from the clerk, index your exhibits chronologically, and send formal notices via certified mail.',
  },

  // 4. WHERE TO GO TO FILE
  {
    id: 'sim_where_to_file',
    mode: 'file',
    title: 'Game 4: Where to Go to File (Courthouse & Agency Route Finder)',
    scenario:
      'You are holding your documented timeline and sworn affidavits regarding an unlawful arrest by local officers over an extended and retrieved rental car. Where do you physically go in Detroit to file your administrative citizen complaint and emergency court petition?',
    instructions:
      'Match the correct physical courthouse building, room number, and clerk window for each specific legal filing.',
    taskPrompt: 'Which courthouse building and filing window handles citizen misconduct complaints vs. emergency court appeals?',
    correctAction: 'opt_correct_building_routing',
    options: [
      {
        id: 'opt_correct_building_routing',
        text: 'File the Police Misconduct Citizen Complaint at Detroit Police Headquarters (1301 Third Ave, 5th Floor Room 502, Internal Affairs Bureau) AND file the Emergency Judicial Appeal at Frank Murphy Hall of Justice (1441 St. Antoine St, Room 101 Criminal Division Clerk Window).',
        isCorrect: true,
        explanation: 'Administrative complaints against officers must go to Internal Affairs / Board of Police Commissioners, while legal challenges to charges or bail must go to the Criminal Clerk at the Hall of Justice.',
      },
      {
        id: 'opt_wrong_traffic_court',
        text: 'Go to a suburban DMV Secretary of State branch office and ask the driver license renewal counter clerk to expunge the criminal charge on the spot.',
        isCorrect: false,
        explanation: 'Secretary of State branches only handle vehicle registration and driving licenses; they have zero jurisdiction over criminal dockets or police discipline.',
      },
      {
        id: 'opt_precinct_desk_argument',
        text: 'Walk into your local precinct lobby and demand the desk sergeant sign a document dismissing all court charges right there.',
        isCorrect: false,
        explanation: 'Desk sergeants cannot dismiss charges or accept court appeals. Formal complaints must go to Internal Affairs or the assigned Trial Court Judge.',
      },
    ],
    practicalTakeaway:
      'Always verify whether your filing is administrative (Internal Affairs / BOPC at 1301 Third Ave) or judicial (Frank Murphy Hall of Justice Room 101 or CAYMC Room 201).',
  },

  // 5. HOW TO ADVOCATE & MOBILIZE FOR LEGISLATIVE REFORM (THE FAMILY REUNITE ACT)
  {
    id: 'sim_advocate_family_reunite',
    mode: 'advocate',
    title: 'Game 5: How to Advocate & Mobilize (The Family Reunite Act Protocol)',
    scenario:
      'Following 26 days of unlawful detention over a civil rental misunderstanding, you discover your children were subjected to temporary emergency protective custody and the state Friend of the Court assessed thousands in child support arrears and a 50% paycheck garnishment while you were locked up. With your criminal case now completely dismissed, how do you mobilize legally and legislatively to regain your children, stop predatory garnishments, and pass permanent statutory protections for all families?',
    instructions:
      'Select the comprehensive multi-track legal, legislative, and community advocacy strategy modeled on Jeanell Land’s Family Reunite Act campaign (Change.org/FamilyReuniteAct).',
    taskPrompt: 'Which multi-track strategy ensures immediate family reunification, vacates predatory arrears, and builds legislative reform?',
    correctAction: 'opt_family_reunite_mobilize',
    options: [
      {
        id: 'opt_family_reunite_mobilize',
        text: '1. File an Emergency Verified Motion for Custody Reinstatement & Arrears Vacatur under Santosky v. Kramer and MCL 552.603b. 2. Endorse and organize around the Family Reunite Act citizen petition (Change.org/FamilyReuniteAct) to outlaw post-arrest family separations. 3. Mobilize constituent delegations to state and congressional representatives with certified exoneration dockets demanding statutory reparation bonds and corporate accountability.',
        isCorrect: true,
        explanation: 'Combining emergency judicial pleadings with organized citizen legislative petitions (Change.org/FamilyReuniteAct) and constituent legislative advocacy addresses both immediate trauma and fixes systemic laws for future generations.',
      },
      {
        id: 'opt_ignore_foc_debt',
        text: 'Ignore the Friend of the Court garnishment notices and assume the child welfare system will automatically return your children without any formal written motions once they read the criminal dismissal.',
        isCorrect: false,
        explanation: 'Child welfare and child support enforcement operate in distinct administrative silos. Without emergency motions and statutory advocacy, arrears compound and parental rights can be permanently terminated by default.',
      },
      {
        id: 'opt_give_up_custody',
        text: 'Sign a voluntary surrender of parental rights because the child support debt accumulated during jail is too high to ever pay off under current garnishment rules.',
        isCorrect: false,
        explanation: 'Surrendering parental rights is permanent and unnecessary. Incarceration-accumulated debt is legally abatable under modern federal Title IV-D regulations and the Family Reunite Act model!',
      },
    ],
    practicalTakeaway:
      'Never fight systemic injustice in isolation: pair emergency court motions (Arrears Vacatur & Custody Reinstatement) with collective civic advocacy via the Family Reunite Act on Change.org (https://www.change.org/FamilyReuniteAct).',
  },
];

export interface FilingLocation {
  id: string;
  name: string;
  division: string;
  address: string;
  roomOrWindow: string;
  hours: string;
  phone: string;
  acceptedFilings: string[];
  securityProtocol: string;
  transitParking: string;
  feeInfo: string;
}

export const FILING_LOCATIONS_DIRECTORY: FilingLocation[] = [
  {
    id: 'loc_frank_murphy',
    name: 'Frank Murphy Hall of Justice (Wayne County 3rd Circuit Court)',
    division: 'Criminal Division & Appeals Intake',
    address: '1441 St. Antoine St, Detroit, MI 48226',
    roomOrWindow: 'Room 101 (Criminal Clerk Counter, Windows 1–4)',
    hours: 'Monday – Friday: 8:00 AM – 4:30 PM',
    phone: '313-224-2500',
    acceptedFilings: [
      'Emergency Motions for Bond Reduction',
      'Claim of Appeal (from 36th District Court)',
      'Motion for Relief from Judgment (MCR 6.500)',
      'Notices of Wrongful Arrest Defense Exhibits',
    ],
    securityProtocol: 'Mandatory airport-style magnetometer and X-ray bag screening. No pocket knives, pepper spray, or recording devices permitted past checkpoint.',
    transitParking: 'Paid surface parking lot across on Clinton St. Q-Line rail stop at Campus Martius (8 min walk) or DDOT bus routes #5, #9, #52.',
    feeInfo: 'Filing fees: $20 Motion Fee (waived with approved Form MC-20 Affidavit of Indigency / Fee Waiver).',
  },
  {
    id: 'loc_caymc',
    name: 'Coleman A. Young Municipal Center (CAYMC)',
    division: 'Civil Division, County Clerk & FOIA Records',
    address: '2 Woodward Ave, Detroit, MI 48226',
    roomOrWindow: 'Room 201 (Wayne County Clerk Counter & Civil Filings)',
    hours: 'Monday – Friday: 8:30 AM – 4:00 PM',
    phone: '313-224-6262',
    acceptedFilings: [
      'Section 1983 Civil Rights Lawsuits',
      'FOIA (Freedom of Information Act) Records Requests',
      'Personal Protection Orders (PPO Emergency Window 6)',
      'Expungement Petitions under Clean Slate Act',
    ],
    securityProtocol: 'State government building checkpoint with ID check and metal detectors. Cell phones permitted but cameras must be turned off in courtrooms.',
    transitParking: 'Underground parking garage adjacent to Jefferson Ave. Q-Line Congress St Station directly in front of main entrance.',
    feeInfo: 'Civil summons filing fee: $175 (waivable via Form MC-20). FOIA request submission is free of charge.',
  },
  {
    id: 'loc_dpd_hq_ia',
    name: 'Detroit Public Safety Headquarters · Internal Affairs Bureau',
    division: 'Civilian Oversight & Misconduct Investigations',
    address: '1301 Third Ave, 5th Floor Room 502, Detroit, MI 48226',
    roomOrWindow: 'Room 502 (Internal Affairs Bureau Intake Desk)',
    hours: '24 Hours / 7 Days a Week (Walk-in Intake Available)',
    phone: '313-596-2499',
    acceptedFilings: [
      'Form DPD-652 (Official Citizen Misconduct Complaint)',
      'Excessive Force Allegation Filings',
      'Wrongful Arrest / False Stolen Vehicle Reports',
      'Civilian Board of Police Commissioners Appeals',
    ],
    securityProtocol: 'Visitor sign-in with government-issued photo ID. Secure escort badge issued for 5th floor elevator access.',
    transitParking: 'Visitor parking bay in front of Third Ave entrance or Michigan Ave metered parking. DDOT bus route #29.',
    feeInfo: '100% Free to file. Retaliation against complainants is prohibited by City Charter section 7-1108.',
  },
  {
    id: 'loc_court_of_appeals',
    name: 'Michigan Court of Appeals · District 1',
    division: 'First Judicial District Appellate Clerk',
    address: '3020 W Grand Blvd, Suite 14-300, Detroit, MI 48202',
    roomOrWindow: 'Cadillac Place, 14th Floor Clerk Counter',
    hours: 'Monday – Friday: 9:00 AM – 5:00 PM',
    phone: '313-974-5700',
    acceptedFilings: [
      'Claim of Appeal by Right',
      'Application for Leave to Appeal',
      'Appellate Briefs & Emergency Stays of Proceedings',
    ],
    securityProtocol: 'Cadillac Place building security. Photo ID required at ground lobby reception desk.',
    transitParking: 'Cadillac Place parking garage on Milwaukee Ave. Q-Line Grand Blvd terminus station (1 block away).',
    feeInfo: 'Appellate entry fee: $375 (fee waiver request Form MC-20 applicable for qualified indigent appellants).',
  },
  {
    id: 'loc_one_stop_clinic',
    name: 'One Stop Rehabilitation Center 501(c)(3) Legal Defense Guild',
    division: 'Community Re-entry, Pro Bono Clinics & Foster Care',
    address: '15400 Grand River Ave, Detroit, MI 48227 (Founder: Jeanell Land)',
    roomOrWindow: 'Main Intake Atrium & Legal Clinic Suite A',
    hours: 'Monday – Saturday: 9:00 AM – 6:00 PM (Emergency 24/7 Haven)',
    phone: '313-555-ONESTOP',
    acceptedFilings: [
      'Clean Slate Expungement Document Preparation',
      'Affidavit of Indigency & Fee Waiver Packaging',
      'Notary Public Witness Verifications',
      'Transitional Housing & Domestic Violence Haven Placement',
    ],
    securityProtocol: 'Community sanctuary environment. Open door policy for returning citizens, single mothers, and foster youth.',
    transitParking: 'Free gated on-site parking lot. Grand River DDOT route #3 directly in front of clinic.',
    feeInfo: 'All legal guidance, notary services, and document preparation are 100% free of charge.',
  },
];

export interface LocalPrecinctInfo {
  zipCodes: string[];
  precinctNumber: string;
  name: string;
  address: string;
  phone: string;
  commander: string;
  liaisonOfficer: string;
  neighborhoods: string;
}

export const LOCAL_DETROIT_PRECINCTS: LocalPrecinctInfo[] = [
  {
    zipCodes: ['48226', '48207', '48201'],
    precinctNumber: '1st & 3rd Precincts',
    name: 'Downtown, Midtown & Riverfront Desks',
    address: '1301 Third Ave / 2875 W Grand Blvd, Detroit, MI',
    phone: '313-596-5100',
    commander: 'Commander E. Martin',
    liaisonOfficer: 'Officer J. Robinson (Civilian Community Desk)',
    neighborhoods: 'Downtown, Midtown, Brush Park, Rivertown, Corktown',
  },
  {
    zipCodes: ['48204', '48206', '48202', '48238'],
    precinctNumber: '10th Precinct',
    name: 'Livernois Avenue Station',
    address: '12000 Livernois Ave, Detroit, MI 48204',
    phone: '313-596-1000',
    commander: 'Commander S. Walton',
    liaisonOfficer: 'Officer T. Harris (Neighborhood Police Officer)',
    neighborhoods: 'Dexter-Linwood, Russell Woods, Boston Edison, Nardin Park',
  },
  {
    zipCodes: ['48205', '48213', '48224', '48234'],
    precinctNumber: '9th Precinct',
    name: 'Gratiot Avenue Station',
    address: '11187 Gratiot Ave, Detroit, MI 48213',
    phone: '313-596-5900',
    commander: 'Commander M. Jackson',
    liaisonOfficer: 'Officer D. Vance (Youth & Faith Liaison)',
    neighborhoods: 'Regent Park, East English Village, Denby, Von Steuben',
  },
  {
    zipCodes: ['48219', '48223', '48235', '48228'],
    precinctNumber: '8th Precinct',
    name: 'McNichols Road Station',
    address: '21555 W McNichols Rd, Detroit, MI 48219',
    phone: '313-596-5800',
    commander: 'Commander A. Brooks',
    liaisonOfficer: 'Officer K. Barnes (Community Safety Director)',
    neighborhoods: 'Rosedale Park, Grandmont, Brightmoor, Old Redford',
  },
  {
    zipCodes: ['48221', '48235', '48203'],
    precinctNumber: '12th Precinct',
    name: 'Seven Mile Road Station (8 Mile Corridor)',
    address: '1441 W Seven Mile Rd, Detroit, MI 48203',
    phone: '313-596-1200',
    commander: 'Commander R. Davis',
    liaisonOfficer: 'Officer C. Washington (Community Relations)',
    neighborhoods: 'Green Acres, Sherwood Forest, Palmer Woods, University District',
  },
  {
    zipCodes: ['48209', '48210', '48216', '48217'],
    precinctNumber: '4th Precinct',
    name: 'Fort Street Station (Southwest Detroit)',
    address: '4700 W Fort St, Detroit, MI 48209',
    phone: '313-596-5400',
    commander: 'Commander J. Gomez',
    liaisonOfficer: 'Officer M. Alvarez (Bilingual Community Liaison)',
    neighborhoods: 'Mexicantown, Springwells, Boynton, Delray, Hubbard-Richard',
  },
];

