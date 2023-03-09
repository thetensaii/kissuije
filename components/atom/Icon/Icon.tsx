import { Icons, IconVariant } from './types';

type Props = {
  variant: IconVariant;
  width: number;
  height: number;
};

export const Icon = ({ variant, width, height }: Props): JSX.Element => {
  const Component = Icons[variant];

  return <Component width={width} height={height} />;
};
