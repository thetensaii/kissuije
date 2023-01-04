import { Attempt } from '../domain/Attempt';
import { GameRoom as DomainGameRoom } from '../domain/GameRoom';
import { GameRooms as DomainGameRooms } from '../domain/GameRooms';
import { Player as DomainPlayer } from '../domain/Player';

export class AskQuestionService {
  private gameRooms: DomainGameRooms;
  constructor(gameRooms: DomainGameRooms) {
    this.gameRooms = gameRooms;
  }

  public askQuestion(roomId: DomainGameRoom['id'], playerId: DomainPlayer['id'], question: string): Attempt {
    return this.gameRooms.askQuestion(roomId, playerId, question);
  }
}