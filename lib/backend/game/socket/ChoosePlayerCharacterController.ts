import { ChoosePlayerCharacterService } from '../app-service/ChoosePlayerCharacterService';
import { DoAllPlayersHaveCharacterService } from '../app-service/DoAllPlayersHaveCharacterService';
import { CustomServer } from './socketTypes';

export class ChoosePlayerCharacterController {
  private choosePlayerCharacterService: ChoosePlayerCharacterService;
  private doAllPlayersHaveCharacterService: DoAllPlayersHaveCharacterService;
  constructor(
    choosePlayerCharacterService: ChoosePlayerCharacterService,
    doAllPlayersHaveCharacterService: DoAllPlayersHaveCharacterService
  ) {
    this.choosePlayerCharacterService = choosePlayerCharacterService;
    this.doAllPlayersHaveCharacterService = doAllPlayersHaveCharacterService;
  }

  public choosePlayerCharacter(io: CustomServer): void {
    io.on('connection', (socket) => {
      socket.on('choosePlayerCharacter', (targetId, character) => {
        const roomId = socket.data.joinedRoom ?? '';

        const updatedPlayer = this.choosePlayerCharacterService.choosePlayerCharacter(roomId, targetId, character);
        socket.broadcast.to(roomId).emit('updatePlayerCharacter', targetId, updatedPlayer.character);

        const doAllPlayersHaveCharacter = this.doAllPlayersHaveCharacterService.doAllPlayersHaveCharacter(roomId);
        if (!doAllPlayersHaveCharacter) return;
      });
    });
  }
}
