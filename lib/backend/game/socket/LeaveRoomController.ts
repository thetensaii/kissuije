import { LeaveRoomService } from '../app-service/LeaveRoomService';
import { CustomServer } from './socketTypes';

export class LeaveRoomController {
  private leaveRoomService: LeaveRoomService;

  constructor(leaveRoomService: LeaveRoomService) {
    this.leaveRoomService = leaveRoomService;
  }

  public leaveRoom(io: CustomServer): void {
    let roomId: string | null = null;

    io.on('connection', (socket) => {
      socket.on('createRoom', (_name, _avatar, newRoom) => {
        roomId = newRoom;
      });
      socket.on('joinRoom', (_name, _avatar, newRoom) => {
        roomId = newRoom;
      });

      socket.on('disconnecting', () => {
        if (!roomId) return;
        try {
          const room = this.leaveRoomService.leaveRoom(roomId, socket.id);

          if (room.isEmpty()) return;

          socket.broadcast.to(roomId).emit('newOwner', room.getOwnerId());
          socket.broadcast.to(roomId).emit('playerLeaveRoom', socket.id);
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
