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
  materiale: string;      // Fattore Materiale (Chimico-Fisico)
  spirituale: string;     // Fattore Spirituale (Ideale-Archetipico)
  immaginale: string;     // Fattore Immaginale (Psico-Immaginale / Anima Mundi)
  crystalShape: 'trigonal' | 'cubic' | 'monoclinic' | 'hexagonal' | 'amorphous' | 'orthorhombic' | 'octahedral' | 'complex';
  imageUrl: string;       // Immagine illustrativa di riferimento
  tags: string[];
  chakraName: string;     // Nome e corrispondenza del Chakra
  chakraMotivazione: string; // Motivazione del legame tra cristallo/arcano e chakra
  chakraPuntiForza: string;  // Punti di forza associati a questo stato energetico
  chakraPuntiDebolezza: string; // Punti di debolezza o blocco energetico
  chakraEquilibrio: string;  // Modalità pratiche ed immaginali di riequilibrio
}

export type TabId = 'explorer' | 'draw' | 'quiz' | 'compare' | 'chat';

export interface QuizAnswers {
  q1: string;
  q2: string;
  q3: string;
}
