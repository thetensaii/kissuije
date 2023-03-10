export type SocketPlayerType = {
  id: string;
  name: string;
  character: string;
  avatar: string;
};
export type SocketAnswerType = 'yes' | 'no' | 'idk';
export type SocketAttemptType = {
  type: 'question' | 'guess';
  askerId: SocketPlayerType['id'];
  text: string;
  answers: SocketAnswerType[];
};

type CallbackVariable<T extends object | undefined> =
  | (T extends object
      ? {
          status: 'OK';
          payload: T;
        }
      : {
          status: 'OK';
        })
  | {
      status: 'NOK';
      message: string;
    };

type CallbackFn<T extends object | undefined = undefined> = (variable: CallbackVariable<T>) => void;

export interface ServerToClientEvents {
  newOwner: (variables: { ownerId: string }) => void;
  playerJoinRoom: (variables: { player: SocketPlayerType }) => void;
  playerLeaveRoom: (variables: { id: string; name: string }) => void;
  choosePlayerCharacter: (variables: { id: string }) => void;
  updatePlayerCharacter: (variables: { id: string; character: string }) => void;
  newRound: (variables: { roundNumber: number }) => void;
  playerAttempted: (variables: { playerId: string }) => void;
  allPlayersAttempted: (variables: { attempts: SocketAttemptType[] }) => void;
  allPlayersAnswered: (variables: { playerAttempt: SocketAttemptType }) => void;
  playerWantsToContinue: (variables: { playerId: string }) => void;
  gameFinish: (variables: { winnerIds: string[]; nextRoomId: string }) => void;
  onlyPlayerLeft: () => void;
}

export interface ClientToServerEvents {
  doesRoomExist: (variables: { roomId: string }, callback: (doesExist: boolean) => void) => void;
  createRoom: (
    variables: {
      name: string;
      avatar: string;
      roomId: string;
    },
    callback: (owner: SocketPlayerType) => void
  ) => void;
  joinRoom: (
    variables: {
      name: string;
      avatar: string;
      roomId: string;
    },
    callback: CallbackFn<{ ownerId: string; players: SocketPlayerType[] }>
  ) => void;
  startGame: (variables: { roomId: string }) => void;
  choosePlayerCharacter: (variables: { roomId: string; targetId: string; character: string }) => void;
  askQuestion: (variables: { roomId: string; text: string }, cb: () => void) => void;
  tryGuess: (variables: { roomId: string; text: string }, cb: () => void) => void;
  answerAttempt: (variables: { roomId: string; askerId: string; answer: SocketAnswerType }, cb: () => void) => void;
  continueToNextRound: (variables: { roomId: string }, cb: () => void) => void;
  leaveRoom: () => void;
}
