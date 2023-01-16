import { Answer } from './Answer';
import { Player } from './Player';

export abstract class Attempt {
  public askerId: Player['id'];
  public text: string;
  public answers: Answer[];

  constructor(askerId: Player['id'], text: string) {
    this.askerId = askerId;
    this.text = text;
    this.answers = [];
  }
}
