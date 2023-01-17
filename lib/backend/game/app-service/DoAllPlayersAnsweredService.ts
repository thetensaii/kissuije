import { Attempts as DomainAttempts } from '../domain/Attempts';
import { GameRoom as DomainGameRoom } from '../domain/GameRoom';
import { GameRooms as DomainGameRooms } from '../domain/GameRooms';

export class DoAllPlayersAnsweredService {
  private gameRooms: DomainGameRooms;
  constructor(gameRooms: DomainGameRooms) {
    this.gameRooms = gameRooms;
  }

  public doAllPlayersAnswered(roomId: DomainGameRoom['id']): false | DomainAttempts {
    return this.gameRooms.doAllPlayersAnswered(roomId);
  }
}
