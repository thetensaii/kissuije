import { StartGameService } from '../app-service/StartGameService';
import { CustomServer } from './socketTypes';

export class StartGameController {
  private startGameService: StartGameService;

  constructor(startGameService: StartGameService) {
    this.startGameService = startGameService;
  }

  public startGame(io: CustomServer): void {
    io.on('connection', (socket) => {
      socket.on('startGame', ({ roomId }) => {
        try {
          const whoPickCharacterForWho = this.startGameService.startGame(roomId);

          for (const [playerId, targetId] of Object.entries(whoPickCharacterForWho)) {
            if (playerId === socket.id) {
              socket.emit('choosePlayerCharacter', { id: targetId });
              continue;
            }

            socket.to(playerId).emit('choosePlayerCharacter', { id: targetId });
          }
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
