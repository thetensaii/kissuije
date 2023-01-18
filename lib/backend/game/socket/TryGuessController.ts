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
      socket.on('tryGuess', (roomId, text) => {
        const playerId = socket.id;

        this.tryGuessService.tryGuess(roomId, playerId, text);

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
