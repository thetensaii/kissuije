import { Icon } from 'components/atom/Icon';
import { PlayerType } from 'lib/frontend/types/player';
import styles from './Player.module.scss';

type Props = {
  avatar: PlayerType['avatar'];
  name: PlayerType['name'];
  isPlayer?: PlayerType['isPlayer'];
  isOwner?: PlayerType['isOwner'];
  afterSpanText?: React.ReactNode;
};

export const Player = ({ avatar, name, isPlayer = false, isOwner = false, afterSpanText }: Props): JSX.Element => {
  return (
    <div className={styles.player}>
      <span>
        <Icon variant={avatar} width={32} height={32} />
      </span>
      {isPlayer ? <b className={styles.playerName}>{name}</b> : <span className={styles.playerName}>{name}</span>}
      {isOwner && <Icon variant="Crown" width={22} height={22} />}
      {afterSpanText && <span>{afterSpanText}</span>}
    </div>
  );
};
