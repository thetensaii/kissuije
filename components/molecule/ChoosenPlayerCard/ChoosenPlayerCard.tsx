import { Svg } from 'components/atom/Svg';
import { PlayerType } from 'lib/frontend/types/player';
import styles from './ChoosenPlayerCard.module.scss';

type Props = {
  player: PlayerType;
};

export const ChoosenPlayerCard = ({ player }: Props): JSX.Element => {
  const { avatar, name } = player;
  return (
    <div className={styles.container}>
      <p className={styles.text}>Choisissez un personnage pour</p>
      <div className={styles.choosenPlayerCard}>
        <Svg type={avatar} alt={avatar} width={32} height={32} /> {name}
      </div>
    </div>
  );
};
