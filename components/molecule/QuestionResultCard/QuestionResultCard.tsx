import { Typo } from 'components/atom/Typo';
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
        <Typo tag="h1" variant="heading1">
          Les réponses à votre question
        </Typo>
        <p className={styles.label}>Les autres participants ont répondus à votre question !</p>
        <div className={styles.questionContainer}>
          <Typo tag="p" variant="heading2" font="medium">
            {question.text}
          </Typo>
          <ResultStatBar stats={stats} countTotalAnswers={question.answers.length} />
        </div>
      </div>
    </Card>
  );
};
