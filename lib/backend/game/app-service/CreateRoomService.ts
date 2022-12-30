import { GameRoom as DomainGameRoom } from '../domain/GameRoom';
import { GameRooms as DomainGameRooms } from '../domain/GameRooms';
import { Player as DomainPlayer } from '../domain/Player';

export class CreateRoomService {
  private gameRooms: DomainGameRooms;
  constructor(gameRooms: DomainGameRooms) {
    this.gameRooms = gameRooms;
  }

  public createRoom(
    roomId: DomainGameRoom['id'],
    playerId: DomainPlayer['name'],
    name: DomainPlayer['id']
  ): DomainPlayer {
    const owner = new DomainPlayer(playerId, name, true);

    this.gameRooms.createRoom(roomId, owner);

    return owner;
  }
}
