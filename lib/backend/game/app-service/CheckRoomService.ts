import { GameRoom as DomainGameRoom } from '../domain/GameRoom';
import { GameRooms as DomainGameRooms } from '../domain/GameRooms';

export class CheckRoomService {
  private gameRooms: DomainGameRooms;
  constructor(gameRooms: DomainGameRooms) {
    this.gameRooms = gameRooms;
  }

  public doesRoomExist(roomId: DomainGameRoom['id']): boolean {
    return this.gameRooms.doesRoomExist(roomId);
  }
}
