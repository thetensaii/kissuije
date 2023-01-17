import { SocketAttemptType } from 'lib/common/socketsTypes';
import { DoAllPlayersAttemptedService } from '../app-service/DoAllPlayersAttemptedService';
import { TryGuessService } from '../app-service/TryGuessService';
import { CustomServer } from './socketTypes';

export class TryGuessController {
  private tryGuessService: TryGuessService;
  private doAllPlayersAttemptedService: DoAllPlayersAttemptedService;

  constructor(tryGuessService: TryGuessService, doAllPlayersAttemptedService: DoAllPlayersAttemptedService) {
    this.tryGuessService = tryGuessService;
    this.doAllPlayersAttemptedService = doAllPlayersAttemptedService;
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

        const socketPlayersAttempt = allPlayersAttempted.getAllAttempts().map<SocketAttemptType>((a) => ({
          type: a.type,
          askerId: a.askerId,
          text: a.text,
        }));

        socket.emit('allPlayersAttempted', socketPlayersAttempt);
        socket.to(roomId).emit('allPlayersAttempted', socketPlayersAttempt);
      });
    });
  }
}
