import { PlayerStats } from '../types/game';

export type WorldRegionId =
  | 'north_america'
  | 'africa'
  | 'europe'
  | 'asia_pacific'
  | 'latin_america'
  | 'middle_east';

export type RegionalSubjectId =
  | 'history'
  | 'world_history'
  | 'mathematics'
  | 'languages'
  | 'art'
  | 'social_studies'
  | 'typing';

export interface RegionMetadata {
  id: WorldRegionId;
  name: string;
  shortLabel: string;
  tagline: string;
  coordinates: string;
  capitalOrHub: string;
  accentColor: string;
  culturalMotto: string;
  overview: string;
}

export interface RegionalLessonModule {
  id: string;
  regionId: WorldRegionId;
  subject: RegionalSubjectId;
  subjectLabel: string;
  title: string;
  subtitle: string;
  historicalEra: string;
  readTimeMinutes: number;
  readingPassage: {
    paragraphs: string[];
    keyVocabulary: { term: string; definition: string }[];
    primarySourceQuote: string;
    primarySourceAttribution: string;
  };
  typingLesson: {
    title: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    targetWpm: number;
    practiceText: string;
    coachingTip: string;
  };
  interactiveQuiz: {
    question: string;
    options: {
      id: string;
      text: string;
      isCorrect: boolean;
      explanation: string;
    }[];
  };
  reward: {
    statDelta: Partial<PlayerStats>;
    cashBonus: number;
  };
}

export const WORLD_REGIONS: RegionMetadata[] = [
  {
    id: 'north_america',
    name: 'North America · Detroit, Great Lakes & Heartland',
    shortLabel: 'North America',
    tagline: 'Arsenal of Democracy, Underground Railroad, Motown & Aerospace Innovation',
    coordinates: '42.3314° N, 83.0458° W',
    capitalOrHub: 'Detroit, Michigan & Great Lakes Basin',
    accentColor: 'cyan',
    culturalMotto: 'Speramus Meliora; Resurget Cineribus (We Hope for Better Things; It Shall Rise from the Ashes)',
    overview:
      'Explore the real-life history of Detroit as "Code Name Midnight" on the Underground Railroad, the industrial assembly revolution, Anishinaabe Three Fires Confederacy mathematics and trade routes, Harlem & Motown artistic movements, and constitutional civil rights.',
  },
  {
    id: 'africa',
    name: 'Africa · Nile Valley, Timbuktu & Cradle of Science',
    shortLabel: 'Africa',
    tagline: 'Ishango Bone Mathematics, Sankore University Manuscripts & Great Zimbabwe Architecture',
    coordinates: '16.7666° N, 3.0026° W',
    capitalOrHub: 'Timbuktu, Cairo & Great Rift Valley',
    accentColor: 'amber',
    culturalMotto: 'Ubuntu — I Am Because We Are',
    overview:
      'Journey through humanity’s earliest mathematical artifacts, the astronomical manuscripts of Timbuktu, fractal geometry in African architecture and textiles, Swahili trade networks, and classical kingdoms.',
  },
  {
    id: 'europe',
    name: 'Europe & Mediterranean · Classical & Scientific Revolutions',
    shortLabel: 'Europe',
    tagline: 'Euclidean Geometry, Renaissance Perspective, Printing Press & Aerodynamics',
    coordinates: '43.7696° N, 11.2558° E',
    capitalOrHub: 'Athens, Florence & London',
    accentColor: 'indigo',
    culturalMotto: 'Sapere Aude — Dare to Know',
    overview:
      'Examine the evolution of democratic assemblies, Euclidean proofs and Bernoulli fluid dynamics, Romance and Germanic language roots, Renaissance chiaroscuro art, and the Magna Carta’s influence on modern due process.',
  },
  {
    id: 'asia_pacific',
    name: 'Asia-Pacific · Silk Road, Maritime Navigation & Computing',
    shortLabel: 'Asia-Pacific',
    tagline: 'Decimal Place Value, Silk Road Commerce, Woodblock Printing & Celestial Navigation',
    coordinates: '34.3416° N, 108.9398° E',
    capitalOrHub: 'Xi’an, Kyoto, Delhi & Polynesia',
    accentColor: 'emerald',
    culturalMotto: 'Harmony, Precision & Continuous Mastery',
    overview:
      'Discover how the Silk Road connected continents, how zero and decimal place-value transformed global mathematics, how Polynesian wayfinders navigated thousands of miles by wave refraction, and East Asian calligraphy and ink art.',
  },
  {
    id: 'latin_america',
    name: 'Latin America & Caribbean · Mesoamerica & Andes',
    shortLabel: 'Latin America',
    tagline: 'Mayan Base-20 Astronomy, Incan Quipu Knotted Ledgers & Muralist Art',
    coordinates: '19.4326° N, 99.1332° W',
    capitalOrHub: 'Tenochtitlan, Cusco & Havana',
    accentColor: 'rose',
    culturalMotto: 'In Lak’ech Ala K’in — You Are My Other Me',
    overview:
      'Investigate the floating chinampa agricultural engineering of Tenochtitlan, Mayan vigesimal (base-20) calendars more accurate than contemporary European charts, Incan quipu data recording, and vibrant muralist storytelling.',
  },
  {
    id: 'middle_east',
    name: 'Middle East & Mesopotamia · Fertile Crescent & Algebra',
    shortLabel: 'Middle East',
    tagline: 'Code of Hammurabi, Al-Khwarizmi’s Algebra, Astrolabes & Geometric Mosaic Art',
    coordinates: '33.3152° N, 44.3661° E',
    capitalOrHub: 'Baghdad, Babylon & Damascus',
    accentColor: 'purple',
    culturalMotto: 'The Ink of the Scholar is More Sacred than the Blood of the Martyr',
    overview:
      'Trace the birth of written law in Mesopotamia’s Code of Hammurabi, the invention of Algebra (Al-Jabr) and algorithms at Baghdad’s House of Wisdom, celestial astrolabe engineering, and infinite tessellation art.',
  },
];

export const REGIONAL_SUBJECT_TABS: {
  id: RegionalSubjectId;
  label: string;
  shortLabel: string;
  description: string;
}[] = [
  {
    id: 'history',
    label: 'Real-Life Regional History',
    shortLabel: 'Regional History',
    description: 'Primary-source historical narratives shaped by the people and landmarks of your selected region.',
  },
  {
    id: 'world_history',
    label: 'World History Connections',
    shortLabel: 'World History',
    description: 'How this region connected with global trade, treaties, migrations, and scientific breakthroughs.',
  },
  {
    id: 'mathematics',
    label: 'Mathematics & Applied Logic',
    shortLabel: 'Mathematics',
    description: 'Real mathematical breakthroughs, geometry, accounting, and engineering formulas from this region.',
  },
  {
    id: 'languages',
    label: 'Languages & Etymology',
    shortLabel: 'Languages',
    description: 'Regional vocabulary, pronunciation, writing systems, and linguistic roots.',
  },
  {
    id: 'art',
    label: 'Art, Architecture & Design',
    shortLabel: 'Art & Design',
    description: 'Visual arts, structural geometry, music, and cultural aesthetics.',
  },
  {
    id: 'social_studies',
    label: 'Social Studies, Civics & Geography',
    shortLabel: 'Social Studies',
    description: 'Civic governance, legal codes, economic systems, and geographic stewardship.',
  },
  {
    id: 'typing',
    label: 'Interactive Typing Studio',
    shortLabel: 'Typing Lessons',
    description: 'Touch-typing mastery with live WPM, accuracy tracking, and regional historical passages.',
  },
];

