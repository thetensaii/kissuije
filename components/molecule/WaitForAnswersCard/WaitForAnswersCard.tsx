import { Icon } from 'components/atom/Icon';
import { Typo } from 'components/atom/Typo';
import { Card } from 'components/molecule/Card';
import styles from './WaitForAnswersCard.module.scss';

export const WaitForAnswersCard = (): JSX.Element => {
  return (
    <Card>
      <div className={styles.container}>
        <Typo tag="h1" variant="heading1">
          Répondez aux questions
        </Typo>
        <p>
          Choisissez une réponse à chacune des questions afin d’aiguiller les participants à trouver leur personnage
        </p>
        <Icon variant="Checked" width={72} height={72} />
        <Typo tag="h2" variant="heading2" font="medium">
          En attente des autres joueurs...
        </Typo>
      </div>
    </Card>
  );
};
