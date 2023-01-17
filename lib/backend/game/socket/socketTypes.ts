import { ClientToServerEvents, ServerToClientEvents } from 'lib/common/socketsTypes';
import { Server, Socket } from 'socket.io';

export type CustomSocket = Socket<ClientToServerEvents, ServerToClientEvents>;

export type CustomServer = Server<ClientToServerEvents, ServerToClientEvents>;
