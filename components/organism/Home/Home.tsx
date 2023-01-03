import Button from 'components/atom/Button';
import { useName } from 'hooks/useName';
import { useGameRoomContext } from 'providers/GameRoomProvider';
import { useRef } from 'react';

interface Props {
  roomId: string | undefined;
  redirectToRoom: (roomId: string) => void;
}

export function Home({ roomId, redirectToRoom }: Props): JSX.Element {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const { name, storeNewName } = useName();
  const { createRoom, joinRoom } = useGameRoomContext();

  const createPartyRoom = (): void => {
    const newName = storeNewName(nameInputRef.current?.value);

    const newRoomID = createRoom(newName);
    redirectToRoom(newRoomID);
  };

  const joinPartyRoom = async (): Promise<void> => {
    const newName = storeNewName(nameInputRef.current?.value);

    const joinedRoomID = await joinRoom(newName, roomId ?? '');
    redirectToRoom(joinedRoomID);
  };

  return (
    <>
      <h1>Kissuije</h1>
      <div>
        <label htmlFor="name">Pseudo :</label>
        <input type="text" id="name" ref={nameInputRef} defaultValue={name} placeholder="Entre ton pseudo" />
      </div>
      {roomId && <Button onClick={joinPartyRoom}>Rejoindre partie</Button>}
      <Button onClick={createPartyRoom}>Créer une salle privée</Button>
    </>
  );
}
