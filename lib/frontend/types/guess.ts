import { AttemptType, BaseAttemptType } from './attempt';

export type GuessType = BaseAttemptType & {
  type: 'guess';
};

export const isGuess = (attempt: AttemptType): attempt is GuessType => attempt.type === 'guess';
