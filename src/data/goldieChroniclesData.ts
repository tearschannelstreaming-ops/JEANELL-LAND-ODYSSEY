export interface GoldieCrucibleMilestone {
  id: string;
  ageOrYear: string;
  title: string;
  goldieReality: {
    badge: string;
    headline: string;
    story: string;
    hardshipType: 'Survival Hustle' | 'Gun Violence & Grief' | 'Domestic Abuse & Control' | 'Incarceration & Injustice' | 'Street Pressures';
    quote: string;
  };
  jeanellTransformation: {
    badge: string;
    headline: string;
    breakthrough: string;
    legacyProgram: string;
    wisdom: string;
  };
  resilienceLesson: string;
  statBonus: {
    resilience: number;
    communityLegacy: number;
    kindnessPoints: number;
  };
}

export const GOLDIE_VS_JEANELL_MILESTONES: GoldieCrucibleMilestone[] = [
  {
    id: 'milestone-teen-mom-hustle',
    ageOrYear: 'Age 16–20 (1990s)',
    title: 'Teen Mother of Four & The Hair Braiding Hustle',
    goldieReality: {
      badge: 'Goldie: Unmarried Teen Motherhood',
      headline: 'Four Children, Never Married, Midnight Braid Scramble',
      story:
        'Becoming a teen mom with no husband and ultimately raising four children alone in Detroit, Goldie was thrust into urgent survival. To buy diapers, formula, and food, she braided hair around the clock—turning living rooms into mini salons and hustling every dollar with blistered hands to keep the gas on and the babies fed.',
      hardshipType: 'Survival Hustle',
      quote:
        '“When you have four hungry babies looking in your eyes and no ring on your finger, pride is a luxury you cannot afford. You braid until your fingers bleed because they depend entirely on you.”',
    },
    jeanellTransformation: {
      badge: 'Jeanell: Licensed Foster Parent & Matriarch',
      headline: 'State-Licensed Foster Mother & Sanctuary Builder',
      breakthrough:
        'Jeanell transformed that desperate maternal survival instinct into state-licensed foster parenting. She opened her home to aged-out foster youth and abandoned children across Wayne County, offering unconditional love and generational security.',
      legacyProgram: 'One Stop Foster Family Haven & Youth Emergency Shelter',
      wisdom:
        '“I was a single mother of four with no safety net. Today, God gave me the credentials and the foundation to ensure no child in Detroit has to wonder where they will sleep tonight.”',
    },
    resilienceLesson: 'Maternal grit under scarcity is raw fuel for building generational shelter and community care.',
    statBonus: { resilience: 15, communityLegacy: 20, kindnessPoints: 20 },
  },
  {
    id: 'milestone-gambling-drugs',
    ageOrYear: 'Ages 18–24 (1994–2000)',
    title: 'Street Pressures: Gambling & The Drug Economy Trap',
    goldieReality: {
      badge: 'Goldie: Underground Hustle',
      headline: 'Gambling Tables & Street Drug Sales to Make Ends Meet',
      story:
        'Surrounded by extreme Detroit poverty and barred from traditional employment, Goldie turned to street dice, numbers gambling, and distributing drugs to generate fast cash. The street underworld promised fast thousands to pay back rent, but brought paranoia, police helicopters, robbery targets, and spiritual toxicity.',
      hardshipType: 'Street Pressures',
      quote:
        '“In the street life, you gamble on dice and you gamble with your freedom every hour you sell. The money looks fast, but the debt it charges to your soul is bankruptcy.”',
    },
    jeanellTransformation: {
      badge: 'Jeanell: Legitimate Enterprise & Financial Acumen',
      headline: 'Real Estate Mastery, Taxes & Legit Business Builder',
      breakthrough:
        'Jeanell realized street economics were a rigged trap designed to feed prisons. She channeled her hustle into mastering compound interest, real estate appraisals, property leasing, and corporate tax codes—teaching former hustlers how to build 100% legal, sovereign wealth.',
      legacyProgram: 'One Stop Financial Literacy & Enterprise Incubator',
      wisdom:
        '“If you have the math and courage to calculate street margins under gunfire, you have the intellect to master Wall Street, real estate syndication, and clean commercial equity.”',
    },
    resilienceLesson: 'Transfer your street hustle into licensed commercial acumen—build wealth that police cannot confiscate.',
    statBonus: { resilience: 20, communityLegacy: 20, kindnessPoints: 15 },
  },
  {
    id: 'milestone-felonious-assault-jail',
    ageOrYear: 'Age 20 (1996)',
    title: 'First Incarceration: Jail at 20 for Felonious Assault',
    goldieReality: {
      badge: 'Goldie: Incarcerated at 20',
      headline: 'Locked in County Jail for Felonious Assault',
      story:
        'At just 20 years old, reactive from street trauma and defending herself in a volatile altercation, Goldie was charged and sentenced for felonious assault. Experiencing the harsh reality of county lockup, she heard the iron gates slam shut and realized the penal system is engineered to permanently discard young Black mothers.',
      hardshipType: 'Incarceration & Injustice',
      quote:
        '“The metal gates slamming shut behind you at 20 feels like your life was just extinguished. In jail, nobody tells you how to rebuild your soul from a concrete slab.”',
    },
    jeanellTransformation: {
      badge: 'Jeanell: Returning Citizens Champion',
      headline: 'Second-Chance Housing & Expungement Clinics',
      breakthrough:
        'Rather than letting a 20-year-old felony sentence dictate her fate, Jeanell fought for academic achievement, insurance certifications, real estate licenses, and created re-entry transition beds that guide women walking out of prison into sustainable careers.',
      legacyProgram: 'One Stop Re-Entry Transition Housing & Expungement Guild',
      wisdom:
        '“A felony conviction at twenty could have been my lifetime tombstone. Instead, I made it the credential that proves to every returning woman that your past record cannot stop your calling.”',
    },
    resilienceLesson: 'Your conviction is not your character; genuine redemption outworks any criminal record.',
    statBonus: { resilience: 25, communityLegacy: 25, kindnessPoints: 15 },
  },
  {
    id: 'milestone-cab-driver-years',
    ageOrYear: 'Ages 20–26 (1996–2002)',
    title: 'Six Years Behind the Wheel: Driving a Detroit Cab',
    goldieReality: {
      badge: 'Goldie: Detroit Cab Shift',
      headline: 'Navigating Dangerous Streets from 20 to 26 Years Old',
      story:
        'For six grueling years, from age 20 to 26, Goldie drove a commercial Detroit cab. Navigating late-night routes across 8 Mile, Woodward, and darkened side avenues, she confronted cash stick-ups, drunken brawls, freezing blizzards, and predators waiting for a vulnerable female driver.',
      hardshipType: 'Survival Hustle',
      quote:
        '“Driving that cab between 20 and 26 taught me every alley and pothole in Detroit. You learn to read a man’s intentions through your rearview mirror in two seconds flat.”',
    },
    jeanellTransformation: {
      badge: 'Jeanell: S-T-E-A-R Safe Transit Protocol',
      headline: 'Engineering Autonomous Safe Ride Telemetry',
      breakthrough:
        'Her six years of cab vulnerability fueled the architectural design of S-T-E-A-R Safe Transit: 4-digit safety handshakes, biometric driver authentication, live GPS sentinel breadcrumbs, and zero-risk transit for women and students across Detroit.',
      legacyProgram: 'S-T-E-A-R Safe Autonomous Transit & Emergency Telemetry',
      wisdom:
        '“I drove that cab in danger for six years so that our daughters in Detroit could ride in protected vehicles where their safety is guaranteed by engineering.”',
    },
    resilienceLesson: 'Firsthand vulnerability on the front lines is the exact blueprint for designing bulletproof safety systems.',
    statBonus: { resilience: 20, communityLegacy: 20, kindnessPoints: 15 },
  },
  {
    id: 'milestone-gun-violence-grief',
    ageOrYear: 'Ages 22, 23 & 29 (1998, 1999, 2005)',
    title: 'The Agony of Street Grief: Lost Three to Gun Violence',
    goldieReality: {
      badge: 'Goldie: Unbearable Losses',
      headline: 'Burying Loved Ones at 22, 23, and 29',
      story:
        'The epidemic of street violence struck Goldie with ruthless trauma. At age 22, she stood over the casket of her first loved one murdered by gunfire. At 23, another precious life was stolen. At 29, a third casket was lowered into Detroit soil. The compounded grief, flashbacks, and tears nearly broke her sanity.',
      hardshipType: 'Gun Violence & Grief',
      quote:
        '“Standing over three caskets at 22, 23, and 29 leaves voids in your soul that daylight cannot warm. You either drown in the trauma or you swear before God to stop the slaughter.”',
    },
    jeanellTransformation: {
      badge: 'Jeanell: Peace Builder & T.E.A.R.S. Channel',
      headline: 'Transforming Tears into S.T.E.A.M. & Youth Protection',
      breakthrough:
        'Jeanell channeled that agonizing grief into the T.E.A.R.S. Channel (Teens Experiencing Adverse Realities & Scenarios) and S.T.E.A.M. peer guardianship networks, pulling youth off corners into aerospace flight simulators and trade apprenticeships.',
      legacyProgram: 'T.E.A.R.S. Media Peace Channel & S.T.E.A.M. Youth Guardians',
      wisdom:
        '“I carry the spirits of those three lost loved ones into every room I enter. Every child we put in front of an aerodynamics wind tunnel is one less soul in a cemetery.”',
    },
    resilienceLesson: 'Grief transmuted into proactive community defense can interrupt a generational cycle of violence.',
    statBonus: { resilience: 30, communityLegacy: 30, kindnessPoints: 25 },
  },
  {
    id: 'milestone-abuse-and-sugar-daddies',
    ageOrYear: 'Ages 24–30 (2000–2006)',
    title: 'The Gilded Cage: Controlling Sugar Daddies, Abuse & Assault',
    goldieReality: {
      badge: 'Goldie: Controlling Sugar Daddies',
      headline: 'Material Splendor Masking Coercive Control & Violence',
      story:
        'Seeking protection and financial backing for her children, Goldie fell under the sway of older street benefactors and "sugar daddies" who showered her with furs, jewelry, and luxury cars. But the lavish gifts were accompanied by intense emotional control, stalking, domestic violence, and sexual assault behind closed doors.',
      hardshipType: 'Domestic Abuse & Control',
      quote:
        '“They put diamond bracelets on your wrist so you won’t notice they are actually iron handcuffs. No luxury car or bundle of cash is worth your dignity, your safety, or your sanity.”',
    },
    jeanellTransformation: {
      badge: 'Jeanell: Domestic Violence Emergency Haven',
      headline: 'Mental Health Coaching & Financial Sovereignty',
      breakthrough:
        'Jeanell broke the gilded chains and walked away with her soul intact. She certified as a Light University Mental Health Coach and created emergency shelter beds and sovereign credit restoration programs for domestic abuse survivors at One Stop.',
      legacyProgram: 'One Stop Domestic Violence Emergency Haven & Credit Restoration',
      wisdom:
        '“True wealth is sovereign independence. When a woman learns tax law, credit, and real estate, no man can ever use a dollar bill to control or violate her body.”',
    },
    resilienceLesson: 'Dignity and independence are non-negotiable; walk away from every gilded cage, no matter the price.',
    statBonus: { resilience: 25, communityLegacy: 25, kindnessPoints: 20 },
  },
  {
    id: 'milestone-shot-at-33',
    ageOrYear: 'Age 33 (2009)',
    title: 'Shot at 33: Wrong Crowd & Forced Street Retirement',
    goldieReality: {
      badge: 'Goldie: Struck by a Bullet',
      headline: 'Shot at 33 Because of Being in the Wrong Crowd',
      story:
        'At age 33, while spending time in the orbit of an old street circle, gunshots erupted unexpectedly. Goldie took a bullet into her flesh. Lying in the trauma bay with sirens wailing, knowing four children were waiting at home, she faced the final wake-up call. The bullet was the violent full stop that forced her to retire from the streets forever.',
      hardshipType: 'Gun Violence & Grief',
      quote:
        '“When that hot lead pierced my skin, God spoke with thunder: ‘You have four children who need a living mother. Goldie retires tonight, or Jeanell dies in a morgue.’ That bullet ended Goldie.”',
    },
    jeanellTransformation: {
      badge: 'Jeanell: Physical & Spiritual Rebirth',
      headline: 'Retiring the Streets for Science, Real Estate & Aeronautics',
      breakthrough:
        'The gunshot wound was the definitive boundary line. Goldie was shelved forever. Jeanell immersed herself in fluid dynamics, aircraft mechanics, insurance, building codes, and community rehabilitation, proving scars are sacred proof of survival.',
      legacyProgram: 'Detroit Trauma-Informed Holistic Health & Vocational Labs',
      wisdom:
        '“A near-fatal bullet can either drown you in fear or activate your divine assignment. That physical scar is a permanent reminder that I am on borrowed time to save other lives.”',
    },
    resilienceLesson: 'When God spares your life, retire the persona that led you to the slaughter and step into your calling.',
    statBonus: { resilience: 35, communityLegacy: 30, kindnessPoints: 25 },
  },
  {
    id: 'milestone-26-days-false-arrest',
    ageOrYear: 'Age 40 (2016)',
    title: 'The 26-Day False Arrest: The Stolen Rental Car Nightmare',
    goldieReality: {
      badge: 'Goldie: Falsely Jailed at 40',
      headline: 'Held 26 Days Without Justice for an Extended & Retrieved Rental',
      story:
        'At age 40, having worked for years as a legitimate businesswoman and mother, Jeanell was blindsided by brutal systemic injustice. A rental car that had been extended and subsequently retrieved and returned was falsely reported stolen by the rental agency. Police falsely arrested her on grand theft charges. She was placed on probation for the second time, forced to pay thousands in bogus court fees, and held in county jail for 26 days under false arrest. Despite her innocence and paperwork, she received zero apology and zero justice from the legal system.',
      hardshipType: 'Incarceration & Injustice',
      quote:
        '“Held 26 days in a cell for a car that was already back on their lot! I paid thousands in court fees and had to carry probation for a crime that never existed. The court didn’t care about truth. That’s when I vowed: I will build an organization that fights for the falsely accused.”',
    },
    jeanellTransformation: {
      badge: 'Jeanell: One Stop Rehabilitation Center 501(c)(3)',
      headline: 'Founding One Stop & Becoming a Licensed Foster Parent',
      breakthrough:
        'Those 26 agonizing days of administrative violence sealed the complete resurrection of Jeanell Land. Goldie was officially retired into history. Jeanell founded One Stop Rehabilitation Center 501(c)(3) to provide holistic re-entry, legal defense advocacy, emergency housing, and expungement services, and became a licensed foster parent to shield Wayne County children from systemic abandonment.',
      legacyProgram: 'One Stop Rehabilitation Center 501(c)(3) & Foster Parent Network',
      wisdom:
        '“They stole 26 days of my life and tried to brand me a criminal again. I did not get justice from that court bench—so I built One Stop Rehabilitation Center to deliver justice to the people.”',
    },
    resilienceLesson: 'When the legal system fails to give you justice, convert your righteous fury into an unbreakable 501(c)(3) sanctuary.',
    statBonus: { resilience: 45, communityLegacy: 45, kindnessPoints: 35 },
  },
  {
    id: 'milestone-goldie-retired-sanctuary',
    ageOrYear: 'Present Day & Future',
    title: 'Goldie Retired Forever: The Sovereign Rebirth of Jeanell',
    goldieReality: {
      badge: 'Goldie: The Retired Street Persona',
      headline: 'Surviving Teen Motherhood, Cabs, Bullets & Cages',
      story:
        'Goldie was the armor created by a young, unmarried teen mother with four children who did hair, drove cabs from 20 to 26, sold drugs, gambled, survived gun violence, survived domestic violence, survived sexual assault, endured two incarcerations, and survived a bullet at 33. Goldie fought every battle so that Jeanell could live.',
      hardshipType: 'Survival Hustle',
      quote:
        '“I do not despise Goldie. She was the warrior armor that kept my four children fed and kept me alive in Detroit’s coldest nights. But a suit of iron cannot hug a child. Goldie did her duty; now she is retired.”',
    },
    jeanellTransformation: {
      badge: 'Jeanell Land: The Resurrected Builder',
      headline: 'One Stop Founder, Licensed Foster Parent & Aerospace Visionary',
      breakthrough:
        'Jeanell stepped into her full sovereign light: Executive Director of One Stop Rehabilitation Center, certified licensed foster parent, aeronautical flight educator, licensed broker, author of Better Forever, and creator of the S-T-E-A-R Safe ecosystem. Every scar is now a bridge for someone else to cross.',
      legacyProgram: 'One Stop Multi-Service Campus & S.T.E.A.M. Flight Academy',
      wisdom:
        '“Goldie had to be retired so Jeanell could build. Your survival persona got you out of the storm; your true divine purpose is what builds the shelter for the generation behind you.”',
    },
    resilienceLesson: 'Honor your survival armor, then retire it with reverence so you can step into your divine purpose.',
    statBonus: { resilience: 50, communityLegacy: 50, kindnessPoints: 50 },
  },
];
