import { Svg } from 'components/atom/Svg';
import { AvatarType } from 'lib/frontend/types/svg';
import styles from './Player.module.scss';

type Props = {
  avatar: AvatarType;
  name: string;
  isPlayer?: boolean;
  isOwner?: boolean;
};

export const Player = ({ avatar, name, isPlayer = false, isOwner = false }: Props): JSX.Element => {
  return (
    <div className={styles.player}>
      <Svg type={avatar} alt={avatar} width={32} height={32} />
      {isPlayer ? <b>{name}</b> : <span>{name}</span>}
      {isOwner && <Svg type="Crown" alt="Crown" width={22} height={22} />}
    </div>
  );
};
