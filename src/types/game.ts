export interface PhysicsQuestion {
  id: string;
  level: number; // 1 to 5
  facilityName: string;
  topic: string;
  question: string;
  options: {
    key: 'A' | 'B' | 'C' | 'D';
    text: string;
  }[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  formulaHint?: string;
}

export interface LevelData {
  level: number;
  facilityName: string;
  facilityCode: string;
  topic: string;
  description: string;
  storyIntro: string;
  zombieCount: number;
  zombieSpeedMultiplier: number;
  zombieHealthMultiplier: number;
  spawnIntervalMs: number;
  specialZombies: boolean;
  colorTheme: string;
}

export interface GameStats {
  score: number;
  zombiesDefeated: number;
  questionsAnswered: number;
  correctAnswers: number;
  ammoUsed: number;
  highestCombo: number;
}
