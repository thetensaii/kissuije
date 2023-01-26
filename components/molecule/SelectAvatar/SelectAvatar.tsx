import { useState } from 'react';
import { AvatarList } from 'lib/frontend/types/svg';
import styles from './SelectAvatar.module.scss';
import { Svg } from 'components/atom/Svg';
import { TransparentButton } from 'components/atom/TransparentButton';

export const SelectAvatar = (): JSX.Element => {
  const [avatarIndex, setAvatarIndex] = useState<number>(0);

  const avatar = AvatarList[avatarIndex];

  const handleRightChevronClick = (): void => {
    setAvatarIndex((index) => (index === AvatarList.length - 1 ? 0 : index + 1));
  };

  const handleLeftChevronClick = (): void => {
    setAvatarIndex((index) => (index === 0 ? AvatarList.length - 1 : index - 1));
  };

  return (
    <div className={styles.selectAvatar}>
      <TransparentButton onClick={handleLeftChevronClick}>
        <Svg type="ChevronLeft" alt="Chevron Gauche" width={20} height={35} />
      </TransparentButton>
      <Svg type={avatar} alt={avatar} width={80} height={80} />
      <TransparentButton onClick={handleRightChevronClick}>
        <Svg type="ChevronRight" alt="Chevron Droite" width={20} height={35} />
      </TransparentButton>
    </div>
  );
};
