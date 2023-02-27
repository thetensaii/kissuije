import { useName } from 'hooks/useName';
import { useGameRoomAPIContext } from 'providers/GameRoomProvider';
import { PlayerForm } from 'components/molecule/PlayerForm';
import { RulesExplanation } from 'components/molecule/RulesExplanation';

import styles from './Home.module.scss';
import { AvatarType } from 'lib/frontend/types/svg';

interface Props {
  roomId: string | undefined;
  redirectToRoom: (roomId: string) => void;
}

export function Home({ roomId, redirectToRoom }: Props): JSX.Element {
  const { name, setNewName } = useName();
  const { createRoom, joinRoom } = useGameRoomAPIContext();

  const createGameRoom = (name: string, avatar: AvatarType): void => {
    const newRoomID = createRoom({ setNewName, name, avatar });
    redirectToRoom(newRoomID);
  };

  const joinPartyRoom = async (name: string, avatar: AvatarType): Promise<void> => {
    const joinedRoomID = await joinRoom({ setNewName, name, avatar, roomId: roomId ?? '' });
    redirectToRoom(joinedRoomID);
  };

  return (
    <div className={styles.container}>
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
    </div>
  );
}
