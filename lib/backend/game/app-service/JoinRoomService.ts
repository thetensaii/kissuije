import { GameRoom as DomainGameRoom } from '../domain/GameRoom';
import { GameRooms as DomainGameRooms } from '../domain/GameRooms';
import { Player as DomainPlayer } from '../domain/Player';

export class JoinRoomService {
  private gameRooms: DomainGameRooms;
  constructor(gameRooms: DomainGameRooms) {
    this.gameRooms = gameRooms;
  }

  public joinRoom(
    roomId: DomainGameRoom['id'],
    playerId: DomainPlayer['id'],
    name: DomainPlayer['name'],
    avatar: DomainPlayer['avatar']
  ): { players: DomainPlayer[]; player: DomainPlayer; ownerId: DomainGameRoom['ownerId'] } {
    const player = new DomainPlayer(playerId, name, avatar);

    const joinedRoom = this.gameRooms.joinRoom(roomId, player);
    const players = joinedRoom.getPlayers();

    return {
      ownerId: joinedRoom.getOwnerId(),
      player,
      players: players.getAll(),
    };
  }
}
