import { GameRoom as DomainGameRoom } from '../domain/GameRoom';
import { GameRooms as DomainGameRooms } from '../domain/GameRooms';
import { Guess as DomainGuess } from '../domain/Guess';
import { Player as DomainPlayer } from '../domain/Player';

export class TryGuessService {
  private gameRooms: DomainGameRooms;
  constructor(gameRooms: DomainGameRooms) {
    this.gameRooms = gameRooms;
  }

  public tryGuess(roomId: DomainGameRoom['id'], playerId: DomainPlayer['id'], text: DomainGuess['text']): void {
    this.gameRooms.tryGuess(roomId, playerId, text);
  }
}
