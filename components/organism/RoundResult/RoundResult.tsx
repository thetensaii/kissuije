import Button from 'components/atom/Button';
import { QuestionResultCard } from 'components/molecule/QuestionResultCard';
import { WrongGuessResultCard } from 'components/molecule/WrongGuessResultCard';
import { isQuestion } from 'lib/frontend/types/question';
import { useGameRoomAPIContext, useGameRoomDataContext } from 'providers/GameRoomProvider';
import styles from './RoundResult.module.scss';

export const RoundResult = (): JSX.Element => {
  const { roomId, myAttempt, player } = useGameRoomDataContext();
  const { continueToNextRound } = useGameRoomAPIContext();

  if (!roomId) throw new Error('No Room');
  if (!player) throw new Error('No player');
  if (!myAttempt) throw new Error('No Answer');

  const handleContinueToNextRound = (): void => {
    continueToNextRound(roomId);
  };

  return (
    <div className={styles.container}>
      {isQuestion(myAttempt) ? (
        <div className={styles.questionResultCard}>
          <QuestionResultCard question={myAttempt} />
        </div>
      ) : (
        <div className={styles.wrongGuessResultCard}>
          <WrongGuessResultCard guess={myAttempt} />
        </div>
      )}

      <Button className={styles.continueButton} rightIcon="ArrowRight" onClick={handleContinueToNextRound}>
        Continuer
      </Button>
    </div>
  );
};
