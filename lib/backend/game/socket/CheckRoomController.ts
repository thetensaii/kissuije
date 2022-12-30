import { CheckRoomService } from '../app-service/CheckRoomService';
import { CustomServer } from './socketTypes';

export class CheckRoomController {
  private checkRoomService: CheckRoomService;
  constructor(checkRoomService: CheckRoomService) {
    this.checkRoomService = checkRoomService;
  }

  public doesRoomExist(io: CustomServer): void {
    io.on('connection', (socket) => {
      socket.on('doesRoomExist', (roomId, callback) => {
        const doesExist = this.checkRoomService.doesRoomExist(roomId);

        callback(doesExist);
      });
    });
  }
}
