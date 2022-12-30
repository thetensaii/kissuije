import { ClientToServerEvents, ServerToClientEvents } from 'lib/common/socketsTypes';
import { Server, Socket } from 'socket.io';
import { Player as DomainPlayer } from '../domain/Player';

// Todo : Remove Domain Player after backend refact
export interface SocketData extends DomainPlayer {
  joinedRoom: string;
}
export type InterServerEvents = Record<string, never>;

export type CustomSocket = Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>;

export type CustomServer = Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>;
