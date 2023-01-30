import { AnswerType } from '../types/answer';
import { AttemptType } from '../types/attempt';

export type AnswerResultStats = Record<AnswerType, number>;
const initialStats: AnswerResultStats = {
  yes: 0,
  no: 0,
  idk: 0,
};

export const getAttemptAnswerStats = (attempt: AttemptType): AnswerResultStats => {
  return attempt.answers.reduce(
    (acc, a) => {
      acc[a] = acc[a] + 1;
      return acc;
    },
    { ...initialStats }
  );
};

export const getStatInPercent = (stat: number, total: number): number => Math.round((stat / total) * 100);
