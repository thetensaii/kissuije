import styles from './ButtonTypo.module.scss';

type Props = {
  children: React.ReactNode;
};

export const ButtonTypo = ({ children }: Props): JSX.Element => {
  return <span className={styles.buttonTypo}>{children}</span>;
};
