import { useGameRoomContext } from 'providers/GameRoomProvider';
import { PlayersList } from 'components/molecule/PlayersList';
import { AskQuestionForm } from 'components/molecule/AskQuestionForm';
import { GuessForm } from 'components/molecule/GuessForm';
import { WaitForOthers } from 'components/molecule/WaitForOthers';
import { AttemptsList } from 'components/molecule/AttemptsList';
import { useMemo } from 'react';

export const Game = (): JSX.Element => {
  const { players, player, actualRound, attempts, askQuestion, tryGuess, answerAttempt } = useGameRoomContext();

  const areEveryAttemptAnswered = useMemo<boolean>(() => {
    if (!attempts) return true;
    if (!player) return true;

    return attempts.every((a) => a.askerId === player.id || a.isAnswered);
  }, [attempts, player]);

  if (!player) return <></>;

  return (
    <>
      <h1>Round {actualRound}</h1>

      <PlayersList player={player} players={players} />

      {!attempts ? (
        player.attempted ? (
          <WaitForOthers />
        ) : (
          <>
            <AskQuestionForm askQuestion={askQuestion} />
            <GuessForm tryGuess={tryGuess} />
          </>
        )
      ) : areEveryAttemptAnswered ? (
        <WaitForOthers />
      ) : (
        <AttemptsList answerAttempt={answerAttempt} players={players} me={player} attempts={attempts} />
      )}
    </>
  );
};
