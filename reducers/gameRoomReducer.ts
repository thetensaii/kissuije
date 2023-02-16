import { AttemptType } from 'lib/frontend/types/attempt';
import { PlayerType } from 'lib/frontend/types/player';
import { SceneState } from 'lib/frontend/types/sceneState';

export const GameRoomActionsType = {
  CREATE_ROOM: 'CREATE_ROOM',
  JOIN_ROOM: 'JOIN_ROOM',
  NEW_OWNER: 'NEW_OWNER',
  PLAYER_JOIN_ROOM: 'PLAYER_JOIN_ROOM',
  PLAYER_LEAVE_ROOM: 'PLAYER_LEAVE_ROOM',
  MOVE_TO_CHOOSE_CHARACTER_SCENE: 'MOVE_TO_CHOOSE_CHARACTER_SCENE',
  UPDATE_PLAYER_CHARACTER: 'UPDATE_PLAYER_CHARACTER',
  CHOOSE_PLAYER_CHARACTER: 'CHOOSE_PLAYER_CHARACTER',
  LAUNCH_NEW_ROUND: 'LAUNCH_NEW_ROUND',
  REDIRECT_TO_ASK_QUESTION_SCENE: 'REDIRECT_TO_ASK_QUESTION_SCENE',
  REDIRECT_TO_TRY_GUESS_SCENE: 'REDIRECT_TO_TRY_GUESS_SCENE',
  MOVE_TO_WAIT_FOR_ATTEMPTS_SCENE: 'MOVE_TO_WAIT_FOR_ATTEMPTS_SCENE',
  UPDATE_PLAYER_ATTEMPTED: 'UPDATE_PLAYER_ATTEMPTED',
  MOVE_TO_ANSWER_ATTEMPTS_SCENE: 'MOVE_TO_ANSWER_ATTEMPTS_SCENE',
  ANSWER_ATTEMPT: 'ANSWER_ATTEMPT',
  MOVE_TO_ROUND_RESULT: 'MOVE_TO_ROUND_RESULT',
  CONTINUE_TO_NEXT_ROUND: 'CONTINUE_TO_NEXT_ROUND',
  GAME_FINISH: 'GAME_FINISH',
  MOVE_TO_FINAL_RESULTS_SCENE: 'MOVE_TO_FINAL_RESULTS_SCENE',
} as const;
export type GameRoomActionsType = typeof GameRoomActionsType[keyof typeof GameRoomActionsType];

type GameRoomActions =
  | {
      type: typeof GameRoomActionsType.CREATE_ROOM;
      payload: {
        roomId: string;
        owner: PlayerType;
      };
    }
  | {
      type: typeof GameRoomActionsType.JOIN_ROOM;
      payload: {
        roomId: string;
        ownerId: string;
        playerId: string;
        players: PlayerType[];
      };
    }
  | {
      type: typeof GameRoomActionsType.NEW_OWNER;
      payload: {
        ownerId: string;
      };
    }
  | {
      type: typeof GameRoomActionsType.PLAYER_JOIN_ROOM;
      payload: {
        player: PlayerType;
      };
    }
  | {
      type: typeof GameRoomActionsType.PLAYER_LEAVE_ROOM;
      payload: {
        playerId: string;
      };
    }
  | {
      type: typeof GameRoomActionsType.MOVE_TO_CHOOSE_CHARACTER_SCENE;
      payload: {
        choosedPlayerId: string;
      };
    }
  | {
      type: typeof GameRoomActionsType.UPDATE_PLAYER_CHARACTER;
      payload: {
        playerId: string;
        character: string;
      };
    }
  | {
      type: typeof GameRoomActionsType.CHOOSE_PLAYER_CHARACTER;
      payload: {
        character: string;
      };
    }
  | {
      type: typeof GameRoomActionsType.LAUNCH_NEW_ROUND;
      payload: {
        roundNumber: number;
      };
    }
  | {
      type: typeof GameRoomActionsType.REDIRECT_TO_ASK_QUESTION_SCENE;
    }
  | {
      type: typeof GameRoomActionsType.REDIRECT_TO_TRY_GUESS_SCENE;
    }
  | {
      type: typeof GameRoomActionsType.MOVE_TO_WAIT_FOR_ATTEMPTS_SCENE;
    }
  | {
      type: typeof GameRoomActionsType.UPDATE_PLAYER_ATTEMPTED;
      payload: {
        playerId: string;
      };
    }
  | {
      type: typeof GameRoomActionsType.MOVE_TO_ANSWER_ATTEMPTS_SCENE;
      payload: {
        attempts: AttemptType[];
      };
    }
  | {
      type: typeof GameRoomActionsType.ANSWER_ATTEMPT;
      payload: {
        askerId: string;
      };
    }
  | {
      type: typeof GameRoomActionsType.MOVE_TO_ROUND_RESULT;
      payload: {
        myAttemptWithAnswers: AttemptType;
      };
    }
  | {
      type: typeof GameRoomActionsType.CONTINUE_TO_NEXT_ROUND;
    }
  | {
      type: typeof GameRoomActionsType.GAME_FINISH;
      payload: {
        winnerIds: string[];
        nextRoomId: string;
      };
    }
  | {
      type: typeof GameRoomActionsType.MOVE_TO_FINAL_RESULTS_SCENE;
    };

