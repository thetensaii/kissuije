import { GameRoom as DomainGameRoom } from '../domain/GameRoom';
import { GameRooms as DomainGameRooms } from '../domain/GameRooms';
import { Player as DomainPlayer } from '../domain/Player';

export class ChoosePlayerCharacterService {
  private gameRooms: DomainGameRooms;
  constructor(gameRooms: DomainGameRooms) {
    this.gameRooms = gameRooms;
  }

  public choosePlayerCharacter(
    roomId: DomainGameRoom['id'],
    playerId: DomainPlayer['id'],
    character: DomainPlayer['character']
  ): DomainPlayer {
    return this.gameRooms.choosePlayerCharacter(roomId, playerId, character);
  }
}
