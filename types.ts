
export enum AppMode {
  PRACTICE = 'PRACTICE',
  TEST = 'TEST',
  TIME_ATTACK = 'TIME_ATTACK',
  FREE_CANVAS = 'FREE_CANVAS'
}

export type ViewState = 'HOME' | 'QUIZ' | 'HOMEWORK_MENU';

export interface CharacterData {
  char: string;
  pinyin: string;
  zhuyin: string;
  meaning: string;
  difficulty: number;
  components?: string[]; // Radical/component breakdown, e.g., ['口', '乞'] for 吃
}

export interface NameSequence {
  id: string;
  name: string;
  characters: CharacterData[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  characters: CharacterData[];
  author?: string;
  authorPin?: string;  // Simple PIN to verify ownership across devices
  ownerId?: string;    // Deprecated in favor of author + authorPin
  isSpecial?: boolean;
  isCustom?: boolean;
  isShared?: boolean;
  isPrivate?: boolean; // If true, only visible to the owner
  sequences?: NameSequence[];
}

export interface QuizResult {
  character: string;
  mistakes: number;
  completed: boolean;
  score: number;
}

export interface AIInsight {
  character: string;
  pinyin: string;
  zhuyin: string;
  mnemonic: string;
  breakdown: string;
  usage: string;
}
