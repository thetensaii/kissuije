import { useGameRoomContext } from 'providers/GameRoomProvider';
import { PlayersList } from 'components/molecule/PlayersList';

export const Game = (): JSX.Element => {
  const { players, player, actualRound } = useGameRoomContext();

  if (!player) return <></>;

  return (
    <>
      <h1>C'est PARTI !!!!</h1>
      <h3>Round {actualRound}</h3>

      <PlayersList player={player} players={players} />
    </>
  );
};
