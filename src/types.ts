export interface ArcanoMineral {
  number: number;
  roman: string;
  arcanaName: string;
  mineralName: string;
  subTitle: string;
  formula: string;
  system: string;
  hardness: number;
  category: string;
  colorGradient: string;
  accentColor: string;
  scientificBasis: string;
  opticsPhysical: string;
  tags: string[];
}

export type TabId = 'explorer' | 'draw' | 'quiz' | 'compare';

export interface QuizAnswers {
  q1: string;
  q2: string;
  q3: string;
}
