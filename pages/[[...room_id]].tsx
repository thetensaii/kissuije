import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import { SceneState } from 'lib/frontend/types/sceneState';
import { Home } from 'components/organism/Home';
import { useGameRoomContext } from 'providers/GameRoomProvider';
import { Lobby } from 'components/organism/Lobby';
import { ChooseCharacter } from 'components/organism/ChooseCharacter';
import { WaitingRoom } from 'components/organism/WaitingRoom';
import { Game } from 'components/organism/Game';
import { RoundResult } from 'components/organism/RoundResult';
import { EndGame } from 'components/organism/EndGame';
import { Ranking } from 'components/organism/Ranking';
import { AskQuestion } from 'components/organism/AskQuestion';
import { WaitForAttempts } from 'components/organism/WaitForAttempts';

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
  if (sceneState === SceneState.LOBBY) return <Lobby />;
  if (sceneState === SceneState.CHOOSE_CHARACTER) return <ChooseCharacter />;
  if (sceneState === SceneState.WAITING_ROOM) return <WaitingRoom />;
  if (sceneState === SceneState.ASK_QUESTION) return <AskQuestion />;
  if (sceneState === SceneState.WAIT_FOR_ATTEMPTS) return <WaitForAttempts />;
  if (sceneState === SceneState.GAME) return <Game />;
  if (sceneState === SceneState.ROUND_RESULT) return <RoundResult />;
  if (sceneState === SceneState.END_GAME) return <EndGame />;
  if (sceneState === SceneState.RANKING) return <Ranking />;

  return <h1>Erreur : Veuillez recharger la page</h1>;
}
