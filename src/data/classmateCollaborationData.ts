import { ClassmateStudyProfile, LabType, ActiveCollaborationBonus, StudyRequest } from '../types/collaboration';
import { RelationshipState, PlayerStats } from '../types/game';

export const LAB_METADATA: Record<LabType, { name: string; subtitle: string; iconName: string; accentColor: string }> = {
  aero: {
    name: 'Aero Wind Tunnel Lab',
    subtitle: 'Computational Aerodynamics, Lift-to-Drag & Stall Boundaries',
    iconName: 'Wind',
    accentColor: 'cyan',
  },
  propulsion: {
    name: 'Rocket Propulsion Lab',
    subtitle: 'Tsiolkovsky Staging, Specific Impulse & Mass Fractions',
    iconName: 'Rocket',
    accentColor: 'indigo',
  },
  finance: {
    name: 'Real Estate Cashflow Lab',
    subtitle: 'Cap Rate, Multi-Family Underwriting & Amortization Shields',
    iconName: 'Building2',
    accentColor: 'emerald',
  },
  community: {
    name: 'Detroit Community Rehab Lab',
    subtitle: 'Vocational Trade Scoping, Historic Preservation & Sweat Equity',
    iconName: 'HeartHandshake',
    accentColor: 'amber',
  },
};

export const CLASSMATE_PROFILES: Record<'kendra' | 'david', ClassmateStudyProfile> = {
  kendra: {
    id: 'kendra',
    name: 'Kendra Barnes',
    role: 'Senior VP of Community Underwriting & Financial Modeler',
    avatarColor: 'emerald',
    tagline: '“Equity in the ledger builds sovereign dignity in the neighborhood.”',
    bio: 'A brilliant financial architect who transformed personal hardship into mastery over commercial loan structures, multi-family Cap Rate optimization, and HUD/NACA community mortgage advocacy.',
    specialty: 'Real Estate Pro-Formas, Debt Service Coverage & Community Grants',
    bestLabs: ['finance', 'community'],
    labTopics: {
      finance: [
        'Multi-Family Cap Rate & Net Operating Income Optimization',
        'Amortization Schedules & Refinance Cashflow Buffers',
        'Tax Depreciation Shields & First-Time Buyer Subsidies',
      ],
      community: [
        'Vocational Trade Contractor Scoping & Material Budgets',
        'Detroit Historic Tax Credit Syndication',
        'Sweat Equity Valuation & Tenant Co-Op Frameworks',
      ],
      aero: [
        'Aerospace Capital Expenditure & Prototype Cost Modeling',
        'Grant Allocation for University Wind Tunnel Testing',
      ],
      propulsion: [
        'Payload-to-Cost Mass Efficiency Projections',
        'Commercial Launch Subcontract Risk Hedging',
      ],
    },
    bonusDescription: '+25% Financial Acumen & Community Legacy multiplier across all calculation cycles.',
    perkName: "Kendra's Underwriting Lens (+25% Financial & Rehab Bonus)",
  },
  david: {
    id: 'david',
    name: 'David Chen',
    role: 'Propulsion & Aerodynamic Systems Specialist',
    avatarColor: 'cyan',
    tagline: '“Every vortex tells a story of pressure and velocity waiting for harmony.”',
    bio: 'A methodical aerospace theorist and propulsion apprentice who excels in computational grid generation, vortex boundary layer mechanics, and multi-stage rocket burn trajectories.',
    specialty: 'Supersonic Fluid Dynamics, Thrust Vectoring & Specific Impulse',
    bestLabs: ['aero', 'propulsion'],
    labTopics: {
      aero: [
        'Boundary Layer Vortex Generators & Camber Geometry',
        'Transonic Stall Boundary Buffer Calculations',
        'High-Lift Camber Trim for Urban Emergency Gliders',
      ],
      propulsion: [
        'Tsiolkovsky Specific Impulse & Nozzle Expansion Ratios',
        'Multistage Burn Timing & Escape Velocity Mass Fractions',
        'Thrust-to-Weight Aerodynamic Stability Buffers',
      ],
      finance: [
        'Aeronautical Lab Equipment Depreciation Models',
        'Commercial Flight Route Fuel Economy Analytics',
      ],
      community: [
        'Solar-Electric Microgrid Engineering for Youth Centers',
        'Trade High School Flight Simulator Calibration',
      ],
    },
    bonusDescription: '+25% STEAM Aero & Rocket Propulsion Mastery multiplier and enhanced aerodynamic stall buffer.',
    perkName: "David's Vector Mesh (+25% Aero & Propulsion Bonus)",
  },
};

export interface ResponseResult {
  accepted: boolean;
  message: string;
  relationshipStatus: RelationshipState;
  promotedToAlly: boolean;
  coPilotTip: string;
}

