import { AnswerAttemptService } from '../app-service/AnswerAttemptService';
import { DoAllPlayersAnsweredService } from '../app-service/DoAllPlayersAnsweredService';
import { AnswerAdapter } from './adapters/AnswerAdapter';
import { AttemptAdapter } from './adapters/AttemptAdapter';
import { CustomServer } from './socketTypes';

export class AnswerAttemptController {
  private answerAttemptService: AnswerAttemptService;
  private doAllPlayersAnsweredService: DoAllPlayersAnsweredService;
  private answerAdapter: AnswerAdapter;
  private attemptAdapter: AttemptAdapter;

  constructor(
    answerAttemptService: AnswerAttemptService,
    doAllPlayersAnsweredService: DoAllPlayersAnsweredService,
    answerAdapter: AnswerAdapter,
    attemptAdapter: AttemptAdapter
  ) {
    this.answerAttemptService = answerAttemptService;
    this.doAllPlayersAnsweredService = doAllPlayersAnsweredService;
    this.answerAdapter = answerAdapter;
    this.attemptAdapter = attemptAdapter;
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
          const socketAttempt = this.attemptAdapter.toSocket(attempt);
          if (socketAttempt.askerId === playerId) {
            socket.emit('allPlayersAnswered', socketAttempt);
            return;
          }
          socket.to(socketAttempt.askerId).emit('allPlayersAnswered', socketAttempt);
        });
      });
    });
  }
}
