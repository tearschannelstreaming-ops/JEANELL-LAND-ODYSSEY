import { ClassmateId, RelationshipState } from './game';

export type LabType = 'aero' | 'propulsion' | 'finance' | 'community';

export interface ClassmateStudyProfile {
  id: 'kendra' | 'david';
  name: string;
  role: string;
  avatarColor: string;
  tagline: string;
  bio: string;
  specialty: string;
  bestLabs: LabType[];
  labTopics: Record<LabType, string[]>;
  bonusDescription: string;
  perkName: string;
}

export interface StudyRequest {
  id: string;
  classmateId: 'kendra' | 'david';
  classmateName: string;
  labFocus: LabType;
  labName: string;
  topic: string;
  customNote: string;
  status: 'accepted' | 'declined' | 'pending';
  responseMessage: string;
  sentAt: number;
  bonusMultiplier: number; // e.g. 1.25 = +25%
  bonusPercent: number;    // e.g. 25
  durationMinutes: number; // e.g. 15
}

export interface ActiveCollaborationBonus {
  id: string;
  classmateId: 'kendra' | 'david';
  classmateName: string;
  classmateTitle: string;
  labFocus: LabType;
  labName: string;
  topic: string;
  bonusMultiplier: number; // e.g. 1.25 (+25% bonus)
  bonusPercent: number;    // 25
  perkTitle: string;
  perkDescription: string;
  coPilotTip: string;
  activatedAt: number;
  durationMinutes: number;
  expiresAt: number;
}
