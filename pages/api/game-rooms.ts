import type { NextApiRequest, NextApiResponse } from 'next';
import type { Server as HTTPServer } from 'http';
import type { Socket as NetSocket } from 'net';
import { Server as IOServer } from 'socket.io';
import { ClientToServerEvents, ServerToClientEvents } from 'lib/common/socketsTypes';
import { CustomServer, InterServerEvents, SocketData } from 'lib/backend/game/socket/socketTypes';
import { CreateRoomController } from 'lib/backend/game/socket/CreateRoomController';
import { CreateRoomService } from 'lib/backend/game/app-service/CreateRoomService';
import { InMemoryGameRooms } from 'lib/backend/game/infrastructure/InMemoryGameRooms';
import { JoinRoomService } from 'lib/backend/game/app-service/JoinRoomService';
import { JoinRoomController } from 'lib/backend/game/socket/JoinRoomController';
import { CheckRoomService } from 'lib/backend/game/app-service/CheckRoomService';
import { CheckRoomController } from 'lib/backend/game/socket/CheckRoomController';
import { LeaveRoomService } from 'lib/backend/game/app-service/LeaveRoomService';
import { LeaveRoomController } from 'lib/backend/game/socket/LeaveRoomController';
import { StartPlayerCharacterSelectionService } from 'lib/backend/game/app-service/StartPlayerCharacterSelectionService';
import { StartPlayerCharacterSelectionController } from 'lib/backend/game/socket/StartPlayerCharacterSelectionController';
import { ChoosePlayerCharacterService } from 'lib/backend/game/app-service/ChoosePlayerCharacterService';
import { DoAllPlayersHaveCharacterService } from 'lib/backend/game/app-service/DoAllPlayersHaveCharacterService';
import { ChoosePlayerCharacterController } from 'lib/backend/game/socket/ChoosePlayerCharacterController';
import { LaunchNewRoundService } from 'lib/backend/game/app-service/LaunchNewRoundService';
import { AskQuestionService } from 'lib/backend/game/app-service/AskQuestionService';
import { AskQuestionController } from 'lib/backend/game/socket/AskQuestionController';

interface SocketServer extends HTTPServer {
  io?: CustomServer | undefined;
}

interface SocketWithIO extends NetSocket {
  server: SocketServer;
}

interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO;
}

export default function gameRooms(_req: NextApiRequest, res: NextApiResponseWithSocket): void {
  if (res.socket.server.io) {
    res.end();
    return;
  }

  const io: CustomServer = new IOServer<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(
    res.socket.server
  );

  res.socket.server.io = io;

  const inMemoryGameRooms = new InMemoryGameRooms();

  const createRoomService = new CreateRoomService(inMemoryGameRooms);
  const createRoomController = new CreateRoomController(createRoomService);
  createRoomController.createRoom(io);

  const joinRoomService = new JoinRoomService(inMemoryGameRooms);
  const joinRoomController = new JoinRoomController(joinRoomService);
  joinRoomController.joinRoom(io);

  const checkRoomService = new CheckRoomService(inMemoryGameRooms);
  const checkRoomController = new CheckRoomController(checkRoomService);
  checkRoomController.doesRoomExist(io);

  const leaveRoomService = new LeaveRoomService(inMemoryGameRooms);
  const leaveRoomController = new LeaveRoomController(leaveRoomService);
  leaveRoomController.leaveRoom(io);

  const startPlayerCharacterSelectionService = new StartPlayerCharacterSelectionService(inMemoryGameRooms);
  const startPlayerCharacterSelectionController = new StartPlayerCharacterSelectionController(
    startPlayerCharacterSelectionService
  );
  startPlayerCharacterSelectionController.startPlayerCharacterSelection(io);

  const choosePlayerCharacterService = new ChoosePlayerCharacterService(inMemoryGameRooms);
  const doAllPlayersHaveCharacterService = new DoAllPlayersHaveCharacterService(inMemoryGameRooms);
  const launchNewRoundService = new LaunchNewRoundService(inMemoryGameRooms);
  const choosePlayerCharacterController = new ChoosePlayerCharacterController(
    choosePlayerCharacterService,
    doAllPlayersHaveCharacterService,
    launchNewRoundService
  );
  choosePlayerCharacterController.choosePlayerCharacter(io);

  const askQuestionService = new AskQuestionService(inMemoryGameRooms);
  const askQuestionController = new AskQuestionController(askQuestionService);
  askQuestionController.askquestion(io);

  res.end();
}
