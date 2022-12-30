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
  doesRoomExist: (room: string, callback: (doesExist: boolean) => void) => void;
  createRoom: (name: string, roomId: string, callback: (owner: Player) => void) => void;
  joinRoom: (name: string, roomId: string, callback: (roomPlayers: Player[]) => void) => void;
  newPlayer: (name: string, roomId: string, callback: (players: Player[]) => void) => void;
  startGame: (roomId: string) => void;
  choosePlayerCharacter: (playerId: string, character: string) => void;
}
