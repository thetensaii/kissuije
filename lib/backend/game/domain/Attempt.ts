import { Answer } from './Answer';
import { Player } from './Player';

export class Attempt {
  public id: number;
  public askerId: Player['id'];
  public askedRound: number;
  public text: string;

  public answers: Answer[];

  constructor(id: number, askerId: Player['id'], askedRound: number, text: string) {
    this.id = id;
    this.askerId = askerId;
    this.askedRound = askedRound;
    this.text = text;
    this.answers = [];
  }
}
