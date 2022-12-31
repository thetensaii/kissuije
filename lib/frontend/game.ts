export const SceneState = {
  HOME: 'HOME',
  JOINED_ROOM: 'JOINED_ROOM',
  CHOOSE_CHARACTER: 'CHOOSE_CHARACTER',
  WAITING_ROOM: 'WAITING_ROOM',
  GAME: 'GAME',
  END_GAME: 'END_GAME',
} as const;

export type SceneState = keyof typeof SceneState;
