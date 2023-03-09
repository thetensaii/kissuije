import { Icon } from 'components/atom/Icon';
import { Typo } from 'components/atom/Typo';
import { getAttemptAnswerStats } from 'lib/frontend/functions/ResultStats';
import { GuessType } from 'lib/frontend/types/guess';
import { Card } from '../Card';
import { ResultStatBar } from '../ResultStatBar';
import styles from './WrongGuessResultCard.module.scss';

type Props = {
  guess: GuessType;
};

export const WrongGuessResultCard = ({ guess }: Props): JSX.Element => {
  const stats = getAttemptAnswerStats(guess);

  return (
    <Card>
      <div className={styles.title}>
        <Icon variant="RedCross" width={48} height={48} />
        <Typo tag="h1" variant="heading1">
          Mauvaise réponse !
        </Typo>
      </div>
      <p className={styles.label}>
        Vous avez essayé de deviner <b>{guess.text}</b>
      </p>
      <ResultStatBar stats={stats} countTotalAnswers={guess.answers.length} />
    </Card>
  );
};
