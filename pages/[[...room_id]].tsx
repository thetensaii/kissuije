import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { SceneState } from 'lib/frontend/types/sceneState';
import { Home } from 'components/organism/Home';
import { useGameRoomDataContext } from 'providers/GameRoomProvider';
import { Lobby } from 'components/organism/Lobby';
import { ChooseCharacter } from 'components/organism/ChooseCharacter';
import { WaitForCharacter } from 'components/organism/WaitForCharacter';
import { RoundResult } from 'components/organism/RoundResult';
import { EndGame } from 'components/organism/EndGame';
import { FinalResults } from 'components/organism/FinalResults';
import { AskQuestion } from 'components/organism/AskQuestion';
import { WaitForAttempts } from 'components/organism/WaitForAttempts';
import { TryGuess } from 'components/organism/TryGuess';
import { AnswerAttempts } from 'components/organism/AnswerAttempts';
import { WaitForAnswers } from 'components/organism/WaitForAnswers';
import { WaitForContinue } from 'components/organism/WaitForContinue';
import { OnlyPlayerLeft } from 'components/organism/OnlyPlayerLeft';
import { Typo } from 'components/atom/Typo';

export default function Root(): JSX.Element {
  const { query, isReady, push } = useRouter();
  const { room_id } = query;
  const { scene } = useGameRoomDataContext();

  const roomId = useMemo(() => {
    if (room_id === undefined) return undefined;

    return room_id[0];
  }, [room_id]);

  const redirectToRoom = (roomID: string): void => {
    push(`/${roomID}`, undefined, { shallow: true });
  };

  if (!isReady)
    return (
      <Typo tag="h1" variant="heading1">
        Loading...
      </Typo>
    );

  switch (scene) {
    case SceneState.HOME:
      return <Home roomId={roomId} redirectToRoom={redirectToRoom} />;
    case SceneState.LOBBY:
      return <Lobby />;
    case SceneState.CHOOSE_CHARACTER:
      return <ChooseCharacter />;
    case SceneState.WAIT_FOR_CHARACTERS:
      return <WaitForCharacter />;
    case SceneState.ASK_QUESTION:
      return <AskQuestion />;
    case SceneState.TRY_GUESS:
      return <TryGuess />;
    case SceneState.WAIT_FOR_ATTEMPTS:
      return <WaitForAttempts />;
    case SceneState.ANSWER_ATTEMPTS:
      return <AnswerAttempts />;
    case SceneState.WAIT_FOR_ANSWERS:
      return <WaitForAnswers />;
    case SceneState.ROUND_RESULT:
      return <RoundResult />;
    case SceneState.WAIT_FOR_CONTINUE:
      return <WaitForContinue />;
    case SceneState.END_GAME:
      return <EndGame />;
    case SceneState.FINAL_RESULTS:
      return <FinalResults />;
    case SceneState.ONLY_PLAYER_LEFT:
      return <OnlyPlayerLeft />;

    default:
      throw new Error('SCENE DOES NOT EXIST');
  }
}
