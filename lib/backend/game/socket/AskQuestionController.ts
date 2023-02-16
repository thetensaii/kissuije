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
      socket.on('askQuestion', ({ roomId, text }, cb) => {
        try {
          const playerId = socket.id;

          this.askQuestionService.askQuestion(roomId, playerId, text);

          io.to(roomId).emit('playerAttempted', { playerId });
          cb();

          const allPlayersAttempted = this.doAllPlayersAttemptedService.doAllPlayersAttempted(roomId);
          if (!allPlayersAttempted) return;

          const socketPlayersAttempt = allPlayersAttempted
            .getAllAttempts()
            .map<SocketAttemptType>(this.attemptAdapter.toSocket);

          io.to(roomId).emit('allPlayersAttempted', { attempts: socketPlayersAttempt });
        } catch (error) {
          if (error instanceof Error) {
            // eslint-disable-next-line no-console
            console.error(error.message);
          }
        }
      });
    });
  }
}
