import { LeaveRoomService } from '../app-service/LeaveRoomService';
import { CustomServer } from './socketTypes';

export class LeaveRoomController {
  private leaveRoomService: LeaveRoomService;

  constructor(leaveRoomService: LeaveRoomService) {
    this.leaveRoomService = leaveRoomService;
  }

  public leaveRoom(io: CustomServer): void {
    let roomId = '';

    io.on('connection', (socket) => {
      socket.on('createRoom', (_, newRoom) => {
        roomId = newRoom;
      });
      socket.on('joinRoom', (_, newRoom) => {
        roomId = newRoom;
      });

      socket.on('disconnecting', () => {
        const room = this.leaveRoomService.leaveRoom(roomId, socket.id);

        if (room.isEmpty()) return;

        socket.broadcast.to(roomId).emit('newOwner', room.getOwnerId());
        socket.broadcast.to(roomId).emit('playerLeaveRoom', socket.id);
      });
    });
  }
}
