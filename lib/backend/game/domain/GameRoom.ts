import { getRandomElementFromArray } from 'lib/common/functions';
import { Player } from './Player';
import { PlayerBindToPlayerType, Players } from './Players';

export class GameRoom {
  private id: string;
  private players: Players;
  private ownerId: Player['id'];

  private whoPickCharacterForWho: PlayerBindToPlayerType;

  constructor(id: GameRoom['id'], owner: Player) {
    this.id = id;
    this.players = new Players(owner);
    this.ownerId = owner.id;
    this.whoPickCharacterForWho = {};

    owner.isOwner = true;
  }

  public getOwnerId(): Player['id'] {
    return this.ownerId;
  }

  public addPlayer(player: Player): void {
    this.players.addPlayer(player);
  }

  public removePlayer(playerId: Player['id']): void {
    this.players.removePlayer(playerId);

    if (this.ownerId !== playerId) return;

    const players = this.players.getAll();

    if (players.length == 0) return;

    const newOwner = getRandomElementFromArray(players);
    this.ownerId = newOwner.id;
    newOwner.isOwner = true;
  }

  public getPlayers(): Players {
    return this.players;
  }

  public startPlayerCharacterSelection(): PlayerBindToPlayerType {
    this.whoPickCharacterForWho = this.players.getWhoPickCharacterForWho();

    return this.whoPickCharacterForWho;
  }

  public choosePlayerCharacter(playerId: Player['id'], character: Player['character']): Player {
    const player = this.players.getPlayer(playerId);
    player.character = character;

    return player;
  }

  public doAllPlayersHaveCharacter(): boolean {
    return this.players.doAllPlayersHaveCharacter();
  }

  public startGame(): Player[] {
    this.players.shuffleOrder();

    return this.players.getAll();
  }
}