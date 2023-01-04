import { useCallback, useEffect, useMemo, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { SceneState } from 'lib/frontend/sceneState';
import { ClientToServerEvents, ServerToClientEvents } from 'lib/common/socketsTypes';
import { generateRoomId } from 'lib/common/generators/roomId-generator';
import { Player } from 'lib/frontend/player';
import { AnswerType, convertSocketAnswerToAnswer, Question } from 'lib/frontend/question';

let socket: Socket<ServerToClientEvents, ClientToServerEvents>;

type CreateRoomFn = (name: string) => string;
type JoinRoomFn = (name: string, roomID: string) => Promise<string>;
type StartGameFn = (roomId: string) => void;
type ValidatePlayerCharacterFn = (playerId: string, character: string) => void;
type AskQuestionFn = (question: string) => void;
type AnswerQuestionFn = (answer: AnswerType) => void;

export type UseRoomReturnType = {
  sceneState: SceneState;
  player: Player | null;
  joinedRoom: false | string;
  ownerId: string;
  players: Player[];
  selectedPlayer: Player | null;
  playingPlayer: Player;
  question: Question | null;
  doIAnswered: boolean;
  everybodyAnswered: boolean;
  createRoom: CreateRoomFn;
  joinRoom: JoinRoomFn;
  startGame: StartGameFn;
  validatePlayerCharacter: ValidatePlayerCharacterFn;
  askQuestion: AskQuestionFn;
  answerQuestion: AnswerQuestionFn;
};

export const useRoom = (): UseRoomReturnType => {
  const [sceneState, setSceneState] = useState<SceneState>(SceneState.HOME);
  const [joinedRoom, setJoinedRoom] = useState<false | string>(false);
  const [ownerId, setOwnerId] = useState<string>('');
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);
  const [playingPlayerIndex, setPlayingPlayerIndex] = useState<number>(0);
  const [question, setQuestion] = useState<Question | null>(null);
  const [doIAnswered, setDoIAnswered] = useState<boolean>(false);
  const [everybodyAnswered, setEverybodyAnswered] = useState<boolean>(false);

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

    socket.on('launchGame', (playersByGameOrder) => {
      setSelectedPlayerId(null);
      setPlayers(playersByGameOrder);
      setPlayingPlayerIndex(0);
      setSceneState(SceneState.GAME);
    });

    socket.on('newQuestionAsked', (question) => {
      setQuestion({
        text: question,
        answers: [],
      });
    });

    socket.on('newAnswer', (answer) => {
      setQuestion((question) => {
        if (!question) throw new Error('No Question');

        return {
          ...question,
          answers: [...question.answers, convertSocketAnswerToAnswer(answer)],
        };
      });
    });

    socket.on('everybodyAnswered', () => {
      setEverybodyAnswered(true);
    });
  }, [setSceneState]);

  useEffect(() => {
    socketInitializer();

    return () => {
      if (socket) socket.close();
    };
  }, [socketInitializer]);

  const player: Player | null = useMemo(() => {
    if (!socket) return null;
    return players.find((p) => p.id === socket.id) ?? null;
  }, [players]);

  const selectedPlayer = useMemo(() => {
    if (!selectedPlayerId) return null;

    const player = players.find((player) => player.id === selectedPlayerId);
    if (!player) throw new Error('No matching player found !');

    return player;
  }, [selectedPlayerId, players]);

  const playingPlayer: Player = useMemo(() => {
    return players[playingPlayerIndex];
  }, [playingPlayerIndex, players]);

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

  const askQuestion: AskQuestionFn = (question: string) => {
    socket.emit('askQuestion', question);
  };

  const answerQuestion: AnswerQuestionFn = (answer: AnswerType) => {
    socket.emit('answerQuestion', answer);
    setDoIAnswered(true);
  };

  return {
    sceneState,
    player,
    joinedRoom,
    ownerId,
    players,
    selectedPlayer,
    playingPlayer,
    question,
    doIAnswered,
    everybodyAnswered,
    createRoom,
    joinRoom,
    startGame,
    validatePlayerCharacter,
    askQuestion,
    answerQuestion,
  };
};
