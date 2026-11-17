export type TurningPointEra =
  | 'Youth & Foundations'
  | 'University & Aeronautics'
  | 'Real Estate & Wealth'
  | 'Patents & Inventions'
  | 'Civic Leadership & Legacy';

export interface AffirmationMantra {
  id: string;
  text: string;
  theme: 'Aeronautical Poise' | 'Grounded Community' | 'Tenacity & Vision' | 'Strategic Mindset';
  affirmationFocus: string;
  resilienceBonusPercent: number; // 5%
}

export interface HistoricalTurningPoint {
  id: string;
  dayNumber: number;
  date: string;
  year: number;
  title: string;
  subtitle: string;
  era: TurningPointEra;
  iconName: 'plane' | 'building' | 'shield' | 'sparkles' | 'award' | 'heart' | 'zap' | 'compass';
  accentColor: 'amber' | 'cyan' | 'emerald' | 'purple' | 'rose';
  historicalCrucible: string;
  turningPointOutcome: string;
  coreQuote: string;
  quoteContext: string;
  mantras: AffirmationMantra[];
  tags: string[];
}

export interface ActiveMantraBuff {
  id: string;
  mantraId: string;
  mantraText: string;
  theme: string;
  turningPointId: string;
  turningPointTitle: string;
  date: string;
  buffPercent: number; // 5
  activatedAt: number; // timestamp ms
  durationMinutes: number; // e.g. 15 minutes
  expiresAt: number; // timestamp ms
}
