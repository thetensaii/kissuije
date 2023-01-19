import Button from 'components/atom/Button';
import { Loser } from 'components/molecule/Loser/Loser';
import { Winner } from 'components/molecule/Winner';
import { useGameRoomContext } from 'providers/GameRoomProvider';

export const EndGame = (): JSX.Element => {
  const { player, moveToRankingPage } = useGameRoomContext();

  if (!player) return <></>;

  return (
    <>
      {player.hasWon ? <Winner player={player} /> : <Loser player={player} />}
      <Button onClick={moveToRankingPage}>Continuer</Button>
    </>
  );
};
