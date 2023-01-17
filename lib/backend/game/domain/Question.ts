import { Attempt } from './Attempt';
import { Player } from './Player';

export class Question extends Attempt {
  constructor(askerId: Player['id'], text: string) {
    super('question', askerId, text);
    this.type = 'question';
  }
}
