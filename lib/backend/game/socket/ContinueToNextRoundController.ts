import { ContinueToNextRoundService } from '../app-service/ContinueToNextRoundService';
import { DoAllPlayersWantToContinueToNextRoundService } from '../app-service/DoAllPlayersWantToContinueToNextRoundService';
import { LaunchNewRoundService } from '../app-service/LaunchNewRoundService';
import { CustomServer } from './socketTypes';

export class ContinueToNextRoundController {
  private continueToNextRoundService: ContinueToNextRoundService;
  private doAllPlayersWantToContinueToNextRoundService: DoAllPlayersWantToContinueToNextRoundService;
  private launchNewRoundService: LaunchNewRoundService;

  constructor(
    continueToNextRoundService: ContinueToNextRoundService,
    doAllPlayerdWantToContinueToNextRoundService: DoAllPlayersWantToContinueToNextRoundService,
    launchNewRoundService: LaunchNewRoundService
  ) {
    this.continueToNextRoundService = continueToNextRoundService;
    this.doAllPlayersWantToContinueToNextRoundService = doAllPlayerdWantToContinueToNextRoundService;
    this.launchNewRoundService = launchNewRoundService;
  }

  public continueToNextRound(io: CustomServer): void {
    io.on('connection', (socket) => {
      socket.on('continueToNextRound', (roomId, cb) => {
        const playerId = socket.id;
        this.continueToNextRoundService.continueToNextRound(roomId, playerId);
        cb();

        const everyPlayerWantsToContinueToNextRound =
          this.doAllPlayersWantToContinueToNextRoundService.doAllPlayersWantToContinueToNextRound(roomId);

        if (!everyPlayerWantsToContinueToNextRound) return;
        const newRoundNumber = this.launchNewRoundService.launchNewRound(roomId);

        socket.emit('newRound', newRoundNumber);
        socket.to(roomId).emit('newRound', newRoundNumber);
      });
    });
  }
}