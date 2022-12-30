import { GameRoom as DomainGameRoom } from '../domain/GameRoom';
import { GameRooms as DomainGameRooms } from '../domain/GameRooms';

export class DoAllPlayersHaveCharacterService {
  private gameRooms: DomainGameRooms;
  constructor(gameRooms: DomainGameRooms) {
    this.gameRooms = gameRooms;
  }

  public doAllPlayersHaveCharacter(roomId: DomainGameRoom['id']): boolean {
    return this.gameRooms.doAllPlayersHaveCharacter(roomId);
  }
}
