import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { io, Socket } from 'socket.io-client';
import { ClientToServerEvents, ServerToClientEvents } from 'lib/common/socketsTypes';
import { generateRoomId } from 'lib/common/generators/roomId-generator';
import { AnswerType } from 'lib/frontend/types/answer';
import { convertSocketPlayerToFrontendPlayer, PlayerType } from 'lib/frontend/types/player';
import { AttemptType, convertSocketAttemptToFrontendAttempt } from 'lib/frontend/types/attempt';
import { AvatarType } from 'lib/frontend/types/svg';
import { gameRoomReducer, GameRoomState, initialGameRoomState } from 'reducers/gameRoomReducer';

let socket: Socket<ServerToClientEvents, ClientToServerEvents>;

type CreateRoomFn = (name: string, avatar: AvatarType, roomId?: string) => string;
type JoinRoomFn = (name: string, avatar: AvatarType, roomID: string) => Promise<string>;
type StartGameFn = (roomId: string) => void;
type ValidatePlayerCharacterFn = (roomId: string, playerId: string, character: string) => void;
type AskQuestionFn = (roomId: string, text: string) => void;
type TryGuessFn = (roomId: string, text: string) => void;
type AnswerAttemptFn = (roomId: string, askerId: string, answer: AnswerType) => void;
type ContinueToNextRoundFn = (roomId: string) => void;
type MoveToRankingPageFn = () => void;
type RestartFn = (nextRoomId: string, player: PlayerType) => void;
type RedirectToTryGuessSceneFn = () => void;
type RedirectToAskQuestionSceneFn = () => void;

export type UseRoomReturnType = {
  state: GameRoomState & {
    player: PlayerType | null;
    choosedPlayer: PlayerType | null;
    myAttempt: AttemptType | null;
  };
  api: {
    createRoom: CreateRoomFn;
    joinRoom: JoinRoomFn;
    startGame: StartGameFn;
    validatePlayerCharacter: ValidatePlayerCharacterFn;
    askQuestion: AskQuestionFn;
    redirectToTryGuessScene: RedirectToTryGuessSceneFn;
    redirectToAskQuestionScene: RedirectToAskQuestionSceneFn;
    tryGuess: TryGuessFn;
    answerAttempt: AnswerAttemptFn;
    continueToNextRound: ContinueToNextRoundFn;
    moveToRankingPage: MoveToRankingPageFn;
    restart: RestartFn;
  };
};

