import { generateRoomId } from 'lib/common/generators/roomId-generator';
import { AnswerAttemptService } from '../app-service/AnswerAttemptService';
import { CheckRoomService } from '../app-service/CheckRoomService';
import { DeleteRoomService } from '../app-service/DeleteRoomService';
import { DoAllPlayersAnsweredService } from '../app-service/DoAllPlayersAnsweredService';
import { DoPlayersWonService } from '../app-service/DoPlayersWonService';
import { AnswerAdapter } from './adapters/AnswerAdapter';
import { AttemptAdapter } from './adapters/AttemptAdapter';
import { CustomServer } from './socketTypes';

export class AnswerAttemptController {
  private answerAttemptService: AnswerAttemptService;
  private doAllPlayersAnsweredService: DoAllPlayersAnsweredService;
  private doPlayersWonService: DoPlayersWonService;
  private answerAdapter: AnswerAdapter;
  private attemptAdapter: AttemptAdapter;
  private checkRoomService: CheckRoomService;
  private deleteRoomService: DeleteRoomService;

  constructor(
    answerAttemptService: AnswerAttemptService,
    doAllPlayersAnsweredService: DoAllPlayersAnsweredService,
    doAPlayerWonService: DoPlayersWonService,
    answerAdapter: AnswerAdapter,
    attemptAdapter: AttemptAdapter,
    checkRoomService: CheckRoomService,
    deleteRoomService: DeleteRoomService
  ) {
    this.answerAttemptService = answerAttemptService;
    this.doAllPlayersAnsweredService = doAllPlayersAnsweredService;
    this.doPlayersWonService = doAPlayerWonService;
    this.answerAdapter = answerAdapter;
    this.attemptAdapter = attemptAdapter;
    this.checkRoomService = checkRoomService;
    this.deleteRoomService = deleteRoomService;
  }

  public answerAttempt(io: CustomServer): void {
    io.on('connection', (socket) => {
      socket.on('answerAttempt', (roomId, askerId, socketAnswer, cb) => {
        const answer = this.answerAdapter.toDomain(socketAnswer);

        this.answerAttemptService.answerAttempt(roomId, askerId, answer);

        cb();

        const attempts = this.doAllPlayersAnsweredService.doAllPlayersAnswered(roomId);
        if (!attempts) return;

        const winners = this.doPlayersWonService.doPlayersWon(roomId);

        if (winners) {
          let nextRoomId;
          do {
            nextRoomId = generateRoomId();
          } while (this.checkRoomService.doesRoomExist(nextRoomId));

          socket.emit('gameFinish', winners, nextRoomId);
          socket.to(roomId).emit('gameFinish', winners, nextRoomId);
          socket.to(roomId).socketsLeave(roomId);
          this.deleteRoomService.deleteRoom(roomId);
          return;
        }

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
