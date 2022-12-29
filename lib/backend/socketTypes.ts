import { Player } from 'lib/common/game';
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents } from 'lib/common/socketsTypes';
import { Server, Socket } from 'socket.io';

export interface SocketData extends Player {
  joinedRoom: string;
}

export type CustomSocket = Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>;

export type CustomServer = Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>;
