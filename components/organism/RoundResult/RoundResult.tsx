import Button from 'components/atom/Button';
import { QuestionResultCard } from 'components/molecule/QuestionResultCard';
import { WaitForOthers } from 'components/molecule/WaitForOthers';
import { WinResult } from 'components/molecule/WinResult';
import { WrongGuessResult } from 'components/molecule/WrongGuessResult';
import { isGuess } from 'lib/frontend/types/guess';
import { isQuestion } from 'lib/frontend/types/question';
import { useGameRoomContext } from 'providers/GameRoomProvider';

export const RoundResult = (): JSX.Element => {
  const { attempt, player } = useGameRoomContext();

  if (!player) return <></>;

  const yesAnswersCount = attempt?.answers.filter((a) => a === 'yes').length ?? 0;
  const noAnswersCount = attempt?.answers.filter((a) => a === 'no').length ?? 0;

  return (
    <>
      {!attempt ? (
        <WaitForOthers />
      ) : isQuestion(attempt) ? (
        <QuestionResultCard question={attempt} />
      ) : isGuess(attempt) && yesAnswersCount >= noAnswersCount ? (
        <WinResult character={player.character} />
      ) : (
        <WrongGuessResult />
      )}

      <Button>Continuer</Button>
    </>
  );
};
