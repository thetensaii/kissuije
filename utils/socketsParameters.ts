import { Server, Socket } from 'socket.io';
import { Player } from './game';

export interface ServerToClientEvents {
  newOwner: (id: string) => void;
  playerJoinRoom: (player: Player) => void;
  playerLeaveRoom: (id: string) => void;
  choosePlayerCharacter: (id: string) => void;
  updatePlayerCharacter: (id: string, character: string) => void;
  launchGame: (playerdIdsByGameOrder: string[]) => void;
}

export interface ClientToServerEvents {
  doRoomExist: (room: string, callback: (doesExists: boolean) => void) => void;
  newPlayer: (name: string, room: string, callback: (players: Player[]) => void) => void;
  startGame: (roomId: string) => void;
  validatePlayerCharacter: (playerId: string, character: string) => void;
}

export type InterServerEvents = Record<string, never>;

export interface SocketData extends Player {
  joinedRoom: string;
}

export type CustomSocket = Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>;

export type CustomServer = Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>;
