import { SocketAnswerType } from 'lib/common/socketsTypes';

export const Answer = {
  yes: 'yes',
  no: 'no',
  idk: 'idk',
} as const;
export type Answer = keyof typeof Answer;

export type Question = {
  text: string;
  answers: Answer[];
};

export const convertSocketAnswerToAnswer = (answer: SocketAnswerType): Answer => {
  return answer;
};

export const convertAnswerToSocketAnswer = (answer: Answer): SocketAnswerType => {
  return answer;
};
