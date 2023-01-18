import { SocketAttemptType } from 'lib/common/socketsTypes';
import { AskQuestionService } from '../app-service/AskQuestionService';
import { DoAllPlayersAttemptedService } from '../app-service/DoAllPlayersAttemptedService';
import { AttemptAdapter } from './adapters/AttemptAdapter';
import { CustomServer } from './socketTypes';

export class AskQuestionController {
  private askQuestionService: AskQuestionService;
  private doAllPlayersAttemptedService: DoAllPlayersAttemptedService;
  private attemptAdapter: AttemptAdapter;

  constructor(
    askQuestionService: AskQuestionService,
    doAllPlayersAttemptedService: DoAllPlayersAttemptedService,
    attemptAdapter: AttemptAdapter
  ) {
    this.askQuestionService = askQuestionService;
    this.doAllPlayersAttemptedService = doAllPlayersAttemptedService;
    this.attemptAdapter = attemptAdapter;
  }

  public askQuestion(io: CustomServer): void {
    io.on('connection', (socket) => {
      socket.on('askQuestion', (roomId, text) => {
        const playerId = socket.id;

        this.askQuestionService.askQuestion(roomId, playerId, text);

        socket.emit('playerAttempted', socket.id);
        socket.to(roomId).emit('playerAttempted', socket.id);

        const allPlayersAttempted = this.doAllPlayersAttemptedService.doAllPlayersAttempted(roomId);
        if (!allPlayersAttempted) return;

        const socketPlayersAttempt = allPlayersAttempted
          .getAllAttempts()
          .map<SocketAttemptType>(this.attemptAdapter.toSocket);

        socket.emit('allPlayersAttempted', socketPlayersAttempt);
        socket.to(roomId).emit('allPlayersAttempted', socketPlayersAttempt);
      });
    });
  }
}
