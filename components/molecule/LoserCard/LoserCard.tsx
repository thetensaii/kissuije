import { Icon } from 'components/atom/Icon';
import { PlayerType } from 'lib/frontend/types/player';
import { Card } from '../Card';
import styles from './LoserCard.module.scss';

type Props = {
  player: PlayerType;
};

export const LoserCard = ({ player }: Props): JSX.Element => {
  return (
    <Card>
      <div className={styles.container}>
        <Icon variant="RedCross" width={109} height={109} />
        <p className={styles.title}>Vous avez perdu !</p>
        <p className={styles.label}>
          Vous étiez : <b>{player.character}</b>
        </p>
      </div>
    </Card>
  );
};
