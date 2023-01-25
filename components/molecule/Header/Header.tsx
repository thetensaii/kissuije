import styles from './Header.module.scss';

export const Header = (): JSX.Element => {
  return (
    <header className={styles.header}>
      <h1>Kissuije</h1>
    </header>
  );
};
