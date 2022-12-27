import { Socket } from 'socket.io';
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
  doRoomExist: (
    room: string,
    callback: (doesExists: boolean) => void
  ) => void;
  newPlayer: (
    name: string,
    room: string,
    callback: (players: Player[]) => void
  ) => void;
  startGame: (roomId: string) => void;
  validatePlayerCharacter: (playerId: string, character: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface InterServerEvents { }

export interface SocketData {
  name: string;
  joinedRoom: string;
  isOwner: boolean;
  character?: string;
}

export type ServerSocket = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;