import { Typo } from 'components/atom/Typo';
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
        <Typo tag="h2" variant="heading2" font="medium" className={styles.title}>
          Réponses
        </Typo>
        <div className={styles.losersGrid}>
          {losers.map((l) => (
            <FinalLoserCard key={l.id} loser={l} />
          ))}
        </div>
      </div>
    </Card>
  );
};
