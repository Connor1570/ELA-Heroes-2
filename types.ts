export enum MaskType {
  NONE = 'None',
  BANDIT = 'Bandit',
  COWL = 'Cowl',
  VISOR = 'Visor'
}

export interface HeroConfig {
  suitColor: string;
  capeColor: string;
  maskColor: string;
  maskType: MaskType;
  skinTone: string;
}

export interface StudentProfile {
  id: string;
  name: string;
  gradeLevel: number;
  hero: HeroConfig;
  stats: Record<string, number>; // Module name -> Score
}

export enum GameModule {
  SIGHT_WORDS = 'Sight Words',
  RHYMING = 'Rhyming',
  SPELLING = 'Spelling'
}

export enum AppScreen {
  MAIN_MENU = 'MAIN_MENU',
  HERO_BUILDER = 'HERO_BUILDER',
  MISSION_SELECT = 'MISSION_SELECT',
  GAMEPLAY = 'GAMEPLAY'
}
