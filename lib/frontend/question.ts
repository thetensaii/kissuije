import { SocketAnswerType } from 'lib/common/socketsTypes';

export const AnswerType = {
  yes: 'yes',
  no: 'no',
  idk: 'idk',
} as const;
export type AnswerType = keyof typeof AnswerType;

export type Question = {
  text: string;
  answers: AnswerType[];
};

export const convertSocketAnswerToAnswer = (answer: SocketAnswerType): AnswerType => {
  return answer;
};

export const convertAnswerToSocketAnswer = (answer: AnswerType): SocketAnswerType => {
  return answer;
};
