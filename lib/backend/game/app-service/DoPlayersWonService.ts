import { GameRoom as DomainGameRoom } from '../domain/GameRoom';
import { GameRooms as DomainGameRooms } from '../domain/GameRooms';
import { Player as DomainPlayer } from '../domain/Player';

export class DoPlayersWonService {
  private gameRooms: DomainGameRooms;
  constructor(gameRooms: DomainGameRooms) {
    this.gameRooms = gameRooms;
  }

  public doPlayersWon(roomId: DomainGameRoom['id']): false | DomainPlayer['id'][] {
    return this.gameRooms.doPlayersWon(roomId);
  }
}
