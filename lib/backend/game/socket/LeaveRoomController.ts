import { LeaveRoomService } from '../app-service/LeaveRoomService';
import { CustomServer } from './socketTypes';

export class LeaveRoomController {
  private leaveRoomService: LeaveRoomService;

  constructor(leaveRoomService: LeaveRoomService) {
    this.leaveRoomService = leaveRoomService;
  }

  public leaveRoom(io: CustomServer): void {
    io.on('connection', (socket) => {
      socket.on('disconnecting', () => {
        const roomId = socket.data.joinedRoom ?? '';
        const room = this.leaveRoomService.leaveRoom(roomId, socket.id);

        if (room.getPlayers().getAll().length === 0) return;

        socket.broadcast.to(roomId).emit('newOwner', room.getOwnerId());
        socket.broadcast.to(roomId).emit('playerLeaveRoom', socket.id);
      });
    });
  }
}
