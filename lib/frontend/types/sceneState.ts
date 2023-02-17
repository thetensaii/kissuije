export const SceneState = {
  HOME: 'HOME',
  LOBBY: 'LOBBY',
  CHOOSE_CHARACTER: 'CHOOSE_CHARACTER',
  WAIT_FOR_CHARACTERS: 'WAIT_FOR_CHARACTERS',
  ASK_QUESTION: 'ASK_QUESTION',
  TRY_GUESS: 'TRY_GUESS',
  WAIT_FOR_ATTEMPTS: 'WAIT_FOR_ATTEMPTS',
  ANSWER_ATTEMPTS: 'ANSWER_ATTEMPTS',
  WAIT_FOR_ANSWERS: 'WAIT_FOR_ANSWERS',
  ROUND_RESULT: 'ROUND_RESULT',
  WAIT_FOR_CONTINUE: 'WAIT_FOR_CONTINUE',
  END_GAME: 'END_GAME',
  FINAL_RESULTS: 'FINAL_RESULTS',
  ONLY_PLAYER_LEFT: 'ONLY_PLAYER_LEFT',
} as const;

export type SceneState = typeof SceneState[keyof typeof SceneState];
