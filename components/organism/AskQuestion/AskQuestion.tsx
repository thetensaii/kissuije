import Button from 'components/atom/Button';
import { Icon } from 'components/atom/Icon';
import { Typo } from 'components/atom/Typo';
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
            <Typo tag="h2" variant="heading2" font="medium">
              OU
            </Typo>
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
