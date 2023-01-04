import { AskQuestionService } from '../app-service/AskQuestionService';
import { CustomServer } from './socketTypes';

export class AskQuestionController {
  private askQuestionService: AskQuestionService;
  constructor(askQuestionService: AskQuestionService) {
    this.askQuestionService = askQuestionService;
  }

  public askQuestion(io: CustomServer): void {
    io.on('connection', (socket) => {
      socket.on('askQuestion', (question) => {
        const roomId = socket.data.joinedRoom ?? '';

        const newQuestion = this.askQuestionService.askQuestion(roomId, socket.id, question);

        socket.broadcast.to(roomId).emit('newQuestionAsked', newQuestion.text);
        socket.emit('newQuestionAsked', newQuestion.text);
      });
    });
  }
}
