import { Typo } from 'components/atom/Typo';
import styles from './Header.module.scss';

export const Header = (): JSX.Element => {
  return (
    <header className={styles.header}>
      <Typo tag="h1" variant="mainHeading1">
        Kissuije
      </Typo>
    </header>
  );
};
