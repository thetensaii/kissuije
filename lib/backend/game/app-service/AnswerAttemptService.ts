import { Answer as DomainAnswer } from '../domain/Answer';
import { GameRoom as DomainGameRoom } from '../domain/GameRoom';
import { GameRooms as DomainGameRooms } from '../domain/GameRooms';
import { Player as DomainPlayer } from '../domain/Player';

export class AnswerAttemptService {
  private gameRooms: DomainGameRooms;
  constructor(gameRooms: DomainGameRooms) {
    this.gameRooms = gameRooms;
  }

  public answerAttempt(roomId: DomainGameRoom['id'], askerId: DomainPlayer['id'], answer: DomainAnswer): void {
    this.gameRooms.answerAttempt(roomId, askerId, answer);
  }
}
