import { Server } from 'socket.io';
import { getRandomElementFromArray, shuffleArray, sortById } from '../common/functions';
import { Player } from '../common/game';
import { CustomServer, CustomSocket } from './socketTypes';

function getRoomSocketIds(io: Server, room: string): string[] {
  return Array.from(io.sockets.adapter.rooms.get(room)?.values() ?? []);
}

function getSocketById(io: Server, socketId: string): CustomSocket | undefined {
  return io.sockets.sockets.get(socketId);
}

type GameRoom = {
  id: string;
  players: Player[];
  playingIndex: number;
};

const gameRooms: Map<string, GameRoom> = new Map<string, GameRoom>();

export function apiSocketHandler(io: CustomServer): void {
  io.on('connection', (socket) => {
    socket.on('doRoomExist', (room, callback) => {
      callback(io.sockets.adapter.rooms.has(room));
    });

    socket.on('newPlayer', (name, room, callback) => {
      socket.data.id = socket.id;
      socket.data.name = name;
      socket.data.joinedRoom = room;

      const roomSocketIds = getRoomSocketIds(io, room);
      const isOwner = roomSocketIds.length === 0;

      socket.data.isOwner = isOwner;

      const newPlayer: Player = {
        id: socket.id,
        name,
        isOwner,
        hasFoundCharacter: false,
      };

      socket.join(room);
      socket.broadcast.to(room).emit('playerJoinRoom', newPlayer);

      if (roomSocketIds.length === 0) {
        callback([newPlayer]);
        return;
      }

      const roomPlayers: Player[] = roomSocketIds
        .filter((socketId) => socketId !== socket.id)
        .map((socketId) => getSocketById(io, socketId))
        .filter((socket): socket is CustomSocket => socket !== undefined)
        .map<Player>((socket) => ({
          id: socket.id,
          name: socket.data.name ?? 'No name',
          isOwner: socket.data.isOwner ?? false,
          hasFoundCharacter: socket.data.hasFoundCharacter ?? false,
        }));

      callback([...roomPlayers, newPlayer]);
      if (isOwner) socket.emit('newOwner', socket.id);
    });

    socket.on('disconnecting', () => {
      const { id, name, joinedRoom, isOwner } = socket.data;
      if (!id || !name || !joinedRoom) return;

      socket.broadcast.to(joinedRoom).emit('playerLeaveRoom', id);
      socket.leave(joinedRoom);

      if (!isOwner) return;

      const roomSocketIds = getRoomSocketIds(io, joinedRoom);
      if (roomSocketIds.length === 0) return;

      const firstSocketId = roomSocketIds[0];
      const newOwnerSocket = getSocketById(io, firstSocketId);

      if (!newOwnerSocket) return;

      io.to(joinedRoom).emit('newOwner', newOwnerSocket.data.id ?? '');
      newOwnerSocket.data.isOwner = true;
    });

    socket.on('startGame', (roomId) => {
      const clients = getRoomSocketIds(io, roomId);
      if (clients.length < 2) return;

      let clientsCopy = [...clients];
      let target: string;

      clients.forEach((client) => {
        do {
          target = getRandomElementFromArray(clientsCopy);
        } while (target === client);

        clientsCopy = clientsCopy.filter((client) => target !== client);

        if (client === socket.id) socket.emit('choosePlayerCharacter', target);
        socket.to(client).emit('choosePlayerCharacter', target);
      });
    });

    socket.on('validatePlayerCharacter', (playerId, character) => {
      const { joinedRoom } = socket.data;
      if (!joinedRoom) return;

      const playerSocket = getSocketById(io, playerId);
      if (!playerSocket) return;

      socket.broadcast.to(joinedRoom).emit('updatePlayerCharacter', playerId, character);

      playerSocket.data.character = character;

      const clients = getRoomSocketIds(io, joinedRoom);
      if (clients.length === 0) return;

      const numberOfPlayers = clients.length;

      const roomSockets = clients.map((s) => getSocketById(io, s)).filter((s): s is CustomSocket => s !== undefined);
      const numberOfPlayerWithCharacter = roomSockets.filter((s) => s.data.character !== undefined).length;

      if (numberOfPlayers === numberOfPlayerWithCharacter) {
        const shuffledRoomSocketIds = shuffleArray(clients);
        const players: Player[] = roomSockets.map<Player>((s) => ({
          id: s.data.id ?? '',
          name: s.data.name ?? '',
          isOwner: s.data.isOwner ?? false,
          character: s.data.character ?? '',
          hasFoundCharacter: false,
        }));

        const sortedPlayers = sortById(players, shuffledRoomSocketIds);
        const gameRoom: GameRoom = {
          id: joinedRoom,
          players: sortedPlayers,
          playingIndex: 0,
        };

        gameRooms.set(joinedRoom, gameRoom);

        socket.to(joinedRoom).emit('launchGame', sortedPlayers);
        socket.emit('launchGame', sortedPlayers);
      }
    });
  });
}
