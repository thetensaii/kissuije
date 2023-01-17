export type SocketPlayerType = {
  id: string;
  name: string;
  character: string;
};

export type SocketAttemptType = {
  type: 'question' | 'guess';
  askerId: SocketPlayerType['id'];
  text: string;
};

export type SocketAnswerType = 'yes' | 'no' | 'idk';

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
}

export interface ClientToServerEvents {
  doesRoomExist: (room: string, callback: (doesExist: boolean) => void) => void;
  createRoom: (name: string, roomId: string, callback: (owner: SocketPlayerType) => void) => void;
  joinRoom: (name: string, roomId: string, callback: (roomPlayers: SocketPlayerType[]) => void) => void;
  newPlayer: (name: string, roomId: string, callback: (players: SocketPlayerType[]) => void) => void;
  startGame: (roomId: string) => void;
  choosePlayerCharacter: (roomId: string, targetId: string, character: string) => void;
  askQuestion: (roomId: string, text: string) => void;
  tryGuess: (roomId: string, text: string) => void;
  answerAttempt: (roomId: string, askerId: string, answer: SocketAnswerType, cb: () => void) => void;
}
