import { FinalRanking } from 'components/molecule/FinalRanking';
import { useGameRoomContext } from 'providers/GameRoomProvider';

export const Ranking = (): JSX.Element => {
  const { players } = useGameRoomContext();
  return (
    <>
      <FinalRanking players={players} />
    </>
  );
};
