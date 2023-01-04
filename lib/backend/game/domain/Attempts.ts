import { Answer } from './Answer';
import { Attempt } from './Attempt';
import { Player } from './Player';

export class Attempts {
  private attempts: Attempt[];

  constructor() {
    this.attempts = [];
  }

  public newAttempt(askerId: Player['id'], askedRound: number, text: Attempt['text']): Attempt {
    const attemptId = this.attempts.length + 1;

    const attempt = new Attempt(attemptId, askerId, askedRound, text);

    this.attempts.push(attempt);

    return attempt;
  }

  public addAnswer(answer: Answer): Attempt {
    const lastAttempt = this.getLastAttempt();

    lastAttempt.addAnswer(answer);

    return lastAttempt;
  }

  public getLastAttempt(): Attempt {
    return this.attempts[this.attempts.length - 1];
  }
}
