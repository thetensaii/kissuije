import { useEffect, useState } from 'react';
import { AvatarList, AvatarType } from 'lib/frontend/types/svg';
import styles from './SelectAvatar.module.scss';
import { Svg } from 'components/atom/Svg';
import Button from 'components/atom/Button';

type Props = {
  initialAvatar?: AvatarType;
  onChange: (avatar: AvatarType) => void;
};

export const SelectAvatar = ({ initialAvatar, onChange }: Props): JSX.Element => {
  const [avatarIndex, setAvatarIndex] = useState<number>(
    initialAvatar ? AvatarList.findIndex((a) => a === initialAvatar) : 0
  );

  const avatar = AvatarList[avatarIndex];

  useEffect(() => {
    onChange(avatar);
  }, [avatar, onChange]);

  const handleRightChevronClick = (): void => {
    setAvatarIndex((index) => (index === AvatarList.length - 1 ? 0 : index + 1));
  };

  const handleLeftChevronClick = (): void => {
    setAvatarIndex((index) => (index === 0 ? AvatarList.length - 1 : index - 1));
  };

  return (
    <div className={styles.selectAvatar}>
      <Button buttonType="transparent" onClick={handleLeftChevronClick}>
        <Svg type="ChevronLeft" alt="Chevron Gauche" width={20} height={35} />
      </Button>
      <Svg type={avatar} alt={avatar} width={80} height={80} />
      <Button buttonType="transparent" onClick={handleRightChevronClick}>
        <Svg type="ChevronRight" alt="Chevron Droite" width={20} height={35} />
      </Button>
    </div>
  );
};
