import { TryGuessService } from '../app-service/TryGuessService';
import { CustomServer } from './socketTypes';

export class TryGuessController {
  private tryGuessService: TryGuessService;

  constructor(tryGuessService: TryGuessService) {
    this.tryGuessService = tryGuessService;
  }

  public tryGuess(io: CustomServer): void {
    io.on('connection', (socket) => {
      socket.on('tryGuess', (text) => {
        const roomId = socket.data.joinedRoom ?? '';
        const playerId = socket.id;

        this.tryGuessService.tryGuess(roomId, playerId, text);

        socket.emit('playerAttempted', socket.id);
        socket.to(roomId).emit('playerAttempted', socket.id);
      });
    });
  }
}
