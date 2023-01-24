import { useState } from 'react';
import { Avatar } from 'components/atom/Avatar';
import { SvgButton } from 'components/atom/SvgButton';
import { AvatarList } from 'lib/frontend/types/avatar';
import styles from './SelectAvatar.module.scss';

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
      <SvgButton
        onClick={handleLeftChevronClick}
        src="/svgs/ChevronLeft.svg"
        alt="Chevron Gauche"
        svgWidth={20}
        svgHeight={35}
      />
      <Avatar type={avatar} width={80} height={80} />
      <SvgButton
        onClick={handleRightChevronClick}
        src="/svgs/ChevronRight.svg"
        alt="Chevron Droite"
        svgWidth={20}
        svgHeight={35}
      />
    </div>
  );
};
