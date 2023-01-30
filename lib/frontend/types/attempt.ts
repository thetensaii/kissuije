import { SocketAttemptType } from 'lib/common/socketsTypes';
import { AnswerType } from './answer';
import { GuessType } from './guess';
import { PlayerType } from './player';
import { QuestionType } from './question';

export type BaseAttemptType = {
  type: 'guess' | 'question';
  askerId: PlayerType['id'];
  text: string;
  isAnswered: boolean;
  answers: AnswerType[];
};

export type AttemptType = GuessType | QuestionType;

export const convertSocketAttemptToFrontendAttempt = (attempt: SocketAttemptType): AttemptType => {
  return {
    ...attempt,
    isAnswered: false,
  };
};
