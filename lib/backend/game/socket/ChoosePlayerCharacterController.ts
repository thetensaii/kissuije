import { ChoosePlayerCharacterService } from '../app-service/ChoosePlayerCharacterService';
import { DoAllPlayersHaveCharacterService } from '../app-service/DoAllPlayersHaveCharacterService';
import { StartGameService } from '../app-service/StartGameService';
import { CustomServer } from './socketTypes';

export class ChoosePlayerCharacterController {
  private choosePlayerCharacterService: ChoosePlayerCharacterService;
  private doAllPlayersHaveCharacterService: DoAllPlayersHaveCharacterService;
  private startGameService: StartGameService;
  constructor(
    choosePlayerCharacterService: ChoosePlayerCharacterService,
    doAllPlayersHaveCharacterService: DoAllPlayersHaveCharacterService,
    startGameService: StartGameService
  ) {
    this.choosePlayerCharacterService = choosePlayerCharacterService;
    this.doAllPlayersHaveCharacterService = doAllPlayersHaveCharacterService;
    this.startGameService = startGameService;
  }

  public choosePlayerCharacter(io: CustomServer): void {
    io.on('connection', (socket) => {
      socket.on('choosePlayerCharacter', (targetId, character) => {
        const roomId = socket.data.joinedRoom ?? '';

        const updatedPlayer = this.choosePlayerCharacterService.choosePlayerCharacter(roomId, targetId, character);
        socket.broadcast.to(roomId).emit('updatePlayerCharacter', targetId, updatedPlayer.character);

        // TODO : checker si
        const doAllPlayersHaveCharacter = this.doAllPlayersHaveCharacterService.doAllPlayersHaveCharacter(roomId);
        if (!doAllPlayersHaveCharacter) return;

        const playersInGameOrder = this.startGameService.startGame(roomId);

        socket.to(roomId).emit('launchGame', playersInGameOrder);
        socket.emit('launchGame', playersInGameOrder);
      });
    });
  }
}
