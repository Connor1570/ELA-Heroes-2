import { MaskType } from './types';

// Simplified palettes for high contrast accessibility
export const COLORS = {
  suit: ['#EF4444', '#3B82F6', '#22C55E', '#EAB308', '#A855F7', '#EC4899', '#64748B'],
  cape: ['#1E293B', '#B91C1C', '#1D4ED8', '#15803D', '#A16207', '#7E22CE', '#BE185D'],
  skin: ['#FFCDB0', '#E0AC69', '#8D5524', '#523428'],
  mask: ['#000000', '#FFFFFF', '#FCD34D', '#EF4444', '#3B82F6']
};

export const MASK_OPTIONS = [
  MaskType.NONE,
  MaskType.BANDIT,
  MaskType.COWL,
  MaskType.VISOR
];

// Grade-based Word Lists
// Structure: { grade: { module: data } }
export const EDUCATIONAL_DATA: Record<number, {
  sightWords: string[];
  rhymes: { target: string; match: string; distractor: string }[];
  spelling: string[];
}> = {
  1: {
    sightWords: ["THE", "AND", "YOU", "THAT", "WAS", "FOR", "ON", "ARE"],
    rhymes: [
      { target: "CAT", match: "HAT", distractor: "DOG" },
      { target: "RUN", match: "SUN", distractor: "CAR" },
      { target: "RED", match: "BED", distractor: "TOP" }
    ],
    spelling: ["CAT", "DOG", "MOM", "DAD", "SUN"]
  },
  2: {
    sightWords: ["OVER", "NEW", "SOUND", "TAKE", "ONLY", "LITTLE", "WORK", "KNOW"],
    rhymes: [
      { target: "GAME", match: "NAME", distractor: "TIME" },
      { target: "BOAT", match: "COAT", distractor: "LAKE" },
      { target: "MICE", match: "RICE", distractor: "FACE" }
    ],
    spelling: ["FISH", "BIRD", "PLAY", "JUMP", "BLUE"]
  },
  3: {
    sightWords: ["HIGH", "EVERY", "NEAR", "ADD", "FOOD", "BETWEEN", "OWN", "BELOW"],
    rhymes: [
      { target: "LIGHT", match: "BRIGHT", distractor: "KITE" }, // Kite rhymes but spelling pattern differs slightly, good for grade 3
      { target: "CARE", match: "SHARE", distractor: "HERE" },
      { target: "ROUND", match: "SOUND", distractor: "HAND" }
    ],
    spelling: ["APPLE", "TRAIN", "HOUSE", "WATER", "LIGHT"]
  },
  4: {
    sightWords: ["THOUGH", "LANGUAGE", "AMONG", "UNIT", "POWER", "TOWN", "FINE", "CERTAIN"],
    rhymes: [
      { target: "MOTION", match: "POTION", distractor: "ACTION" },
      { target: "MEASURE", match: "TREASURE", distractor: "SURE" },
      { target: "ROUGH", match: "TOUGH", distractor: "THOUGH" }
    ],
    spelling: ["FRIEND", "SCHOOL", "PEOPLE", "BECAUSE", "THOUGHT"]
  },
  5: {
    sightWords: ["CONTAIN", "COURSE", "SURFACE", "PRODUCE", "BUILDING", "OCEAN", "CLASS", "NOTE"],
    rhymes: [
      { target: "ACTION", match: "FACTION", distractor: "NATION" },
      { target: "DOUBLE", match: "TROUBLE", distractor: "BUBBLE" },
      { target: "HEIGHT", match: "WHITE", distractor: "EIGHT" }
    ],
    spelling: ["ENOUGH", "ISLAND", "SYSTEM", "RECORD", "METHOD"]
  },
  6: {
    sightWords: ["SIMPLE", "SEVERAL", "VOWEL", "TOWARD", "WAR", "LAY", "AGAINST", "PATTERN"],
    rhymes: [
      { target: "REGION", match: "LEGION", distractor: "LION" },
      { target: "STATION", match: "RELATION", distractor: "MISSION" },
      { target: "VERSES", match: "CURSES", distractor: "HORSES" }
    ],
    spelling: ["VACATION", "BEAUTIFUL", "LANGUAGE", "QUESTION", "COMPLETE"]
  }
};
