import Button from 'components/atom/Button';
import { Card } from 'components/molecule/Card';
import { useGameRoomDataContext } from 'providers/GameRoomProvider';
import styles from './OnlyPlayerLeft.module.scss';

export const OnlyPlayerLeft = (): JSX.Element => {
  const { player } = useGameRoomDataContext();

  if (!player) throw new Error('No player');

  const redirectHome = (): void => {
    window.location.href = process.env.NEXT_PUBLIC_HOST ?? '';
  };

  return (
    <div className={styles.container}>
      <Card>
        <p>Les autres joueurs ont quitté la partie</p>
        <h3>Vous étiez : {player.character}</h3>
      </Card>
      <Button variant="ternary" onClick={redirectHome}>
        Retour à l'accueil
      </Button>
    </div>
  );
};
