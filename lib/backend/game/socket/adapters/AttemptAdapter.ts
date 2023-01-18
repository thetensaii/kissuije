import { SocketAnswerType, SocketAttemptType } from 'lib/common/socketsTypes';
import { Attempt as DomainAttempt } from '../../domain/Attempt';
import { AnswerAdapter } from './AnswerAdapter';

export class AttemptAdapter {
  private answerAdapter: AnswerAdapter;

  constructor() {
    this.answerAdapter = new AnswerAdapter();
  }

  public toSocket(attempt: DomainAttempt): SocketAttemptType {
    const socketAnswers: SocketAnswerType[] = [];
    const { answers } = attempt;

    for (let i = 0; i < answers.length; i++) {
      const socketAnswer = this.answerAdapter.toSocket(answers[i]);
      socketAnswers.push(socketAnswer);
    }

    return {
      ...attempt,
      answers: socketAnswers,
    };
  }
}
