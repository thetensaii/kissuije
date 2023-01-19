import { useCallback, useEffect, useMemo, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { ClientToServerEvents, ServerToClientEvents } from 'lib/common/socketsTypes';
import { generateRoomId } from 'lib/common/generators/roomId-generator';
import { AnswerType } from 'lib/frontend/types/answer';
import { convertSocketPlayerToFrontendPlayer, PlayerType } from 'lib/frontend/types/player';
import { SceneState } from 'lib/frontend/types/sceneState';
import { AttemptType, convertSocketAttemptToFrontendAttempt } from 'lib/frontend/types/attempt';

let socket: Socket<ServerToClientEvents, ClientToServerEvents>;

type CreateRoomFn = (name: string) => string;
type JoinRoomFn = (name: string, roomID: string) => Promise<string>;
type StartGameFn = (roomId: string) => void;
type ValidatePlayerCharacterFn = (playerId: string, character: string) => void;
export type AskQuestionFn = (text: string) => void;
export type TryGuessFn = (text: string) => void;
export type AnswerAttemptFn = (askerId: string, answer: AnswerType) => void;
type ContinueToNextRoundFn = () => void;

export type UseRoomReturnType = {
  sceneState: SceneState;
  player: PlayerType | null;
  joinedRoom: false | string;
  ownerId: string;
  players: PlayerType[];
  playerChoosed: PlayerType | null;
  actualRound: number;
  attempt: AttemptType | null;
  attempts: AttemptType[] | null;
  createRoom: CreateRoomFn;
  joinRoom: JoinRoomFn;
  startGame: StartGameFn;
  validatePlayerCharacter: ValidatePlayerCharacterFn;
  askQuestion: AskQuestionFn;
  tryGuess: TryGuessFn;
  answerAttempt: AnswerAttemptFn;
  continueToNextRound: ContinueToNextRoundFn;
};

export const useRoom = (): UseRoomReturnType => {
  const [sceneState, setSceneState] = useState<SceneState>(SceneState.HOME);
  const [joinedRoom, setJoinedRoom] = useState<false | string>(false);
  const [ownerId, setOwnerId] = useState<string>('');
  const [players, setPlayers] = useState<PlayerType[]>([]);
  const [playerChoosedId, setPlayerChoosedId] = useState<string | null>(null);
  const [actualRound, setActualRound] = useState<number>(0);
  const [attempts, setAttempts] = useState<AttemptType[] | null>(null);

  const socketInitializer = useCallback(async () => {
    await fetch('api/game-rooms');

    socket = io();

    socket.on('newOwner', (playerId) => {
      setOwnerId(playerId);
    });

    socket.on('playerJoinRoom', (player) => {
      setPlayers((players) => [...players, convertSocketPlayerToFrontendPlayer(player)]);
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
      launchNewRound(1);
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

    socket.on('allPlayersAttempted', (socketAttempts) => {
      const attempts = socketAttempts.map(convertSocketAttemptToFrontendAttempt);
      setAttempts(attempts);
    });

    socket.on('allPlayersAnswered', (socketAttempt) => {
      const attempt = convertSocketAttemptToFrontendAttempt(socketAttempt);

      setAttempts((attempts) => {
        if (!attempts) return null;

        return attempts.map((a) => (a.askerId === attempt.askerId ? attempt : a));
      });

      setSceneState(SceneState.ROUND_RESULT);
    });

    socket.on('newRound', (roundNumber) => {
      launchNewRound(roundNumber);
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

  const attempt: AttemptType | null = useMemo(() => {
    if (!socket) return null;
    if (!player) return null;
    if (!attempts) return null;

    return attempts.find((a) => a.askerId === player.id) ?? null;
  }, [attempts, player]);

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
    if (!joinedRoom) return;
    socket.emit('choosePlayerCharacter', joinedRoom, playerId, character);

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
    if (!joinedRoom) return;
    socket.emit('askQuestion', joinedRoom, text);
  };

  const tryGuess: TryGuessFn = (text: string): void => {
    if (!joinedRoom) return;
    socket.emit('tryGuess', joinedRoom, text);
  };

  const answerAttempt: AnswerAttemptFn = (askerId: string, answer: AnswerType) => {
    if (!joinedRoom) return;
    socket.emit('answerAttempt', joinedRoom, askerId, answer, () => {
      setAttempts((attempts) => {
        if (!attempts) return null;

        return attempts.map<AttemptType>((a) => (a.askerId === askerId ? { ...a, isAnswered: true } : a));
      });
    });
  };

  const continueToNextRound: ContinueToNextRoundFn = (): void => {
    if (!joinedRoom) return;
    if (!player) return;

    socket.emit('continueToNextRound', joinedRoom, (): void => {
      setPlayers((players) =>
        players.map<PlayerType>((p) =>
          p.id === player.id
            ? {
                ...p,
                wantsToContinue: true,
              }
            : p
        )
      );
    });
  };

  const launchNewRound = (roundNumber: number): void => {
    setPlayers((players) =>
      players.map((p) => ({
        ...p,
        wantsToContinue: false,
        attempted: false,
      }))
    );
    setActualRound(roundNumber);
    setAttempts(null);
    setSceneState(SceneState.GAME);
  };
  return {
    sceneState,
    player,
    joinedRoom,
    ownerId,
    players,
    playerChoosed,
    actualRound,
    attempt,
    attempts,
    createRoom,
    joinRoom,
    startGame,
    validatePlayerCharacter,
    askQuestion,
    tryGuess,
    answerAttempt,
    continueToNextRound,
  };
};
