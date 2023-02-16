import { GameRoom } from '../domain/GameRoom';
import { GameRooms } from '../domain/GameRooms';
import { Player } from '../domain/Player';
import { RoomNotFoundError } from '../domain/errors/RoomNotFoundError';
import { PlayerBindToPlayerType } from '../domain/Players';
import { Question } from '../domain/Question';
import { Answer } from '../domain/Answer';
import { Attempts } from '../domain/Attempts';
export class InMemoryGameRooms extends GameRooms {
  private gameRooms: Map<GameRoom['id'], GameRoom>;

  constructor() {
    super();

    this.gameRooms = new Map<GameRoom['id'], GameRoom>();
  }

  public createRoom(roomId: GameRoom['id'], owner: Player): void {
    const newRoom = new GameRoom(roomId, owner);

    this.gameRooms.set(roomId, newRoom);
  }

  public deleteRoom(roomId: string): void {
    this.gameRooms.delete(roomId);
  }

  public joinRoom(roomId: GameRoom['id'], player: Player): GameRoom {
    const room = this.getRoom(roomId);

    room.joinRoom(player);

    return room;
  }

  public getPlayer(roomId: string, playerId: string): Player {
    const room = this.getRoom(roomId);
    return room.getPlayer(playerId);
  }

  public doesRoomExist(roomId: GameRoom['id']): boolean {
    return this.gameRooms.has(roomId);
  }

  public leaveRoom(roomId: GameRoom['id'], playerId: Player['id']): GameRoom {
    const room = this.getRoom(roomId);

    room.leaveRoom(playerId);

    if (room.getPlayers().getAll().length === 0) this.gameRooms.delete(roomId);

    return room;
  }

  public startPlayerCharacterSelection(roomId: GameRoom['id']): PlayerBindToPlayerType {
    const room = this.getRoom(roomId);

    const whoPickCharacterForWho = room.startPlayerCharacterSelection();

    return whoPickCharacterForWho;
  }

  public choosePlayerCharacter(roomId: GameRoom['id'], targetId: Player['id'], character: Player['character']): Player {
    const room = this.getRoom(roomId);

    const updatedPlayer = room.choosePlayerCharacter(targetId, character);

    return updatedPlayer;
  }

  public doAllPlayersHaveCharacter(roomId: GameRoom['id']): boolean {
    const room = this.getRoom(roomId);

    return room.doAllPlayersHaveCharacter();
  }

  public launchNewRound(roomId: GameRoom['id']): NonNullable<GameRoom['actualRound']> {
    const room = this.getRoom(roomId);

    const newRoundNumber = room.launchNewRound();

    return newRoundNumber;
  }

  public askQuestion(roomId: GameRoom['id'], playerId: string, text: Question['text']): void {
    const room = this.getRoom(roomId);

    room.askQuestion(playerId, text);
  }

  public tryGuess(roomId: GameRoom['id'], playerId: Player['id'], text: Question['text']): void {
    const room = this.getRoom(roomId);

    room.tryGuess(playerId, text);
  }

  public doAllPlayersAttempted(roomId: GameRoom['id']): false | Attempts {
    const room = this.getRoom(roomId);

    return room.doAllPlayersAttempted();
  }

  public answerAttempt(roomId: GameRoom['id'], askerId: Player['id'], answer: Answer): void {
    const room = this.getRoom(roomId);

    room.answerAttempt(askerId, answer);
  }

  public doAllPlayersAnswered(roomId: GameRoom['id']): false | Attempts {
    const room = this.getRoom(roomId);

    return room.doAllPlayersAnswered();
  }

  public continueToNextRound(roomId: GameRoom['id'], playerId: Player['id']): void {
    const room = this.getRoom(roomId);

    room.continueToNextRound(playerId);
  }

  public doAllPlayersWantToContinueToNextRound(roomId: GameRoom['id']): boolean {
    const room = this.getRoom(roomId);

    return room.doAllPlayersWantToContinueToNextRound();
  }

  public doPlayersWon(roomId: GameRoom['id']): false | Player['id'][] {
    const room = this.getRoom(roomId);

    return room.doPlayersWon();
  }

  private getRoom(roomId: GameRoom['id']): GameRoom {
    const room = this.gameRooms.get(roomId);
    if (!room) throw new RoomNotFoundError();

    return room;
  }
}
