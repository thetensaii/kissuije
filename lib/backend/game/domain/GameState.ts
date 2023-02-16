export const GameState = {
  LOBBY: 'LOBBY',
  IN_GAME: 'IN_GAME',
} as const;

export type GameState = typeof GameState[keyof typeof GameState];
