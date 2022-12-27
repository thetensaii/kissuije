import { useCallback, useEffect, useMemo, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { generateRoomId } from '../utils/functions';
import { Player, SceneState } from '../utils/game';
import { ClientToServerEvents, ServerToClientEvents } from '../utils/sockets';

let socket: Socket<ServerToClientEvents, ClientToServerEvents>;
type SetSceneState = (scene: SceneState) => void

type CreateRoomFn = (name: string) => string
type JoinRoomFn = (name: string, roomID: string) => Promise<string>
type StartGameFn = (roomId: string) => void
type ValidatePlayerCharacterFn = (playerId: string, character: string) => void

type UseRoomReturnType = {
  player: Player|null,
  joinedRoom: false|string,
  players: Player[],
  selectedPlayer: Player|null,
  createRoom: CreateRoomFn,
  joinRoom: JoinRoomFn,
  startGame: StartGameFn,
  validatePlayerCharacter: ValidatePlayerCharacterFn,
}

export const useRoom = (setSceneState: SetSceneState): UseRoomReturnType => {

  const [joinedRoom, setJoinedRoom] = useState<false | string>(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);

  const socketInitializer = useCallback(async () => {
    await fetch('api/room/create');

    socket = io();

    socket.on('newOwner', (playerId) => {
      setPlayers(players => players.map(p => {
        if (p.id === playerId) return { ...p, isOwner: true };
        return p;
      }))
    })

    socket.on('playerJoinRoom', (player) => {
      console.log(`Oh ${player.name} a rejoint le salon !!`);
      setPlayers((players) => [...players, player])
    });

    socket.on('playerLeaveRoom', (id) => {
      console.log(`Oh non ${id} a quitté le salon !!`);
      setPlayers((players) => players.filter((player) => player.id !== id))
    });

    socket.on('choosePlayerCharacter', (id) => {
      setSelectedPlayerId(id);
      setSceneState(SceneState.CHOOSE_CHARACTER);
    })

    socket.on('updatePlayerCharacter', (id, character) => {
      setPlayers((players) => players.map(p => {
        if (p.id !== id) return p;
        return {
          ...p,
          character
        }
      }))
    })

    socket.on('launchGame', (playersIdsByGameOrder) => {
      console.log('Launch Game')
      setSelectedPlayerId(null)
      setPlayers(players => [...players].sort((p1, p2) => playersIdsByGameOrder.indexOf(p1.id) - playersIdsByGameOrder.indexOf(p2.id)))
      setSceneState(SceneState.GAME)
    })
  }, [setSceneState])

  useEffect(() => {
    socketInitializer();

    return () => {
      if (socket) socket.close()
    }
  }, [socketInitializer]);

  const player: Player | null = useMemo(() => {
    if (!socket) return null;
    return players.find(p => p.id === socket.id) ?? null;
  }, [players])

  const selectedPlayer = useMemo(() => {
    if (!selectedPlayerId) return null;

    const player = players.find((player) => player.id === selectedPlayerId);
    if (!player) throw new Error('No matching player found !');


    return player;
  }, [selectedPlayerId, players])

  const createRoom: CreateRoomFn = (name: string): string => {
    const roomID = generateRoomId()
    runSocketEnterRoom(name, roomID)
    return roomID;
  }

  const joinRoom: JoinRoomFn = async (name: string, roomID: string): Promise<string> => {
    const doesRoomExist: boolean = await new Promise(resolve => {
      socket.emit('doRoomExist', roomID, (doesExist) => {
        resolve(doesExist)
      })
    });

    if (!doesRoomExist) return createRoom(name);

    runSocketEnterRoom(name, roomID)
    return roomID;
  }

  const runSocketEnterRoom = (name: string, roomID: string): void => {
    socket.emit('newPlayer', name, roomID, (players) => {
      setPlayers([
        ...players,
      ])
      setJoinedRoom(roomID)
    });

    setSceneState(SceneState.ROOM_JOINED)
  }

  const startGame: StartGameFn = (roomId: string): void => {
    socket.emit('startGame', roomId);
  }

  const validatePlayerCharacter: ValidatePlayerCharacterFn = (playerId: string, character: string): void => {
    socket.emit('validatePlayerCharacter', playerId, character);

    setPlayers((players) => players.map((player) => {
      if (player.id !== playerId) return player;

      return {
        ...player,
        character,
      }
    }))
    setSceneState(SceneState.WAIT_THAT_OTHERS_CHOOSE);
  }

  return {
    player,
    joinedRoom,
    players,
    selectedPlayer,
    createRoom,
    joinRoom,
    startGame,
    validatePlayerCharacter,
  }
}