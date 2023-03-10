import { Typo } from 'components/atom/Typo';
import { AttemptsList } from 'components/molecule/AttemptsList';
import { Card } from 'components/molecule/Card';
import { AnswerType } from 'lib/frontend/types/answer';
import { useGameRoomAPIContext, useGameRoomDataContext } from 'providers/GameRoomProvider';
import styles from './AnswerAttempts.module.scss';

export const AnswerAttempts = (): JSX.Element => {
  const { roomId, players, player, attempts } = useGameRoomDataContext();
  const { answerAttempt } = useGameRoomAPIContext();

  if (!roomId) throw new Error('No Room');
  if (!player) throw new Error('No player');
  if (!attempts) throw new Error('No Attempts');

  const handleAnswerAttempt = (askerId: string, answer: AnswerType): void => {
    answerAttempt(roomId, askerId, answer);
  };

  return (
    <>
      <div className={styles.labelWindow}>
        <Card>
          <div className={styles.windowContent}>
            <Typo tag="h2" variant="heading2" font="medium">
              Répondez aux questions
            </Typo>
            <p>
              Choisissez une réponse à chacune des questions afin d’aiguiller les participants à trouver leur personnage
            </p>
          </div>
        </Card>
      </div>
      <AttemptsList answerAttempt={handleAnswerAttempt} players={players} me={player} attempts={attempts} />
    </>
  );
};
