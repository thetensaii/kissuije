import { Svg } from 'components/atom/Svg';
import { getAttemptAnswerStats } from 'lib/frontend/functions/ResultStats';
import { AttemptType } from 'lib/frontend/types/attempt';
import { PlayerType } from 'lib/frontend/types/player';
import { ContentWindow } from '../ContentWindow';
import { ResultStatBar } from '../ResultStatBar';
import styles from './WinnerCard.module.scss';

type Props = {
  player: PlayerType;
  attempt: AttemptType;
};

export const WinnerCard = ({ player, attempt }: Props): JSX.Element => {
  const stats = getAttemptAnswerStats(attempt);

  return (
    <ContentWindow>
      <div className={styles.container}>
        <Svg type="PartyPopper" alt="Fête" width={109} height={109} />
        <p className={styles.title}>Vous avez gagné !</p>
        <p className={styles.label}>
          Vous avez deviné <b>{player.character}</b>
        </p>
        <ResultStatBar stats={stats} countTotalAnswers={attempt.answers.length} />
      </div>
    </ContentWindow>
  );
};
