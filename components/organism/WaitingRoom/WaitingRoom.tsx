import { isStringEmpty } from 'lib/common/functions';
import { useGameRoomContext } from 'providers/GameRoomProvider';

export const WaitingRoom = (): JSX.Element => {
  const { playerChoosed, players } = useGameRoomContext();

  if (!playerChoosed) return <></>;

  return (
    <>
      <div>
        <h3>Tu as choisi : {playerChoosed.character}</h3>
        <h4>Pour {playerChoosed.name}</h4>
      </div>

      <p>
        Nombre de vote : {players.filter((p) => !isStringEmpty(p.character)).length} / {players.length}
      </p>
    </>
  );
};
