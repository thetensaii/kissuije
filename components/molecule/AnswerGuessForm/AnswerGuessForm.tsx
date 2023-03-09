import { Icon } from 'components/atom/Icon';
import { Choice } from 'components/atom/Choice';
import { AnswerType } from 'lib/frontend/types/answer';
import { GuessType } from 'lib/frontend/types/guess';
import { PlayerType } from 'lib/frontend/types/player';
import styles from './AnswerGuessForm.module.scss';
import { Typo } from 'components/atom/Typo';
export type Props = {
  asker: PlayerType;
  guess: GuessType;
  answerGuess: (askerId: string, answer: AnswerType) => void;
  disabled: boolean;
};

export const AnswerGuessForm = ({ asker, guess, answerGuess, disabled }: Props): JSX.Element => {
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
      <div className={styles.guess}>
        <div className={styles.label}>
          <p>a essayé de deviner</p>
          <Typo tag="p" variant="question">
            "{guess.text}"
          </Typo>
        </div>
        <div className={styles.answers}>
          <Choice type="true" onClick={(): void => answerGuess(guess.askerId, 'yes')} disabled={disabled}>
            Vrai
          </Choice>
          <Choice type="false" onClick={(): void => answerGuess(guess.askerId, 'no')} disabled={disabled}>
            Faux
          </Choice>
        </div>
      </div>
    </form>
  );
};
