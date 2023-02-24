import { H1 } from 'components/atom/Typo/H1';
import { H2 } from 'components/atom/Typo/H2';
import { getAttemptAnswerStats } from 'lib/frontend/functions/ResultStats';
import { QuestionType } from 'lib/frontend/types/question';
import { Card } from '../Card';
import { ResultStatBar } from '../ResultStatBar';
import styles from './QuestionResultCard.module.scss';
type Props = {
  question: QuestionType;
};

export const QuestionResultCard = ({ question }: Props): JSX.Element => {
  const stats = getAttemptAnswerStats(question);

  return (
    <Card>
      <div className={styles.container}>
        <H1>Les réponses à votre question</H1>
        <p className={styles.label}>Les autres participants ont répondus à votre question !</p>
        <div className={styles.questionContainer}>
          <H2>{question.text}</H2>
          <ResultStatBar stats={stats} countTotalAnswers={question.answers.length} />
        </div>
      </div>
    </Card>
  );
};
