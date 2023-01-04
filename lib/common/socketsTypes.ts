import { Player as FrontendPlayer } from '../frontend/player';

export type SocketAnswerType = 'yes' | 'no' | 'idk';

export interface ServerToClientEvents {
  newOwner: (id: string) => void;
  playerJoinRoom: (player: FrontendPlayer) => void;
  playerLeaveRoom: (id: string) => void;
  choosePlayerCharacter: (id: string) => void;
  updatePlayerCharacter: (id: string, character: string) => void;
  launchGame: (playersByGameOrder: FrontendPlayer[]) => void;
  newQuestionAsked: (question: string) => void;
  newAnswer: (answer: SocketAnswerType) => void;
  everybodyAnswered: () => void;
}

export interface ClientToServerEvents {
  doesRoomExist: (room: string, callback: (doesExist: boolean) => void) => void;
  createRoom: (name: string, roomId: string, callback: (owner: FrontendPlayer) => void) => void;
  joinRoom: (name: string, roomId: string, callback: (roomPlayers: FrontendPlayer[]) => void) => void;
  newPlayer: (name: string, roomId: string, callback: (players: FrontendPlayer[]) => void) => void;
  startGame: (roomId: string) => void;
  choosePlayerCharacter: (targetId: string, character: string) => void;
  askQuestion: (question: string) => void;
  answerQuestion: (answer: SocketAnswerType) => void;
}
