import { AnswerQuestionService } from '../app-service/AnswerQuestionService';
import { DoEverybodyAnsweredService } from '../app-service/DoEverybodyAnsweredService';
import { AnswerAdapter } from './adapters/AnswerAdapter';
import { CustomServer } from './socketTypes';

export class AnswerQuestionController {
  private answerQuestionService: AnswerQuestionService;
  private doEverybodyAnsweredService: DoEverybodyAnsweredService;
  private answerAdapter: AnswerAdapter;
  constructor(
    answerQuestionService: AnswerQuestionService,
    doEverybodyAnsweredService: DoEverybodyAnsweredService,
    answerAdapter: AnswerAdapter
  ) {
    this.answerQuestionService = answerQuestionService;
    this.doEverybodyAnsweredService = doEverybodyAnsweredService;
    this.answerAdapter = answerAdapter;
  }

  public answerQuestion(io: CustomServer): void {
    io.on('connection', (socket) => {
      socket.on('answerQuestion', (answer) => {
        const roomId = socket.data.joinedRoom ?? '';

        const domainAnswer = this.answerAdapter.toDomain(answer);

        this.answerQuestionService.answerQuestion(roomId, domainAnswer);

        const everybodyAnswered = this.doEverybodyAnsweredService.doEverybodyAnswered(roomId);

        socket.broadcast.to(roomId).emit('newAnswer', answer);
        socket.emit('newAnswer', answer);

        if (everybodyAnswered) {
          socket.broadcast.to(roomId).emit('everybodyAnswered');
          socket.emit('everybodyAnswered');
        }
      });
    });
  }
}
