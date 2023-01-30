import { InputButton } from 'components/atom/InputButton';
import { Svg } from 'components/atom/Svg';
import { AnswerAttemptFn } from 'hooks/useRoom';
import { PlayerType } from 'lib/frontend/types/player';
import { QuestionType } from 'lib/frontend/types/question';
import styles from './AnswerQuestionForm.module.scss';
export type Props = {
  asker: PlayerType;
  question: QuestionType;
  answerQuestion: AnswerAttemptFn;
  disabled: boolean;
};

export const AnswerQuestionForm = ({ asker, question, answerQuestion, disabled }: Props): JSX.Element => {
  return (
    <form className={`${styles.container} ${disabled ? styles.disabled : ''}`}>
      <p className={styles.askerCard}>
        <Svg type="AvatarLora" alt="AvatarLora" width={32} height={32} />
        <span className={styles.askerText}>
          <span className={styles.askerName}>{asker.name}</span>
          <span>est</span>
          <span className={styles.askerCharacter}>{asker.character}</span>
        </span>
      </p>
      <div className={styles.label}>
        <p>répondez à sa question</p>
        <p className={styles.guessText}>"{question.text}"</p>
      </div>
      <div className={styles.answers}>
        <InputButton value="Oui" onClick={(): void => answerQuestion(question.askerId, 'yes')} disabled={disabled} />
        <InputButton value="Non" onClick={(): void => answerQuestion(question.askerId, 'no')} disabled={disabled} />
        <InputButton
          value="Je ne sais pas"
          onClick={(): void => answerQuestion(question.askerId, 'no')}
          disabled={disabled}
        />
      </div>
    </form>
  );
};
