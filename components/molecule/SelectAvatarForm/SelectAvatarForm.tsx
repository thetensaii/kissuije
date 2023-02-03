import { useEffect, useState } from 'react';
import { avatarList, AvatarType } from 'lib/frontend/types/svg';
import { Svg } from 'components/atom/Svg';
import Button from 'components/atom/Button';
import styles from './SelectAvatarForm.module.scss';

type Props = {
  initialAvatar?: AvatarType;
  onChange: (avatar: AvatarType) => void;
};

export const SelectAvatarForm = ({ initialAvatar, onChange }: Props): JSX.Element => {
  const [avatarIndex, setAvatarIndex] = useState<number>(
    initialAvatar ? avatarList.findIndex((a) => a === initialAvatar) : 0
  );

  const avatar = avatarList[avatarIndex];

  useEffect(() => {
    onChange(avatar);
  }, [avatar, onChange]);

  const handleRightChevronClick = (): void => {
    setAvatarIndex((index) => (index === avatarList.length - 1 ? 0 : index + 1));
  };

  const handleLeftChevronClick = (): void => {
    setAvatarIndex((index) => (index === 0 ? avatarList.length - 1 : index - 1));
  };

  return (
    <div className={styles.selectAvatar}>
      <Button variant="transparent" onClick={handleLeftChevronClick}>
        <Svg type="ChevronLeft" alt="Chevron Gauche" width={20} height={35} />
      </Button>
      <Svg type={avatar} alt={avatar} width={80} height={80} />
      <Button variant="transparent" onClick={handleRightChevronClick}>
        <Svg type="ChevronRight" alt="Chevron Droite" width={20} height={35} />
      </Button>
    </div>
  );
};
