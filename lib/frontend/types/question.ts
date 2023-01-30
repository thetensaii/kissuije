import { AttemptType, BaseAttemptType } from './attempt';

export type QuestionType = BaseAttemptType & {
  type: 'question';
};

export const isQuestion = (attempt: AttemptType): attempt is QuestionType => attempt.type === 'question';
