import Image from 'next/image';
import styles from './SvgButton.module.scss';

type Props = {
  onClick: () => void;
  src: string;
  alt: string;
  svgWidth: number;
  svgHeight: number;
};

export const SvgButton = ({ onClick, src, alt, svgWidth, svgHeight }: Props): JSX.Element => {
  return (
    <button className={styles.svgButton} onClick={onClick}>
      <Image src={src} alt={alt} width={svgWidth} height={svgHeight} />
    </button>
  );
};
