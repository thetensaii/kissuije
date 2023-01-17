import { AnswerAttemptFn } from 'hooks/useRoom';
import { AttemptType } from 'lib/frontend/types/attempt';
import { isGuess } from 'lib/frontend/types/guess';
import { PlayerType } from 'lib/frontend/types/player';
import { isQuestion } from 'lib/frontend/types/question';
import { AnswerGuess } from '../AnswerGuess';
import { AnswerQuestion } from '../AnswerQuestion';
import styles from './AttemptsList.module.scss';

type Props = {
  attempts: AttemptType[];
  players: PlayerType[];
  me: PlayerType;
  answerAttempt: AnswerAttemptFn;
};

export const AttemptsList = ({ attempts, players, me, answerAttempt }: Props): JSX.Element => {
  return (
    <div className={styles.list}>
      {attempts
        .filter((attempt) => attempt.askerId !== me.id && !attempt.isAnswered)
        .map<JSX.Element>((attempt) => {
          const asker = players.find((p) => p.id === attempt.askerId);
          if (!asker) return <></>;

          if (isQuestion(attempt))
            return <AnswerQuestion key={asker.id} question={attempt} player={asker} answerQuestion={answerAttempt} />;
          if (isGuess(attempt))
            return <AnswerGuess key={asker.id} guess={attempt} player={asker} answerGuess={answerAttempt} />;

          return <></>;
        })}
    </div>
  );
};
