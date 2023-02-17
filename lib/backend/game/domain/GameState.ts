export const GameState = {
  LOBBY: 'LOBBY',
  CHOOSE_CHARACTER: 'CHOOSE_CHARACTER',
  ATTEMPTING: 'ATTEMPTING',
} as const;

export type GameState = typeof GameState[keyof typeof GameState];
