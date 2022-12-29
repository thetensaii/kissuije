import type { NextApiRequest, NextApiResponse } from 'next';
import type { Server as HTTPServer } from 'http';
import type { Socket as NetSocket } from 'net';
import { Server as IOServer } from 'socket.io';
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents } from 'lib/common/socketsTypes';
import { apiSocketHandler } from 'lib/backend/apiSocketHandler';
import { CustomServer, SocketData } from 'lib/backend/socketTypes';

interface SocketServer extends HTTPServer {
  io?: CustomServer | undefined;
}

interface SocketWithIO extends NetSocket {
  server: SocketServer;
}

interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO;
}

export default function room(_req: NextApiRequest, res: NextApiResponseWithSocket): void {
  if (res.socket.server.io) {
    res.end();
    return;
  }

  const io: CustomServer = new IOServer<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(
    res.socket.server
  );

  res.socket.server.io = io;

  apiSocketHandler(io);

  res.end();
}
