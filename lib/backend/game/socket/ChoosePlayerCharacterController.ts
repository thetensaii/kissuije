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
      socket.on('choosePlayerCharacter', (targetId, character) => {
        const roomId = socket.data.joinedRoom ?? '';

        const updatedPlayer = this.choosePlayerCharacterService.choosePlayerCharacter(roomId, targetId, character);
        socket.broadcast.to(roomId).emit('updatePlayerCharacter', targetId, updatedPlayer.character);

        const doAllPlayersHaveCharacter = this.doAllPlayersHaveCharacterService.doAllPlayersHaveCharacter(roomId);
        if (!doAllPlayersHaveCharacter) return;

        this.launchNewRoundService.launchNewRound(roomId);
        socket.emit('launchFirstRound');
        socket.to(roomId).emit('launchFirstRound');

        // ---------------- THIS CODE WILL BE USED BY ANOTHER CONTROLLER
        // const roundNumber = this.launchNewRoundService.launchNewRound(roomId);
        // socket.emit('newRound', roundNumber);
        // socket.to(roomId).emit('newRound', roundNumber);
      });
    });
  }
}
