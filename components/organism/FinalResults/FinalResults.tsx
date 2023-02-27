import Button from 'components/atom/Button';
import { FinalLosersGrid } from 'components/molecule/FinalLosersGrid';
import { FinalWinnersGrid } from 'components/molecule/FinalWinnersGrid';
import { isLoser, isWinner } from 'lib/frontend/types/player';
import { useGameRoomAPIContext, useGameRoomDataContext } from 'providers/GameRoomProvider';

import styles from './FinalResults.module.scss';

export const FinalResults = (): JSX.Element => {
  const { nextRoomId, player, players } = useGameRoomDataContext();
  const { restart } = useGameRoomAPIContext();

  if (!player) throw new Error('No Player');

  const winners = players.filter(isWinner);
  const losers = players.filter(isLoser);

  const redirectHome = (): void => {
    window.location.href = process.env.NEXT_PUBLIC_HOST ?? '';
  };

  const handleRestart = (): void => {
    if (!nextRoomId) throw new Error('No Next Room');
    restart(nextRoomId, player);
  };

  return (
    <div className={styles.container}>
      <div className={styles.winners}>
        <FinalWinnersGrid winners={winners} />
      </div>

      {losers.length > 0 && (
        <div className={styles.losers}>
          <FinalLosersGrid losers={losers} />
        </div>
      )}

      <div className={styles.buttons}>
        <Button variant="ternary" onClick={redirectHome}>
          Retour à l'accueil
        </Button>
        <Button onClick={handleRestart}>Rejouer</Button>
      </div>
    </div>
  );
};
