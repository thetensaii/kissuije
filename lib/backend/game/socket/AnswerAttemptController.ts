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
      socket.on('answerAttempt', ({ roomId, askerId, answer: socketAnswer }, cb) => {
        try {
          const answer = this.answerAdapter.toDomain(socketAnswer);

          this.answerAttemptService.answerAttempt(roomId, askerId, answer);

          cb();

          const attempts = this.doAllPlayersAnsweredService.doAllPlayersAnswered(roomId);
          if (!attempts) return;

          const winnerIds = this.doPlayersWonService.doPlayersWon(roomId);

          if (winnerIds) {
            let nextRoomId;
            do {
              nextRoomId = generateRoomId();
            } while (this.checkRoomService.doesRoomExist(nextRoomId));

            io.to(roomId).emit('gameFinish', { winnerIds, nextRoomId });
            io.socketsLeave(roomId);
            this.deleteRoomService.deleteRoom(roomId);
            return;
          }

          const playerId = socket.id;
          attempts.getAllAttempts().forEach((attempt) => {
            const socketAttempt = this.attemptAdapter.toSocket(attempt);
            if (socketAttempt.askerId === playerId) {
              socket.emit('allPlayersAnswered', { playerAttempt: socketAttempt });
              return;
            }
            socket.to(socketAttempt.askerId).emit('allPlayersAnswered', { playerAttempt: socketAttempt });
          });
        } catch (error) {
          if (error instanceof Error) {
            // eslint-disable-next-line no-console
            console.error(error.message);
          }
        }
      });
    });
  }
}
