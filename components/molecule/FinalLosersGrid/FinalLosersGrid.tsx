import { LoserType } from 'lib/frontend/types/player';
import { Card } from '../Card';
import { FinalLoserCard } from '../FinalLoserCard';

import styles from './FinalLosersGrid.module.scss';

type Props = {
  losers: LoserType[];
};

export const FinalLosersGrid = ({ losers }: Props): JSX.Element => {
  return (
    <Card>
      <div className={styles.container}>
        <h2 className={styles.title}>Réponses</h2>
        <div className={styles.losersGrid}>
          {losers.map((l) => (
            <FinalLoserCard key={l.id} loser={l} />
          ))}
        </div>
      </div>
    </Card>
  );
};
