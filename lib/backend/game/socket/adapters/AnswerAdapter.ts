import { SocketAnswerType } from 'lib/common/socketsTypes';
import { Answer as DomainAnswer } from '../../domain/Answer';

export class AnswerAdapter {
  public toDomain(answer: SocketAnswerType): DomainAnswer {
    if (answer === 'yes') return 'YES';
    if (answer === 'no') return 'NO';
    else return 'IDK';
  }

  public toSocket(answer: DomainAnswer): SocketAnswerType {
    if (answer === 'YES') return 'yes';
    if (answer === 'NO') return 'no';
    else return 'idk';
  }
}
