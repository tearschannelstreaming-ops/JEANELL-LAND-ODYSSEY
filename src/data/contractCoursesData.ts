import { ContractCourse } from '../types/contractEducation';

export const CONTRACT_COURSES: ContractCourse[] = [
  // =========================================================================
  // COURSE 100: 2nd Grade Manuscript & Penmanship Prerequisite
  // =========================================================================
  {
    code: '100',
    title: 'Course 100: Manuscript Penmanship & Legal Identity Formation',
    subtitle: '2nd Grade Foundational Prerequisite to Legal Contract Signing',
    tier: 'elementary_manuscript',
    gradeLevelBadge: '2nd Grade Prerequisite',
    prerequisite: 'None (Universal 2nd Grade Entry)',
    statutoryBasis: 'Michigan Revised School Code § 380.1278 · UCC § 1-201(b)(37) (Definition of "Signed")',
    overview:
      'Starting in second grade, students master manuscript printing and controlled letter formation as the strict physical and legal prerequisite to contract execution. A legal signature is not a thoughtless squiggle—it is an individual\'s authenticated assent. Students learn baseline discipline, proportion, distinct capitalizations, and the historical power of writing their own legal name.',
    keyCompetencies: [
      'Manuscript printing with proper tripod pencil grip and baseline stability',
      'Distinction between block printing for printed names and cursive/manuscript hybrid signatures',
      'Understanding UCC § 1-201(b)(37): Any symbol executed or adopted with present intention to authenticate',
      'Developing an authentic, consistent personal signature that matches government-issued records',
    ],
    manuscriptGuide: {
      focusSkill: 'Manuscript Letter Height & Baseline Grounding',
      strokeInstructions: [
        'Place pencil 45 degrees to the writing line on wide-rule manuscript paper',
        'Ascenders (b, d, f, h, k, l, t) touch top headline; descenders (g, j, p, q, y) descend below baseline',
        'Your legal name must be legible in print; your signature must be distinct and unforgeable',
        'Second grade mantra: "Clear manuscript today, binding contracts tomorrow!"',
      ],
      sampleLetterGroup: ['A-Z Capital Foundations', 'a-z Manuscript Baselines', 'Personal First & Last Legal Name'],
      signaturePhilosophy:
        'Your name is your sacred bond. Before anyone asks you to sign for a house, an LLC, or an airplane, you must respect the physical art of writing your name.',
    },
    sampleDocument: {
      documentId: 'doc_100_sig_card',
      documentType: 'manuscript_signature_card',
      title: 'Elementary Scholar Legal Manuscript & Official Signature Card',
      subtitle: 'Official Registration of Primary Penmanship & Authentic Signature Mark',
      governingLaw: 'Common Law Authentication Standards · UCC § 1-201(b)(37)',
      parties: {
        partyA: 'Student Scholar (Applicant)',
        partyB: 'One Stop Rehabilitation Youth Academy (Attesting Registrar)',
        roleA: 'Primary Signatory',
        roleB: 'Academic Dean & Witness',
      },
      notaryRequired: false,
      officialFilingAuthority: 'One Stop Rehabilitation Center 501(c)(3) Academic Archives',
      clauses: [
        {
          id: 'c100_1',
          sectionNumber: 'Section 1.01',
          title: 'Adoption of Legal Mark',
          content:
            'I hereby adopt the manuscript print and distinct signature executed on this card as my true, lawful mark of personal assent. Whenever this mark appears upon an official document, it signals that I have read and approved the content.',
          plainEnglishExplanation: 'This confirms that this is your official signature and you take responsibility for what you sign.',
        },
        {
          id: 'c100_2',
          sectionNumber: 'Section 1.02',
          title: 'The Second Grade Rule of Legibility',
          content:
            'All official records, applications, and legal covenants must pair a legible printed manuscript name with an authenticated signature.',
          plainEnglishExplanation: 'Always print your name clearly so people know who you are, then sign underneath.',
        },
      ],
    },
    interactiveChallenge: {
      prompt:
        'Why does Jeanell Land\'s curriculum require second graders to master manuscript printing before learning contract signing?',
      options: [
        {
          id: 'opt_1',
          text: 'Because a legal signature represents voluntary consent and identity; you must master writing your name legibly before binding yourself to obligations.',
          isCorrect: true,
          explanation:
            'Correct! A signature without penmanship discipline and understanding leads to signing things without reading. Manuscript establishes identity and mindfulness.',
        },
        {
          id: 'opt_2',
          text: 'Because contracts can only be written in cursive pencil and must never be typed.',
          isCorrect: false,
          explanation: 'Incorrect. Contracts are typed; the printed name and signature require human penmanship verification.',
        },
        {
          id: 'opt_3',
          text: 'It is just an art exercise with no connection to the legal world.',
          isCorrect: false,
          explanation: 'Incorrect. Penmanship is the direct foundation of legal assent and commercial identity.',
        },
      ],
    },
    reward: {
      statDelta: { resilience: 5, steamMastery: 5, kindnessPoints: 5 },
      legalStars: 10,
      cashHonorarium: 50,
    },
  },

  // =========================================================================
  // COURSE 101: Offer & Acceptance
  // =========================================================================
  {
    code: '101',
    title: 'Course 101: Offer, Acceptance & The Power of Your Word',
    subtitle: 'Mutual Assent and the Meeting of the Minds in Elementary Law',
    tier: 'elementary_manuscript',
    gradeLevelBadge: '2nd-3rd Grade',
    prerequisite: 'Course 100: Manuscript Penmanship',
    statutoryBasis: 'Restatement (Second) of Contracts §§ 22-24 · Michigan Common Law Contract Assent',
    overview:
      'Students learn how agreements are formed. An agreement begins with a definite offer and requires an unequivocal acceptance—known as a "meeting of the minds" (*consensus ad idem*). Students explore why verbal promises ("I swear I will do it") are vulnerable to misunderstandings and why putting agreements in writing with clear manuscript signatures protects both parties.',
    keyCompetencies: [
      'Defining an "Offer" vs an "Invitation to Negotiate"',
      'Understanding "Acceptance": Saying yes to the exact terms without changing them (Mirror Image Rule)',
      'The meaning of "Meeting of the Minds" (*Consensus Ad Idem*)',
      'Why written contracts prevent friendship-destroying disputes',
    ],
    sampleDocument: {
      documentId: 'doc_101_peer_pact',
      documentType: 'binding_contract',
      title: 'Youth Collaboration & Shared Tool Lending Agreement',
      subtitle: 'Formal Mutual Assent Covenant for Aeronautical Model Equipment',
      governingLaw: 'Michigan Civil Jurisprudence · Mutual Assent Standards',
      parties: {
        partyA: 'Lender Scholar',
        partyB: 'Borrower Scholar',
        roleA: 'Tool Owner / Bailor',
        roleB: 'Caregiver / Bailee',
      },
      notaryRequired: false,
      officialFilingAuthority: 'S.T.E.A.Reality Youth Arbitration Circle',
      clauses: [
        {
          id: 'c101_1',
          sectionNumber: 'Section 1',
          title: 'The Offer and Acceptance of Custody',
          content:
            'Lender offers the temporary use of the Precision NACA Wind Tunnel Caliper. Borrower unconditionally accepts and agrees to return said equipment on or before 4:00 PM Friday in pristine condition.',
          plainEnglishExplanation: 'One student offers the tool, the other accepts the exact return time without arguing.',
        },
        {
          id: 'c101_2',
          sectionNumber: 'Section 2',
          title: 'Remedy for Default',
          content:
            'In the event the Borrower fails to return the caliper by the appointed time, Borrower shall forfeit 25 Cool Points and perform 2 hours of lab cleanup duty.',
          plainEnglishExplanation: 'If you break your promise, there are agreed-upon consequences.',
        },
      ],
    },
    interactiveChallenge: {
      prompt:
        'Marcus offers to trade his airplane blueprint book to Kendra for 3 rocket model fins. Kendra says: "I accept, but only if you also give me 2 glue tubes." Under the Mirror Image Rule of contract law, what just happened?',
      options: [
        {
          id: 'opt_1',
          text: 'A binding contract was formed because Kendra said "I accept".',
          isCorrect: false,
          explanation: 'Incorrect. If terms are added or changed, it is not an acceptance.',
        },
        {
          id: 'opt_2',
          text: 'Kendra made a Counter-Offer, which rejected Marcus\'s original offer and created a new offer that Marcus must now accept or reject.',
          isCorrect: true,
          explanation:
            'Correct! Acceptance must mirror the offer exactly. Changing terms creates a counter-offer.',
        },
        {
          id: 'opt_3',
          text: 'Marcus is automatically sued for breach of contract.',
          isCorrect: false,
          explanation: 'Incorrect. No contract has been formed yet.',
        },
      ],
    },
    reward: {
      statDelta: { resilience: 5, steamMastery: 5, financialAcumen: 5 },
      legalStars: 10,
      cashHonorarium: 75,
    },
  },

  // =========================================================================
  // COURSE 102: Parties, Capacity & Guardian Joinder
  // =========================================================================
  {
    code: '102',
    title: 'Course 102: Identifying Parties, Age of Majority & Guardian Capacity',
    subtitle: 'Who Can Legally Sign? Minor Rights and Parental Joinder',
    tier: 'elementary_manuscript',
    gradeLevelBadge: '3rd-4th Grade',
    prerequisite: 'Course 101: Offer & Acceptance',
    statutoryBasis: 'MCL 600.1403 (Michigan Age of Majority Act & Infancy Defense) · Restatement (Second) of Contracts § 12',
    overview:
      'Students learn that legal capacity is required to enforce a contract. In Michigan, minors under age 18 have the defense of minority (contracts can be voidable by the minor, except for necessities of life). Therefore, commercial agreements involving youth—such as bank accounts, talent engagements, or educational enrollments—require a Parent or Guardian Joinder.',
    keyCompetencies: [
      'Understanding legal capacity to contract (age 18 in Michigan)',
      'Voidable contracts vs Void contracts',
      'The role of a Parent/Guardian as Co-Signer or Guarantor',
      'Protecting youth from predatory financial commitments',
    ],
    sampleDocument: {
      documentId: 'doc_102_guardian_joinder',
      documentType: 'binding_contract',
      title: 'Youth Entrepreneur Apprenticeship & Parental Consent Joinder',
      subtitle: 'Tri-Party Capacity Agreement with Adult Guarantorship',
      governingLaw: 'State of Michigan Minor Protection & Contract Act',
      parties: {
        partyA: 'Apprentice Youth (Age 14)',
        partyB: 'Jeanell Land Associates (Employer / Mentor)',
        roleA: 'Junior Scholar',
        roleB: 'Vocational Sponsor',
      },
      notaryRequired: false,
      officialFilingAuthority: 'State of Michigan Department of Labor & Economic Opportunity',
      clauses: [
        {
          id: 'c102_1',
          sectionNumber: 'Article I',
          title: 'Parental Joinder & Consent of Capacity',
          content:
            'The undersigned Parent/Legal Guardian joins in the execution of this Agreement to confirm that the Apprentice enters this training with informed consent, guaranteeing compliance with working hour limits and safety protocols.',
          plainEnglishExplanation: 'The parent co-signs so that the agreement is completely lawful and protects the child.',
        },
      ],
    },
    interactiveChallenge: {
      prompt:
        'A 15-year-old high school student signs a contract to buy an expensive luxury racing go-kart for $4,000 without parental consent. Under Michigan contract law (MCL 600.1403), what is the legal status of this contract?',
      options: [
        {
          id: 'opt_1',
          text: 'The contract is voidable at the option of the minor because minors lack full contractual capacity (infancy defense), unless it was for basic necessities.',
          isCorrect: true,
          explanation:
            'Correct! Minors may disaffirm contracts entered without guardian joinder. This law prevents predatory sellers from taking advantage of youth.',
        },
        {
          id: 'opt_2',
          text: 'The minor must go to adult civil prison if they cannot pay.',
          isCorrect: false,
          explanation: 'Incorrect. Civil contracts never involve debtor imprisonment.',
        },
        {
          id: 'opt_3',
          text: 'The contract is automatically enforceable against the minor\'s school.',
          isCorrect: false,
          explanation: 'Incorrect. The school has no legal privity with the merchant.',
        },
      ],
    },
    reward: {
      statDelta: { resilience: 5, financialAcumen: 10 },
      legalStars: 10,
      cashHonorarium: 100,
    },
  },

  // =========================================================================
  // COURSE 103: The Golden No-Rushing Rule & Oral Disclaimers
  // =========================================================================
  {
    code: '103',
    title: 'Course 103: The Golden No-Rushing Rule & The Parol Evidence Rule',
    subtitle: 'Never Sign Until You Read Every Word: Oral vs Written Truth',
    tier: 'elementary_manuscript',
    gradeLevelBadge: '4th-5th Grade',
    prerequisite: 'Course 102: Capacity & Joinder',
    statutoryBasis: 'UCC § 2-202 (Parol Evidence Rule) · Michigan Integration Clause Doctrine',
    overview:
      'The single most important rule in contract signing: "If it is not written on the paper, it does not exist." High-pressure salespeople often say: "Don\'t worry about that clause, we never enforce it" or "Hurry up and sign right now." Students learn the Parol Evidence Rule and Integration Clauses (*"Entire Agreement"* clause), learning how to resist social pressure and read every sentence before signing.',
    keyCompetencies: [
      'The "Entire Agreement" (Integration) clause: wiping out previous oral promises',
      'The Parol Evidence Rule: verbal statements cannot contradict written terms',
      'Handling high-pressure signing environments with calm resilience',
      'Requesting a 24-hour review window before signing any binding document',
    ],
    sampleDocument: {
      documentId: 'doc_103_integration_demo',
      documentType: 'binding_contract',
      title: 'Youth Equipment Lease with Integration Clause',
      subtitle: 'Demonstration of Written Terms Overcoming Verbal Promises',
      governingLaw: 'Michigan Commercial Code § 440.2202',
      parties: {
        partyA: 'Vendor Company',
        partyB: 'Student Buyer',
        roleA: 'Seller',
        roleB: 'Buyer',
      },
      notaryRequired: false,
      officialFilingAuthority: 'Michigan Attorney General Consumer Protection Division',
      clauses: [
        {
          id: 'c103_1',
          sectionNumber: 'Section 8.04',
          title: 'Integration / Entire Agreement Clause (The Parol Trap)',
          content:
            'This Agreement constitutes the sole and entire agreement between the parties. No prior verbal promises, guarantees, or representations by any sales representative shall be binding unless expressly set forth in writing herein.',
          plainEnglishExplanation:
            'If the salesperson told you "We give free repairs forever" but it is NOT written in this contract, the company does NOT have to give you free repairs!',
          isFinePrintTrap: true,
          trapWarning: 'Oral promises are wiped out by this clause!',
          negotiationRemedy: 'Write the verbal promise into the contract with pen and have both parties initial it.',
        },
      ],
    },
    interactiveChallenge: {
      prompt:
        'A computer seller verbally promises: "If the screen cracks in the first year, we replace it 100% free." But the written contract says: "Screen damage is excluded from all warranties. This written contract is the Entire Agreement." If the screen cracks, who wins in court?',
      options: [
        {
          id: 'opt_1',
          text: 'The seller wins, because the written Integration clause and Parol Evidence Rule prevent oral statements from overriding written terms.',
          isCorrect: true,
          explanation:
            'Correct! That is why Jeanell teaches students to always demand that every verbal promise be added in writing before signing.',
        },
        {
          id: 'opt_2',
          text: 'The student wins, because verbal promises are always stronger than typed ink.',
          isCorrect: false,
          explanation: 'Incorrect. Written integration clauses explicitly defeat oral statements.',
        },
        {
          id: 'opt_3',
          text: 'Neither wins; the computer must be donated to charity.',
          isCorrect: false,
          explanation: 'Incorrect. The written contract controls the legal rights.',
        },
      ],
    },
    reward: {
      statDelta: { resilience: 10, financialAcumen: 10 },
      legalStars: 15,
      cashHonorarium: 125,
    },
  },

  // =========================================================================
  // COURSE 200: Elements of a Binding Contract
  // =========================================================================
  {
    code: '200',
    title: 'Course 200: The 5 Pillars of a Legally Binding Contract',
    subtitle: 'Offer, Acceptance, Consideration, Capacity & Lawful Objective',
    tier: 'middle_binding',
    gradeLevelBadge: 'Middle School',
    prerequisite: 'Course 100-103 Elementary Series',
    statutoryBasis: 'Michigan Common Law of Contracts · Restatement (Second) of Contracts § 1',
    overview:
      'Students enter secondary legal literacy by examining the 5 mandatory pillars that separate a casual conversation from an enforceable legal contract: (1) Mutual Assent / Offer & Acceptance, (2) Lawful Consideration (bargained-for exchange), (3) Legal Capacity of Parties, (4) Lawful Objective, and (5) Compliance with the Statute of Frauds where required.',
    keyCompetencies: [
      'Dissecting "Consideration": The peppercorn principle and bargained-for exchange',
      'Statute of Frauds (MCL 566.132): Contracts that MUST be in writing (real estate, debts of another, over 1 year)',
      'Unilateral vs Bilateral contracts',
      'Breach of contract remedies: Specific Performance vs Compensatory Damages',
    ],
    sampleDocument: {
      documentId: 'doc_200_commercial_serv',
      documentType: 'binding_contract',
      title: 'Commercial Independent Contractor Services Agreement',
      subtitle: 'Complete 5-Pillar Professional Services Contract',
      governingLaw: 'State of Michigan Commercial Jurisprudence',
      parties: {
        partyA: 'Client Organization',
        partyB: 'Student Service Provider',
        roleA: 'Retainer Client',
        roleB: 'Contractor',
      },
      notaryRequired: false,
      officialFilingAuthority: 'Michigan 36th District Court Civil Docket',
      clauses: [
        {
          id: 'c200_1',
          sectionNumber: 'Section 2.01',
          title: 'Consideration and Schedule of Compensation',
          content:
            'In consideration of the Drone Cadastral Mapping Services performed, Client shall pay Contractor $1,500.00 via direct electronic funds transfer within fifteen (15) days of receipt of milestone deliverables.',
          plainEnglishExplanation: 'Consideration is the money or value given in exchange for the services.',
        },
        {
          id: 'c200_2',
          sectionNumber: 'Section 10.01',
          title: 'Statute of Frauds Affirmation',
          content:
            'This Agreement spans a term of eighteen (18) months and is executed in writing pursuant to MCL 566.132(1)(a).',
          plainEnglishExplanation: 'Any contract that takes longer than 1 year to complete MUST be in writing to be enforceable in court.',
        },
      ],
    },
    interactiveChallenge: {
      prompt:
        'Uncle Robert tells you: "Because you are such a wonderful niece, I promise to give you $5,000 for your 18th birthday." Later, he changes his mind. Why can\'t you successfully sue him for breach of contract?',
      options: [
        {
          id: 'opt_1',
          text: 'Because it was a gratuitous gift promise lacking Consideration (you gave nothing of legal value in return), making it unenforceable under contract law.',
          isCorrect: true,
          explanation:
            'Correct! Contracts require Consideration—a bargained-for exchange. A promise to give a gift is not a contract (unless promissory estoppel applies).',
        },
        {
          id: 'opt_2',
          text: 'Because uncles are immune from lawsuits in Michigan.',
          isCorrect: false,
          explanation: 'Incorrect. Family members can enter binding contracts if consideration is present.',
        },
        {
          id: 'opt_3',
          text: 'Because $5,000 is too much money for a contract.',
          isCorrect: false,
          explanation: 'Incorrect. Contract law places no arbitrary cap on monetary value.',
        },
      ],
    },
    reward: {
      statDelta: { resilience: 10, steamMastery: 10, financialAcumen: 15 },
      legalStars: 20,
      cashHonorarium: 150,
    },
  },

  // =========================================================================
  // COURSE 201: Fine Print Reading & Restrictive Covenants
  // =========================================================================
  {
    code: '201',
    title: 'Course 201: Dissecting the Fine Print & Restrictive Covenants',
    subtitle: 'Mandatory Arbitration, Indemnity Clauses, Exculpatory Waivers & Acceleration',
    tier: 'middle_binding',
    gradeLevelBadge: 'Middle-High School',
    prerequisite: 'Course 200: Elements of a Binding Contract',
    statutoryBasis: 'Federal Arbitration Act (9 U.S.C. § 1) · Michigan Consumer Protection Act (MCL 445.901)',
    overview:
      'Most predatory agreements bury dangerous clauses in 6-point light-gray font. Students learn how to spot and neutralize: (1) Mandatory Binding Arbitration (surrendering the right to a jury trial), (2) Exculpatory Clauses (waiving liability for gross negligence), (3) Broad Indemnification ("you pay the other company\'s lawyers"), and (4) Acceleration clauses in debt contracts.',
    keyCompetencies: [
      'Scanning contracts for hidden "FINE PRINT TRAPS"',
      'Understanding Mandatory Arbitration and Class Action Waivers',
      'The danger of signing a Personal Guarantee or Broad Indemnity',
      'Negotiating redlines: Striking out clauses with a pen and initialing margin changes',
    ],
    sampleDocument: {
      documentId: 'doc_201_fineprint_sample',
      documentType: 'binding_contract',
      title: 'Commercial Equipment Lease & Software Licensing Covenant',
      subtitle: 'Audit Sample for Fine-Print Redline Exercise',
      governingLaw: 'Delaware Chancery Law (Foreign Jurisdiction Clause)',
      parties: {
        partyA: 'MegaCorp Tech Leasing LLC',
        partyB: 'Student Entrepreneur',
        roleA: 'Lessor',
        roleB: 'Lessee',
      },
      notaryRequired: false,
      officialFilingAuthority: 'American Arbitration Association Commercial Panel',
      clauses: [
        {
          id: 'c201_1',
          sectionNumber: 'Section 14.02',
          title: 'Mandatory Binding Arbitration & Jury Waiver',
          content:
            'Lessee hereby irrevocably waives any right to trial by jury in any court of competent jurisdiction and agrees that any dispute shall be resolved solely through individual binding arbitration administered in Wilmington, Delaware, with Lessee bearing all upfront filing fees ($3,500 non-refundable).',
          plainEnglishExplanation:
            'If this company cheats you or sells you broken equipment, you cannot take them to your local Detroit court. You must pay $3,500 and travel to Delaware!',
          isFinePrintTrap: true,
          trapWarning: 'Extreme Trap: Surrenders local 7th Amendment constitutional jury trial rights.',
          negotiationRemedy: 'Cross out Delaware and change venue to "36th District Court or Wayne County Circuit Court, Michigan".',
        },
        {
          id: 'c201_2',
          sectionNumber: 'Section 16.05',
          title: 'Unilateral Indemnification',
          content:
            'Lessee agrees to defend, indemnify, and hold harmless Lessor from any claims, damages, liabilities, and attorney fees arising from the use of the equipment, even if caused by Lessor\'s own negligence.',
          plainEnglishExplanation: 'If the company builds a defective machine that injures someone, you have to pay the company\'s legal bills!',
          isFinePrintTrap: true,
          trapWarning: 'Broad indemnity protects negligent corporations at your expense.',
          negotiationRemedy: 'Delete "even if caused by Lessor\'s own negligence" and add "except for Lessor\'s gross negligence or willful misconduct".',
        },
      ],
    },
    interactiveChallenge: {
      prompt:
        'You are signing an apartment lease or equipment rental contract. You spot an "Acceleration Clause" in tiny print. What does an acceleration clause do if you miss one payment?',
      options: [
        {
          id: 'opt_1',
          text: 'It immediately demands the FULL balance of all remaining months of the entire lease immediately, all at once.',
          isCorrect: true,
          explanation:
            'Correct! Acceleration clauses make future payments instantly due. You must negotiate a grace period and written notice before acceleration can trigger.',
        },
        {
          id: 'opt_2',
          text: 'It speeds up your internet connection as a reward.',
          isCorrect: false,
          explanation: 'Incorrect. Acceleration in legal terms refers to speeding up debt maturation.',
        },
        {
          id: 'opt_3',
          text: 'It automatically dissolves the contract with no money owed.',
          isCorrect: false,
          explanation: 'Incorrect. It creates an immediate, massive financial liability.',
        },
      ],
    },
    reward: {
      statDelta: { resilience: 15, financialAcumen: 20 },
      legalStars: 25,
      cashHonorarium: 175,
    },
  },

  // =========================================================================
  // COURSE 202: Notary Public & Official Attestation
  // =========================================================================
  {
    code: '202',
    title: 'Course 202: Notary Public, Jurat vs Acknowledgment & Attestation',
    subtitle: 'Michigan Notary Public Act, Official Seals, Oaths & Government Verification',
    tier: 'middle_binding',
    gradeLevelBadge: 'High School',
    prerequisite: 'Course 201: Fine Print Reading',
    statutoryBasis: 'Michigan Notary Public Act (MCL 55.261 - 55.315 / Public Act 238 of 2003)',
    overview:
      'A Notary Public is an appointed public officer who acts as an impartial witness to the signing of important documents. Students master the two fundamental types of notarizations: (1) An **Acknowledgment** (where a signer acknowledges that they executed the document voluntarily for its stated purpose), and (2) A **Jurat** (where the signer swears or affirms an oath under penalty of perjury that the facts stated in the document are true). Students learn ID inspection, the notary journal, and the legal weight of the official notary stamp.',
    keyCompetencies: [
      'Distinguishing between an Acknowledgment (voluntary signature) and a Jurat (sworn oath of truth)',
      'Acceptable Government ID credentials under MCL 55.285 (Driver License, Passport, Military ID)',
      'The Notary Seal block: County of Commission, Acting County, and Expiration Date',
      'Understanding perjury penalties: A Jurat carries criminal perjury consequences if false',
    ],
    sampleDocument: {
      documentId: 'doc_202_jurat_sample',
      documentType: 'notarized_agreement',
      title: 'Affidavit of Fact & Ownership Attestation with Statutory Jurat',
      subtitle: 'Formal Sworn Instrument Executed Pursuant to Michigan Notary Public Act',
      governingLaw: 'Michigan Compiled Laws § 55.287',
      parties: {
        partyA: 'Affiant (Sworn Student / Business Owner)',
        partyB: 'Jeanell Land (Commissioned Notary Public, Wayne County)',
        roleA: 'Affiant / Declarant',
        roleB: 'State of Michigan Notary Public',
      },
      notaryRequired: true,
      officialFilingAuthority: 'State of Michigan Department of State / County Clerk',
      notaryData: {
        state: 'Michigan',
        county: 'Wayne',
        juratOrAcknowledgment: 'Jurat',
        signatoryIdentifiedBy: 'Michigan Real ID Driver License',
        notaryPublicName: 'Jeanell Land',
        commissionExpirationDate: 'October 14, 2029',
        actingInCounty: 'Wayne',
        notarySealText: 'JEANELL LAND · NOTARY PUBLIC · STATE OF MICHIGAN · COUNTY OF WAYNE',
      },
      clauses: [
        {
          id: 'c202_1',
          sectionNumber: 'Affidavit Body',
          title: 'Sworn Statement of Commercial Ownership',
          content:
            'I, the undersigned Affiant, being first duly sworn, depose and state under penalty of perjury that I am the sole and lawful owner of the proprietary S.T.E.A.R. Safe Biometric Sentinel Patent Applications and all related trade fixtures located in Wayne County, Michigan.',
          plainEnglishExplanation: 'You are swearing under oath that this information is 100% true. Lying here is a felony (perjury).',
        },
      ],
    },
    interactiveChallenge: {
      prompt:
        'You are executing a real estate deed or loan document. The document has words: "Subscribed and sworn to before me this 15th day of October..." Which type of notarization is this, and what MUST the notary administer?',
      options: [
        {
          id: 'opt_1',
          text: 'It is a JURAT; the notary must require the signer to take an oath or solemn affirmation ("Do you swear or affirm under penalty of perjury...?") and watch them sign.',
          isCorrect: true,
          explanation:
            'Correct! "Subscribed and sworn to" indicates a JURAT. The signer must sign in front of the notary and swear an oath of truthfulness.',
        },
        {
          id: 'opt_2',
          text: 'It is a simple acknowledgment; the signer can sign beforehand and just wave at the notary.',
          isCorrect: false,
          explanation: 'Incorrect. An acknowledgment uses words like "acknowledged before me". Sworn statements require a Jurat.',
        },
        {
          id: 'opt_3',
          text: 'It is an anonymous post-it note with no legal effect.',
          isCorrect: false,
          explanation: 'Incorrect. It is a formal statutory notarization under MCL 55.287.',
        },
      ],
    },
    reward: {
      statDelta: { resilience: 15, financialAcumen: 25 },
      legalStars: 30,
      cashHonorarium: 200,
    },
  },

  // =========================================================================
  // COURSE 203: Execution, Counterparts & Legal Finality
  // =========================================================================
  {
    code: '203',
    title: 'Course 203: Execution, Counterparts & Binding Legal Finality',
    subtitle: 'Electronic Signatures (ESIGN / UETA), Delivery and Mutual Binding',
    tier: 'middle_binding',
    gradeLevelBadge: 'High School',
    prerequisite: 'Course 202: Notary Public & Attestation',
    statutoryBasis: 'Uniform Electronic Transactions Act (MCL 450.831 et seq.) · Federal ESIGN Act (15 U.S.C. § 7001)',
    overview:
      'Signing a contract is only half of the execution equation; the contract is not legally binding until it is DELIVERED. Students learn the mechanics of execution in counterparts (parties signing in different cities or states), electronic signature validity under Michigan UETA and federal ESIGN, and the legal rule of irrevocable finality once both parties have exchanged signed, delivered copies.',
    keyCompetencies: [
      'Understanding execution in counterparts: each signed copy equals one original',
      'Legal validity of electronic signatures under MCL 450.837',
      'The "Delivery Rule": A signed contract in your desk drawer is not binding until delivered to the other party',
      'Audit trails, IP timestamp verification, and digital certificate seals',
    ],
    sampleDocument: {
      documentId: 'doc_203_counterpart_doc',
      documentType: 'binding_contract',
      title: 'Aerospace Joint Development Agreement in Counterparts',
      subtitle: 'Multi-Jurisdiction Commercial Execution Agreement',
      governingLaw: 'Michigan Uniform Electronic Transactions Act (MCL 450.831)',
      parties: {
        partyA: 'Detroit Aerospace Labs Inc. (Detroit, MI)',
        partyB: 'Huntsville Propulsion Partners (Huntsville, AL)',
        roleA: 'Primary Developer',
        roleB: 'Co-Developer',
      },
      notaryRequired: false,
      officialFilingAuthority: 'United States Patent & Trademark Office (USPTO)',
      clauses: [
        {
          id: 'c203_1',
          sectionNumber: 'Section 12.01',
          title: 'Execution in Counterparts & Electronic Transmission',
          content:
            'This Agreement may be executed in two or more counterparts, each of which shall be deemed an original, but all of which together shall constitute one and the same instrument. Delivery of an executed counterpart by electronic transmission shall be equally effective as delivery of a manually executed original.',
          plainEnglishExplanation: 'You can sign your copy in Detroit, they can sign in Alabama, and when you email the copies, it is 100% legal and binding.',
        },
      ],
    },
    interactiveChallenge: {
      prompt:
        'You sign a contract agreeing to purchase $10,000 in machine tooling. You sign it with your pen, but you keep it inside your private notebook and do not send or hand it to the seller. Does the seller have an enforceable contract against you?',
      options: [
        {
          id: 'opt_1',
          text: 'No, because the contract was never DELIVERED. Delivery of the executed instrument to the other party is essential to complete contract execution.',
          isCorrect: true,
          explanation:
            'Correct! A signed document remains revocable until communicated or delivered to the other party or their authorized agent.',
        },
        {
          id: 'opt_2',
          text: 'Yes, because once ink touches paper anywhere in the world, the government binds you.',
          isCorrect: false,
          explanation: 'Incorrect. Delivery is a required legal element of contract execution.',
        },
        {
          id: 'opt_3',
          text: 'Yes, but only if you signed on a Tuesday.',
          isCorrect: false,
          explanation: 'Incorrect. Days of the week do not govern contract delivery rules.',
        },
      ],
    },
    reward: {
      statDelta: { resilience: 15, steamMastery: 15, financialAcumen: 25 },
      legalStars: 30,
      cashHonorarium: 225,
    },
  },

  // =========================================================================
  // COURSE 300: Real Estate Deeds & Title Execution
  // =========================================================================
  {
    code: '300',
    title: 'Course 300: Real Estate Deed Signing, Conveyance & Title Closing',
    subtitle: 'Warranty Deeds, Quitclaim Deeds, Legal Metes & Bounds, and Wayne County Recording',
    tier: 'graduate_deeds_nonprofit',
    gradeLevelBadge: 'Graduate / Professional Track',
    prerequisite: 'Course 200-203 Secondary Series',
    statutoryBasis: 'Michigan Land Title Standards · MCL 565.151 (Warranty Deeds) & MCL 565.152 (Quitclaim Deeds)',
    overview:
      'Real estate is the bedrock of generational wealth. Course 300 trains graduates in the precise legal mechanics of property conveyance. Students study Warranty Deeds (where grantor warrants quiet title against all encumbrances) versus Quitclaim Deeds (conveying only whatever interest grantor holds without warranties), Land Contracts (equitable title vs legal title), Metes & Bounds legal descriptions, notarized acknowledgments, and recording with the Wayne County Register of Deeds.',
    keyCompetencies: [
      'Mastering Warranty Deeds (MCL 565.151) vs Quitclaim Deeds (MCL 565.152)',
      'Deciphering Metes and Bounds & Platted Subdivision Legal Descriptions (Liber/Page)',
      'Executing Deeds before a Notary Public with accurate marital status & tax parcel IDs',
      'The recording process at the County Register of Deeds to defeat competing claims under race-notice statutes',
    ],
    sampleDocument: {
      documentId: 'doc_300_warranty_deed',
      documentType: 'real_estate_deed',
      title: 'State of Michigan Statutory Warranty Deed',
      subtitle: 'Conveyance of Fee Simple Real Estate in Wayne County, Michigan',
      governingLaw: 'Michigan Compiled Laws § 565.151',
      parties: {
        partyA: 'Grantor (Seller / Conveyor)',
        partyB: 'Grantee (Buyer / Community Haven)',
        roleA: 'Grantor',
        roleB: 'Grantee',
      },
      notaryRequired: true,
      officialFilingAuthority: 'Wayne County Register of Deeds (Detroit, MI)',
      notaryData: {
        state: 'Michigan',
        county: 'Wayne',
        juratOrAcknowledgment: 'Acknowledgment',
        signatoryIdentifiedBy: 'Michigan Real ID Driver License',
        notaryPublicName: 'Jeanell Land',
        commissionExpirationDate: 'October 14, 2029',
        actingInCounty: 'Wayne',
        notarySealText: 'JEANELL LAND · NOTARY PUBLIC · STATE OF MICHIGAN · COUNTY OF WAYNE',
      },
      clauses: [
        {
          id: 'c300_1',
          sectionNumber: 'Granting Clause',
          title: 'Conveyance and Warranty',
          content:
            'Grantor conveys and warrants to Grantee, whose address is in Detroit, Michigan, the following described premises situated in the City of Detroit, County of Wayne, State of Michigan: Lot 42, B.E. Taylor\'s Southlawn Subdivision No. 2, as recorded in Liber 48, Page 12 of Plats, Wayne County Records. Tax Parcel ID: 22-048291. For the full consideration of Seventy-Five Thousand Dollars ($75,000.00).',
          plainEnglishExplanation: 'This transfers full, clean ownership of the Detroit property with a legal warranty that title is clear.',
        },
        {
          id: 'c300_2',
          sectionNumber: 'Covenants of Title',
          title: 'Statutory Covenants (Seisin & Quiet Enjoyment)',
          content:
            'Grantor covenants that Grantor is seized of the premises in fee simple, has full right to convey the same, that the premises are free from all encumbrances except easements of record, and that Grantor will warrant and defend the same against all lawful claims whatsoever.',
          plainEnglishExplanation: 'The seller guarantees they actually own the property and will defend your ownership in court if an old owner shows up.',
        },
      ],
    },
    interactiveChallenge: {
      prompt:
        'What is the vital difference between a Michigan Warranty Deed (MCL 565.151) and a Quitclaim Deed (MCL 565.152) when acquiring property in Detroit?',
      options: [
        {
          id: 'opt_1',
          text: 'A Warranty Deed guarantees that title is clear of liens and previous ownership defects; a Quitclaim Deed makes NO warranties and only transfers whatever interest the grantor might have (even if zero).',
          isCorrect: true,
          explanation:
            'Correct! Investors and homebuyers must always understand this. Quitclaim deeds provide zero warranty against back taxes or competing mortgages.',
        },
        {
          id: 'opt_2',
          text: 'A Warranty Deed is only for mobile homes; Quitclaim is for commercial buildings.',
          isCorrect: false,
          explanation: 'Incorrect. Both deeds apply to all types of real property in Michigan.',
        },
        {
          id: 'opt_3',
          text: 'Quitclaim deeds automatically wipe away property taxes.',
          isCorrect: false,
          explanation: 'Incorrect. Property taxes run with the land and are never wiped out by a quitclaim deed.',
        },
      ],
    },
    reward: {
      statDelta: { resilience: 20, financialAcumen: 30, communityLegacy: 25 },
      legalStars: 40,
      cashHonorarium: 350,
    },
  },

  // =========================================================================
  // COURSE 310: Business Registration & 501(c)(3) Nonprofit Filings
  // =========================================================================
  {
    code: '310',
    title: 'Course 310: Registered Agents, Business Entities & 501(c)(3) Filings (1023-EZ, 1023, 990)',
    subtitle: 'LARA Michigan Entities, Resident Agent Agreements, IRS Form 1023-EZ, Form 1023 & Form 990 Annual Returns',
    tier: 'graduate_deeds_nonprofit',
    gradeLevelBadge: 'Master / Graduate Capstone',
    prerequisite: 'Course 300: Real Estate Deeds & Conveyance',
    statutoryBasis: 'Internal Revenue Code § 501(c)(3) · Treasury Reg. § 1.501(c)(3)-1 · Michigan Nonprofit Corporation Act (PA 162 of 1982)',
    overview:
      'The pinnacle course of Jeanell Land\'s legal curriculum. Graduates learn the complete institutional architecture of building sovereign, compliant organizations. Modules cover: (1) **Michigan LARA Registered Agent Agreements** (statutory office, service of process), (2) **Articles of Incorporation** for Michigan Non-Profits (LARA ID 802536743), (3) **IRS Form 1023-EZ** (Streamlined 501(c)(3) Application for budgets <$50K and assets <$250K), (4) **IRS Form 1023 Standard** (28-page comprehensive exemption application with 3-year projected financial statements, narrative of exempt purpose, conflict of interest policy, and charitable dissolution clause), and (5) **IRS Form 990 / 990-EZ / 990-N e-Postcard** annual information returns to preserve tax exemption under IRC § 6033.',
    keyCompetencies: [
      'Drafting Michigan LARA Registered Agent Acceptance Agreements and maintaining resident agent status',
      'Filing Michigan Non-Profit Articles of Incorporation with mandatory IRC § 501(c)(3) dissolution clause',
      'Mastering IRS Form 1023-EZ: Eligibility worksheet criteria, User Fee ($275), and streamlined attestations',
      'Executing standard IRS Form 1023: Narrative of activities, 3-year budgets, public charity qualification under § 509(a)(2)',
      'Preparing IRS Form 990 / 990-EZ / 990-N annual filings to avoid automatic 3-year revocation under IRC § 6033(j)',
    ],
    sampleDocument: {
      documentId: 'doc_310_nonprofit_1023',
      documentType: 'form_1023_ez_nonprofit',
      title: 'IRS Form 1023-EZ / Form 1023 Exemption Application & LARA Registered Agent Docket',
      subtitle: 'Federal Tax Exemption Recognition Application Under IRC § 501(c)(3)',
      governingLaw: 'Internal Revenue Code 26 U.S.C. § 501(c)(3) · Michigan PA 162 of 1982',
      parties: {
        partyA: 'One Stop Rehabilitation Center (Applicant 501(c)(3))',
        partyB: 'Internal Revenue Service (IRS Exempt Organizations Division)',
        roleA: 'Applicant Non-Profit Entity',
        roleB: 'Federal Tax Authority',
      },
      notaryRequired: true,
      officialFilingAuthority: 'IRS Exempt Organizations Determinations (Cincinnati, OH) & Michigan LARA (Lansing, MI)',
      notaryData: {
        state: 'Michigan',
        county: 'Wayne',
        juratOrAcknowledgment: 'Acknowledgment',
        signatoryIdentifiedBy: 'Michigan Real ID Driver License',
        notaryPublicName: 'Jeanell Land',
        commissionExpirationDate: 'October 14, 2029',
        actingInCounty: 'Wayne',
        notarySealText: 'JEANELL LAND · NOTARY PUBLIC · STATE OF MICHIGAN · COUNTY OF WAYNE',
      },
      clauses: [
        {
          id: 'c310_1',
          sectionNumber: 'Part III - Organizing Documents',
          title: 'Mandatory IRC § 501(c)(3) Dissolution & Charitable Purpose Clause',
          content:
            'Said organization is organized exclusively for charitable, religious, educational, and scientific purposes under Section 501(c)(3) of the Internal Revenue Code. Upon dissolution of the organization, assets shall be distributed for one or more exempt purposes within the meaning of Section 501(c)(3), or shall be distributed to the federal government, or to a state or local government, for a public purpose.',
          plainEnglishExplanation:
            'The IRS strictly requires this clause! It guarantees that if the non-profit ever closes, its property and money go to another charity, never to private pockets.',
        },
        {
          id: 'c310_2',
          sectionNumber: 'Part IV - Annual Reporting',
          title: 'IRS Form 990 Information Return Covenant',
          content:
            'The Organization covenants to file Form 990, Form 990-EZ, or Form 990-N annually by the 15th day of the 5th month following the close of its tax year. Failure to file for three consecutive years results in automatic statutory revocation of exempt status pursuant to IRC § 6033(j).',
          plainEnglishExplanation:
            'If a non-profit forgets to file Form 990 for 3 years in a row, the IRS automatically terminates its 501(c)(3) tax exemption. Filing Form 990 maintains your federal good standing.',
        },
        {
          id: 'c310_3',
          sectionNumber: 'Part V - Registered Agent',
          title: 'LARA Michigan Resident Agent Appointment',
          content:
            'Jeanell Land is appointed Resident Agent for One Stop Rehabilitation Center, with registered office located in Detroit, Michigan, authorized to receive all legal service of process and state correspondence.',
          plainEnglishExplanation:
            'Every Michigan corporation must have an official Registered Agent with a real address to receive lawsuits and government notices.',
        },
      ],
    },
    interactiveChallenge: {
      prompt:
        'An organization is applying for 501(c)(3) status using IRS Form 1023-EZ. What are the key financial thresholds required to qualify for the streamlined Form 1023-EZ instead of the 28-page standard Form 1023?',
      options: [
        {
          id: 'opt_1',
          text: 'Annual gross receipts must be projected at $50,000 or less in each of the next 3 years, and total assets must not exceed $250,000.',
          isCorrect: true,
          explanation:
            'Correct! Form 1023-EZ eligibility strictly requires annual gross receipts ≤ $50,000 and total assets ≤ $250,000. Organizations exceeding these caps must file standard Form 1023.',
        },
        {
          id: 'opt_2',
          text: 'The organization must have at least 1,000 paid employees and own an airport.',
          isCorrect: false,
          explanation: 'Incorrect. Form 1023-EZ is specifically designed for small grassroots charities.',
        },
        {
          id: 'opt_3',
          text: 'There are no financial requirements; anyone can file Form 1023-EZ for any business.',
          isCorrect: false,
          explanation: 'Incorrect. Commercial entities cannot file Form 1023-EZ, and strict financial tests apply.',
        },
      ],
    },
    reward: {
      statDelta: { resilience: 25, steamMastery: 25, financialAcumen: 35, communityLegacy: 40 },
      legalStars: 50,
      cashHonorarium: 500,
    },
  },

  // =========================================================================
  // COURSE 400: Consumer Law, Debt Validation & Credit Defense
  // =========================================================================
  {
    code: '400',
    title: 'Course 400: Consumer Law, Debt Validation & Credit Bureau Sovereignty',
    subtitle: 'FDCPA 15 U.S.C. § 1692, FCRA Mandatory 30-Day Disputes, TILA Right of Rescission & Michigan MCPA',
    tier: 'later_learning_jurisprudence',
    gradeLevelBadge: 'Later Learning / Consumer Rights',
    prerequisite: 'Course 310 or Upper Secondary / Adult Night School Entry',
    statutoryBasis: 'Fair Debt Collection Practices Act (15 U.S.C. § 1692) · Fair Credit Reporting Act (15 U.S.C. § 1681) · Truth in Lending Act (15 U.S.C. § 1601) · Michigan Consumer Protection Act (MCL 445.901)',
    overview:
      'In later learning, scholars master consumer sovereignty and statutory rights under federal and Michigan law. This course empowers citizens to dismantle predatory collector harassment, demand formal 30-day debt validation (chain of assignment, original ledger, sworn proof of standing), enforce credit bureau accuracy within 30 days under FCRA § 611, and exercise the 3-day right of rescission under TILA for home-secured loans.',
    keyCompetencies: [
      'Drafting an ironclad 30-Day FDCPA Debt Validation Notice (§ 809(b)) requiring chain of title and account ledger verification',
      'Invoking the FCRA § 611 Mandatory 30-Day Credit Bureau Investigation rule and demanding deletion of unverified derogatory marks',
      'Enforcing statutory damages: $1,000 per FDCPA violation plus actual damages and attorney fees against abusive debt buyers',
      'Stopping third-party collector calls at workplace and outside 8:00 AM – 9:00 PM local time under 15 U.S.C. § 1692c',
    ],
    sampleDocument: {
      documentId: 'doc_400_consumer_val',
      documentType: 'consumer_debt_validation_notice',
      title: 'Formal Notice of Dispute & Request for Debt Validation (FDCPA § 809)',
      subtitle: 'Statutory Demand for Verification, Accounting Ledger & Cease of Unlawful Collection',
      governingLaw: '15 U.S.C. § 1692g · Michigan Consumer Protection Act MCL 445.901',
      parties: {
        partyA: 'Consumer Citizen (Affiant / Disputant)',
        partyB: 'Apex Debt Acquisitions LLC (Third-Party Debt Collector)',
        roleA: 'Consumer',
        roleB: 'Debt Collector',
      },
      notaryRequired: false,
      officialFilingAuthority: 'Federal Trade Commission (FTC) & Michigan Attorney General Consumer Protection Division',
      clauses: [
        {
          id: 'c400_1',
          sectionNumber: 'Section 1.01',
          title: 'Timely Written Dispute & Demand for Validation (FDCPA § 809(b))',
          content:
            'I am in receipt of your communication dated October 12, 2026. Pursuant to the Fair Debt Collection Practices Act, 15 U.S.C. § 1692g(b), I hereby timely dispute the validity of this alleged debt, in whole and in part. You are strictly required to cease all collection efforts until your office mails to me verified proof of the debt, including the original signed credit contract, a complete line-item accounting of all interest, and the unbroken chain of assignment establishing your legal standing.',
          plainEnglishExplanation:
            'When you send this within 30 days, the debt collector must freeze all collection calls, letters, and credit reporting until they send proof with the original contract.',
        },
        {
          id: 'c400_2',
          sectionNumber: 'Section 2.01',
          title: 'Restriction of Communication & Workplace Prohibition',
          content:
            'Pursuant to 15 U.S.C. § 1692c(a)(3), you are officially advised that my employer prohibits the receipt of personal communications at my place of employment. Furthermore, telephone communications to any mobile or residential telephone number are inconvenient; all future communications must be conducted solely via United States Certified Mail.',
          plainEnglishExplanation:
            'This prohibits collectors from calling your job or blowing up your phone. Any violation triggers $1,000 in statutory damages under federal law.',
          isFinePrintTrap: false,
        },
      ],
    },
    interactiveChallenge: {
      prompt:
        'A collection agency calls your cell phone at 9:30 PM, threatens to garnish your wages by tomorrow afternoon, and refuses to send a written notice in the mail. Under the Fair Debt Collection Practices Act (15 U.S.C. § 1692c, § 1692e), how many federal statutory violations occurred?',
      options: [
        {
          id: 'opt_1',
          text: 'Multiple violations: Calling after 9:00 PM is illegal; threatening immediate wage garnishment without a court judgment is false/misleading; and failing to send written validation within 5 days violates § 809.',
          isCorrect: true,
          explanation:
            'Correct! FDCPA prohibits calls between 9 PM and 8 AM, prohibits false threats of legal action (garnishment requires a court lawsuit and judgment first), and mandates written notice within 5 days.',
        },
        {
          id: 'opt_2',
          text: 'Zero violations; collectors are legally permitted to garnish wages over the phone anytime they choose.',
          isCorrect: false,
          explanation: 'Incorrect. Wage garnishment requires due process, court filing, service of process, and a final judicial judgment.',
        },
        {
          id: 'opt_3',
          text: 'Only one violation, and only if the collector did not speak in English.',
          isCorrect: false,
          explanation: 'Incorrect. FDCPA applies strictly regardless of language and protects all consumers.',
        },
      ],
    },
    reward: {
      statDelta: { resilience: 20, financialAcumen: 30, communityLegacy: 25 },
      legalStars: 35,
      cashHonorarium: 300,
    },
  },

  // =========================================================================
  // COURSE 410: Constitutional Law, Civil Rights & Due Process Defense
  // =========================================================================
  {
    code: '410',
    title: 'Course 410: Constitutional Law, Procedural Due Process & Civil Rights',
    subtitle: '5th & 14th Amendment Due Process, 4th Amendment Search/Seizure Protections & Article I Contract Clause',
    tier: 'later_learning_jurisprudence',
    gradeLevelBadge: 'Later Learning / Constitutional Law',
    prerequisite: 'Course 400: Consumer Law',
    statutoryBasis: 'U.S. Constitution Amendments IV, V, XIV · 42 U.S.C. § 1983 · Article I Section 10 (Contract Clause) · Michigan Constitution Art. I §§ 10, 11, 17',
    overview:
      'Constitutional law guarantees fundamental protections against arbitrary state and institutional overreach. Students examine: (1) Procedural Due Process (notice and meaningful opportunity to be heard before deprivation of life, liberty, or property), (2) The 4th Amendment\'s warrant requirement and protection against warrantless digital and physical surveillance, (3) The Contract Clause (Article I § 10, preventing states from impairing private contractual obligations), and (4) Equal Protection under the 14th Amendment.',
    keyCompetencies: [
      'Enforcing the Procedural Due Process guarantee: Adequate Written Notice + Neutral Judicial Magistrate before any property deprivation',
      'Invoking the 4th Amendment: Probable cause, specific warrant particularity, and protection of personal effects and digital privacy',
      'Understanding the 5th Amendment Privilege: Protection against compelled self-incrimination in regulatory and civil interrogatories',
      'The Contract Clause (U.S. Const. Art. I § 10): Constitutional limits on state laws that retroactively impair private covenants',
    ],
    sampleDocument: {
      documentId: 'doc_410_const_petition',
      documentType: 'constitutional_due_process_petition',
      title: 'Petition for Redress of Grievance & Affirmative Invocation of Due Process',
      subtitle: 'Formal Demand for Evidentiary Hearing Pursuant to the 5th & 14th Amendments',
      governingLaw: 'United States Constitution Amendments V & XIV · Michigan Constitution Art. I § 17',
      parties: {
        partyA: 'Citizen Scholar (Petitioner)',
        partyB: 'Municipal Administrative Licensing Board (Respondent Agency)',
        roleA: 'Aggrieved Citizen',
        roleB: 'State Actor / Administrative Body',
      },
      notaryRequired: true,
      officialFilingAuthority: 'United States District Court for the Eastern District of Michigan / Wayne County Circuit Court',
      notaryData: {
        state: 'Michigan',
        county: 'Wayne',
        juratOrAcknowledgment: 'Jurat',
        signatoryIdentifiedBy: 'Michigan Real ID Driver License',
        notaryPublicName: 'Jeanell Land',
        commissionExpirationDate: 'October 14, 2029',
        actingInCounty: 'Wayne',
        notarySealText: 'JEANELL LAND · NOTARY PUBLIC · STATE OF MICHIGAN · COUNTY OF WAYNE',
      },
      clauses: [
        {
          id: 'c410_1',
          sectionNumber: 'Article I',
          title: 'Invocation of Procedural Due Process (Notice & Hearing)',
          content:
            'Petitioner hereby affirmatively invokes the fundamental constitutional rights guaranteed by the Due Process Clauses of the Fifth and Fourteenth Amendments to the United States Constitution and Article I, Section 17 of the Michigan Constitution. No administrative agency or state actor may seize property, revoke licenses, or impose civil penalties without providing adequate written notice stating specific grounds and a timely evidentiary hearing before an impartial tribunal.',
          plainEnglishExplanation:
            'The government cannot take your property, tow your car, revoke your business license, or seize your funds without giving you formal written notice and a fair hearing before an unbiased judge.',
        },
        {
          id: 'c410_2',
          sectionNumber: 'Article II',
          title: 'Fourth Amendment Right to Privacy & Papers',
          content:
            'Petitioner asserts the right to be secure in their person, houses, papers, and electronic communications against unreasonable searches and seizures under the Fourth Amendment. Any administrative subpoena or digital inspection lacking particularity and probable cause is constitutionally void ab initio.',
          plainEnglishExplanation:
            'Government inspectors cannot search your private business records or computers without a specific court warrant backed by probable cause.',
        },
      ],
    },
    interactiveChallenge: {
      prompt:
        'A municipal inspector issues an administrative order immediately revoking an entrepreneur\'s commercial property permit and seizing equipment without any advance written notice, citing an alleged noise complaint. Under procedural due process (Mathews v. Eldridge, 424 U.S. 319), what constitutional violation took place?',
      options: [
        {
          id: 'opt_1',
          text: 'A 14th Amendment Procedural Due Process violation occurred because the citizen was deprived of a protected property interest without notice and a pre-deprivation opportunity to be heard.',
          isCorrect: true,
          explanation:
            'Correct! Due process mandates notice reasonably calculated to inform and an opportunity to present objections before an impartial decision-maker.',
        },
        {
          id: 'opt_2',
          text: 'No violation occurred because municipal inspectors have supreme power above the Constitution.',
          isCorrect: false,
          explanation: 'Incorrect. All government officers are subject to the supremacy of the U.S. Constitution.',
        },
        {
          id: 'opt_3',
          text: 'It is only a violation if the inspector was off duty.',
          isCorrect: false,
          explanation: 'Incorrect. Constitutional due process applies strictly to state actions taken under color of law.',
        },
      ],
    },
    reward: {
      statDelta: { resilience: 25, financialAcumen: 25, communityLegacy: 35 },
      legalStars: 40,
      cashHonorarium: 350,
    },
  },

  // =========================================================================
  // COURSE 420: CFPB Rules, Banking Compliance & Regulation F/Z
  // =========================================================================
  {
    code: '420',
    title: 'Course 420: CFPB Rules, Banking Compliance & Regulation F/Z Directives',
    subtitle: '12 CFR Part 1006 (7-in-7 Debt Communications), TRID Closing Disclosures & RESPA Qualified Written Requests',
    tier: 'later_learning_jurisprudence',
    gradeLevelBadge: 'Later Learning / Financial Regulatory',
    prerequisite: 'Course 410: Constitutional Law',
    statutoryBasis: 'Dodd-Frank Wall Street Reform Act (12 U.S.C. § 5481) · CFPB Regulation F (12 CFR Part 1006) · CFPB Regulation Z (12 CFR Part 1026) · RESPA (12 CFR Part 1024)',
    overview:
      'The Consumer Financial Protection Bureau (CFPB) establishes strict nationwide rules governing lenders, banks, loan servicers, and collection agencies. Students master CFPB Regulation F, including the landmark "7-in-7 Rule" (prohibiting collectors from calling more than 7 times in 7 consecutive days regarding a particular debt, or within 7 days of having an actual phone conversation), mandatory electronic communication opt-outs, Loan Estimate and Closing Disclosure 3-day delivery rules under TRID (TILA-RESPA Integrated Disclosure), and filing official CFPB administrative enforcement complaints that compel financial institutions to respond within 15 days.',
    keyCompetencies: [
      'Enforcing CFPB Regulation F\'s "7-in-7" call frequency limits (12 CFR § 1006.14(b)) and electronic communication opt-outs',
      'Mastering TRID Closing Disclosures (CD) and Loan Estimates (LE) to detect illegal hidden lender fees in real estate financing',
      'Serving Qualified Written Requests (QWR) to mortgage servicers under RESPA § 6 (12 CFR § 1024.35) for error resolution',
      'Filing formal complaints on the federal CFPB Portal to obtain binding agency oversight, restitution, and corrected records',
    ],
    sampleDocument: {
      documentId: 'doc_420_cfpb_complaint',
      documentType: 'cfpb_regulation_f_complaint',
      title: 'CFPB Formal Administrative Complaint & Cease-and-Desist Notice',
      subtitle: 'Enforcement Action for Regulation F Call Frequency Violations & RESPA Disclosure Defaults',
      governingLaw: '12 CFR Part 1006 (CFPB Regulation F) · 12 U.S.C. § 5536 (Unfair, Deceptive, Abusive Acts or Practices - UDAAP)',
      parties: {
        partyA: 'Borrower / Consumer Complainant',
        partyB: 'Midwest Financial Servicing Corporation',
        roleA: 'Consumer Complainant',
        roleB: 'Covered Entity / Financial Servicer',
      },
      notaryRequired: false,
      officialFilingAuthority: 'Consumer Financial Protection Bureau (CFPB Enforcement Division, Washington, DC)',
      clauses: [
        {
          id: 'c420_1',
          sectionNumber: 'Section 1',
          title: 'Violation of CFPB Regulation F "7-in-7" Call Frequency Cap',
          content:
            'Complainant documents that Respondent placed nine (9) telephone calls within a consecutive four-day period (October 14 through October 18, 2026) regarding account #4829-10. Pursuant to 12 CFR § 1006.14(b)(2)(i), placing more than seven (7) calls within seven (7) consecutive days creates a statutory presumption of intent to harass, oppress, or abuse the consumer.',
          plainEnglishExplanation:
            'Under CFPB rules, collectors are strictly capped at 7 phone calls within any 7-day period. Calling 9 times in 4 days is an open-and-shut regulatory violation.',
        },
        {
          id: 'c420_2',
          sectionNumber: 'Section 2',
          title: 'RESPA Qualified Written Request & Mandatory 30-Day Audit',
          content:
            'Pursuant to RESPA, 12 U.S.C. § 2605(e) and 12 CFR § 1024.35, this notice constitutes a Qualified Written Request (QWR). Servicer must acknowledge receipt within five (5) business days and complete a full investigation, correcting escrow calculation errors or providing a detailed written explanation within thirty (30) business days.',
          plainEnglishExplanation:
            'If a mortgage servicer overcharges your escrow or mishandles payments, a QWR forces them by federal law to respond within 5 days and fix the error within 30 days.',
        },
      ],
    },
    interactiveChallenge: {
      prompt:
        'A mortgage lender gives you a Closing Disclosure document on Thursday afternoon and demands that you sign the final mortgage at the closing table on Friday morning. Under CFPB TRID rules (Regulation Z, 12 CFR § 1026.19(f)), is this closing legally permitted?',
      options: [
        {
          id: 'opt_1',
          text: 'No. TRID rules mandate that consumers must receive the Closing Disclosure at least THREE (3) full business days before consummation of the mortgage, allowing time to review terms and interest rates.',
          isCorrect: true,
          explanation:
            'Correct! The CFPB 3-day rule prevents predatory lenders from springing unexpected fees or rate hikes on consumers at the closing table.',
        },
        {
          id: 'opt_2',
          text: 'Yes, because lenders are legally entitled to force closings within 12 hours.',
          isCorrect: false,
          explanation: 'Incorrect. Federal law prohibits rushed closings under TRID.',
        },
        {
          id: 'opt_3',
          text: 'Only if the interest rate is above 20%.',
          isCorrect: false,
          explanation: 'Incorrect. The 3-day review rule applies to all covered residential mortgage closings.',
        },
      ],
    },
    reward: {
      statDelta: { resilience: 25, financialAcumen: 35, steamMastery: 20 },
      legalStars: 45,
      cashHonorarium: 400,
    },
  },

  // =========================================================================
  // COURSE 430: Business Law, Corporate Shield & UCC Article 2 Sales
  // =========================================================================
  {
    code: '430',
    title: 'Course 430: Business Law, Corporate Veil Integrity & UCC Commercial Sales',
    subtitle: 'Michigan LLC Operating Agreements (MCL 450.4101), Alter-Ego Defense & UCC § 2-314 Implied Warranties',
    tier: 'later_learning_jurisprudence',
    gradeLevelBadge: 'Later Learning / Business Law',
    prerequisite: 'Course 420: CFPB Rules',
    statutoryBasis: 'Michigan Limited Liability Company Act (MCL 450.4101 et seq.) · UCC Article 2 (MCL 440.2101 et seq.) · Michigan Business Corporation Act',
    overview:
      'Business Law equips entrepreneurs, executives, and community leaders with the legal shield of entity sovereignty. Students learn how to draft an LLC Operating Agreement with distinct capital accounts, voting rights, and transfer restrictions; how to maintain strict corporate separateness to prevent "piercing the corporate veil" (commingling funds, alter-ego doctrine); UCC Article 2 commercial sales rules (implied warranty of merchantability, implied warranty of fitness for a particular purpose, and rejection of non-conforming commercial goods within a reasonable time); and fiduciary duties of care and loyalty.',
    keyCompetencies: [
      'Drafting Member-Managed and Manager-Managed LLC Operating Agreements under Michigan MCL 450.4401',
      'Preventing Corporate Veil Piercing: Defeating alter-ego claims by eliminating fund commingling and preserving capitalization',
      'Enforcing UCC Article 2 Implied Warranties: Merchantability (MCL 440.2314) and Fitness for Particular Purpose (MCL 440.2315)',
      'Fiduciary Duties: Navigating the Business Judgment Rule, Duty of Loyalty (no usurpation of opportunities), and Duty of Care',
    ],
    sampleDocument: {
      documentId: 'doc_430_llc_operating',
      documentType: 'llc_operating_agreement_business_law',
      title: 'State of Michigan Limited Liability Company Operating Agreement',
      subtitle: 'Multi-Member Operating Covenant with Corporate Veil & Fiduciary Duty Shielding',
      governingLaw: 'Michigan Compiled Laws § 450.4101 et seq. (Michigan LLC Act)',
      parties: {
        partyA: 'Managing Member (S.T.E.A.R. Safe Holdings LLC)',
        partyB: 'Capital Member / Director',
        roleA: 'Manager-Member',
        roleB: 'Contributing Member',
      },
      notaryRequired: true,
      officialFilingAuthority: 'State of Michigan Department of Licensing and Regulatory Affairs (LARA Corporations Division)',
      notaryData: {
        state: 'Michigan',
        county: 'Wayne',
        juratOrAcknowledgment: 'Acknowledgment',
        signatoryIdentifiedBy: 'Michigan Real ID Driver License',
        notaryPublicName: 'Jeanell Land',
        commissionExpirationDate: 'October 14, 2029',
        actingInCounty: 'Wayne',
        notarySealText: 'JEANELL LAND · NOTARY PUBLIC · STATE OF MICHIGAN · COUNTY OF WAYNE',
      },
      clauses: [
        {
          id: 'c430_1',
          sectionNumber: 'Section 3.01',
          title: 'Limited Liability & Preservation of the Corporate Veil',
          content:
            'Except as otherwise required by the Michigan LLC Act, no Member or Manager shall be personally liable for any debt, obligation, or liability of the Company, whether arising in contract, tort, or otherwise. The Company shall maintain a dedicated commercial depository account, and at no time shall Company capital be commingled with the personal funds of any Member.',
          plainEnglishExplanation:
            'This clause and practice protects your personal house, car, and savings account from business lawsuits, so long as you never mix business and personal money in the same bank account.',
        },
        {
          id: 'c430_2',
          sectionNumber: 'Section 7.02',
          title: 'Fiduciary Duty of Loyalty & Corporate Opportunity',
          content:
            'Members owe a fiduciary duty of loyalty to the Company. No Member shall engage in any transaction that constitutes an appropriation of a commercial or real estate opportunity belonging to the Company without prior unanimous written consent of all Members.',
          plainEnglishExplanation:
            'Partners in an LLC cannot steal business deals for their own private gain behind the backs of other company members.',
        },
      ],
    },
    interactiveChallenge: {
      prompt:
        'A restaurant owner incorporates an LLC but deposits customer checks into their personal savings account, pays personal home groceries from the business credit card, and never keeps corporate minutes. A customer slips and sues. Can the plaintiff "pierce the corporate veil"?',
      options: [
        {
          id: 'opt_1',
          text: 'Yes. Under the alter-ego doctrine, severe commingling of personal and business funds defeats the LLC shield, allowing courts to hold the owner personally liable.',
          isCorrect: true,
          explanation:
            'Correct! Corporate separateness requires separate bank accounts, arms-length accounting, and adequate capitalization. Commingling funds destroys limited liability.',
        },
        {
          id: 'opt_2',
          text: 'No, having an LLC certificate makes an owner permanently immune to all personal liability forever.',
          isCorrect: false,
          explanation: 'Incorrect. The corporate veil is an equitable shield that courts strip away when treated as a personal alter-ego.',
        },
        {
          id: 'opt_3',
          text: 'Only if the restaurant served pizza instead of pasta.',
          isCorrect: false,
          explanation: 'Incorrect. Corporate veil law applies universally across all commercial enterprises.',
        },
      ],
    },
    reward: {
      statDelta: { resilience: 30, financialAcumen: 35, communityLegacy: 35 },
      legalStars: 45,
      cashHonorarium: 450,
    },
  },

  // =========================================================================
  // COURSE 440: Advanced Contract Law, Unconscionability & Breach Remedies
  // =========================================================================
  {
    code: '440',
    title: 'Course 440: Advanced Contract Law, Unconscionability Doctrine & Redline Defense',
    subtitle: 'Procedural vs Substantive Unconscionability, Liquidated Damages vs Penalties & Restatement § 241 Material Breach',
    tier: 'later_learning_jurisprudence',
    gradeLevelBadge: 'Later Learning / Master Contract Law Capstone',
    prerequisite: 'Courses 100 through 430 Comprehensive Legal Literacy Series',
    statutoryBasis: 'Restatement (Second) of Contracts §§ 208, 241, 356 · UCC § 2-302 (Unconscionable Contract or Clause) · Michigan Contract Jurisprudence',
    overview:
      'The capstone course in contract law prepares scholars to audit and litigate complex commercial agreements. Students dissect: (1) The Unconscionability Doctrine (combining Procedural Unconscionability—gross inequality of bargaining power, contracts of adhesion, surprise fine print—and Substantive Unconscionability—terms so overwhelmingly one-sided that they shock the judicial conscience), (2) The difference between an enforceable Liquidated Damages clause and an illegal punitive penalty under contract law, (3) Material Breach vs Minor/Partial Breach and the right to suspend performance, (4) Specific Performance for unique assets (real estate and patents), and (5) The art of professional contract redlining to strike oppressive clauses before signing.',
    keyCompetencies: [
      'Striking down adhesive contracts via the twin prongs of Procedural and Substantive Unconscionability under UCC § 2-302',
      'Distinguishing valid Liquidated Damages (reasonable forecast of actual harm) from unenforceable punitive penalties',
      'Analyzing Material Breach under Restatement § 241: Right to withhold performance vs duty to mitigate damages',
      'Executing professional contract redlines with margin initials, deletion strikethroughs, and bilateral protective addenda',
    ],
    sampleDocument: {
      documentId: 'doc_440_unconscionable_defense',
      documentType: 'advanced_contract_unconscionability_defense',
      title: 'Master Commercial Contract Defense Addendum & Redline Affirmation',
      subtitle: 'Bilateral Covenant Striking Unconscionable Penalties & Preserving Judicial Remedies',
      governingLaw: 'Restatement (Second) of Contracts § 208 · UCC § 2-302 · Michigan Common Law of Contracts',
      parties: {
        partyA: 'Commercial Vendor / Licensor',
        partyB: 'Sovereign Scholar / Purchaser',
        roleA: 'Primary Obligor',
        roleB: 'Auditing Signatory',
      },
      notaryRequired: true,
      officialFilingAuthority: 'State of Michigan 3rd Judicial Circuit Court (Wayne County) Civil Division',
      notaryData: {
        state: 'Michigan',
        county: 'Wayne',
        juratOrAcknowledgment: 'Acknowledgment',
        signatoryIdentifiedBy: 'Michigan Real ID Driver License',
        notaryPublicName: 'Jeanell Land',
        commissionExpirationDate: 'October 14, 2029',
        actingInCounty: 'Wayne',
        notarySealText: 'JEANELL LAND · NOTARY PUBLIC · STATE OF MICHIGAN · COUNTY OF WAYNE',
      },
      clauses: [
        {
          id: 'c440_1',
          sectionNumber: 'Section 1.01',
          title: 'Severability of Substantively Unconscionable Clauses (UCC § 2-302)',
          content:
            'If any court finds any clause of this Agreement to have been unconscionable at the time it was made, the court may refuse to enforce the contract, enforce the remainder of the contract without the unconscionable clause, or limit the application of any unconscionable clause to avoid an unconscionable result. Unilateral attorney fee clauses, excessive liquidated damage penalties, and exculpatory gross negligence waivers are hereby struck and rendered void.',
          plainEnglishExplanation:
            'Judges have the power to cross out unfair, oppressive clauses while keeping the good parts of the agreement alive.',
        },
        {
          id: 'c440_2',
          sectionNumber: 'Section 2.01',
          title: 'Prohibition of Punitive Damages in Contract (Restatement § 356)',
          content:
            'Damages for breach by either party may be liquidated in the agreement but only at an amount that is reasonable in the light of the anticipated or actual harm caused by the breach and the difficulties of proof of loss. A term fixing unreasonably large liquidated damages is void on grounds of public policy as a penalty.',
          plainEnglishExplanation:
            'A contract cannot charge a $20,000 penalty for a $100 late payment. Contract damages can only compensate for real, proven losses.',
          isFinePrintTrap: true,
          trapWarning: 'Predatory contracts often disguise illegal penalties as "liquidated damages"!',
          negotiationRemedy: 'Demand that liquidated damages equal actual documented commercial expenses.',
        },
      ],
    },
    interactiveChallenge: {
      prompt:
        'A merchant presents a take-it-or-leave-it contract with a clause stating: "If buyer pays 1 day late on a $500 invoice, buyer must pay a $15,000 liquidated damages fee." Under Restatement (Second) of Contracts § 356 and UCC § 2-302, is this clause enforceable?',
      options: [
        {
          id: 'opt_1',
          text: 'No. The clause is an unenforceable penalty because $15,000 is grossly disproportionate to any conceivable harm from a 1-day delay on a $500 balance, making it void as a matter of public policy.',
          isCorrect: true,
          explanation:
            'Correct! Contract law strictly forbids punitive damages disguised as liquidated damages. It is substantively unconscionable.',
        },
        {
          id: 'opt_2',
          text: 'Yes, because whatever you sign is 100% enforceable no matter how absurd or predatory it is.',
          isCorrect: false,
          explanation: 'Incorrect. The unconscionability doctrine exists precisely to strike down terms that shock the conscience of the court.',
        },
        {
          id: 'opt_3',
          text: 'Yes, but only if the $15,000 is paid in cash.',
          isCorrect: false,
          explanation: 'Incorrect. Payment method does not cure an illegal contract penalty.',
        },
      ],
    },
    reward: {
      statDelta: { resilience: 35, steamMastery: 35, financialAcumen: 40, communityLegacy: 45 },
      legalStars: 60,
      cashHonorarium: 600,
    },
  },
];
