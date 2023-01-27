import styles from './BulletPoint.module.scss';

type Props = {
  number: number;
};

export const BulletPoint = ({ number }: Props): JSX.Element => {
  return <div className={styles.bulletPoint}>{number}</div>;
};
