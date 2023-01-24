import { AvatarType } from 'lib/frontend/types/avatar';
import Image from 'next/image';

type Props = {
  type: AvatarType;
};

export const Avatar = ({ type }: Props): JSX.Element => {
  return <Image src={`/boring-avatars/${type}.svg`} alt={`${type} Avatar`} width={60} height={60} />;
};
