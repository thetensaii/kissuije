import { Svg } from 'components/atom/Svg';
import { getAttemptAnswerStats } from 'lib/frontend/functions/ResultStats';
import { GuessType } from 'lib/frontend/types/guess';
import { ContentWindow } from '../ContentWindow';
import { ResultStatBar } from '../ResultStatBar';
import styles from './WrongGuessResultCard.module.scss';

type Props = {
  guess: GuessType;
};

export const WrongGuessResultCard = ({ guess }: Props): JSX.Element => {
  const stats = getAttemptAnswerStats(guess);

  return (
    <ContentWindow>
      <div className={styles.title}>
        <Svg type="RedCross" alt="Croix Rouge" width={48} height={48} />
        <p className={styles.text}>Mauvaise réponse !</p>
      </div>
      <p className={styles.label}>
        Vous avez essayé de deviner <b>{guess.text}</b>
      </p>
      <ResultStatBar stats={stats} countTotalAnswers={guess.answers.length} />
    </ContentWindow>
  );
};
