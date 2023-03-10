import { Answer } from './Answer';
import { Attempt } from './Attempt';
import { Guess, isGuess } from './Guess';
import { Player } from './Player';
import { Question } from './Question';

export class Attempts {
  private attempts: Attempt[];

  constructor() {
    this.attempts = [];
  }

  public getAllAttempts(): Attempt[] {
    return this.attempts;
  }

  public doesPlayerAttemptExist(playerId: Player['id']): boolean {
    const playerAttempt = this.getPlayerAttempt(playerId);

    if (!playerAttempt) return false;

    return true;
  }

  public newQuestion(askerId: Player['id'], text: Question['text']): Attempt {
    const attempt = new Question(askerId, text);

    this.attempts.push(attempt);

    return attempt;
  }

  public tryGuess(askerId: Player['id'], text: Guess['text']): Attempt {
    const attempt = new Guess(askerId, text);

    this.attempts.push(attempt);

    return attempt;
  }

  public answerAttempt(askerId: Player['id'], answer: Answer): void {
    const askerAttempt = this.getPlayerAttempt(askerId);

    if (!askerAttempt) throw new Error('');

    askerAttempt.addAnswer(answer);
  }

  public doPlayersWon(): false | Player['id'][] {
    const winners = this.attempts
      .filter(isGuess)
      .filter((a) => a.areAnswersPositive())
      .map((a) => a.askerId);

    if (winners.length === 0) return false;

    return winners;
  }

  public deletePlayerAttempt(playerId: Player['id']): void {
    this.attempts = this.attempts.filter((a) => a.askerId !== playerId);
  }

  private getPlayerAttempt(playerId: Player['id']): Attempt | undefined {
    return this.attempts.find((attempt) => attempt.askerId === playerId);
  }
}