export const REGIONAL_LESSONS_DATA: RegionalLessonModule[] = [
  // =========================================================================
  // 1. NORTH AMERICA (Detroit, Great Lakes & Heartland)
  // =========================================================================
  {
    id: 'na_history',
    regionId: 'north_america',
    subject: 'history',
    subjectLabel: 'Real-Life Regional History',
    title: 'Detroit: "Code Name Midnight" & The Underground Railroad',
    subtitle: 'How the Detroit River Became the Final Crossing to Freedom & Industrial Resilience',
    historicalEra: '1830s–1960s · Michigan & Great Lakes History',
    readTimeMinutes: 4,
    readingPassage: {
      paragraphs: [
        'Before Detroit became known around the globe as the Motor City, abolitionists and freedom seekers knew it by a secret watchword: "Midnight." Situated directly across the narrow Detroit River from Windsor, Ontario, Detroit served as the critical final terminal on the Underground Railroad. Once freedom seekers crossed the water into Canada, they stood on soil where slavery had been abolished by the British Emancipation Act of 1833.',
        'At the heart of Detroit’s freedom network stood Second Baptist Church in Greektown, founded in 1836 by thirteen formerly enslaved citizens, alongside leaders such as George DeBaptiste and William Lambert. Operating under the veiled organization known as the "African-American Mysteries: The Order of the Men of Oppression," these civic pioneers coordinated safe houses, nocturnal boat crossings, and legal defense teams to protect families from bounty hunters.',
        'A century later, that same spirit of cooperative self-reliance powered Detroit’s industrial and aviation boom. During World War II, engineers and skilled tradespeople converted automotive plants into the "Arsenal of Democracy," producing B-24 Liberator bombers at Willow Run at the unprecedented rate of one aircraft every sixty-three minutes—proving that disciplined education, technical mastery, and community solidarity can transform world history.',
      ],
      keyVocabulary: [
        { term: 'Code Name Midnight', definition: 'The Underground Railroad code word for Detroit, signifying the final threshold before dawn (freedom in Canada).' },
        { term: 'Second Baptist Church (1836)', definition: 'Historic Detroit congregation that served as the operational headquarters for roughly 5,000 freedom seekers.' },
        { term: 'Arsenal of Democracy', definition: 'Detroit’s rapid industrial mobilization that engineered aircraft, engines, and defense systems.' },
      ],
      primarySourceQuote: 'We stood on the banks of the Detroit River knowing that across those dark waters lay liberty, dignity, and the right to sign our own names as free citizens.',
      primarySourceAttribution: ' William Lambert, Detroit Vigilance Committee Record (1858)',
    },
    typingLesson: {
      title: 'Typing Drill: Detroit Underground Railroad & Aviation Legacy',
      difficulty: 'Intermediate',
      targetWpm: 35,
      practiceText: 'Detroit was known as Code Name Midnight on the Underground Railroad. Across the Detroit River lay freedom and the right to build a sovereign life through education and skilled trades.',
      coachingTip: 'Keep your index fingers anchored on F and J. Maintain a steady rhythm on capital letters using the opposite Shift key.',
    },
    interactiveQuiz: {
      question: 'Why was Detroit given the secret code name "Midnight" by conductors on the Underground Railroad?',
      options: [
        {
          id: 'na_h_1',
          text: 'Because Detroit was the final stop right before "Dawn"—crossing the Detroit River into freedom in Canada.',
          isCorrect: true,
          explanation: 'Correct! In Underground Railroad cryptography, Detroit was "Midnight" and Windsor, Canada was "Dawn" or the North Star.',
        },
        {
          id: 'na_h_2',
          text: 'Because trains in Michigan only operated at 12:00 AM.',
          isCorrect: false,
          explanation: 'Incorrect. The "railroad" was a network of secret safe houses and river ferries, and "Midnight" was a symbolic code name.',
        },
        {
          id: 'na_h_3',
          text: 'Because the city had no streetlamps until 1920.',
          isCorrect: false,
          explanation: 'Incorrect. Detroit was actually one of the earliest American cities to adopt towering electric moonlight towers.',
        },
      ],
    },
    reward: {
      statDelta: { resilience: 15, steamMastery: 10, communityLegacy: 20 },
      cashBonus: 150,
    },
  },
  {
    id: 'na_world_history',
    regionId: 'north_america',
    subject: 'world_history',
    subjectLabel: 'World History Connections',
    title: 'The Great Lakes Fur & Copper Trade to Global Aviation Treaties',
    subtitle: 'How Indigenous Waterway Networks Shaped International Diplomacy & Chicago Convention Air Law',
    historicalEra: '1600s–1944 · Global Maritime & Aviation History',
    readTimeMinutes: 4,
    readingPassage: {
      paragraphs: [
        'Long before European ships entered the St. Lawrence Seaway, the Anishinaabe Confederacy—comprising the Ojibwe, Odawa, and Potawatomi nations (the Council of Three Fires)—engineered sophisticated birchbark canoe trade networks spanning from the Atlantic Ocean to the Mississippi River. Copper mined from Michigan’s Keweenaw Peninsula and Isle Royale was traded thousands of miles south into Mesoamerica and east to coastal confederacies.',
        'When French, British, and early American diplomats negotiated treaties in the 1700s and 1800s, they relied directly on the geographic portages and hydrographic charts established by Indigenous navigators. The strategic Strait of Detroit ("le détroit") connected Lake Erie to Lake Huron, making it the commercial keystone of the North American interior.',
        'In 1944, fifty-two nations gathered in the Midwest to sign the Convention on International Civil Aviation (the Chicago Convention), establishing the International Civil Aviation Organization (ICAO). Just as Great Lakes treaties standardized peaceful maritime passage, the Chicago Convention standardized global airworthiness certificates, flight callsigns, and airspace sovereignty.',
      ],
      keyVocabulary: [
        { term: 'Council of Three Fires', definition: 'The enduring alliance of the Ojibwe (Keepers of the Faith), Odawa (Keepers of Trade), and Potawatomi (Keepers of the Fire).' },
        { term: 'Le Détroit', definition: 'French for "The Strait," referring to the vital 32-mile river linking the upper and lower Great Lakes.' },
        { term: 'Chicago Convention (1944)', definition: 'Landmark international treaty establishing global rules for airspace, aircraft registration, and safety.' },
      ],
      primarySourceQuote: 'The waterways are the highways of nations; whoever stewards the strait stewards the peace of the continent.',
      primarySourceAttribution: 'Great Lakes Diplomatic Council Archives (1764)',
    },
    typingLesson: {
      title: 'Typing Drill: Council of Three Fires & Global Air Law',
      difficulty: 'Intermediate',
      targetWpm: 38,
      practiceText: 'The Council of Three Fires stewarded the Great Lakes trade routes for centuries. In 1944, fifty-two nations signed the Chicago Convention to govern international aviation safety.',
      coachingTip: 'Use your pinky finger cleanly for punctuation marks like hyphens and commas without lifting your wrists.',
    },
    interactiveQuiz: {
      question: 'What does the French name "le détroit" (the origin of the city name Detroit) literally mean in geography?',
      options: [
        {
          id: 'na_wh_1',
          text: '"The Strait" — referring to the strategic river channel connecting Lake St. Clair and the upper Great Lakes to Lake Erie.',
          isCorrect: true,
          explanation: 'Correct! Founded near the narrow river strait, "le détroit du Lac Érié" meant the Strait of Lake Erie.',
        },
        {
          id: 'na_wh_2',
          text: '"The Mountain Peak" — referring to high alpine elevation.',
          isCorrect: false,
          explanation: 'Incorrect. Detroit is situated on a flat glacial river plain.',
        },
        {
          id: 'na_wh_3',
          text: '"The Desert Oasis" — referring to arid sand dunes.',
          isCorrect: false,
          explanation: 'Incorrect. The Great Lakes hold 21% of the world’s surface fresh water.',
        },
      ],
    },
    reward: {
      statDelta: { steamMastery: 15, resilience: 15, communityLegacy: 15 },
      cashBonus: 150,
    },
  },
  {
    id: 'na_mathematics',
    regionId: 'north_america',
    subject: 'mathematics',
    subjectLabel: 'Mathematics & Applied Logic',
    title: 'Aerodynamic Lift Equations & Real Estate Amortization Math',
    subtitle: 'Calculating NACA Wing Lift in Wind Tunnels and Compound Equity in Detroit Housing',
    historicalEra: 'Modern Applied S.T.E.A.M. Mathematics',
    readTimeMinutes: 5,
    readingPassage: {
      paragraphs: [
        'Mathematics is the universal language that keeps airplanes in the sky and families securely housed on the ground. In aeronautical engineering, the Lift Equation—L = ½ × ρ × v² × S × CL—demonstrates a powerful mathematical truth: lift increases with the SQUARE of velocity (v²). When an aircraft doubles its airspeed from 100 knots to 200 knots, the aerodynamic lift generated over its wing quadruples!',
        'In community financial literacy, mathematics protects homebuyers from predatory loans. When evaluating a Detroit duplex or commercial rehab project, an investor calculates Net Operating Income (NOI) by subtracting annual operating expenses from gross rental revenue. Dividing the NOI by the property purchase price yields the Capitalization Rate (Cap Rate = NOI ÷ Price).',
        'By mastering both algebraic exponents (v²) in physics and percentage ratios in finance, scholars gain the analytical power to test wind tunnel prototypes by morning and audit real estate closing disclosures by afternoon.',
      ],
      keyVocabulary: [
        { term: 'Quadratic Scaling (v²)', definition: 'Doubling velocity multiplies kinetic energy and aerodynamic lift by a factor of four (2² = 4).' },
        { term: 'Net Operating Income (NOI)', definition: 'Gross property revenue minus operating expenses (taxes, insurance, maintenance) before mortgage debt service.' },
        { term: 'Capitalization Rate', definition: 'The ratio of annual Net Operating Income to property asset cost, expressed as a percentage.' },
      ],
      primarySourceQuote: 'Numbers do not flatter and they do not deceive; master the equation and you master the outcome.',
      primarySourceAttribution: 'Jeanell Land, The ABC’s of Financial Literacy Academy',
    },
    typingLesson: {
      title: 'Typing Drill: The Aerodynamic Lift & Cap Rate Formulas',
      difficulty: 'Advanced',
      targetWpm: 40,
      practiceText: 'When airspeed doubles, aerodynamic lift quadruples because velocity is squared in the lift equation. In real estate, Cap Rate equals Net Operating Income divided by Purchase Price.',
      coachingTip: 'Practice smooth transitions between standard words and capitalized technical terms like Cap Rate.',
    },
    interactiveQuiz: {
      question: 'According to the aerodynamic lift equation L = ½ ρ v² S CL, if a pilot triples (3x) the aircraft airspeed while keeping air density and wing angle constant, by what factor does lift increase?',
      options: [
        {
          id: 'na_m_1',
          text: 'Lift increases by a factor of 9 (because 3² = 9).',
          isCorrect: true,
          explanation: 'Spot on! Because velocity (v) is squared in the lift equation, tripling the speed multiplies lift by 3 × 3 = 9.',
        },
        {
          id: 'na_m_2',
          text: 'Lift increases by a factor of 3.',
          isCorrect: false,
          explanation: 'Remember the exponent: velocity is squared (v²), not linear.',
        },
        {
          id: 'na_m_3',
          text: 'Lift decreases by half.',
          isCorrect: false,
          explanation: 'Higher airspeed over an airfoil increases dynamic pressure and lift.',
        },
      ],
    },
    reward: {
      statDelta: { steamMastery: 25, financialAcumen: 20 },
      cashBonus: 200,
    },
  },
  {
    id: 'na_languages',
    regionId: 'north_america',
    subject: 'languages',
    subjectLabel: 'Languages & Etymology',
    title: 'Anishinaabemowin, Legal Latin & Aviation English Phonetics',
    subtitle: 'How Indigenous Place Names, Latin Legal Maxims, and ICAO Phonetics Coexist in Michigan',
    historicalEra: 'Linguistic Heritage & Communication',
    readTimeMinutes: 4,
    readingPassage: {
      paragraphs: [
        'Every time you speak the name "Michigan," you are speaking Anishinaabemowin (the Ojibwe language): "Mishi-gami" translates to "Great Water." Across the Great Lakes, language carries deep ecological and historical memory, from "Kalamazoo" (boiling pot river) to "Mackinac" (place of the great turtle).',
        'Meanwhile, in Michigan’s courtrooms and contract academies, scholars encounter Legal Latin phrases that have governed commercial law for two thousand years: "Consensus ad idem" (meeting of the minds), "Bona fide" (in good faith), and "Ab initio" (from the very beginning). Understanding these exact terms prevents a citizen from being intimidated by complex legal briefs.',
        'Finally, in aviation and S.T.E.A.R. Safe dispatch towers, pilots and engineers use the ICAO NATO Phonetic Alphabet—Alpha, Bravo, Charlie, Delta, Echo, Foxtrot—ensuring that critical coordinates and safety PINs are transmitted over radio channels with zero ambiguity.',
      ],
      keyVocabulary: [
        { term: 'Mishi-gami', definition: 'Anishinaabemowin word meaning "Great Water," the linguistic root of Michigan.' },
        { term: 'Consensus ad idem', definition: 'Latin legal phrase meaning "meeting of the minds," required to form a valid contract.' },
        { term: 'ICAO Phonetic Alphabet', definition: 'Standardized aviation spelling system (Alpha, Bravo, Charlie...) used globally by pilots.' },
      ],
      primarySourceQuote: 'To know the true name of a place is to respect its history; to know the language of the law is to protect your future.',
      primarySourceAttribution: 'Michigan Linguistic & Civic Heritage Archive',
    },
    typingLesson: {
      title: 'Typing Drill: Multilingual Mastery & ICAO Phonetics',
      difficulty: 'Beginner',
      targetWpm: 32,
      practiceText: 'Mishi-gami means Great Water in the Ojibwe language. In contract law, consensus ad idem means a true meeting of the minds between all signing parties.',
      coachingTip: 'Focus on accuracy over raw speed when typing unfamiliar Latin or Indigenous words.',
    },
    interactiveQuiz: {
      question: 'What is the meaning of the Anishinaabemowin word "Mishi-gami," from which the state name "Michigan" is derived?',
      options: [
        {
          id: 'na_l_1',
          text: '"Great Water" or "Large Lake."',
          isCorrect: true,
          explanation: 'Correct! "Mishi" (great/large) + "gami" (water/lake) honors the vast freshwater seas of the Great Lakes.',
        },
        {
          id: 'na_l_2',
          text: '"Iron Locomotive."',
          isCorrect: false,
          explanation: 'Incorrect. The name predates steam locomotives by many centuries.',
        },
        {
          id: 'na_l_3',
          text: '"Dry Canyon."',
          isCorrect: false,
          explanation: 'Incorrect. Michigan is surrounded by four of the five Great Lakes.',
        },
      ],
    },
    reward: {
      statDelta: { steamMastery: 15, kindnessPoints: 15, resilience: 10 },
      cashBonus: 150,
    },
  },
  {
    id: 'na_art',
    regionId: 'north_america',
    subject: 'art',
    subjectLabel: 'Art, Architecture & Design',
    title: 'Diego Rivera’s Detroit Industry Frescoes & Motown Acoustic Design',
    subtitle: 'How Public Murals, Art Deco Skyscrapers, and Hitsville U.S.A. Celebrated Working People',
    historicalEra: '1920s–1970s · American Visual & Musical Arts',
    readTimeMinutes: 4,
    readingPassage: {
      paragraphs: [
        'Walk into the central court of the Detroit Institute of Arts and you are surrounded by twenty-seven monumental fresco panels painted between 1932 and 1933 by Mexican master muralist Diego Rivera. Using the ancient Italian technique of "buon fresco"—painting earth pigments directly into wet lime plaster—Rivera immortalized the multiracial workforce of Detroit’s factories, linking industrial geology, aviation, medicine, and human labor into a single symphony of color.',
        'Outside in downtown Detroit, architects like Albert Kahn and Wirt Rowland designed soaring Art Deco masterpieces such as the Guardian Building—known as the "Cathedral of Finance"—adorning its vaulted ceilings with vibrant Pewabic pottery tiles and geometric motifs inspired by Indigenous basketry and Mayan stepped arches.',
        'At 2648 West Grand Boulevard ("Hitsville U.S.A."), Berry Gordy and the Funk Brothers engineered the Motown Sound by turning an everyday residential garage into Studio A, routing echo chambers into the attic and layering tambourines, upright bass, and gospel harmonies that united listeners across every continent.',
      ],
      keyVocabulary: [
        { term: 'Buon Fresco', definition: 'Mural technique of painting water-based pigments onto freshly laid wet lime plaster so the art chemically bonds into the wall.' },
        { term: 'Pewabic Pottery', definition: 'Historic Detroit ceramic studio founded in 1903 famous for iridescent glazes and architectural tilework.' },
        { term: 'Acoustic Resonance', definition: 'The amplification and warmth of sound waves reflecting within a custom-designed studio space.' },
      ],
      primarySourceQuote: 'The steel worker, the engineer, and the artist are builders of the same human temple.',
      primarySourceAttribution: 'Detroit Industry Mural Dedication Notes (1933)',
    },
    typingLesson: {
      title: 'Typing Drill: Art Deco Architecture & Studio A Harmonies',
      difficulty: 'Beginner',
      targetWpm: 30,
      practiceText: 'Public art and architecture belong to the entire community. From fresco murals painted in wet plaster to the acoustic warmth of Studio A, creativity uplifts every neighborhood.',
      coachingTip: 'Keep your shoulders relaxed and let your thumbs lightly tap the Spacebar between phrases.',
    },
    interactiveQuiz: {
      question: 'What makes the "buon fresco" painting technique used in the Detroit Industry Murals so durable over centuries?',
      options: [
        {
          id: 'na_a_1',
          text: 'Pigments are painted directly into wet lime plaster; as the plaster dries, a chemical reaction locks the pigment permanently inside the stone wall.',
          isCorrect: true,
          explanation: 'Correct! Carbonation turns the wet calcium hydroxide plaster into solid calcium carbonate limestone around the pigment.',
        },
        {
          id: 'na_a_2',
          text: 'The paintings are printed on paper and glued with washable school paste.',
          isCorrect: false,
          explanation: 'Incorrect. True fresco bonds directly into the wet masonry plaster.',
        },
        {
          id: 'na_a_3',
          text: 'They are repainted from scratch every Monday morning.',
          isCorrect: false,
          explanation: 'Incorrect. The 1933 frescoes remain original and permanent.',
        },
      ],
    },
    reward: {
      statDelta: { steamMastery: 15, communityLegacy: 20, kindnessPoints: 15 },
      cashBonus: 150,
    },
  },
  {
    id: 'na_social_studies',
    regionId: 'north_america',
    subject: 'social_studies',
    subjectLabel: 'Social Studies, Civics & Geography',
    title: 'The Northwest Ordinance, Public Education & Community Land Trusts',
    subtitle: 'How Civic Law Established Public Schools, Prohibited Slavery in Michigan, and Empowered Nonprofits',
    historicalEra: '1787–Present · Constitutional & Municipal Civics',
    readTimeMinutes: 4,
    readingPassage: {
      paragraphs: [
        'Article III of the Northwest Ordinance of 1787—which governed the territory that became Michigan, Ohio, Indiana, Illinois, and Wisconsin—declared a revolutionary civic principle: "Religion, morality, and knowledge, being necessary to good government and the happiness of mankind, schools and the means of education shall forever be encouraged." Every township was legally required to set aside Section 16 of its land survey specifically to fund public schooling.',
        'Furthermore, Article VI prohibited slavery throughout the Northwest Territory, laying the legal groundwork for Michigan’s staunch abolitionist constitution of 1835. Today, that civic tradition continues through Michigan Cyber Charter School laws (MCL 380.551) and 501(c)(3) community rehabilitation centers that guarantee lifelong learners from age 4 ½ to 90+ access to diplomas and technology.',
        'When citizens combine constitutional knowledge with local civic participation—attending city council hearings, recording warranty deeds at the County Register of Deeds, and stewarding 501(c)(3) land trusts—they transform neighborhoods from the inside out.',
      ],
      keyVocabulary: [
        { term: 'Section 16 School Lands', definition: 'Public land survey provision reserving one square mile in every township to support public education.' },
        { term: '501(c)(3) Public Charity', definition: 'Tax-exempt nonprofit organization dedicated exclusively to charitable, educational, or scientific community benefit.' },
        { term: 'Municipal Stewardship', definition: 'Active citizen participation in local zoning, property rehabilitation, and school governance.' },
      ],
      primarySourceQuote: 'Schools and the means of education shall forever be encouraged.',
      primarySourceAttribution: 'Northwest Ordinance, Article III (July 13, 1787)',
    },
    typingLesson: {
      title: 'Typing Drill: Civic Stewardship & Educational Rights',
      difficulty: 'Intermediate',
      targetWpm: 35,
      practiceText: 'Knowledge being necessary to good government and the happiness of humanity, schools and the means of education shall forever be encouraged in every community.',
      coachingTip: 'Maintain steady eye contact with the screen text rather than looking down at the physical keys.',
    },
    interactiveQuiz: {
      question: 'How did the historic Land Ordinance and Northwest Ordinance structurally fund public education across Michigan and the Great Lakes states?',
      options: [
        {
          id: 'na_ss_1',
          text: 'By legally reserving Section 16 of every surveyed 36-section township specifically to support public schools.',
          isCorrect: true,
          explanation: 'Correct! Section 16 in every township was dedicated by law to public education.',
        },
        {
          id: 'na_ss_2',
          text: 'By banning all books and libraries.',
          isCorrect: false,
          explanation: 'Incorrect. The ordinance explicitly mandated that education be forever encouraged.',
        },
        {
          id: 'na_ss_3',
          text: 'By requiring students to build their own desks out of gold.',
          isCorrect: false,
          explanation: 'Incorrect.',
        },
      ],
    },
    reward: {
      statDelta: { communityLegacy: 25, financialAcumen: 15, resilience: 15 },
      cashBonus: 175,
    },
  },

  // =========================================================================
  // 2. AFRICA (Nile Valley, Timbuktu & Cradle of Science)
  // =========================================================================
  {
    id: 'af_history',
    regionId: 'africa',
    subject: 'history',
    subjectLabel: 'Real-Life Regional History',
    title: 'The Libraries of Timbuktu & The University of Sankore',
    subtitle: 'How West African Scholars Preserved 700,000 Manuscripts on Astronomy, Law, and Medicine',
    historicalEra: '1300s–1600s · Mali & Songhai Golden Age',
    readTimeMinutes: 4,
    readingPassage: {
      paragraphs: [
        'At the crossroads where the Sahara Desert meets the curve of the Niger River in Mali, the city of Timbuktu flourished during the 14th through 16th centuries as one of the world’s premier centers of scholarship. At the University of Sankore, upward of 25,000 students—nearly a quarter of the city’s population—studied jurisprudence, astronomy, mathematics, medicine, and ethics.',
        'Books and handwritten manuscripts were the most prized commodities in Timbuktu’s markets, often commanding higher prices in gold dust than silk or horses. Families such as the Kati and Haidara lineages maintained private libraries housing hundreds of thousands of bound volumes written in calligraphic script, complete with marginalia debating contract fairness, planetary orbits, and surgical cataract procedures.',
        'When a scholar completed the rigorous curriculum at Sankore, they were awarded the "turban of wisdom" and a signed ijaza (academic license) bearing the handwritten signatures and chain of mentorship of their professors—a direct historical forerunner of modern university diplomas.',
      ],
      keyVocabulary: [
        { term: 'University of Sankore', definition: 'Medieval West African center of higher learning in Timbuktu accommodating 25,000 scholars.' },
        { term: 'Ijaza (Academic Credential)', definition: 'A signed, witnessed certification authorizing a graduate to teach a mastered discipline.' },
        { term: 'Timbuktu Manuscripts', definition: 'Hundreds of thousands of preserved scientific, legal, and historical treatises from West Africa.' },
      ],
      primarySourceQuote: 'Salt comes from the north, gold from the south, and silver from the country of the white men, but the word of God and the treasures of wisdom are only to be found in Timbuktu.',
      primarySourceAttribution: 'West African Proverb Recorded in the Tarikh al-Sudan (c. 1655)',
    },
    typingLesson: {
      title: 'Typing Drill: The Scholars of Timbuktu',
      difficulty: 'Intermediate',
      targetWpm: 35,
      practiceText: 'At the University of Sankore in Timbuktu, twenty-five thousand students studied astronomy, mathematics, contract law, and medicine, preserving hundreds of thousands of manuscripts.',
      coachingTip: 'Keep your wrists level and use smooth, even finger pressure across long words like "manuscripts" and "mathematics".',
    },
    interactiveQuiz: {
      question: 'What was the most prized and profitable trade commodity in the markets of 15th-century Timbuktu according to historical travelers like Leo Africanus?',
      options: [
        {
          id: 'af_h_1',
          text: 'Handwritten books and scientific/legal manuscripts, which sold for more gold than any other merchandise.',
          isCorrect: true,
          explanation: 'Correct! Historical records confirm that books and scholarly manuscripts were the most valuable trade goods in Timbuktu.',
        },
        {
          id: 'af_h_2',
          text: 'Plastic electronics.',
          isCorrect: false,
          explanation: 'Incorrect.',
        },
        {
          id: 'af_h_3',
          text: 'Snowshoes and ice sleds.',
          isCorrect: false,
          explanation: 'Incorrect. Timbuktu is located on the southern edge of the Sahara Desert.',
        },
      ],
    },
    reward: {
      statDelta: { steamMastery: 20, resilience: 20, communityLegacy: 15 },
      cashBonus: 175,
    },
  },
  {
    id: 'af_mathematics',
    regionId: 'africa',
    subject: 'mathematics',
    subjectLabel: 'Mathematics & Applied Logic',
    title: 'The Ishango Bone, Egyptian Fractions & Fractal Architecture',
    subtitle: 'Prime Numbers Carved 20,000 Years Ago and Self-Similar Geometry in African Design',
    historicalEra: '20,000 BCE–Present · Mathematical History',
    readTimeMinutes: 4,
    readingPassage: {
      paragraphs: [
        'Discovered near the headwaters of the Nile River in Central Africa, the Ishango Bone (dating back over 20,000 years) is one of humanity’s oldest known mathematical instruments. Carved into its surface are three columns of tallied notches showing doubling sequences (3 to 6, 4 to 8, 10 to 20) and a complete list of the prime numbers between 10 and 20: 11, 13, 17, and 19!',
        'Thousands of years later in the Nile Valley, scribes wrote the Rhind Mathematical Papyrus (c. 1550 BCE), demonstrating how engineers calculated the exact volume of a truncated pyramid (frustum) and used unit fractions to divide grain, land parcels, and architectural stone blocks with zero waste.',
        'Across West, Central, and Southern Africa, communities applied recursive fractal geometry—where a geometric pattern repeats itself at progressively smaller scales—to design resilient village layouts, Ba-ila enclosures, and intricate braided hairstyles, centuries before European mathematicians coined the word "fractal."',
      ],
      keyVocabulary: [
        { term: 'Ishango Bone', definition: '20,000-year-old bone tool from Central Africa featuring prime number sequences and base-12/base-10 tallies.' },
        { term: 'Prime Number', definition: 'Any whole number greater than 1 divisible only by 1 and itself (such as 11, 13, 17, 19).' },
        { term: 'Fractal Geometry', definition: 'Self-similar geometric patterns that repeat at every scale, from tiny braids to entire town blueprints.' },
      ],
      primarySourceQuote: 'Accurate reckoning for inquiring into things, and the knowledge of all things, mysteries and secrets.',
      primarySourceAttribution: 'Opening Title of the Rhind Mathematical Papyrus, Scribe Ahmes (c. 1550 BCE)',
    },
    typingLesson: {
      title: 'Typing Drill: Prime Numbers & Fractal Geometry',
      difficulty: 'Intermediate',
      targetWpm: 36,
      practiceText: 'The Ishango Bone displays prime numbers between ten and twenty: 11, 13, 17, and 19. Fractal geometry repeats self-similar patterns from micro scales to grand architecture.',
      coachingTip: 'Practice reaching the top number row (1, 2, 3, 7, 9, 0) without losing your home-row anchor.',
    },
    interactiveQuiz: {
      question: 'Which set of special numbers between 10 and 20 is carved into a column of the 20,000-year-old Ishango Bone?',
      options: [
        {
          id: 'af_m_1',
          text: 'The prime numbers: 11, 13, 17, and 19 (which add up to 60).',
          isCorrect: true,
          explanation: 'Correct! That column contains 11, 13, 17, and 19—every prime number between 10 and 20.',
        },
        {
          id: 'af_m_2',
          text: 'Only negative imaginary numbers.',
          isCorrect: false,
          explanation: 'Incorrect.',
        },
        {
          id: 'af_m_3',
          text: 'Barcodes for grocery stores.',
          isCorrect: false,
          explanation: 'Incorrect.',
        },
      ],
    },
    reward: {
      statDelta: { steamMastery: 25, financialAcumen: 15 },
      cashBonus: 200,
    },
  },
  {
    id: 'af_languages',
    regionId: 'africa',
    subject: 'languages',
    subjectLabel: 'Languages & Etymology',
    title: 'Kiswahili Trade Lingua Franca & Ge’ez Script',
    subtitle: 'How Swahili Connected the Indian Ocean Rim and Preserved Poetic Chronicles',
    historicalEra: 'Classical to Modern Linguistic Heritage',
    readTimeMinutes: 4,
    readingPassage: {
      paragraphs: [
        'Spoken by over 150 million people across East and Central Africa, Kiswahili (Swahili) emerged as a vibrant coastal trade and diplomatic language uniting Bantu grammatical structures with vocabulary from Indian Ocean maritime trade. When greeting a neighbor or elder in Swahili, one says "Jambo" or the respectful "Shikamoo" ("I hold your feet in respect"), answered with "Marahaba" ("I welcome your respect").',
        'In the highlands of Ethiopia and Eritrea, scholars developed Ge’ez—an ancient abugida (alphasyllabary) writing system where each consonant character is modified with subtle vocalic marks to represent syllables. Ge’ez remains one of the oldest continuously used writing systems on Earth.',
        'Words from West and Central African languages also enriched American English: from "banjo," "jazz," and "gumbo" to "tote" and "okra," proving that language is a living bridge across oceans.',
      ],
      keyVocabulary: [
        { term: 'Hakuna Matata / Asante Sana', definition: 'Swahili expressions meaning "No worries" and "Thank you very much."' },
        { term: 'Shikamoo & Marahaba', definition: 'Traditional Swahili greeting of deep respect to elders and mentors, and its warm reply.' },
        { term: 'Abugida Script', definition: 'A writing system where consonant-vowel sequences are written as unified character units.' },
      ],
      primarySourceQuote: 'Mgeni siku mbili; siku ya tatu mpe jembe — Treat a guest as a guest for two days; on the third day, give them a tool to build with the community.',
      primarySourceAttribution: 'Traditional East African Swahili Proverb',
    },
    typingLesson: {
      title: 'Typing Drill: Swahili Greetings & Community Wisdom',
      difficulty: 'Beginner',
      targetWpm: 32,
      practiceText: 'Asante sana means thank you very much in Kiswahili. Shikamoo is a respectful greeting offered to elders and teachers, answered warmly with Marahaba.',
      coachingTip: 'Maintain a light touch on double-vowel words like "Shikamoo".',
    },
    interactiveQuiz: {
      question: 'In Kiswahili (Swahili), what does the phrase "Asante sana" mean?',
      options: [
        {
          id: 'af_l_1',
          text: '"Thank you very much."',
          isCorrect: true,
          explanation: 'Correct! "Asante" means thank you, and "sana" means very much.',
        },
        {
          id: 'af_l_2',
          text: '"Close the window."',
          isCorrect: false,
          explanation: 'Incorrect.',
        },
        {
          id: 'af_l_3',
          text: '"Turn left at the highway."',
          isCorrect: false,
          explanation: 'Incorrect.',
        },
      ],
    },
    reward: {
      statDelta: { kindnessPoints: 20, steamMastery: 15, resilience: 15 },
      cashBonus: 150,
    },
  },

  // =========================================================================
  // 3. EUROPE & MEDITERRANEAN
  // =========================================================================
  {
    id: 'eu_history',
    regionId: 'europe',
    subject: 'history',
    subjectLabel: 'Real-Life Regional History',
    title: 'The Magna Carta (1215), Printing Press & Due Process of Law',
    subtitle: 'How Chapter 39 of Magna Carta and Gutenberg’s Movable Type Democratized Legal Rights',
    historicalEra: '1215–1500s · European Legal & Technological History',
    readTimeMinutes: 4,
    readingPassage: {
      paragraphs: [
        'In June 1215, on the meadow of Runnymede beside the River Thames, English barons and scribes drafted Magna Carta ("The Great Charter"). Its most enduring clause, Chapter 39, established that no free person shall be seized, imprisoned, or stripped of their property or rights "except by the lawful judgment of their equals or by the law of the land." Five centuries later, this exact principle became the Fifth and Fourteenth Amendment Due Process Clauses of the United States Constitution.',
        'Yet laws only protect ordinary people when citizens can actually read them. Around 1440 in Mainz, Germany, Johannes Gutenberg combined oil-based inks, a wooden screw press, and cast metal movable type to mass-produce printed books. Within fifty years, over twenty million volumes were circulating across Europe, breaking the monopoly of elite scribes and sparking universal literacy.',
        'When we combine the printing press’s gift of universal literacy with Magna Carta’s rule of law, we see why reading fine print and knowing your constitutional rights remain the twin pillars of freedom.',
      ],
      keyVocabulary: [
        { term: 'Magna Carta (1215)', definition: 'Foundational charter establishing that even the monarch is subject to the law of the land and due process.' },
        { term: 'Movable Type Printing', definition: 'Mechanical system of reusable metal letter blocks that reduced the cost of books by over 80%.' },
        { term: 'Lex Terrae', definition: '"Law of the Land" — the direct historical precursor to the constitutional term "Due Process of Law."' },
      ],
      primarySourceQuote: 'To no one will we sell, to no one will we deny or delay, right or justice.',
      primarySourceAttribution: 'Magna Carta, Chapter 40 (June 15, 1215)',
    },
    typingLesson: {
      title: 'Typing Drill: Magna Carta & The Rule of Law',
      difficulty: 'Intermediate',
      targetWpm: 36,
      practiceText: 'To no one will we sell, to no one will we deny or delay, right or justice. No citizen shall be deprived of property without due process of law.',
      coachingTip: 'Notice how typing on a modern keyboard is the direct digital descendant of Gutenberg movable type!',
    },
    interactiveQuiz: {
      question: 'Which fundamental American constitutional protection traces its direct origin to Chapter 39 of the 1215 Magna Carta?',
      options: [
        {
          id: 'eu_h_1',
          text: 'Due Process of Law and the right to trial by a jury of one’s peers before any deprivation of liberty or property.',
          isCorrect: true,
          explanation: 'Correct! Magna Carta’s "by the law of the land" (per legem terrae) evolved directly into the 5th and 14th Amendment Due Process Clauses.',
        },
        {
          id: 'eu_h_2',
          text: 'Federal airline baggage weight limits.',
          isCorrect: false,
          explanation: 'Incorrect.',
        },
        {
          id: 'eu_h_3',
          text: 'Automobile emissions testing.',
          isCorrect: false,
          explanation: 'Incorrect.',
        },
      ],
    },
    reward: {
      statDelta: { resilience: 20, financialAcumen: 15, communityLegacy: 20 },
      cashBonus: 175,
    },
  },
  {
    id: 'eu_mathematics',
    regionId: 'europe',
    subject: 'mathematics',
    subjectLabel: 'Mathematics & Applied Logic',
    title: 'Bernoulli’s Principle, Euclidean Geometry & Double-Entry Bookkeeping',
    subtitle: 'From Swiss Fluid Dynamics in Flight to Luca Pacioli’s 1494 Accounting Ledger',
    historicalEra: '300 BCE–1738 CE · Mathematics & Physics',
    readTimeMinutes: 4,
    readingPassage: {
      paragraphs: [
        'In 1738, Swiss mathematician Daniel Bernoulli published "Hydrodynamica," proving a remarkable conservation of energy law in fluid mechanics: as the speed of a moving fluid (or airflow) increases, the static pressure within that fluid decreases. When an airplane wing is shaped as an asymmetric NACA airfoil, air flows faster over the curved upper surface than beneath the lower surface, creating a low-pressure zone above the wing that lifts the aircraft skyward!',
        'Meanwhile, in 1494 Venice, Franciscan friar and mathematician Luca Pacioli—who collaborated closely with Leonardo da Vinci on geometric polyhedra—published the first comprehensive treatise on Double-Entry Bookkeeping ("Assets = Liabilities + Equity"). Every debit must have a corresponding credit so that a business or 501(c)(3) nonprofit’s books always remain in mathematical balance.',
        'Whether balancing aerodynamic pressure vectors in a wind tunnel or balancing assets and liabilities on IRS Form 990, European mathematical breakthroughs work hand-in-hand with global science.',
      ],
      keyVocabulary: [
        { term: 'Bernoulli’s Principle', definition: 'In fluid dynamics, an increase in flow velocity occurs simultaneously with a decrease in static pressure.' },
        { term: 'Double-Entry Bookkeeping', definition: 'Accounting equation (Assets = Liabilities + Equity) where every transaction is recorded in at least two accounts.' },
        { term: 'Euclidean Proof', definition: 'Step-by-step deductive reasoning from self-evident axioms to an unassailable geometric conclusion.' },
      ],
      primarySourceQuote: 'No one should go to sleep at night until the debits equal the credits.',
      primarySourceAttribution: 'Fra Luca Pacioli, Summa de Arithmetica (Venice, 1494)',
    },
    typingLesson: {
      title: 'Typing Drill: Bernoulli Fluid Dynamics & The Accounting Equation',
      difficulty: 'Advanced',
      targetWpm: 38,
      practiceText: 'Bernoulli proved that as airflow speed increases over a wing, static pressure decreases. In double-entry accounting, Assets always equal Liabilities plus Equity.',
      coachingTip: 'Keep your fingers curved lightly above the keys for rapid transitions.',
    },
    interactiveQuiz: {
      question: 'According to Daniel Bernoulli’s 1738 fluid dynamics principle, what happens to the static air pressure above an airplane wing when the airflow velocity over the top of the wing speeds up?',
      options: [
        {
          id: 'eu_m_1',
          text: 'The static air pressure decreases, creating a pressure differential that pushes the wing upward (lift).',
          isCorrect: true,
          explanation: 'Correct! Faster airflow over the cambered top surface lowers top static pressure relative to the higher pressure below the wing.',
        },
        {
          id: 'eu_m_2',
          text: 'The air turns into solid ice instantly.',
          isCorrect: false,
          explanation: 'Incorrect.',
        },
        {
          id: 'eu_m_3',
          text: 'Gravity stops existing everywhere on Earth.',
          isCorrect: false,
          explanation: 'Incorrect. Lift overcomes weight aerodynamically while gravity remains constant.',
        },
      ],
    },
    reward: {
      statDelta: { steamMastery: 25, financialAcumen: 25 },
      cashBonus: 200,
    },
  },

  // =========================================================================
  // 4. ASIA-PACIFIC & SILK ROAD
  // =========================================================================
  {
    id: 'ap_history',
    regionId: 'asia_pacific',
    subject: 'history',
    subjectLabel: 'Real-Life Regional History',
    title: 'The Silk Road Caravans & Polynesian Wayfinding Across the Pacific',
    subtitle: 'How Overland Oasis Cities and Celestial Ocean Navigators Connected Half the Globe',
    historicalEra: '200 BCE–1500 CE · Asian & Pacific History',
    readTimeMinutes: 4,
    readingPassage: {
      paragraphs: [
        'Spanning over 4,000 miles from Chang’an (modern Xi’an) across Central Asian mountain passes to the Mediterranean Sea, the Silk Road was not a single paved highway, but a living network of oasis trade cities like Samarkand, Dunhuang, and Kashgar. Merchants carried not only silk, porcelain, and spices, but also paper-making technology, astronomical tables, musical instruments, and medical texts.',
        'At the same time in the vast Pacific Ocean—covering one-third of the Earth’s surface—Polynesian master navigators ("wayfinders") sailed double-hulled voyaging canoes thousands of miles between Hawaii, Tahiti, Rapa Nui, and Aotearoa (New Zealand) without magnetic compasses. They read a 32-house star compass, ocean swell refraction patterns bouncing off distant islands, and the flight paths of seabirds.',
        'Both the Silk Road caravans and Pacific wayfinders prove that human curiosity, mathematical observation of nature, and cross-cultural exchange are the engines of civilization.',
      ],
      keyVocabulary: [
        { term: 'Star Compass', definition: 'Mental celestial navigation grid tracking the rising and setting points of over 150 stars on the horizon.' },
        { term: 'Wave Refraction', definition: 'The bending of ocean swells around islands, sensed through the hull of a canoe by skilled wayfinders.' },
        { term: 'Paper-Making (105 CE)', definition: 'Process pioneered by Cai Lun using mulberry bark and hemp fibers that revolutionized global record-keeping.' },
      ],
      primarySourceQuote: 'He who does not travel does not know the value of humanity.',
      primarySourceAttribution: 'Silk Road Traveler Maxim',
    },
    typingLesson: {
      title: 'Typing Drill: Silk Road Exchanges & Star Compass Navigation',
      difficulty: 'Intermediate',
      targetWpm: 35,
      practiceText: 'Polynesian wayfinders navigated thousands of miles across the Pacific Ocean by reading rising stars, wave refraction swells, and cloud reflections.',
      coachingTip: 'Maintain a smooth cadence on multi-syllable words like "Polynesian" and "refraction".',
    },
    interactiveQuiz: {
      question: 'How did traditional Polynesian master wayfinders navigate thousands of miles across the open Pacific Ocean at night and by day without metal instruments?',
      options: [
        {
          id: 'ap_h_1',
          text: 'By memorizing the rising/setting positions of over 150 stars (the Star Compass) and feeling ocean swell refraction patterns against the canoe hull.',
          isCorrect: true,
          explanation: 'Correct! Wayfinding is a rigorous science combining observational astronomy, oceanography, and meteorology.',
        },
        {
          id: 'ap_h_2',
          text: 'By following underwater telephone cables.',
          isCorrect: false,
          explanation: 'Incorrect. Polynesian voyages took place over a thousand years before telegraph cables.',
        },
        {
          id: 'ap_h_3',
          text: 'By drifting randomly with their eyes closed.',
          isCorrect: false,
          explanation: 'Incorrect. Voyages were intentional, repeatable, two-way navigational feats.',
        },
      ],
    },
    reward: {
      statDelta: { steamMastery: 25, resilience: 20, communityLegacy: 15 },
      cashBonus: 175,
    },
  },
  {
    id: 'ap_mathematics',
    regionId: 'asia_pacific',
    subject: 'mathematics',
    subjectLabel: 'Mathematics & Applied Logic',
    title: 'Brahmagupta’s Rules of Zero, Decimal Place Value & The Abacus',
    subtitle: 'How Indian Mathematicians Formalized Zero and Negative Numbers (Debt vs Fortune)',
    historicalEra: '628 CE · Classical Asian Mathematics',
    readTimeMinutes: 4,
    readingPassage: {
      paragraphs: [
        'In 628 CE, the Indian astronomer and mathematician Brahmagupta wrote the "Brahmasphutasiddhanta," presenting the first complete mathematical rules for computing with ZERO (shunya) as a number in its own right, alongside positive numbers (which he called "fortunes" or assets) and negative numbers (which he called "debts" or liabilities)!',
        'Brahmagupta stated clearly: "A debt minus zero is a debt. A fortune minus zero is a fortune. The product of two debts is one fortune." This financial framing of positive and negative integers laid the foundation for modern banking ledgers, calculus, and binary computer logic (0s and 1s).',
        'Across East Asia, merchants and engineers paired decimal place value with the Soroban and Suanpan abacus—calculating multi-digit square roots and commercial tax assessments at lightning speed through tactile bead manipulation.',
      ],
      keyVocabulary: [
        { term: 'Shunya (Zero)', definition: 'Both a positional placeholder and an algebraic number with its own arithmetic laws, formalized by Brahmagupta in 628 CE.' },
        { term: 'Fortunes & Debts', definition: 'Brahmagupta’s real-world financial terms for positive numbers (+Assets) and negative numbers (-Liabilities).' },
        { term: 'Binary Code (0 and 1)', definition: 'Modern digital computing language built directly upon the presence (1) or absence (0) of electrical states.' },
      ],
      primarySourceQuote: 'A fortune subtracted from zero is a debt; a debt subtracted from zero is a fortune.',
      primarySourceAttribution: 'Brahmagupta, Brahmasphutasiddhanta, Chapter 18 (628 CE)',
    },
    typingLesson: {
      title: 'Typing Drill: Brahmagupta’s Fortunes, Debts, and Zero',
      difficulty: 'Intermediate',
      targetWpm: 36,
      practiceText: 'In 628 CE, Brahmagupta defined positive numbers as fortunes and negative numbers as debts, establishing the arithmetic laws of zero used in modern finance and computing.',
      coachingTip: 'Keep your eyes moving one word ahead of your fingers for effortless flow.',
    },
    interactiveQuiz: {
      question: 'How did the 7th-century mathematician Brahmagupta explain positive and negative numbers so merchants and students could immediately understand them?',
      options: [
        {
          id: 'ap_m_1',
          text: 'He defined positive numbers as "Fortunes" (Assets) and negative numbers as "Debts" (Liabilities), alongside the arithmetic rules of Zero.',
          isCorrect: true,
          explanation: 'Correct! Connecting abstract integers to real-life fortunes and debts made negative arithmetic intuitive and practical.',
        },
        {
          id: 'ap_m_2',
          text: 'He banned the number zero from ever being written down.',
          isCorrect: false,
          explanation: 'Incorrect. He formalized zero as a true number.',
        },
        {
          id: 'ap_m_3',
          text: 'He said numbers only go up to five.',
          isCorrect: false,
          explanation: 'Incorrect.',
        },
      ],
    },
    reward: {
      statDelta: { steamMastery: 25, financialAcumen: 25 },
      cashBonus: 200,
    },
  },

  // =========================================================================
  // 5. LATIN AMERICA & CARIBBEAN
  // =========================================================================
  {
    id: 'la_history',
    regionId: 'latin_america',
    subject: 'history',
    subjectLabel: 'Real-Life Regional History',
    title: 'Tenochtitlan’s Hydraulic Engineering & Andean Quipu Ledgers',
    subtitle: 'How Island Aqueducts, Floating Chinampas, and Knotted Cords Sustained Millions',
    historicalEra: '1300s–1530s · Mesoamerican & Andean Civilizations',
    readTimeMinutes: 4,
    readingPassage: {
      paragraphs: [
        'Founded in 1325 on an island in the middle of Lake Texcoco, the Aztec capital of Tenochtitlan (modern Mexico City) grew into a metropolis of over 200,000 residents—larger than Paris or London at the time. Civil engineers constructed a ten-mile stone dike (the Albarradón de Nezahualcóyotl) to separate brackish lake water from fresh spring water, alongside twin terracotta aqueducts that delivered clean drinking water into public fountains.',
        'To feed the city abundantly, agricultural scientists built "chinampas"—man-made floating garden islands anchored by willow roots and enriched with lakebed sediment, yielding up to seven harvests per year.',
        'Meanwhile, along the 2,500-mile spine of the South American Andes, Inca administrators governed without paper by tying precision knots called "Quipu" onto dyed cotton and alpaca cords. Using a base-10 positional system, a Quipu master (Quipucamayoc) recorded census data, grain storehouse inventories, and tax tributes with mathematical precision.',
      ],
      keyVocabulary: [
        { term: 'Chinampas', definition: 'Highly productive raised-field island gardens engineered in shallow lake beds.' },
        { term: 'Quipu (Khipu)', definition: 'Andean three-dimensional data-recording device using knotted, color-coded cords in base-10 place value.' },
        { term: 'Hydraulic Dike', definition: 'Engineered floodwall and sluice-gate system controlling water salinity and lake levels.' },
      ],
      primarySourceQuote: 'When we saw so many cities and villages built in the water and other great towns on dry land, and that straight and level causeway going toward Tenochtitlan, we were amazed.',
      primarySourceAttribution: 'Historical Chronicle of Lake Texcoco (1519)',
    },
    typingLesson: {
      title: 'Typing Drill: Chinampa Engineering & Andean Quipu Data',
      difficulty: 'Intermediate',
      targetWpm: 35,
      practiceText: 'Engineers in Tenochtitlan built twin aqueducts and fertile chinampa gardens, while Andean scholars recorded base-ten census and financial ledgers using knotted quipu cords.',
      coachingTip: 'Stay relaxed on Q and Z keys using your left pinky finger.',
    },
    interactiveQuiz: {
      question: 'What was an Andean "Quipu" (Khipu) used for in the Inca Empire?',
      options: [
        {
          id: 'la_h_1',
          text: 'Recording numerical census data, storehouse inventories, and financial tribute accounts using base-10 knots on dyed cords.',
          isCorrect: true,
          explanation: 'Correct! Quipus were three-dimensional base-10 accounting and historical databases.',
        },
        {
          id: 'la_h_2',
          text: 'Catching deep-sea whales in the Atlantic.',
          isCorrect: false,
          explanation: 'Incorrect.',
        },
        {
          id: 'la_h_3',
          text: 'Powering steam locomotives.',
          isCorrect: false,
          explanation: 'Incorrect.',
        },
      ],
    },
    reward: {
      statDelta: { steamMastery: 20, financialAcumen: 20, communityLegacy: 15 },
      cashBonus: 175,
    },
  },

  // =========================================================================
  // 6. MIDDLE EAST & MESOPOTAMIA
  // =========================================================================
  {
    id: 'me_history',
    regionId: 'middle_east',
    subject: 'history',
    subjectLabel: 'Real-Life Regional History',
    title: 'The Code of Hammurabi & Baghdad’s House of Wisdom (Bayt al-Hikma)',
    subtitle: 'How Written Public Contracts and Al-Khwarizmi’s Algebra Shaped Modern Law and Science',
    historicalEra: '1750 BCE–850 CE · Mesopotamian & Golden Age History',
    readTimeMinutes: 4,
    readingPassage: {
      paragraphs: [
        'Around 1750 BCE in Babylon (modern Iraq), King Hammurabi ordered 282 laws carved into a seven-foot black diorite stele erected in the public square so that every literate citizen could read the law of the land. Far beyond criminal rules, over half of the Code of Hammurabi governed commercial contracts: real estate leases, agricultural loans, shipping receipts, builder warranties, and minimum wages for artisans—requiring written, witnessed clay tablets for major transactions!',
        'Over two millennia later in the same river valley, the House of Wisdom (Bayt al-Hikma) in Baghdad brought together scholars of diverse faiths and languages. There, around 820 CE, mathematician Muhammad ibn Musa al-Khwarizmi wrote "Al-Kitab al-Mukhtasar fi Hisab al-Jabr wal-Muqabala" ("The Compendious Book on Calculation by Completion and Balancing").',
        'From the title word "Al-Jabr" comes our English word "Algebra," and from Al-Khwarizmi’s own name comes our word "Algorithm"—which he originally wrote to help families and judges solve complex inheritance, real estate partitioning, and commercial contract equations!',
      ],
      keyVocabulary: [
        { term: 'Code of Hammurabi (c. 1750 BCE)', definition: 'Ancient Babylonian legal code requiring written, witnessed contracts and establishing builder liability warranties.' },
        { term: 'Al-Jabr (Algebra)', definition: 'Mathematical method of restoring and balancing both sides of an equation, pioneered by Al-Khwarizmi.' },
        { term: 'Algorithm', definition: 'Step-by-step computational procedure named after the 9th-century scholar Al-Khwarizmi.' },
      ],
      primarySourceQuote: 'That the strong might not injure the weak, in order to protect the widows and orphans, I have inscribed my precious words upon my monument.',
      primarySourceAttribution: 'Epilogue to the Code of Hammurabi (c. 1750 BCE)',
    },
    typingLesson: {
      title: 'Typing Drill: The Origins of Contracts, Algebra, and Algorithms',
      difficulty: 'Advanced',
      targetWpm: 38,
      practiceText: 'From the Code of Hammurabi came written commercial contracts, and from Al-Khwarizmi at the House of Wisdom came both Algebra and the modern computer Algorithm.',
      coachingTip: 'Practice capitalizing proper nouns smoothly without pausing your typing flow.',
    },
    interactiveQuiz: {
      question: 'Why did the 9th-century mathematician Al-Khwarizmi write the second half of his famous book that gave the world the word "Algebra"?',
      options: [
        {
          id: 'me_h_1',
          text: 'To provide citizens and judges with exact mathematical steps (algorithms) to solve real-life inheritance, land surveying, and commercial contract disputes.',
          isCorrect: true,
          explanation: 'Correct! Over half of Al-Khwarizmi’s original Algebra book is dedicated to solving real-world legal inheritance, property division, and trade contracts!',
        },
        {
          id: 'me_h_2',
          text: 'To make homework confusing with no practical use.',
          isCorrect: false,
          explanation: 'Incorrect! Algebra was invented specifically as a practical tool for fair property, trade, and engineering calculations.',
        },
        {
          id: 'me_h_3',
          text: 'To design video game controllers in 820 CE.',
          isCorrect: false,
          explanation: 'Incorrect, though his algorithms now power every computer and game today!',
        },
      ],
    },
    reward: {
      statDelta: { steamMastery: 25, financialAcumen: 25, resilience: 20 },
      cashBonus: 225,
    },
  },
];

