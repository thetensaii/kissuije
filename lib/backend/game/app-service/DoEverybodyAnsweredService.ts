import { GameRoom as DomainGameRoom } from '../domain/GameRoom';
import { GameRooms as DomainGameRooms } from '../domain/GameRooms';

export class DoEverybodyAnsweredService {
  private gameRooms: DomainGameRooms;
  constructor(gameRooms: DomainGameRooms) {
    this.gameRooms = gameRooms;
  }

  public doEverybodyAnswered(roomId: DomainGameRoom['id']): boolean {
    return this.gameRooms.doEverybodyAnswered(roomId);
  }
}
