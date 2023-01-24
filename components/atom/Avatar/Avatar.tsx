import { AvatarType } from 'lib/frontend/types/avatar';
import Image from 'next/image';

type Props = {
  type: AvatarType;
  width?: number;
  height?: number;
};

export const Avatar = ({ type, width, height }: Props): JSX.Element => {
  return <Image src={`/boring-avatars/${type}.svg`} alt={`${type} Avatar`} width={width ?? 60} height={height ?? 60} />;
};
