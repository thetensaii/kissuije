import { useGameRoomContext } from 'providers/GameRoomProvider';
import { PlayersList } from 'components/molecule/PlayersList';

export const Game = (): JSX.Element => {
  const { players, player } = useGameRoomContext();

  if (!player) return <></>;

  return (
    <>
      <h1>C'est PARTI !!!!</h1>

      <PlayersList player={player} players={players} />
    </>
  );
};
