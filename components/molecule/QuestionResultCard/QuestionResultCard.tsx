import { getAttemptAnswerStats } from 'lib/frontend/functions/ResultStats';
import { QuestionType } from 'lib/frontend/types/question';
import { ContentWindow } from '../ContentWindow';
import { ResultStatBar } from '../ResultStatBar';
import styles from './QuestionResultCard.module.scss';
type Props = {
  question: QuestionType;
};

export const QuestionResultCard = ({ question }: Props): JSX.Element => {
  const stats = getAttemptAnswerStats(question);

  return (
    <ContentWindow>
      <div className={styles.container}>
        <h2 className={styles.title}>Les réponses à votre question</h2>
        <p className={styles.label}>Les autres participants ont répondus à votre question !</p>
        <div className={styles.questionContainer}>
          <p className={styles.text}>{question.text}</p>
          <ResultStatBar stats={stats} countTotalAnswers={question.answers.length} />
        </div>
      </div>
    </ContentWindow>
  );
};
