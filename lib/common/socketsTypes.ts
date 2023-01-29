export type SocketPlayerType = {
  id: string;
  name: string;
  character: string;
};
export type SocketAnswerType = 'yes' | 'no' | 'idk';
export type SocketAttemptType = {
  type: 'question' | 'guess';
  askerId: SocketPlayerType['id'];
  text: string;
  answers: SocketAnswerType[];
};

export interface ServerToClientEvents {
  newOwner: (id: string) => void;
  playerJoinRoom: (player: SocketPlayerType) => void;
  playerLeaveRoom: (id: string) => void;
  choosePlayerCharacter: (id: string) => void;
  updatePlayerCharacter: (id: string, character: string) => void;
  launchFirstRound: () => void;
  newRound: (roundNumber: number) => void;
  playerAttempted: (playerId: string) => void;
  allPlayersAttempted: (attempts: SocketAttemptType[]) => void;
  allPlayersAnswered: (playerAttempt: SocketAttemptType) => void;
  gameFinish: (winnerIds: string[], nextRoomId: string) => void;
}

export interface ClientToServerEvents {
  doesRoomExist: (room: string, callback: (doesExist: boolean) => void) => void;
  createRoom: (name: string, roomId: string, callback: (owner: SocketPlayerType) => void) => void;
  joinRoom: (
    name: string,
    roomId: string,
    callback: (ownerId: string, roomPlayers: SocketPlayerType[]) => void
  ) => void;
  newPlayer: (name: string, roomId: string, callback: (players: SocketPlayerType[]) => void) => void;
  startGame: (roomId: string) => void;
  choosePlayerCharacter: (roomId: string, targetId: string, character: string) => void;
  askQuestion: (roomId: string, text: string, cb: () => void) => void;
  tryGuess: (roomId: string, text: string, cb: () => void) => void;
  answerAttempt: (roomId: string, askerId: string, answer: SocketAnswerType, cb: () => void) => void;
  continueToNextRound: (roomId: string, cb: () => void) => void;
}
