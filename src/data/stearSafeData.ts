import { CalendarAppointment, SafeRideBooking, SafeDeliveryOrder, MentalStateAnalysis } from '../types/stear';

export const INITIAL_CALENDAR_APPOINTMENTS: CalendarAppointment[] = [
  {
    id: 'apt-zoom-1',
    title: 'Virtual Zoom Interview: Boeing Aero-Thermal Propulsion',
    description: 'Entry-Level Propulsion & Stress Analysis technical interview with hiring panel.',
    category: 'interview',
    date: new Date().toISOString().split('T')[0], // Today
    time: '02:30 PM',
    durationMinutes: 45,
    location: 'Virtual Zoom Studio (Interactive Sim)',
    isVirtual: true,
    linkedTab: 'zoom',
    reminderMinutes: 30,
    isCompleted: false,
    resilienceReward: 15,
    coolPointsReward: 25,
    safetyCheckInRequired: true,
  },
  {
    id: 'apt-lab-1',
    title: 'Detroit Wind Tunnel Airfoil Pressure Tap Calibration',
    description: 'Hands-on NACA 2412 wing angle-of-attack lift vs drag validation run.',
    category: 'flight_sim',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
    time: '10:00 AM',
    durationMinutes: 60,
    location: 'Detroit Coleman A. Young Aero Research Center',
    isVirtual: false,
    linkedTab: 'labs',
    reminderMinutes: 45,
    isCompleted: false,
    resilienceReward: 20,
    coolPointsReward: 20,
  },
  {
    id: 'apt-mentor-1',
    title: 'Jeanell Land S.T.E.A.M. Mentorship & Wealth Circle',
    description: 'Weekly roundtable discussing 101-level curriculum milestones and patent strategy.',
    category: 'mentorship',
    date: new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0],
    time: '04:00 PM',
    durationMinutes: 40,
    location: 'Detroit Innovation Commons / PIP Virtual Room',
    isVirtual: true,
    linkedTab: 'course',
    reminderMinutes: 15,
    isCompleted: false,
    resilienceReward: 15,
    coolPointsReward: 30,
  },
  {
    id: 'apt-closing-1',
    title: 'Woodward Commercial Corridor Escrow & Title Closing',
    description: 'Review deed covenants, community land-trust covenants, and tenant leases.',
    category: 'closing',
    date: new Date(Date.now() + 4 * 86400000).toISOString().split('T')[0],
    time: '01:00 PM',
    durationMinutes: 50,
    location: 'First Detroit Commercial Title & Trust',
    isVirtual: false,
    linkedTab: 'mls',
    reminderMinutes: 60,
    isCompleted: false,
    resilienceReward: 25,
    coolPointsReward: 35,
  },
  {
    id: 'apt-ride-1',
    title: 'S-T-E-A-R Late-Night Safe Escort to Wayne State Tech Lab',
    description: 'Pre-scheduled verified student transport with safety PIN check-in.',
    category: 'ride',
    date: new Date().toISOString().split('T')[0],
    time: '08:45 PM',
    durationMinutes: 20,
    location: 'Detroit Midtown Station -> Wayne State Engineering Annex',
    isVirtual: false,
    linkedTab: 'stear',
    reminderMinutes: 15,
    isCompleted: false,
    resilienceReward: 10,
    coolPointsReward: 15,
  },
];

export const INITIAL_ACTIVE_RIDE: SafeRideBooking = {
  id: 'ride-demo-1',
  type: 'interview_priority',
  title: 'Job Interview Priority Shuttle',
  pickupLocation: 'Detroit Innovation Hub (Woodward Ave)',
  dropoffLocation: 'Virtual Zoom Simulation Studio / Tech Center',
  destinationName: 'Boeing Propulsion Interview Center',
  driverName: 'Marcus Vance',
  driverPhone: '(313) 555-0192',
  driverRating: 4.98,
  vehicleModel: 'Chevy Bolt EUV (Electric Blue)',
  licensePlate: 'MI-STE-77',
  safetyPin: '4892',
  etaMinutes: 3,
  status: 'en_route',
  fare: 18,
  isFreeVoucher: true,
  createdAt: new Date().toISOString(),
  notes: 'S-T-E-A-R Safe Verified Driver · In-Car Audio Telemetry Active',
};

