import { AnswerType } from 'lib/frontend/types/answer';
import { AttemptType } from 'lib/frontend/types/attempt';
import { isGuess } from 'lib/frontend/types/guess';
import { PlayerType } from 'lib/frontend/types/player';
import { isQuestion } from 'lib/frontend/types/question';
import { AnswerGuessForm } from '../AnswerGuessForm';
import { AnswerQuestionForm } from '../AnswerQuestionForm';
import styles from './AttemptsList.module.scss';

type Props = {
  attempts: AttemptType[];
  players: PlayerType[];
  me: PlayerType;
  answerAttempt: (askerId: string, answer: AnswerType) => void;
};

export const AttemptsList = ({ attempts, players, me, answerAttempt }: Props): JSX.Element => {
  return (
    <div className={styles.list}>
      {attempts
        .filter((attempt) => attempt.askerId !== me.id && !attempt.isAnswered)
        .map<JSX.Element>((attempt, idx) => {
          const asker = players.find((p) => p.id === attempt.askerId);
          if (!asker) return <></>;

          if (isQuestion(attempt))
            return (
              <AnswerQuestionForm
                key={asker.id}
                question={attempt}
                asker={asker}
                answerQuestion={answerAttempt}
                disabled={idx !== 0}
              />
            );

          if (isGuess(attempt))
            return (
              <AnswerGuessForm
                key={asker.id}
                guess={attempt}
                asker={asker}
                answerGuess={answerAttempt}
                disabled={idx !== 0}
              />
            );

          return <></>;
        })}
    </div>
  );
};
