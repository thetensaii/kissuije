import { SocketAttemptType } from 'lib/common/socketsTypes';
import { AnswerType } from './answer';
import { PlayerType } from './player';

export interface AttemptType {
  type: 'guess' | 'question';
  askerId: PlayerType['id'];
  text: string;
  isAnswered: boolean;
  answers: AnswerType[];
}

export const convertSocketAttemptToFrontendAttempt = (attempt: SocketAttemptType): AttemptType => {
  return {
    ...attempt,
    isAnswered: false,
    answers: attempt.answers,
  };
};
