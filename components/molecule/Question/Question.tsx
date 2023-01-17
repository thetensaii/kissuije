import Button from 'components/atom/Button';
import { PlayerType } from 'lib/frontend/types/player';
import { QuestionType } from 'lib/frontend/types/question';
import styles from './Question.module.scss';

export type Props = {
  player: PlayerType;
  question: QuestionType;
};

export const Question = ({ player, question }: Props): JSX.Element => {
  return (
    <div className={styles.question}>
      <p>
        <b>{player.name}</b> is <b>{player.character}</b>
      </p>

      <h2>{question.text}</h2>

      <div className={styles.answers}>
        <Button>Oui</Button>
        <Button>Non</Button>
        <Button>Je ne sais pas</Button>
      </div>
    </div>
  );
};
