export const AvatarType = {
  AvatarLora: 'AvatarLora',
  AvatarEmile: 'AvatarEmile',
  AvatarHello: 'AvatarHello',
  AvatarJoshua: 'AvatarJoshua',
  AvatarKaithleen: 'AvatarKaithleen',
  AvatarPatrick: 'AvatarPatrick',
  AvatarSalimou: 'AvatarSalimou',
  AvatarKevin: 'AvatarKevin',
} as const;
export type AvatarType = typeof AvatarType[keyof typeof AvatarType];
export const avatarList: AvatarType[] = Object.entries(AvatarType).map(([, value]) => value);

export const SvgType = {
  ChevronLeft: 'ChevronLeft',
  ChevronRight: 'ChevronRight',
  Crown: 'Crown',
  Link: 'Link',
  ArrowRight: 'ArrowRight',
  Checked: 'Checked',
  User: 'User',
  RedCross: 'RedCross',
  PartyPopper: 'PartyPopper',
  Fireworks: 'Fireworks',
  ...AvatarType,
} as const;
export type SvgType = typeof SvgType[keyof typeof SvgType];
export const svgList: SvgType[] = Object.entries(SvgType).map(([, value]) => value);
