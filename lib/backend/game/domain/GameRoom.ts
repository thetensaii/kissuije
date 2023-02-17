import { getRandomElementFromArray } from 'lib/common/functions';
import { Answer } from './Answer';
import { Attempts } from './Attempts';
import { GameAlreadyLaunchError } from './errors/GameAlreadyLaunchError';
import { GameHasNotStartedError } from './errors/GameHasNotStartedError';
import { PlayerHaveAlreadyAttemptedError } from './errors/PlayerHaveAlreadyAttemptedError';
import { RoundAttemptsNotFoundError } from './errors/RoundAttemptsNotFoundError';
import { RoundNotDefinedError } from './errors/RoundNotDefinedError';
import { GameState } from './GameState';
import { Guess } from './Guess';
import { Player } from './Player';
import { PlayerBindToPlayerType, Players } from './Players';
import { Question } from './Question';

export class GameRoom {
  private id: string;
  private state: GameState;
  private players: Players;
  private ownerId: Player['id'];
  private whoChooseCharacterForWho: PlayerBindToPlayerType;
  private actualRound: number | null;
  private gameAttempts: Map<NonNullable<GameRoom['actualRound']>, Attempts>;
  private playersWhoWantToContinue: Player['id'][];

  constructor(id: GameRoom['id'], owner: Player) {
    this.id = id;
    this.state = GameState.LOBBY;
    this.players = new Players(owner);
    this.ownerId = owner.id;
    this.whoChooseCharacterForWho = {};
    this.actualRound = null;
    this.gameAttempts = new Map<NonNullable<GameRoom['actualRound']>, Attempts>();
    this.playersWhoWantToContinue = [];
  }

  public getOwnerId(): Player['id'] {
    return this.ownerId;
  }

  public getState(): GameRoom['state'] {
    return this.state;
  }

  public isEmpty(): boolean {
    return this.players.isEmpty();
  }

  public joinRoom(player: Player): void {
    if (this.state !== GameState.LOBBY) throw new GameAlreadyLaunchError();

    this.players.addPlayer(player);
  }

  public leaveRoom(playerId: Player['id']): void {
    this.players.removePlayer(playerId);

    if (this.state === GameState.CHOOSE_CHARACTER) {
      this.setState(GameState.LOBBY);
    } else if (this.state === GameState.ATTEMPTING) {
      if (!this.actualRound) throw new RoundNotDefinedError();

      const attempts = this.gameAttempts.get(this.actualRound);
      if (attempts) attempts.deletePlayerAttempt(playerId);
    }

    if (this.ownerId !== playerId) return;

    const players = this.players.getAll();

    if (players.length == 0) return;

    const newOwner = getRandomElementFromArray(players);
    this.ownerId = newOwner.id;
  }

  public getPlayer(playerId: Player['id']): Player {
    return this.players.getPlayer(playerId);
  }

  public getPlayers(): Players {
    return this.players;
  }
  public countPlayers(): number {
    return this.players.countPlayers();
  }

  public startGame(): PlayerBindToPlayerType {
    this.setState(GameState.CHOOSE_CHARACTER);
    this.whoChooseCharacterForWho = this.players.generateWhoChooseCharacterForWho();

    return this.whoChooseCharacterForWho;
  }

  public choosePlayerCharacter(targetId: Player['id'], character: Player['character']): Player {
    const player = this.players.getPlayer(targetId);
    player.character = character;

    if (this.players.doAllPlayersHaveCharacter()) this.launchNewRound();

    return player;
  }

  public launchNewRound(): NonNullable<GameRoom['actualRound']> {
    this.playersWhoWantToContinue = [];
    this.setState(GameState.ATTEMPTING);

    if (this.actualRound === null) this.actualRound = 1;
    else this.actualRound += 1;

    this.gameAttempts.set(this.actualRound, new Attempts());

    return this.actualRound;
  }

  public askQuestion(playerId: Player['id'], text: Question['text']): void {
    const actualRoundAttempts = this.getActualRoundAttempts();

    if (actualRoundAttempts.doesPlayerAttemptExist(playerId)) throw new PlayerHaveAlreadyAttemptedError();

    actualRoundAttempts.newQuestion(playerId, text);
  }

  public tryGuess(playerId: Player['id'], text: Guess['text']): void {
    const actualRoundAttempts = this.getActualRoundAttempts();

    if (actualRoundAttempts.doesPlayerAttemptExist(playerId)) throw new PlayerHaveAlreadyAttemptedError();

    actualRoundAttempts.tryGuess(playerId, text);
  }

  public doAllPlayersAttempted(): false | Attempts {
    const actualRoundAttempts = this.getActualRoundAttempts();

    const allPlayersAttempted = this.players.getAll().every((p) => actualRoundAttempts.doesPlayerAttemptExist(p.id));
    if (!allPlayersAttempted) return false;

    return actualRoundAttempts;
  }

  public answerAttempt(askerId: Player['id'], answer: Answer): void {
    const actualRoundAttempts = this.getActualRoundAttempts();

    actualRoundAttempts.answerAttempt(askerId, answer);
  }

  public doAllPlayersAnswered(): false | Attempts {
    const actualRoundAttempts = this.getActualRoundAttempts();

    const countPlayers = this.players.countPlayers();

    const allPlayersAttempted = actualRoundAttempts.getAllAttempts().every((a) => a.countAnswers() >= countPlayers - 1);
    if (!allPlayersAttempted) return false;

    return actualRoundAttempts;
  }

  public continueToNextRound(playerId: Player['id']): void {
    this.playersWhoWantToContinue.push(playerId);
  }

  public doAllPlayersWantToContinueToNextRound(): boolean {
    return this.players.getAll().every((p) => this.playersWhoWantToContinue.includes(p.id));
  }

  public doPlayersWon(): false | Player['id'][] {
    return this.getActualRoundAttempts().doPlayersWon();
  }
  private getActualRoundAttempts(): Attempts {
    if (!this.actualRound) throw new GameHasNotStartedError();

    const roundAttempts = this.gameAttempts.get(this.actualRound);

    if (!roundAttempts) throw new RoundAttemptsNotFoundError();

    return roundAttempts;
  }
  private setState(newState: GameState): void {
    this.state = newState;
  }
}
