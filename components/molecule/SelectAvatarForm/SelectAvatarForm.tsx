import { useEffect, useState } from 'react';
import { avatarList, AvatarType } from 'lib/frontend/types/svg';
import Button from 'components/atom/Button';
import styles from './SelectAvatarForm.module.scss';
import { Icon } from 'components/atom/Icon';

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
        <Icon variant="ChevronLeft" width={20} height={35} />
      </Button>
      <Icon variant={avatar} width={80} height={80} />
      <Button variant="transparent" onClick={handleRightChevronClick}>
        <Icon variant="ChevronRight" width={20} height={35} />
      </Button>
    </div>
  );
};
