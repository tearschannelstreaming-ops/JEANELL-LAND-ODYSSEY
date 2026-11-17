import { LawLibraryTerm, CaseStudyTemplate } from '../types/game';

export const LAW_LIBRARY_TERMS: LawLibraryTerm[] = [
  // 1. AERONAUTICAL & AEROSPACE LAW
  {
    id: 'term_federal_airspace_preemption',
    term: 'Federal Airspace Preemption',
    category: 'Aeronautical & Aerospace',
    pronunciation: 'FED-er-ul AIR-spays pree-EMP-shun',
    plainEnglishDefinition:
      'The legal rule that only the federal government (the FAA), not cities or states, has the constitutional power to regulate aircraft flight paths, airspace altitudes, and air safety.',
    formalLegalDefinition:
      'Under the Supremacy Clause (U.S. Const. art. VI, cl. 2) and the Federal Aviation Act (49 U.S.C. § 40103(b)), Congress has occupied the entire field of navigable airspace management, preempting state and municipal flight regulations.',
    statutoryOrRegulatoryCitation: '49 U.S.C. § 40103(b)(1); City of Burbank v. Lockheed Air Terminal Inc., 411 U.S. 624 (1973)',
    realWorldApplication:
      'Essential when designing municipal drone transit corridors or S-T-E-A-R Safe autonomous flight zones in Detroit. Cities cannot ban low-altitude aerial flight corridors that comply with FAA Part 107.',
    exampleScenario:
      'A city council attempts to pass an ordinance banning all autonomous cargo drones within 500 feet of city hall. The ordinance is void under federal preemption.',
  },
  {
    id: 'term_airworthiness_directive',
    term: 'Airworthiness Directive (AD)',
    category: 'Aeronautical & Aerospace',
    pronunciation: 'air-WER-thee-nes dye-REK-tiv',
    plainEnglishDefinition:
      'A legally mandatory rule issued by the FAA requiring aircraft owners or aerospace manufacturers to fix, inspect, or modify an unsafe aircraft component before flying.',
    formalLegalDefinition:
      'A legally enforceable federal regulation issued by the Federal Aviation Administration in accordance with 14 CFR Part 39 when an unsafe condition has been found in an aeronautical product and is likely to exist or develop in other products of the same type design.',
    statutoryOrRegulatoryCitation: '14 CFR Part 39; 49 U.S.C. § 44701',
    realWorldApplication:
      'In wind tunnel testing and aerospace manufacturing, when wing spar micro-fractures or vortex vibration fatigue are identified, an AD mandates immediate fleet retrofits.',
    exampleScenario:
      'After high-speed wind tunnel testing reveals laminar separation flutter on composite wingtips, the FAA issues an emergency AD grounding affected regional jets pending bracket reinforcement.',
  },
  {
    id: 'term_independent_invention_prior_art',
    term: 'Independent Invention & Prior Art Doctrine',
    category: 'Aeronautical & Aerospace',
    pronunciation: 'in-duh-PEN-dent in-VEN-shun PRY-er ART',
    plainEnglishDefinition:
      'Documented evidence (like dated laboratory notebooks and wind tunnel test results) showing that you invented a technology on your own before someone else filed a patent.',
    formalLegalDefinition:
      'Under 35 U.S.C. § 102, any public knowledge, printed publication, commercial use, or verified date of reduction to practice that preceded the effective filing date of a claimed patent, establishing lack of novelty or non-obviousness.',
    statutoryOrRegulatoryCitation: '35 U.S.C. § 102; 35 U.S.C. § 103',
    realWorldApplication:
      'Protects grassroots inventors and university researchers whose aerodynamic wing designs or proprietary propulsion nozzles are copied by well-funded defense contractors.',
    exampleScenario:
      'A large defense corporation files a patent for a swept winglet vortex diffuser. Jeanell’s dated 1998 wind tunnel logs prove she reduced the exact geometry to practice four years earlier, invalidating the rival patent claim.',
  },
  {
    id: 'term_faa_part_107',
    term: 'FAA Part 107 Small Unmanned Aircraft Systems',
    category: 'Aeronautical & Aerospace',
    pronunciation: 'PART one-oh-SEVEN',
    plainEnglishDefinition:
      'The federal regulations that govern commercial drone pilots and autonomous delivery vehicles under 55 pounds.',
    formalLegalDefinition:
      'Codified at 14 CFR Part 107, federal operational rules governing non-hobbyist small unmanned aircraft systems (sUAS), including daylight-only operations, visual line of sight (VLOS), maximum altitude of 400 feet AGL, and remote pilot airman certification.',
    statutoryOrRegulatoryCitation: '14 CFR §§ 107.1–107.205',
    realWorldApplication:
      'Governs the autonomous fleet certification for S-T-E-A-R Safe emergency medical and grocery deliveries across Detroit neighborhoods.',
    exampleScenario:
      'To operate automated delivery drones over people or at night, S-T-E-A-R engineers must apply for an FAA Part 107.200 Certificate of Waiver demonstrating parachute safety redundancy.',
  },

  // 2. COMMUNITY & MUNICIPAL DISPUTES
  {
    id: 'term_bailment_vs_conversion',
    term: 'Bailment vs. Criminal Conversion (Rental Disputes)',
    category: 'Community & Municipal',
    pronunciation: 'BAYL-ment VER-sus kon-VER-shun',
    plainEnglishDefinition:
      'A bailment is when you legally hold someone else’s property under an agreement (like a rental car contract). If you keep it longer or pay late, it is a civil breach of contract, NOT a felony stolen vehicle crime.',
    formalLegalDefinition:
      'A bailment is the consensual transfer of personal property possession for an agreed purpose without transfer of title. Criminal conversion or theft requires proving specific intent (mens rea) to permanently deprive the owner without color of right.',
    statutoryOrRegulatoryCitation: 'U.C.C. Article 2A; Restatement (Second) of Torts § 222A; People v. Christenson, 412 Mich. 81 (1981)',
    realWorldApplication:
      'Crucial to Jeanell Land’s true 26-day false arrest story. Extending and retrieving a rental car is a civil bailment lease dispute; falsely reporting it as grand theft constitutes malicious reporting and administrative negligence.',
    exampleScenario:
      'A customer extends their rental car contract by phone and pays fee invoices. The rental company’s internal system glitches and reports the car stolen. Police arrest the driver for felony grand theft. The defense demonstrates lack of criminal intent and lawful bailment.',
  },
  {
    id: 'term_unlawful_driving_away',
    term: 'Unlawful Driving Away of an Automobile (UDAA)',
    category: 'Community & Municipal',
    pronunciation: 'YOU-daa (MCL 750.413)',
    plainEnglishDefinition:
      'A specific Michigan criminal felony charge for taking a car without permission, distinct from ordinary larceny because it doesn’t require intent to keep the car forever.',
    formalLegalDefinition:
      'Under Michigan Compiled Laws (MCL 750.413), the willful taking or driving away of an automobile belonging to another without lawful authority. An affirmative defense exists where the defendant had lawful initial possession under an extended contractual lease.',
    statutoryOrRegulatoryCitation: 'MCL 750.413; People v. Hendricks, 200 Mich. App. 394 (1993)',
    realWorldApplication:
      'The statute mistakenly invoked by overzealous prosecutors against rental car customers whose commercial extensions were processed but not updated on police dispatch terminals.',
    exampleScenario:
      'A driver with valid email extension receipts is charged with UDAA. The attorney moves to dismiss because initial possession was completely consensual and authorized under civil lease.',
  },
  {
    id: 'term_clean_slate_expungement',
    term: 'Clean Slate Automated Expungement',
    category: 'Community & Municipal',
    pronunciation: 'KLEEN SLAYT ex-PUNJ-ment',
    plainEnglishDefinition:
      'A state law that legally seals old criminal convictions so they no longer appear on public background checks for housing, employment, or foster parenting licenses.',
    formalLegalDefinition:
      'The statutory procedure under Michigan Public Acts 187–193 of 2020 (MCL 780.621 et seq.) allowing up to three felonies and unlimited misdemeanors to be set aside upon satisfaction of waiting periods and judicial petition.',
    statutoryOrRegulatoryCitation: 'MCL 780.621; Mich. Admin. Code R. 28.5101',
    realWorldApplication:
      'The cornerstone of One Stop Rehabilitation Center’s community clinics, helping returning citizens remove decades-old felony convictions from youthful mistakes.',
    exampleScenario:
      'A grandmother convicted of felonious assault at age 20 petitions under Michigan Clean Slate. The court sets aside the record, allowing her to become a state-licensed foster parent.',
  },
  {
    id: 'term_fha_special_use_zoning',
    term: 'Fair Housing Act Special Land Use Protections',
    category: 'Community & Municipal',
    pronunciation: 'FAIR HOWZ-ing AKT ZOH-ning',
    plainEnglishDefinition:
      'Federal laws that prevent municipal zoning boards from using zoning laws to block homeless shelters, transitional homes, or recovery centers in residential neighborhoods.',
    formalLegalDefinition:
      'Under the Fair Housing Act (42 U.S.C. §§ 3601–3619) and the Americans with Disabilities Act, municipalities must provide reasonable accommodations in land-use and zoning rules for group homes and supportive housing for recovering persons.',
    statutoryOrRegulatoryCitation: '42 U.S.C. § 3604(f)(3)(B); City of Edmonds v. Oxford House Inc., 514 U.S. 725 (1995)',
    realWorldApplication:
      'Used by One Stop Rehabilitation Center to defeat NIMBY (“Not In My Back Yard”) zoning opposition when establishing emergency shelters for domestic violence survivors and foster youth.',
    exampleScenario:
      'A city zoning board denies a permit for One Stop’s transitional housing center, claiming it violates single-family zoning caps. One Stop files an administrative appeal under FHA reasonable accommodation rules and wins approval.',
  },

  // 3. CONSTITUTIONAL & CIVIL RIGHTS TORTS
  {
    id: 'term_section_1983',
    term: 'Section 1983 Civil Rights Action',
    category: 'Civil Rights & Torts',
    pronunciation: 'SEK-shun NINE-teen EIGHT-ee THREE',
    plainEnglishDefinition:
      'The primary federal federal law that allows citizens to sue government officials (including police officers and jail administrators) who violate their constitutional rights.',
    formalLegalDefinition:
      'Under 42 U.S.C. § 1983, a federal cause of action against every person who, under color of any statute, ordinance, regulation, or usage of any State, deprives a citizen of any rights, privileges, or immunities secured by the Constitution and laws.',
    statutoryOrRegulatoryCitation: '42 U.S.C. § 1983; Monell v. Dept. of Social Services, 436 U.S. 658 (1978)',
    realWorldApplication:
      'The legal mechanism to seek damages for 26 days of unlawful confinement when police and prosecutors refuse to examine clear proof of innocence.',
    exampleScenario:
      'After being held 26 days in county jail despite providing uncontradicted rental extension receipts and returned lot photos on day one, the victim files a Section 1983 suit for Fourth and Fourteenth Amendment violations.',
  },
  {
    id: 'term_qualified_immunity',
    term: 'Qualified Immunity Doctrine',
    category: 'Civil Rights & Torts',
    pronunciation: 'KWOL-ih-fyde im-MYOON-ih-tee',
    plainEnglishDefinition:
      'A legal defense that shields government officials from personal liability unless their actions violated clearly established statutory or constitutional rights.',
    formalLegalDefinition:
      'A judicially created doctrine protecting government officials performing discretionary functions from liability for civil damages insofar as their conduct does not violate clearly established statutory or constitutional rights of which a reasonable person would have known.',
    statutoryOrRegulatoryCitation: 'Harlow v. Fitzgerald, 457 U.S. 800 (1982); Pearson v. Callahan, 555 U.S. 223 (2009)',
    realWorldApplication:
      'Plaintiffs in wrongful arrest cases must cite binding precedent showing that arresting someone without checking verified lease paperwork in their hands violates clearly established law.',
    exampleScenario:
      'An arresting officer claims qualified immunity. The court denies immunity because the Supreme Court previously established that fabricating or willfully ignoring available exculpatory evidence vitiates probable cause.',
  },
  {
    id: 'term_contemporaneous_records',
    term: 'Contemporaneous Record (Present Sense Impression)',
    category: 'Constitutional & Criminal Defense',
    pronunciation: 'kon-tem-puh-RAY-nee-us REK-ord',
    plainEnglishDefinition:
      'Notes, audio, or logs written immediately while an event is happening or directly after, which courts treat as highly reliable and truthful evidence.',
    formalLegalDefinition:
      'Under Federal Rule of Evidence 803(1), a statement describing or explaining an event or condition, made while or immediately after the declarant perceived it, admissible as an exception to the rule against hearsay due to lack of time for calculated fabrication.',
    statutoryOrRegulatoryCitation: 'Fed. R. Evid. 803(1); Mich. R. Evid. 803(1)',
    realWorldApplication:
      'The foundation of the Evidence Journaling Protocol in Justice Hub: logging officer badge numbers, patrol unit codes, and exact timestamps right after a traffic stop.',
    exampleScenario:
      'A driver writes down the exact badge number and physical quotes in a notebook within 10 minutes of being pulled over. The judge admits the notes into evidence to impeach contradictory police testimony.',
  },
  {
    id: 'term_malicious_prosecution',
    term: 'Tort of Malicious Prosecution',
    category: 'Civil Rights & Torts',
    pronunciation: 'muh-LISH-us praw-seh-KYOO-shun',
    plainEnglishDefinition:
      'A civil lawsuit against a person or corporation (like a rental car company) who falsely initiated criminal proceedings with malice and without probable cause, causing you wrongful arrest.',
    formalLegalDefinition:
      'A common law tort requiring the plaintiff to prove: (1) defendant initiated or maintained criminal proceedings; (2) termination of proceedings in plaintiff’s favor; (3) absence of probable cause; and (4) malice or primary purpose other than bringing an offender to justice.',
    statutoryOrRegulatoryCitation: 'Restatement (Second) of Torts § 653; Matthews v. Blue Cross and Blue Shield of Michigan, 456 Mich. 365 (1998)',
    realWorldApplication:
      'Used against rental car agencies that automate police stolen vehicle reports to cut asset recovery costs instead of verifying that the car was retrieved or extended.',
    exampleScenario:
      'A rental company reports a returned car stolen to claim insurance proceeds, causing a patron to be falsely jailed for 26 days. Once cleared, the patron files suit for malicious prosecution and wins punitive damages.',
  },
  {
    id: 'term_drone_curtilage_privacy',
    term: 'Residential Curtilage Drone Intrusion (Aerial Trespass & Nuisance)',
    category: 'Aeronautical & Aerospace',
    pronunciation: 'KER-tuh-lij DROWN in-TROO-zhun',
    plainEnglishDefinition:
      'Flying a camera drone at very low altitudes right over someone’s fenced backyard or private residential curtilage in a way that violates their reasonable expectation of privacy and physical enjoyment.',
    formalLegalDefinition:
      'An action in common law trespass and invasion of privacy (intrusion upon seclusion) under Restatement (Second) of Torts § 159(2) and § 652B, occurring when an aircraft enters the immediate reaches of the airspace next to the land and interferes substantially with the owner’s use and enjoyment.',
    statutoryOrRegulatoryCitation: 'Restatement (Second) of Torts § 159(2); Florida v. Riley, 488 U.S. 445 (1989); 14 CFR § 107.39',
    realWorldApplication:
      'Governs ethical drone piloting in S-T-E-A-R flight paths: autonomous delivery drones must maintain transit altitudes above 200 feet and avoid hovering or recording over private residential backyards.',
    exampleScenario:
      'A homeowner seeks an injunction against a private surveillance drone hovering 30 feet above their fenced patio. The court recognizes actionable aerial nuisance within protected residential curtilage.',
  },
  {
    id: 'term_air21_whistleblower',
    term: 'AIR21 Federal Aviation Whistleblower Protection',
    category: 'Aeronautical & Aerospace',
    pronunciation: 'AIR TWEN-tee-WUN WISS-ul-bloh-er',
    plainEnglishDefinition:
      'Federal law protecting aircraft mechanics, flight technicians, and aerospace engineers from being fired or disciplined for reporting safety violations, fake maintenance records, or mechanical defects.',
    formalLegalDefinition:
      'Under the Wendell H. Ford Aviation Investment and Reform Act for the 21st Century (49 U.S.C. § 42121), an air carrier or contractor is prohibited from discharging or discriminating against an employee who provided information regarding violations of FAA safety orders or regulations.',
    statutoryOrRegulatoryCitation: '49 U.S.C. § 42121; 29 CFR Part 1979',
    realWorldApplication:
      'Essential for aerospace lab technicians and commercial line mechanics who uncover stress fractures or faulty flight-control avionics and face employer pressure to clear flights.',
    exampleScenario:
      'An avionics technician refuses to sign off on an untested flight controller with intermittent gyro drift. When threatened with termination, the technician files an OSHA AIR21 whistleblower complaint and secures full back pay.',
  },
  {
    id: 'term_anti_lockout_treble_damages',
    term: 'Anti-Lockout Act & Treble Damages (MCL 600.2918)',
    category: 'Community & Municipal',
    pronunciation: 'AN-tee LOK-owt TREB-ul DAM-ih-jez',
    plainEnglishDefinition:
      'A state law making it illegal for landlords to change your locks, cut off utilities, or throw your belongings out onto the curb without a formal court eviction order. If they do, they must pay you triple damages!',
    formalLegalDefinition:
      'Michigan Compiled Laws § 600.2918(1), providing that any person who is ejected or put out of any lands or tenements in a forcible and unlawful manner, or who is unlawfully kept out by force, is entitled to recover 3 times the amount of their actual damages or $200.00, whichever is greater, in addition to possession.',
    statutoryOrRegulatoryCitation: 'MCL 600.2918; Nelson v. Grays, 209 Mich. App. 661 (1995)',
    realWorldApplication:
      'Defends low-income families and single mothers from predatory landlords who attempt illegal self-help lockouts instead of giving proper statutory notice.',
    exampleScenario:
      'A landlord padlocks the front door while a mother of four is at work. One Stop Legal Clinic files an emergency motion under MCL 600.2918, ordering immediate re-entry and awarding $6,000 in treble statutory damages.',
  },
  {
    id: 'term_habeas_corpus',
    term: 'Writ of Habeas Corpus ("Produce the Body")',
    category: 'Constitutional & Criminal Defense',
    pronunciation: 'HAY-bee-us KOR-pus',
    plainEnglishDefinition:
      'An emergency petition to a judge demanding that the jail or police department physically bring an inmate into court and prove why they are being locked up, or let them go immediately.',
    formalLegalDefinition:
      'A prerogative judicial writ rooted in Article I, Section 9 of the U.S. Constitution and state statutes (MCL 600.4301 et seq.) compelling a custodian to produce a detained person before a court to determine the legality of their detention.',
    statutoryOrRegulatoryCitation: 'U.S. Const. art. I, § 9, cl. 2; 28 U.S.C. § 2254; MCL 600.4301',
    realWorldApplication:
      'The crucial legal instrument that should be filed when an individual is falsely held for weeks (like Jeanell’s 26 days) without timely arraignment or probable cause validation.',
    exampleScenario:
      'An individual is detained for 10 days in county jail without being brought before a magistrate on a disputed car rental claim. An attorney files an emergency Petition for Writ of Habeas Corpus, forcing immediate release.',
  },
  {
    id: 'term_foia_bwc_records',
    term: 'FOIA Preservation & Body-Worn Camera Disclosure',
    category: 'Constitutional & Criminal Defense',
    pronunciation: 'FOY-uh BODY-WORN KAM-ruh',
    plainEnglishDefinition:
      'Formal legal request under public records laws demanding that police preserve and release unedited cruiser dashcam, dispatch 911 audio, and officer body camera footage before it is routinely deleted.',
    formalLegalDefinition:
      'Under the Michigan Freedom of Information Act (MCL 15.231 et seq.) and MCL 780.315 (Law Enforcement Body-Worn Camera Privacy Act), public disclosure of audio/video recordings in criminal incidents, subject to evidentiary preservation rules to prevent spoliation of evidence.',
    statutoryOrRegulatoryCitation: 'MCL 15.231; MCL 780.315; Brady v. Maryland, 373 U.S. 83 (1963)',
    realWorldApplication:
      'Part of the Justice Hub Evidence Preservation toolkit: immediately filing a FOIA letter stops automated 30-day camera deletion loops at the precinct desk.',
    exampleScenario:
      'Within 48 hours of an arrest, defense counsel serves a statutory FOIA demand on the DPD Records Bureau, compelling production of the officer’s bodycam showing the driver showed valid rental extension emails on her phone.',
  },
  {
    id: 'term_family_reunite_act',
    term: 'Family Reunite Act (Statutory Reform Model)',
    category: 'Civil Rights & Torts',
    pronunciation: 'FAM-uh-lee ree-yoo-NYTE AKT',
    plainEnglishDefinition:
      'A landmark citizen legislative movement launched on Change.org (change.org/FamilyReuniteAct) by Jeanell Land to ban child separations stemming from false arrests, mandate 14-day parental custody restoration post-exoneration, and completely eliminate predatory wage garnishment accrued during unlawful detention.',
    formalLegalDefinition:
      'A model statutory framework establishing substantive and procedural safeguards under the Fourteenth Amendment Due Process and Equal Protection Clauses, prohibiting parental fitness adjudications based solely on unadjudicated pretrial incarceration, and creating an affirmative statutory right to retroactive child support abatement upon dismissal of criminal charges.',
    statutoryOrRegulatoryCitation: 'Change.org/FamilyReuniteAct; 42 U.S.C. § 1983; U.S. Const. amend. XIV; Santosky v. Kramer, 455 U.S. 745 (1982)',
    realWorldApplication:
      'Directly addresses the systemic trauma experienced by parents who are falsely locked up, lose employment, and then face wage garnishments and foster care proceedings despite being completely innocent of any crime.',
    exampleScenario:
      'After being held for 26 days on a bogus rental car dispute and having all charges dismissed, a mother invokes the Family Reunite Act model pleading to instantly stop a 50% payroll garnishment and regain immediate physical custody of her children.',
  },
  {
    id: 'term_arrears_vacatur',
    term: 'Child Support Arrears Vacatur & Garnishment Relief',
    category: 'Community & Municipal',
    pronunciation: 'uh-REERZ vuh-KAY-tur AND GAR-nish-munt',
    plainEnglishDefinition:
      'A legal court order that wipes away back child support debt and stops paycheck garnishment for the months an innocent person was falsely locked up and unable to work.',
    formalLegalDefinition:
      'An equitable doctrine and statutory modification under Title IV-D of the Social Security Act and state domestic relations laws (e.g., MCL 552.603) authorizing retroactive abatement, vacatur, and suspension of child support obligations and statutory surcharge interest incurred during involuntary confinement resulting from wrongful arrest or overturned convictions.',
    statutoryOrRegulatoryCitation: '45 CFR § 302.56; MCL 552.603b; Turner v. Rogers, 564 U.S. 431 (2011)',
    realWorldApplication:
      'Critical for returning citizens who enter the workforce only to have their paychecks hollowed out by debt that accumulated while the government had them behind bars without conviction.',
    exampleScenario:
      'An exonerated parent’s paycheck is garnished at 50% for support arrears that accrued during a month of wrongful detention. The attorney files a Motion for Arrears Vacatur, zeroing the false arrears and restoring full take-home pay.',
  },
  {
    id: 'term_reparation_bond',
    term: 'Restorative Reparation Bond & Family Healing Trust',
    category: 'Civil Rights & Torts',
    pronunciation: 'rep-uh-RAY-shun BAHND',
    plainEnglishDefinition:
      'A government-backed fund that provides direct restitution, housing grants, and therapy funds to children and parents separated by wrongful arrests and systemic judicial misconduct.',
    formalLegalDefinition:
      'A statutory public compensation mechanism and indemnification instrument created to satisfy municipal and state liability for traumatic familial disruption, emotional distress, and constitutional deprivation inflicted through systemic wrongful detentions and malicious prosecutions.',
    statutoryOrRegulatoryCitation: 'MCL 691.1751 (Wrongful Imprisonment Compensation Act); 42 U.S.C. § 1983; Monell v. Dept. of Social Services, 436 U.S. 658 (1978)',
    realWorldApplication:
      'Provides emergency transitional capital, psychological counseling vouchers, and stable housing for families reconstituting themselves after government-inflicted trauma.',
    exampleScenario:
      'Upon settlement of a Section 1983 wrongful detention action, the court approves a Restorative Reparation Bond trust providing tuition stipends and mental health counseling for the plaintiff’s children.',
  },
];