export type GameRoomState = {
  scene: SceneState;
  roomId: null | string;
  ownerId: string;
  playerId: string;
  players: PlayerType[];
  choosedPlayerId: string | null;
  actualRound: number;
  attempts: AttemptType[] | null;
  nextRoomId: string;
};

export const initialGameRoomState: GameRoomState = {
  scene: SceneState.HOME,
  roomId: null,
  ownerId: '',
  playerId: '',
  players: [],
  choosedPlayerId: null,
  actualRound: 0,
  attempts: [],
  nextRoomId: '',
};

type GameRoomReducerFn = (state: GameRoomState, action: GameRoomActions) => GameRoomState;

export const gameRoomReducer: GameRoomReducerFn = (state: GameRoomState, action: GameRoomActions): GameRoomState => {
  switch (action.type) {
    case GameRoomActionsType.CREATE_ROOM: {
      const { roomId, owner } = action.payload;
      return {
        ...state,
        scene: SceneState.LOBBY,
        roomId: roomId,
        ownerId: owner.id,
        playerId: owner.id,
        players: [{ ...owner, isOwner: true, isPlayer: true }],
      };
    }
    case GameRoomActionsType.JOIN_ROOM: {
      const { roomId, ownerId, playerId, players } = action.payload;
      return {
        ...state,
        scene: SceneState.LOBBY,
        roomId: roomId,
        ownerId: ownerId,
        playerId: playerId,
        players: players.map((p) => ({
          ...p,
          isOwner: p.id === ownerId,
          isPlayer: p.id === playerId,
        })),
      };
    }
    case GameRoomActionsType.NEW_OWNER: {
      const { ownerId } = action.payload;
      return {
        ...state,
        ownerId: ownerId,
        players: state.players.map((p) => ({ ...p, isOwner: p.id === ownerId })),
      };
    }
    case GameRoomActionsType.PLAYER_JOIN_ROOM: {
      const { player } = action.payload;
      return {
        ...state,
        players: [...state.players, player],
      };
    }
    case GameRoomActionsType.PLAYER_LEAVE_ROOM: {
      const { playerId } = action.payload;
      return {
        ...state,
        scene: state.scene === SceneState.CHOOSE_CHARACTER ? SceneState.LOBBY : state.scene,
        choosedPlayerId: null,
        players: state.players.filter((p) => p.id !== playerId),
      };
    }
    case GameRoomActionsType.MOVE_TO_CHOOSE_CHARACTER_SCENE: {
      const { choosedPlayerId } = action.payload;
      return {
        ...state,
        scene: SceneState.CHOOSE_CHARACTER,
        choosedPlayerId: choosedPlayerId,
      };
    }
    case GameRoomActionsType.UPDATE_PLAYER_CHARACTER: {
      const { playerId: id, character } = action.payload;
      return {
        ...state,
        players: state.players.map((p) => (p.id === id ? { ...p, character: character } : p)),
      };
    }
    case GameRoomActionsType.CHOOSE_PLAYER_CHARACTER: {
      if (!state.choosedPlayerId) throw new Error('No Player Choosed');
      const { character } = action.payload;

      return {
        ...state,
        scene: SceneState.WAIT_FOR_CHARACTERS,
        players: state.players.map((p) => (p.id === state.choosedPlayerId ? { ...p, character: character } : p)),
      };
    }
    case GameRoomActionsType.LAUNCH_NEW_ROUND: {
      const { roundNumber } = action.payload;
      return {
        ...state,
        choosedPlayerId: null,
        attempts: null,
        scene: SceneState.ASK_QUESTION,
        actualRound: roundNumber,
        players: state.players.map((p) => ({ ...p, wantsToContinue: false, attempted: false })),
      };
    }
    case GameRoomActionsType.REDIRECT_TO_ASK_QUESTION_SCENE: {
      return { ...state, scene: SceneState.ASK_QUESTION };
    }
    case GameRoomActionsType.REDIRECT_TO_TRY_GUESS_SCENE: {
      return { ...state, scene: SceneState.TRY_GUESS };
    }
    case GameRoomActionsType.MOVE_TO_WAIT_FOR_ATTEMPTS_SCENE: {
      return { ...state, scene: SceneState.WAIT_FOR_ATTEMPTS };
    }
    case GameRoomActionsType.UPDATE_PLAYER_ATTEMPTED: {
      const { playerId } = action.payload;
      return { ...state, players: state.players.map((p) => (p.id === playerId ? { ...p, attempted: true } : p)) };
    }
    case GameRoomActionsType.MOVE_TO_ANSWER_ATTEMPTS_SCENE: {
      const { attempts } = action.payload;
      return { ...state, scene: SceneState.ANSWER_ATTEMPTS, attempts: attempts };
    }
    case GameRoomActionsType.ANSWER_ATTEMPT: {
      if (!state.attempts) throw new Error('No Attempts');
      const { askerId } = action.payload;

      const updatedAttempts = state.attempts.map((a) => (a.askerId === askerId ? { ...a, isAnswered: true } : a));
      const allAttemptsAnswered = updatedAttempts
        .filter((a) => a.askerId !== state.playerId)
        .every((a) => a.isAnswered);

      return {
        ...state,
        scene: allAttemptsAnswered ? SceneState.WAIT_FOR_ANSWERS : state.scene,
        attempts: updatedAttempts,
      };
    }
    case GameRoomActionsType.MOVE_TO_ROUND_RESULT: {
      if (!state.attempts) throw new Error('No Attempts');
      const { myAttemptWithAnswers } = action.payload;

      return {
        ...state,
        scene: SceneState.ROUND_RESULT,
        attempts: state.attempts.map((a) => (a.askerId === myAttemptWithAnswers.askerId ? myAttemptWithAnswers : a)),
      };
    }
    case GameRoomActionsType.CONTINUE_TO_NEXT_ROUND: {
      return {
        ...state,
        scene: SceneState.WAIT_FOR_CONTINUE,
        players: state.players.map((p) => (p.isPlayer ? { ...p, wantsToContinue: true } : p)),
      };
    }
    case GameRoomActionsType.GAME_FINISH: {
      const { winnerIds, nextRoomId } = action.payload;

      return {
        ...state,
        scene: SceneState.END_GAME,
        nextRoomId: nextRoomId,
        players: state.players.map((p) => (winnerIds.includes(p.id) ? { ...p, hasWon: true } : p)),
      };
    }
    case GameRoomActionsType.MOVE_TO_FINAL_RESULTS_SCENE: {
      return { ...state, scene: SceneState.FINAL_RESULTS };
    }

    default:
      throw new Error(`GameRoomReducer : L'action ${action} n'existe pas`);
  }
};
