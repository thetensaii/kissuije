import { ChoosePlayerCharacterService } from '../app-service/ChoosePlayerCharacterService';
import { DoAllPlayersHaveCharacterService } from '../app-service/DoAllPlayersHaveCharacterService';
import { LaunchNewRoundService } from '../app-service/LaunchNewRoundService';
import { CustomServer } from './socketTypes';

export class ChoosePlayerCharacterController {
  private choosePlayerCharacterService: ChoosePlayerCharacterService;
  private doAllPlayersHaveCharacterService: DoAllPlayersHaveCharacterService;
  private launchNewRoundService: LaunchNewRoundService;
  constructor(
    choosePlayerCharacterService: ChoosePlayerCharacterService,
    doAllPlayersHaveCharacterService: DoAllPlayersHaveCharacterService,
    launchNewRoundService: LaunchNewRoundService
  ) {
    this.choosePlayerCharacterService = choosePlayerCharacterService;
    this.doAllPlayersHaveCharacterService = doAllPlayersHaveCharacterService;
    this.launchNewRoundService = launchNewRoundService;
  }

  public choosePlayerCharacter(io: CustomServer): void {
    io.on('connection', (socket) => {
      socket.on('choosePlayerCharacter', ({ roomId, targetId, character }) => {
        try {
          const updatedPlayer = this.choosePlayerCharacterService.choosePlayerCharacter(roomId, targetId, character);
          socket.broadcast
            .to(roomId)
            .emit('updatePlayerCharacter', { id: targetId, character: updatedPlayer.character });

          const doAllPlayersHaveCharacter = this.doAllPlayersHaveCharacterService.doAllPlayersHaveCharacter(roomId);
          if (!doAllPlayersHaveCharacter) return;

          this.launchNewRoundService.launchNewRound(roomId);
          io.to(roomId).emit('launchFirstRound');
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
