import { StartPlayerCharacterSelectionService } from '../app-service/StartPlayerCharacterSelectionService';
import { CustomServer } from './socketTypes';

export class StartPlayerCharacterSelectionController {
  private startPlayerCharacterSelectionService: StartPlayerCharacterSelectionService;

  constructor(startPlayerCharacterSelectionService: StartPlayerCharacterSelectionService) {
    this.startPlayerCharacterSelectionService = startPlayerCharacterSelectionService;
  }

  public startPlayerCharacterSelection(io: CustomServer): void {
    io.on('connection', (socket) => {
      socket.on('startGame', (roomId) => {
        const whoPickCharacterForWho = this.startPlayerCharacterSelectionService.startPlayerCharacterSelection(roomId);

        for (const [playerId, targetId] of Object.entries(whoPickCharacterForWho)) {
          if (playerId === socket.id) {
            socket.emit('choosePlayerCharacter', targetId);
            continue;
          }

          socket.to(playerId).emit('choosePlayerCharacter', targetId);
        }
      });
    });
  }
}
