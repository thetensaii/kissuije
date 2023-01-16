import { useCallback, useEffect, useMemo, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { ClientToServerEvents, ServerToClientEvents } from 'lib/common/socketsTypes';
import { generateRoomId } from 'lib/common/generators/roomId-generator';
import { AnswerType } from 'lib/frontend/types/answer';
import { convertSocketPlayerToFrontendPlayer, PlayerType } from 'lib/frontend/types/player';
import { SceneState } from 'lib/frontend/types/sceneState';

let socket: Socket<ServerToClientEvents, ClientToServerEvents>;

type CreateRoomFn = (name: string) => string;
type JoinRoomFn = (name: string, roomID: string) => Promise<string>;
type StartGameFn = (roomId: string) => void;
type ValidatePlayerCharacterFn = (playerId: string, character: string) => void;
export type AskQuestionFn = (text: string) => void;
export type TryGuessFn = (text: string) => void;
export type AnswerQuestionFn = (answer: AnswerType) => void;

export type UseRoomReturnType = {
  sceneState: SceneState;
  player: PlayerType | null;
  joinedRoom: false | string;
  ownerId: string;
  players: PlayerType[];
  playerChoosed: PlayerType | null;
  actualRound: number;
  createRoom: CreateRoomFn;
  joinRoom: JoinRoomFn;
  startGame: StartGameFn;
  validatePlayerCharacter: ValidatePlayerCharacterFn;
  askQuestion: AskQuestionFn;
  tryGuess: TryGuessFn;
};

export const useRoom = (): UseRoomReturnType => {
  const [sceneState, setSceneState] = useState<SceneState>(SceneState.HOME);
  const [joinedRoom, setJoinedRoom] = useState<false | string>(false);
  const [ownerId, setOwnerId] = useState<string>('');
  const [players, setPlayers] = useState<PlayerType[]>([]);
  const [playerChoosedId, setPlayerChoosedId] = useState<string | null>(null);
  const [actualRound, setActualRound] = useState<number>(0);

  const socketInitializer = useCallback(async () => {
    await fetch('api/game-rooms');

    socket = io();

    socket.on('newOwner', (playerId) => {
      setOwnerId(playerId);
    });

    socket.on('playerJoinRoom', (player) => {
      setPlayers((players) => [
        ...players,
        {
          ...player,
          attempted: false,
        },
      ]);
    });

    socket.on('playerLeaveRoom', (id) => {
      setPlayers((players) => players.filter((player) => player.id !== id));
    });

    socket.on('choosePlayerCharacter', (id) => {
      setPlayerChoosedId(id);
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

    socket.on('launchFirstRound', () => {
      setPlayerChoosedId(null);
      setActualRound(1);
      setSceneState(SceneState.GAME);
    });

    socket.on('playerAttempted', (playerId) => {
      setPlayers((players) => {
        return players.map<PlayerType>((p) =>
          p.id === playerId
            ? {
                ...p,
                attempted: true,
              }
            : p
        );
      });
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

  const playerChoosed = useMemo(() => {
    if (!playerChoosedId) return null;

    const player = players.find((player) => player.id === playerChoosedId);
    if (!player) throw new Error('No matching player found !');

    return player;
  }, [playerChoosedId, players]);

  const createRoom: CreateRoomFn = (name: string): string => {
    const roomID = generateRoomId();
    socket.emit('createRoom', name, roomID, (owner) => {
      setPlayers([convertSocketPlayerToFrontendPlayer(owner)]);
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
      const frontendTypePlayers = players.map<PlayerType>(convertSocketPlayerToFrontendPlayer);
      setPlayers(frontendTypePlayers);
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

  const askQuestion: AskQuestionFn = (text: string): void => {
    socket.emit('askQuestion', text);
  };

  const tryGuess: TryGuessFn = (text: string): void => {
    socket.emit('tryGuess', text);
  };

  return {
    sceneState,
    player,
    joinedRoom,
    ownerId,
    players,
    playerChoosed,
    actualRound,
    createRoom,
    joinRoom,
    startGame,
    validatePlayerCharacter,
    askQuestion,
    tryGuess,
  };
};
