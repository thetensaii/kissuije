export const AnswerType = {
  yes: 'yes',
  no: 'no',
  idk: 'idk',
} as const;
export type AnswerType = keyof typeof AnswerType;
