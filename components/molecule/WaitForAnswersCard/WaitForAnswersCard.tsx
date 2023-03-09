import { Icon } from 'components/atom/Icon';
import { H1 } from 'components/atom/Typo/H1';
import { H2 } from 'components/atom/Typo/H2';
import { Card } from 'components/molecule/Card';
import styles from './WaitForAnswersCard.module.scss';

export const WaitForAnswersCard = (): JSX.Element => {
  return (
    <Card>
      <div className={styles.container}>
        <H1>Répondez aux questions</H1>
        <p>
          Choisissez une réponse à chacune des questions afin d’aiguiller les participants à trouver leur personnage
        </p>
        <Icon variant="Checked" width={72} height={72} />
        <H2>En attente des autres joueurs...</H2>
      </div>
    </Card>
  );
};
