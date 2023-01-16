import { AskQuestionService } from '../app-service/AskQuestionService';
import { CustomServer } from './socketTypes';

export class AskQuestionController {
  private askQuestionService: AskQuestionService;

  constructor(askQuestionService: AskQuestionService) {
    this.askQuestionService = askQuestionService;
  }

  public askquestion(io: CustomServer): void {
    io.on('connection', (socket) => {
      socket.on('askQuestion', (text) => {
        const roomId = socket.data.joinedRoom ?? '';
        const playerId = socket.id;

        this.askQuestionService.askQuestion(roomId, playerId, text);

        socket.emit('playerAskedQuestion', socket.id);
        socket.to(roomId).emit('playerAskedQuestion', socket.id);
      });
    });
  }
}
