import { Attempt } from './Attempt';
import { GameRoom } from './GameRoom';
import { Guess } from './Guess';
import { Player } from './Player';
import { PlayerBindToPlayerType } from './Players';
import { Question } from './Question';

export abstract class GameRooms {
  public abstract createRoom(roomId: GameRoom['id'], owner: Player): void;
  public abstract joinRoom(roomId: GameRoom['id'], owner: Player): GameRoom;
  public abstract leaveRoom(roomId: GameRoom['id'], playerId: Player['id']): GameRoom;
  public abstract doesRoomExist(roomId: GameRoom['id']): boolean;
  public abstract startPlayerCharacterSelection(roomId: GameRoom['id']): PlayerBindToPlayerType;
  public abstract choosePlayerCharacter(
    roomId: GameRoom['id'],
    targetId: Player['id'],
    character: Player['character']
  ): Player;
  public abstract doAllPlayersHaveCharacter(roomId: GameRoom['id']): boolean;
  public abstract launchNewRound(roomId: GameRoom['id']): NonNullable<GameRoom['actualRound']>;
  public abstract askQuestion(roomId: GameRoom['id'], playerId: Player['id'], text: Question['text']): void;
  public abstract tryGuess(roomId: GameRoom['id'], playerId: Player['id'], text: Guess['text']): void;
  public abstract doAllPlayersAttempted(roomId: GameRoom['id']): false | Attempt[];
}
