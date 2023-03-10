import Button from 'components/atom/Button';
import { LoserCard } from 'components/molecule/LoserCard/LoserCard';
import { WinnerCard } from 'components/molecule/WinnerCard';
import { useGameRoomAPIContext, useGameRoomDataContext } from 'providers/GameRoomProvider';
import styles from './EndGame.module.scss';

export const EndGame = (): JSX.Element => {
  const { player, myAttempt } = useGameRoomDataContext();
  const { moveToRankingPage } = useGameRoomAPIContext();

  if (!player) throw new Error('No player');
  if (!myAttempt) throw new Error('No Attempt');

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {player.hasWon ? <WinnerCard player={player} attempt={myAttempt} /> : <LoserCard player={player} />}
      </div>
      <Button className={styles.continueButton} rightIcon="ArrowRight" onClick={moveToRankingPage}>
        Continuer
      </Button>
    </div>
  );
};