export function getRegionalLesson(
  regionId: WorldRegionId,
  subjectId: RegionalSubjectId
): RegionalLessonModule {
  const exactMatch = REGIONAL_LESSONS_DATA.find(
    (lesson) => lesson.regionId === regionId && lesson.subject === subjectId
  );
  if (exactMatch) {
    return exactMatch;
  }

  const regionInfo =
    WORLD_REGIONS.find((r) => r.id === regionId) || WORLD_REGIONS[0];
  const subjectInfo =
    REGIONAL_SUBJECT_TABS.find((s) => s.id === subjectId) ||
    REGIONAL_SUBJECT_TABS[0];

  const sameSubjectTemplate =
    REGIONAL_LESSONS_DATA.find((lesson) => lesson.subject === subjectId) ||
    REGIONAL_LESSONS_DATA.find((lesson) => lesson.regionId === regionId) ||
    REGIONAL_LESSONS_DATA[0];

  const regionalAdaptationBySubject: Record<
    RegionalSubjectId,
    {
      title: string;
      subtitle: string;
      leadParagraph: string;
      typingText: string;
    }
  > = {
    history: {
      title: `${regionInfo.shortLabel} Real-Life History: Civic Builders & Economic Pioneers`,
      subtitle: `Tracing ${regionInfo.capitalOrHub} from Ancient Foundations to Modern Innovation`,
      leadParagraph: `Across ${regionInfo.name} (${regionInfo.capitalOrHub}), communities built enduring legal, scientific, and trade networks. ${regionInfo.overview}`,
      typingText: `In ${regionInfo.shortLabel}, generations of innovators around ${regionInfo.capitalOrHub} proved that literacy, mathematics, and fair law build thriving communities.`,
    },
    world_history: {
      title: `${regionInfo.shortLabel} in World History: Global Trade Routes & Shared Knowledge`,
      subtitle: `How ${regionInfo.shortLabel} Connected with Civilizations Across the Globe`,
      leadParagraph: `No region developed in isolation. ${regionInfo.name} (${regionInfo.capitalOrHub}) played a pivotal role in world history—exchanging astronomical charts, mathematical breakthroughs, navigational tools, and diplomatic treaties that still shape international law and commerce today.`,
      typingText: `World history connects ${regionInfo.shortLabel} to every continent through shared trade routes, scientific discovery, diplomatic treaties, and cultural exchange.`,
    },
    mathematics: {
      title: `Applied Mathematics of ${regionInfo.shortLabel}: Geometry, Architecture & Trade Ledgers`,
      subtitle: `Real-World Quantitative Problem Solving from ${regionInfo.capitalOrHub} to Modern Finance`,
      leadParagraph: `In ${regionInfo.shortLabel}, mathematics was never just abstract symbols on a page—it was the blueprint behind ${regionInfo.tagline} and the calculation engine for regional commerce across ${regionInfo.capitalOrHub}.`,
      typingText: `Applied mathematics in ${regionInfo.shortLabel} powers structural engineering, geometric architecture, accurate land surveys, and balanced financial ledgers.`,
    },
    languages: {
      title: `Languages & Etymology of ${regionInfo.shortLabel}: Cultural Fluency & Legal Terms`,
      subtitle: `Cultural Motto & Script History (${regionInfo.culturalMotto})`,
      leadParagraph: `Language is the vessel of culture, law, and trust across ${regionInfo.name} (${regionInfo.capitalOrHub}). Guided by the motto "${regionInfo.culturalMotto}", mastering linguistic roots, scripts, and clear diction prepares you to collaborate anywhere on Earth.`,
      typingText: `Honoring the motto ${regionInfo.culturalMotto} in ${regionInfo.shortLabel} builds mutual respect before negotiating international trade and civic contracts.`,
    },
    art: {
      title: `Art, Architecture & Visual Geometry of ${regionInfo.shortLabel}`,
      subtitle: `Symmetry, Pigments, and Cultural Storytelling Across ${regionInfo.capitalOrHub}`,
      leadParagraph: `Artists and master builders across ${regionInfo.name} (${regionInfo.capitalOrHub}) turned stone, textiles, ceramics, and light into living history. By studying the visual traditions of ${regionInfo.shortLabel}, students discover how geometry, chemistry, and civic identity unite in great art.`,
      typingText: `The artistic traditions of ${regionInfo.shortLabel} unite geometric symmetry, vibrant natural pigments, architectural mastery, and cultural storytelling.`,
    },
    social_studies: {
      title: `Social Studies & Civic Economics of ${regionInfo.shortLabel}`,
      subtitle: `Community Governance, Resource Stewardship & Public Rights in ${regionInfo.capitalOrHub}`,
      leadParagraph: `Social studies in ${regionInfo.shortLabel} explores how Geography, Civics, and Economics intersect across ${regionInfo.capitalOrHub}. From local town councils and constitutional charters to cooperative resource management, informed citizens protect both community resilience and individual rights.`,
      typingText: `Civic participation and economic stewardship across ${regionInfo.shortLabel} empower citizens to build fair courts, strong schools, and sustainable cities.`,
    },
    typing: {
      title: `${regionInfo.shortLabel} Executive Typing & Digital Contract Studio`,
      subtitle: `High-Speed, Zero-Error Keyboard Mastery for ${regionInfo.shortLabel} History, Law & STEM`,
      leadParagraph: `In today's 100% virtual and global economy, typing fluency is the modern counterpart to manuscript penmanship. Practicing real-world passages about ${regionInfo.name} (${regionInfo.capitalOrHub}) builds muscle memory for legal clauses, historical research, and financial data entry.`,
      typingText: `Executive students studying ${regionInfo.shortLabel} type with poised posture, steady rhythm, and 100 percent accuracy when drafting official agreements.`,
    },
  };

  const adapted = regionalAdaptationBySubject[subjectId];

  return {
    ...sameSubjectTemplate,
    id: `${regionId}_${subjectId}_adapted`,
    regionId,
    subject: subjectId,
    subjectLabel: subjectInfo.label,
    title: adapted.title,
    subtitle: adapted.subtitle,
    readingPassage: {
      ...sameSubjectTemplate.readingPassage,
      paragraphs: [
        adapted.leadParagraph,
        ...sameSubjectTemplate.readingPassage.paragraphs.slice(0, 2),
      ],
    },
    typingLesson: {
      ...sameSubjectTemplate.typingLesson,
      title: `Typing Lab (${regionInfo.shortLabel} • ${subjectInfo.label})`,
      practiceText: adapted.typingText,
    },
  };
}


