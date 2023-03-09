import { Icon } from 'components/atom/Icon';
import { PlayerType } from 'lib/frontend/types/player';
import { Player } from '../Player';

import styles from './PlayersReadyList.module.scss';

type Props = {
  players: PlayerType[];
  checkPlayerReady: (player: PlayerType) => boolean;
};

export const PlayersReadyList = ({ players, checkPlayerReady }: Props): JSX.Element => {
  const countPlayersReady = players.filter(checkPlayerReady).length;

  return (
    <div className={styles.container}>
      <p className={styles.title}>
        {countPlayersReady}/{players.length} joueurs prêts
      </p>
      <div className={styles.playersList}>
        {players.map((p) => (
          <Player
            key={p.id}
            name={p.name}
            avatar={p.avatar}
            isPlayer={p.isPlayer}
            afterSpanText={checkPlayerReady(p) ? <Icon variant="Checked" width={24} height={24} /> : null}
          />
        ))}
      </div>
    </div>
  );
};
