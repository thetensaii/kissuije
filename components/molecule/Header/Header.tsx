import { MainH1 } from 'components/atom/Typo/MainH1';
import styles from './Header.module.scss';

export const Header = (): JSX.Element => {
  return (
    <header className={styles.header}>
      <MainH1>Kissuije</MainH1>
    </header>
  );
};
