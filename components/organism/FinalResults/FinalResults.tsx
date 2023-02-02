import Button from 'components/atom/Button';
import { FinalLosersGrid } from 'components/molecule/FinalLosersGrid';
import { FinalWinnersGrid } from 'components/molecule/FinalWinnersGrid';
import { isLoser, isWinner } from 'lib/frontend/types/player';
import { useGameRoomContext } from 'providers/GameRoomProvider';

import styles from './FinalResults.module.scss';

export const FinalResults = (): JSX.Element => {
  const { players, restart } = useGameRoomContext();

  const winners = players.filter(isWinner);
  const losers = players.filter(isLoser);

  const redirectHome = (): void => {
    window.location.href = process.env.NEXT_PUBLIC_HOST ?? '';
  };

  return (
    <>
      <div className={styles.winners}>
        <FinalWinnersGrid winners={winners} />
      </div>

      {losers.length > 0 && (
        <div className={styles.losers}>
          <FinalLosersGrid losers={losers} />
        </div>
      )}

      <div className={styles.buttons}>
        <Button buttonType="ternary" onClick={redirectHome}>
          Retour à l'accueil
        </Button>
        <Button onClick={restart}>Rejouer</Button>
      </div>
    </>
  );
};