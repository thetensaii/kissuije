import { GameRoom } from '../domain/GameRoom';
import { GameRooms } from '../domain/GameRooms';
import { Player } from '../domain/Player';
import { RoomNotFoundError } from '../domain/errors/RoomNotFoundError';
import { PlayerBindToPlayerType } from '../domain/Players';

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

  public choosePlayerCharacter(roomId: GameRoom['id'], playerId: Player['id'], character: Player['character']): Player {
    const room = this.getRoom(roomId);

    const updatedPlayer = room.choosePlayerCharacter(playerId, character);

    return updatedPlayer;
  }

  public doAllPlayersHaveCharacter(roomId: GameRoom['id']): boolean {
    const room = this.getRoom(roomId);

    return room.doAllPlayersHaveCharacter();
  }

  public startGame(roomId: string): Player[] {
    const room = this.getRoom(roomId);

    const players = room.startGame();

    return players;
  }

  private getRoom(roomId: GameRoom['id']): GameRoom {
    const room = this.gameRooms.get(roomId);
    if (!room) throw new RoomNotFoundError();

    return room;
  }
}
