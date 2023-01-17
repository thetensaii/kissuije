import { useGameRoomContext } from 'providers/GameRoomProvider';
import { PlayersList } from 'components/molecule/PlayersList';
import { QuestionForm } from 'components/molecule/QuestionForm';
import { GuessForm } from 'components/molecule/GuessForm';
import { WaitForOthers } from 'components/molecule/WaitForOthers';
import { AttemptsList } from 'components/molecule/AttemptsList';

export const Game = (): JSX.Element => {
  const { players, player, actualRound, attempts, askQuestion, tryGuess } = useGameRoomContext();

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
            <QuestionForm askQuestion={askQuestion} />
            <GuessForm tryGuess={tryGuess} />
          </>
        )
      ) : (
        <AttemptsList players={players} me={player} attempts={attempts} />
      )}
    </>
  );
};
