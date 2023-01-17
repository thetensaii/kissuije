import { Answer } from './Answer';
import { Attempt } from './Attempt';
import { CannotGiveThisAnswerError } from './errors/CannotGiveThisAnswerError';
import { Player } from './Player';

export class Guess extends Attempt {
  constructor(askerId: Player['id'], text: string) {
    super('guess', askerId, text);
    this.type = 'guess';
  }

  public addAnswer(answer: Answer): void {
    if (answer === 'IDK') throw new CannotGiveThisAnswerError();

    this.answers.push(answer);
  }
}
