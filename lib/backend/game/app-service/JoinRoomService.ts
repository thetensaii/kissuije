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
    name: DomainPlayer['name']
  ): { players: DomainPlayer[]; player: DomainPlayer } {
    const player = new DomainPlayer(playerId, name);

    const joinedRoom = this.gameRooms.joinRoom(roomId, player);
    const players = joinedRoom.getPlayers();

    return {
      player,
      players: players.getAll(),
    };
  }
}
