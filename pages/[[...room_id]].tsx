import { useRouter } from 'next/router';
import { SceneState } from 'lib/frontend/sceneState';
import { Home } from 'components/organism/Home';
import { useGameRoomContext } from 'providers/GameRoomProvider';
import { JoinedRoom } from 'components/organism/JoinedRoom';
import { ChooseCharacter } from 'components/organism/ChooseCharacter';
import { WaitingRoom } from 'components/organism/WaitingRoom';
import { Game } from 'components/organism/Game';
import { useCallback, useMemo } from 'react';

export default function Root(): JSX.Element {
  const router = useRouter();
  const { room_id } = router.query;
  const { sceneState } = useGameRoomContext();

  const roomId = useMemo(() => {
    if (room_id === undefined) return undefined;

    return room_id[0];
  }, [room_id]);

  const redirectToRoom = useCallback(
    (roomID: string): void => {
      router.push(`/${roomID}`, undefined, { shallow: true });
    },
    [router]
  );

  if (sceneState === SceneState.HOME) return <Home roomId={roomId} redirectToRoom={redirectToRoom} />;
  if (sceneState === SceneState.JOINED_ROOM) return <JoinedRoom />;
  if (sceneState === SceneState.CHOOSE_CHARACTER) return <ChooseCharacter />;
  if (sceneState === SceneState.WAITING_ROOM) return <WaitingRoom />;
  if (sceneState === SceneState.GAME) return <Game />;

  return <h1>Erreur : Veuillez recharger la page</h1>;
}
