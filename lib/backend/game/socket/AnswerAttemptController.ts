import { AnswerAttemptService } from '../app-service/AnswerAttemptService';
import { DoAllPlayersAnsweredService } from '../app-service/DoAllPlayersAnsweredService';
import { AnswerAdapter } from './adapters/AnswerAdapter';
import { CustomServer } from './socketTypes';

export class AnswerAttemptController {
  private answerAttemptService: AnswerAttemptService;
  private doAllPlayersAnsweredService: DoAllPlayersAnsweredService;
  private answerAdapter: AnswerAdapter;

  constructor(
    answerAttemptService: AnswerAttemptService,
    doAllPlayersAnsweredService: DoAllPlayersAnsweredService,
    answerAdapter: AnswerAdapter
  ) {
    this.answerAttemptService = answerAttemptService;
    this.doAllPlayersAnsweredService = doAllPlayersAnsweredService;
    this.answerAdapter = answerAdapter;
  }

  public answerAttempt(io: CustomServer): void {
    io.on('connection', (socket) => {
      socket.on('answerAttempt', (roomId, askerId, socketAnswer, cb) => {
        const answer = this.answerAdapter.toDomain(socketAnswer);

        this.answerAttemptService.answerAttempt(roomId, askerId, answer);

        cb();

        const attempts = this.doAllPlayersAnsweredService.doAllPlayersAnswered(roomId);
        if (!attempts) return;
        const playerId = socket.id;
        attempts.getAllAttempts().forEach((attempt) => {
          if (attempt.askerId === playerId) {
            socket.emit('allPlayersAnswered', attempt);
            return;
          }
          socket.to(attempt.askerId).emit('allPlayersAnswered', attempt);
        });
      });
    });
  }
}
