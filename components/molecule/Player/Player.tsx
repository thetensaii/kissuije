import { Svg } from 'components/atom/Svg';
import { PlayerType } from 'lib/frontend/types/player';
import styles from './Player.module.scss';

type Props = {
  avatar: PlayerType['avatar'];
  name: PlayerType['name'];
  isPlayer: PlayerType['isPlayer'];
  isOwner?: PlayerType['isOwner'];
  afterSpanText?: React.ReactNode;
};

export const Player = ({ avatar, name, isPlayer, isOwner = false, afterSpanText }: Props): JSX.Element => {
  return (
    <div className={styles.player}>
      <Svg type={avatar} alt={avatar} width={32} height={32} />
      {isPlayer ? <b className={styles.playerName}>{name}</b> : <span className={styles.playerName}>{name}</span>}
      {isOwner && <Svg type="Crown" alt="Crown" width={22} height={22} />}
      {afterSpanText && <span>{afterSpanText}</span>}
    </div>
  );
};
