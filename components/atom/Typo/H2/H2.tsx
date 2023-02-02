import styles from './H2.module.scss';

type Props = {
  children: React.ReactNode;
};

export const H2 = ({ children }: Props): JSX.Element => {
  return <h2 className={styles.h2}>{children}</h2>;
};
