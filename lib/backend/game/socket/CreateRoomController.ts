import { CreateRoomService } from '../app-service/CreateRoomService';
import { CustomServer } from './socketTypes';

export class CreateRoomController {
  private createRoomService: CreateRoomService;
  constructor(createRoomService: CreateRoomService) {
    this.createRoomService = createRoomService;
  }

  public createRoom(io: CustomServer): void {
    io.on('connection', (socket) => {
      socket.on('createRoom', ({ name, avatar, roomId }, callback) => {
        try {
          const owner = this.createRoomService.createRoom(roomId, socket.id, name, avatar);
          socket.join(roomId);
          socket.data.joinedRoom = roomId;

          callback(owner);
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
