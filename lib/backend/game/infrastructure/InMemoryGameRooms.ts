import { GameRoom } from '../domain/GameRoom';
import { GameRooms } from '../domain/GameRooms';
import { Player } from '../domain/Player';
import { RoomNotFoundError } from '../domain/errors/RoomNotFoundError';
import { PlayerBindToPlayerType } from '../domain/Players';
import { Question } from '../domain/Question';
import { Attempt } from '../domain/Attempt';
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

  public joinRoom(roomId: GameRoom['id'], player: Player): GameRoom {
    const room = this.getRoom(roomId);

    room.addPlayer(player);

    return room;
  }

  public doesRoomExist(roomId: GameRoom['id']): boolean {
    return this.gameRooms.has(roomId);
  }

  public leaveRoom(roomId: GameRoom['id'], playerId: Player['id']): GameRoom {
    const room = this.getRoom(roomId);

    room.removePlayer(playerId);

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

  public tryGuess(roomId: GameRoom['id'], playerId: string, text: Question['text']): void {
    const room = this.getRoom(roomId);

    room.tryGuess(playerId, text);
  }

  public doAllPlayersAttempted(roomId: GameRoom['id']): false | Attempt[] {
    const room = this.getRoom(roomId);

    return room.doAllPlayersAttempted();
  }

  private getRoom(roomId: GameRoom['id']): GameRoom {
    const room = this.gameRooms.get(roomId);
    if (!room) throw new RoomNotFoundError();

    return room;
  }
}
