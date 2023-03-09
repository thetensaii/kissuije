import { Icon } from 'components/atom/Icon';
import { H1 } from 'components/atom/Typo/H1';
import { getAttemptAnswerStats } from 'lib/frontend/functions/ResultStats';
import { AttemptType } from 'lib/frontend/types/attempt';
import { PlayerType } from 'lib/frontend/types/player';
import { Card } from '../Card';
import { ResultStatBar } from '../ResultStatBar';
import styles from './WinnerCard.module.scss';

type Props = {
  player: PlayerType;
  attempt: AttemptType;
};

export const WinnerCard = ({ player, attempt }: Props): JSX.Element => {
  const stats = getAttemptAnswerStats(attempt);

  return (
    <Card>
      <div className={styles.container}>
        <Icon variant="PartyPopper" width={109} height={109} />
        <H1>Vous avez gagné !</H1>
        <p className={styles.label}>
          Vous avez deviné <b>{player.character}</b>
        </p>
        <ResultStatBar stats={stats} countTotalAnswers={attempt.answers.length} />
      </div>
    </Card>
  );
};
