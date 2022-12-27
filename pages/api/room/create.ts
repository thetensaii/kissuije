import type { NextApiRequest, NextApiResponse } from 'next'
import type { Server as HTTPServer } from 'http'
import type { Socket as NetSocket } from 'net'
import { Server as IOServer } from 'socket.io'
import { ClientToServerEvents, InterServerEvents, ServerSocket, ServerToClientEvents, SocketData } from '../../../utils/sockets'
import { getRandomElementFromArray, shuffleArray } from '../../../utils/functions'
import { Player } from '../../../utils/game'

interface SocketServer extends HTTPServer {
  io?: IOServer | undefined
}

interface SocketWithIO extends NetSocket {
  server: SocketServer
}

interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO
}

export default function room(
  _req: NextApiRequest,
  res: NextApiResponseWithSocket
) {

  if (res.socket.server.io) {
    res.end();
    return;
  }

  const io = new IOServer<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >(res.socket.server);

  res.socket.server.io = io;

  io.on('connection', (socket) => {

    socket.on('doRoomExist', (room, callback) => {
      callback(io.sockets.adapter.rooms.has(room))
    })

    socket.on('newPlayer', (name, room, callback) => {
      socket.data.name = name;
      socket.data.joinedRoom = room;

      const clients = getRoomClients(io, room);
      const numClients = clients ? clients.size : 0;
      const isOwner = (numClients === 0);

      socket.data.isOwner = isOwner;

      const newPlayer: Player = {
        id: socket.id,
        name,
        isOwner
      }

      console.log(`CONNECTION ---- Name : ${name} - Room : ${room} - Client n°${numClients + 1}`)
      socket.join(room)
      socket.broadcast.to(room).emit('playerJoinRoom', newPlayer)

      if (!clients) {
        callback([newPlayer])
        return;
      }

      const roomSocketIds = Array.from(clients.values())
      const roomPlayers = roomSocketIds.filter((socketId) => socketId !== socket.id)
        .map((socketId) => getSocketById(io, socketId))
        .filter((socket): socket is ServerSocket => socket !== undefined)
        .map((socket) => ({
          id: socket.id,
          name: socket.data.name ?? 'No name',
          isOwner: socket.data.isOwner ?? false,
        }))

      callback([...roomPlayers, newPlayer])
      if (isOwner) socket.emit('newOwner', socket.id)
    })

    socket.on('disconnecting', () => {
      const { name, joinedRoom, isOwner } = socket.data;
      if (!name || !joinedRoom) return;

      console.log(`DISCONNECTION ---- Name : ${name} - Room : ${joinedRoom} - IS OWNER : ${isOwner}`)
      socket.broadcast.to(joinedRoom).emit('playerLeaveRoom', socket.id);
      socket.leave(joinedRoom);

      if (!isOwner) return;

      const clients = getRoomClients(io, joinedRoom);
      const numClients = clients ? clients.size : 0;

      if (!clients || numClients === 0) return;

      const [firstSocketId] = Array.from(clients.values());
      const newOwnerSocket = getSocketById(io, firstSocketId);

      if (!newOwnerSocket) return

      io.to(joinedRoom).emit('newOwner', firstSocketId);
      newOwnerSocket.data.isOwner = true;
    });

    socket.on('startGame', (roomId) => {
      const clients = getRoomClients(io, roomId);
      if (!clients) return

      const clientsArray = Array.from(clients)
      if (clientsArray.length < 2) return;

      let clientsArrayCopy = [...clientsArray];


      clientsArray.forEach((client) => {
        let target = getRandomElementFromArray(clientsArrayCopy)
        while (target === client) {
          target = getRandomElementFromArray(clientsArrayCopy)
        }

        clientsArrayCopy = clientsArrayCopy.filter((client) => target !== client)

        if (client === socket.id) socket.emit('choosePlayerCharacter', target)
        socket.to(client).emit('choosePlayerCharacter', target)
      })
    })

    socket.on('validatePlayerCharacter', (playerId, character) => {
      const { joinedRoom } = socket.data;
      if (!joinedRoom) return;

      const playerSocket = getSocketById(io, playerId);
      if (!playerSocket) return;

      console.log(`${playerId} : ${character}`)
      socket.broadcast.to(joinedRoom).emit('updatePlayerCharacter', playerId, character);

      playerSocket.data.character = character;

      const clients = getRoomClients(io, joinedRoom);
      if (!clients) return;
      const roomSocketIds = Array.from(clients.values())
      const numberOfPlayers = roomSocketIds.length;

      const numberOfPlayerWithCharacter = roomSocketIds
        .map(s => getSocketById(io, s))
        .filter(s => s !== undefined && s.data.character)
        .length;

      console.log('numberOfPlayers : ' + numberOfPlayers);
      console.log('numberOfPlayerWithCharacter : ' + numberOfPlayerWithCharacter);

      if (numberOfPlayers === numberOfPlayerWithCharacter) {
        console.log('LAUNCH GAME')
        const shuffledRoomSocketIds = shuffleArray(roomSocketIds)

        socket.to(joinedRoom).emit('launchGame', shuffledRoomSocketIds);
        socket.emit('launchGame', shuffledRoomSocketIds);
      }
    })
  });

  res.end()
}

function getRoomClients(io: IOServer, room: string): Set<string> | undefined {
  return io.sockets.adapter.rooms.get(room)
}


function getSocketById(io: IOServer, socketId: string): ServerSocket | undefined {
  return io.sockets.sockets.get(socketId)
}