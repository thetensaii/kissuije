import { getRandomElementFromArray } from 'lib/common/functions';
import { Attempt } from './Attempt';
import { Attempts } from './Attempts';
import { GameHasNotStartedError } from './errors/GameHasNotStartedError';
import { RoundAttemptsNotFoundError } from './errors/RoundAttemptsNotFoundError';
import { Player } from './Player';
import { PlayerBindToPlayerType, Players } from './Players';

export class GameRoom {
  private id: string;
  private players: Players;
  private ownerId: Player['id'];

  private whoPickCharacterForWho: PlayerBindToPlayerType;
  private actualRound: number | null;
  private gameAttempts: Map<NonNullable<GameRoom['actualRound']>, Attempts>;

  constructor(id: GameRoom['id'], owner: Player) {
    this.id = id;
    this.players = new Players(owner);
    this.ownerId = owner.id;
    this.whoPickCharacterForWho = {};
    this.actualRound = null;
    this.gameAttempts = new Map<NonNullable<GameRoom['actualRound']>, Attempts>();
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
  }

  public getPlayers(): Players {
    return this.players;
  }

  public startPlayerCharacterSelection(): PlayerBindToPlayerType {
    this.whoPickCharacterForWho = this.players.getWhoPickCharacterForWho();

    return this.whoPickCharacterForWho;
  }

  public choosePlayerCharacter(targetId: Player['id'], character: Player['character']): Player {
    const player = this.players.getPlayer(targetId);
    player.character = character;

    return player;
  }

  public doAllPlayersHaveCharacter(): boolean {
    return this.players.doAllPlayersHaveCharacter();
  }

  public launchNewRound(): NonNullable<GameRoom['actualRound']> {
    if (this.actualRound === null) this.actualRound = 1;
    else this.actualRound += 1;

    this.gameAttempts.set(this.actualRound, new Attempts());

    return this.actualRound;
  }

  public askQuestion(playerId: Player['id'], text: Attempt['text']): void {
    const actualRoundAttempts = this.getActualRoundAttempts();

    if (actualRoundAttempts.doesPlayerAttemptExist(playerId)) throw new Error();

    actualRoundAttempts.newQuestion(playerId, text);
  }

  private getActualRoundAttempts(): Attempts {
    if (!this.actualRound) throw new GameHasNotStartedError();

    const roundAttempts = this.gameAttempts.get(this.actualRound);

    if (!roundAttempts) throw new RoundAttemptsNotFoundError();

    return roundAttempts;
  }
}
