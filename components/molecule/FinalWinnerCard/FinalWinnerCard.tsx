import { WinnerType } from 'lib/frontend/types/player';
import { Player } from '../Player';
import styles from './FinalWinnerCard.module.scss';

type Props = {
  winner: WinnerType;
};

export const FinalWinnerCard = ({ winner }: Props): JSX.Element => {
  const { avatar, name, isPlayer, character } = winner;
  return (
    <div className={styles.container}>
      <div className={styles.label}>
        <Player avatar={avatar} name={name} isPlayer={isPlayer} afterSpanText={'a gagné et il était'} />
      </div>
      <p className={styles.character}>{character}</p>
    </div>
  );
};
