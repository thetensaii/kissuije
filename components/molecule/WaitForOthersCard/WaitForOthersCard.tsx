import { Svg } from 'components/atom/Svg';
import { ContentWindow } from '../ContentWindow';
import { DidYouKnowCard } from '../DidYouKnowCard';
import styles from './WaitForOthersCard.module.scss';

type Props = {
  didYouKnowCardText: string;
};

export const WaitForOthersCard = ({ didYouKnowCardText }: Props): JSX.Element => {
  return (
    <ContentWindow>
      <div className={styles.container}>
        <Svg type="Checked" alt="Checked" width={72} height={72} />
        <p className={styles.waitingText}>En attente des autres joueurs...</p>
        <DidYouKnowCard text={didYouKnowCardText} />
      </div>
    </ContentWindow>
  );
};
