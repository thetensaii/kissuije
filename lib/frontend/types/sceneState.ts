export const SceneState = {
  HOME: 'HOME',
  LOBBY: 'LOBBY',
  CHOOSE_CHARACTER: 'CHOOSE_CHARACTER',
  WAITING_ROOM: 'WAITING_ROOM',
  ASK_QUESTION: 'ASK_QUESTION',
  WAIT_FOR_ATTEMPTS: 'WAIT_FOR_ATTEMPTS',
  TRY_GUESS: 'TRY_GUESS',
  GAME: 'GAME',
  ROUND_RESULT: 'ROUND_RESULT',
  END_GAME: 'END_GAME',
  RANKING: 'RANKING',
} as const;

export type SceneState = typeof SceneState[keyof typeof SceneState];
