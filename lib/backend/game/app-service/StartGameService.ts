import { GameRoom as DomainGameRoom } from '../domain/GameRoom';
import { GameRooms as DomainGameRooms } from '../domain/GameRooms';
import { Player as DomainPlayer } from '../domain/Player';

export class StartGameService {
  private gameRooms: DomainGameRooms;
  constructor(gameRooms: DomainGameRooms) {
    this.gameRooms = gameRooms;
  }

  public startGame(roomId: DomainGameRoom['id']): DomainPlayer[] {
    const players = this.gameRooms.startGame(roomId);

    return players;
  }
}
