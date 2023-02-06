import { Card } from 'components/molecule/Card';
import { PlayersReadyList } from 'components/molecule/PlayersReadyList';
import { TryGuessForm } from 'components/molecule/TryGuessForm';
import { PlayerType } from 'lib/frontend/types/player';
import { useGameRoomAPIContext, useGameRoomDataContext } from 'providers/GameRoomProvider';

import styles from './TryGuess.module.scss';

export const TryGuess = (): JSX.Element => {
  const { roomId, players } = useGameRoomDataContext();
  const { tryGuess, redirectToAskQuestionScene } = useGameRoomAPIContext();

  if (!roomId) throw new Error('No room');

  const handleTryGuess = (text: string): void => {
    tryGuess(roomId, text);
  };

  return (
    <div className={styles.container}>
      <Card onBackButtonClick={redirectToAskQuestionScene}>
        <div className={styles.contentContainer}>
          <div className={styles.formContainer}>
            <TryGuessForm tryGuess={handleTryGuess} />
          </div>

          <PlayersReadyList players={players} checkPlayerReady={(p: PlayerType): boolean => p.attempted} />
        </div>
      </Card>
    </div>
  );
};
