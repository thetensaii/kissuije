import { AttemptType } from 'lib/frontend/types/attempt';
import { isGuess } from 'lib/frontend/types/guess';
import { PlayerType } from 'lib/frontend/types/player';
import { isQuestion } from 'lib/frontend/types/question';
import { Guess } from '../Guess';
import { Question } from '../Question';
import styles from './AttemptsList.module.scss';

type Props = {
  attempts: AttemptType[];
  players: PlayerType[];
  me: PlayerType;
};

export const AttemptsList = ({ attempts, players, me }: Props): JSX.Element => {
  return (
    <div className={styles.list}>
      {attempts
        .filter((attempt) => attempt.askerId !== me.id)
        .map<JSX.Element>((attempt) => {
          const asker = players.find((p) => p.id === attempt.askerId);
          if (!asker) return <></>;

          if (isQuestion(attempt)) return <Question key={asker.id} question={attempt} player={asker} />;
          if (isGuess(attempt)) return <Guess key={asker.id} guess={attempt} player={asker} />;

          return <></>;
        })}
    </div>
  );
};
