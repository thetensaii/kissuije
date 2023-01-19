import { GameRoom as DomainGameRoom } from '../domain/GameRoom';
import { GameRooms as DomainGameRooms } from '../domain/GameRooms';
export class DeleteRoomService {
  private gameRooms: DomainGameRooms;
  constructor(gameRooms: DomainGameRooms) {
    this.gameRooms = gameRooms;
  }

  public deleteRoom(roomId: DomainGameRoom['id']): void {
    this.gameRooms.deleteRoom(roomId);
  }
}
