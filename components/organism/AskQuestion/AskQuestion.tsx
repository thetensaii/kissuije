import Button from 'components/atom/Button';
import { Icon } from 'components/atom/Icon';
import { H2 } from 'components/atom/Typo/H2';
import { AskQuestionForm } from 'components/molecule/AskQuestionForm';
import { Card } from 'components/molecule/Card';
import { PlayersReadyList } from 'components/molecule/PlayersReadyList';
import { PlayerType } from 'lib/frontend/types/player';
import { useGameRoomAPIContext, useGameRoomDataContext } from 'providers/GameRoomProvider';
import styles from './AskQuestion.module.scss';

export const AskQuestion = (): JSX.Element => {
  const { roomId, players } = useGameRoomDataContext();
  const { askQuestion, redirectToTryGuessScene } = useGameRoomAPIContext();

  if (!roomId) throw new Error('No Room');

  const handleAskQuestion = (text: string): void => {
    askQuestion(roomId, text);
  };

  return (
    <div className={styles.container}>
      <Card>
        <div className={styles.contentContainer}>
          <div className={styles.choiceContainer}>
            <AskQuestionForm askQuestion={handleAskQuestion} />
            <H2>OU</H2>
            <Button onClick={redirectToTryGuessScene}>
              <div className={styles.guessCharacterButtonContent}>
                <Icon variant="User" width={39} height={39} />
                <p>Deviner son personnage</p>
              </div>
            </Button>
          </div>

          <PlayersReadyList players={players} checkPlayerReady={(p: PlayerType): boolean => p.attempted} />
        </div>
      </Card>
    </div>
  );
};
