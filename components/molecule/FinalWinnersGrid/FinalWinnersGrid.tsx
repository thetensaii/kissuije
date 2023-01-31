import { Svg } from 'components/atom/Svg';
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
        <Svg type="Fireworks" alt="Feu d'artifice" width={140} height={140} />
      </div>
      {winners.map((w) => (
        <FinalWinnerCard key={w.id} winner={w} />
      ))}
      <div className={styles.partyPopperIcon}>
        <Svg type="PartyPopper" alt="Fête" width={90} height={90} />
      </div>
    </div>
  );
};
