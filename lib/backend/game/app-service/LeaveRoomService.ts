import { GameRoom as DomainGameRoom } from '../domain/GameRoom';
import { GameRooms as DomainGameRooms } from '../domain/GameRooms';
import { Player as DomainPlayer } from '../domain/Player';

export class LeaveRoomService {
  private gameRooms: DomainGameRooms;
  constructor(gameRooms: DomainGameRooms) {
    this.gameRooms = gameRooms;
  }

  public leaveRoom(roomId: DomainGameRoom['id'], playerId: DomainPlayer['id']): DomainGameRoom {
    return this.gameRooms.leaveRoom(roomId, playerId);
  }
}
