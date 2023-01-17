import { Attempt } from './Attempt';
import { Guess } from './Guess';
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

  private getPlayerAttempt(playerId: Player['id']): Attempt | undefined {
    return this.attempts.find((attempt) => attempt.askerId === playerId);
  }
}
