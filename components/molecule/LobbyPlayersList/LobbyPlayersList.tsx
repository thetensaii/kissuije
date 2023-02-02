import { PlayerType } from 'lib/frontend/types/player';
import { Player } from '../Player';
import { H2 } from 'components/atom/Typo/H2';

import styles from './LobbyPlayersList.module.scss';

type Props = {
  players: PlayerType[];
};

export const LobbyPlayersList = ({ players }: Props): JSX.Element => {
  const owner = players.find((p) => p.isOwner);
  if (!owner) throw new Error('No Owner');

  const otherPlayers = players.filter((p) => !p.isOwner);

  return (
    <section className={styles.container}>
      <H2>Liste des joueurs connectés</H2>
      <div>
        <div className={styles.playersGrid}>
          <Player avatar={owner.avatar} name={owner.name} isPlayer={owner.isPlayer} isOwner={true} />
          {otherPlayers.map((p) => (
            <Player key={p.id} avatar={p.avatar} name={p.name} isPlayer={p.isPlayer} />
          ))}
        </div>
      </div>
      <p className={styles.playersInLobby}>{players.length} joueurs dans le lobby</p>
    </section>
  );
};
