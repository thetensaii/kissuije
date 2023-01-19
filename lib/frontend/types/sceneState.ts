export const SceneState = {
  HOME: 'HOME',
  LOBBY: 'LOBBY',
  CHOOSE_CHARACTER: 'CHOOSE_CHARACTER',
  WAITING_ROOM: 'WAITING_ROOM',
  GAME: 'GAME',
  ROUND_RESULT: 'ROUND_RESULT',
  END_GAME: 'END_GAME',
  RANKING: 'RANKING',
} as const;

export type SceneState = typeof SceneState[keyof typeof SceneState];
