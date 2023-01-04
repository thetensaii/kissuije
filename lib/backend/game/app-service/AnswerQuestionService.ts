import { Answer as DomainAnswer } from '../domain/Answer';
import { Attempt as DomainAttempt } from '../domain/Attempt';
import { GameRoom as DomainGameRoom } from '../domain/GameRoom';
import { GameRooms as DomainGameRooms } from '../domain/GameRooms';

export class AnswerQuestionService {
  private gameRooms: DomainGameRooms;
  constructor(gameRooms: DomainGameRooms) {
    this.gameRooms = gameRooms;
  }

  public answerQuestion(roomId: DomainGameRoom['id'], answer: DomainAnswer): DomainAttempt {
    return this.gameRooms.answerQuestion(roomId, answer);
  }
}