export const generateStudyResponse = (
  classmateId: 'kendra' | 'david',
  relationship: RelationshipState,
  lab: LabType,
  topic: string,
  note: string,
  playerStats: PlayerStats
): ResponseResult => {
  const isKendra = classmateId === 'kendra';

  // 1. If currently an ALLY
  if (relationship === 'ally') {
    if (isKendra) {
      return {
        accepted: true,
        message: `“Jeanell! Of course I'll partner with you on ${topic}. You defended my dignity when nobody else would, and your dedication to mastery is legendary. I've sent over my custom underwriting templates. Let's make this pro-forma impossible to dispute!”`,
        relationshipStatus: 'ally',
        promotedToAlly: false,
        coPilotTip:
          'Kendra is actively cross-verifying your cash flow matrices. Notice how Cap Rate and debt coverage sync effortlessly with her feedback.',
      };
    } else {
      return {
        accepted: true,
        message: `“Count me in, Jeanell! I've been running boundary simulations for ${topic} all week. If we link our telemetry consoles, we'll slice through that stall margin and optimize the burn rate by 25% easily. Let's calibrate!”`,
        relationshipStatus: 'ally',
        promotedToAlly: false,
        coPilotTip:
          "David's telemetry grid is streaming live into your console. Look for the +25% aerodynamic coefficient bonus on high-velocity runs.",
      };
    }
  }

  // 2. If currently NEUTRAL
  if (relationship === 'neutral') {
    // If player has high kindness or high resilience, they easily impress and promote to ally!
    const isPromoted = playerStats.kindnessPoints >= 20 || playerStats.resilience >= 50 || note.length > 15;

    if (isKendra) {
      if (isPromoted) {
        return {
          accepted: true,
          message: `“Hey Jeanell! Your message caught my attention. Your clear grasp of ${topic} and your focus on ethical community growth prove your intentions are genuine. Let's collaborate—I'm happy to call you an ally in this work!”`,
          relationshipStatus: 'ally',
          promotedToAlly: true,
          coPilotTip:
            'Kendra was moved by your cooperative approach and has upgraded your relationship to ALLY! +25% Mastery bonus unlocked.',
        };
      } else {
        return {
          accepted: true,
          message: `“Hello Jeanell. I have a 30-minute window before my underwriting committee convenes. Let's run the numbers for ${topic} strictly by the book.”`,
          relationshipStatus: 'neutral',
          promotedToAlly: false,
          coPilotTip:
            'Kendra has accepted a focused study session. Precision in your inputs will help strengthen trust.',
        };
      }
    } else {
      if (isPromoted) {
        return {
          accepted: true,
          message: `“Hey Jeanell! I appreciate you reaching out about ${topic}. Your technical notes are sharp and your collaborative spirit is refreshing. Let's team up on this—consider us allies in the hangar!”`,
          relationshipStatus: 'ally',
          promotedToAlly: true,
          coPilotTip:
            "David was impressed by your rigorous inquiry and has upgraded your relationship to ALLY! +25% Aero/Propulsion bonus active.",
        };
      } else {
        return {
          accepted: true,
          message: `“Hey. I'm currently running tests in the suborbital bay, but I can spare a cycle to compare calculations on ${topic}. Let's keep the telemetry clean.”`,
          relationshipStatus: 'neutral',
          promotedToAlly: false,
          coPilotTip:
            'David is reviewing your telemetry inputs. Keep your angle of attack stable to maximize the partnership.',
        };
      }
    }
  }

  // 3. If currently BULLIED
  // High kindness points and sincere note can offer a restorative bridge
  if (playerStats.kindnessPoints >= 35 && note.trim().length > 10) {
    return {
      accepted: true,
      message: `“Jeanell... I didn't expect you to reach out, given the cruelty back in high school. But your note and your ongoing community repair work show you are holding yourself accountable. I will agree to collaborate on ${topic}. Let this be a step toward mutual respect.”`,
      relationshipStatus: 'neutral',
      promotedToAlly: false,
      coPilotTip:
        'A restorative milestone! Your classmate accepted your study request, beginning the healing of a past rift.',
    };
  }

  return {
    accepted: false,
    message: isKendra
      ? '“Jeanell, I haven’t forgotten how you mocked me in the cafeteria for social clout. Until you demonstrate consistent character accountability and repair through community action, I cannot collaborate with you.”'
      : '“Jeanell, character matters more than equations. The way you treated Marcus and Kendra back then showed a lack of integrity. I am not ready to share research cycles with you yet.”',
    relationshipStatus: 'bullied',
    promotedToAlly: false,
    coPilotTip:
      'Study request declined due to past peer cruelty. Rebuild your Kindness and Resilience through restorative campaign steps to open this door.',
  };
};

export const createCollaborationBonus = (
  request: StudyRequest,
  profile: ClassmateStudyProfile
): ActiveCollaborationBonus => {
  const durationMinutes = 15;
  const now = Date.now();

  const perkTitle = `${profile.name}'s Collaborative Co-Pilot (+${request.bonusPercent}% Bonus)`;
  const perkDescription = `Active partnership with ${profile.name} in ${request.labName}. Grants a +${request.bonusPercent}% bonus multiplier to all mastery and stat gains.`;
  const coPilotTip =
    request.labFocus === 'finance' || request.labFocus === 'community'
      ? `${profile.name} is monitoring pro-forma cashflow and material trade allocations.`
      : `${profile.name} is fine-tuning aerodynamic boundary mesh and nozzle specific impulse.`;

  return {
    id: `collab-${now}`,
    classmateId: request.classmateId,
    classmateName: profile.name,
    classmateTitle: profile.role,
    labFocus: request.labFocus,
    labName: request.labName,
    topic: request.topic,
    bonusMultiplier: request.bonusMultiplier,
    bonusPercent: request.bonusPercent,
    perkTitle,
    perkDescription,
    coPilotTip,
    activatedAt: now,
    durationMinutes,
    expiresAt: now + durationMinutes * 60 * 1000,
  };
};
