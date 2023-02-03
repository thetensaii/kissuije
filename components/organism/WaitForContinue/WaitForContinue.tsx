import { WaitForOthersCard } from 'components/molecule/WaitForOthersCard';
import { useGameRoomContext } from 'providers/GameRoomProvider';
import styles from './WaitForContinue.module.scss';

export const WaitForContinue = (): JSX.Element => {
  const { players } = useGameRoomContext();

  return (
    <div className={styles.container}>
      <WaitForOthersCard
        didYouKnowCardText="Willard Smith, alias Will Smith (prononcé en anglais : /wɪl smɪθ/), est un acteur, chanteur, scénariste et producteur de cinéma américain"
        players={players}
        checkPlayerReady={(player): boolean => player.wantsToContinue}
      />
    </div>
  );
};
