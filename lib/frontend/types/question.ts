import { AttemptType } from './attempt';

export interface QuestionType extends AttemptType {
  type: 'question';
}

export const isQuestion = (attempt: AttemptType): attempt is QuestionType => attempt.type === 'question';
