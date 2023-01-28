import { PlayerType } from 'lib/frontend/types/player';
import { LobbyPlayer } from '../LobbyPlayer';
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
      <h2>Liste des joueurs connectés</h2>
      <div className={styles.playersGrid}>
        <LobbyPlayer player={owner} />
        {otherPlayers.map((p) => (
          <LobbyPlayer key={p.id} player={p} />
        ))}
      </div>
      <p className={styles.playersInLobby}>{players.length} joueurs dans le lobby</p>
    </section>
  );
};
