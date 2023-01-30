import { InputButton } from 'components/atom/InputButton';
import { Svg } from 'components/atom/Svg';
import { AnswerAttemptFn } from 'hooks/useRoom';
import { GuessType } from 'lib/frontend/types/guess';
import { PlayerType } from 'lib/frontend/types/player';
import styles from './AnswerGuessForm.module.scss';
export type Props = {
  asker: PlayerType;
  guess: GuessType;
  answerGuess: AnswerAttemptFn;
  disabled: boolean;
};

export const AnswerGuessForm = ({ asker, guess, answerGuess, disabled }: Props): JSX.Element => {
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
      <div className={styles.guess}>
        <div className={styles.label}>
          <p>a essayé de deviner</p>
          <p className={styles.guessText}>"{guess.text}"</p>
        </div>
        <div className={styles.answers}>
          <InputButton value="Vrai" onClick={(): void => answerGuess(guess.askerId, 'yes')} disabled={disabled} />
          <InputButton value="Faux" onClick={(): void => answerGuess(guess.askerId, 'no')} disabled={disabled} />
        </div>
      </div>
    </form>
  );
};