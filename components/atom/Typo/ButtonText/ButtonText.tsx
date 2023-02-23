import styles from './ButtonText.module.scss';

type Props = {
  children: React.ReactNode;
};

export const ButtonText = ({ children }: Props): JSX.Element => {
  return <span className={styles.buttonText}>{children}</span>;
};
