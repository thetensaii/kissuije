import { Svg } from 'components/atom/Svg';
import { PlayerType } from 'lib/frontend/types/player';
import styles from './LobbyPlayer.module.scss';

type Props = {
  player: PlayerType;
};

export const LobbyPlayer = ({ player }: Props): JSX.Element => {
  const { avatar, name, isPlayer, isOwner } = player;
  return (
    <div className={styles.player}>
      <Svg type={avatar} alt={avatar} width={32} height={32} />
      {isPlayer ? <b>{name}</b> : <span>{name}</span>}
      {isOwner && <Svg type="Crown" alt="Crown" width={22} height={22} />}
    </div>
  );
};
