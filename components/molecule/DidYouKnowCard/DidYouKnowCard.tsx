import { Typo } from 'components/atom/Typo';
import styles from './DidYouKnowCard.module.scss';

type Props = {
  text: string;
};

export const DidYouKnowCard = ({ text }: Props): JSX.Element => {
  return (
    <div className={styles.container}>
      <Typo tag="h2" variant="heading2" font="medium" className={styles.title}>
        <b>Le saviez vous ?</b>
      </Typo>
      <p>{text}</p>
    </div>
  );
};
