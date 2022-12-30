import { CreateRoomService } from '../app-service/CreateRoomService';
import { CustomServer } from './socketTypes';

export class CreateRoomController {
  private createRoomService: CreateRoomService;
  constructor(createRoomService: CreateRoomService) {
    this.createRoomService = createRoomService;
  }

  public createRoom(io: CustomServer): void {
    io.on('connection', (socket) => {
      socket.on('createRoom', (name, roomId, callback) => {
        const owner = this.createRoomService.createRoom(roomId, socket.id, name);

        socket.join(roomId);
        socket.data.joinedRoom = roomId;

        callback(owner);
      });
    });
  }
}
