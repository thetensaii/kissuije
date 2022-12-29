import { Player } from './game';

export interface ServerToClientEvents {
  newOwner: (id: string) => void;
  playerJoinRoom: (player: Player) => void;
  playerLeaveRoom: (id: string) => void;
  choosePlayerCharacter: (id: string) => void;
  updatePlayerCharacter: (id: string, character: string) => void;
  launchGame: (playersByGameOrder: Player[]) => void;
}

export interface ClientToServerEvents {
  doRoomExist: (room: string, callback: (doesExists: boolean) => void) => void;
  newPlayer: (name: string, room: string, callback: (players: Player[]) => void) => void;
  startGame: (roomId: string) => void;
  validatePlayerCharacter: (playerId: string, character: string) => void;
}

export type InterServerEvents = Record<string, never>;
