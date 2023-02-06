import { InputButton } from 'components/atom/InputButton';
import { Svg } from 'components/atom/Svg';
import { AnswerType } from 'lib/frontend/types/answer';
import { PlayerType } from 'lib/frontend/types/player';
import { QuestionType } from 'lib/frontend/types/question';
import styles from './AnswerQuestionForm.module.scss';
export type Props = {
  asker: PlayerType;
  question: QuestionType;
  answerQuestion: (askerId: string, answer: AnswerType) => void;
  disabled: boolean;
};

export const AnswerQuestionForm = ({ asker, question, answerQuestion, disabled }: Props): JSX.Element => {
  return (
    <form className={`${styles.container} ${disabled ? styles.disabled : ''}`}>
      <p className={styles.askerCard}>
        <Svg type={asker.avatar} alt={asker.avatar} width={32} height={32} />
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
        <InputButton type="yes" onClick={(): void => answerQuestion(question.askerId, 'yes')} disabled={disabled}>
          Oui
        </InputButton>
        <InputButton type="no" onClick={(): void => answerQuestion(question.askerId, 'no')} disabled={disabled}>
          Non
        </InputButton>
        <InputButton type="idk" onClick={(): void => answerQuestion(question.askerId, 'idk')} disabled={disabled}>
          Je ne sais pas
        </InputButton>
      </div>
    </form>
  );
};
