import { ContentWindow } from 'components/molecule/ContentWindow';
import styles from './WaitForContinueCard.module.scss';

export const WaitForContinueCard = (): JSX.Element => {
  return (
    <ContentWindow>
      <h2 className={styles.title}>En attente des autres joueurs..</h2>
    </ContentWindow>
  );
};
