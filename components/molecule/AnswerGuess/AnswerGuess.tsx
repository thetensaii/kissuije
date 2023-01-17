import Button from 'components/atom/Button';
import { AnswerAttemptFn } from 'hooks/useRoom';
import { GuessType } from 'lib/frontend/types/guess';
import { PlayerType } from 'lib/frontend/types/player';
import styles from './AnswerGuess.module.scss';
export type Props = {
  player: PlayerType;
  guess: GuessType;
  answerGuess: AnswerAttemptFn;
};

export const AnswerGuess = ({ player, guess, answerGuess }: Props): JSX.Element => {
  return (
    <div className={styles.answerGuess}>
      <p>
        <b>{player.name}</b> est <b>{player.character}</b>
      </p>
      <p>a essayé de deviner</p>

      <h2>{guess.text}</h2>

      <div className={styles.answers}>
        <Button onClick={(): void => answerGuess(guess.askerId, 'yes')}>Oui</Button>
        <Button onClick={(): void => answerGuess(guess.askerId, 'no')}>Non</Button>
      </div>
    </div>
  );
};
