import styles from './MainH1.module.scss';

type Props = {
  children: React.ReactNode;
};

export const MainH1 = ({ children }: Props): JSX.Element => {
  return <h1 className={styles.mainH1}>{children}</h1>;
};
