export type TriviaCategory = 'aeronautical' | 'real_estate' | 'jeanell_journey';
export type TriviaDifficulty = 'Cadet' | 'Specialist' | 'Ace';

export interface TriviaQuestion {
  id: string;
  category: TriviaCategory;
  categoryLabel: string;
  difficulty: TriviaDifficulty;
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
  historicalContext: string;
  milestoneLesson: string;
  resilienceBonus: number;
  coolPointsBonus: number;
  steamBonus: number;
  eraOrYear: string;
  historicalFigureOrTopic: string;
}

export interface TriviaUserProgress {
  streak: number;
  bestStreak: number;
  lastCompletedDate: string; // YYYY-MM-DD
  answeredQuestionIds: Record<string, { answeredIndex: number; isCorrect: boolean; timestamp: number }>;
  totalBonusResilienceEarned: number;
  totalCorrect: number;
  todayCompleted: boolean;
}
