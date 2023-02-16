import { SocketAttemptType } from 'lib/common/socketsTypes';
import { DoAllPlayersAttemptedService } from '../app-service/DoAllPlayersAttemptedService';
import { TryGuessService } from '../app-service/TryGuessService';
import { AttemptAdapter } from './adapters/AttemptAdapter';
import { CustomServer } from './socketTypes';

export class TryGuessController {
  private tryGuessService: TryGuessService;
  private doAllPlayersAttemptedService: DoAllPlayersAttemptedService;
  private attemptAdapter: AttemptAdapter;

  constructor(
    tryGuessService: TryGuessService,
    doAllPlayersAttemptedService: DoAllPlayersAttemptedService,
    attemptAdapter: AttemptAdapter
  ) {
    this.tryGuessService = tryGuessService;
    this.doAllPlayersAttemptedService = doAllPlayersAttemptedService;
    this.attemptAdapter = attemptAdapter;
  }

  public tryGuess(io: CustomServer): void {
    io.on('connection', (socket) => {
      socket.on('tryGuess', ({ roomId, text }, cb) => {
        try {
          const playerId = socket.id;

          this.tryGuessService.tryGuess(roomId, playerId, text);

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
