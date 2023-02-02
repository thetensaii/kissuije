import { Svg } from 'components/atom/Svg';
import { ContentWindow } from 'components/molecule/ContentWindow';
import styles from './WaitForAnswersCard.module.scss';

export const WaitForAnswersCard = (): JSX.Element => {
  return (
    <ContentWindow>
      <div className={styles.container}>
        <h2>Répondez aux questions</h2>
        <p>
          Choisissez une réponse à chacune des questions afin d’aiguiller les participants à trouver leur personnage
        </p>
        <Svg type="Checked" alt="Checked" width={72} height={72} />
        <p className={styles.waitingText}>En attente des autres joueurs...</p>
      </div>
    </ContentWindow>
  );
};
