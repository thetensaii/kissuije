import Button from 'components/atom/Button';
import { GuessType } from 'lib/frontend/types/guess';
import { PlayerType } from 'lib/frontend/types/player';
import styles from './Guess.module.scss';
export type Props = {
  player: PlayerType;
  guess: GuessType;
};

export const Guess = ({ player, guess }: Props): JSX.Element => {
  return (
    <div className={styles.guess}>
      <p>
        <b>{player.name}</b> est <b>{player.character}</b>
      </p>
      <p>a essayé de deviner</p>

      <h2>{guess.text}</h2>

      <div className={styles.answers}>
        <Button>Oui</Button>
        <Button>Non</Button>
      </div>
    </div>
  );
};
