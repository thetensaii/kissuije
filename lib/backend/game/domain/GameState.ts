export const GameState = {
  LOBBY: 'LOBBY',
  CHOOSE_CHARACTER: 'CHOOSE_CHARACTER',
} as const;

export type GameState = typeof GameState[keyof typeof GameState];
