import { AskQuestionService } from '../app-service/AskQuestionService';
import { CustomServer } from './socketTypes';

export class AskQuestionController {
  private askQuestionService: AskQuestionService;

  constructor(askQuestionService: AskQuestionService) {
    this.askQuestionService = askQuestionService;
  }

  public askQuestion(io: CustomServer): void {
    io.on('connection', (socket) => {
      socket.on('askQuestion', (text) => {
        const roomId = socket.data.joinedRoom ?? '';
        const playerId = socket.id;

        this.askQuestionService.askQuestion(roomId, playerId, text);

        socket.emit('playerAttempted', socket.id);
        socket.to(roomId).emit('playerAttempted', socket.id);
      });
    });
  }
}
