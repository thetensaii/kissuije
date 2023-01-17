import { Attempt } from '../domain/Attempt';
import { GameRoom as DomainGameRoom } from '../domain/GameRoom';
import { GameRooms as DomainGameRooms } from '../domain/GameRooms';

export class DoAllPlayersAttemptedService {
  private gameRooms: DomainGameRooms;
  constructor(gameRooms: DomainGameRooms) {
    this.gameRooms = gameRooms;
  }

  public doAllPlayersAttempted(roomId: DomainGameRoom['id']): false | Attempt[] {
    return this.gameRooms.doAllPlayersAttempted(roomId);
  }
}
