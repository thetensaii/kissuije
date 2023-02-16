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
      socket.on('createRoom', ({ roomId: newRoom }) => {
        roomId = newRoom;
      });
      socket.on('joinRoom', ({ roomId: newRoom }) => {
        roomId = newRoom;
      });

      socket.on('leaveRoom', () => {
        if (!roomId) return;
        try {
          const playerId = socket.id;
          const room = this.leaveRoomService.leaveRoom(roomId, playerId);

          if (room.isEmpty()) return;

          io.to(roomId).emit('newOwner', { ownerId: room.getOwnerId() });
          io.to(roomId).emit('playerLeaveRoom', { id: playerId });
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
