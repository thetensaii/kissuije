import { GameRoom as DomainGameRoom } from '../domain/GameRoom';
import { GameRooms as DomainGameRooms } from '../domain/GameRooms';

export class DoAllPlayersWantToContinueToNextRoundService {
  private gameRooms: DomainGameRooms;
  constructor(gameRooms: DomainGameRooms) {
    this.gameRooms = gameRooms;
  }

  public doAllPlayersWantToContinueToNextRound(roomId: DomainGameRoom['id']): boolean {
    return this.gameRooms.doAllPlayersWantToContinueToNextRound(roomId);
  }
}
