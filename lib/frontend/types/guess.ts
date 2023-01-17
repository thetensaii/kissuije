import { AttemptType } from './attempt';

export interface GuessType extends AttemptType {
  type: 'guess';
}

export const isGuess = (attempt: AttemptType): attempt is GuessType => attempt.type === 'guess';