export const INITIAL_ACTIVE_DELIVERY: SafeDeliveryOrder = {
  id: 'del-demo-1',
  category: 'brain_food',
  title: 'Decompression Brain Fuel Bento Box',
  items: ['Wild Salmon & Quinoa Bowl', 'Antioxidant Blueberry Elixir', 'Dark Chocolate Matcha Energy Bites'],
  courierName: 'Elena Rostova',
  courierVehicle: 'E-Cargo Bike #04',
  etaMinutes: 7,
  status: 'out_for_delivery',
  cost: 22,
  resilienceBoost: 15,
  createdAt: new Date().toISOString(),
};

export const RIDE_PRESETS = [
  {
    type: 'interview_priority' as const,
    title: 'Job Interview Priority Shuttle',
    description: 'Guaranteed on-time transit for interviews, simulations & corporate presentations.',
    fare: 20,
    typicalEta: '3-5 min',
    safetyFeatures: ['Live Route Sentinel', 'Safety PIN Handshake', 'Recruiter ETA Notification'],
  },
  {
    type: 'aero_shuttle' as const,
    title: 'Aero-Shuttle Express to Research Labs',
    description: 'Direct access to Coleman A. Young Airport, Wayne State Aero Lab & wind tunnels.',
    fare: 25,
    typicalEta: '6-8 min',
    safetyFeatures: ['Luggage/Model Bay', 'Verified Flight Engineers Escort', 'Express Highway Routing'],
  },
  {
    type: 'late_night_safe' as const,
    title: 'Late-Night Student Safe Escort',
    description: 'Door-to-door vetted transport for late library study sessions & evening shifts.',
    fare: 15,
    typicalEta: '4-7 min',
    safetyFeatures: ['Double-PIN Verification', 'Live Guardian Tracking', 'Lighted Escort to Door'],
  },
  {
    type: 'community_transit' as const,
    title: 'Community Transit & Decompression Shuttle',
    description: 'Connects to Detroit Riverfront, Motown Museum, and urban farming community hubs.',
    fare: 8,
    typicalEta: '5-10 min',
    safetyFeatures: ['Eco-Fleet Electric Bus', 'Accessible Low-Floor', 'Free Student Vouchers'],
  },
  {
    type: 'emergency_sos' as const,
    title: 'S-T-E-A-R Emergency Safe Extraction (SOS)',
    description: 'Immediate priority extraction if feeling unsafe, stranded, or experiencing severe burnout.',
    fare: 0,
    typicalEta: '2-4 min',
    safetyFeatures: ['0-Fare Student Safety Fund', 'Direct Link to Campus/City Safety', 'Emergency Shelter Protocol'],
  },
];

