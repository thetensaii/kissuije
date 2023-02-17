import { CheckRoomService } from '../app-service/CheckRoomService';
import { ChoosePlayerCharacterService } from '../app-service/ChoosePlayerCharacterService';
import { GameState } from '../domain/GameState';
import { CustomServer } from './socketTypes';

export class ChoosePlayerCharacterController {
  private choosePlayerCharacterService: ChoosePlayerCharacterService;
  private checkRoomService: CheckRoomService;

  constructor(choosePlayerCharacterService: ChoosePlayerCharacterService, checkRoomService: CheckRoomService) {
    this.choosePlayerCharacterService = choosePlayerCharacterService;
    this.checkRoomService = checkRoomService;
  }

  public choosePlayerCharacter(io: CustomServer): void {
    io.on('connection', (socket) => {
      socket.on('choosePlayerCharacter', ({ roomId, targetId, character }) => {
        try {
          const updatedPlayer = this.choosePlayerCharacterService.choosePlayerCharacter(roomId, targetId, character);
          socket.broadcast
            .to(roomId)
            .emit('updatePlayerCharacter', { id: targetId, character: updatedPlayer.character });

          const gameState = this.checkRoomService.getRoomGameState(roomId);

          if (gameState === GameState.ATTEMPTING) io.to(roomId).emit('newRound', { roundNumber: 1 });
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
