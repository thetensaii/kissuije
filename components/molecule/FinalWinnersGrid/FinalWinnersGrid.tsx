import { Icon } from 'components/atom/Icon';
import { WinnerType } from 'lib/frontend/types/player';
import { FinalWinnerCard } from '../FinalWinnerCard/FinalWinnerCard';
import styles from './FinalWinnersGrid.module.scss';

type Props = {
  winners: WinnerType[];
};

export const FinalWinnersGrid = ({ winners }: Props): JSX.Element => {
  return (
    <div className={styles.winnersGrid}>
      <div className={styles.fireworkIcon}>
        <Icon variant="Fireworks" width={140} height={140} />
      </div>
      {winners.map((w) => (
        <FinalWinnerCard key={w.id} winner={w} />
      ))}
      <div className={styles.partyPopperIcon}>
        <Icon variant="PartyPopper" width={90} height={90} />
      </div>
    </div>
  );
};
