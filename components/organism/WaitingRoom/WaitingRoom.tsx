import { isStringEmpty } from 'lib/common/functions';
import { useGameRoomContext } from 'providers/GameRoomProvider';

export const WaitingRoom = (): JSX.Element => {
  const { selectedPlayer, players } = useGameRoomContext();

  if (!selectedPlayer) return <></>;

  return (
    <>
      <div>
        <h3>Tu as choisi : {selectedPlayer.character}</h3>
        <h4>Pour {selectedPlayer.name}</h4>
      </div>

      <p>
        Nombre de vote : {players.filter((p) => !isStringEmpty(p.character)).length} / {players.length}
      </p>
    </>
  );
};
