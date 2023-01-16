import { Answer } from './Answer';
import { Player } from './Player';

export class Attempt {
  public askerId: Player['id'];
  public text: string;

  public answers: Answer[];

  constructor(id: number, askerId: Player['id'], text: string) {
    this.askerId = askerId;
    this.text = text;
    this.answers = [];
  }
}
