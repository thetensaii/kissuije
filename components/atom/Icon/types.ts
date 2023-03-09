import { ArrowRight } from './svgs/ArrowRight';
import { AvatarEmile } from './svgs/avatars/AvatarEmile';
import { AvatarHello } from './svgs/avatars/AvatarHello';
import { AvatarJoshua } from './svgs/avatars/AvatarJoshua';
import { AvatarKaithleen } from './svgs/avatars/AvatarKaithleen';
import { AvatarKevin } from './svgs/avatars/AvatarKevin';
import { AvatarLora } from './svgs/avatars/AvatarLora';
import { AvatarPatrick } from './svgs/avatars/AvatarPatrick';
import { AvatarSalimou } from './svgs/avatars/AvatarSalimou';
import { Checked } from './svgs/Checked';
import { ChevronLeft } from './svgs/ChevronLeft';
import { ChevronRight } from './svgs/ChevronRight';
import { Crown } from './svgs/Crown';
import { Fireworks } from './svgs/Fireworks';
import { Link } from './svgs/Link';
import { PartyPopper } from './svgs/PartyPopper';
import { RedCross } from './svgs/RedCross';
import { User } from './svgs/User';

export const Avatar = {
  AvatarLora,
  AvatarEmile,
  AvatarHello,
  AvatarJoshua,
  AvatarKaithleen,
  AvatarPatrick,
  AvatarSalimou,
  AvatarKevin,
} as const;
export type AvatarVariant = keyof typeof Avatar;
export const avatarsList: AvatarVariant[] = Object.entries(Avatar).map(([key]) => key as AvatarVariant);

export const Icons = {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Checked,
  Link,
  PartyPopper,
  RedCross,
  User,
  Fireworks,
  Crown,
  ...Avatar,
} as const;

export type IconVariant = keyof typeof Icons;
export const iconsList: IconVariant[] = Object.entries(Icons).map(([key]) => key as IconVariant);
