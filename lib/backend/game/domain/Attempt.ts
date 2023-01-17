import { Answer } from './Answer';
import { Player } from './Player';

export type AttemptType = 'question' | 'guess';

export abstract class Attempt {
  public type: AttemptType;
  public askerId: Player['id'];
  public text: string;
  public answers: Answer[];

  constructor(type: AttemptType, askerId: Player['id'], text: string) {
    this.type = type;
    this.askerId = askerId;
    this.text = text;
    this.answers = [];
  }

  public abstract addAnswer(answer: Answer): void;

  public countAnswers(): number {
    return this.answers.length;
  }
}
