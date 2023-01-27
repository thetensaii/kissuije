import { useName } from 'hooks/useName';
import { useGameRoomContext } from 'providers/GameRoomProvider';
import { PlayerForm } from 'components/molecule/PlayerForm';

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
      {roomId ? (
        <PlayerForm initialName={name} type="joinRoom" createGameRoom={createGameRoom} joinGameRoom={joinPartyRoom} />
      ) : (
        <PlayerForm initialName={name} type="createRoom" createGameRoom={createGameRoom} />
      )}
    </>
  );
}
