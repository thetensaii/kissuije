import { CheckRoomService } from '../app-service/CheckRoomService';
import { CustomServer } from './socketTypes';

export class CheckRoomController {
  private checkRoomService: CheckRoomService;
  constructor(checkRoomService: CheckRoomService) {
    this.checkRoomService = checkRoomService;
  }

  public doesRoomExist(io: CustomServer): void {
    io.on('connection', (socket) => {
      socket.on('doesRoomExist', ({ roomId }, callback) => {
        try {
          const doesExist = this.checkRoomService.doesRoomExist(roomId);

          callback(doesExist);
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
