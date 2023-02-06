import { InputButton } from 'components/atom/InputButton';
import { Svg } from 'components/atom/Svg';
import { AnswerType } from 'lib/frontend/types/answer';
import { GuessType } from 'lib/frontend/types/guess';
import { PlayerType } from 'lib/frontend/types/player';
import styles from './AnswerGuessForm.module.scss';
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
        <Svg type={asker.avatar} alt={asker.avatar} width={32} height={32} />
        <span className={styles.askerText}>
          <span className={styles.askerName}>{asker.name}</span>
          <span>est</span>
          <span className={styles.askerCharacter}>{asker.character}</span>
        </span>
      </p>
      <div className={styles.guess}>
        <div className={styles.label}>
          <p>a essayé de deviner</p>
          <p className={styles.guessText}>"{guess.text}"</p>
        </div>
        <div className={styles.answers}>
          <InputButton type="true" onClick={(): void => answerGuess(guess.askerId, 'yes')} disabled={disabled}>
            Vrai
          </InputButton>
          <InputButton type="false" onClick={(): void => answerGuess(guess.askerId, 'no')} disabled={disabled}>
            Faux
          </InputButton>
        </div>
      </div>
    </form>
  );
};