export const CASE_STUDY_TEMPLATES: CaseStudyTemplate[] = [
  // TEMPLATE 1: COMMUNITY DISPUTE - RENTAL BAILMENT WRONGFUL THEFT
  {
    id: 'template_rental_bailment_dismissal',
    title: 'Emergency Motion to Dismiss Felony Grand Theft / UDAA (Rental Contract Bailment Defense)',
    disputeType: 'community',
    categoryLabel: 'Criminal Defense & Bailment Doctrine',
    jurisdiction: 'State of Michigan · 3rd Judicial Circuit Court (Wayne County)',
    captionHeader: {
      court: 'STATE OF MICHIGAN\nIN THE CIRCUIT COURT FOR THE COUNTY OF WAYNE',
      plaintiffOrPetitioner: 'PEOPLE OF THE STATE OF MICHIGAN, Plaintiff,',
      defendantOrRespondent: 'v.\nJEANELL LAND, Defendant.',
      caseOrDocketNumber: 'Case No. 16-004892-01-FH · Hon. Criminal Division Presiding',
      documentTitle: 'DEFENDANT’S EMERGENCY MOTION TO QUASH INFORMATION AND DISMISS WITH PREJUDICE (LACK OF MENS REA AND LAWFUL CIVIL BAILMENT LEASE)',
    },
    summary:
      'A model criminal defense motion establishing that extending and returning a rental vehicle is a civil contract bailment under UCC Article 2A, completely negating the specific intent (mens rea) required for felony grand theft or Unlawful Driving Away an Automobile (MCL 750.413).',
    coreLegalIssues: [
      'Absence of criminal intent (mens rea) to permanently deprive owner of vehicle.',
      'Existence of mutual commercial bailment under ongoing lease extension agreements.',
      'Gross negligence by complaining witness (rental agency) in reporting returned property as stolen.',
      'Constitutional Fourth Amendment violation in maintaining prosecution without probable cause.',
    ],
    governingLaw: [
      'MCL 750.413 (Unlawful Driving Away of Automobile)',
      'People v. Hendricks, 200 Mich. App. 394 (1993)',
      'U.C.C. Article 2A - Leases & Bailment Doctrine',
      'Michigan Court Rule (MCR) 6.110(H) Motion to Quash',
    ],
    templatePleadingText: `NOW COMES Defendant, JEANELL LAND, by and through counsel, and moves this Honorable Court to quash the Information and dismiss all charges with prejudice, stating in support as follows:

1. Defendant is a respected community member, licensed businesswoman, and mother who entered into a standard commercial vehicle rental agreement with Rental Agency on or about October 1, 2016.
2. Prior to the scheduled return date, Defendant contacted Rental Agency customer service and formally executed an authorized contractual extension, paid via credit card authorization (See Exhibit A: Bank Ledger & Extension Confirmation #EXT-88912).
3. On October 14, 2016, Defendant returned the subject vehicle to the designated commercial rental depot lot located in Wayne County, leaving keys in the secure key depository box (See Exhibit B: Timestamped Depot Return Photograph & GPS Exif Data).
4. Notwithstanding Defendant’s complete contractual compliance, an administrative computer error by Rental Agency triggered an automated police stolen vehicle report under MCL 750.413.
5. Under settled Michigan jurisprudence, Unlawful Driving Away an Automobile requires the prosecution to prove that the initial taking or retention was committed without authority and with felonious intent. People v. Hendricks, 200 Mich. App. at 396.
6. A commercial car rental creates a lawful civil bailment lease under UCC Article 2A. Where possession begins with mutual consent and payment is tendered, any subsequent dispute regarding extension dates or disputed fees sounds entirely in contract law, not the criminal code.
7. Continuing this prosecution after the complainant has repossessed the vehicle and Defendant has produced timestamped receipts constitutes an abuse of judicial process and violates Fourteenth Amendment substantive due process.

WHEREFORE, Defendant respectfully requests that this Honorable Court enter an Order:
A. Quashing the Information in its entirety;
B. Dismissing all pending charges with prejudice;
C. Exonerating Defendant’s bond and refunding all administrative fee deposits.`,
    practicalFilingGuidance:
      'File in original plus two copies at Frank Murphy Hall of Justice (1441 St. Antoine St, Room 101 Criminal Clerk Counter). Attach Exhibit A (extension email receipts) and Exhibit B (lot return photos with EXIF metadata) as sworn exhibits with Form MC-20 fee waiver.',
  },

  // TEMPLATE 2: AERONAUTICAL DISPUTE - FAA AIRSPACE PREEMPTION
  {
    id: 'template_faa_airspace_preemption',
    title: 'Administrative Brief on FAA Federal Airspace Preemption & S-T-E-A-R Telemetry Corridors',
    disputeType: 'aeronautical',
    categoryLabel: 'Aeronautical Law & Federal Preemption',
    jurisdiction: 'United States Department of Transportation · Federal Aviation Administration & Municipal Docket',
    captionHeader: {
      court: 'BEFORE THE FEDERAL AVIATION ADMINISTRATION\nAND THE CITY OF DETROIT TRANSPORTATION REGULATORY BOARD',
      plaintiffOrPetitioner: 'IN RE: S-T-E-A-R SAFE TRANSIT & AERONAUTICAL RESEARCH COALITION, Petitioner,',
      defendantOrRespondent: 'v.\nCITY OF DETROIT MUNICIPAL AIRSPACE CODE DOCKET NO. 2026-AIR-04',
      caseOrDocketNumber: 'FAA Docket No. FAA-2026-sUAS-0912 · Agency Rulemaking Review',
      documentTitle: 'PETITIONER’S ADMINISTRATIVE BRIEF IN SUPPORT OF DECLARATORY RULING ON FEDERAL PREEMPTION OF MUNICIPAL DRONE ALTITUDE BANS',
    },
    summary:
      'A model federal administrative brief demonstrating that municipal ordinances attempting to restrict navigable drone airspace or telemetry corridors below 400 feet are preempted by federal statute (49 U.S.C. § 40103(b)) and FAA Part 107.',
    coreLegalIssues: [
      'Exclusive federal sovereignty over navigable national airspace under the Commerce Clause.',
      'Supremacy Clause invalidation of conflicting municipal altitude restrictions.',
      'Preservation of telemetry frequency allocations for autonomous public-safety fleets.',
      'Integration of emergency drone delivery corridors for maternal and medical care in underserved wards.',
    ],
    governingLaw: [
      '49 U.S.C. § 40103(b) (FAA Airspace Sovereignty)',
      '14 CFR Part 107 (Small Unmanned Aircraft Systems)',
      'City of Burbank v. Lockheed Air Terminal, 411 U.S. 624 (1973)',
      'FAA Advisory Circular AC 107-2A',
    ],
    templatePleadingText: `PETITIONER, S-T-E-A-R Safe Transit Coalition, submits this Administrative Brief demonstrating that City of Detroit Proposed Ordinance #26-88 (attempting to prohibit autonomous sUAS flight corridors within 300 feet of municipal avenues) is preempted under federal statutory law:

I. CONGRESS HAS ASSIGNED EXCLUSIVE SOVEREIGNTY OF NAVIGABLE AIRSPACE TO THE FAA
Under 49 U.S.C. § 40103(a)(1), the United States Government possesses exclusive sovereignty of airspace of the United States. Congress explicitly directed the FAA Administrator to develop plans and policy for the use of the navigable airspace and assign by regulation the use of the airspace necessary to ensure the safety of aircraft.

II. MUNICIPALITIES MAY NOT REGULATE AIRCRAFT FLIGHT PATHS OR ALTITUDES
While municipal governments retain traditional police power over local zoning and ground launch/recovery staging sites, they cannot dictate where aircraft fly in the sky. As the Supreme Court held in City of Burbank v. Lockheed, federal regulation of airspace management is so pervasive as to occupy the field. An attempt by a city council to create local airspace “no-fly zones” over public roads conflicts directly with FAA Part 107.

III. COMMUNITY S-T-E-A-R PROTOCOLS MEET AND EXCEED FEDERAL SAFETY STANDARDS
Petitioner’s S-T-E-A-R Safe autonomous flight protocols incorporate 4-digit biometric PIN verification, real-time ADS-B transponder telemetry, and automated geofenced parachute recovery systems, complying fully with 14 CFR § 107.39 flight over people standards.

CONCLUSION:
Petitioner respectfully requests that the FAA issue a formal Advisory Opinion confirming that federal law preempts local municipal flight restrictions, ensuring uninterrupted community safety and emergency medical transit across the Detroit metropolitan corridor.`,
    practicalFilingGuidance:
      'Submit electronically via the federal eRulemaking Portal (Regulations.gov) under FAA Docket review, and serve duplicate physical courtesy copies to the City Clerk (CAYMC, 2 Woodward Ave, Room 201) and Corporation Counsel.',
  },

  // TEMPLATE 3: CIVIL RIGHTS DISPUTE - SECTION 1983 COMPLAINT FOR FALSE IMPRISONMENT
  {
    id: 'template_section_1983_false_arrest',
    title: 'Model 42 U.S.C. § 1983 Civil Rights Complaint for 26-Day Unlawful Confinement',
    disputeType: 'civil_rights',
    categoryLabel: 'Federal Civil Rights & Torts',
    jurisdiction: 'United States District Court for the Eastern District of Michigan (Southern Division)',
    captionHeader: {
      court: 'UNITED STATES DISTRICT COURT\nEASTERN DISTRICT OF MICHIGAN · SOUTHERN DIVISION',
      plaintiffOrPetitioner: 'JEANELL LAND, Plaintiff,',
      defendantOrRespondent: 'v.\nCITY OF DETROIT, a municipal corporation; OFFICER JOHN DOE, in his individual capacity; and COMMERCIAL RENTAL CAR CORP., a Delaware corporation, Defendants.',
      caseOrDocketNumber: 'Civil Action No. 2:26-cv-14892 · Jury Trial Demanded',
      documentTitle: 'COMPLAINT FOR CIVIL RIGHTS VIOLATIONS (42 U.S.C. § 1983) AND COMMON LAW TORTS OF FALSE IMPRISONMENT AND MALICIOUS PROSECUTION',
    },
    summary:
      'A federal civil rights complaint seeking compensatory and punitive damages for 26 days of unlawful confinement following a false stolen vehicle report on an extended, returned rental car, demonstrating deliberate indifference and failure to examine exculpatory evidence.',
    coreLegalIssues: [
      'Unreasonable seizure and detention under the Fourth Amendment.',
      'Deprivation of liberty without substantive due process under the Fourteenth Amendment.',
      'Monell municipal liability for custom of automated charging without verifying rental extensions.',
      'Corporate negligence and malicious reporting by commercial rental entity.',
    ],
    governingLaw: [
      '42 U.S.C. § 1983 (Civil Action for Deprivation of Rights)',
      'Monell v. Dept. of Social Services, 436 U.S. 658 (1978)',
      'Franks v. Delaware, 438 U.S. 154 (1978)',
      'Fourth and Fourteenth Amendments to the U.S. Constitution',
    ],
    templatePleadingText: `PLAINTIFF, JEANELL LAND, by counsel, brings this civil rights action demanding trial by jury against Defendants:

PARTIES & JURISDICTION:
1. Plaintiff Jeanell Land is an aeronautical researcher, licensed businesswoman, and resident of Wayne County, Michigan.
2. Defendant City of Detroit operates the Detroit Police Department and is responsible for policies governing the investigation and verification of reported stolen property.
3. Jurisdiction is conferred under 28 U.S.C. §§ 1331 and 1343(a)(3) for federal civil rights claims, and supplemental jurisdiction exists under 28 U.S.C. § 1367.

FACTUAL ALLEGATIONS:
4. On October 14, 2016, Plaintiff was unlawfully stopped by Defendant Officers while operating a commercial rental vehicle for which she possessed valid, verified contract extension receipts and bank billing statements.
5. Despite Plaintiff repeatedly tendering physical and electronic proof of extension and direct confirmation that the vehicle had been returned to the rental lot, Defendant Officers refused to contact the rental agency or examine exculpatory evidence.
6. Plaintiff was booked into Wayne County Jail and held for twenty-six (26) days under false arrest on fabricated charges of felony grand theft.
7. During the entire 26-day detention, Defendants conducted zero exculpatory review, forcing Plaintiff to endure trauma, loss of liberty, and unjustified administrative probation fees.

COUNT I: 42 U.S.C. § 1983 - FOURTH AMENDMENT UNLAWFUL DETENTION (All Defendants)
8. Defendants detained Plaintiff without arguable probable cause, intentionally ignoring undisputed exculpatory documents in Plaintiff’s immediate possession.

COUNT II: COMMON LAW FALSE IMPRISONMENT & MALICIOUS PROSECUTION
9. Defendant Rental Corp instituted criminal proceedings maliciously without probable cause to coerce civil fee payments, knowing the vehicle was returned.

PRAYER FOR RELIEF:
Wherefore, Plaintiff demands judgment against Defendants for compensatory damages, emotional distress, punitive damages, and statutory attorney fees under 42 U.S.C. § 1988.`,
    practicalFilingGuidance:
      'File electronically via the federal CM/ECF system with the U.S. District Court (Theodore Levin U.S. Courthouse, 231 W. Lafayette Blvd, 5th Floor Clerk’s Office, Detroit). Ensure Summons and Complaint are formally served by a licensed process server within 90 days.',
  },

  // TEMPLATE 4: COMMUNITY REHABILITATION - FHA ZONING SPECIAL USE APPEAL
  {
    id: 'template_one_stop_fha_zoning',
    title: 'Fair Housing Act Special Use Appeal for One Stop Rehabilitation & Domestic Violence Shelter',
    disputeType: 'community',
    categoryLabel: 'Municipal Zoning & Fair Housing Act',
    jurisdiction: 'City of Detroit Board of Zoning Appeals (BZA)',
    captionHeader: {
      court: 'CITY OF DETROIT BOARD OF ZONING APPEALS\nCOLEMAN A. YOUNG MUNICIPAL CENTER',
      plaintiffOrPetitioner: 'IN RE: ONE STOP REHABILITATION CENTER 501(c)(3) & YOUTH FOSTER HAVEN, Applicant/Petitioner,',
      defendantOrRespondent: 'v.\nDETROIT BUILDINGS, SAFETY ENGINEERING & ENVIRONMENTAL DEPARTMENT (BSEED)',
      caseOrDocketNumber: 'BZA Appeal No. BZA-2026-0814 · Special Land Use Petition',
      documentTitle: 'PETITION FOR REASONABLE ACCOMMODATION UNDER THE FAIR HOUSING ACT (42 U.S.C. § 3604) AND SPECIAL LAND USE PERMIT REVERSAL',
    },
    summary:
      'A municipal administrative appeal petition securing zoning authorization for One Stop Rehabilitation Center’s transitional shelter, domestic violence beds, and foster youth housing by invoking federal Fair Housing Act reasonable accommodation mandates.',
    coreLegalIssues: [
      'Federal Fair Housing Act (FHA) prohibition on exclusionary zoning targeting supportive housing.',
      'Mandatory municipal duty to provide reasonable accommodation under 42 U.S.C. § 3604(f)(3)(B).',
      'Demonstrated public necessity for trauma-informed beds for aged-out foster youth and returning citizens.',
      'Preservation of neighborhood stability through structured 501(c)(3) programming.',
    ],
    governingLaw: [
      '42 U.S.C. § 3604(f)(3)(B) (Fair Housing Act Reasonable Accommodation)',
      'City of Edmonds v. Oxford House, Inc., 514 U.S. 725 (1995)',
      'City of Detroit Zoning Ordinance Chapter 50 (Special Land Use)',
      'Americans with Disabilities Act (ADA) Title II',
    ],
    templatePleadingText: `APPLICANT, ONE STOP REHABILITATION CENTER 501(c)(3) (Executive Director: Jeanell Land), petitions the Board of Zoning Appeals to reverse the denial of Special Land Use Permit for 15400 Grand River Ave:

1. One Stop Rehabilitation Center is a licensed Michigan non-profit corporation providing holistic re-entry, domestic violence transitional shelter, and supportive foster youth housing.
2. On August 1, 2026, BSEED issued an administrative denial citing single-family residential density constraints under Chapter 50, Section 50-12-82.
3. Under 42 U.S.C. § 3604(f)(3)(B), discrimination includes “a refusal to make reasonable accommodations in rules, policies, practices, or services, when such accommodations may be necessary to afford such person equal opportunity to use and enjoy a dwelling.”
4. The residents served by One Stop—survivors of domestic violence, returning citizens rebuilding life skills, and aged-out foster youth—qualify for federal protection against disparate impact zoning exclusions.
5. The proposed use will not alter the essential residential character of Grand River Ave; rather, it restores an abandoned commercial parcel into a beacon of neighborhood stabilization and career education.

CONCLUSION:
Applicant respectfully urges the Board to grant the requested Special Land Use permit and approve the reasonable accommodation mandate.`,
    practicalFilingGuidance:
      'File with the Board of Zoning Appeals Secretary at CAYMC, Room 212. Submit twelve (12) collated copies including site plans, architectural floor layouts, 501(c)(3) IRS determination letter, and neighborhood support petitions.',
  },

  // TEMPLATE 5: AERONAUTICAL PATENT DEFENSE - PRIOR ART REBUTTAL
  {
    id: 'template_aero_patent_prior_art',
    title: 'Patent Trial and Appeal Board (PTAB) Prior Art Rebuttal (Aerodynamic Winglet Innovation)',
    disputeType: 'aeronautical',
    categoryLabel: 'Intellectual Property & Aeronautical Patents',
    jurisdiction: 'United States Patent and Trademark Office · Patent Trial and Appeal Board',
    captionHeader: {
      court: 'UNITED STATES PATENT AND TRADEMARK OFFICE\nBEFORE THE PATENT TRIAL AND APPEAL BOARD',
      plaintiffOrPetitioner: 'JEANELL LAND, Senior Flight Systems Inventor, Petitioner,',
      defendantOrRespondent: 'v.\nTITAN DEFENSE AEROSPACE CORP., Patent Owner.',
      caseOrDocketNumber: 'IPR Docket No. IPR2026-00412 · U.S. Patent No. 9,842,104',
      documentTitle: 'PETITIONER’S DECLARATION OF PRIOR ART INVALIDITY UNDER 35 U.S.C. § 102(a)(1) (INDEPENDENT WIND TUNNEL REDUCTION TO PRACTICE)',
    },
    summary:
      'A formal patent invalidity declaration establishing that independent university laboratory wind tunnel trials and NACA airfoil calculations conducted by an independent inventor predate a defense contractor’s patent claims, proving anticipation and prior inventorship.',
    coreLegalIssues: [
      'Prior inventorship and public disclosure under 35 U.S.C. § 102.',
      'Evidentiary sufficiency of dated laboratory notebooks and calibrated wind tunnel data sheets.',
      'Non-obviousness rebuttal under KSR International Co. v. Teleflex Inc.',
      'Protection of grassroots aeronautical research against corporate patent capture.',
    ],
    governingLaw: [
      '35 U.S.C. § 102 (Conditions for Patentability; Novelty)',
      '35 U.S.C. § 103 (Non-obvious Subject Matter)',
      'KSR International Co. v. Teleflex Inc., 550 U.S. 398 (2007)',
      '37 CFR § 42.100 et seq. (Inter Partes Review Procedures)',
    ],
    templatePleadingText: `DECLARATION OF INVENTOR JEANELL LAND IN SUPPORT OF PETITION FOR INTER PARTES REVIEW:

I, Jeanell Land, declare under penalty of perjury as follows:

1. I am an aeronautical researcher and inventor specializing in fluid dynamics, NACA airfoils, and boundary-layer turbulence management.
2. In October 1998, as part of wind tunnel aerodynamic research at university facilities, I designed, built, and tested the exact low-drag swept vortex winglet geometry claimed in Claims 1–8 of Patent Owner’s patent.
3. Attached hereto as Exhibit A are certified, original, contemporaneous wind tunnel calibration logs dated October 14, 1998, witnessed and signed by lab technicians, recording lift-to-drag ratios (L/D) at Mach 0.65.
4. The physical model was publicly demonstrated at the Detroit Regional Engineering Symposium on May 12, 1999—more than one full year prior to Patent Owner’s priority filing date.
5. Under 35 U.S.C. § 102, a person is not entitled to a patent if the claimed invention was described in a printed publication or in public use or on sale before the effective filing date.
6. The subject claims are invalid as anticipated and obvious to a person having ordinary skill in the art of aeronautical wing design.

I declare under penalty of perjury that the foregoing is true and correct.`,
    practicalFilingGuidance:
      'Submit electronically via the USPTO Patent Center and Patent Trial and Appeal Board (PTAB) portal. File petition fee and complete Certificate of Service on Patent Owner’s registered patent attorneys of record.',
  },

  // TEMPLATE 6: AERONAUTICAL & COMMUNITY DISPUTE - RESIDENTIAL CURTILAGE DRONE NUISANCE INJUNCTION
  {
    id: 'template_curtilage_drone_injunction',
    title: 'Emergency Complaint for Temporary Restraining Order (Low-Altitude Drone Curtilage Trespass)',
    disputeType: 'aeronautical',
    categoryLabel: 'Aeronautical Drone Intrusion & Community Privacy',
    jurisdiction: 'State of Michigan · 3rd Judicial Circuit Court (Wayne County) - Civil Division',
    captionHeader: {
      court: 'STATE OF MICHIGAN\nIN THE CIRCUIT COURT FOR THE COUNTY OF WAYNE',
      plaintiffOrPetitioner: 'JEANELL LAND, Individually and as Guardian, Plaintiff,',
      defendantOrRespondent: 'v.\nAPEX SURVEILLANCE & LOGISTICS LLC, a Michigan limited liability company, Defendant.',
      caseOrDocketNumber: 'Civil Action No. 26-009184-CH · Hon. Civil Division Presiding',
      documentTitle: 'VERIFIED COMPLAINT FOR EMERGENCY TEMPORARY RESTRAINING ORDER AND PRELIMINARY INJUNCTION (AERIAL TRESPASS, COMMON LAW NUISANCE, AND INVASION OF PRIVACY)',
    },
    summary:
      'An emergency civil petition by a residential homeowner seeking immediate injunctive relief against unauthorized commercial drone operators repeatedly hovering 25 to 40 feet above a fenced backyard curtilage and domestic haven.',
    coreLegalIssues: [
      'Aerial trespass within constitutionally protected residential curtilage (Restatement Torts § 159(2)).',
      'Common law invasion of privacy by intrusion upon seclusion (Restatement Torts § 652B).',
      'Violation of FAA Part 107.39 prohibitions against sustained flight over non-consenting persons.',
      'Irreparable harm to family safety, child peace of mind, and domestic tranquility.',
    ],
    governingLaw: [
      'Restatement (Second) of Torts § 159(2) (Trespass in Airspace)',
      'Florida v. Riley, 488 U.S. 445 (1989)',
      '14 CFR § 107.39 (Operations Over Human Beings)',
      'MCR 3.310 (Injunctions and Temporary Restraining Orders)',
    ],
    templatePleadingText: `NOW COMES Plaintiff, JEANELL LAND, by and through counsel, and files this Verified Complaint for Emergency Temporary Restraining Order against Defendant Apex Surveillance & Logistics LLC:

1. Plaintiff owns and occupies real property in Wayne County, Michigan, maintaining a fully fenced, private residential yard and youth sanctuary curtilage.
2. Defendant is an autonomous sUAS delivery and aerial mapping enterprise operating quadcopters equipped with high-resolution telephoto cameras.
3. Commencing on September 12, 2026, Defendant has repeatedly directed multirotor aircraft into the immediate airspace 25 to 40 feet above Plaintiff’s private patio, hovering for sustained intervals and recording video footage of Plaintiff's family and foster children.
4. While the FAA regulates high-altitude navigable airspace, the United States Supreme Court recognized in United States v. Causby, 328 U.S. 256 (1946) that a landowner owns at least as much of the superadjacent airspace as can be occupied or used in connection with the land.
5. Invasion of the immediate reaches of residential curtilage constitutes actionable common law trespass under Restatement (Second) of Torts § 159(2) where it interferes with the peaceful use and quiet enjoyment of real property.
6. Defendant’s ongoing low-altitude intrusions cause continuous, irreparable emotional distress, disruption of foster family healing, and fear of falling rotating propellers.

WHEREFORE, Plaintiff prays that this Court:
A. Issue an Immediate Ex Parte Temporary Restraining Order enjoining Defendant from operating any drone below 200 feet AGL within 300 horizontal feet of Plaintiff’s residential boundaries;
B. Award compensatory damages for common law trespass and invasion of seclusion;
C. Order the immediate destruction or sealing of all surreptitious video footage captured over Plaintiff’s premises.`,
    practicalFilingGuidance:
      'File with the Wayne County Circuit Court Clerk at Coleman A. Young Municipal Center (2 Woodward Ave, Room 201). Request immediate emergency motion docket review with duty judge. Serve Summons and TRO upon Defendant registered agent within 24 hours.',
  },

  // TEMPLATE 7: COMMUNITY DISPUTE - EMERGENCY MOTION TO STAY ILLEGAL LOCKOUT & REGAIN POSSESSION
  {
    id: 'template_illegal_lockout_emergency_motion',
    title: 'Emergency Motion to Restore Possession & Enjoin Illegal Self-Help Lockout (Anti-Lockout Act)',
    disputeType: 'community',
    categoryLabel: 'Tenant Defense & Community Anti-Lockout',
    jurisdiction: 'State of Michigan · 36th District Court (City of Detroit)',
    captionHeader: {
      court: 'STATE OF MICHIGAN\n36TH DISTRICT COURT · CITY OF DETROIT',
      plaintiffOrPetitioner: 'JEANELL LAND, Tenant / Aggrieved Occupant, Plaintiff/Counter-Defendant,',
      defendantOrRespondent: 'v.\nMETRO APARTMENT HOLDINGS LLC, Landlord, Defendant/Counter-Plaintiff.',
      caseOrDocketNumber: 'LT Case No. 26-118492-LT · Hon. Housing Court Presiding',
      documentTitle: 'EMERGENCY MOTION TO RESTORE OCCUPANCY UNDER MCL 600.2918(1) AND FOR STATUTORY TREBLE DAMAGES FOR UNLAWFUL SELF-HELP EVICTION',
    },
    summary:
      'An emergency motion by a tenant or transitional resident wrongfully locked out without a court order, demanding immediate keys/restoration of shelter and statutory treble damages under the Michigan Anti-Lockout Act.',
    coreLegalIssues: [
      'Strict statutory prohibition on landlord self-help eviction under MCL 600.2918.',
      'Denial of essential shelter to a single mother and family without judicial due process.',
      'Mandatory entitlement to immediate restoration of occupancy and three times actual damages.',
      'Spoliation and unlawful conversion of personal property left inside padlocked premises.',
    ],
    governingLaw: [
      'MCL 600.2918 (Michigan Anti-Lockout Statute)',
      'Nelson v. Grays, 209 Mich. App. 661 (1995)',
      'MCL 600.5714 (Summary Proceedings to Recover Possession of Realty)',
      'MCR 4.201 (Summary Proceedings; Landlord-Tenant)',
    ],
    templatePleadingText: `NOW COMES Tenant, JEANELL LAND, and brings this Emergency Motion to Restore Occupancy against Landlord Metro Apartment Holdings LLC:

1. Plaintiff is in lawful possession of the residential dwelling located in Detroit, Michigan, pursuant to a valid residential lease agreement.
2. On October 12, 2026, without serving any notice of hearing, without obtaining a court judgment for possession, and without any court officer or writ of restitution, Defendant landlord maliciously removed the exterior door lock cylinders and padlocked Plaintiff’s residence.
3. Defendant further disconnected water and electric utilities, stranding Plaintiff and her four minor children without shelter, winter clothing, or vital medications locked inside.
4. Under Michigan Compiled Laws § 600.2918(1), any person who is ejected or kept out of premises in an unlawful manner is entitled to recover possession and three times actual damages or $200.00, whichever is greater.
5. In Deroshia v. Union Terminal Piers, 151 Mich. App. 715 (1986), the Michigan Court of Appeals affirmed that self-help lockouts are strictly prohibited in the State of Michigan regardless of lease clauses or rent disputes.

WHEREFORE, Plaintiff moves this Honorable Court to:
A. Order Defendant to immediately surrender working keys and restore full occupancy to Plaintiff within 2 hours of entry of this Order;
B. Restrain Defendant from terminating electric or water utilities;
C. Award Plaintiff statutory treble damages of $7,500.00 plus costs and reasonable attorney fees under MCL 600.2918(2).`,
    practicalFilingGuidance:
      'File immediately at 36th District Court (421 Madison St, Detroit, 4th Floor Civil Filing Counter). Inform clerk that this is an emergency lockout motion under MCL 600.2918 to obtain same-day judicial signature on Order to Show Cause.',
  },

  // TEMPLATE 8: COMMUNITY DISPUTE - MICHIGAN CLEAN SLATE EXPUNGEMENT PETITION
  {
    id: 'template_clean_slate_expungement_petition',
    title: 'Petition to Set Aside Conviction under Michigan Clean Slate Act (MCL 780.621)',
    disputeType: 'community',
    categoryLabel: 'Re-entry, Clean Slate & Community Rehabilitation',
    jurisdiction: 'State of Michigan · 3rd Judicial Circuit Court (Wayne County) - Criminal Division',
    captionHeader: {
      court: 'STATE OF MICHIGAN\nIN THE 3RD JUDICIAL CIRCUIT COURT FOR THE COUNTY OF WAYNE',
      plaintiffOrPetitioner: 'PEOPLE OF THE STATE OF MICHIGAN,',
      defendantOrRespondent: 'v.\nJEANELL LAND, Petitioner/Defendant.',
      caseOrDocketNumber: 'Original Case No. 98-002149-FH · Form MC 227 Expungement Docket',
      documentTitle: 'APPLICATION TO SET ASIDE CONVICTION PURSUANT TO MCL 780.621 (MICHIGAN CLEAN SLATE ACT)',
    },
    summary:
      'A formal judicial petition to seal and set aside a historic youthful conviction from age 20, demonstrating full rehabilitation, founding of a 501(c)(3) nonprofit, and qualification for foster parenting licensure.',
    coreLegalIssues: [
      'Statutory qualification under Michigan Public Acts 187-193 (Clean Slate expanded eligibility).',
      'Satisfaction of statutory 5-year waiting period without subsequent convictions.',
      'Demonstration of exemplary post-conviction conduct and public service.',
      'Consistency of relief with the public welfare under MCL 780.621d.',
    ],
    governingLaw: [
      'MCL 780.621 et seq. (Application to Set Aside Conviction)',
      'MCL 780.621d (Hearing and Standard of Determination)',
      'People v. Bensch, 328 Mich. App. 1 (2019)',
      'Michigan State Police Criminal History Verification Rules',
    ],
    templatePleadingText: `PETITIONER, JEANELL LAND, respectfully petitions this Honorable Court to set aside the judgment of conviction entered against her in 1998, stating:

1. On June 12, 1998, when Petitioner was 20 years old, Petitioner was convicted of one count of felonious assault stemming from a heated neighborhood altercation.
2. More than twenty-five (25) years have elapsed since the completion of Petitioner’s term of probation, satisfying the waiting period requirements of MCL 780.621a.
3. Petitioner has no pending criminal charges, nor has Petitioner been convicted of any disqualifying offenses enumerated in MCL 780.621c.
4. Since that single youthful event, Petitioner has dedicated her entire adult life to uplifting Detroit:
   a. Founded and directs One Stop Rehabilitation Center 501(c)(3), providing food pantry, job readiness, and domestic violence shelter services to over 2,500 residents;
   b. Earned advanced vocational credentials in aeronautical research and wind tunnel diagnostics;
   c. Successfully completed all state background certifications to become a licensed foster care provider for displaced youth.
5. Under MCL 780.621d, the Court should consider Petitioner’s circumstances and behavior since conviction. Expunging this record will remove barriers to expanded state foster parenting grants and federal STEM educational funding.

WHEREFORE, Petitioner prays that this Court enter an Order setting aside the conviction and directing the Michigan State Police to seal all public records.`,
    practicalFilingGuidance:
      'Submit Form MC 227 with certified copy of original conviction record to Wayne County Clerk (1441 St. Antoine St). Send one copy with $50 money order and electronic LiveScan fingerprint card to Michigan State Police and Wayne County Prosecutor.',
  },

  // TEMPLATE 9: AERONAUTICAL DISPUTE - AIR21 SAFETY WHISTLEBLOWER COMPLAINT
  {
    id: 'template_aero_maintenance_whistleblower',
    title: 'AIR21 Federal Aviation Safety Retaliation Complaint (Defective Avionics Disclosure)',
    disputeType: 'aeronautical',
    categoryLabel: 'Aeronautical Whistleblower & Flight Safety',
    jurisdiction: 'United States Department of Labor · Occupational Safety and Health Administration (OSHA)',
    captionHeader: {
      court: 'UNITED STATES DEPARTMENT OF LABOR\nOCCUPATIONAL SAFETY AND HEALTH ADMINISTRATION (OSHA) · REGION 5',
      plaintiffOrPetitioner: 'JEANELL LAND, Senior Avionics Systems Specialist, Complainant,',
      defendantOrRespondent: 'v.\nGLOBAL AERO-DEFENSE LOGISTICS CORP., Respondent Employer.',
      caseOrDocketNumber: 'OSHA Whistleblower Complaint No. 5-2026-AIR21-0049',
      documentTitle: 'VERIFIED COMPLAINT OF RETALIATION UNDER THE WENDELL H. FORD AVIATION INVESTMENT AND REFORM ACT FOR THE 21ST CENTURY (49 U.S.C. § 42121)',
    },
    summary:
      'A formal OSHA whistleblower retaliation complaint by an aeronautical avionics technician who was threatened and terminated after refusing to falsify an FAA Part 121 airworthiness log for an uncalibrated autonomous flight controller.',
    coreLegalIssues: [
      'Protected whistleblowing activity under 49 U.S.C. § 42121(a)(1) regarding FAA air safety violations.',
      'Employer knowledge of protected safety disclosures.',
      'Adverse employment action (unlawful termination) causally connected to refusal to falsify flight logs.',
      'Clear and convincing standard for non-discriminatory employer justification.',
    ],
    governingLaw: [
      '49 U.S.C. § 42121 (AIR21 Whistleblower Protections)',
      '29 CFR Part 1979 (Procedures for the Handling of Air Safety Retaliation Complaints)',
      '14 CFR § 43.12 (Maintenance Records: Falsification, Reproduction, or Alteration)',
      'Murray v. UBS Securities LLC, 601 U.S. ___ (2024)',
    ],
    templatePleadingText: `COMPLAINANT, JEANELL LAND, files this formal whistleblower retaliation complaint against Respondent Global Aero-Defense Logistics Corp:

1. Complainant was employed as a Senior Avionics Systems Specialist inspecting autonomous flight control modules and telemetry transponders.
2. On August 18, 2026, during pre-flight diagnostics on a regional cargo airframe, Complainant detected intermittent inertial measurement unit (IMU) drift exceeding FAA Part 25 airworthiness tolerances by 34%.
3. Complainant red-tagged the aircraft, logged the discrepancy in the official maintenance tracking system, and refused to sign the Return-to-Service airworthiness certificate.
4. Respondent's Chief Flight Operations Officer instructed Complainant to “sign off the bird anyway because the freight contract has hourly delay liquidated damages.”
5. When Complainant stated that signing a false certification violated 14 CFR § 43.12 and 18 U.S.C. § 1001, Respondent suspended Complainant without pay and subsequently terminated her employment within 72 hours.
6. Refusing to violate federal aviation safety standards and reporting airworthiness failures constitutes protected activity under 49 U.S.C. § 42121.

RELIEF REQUESTED:
Complainant respectfully requests that OSHA investigate this complaint, order immediate reinstatement to her avionics position, award complete back pay with interest, expunge all negative disciplinary entries, and assess compensatory damages for emotional distress and statutory attorney fees.`,
    practicalFilingGuidance:
      'File within ninety (90) days of the adverse employment action via OSHA’s Online Whistleblower Complaint Form (osha.gov) or deliver to OSHA Detroit Area Office (5300 International Dr, Romulus, MI 48174). Include flight maintenance logs and termination notice.',
  },

  // TEMPLATE 10: CIVIL RIGHTS & FAMILY REUNIFICATION - FAMILY REUNITE ACT PETITION
  {
    id: 'template_family_reunite_parental_rights',
    title: 'Emergency Petition for Immediate Reinstatement of Parental Rights and Complete Vacatur of Incarceration-Accumulated Child Support Arrears (Family Reunite Act Model)',
    disputeType: 'civil_rights',
    categoryLabel: 'Family Reunification & Civil Advocacy',
    jurisdiction: 'State of Michigan · 3rd Judicial Circuit Court · Family Division (Wayne County)',
    captionHeader: {
      court: 'STATE OF MICHIGAN\nIN THE CIRCUIT COURT FOR THE COUNTY OF WAYNE · FAMILY DIVISION',
      plaintiffOrPetitioner: 'IN THE MATTER OF THE PETITION OF JEANELL LAND, Mother / Petitioner,',
      defendantOrRespondent: 'v.\nWAYNE COUNTY FRIEND OF THE COURT & MICHIGAN DEPARTMENT OF HEALTH AND HUMAN SERVICES (MDHHS), Respondents.',
      caseOrDocketNumber: 'Family Division Docket No. 2026-FOC-009412-DM · Hon. Family Presiding',
      documentTitle: 'EMERGENCY VERIFIED MOTION FOR IMMEDIATE RESTORATION OF LEGAL & PHYSICAL CUSTODY, COMPLETE VACATUR OF UNLAWFUL ARREARS ACCRUED DURING 26-DAY FALSE IMPRISONMENT, AND PERMANENT TERMINATION OF PREDATORY WAGE GARNISHMENT (PURSUANT TO FAMILY REUNITE ACT STATUTORY PRINCIPLES AND MCR 3.206)',
    },
    summary:
      'A groundbreaking civil pleading implementing the model provisions of the Family Reunite Act (Change.org/FamilyReuniteAct). Defends parents whose children were placed in temporary guardianship or foster care, and whose wages were subjected to catastrophic support arrears and payroll garnishment while falsely incarcerated over civil rental car bailment disputes.',
    coreLegalIssues: [
      'Fundamental Fourteenth Amendment constitutional right to family integrity and parental association without arbitrary state deprivation (Santosky v. Kramer).',
      'Illegality of conditioning child reunification or parental fitness upon unadjudicated pretrial detention or dismissed criminal charges.',
      'Mandatory statutory vacatur and retroactive zeroing of child support arrears accrued while involuntarily confined without income.',
      'Immediate injunctive relief enjoining state Friend of the Court from continuing payroll garnishments, tax refund intercepts, and driver license suspensions.',
    ],
    governingLaw: [
      'The Family Reunite Act (Citizen Legislative Petition Model - Change.org/FamilyReuniteAct)',
      'U.S. Const. amend. XIV (Substantive Due Process Right to Family Integrity)',
      '42 U.S.C. § 1983 (Deprivation of Civil Rights Under Color of State Law)',
      'MCL 552.603b (Retroactive Child Support Modification & Incarceration Relief)',
      'Santosky v. Kramer, 455 U.S. 745 (1982)',
      'Troxel v. Granville, 530 U.S. 57 (2000)',
    ],
    templatePleadingText: `NOW COMES Petitioner, JEANELL LAND, by and through counsel, and hereby files this Emergency Verified Motion for Immediate Reinstatement of Full Parental Custody, Complete Vacatur of Child Support Arrears, and Dissolution of All Income Withholding Orders, stating to this Honorable Court as follows:

1. Petitioner is the biological mother and natural guardian of her minor children, possessing an inviolable fundamental liberty interest in their care, custody, and companionship secured by the Due Process Clause of the Fourteenth Amendment.
2. On October 16, 2026, Petitioner was subjected to a 26-day false imprisonment resulting from an erroneous stolen vehicle report filed during an authorized rental car bailment extension, during which Petitioner was held without valid probable cause until all criminal charges were completely dismissed with prejudice on motion of the Prosecuting Attorney.
3. During Petitioner’s involuntary 26-day confinement, Respondent MDHHS initiated emergency dependency proceedings predicated exclusively on Petitioner’s physical detention, threatening permanent termination of parental rights.
4. Concurrently, Respondent Wayne County Friend of the Court entered administrative orders generating child support arrears, late interest surcharges, and a mandatory 50% payroll garnishment notice against Petitioner’s prospective post-release earnings.
5. In accordance with the legislative standards articulated in the Family Reunite Act (Change.org/FamilyReuniteAct), an unadjudicated arrest or dismissed charge cannot constitutionally serve as the factual predicate to restrict parental custody or declare a home unfit.
6. Under MCL 552.603b and Title IV-D of the Social Security Act (45 CFR § 302.56), child support enforcement authorities are prohibited from treating involuntary confinement as voluntary underemployment, and all support obligations accruing during wrongful detention must be completely abated and vacated.
7. Continuing to enforce wage garnishments against an exonerated parent deprives the family of essential household funds necessary for food, stable housing, and trauma recovery, actively thwarting the primary objective of family reunification.

WHEREFORE, Petitioner respectfully prays that this Honorable Court:
A. Enter an Immediate Order Restoring Full Legal and Physical Custody of the minor children to Petitioner within 24 hours;
B. Permanently vacate, extinguish, and zero all child support arrears, statutory surcharges, and state fees that accrued during and as a consequence of Petitioner’s unlawful detention;
C. Issue an immediate Notice of Dissolution of Income Withholding to Petitioner’s employers and financial institutions;
D. Direct Respondent MDHHS to expunge all central registry entries referencing Petitioner; and
E. Award Petitioner reasonable attorney fees and restorative family transition relief.`,
    practicalFilingGuidance:
      'File in person or through MiFILE with the Wayne County Circuit Court Family Division (Coleman A. Young Municipal Center, 2 Woodward Ave, Room 1007, Detroit, MI 48226). Serve emergency copies by personal service on the Friend of the Court Legal Department and the County Prosecutor Child Protection Unit. Attach certified copy of Order of Dismissal from the criminal case.',
  },
];

