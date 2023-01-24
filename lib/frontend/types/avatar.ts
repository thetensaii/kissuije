// Each Avatar types correspond to the name of a svg file stored in the folder public/boring-avatars/

export const AvatarType = {
  Lora: 'Lora',
  Emile: 'Emile',
  Hello: 'Hello',
  Joshua: 'Joshua',
  Kaithleen: 'Kaithleen',
  Patrick: 'Patrick',
  Salimou: 'Salimou',
  Kevin: 'Kevin',
} as const;

export type AvatarType = typeof AvatarType[keyof typeof AvatarType];
export const AvatarList: AvatarType[] = Object.entries(AvatarType).map(([, value]) => value);
