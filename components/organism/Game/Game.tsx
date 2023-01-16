import { useGameRoomContext } from 'providers/GameRoomProvider';
import { PlayersList } from 'components/molecule/PlayersList';
import { QuestionForm } from 'components/molecule/QuestionForm';
import { GuessForm } from 'components/molecule/GuessForm';
import { WaitForOthers } from 'components/molecule/WaitForOthers';

export const Game = (): JSX.Element => {
  const { players, player, actualRound, askQuestion, tryGuess } = useGameRoomContext();

  if (!player) return <></>;

  return (
    <>
      <h1>Round {actualRound}</h1>

      <PlayersList player={player} players={players} />

      {player.attempted ? (
        <WaitForOthers />
      ) : (
        <>
          <QuestionForm askQuestion={askQuestion} />
          <GuessForm tryGuess={tryGuess} />
        </>
      )}
    </>
  );
};
