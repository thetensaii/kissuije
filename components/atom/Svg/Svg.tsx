import { SvgType } from 'lib/frontend/types/svg';
import Image from 'next/image';

type Props = {
  type: SvgType;
  alt: string;
  width: number;
  height: number;
};

export const Svg = ({ type, alt, width, height }: Props): JSX.Element => {
  return <Image src={`/svgs/${type}.svg`} alt={alt} width={width} height={height} />;
};
