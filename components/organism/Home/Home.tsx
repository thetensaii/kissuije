import { useName } from 'hooks/useName';
import { useGameRoomContext } from 'providers/GameRoomProvider';
import { PlayerForm } from 'components/molecule/PlayerForm';
import { RuleExplanation } from 'components/molecule/RuleExplanation';
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
      {roomId ? (
        <PlayerForm initialName={name} type="joinRoom" createGameRoom={createGameRoom} joinGameRoom={joinPartyRoom} />
      ) : (
        <PlayerForm initialName={name} type="createRoom" createGameRoom={createGameRoom} />
      )}

      <h2>Comment jouer ?</h2>
      <div className={styles.rulesExplanations}>
        <RuleExplanation number={1}>
          <p>Chaque joueur choisis un personnage pour un autre joueur</p>
        </RuleExplanation>
        <RuleExplanation number={2}>
          <p>A ton tour, tu pourras poser des questions pour deviner ton personnage</p>
        </RuleExplanation>
        <RuleExplanation number={3}>
          <p>Tu répondras ensuite aux questions des autres joueurs concernant leur personnage</p>
        </RuleExplanation>
        <RuleExplanation number={4}>
          <p>Le premier qui trouve à gagner !</p>
        </RuleExplanation>
      </div>
    </>
  );
}
