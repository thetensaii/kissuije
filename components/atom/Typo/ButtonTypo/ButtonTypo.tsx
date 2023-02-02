import styles from './ButtonTypo.module.scss';

type Props = {
  children: React.ReactNode;
};

export const ButtonTypo = ({ children }: Props): JSX.Element => {
  return (
    <>
      <div className={styles.container}>
        <span className={styles.buttonTypo}>{children}</span>
        <span className={styles.buttonTypo400}>{children}</span>
      </div>
    </>
  );
};
