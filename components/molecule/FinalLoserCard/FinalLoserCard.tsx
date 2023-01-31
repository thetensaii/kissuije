import { LoserType } from 'lib/frontend/types/player';
import { Player } from '../Player';
import styles from './FinalLoserCard.module.scss';

type Props = {
  loser: LoserType;
};

export const FinalLoserCard = ({ loser }: Props): JSX.Element => {
  const { avatar, name, isPlayer, character } = loser;
  return (
    <div className={styles.container}>
      <Player
        avatar={avatar}
        name={name}
        isPlayer={isPlayer}
        afterSpanText={
          <span>
            était <b>{character}</b>
          </span>
        }
      />
    </div>
  );
};
