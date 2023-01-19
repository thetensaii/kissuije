import { GameRoom as DomainGameRoom } from '../domain/GameRoom';
import { GameRooms as DomainGameRooms } from '../domain/GameRooms';
import { Player as DomainPlayer } from '../domain/Player';

export class ContinueToNextRoundService {
  private gameRooms: DomainGameRooms;
  constructor(gameRooms: DomainGameRooms) {
    this.gameRooms = gameRooms;
  }

  public continueToNextRound(roomId: DomainGameRoom['id'], playerId: DomainPlayer['id']): void {
    return this.gameRooms.continueToNextRound(roomId, playerId);
  }
}
