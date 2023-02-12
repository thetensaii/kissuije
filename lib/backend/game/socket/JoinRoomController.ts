import { JoinRoomService } from '../app-service/JoinRoomService';
import { CustomServer } from './socketTypes';

export class JoinRoomController {
  private joinRoomService: JoinRoomService;

  constructor(joinRoomService: JoinRoomService) {
    this.joinRoomService = joinRoomService;
  }

  public joinRoom(io: CustomServer): void {
    io.on('connection', (socket) => {
      socket.on('joinRoom', ({ name, avatar, roomId }, callback) => {
        try {
          const { ownerId, player, players } = this.joinRoomService.joinRoom(roomId, socket.id, name, avatar);

          socket.join(roomId);
          socket.data.joinedRoom = roomId;

          socket.broadcast.to(roomId).emit('playerJoinRoom', { player });

          callback(ownerId, players);
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
