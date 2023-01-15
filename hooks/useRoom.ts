import { useCallback, useEffect, useMemo, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { ClientToServerEvents, ServerToClientEvents } from 'lib/common/socketsTypes';
import { generateRoomId } from 'lib/common/generators/roomId-generator';
import { AnswerType } from 'lib/frontend/types/answer';
import { PlayerType } from 'lib/frontend/types/player';
import { SceneState } from 'lib/frontend/types/sceneState';

let socket: Socket<ServerToClientEvents, ClientToServerEvents>;

type CreateRoomFn = (name: string) => string;
type JoinRoomFn = (name: string, roomID: string) => Promise<string>;
type StartGameFn = (roomId: string) => void;
type ValidatePlayerCharacterFn = (playerId: string, character: string) => void;
export type AskQuestionFn = (question: string) => void;
export type AnswerQuestionFn = (answer: AnswerType) => void;

export type UseRoomReturnType = {
  sceneState: SceneState;
  player: PlayerType | null;
  joinedRoom: false | string;
  ownerId: string;
  players: PlayerType[];
  selectedPlayer: PlayerType | null;
  createRoom: CreateRoomFn;
  joinRoom: JoinRoomFn;
  startGame: StartGameFn;
  validatePlayerCharacter: ValidatePlayerCharacterFn;
};

export const useRoom = (): UseRoomReturnType => {
  const [sceneState, setSceneState] = useState<SceneState>(SceneState.HOME);
  const [joinedRoom, setJoinedRoom] = useState<false | string>(false);
  const [ownerId, setOwnerId] = useState<string>('');
  const [players, setPlayers] = useState<PlayerType[]>([]);
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);

  const socketInitializer = useCallback(async () => {
    await fetch('api/game-rooms');

    socket = io();

    socket.on('newOwner', (playerId) => {
      setOwnerId(playerId);
    });

    socket.on('playerJoinRoom', (player) => {
      setPlayers((players) => [...players, player]);
    });

    socket.on('playerLeaveRoom', (id) => {
      setPlayers((players) => players.filter((player) => player.id !== id));
    });

    socket.on('choosePlayerCharacter', (id) => {
      setSelectedPlayerId(id);
      setSceneState(SceneState.CHOOSE_CHARACTER);
    });

    socket.on('updatePlayerCharacter', (id, character) => {
      setPlayers((players) =>
        players.map((p) => {
          if (p.id !== id) return p;
          return {
            ...p,
            character,
          };
        })
      );
    });
  }, [setSceneState]);

  useEffect(() => {
    socketInitializer();

    return () => {
      if (socket) socket.close();
    };
  }, [socketInitializer]);

  const player: PlayerType | null = useMemo(() => {
    if (!socket) return null;
    return players.find((p) => p.id === socket.id) ?? null;
  }, [players]);

  const selectedPlayer = useMemo(() => {
    if (!selectedPlayerId) return null;

    const player = players.find((player) => player.id === selectedPlayerId);
    if (!player) throw new Error('No matching player found !');

    return player;
  }, [selectedPlayerId, players]);

  const createRoom: CreateRoomFn = (name: string): string => {
    const roomID = generateRoomId();
    socket.emit('createRoom', name, roomID, (owner) => {
      setPlayers([owner]);
      setJoinedRoom(roomID);
      setOwnerId(owner.id);
      setSceneState(SceneState.JOINED_ROOM);
    });

    return roomID;
  };

  const joinRoom: JoinRoomFn = async (name: string, roomID: string): Promise<string> => {
    const doesRoomExist: boolean = await new Promise((resolve) => {
      socket.emit('doesRoomExist', roomID, (doesExist) => {
        resolve(doesExist);
      });
    });

    if (!doesRoomExist) return createRoom(name);

    socket.emit('joinRoom', name, roomID, (players) => {
      setPlayers([...players]);
      setJoinedRoom(roomID);
      setSceneState(SceneState.JOINED_ROOM);
    });

    return roomID;
  };

  const startGame: StartGameFn = (roomId: string): void => {
    socket.emit('startGame', roomId);
  };

  const validatePlayerCharacter: ValidatePlayerCharacterFn = (playerId: string, character: string): void => {
    socket.emit('choosePlayerCharacter', playerId, character);

    setPlayers((players) =>
      players.map((player) => {
        if (player.id !== playerId) return player;

        return {
          ...player,
          character,
        };
      })
    );
    setSceneState(SceneState.WAITING_ROOM);
  };

  return {
    sceneState,
    player,
    joinedRoom,
    ownerId,
    players,
    selectedPlayer,
    createRoom,
    joinRoom,
    startGame,
    validatePlayerCharacter,
  };
};
