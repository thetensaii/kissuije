import { PlayerType } from 'lib/frontend/types/player';
import { Player } from '../Player';
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
        <Player avatar={avatar} name={name} isPlayer={false} />
      </div>
    </div>
  );
};
