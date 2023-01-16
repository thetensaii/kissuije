import { useGameRoomContext } from 'providers/GameRoomProvider';
import { PlayersList } from 'components/molecule/PlayersList';
import { QuestionForm } from 'components/molecule/QuestionForm';

export const Game = (): JSX.Element => {
  const { players, player, actualRound, canAttempt, askQuestion } = useGameRoomContext();

  if (!player) return <></>;

  return (
    <>
      <h1>C'est PARTI !!!!</h1>
      <h3>Round {actualRound}</h3>

      <PlayersList player={player} players={players} />

      {canAttempt && <QuestionForm askQuestion={askQuestion} />}
    </>
  );
};
