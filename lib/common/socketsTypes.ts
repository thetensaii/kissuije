import { PlayerType as FrontendPlayerType } from '../frontend/types/player';

export type SocketAnswerType = 'yes' | 'no' | 'idk';

export interface ServerToClientEvents {
  newOwner: (id: string) => void;
  playerJoinRoom: (player: FrontendPlayerType) => void;
  playerLeaveRoom: (id: string) => void;
  choosePlayerCharacter: (id: string) => void;
  updatePlayerCharacter: (id: string, character: string) => void;
}

export interface ClientToServerEvents {
  doesRoomExist: (room: string, callback: (doesExist: boolean) => void) => void;
  createRoom: (name: string, roomId: string, callback: (owner: FrontendPlayerType) => void) => void;
  joinRoom: (name: string, roomId: string, callback: (roomPlayers: FrontendPlayerType[]) => void) => void;
  newPlayer: (name: string, roomId: string, callback: (players: FrontendPlayerType[]) => void) => void;
  startGame: (roomId: string) => void;
  choosePlayerCharacter: (targetId: string, character: string) => void;
}
