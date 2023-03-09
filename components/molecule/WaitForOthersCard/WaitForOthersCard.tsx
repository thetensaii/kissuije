import { Icon } from 'components/atom/Icon';
import { H2 } from 'components/atom/Typo/H2';
import { PlayerType } from 'lib/frontend/types/player';
import { Card } from '../Card';
import { DidYouKnowCard } from '../DidYouKnowCard';
import { PlayersReadyList } from '../PlayersReadyList';
import styles from './WaitForOthersCard.module.scss';

type Props = {
  didYouKnowCardText: string;
  players: PlayerType[];
  checkPlayerReady: (player: PlayerType) => boolean;
};

export const WaitForOthersCard = ({ didYouKnowCardText, players, checkPlayerReady }: Props): JSX.Element => {
  return (
    <Card>
      <div className={styles.container}>
        <div className={styles.waitContainer}>
          <Icon variant="Checked" width={72} height={72} />
          <H2>En attente des autres joueurs...</H2>
          <div className={styles.cardContainer}>
            <DidYouKnowCard text={didYouKnowCardText} />
          </div>
        </div>
        <PlayersReadyList players={players} checkPlayerReady={checkPlayerReady} />
      </div>
    </Card>
  );
};
