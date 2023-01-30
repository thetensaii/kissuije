import { Svg } from 'components/atom/Svg';
import { PlayerType } from 'lib/frontend/types/player';
import { ContentWindow } from '../ContentWindow';
import styles from './LoserCard.module.scss';

type Props = {
  player: PlayerType;
};

export const LoserCard = ({ player }: Props): JSX.Element => {
  return (
    <ContentWindow>
      <div className={styles.container}>
        <Svg type="RedCross" alt="Croix Rouge" width={109} height={109} />
        <p className={styles.title}>Vous avez perdu !</p>
        <p className={styles.label}>
          Vous étiez : <b>{player.character}</b>
        </p>
      </div>
    </ContentWindow>
  );
};
