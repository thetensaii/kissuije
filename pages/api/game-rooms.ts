import type { NextApiRequest, NextApiResponse } from 'next';
import type { Server as HTTPServer } from 'http';
import type { Socket as NetSocket } from 'net';
import { Server as IOServer } from 'socket.io';
import { ClientToServerEvents, ServerToClientEvents } from 'lib/common/socketsTypes';
import { CustomServer } from 'lib/backend/game/socket/socketTypes';
import { CreateRoomController } from 'lib/backend/game/socket/CreateRoomController';
import { CreateRoomService } from 'lib/backend/game/app-service/CreateRoomService';
import { InMemoryGameRooms } from 'lib/backend/game/infrastructure/InMemoryGameRooms';
import { JoinRoomService } from 'lib/backend/game/app-service/JoinRoomService';
import { JoinRoomController } from 'lib/backend/game/socket/JoinRoomController';
import { CheckRoomService } from 'lib/backend/game/app-service/CheckRoomService';
import { CheckRoomController } from 'lib/backend/game/socket/CheckRoomController';
import { LeaveRoomService } from 'lib/backend/game/app-service/LeaveRoomService';
import { LeaveRoomController } from 'lib/backend/game/socket/LeaveRoomController';
import { StartGameService } from 'lib/backend/game/app-service/StartGameService';
import { StartGameController } from 'lib/backend/game/socket/StartGameController';
import { ChoosePlayerCharacterService } from 'lib/backend/game/app-service/ChoosePlayerCharacterService';
import { DoAllPlayersHaveCharacterService } from 'lib/backend/game/app-service/DoAllPlayersHaveCharacterService';
import { ChoosePlayerCharacterController } from 'lib/backend/game/socket/ChoosePlayerCharacterController';
import { LaunchNewRoundService } from 'lib/backend/game/app-service/LaunchNewRoundService';
import { AskQuestionService } from 'lib/backend/game/app-service/AskQuestionService';
import { AskQuestionController } from 'lib/backend/game/socket/AskQuestionController';
import { TryGuessService } from 'lib/backend/game/app-service/TryGuessService';
import { TryGuessController } from 'lib/backend/game/socket/TryGuessController';
import { DoAllPlayersAttemptedService } from 'lib/backend/game/app-service/DoAllPlayersAttemptedService';
import { AnswerAttemptService } from 'lib/backend/game/app-service/AnswerAttemptService';
import { AnswerAdapter } from 'lib/backend/game/socket/adapters/AnswerAdapter';
import { AnswerAttemptController } from 'lib/backend/game/socket/AnswerAttemptController';
import { DoAllPlayersAnsweredService } from 'lib/backend/game/app-service/DoAllPlayersAnsweredService';
import { AttemptAdapter } from 'lib/backend/game/socket/adapters/AttemptAdapter';
import { ContinueToNextRoundService } from 'lib/backend/game/app-service/ContinueToNextRoundService';
import { ContinueToNextRoundController } from 'lib/backend/game/socket/ContinueToNextRoundController';
import { DoAllPlayersWantToContinueToNextRoundService } from 'lib/backend/game/app-service/DoAllPlayersWantToContinueToNextRoundService';
import { DoPlayersWonService } from 'lib/backend/game/app-service/DoPlayersWonService';
import { DeleteRoomService } from 'lib/backend/game/app-service/DeleteRoomService';
import { GetPlayerService } from 'lib/backend/game/app-service/GetPlayerService';

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

  const io: CustomServer = new IOServer<ClientToServerEvents, ServerToClientEvents>(res.socket.server);

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
  const getPlayerService = new GetPlayerService(inMemoryGameRooms);
  const leaveRoomController = new LeaveRoomController(leaveRoomService, getPlayerService);
  leaveRoomController.leaveRoom(io);

  const startGameService = new StartGameService(inMemoryGameRooms);
  const startGameController = new StartGameController(startGameService);
  startGameController.startGame(io);

  const choosePlayerCharacterService = new ChoosePlayerCharacterService(inMemoryGameRooms);
  const doAllPlayersHaveCharacterService = new DoAllPlayersHaveCharacterService(inMemoryGameRooms);
  const launchNewRoundService = new LaunchNewRoundService(inMemoryGameRooms);
  const choosePlayerCharacterController = new ChoosePlayerCharacterController(
    choosePlayerCharacterService,
    doAllPlayersHaveCharacterService,
    launchNewRoundService
  );
  choosePlayerCharacterController.choosePlayerCharacter(io);

  const doAllPlayersAttemptedService = new DoAllPlayersAttemptedService(inMemoryGameRooms);
  const attemptAdapter = new AttemptAdapter();

  const askQuestionService = new AskQuestionService(inMemoryGameRooms);
  const askQuestionController = new AskQuestionController(
    askQuestionService,
    doAllPlayersAttemptedService,
    attemptAdapter
  );
  askQuestionController.askQuestion(io);

  const tryGuessService = new TryGuessService(inMemoryGameRooms);
  const tryGuessController = new TryGuessController(tryGuessService, doAllPlayersAttemptedService, attemptAdapter);
  tryGuessController.tryGuess(io);

  const answerAttemptService = new AnswerAttemptService(inMemoryGameRooms);
  const doAllPlayersAnsweredService = new DoAllPlayersAnsweredService(inMemoryGameRooms);
  const doPlayersWonService = new DoPlayersWonService(inMemoryGameRooms);
  const answerAdapter = new AnswerAdapter();
  const deleteRoomService = new DeleteRoomService(inMemoryGameRooms);
  const answerAttemptController = new AnswerAttemptController(
    answerAttemptService,
    doAllPlayersAnsweredService,
    doPlayersWonService,
    answerAdapter,
    attemptAdapter,
    checkRoomService,
    deleteRoomService
  );
  answerAttemptController.answerAttempt(io);

  const continueToNextRoundService = new ContinueToNextRoundService(inMemoryGameRooms);
  const doAllPlayersWantToContinueToNextRoundService = new DoAllPlayersWantToContinueToNextRoundService(
    inMemoryGameRooms
  );
  const continueToNextRoundController = new ContinueToNextRoundController(
    continueToNextRoundService,
    doAllPlayersWantToContinueToNextRoundService,
    launchNewRoundService
  );
  continueToNextRoundController.continueToNextRound(io);

  res.end();
}
