import Button from 'components/atom/Button';
import { FinalRanking } from 'components/molecule/FinalRanking';
import { useGameRoomContext } from 'providers/GameRoomProvider';

export const Ranking = (): JSX.Element => {
  const { players, restart } = useGameRoomContext();
  return (
    <>
      <FinalRanking players={players} />
      <div>
        <a href="/">
          <Button>Retour à l'accueil</Button>
        </a>
        <Button onClick={restart}>Rejouer</Button>
      </div>
    </>
  );
};