export const useRoom = (): UseRoomReturnType => {
  const [state, dispatch] = useReducer(gameRoomReducer, initialGameRoomState);

  const socketInitializer = useCallback(async () => {
    await fetch('api/game-rooms');

    socket = io();

    socket.on('newOwner', (playerId) => {
      dispatch({
        type: 'NEW_OWNER',
        payload: {
          ownerId: playerId,
        },
      });
    });

    socket.on('playerJoinRoom', (player) => {
      dispatch({
        type: 'PLAYER_JOIN_ROOM',
        payload: {
          player: convertSocketPlayerToFrontendPlayer(player),
        },
      });
    });

    socket.on('playerLeaveRoom', (id) => {
      dispatch({
        type: 'PLAYER_LEAVE_ROOM',
        payload: {
          playerId: id,
        },
      });
    });

    socket.on('choosePlayerCharacter', (id) => {
      dispatch({
        type: 'MOVE_TO_CHOOSE_CHARACTER_SCENE',
        payload: {
          choosedPlayerId: id,
        },
      });
    });

    socket.on('updatePlayerCharacter', (id, character) => {
      dispatch({
        type: 'UPDATE_PLAYER_CHARACTER',
        payload: {
          playerId: id,
          character: character,
        },
      });
    });

    socket.on('launchFirstRound', () => {
      dispatch({
        type: 'LAUNCH_NEW_ROUND',
        payload: {
          roundNumber: 1,
        },
      });
    });

    socket.on('playerAttempted', (playerId) => {
      dispatch({
        type: 'UPDATE_PLAYER_ATTEMPTED',
        payload: {
          playerId: playerId,
        },
      });
    });

    socket.on('allPlayersAttempted', (socketAttempts) => {
      const attempts = socketAttempts.map(convertSocketAttemptToFrontendAttempt);

      dispatch({
        type: 'MOVE_TO_ANSWER_ATTEMPTS_SCENE',
        payload: {
          attempts: attempts,
        },
      });
    });

    socket.on('allPlayersAnswered', (socketAttempt) => {
      const attempt = convertSocketAttemptToFrontendAttempt(socketAttempt);

      dispatch({
        type: 'MOVE_TO_ROUND_RESULT',
        payload: {
          myAttemptWithAnswers: attempt,
        },
      });
    });

    socket.on('newRound', (roundNumber) => {
      dispatch({
        type: 'LAUNCH_NEW_ROUND',
        payload: {
          roundNumber: roundNumber,
        },
      });
    });

    socket.on('gameFinish', (winnerIds, nextRoomId) => {
      dispatch({
        type: 'GAME_FINISH',
        payload: {
          winnerIds: winnerIds,
          nextRoomId: nextRoomId,
        },
      });
    });
  }, []);

  useEffect(() => {
    socketInitializer();

    return () => {
      if (socket) socket.close();
    };
  }, [socketInitializer]);

  const player: PlayerType | null = useMemo(() => {
    const { players, playerId } = state;
    return players.find((p) => p.id === playerId) ?? null;
  }, [state]);

  const choosedPlayer = useMemo(() => {
    const { choosedPlayerId, players } = state;
    if (!choosedPlayerId) return null;

    const player = players.find((player) => player.id === choosedPlayerId);
    if (!player) throw new Error('No matching player found !');

    return player;
  }, [state]);

  const myAttempt: AttemptType | null = useMemo(() => {
    const { attempts } = state;
    if (!player) return null;
    if (!attempts) return null;

    return attempts.find((a) => a.askerId === player.id) ?? null;
  }, [state, player]);

  const createRoom: CreateRoomFn = (name: string, avatar: AvatarType, roomId?: string): string => {
    const newRoomId = roomId ?? generateRoomId();

    socket.emit('createRoom', name, avatar, newRoomId, (owner) => {
      dispatch({
        type: 'CREATE_ROOM',
        payload: {
          owner: convertSocketPlayerToFrontendPlayer(owner),
          roomId: newRoomId,
        },
      });
    });

    return newRoomId;
  };

  const doesRoomExist = async (roomId: string): Promise<boolean> => {
    return await new Promise((resolve) => {
      socket.emit('doesRoomExist', roomId, (doesExist) => {
        resolve(doesExist);
      });
    });
  };

  const joinRoom: JoinRoomFn = async (name: string, avatar: AvatarType, roomId: string): Promise<string> => {
    const roomExist: boolean = await doesRoomExist(roomId);
    if (!roomExist) return createRoom(name, avatar);

    socket.emit('joinRoom', name, avatar, roomId, (ownerId, players) => {
      const frontendTypePlayers = players.map<PlayerType>((p): PlayerType => convertSocketPlayerToFrontendPlayer(p));

      dispatch({
        type: 'JOIN_ROOM',
        payload: {
          roomId: roomId,
          ownerId: ownerId,
          playerId: socket.id,
          players: frontendTypePlayers,
        },
      });
    });

    return roomId;
  };

  const startGame: StartGameFn = (roomId: string): void => {
    socket.emit('startGame', roomId);
  };

  const validatePlayerCharacter: ValidatePlayerCharacterFn = (
    roomId: string,
    playerId: string,
    character: string
  ): void => {
    socket.emit('choosePlayerCharacter', roomId, playerId, character);

    dispatch({
      type: 'CHOOSE_PLAYER_CHARACTER',
      payload: {
        character: character,
      },
    });
  };

  const askQuestion: AskQuestionFn = (roomId: string, text: string): void => {
    socket.emit('askQuestion', roomId, text, () => {
      dispatch({
        type: 'MOVE_TO_WAIT_FOR_ATTEMPTS_SCENE',
      });
    });
  };

  const tryGuess: TryGuessFn = (roomId: string, text: string): void => {
    socket.emit('tryGuess', roomId, text, () => {
      dispatch({
        type: 'MOVE_TO_WAIT_FOR_ATTEMPTS_SCENE',
      });
    });
  };

  const answerAttempt: AnswerAttemptFn = (roomId: string, askerId: string, answer: AnswerType) => {
    socket.emit('answerAttempt', roomId, askerId, answer, () => {
      dispatch({
        type: 'ANSWER_ATTEMPT',
        payload: {
          askerId: askerId,
        },
      });
    });
  };

  const continueToNextRound: ContinueToNextRoundFn = (roomId: string): void => {
    socket.emit('continueToNextRound', roomId, (): void => {
      dispatch({
        type: 'CONTINUE_TO_NEXT_ROUND',
      });
    });
  };

  const moveToRankingPage: MoveToRankingPageFn = (): void => {
    dispatch({
      type: 'MOVE_TO_FINAL_RESULTS_SCENE',
    });
  };

  const restart: RestartFn = async (nextRoomId: string, player: PlayerType) => {
    const roomAlreadyCreated = await doesRoomExist(nextRoomId);

    if (roomAlreadyCreated) {
      joinRoom(player.name, player.avatar, nextRoomId);
      return;
    }

    createRoom(player.name, player.avatar, nextRoomId);
  };

  const redirectToTryGuessScene: RedirectToTryGuessSceneFn = (): void => {
    dispatch({
      type: 'REDIRECT_TO_TRY_GUESS_SCENE',
    });
  };

  const redirectToAskQuestionScene: RedirectToAskQuestionSceneFn = (): void => {
    dispatch({
      type: 'REDIRECT_TO_ASK_QUESTION_SCENE',
    });
  };

  return {
    state: {
      ...state,
      player,
      choosedPlayer,
      myAttempt,
    },
    api: {
      createRoom,
      joinRoom,
      startGame,
      validatePlayerCharacter,
      askQuestion,
      tryGuess,
      redirectToTryGuessScene,
      redirectToAskQuestionScene,
      answerAttempt,
      continueToNextRound,
      moveToRankingPage,
      restart,
    },
  };
};
