import { Answer } from './Answer';
import { Player } from './Player';

export type AttemptType = 'question' | 'guess';

export abstract class Attempt {
  public askerId: Player['id'];
  public text: string;
  public answers: Answer[];
  public type: AttemptType;

  constructor(type: AttemptType, askerId: Player['id'], text: string) {
    this.askerId = askerId;
    this.text = text;
    this.answers = [];
    this.type = type;
  }
}
