import styles from './H1.module.scss';

type Props = {
  children: React.ReactNode;
};

export const H1 = ({ children }: Props): JSX.Element => {
  return <h1 className={styles.h1}>{children}</h1>;
};
