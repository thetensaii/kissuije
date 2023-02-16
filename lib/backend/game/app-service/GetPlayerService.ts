import { GameRoom as DomainGameRoom } from '../domain/GameRoom';
import { GameRooms as DomainGameRooms } from '../domain/GameRooms';
import { Player as DomainPlayer } from '../domain/Player';

export class GetPlayerService {
  private gameRooms: DomainGameRooms;
  constructor(gameRooms: DomainGameRooms) {
    this.gameRooms = gameRooms;
  }

  public getPlayer(roomId: DomainGameRoom['id'], playerId: DomainPlayer['id']): DomainPlayer {
    return this.gameRooms.getPlayer(roomId, playerId);
  }
}
