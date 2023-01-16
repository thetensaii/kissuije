import { useGameRoomContext } from 'providers/GameRoomProvider';
import { PlayersList } from 'components/molecule/PlayersList';
import { QuestionForm } from 'components/molecule/QuestionForm';
import { GuessForm } from 'components/molecule/GuessForm';

export const Game = (): JSX.Element => {
  const { players, player, actualRound, askQuestion, tryGuess } = useGameRoomContext();

  if (!player) return <></>;

  return (
    <>
      <h1>C'est PARTI !!!!</h1>
      <h3>Round {actualRound}</h3>

      <PlayersList player={player} players={players} />

      {!player.attempted && (
        <>
          <QuestionForm askQuestion={askQuestion} />
          <GuessForm tryGuess={tryGuess} />
        </>
      )}
    </>
  );
};
