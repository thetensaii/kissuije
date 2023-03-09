import { Icon } from 'components/atom/Icon';
import { Choice } from 'components/atom/Choice';
import { AnswerType } from 'lib/frontend/types/answer';
import { PlayerType } from 'lib/frontend/types/player';
import { QuestionType } from 'lib/frontend/types/question';
import styles from './AnswerQuestionForm.module.scss';
import { Typo } from 'components/atom/Typo';
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
        <Icon variant={asker.avatar} width={32} height={32} />
        <span className={styles.askerText}>
          <span className={styles.askerName}>{asker.name}</span>
          <span>est</span>
          <span className={styles.askerCharacter}>{asker.character}</span>
        </span>
      </p>
      <div className={styles.label}>
        <p>répondez à sa question</p>
        <Typo tag="p" variant="question">
          "{question.text}"
        </Typo>
      </div>
      <div className={styles.answers}>
        <Choice type="yes" onClick={(): void => answerQuestion(question.askerId, 'yes')} disabled={disabled}>
          Oui
        </Choice>
        <Choice type="no" onClick={(): void => answerQuestion(question.askerId, 'no')} disabled={disabled}>
          Non
        </Choice>
        <Choice type="idk" onClick={(): void => answerQuestion(question.askerId, 'idk')} disabled={disabled}>
          Je ne sais pas
        </Choice>
      </div>
    </form>
  );
};
