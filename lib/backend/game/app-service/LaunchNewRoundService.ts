import { GameRoom as DomainGameRoom } from '../domain/GameRoom';
import { GameRooms as DomainGameRooms } from '../domain/GameRooms';

export class LaunchNewRoundService {
  private gameRooms: DomainGameRooms;
  constructor(gameRooms: DomainGameRooms) {
    this.gameRooms = gameRooms;
  }

  public launchNewRound(roomId: DomainGameRoom['id']): NonNullable<DomainGameRoom['actualRound']> {
    const roundNumber = this.gameRooms.launchNewRound(roomId);

    return roundNumber;
  }
}
