import Button from 'components/atom/Button';
import { QuestionResultCard } from 'components/molecule/QuestionResultCard';
import { WrongGuessResultCard } from 'components/molecule/WrongGuessResultCard';
import { isQuestion } from 'lib/frontend/types/question';
import { useGameRoomContext } from 'providers/GameRoomProvider';
import styles from './RoundResult.module.scss';

export const RoundResult = (): JSX.Element => {
  const { attempt, player, continueToNextRound } = useGameRoomContext();

  if (!player) throw new Error('No player');
  if (!attempt) throw new Error('No Answer');

  return (
    <>
      {isQuestion(attempt) ? (
        <div className={styles.questionResultCard}>
          <QuestionResultCard question={attempt} />
        </div>
      ) : (
        <div className={styles.wrongGuessResultCard}>
          <WrongGuessResultCard guess={attempt} />
        </div>
      )}

      <Button className={styles.continueButton} rightIcon="ArrowRight" onClick={continueToNextRound}>
        Continuer
      </Button>
    </>
  );
};
