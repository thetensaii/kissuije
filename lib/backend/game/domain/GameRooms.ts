import { Answer } from './Answer';
import { Attempt } from './Attempt';
import { GameRoom } from './GameRoom';
import { Player } from './Player';
import { PlayerBindToPlayerType } from './Players';

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

  public abstract startGame(roomId: GameRoom['id']): Player[];

  public abstract askQuestion(roomId: GameRoom['id'], playerId: Player['id'], question: string): Attempt;
  public abstract answerQuestion(roomId: GameRoom['id'], answer: Answer): Attempt;
  public abstract doEverybodyAnswered(roomId: GameRoom['id']): boolean;
}
