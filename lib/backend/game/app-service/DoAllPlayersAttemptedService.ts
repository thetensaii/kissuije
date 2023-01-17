import { Attempts as DomainAttempts } from '../domain/Attempts';
import { GameRoom as DomainGameRoom } from '../domain/GameRoom';
import { GameRooms as DomainGameRooms } from '../domain/GameRooms';

export class DoAllPlayersAttemptedService {
  private gameRooms: DomainGameRooms;
  constructor(gameRooms: DomainGameRooms) {
    this.gameRooms = gameRooms;
  }

  public doAllPlayersAttempted(roomId: DomainGameRoom['id']): false | DomainAttempts {
    return this.gameRooms.doAllPlayersAttempted(roomId);
  }
}
