import { GameRoom as DomainGameRoom } from '../domain/GameRoom';
import { GameRooms as DomainGameRooms } from '../domain/GameRooms';
import { GameState as DomainGameState } from '../domain/GameState';

export class CheckRoomService {
  private gameRooms: DomainGameRooms;
  constructor(gameRooms: DomainGameRooms) {
    this.gameRooms = gameRooms;
  }

  public doesRoomExist(roomId: DomainGameRoom['id']): boolean {
    return this.gameRooms.doesRoomExist(roomId);
  }

  public getRoomGameState(roomId: DomainGameRoom['id']): DomainGameState {
    return this.gameRooms.getRoomGameState(roomId);
  }
}