export const DELIVERY_CATALOG = [
  {
    id: 'food-brain-bento',
    category: 'brain_food' as const,
    title: 'Decompression Brain Fuel Bento Box',
    description: 'Wild salmon, omega-3 rich walnuts, antioxidant berries & matcha to instantly soothe mental strain.',
    cost: 22,
    resilienceBoost: 15,
    prepTime: '8-12 min',
    items: ['Salmon Quinoa Bowl', 'Berries & Walnuts', 'Matcha Brain Tonic'],
  },
  {
    id: 'food-comfort-soup',
    category: 'brain_food' as const,
    title: 'Detroit Soul Warmth Stew & Cornbread',
    description: 'Slow-simmered vegetable stew with sweet potato and golden cornbread. Ultimate comfort nourishment.',
    cost: 16,
    resilienceBoost: 12,
    prepTime: '10-15 min',
    items: ['Slow-Simmered Soul Stew', 'Golden Honey Cornbread', 'Sweet Mint Tea'],
  },
  {
    id: 'kit-aero-study',
    category: 'study_supplies' as const,
    title: 'Aeronautical Engineering Field Drafting Kit',
    description: 'Precision digital calipers, NACA 4-digit airfoil templates, drafting compass, and engineering grid notebook.',
    cost: 45,
    resilienceBoost: 10,
    prepTime: '15-20 min',
    items: ['Digital Calipers', 'NACA Foil Stencil', 'Drafting Grid Notebook', 'Technical Pens'],
  },
  {
    id: 'kit-emergency-care',
    category: 'emergency_care' as const,
    title: 'S-T-E-A-R Safe Care & Wellness Backpack',
    description: '10,000 mAh solar power bank, emergency thermal poncho, high-intensity mini-flashlight, and first aid essentials.',
    cost: 35,
    resilienceBoost: 18,
    prepTime: '5-10 min',
    items: ['10,000mAh Power Bank', 'Thermal Safety Poncho', 'First Aid Pouch', 'Electrolyte Tablets'],
  },
  {
    id: 'pantry-detroit-fresh',
    category: 'pantry_groceries' as const,
    title: 'Detroit Urban Ag Co-op Fresh Produce Box',
    description: 'Locally grown organic greens, honeycrisp apples, carrots, herbal tea blends from Detroit neighborhood farms.',
    cost: 28,
    resilienceBoost: 14,
    prepTime: '12-18 min',
    items: ['Detroit Urban Greens', 'Michigan Honeycrisp Apples', 'Raw Lavender Honey', 'Herbal Calming Blend'],
  },
];

export function getMentalStateAnalysis(resilience: number): MentalStateAnalysis {
  if (resilience < 30) {
    return {
      state: 'critical_strain',
      headline: 'CRITICAL COGNITIVE STRAIN & BURNOUT RISK',
      description:
        'Resilience is severely depleted (<30%). Processing speed and emotional endurance are compromised. Immediate decompression or safe support is required.',
      recommendedAction:
        'Book an immediate S-T-E-A-R Safe Ride home, order a Decompression Brain Bento, or engage in 3-minute breathwork.',
      colorScheme: {
        border: 'border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.45)] ring-2 ring-red-500 animate-pulse',
        glow: 'from-red-600/30 via-rose-500/10 to-transparent',
        badgeBg: 'bg-red-950/90 text-red-300 border-red-500/50',
        textColor: 'text-red-400',
      },
    };
  }

  if (resilience > 80) {
    return {
      state: 'peak_flow',
      headline: 'PEAK FLOW & UNBREAKABLE FORTITUDE',
      description:
        'Resilience is exceptionally elevated (>80%). You have reached peak mental clarity, high cognitive bandwidth, and optimal leadership presence.',
      recommendedAction:
        'Ideal time to conquer high-stakes challenges: Virtual Zoom Interviews, Flight Simulations, or Level 101 Odyssey boards!',
      colorScheme: {
        border: 'border-emerald-400 shadow-[0_0_24px_rgba(52,211,153,0.45)] ring-2 ring-emerald-400',
        glow: 'from-emerald-500/25 via-teal-500/10 to-transparent',
        badgeBg: 'bg-emerald-950/90 text-emerald-300 border-emerald-500/50',
        textColor: 'text-emerald-400',
      },
    };
  }

  return {
    state: 'balanced',
    headline: 'STABLE & FOCUSED EQUILIBRIUM',
    description:
      'Mental stamina is steady. You are navigating challenges with composure and calculated judgment.',
    recommendedAction:
      'Maintain momentum. Review your calendar appointments and keep your S-T-E-A-R transit scheduled.',
    colorScheme: {
      border: 'border-slate-800',
      glow: 'from-slate-800/20 to-transparent',
      badgeBg: 'bg-slate-900 text-slate-300 border-slate-700',
      textColor: 'text-slate-300',
    },
  };
}
