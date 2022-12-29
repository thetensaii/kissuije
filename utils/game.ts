export type Player = {
  id: string;
  name: string;
  isOwner: boolean;
  hasFoundCharacter: boolean;
  character?: string;
};

export const SceneState = {
  HOME: 'HOME',
  ROOM_JOINED: 'ROOM_JOINED',
  CHOOSE_CHARACTER: 'CHOOSE_CHARACTER',
  WAIT_THAT_OTHERS_CHOOSE: 'WAIT_THAT_OTHERS_CHOOSE',
  GAME: 'GAME',
  END_GAME: 'END_GAME',
} as const;
export type SceneState = keyof typeof SceneState;
