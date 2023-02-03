import { useName } from 'hooks/useName';
import { useGameRoomContext } from 'providers/GameRoomProvider';
import { PlayerForm } from 'components/molecule/PlayerForm';
import { RulesExplanation } from 'components/molecule/RulesExplanation';

import styles from './Home.module.scss';

interface Props {
  roomId: string | undefined;
  redirectToRoom: (roomId: string) => void;
}

export function Home({ roomId, redirectToRoom }: Props): JSX.Element {
  const { name, storeNewName } = useName();
  const { createRoom, joinRoom } = useGameRoomContext();

  const createGameRoom = (name: string): void => {
    const newName = storeNewName(name);

    const newRoomID = createRoom(newName);
    redirectToRoom(newRoomID);
  };

  const joinPartyRoom = async (name: string): Promise<void> => {
    const newName = storeNewName(name);

    const joinedRoomID = await joinRoom(newName, roomId ?? '');
    redirectToRoom(joinedRoomID);
  };

  return (
    <>
      <div className={styles.formContainer}>
        {roomId ? (
          <PlayerForm initialName={name} type="joinRoom" createGameRoom={createGameRoom} joinGameRoom={joinPartyRoom} />
        ) : (
          <PlayerForm initialName={name} type="createRoom" createGameRoom={createGameRoom} />
        )}
      </div>

      <div className={styles.rulesContainer}>
        <RulesExplanation />
      </div>
    </>
  );
}
