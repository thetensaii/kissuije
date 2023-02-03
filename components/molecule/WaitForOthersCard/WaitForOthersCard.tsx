import { Svg } from 'components/atom/Svg';
import { H2 } from 'components/atom/Typo/H2';
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
        <H2>En attente des autres joueurs...</H2>
        <div className={styles.cardContainer}>
          <DidYouKnowCard text={didYouKnowCardText} />
        </div>
      </div>
    </ContentWindow>
  );
};
