import { Answer } from './Answer';
import { Attempts } from './Attempts';
import { GameRoom } from './GameRoom';
import { GameState } from './GameState';
import { Guess } from './Guess';
import { Player } from './Player';
import { PlayerBindToPlayerType } from './Players';
import { Question } from './Question';

export abstract class GameRooms {
  public abstract createRoom(roomId: GameRoom['id'], owner: Player): void;
  public abstract deleteRoom(roomId: GameRoom['id']): void;
  public abstract joinRoom(roomId: GameRoom['id'], owner: Player): GameRoom;
  public abstract leaveRoom(roomId: GameRoom['id'], playerId: Player['id']): GameRoom;
  public abstract getPlayer(roomId: GameRoom['id'], playerId: Player['id']): Player;
  public abstract doesRoomExist(roomId: GameRoom['id']): boolean;
  public abstract getRoomGameState(roomId: GameRoom['id']): GameState;
  public abstract startGame(roomId: GameRoom['id']): PlayerBindToPlayerType;
  public abstract choosePlayerCharacter(
    roomId: GameRoom['id'],
    targetId: Player['id'],
    character: Player['character']
  ): Player;
  public abstract launchNewRound(roomId: GameRoom['id']): NonNullable<GameRoom['actualRound']>;
  public abstract askQuestion(roomId: GameRoom['id'], playerId: Player['id'], text: Question['text']): void;
  public abstract tryGuess(roomId: GameRoom['id'], playerId: Player['id'], text: Guess['text']): void;
  public abstract doAllPlayersAttempted(roomId: GameRoom['id']): false | Attempts;
  public abstract answerAttempt(roomId: GameRoom['id'], askerID: Player['id'], answer: Answer): void;
  public abstract doAllPlayersAnswered(roomId: GameRoom['id']): false | Attempts;
  public abstract continueToNextRound(roomId: GameRoom['id'], playerId: Player['id']): void;
  public abstract doAllPlayersWantToContinueToNextRound(roomId: GameRoom['id']): boolean;
  public abstract doPlayersWon(roomId: GameRoom['id']): false | Player['id'][];
}
