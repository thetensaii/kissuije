import { AnswerQuestionService } from '../app-service/AnswerQuestionService';
import { AnswerAdapter } from './adapters/AnswerAdapter';
import { CustomServer } from './socketTypes';

export class AnswerQuestionController {
  private answerQuestionService: AnswerQuestionService;
  private answerAdapter: AnswerAdapter;
  constructor(answerQuestionService: AnswerQuestionService, answerAdapter: AnswerAdapter) {
    this.answerQuestionService = answerQuestionService;
    this.answerAdapter = answerAdapter;
  }

  public answerQuestion(io: CustomServer): void {
    io.on('connection', (socket) => {
      socket.on('answerQuestion', (answer) => {
        const roomId = socket.data.joinedRoom ?? '';

        const domainAnswer = this.answerAdapter.toDomain(answer);

        this.answerQuestionService.answerQuestion(roomId, domainAnswer);

        socket.broadcast.to(roomId).emit('newAnswer', answer);
        socket.emit('newAnswer', answer);
      });
    });
  }
}
