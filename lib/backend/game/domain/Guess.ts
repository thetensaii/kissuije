import { Attempt } from './Attempt';
import { Player } from './Player';

export class Guess extends Attempt {
  constructor(askerId: Player['id'], text: string) {
    super(askerId, text);
    this.type = 'guess';
  }
}
