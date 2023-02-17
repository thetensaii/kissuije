import { GameRoom as DomainGameRoom } from '../domain/GameRoom';
import { GameRooms as DomainGameRooms } from '../domain/GameRooms';
import { PlayerBindToPlayerType as DomainPlayerBindToPlayerType } from '../domain/Players';

export class StartGameService {
  private gameRooms: DomainGameRooms;
  constructor(gameRooms: DomainGameRooms) {
    this.gameRooms = gameRooms;
  }

  public startGame(roomId: DomainGameRoom['id']): DomainPlayerBindToPlayerType {
    return this.gameRooms.startGame(roomId);
  }
}
