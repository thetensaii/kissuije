import { AnswerType } from 'lib/frontend/types/answer';
import { QuestionType } from 'lib/frontend/types/question';
import styles from './QuestionResultCard.module.scss';
type Props = {
  question: QuestionType;
};

type QuestionResultStats = Record<AnswerType, number>;
const initialStats: QuestionResultStats = {
  yes: 0,
  no: 0,
  idk: 0,
};

export const QuestionResultCard = ({ question }: Props): JSX.Element => {
  const stats: QuestionResultStats = question.answers.reduce((acc, a) => {
    acc[a] = acc[a] + 1;
    return acc;
  }, initialStats);

  return (
    <div className={styles.questionResultCard}>
      <h2>{question.text}</h2>
      <ul>
        <li>Oui : {stats.yes}</li>
        <li>Non : {stats.no}</li>
        <li>Je ne sais pas : {stats.idk}</li>
      </ul>
    </div>
  );
};
