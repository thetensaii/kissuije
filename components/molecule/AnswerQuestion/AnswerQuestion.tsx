import Button from 'components/atom/Button';
import { AnswerAttemptFn } from 'hooks/useRoom';
import { PlayerType } from 'lib/frontend/types/player';
import { QuestionType } from 'lib/frontend/types/question';
import styles from './AnswerQuestion.module.scss';

export type Props = {
  player: PlayerType;
  question: QuestionType;
  answerQuestion: AnswerAttemptFn;
};

export const AnswerQuestion = ({ player, question, answerQuestion }: Props): JSX.Element => {
  return (
    <div className={styles.answerQuestion}>
      <p>
        <b>{player.name}</b> est <b>{player.character}</b>
      </p>

      <h2>{question.text}</h2>

      <div className={styles.answers}>
        <Button onClick={(): void => answerQuestion(question.askerId, 'yes')}>Oui</Button>
        <Button onClick={(): void => answerQuestion(question.askerId, 'no')}>Non</Button>
        <Button onClick={(): void => answerQuestion(question.askerId, 'idk')}>Je ne sais pas</Button>
      </div>
    </div>
  );
};
