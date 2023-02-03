import { WaitForOthersCard } from 'components/molecule/WaitForOthersCard';
import { useGameRoomContext } from 'providers/GameRoomProvider';

import styles from './WaitForAttempts.module.scss';

export const WaitForAttempts = (): JSX.Element => {
  const { players } = useGameRoomContext();
  return (
    <div className={styles.container}>
      <WaitForOthersCard
        didYouKnowCardText="Willard Smith, alias Will Smith (prononcé en anglais : /wɪl smɪθ/), est un acteur, chanteur, scénariste et producteur de cinéma américain"
        players={players}
        checkPlayerReady={(p): boolean => p.attempted}
      />
    </div>
  );
};
