import { AnswerAttemptService } from '../app-service/AnswerAttemptService';
import { AnswerAdapter } from './adapters/AnswerAdapter';
import { CustomServer } from './socketTypes';

export class AnswerAttemptController {
  private answerAttemptService: AnswerAttemptService;
  private answerAdapter: AnswerAdapter;

  constructor(answerAttemptService: AnswerAttemptService, answerAdapter: AnswerAdapter) {
    this.answerAttemptService = answerAttemptService;
    this.answerAdapter = answerAdapter;
  }

  public answerAttempt(io: CustomServer): void {
    io.on('connection', (socket) => {
      socket.on('answerAttempt', (roomId, askerId, socketAnswer, cb) => {
        const answer = this.answerAdapter.toDomain(socketAnswer);

        this.answerAttemptService.answerAttempt(roomId, askerId, answer);

        cb();
      });
    });
  }
}
