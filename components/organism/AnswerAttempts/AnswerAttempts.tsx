import { AttemptsList } from 'components/molecule/AttemptsList';
import { Card } from 'components/molecule/Card';
import { useGameRoomContext } from 'providers/GameRoomProvider';
import styles from './AnswerAttempts.module.scss';

export const AnswerAttempts = (): JSX.Element => {
  const { players, player, attempts, answerAttempt } = useGameRoomContext();

  if (!player) throw new Error('No player');
  if (!attempts) throw new Error('No Attempts');

  return (
    <>
      <div className={styles.labelWindow}>
        <Card>
          <div className={styles.windowContent}>
            <h2>Répondez aux questions</h2>
            <p>
              Choisissez une réponse à chacune des questions afin d’aiguiller les participants à trouver leur personnage
            </p>
          </div>
        </Card>
      </div>
      <AttemptsList answerAttempt={answerAttempt} players={players} me={player} attempts={attempts} />
    </>
  );
};
